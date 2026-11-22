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
