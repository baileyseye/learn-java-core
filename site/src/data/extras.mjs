export default [
  {
    id: 'main-demo',
    module: 1,
    title: 'Демо-файл Main из IntelliJ',
    summary: 'Стартовый файл, который IntelliJ создаёт до начала курса. Полезен как минимальный пример.',
    file: 'Main.java',
    relatedLesson: 'hello-world',
    focus: [{ full: true }]
  },
  {
    id: 'switch',
    module: 1,
    title: 'switch и switch-выражения',
    summary: 'Множественный выбор, fall-through, стрелочный синтаксис и switch с возвратом значения.',
    file: '_1/if_else/SwitchStatement.java',
    relatedLesson: 'if-else',
    focus: [
      { method: 'demonstrateBasicSwitch', note: 'Классический switch с break.' },
      { method: 'getMonthNameModern', note: 'Switch-выражение со стрелками.' },
      { method: 'demonstrateSwitchWithString', note: 'Switch по строке.' }
    ]
  },
  {
    id: 'ternary',
    module: 1,
    title: 'Тернарный оператор',
    summary: 'Короткая форма if-else для выбора значения: когда она улучшает код, а когда вредит.',
    file: '_1/types/TernaryOperator.java',
    relatedLesson: 'if-else',
    focus: [
      { method: 'demonstrateBasic', note: 'Базовый синтаксис condition ? a : b.' },
      { method: 'demonstrateNestedTernary', note: 'Вложенные тернарники: почему их стоит избегать.' },
      { method: 'demonstrateWhenToUse', note: 'Критерии читаемости.' }
    ]
  },
  {
    id: 'scanner',
    module: 1,
    title: 'Ввод с клавиатуры: Scanner',
    summary: 'Чтение чисел, строк и безопасная обработка неверного ввода.',
    file: '_1/methods/ScannerInput.java',
    relatedLesson: 'methods',
    focus: [
      { method: 'demonstrateReadInt', note: 'Чтение int и типичная ошибка с переводом строки.' },
      { method: 'demonstrateMenu', note: 'Меню на do-while и switch.' },
      { method: 'readIntSafely', note: 'Безопасное чтение с повторным запросом.' }
    ]
  },
  {
    id: 'inheritance',
    module: 2,
    title: 'Наследование и полиморфизм',
    summary: 'extends, super, @Override и вызов переопределённого метода через ссылку базового типа.',
    file: '_2/classes_objects/Inheritance.java',
    relatedLesson: 'human-class',
    focus: [
      { symbol: 'Vehicle', note: 'Базовый класс с общим состоянием и поведением.' },
      { symbol: 'Car', note: 'Наследник расширяет поведение и переопределяет методы.' },
      { method: 'demonstratePolymorphism', note: 'Одна ссылка — разные реализации.' }
    ]
  },
  {
    id: 'abstract-classes',
    module: 2,
    title: 'Абстрактные классы',
    summary: 'Когда нужен abstract class, а когда интерфейс: общее состояние и обязательные методы.',
    file: '_2/classes_objects/AbstractClasses.java',
    relatedLesson: 'human-class',
    focus: [
      { symbol: 'Shape', note: 'Абстрактный класс с общим полем и абстрактными методами.' },
      { symbol: 'Circle', note: 'Конкретная реализация.' },
      { method: 'demonstrateAbstractPolymorphism', note: 'Полиморфизм через базовый тип.' }
    ]
  },
  {
    id: 'builder-lombok',
    module: 2,
    title: 'Builder и Lombok',
    summary: 'Пошаговая сборка объекта и генерация бойлерплейта без ручных геттеров и конструкторов.',
    file: '_2/classes_objects/BuilderAndLombok.java',
    relatedLesson: 'human-class',
    focus: [
      { method: 'demonstrateBuilderPattern', note: 'Ручной Builder шаг за шагом.' },
      { method: 'demonstrateLombokConcise', note: 'То же самое короче с Lombok.' }
    ]
  },
  {
    id: 'access-modifiers',
    module: 3,
    title: 'Модификаторы доступа',
    summary: 'public, private, protected и package-private: кто и откуда видит член класса.',
    file: '_3/AccessModifiersDemo.java',
    relatedLesson: 'class-types-intro',
    focus: [
      { method: 'publicMethod', note: 'Доступен всем.' },
      { method: 'privateMethod', note: 'Доступен только внутри класса.' },
      { method: 'demonstratePrivateAccess', note: 'Инкапсуляция в действии.' }
    ]
  },
  {
    id: 'reflection',
    module: 3,
    title: 'Reflection',
    summary: 'Чтение полей и методов во время выполнения, вызов методов и динамическое создание объектов.',
    file: '_3/ReflectionDemo.java',
    relatedLesson: 'annotations',
    focus: [
      { method: 'demonstrateFields', note: 'Получение полей класса через reflection.' },
      { method: 'demonstrateInvokeMethod', note: 'Вызов метода по имени.' },
      { method: 'demonstratePrivateFieldAccess', note: 'Доступ к private-полю и цена такого решения.' }
    ]
  },
  {
    id: 'say-nothing',
    module: 3,
    title: 'Интерфейс SayNothing',
    summary: 'Минимальный интерфейс из одного метода — ещё один пример контракта.',
    file: '_3/interface_class/SayNothing.java',
    relatedLesson: 'interfaces',
    focus: [{ full: true }]
  },
  {
    id: 'say-yes',
    module: 3,
    title: 'Интерфейс SayYes',
    summary: 'Второй независимый контракт, который можно реализовать вместе с SayNo.',
    file: '_3/interface_class/SayYes.java',
    relatedLesson: 'interfaces',
    focus: [{ full: true }]
  },
  {
    id: 'say-yes-impl',
    module: 3,
    title: 'Реализация SayYes',
    summary: 'Класс, который выполняет контракт SayYes.',
    file: '_3/interface_class/impl/SayYesImpl.java',
    relatedLesson: 'interfaces',
    focus: [{ full: true }]
  },
  {
    id: 'say-nothing-impl',
    module: 3,
    title: 'Реализация SayNothing',
    summary: 'Простая реализация минимального интерфейса.',
    file: '_3/interface_class/impl/SayNothingImpl.java',
    relatedLesson: 'interfaces',
    focus: [{ full: true }]
  },
  {
    id: 'say-nothing-more-impl',
    module: 3,
    title: 'Цепочка реализаций: SayNothingMoreImpl',
    summary: 'Наследование реализации и повторное использование поведения.',
    file: '_3/interface_class/impl/SayNothingMoreImpl.java',
    relatedLesson: 'interfaces',
    focus: [{ full: true }]
  },
  {
    id: 'say-nothing-never-more-impl',
    module: 3,
    title: 'Цепочка реализаций: SayNothingNeverMoreImpl',
    summary: 'Ещё один шаг цепочки. Сравните с предыдущей реализацией.',
    file: '_3/interface_class/impl/SayNothingNeverMoreImpl.java',
    relatedLesson: 'interfaces',
    focus: [{ full: true }]
  },
  {
    id: 'say-everything',
    module: 3,
    title: 'Реализация двух интерфейсов',
    summary: 'Один класс может реализовать несколько контрактов одновременно.',
    file: '_3/interface_class/impl/SayEverything.java',
    relatedLesson: 'interfaces',
    focus: [{ full: true }]
  },
  {
    id: 'useless-annotation',
    module: 3,
    title: 'Аннотация UselessButNeedToKnow',
    summary: 'Ещё одна своя аннотация: @Target(TYPE) и retention по умолчанию.',
    file: '_3/annotation/UselessButNeedToKnow.java',
    relatedLesson: 'annotations',
    focus: [{ full: true }]
  },
  {
    id: 'additional-exceptions',
    module: 4,
    title: 'Дополнительные исключения',
    summary: 'Checked vs unchecked, повторный throw, suppressed exceptions и цепочки причин.',
    file: '_4/exception/AdditionalExceptions.java',
    relatedLesson: 'exceptions-intro',
    focus: [
      { method: 'demonstrateCheckedException', note: 'Checked-исключение требует обработки.' },
      { method: 'demonstrateSuppressedExceptions', note: 'Suppressed exceptions при закрытии ресурсов.' },
      { method: 'demonstrateRethrow', note: 'Проброс исключения с сохранением контекста.' }
    ]
  },
  {
    id: 'queue-deque',
    module: 5,
    title: 'Queue, Deque и PriorityQueue',
    summary: 'Очереди FIFO, двусторонние очереди, стек и приоритетная очередь.',
    file: '_5/QueueAndDeque.java',
    relatedLesson: 'collections-overview',
    focus: [
      { method: 'demonstrateQueue', note: 'Базовая очередь.' },
      { method: 'demonstrateDeque', note: 'Deque как очередь и стек.' },
      { method: 'demonstratePriorityQueue', note: 'Приоритетная очередь.' }
    ]
  },
  {
    id: 'collections-utils',
    module: 5,
    title: 'Collections: утилиты',
    summary: 'sort, shuffle, binarySearch, frequency, unmodifiableList и другие готовые операции.',
    file: '_5/CollectionsUtils.java',
    relatedLesson: 'list',
    focus: [
      { method: 'demonstrateSort', note: 'Сортировка.' },
      { method: 'demonstrateFrequency', note: 'Подсчёт вхождений.' },
      { method: 'demonstrateUnmodifiable', note: 'Коллекция только для чтения.' }
    ]
  },
  {
    id: 'completable-future',
    module: 6,
    title: 'CompletableFuture',
    summary: 'Асинхронные цепочки: thenApply, thenCombine, allOf и обработка ошибок.',
    file: '_6/CompletableFutureDemo.java',
    relatedLesson: 'callable-future',
    focus: [
      { method: 'demonstrateBasicCompletableFuture', note: 'supplyAsync и получение результата.' },
      { method: 'demonstrateThenCombine', note: 'Комбинирование двух асинхронных результатов.' },
      { method: 'demonstrateAllOf', note: 'Ожидание нескольких задач.' }
    ]
  },
  {
    id: 'reentrant-lock',
    module: 6,
    title: 'ReentrantLock',
    summary: 'Явные блокировки, tryLock, честность и Condition.',
    file: '_6/ReentrantLockDemo.java',
    relatedLesson: 'synchronized',
    focus: [
      { method: 'demonstrateBasicLock', note: 'lock/unlock вместо synchronized.' },
      { method: 'demonstrateTryLock', note: 'Попытка захватить блокировку без ожидания.' }
    ]
  },
  {
    id: 'thread-local',
    module: 6,
    title: 'ThreadLocal',
    summary: 'Данные, привязанные к потоку: контекст пользователя, трассировка, форматтеры.',
    file: '_6/ThreadLocalDemo.java',
    relatedLesson: 'synchronized',
    focus: [
      { method: 'demonstrateBasic', note: 'Своё значение для каждого потока.' },
      { method: 'demonstrateUserContext', note: 'Практический пример контекста пользователя.' }
    ]
  },
  {
    id: 'functional-interfaces',
    module: 7,
    title: 'Функциональные интерфейсы',
    summary: 'Predicate, Consumer, Function, Supplier и лямбды как значения.',
    file: '_7/FunctionalInterfaces.java',
    relatedLesson: 'optional-and-friends',
    focus: [
      { method: 'demonstratePredicate', note: 'Predicate: проверка условия.' },
      { method: 'demonstrateFunction', note: 'Function: преобразование значения.' },
      { method: 'demonstrateSupplier', note: 'Supplier: ленивое создание значения.' }
    ]
  },
  {
    id: 'generics',
    module: 7,
    title: 'Дженерики',
    summary: 'Параметры типа, ограничения, wildcards и PECS.',
    file: '_7/GenericsDemo.java',
    relatedLesson: 'collections-overview',
    focus: [
      { symbol: 'Container', note: 'Простой generic-класс.' },
      { method: 'demonstrateUpperBound', note: 'Ограничение сверху: extends.' },
      { method: 'demonstratePECS', note: 'Producer Extends, Consumer Super.' }
    ]
  },
  {
    id: 'container',
    module: 7,
    title: 'Container<T>',
    summary: 'Вложенный generic-класс из GenericsDemo.java: минимальный контейнер значения.',
    file: '_7/GenericsDemo.java',
    relatedLesson: 'collections-overview',
    focus: [{ symbol: 'Container', note: 'Контейнер хранит T и возвращает его без приведения типов.' }]
  },
  {
    id: 'file-io',
    module: 7,
    title: 'Файлы и IO',
    summary: 'Files.readString, readAllLines, запись, копирование и обход директорий.',
    file: '_7/FileIO.java',
    relatedLesson: 'stream-api',
    focus: [
      { method: 'demonstrateReadAllLines', note: 'Чтение файла построчно.' },
      { method: 'demonstrateWriteAllLines', note: 'Запись строк в файл.' },
      { method: 'demonstrateTextStats', note: 'Практика: статистика текста.' }
    ]
  },
  {
    id: 'design-patterns',
    module: 7,
    title: 'Паттерны проектирования',
    summary: 'Singleton, Factory, Observer, Strategy, Chain, Decorator и Builder на одном примере.',
    file: '_7/DesignPatternsDemo.java',
    relatedLesson: 'human-service',
    focus: [
      { method: 'demonstrateSingleton', note: 'Один экземпляр на приложение.' },
      { method: 'demonstrateFactory', note: 'Создание объектов через фабрику.' },
      { method: 'demonstrateObserver', note: 'Подписка и уведомление наблюдателей.' }
    ]
  }
];
