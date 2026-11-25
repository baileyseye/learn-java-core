export default [
  {
    id: 'hello-world',
    title: 'Первая программа: HelloWorld',
    summary: 'Класс, метод main и вывод в консоль — минимальная программа на Java.',
    minutes: 6,
    goal:
      'Понять, из чего состоит минимальная Java-программа, почему выполнение начинается с main и как вывести текст в консоль.',
    ideas: [
      'Любой код на Java живёт внутри класса. Класс — это чертёж, по которому создаются объекты.',
      'Точка входа — метод `public static void main(String[] args)`. Именно его запускает JVM.',
      '`System.out.println` выводит строку в консоль. В IntelliJ вызов можно набрать как `sout`.',
      'Метод, который нигде не вызывается, не выполняется, даже если он есть в файле.'
    ],
    sources: [
      {
        file: '_1/__start_from_here__/HelloWorld.java',
        focus: [
          { method: 'main', note: 'Точка входа. Пока это единственное, что реально выполняется.' },
          { method: 'whatToDoNext', note: 'Так выглядит метод, который объявлен, но нигде не вызван: он ничего не делает.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.__start_from_here__.HelloWorld'],
    practice: {
      task: 'Запусти программу, затем добавь в main ещё один `System.out.println` со своим текстом и запусти снова.',
      hint: 'Строка должна находиться внутри фигурных скобок метода main. Не забудь точку с запятой.',
      solution:
        'public static void main(String[] args) {\n    System.out.println("Hello World");\n    System.out.println("Я учу Java");\n}'
    },
    quiz: [
      {
        q: 'С какого метода начинается выполнение Java-программы?',
        options: ['С первого метода в файле', 'С метода main', 'С конструктора класса', 'С метода println'],
        answer: 1,
        explain: 'JVM ищет сигнатуру `public static void main(String[] args)`.'
      },
      {
        q: 'Что произойдёт, если метод whatToDoNext не вызывать?',
        options: ['Он выполнится автоматически', 'Компилятор удалит его', 'Он не выполнится', 'Программа упадёт с ошибкой'],
        answer: 2,
        explain: 'Код метода выполняется только при вызове. Наличие метода в классе само по себе ничего не запускает.'
      }
    ]
  },
  {
    id: 'variables-and-operators',
    title: 'Переменные и операторы',
    summary: 'Объявление переменных, арифметика, сравнение, логика и инкремент.',
    minutes: 9,
    goal:
      'Научиться хранить значения в переменных и выполнять над ними основные операции, не путая `=` и `==`.',
    ideas: [
      'Переменная — именованная ячейка с типом. Имя пишут в camelCase, а `final` запрещает повторное присваивание.',
      'Арифметические операторы: `+`, `-`, `*`, `/`, `%`. Деление двух int отбрасывает дробную часть, а `%` возвращает остаток.',
      'Сравнение (`>`, `<`, `==`, `!=`) возвращает boolean. `=` — присваивание, `==` — сравнение.',
      '`&&`, `||`, `!` объединяют условия. `i++` возвращает старое значение, `++i` — уже увеличенное.'
    ],
    sources: [
      {
        file: '_1/types/VariablesAndOperators.java',
        focus: [
          { method: 'demonstrateVariables', note: 'Объявление, изменение и final-переменная.' },
          { method: 'demonstrateArithmetic', note: 'Пять арифметических операторов и деление int.' },
          { method: 'demonstrateComparisonAndLogic', note: 'Сравнение возвращает boolean, логика объединяет условия.' },
          { method: 'demonstrateIncrement', note: 'Разница между i++ и ++i на одном примере.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.types.VariablesAndOperators'],
    practice: {
      task: 'Объяви `int a = 10` и `int b = 3`. Выведи сумму, разность, произведение, целое частное и остаток. Затем выведи результат `a > b`.',
      hint: 'Для остатка используется `%`. Не забудьте скобки вокруг выражения, если складываете его со строкой.',
      solution:
        'int a = 10;\nint b = 3;\nSystem.out.println(a + b);\nSystem.out.println(a - b);\nSystem.out.println(a * b);\nSystem.out.println(a / b);\nSystem.out.println(a % b);\nSystem.out.println(a > b);'
    },
    quiz: [
      {
        q: 'Что вернёт выражение `10 / 3`, если оба числа int?',
        options: ['3.33', '3', '4', 'Ошибку компиляции'],
        answer: 1,
        explain: 'При делении двух int дробная часть отбрасывается, поэтому результат равен 3.'
      },
      {
        q: 'Чем `=` отличается от `==`?',
        options: ['Ничем', '`=` присваивает, `==` сравнивает', '`==` присваивает, `=` сравнивает', '`=` работает только с числами'],
        answer: 1,
        explain: '`=` записывает значение в переменную, а `==` проверяет равенство и возвращает boolean.'
      }
    ]
  },
  {
    id: 'primitive-types',
    title: 'Примитивные типы',
    summary: 'Восемь примитивов Java, диапазоны, литералы и вывод var.',
    minutes: 10,
    goal:
      'Запомнить восемь примитивных типов, их назначение и типичные ловушки: переполнение, суффиксы L и f, разницу между примитивом и обёрткой.',
    ideas: [
      'Целые числа: `byte`, `short`, `int`, `long`. В повседневном коде по умолчанию берут `int`, а `long` — когда диапазона не хватает.',
      'Числа с плавающей точкой: `float` и `double`. `double` — стандартный выбор, `float` требует суффикса `f`.',
      '`char` — один 16-битный символ Unicode, а `boolean` принимает только `true` и `false`.',
      '`var` не создаёт «динамический тип»: компилятор выводит конкретный тип во время компиляции. Для читаемости `var` лучше заменять на явный тип.'
    ],
    sources: [
      {
        file: '_1/types/PrimitiveTypes.java',
        focus: [
          { method: 'howToCreateType', note: 'Объявление, инициализация и использование переменной.' },
          { method: 'demonstrateIntegerTypes', note: 'Четыре целых типа и суффикс L для long.' },
          { method: 'demonstrateFloatingPointTypes', note: 'float и double: точность и суффикс f.' },
          { method: 'demonstrateVarWithPrimitives', note: 'var — это выведение типа компилятором, а не новый тип.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.types.PrimitiveTypes'],
    practice: {
      task: 'Объяви по одной переменной каждого из восьми примитивных типов, заполни их значениями и выведи в консоль. Затем попробуй прибавить 1 к `Integer.MAX_VALUE` и объясни результат.',
      hint: 'Для вывода удобно использовать конкатенацию строк: `System.out.println("int: " + value)`. Переполнение int не бросает исключение — значение «заворачивается».',
      solution:
        'byte b = 100;\nshort s = 30_000;\nint i = 2_000_000_000;\nlong l = 9_000_000_000L;\nfloat f = 3.14f;\ndouble d = 3.14159;\nchar c = \'J\';\nboolean flag = true;\n\nSystem.out.println(b + " " + s + " " + i + " " + l);\nSystem.out.println(f + " " + d + " " + c + " " + flag);\n\nint max = Integer.MAX_VALUE;\nSystem.out.println(max + 1); // -2147483648'
    },
    quiz: [
      {
        q: 'Какой тип выбрать для целого числа, которое точно помещается в int?',
        options: ['byte', 'short', 'int', 'long'],
        answer: 2,
        explain: '`int` — стандартный целый тип в Java. Остальные берут, когда важны диапазон или экономия памяти.'
      },
      {
        q: 'Зачем нужен суффикс L у литерала 10000000000L?',
        options: ['Чтобы число стало строкой', 'Чтобы компилятор понял, что это long', 'Чтобы число стало дробным', 'Чтобы включить проверку переполнения'],
        answer: 1,
        explain: 'Целочисленный литерал по умолчанию имеет тип int. Если значение не помещается в int, нужен суффикс L.'
      },
      {
        q: 'Что делает var?',
        options: ['Создаёт переменную без типа', 'Выводит тип из значения при компиляции', 'Делает переменную изменяемой', 'Работает только со строками'],
        answer: 1,
        explain: '`var` — синтаксический сахар: компилятор выводит конкретный тип, и переменная остаётся статически типизированной.'
      }
    ]
  },
  {
    id: 'type-conversion',
    title: 'Преобразование типов',
    summary: 'Widening, narrowing, явные приведения и конвертация String ↔ число.',
    minutes: 8,
    goal:
      'Понять, когда Java преобразует тип сама, когда нужно явное приведение и чем опасна потеря данных.',
    ideas: [
      'Widening (расширение) безопасно: `int` → `long` → `double` компилятор делает сам.',
      'Narrowing (сужение) требует явного приведения: `(int) 3.99` отбрасывает дробную часть, а не округляет.',
      'Строку в число превращают `Integer.parseInt` и `Double.parseDouble`; обратно — `String.valueOf` или конкатенация.',
      'При приведении ссылочных типов проверяйте реальный тип объекта, иначе получите `ClassCastException`.'
    ],
    sources: [
      {
        file: '_1/types/TypeConversion.java',
        focus: [
          { method: 'demonstrateNarrowing', note: 'Явное сужение и потеря точности.' },
          { method: 'demonstrateStringConversion', note: 'Преобразование между примитивами и строками.' }
        ]
      }
    ],
    practice: {
      task: 'Преобразуй `double` 9.99 в `int` и выведи результат. Затем распарси строку `"42"`, прибавь 8 и выведи сумму.',
      hint: 'Для сужения используется `(int) значение`. Для строки — `Integer.parseInt(...)`.',
      solution:
        'double value = 9.99;\nint truncated = (int) value;\nSystem.out.println(truncated); // 9\n\nint parsed = Integer.parseInt("42");\nSystem.out.println(parsed + 8); // 50'
    },
    quiz: [
      {
        q: 'Что окажется в переменной int после `(int) 3.99`?',
        options: ['4', '3', '3.99', 'Ошибка компиляции'],
        answer: 1,
        explain: 'При сужении дробная часть отбрасывается, округления не происходит.'
      },
      {
        q: 'Какое преобразование требует явного приведения?',
        options: ['int → long', 'float → double', 'double → int', 'byte → int'],
        answer: 2,
        explain: 'Переход от более широкого типа к более узкому (narrowing) требует явного приведения.'
      }
    ]
  },
  {
    id: 'strings',
    title: 'Строки: String',
    summary: 'Иммутабельность, пул строк, equals против == и основные методы.',
    minutes: 10,
    goal:
      'Научиться уверенно работать со строками и понять, почему `==` почти всегда не тот оператор для сравнения текста.',
    ideas: [
      '`String` — класс, а не примитив. Строки неизменяемы: любая «модификация» создаёт новую строку.',
      'Литералы хранятся в пуле строк, поэтому две одинаковые строки-литерала могут ссылаться на один объект.',
      '`==` сравнивает ссылки, `equals` — содержимое. Для текста почти всегда нужен `equals` (или `equalsIgnoreCase`).',
      'Полезные методы: `length`, `charAt`, `substring`, `trim`, `replace`, `contains`, `format`, `join`.'
    ],
    sources: [
      {
        file: '_1/types/StringType.java',
        focus: [
          { method: 'demonstrateBasics', note: 'Создание строки, пул строк и сравнение ссылок.' },
          { method: 'demonstrateComparison', note: 'Главное правило: equals для содержимого, == для ссылок.' },
          { method: 'demonstrateImmutability', note: 'Исходная строка не меняется после вызовов методов.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.types.StringType'],
    practice: {
      task: 'Создай две строки `"Java"` — через литерал и через `new String(...)`. Сравни их через `==` и `equals` и объясни разницу.',
      hint: 'Литерал может попасть в пул строк, а `new String` всегда создаёт новый объект.',
      solution:
        'String a = "Java";\nString b = new String("Java");\n\nSystem.out.println(a == b);      // false: разные объекты\nSystem.out.println(a.equals(b)); // true: одинаковое содержимое'
    },
    quiz: [
      {
        q: 'Чем отличается `==` от `equals` для строк?',
        options: ['Ничем', '`==` сравнивает ссылки, `equals` — содержимое', '`equals` сравнивает ссылки, `==` — содержимое', '`==` работает только с null'],
        answer: 1,
        explain: 'Оператор `==` проверяет, это ли один и тот же объект. `equals` сравнивает символы строки.'
      },
      {
        q: 'Что произойдёт с исходной строкой после `original.toUpperCase()`?',
        options: ['Она станет заглавной', 'Она не изменится, вернётся новая строка', 'Она станет null', 'Будет выброшено исключение'],
        answer: 1,
        explain: 'String иммутабелен: методы возвращают новую строку, а исходная остаётся прежней.'
      }
    ]
  },
  {
    id: 'string-builder',
    title: 'StringBuilder: сборка строк',
    summary: 'Зачем нужен StringBuilder, если String неизменяем, и как работают append, insert и reverse.',
    minutes: 8,
    goal:
      'Понять, почему склеивание строк в цикле дорого, и научиться собирать и менять текст через StringBuilder.',
    ideas: [
      '`String` неизменяем: каждый `+` создаёт новую строку, а старая остаётся в памяти до сборки мусора.',
      '`StringBuilder` хранит изменяемый буфер. `append` дописывает текст, `insert` вставляет в позицию, `delete` удаляет диапазон.',
      '`reverse` разворачивает строку, а `toString` превращает builder обратно в обычную строку.',
      'Для одной-двух склеек `+` читается лучше. StringBuilder нужен там, где строка собирается в цикле или из многих частей.'
    ],
    sources: [
      {
        file: '_1/types/StringBuilderDemo.java',
        focus: [
          { method: 'demonstrateAppend', note: 'Два append вместо конкатенации.' },
          { method: 'demonstrateMethods', note: 'length, charAt, insert, replace, delete и reverse.' },
          { method: 'demonstrateLoop', note: 'Главный сценарий: сборка строки в цикле.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.types.StringBuilderDemo'],
    practice: {
      task: 'Собери строку `1 2 3 4 5` через StringBuilder в цикле, затем разверни её через `reverse` и выведи оба результата.',
      hint: 'Чтобы не поставить лишний пробел перед первым числом, проверяйте `i > 1`.',
      solution:
        'StringBuilder builder = new StringBuilder();\nfor (int i = 1; i <= 5; i++) {\n    if (i > 1) builder.append(" ");\n    builder.append(i);\n}\nSystem.out.println(builder);\nbuilder.reverse();\nSystem.out.println(builder);'
    },
    quiz: [
      {
        q: 'Почему StringBuilder эффективнее конкатенации в цикле?',
        options: ['Он работает в другом потоке', 'Он меняет один буфер, а не создаёт новую строку на каждой итерации', 'Он автоматически сортирует символы', 'Он сжимает текст'],
        answer: 1,
        explain: 'String неизменяем, поэтому каждый `+` создаёт новый объект. StringBuilder переиспользует внутренний буфер.'
      },
      {
        q: 'Что возвращает `builder.toString()`?',
        options: ['Длину строки', 'Обычную неизменяемую строку с текущим содержимым', 'Новый StringBuilder', 'Массив символов'],
        answer: 1,
        explain: '`toString()` создаёт String из текущего содержимого builder.'
      }
    ]
  },
  {
    id: 'arrays',
    title: 'Массивы',
    summary: 'Фиксированный размер, значения по умолчанию, Arrays и ссылочная семантика.',
    minutes: 9,
    goal:
      'Понять, как устроены массивы, почему они являются объектами и как избежать типичных ошибок с длиной и сравнением.',
    ideas: [
      'Массив — объект фиксированной длины. После создания изменить размер нельзя.',
      'Элементы числового массива по умолчанию равны 0, boolean — false, ссылочного типа — null.',
      '`arr1 == arr2` сравнивает ссылки, а не содержимое. Для содержимого есть `Arrays.equals`.',
      '`Arrays.toString`, `Arrays.sort`, `Arrays.stream` закрывают большинство повседневных задач.'
    ],
    sources: [
      {
        file: '_1/types/IntArray.java',
        focus: [
          { method: 'demonstrateBasics', note: 'Три способа создать массив и длина через length.' },
          { method: 'demonstrateArraysClass', note: 'Сравнение содержимого через Arrays.equals.' },
          { method: 'arraysTricks', note: 'Ссылочная семантика: == сравнивает ссылки, а не элементы.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.types.IntArray'],
    practice: {
      task:
        'Создай `int[5]`, заполни его квадратами чисел 1..5, выведи через `Arrays.toString` и найди сумму элементов.',
      hint:
        'Индексы начинаются с 0. Квадрат числа — это число, умноженное на само себя. Сначала заполни все элементы, затем сложи их в `sum`.',
      solution:
        'int[] squares = new int[5];\nsquares[0] = 1;\nsquares[1] = 4;\nsquares[2] = 9;\nsquares[3] = 16;\nsquares[4] = 25;\nSystem.out.println(Arrays.toString(squares));\n\nint sum = squares[0] + squares[1] + squares[2] + squares[3] + squares[4];\nSystem.out.println(sum);'
    },
    quiz: [
      {
        q: 'Чему равен элемент нового int-массива по умолчанию?',
        options: ['null', '0', '1', 'Ошибка компиляции'],
        answer: 1,
        explain: 'Числовые элементы инициализируются нулями; ссылочные — null, boolean — false.'
      },
      {
        q: 'Что сравнивает `arr1 == arr2`?',
        options: ['Содержимое массивов', 'Ссылки на объекты массивов', 'Длину массивов', 'Тип элементов'],
        answer: 1,
        explain: 'Массивы — объекты, поэтому `==` сравнивает ссылки. Для содержимого используйте `Arrays.equals`.'
      }
    ]
  },
  {
    id: 'two-dimensional-arrays',
    title: 'Двумерные массивы',
    summary: 'Матрица как массив массивов, вложенные циклы и ступенчатые структуры.',
    minutes: 9,
    goal:
      'Понять, как устроен двумерный массив, как его обходить и почему строки могут иметь разную длину.',
    ideas: [
      '`int[][] matrix` — это массив, элементы которого сами являются массивами строк.',
      '`matrix.length` — количество строк, а `matrix[row].length` — длина конкретной строки.',
      'Для обхода нужны два цикла: внешний по строкам, внутренний по столбцам.',
      'Строки могут быть разной длины: `new int[3][]` создаёт массив, где каждую строку нужно создать отдельно.'
    ],
    sources: [
      {
        file: '_1/types/TwoDimensionalArrays.java',
        focus: [
          { method: 'demonstrateMatrix', note: 'Литерал матрицы и обход вложенными циклами.' },
          { method: 'demonstrateAggregates', note: 'Сумма и максимум через for-each по строкам.' },
          { method: 'demonstrateDefaultValues', note: 'new int[2][3] и Arrays.deepToString.' },
          { method: 'demonstrateJaggedArray', note: 'Ступенчатый массив с разной длиной строк.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.types.TwoDimensionalArrays'],
    practice: {
      task: 'Дана матрица `{{1, 2, 3}, {4, 5, 6}}`. Выведи её строки через вложенные циклы и посчитай сумму всех элементов.',
      hint: 'Внешний цикл идёт по `matrix.length`, внутренний — по `matrix[row].length`. Сумму накапливайте до циклов.',
      solution:
        'int[][] matrix = {{1, 2, 3}, {4, 5, 6}};\nint sum = 0;\nfor (int row = 0; row < matrix.length; row++) {\n    for (int column = 0; column < matrix[row].length; column++) {\n        System.out.print(matrix[row][column] + " ");\n        sum += matrix[row][column];\n    }\n    System.out.println();\n}\nSystem.out.println(sum);'
    },
    quiz: [
      {
        q: 'Что означает `matrix.length` для `int[][] matrix`?',
        options: ['Количество всех элементов', 'Количество строк', 'Длину первой строки', 'Количество столбцов всегда'],
        answer: 1,
        explain: 'Двумерный массив — массив строк, поэтому `length` возвращает число строк.'
      },
      {
        q: 'Могут ли строки двумерного массива иметь разную длину?',
        options: ['Нет, это ошибка компиляции', 'Да, если создать их отдельно', 'Только для String', 'Только для массивов размера 2'],
        answer: 1,
        explain: 'Java разрешает ступенчатые массивы: каждая строка — самостоятельный массив.'
      }
    ]
  },
  {
    id: 'if-else',
    title: 'Условия и ветвления',
    summary: 'if, else-if, логические операторы и присваивание в ветках.',
    minutes: 10,
    goal:
      'Научиться строить читаемые ветвления и понимать, в каком порядке Java проверяет условия.',
    ideas: [
      'Условие в `if` обязано быть `boolean`. Запись `if (x)` в Java не компилируется, если x — число.',
      'Проверки идут сверху вниз, выполняется первая истинная ветка. Порядок условий важен.',
      '`&&` и `||` вычисляются с коротким замыканием: правая часть может не выполниться.',
      'Вложенные `if` часто стоит вынести в отдельный метод — так код проще читать и тестировать.'
    ],
    sources: [
      {
        file: '_1/if_else/IfElse.java',
        focus: [
          { method: 'demonstrateBasicIf', note: 'Базовый if и обязательный boolean.' },
          { method: 'demonstrateIfElseIf', note: 'Цепочка else-if и порядок проверок.' },
          { method: 'demonstrateLogicalOperators', note: '&&, ||, ! и короткое замыкание.' }
        ]
      },
      {
        file: '_1/if_else/AssigningWithIfElse.java',
        focus: [{ method: 'main', note: 'Присваивание переменной в каждой ветке: к моменту использования она точно инициализирована.' }]
      }
    ],
    runs: ['org.baileyseyes._1.if_else.IfElse'],
    practice: {
      task: 'Напиши классификатор оценки: 90+ — A, 80+ — B, 70+ — C, 60+ — D, иначе F. Затем добавь проверку, что оценка находится в диапазоне 0..100.',
      hint: 'Сначала проверьте границы, затем используйте else-if от большего к меньшему.',
      solution:
        'int score = 85;\nif (score < 0 || score > 100) {\n    System.out.println("Некорректная оценка");\n} else if (score >= 90) {\n    System.out.println("A");\n} else if (score >= 80) {\n    System.out.println("B");\n} else if (score >= 70) {\n    System.out.println("C");\n} else if (score >= 60) {\n    System.out.println("D");\n} else {\n    System.out.println("F");\n}'
    },
    quiz: [
      {
        q: 'Почему `if (x)` не компилируется, если x — int?',
        options: ['В Java нет if для чисел', 'Условие должно быть boolean', 'Нужны фигурные скобки', 'Нужно написать if x'],
        answer: 1,
        explain: 'В отличие от C/C++, в Java условие обязано иметь тип boolean.'
      },
      {
        q: 'Сколько веток выполнится в цепочке if / else if / else?',
        options: ['Все истинные', 'Ровно одна', 'Всегда две', 'Ни одной'],
        answer: 1,
        explain: 'Выполняется первая истинная ветка, остальные пропускаются.'
      }
    ]
  },
  {
    id: 'for-loop',
    title: 'Цикл for',
    summary: 'Классический for, for-each, вложенные циклы и break/continue.',
    minutes: 10,
    goal:
      'Освоить все формы for и научиться выбирать между классическим циклом, for-each и вложенными циклами.',
    ideas: [
      'У классического `for` три части: инициализация, условие и шаг. Переменная счётчика живёт внутри цикла.',
      '`for-each` короче и безопаснее, когда индекс не нужен, но не даёт изменить элементы массива через переменную цикла.',
      'Вложенные циклы нужны для таблиц и матриц; следите за сложностью O(n²).',
      '`break` выходит из всего цикла, `continue` пропускает текущую итерацию.'
    ],
    sources: [
      {
        file: '_1/cycles/For.java',
        focus: [
          { method: 'demonstrateBasicFor', note: 'Три части for и область видимости счётчика.' },
          { method: 'demonstrateEnhancedFor', note: 'for-each для массива и коллекции.' },
          { method: 'demonstrateNestedFor', note: 'Вложенные циклы на примере таблицы умножения.' },
          { method: 'demonstrateBreakContinue', note: 'break и continue: разница в управлении циклом.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.cycles.For'],
    practice: {
      task: 'Выведи таблицу умножения 1..5 в виде строк. Затем посчитай сумму чётных чисел от 1 до 20, используя continue.',
      hint: 'Внешний цикл отвечает за строку, внутренний — за столбцы. Для суммы заведите переменную до цикла.',
      solution:
        'for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5; j++) {\n        System.out.print((i * j) + "\\t");\n    }\n    System.out.println();\n}\n\nint sum = 0;\nfor (int i = 1; i <= 20; i++) {\n    if (i % 2 != 0) continue;\n    sum += i;\n}\nSystem.out.println(sum);'
    },
    quiz: [
      {
        q: 'Сколько раз выполнится тело `for (int i = 0; i < 5; i++)`?',
        options: ['4', '5', '6', 'Бесконечно'],
        answer: 1,
        explain: 'i принимает значения 0, 1, 2, 3, 4 — всего пять итераций.'
      },
      {
        q: 'Чем break отличается от continue?',
        options: ['Ничем', 'break выходит из цикла, continue пропускает итерацию', 'continue выходит из цикла, break пропускает итерацию', 'break работает только в for-each'],
        answer: 1,
        explain: '`break` завершает цикл, `continue` переходит к следующей итерации.'
      }
    ]
  },
  {
    id: 'while-loop',
    title: 'Циклы while и do-while',
    summary: 'Циклы с предусловием и постусловием, break/continue, валидация ввода.',
    minutes: 9,
    goal:
      'Понять, когда нужен while вместо for, чем do-while отличается от while и как не поймать бесконечный цикл.',
    ideas: [
      '`while` проверяет условие до выполнения тела, поэтому может не выполниться ни разу.',
      '`do-while` выполняет тело хотя бы один раз — удобно для меню и повторного ввода.',
      'Бесконечный цикл часто получается, если внутри не меняется переменная условия.',
      '`break` и `continue` работают так же, как в for; для ввода с клавиатуры часто нужен `break` по команде выхода.'
    ],
    sources: [
      {
        file: '_1/cycles/While.java',
        focus: [
          { method: 'demonstrateBasicWhile', note: 'Цикл с предусловием и изменение переменной условия.' },
          { method: 'demonstrateDoWhile', note: 'do-while: тело выполняется до первой проверки.' },
          { method: 'demonstrateWhileBreakContinue', note: 'Управление циклом через break и continue.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.cycles.While'],
    practice: {
      task: 'Выведи числа от 10 до 1 через while, затем повтори то же через do-while. Объясни, чем будут отличаться результаты, если условие сразу ложно.',
      hint: 'Попробуйте начать с числа 0 при условии `> 10`: while не выполнится, do-while выполнится один раз.',
      solution:
        'int n = 10;\nwhile (n >= 1) {\n    System.out.print(n + " ");\n    n--;\n}\nSystem.out.println();\n\nn = 10;\ndo {\n    System.out.print(n + " ");\n    n--;\n} while (n >= 1);\nSystem.out.println();'
    },
    quiz: [
      {
        q: 'Чем do-while отличается от while?',
        options: ['do-while быстрее', 'do-while выполняет тело хотя бы один раз', 'while не поддерживает break', 'do-while работает только с числами'],
        answer: 1,
        explain: 'В do-while условие проверяется после тела, поэтому первая итерация гарантирована.'
      },
      {
        q: 'Что чаще всего приводит к бесконечному while?',
        options: ['Отсутствие фигурных скобок', 'Переменная условия не меняется', 'Использование continue', 'Слишком длинное условие'],
        answer: 1,
        explain: 'Если условие остаётся истинным и внутри нет break, цикл не завершится.'
      }
    ]
  },
  {
    id: 'methods',
    title: 'Методы',
    summary: 'Параметры, возвращаемые значения, перегрузка и декомпозиция.',
    minutes: 11,
    goal:
      'Научиться выносить повторяющуюся логику в методы, понимать сигнатуру, return и перегрузку.',
    ideas: [
      'Метод — именованный блок логики. Сигнатура включает имя и типы параметров, но не возвращаемый тип.',
      '`void` означает «ничего не возвращает»; метод с возвращаемым типом обязан вернуть значение на всех путях.',
      'Перегрузка — это несколько методов с одним именем и разными параметрами. Компилятор выбирает подходящий по аргументам.',
      'Хороший метод делает одну понятную вещь. Если метод трудно назвать глаголом, возможно, он делает слишком много.'
    ],
    sources: [
      {
        file: '_1/methods/Methods.java',
        focus: [
          { method: 'methodWithoutReturnAndParameters', note: 'Самый простой метод: без параметров и без возврата.' },
          { method: 'methodWithReturnAndParameters', note: 'Параметры и return.' },
          { method: 'methodWithMultipleParameters', note: 'Несколько параметров и читаемый вызов.' },
          { method: 'increaseAge', note: 'Метод меняет переданное значение; подумайте, где здесь примитив, а где ссылка.' },
          { method: 'main', note: 'Как методы вызываются из main.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.methods.Methods'],
    practice: {
      task: 'Напиши метод `int max(int a, int b)`, который возвращает большее число. Затем перегрузи `print` для int и String.',
      hint: 'Для перегрузки достаточно одинакового имени и разных типов или количества параметров.',
      solution:
        'static int max(int a, int b) {\n    return a > b ? a : b;\n}\n\nstatic void print(int value) {\n    System.out.println("int: " + value);\n}\n\nstatic void print(String value) {\n    System.out.println("String: " + value);\n}\n\nSystem.out.println(max(3, 7));\nprint(42);\nprint("Java");'
    },
    quiz: [
      {
        q: 'Что входит в сигнатуру метода?',
        options: ['Только имя', 'Имя и типы параметров', 'Имя и возвращаемый тип', 'Тело метода'],
        answer: 1,
        explain: 'Сигнатура — имя плюс типы параметров. Возвращаемый тип в сигнатуру не входит.'
      },
      {
        q: 'Что означает void в объявлении метода?',
        options: ['Метод возвращает null', 'Метод ничего не возвращает', 'Метод нельзя вызвать', 'Метод асинхронный'],
        answer: 1,
        explain: '`void` означает отсутствие возвращаемого значения.'
      }
    ]
  },
  {
    id: 'console-input',
    title: 'Ввод с клавиатуры: Scanner',
    summary: 'Чтение чисел и строк, hasNextInt и безопасная обработка неверного ввода.',
    minutes: 10,
    goal:
      'Научиться читать данные через Scanner, понимать разницу между next и nextLine и не падать на неверном вводе.',
    ideas: [
      '`new Scanner(System.in)` читает с клавиатуры, а `new Scanner("42")` — из строки. Приёмы чтения одинаковые.',
      '`nextInt` читает число, `next` — слово, `nextLine` — всю строку до перевода строки.',
      'После `nextInt` в буфере остаётся перевод строки. Если дальше нужен `nextLine`, сначала вызовите пустой `nextLine()`.',
      '`hasNextInt` проверяет, можно ли прочитать число. Так можно пропустить мусор или попросить повторить ввод.',
      '`Scanner` учитывает локаль: в русской локали дробное число может ждать запятую. В примере локаль зафиксирована через `useLocale(Locale.US)`.'
    ],
    sources: [
      {
        file: '_1/methods/ConsoleInput.java',
        focus: [
          { method: 'demonstrateReadFromString', note: 'nextInt, next и nextDouble на одном источнике.' },
          { method: 'demonstrateSum', note: 'hasNextInt защищает от чтения за концом ввода.' },
          { method: 'readIntSafely', note: 'Неверные токены пропускаются, число читается без исключения.' },
          { method: 'main', note: 'Примеры со строкой и комментарий про Scanner(System.in).' }
        ]
      }
    ],
    runs: ['org.baileyseyes._1.methods.ConsoleInput'],
    practice: {
      task: 'Создай `Scanner` поверх строки `"42 Анна"`. Прочитай число и имя через `nextInt` и `next`, затем выведи их.',
      hint: 'Порядок вызовов должен совпадать с порядком данных в строке.',
      solution:
        'Scanner scanner = new Scanner("42 Анна");\nint number = scanner.nextInt();\nString name = scanner.next();\nSystem.out.println(number);\nSystem.out.println(name);'
    },
    quiz: [
      {
        q: 'Чем `next()` отличается от `nextLine()`?',
        options: ['Ничем', '`next` читает слово, `nextLine` — строку до конца строки', '`nextLine` читает только числа', '`next` работает только с файлами'],
        answer: 1,
        explain: '`next` останавливается на пробеле, `nextLine` забирает весь остаток строки.'
      },
      {
        q: 'Зачем нужен `hasNextInt()`?',
        options: ['Чтобы создать Scanner', 'Чтобы проверить, можно ли прочитать следующее значение как int', 'Чтобы закрыть поток', 'Чтобы перевести строку в верхний регистр'],
        answer: 1,
        explain: 'Проверка позволяет избежать исключения, если следующий токен не является числом.'
      }
    ]
  }
];
