import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src', 'main', 'java', 'org', 'baileyseyes');
const OUT = path.join(ROOT, 'site', 'src', 'data', 'generated.json');
const COURSE = path.join(ROOT, 'site', 'src', 'data', 'course.mjs');
const CHECK = process.argv.includes('--check');

const { lessons, extras } = await import(pathToFileURL(COURSE).href);

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

/* ---------- чтение и разбор Java ---------- */

function clean(text) {
  let out = '';
  let i = 0;
  let mode = 'code';
  while (i < text.length) {
    const c = text[i];
    const d = text[i + 1];
    if (mode === 'code') {
      if (c === '/' && d === '/') { mode = 'line'; out += '  '; i += 2; continue; }
      if (c === '/' && d === '*') { mode = 'block'; out += '  '; i += 2; continue; }
      if (c === '"') { mode = 'str'; out += ' '; i++; continue; }
      if (c === "'") { mode = 'char'; out += ' '; i++; continue; }
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
    if (mode === 'str' || mode === 'char') {
      if (c === '\\') { out += '  '; i += 2; continue; }
      if ((mode === 'str' && c === '"') || (mode === 'char' && c === "'")) { mode = 'code'; out += ' '; i++; continue; }
      out += c === '\n' ? '\n' : ' ';
      i++; continue;
    }
  }
  return out;
}

function lineStarts(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') starts.push(i + 1);
  return starts;
}

function offsetToLine(starts, offset) {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (starts[mid] <= offset) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

function findClosingBrace(text, open) {
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function javadocStart(rawLines, signatureLine) {
  let i = signatureLine - 1;
  while (i >= 0 && rawLines[i].trim() === '') i--;
  if (i >= 0 && rawLines[i].trim().endsWith('*/')) {
    for (let j = i; j >= 0; j--) {
      if (rawLines[j].trim().startsWith('/**')) return j;
    }
  }
  return signatureLine;
}

const TYPE_RE = /(?<![@\w])(class|interface|enum|record)\s+([A-Za-z_$][\w$]*)|@interface\s+([A-Za-z_$][\w$]*)/g;
const METHOD_RE =
  /(^|\n)([ \t]*(?:@[\w.]+(?:\([^)]*\))?[ \t]*\n[ \t]*)*)((?:(?:public|protected|private|static|final|abstract|synchronized|native|default|strictfp)\s+)*)(?:<[^>{}]+>\s*)?([A-Za-z_$][\w$<>\[\],.? ]*?)\s+([A-Za-z_$][\w$]*)\s*\(([^;{}]*)\)\s*(?:throws\s+[^{]+)?\{/g;
const METHOD_KEYWORDS = new Set([
  'if', 'for', 'while', 'switch', 'catch', 'try', 'do', 'else', 'return', 'new', 'synchronized'
]);

function parseJava(filePath, relPath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/\r\n?/g, '\n');
  const rawLines = raw.split('\n');
  const cleanText = clean(raw);
  const starts = lineStarts(raw);
  const types = [];
  const methods = [];
  let match;

  TYPE_RE.lastIndex = 0;
  while ((match = TYPE_RE.exec(cleanText)) !== null) {
    const rawKind = match[1] ?? 'annotation';
    const name = match[2] ?? match[3];
    const brace = cleanText.indexOf('{', match.index);
    if (brace < 0) continue;
    const end = findClosingBrace(cleanText, brace);
    if (end < 0) continue;
    const signatureLine = offsetToLine(starts, match.index);
    types.push({
      kind: rawKind === '@interface' ? 'annotation' : rawKind,
      name,
      start: javadocStart(rawLines, signatureLine) + 1,
      end: offsetToLine(starts, end) + 1
    });
  }

  METHOD_RE.lastIndex = 0;
  while ((match = METHOD_RE.exec(cleanText)) !== null) {
    const name = match[5];
    if (METHOD_KEYWORDS.has(name)) continue;
    const brace = cleanText.indexOf('{', match.index + match[0].length - 1);
    if (brace < 0) continue;
    const end = findClosingBrace(cleanText, brace);
    if (end < 0) continue;
    const signatureLine = offsetToLine(starts, match.index + (match[1] ? 1 : 0));
    const signature = rawLines[signatureLine].trim();
    methods.push({
      name,
      start: javadocStart(rawLines, signatureLine) + 1,
      end: offsetToLine(starts, end) + 1,
      signature,
      isMain: name === 'main' && /\bstatic\b/.test(signature)
    });
  }

  const todos = rawLines
    .map((line, index) => ({ line: index + 1, text: line.trim() }))
    .filter(({ text }) => /\/\/\s*TODO|\/\*\s*TODO|^\*\s*TODO/i.test(text));

  return {
    path: relPath,
    package: (/^\s*package\s+([\w.]+)\s*;/m.exec(raw) ?? [])[1] ?? '',
    lines: rawLines.length,
    code: raw.replace(/\s+$/, ''),
    types,
    methods,
    todos,
    hasMain: methods.some((method) => method.isMain)
  };
}

/* ---------- сбор файлов ---------- */

const files = {};
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.java')) {
      const rel = path.relative(SRC, full).split(path.sep).join('/');
      files[rel] = parseJava(full, rel);
    }
  }
}
walk(SRC);

const sortedFiles = Object.fromEntries(
  Object.entries(files).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
);

/* ---------- проверка ссылок уроков ---------- */

function resolveFocus(file, focus, lessonId) {
  if (focus.full) return { start: 1, end: file.lines };
  if (focus.lines) {
    const [start, end] = focus.lines;
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end > file.lines) {
      fail(`Урок ${lessonId}: неверный диапазон строк ${start}-${end} в ${file.path} (всего ${file.lines})`);
    }
    return { start, end };
  }
  if (focus.method) {
    const candidates = file.methods.filter(
      (method) => method.name === focus.method && (!focus.match || method.signature.includes(focus.match))
    );
    if (!candidates.length) {
      fail(`Урок ${lessonId}: метод ${focus.method}${focus.match ? ` (${focus.match})` : ''} не найден в ${file.path}`);
    }
    if (candidates.length > 1 && !focus.match) {
      fail(
        `Урок ${lessonId}: метод ${focus.method} перегружен в ${file.path} (${candidates
          .map((method) => method.start)
          .join(', ')}). Укажите focus.match.`
      );
    }
    return { start: candidates[0].start, end: candidates[0].end };
  }
  if (focus.symbol) {
    const type = file.types.find((candidate) => candidate.name === focus.symbol);
    if (!type) fail(`Урок ${lessonId}: тип ${focus.symbol} не найден в ${file.path}`);
    return { start: type.start, end: type.end };
  }
  fail(`Урок ${lessonId}: focus в ${file.path} не содержит method, symbol, lines или full`);
}

const usedFiles = new Set();
const lessonChecks = [];

for (const lesson of lessons) {
  for (const source of lesson.sources) {
    const file = files[source.file];
    if (!file) fail(`Урок ${lesson.id}: файл ${source.file} не найден`);
    usedFiles.add(source.file);
    for (const focus of source.focus ?? []) {
      const range = resolveFocus(file, focus, lesson.id);
      lessonChecks.push({ lesson: lesson.id, file: source.file, ...range });
    }
  }
  for (const fqcn of lesson.runs ?? []) {
    const rel = `${fqcn.replace(/^org\.baileyseyes\./, '').split('.').join('/')}.java`;
    if (!files[rel]) fail(`Урок ${lesson.id}: run-класс ${fqcn} не найден (${rel})`);
    if (!files[rel].hasMain) fail(`Урок ${lesson.id}: в ${rel} нет main`);
  }
}

for (const extra of extras) {
  const file = files[extra.file];
  if (!file) fail(`Дополнение ${extra.id}: файл ${extra.file} не найден`);
  usedFiles.add(extra.file);
  for (const focus of extra.focus ?? []) {
    const range = resolveFocus(file, focus, `extra:${extra.id}`);
    lessonChecks.push({ lesson: `extra:${extra.id}`, file: extra.file, ...range });
  }
}

/* ---------- запись ---------- */

const payload = {
  stats: {
    files: Object.keys(sortedFiles).length,
    lines: Object.values(sortedFiles).reduce((sum, file) => sum + file.lines, 0),
    methods: Object.values(sortedFiles).reduce((sum, file) => sum + file.methods.length, 0),
    lessons: lessons.length,
    extras: extras.length,
    usedFiles: usedFiles.size
  },
  files: sortedFiles
};

const json = `${JSON.stringify(payload, null, 2)}\n`;

if (CHECK) {
  if (!fs.existsSync(OUT)) fail(`Нет ${path.relative(ROOT, OUT)}. Запустите npm run sync.`);
  const current = fs.readFileSync(OUT, 'utf8');
  if (current !== json) {
    fail(
      `Данные курса устарели: ${path.relative(ROOT, OUT)} отличается от исходников. Запустите npm run sync и закоммитьте изменения.`
    );
  }
  console.log(`✓ generated.json актуален (${payload.stats.files} файлов, ${payload.stats.lessons} уроков, ${payload.stats.extras} дополнений)`);
  process.exit(0);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, json, 'utf8');

console.log(`✓ ${path.relative(ROOT, OUT)}`);
console.log(
  `  файлов: ${payload.stats.files}, строк: ${payload.stats.lines}, методов: ${payload.stats.methods}, уроков: ${payload.stats.lessons}, дополнений: ${payload.stats.extras}, использовано файлов: ${payload.stats.usedFiles}`
);
console.log(`  проверено focus-диапазонов: ${lessonChecks.length}`);
