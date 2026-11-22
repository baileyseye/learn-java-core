export default [
  {
    id: 'class-types-intro',
    title: 'Пять видов типов',
    summary: 'class, interface, enum, record и annotation — обзор и критерии выбора.',
    minutes: 6,
    goal:
      'Получить карту типов Java и понять, какой инструмент выбирать под задачу, а не использовать class на всё.',
    ideas: [
      '`class` — основной строительный блок: состояние и поведение.',
      '`interface` — контракт. Он говорит, что объект умеет, но не как именно.',
      '`enum` — фиксированный набор значений. Лучше строковых констант, потому что проверяется компилятором.',
      '`record` — компактный неизменяемый носитель данных. `annotation` — метаданные, которые читают компилятор или фреймворк.'
    ],
    sources: [
      {
        file: '_3/__start_from_here__/HelloJavaClassTypes.java',
        focus: [{ full: true, note: 'Точка входа в модуль: дальше разберём каждый вид типа по отдельности.' }]
      }
    ],
    practice: {
      task: 'Для каждой задачи выбери тип: 1) статус заказа из четырёх значений; 2) DTO с именем и возрастом; 3) умение летать; 4) обычный счётчик с изменяемым значением.',
      hint: 'Фиксированный набор — enum, данные без поведения — record, контракт — interface, изменяемое состояние — class.',
      solution:
        '1) enum OrderStatus { NEW, PAID, SHIPPED, DONE }\n2) record Person(String name, int age) {}\n3) interface Flyable { void fly(); }\n4) class Counter { private int value; void increment() { value++; } }'
    },
    quiz: [
      {
        q: 'Какой тип лучше подходит для фиксированного набора статусов?',
        options: ['String-константы', 'enum', 'record', 'annotation'],
        answer: 1,
        explain: 'enum проверяется компилятором и не даёт передать произвольную строку.'
      },
      {
        q: 'Для чего нужен record?',
        options: ['Для изменяемых объектов с логикой', 'Для компактного неизменяемого набора данных', 'Для создания потоков', 'Для подключения библиотек'],
        answer: 1,
        explain: 'Record автоматически создаёт конструктор, аксессоры, equals, hashCode и toString.'
      }
    ]
  },
  {
    id: 'interfaces',
    title: 'Интерфейсы и контракты',
    summary: 'interface, implements, @Override и программирование через контракт.',
    minutes: 11,
    goal:
      'Понять, зачем нужен интерфейс, как класс его реализует и почему код стоит писать против интерфейса, а не конкретного класса.',
    ideas: [
      'Интерфейс объявляет методы без реализации. Класс, который его реализует, обязан дать тела методам (если они не default).',
      '`implements` — это «обязуюсь выполнять контракт». Один класс может реализовать несколько интерфейсов.',
      '`@Override` просит компилятор проверить, что вы действительно переопределяете метод. Это защита от опечаток.',
      'Если код зависит от интерфейса, реализацию можно заменить: настоящую, тестовую, кэширующую — вызывающий код не меняется.'
    ],
    sources: [
      {
        file: '_3/interface_class/SayNo.java',
        focus: [{ full: true, note: 'Контракт: любой класс, который implements SayNo, обязан уметь sayNo().' }]
      },
      {
        file: '_3/interface_class/impl/SayNoImpl.java',
        focus: [{ full: true, note: 'Реализация контракта. @Override проверяет сигнатуру.' }]
      },
      {
        file: '_3/main/Main.java',
        focus: [{ method: 'main', note: 'Создаём реализацию и вызываем метод через объект.' }]
      }
    ],
    runs: ['org.baileyseyes._3.main.Main'],
    practice: {
      task: 'Создай интерфейс `Greeter` с методом `String greet(String name)` и две реализации: приветствие на русском и на английском. Вызови обе через переменную типа Greeter.',
      hint: 'Тип переменной может быть интерфейсом, а объект — конкретной реализацией: `Greeter g = new RussianGreeter();`.',
      solution:
        'interface Greeter {\n    String greet(String name);\n}\n\nclass RussianGreeter implements Greeter {\n    public String greet(String name) {\n        return "Привет, " + name;\n    }\n}\n\nclass EnglishGreeter implements Greeter {\n    public String greet(String name) {\n        return "Hello, " + name;\n    }\n}\n\nGreeter ru = new RussianGreeter();\nGreeter en = new EnglishGreeter();\nSystem.out.println(ru.greet("Аня"));\nSystem.out.println(en.greet("Ann"));'
    },
    quiz: [
      {
        q: 'Что означает implements?',
        options: ['Класс наследует поля', 'Класс обязуется реализовать контракт интерфейса', 'Класс становится интерфейсом', 'Класс нельзя наследовать'],
        answer: 1,
        explain: '`implements` — реализация интерфейсного контракта.'
      },
      {
        q: 'Зачем нужна @Override?',
        options: ['Ускоряет выполнение', 'Проверяет, что метод действительно переопределяет метод супертипа', 'Делает метод приватным', 'Создаёт новый метод'],
        answer: 1,
        explain: 'Аннотация помогает поймать опечатку в имени или параметрах на этапе компиляции.'
      }
    ]
  },
  {
    id: 'enums-basics',
    title: 'Enum: фиксированный набор значений',
    summary: 'Почему enum лучше строковых констант и как получить список значений.',
    minutes: 8,
    goal:
      'Научиться заменять магические строки и числа enum-ами и понимать, какие методы даёт компилятор.',
    ideas: [
      'enum — это полноценный класс, а его константы — объекты. Поэтому у enum могут быть поля, конструкторы и методы.',
      'Компилятор проверяет значения: опечатка в имени константы не скомпилируется.',
      '`values()` возвращает массив всех констант, `valueOf(String)` — константу по имени, `ordinal()` — её индекс.',
      'Для enum можно использовать `==`: каждая константа существует в единственном экземпляре.'
    ],
    sources: [
      {
        file: '_3/enum_class/DaysOfTheWeek.java',
        focus: [{ full: true, note: 'Минимальный enum: семь констант и ничего больше.' }]
      }
    ],
    practice: {
      task: 'Добавь в DaysOfTheWeek метод `boolean isWeekend()`, который возвращает true для SATURDAY и SUNDAY.',
      hint: 'Внутри enum можно сравнивать `this` с константами или использовать switch.',
      solution:
        'public boolean isWeekend() {\n    return this == SATURDAY || this == SUNDAY;\n}\n\n// вызов:\nSystem.out.println(DaysOfTheWeek.SUNDAY.isWeekend()); // true'
    },
    quiz: [
      {
        q: 'Чем enum лучше набора public static final String?',
        options: ['Он быстрее', 'Компилятор проверяет допустимые значения', 'Он занимает меньше памяти', 'Его можно изменять во время выполнения'],
        answer: 1,
        explain: 'В enum нельзя передать произвольную строку — только объявленную константу.'
      },
      {
        q: 'Что возвращает values()?',
        options: ['Первую константу', 'Массив всех констант enum', 'Индекс константы', 'Строковое имя'],
        answer: 1,
        explain: '`values()` возвращает массив констант в порядке объявления.'
      }
    ]
  },
  {
    id: 'enums-with-data',
    title: 'Enum с данными и методами',
    summary: 'Поля, конструктор и поведение внутри enum.',
    minutes: 8,
    goal:
      'Понять, что enum может хранить данные и выполнять методы, а не быть просто списком имён.',
    ideas: [
      'Каждая константа может передать свои значения в конструктор enum: `MONDAY("Понедельник")`.',
      'Конструктор enum всегда приватный: новые константы нельзя создать извне.',
      'Поля enum обычно делают `final` — это те же неизменяемые объекты.',
      'Методы enum позволяют держать рядом данные и поведение, связанные с конкретным значением.'
    ],
    sources: [
      {
        file: '_3/enum_class/InformatedDaysOfTheWeek.java',
        focus: [{ full: true, note: 'Каждая константа хранит русское название, сгенерированный геттер возвращает его.' }]
      }
    ],
    practice: {
      task: 'Добавь в InformatedDaysOfTheWeek поле `boolean workingDay` и заполни его для каждой константы. Затем добавь метод `isWorkingDay()`.',
      hint: 'Добавьте второе поле в конструктор: `MONDAY("Понедельник", true)` и метод-геттер.',
      solution:
        'MONDAY("Понедельник", true),\n// ...\nSUNDAY("Воскресенье", false);\n\nprivate final String russianName;\nprivate final boolean workingDay;\n\nInformatedDaysOfTheWeek(String russianName, boolean workingDay) {\n    this.russianName = russianName;\n    this.workingDay = workingDay;\n}\n\npublic boolean isWorkingDay() {\n    return workingDay;\n}'
    },
    quiz: [
      {
        q: 'Можно ли создать новый экземпляр enum через new?',
        options: ['Да, если конструктор public', 'Да, если добавить @Builder', 'Нет, конструктор enum всегда приватный', 'Только через valueOf'],
        answer: 2,
        explain: 'Набор констант enum фиксирован, поэтому конструктор не доступен извне.'
      },
      {
        q: 'Зачем полю enum модификатор final?',
        options: ['Чтобы поле было видно снаружи', 'Чтобы значение нельзя было изменить после создания', 'Чтобы поле попало в toString', 'Чтобы оно стало статическим'],
        answer: 1,
        explain: 'Константы enum — неизменяемые объекты, их поля стоит делать final.'
      }
    ]
  },
  {
    id: 'enum-practice',
    title: 'Enum на практике',
    summary: 'switch по enum, values/valueOf, методы и рабочие сценарии.',
    minutes: 12,
    goal:
      'Собрать вместе всё об enum: перебор, switch, поиск по имени, вычисляемые методы и обработка неверного значения.',
    ideas: [
      '`switch` по enum читается лучше, чем цепочка if-else, и компилятор может проверить полноту веток.',
      '`valueOf` бросает `IllegalArgumentException`, если строки нет среди констант. Это нужно обрабатывать.',
      'Методы в enum позволяют инкапсулировать правила: следующий день, рабочий/выходной, русское название.',
      'Не превращайте enum в божественный объект: если логики слишком много, вынесите её в сервис.'
    ],
    sources: [
      {
        file: '_3/enum_class/EnumPractice.java',
        focus: [
          { method: 'demonstrateBasicUsage', note: 'Перебор values(), ordinal() и switch.' },
          { method: 'demonstrateEnumMethods', note: 'values, valueOf и обработка неверного имени.' },
          { method: 'getNextDay', note: 'Вычисляемое поведение внутри enum.' },
          { method: 'main', note: 'Все сценарии вместе.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._3.enum_class.EnumPractice'],
    practice: {
      task: 'Добавь в DaysOfTheWeek метод `getSeason()`, который возвращает время года для дня. Используй switch.',
      hint: 'Декабрь–февраль — зима, март–май — весна, июнь–август — лето, сентябрь–ноябрь — осень.',
      solution:
        'public String getSeason() {\n    return switch (this) {\n        case DECEMBER, JANUARY, FEBRUARY -> "Зима";\n        case MARCH, APRIL, MAY -> "Весна";\n        case JUNE, JULY, AUGUST -> "Лето";\n        case SEPTEMBER, OCTOBER, NOVEMBER -> "Осень";\n    };\n}'
    },
    quiz: [
      {
        q: 'Что произойдёт при `DaysOfTheWeek.valueOf("FUNDAY")`?',
        options: ['Вернётся null', 'Вернётся MONDAY', 'Будет IllegalArgumentException', 'Ошибка компиляции'],
        answer: 2,
        explain: '`valueOf` ищет точное имя константы и бросает исключение, если его нет.'
      },
      {
        q: 'Почему switch по enum удобен?',
        options: ['Он работает быстрее if', 'Компилятор проверяет значения и полноту веток', 'Он не требует импорта', 'Он автоматически сортирует константы'],
        answer: 1,
        explain: 'Switch по enum типобезопасен и для switch-выражений требует покрыть все варианты.'
      }
    ]
  },
  {
    id: 'records',
    title: 'Record: данные без бойлерплейта',
    summary: 'Неизменяемый DTO, канонический конструктор и автоматические методы.',
    minutes: 9,
    goal:
      'Понять, когда record заменяет обычный класс с полями, и какие ограничения у этого типа.',
    ideas: [
      'Record автоматически создаёт конструктор, аксессоры, `equals`, `hashCode` и `toString`.',
      'Компоненты record неизменяемы: сеттеров нет, поля final.',
      'Компактный конструктор позволяет проверить данные без повторения присваиваний.',
      'Record хорошо подходит для DTO, результатов и составных ключей, но не для объектов с изменяемым состоянием.'
    ],
    sources: [
      {
        file: '_3/record/Human.java',
        focus: [{ full: true, note: 'Весь record — одна строка с компонентами. Остальное генерирует компилятор.' }]
      }
    ],
    practice: {
      task: 'Создай record `Money(long amount, String currency)` с проверкой в компактном конструкторе: сумма не может быть отрицательной, валюта не может быть пустой.',
      hint: 'Компактный конструктор выглядит так: `public Money { if (...) throw ...; }` — присваивания писать не нужно.',
      solution:
        'record Money(long amount, String currency) {\n    public Money {\n        if (amount < 0) {\n            throw new IllegalArgumentException("amount < 0");\n        }\n        if (currency == null || currency.isBlank()) {\n            throw new IllegalArgumentException("currency is blank");\n        }\n    }\n}\n\nMoney price = new Money(1999, "RUB");\nSystem.out.println(price.amount());\nSystem.out.println(price);'
    },
    quiz: [
      {
        q: 'Какие методы генерирует record?',
        options: ['Только конструктор', 'Конструктор, аксессоры, equals, hashCode и toString', 'Только геттеры и сеттеры', 'Ничего, всё нужно писать вручную'],
        answer: 1,
        explain: 'Record — это компактный носитель данных с автоматически сгенерированными методами.'
      },
      {
        q: 'Можно ли изменить поле record после создания?',
        options: ['Да, через сеттер', 'Да, если поле public', 'Нет, компоненты неизменяемы', 'Только через reflection'],
        answer: 2,
        explain: 'Компоненты record — final, сеттеров нет.'
      }
    ]
  },
  {
    id: 'annotations',
    title: 'Свои аннотации',
    summary: '@interface, @Target, @Retention и метаданные, которые читает код.',
    minutes: 9,
    goal:
      'Понять, что аннотация — это метаданные, и научиться объявлять свою аннотацию с нужной областью действия и временем жизни.',
    ideas: [
      'Аннотация объявляется через `@interface` и может иметь элементы, похожие на методы без параметров.',
      '`@Target` ограничивает, куда можно поставить аннотацию: класс, метод, поле, параметр.',
      '`@Retention` определяет, где аннотация сохраняется: только в исходнике, в байткоде или доступна во время выполнения.',
      'Маркерная аннотация не имеет элементов. Именно так устроены многие аннотации фреймворков.'
    ],
    sources: [
      {
        file: '_3/annotation/Service.java',
        focus: [{ full: true, note: 'Объявление аннотации: @Target(TYPE) и @Retention(SOURCE).' }]
      },
      {
        file: '_3/annotation/HumanService.java',
        focus: [{ lines: [7, 10], note: 'Применение собственной аннотации к классу.' }]
      }
    ],
    practice: {
      task: 'Создай аннотацию `@Author(String value())` с retention RUNTIME и target TYPE, затем поставь её над классом и прочитай значение через reflection.',
      hint: 'Для чтения используйте `clazz.getAnnotation(Author.class).value()`.',
      solution:
        '@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.TYPE)\n@interface Author {\n    String value();\n}\n\n@Author("Анна")\nclass Book {\n}\n\nAuthor author = Book.class.getAnnotation(Author.class);\nSystem.out.println(author.value());'
    },
    quiz: [
      {
        q: 'Что задаёт @Retention?',
        options: ['Где можно применять аннотацию', 'Как долго аннотация сохраняется', 'Какие у неё элементы', 'Кто её может прочитать'],
        answer: 1,
        explain: 'Retention определяет хранение: SOURCE, CLASS или RUNTIME.'
      },
      {
        q: 'Что такое маркерная аннотация?',
        options: ['Аннотация без элементов', 'Аннотация только для методов', 'Аннотация с обязательным value', 'Аннотация, которая удаляется компилятором'],
        answer: 0,
        explain: 'Маркерная аннотация просто помечает элемент и не несёт данных.'
      }
    ]
  }
];
