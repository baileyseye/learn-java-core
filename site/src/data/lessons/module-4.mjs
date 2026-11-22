export default [
  {
    id: 'exceptions-intro',
    title: 'try, catch, finally',
    summary: 'Как ловить исключения, почему порядок catch важен и когда выполняется finally.',
    minutes: 12,
    goal:
      'Научиться обрабатывать ошибки так, чтобы программа не падала и не скрывала проблему, а сообщала о ней понятно.',
    ideas: [
      'Исключение — объект, который создаётся в месте ошибки и летит вверх по стеку вызовов.',
      '`catch` перехватывает исключение. Ловите конкретные типы и ставьте более общие `catch` ниже.',
      '`finally` выполняется почти всегда: и при успехе, и при исключении. Его используют для освобождения ресурсов.',
      '`throw` бросает исключение, `throws` объявляет, что метод может это сделать. Checked-исключения требуют обработки или объявления.'
    ],
    sources: [
      {
        file: '_4/__start_from_here/HelloExceptionsAndTryCatch.java',
        focus: [{ full: true, note: 'Точка входа в модуль: короткий файл-приглашение, дальше — реальные сценарии.' }]
      },
      {
        file: '_4/try_catch_finally/TryCatchFinally.java',
        focus: [
          { method: 'demonstrateBasicTryCatch', note: 'Базовый try/catch: ошибка перехвачена, программа продолжает работу.' },
          { method: 'demonstrateMultipleCatchBlocks', note: 'Несколько catch: от конкретного к общему.' },
          { method: 'demonstrateFinallyBlock', note: 'finally выполняется и при успехе, и при исключении.' },
          { method: 'demonstrateCustomException', note: 'Своё исключение и его перехват.' },
          { symbol: 'InvalidAgeException', note: 'Так выглядит пользовательское исключение.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._4.try_catch_finally.TryCatchFinally'],
    practice: {
      task: 'Напиши метод `divide(int a, int b)`, который ловит деление на ноль, печатает понятное сообщение и возвращает 0. Проверь его на `b = 0` и `b = 2`.',
      hint: 'Деление на ноль для int выбрасывает `ArithmeticException`. Не забудьте вернуть результат после try/catch.',
      solution:
        'static int divide(int a, int b) {\n    try {\n        return a / b;\n    } catch (ArithmeticException e) {\n        System.out.println("На ноль делить нельзя: " + a + " / " + b);\n        return 0;\n    }\n}\n\nSystem.out.println(divide(10, 0));\nSystem.out.println(divide(10, 2));'
    },
    quiz: [
      {
        q: 'Когда выполняется блок finally?',
        options: ['Только при успехе', 'Только при исключении', 'При успехе и при исключении (за редкими исключениями)', 'Только если есть catch'],
        answer: 2,
        explain: 'finally выполняет код очистки почти всегда; например, не выполнится при `System.exit`.'
      },
      {
        q: 'Почему catch для Exception лучше ставить после конкретных исключений?',
        options: ['Иначе код не скомпилируется', 'Общий catch перехватит всё и сделает остальные ветки недостижимыми', 'Так быстрее работает', 'Это требование JVM'],
        answer: 1,
        explain: 'Если общий тип стоит первым, более конкретные catch ниже недостижимы, и компилятор выдаст ошибку.'
      }
    ]
  },
  {
    id: 'exception-types',
    title: 'Виды исключений',
    summary: 'Checked и unchecked, иерархия Throwable и частые ошибки времени выполнения.',
    minutes: 10,
    goal:
      'Понять разницу между checked- и unchecked-исключениями и узнать, какие ошибки встречаются в коде чаще всего.',
    ideas: [
      'Все ошибки наследуют `Throwable`. Ветка `Error` означает серьёзные проблемы JVM, а `Exception` — то, что обычно обрабатывает программа.',
      'Checked-исключения компилятор требует обработать или объявить в `throws`. Пример — `IOException`.',
      'Unchecked-исключения наследуют `RuntimeException`: `NullPointerException`, `ArrayIndexOutOfBoundsException`, `NumberFormatException`.',
      'Не ловите `Exception` или `Throwable` без причины: так можно скрыть ошибку, которую нужно исправить.'
    ],
    sources: [
      {
        file: '_4/exception/ExceptionTypes.java',
        focus: [
          { method: 'demonstrateHierarchy', note: 'IOException и NullPointerException в иерархии Exception.' },
          { method: 'demonstrateCommonExceptions', note: 'Три частые runtime-ошибки и их перехват.' },
          { method: 'main', note: 'Оба сценария в одном запуске.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._4.exception.ExceptionTypes'],
    practice: {
      task: 'Поймай `NullPointerException` при вызове `text.length()` для null-строки и `ArrayIndexOutOfBoundsException` при обращении к `numbers[5]`. Выведи simple name каждого исключения.',
      hint: 'Используйте `e.getClass().getSimpleName()`, чтобы получить имя без пакета.',
      solution:
        'String text = null;\ntry {\n    text.length();\n} catch (NullPointerException e) {\n    System.out.println(e.getClass().getSimpleName());\n}\n\nint[] numbers = {1, 2, 3};\ntry {\n    System.out.println(numbers[5]);\n} catch (ArrayIndexOutOfBoundsException e) {\n    System.out.println(e.getClass().getSimpleName());\n}'
    },
    quiz: [
      {
        q: 'Какое исключение является checked?',
        options: ['NullPointerException', 'IOException', 'NumberFormatException', 'ArrayIndexOutOfBoundsException'],
        answer: 1,
        explain: '`IOException` наследует Exception, но не RuntimeException, поэтому компилятор требует его обработки.'
      },
      {
        q: 'Что наследует `RuntimeException`?',
        options: ['Все checked-исключения', 'Unchecked-исключения', 'Только Error', 'Ничего'],
        answer: 1,
        explain: 'Unchecked-исключения — это RuntimeException и его наследники.'
      }
    ]
  },
  {
    id: 'throw-and-throws',
    title: 'throw и throws',
    summary: 'Как бросить исключение, объявить его в сигнатуре и пробросить вверх по стеку.',
    minutes: 10,
    goal:
      'Научиться осознанно бросать исключения из методов, объявлять checked-исключения через `throws` и понимать, как они движутся по стеку.',
    ideas: [
      '`throw new SomeException(...)` создаёт и сразу бросает исключение.',
      '`throws` в сигнатуре предупреждает вызывающий код: метод может выбросить checked-исключение.',
      'Если метод не обрабатывает исключение, оно пробрасывается вызывающему. Обработать его можно на любом уровне выше.',
      'При wrapping полезно сохранять причину: `new MyException("...", cause)`, иначе исходная ошибка потеряется.'
    ],
    sources: [
      {
        file: '_4/exception/ThrowAndThrows.java',
        focus: [
          { symbol: 'AgeException', note: 'Своё checked-исключение.' },
          { method: 'parseAge', note: 'throws в сигнатуре и два разных throw внутри.' },
          { method: 'levelThree', note: 'Нижний уровень бросает исключение.' },
          { method: 'levelOne', note: 'Верхний уровень ловит и печатает сообщение.' },
          { method: 'main', note: 'Проверка неверного возраста и нечисловой строки.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._4.exception.ThrowAndThrows'],
    practice: {
      task: 'В методе `parseAge` брось `Exception` с сообщением `"Возраст не может быть отрицательным"`, если `age < 0`. Метод уже объявляет `throws Exception`.',
      hint: 'Используйте `throw new Exception("...")`. Сообщение затем выведется через `getMessage()`.',
      solution:
        'if (age < 0) {\n    throw new Exception("Возраст не может быть отрицательным");\n}'
    },
    quiz: [
      {
        q: 'Чем `throw` отличается от `throws`?',
        options: ['Ничем', '`throw` бросает исключение, `throws` объявляет его в сигнатуре', '`throws` бросает исключение, `throw` объявляет', '`throw` работает только с Error'],
        answer: 1,
        explain: '`throw` — действие внутри метода, `throws` — часть объявления метода.'
      },
      {
        q: 'Что произойдёт, если checked-исключение не обработать и не объявить?',
        options: ['Программа запустится', 'Код не скомпилируется', 'Исключение станет unchecked', 'JVM проигнорирует его'],
        answer: 1,
        explain: 'Компилятор требует для checked-исключения либо catch, либо `throws` в сигнатуре.'
      }
    ]
  },
  {
    id: 'stack-trace',
    title: 'Как читать stack trace',
    summary: 'Сообщение, тип исключения и стек вызовов: где искать причину ошибки.',
    minutes: 8,
    goal:
      'Перестать бояться красного текста в консоли и научиться находить по stack trace свой метод, строку и причину сбоя.',
    ideas: [
      'Первая строка stack trace содержит тип исключения и сообщение — это краткое описание проблемы.',
      'Стек читают сверху вниз: сверху место, где ошибка возникла, ниже — кто вызвал этот метод.',
      'Ищите в стеке свои классы и пакет проекта. Строки библиотек важны, но начинать удобнее со своего кода.',
      '`getMessage()` возвращает сообщение, `getStackTrace()` — массив кадров, `toString()` — тип и сообщение одной строкой.'
    ],
    sources: [
      {
        file: '_4/exception/StackTraceDemo.java',
        focus: [
          { method: 'levelThree', note: 'Место, где реально возникло исключение.' },
          { method: 'demonstrateReadingStackTrace', note: 'Печать сообщения, типа и только своих кадров стека.' },
          { method: 'main', note: 'Точка запуска примера.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._4.exception.StackTraceDemo'],
    practice: {
      task: 'Поймай `IllegalStateException` из `levelOne()`, выведи `getMessage()` и обойди `getStackTrace()` циклом, печатая имена методов.',
      hint: 'Массив `StackTraceElement[]` обходится обычным for-each. У каждого элемента есть `getMethodName()`.',
      solution:
        'try {\n    levelOne();\n} catch (IllegalStateException e) {\n    System.out.println(e.getMessage());\n    for (StackTraceElement element : e.getStackTrace()) {\n        System.out.println(element.getMethodName());\n    }\n}'
    },
    quiz: [
      {
        q: 'Где в stack trace находится место возникновения ошибки?',
        options: ['В самом низу', 'В первой строке после типа и сообщения', 'В последней строке файла', 'В комментарии'],
        answer: 1,
        explain: 'Верхний кадр стека — метод, в котором исключение было создано или брошено.'
      },
      {
        q: 'Что возвращает `getMessage()`?',
        options: ['Имя класса исключения', 'Текстовое сообщение исключения', 'Номер строки', 'Весь стек'],
        answer: 1,
        explain: '`getMessage()` возвращает описание, переданное в конструктор исключения.'
      }
    ]
  },
  {
    id: 'try-with-resources',
    title: 'try-with-resources',
    summary: 'Автоматическое закрытие ресурсов и suppressed exceptions.',
    minutes: 11,
    goal:
      'Научиться освобождать файлы, потоки и соединения без ручного finally, даже если внутри блока произошла ошибка.',
    ideas: [
      'Ресурс — объект, реализующий `AutoCloseable` (например, файл или Reader).',
      '`try (resource)` автоматически вызывает `close()` после блока, даже при исключении.',
      'Несколько ресурсов закрываются в обратном порядке объявления.',
      'Если при закрытии тоже возникла ошибка, она попадает в suppressed exceptions основного исключения.'
    ],
    sources: [
      {
        file: '_4/try_catch_finally/TryWithResources.java',
        focus: [
          { method: 'demonstrateBasicTryWithResources', note: 'Reader закрывается автоматически.' },
          { method: 'demonstrateMultipleResources', note: 'Несколько ресурсов в одном try.' },
          { symbol: 'CustomResource', note: 'Свой ресурс: достаточно реализовать AutoCloseable.' },
          { method: 'main', note: 'Все сценарии вместе.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._4.try_catch_finally.TryWithResources'],
    practice: {
      task: 'Создай класс `Timer implements AutoCloseable` с методом `close()`, который печатает «timer stopped». Используй его в try-with-resources.',
      hint: 'Сигнатура `close()` может бросать Exception, но можно не бросать.',
      solution:
        'class Timer implements AutoCloseable {\n    Timer() {\n        System.out.println("timer started");\n    }\n\n    @Override\n    public void close() {\n        System.out.println("timer stopped");\n    }\n}\n\ntry (Timer timer = new Timer()) {\n    System.out.println("working");\n}'
    },
    quiz: [
      {
        q: 'В каком порядке закрываются ресурсы в try-with-resources?',
        options: ['В порядке объявления', 'В обратном порядке', 'Все одновременно', 'Только последний'],
        answer: 1,
        explain: 'Ресурсы закрываются в обратном порядке, как вложенные блоки finally.'
      },
      {
        q: 'Что нужно реализовать классу, чтобы его можно было использовать в try-with-resources?',
        options: ['Serializable', 'AutoCloseable', 'Runnable', 'Comparable'],
        answer: 1,
        explain: 'Try-with-resources работает с типами, реализующими `AutoCloseable` (или `Closeable`).'
      }
    ]
  },
  {
    id: 'custom-exceptions',
    title: 'Свои исключения и валидация',
    summary: 'Checked-исключения, сообщения, причины и проверка данных на входе.',
    minutes: 11,
    goal:
      'Научиться описывать предметные ошибки собственными исключениями и использовать их для валидации.',
    ideas: [
      'Своё checked-исключение наследуют от `Exception`, unchecked — от `RuntimeException`.',
      'Хорошее исключение содержит понятное сообщение и, при необходимости, причину (`cause`).',
      'Валидация должна происходить на границе: не пропускайте заведомо некорректные данные внутрь.',
      'Не глотайте исключения пустым catch: пользователь и логи потеряют информацию о проблеме.'
    ],
    sources: [
      {
        file: '_4/exception/HumanNotFoundException.java',
        focus: [{ full: true, note: 'Минимальное checked-исключение с сообщением.' }]
      },
      {
        file: '_4/exception/HumanWithExceptions.java',
        focus: [
          { method: 'findHumanByName', note: 'Поиск, который бросает HumanNotFoundException.' },
          { method: 'validateAge', note: 'Проверка возраста и выброс исключения при ошибке.' },
          { method: 'main', note: 'Как исключения обрабатываются в сценарии.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._4.exception.HumanWithExceptions'],
    practice: {
      task: 'Создай unchecked-исключение `InvalidAgeException` и бросай его из сеттера, если возраст меньше 0 или больше 120.',
      hint: 'Наследуйтесь от RuntimeException, чтобы не добавлять throws в каждый метод.',
      solution:
        'class InvalidAgeException extends RuntimeException {\n    InvalidAgeException(String message) {\n        super(message);\n    }\n}\n\npublic void setAge(int age) {\n    if (age < 0 || age > 120) {\n        throw new InvalidAgeException("Некорректный возраст: " + age);\n    }\n    this.age = age;\n}'
    },
    quiz: [
      {
        q: 'От какого класса наследуют checked-исключения?',
        options: ['RuntimeException', 'Exception (но не RuntimeException)', 'Error', 'Throwable'],
        answer: 1,
        explain: 'Checked-исключения наследуют от Exception, но не от RuntimeException.'
      },
      {
        q: 'Почему пустой catch опасен?',
        options: ['Он не компилируется', 'Он скрывает ошибку и затрудняет диагностику', 'Он работает медленнее', 'Он удаляет исключение из памяти'],
        answer: 1,
        explain: 'Пустой catch «проглатывает» проблему: программа продолжает работу в неверном состоянии.'
      }
    ]
  }
];
