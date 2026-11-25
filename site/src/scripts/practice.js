import { EditorState, Prec } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine
} from '@codemirror/view';
import { history, historyKeymap, defaultKeymap, indentWithTab } from '@codemirror/commands';
import { java } from '@codemirror/lang-java';
import {
  bracketMatching,
  indentOnInput,
  indentUnit,
  HighlightStyle,
  syntaxHighlighting,
  syntaxTree
} from '@codemirror/language';
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  closeCompletion,
  snippetCompletion
} from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { tags } from '@lezer/highlight';

const DRAFT_KEY = 'ljc.practice.drafts.v1';
const SOLVED_KEY = 'ljc.practice.solved.v1';
const STEP_SOLVED_KEY = 'ljc.practice.steps.v1';

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
    border: '1px solid var(--course-border)',
    zIndex: 20
  },
  '.cm-tooltip-autocomplete': {
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)'
  },
  '.cm-tooltip-autocomplete > ul': {
    fontFamily: 'var(--sl-font-mono)',
    fontSize: '0.78rem',
    maxHeight: '17rem'
  },
  '.cm-tooltip-autocomplete > ul > li': {
    padding: '0.28rem 0.6rem',
    lineHeight: '1.4'
  },
  '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
    backgroundColor: 'color-mix(in srgb, var(--course-accent) 18%, transparent)',
    color: 'var(--course-ink)'
  },
  '.cm-completionLabel': {
    fontFamily: 'var(--sl-font-mono)'
  },
  '.cm-completionMatchedText': {
    color: 'var(--course-accent)',
    fontWeight: '600',
    textDecoration: 'none'
  },
  '.cm-completionDetail': {
    marginLeft: '0.6rem',
    color: 'var(--course-muted)',
    fontSize: '0.72rem'
  },
  '.cm-tooltip.cm-completionInfo': {
    padding: '0.65rem 0.8rem',
    fontSize: '0.76rem',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap'
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

// Подсказки — не «всё API Java», а небольшой учебный справочник по курсу.
// info объясняет конструкцию, а не просто подставляет слово.
const JAVA_STATEMENT_COMPLETIONS = [
  {
    label: 'System.out.println()',
    detail: 'печать с переводом строки',
    info: 'Печатает значение и переводит строку.\n\nПример: System.out.println("Привет");\n\nБез перевода строки — System.out.print(), с форматированием — System.out.printf().',
    apply: 'System.out.println(${});',
    match: ['sout', 'sysout', 'println'],
    boost: 30
  },
  {
    label: 'System.out.print()',
    detail: 'печать без перевода строки',
    info: 'Печатает значение и оставляет курсор на той же строке.\n\nПример: System.out.print("Итог: ");',
    apply: 'System.out.print(${});',
    match: ['print'],
    boost: 10
  },
  {
    label: 'System.out.printf()',
    detail: 'печать по формату',
    info: 'Печатает по шаблону: %s — строка, %d — целое, %f — дробное, %n — перевод строки.\n\nПример: System.out.printf("%s: %d%n", name, age);',
    apply: 'System.out.printf("${}%n", ${});',
    match: ['printf', 'format'],
    boost: 5
  },
  {
    label: 'public static void main',
    detail: 'точка входа программы',
    info: 'С этого метода начинается выполнение программы.\n\nВнутри — код, который нужно запустить.',
    apply: 'public static void main(String[] ${args}) {\n    ${}\n}',
    match: ['main', 'psvm'],
    boost: 25
  },
  {
    label: 'class',
    detail: 'объявление класса',
    info: 'Класс — шаблон для объектов.\n\nИмя класса пишется с большой буквы и совпадает с именем файла (для public class).',
    apply: 'class ${Name} {\n    ${}\n}',
    match: ['class']
  },
  {
    label: 'interface',
    detail: 'контракт без реализации',
    info: 'Интерфейс описывает, что умеет тип, но не как именно.\n\nКласс реализует его через implements и обязан переопределить методы.',
    apply: 'interface ${Name} {\n    ${}\n}',
    match: ['interface']
  },
  {
    label: 'record',
    detail: 'неизменяемый класс данных',
    info: 'record сам создаёт конструктор, геттеры, equals(), hashCode() и toString().\n\nПример: record Point(int x, int y) {}',
    apply: 'record ${Point}(int x, int y) {}',
    match: ['record']
  },
  {
    label: 'enum',
    detail: 'набор констант',
    info: 'enum — тип с фиксированным набором значений.\n\nПример: enum Day { MONDAY, TUESDAY }',
    apply: 'enum ${Color} {\n    RED, GREEN, BLUE\n}',
    match: ['enum']
  },
  {
    label: 'if',
    detail: 'ветвление по условию',
    info: 'Выполняет блок, только если условие истинно.\n\nПример: if (age >= 18) { ... }',
    apply: 'if (${condition}) {\n    ${}\n}',
    match: ['if'],
    boost: 15
  },
  {
    label: 'if / else',
    detail: 'две ветки',
    info: 'Одна ветка выполняется, если условие истинно, другая — если ложно.',
    apply: 'if (${condition}) {\n    ${}\n} else {\n    ${}\n}',
    match: ['else']
  },
  {
    label: 'for',
    detail: 'цикл со счётчиком',
    info: 'Классический цикл: начальное значение, условие, шаг.\n\nДля перебора коллекции удобнее for-each.',
    apply: 'for (int ${i} = 0; ${i} < ${length}; ${i}++) {\n    ${}\n}',
    match: ['for', 'loop']
  },
  {
    label: 'for-each',
    detail: 'перебор коллекции или массива',
    info: 'Проходит по каждому элементу коллекции или массива.\n\nПример: for (String name : names) { ... }',
    apply: 'for (${item} : ${items}) {\n    ${}\n}',
    match: ['foreach', 'each', 'for'],
    boost: 5
  },
  {
    label: 'while',
    detail: 'цикл с условием',
    info: 'Повторяет блок, пока условие истинно.\n\nСледи, чтобы условие когда-нибудь стало ложным — иначе цикл не закончится.',
    apply: 'while (${condition}) {\n    ${}\n}',
    match: ['while']
  },
  {
    label: 'do / while',
    detail: 'цикл с проверкой после тела',
    info: 'Тело выполнится хотя бы один раз, потому что условие проверяется в конце.',
    apply: 'do {\n    ${}\n} while (${condition});',
    match: ['do', 'while']
  },
  {
    label: 'switch',
    detail: 'выбор по значению',
    info: 'Стрелочный switch не проваливается в следующий case.\n\nПример:\nswitch (day) {\n    case SATURDAY, SUNDAY -> "выходной";\n    default -> "рабочий";\n}',
    apply: 'switch (${value}) {\n    case ${A} -> ${}\n    default -> ${}\n}',
    match: ['switch', 'case']
  },
  {
    label: 'try / catch',
    detail: 'обработка исключения',
    info: 'Код в try может бросить исключение, catch его перехватывает.\n\nЛови конкретный тип исключения, а не всё подряд.',
    apply: 'try {\n    ${}\n} catch (${exception} e) {\n    ${}\n}',
    match: ['try', 'catch']
  },
  {
    label: 'try-with-resources',
    detail: 'автозакрытие ресурса',
    info: 'Ресурс из заголовка try закроется автоматически, даже если внутри будет исключение.\n\nКласс ресурса должен реализовывать AutoCloseable.',
    apply: 'try (${resource} = ${factory}) {\n    ${}\n}',
    match: ['try', 'resources', 'autocloseable']
  },
  {
    label: 'throw new IllegalArgumentException()',
    detail: 'сигнал о неверном аргументе',
    info: 'Бросай исключение, когда метод получил значение, с которым не может работать.\n\nПример: if (age < 0) throw new IllegalArgumentException("age < 0");',
    apply: 'throw new IllegalArgumentException(${message});',
    match: ['throw', 'exception', 'illegalargument']
  },
  {
    label: 'String',
    detail: 'неизменяемая строка',
    info: 'Строки неизменяемы: каждый метод возвращает новую строку.\n\nСравнивай содержимое через equals(), а не через ==:\nname.equals("Аня")',
    match: ['string', 'str'],
    boost: 12
  },
  {
    label: 'StringBuilder',
    detail: 'изменяемая строка',
    info: 'Удобен для сборки строки в цикле — не создаёт новую строку на каждом шаге.\n\nПример:\nStringBuilder sb = new StringBuilder();\nsb.append("a").append("b");\nString s = sb.toString();',
    apply: 'new StringBuilder()',
    match: ['stringbuilder', 'builder'],
    boost: 5
  },
  {
    label: 'Integer',
    detail: 'обёртка над int',
    info: 'Хранит int там, где нужен объект: в коллекциях и дженериках.\n\nАвтоупаковка: Integer x = 42;',
    match: ['integer', 'int'],
    boost: 8
  },
  {
    label: 'Integer.parseInt()',
    detail: 'строка → int',
    info: 'Разбирает строку с целым числом.\n\nInteger.parseInt("42") → 42\nЕсли строка не число — NumberFormatException.',
    apply: 'Integer.parseInt(${});',
    match: ['parseint', 'parse'],
    boost: 10
  },
  {
    label: 'Double.parseDouble()',
    detail: 'строка → double',
    info: 'Разбирает строку с дробным числом, точку используй как разделитель.\n\nDouble.parseDouble("3.14") → 3.14',
    apply: 'Double.parseDouble(${});',
    match: ['parsedouble', 'parse']
  },
  {
    label: 'Arrays.toString()',
    detail: 'массив → строка',
    info: 'Печатает массив по-человечески.\n\nSystem.out.println(Arrays.toString(nums));\nДля ArrayList toString() уже работает сам.',
    apply: 'Arrays.toString(${});',
    match: ['arrays', 'tostring']
  },
  {
    label: 'Arrays.sort()',
    detail: 'сортировка массива',
    info: 'Сортирует массив на месте — исходный порядок меняется.\n\nArrays.sort(nums);',
    apply: 'Arrays.sort(${});',
    match: ['arrays', 'sort']
  },
  {
    label: 'Arrays.stream()',
    detail: 'массив → Stream',
    info: 'Превращает массив в поток, чтобы работать с filter/map/collect.\n\nArrays.stream(nums).filter(n -> n > 0).count();',
    apply: 'Arrays.stream(${});',
    match: ['arrays', 'stream']
  },
  {
    label: 'List.of()',
    detail: 'неизменяемый список',
    info: 'Создаёт готовый список, но add() и remove() выбросят UnsupportedOperationException.\n\nList.of("a", "b")',
    apply: 'List.of(${});',
    match: ['list', 'of'],
    boost: 10
  },
  {
    label: 'List',
    detail: 'упорядоченная коллекция',
    info: 'Хранит элементы по порядку и даёт доступ по индексу.\n\nЧастая реализация — ArrayList.\nСоздание: List<String> names = new ArrayList<>();',
    match: ['list', 'collection'],
    boost: 8
  },
  {
    label: 'ArrayList',
    detail: 'список на массиве',
    info: 'Быстрый доступ по индексу, вставка в середину дороже.\n\nnew ArrayList<>()\nМетоды: add(), get(), size(), remove().',
    apply: 'new ArrayList<>()',
    match: ['arraylist', 'list'],
    boost: 8
  },
  {
    label: 'LinkedList',
    detail: 'двусвязный список',
    info: 'Быстро добавляет и удаляет с краёв, доступ по индексу медленнее.\n\nnew LinkedList<>()',
    apply: 'new LinkedList<>()',
    match: ['linkedlist', 'list']
  },
  {
    label: 'Set',
    detail: 'коллекция без повторов',
    info: 'Хранит только уникальные элементы, порядок зависит от реализации.\n\nHashSet — без гарантий порядка, TreeSet — отсортированный.',
    match: ['set'],
    boost: 5
  },
  {
    label: 'HashSet',
    detail: 'множество на хеш-таблице',
    info: 'Уникальные элементы, порядок не гарантирован.\n\nnew HashSet<>()\nДобавление: set.add(value);',
    apply: 'new HashSet<>()',
    match: ['hashset', 'set'],
    boost: 5
  },
  {
    label: 'TreeSet',
    detail: 'отсортированное множество',
    info: 'Уникальные элементы в отсортированном порядке.\n\nnew TreeSet<>()',
    apply: 'new TreeSet<>()',
    match: ['treeset', 'set']
  },
  {
    label: 'Map.of()',
    detail: 'неизменяемая карта',
    info: 'Создаёт карту из пар ключ-значение, но put() выбросит исключение.\n\nMap.of("a", 1, "b", 2)',
    apply: 'Map.of(${});',
    match: ['map', 'of'],
    boost: 10
  },
  {
    label: 'Map',
    detail: 'ключ → значение',
    info: 'Хранит пары ключ-значение, ключи уникальны.\n\nЧастая реализация — HashMap.\nНет ключа — get() вернёт null (или используй getOrDefault()).',
    match: ['map', 'dictionary'],
    boost: 8
  },
  {
    label: 'HashMap',
    detail: 'карта на хеш-таблице',
    info: 'Быстрый поиск по ключу, порядок не гарантирован.\n\nnew HashMap<>()\nМетоды: put(), get(), containsKey(), remove().',
    apply: 'new HashMap<>()',
    match: ['hashmap', 'map'],
    boost: 8
  },
  {
    label: 'TreeMap',
    detail: 'карта с сортировкой по ключам',
    info: 'Ключи всегда отсортированы.\n\nnew TreeMap<>()',
    apply: 'new TreeMap<>()',
    match: ['treemap', 'map']
  },
  {
    label: 'Collections.sort()',
    detail: 'сортировка списка',
    info: 'Сортирует список на месте.\n\nCollections.sort(names);\nДля своей сортировки передай Comparator.',
    apply: 'Collections.sort(${});',
    match: ['collections', 'sort']
  },
  {
    label: 'Comparator.comparingInt()',
    detail: 'компаратор по числовому полю',
    info: 'Сортировка по числовому ключу без ручного compare().\n\nlist.sort(Comparator.comparingInt(Person::age));',
    apply: 'Comparator.comparingInt(${keyExtractor});',
    match: ['comparator', 'comparingint', 'sort']
  },
  {
    label: 'Optional',
    detail: 'значение может отсутствовать',
    info: 'Контейнер на 0 или 1 значение — вместо возврата null.\n\nOptional.ofNullable(value).orElse("по умолчанию")',
    match: ['optional', 'nullable'],
    boost: 5
  },
  {
    label: 'Optional.ofNullable()',
    detail: 'безопасно обернуть значение',
    info: 'Создаёт Optional: пустой для null и с значением для всего остального.\n\nOptional.ofNullable(name).orElse("Аноним");',
    apply: 'Optional.ofNullable(${});',
    match: ['ofnullable', 'optional']
  },
  {
    label: 'Collectors.groupingBy()',
    detail: 'группировка в Map',
    info: 'Собирает поток в Map по ключу.\n\nMap<String, List<Person>> byCity =\n    people.stream().collect(Collectors.groupingBy(Person::city));',
    apply: 'Collectors.groupingBy(${keyExtractor})',
    match: ['groupingby', 'collectors']
  },
  {
    label: 'Collectors.joining()',
    detail: 'склейка строк из потока',
    info: 'Собирает элементы потока в одну строку через разделитель.\n\nString line = names.stream().collect(Collectors.joining(", "));',
    apply: 'Collectors.joining(${delimiter})',
    match: ['joining', 'collectors']
  },
  {
    label: 'Thread',
    detail: 'поток выполнения',
    info: 'Отдельный поток, который выполняется параллельно с главным.\n\nnew Thread(task).start();',
    match: ['thread'],
    boost: 5
  },
  {
    label: 'new Thread()',
    detail: 'запустить задачу в новом потоке',
    info: 'Создаёт поток и сразу запускает его.\n\nnew Thread(() -> System.out.println("привет")).start();\n\nНе вызывай run() вместо start() — тогда код выполнится в текущем потоке.',
    apply: 'new Thread(${task}).start();',
    match: ['thread', 'start']
  },
  {
    label: 'Runnable',
    detail: 'задача без результата',
    info: 'Функциональный интерфейс с методом run().\n\nRunnable task = () -> System.out.println("работаю");',
    match: ['runnable', 'task']
  },
  {
    label: 'ExecutorService',
    detail: 'пул потоков',
    info: 'Управляет пулом потоков и очередью задач.\n\nExecutorService pool = Executors.newFixedThreadPool(2);\npool.submit(task);\npool.shutdown();',
    match: ['executor', 'executorservice', 'pool']
  },
  {
    label: 'Executors.newFixedThreadPool()',
    detail: 'пул с фиксированным числом потоков',
    info: 'Создаёт пул, который переиспользует потоки.\n\nExecutorService pool = Executors.newFixedThreadPool(4);\nНе забудь pool.shutdown() в конце.',
    apply: 'Executors.newFixedThreadPool(${threads});',
    match: ['executors', 'pool', 'threadpool']
  },
  {
    label: 'synchronized',
    detail: 'блокировка на объекте',
    info: 'Пропускает в блок только один поток за раз.\n\nsynchronized (lock) {\n    counter++;\n}',
    apply: 'synchronized (${lock}) {\n    ${}\n}',
    match: ['synchronized', 'lock']
  },
  {
    label: 'volatile',
    detail: 'видимость изменения между потоками',
    info: 'Гарантирует, что другой поток увидит новое значение переменной.\n\nvolatile boolean running = true;\nАтомарность операций (например, counter++) не обеспечивает.',
    match: ['volatile']
  },
  {
    label: '@Override',
    detail: 'проверка переопределения',
    info: 'Просит компилятор проверить, что метод действительно переопределяет метод родителя.\n\nЕсли опечатался в имени — будет ошибка компиляции.',
    match: ['override', 'annotation']
  },
  {
    label: 'var',
    detail: 'вывод типа локальной переменной',
    info: 'Компилятор сам выводит тип из правой части.\n\nvar names = new ArrayList<String>();\nПодходит только для локальных переменных, тип должен быть очевиден.',
    match: ['var', 'type']
  }
];

const JAVA_MEMBER_COMPLETIONS = [
  {
    label: 'println()',
    detail: 'System.out.println — с переводом строки',
    info: 'Печатает значение и переводит строку.\n\nSystem.out.println("Привет");\nБез перевода строки — print(), с форматом — printf().',
    apply: 'println(${})',
    boost: 22
  },
  {
    label: 'print()',
    detail: 'System.out.print — без перевода строки',
    info: 'Печатает значение и оставляет курсор на той же строке.\n\nSystem.out.print("Итог: ");',
    apply: 'print(${})',
    boost: 10
  },
  {
    label: 'printf()',
    detail: 'System.out.printf — печать по формату',
    info: 'Печатает по шаблону: %s — строка, %d — целое, %f — дробное, %n — перевод строки.\n\nSystem.out.printf("%s: %d%n", name, age);',
    apply: 'printf("${}%n", ${})',
    boost: 5
  },
  {
    label: 'parseInt()',
    detail: 'Integer.parseInt — строка → int',
    info: 'Разбирает строку с целым числом.\n\nInteger.parseInt("42") → 42\nЕсли строка не число — NumberFormatException.',
    apply: 'parseInt(${})',
    boost: 8
  },
  {
    label: 'parseDouble()',
    detail: 'Double.parseDouble — строка → double',
    info: 'Разбирает строку с дробным числом, разделитель — точка.\n\nDouble.parseDouble("3.14") → 3.14',
    apply: 'parseDouble(${})'
  },
  {
    label: 'of()',
    detail: 'фабричный метод коллекции',
    info: 'Создаёт готовую неизменяемую коллекцию или Optional.\n\nList.of("a", "b")\nSet.of(1, 2, 3)\nMap.of("a", 1)\nOptional.of(value)',
    apply: 'of(${})',
    boost: 4
  },
  {
    label: 'toString()',
    detail: 'представление объекта строкой',
    info: 'Возвращает строковое представление объекта.\n\nSystem.out.println(person); вызывает toString() неявно.',
    apply: 'toString()'
  },
  {
    label: 'start()',
    detail: 'запустить поток',
    info: 'Запускает новый поток. Не путай с run(): run() выполнит код в текущем потоке.\n\nthread.start();',
    apply: 'start()',
    boost: 5
  },
  {
    label: 'shutdown()',
    detail: 'остановить пул потоков',
    info: 'Пул перестаёт принимать новые задачи и завершает уже начатые.\n\npool.shutdown();',
    apply: 'shutdown()'
  },
  {
    label: 'submit()',
    detail: 'отправить задачу в пул',
    info: 'Отдаёт задачу ExecutorService и возвращает Future.\n\nFuture<Integer> result = pool.submit(task);',
    apply: 'submit(${})'
  },
  {
    label: 'stream()',
    detail: 'коллекция → Stream',
    info: 'Превращает коллекцию в поток для цепочки filter/map/collect.\n\nnames.stream().filter(n -> n.length() > 3).toList()',
    apply: 'stream()',
    boost: 20
  },
  {
    label: 'filter()',
    detail: 'оставить подходящие элементы',
    info: 'Оставляет элементы, для которых лямбда вернула true.\n\n.stream().filter(n -> n > 0)',
    apply: 'filter(${})',
    boost: 18
  },
  {
    label: 'map()',
    detail: 'преобразовать каждый элемент',
    info: 'Заменяет каждый элемент результатом лямбды.\n\n.map(String::toUpperCase)',
    apply: 'map(${})',
    boost: 18
  },
  {
    label: 'flatMap()',
    detail: 'развернуть вложенные коллекции',
    info: 'Превращает каждый элемент в поток и склеивает потоки в один.\n\n.flatMap(list -> list.stream())',
    apply: 'flatMap(${})'
  },
  {
    label: 'sorted()',
    detail: 'отсортировать поток',
    info: 'Сортирует элементы в естественном порядке или по Comparator.\n\n.sorted()\n.sorted(Comparator.comparingInt(Person::age))',
    apply: 'sorted()'
  },
  {
    label: 'distinct()',
    detail: 'убрать повторы',
    info: 'Оставляет только уникальные элементы.\n\n.stream().distinct()',
    apply: 'distinct()'
  },
  {
    label: 'limit()',
    detail: 'взять первые N элементов',
    info: 'Обрезает поток до указанного количества элементов.\n\n.limit(5)',
    apply: 'limit(${})'
  },
  {
    label: 'skip()',
    detail: 'пропустить первые N элементов',
    info: 'Пропускает указанное количество элементов в начале.\n\n.skip(2)',
    apply: 'skip(${})'
  },
  {
    label: 'count()',
    detail: 'количество элементов',
    info: 'Возвращает long — сколько элементов осталось в потоке.\n\n.stream().filter(n -> n > 0).count()',
    apply: 'count()'
  },
  {
    label: 'forEach()',
    detail: 'действие для каждого элемента',
    info: 'Выполняет действие для каждого элемента.\n\nnames.forEach(System.out::println);',
    apply: 'forEach(${})',
    boost: 8
  },
  {
    label: 'collect()',
    detail: 'собрать поток в коллекцию',
    info: 'Завершает цепочку и собирает результат.\n\n.collect(Collectors.toList())',
    apply: 'collect(${})',
    boost: 12
  },
  {
    label: 'toList()',
    detail: 'поток → неизменяемый список',
    info: 'Короткая замена collect(Collectors.toList()).\n\nnames.stream().map(String::trim).toList()',
    apply: 'toList()',
    boost: 10
  },
  {
    label: 'reduce()',
    detail: 'свернуть поток в одно значение',
    info: 'Сводит все элементы к одному: сумма, максимум, конкатенация.\n\n.stream().reduce(0, Integer::sum)',
    apply: 'reduce(${})'
  },
  {
    label: 'findFirst()',
    detail: 'первый элемент как Optional',
    info: 'Возвращает Optional с первым элементом.\n\nnames.stream().filter(n -> n.startsWith("А")).findFirst()',
    apply: 'findFirst()'
  },
  {
    label: 'orElse()',
    detail: 'значение по умолчанию',
    info: 'Возвращает значение из Optional или запасное, если он пуст.\n\noptional.orElse("не найдено")',
    apply: 'orElse(${})',
    boost: 8
  },
  {
    label: 'orElseThrow()',
    detail: 'исключение, если пусто',
    info: 'Возвращает значение или бросает исключение.\n\noptional.orElseThrow()',
    apply: 'orElseThrow()'
  },
  {
    label: 'ifPresent()',
    detail: 'действие, если значение есть',
    info: 'Выполняет действие только для непустого Optional.\n\noptional.ifPresent(System.out::println);',
    apply: 'ifPresent(${})'
  },
  {
    label: 'get()',
    detail: 'элемент по индексу или ключу',
    info: 'У List — элемент по индексу, у Map — значение по ключу.\n\nlist.get(0);\nmap.get("key");\nУ Optional get() лучше не использовать — есть orElse().',
    apply: 'get(${})',
    boost: 6
  },
  {
    label: 'put()',
    detail: 'добавить пару в Map',
    info: 'Кладёт значение по ключу, старое значение заменяется.\n\nmap.put("a", 1);',
    apply: 'put(${})',
    boost: 10
  },
  {
    label: 'add()',
    detail: 'добавить элемент',
    info: 'Добавляет элемент в конец списка или множество.\n\nlist.add("Аня");',
    apply: 'add(${})',
    boost: 10
  },
  {
    label: 'remove()',
    detail: 'удалить элемент',
    info: 'У List remove(int) удаляет по индексу, remove(Object) — по значению.\n\nlist.remove(0);\nlist.remove("Аня");',
    apply: 'remove(${})'
  },
  {
    label: 'containsKey()',
    detail: 'проверка ключа в Map',
    info: 'Возвращает true, если ключ есть в карте.\n\nif (map.containsKey("a")) { ... }',
    apply: 'containsKey(${})'
  },
  {
    label: 'size()',
    detail: 'количество элементов',
    info: 'Размер коллекции.\n\nУ массива — поле length, у строки — метод length().',
    apply: 'size()',
    boost: 10
  },
  {
    label: 'isEmpty()',
    detail: 'проверка на пустоту',
    info: 'true, если коллекция или строка пустая.\n\nВместо size() == 0 лучше isEmpty().',
    apply: 'isEmpty()',
    boost: 6
  },
  {
    label: 'length()',
    detail: 'длина строки',
    info: 'Возвращает количество символов в строке.\n\nУ массива длина — поле length (без скобок), у коллекции — метод size().',
    apply: 'length()',
    boost: 6
  },
  {
    label: 'charAt()',
    detail: 'символ по индексу',
    info: 'Индексы начинаются с 0.\n\n"Java".charAt(0) → J',
    apply: 'charAt(${})'
  },
  {
    label: 'substring()',
    detail: 'часть строки',
    info: 'Берёт подстроку с beginIndex включительно до endIndex не включая.\n\n"Java".substring(1, 3) → av',
    apply: 'substring(${})'
  },
  {
    label: 'split()',
    detail: 'разбить строку',
    info: 'Делит строку по регулярному выражению и возвращает массив.\n\n"a,b,c".split(",") → ["a", "b", "c"]',
    apply: 'split(${})'
  },
  {
    label: 'equals()',
    detail: 'сравнение содержимого',
    info: 'Сравнивает значения, а не ссылки.\n\nДля строк всегда используй equals(), а не ==.',
    apply: 'equals(${})',
    boost: 6
  },
  {
    label: 'equalsIgnoreCase()',
    detail: 'сравнение без учёта регистра',
    info: '"Java".equalsIgnoreCase("java") → true',
    apply: 'equalsIgnoreCase(${})'
  },
  {
    label: 'toUpperCase()',
    detail: 'в верхний регистр',
    info: 'Возвращает новую строку: исходная не меняется.\n\nname.toUpperCase()',
    apply: 'toUpperCase()'
  },
  {
    label: 'toLowerCase()',
    detail: 'в нижний регистр',
    info: 'Возвращает новую строку: исходная не меняется.\n\nname.toLowerCase()',
    apply: 'toLowerCase()'
  },
  {
    label: 'strip()',
    detail: 'убрать пробелы по краям',
    info: 'Возвращает строку без пробелов в начале и конце.\n\n"  hi  ".strip() → "hi"\nСтарый аналог — trim().',
    apply: 'strip()'
  },
  {
    label: 'append()',
    detail: 'добавить в StringBuilder',
    info: 'Добавляет текст в конец и возвращает тот же StringBuilder — можно строить цепочку.\n\nsb.append("a").append(1);',
    apply: 'append(${})',
    boost: 8
  },
  {
    label: 'compareTo()',
    detail: 'сравнение по порядку',
    info: 'Возвращает отрицательное число, 0 или положительное.\n\n"a".compareTo("b") < 0',
    apply: 'compareTo(${})'
  }
];

const COMPLETION_KEYWORDS = new Set([
  'public', 'private', 'protected', 'class', 'static', 'final', 'void', 'main', 'args',
  'String', 'new', 'int', 'long', 'double', 'float', 'char', 'boolean', 'byte', 'short',
  'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break',
  'continue', 'import', 'package', 'this', 'true', 'false', 'null', 'throws', 'throw',
  'try', 'catch', 'finally', 'extends', 'implements', 'interface', 'enum', 'record',
  'var', 'instanceof', 'super', 'abstract', 'synchronized', 'volatile', 'transient'
]);

function buildCompletionOption(item) {
  const base = {
    label: item.label,
    type: item.type ?? 'keyword',
    detail: item.detail,
    info: item.info,
    boost: item.boost ?? 0
  };
  return item.apply ? snippetCompletion(item.apply, base) : base;
}

const STATEMENT_OPTIONS = JAVA_STATEMENT_COMPLETIONS.map((item) => ({
  item,
  option: buildCompletionOption(item)
}));

const MEMBER_OPTIONS = JAVA_MEMBER_COMPLETIONS.map((item) => ({
  item,
  option: buildCompletionOption(item)
}));

function insideCommentOrString(state, pos) {
  let node = syntaxTree(state).resolveInner(pos, -1);
  while (node) {
    if (/comment|string|character|textblock/i.test(node.name)) return true;
    node = node.parent;
  }
  return false;
}

// Проверяем, встречаются ли символы шаблона в строке по порядку.
// Так подсказка переживает опечатки и пропущенные буквы: prnt → println.
function isSubsequence(text, pattern) {
  if (!pattern) return true;
  let index = 0;
  for (const char of text) {
    if (char === pattern[index]) index += 1;
    if (index === pattern.length) return true;
  }
  return false;
}

function javaPracticeCompletions(context) {
  const word = context.matchBefore(/[\w$.]*/);
  if (!word) return null;

  const prefix = word.text;
  const dot = prefix.lastIndexOf('.');
  const segment = dot >= 0 ? prefix.slice(dot + 1) : prefix;
  if (!context.explicit && segment.length < 2) return null;
  if (insideCommentOrString(context.state, context.pos)) return null;

  const lower = segment.toLowerCase();
  const pool = dot >= 0 ? MEMBER_OPTIONS : STATEMENT_OPTIONS;
  const from = dot >= 0 ? word.from + dot + 1 : word.from;
  const options = [];

  for (const { item, option } of pool) {
    if (!lower) {
      options.push(option);
      continue;
    }
    const label = item.label.toLowerCase();
    const names = [label, ...(item.match ?? []).map((name) => name.toLowerCase())];
    if (
      isSubsequence(label, lower) ||
      names.some((name) => name.startsWith(lower) || name.includes(lower))
    ) {
      options.push(option);
    }
  }

  if (!options.length) return null;
  return {
    from,
    options,
    validFor: /^[\w$.]*$/
  };
}

// Дополняет имена, которые ученик уже написал в этом же редакторе:
// это спасает от опечаток в собственных переменных, но не шумит чужими словами.
function documentWordCompletions(context) {
  const word = context.matchBefore(/[A-Za-z_$][\w$]*/);
  if (!word || word.text.length < 2) return null;
  if (insideCommentOrString(context.state, context.pos)) return null;

  const before = context.state.sliceDoc(Math.max(0, word.from - 1), word.from);
  if (before === '.') return null;

  const prefix = word.text.toLowerCase();
  const doc = context.state.doc.toString();
  const seen = new Set();
  const options = [];
  const identifier = /[A-Za-z_$][\w$]*/g;
  let match;

  while ((match = identifier.exec(doc))) {
    const value = match[0];
    if (value.length < 2 || value === word.text || seen.has(value)) continue;
    if (COMPLETION_KEYWORDS.has(value)) continue;
    if (!value.toLowerCase().startsWith(prefix)) continue;
    seen.add(value);
    options.push({ label: value, type: 'variable', detail: 'из твоего кода', boost: -40 });
  }

  if (!options.length) return null;
  return { from: word.from, options: options.slice(0, 15), validFor: /^[\w$]*$/ };
}

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

function readSolvedSteps() {
  const value = readJson(STEP_SOLVED_KEY, []);
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

function setStepSolved(stepId, solved) {
  const current = new Set(readSolvedSteps());
  if (solved) current.add(stepId);
  else current.delete(stepId);
  writeJson(STEP_SOLVED_KEY, [...current]);
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
  const checkable = stripComments(code);
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

async function createCodeEditor(container, draftKey, initial) {
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
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        EditorState.tabSize.of(4),
        indentUnit.of('    '),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion({
          override: [javaPracticeCompletions, documentWordCompletions],
          activateOnTyping: true,
          // Первый вариант сразу подсвечен, чтобы рядом показалось объяснение.
          selectOnOpen: true,
          icons: false,
          maxRenderedOptions: 20,
          closeOnBlur: true
        }),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        java(),
        practiceTheme,
        syntaxHighlighting(practiceHighlight),
        // Клик по коду начинает выделение мышкой — попап подсказок не должен мешать.
        EditorView.domEventHandlers({
          mousedown: (event, view) => {
            closeCompletion(view);
            return false;
          }
        }),
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
          const saveKey = container.getAttribute('data-practice-key') || draftKey;
          const saveStep = currentStep(container);
          timer = setTimeout(() => {
            saveDraft(saveKey, update.state.doc.toString());
            const solved = saveStep ? stepIsSolved(container, saveStep) : container.classList.contains('is-solved');
            if (!solved && currentStep(container) === saveStep) {
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

function currentStep(container) {
  return container._practiceSteps?.[container._practiceStepIndex] ?? null;
}

function currentCode(container) {
  const view = container._practiceView;
  const input = container.querySelector('[data-practice-input]');
  return view ? view.state.doc.toString() : input?.value;
}

function stepIsSolved(container, step) {
  if (!step) return false;
  if (step.isMain) {
    const lessonId = container.getAttribute('data-lesson-id');
    if (lessonId && readSolved().includes(lessonId)) return true;
  }
  return readSolvedSteps().includes(step.key);
}

function markStep(container, index, solved) {
  const button = container.querySelector(`[data-practice-step="${index}"]`);
  if (!button) return;
  button.classList.toggle('is-solved', solved);
  button.setAttribute('data-solved', solved ? 'true' : 'false');
  const mark = button.querySelector('[data-practice-step-mark]');
  if (mark) mark.textContent = solved ? '✓' : '';
}

function saveCurrentDraft(container, step = currentStep(container)) {
  if (!step) return;
  const code = currentCode(container);
  if (typeof code === 'string') saveDraft(step.key, code);
}

function updateStepView(container, step, index) {
  container.setAttribute('data-practice-key', step.key);
  container.setAttribute('data-practice-main', step.isMain ? 'true' : 'false');
  container.setAttribute('data-mode', step.mode);

  const task = container.querySelector('[data-practice-task]');
  if (task) task.innerHTML = step.taskHtml || '';

  const expectedBox = container.querySelector('[data-practice-expected]');
  const expectedCode = container.querySelector('[data-practice-expected-code]');
  if (expectedBox && expectedCode) {
    expectedCode.textContent = step.expected || '';
    expectedBox.hidden = !step.expected;
  }

  const hintBox = container.querySelector('[data-practice-hint-box]');
  const hint = container.querySelector('[data-practice-hint]');
  if (hintBox && hint) {
    hint.innerHTML = step.hintHtml || '';
    hintBox.hidden = !step.hintHtml;
    hintBox.open = false;
  }

  const solutionBox = container.querySelector('[data-practice-solution-box]');
  const solutionCode = container.querySelector('[data-practice-solution-code]');
  if (solutionBox && solutionCode) {
    solutionCode.textContent = step.solution || '';
    solutionBox.hidden = !step.solution;
    solutionBox.open = false;
  }

  container.querySelectorAll('[data-practice-step]').forEach((button, buttonIndex) => {
    button.setAttribute('aria-selected', String(buttonIndex === index));
  });
}

function loadStepDoc(container, step) {
  const drafts = readDrafts();
  const draft = typeof drafts[step.key] === 'string' ? drafts[step.key] : null;
  const doc = draft ?? step.starter;
  const view = container._practiceView;
  if (view) {
    container._suppressPracticeSave = true;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: doc } });
    view.requestMeasure();
  } else {
    const input = container.querySelector('[data-practice-input]');
    if (input) input.value = doc;
  }
}

function refreshStepStatus(container, step) {
  const index = container._practiceStepIndex;
  const solved = stepIsSolved(container, step);
  const lessonId = container.getAttribute('data-lesson-id');
  const drafts = readDrafts();
  const hasDraft = typeof drafts[step.key] === 'string';

  if (solved) {
    if (step.isMain) {
      setSolved(lessonId, true);
      markSolved(container, lessonId, true);
    } else {
      container.classList.remove('is-solved');
      setStatus(container, 'шаг решён', 'solved');
    }
  } else if (step.isMain) {
    container.classList.remove('is-solved');
    setStatus(container, hasDraft ? 'сохранено' : 'черновик', hasDraft ? 'saved' : '');
  } else {
    container.classList.remove('is-solved');
    setStatus(container, hasDraft ? 'сохранено' : 'черновик', hasDraft ? 'saved' : '');
  }

  markStep(container, index, solved);
}

function switchStep(container, index) {
  const steps = container._practiceSteps;
  if (!steps || index < 0 || index >= steps.length || index === container._practiceStepIndex) return;
  const previous = steps[container._practiceStepIndex];
  saveCurrentDraft(container, previous);
  container._practiceStepIndex = index;
  const step = steps[index];
  updateStepView(container, step, index);
  loadStepDoc(container, step);
  refreshStepStatus(container, step);
  setFeedback(container, '', '');
}

function resetPractice(container) {
  const lessonId = container.getAttribute('data-lesson-id');
  const step = currentStep(container);
  const key = step?.key ?? lessonId;
  const starter = step?.starter ?? parseScript(container, '[data-practice-starter]', '');
  const input = container.querySelector('[data-practice-input]');
  const view = container._practiceView;
  if (!key || !starter) return;
  if (!window.confirm('Сбросить черновик и вернуть стартовый код?')) return;

  removeDraft(key);
  if (step) {
    setStepSolved(step.key, false);
    markStep(container, container._practiceStepIndex, false);
    if (step.isMain) {
      setSolved(lessonId, false);
      markSolved(container, lessonId, false);
    } else {
      container.classList.remove('is-solved');
      setStatus(container, 'черновик');
    }
  } else {
    setSolved(lessonId, false);
    markSolved(container, lessonId, false);
  }

  if (view) {
    container._suppressPracticeSave = true;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: starter }
    });
  } else if (input) {
    input.value = starter;
  }
  removeDraft(key);
  setFeedback(container, 'Черновик сброшен. Можно начать заново.', 'warn');
}

function checkPractice(container) {
  const lessonId = container.getAttribute('data-lesson-id');
  const step = currentStep(container);
  const mode = step?.mode ?? (container.getAttribute('data-mode') || 'code');
  const code = currentCode(container);
  if (!lessonId || typeof code !== 'string') return;
  const rules = step?.check ?? parseScript(container, '[data-practice-rules]', {});
  const solution = step?.solution ?? parseScript(container, '[data-practice-solution]', '');
  const key = step?.key ?? lessonId;

  saveDraft(key, code);

  if (mode === 'text') {
    const result = checkText(code, rules);
    if (!result.ok) {
      setFeedback(container, result.errors.join('\n'), 'error');
      setStatus(container, 'есть замечания', '');
      return;
    }
    if (step) {
      setStepSolved(step.key, true);
      markStep(container, container._practiceStepIndex, true);
      if (step.isMain) {
        setSolved(lessonId, true);
        markSolved(container, lessonId, true);
      } else {
        container.classList.remove('is-solved');
        setStatus(container, 'шаг решён', 'solved');
      }
    } else {
      setSolved(lessonId, true);
      markSolved(container, lessonId, true);
    }
    const message = step && !step.isMain
      ? 'Шаг засчитан. Переходи к следующему шагу.'
      : (rules.keywords ?? []).length
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

  if (step) {
    setStepSolved(step.key, true);
    markStep(container, container._practiceStepIndex, true);
    if (step.isMain) {
      setSolved(lessonId, true);
      markSolved(container, lessonId, true);
    } else {
      container.classList.remove('is-solved');
      setStatus(container, 'шаг решён', 'solved');
    }
  } else {
    setSolved(lessonId, true);
    markSolved(container, lessonId, true);
  }

  const warning = result.warnings?.length ? ` ${result.warnings.join(' ')}` : '';
  const suffix = step && !step.isMain
    ? ' Переходи к следующему шагу.'
    : ' Проверь вывод и отметь урок пройденным.';
  setFeedback(container, `Похоже на решение!${warning}${suffix}`, 'ok');
}

function initStepPractice(container, steps) {
  const lessonId = container.getAttribute('data-lesson-id');
  const drafts = readDrafts();
  container._practiceSteps = steps;
  container._practiceStepIndex = 0;
  const step = steps[0];

  updateStepView(container, step, 0);
  steps.forEach((item, index) => {
    const solved = readSolvedSteps().includes(item.key) || (item.isMain && readSolved().includes(lessonId));
    markStep(container, index, solved);
  });
  refreshStepStatus(container, step);

  const hasDraft = typeof drafts[step.key] === 'string';
  const initial = hasDraft ? drafts[step.key] : step.starter;

  if (step.mode === 'text') {
    const input = container.querySelector('[data-practice-input]');
    if (!input) return;
    input.value = initial || input.defaultValue;

    let timer = null;
    input.addEventListener('input', () => {
      setStatus(container, 'сохраняю…', 'saved');
      if (timer) clearTimeout(timer);
      const saveStep = currentStep(container);
      timer = setTimeout(() => {
        if (saveStep) saveDraft(saveStep.key, input.value);
        const solved = saveStep ? stepIsSolved(container, saveStep) : container.classList.contains('is-solved');
        if (!solved && currentStep(container) === saveStep) {
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

  createCodeEditor(container, step.key, initial);
}

function initPractice(container) {
  if (container.dataset.practiceReady === 'true') return;
  container.dataset.practiceReady = 'true';
  const lessonId = container.getAttribute('data-lesson-id');
  const mode = container.getAttribute('data-mode') || 'code';
  if (!lessonId) return;

  const steps = parseScript(container, '[data-practice-steps]', null);
  if (Array.isArray(steps) && steps.length > 1) {
    initStepPractice(container, steps);
    return;
  }

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
  const stepButton = target.closest('[data-practice-step]');
  if (stepButton) {
    event.preventDefault();
    switchStep(container, Number(stepButton.getAttribute('data-practice-step')));
  } else if (target.closest('[data-practice-check]')) {
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
