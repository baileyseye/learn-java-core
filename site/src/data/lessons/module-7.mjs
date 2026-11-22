export default [
  {
    id: 'optional-and-friends',
    title: 'Optional, Predicate, Comparator',
    summary: 'Современные инструменты Core: null-safe значения, функции и сравнение.',
    minutes: 13,
    goal:
      'Познакомиться с Optional, функциональными интерфейсами и Comparator — тем, на чём держится идиоматичный Java-код.',
    ideas: [
      '`Optional<T>` явно говорит «значения может не быть» и убирает часть null-проверок.',
      '`Predicate<T>` — функция, возвращающая boolean. `Function<T,R>` преобразует T в R, `Consumer<T>` принимает значение без результата.',
      '`Comparator` описывает порядок сравнения. `Comparator.comparing` собирает компаратор из ключа.',
      '`java.time` (LocalDate, LocalDateTime, Duration) заменяет старые Date/Calendar в новом коде.'
    ],
    sources: [
      {
        file: '_7/Else.java',
        focus: [
          { method: 'demonstrateOptional', note: 'Optional.of, ofNullable, orElse, map и ifPresent.' },
          { method: 'demonstratePredicate', note: 'Predicate как объект-функция.' },
          { method: 'demonstrateComparator', note: 'Comparator.comparing и цепочки thenComparing.' },
          { method: 'demonstrateDateTime', note: 'LocalDate, LocalDateTime и Duration.' },
          { method: 'main', note: 'Все темы вместе.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._7.Else'],
    practice: {
      task: 'Дан список имён. Найди первое имя длиннее четырёх символов через Optional, а затем отсортируй имена по длине через Comparator.',
      hint: '`names.stream().filter(n -> n.length() > 4).findFirst()` и `Comparator.comparingInt(String::length)`.',
      solution:
        'List<String> names = List.of("Ann", "Alice", "Bob", "Christopher");\nOptional<String> longName = names.stream()\n        .filter(n -> n.length() > 4)\n        .findFirst();\nlongName.ifPresent(System.out::println);\n\nnames.stream()\n        .sorted(Comparator.comparingInt(String::length))\n        .forEach(System.out::println);'
    },
    quiz: [
      {
        q: 'Зачем нужен Optional?',
        options: ['Чтобы ускорить код', 'Чтобы явно выразить возможное отсутствие значения', 'Чтобы заменить все коллекции', 'Чтобы сделать поле изменяемым'],
        answer: 1,
        explain: 'Optional — контейнер, который делает отсутствие значения частью типа.'
      },
      {
        q: 'Что делает Comparator.comparing(String::length)?',
        options: ['Сравнивает строки по алфавиту', 'Создаёт компаратор по длине строки', 'Удаляет дубликаты', 'Преобразует строку в число'],
        answer: 1,
        explain: 'comparing извлекает ключ сравнения и строит по нему компаратор.'
      }
    ]
  },
  {
    id: 'stream-api',
    title: 'Stream API',
    summary: 'Конвейеры обработки данных: filter, map, flatMap, collect и groupingBy.',
    minutes: 16,
    goal:
      'Научиться читать и писать конвейеры Stream API, понимать ленивость и выбирать подходящие терминальные операции.',
    ideas: [
      'Поток состоит из источника, промежуточных операций и терминальной операции. Без терминальной ничего не выполняется.',
      '`filter`, `map`, `flatMap`, `sorted`, `distinct` — промежуточные и ленивые. `collect`, `forEach`, `count`, `reduce` — терминальные.',
      '`collect(Collectors.toList())`, `groupingBy`, `partitioningBy` и `joining` закрывают большинство задач агрегации.',
      'Поток нельзя переиспользовать после терминальной операции. Для параллелизма есть `parallelStream`, но он полезен не всегда.'
    ],
    sources: [
      {
        file: '_7/StreamAPI.java',
        focus: [
          { method: 'demonstrateStreamCreation', note: 'Источники потока: коллекции, массивы, значения.' },
          { method: 'demonstrateFilter', note: 'filter оставляет подходящие элементы.' },
          { method: 'demonstrateMap', note: 'map преобразует каждый элемент.' },
          { method: 'demonstrateCollect', note: 'Терминальная операция collect.' },
          { method: 'demonstrateGroupingBy', note: 'Группировка по ключу.' },
          { method: 'main', note: 'Все операции вместе.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._7.StreamAPI'],
    practice: {
      task: 'Из списка имён оставь имена длиннее четырёх символов, переведи их в верхний регистр, отсортируй и собери в List. Затем сгруппируй имена по первой букве.',
      hint: 'Цепочка: `stream().filter(...).map(String::toUpperCase).sorted().collect(Collectors.toList())`. Для группировки — `collect(Collectors.groupingBy(name -> name.charAt(0)))`.',
      solution:
        'List<String> names = List.of("alice", "bob", "christopher", "anna", "diana");\nList<String> result = names.stream()\n        .filter(n -> n.length() > 4)\n        .map(String::toUpperCase)\n        .sorted()\n        .collect(Collectors.toList());\nSystem.out.println(result);\n\nMap<Character, List<String>> byFirst = names.stream()\n        .collect(Collectors.groupingBy(n -> n.charAt(0)));\nSystem.out.println(byFirst);'
    },
    quiz: [
      {
        q: 'Когда выполняется промежуточная операция stream?',
        options: ['Сразу при вызове', 'Только при вызове терминальной операции', 'При создании потока', 'Никогда'],
        answer: 1,
        explain: 'Промежуточные операции ленивы и запускаются только терминальной операцией.'
      },
      {
        q: 'Какая операция является терминальной?',
        options: ['filter', 'map', 'collect', 'sorted'],
        answer: 2,
        explain: '`collect` завершает поток и возвращает результат; остальные — промежуточные.'
      },
      {
        q: 'Что делает groupingBy?',
        options: ['Удаляет дубликаты', 'Группирует элементы по ключу', 'Сортирует по убыванию', 'Превращает поток в массив'],
        answer: 1,
        explain: 'Collectors.groupingBy строит Map, где ключ — результат классификатора.'
      }
    ]
  }
];
