export default [
  {
    id: 'collections-overview',
    title: 'Карта коллекций',
    summary: 'List, Set, Map и Queue: чем отличаются и как выбрать нужную.',
    minutes: 8,
    goal:
      'Запомнить четыре семейства коллекций и критерии выбора: порядок, уникальность, ключи, очередь.',
    ideas: [
      '`List` — упорядоченный список с доступом по индексу. Дубликаты разрешены.',
      '`Set` — множество уникальных элементов. Порядок зависит от реализации.',
      '`Map` — отображение ключ → значение. Ключи уникальны.',
      '`Queue`/`Deque` — очередь и двусторонняя очередь для задач, обходов и стеков.'
    ],
    sources: [
      {
        file: '_5/__start_from_here__/HelloCollections.java',
        focus: [{ full: true, note: 'Точка входа в модуль. Дальше — List, Set, Map и дополнительные Queue/Deque.' }]
      }
    ],
    practice: {
      task: 'Выбери коллекцию для: 1) телефонной книги имя → номер; 2) списка тегов без дубликатов; 3) истории просмотров с порядком; 4) очереди задач на печать.',
      hint: 'Ключи — Map, уникальность — Set, порядок и индексы — List, FIFO — Queue.',
      solution:
        '1) Map<String, String>\n2) Set<String>\n3) List<String>\n4) Queue<String> (например, ArrayDeque)'
    },
    quiz: [
      {
        q: 'В какой коллекции не может быть дубликатов?',
        options: ['List', 'Set', 'Queue', 'Массив'],
        answer: 1,
        explain: 'Set хранит уникальные элементы; повторное добавление не меняет множество.'
      },
      {
        q: 'Что хранит Map?',
        options: ['Только значения', 'Пары ключ → значение', 'Только уникальные числа', 'Очередь элементов'],
        answer: 1,
        explain: 'Map — отображение уникальных ключей на значения.'
      }
    ]
  },
  {
    id: 'list',
    title: 'List и ArrayList',
    summary: 'Динамический массив, основные операции, итерация и сортировка.',
    minutes: 12,
    goal:
      'Научиться уверенно работать с List и понимать, когда ArrayList хорош, а когда лучше выбрать другую структуру.',
    ideas: [
      '`ArrayList` внутри — массив, который умеет расти. Доступ по индексу быстрый, вставка в середину — дорогая.',
      'Основные методы: `add`, `get`, `set`, `remove`, `size`, `contains`, `indexOf`.',
      'Удалять элементы во время for-each нельзя — используйте `Iterator.remove` или `removeIf`.',
      '`List.of` создаёт неизменяемый список, а `Collections.unmodifiableList` — обёртку только для чтения.'
    ],
    sources: [
      {
        file: '_5/list/CollectionList.java',
        focus: [
          { method: 'demonstrateBasics', note: 'Создание, добавление, доступ по индексу и размер.' },
          { method: 'demonstrateMethods', note: 'Основные методы List.' },
          { method: 'demonstrateIterator', note: 'Безопасное удаление во время обхода.' },
          { method: 'demonstrateSorting', note: 'Сортировка и компараторы.' },
          { method: 'main', note: 'Все сценарии вместе.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._5.list.CollectionList'],
    practice: {
      task: 'Создай список имён, отсортируй его и удали все имена длиннее пяти символов через `removeIf`. Выведи результат.',
      hint: '`names.sort(Comparator.naturalOrder())` и `names.removeIf(name -> name.length() > 5)`.',
      solution:
        'List<String> names = new ArrayList<>(List.of("Alice", "Bob", "Christopher", "Diana"));\nnames.sort(Comparator.naturalOrder());\nnames.removeIf(name -> name.length() > 5);\nSystem.out.println(names);'
    },
    quiz: [
      {
        q: 'Почему удаление из ArrayList в середине дороже, чем из конца?',
        options: ['Из-за проверки типов', 'Приходится сдвигать следующие элементы', 'ArrayList нельзя изменять', 'Из-за сборки мусора'],
        answer: 1,
        explain: 'ArrayList хранит элементы в массиве; после удаления нужно сдвинуть хвост.'
      },
      {
        q: 'Что произойдёт, если удалять элементы из List внутри for-each?',
        options: ['Всё удалится корректно', 'Может возникнуть ConcurrentModificationException', 'Список очистится', 'Ничего не произойдёт'],
        answer: 1,
        explain: 'Итератор замечает структурное изменение и выбрасывает исключение. Используйте Iterator.remove или removeIf.'
      }
    ]
  },
  {
    id: 'set',
    title: 'Set: уникальность',
    summary: 'HashSet, LinkedHashSet, TreeSet и роль equals/hashCode.',
    minutes: 10,
    goal:
      'Понять, как Set обеспечивает уникальность и какую реализацию выбрать в зависимости от порядка.',
    ideas: [
      '`HashSet` не гарантирует порядок, `LinkedHashSet` сохраняет порядок вставки, `TreeSet` сортирует элементы.',
      'Уникальность определяется `equals` и `hashCode`. Если переопределили один — переопределите и второй.',
      '`add` возвращает false, если элемент уже есть. `contains` проверяет наличие.',
      'Для пользовательских классов без equals/hashCode Set будет сравнивать ссылки, а не содержимое.'
    ],
    sources: [
      {
        file: '_5/set/CollectionSet.java',
        focus: [
          { method: 'demonstrateBasics', note: 'Три реализации Set и их порядок.' },
          { method: 'demonstrateGettingValueWithContains', note: 'Проверка наличия и типичный сценарий с уникальностью.' },
          { method: 'main', note: 'Все сценарии вместе.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._5.set.CollectionSet'],
    practice: {
      task: 'Убери дубликаты из списка `["java", "sql", "java", "git", "sql"]`, сохранив порядок, и выведи результат.',
      hint: '`LinkedHashSet` сохраняет порядок первого появления.',
      solution:
        'List<String> values = List.of("java", "sql", "java", "git", "sql");\nSet<String> unique = new LinkedHashSet<>(values);\nSystem.out.println(unique); // [java, sql, git]'
    },
    quiz: [
      {
        q: 'Какой Set сохраняет порядок вставки?',
        options: ['HashSet', 'LinkedHashSet', 'TreeSet', 'Все сохраняют'],
        answer: 1,
        explain: 'LinkedHashSet поддерживает порядок вставки; TreeSet сортирует, HashSet не гарантирует порядок.'
      },
      {
        q: 'Что нужно переопределить, чтобы Set сравнивал объекты по содержимому?',
        options: ['toString и clone', 'equals и hashCode', 'compareTo и finalize', 'Только hashCode'],
        answer: 1,
        explain: 'HashSet использует hashCode для корзины и equals для проверки совпадения.'
      }
    ]
  },
  {
    id: 'map',
    title: 'Map: ключи и значения',
    summary: 'HashMap, entrySet, computeIfAbsent/merge и TreeMap.',
    minutes: 13,
    goal:
      'Освоить Map как основной инструмент для пар «ключ → значение» и научиться считать данные без ручных проверок на null.',
    ideas: [
      'Ключи Map уникальны. Повторный `put` с тем же ключом перезаписывает значение.',
      '`get` возвращает null, если ключа нет; `getOrDefault` позволяет задать значение по умолчанию.',
      '`entrySet()` даёт пары ключ-значение для обхода, `keySet()` — только ключи.',
      '`computeIfAbsent` и `merge` убирают boilerplate вида «если нет — создай, иначе добавь».'
    ],
    sources: [
      {
        file: '_5/map/CollectionMap.java',
        focus: [
          { method: 'demonstrateBasics', note: 'put, get, containsKey и размер.' },
          { method: 'demonstrateMethods', note: 'Основные операции Map.' },
          { method: 'demonstrateIteration', note: 'Обход через entrySet и keySet.' },
          { method: 'primitiveTricks', note: 'computeIfAbsent, merge и другие идиомы.' },
          { method: 'main', note: 'Все сценарии вместе.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._5.map.CollectionMap'],
    practice: {
      task: 'Посчитай частоту слов в строке `"java sql java git sql java"` с помощью Map и `merge`.',
      hint: '`map.merge(word, 1, Integer::sum)` увеличивает счётчик на 1.',
      solution:
        'String text = "java sql java git sql java";\nMap<String, Integer> freq = new HashMap<>();\nfor (String word : text.split(" ")) {\n    freq.merge(word, 1, Integer::sum);\n}\nSystem.out.println(freq); // {java=3, sql=2, git=1}'
    },
    quiz: [
      {
        q: 'Что произойдёт при повторном put с тем же ключом?',
        options: ['Появится второй элемент', 'Значение заменится', 'Будет исключение', 'Ключ станет null'],
        answer: 1,
        explain: 'Ключи уникальны, поэтому put перезаписывает значение.'
      },
      {
        q: 'Зачем нужен computeIfAbsent?',
        options: ['Для сортировки ключей', 'Чтобы создать значение, только если ключа ещё нет', 'Чтобы удалить ключ', 'Чтобы получить размер Map'],
        answer: 1,
        explain: 'Он объединяет проверку наличия и создание значения в одну операцию.'
      }
    ]
  }
];
