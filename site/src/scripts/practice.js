import { EditorState, Prec } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine
} from '@codemirror/view';
import { history, historyKeymap, defaultKeymap, indentWithTab } from '@codemirror/commands';
import { java } from '@codemirror/lang-java';
import { bracketMatching, indentOnInput, indentUnit, HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { tags } from '@lezer/highlight';

const DRAFT_KEY = 'ljc.practice.drafts.v1';
const SOLVED_KEY = 'ljc.practice.solved.v1';

const practiceTheme = EditorView.theme({
  '&': {
    backgroundColor: 'var(--practice-code-bg)',
    color: 'var(--practice-code-fg)',
    fontSize: '0.82rem'
  },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': {
    fontFamily: 'var(--sl-font-mono)',
    lineHeight: '1.6'
  },
  '.cm-content': {
    padding: '0.75rem 0',
    caretColor: 'var(--course-accent)'
  },
  '.cm-line': {
    padding: '0 0.8rem'
  },
  '.cm-foldGutter': { display: 'none' },
  '.cm-gutters': {
    backgroundColor: 'color-mix(in srgb, var(--practice-code-bg) 82%, var(--course-card))',
    color: 'var(--course-muted)',
    borderRight: '1px solid var(--course-border)'
  },
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 0.65rem 0 0.35rem'
  },
  '.cm-activeLine': {
    backgroundColor: 'var(--practice-active-line)'
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'var(--practice-active-line)'
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: 'var(--course-accent)'
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: 'color-mix(in srgb, var(--course-accent) 22%, transparent)'
  },
  '.cm-matchingBracket': {
    backgroundColor: 'color-mix(in srgb, var(--course-accent) 18%, transparent)',
    outline: '1px solid var(--course-accent)'
  },
  '.cm-panels': {
    backgroundColor: 'var(--course-card)',
    color: 'var(--course-ink)'
  },
  '.cm-tooltip': {
    backgroundColor: 'var(--course-card)',
    color: 'var(--course-ink)',
    border: '1px solid var(--course-border)'
  }
});

const practiceHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: 'var(--cm-keyword)' },
  { tag: tags.string, color: 'var(--cm-string)' },
  { tag: [tags.number, tags.bool, tags.null], color: 'var(--cm-number)' },
  { tag: [tags.comment, tags.lineComment, tags.blockComment, tags.docComment], color: 'var(--cm-comment)', fontStyle: 'italic' },
  { tag: tags.annotation, color: 'var(--cm-annotation)' },
  { tag: [tags.typeName, tags.className], color: 'var(--cm-type)' },
  { tag: tags.function(tags.variableName), color: 'var(--cm-function)' },
  { tag: tags.function(tags.propertyName), color: 'var(--cm-function)' },
  { tag: tags.operator, color: 'var(--cm-operator)' },
  { tag: tags.meta, color: 'var(--cm-annotation)' },
  { tag: tags.variableName, color: 'var(--practice-code-fg)' }
]);

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* localStorage может быть недоступен */
  }
}

function readDrafts() {
  const value = readJson(DRAFT_KEY, {});
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function readSolved() {
  const value = readJson(SOLVED_KEY, []);
  return Array.isArray(value) ? value.filter((id) => typeof id === 'string') : [];
}

function saveDraft(lessonId, code) {
  const drafts = readDrafts();
  drafts[lessonId] = code;
  writeJson(DRAFT_KEY, drafts);
}

function removeDraft(lessonId) {
  const drafts = readDrafts();
  delete drafts[lessonId];
  writeJson(DRAFT_KEY, drafts);
}

function setSolved(lessonId, solved) {
  const current = new Set(readSolved());
  if (solved) current.add(lessonId);
  else current.delete(lessonId);
  writeJson(SOLVED_KEY, [...current]);
}

function parseScript(container, selector, fallback) {
  const node = container.querySelector(selector);
  if (!node) return fallback;
  try {
    return JSON.parse(node.textContent || '');
  } catch {
    return fallback;
  }
}

function stripComments(code) {
  let out = '';
  let i = 0;
  let mode = 'code';
  while (i < code.length) {
    const c = code[i];
    const d = code[i + 1];
    if (mode === 'code') {
      if (c === '/' && d === '/') { mode = 'line'; out += '  '; i += 2; continue; }
      if (c === '/' && d === '*') { mode = 'block'; out += '  '; i += 2; continue; }
      if (c === '"') { mode = 'string'; out += c; i++; continue; }
      if (c === "'") { mode = 'char'; out += c; i++; continue; }
      out += c; i++; continue;
    }
    if (mode === 'line') {
      if (c === '\n') { mode = 'code'; out += '\n'; } else out += ' ';
      i++; continue;
    }
    if (mode === 'block') {
      if (c === '*' && d === '/') { mode = 'code'; out += '  '; i += 2; continue; }
      out += c === '\n' ? '\n' : ' ';
      i++; continue;
    }
    if (mode === 'string' || mode === 'char') {
      if (c === '\\') { out += c + (d ?? ''); i += 2; continue; }
      if ((mode === 'string' && c === '"') || (mode === 'char' && c === "'")) {
        mode = 'code';
        out += c;
        i++;
        continue;
      }
      out += c;
      i++;
    }
  }
  return out;
}

function scanSyntax(code) {
  const stack = [];
  const errors = [];
  let line = 1;
  let mode = 'code';
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const d = code[i + 1];
    if (mode === 'code') {
      if (c === '\n') { line++; continue; }
      if (c === '/' && d === '/') { mode = 'line'; i++; continue; }
      if (c === '/' && d === '*') { mode = 'block'; i++; continue; }
      if (c === '"') { mode = 'string'; continue; }
      if (c === "'") { mode = 'char'; continue; }
      if (c === '(' || c === '[' || c === '{') {
        stack.push({ char: c, line });
        continue;
      }
      if (c === ')' || c === ']' || c === '}') {
        const expected = pairs[c];
        const last = stack.pop();
        if (!last) {
          errors.push({ line, message: `Лишняя закрывающая скобка «${c}».` });
        } else if (last.char !== expected) {
          errors.push({
            line,
            message: `Скобка «${c}» на строке ${line} не совпадает с «${last.char}» со строки ${last.line}.`
          });
        }
      }
      continue;
    }
    if (mode === 'line') {
      if (c === '\n') { mode = 'code'; line++; }
      continue;
    }
    if (mode === 'block') {
      if (c === '*' && d === '/') { mode = 'code'; i++; continue; }
      if (c === '\n') line++;
      continue;
    }
    if (mode === 'string' || mode === 'char') {
      if (c === '\\') { i++; continue; }
      if (c === '\n') {
        errors.push({ line, message: 'Не закрыта строковая или символьная константа.' });
        mode = 'code';
        line++;
        continue;
      }
      if ((mode === 'string' && c === '"') || (mode === 'char' && c === "'")) {
        mode = 'code';
      }
      continue;
    }
  }
  if (mode === 'string' || mode === 'char') {
    errors.push({ line, message: 'Не закрыта строковая или символьная константа.' });
  }
  if (mode === 'block') {
    errors.push({ line, message: 'Не закрыт блочный комментарий /* ... */.' });
  }
  for (const item of stack) {
    errors.push({ line: item.line, message: `Не закрыта скобка «${item.char}».` });
  }
  return errors;
}

function countMatches(code, pattern) {
  try {
    const matches = code.match(new RegExp(pattern, 'g'));
    return matches ? matches.length : 0;
  } catch {
    return 0;
  }
}

function testPattern(code, pattern) {
  try {
    return new RegExp(pattern, 'm').test(code);
  } catch {
    return false;
  }
}

function staticallyCheckable(code) {
  return stripComments(code)
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/'(?:\\.|[^'\\])*'/g, "''");
}

function tokenize(code) {
  const cleaned = stripComments(code);
  return cleaned.match(/[A-Za-z_$][\w$]*|\d+(?:\.\d+)?|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|===|!==|==|!=|<=|>=|&&|\|\||\+\+|--|->|[^\s]/g) ?? [];
}

const TOKEN_PATTERNS = [
  ['System.out.println', /System\.out\.println/],
  ['System.out.print', /System\.out\.print(?!ln)/],
  ['Arrays.toString()', /Arrays\.toString/],
  ['Arrays.equals()', /Arrays\.equals/],
  ['Arrays.stream()', /Arrays\.stream/],
  ['Integer.parseInt()', /Integer\.parseInt/],
  ['Double.parseDouble()', /Double\.parseDouble/],
  ['String.format()', /String\.format/],
  ['String.join()', /String\.join/],
  ['List.of()', /List\.of/],
  ['ArrayList', /ArrayList/],
  ['LinkedList', /LinkedList/],
  ['HashSet', /HashSet/],
  ['LinkedHashSet', /LinkedHashSet/],
  ['TreeSet', /TreeSet/],
  ['HashMap', /HashMap/],
  ['TreeMap', /TreeMap/],
  ['Map.of()', /Map\.of/],
  ['Comparator.comparingInt()', /Comparator\.comparingInt/],
  ['Comparator.naturalOrder()', /Comparator\.naturalOrder/],
  ['Optional', /Optional/],
  ['.stream()', /\.stream\s*\(\s*\)/],
  ['.filter()', /\.filter\s*\(/],
  ['.map()', /\.map\s*\(/],
  ['.flatMap()', /\.flatMap\s*\(/],
  ['.sorted()', /\.sorted\s*\(/],
  ['.collect()', /\.collect\s*\(/],
  ['Collectors', /Collectors\./],
  ['groupingBy', /groupingBy/],
  ['synchronized', /synchronized/],
  ['volatile', /volatile/],
  ['Thread', /\bThread\b/],
  ['Runnable', /\bRunnable\b/],
  ['Callable', /\bCallable\b/],
  ['Future', /\bFuture\b/],
  ['ExecutorService', /\bExecutorService\b/],
  ['try-with-resources', /try\s*\(/],
  ['catch', /\bcatch\s*\(/],
  ['finally', /\bfinally\b/],
  ['throw new', /throw\s+new\b/],
  ['@Override', /@Override/],
  ['record', /\brecord\s+\w+/],
  ['enum', /\benum\s+\w+/],
  ['interface', /\binterface\s+\w+/],
  ['extends', /\bextends\b/],
  ['implements', /\bimplements\b/],
  ['switch', /\bswitch\s*\(/],
  ['for', /\bfor\s*\(/],
  ['while', /\bwhile\s*\(/],
  ['if', /\bif\s*\(/],
  ['.equals()', /\.equals\s*\(/],
  ['.length', /\.length\b/],
  ['.size()', /\.size\s*\(\s*\)/],
  ['.get()', /\.get\s*\(/],
  ['.add()', /\.add\s*\(/],
  ['.put()', /\.put\s*\(/],
  ['.remove()', /\.remove\s*\(/],
  ['.sort()', /\.sort\s*\(/],
  ['.removeIf()', /\.removeIf\s*\(/],
  ['.merge()', /\.merge\s*\(/],
  ['.computeIfAbsent()', /\.computeIfAbsent\s*\(/],
  ['.findFirst()', /\.findFirst\s*\(\s*\)/],
  ['.orElse', /\.orElse/],
  ['.ifPresent', /\.ifPresent/],
  ['.charAt()', /\.charAt\s*\(/],
  ['.toUpperCase()', /\.toUpperCase/],
  ['.isBlank()', /\.isBlank/],
  ['.isEmpty()', /\.isEmpty/],
  ['.getName()', /\.getName\s*\(/],
  ['.setName()', /\.setName\s*\(/],
  ['.getAge()', /\.getAge\s*\(/],
  ['MAX_AGE', /\bMAX_AGE\b/],
  ['IllegalArgumentException', /\bIllegalArgumentException\b/],
  ['InvalidAgeException', /\bInvalidAgeException\b/],
  ['AutoCloseable', /\bAutoCloseable\b/],
  ['close()', /\bclose\s*\(/],
  ['.start()', /\.start\s*\(/],
  ['.join()', /\.join\s*\(/],
  ['.shutdown()', /\.shutdown\s*\(/],
  ['.submit()', /\.submit\s*\(/],
  ['getAnnotation()', /getAnnotation\s*\(/],
  ['@Retention', /\bRetention\b/],
  ['@Target', /\bTarget\b/],
  ['value()', /\bvalue\s*\(/],
  ['workingDay', /\bworkingDay\b/],
  ['count', /\bcount\b/],
  ['age', /\bage\b/],
  ['name', /\bname\b/]
];

const STOP_WORDS = new Set([
  'public', 'private', 'protected', 'class', 'static', 'final', 'void', 'main', 'args',
  'String', 'new', 'int', 'long', 'double', 'float', 'char', 'boolean', 'byte', 'short',
  'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break',
  'continue', 'import', 'package', 'java', 'util', 'this', 'true', 'false', 'null',
  'throws', 'throw', 'try', 'catch', 'finally', 'extends', 'implements', 'interface',
  'enum', 'record', 'static', 'final', 'void', 'main', 'args', 'String'
]);

function extractRequiredTokens(solution) {
  const found = [];
  for (const [label, re] of TOKEN_PATTERNS) {
    if (re.test(solution)) found.push(label);
  }
  return found;
}

function significantTokens(code) {
  return new Set(
    tokenize(code).filter((token) => {
      if (token.length < 3) return false;
      if (STOP_WORDS.has(token)) return false;
      return /^[A-Za-z_$][\w$]*$/.test(token) || /^\d+$/.test(token) || token.startsWith('"');
    })
  );
}

function similarityToSolution(code, solution) {
  const reference = significantTokens(solution);
  if (!reference.size) return 1;
  const current = significantTokens(code);
  let overlap = 0;
  for (const token of reference) if (current.has(token)) overlap += 1;
  return overlap / reference.size;
}

function formatList(items, limit = 4) {
  const unique = [...new Set(items)];
  const shown = unique.slice(0, limit);
  const suffix = unique.length > limit ? ` и ещё ${unique.length - limit}` : '';
  return shown.join(', ') + suffix;
}

function checkText(code, rules) {
  const text = code.trim();
  if (!text) return { ok: false, errors: ['Напиши ответ, хотя бы пару предложений.'] };
  const lower = text.toLowerCase();
  const missing = (rules.keywords ?? []).filter((keyword) => !lower.includes(keyword.toLowerCase()));
  if (missing.length) {
    return {
      ok: false,
      errors: [`В ответе не хватает: ${formatList(missing)}.`]
    };
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  const minWords = rules.minWords ?? 0;
  if (words < minWords) {
    return {
      ok: false,
      errors: [`Слишком короткий ответ: ${words} слов(а), нужно минимум ${minWords}.`]
    };
  }
  return { ok: true, warnings: [] };
}

function checkCode(code, solution, rules) {
  const errors = [];
  const warnings = [];
  const syntax = scanSyntax(code);
  if (syntax.length) {
    return {
      ok: false,
      errors: syntax.map((error) => `Строка ${error.line}: ${error.message}`)
    };
  }
  if (/\bTODO\b/.test(code)) {
    return {
      ok: false,
      errors: ['В коде остался TODO. Убери заготовку и напиши решение.']
    };
  }
  const checkable = staticallyCheckable(code);
  if (checkable.replace(/\s+/g, '').length < 10) {
    return { ok: false, errors: ['Слишком короткое решение — добавь код.'] };
  }

  const explicitCounts = rules.counts ?? [];
  for (const rule of explicitCounts) {
    const count = countMatches(checkable, rule.pattern);
    if (count < (rule.min ?? 1)) {
      errors.push(rule.message || `Нужно минимум ${rule.min ?? 1} вхождений ${rule.pattern}.`);
    }
  }

  for (const rule of rules.includes ?? []) {
    if (!testPattern(checkable, rule.pattern)) {
      errors.push(rule.message || `Не найдено обязательное выражение: ${rule.pattern}.`);
    }
  }

  for (const rule of rules.excludes ?? []) {
    if (testPattern(checkable, rule.pattern)) {
      errors.push(rule.message || `В решении не должно быть: ${rule.pattern}.`);
    }
  }

  const significant = significantTokens(code);
  const minTokens = rules.minTokens ?? 4;
  if (significant.size < minTokens) {
    errors.push(`Слишком мало содержательного кода: ${significant.size} конструкций, нужно минимум ${minTokens}.`);
  }

  if (!explicitCounts.length && !(rules.includes ?? []).length) {
    const required = extractRequiredTokens(solution);
    const missing = required.filter((label) => {
      const pattern = TOKEN_PATTERNS.find(([name]) => name === label);
      return pattern ? !pattern[1].test(checkable) : false;
    });
    const matched = required.length - missing.length;
    const ratio = required.length ? matched / required.length : 1;
    const similarity = similarityToSolution(code, solution);
    if (required.length && ratio < 0.55 && similarity < 0.5) {
      errors.push(
        `Решение пока не похоже на эталон. В нём используются: ${formatList(required)}.`
      );
    } else if (required.length && missing.length && missing.length <= 2) {
      warnings.push(`Проверь, всё ли на месте: ${formatList(missing)}.`);
    }
  }

  if (errors.length) return { ok: false, errors: errors.slice(0, 4) };
  return { ok: true, warnings };
}

function setFeedback(container, message, state = '') {
  const feedback = container.querySelector('[data-practice-feedback]');
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.remove('is-ok', 'is-error', 'is-warn');
  if (state) feedback.classList.add(`is-${state}`);
}

function setStatus(container, text, state = '') {
  const status = container.querySelector('[data-practice-status]');
  if (!status) return;
  status.textContent = text;
  status.classList.remove('is-solved', 'is-saved');
  if (state) status.classList.add(`is-${state}`);
}

async function createCodeEditor(container, lessonId, initial) {
  const mount = container.querySelector('[data-practice-codemirror]');
  if (!mount) return null;

  // CodeMirror измеряет ширину символов по фактическому шрифту.
  // Ждём загрузку JetBrains Mono, иначе курсор и клики уезжают.
  if (document.fonts?.ready) {
    try { await document.fonts.ready; } catch { /* продолжаем со шрифтом по умолчанию */ }
  }

  let timer = null;
  const view = new EditorView({
    state: EditorState.create({
      doc: initial,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        EditorState.tabSize.of(4),
        indentUnit.of('    '),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        java(),
        practiceTheme,
        syntaxHighlighting(practiceHighlight),
        EditorView.contentAttributes.of({ 'aria-label': 'Твой код' }),
        keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap]),
        Prec.highest(
          keymap.of([
            indentWithTab,
            {
              key: 'Mod-Enter',
              run: () => {
                checkPractice(container);
                return true;
              }
            }
          ])
        ),
        EditorView.updateListener.of((update) => {
          if (container._suppressPracticeSave) {
            container._suppressPracticeSave = false;
            return;
          }
          if (!update.docChanged) return;
          setStatus(container, 'сохраняю…', 'saved');
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            saveDraft(lessonId, update.state.doc.toString());
            if (!container.classList.contains('is-solved')) {
              setStatus(container, 'сохранено', 'saved');
            }
          }, 350);
        })
      ]
    }),
    parent: mount
  });

  container._practiceView = view;
  view.requestMeasure();
  window.addEventListener('load', () => view.requestMeasure(), { once: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => view.requestMeasure()).catch(() => {});
  }
  return view;
}

function markSolved(container, lessonId, solved) {
  container.classList.toggle('is-solved', solved);
  if (solved) {
    setStatus(container, 'решено', 'solved');
  } else {
    setStatus(container, 'черновик');
  }
}

function resetPractice(container) {
  const lessonId = container.getAttribute('data-lesson-id');
  const starter = parseScript(container, '[data-practice-starter]', '');
  const input = container.querySelector('[data-practice-input]');
  const view = container._practiceView;
  if (!lessonId || !starter) return;
  if (!window.confirm('Сбросить черновик и вернуть стартовый код?')) return;

  removeDraft(lessonId);
  setSolved(lessonId, false);
  if (view) {
    container._suppressPracticeSave = true;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: starter }
    });
  } else if (input) {
    input.value = starter;
  }
  removeDraft(lessonId);
  markSolved(container, lessonId, false);
  setFeedback(container, 'Черновик сброшен. Можно начать заново.', 'warn');
}

function checkPractice(container) {
  const lessonId = container.getAttribute('data-lesson-id');
  const mode = container.getAttribute('data-mode') || 'code';
  const view = container._practiceView;
  const input = container.querySelector('[data-practice-input]');
  const code = view ? view.state.doc.toString() : input?.value;
  if (!lessonId || typeof code !== 'string') return;
  const rules = parseScript(container, '[data-practice-rules]', {});
  const solution = parseScript(container, '[data-practice-solution]', '');

  saveDraft(lessonId, code);

  if (mode === 'text') {
    const result = checkText(code, rules);
    if (!result.ok) {
      setFeedback(container, result.errors.join('\n'), 'error');
      setStatus(container, 'есть замечания', '');
      return;
    }
    setSolved(lessonId, true);
    markSolved(container, lessonId, true);
    const message = (rules.keywords ?? []).length
      ? 'Ответ засчитан. Сравни его с ожидаемым результатом.'
      : 'Ответ сохранён. Это открытый вопрос — главное, чтобы ты сформулировал его своими словами.';
    setFeedback(container, message, 'ok');
    return;
  }

  const result = checkCode(code, solution, rules);
  if (!result.ok) {
    setFeedback(container, result.errors.join('\n'), 'error');
    setStatus(container, 'есть замечания');
    return;
  }

  setSolved(lessonId, true);
  markSolved(container, lessonId, true);
  const warning = result.warnings?.length ? ` ${result.warnings.join(' ')}` : '';
  setFeedback(container, `Похоже на решение!${warning} Проверь вывод и отметь урок пройденным.`, 'ok');
}

function initPractice(container) {
  if (container.dataset.practiceReady === 'true') return;
  container.dataset.practiceReady = 'true';
  const lessonId = container.getAttribute('data-lesson-id');
  const mode = container.getAttribute('data-mode') || 'code';
  if (!lessonId) return;

  const drafts = readDrafts();
  const hasDraft = typeof drafts[lessonId] === 'string';
  const starter = parseScript(container, '[data-practice-starter]', '');
  const solved = readSolved().includes(lessonId);

  markSolved(container, lessonId, solved);
  if (!solved) {
    setStatus(container, hasDraft ? 'сохранено' : 'черновик', hasDraft ? 'saved' : '');
  }

  if (mode === 'text') {
    const input = container.querySelector('[data-practice-input]');
    if (!input) return;
    input.value = hasDraft ? drafts[lessonId] : starter || input.defaultValue;

    let timer = null;
    input.addEventListener('input', () => {
      setStatus(container, 'сохраняю…', 'saved');
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        saveDraft(lessonId, input.value);
        if (!container.classList.contains('is-solved')) {
          setStatus(container, 'сохранено', 'saved');
        }
      }, 350);
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        checkPractice(container);
      }
    });
    return;
  }

  createCodeEditor(container, lessonId, hasDraft ? drafts[lessonId] : starter);
}

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const container = target.closest('[data-practice]');
  if (!container) return;
  if (target.closest('[data-practice-check]')) {
    event.preventDefault();
    checkPractice(container);
  } else if (target.closest('[data-practice-reset]')) {
    event.preventDefault();
    resetPractice(container);
  }
});

function initAllPractice() {
  document.querySelectorAll('[data-practice]').forEach(initPractice);
}

document.addEventListener('DOMContentLoaded', initAllPractice);
document.addEventListener('astro:page-load', initAllPractice);
initAllPractice();
