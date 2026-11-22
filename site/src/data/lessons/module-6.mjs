export default [
  {
    id: 'threads-overview',
    title: 'Зачем нужны потоки',
    summary: 'Процессы, потоки, общая память и цена конкурентности.',
    minutes: 7,
    goal:
      'Понять базовую модель потоков Java и осознать, что многопоточность нужна не всегда, а ошибки в ней дорого стоят.',
    ideas: [
      'Поток — это независимая последовательность выполнения внутри процесса. Потоки делят память процесса.',
      'Главный поток запускает `main`. Дополнительные потоки создаются через `Thread` или `ExecutorService`.',
      'Общая изменяемая память — главный источник гонок. Если данные не меняются, конкурентность безопаснее.',
      'Большинство прикладных задач решаются executor-ами и библиотеками, а не ручным созданием потоков.'
    ],
    sources: [
      {
        file: '_6/__start_from_here__/HelloMultiThreading.java',
        focus: [{ full: true, note: 'Точка входа в модуль. Дальше — способы создания потоков и защита общих данных.' }]
      }
    ],
    practice: {
      task: 'Назови три ситуации, где конкурентность действительно полезна, и одну, где она только усложнит код.',
      hint: 'Подумайте про сетевые запросы, обработку независимых файлов, UI и простой подсчёт на маленьком массиве.',
      solution:
        'Полезно: параллельные HTTP-запросы; обработка независимых файлов; сервер, обслуживающий много клиентов.\nНе нужно: подсчёт суммы массива из 100 чисел — накладные расходы больше выгоды.'
    },
    quiz: [
      {
        q: 'Что общего у потоков одного процесса?',
        options: ['Стеки вызовов', 'Память процесса', 'Программные счётчики', 'Локальные переменные методов'],
        answer: 1,
        explain: 'Потоки имеют свои стеки, но делят общую кучу и другие ресурсы процесса.'
      },
      {
        q: 'Почему конкуентность опасна?',
        options: ['Она замедляет компиляцию', 'Общие изменяемые данные могут привести к гонкам', 'Java не поддерживает потоки', 'Она запрещена в серверных приложениях'],
        answer: 1,
        explain: 'Без синхронизации потоки могут читать и менять данные в непредсказуемом порядке.'
      }
    ]
  },
  {
    id: 'thread-lifecycle',
    title: 'Жизненный цикл потока',
    summary: 'NEW, RUNNABLE, TIMED_WAITING, TERMINATED, sleep, interrupt и join.',
    minutes: 10,
    goal:
      'Понять, какие состояния проходит поток, зачем нужны sleep и join и как корректно попросить поток остановиться.',
    ideas: [
      'После создания поток находится в `NEW`, после `start()` — в `RUNNABLE`, после завершения — в `TERMINATED`.',
      '`Thread.sleep(ms)` переводит поток в `TIMED_WAITING`: поток не выполняется, но остаётся живым.',
      '`interrupt()` не убивает поток, а выставляет флаг прерывания. Спящий поток получает `InterruptedException`.',
      '`join()` блокирует текущий поток, пока другой не завершится. Без join main может закончиться раньше дочернего потока.'
    ],
    sources: [
      {
        file: '_6/ThreadLifecycle.java',
        focus: [
          { method: 'demonstrateSleepAndJoin', note: 'worker спит, main ждёт через join.' },
          { method: 'demonstrateInterrupt', note: 'interrupt прерывает сон и обрабатывается в catch.' },
          { method: 'demonstrateStates', note: 'getState до старта и после завершения.' },
          { method: 'main', note: 'Три сценария по порядку.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._6.ThreadLifecycle'],
    practice: {
      task: 'В потоке `worker` выведи `"worker: старт"`, усыпи поток на 100 мс, выведи `"worker: конец"`. В main запусти поток, дождись через `join` и выведи `"main: worker завершён"`.',
      hint: '`Thread.sleep(100)` может бросить `InterruptedException`, поэтому нужен try/catch или `throws` в main.',
      solution:
        'Thread worker = new Thread(() -> {\n    System.out.println("worker: старт");\n    try {\n        Thread.sleep(100);\n    } catch (InterruptedException e) {\n        Thread.currentThread().interrupt();\n    }\n    System.out.println("worker: конец");\n});\nworker.start();\nworker.join();\nSystem.out.println("main: worker завершён");'
    },
    quiz: [
      {
        q: 'Что делает `join()`?',
        options: ['Запускает поток', 'Ждёт завершения потока', 'Прерывает поток', 'Меняет приоритет'],
        answer: 1,
        explain: '`join()` блокирует вызывающий поток до завершения указанного потока.'
      },
      {
        q: 'Что произойдёт со спящим потоком при `interrupt()`?',
        options: ['Он мгновенно завершится без кода', 'Он получит InterruptedException', 'Ничего', 'Он станет демоном'],
        answer: 1,
        explain: '`sleep` и `wait` реагируют на прерывание исключением `InterruptedException`.'
      }
    ]
  },
  {
    id: 'thread-vs-runnable',
    title: 'Thread и Runnable',
    summary: 'Два способа создать поток, start против run и почему Runnable предпочтительнее.',
    minutes: 10,
    goal:
      'Научиться запускать задачи в отдельных потоках и понимать разницу между «создать поток» и «выполнить код в текущем потоке».',
    ideas: [
      '`extends Thread` переопределяет `run()`, но занимает единственный слот наследования.',
      '`implements Runnable` отделяет задачу от механизма выполнения — это предпочтительный способ.',
      '`start()` создаёт новый поток и вызывает `run()` в нём. Прямой вызов `run()` выполнит код в текущем потоке.',
      '`join()` ждёт завершения потока; без него main может закончиться раньше дочерних потоков.'
    ],
    sources: [
      {
        file: '_6/extends_thread/ExtendsThread.java',
        focus: [
          { method: 'run', note: 'Что выполняется в новом потоке.' },
          { method: 'demonstrateCreationAndExecution', note: 'Создание, start и join.' }
        ]
      },
      {
        file: '_6/implements_runnable/ImplementsRunnable.java',
        focus: [
          { method: 'run', note: 'Задача отдельно от потока.' },
          { method: 'demonstrateCreationAndExecution', note: 'Runnable, Thread и лямбда.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._6.extends_thread.ExtendsThread', 'org.baileyseyes._6.implements_runnable.ImplementsRunnable'],
    practice: {
      task: 'Запусти два потока через Runnable: первый печатает числа 1..3, второй — буквы A..C. Добавь join и объясни, почему порядок вывода может меняться.',
      hint: 'Создайте два `Thread` с лямбдами и вызовите `start()`, затем `join()` для обоих.',
      solution:
        'Thread numbers = new Thread(() -> {\n    for (int i = 1; i <= 3; i++) System.out.println(i);\n});\nThread letters = new Thread(() -> {\n    for (char c = \'A\'; c <= \'C\'; c++) System.out.println(c);\n});\nnumbers.start();\nletters.start();\nnumbers.join();\nletters.join();'
    },
    quiz: [
      {
        q: 'Чем start() отличается от run()?',
        options: ['Ничем', 'start создаёт новый поток, run выполняет код в текущем', 'run создаёт новый поток, start — нет', 'start можно вызывать только один раз'],
        answer: 1,
        explain: '`start()` запускает новый поток; прямой `run()` — обычный вызов метода.'
      },
      {
        q: 'Почему Runnable часто предпочтительнее наследования Thread?',
        options: ['Он быстрее', 'Не занимает наследование и отделяет задачу от потока', 'Он не требует start', 'Он автоматически синхронизирован'],
        answer: 1,
        explain: 'Композиция задачи и механизма выполнения гибче, чем наследование.'
      }
    ]
  },
  {
    id: 'executor-service',
    title: 'Пул потоков: ExecutorService',
    summary: 'execute, submit, invokeAll и shutdown: как переиспользовать потоки, а не создавать их вручную.',
    minutes: 11,
    goal:
      'Научиться запускать задачи через пул потоков и понимать, когда нужен результат в Future, а когда достаточно выполнить действие.',
    ideas: [
      'Создавать `new Thread` на каждую задачу дорого. `ExecutorService` переиспользует ограниченное число потоков.',
      '`execute` запускает `Runnable` без результата, `submit` возвращает `Future` с результатом.',
      '`invokeAll` запускает пачку задач и возвращает список Future в том же порядке, в котором были задачи.',
      'Пул нужно закрывать: `shutdown()` перестаёт принимать новые задачи, `awaitTermination` ждёт завершения уже запущенных.'
    ],
    sources: [
      {
        file: '_6/ExecutorServiceDemo.java',
        focus: [
          { method: 'demonstrateExecute', note: 'execute без результата и корректное закрытие пула.' },
          { method: 'demonstrateSubmit', note: 'submit возвращает Future, get забирает результат.' },
          { method: 'demonstrateInvokeAll', note: 'Три задачи и сумма результатов.' },
          { method: 'main', note: 'Все три сценария.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._6.ExecutorServiceDemo'],
    practice: {
      task: 'Создай `ExecutorService` на два потока, отправь задачу через `submit`, которая возвращает `42`, получи результат через `Future.get()` и вызови `shutdown()`.',
      hint: '`submit(() -> 42)` вернёт `Future<Integer>`. Не забудьте `throws Exception` у main.',
      solution:
        'ExecutorService executor = Executors.newFixedThreadPool(2);\nFuture<Integer> future = executor.submit(() -> 42);\nSystem.out.println(future.get());\nexecutor.shutdown();'
    },
    quiz: [
      {
        q: 'Чем `submit` отличается от `execute`?',
        options: ['Ничем', '`submit` возвращает Future, `execute` — нет', '`execute` возвращает результат, `submit` — нет', '`submit` работает только с Callable'],
        answer: 1,
        explain: '`submit` возвращает Future, из которого можно получить результат или исключение.'
      },
      {
        q: 'Зачем нужен `shutdown()`?',
        options: ['Чтобы ускорить задачи', 'Чтобы пул перестал принимать новые задачи и завершил текущие', 'Чтобы удалить все потоки мгновенно', 'Чтобы увеличить размер пула'],
        answer: 1,
        explain: '`shutdown()` запускает корректное завершение пула, а `shutdownNow()` пытается прервать задачи.'
      }
    ]
  },
  {
    id: 'callable-future',
    title: 'Callable и Future',
    summary: 'Задачи с результатом, ExecutorService и блокирующий get.',
    minutes: 10,
    goal:
      'Научиться запускать задачи, которые возвращают значение или бросают исключение, и забирать результат через Future.',
    ideas: [
      '`Callable<V>` похож на Runnable, но возвращает `V` и может бросать checked-исключения.',
      '`ExecutorService.submit` возвращает `Future<V>` — обещание результата.',
      '`future.get()` блокирует текущий поток до завершения задачи. Это может быть долго.',
      'ExecutorService нужно закрывать (`shutdown`), иначе потоки могут помешать завершению программы.'
    ],
    sources: [
      {
        file: '_6/implements_callable/ImplementsCallable.java',
        focus: [
          { method: 'call', note: 'Задача возвращает результат через Callable.' },
          { method: 'demonstrateCreationAndExecution', note: 'ExecutorService, submit и Future.get.' },
          { method: 'main', note: 'Точка запуска.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._6.implements_callable.ImplementsCallable'],
    practice: {
      task: 'Отправь в ExecutorService две задачи Callable<Integer>, которые возвращают 20 и 22. Получи оба Future и выведи сумму.',
      hint: 'Не забудьте `executor.shutdown()` после получения результатов.',
      solution:
        'ExecutorService executor = Executors.newFixedThreadPool(2);\nFuture<Integer> a = executor.submit(() -> 20);\nFuture<Integer> b = executor.submit(() -> 22);\nSystem.out.println(a.get() + b.get());\nexecutor.shutdown();'
    },
    quiz: [
      {
        q: 'Чем Callable отличается от Runnable?',
        options: ['Он не может работать в потоке', 'Возвращает результат и может бросать checked-исключения', 'Он всегда быстрее', 'Он не требует ExecutorService'],
        answer: 1,
        explain: 'Callable<V> возвращает V и позволяет checked-исключения; Runnable — нет.'
      },
      {
        q: 'Что делает Future.get()?',
        options: ['Запускает задачу', 'Блокирует поток до получения результата', 'Отменяет задачу', 'Возвращает Future'],
        answer: 1,
        explain: 'get() ждёт завершения задачи и возвращает результат или бросает исключение.'
      }
    ]
  },
  {
    id: 'atomic-variables',
    title: 'AtomicInteger и атомарность',
    summary: 'Почему count++ не атомарен и как AtomicInteger решает гонку без synchronized.',
    minutes: 9,
    goal:
      'Понять, из каких шагов состоит инкремент, почему volatile не спасает и когда достаточно AtomicInteger.',
    ideas: [
      '`count++` — это чтение, сложение и запись. Между этими шагами другой поток может успеть изменить значение.',
      '`volatile` гарантирует видимость, но не атомарность: два потока всё равно могут потерять инкремент.',
      '`AtomicInteger` выполняет операции атомарно через CAS: `incrementAndGet`, `addAndGet`, `compareAndSet`.',
      'Атомики хороши для счётчиков и простых флагов. Для сложных инвариантов из нескольких полей всё ещё нужна блокировка.'
    ],
    sources: [
      {
        file: '_6/AtomicVariables.java',
        focus: [
          { method: 'demonstrateAtomicCounter', note: 'Четыре потока по 1000 инкрементов без потерь.' },
          { method: 'demonstrateOperations', note: 'get, incrementAndGet, addAndGet и compareAndSet.' },
          { method: 'main', note: 'Сначала гонка, затем отдельные операции.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._6.AtomicVariables'],
    practice: {
      task: 'В цикле четырёх потоков по 1000 раз атомарно увеличь `AtomicInteger counter` и после join выведи итог.',
      hint: 'Используйте `counter.incrementAndGet()`. Итог должен быть 4000.',
      solution:
        'AtomicInteger counter = new AtomicInteger();\nThread[] threads = new Thread[4];\nfor (int i = 0; i < threads.length; i++) {\n    threads[i] = new Thread(() -> {\n        for (int j = 0; j < 1000; j++) {\n            counter.incrementAndGet();\n        }\n    });\n    threads[i].start();\n}\nfor (Thread thread : threads) thread.join();\nSystem.out.println(counter.get());'
    },
    quiz: [
      {
        q: 'Почему `volatile int count` не делает `count++` потокобезопасным?',
        options: ['volatile запрещает запись', 'Операция состоит из нескольких шагов и не атомарна', 'volatile работает только с boolean', 'Нужно добавить final'],
        answer: 1,
        explain: 'volatile обеспечивает видимость, но не защищает последовательность чтение-изменение-запись.'
      },
      {
        q: 'Что делает `compareAndSet(expected, newValue)`?',
        options: ['Всегда записывает newValue', 'Записывает newValue, только если текущее значение равно expected', 'Сравнивает два объекта через equals', 'Блокирует поток навсегда'],
        answer: 1,
        explain: 'CAS — атомарная операция: обновление происходит только при совпадении ожидаемого значения.'
      }
    ]
  },
  {
    id: 'synchronized',
    title: 'Гонки и synchronized',
    summary: 'Мониторы, synchronized-методы и блоки, volatile и атомарность.',
    minutes: 14,
    goal:
      'Увидеть, как возникает гонка, и научиться защищать общие данные синхронизацией, не блокируя лишнего.',
    ideas: [
      'Гонка возникает, когда несколько потоков читают и пишут общую переменную без координации.',
      '`synchronized` метод блокирует монитор объекта (`this`), статический — монитор класса.',
      '`synchronized` блок позволяет защитить только критическую секцию, а не весь метод.',
      '`volatile` гарантирует видимость изменений, но не атомарность `count++`. Для счётчиков нужны synchronized или AtomicInteger.'
    ],
    sources: [
      {
        file: '_6/synchronized_method/SynchronizedMethods.java',
        focus: [
          { method: 'incrementCounter', note: 'Синхронизированный метод защищает this.' },
          { method: 'incrementStaticCounter', note: 'Статическая синхронизация защищает класс.' },
          { method: 'synchronizedBlockExample', note: 'Блок синхронизации: защищаем только нужное.' },
          { method: 'demonstrateSynchronization', note: 'Сценарий с несколькими потоками.' },
          { symbol: 'Volatile', note: 'volatile обеспечивает видимость, но не заменяет синхронизацию.' }
        ]
      }
    ],
    runs: ['org.baileyseyes._6.synchronized_method.SynchronizedMethods'],
    practice: {
      task: 'Напиши счётчик с полем int count и методом increment. Запусти 10 потоков по 1000 инкрементов без синхронизации, затем с synchronized и сравни результаты.',
      hint: 'Без синхронизации итог часто меньше 10000. Для корректного варианта добавьте synchronized к increment.',
      solution:
        'class Counter {\n    private int count;\n\n    synchronized void increment() {\n        count++;\n    }\n}\n\nCounter counter = new Counter();\nThread[] threads = new Thread[10];\nfor (int i = 0; i < threads.length; i++) {\n    threads[i] = new Thread(() -> {\n        for (int j = 0; j < 1000; j++) counter.increment();\n    });\n    threads[i].start();\n}\nfor (Thread t : threads) t.join();\nSystem.out.println(counter.count);'
    },
    quiz: [
      {
        q: 'Что гарантирует synchronized?',
        options: ['Скорость выполнения', 'Взаимное исключение и видимость изменений', 'Отсутствие блокировок', 'Автоматическое создание потоков'],
        answer: 1,
        explain: 'Монитор обеспечивает взаимное исключение, а happens-before — видимость изменений.'
      },
      {
        q: 'Почему volatile недостаточно для count++?',
        options: ['volatile запрещает запись', 'Операция count++ не атомарна', 'volatile работает только с boolean', 'Нужно использовать final'],
        answer: 1,
        explain: 'count++ — это чтение, сложение и запись. volatile гарантирует видимость, но не атомарность.'
      }
    ]
  }
];
