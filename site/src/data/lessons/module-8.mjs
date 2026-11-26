export default [
  {
    id: 'io-streams',
    title: 'Потоки ввода-вывода',
    summary: 'InputStream/OutputStream, Reader/Writer, буферы и try-with-resources.',
    minutes: 13,
    goal:
      'Понять, что поток — это канал данных, и научиться читать и писать байты и символы, не забывая закрывать ресурсы.',
    ideas: [
      'Поток — это последовательность данных. `InputStream` и `OutputStream` работают с байтами: файлы, картинки, сеть.',
      '`Reader` и `Writer` работают с символами и учитывают кодировку. `InputStreamReader` и `OutputStreamWriter` соединяют байты с символами.',
      '`Buffered...` обёртки уменьшают число обращений к источнику. Для текста всегда указывайте `StandardCharsets.UTF_8`.',
      '`try-with-resources` сам вызывает `close()` у `AutoCloseable`, даже если внутри блока произошла ошибка. Это самый безопасный способ работы с потоками.'
    ],
    sources: [
      {
        file: '_8/io/StreamsDemo.java',
        focus: [
          { method: 'demonstrateByteStreams', note: 'Байты: запись в память и чтение через InputStream.' },
          { method: 'demonstrateCharacterStreams', note: 'Символы и UTF-8: Writer, Reader и BufferedReader.' },
          { method: 'demonstrateTryWithResources', note: 'Несколько ресурсов в одном try и автоматическое закрытие.' },
          { symbol: 'Report', note: 'Свой ресурс: достаточно реализовать AutoCloseable.' },
          { method: 'main', note: 'Все три сценария в одном запуске.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._8.io.StreamsDemo'],
    practice: {
      task: 'Прочитай строку `"Java\\nIO"` как байты через `ByteArrayInputStream`, оберни в `BufferedReader` с UTF-8 и выведи обе строки с номерами.',
      hint: 'Цепочка выглядит так: `ByteArrayInputStream` → `InputStreamReader` с кодировкой → `BufferedReader`. Строки читайте в цикле через `readLine()`.',
      solution:
        'byte[] data = "Java\\nIO".getBytes(StandardCharsets.UTF_8);\ntry (BufferedReader reader = new BufferedReader(\n        new InputStreamReader(new ByteArrayInputStream(data), StandardCharsets.UTF_8))) {\n    String line;\n    int number = 1;\n    while ((line = reader.readLine()) != null) {\n        System.out.println(number++ + ": " + line);\n    }\n}'
    },
    quiz: [
      {
        q: 'Чем InputStream отличается от Reader?',
        options: [
          'InputStream читает байты, Reader — символы',
          'InputStream читает символы, Reader — байты',
          'Они полностью одинаковы',
          'Reader работает только с файлами'
        ],
        answer: 0,
        explain: 'Байтовые потоки работают с сырыми байтами, а Reader/Writer — с символами и кодировкой.'
      },
      {
        q: 'Что нужно, чтобы класс можно было использовать в try-with-resources?',
        options: ['Наследоваться от Thread', 'Реализовать AutoCloseable', 'Иметь метод main', 'Реализовать Serializable'],
        answer: 1,
        explain: 'try-with-resources вызывает `close()` у любого ресурса, реализующего `AutoCloseable`.'
      },
      {
        q: 'Зачем указывать StandardCharsets.UTF_8 при работе с текстом?',
        options: [
          'Чтобы файл занимал меньше места',
          'Чтобы кириллица и другие символы читались одинаково на любой машине',
          'Это обязательное требование компилятора',
          'Чтобы ускорить сборку мусора'
        ],
        answer: 1,
        explain: 'Кодировка по умолчанию зависит от системы. Явный UTF-8 делает результат предсказуемым.'
      }
    ]
  },
  {
    id: 'nio-files',
    title: 'Файлы и NIO: Path, Files, каналы',
    summary: 'Path, Files, FileChannel и ByteBuffer — современная работа с файлами.',
    minutes: 12,
    goal:
      'Научиться читать, писать и копировать файлы через Path и Files, а также понимать базовую идею канала и буфера в NIO.',
    ideas: [
      '`Path` — это путь к файлу или папке, а `Files` — набор готовых операций над ним.',
      'Для текста чаще всего достаточно `Files.writeString`, `Files.readString` и `Files.readAllLines`.',
      '`FileChannel` и `ByteBuffer` — низкоуровневый NIO. Данные читаются в буфер, а `flip()` переключает его с записи на чтение.',
      'Канал и поток `Files.walk` тоже ресурсы: закрывайте их через try-with-resources.'
    ],
    sources: [
      {
        file: '_8/io/NioFilesDemo.java',
        focus: [
          { method: 'demonstrateFiles', note: 'Запись, чтение, размер и копирование через Files.' },
          { method: 'demonstrateChannel', note: 'FileChannel + ByteBuffer: запись и чтение байтов.' },
          { method: 'demonstrateWalk', note: 'Обход директории потоком путей.' },
          { method: 'main', note: 'Временная директория и очистка после работы.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._8.io.NioFilesDemo'],
    practice: {
      task: 'Создай временный файл, запиши в него две строки через `Files.writeString`, прочитай через `Files.readAllLines` и выведи количество строк и их содержимое.',
      hint: 'Не забудьте кодировку `StandardCharsets.UTF_8` и удаление временного файла через `Files.deleteIfExists`.',
      solution:
        'Path file = Files.createTempFile("nio-", ".txt");\nFiles.writeString(file, "one\\ntwo", StandardCharsets.UTF_8);\nList<String> lines = Files.readAllLines(file, StandardCharsets.UTF_8);\nSystem.out.println("Строк: " + lines.size());\nfor (String line : lines) {\n    System.out.println(line);\n}\nFiles.deleteIfExists(file);'
    },
    quiz: [
      {
        q: 'Что делает Files.readAllLines?',
        options: ['Читает файл целиком в список строк', 'Удаляет все строки файла', 'Копирует файл', 'Создаёт директорию'],
        answer: 0,
        explain: '`readAllLines` читает текстовый файл и возвращает `List<String>`.'
      },
      {
        q: 'Зачем нужен flip() у ByteBuffer?',
        options: [
          'Переключает буфер с записи на чтение',
          'Увеличивает размер буфера',
          'Закрывает канал',
          'Меняет кодировку'
        ],
        answer: 0,
        explain: 'После записи `flip()` выставляет limit на текущую позицию и готовит буфер к чтению.'
      }
    ]
  },
  {
    id: 'reflection-annotations',
    title: 'Рефлексия и свои аннотации',
    summary: 'Как исследовать класс во время выполнения и читать собственные аннотации.',
    minutes: 12,
    goal:
      'Понять, зачем нужна рефлексия, как прочитать поля, методы и аннотации класса во время выполнения и почему на этом строятся фреймворки.',
    ideas: [
      'Рефлексия позволяет программе исследовать классы во время выполнения: узнать поля, методы, конструкторы и аннотации.',
      'Точка входа — объект `Class`: `Book.class`, `getDeclaredFields()`, `getDeclaredMethod()`, `invoke()`.',
      '`private`-поля можно открыть через `setAccessible(true)`, но это ломает инкапсуляцию. В обычном коде так делать не стоит.',
      'Аннотация — это метаданные. Чтобы прочитать её через рефлексию, нужен `@Retention(RUNTIME)`. Именно так Spring и другие фреймворки находят свои классы и методы.'
    ],
    sources: [
      {
        file: '_8/reflection/ReflectionAnnotationsDemo.java',
        focus: [
          { symbol: 'Info', note: 'Своя аннотация: @Retention(RUNTIME) и @Target(TYPE).' },
          { method: 'demonstrateAnnotation', note: 'Чтение аннотации через getAnnotation.' },
          { method: 'demonstrateFields', note: 'Все поля класса, включая private, и их значения.' },
          { method: 'demonstrateMethods', note: 'Список методов и вызов метода по имени.' },
          { method: 'main', note: 'Все три сценария вместе.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._8.reflection.ReflectionAnnotationsDemo'],
    practice: {
      task: 'Объяви аннотацию `@Secret` с `@Retention(RUNTIME)` и `@Target(FIELD)`, поставь её над полем `token` класса `Config` и через рефлексию выведи имена только помеченных полей.',
      hint: 'Переберите `Config.class.getDeclaredFields()` и проверьте `field.isAnnotationPresent(Secret.class)`.',
      solution:
        '@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\n@interface Secret {\n}\n\nstatic class Config {\n    @Secret\n    private String token = "abc";\n\n    private int timeout = 30;\n}\n\nfor (Field field : Config.class.getDeclaredFields()) {\n    if (field.isAnnotationPresent(Secret.class)) {\n        System.out.println(field.getName());\n    }\n}'
    },
    quiz: [
      {
        q: 'Что даёт аннотации @Retention(RUNTIME)?',
        options: [
          'Аннотацию можно ставить на любой элемент',
          'Аннотация сохраняется в байткоде и доступна через рефлексию',
          'Аннотация удаляется после компиляции',
          'Аннотация становится методом класса'
        ],
        answer: 1,
        explain: 'Без RUNTIME аннотация не будет видна во время выполнения программы.'
      },
      {
        q: 'Что делает getDeclaredFields()?',
        options: [
          'Возвращает только public-поля',
          'Возвращает все поля класса, включая private',
          'Возвращает только статические поля',
          'Удаляет поля класса'
        ],
        answer: 1,
        explain: '`getDeclaredFields` возвращает объявленные поля, а не только публичные.'
      },
      {
        q: 'Почему рефлексию используют осторожно?',
        options: [
          'Она ломает инкапсуляцию и может работать медленнее обычного вызова',
          'Она доступна только в Java 8',
          'Она запрещена в Spring',
          'Она удаляет байткод'
        ],
        answer: 0,
        explain: 'Рефлексия обходит обычные правила доступа и добавляет накладные расходы.'
      }
    ]
  },
  {
    id: 'jvm-internals',
    title: 'Как устроена JVM',
    summary: 'Загрузка классов, heap и stack, сборка мусора и JIT — без глубокой теории.',
    minutes: 12,
    goal:
      'Собрать простую картину того, что происходит с программой после запуска: кто загружает классы, где живут объекты, что делают GC и JIT.',
    ideas: [
      'JVM загружает `.class`-файлы через `ClassLoader`: bootstrap → platform → application.',
      'Stack хранит кадры методов и локальные переменные, heap — объекты. Ссылка обычно лежит в stack, а сам объект — в heap.',
      'Сборщик мусора освобождает объекты, на которые больше нет ссылок. Молодое поколение собирается часто, старое — реже; конкретный алгоритм выбирает JVM.',
      'JIT компилирует «горячий» байткод в машинный код. `System.gc()` — только подсказка, а не команда.',
      'Размер heap задают флагами `-Xms` и `-Xmx`, но точные значения зависят от машины и настроек JVM.'
    ],
    sources: [
      {
        file: '_8/jvm/JvmInternalsDemo.java',
        focus: [
          { method: 'demonstrateClassLoading', note: 'Цепочка ClassLoader и bootstrap-загрузчик.' },
          { method: 'demonstrateMemory', note: 'Heap, процессоры и что находится вне heap.' },
          { method: 'demonstrateGarbageCollector', note: 'Объекты без ссылок и подсказка System.gc().' },
          { method: 'demonstrateJit', note: 'Горячий цикл, который компилирует JIT.' },
          { method: 'main', note: 'Все четыре темы в одном запуске.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._8.jvm.JvmInternalsDemo'],
    practice: {
      task: 'Выведи загрузчик класса `String` (у bootstrap-загрузчика он `null`) и максимальный размер heap в мегабайтах.',
      hint: 'Загрузчик — `String.class.getClassLoader()`. Размер heap — `Runtime.getRuntime().maxMemory() / 1024 / 1024`.',
      solution:
        'ClassLoader loader = String.class.getClassLoader();\nSystem.out.println("String loader: " + (loader == null ? "bootstrap" : loader.getName()));\nlong heapMaxMb = Runtime.getRuntime().maxMemory() / 1024 / 1024;\nSystem.out.println("Heap max, МБ: " + heapMaxMb);'
    },
    quiz: [
      {
        q: 'Где хранятся объекты, созданные через new?',
        options: ['В stack', 'В heap', 'В регистре процессора', 'В файле .class'],
        answer: 1,
        explain: 'Объекты живут в heap, а ссылки на них и локальные переменные — в stack.'
      },
      {
        q: 'Что делает сборщик мусора?',
        options: [
          'Удаляет объекты, на которые больше нет ссылок',
          'Удаляет неиспользуемые классы из исходников',
          'Закрывает открытые файлы',
          'Компилирует байткод в машинный код'
        ],
        answer: 0,
        explain: 'GC освобождает память объектов, до которых больше нельзя добраться.'
      },
      {
        q: 'Что такое JIT?',
        options: [
          'Компиляция горячего байткода в машинный код во время работы',
          'Проверка синтаксиса перед запуском',
          'Автоматическое закрытие ресурсов',
          'Сборка проекта Gradle'
        ],
        answer: 0,
        explain: 'JIT (Just-In-Time) компилятор ускоряет часто выполняемый код.'
      }
    ]
  }
];
