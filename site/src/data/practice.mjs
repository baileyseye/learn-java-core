/**
 * Интерактивная практика: стартовый код, ожидаемый результат и правила проверки.
 * Ключ — id урока. Сам текст задания и решение лежат в lesson.practice.
 */
export const practiceExtras = {
  'hello-world': {
    starter: `public class Main {
    public static void main(String[] args) {
        // TODO: выведи Hello World
        // TODO: выведи свою строку
    }
}`,
    expected: `Hello World
Я учу Java`,
    check: {
      counts: [
        {
          pattern: 'System\\.out\\.println',
          min: 2,
          message: 'Нужно два вывода: Hello World и своя строка.'
        }
      ],
      minTokens: 3
    }
  },

  'primitive-types': {
    starter: `public class Main {
    public static void main(String[] args) {
        // TODO: объяви по одной переменной каждого примитивного типа
        // byte, short, int, long, float, double, char, boolean
    }
}`,
    expected: 'Все восемь примитивов объявлены и выведены в консоль.',
    check: {
      includes: [
        { pattern: '\\bbyte\\s+\\w+', message: 'Объяви переменную типа byte.' },
        { pattern: '\\bshort\\s+\\w+', message: 'Объяви переменную типа short.' },
        { pattern: '\\bint\\s+\\w+', message: 'Объяви переменную типа int.' },
        { pattern: '\\blong\\s+\\w+', message: 'Объяви переменную типа long.' },
        { pattern: '\\bfloat\\s+\\w+', message: 'Объяви переменную типа float.' },
        { pattern: '\\bdouble\\s+\\w+', message: 'Объяви переменную типа double.' },
        { pattern: '\\bchar\\s+\\w+', message: 'Объяви переменную типа char.' },
        { pattern: '\\bboolean\\s+\\w+', message: 'Объяви переменную типа boolean.' }
      ],
      minTokens: 3
    }
  },

  'type-conversion': {
    starter: `public class Main {
    public static void main(String[] args) {
        double value = 9.99;
        // TODO: приведи value к int и выведи результат
        // TODO: распарси "42", прибавь 8 и выведи сумму
    }
}`,
    expected: `9
50`,
    check: {
      includes: [
        { pattern: '\\(int\\)', message: 'Для сужения double → int нужно явное приведение (int).' },
        { pattern: 'Integer\\.parseInt', message: 'Строку в число превращает Integer.parseInt.' },
        { pattern: 'System\\.out\\.println', message: 'Выведи оба результата через System.out.println.' }
      ],
      minTokens: 3
    }
  },

  strings: {
    starter: `public class Main {
    public static void main(String[] args) {
        String a = "Java";
        String b = new String("Java");
        // TODO: сравни a и b через == и equals
        // TODO: выведи оба результата
    }
}`,
    expected: `false
true`,
    check: {
      includes: [
        { pattern: 'new\\s+String', message: 'Создай вторую строку через new String(...).' },
        { pattern: '==', message: 'Сравни ссылки через ==.' },
        { pattern: '\\.equals\\s*\\(', message: 'Сравни содержимое через equals.' }
      ],
      minTokens: 3
    }
  },

  arrays: {
    steps: [
      {
        label: 'Шаг 1. Массив и вывод',
        task:
          'Создай массив `int[] numbers = {1, 2, 3, 4, 5}` и выведи его через `Arrays.toString`. Должно получиться `[1, 2, 3, 4, 5]`.',
        hint:
          'Массив можно создать сразу со значениями в фигурных скобках. `Arrays.toString` печатает элементы в квадратных скобках.',
        starter: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // TODO: создай массив numbers со значениями 1..5
        // TODO: выведи его через Arrays.toString
    }
}`,
        expected: '[1, 2, 3, 4, 5]',
        solution: `int[] numbers = {1, 2, 3, 4, 5};
System.out.println(Arrays.toString(numbers));`,
        check: {
          includes: [
            { pattern: 'int\\[\\]', message: 'Объяви массив через int[].' },
            { pattern: 'Arrays\\.toString', message: 'Выведи массив через Arrays.toString.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. new int[5] и индексы',
        task:
          'Создай `int[5]` через `new int[5]`, заполни элементы числами 1..5 по индексам и выведи массив через `Arrays.toString`.',
        hint:
          'Индексы начинаются с 0: `numbers[0]` — первый элемент, `numbers[4]` — последний. Записывай значения по одному.',
        starter: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = new int[5];
        // TODO: заполни элементы числами 1..5
        // TODO: выведи массив через Arrays.toString
    }
}`,
        expected: '[1, 2, 3, 4, 5]',
        solution: `int[] numbers = new int[5];
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
numbers[3] = 4;
numbers[4] = 5;
System.out.println(Arrays.toString(numbers));`,
        check: {
          includes: [
            { pattern: 'new\\s+int\\s*\\[\\s*5\\s*\\]', message: 'Создай массив через new int[5].' },
            { pattern: 'Arrays\\.toString', message: 'Выведи массив через Arrays.toString.' }
          ],
          counts: [
            {
              pattern: 'numbers\\s*\\[\\s*\\d+\\s*\\]\\s*=',
              min: 5,
              message: 'Заполни все пять элементов массива по индексам.'
            }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: квадраты и сумма',
    starter: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] squares = new int[5];
        // TODO: заполни squares квадратами 1..5
        // TODO: выведи массив через Arrays.toString
        // TODO: найди сумму элементов в sum и выведи её
    }
}`,
    expected: `[1, 4, 9, 16, 25]
55`,
    check: {
      includes: [
        { pattern: 'int\\[\\]', message: 'Создай массив int[].' },
        { pattern: 'new\\s+int\\s*\\[\\s*5\\s*\\]', message: 'Выдели массив из пяти элементов.' },
        { pattern: 'Arrays\\.toString', message: 'Выведи массив через Arrays.toString.' },
        { pattern: 'sum\\s*=', message: 'Найди сумму элементов в переменной sum.' }
      ],
      counts: [
        {
          pattern: 'squares\\s*\\[\\s*\\d+\\s*\\]\\s*=',
          min: 5,
          message: 'Заполни все пять элементов массива.'
        }
      ],
      minTokens: 2
    }
  },

  'if-else': {
    starter: `public class Main {
    public static void main(String[] args) {
        int score = 85;
        // TODO: выведи A/B/C/D/F по правилам
        // 90+ A, 80+ B, 70+ C, 60+ D, иначе F
    }
}`,
    expected: 'B',
    check: {
      includes: [
        { pattern: '\\bif\\s*\\(', message: 'Используй if.' },
        { pattern: 'else\\s+if', message: 'Для нескольких диапазонов нужен else if.' },
        { pattern: 'System\\.out\\.println', message: 'Выведи оценку.' }
      ],
      minTokens: 3
    }
  },

  'for-loop': {
    steps: [
      {
        label: 'Шаг 1. Цикл и вывод',
        task: 'Выведи числа от 1 до 5 через `for`, каждое с новой строки.',
        hint: 'Начни с `int i = 1`, продолжай пока `i <= 5`, увеличивай `i++`. Внутри цикла — `System.out.println(i)`.',
        starter: `public class Main {
    public static void main(String[] args) {
        // TODO: выведи 1 2 3 4 5, каждое число с новой строки
    }
}`,
        expected: `1
2
3
4
5`,
        solution: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`,
        check: {
          includes: [
            { pattern: 'for\\s*\\(', message: 'Используй цикл for.' },
            { pattern: 'System\\.out\\.println', message: 'Выведи число через System.out.println.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. Сумма в цикле',
        task: 'Посчитай сумму чисел от 1 до 5 циклом `for` и выведи её. Должно получиться `15`.',
        hint: 'Заведи `int sum = 0` до цикла и прибавляй `i` на каждой итерации: `sum += i`.',
        starter: `public class Main {
    public static void main(String[] args) {
        // TODO: посчитай сумму 1 + 2 + 3 + 4 + 5 циклом for
        // TODO: выведи сумму
    }
}`,
        expected: '15',
        solution: `int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum += i;
}
System.out.println(sum);`,
        check: {
          includes: [
            { pattern: 'for\\s*\\(', message: 'Используй цикл for.' },
            { pattern: 'sum\\s*\\+=|sum\\s*=\\s*sum', message: 'Накапливай сумму в переменной sum.' },
            { pattern: 'System\\.out\\.println', message: 'Выведи сумму.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: таблица и чётная сумма',
    starter: `public class Main {
    public static void main(String[] args) {
        // TODO: таблица умножения 1..5
        // TODO: сумма чётных чисел от 1 до 20
    }
}`,
    expected: `Таблица 1..5
110`,
    check: {
      includes: [
        { pattern: 'for\\s*\\(', message: 'Используй цикл for.' },
        { pattern: 'System\\.out\\.print', message: 'Для таблицы удобно использовать System.out.print.' },
        { pattern: 'continue', message: 'Пропусти нечётные числа через continue.' }
      ],
      minTokens: 3
    }
  },

  'while-loop': {
    starter: `public class Main {
    public static void main(String[] args) {
        int n = 10;
        // TODO: выведи 10 9 8 7 6 5 4 3 2 1 через while
        // TODO: повтори через do-while
    }
}`,
    expected: '10 9 8 7 6 5 4 3 2 1',
    check: {
      includes: [
        { pattern: '\\bwhile\\s*\\(', message: 'Используй while.' },
        { pattern: '\\bdo\\s*\\{', message: 'Повтори решение через do-while.' },
        { pattern: 'System\\.out\\.print', message: 'Выведи числа через System.out.print.' }
      ],
      minTokens: 3
    }
  },

  methods: {
    steps: [
      {
        label: 'Шаг 1. Метод с return',
        task: 'Напиши метод `static int square(int x)`, который возвращает `x * x`, и выведи `square(5)`.',
        hint: 'Метод объявляется внутри класса, но вне `main`. Результат возвращается через `return x * x;`.',
        starter: `public class Main {
    // TODO: объяви метод square

    public static void main(String[] args) {
        System.out.println(square(5));
    }
}`,
        expected: '25',
        solution: `static int square(int x) {
    return x * x;
}`,
        check: {
          includes: [
            { pattern: 'static\\s+int\\s+square\\s*\\(', message: 'Объяви метод static int square(int x).' },
            { pattern: 'return', message: 'Верни результат через return.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. Перегрузка методов',
        task: 'Напиши два метода с одним именем `print`: для `int` и для `String`. Вызови `print(42)` и `print("Java")` так, чтобы получить `int: 42` и `String: Java`.',
        hint: 'У перегрузок одинаковое имя, но разные типы параметров. Внутри каждого метода выведи значение с подписью.',
        starter: `public class Main {
    // TODO: print(int)
    // TODO: print(String)

    public static void main(String[] args) {
        print(42);
        print("Java");
    }
}`,
        expected: `int: 42
String: Java`,
        solution: `static void print(int value) {
    System.out.println("int: " + value);
}

static void print(String value) {
    System.out.println("String: " + value);
}`,
        check: {
          includes: [
            { pattern: 'static\\s+void\\s+print\\s*\\(\\s*int', message: 'Добавь перегрузку print(int).' },
            { pattern: 'static\\s+void\\s+print\\s*\\(\\s*String', message: 'Добавь перегрузку print(String).' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: max и перегрузки',
    starter: `public class Main {
    // TODO: метод int max(int a, int b)
    // TODO: перегрузки print(int) и print(String)

    public static void main(String[] args) {
        System.out.println(max(3, 7));
        print(42);
        print("Java");
    }
}`,
    expected: `7
int: 42
String: Java`,
    check: {
      includes: [
        { pattern: 'static\\s+int\\s+max\\s*\\(', message: 'Объяви метод static int max(int a, int b).' },
        { pattern: 'static\\s+void\\s+print\\s*\\(\\s*int', message: 'Добавь перегрузку print(int).' },
        { pattern: 'static\\s+void\\s+print\\s*\\(\\s*String', message: 'Добавь перегрузку print(String).' },
        { pattern: 'return', message: 'max должен возвращать результат через return.' }
      ],
      minTokens: 3
    }
  },

  'objects-intro': {
    starter: `class Counter {
    int value;

    void increment() {
        // TODO: увеличивай value на 1
    }
}

public class Main {
    public static void main(String[] args) {
        Counter first = new Counter();
        Counter second = new Counter();
        first.increment();
        System.out.println(first.value);
        System.out.println(second.value);
    }
}`,
    expected: `1
0`,
    check: {
      includes: [
        { pattern: 'class\\s+Counter', message: 'Создай класс Counter.' },
        { pattern: 'void\\s+increment\\s*\\(', message: 'Добавь метод increment().' },
        { pattern: 'value\\s*\\+\\+|\\+\\+\\s*value|value\\s*=\\s*value\\s*\\+\\s*1', message: 'В increment увеличь value на 1.' }
      ],
      minTokens: 3
    }
  },

  'human-class': {
    starter: `public class Main {
    static class Human {
        private String name;

        Human(String name) {
            this.name = name;
        }

        public String getInitials() {
            // TODO: верни первую букву имени в верхнем регистре
            return "";
        }
    }

    public static void main(String[] args) {
        System.out.println(new Human("Alice").getInitials());
    }
}`,
    expected: 'A',
    check: {
      includes: [
        { pattern: 'getInitials\\s*\\(', message: 'Реализуй метод getInitials().' },
        { pattern: 'charAt\\s*\\(', message: 'Возьми первый символ через charAt(0).' },
        { pattern: 'toUpperCase', message: 'Приведи букву к верхнему регистру.' },
        { pattern: 'name\\s*==\\s*null|name\\.isEmpty', message: 'Проверь null или пустое имя.' }
      ],
      minTokens: 3
    }
  },

  'human-service': {
    starter: `public class Main {
    static class Human {
        private String name;

        Human(String name) {
            this.name = name;
        }

        String getName() {
            return name;
        }

        void setName(String name) {
            this.name = name;
        }
    }

    static class HumanService {
        public boolean rename(Human human, String newName) {
            // TODO: не меняй имя, если newName пустой
            // TODO: верни true/false
            return false;
        }
    }

    public static void main(String[] args) {
        HumanService service = new HumanService();
        Human human = new Human("Alice");
        System.out.println(service.rename(human, "Bob"));
        System.out.println(human.getName());
    }
}`,
    expected: `true
Bob`,
    check: {
      includes: [
        { pattern: 'boolean\\s+rename\\s*\\(', message: 'Реализуй HumanService.rename(...).' },
        { pattern: 'isBlank|isEmpty', message: 'Проверь пустое имя через isBlank() или isEmpty().' },
        { pattern: 'setName', message: 'Измени имя через setName.' },
        { pattern: 'return\\s+(true|false)', message: 'Верни true или false в зависимости от результата.' }
      ],
      minTokens: 3
    }
  },

  'human-main': {
    solution: `Human older = a.age >= b.age ? a : b;
System.out.println("Старше: " + older.name);`,
    starter: `class Human {
    String name;
    int age;

    Human(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        Human a = new Human("Alice", 30);
        Human b = new Human("Bob", 41);
        // TODO: сравни возраст и выведи имя старшего
    }
}`,
    expected: 'Старше: Bob',
    check: {
      includes: [
        { pattern: 'getAge\\(\\)|age', message: 'Сравни возраст двух людей.' },
        { pattern: 'System\\.out\\.println', message: 'Выведи имя старшего.' }
      ],
      minTokens: 3
    }
  },

  constants: {
    starter: `public class Main {
    static class Human {
        public static final int MAX_AGE = 120;
        private int age;

        public void setAge(int age) {
            // TODO: проверь возраст по MAX_AGE и брось IllegalArgumentException
            this.age = age;
        }
    }

    public static void main(String[] args) {
        Human human = new Human();
        try {
            human.setAge(130);
            System.out.println(false);
        } catch (IllegalArgumentException e) {
            System.out.println(true);
        }
    }
}`,
    expected: 'true',
    check: {
      includes: [
        { pattern: 'MAX_AGE', message: 'Используй константу MAX_AGE.' },
        { pattern: 'throw\\s+new\\s+IllegalArgumentException', message: 'Брось IllegalArgumentException при неверном возрасте.' },
        { pattern: 'age\\s*>\\s*MAX_AGE|age\\s*<\\s*0', message: 'Проверь границы возраста.' }
      ],
      minTokens: 3
    }
  },

  'class-types-intro': {
    type: 'text',
    starter: `1) Статус заказа из четырёх значений — ...
2) DTO с именем и возрастом — ...
3) Умение летать — ...
4) Счётчик с изменяемым значением — ...`,
    expected: `1) enum
2) record
3) interface
4) class`,
    check: {
      keywords: ['enum', 'record', 'interface', 'class'],
      minWords: 4
    }
  },

  interfaces: {
    steps: [
      {
        label: 'Шаг 1. Интерфейс и одна реализация',
        task: 'Создай интерфейс `Greeter` с методом `String greet(String name)` и класс `RussianGreeter`, который возвращает `"Привет, " + name`. Выведи приветствие для `"Аня"`.',
        hint: 'Класс подписывается `implements Greeter` и обязан реализовать метод `greet`.',
        starter: `interface Greeter {
    String greet(String name);
}

class RussianGreeter implements Greeter {
    // TODO: реализуй greet
}

public class Main {
    public static void main(String[] args) {
        Greeter greeter = new RussianGreeter();
        System.out.println(greeter.greet("Аня"));
    }
}`,
        expected: 'Привет, Аня',
        solution: `class RussianGreeter implements Greeter {
    public String greet(String name) {
        return "Привет, " + name;
    }
}`,
        check: {
          includes: [
            { pattern: 'interface\\s+Greeter', message: 'Создай интерфейс Greeter.' },
            { pattern: 'implements\\s+Greeter', message: 'Реализуй Greeter в классе RussianGreeter.' },
            { pattern: 'String\\s+greet\\s*\\(', message: 'Метод greet должен возвращать String.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: две реализации',
    starter: `interface Greeter {
    String greet(String name);
}

class RussianGreeter implements Greeter {
    // TODO
}

class EnglishGreeter implements Greeter {
    // TODO
}

public class Main {
    public static void main(String[] args) {
        Greeter ru = new RussianGreeter();
        Greeter en = new EnglishGreeter();
        System.out.println(ru.greet("Аня"));
        System.out.println(en.greet("Ann"));
    }
}`,
    expected: `Привет, Аня
Hello, Ann`,
    check: {
      includes: [
        { pattern: 'interface\\s+Greeter', message: 'Создай интерфейс Greeter.' },
        { pattern: 'implements\\s+Greeter', message: 'Реализуй Greeter в двух классах.' },
        { pattern: 'String\\s+greet\\s*\\(', message: 'Метод greet должен возвращать String.' }
      ],
      minTokens: 3
    }
  },

  'enums-basics': {
    starter: `enum DaysOfTheWeek {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;

    public boolean isWeekend() {
        // TODO
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(DaysOfTheWeek.SUNDAY.isWeekend());
        System.out.println(DaysOfTheWeek.MONDAY.isWeekend());
    }
}`,
    expected: `true
false`,
    check: {
      includes: [
        { pattern: 'boolean\\s+isWeekend\\s*\\(', message: 'Добавь метод isWeekend().' },
        { pattern: 'SATURDAY', message: 'Учти SATURDAY.' },
        { pattern: 'SUNDAY', message: 'Учти SUNDAY.' },
        { pattern: 'return', message: 'Верни boolean из метода.' }
      ],
      minTokens: 3
    }
  },

  'enums-with-data': {
    starter: `enum InformatedDaysOfTheWeek {
    MONDAY("Понедельник", true),
    TUESDAY("Вторник", true),
    WEDNESDAY("Среда", true),
    THURSDAY("Четверг", true),
    FRIDAY("Пятница", true),
    SATURDAY("Суббота", false),
    SUNDAY("Воскресенье", false);

    private final String russianName;

    InformatedDaysOfTheWeek(String russianName, boolean workingDay) {
        this.russianName = russianName;
        // TODO: сохрани workingDay
    }

    public boolean isWorkingDay() {
        // TODO
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(InformatedDaysOfTheWeek.MONDAY.isWorkingDay());
        System.out.println(InformatedDaysOfTheWeek.SUNDAY.isWorkingDay());
    }
}`,
    expected: `true
false`,
    check: {
      includes: [
        { pattern: 'workingDay', message: 'Добавь поле workingDay.' },
        { pattern: 'isWorkingDay\\s*\\(', message: 'Добавь метод isWorkingDay().' },
        { pattern: 'this\\.workingDay\\s*=', message: 'Сохрани workingDay в конструкторе.' }
      ],
      minTokens: 3
    }
  },

  'enum-practice': {
    steps: [
      {
        label: 'Шаг 1. switch по enum',
        task: 'Создай enum `Day` с `MONDAY`, `SATURDAY`, `SUNDAY` и метод `type(Day day)`, который через `switch` возвращает `"выходной"` для выходных и `"рабочий"` для остальных. Выведи `type(Day.SATURDAY)`.',
        hint: 'В стрелочном switch можно объединять значения: `case SATURDAY, SUNDAY -> "выходной";`.',
        starter: `enum Day {
    MONDAY, SATURDAY, SUNDAY
}

public class Main {
    static String type(Day day) {
        // TODO: switch по day
        return "";
    }

    public static void main(String[] args) {
        System.out.println(type(Day.SATURDAY));
    }
}`,
        expected: 'выходной',
        solution: `static String type(Day day) {
    return switch (day) {
        case SATURDAY, SUNDAY -> "выходной";
        default -> "рабочий";
    };
}`,
        check: {
          includes: [
            { pattern: 'enum\\s+Day', message: 'Создай enum Day.' },
            { pattern: 'switch\\s*\\(', message: 'Используй switch.' },
            { pattern: 'case\\s+SATURDAY', message: 'Обработай SATURDAY.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: времена года',
    starter: `enum Month {
    JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE,
    JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER;

    public String getSeason() {
        // TODO: switch по this
        return "";
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Month.DECEMBER.getSeason());
    }
}`,
    expected: 'Зима',
    check: {
      includes: [
        { pattern: 'getSeason\\s*\\(', message: 'Добавь метод getSeason().' },
        { pattern: 'switch', message: 'Используй switch по enum.' },
        { pattern: 'DECEMBER', message: 'Учти декабрь.' },
        { pattern: 'MARCH', message: 'Учти март.' },
        { pattern: 'JUNE', message: 'Учти июнь.' },
        { pattern: 'SEPTEMBER', message: 'Учти сентябрь.' }
      ],
      minTokens: 3
    }
  },

  records: {
    steps: [
      {
        label: 'Шаг 1. Record без проверок',
        task: 'Создай `record Point(int x, int y) {}` и выведи `new Point(3, 4)`. Record сам создаёт конструктор, геттеры и `toString`.',
        hint: 'После имени record в скобках перечисляются компоненты. Тело `{}` может быть пустым.',
        starter: `record Point(int x, int y) {
}

public class Main {
    public static void main(String[] args) {
        // TODO: создай Point(3, 4) и выведи его
    }
}`,
        expected: 'Point[x=3, y=4]',
        solution: `record Point(int x, int y) {
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Point(3, 4));
    }
}`,
        check: {
          includes: [
            { pattern: 'record\\s+Point', message: 'Создай record Point.' },
            { pattern: 'new\\s+Point', message: 'Создай объект через new Point(...).' },
            { pattern: 'System\\.out\\.println', message: 'Выведи объект.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: record с валидацией',
    starter: `record Money(long amount, String currency) {
    // TODO: компактный конструктор с проверкой
}

public class Main {
    public static void main(String[] args) {
        Money price = new Money(1999, "RUB");
        System.out.println(price.amount());
        System.out.println(price);
    }
}`,
    expected: `1999
Money[amount=1999, currency=RUB]`,
    check: {
      includes: [
        { pattern: 'record\\s+Money', message: 'Создай record Money.' },
        { pattern: 'amount\\s*<\\s*0', message: 'Проверь, что amount не отрицательный.' },
        { pattern: 'throw\\s+new\\s+IllegalArgumentException', message: 'Брось IllegalArgumentException при ошибке.' },
        { pattern: 'currency', message: 'Проверь currency.' }
      ],
      minTokens: 3
    }
  },

  annotations: {
    steps: [
      {
        label: 'Шаг 1. Своя аннотация',
        task: 'Создай аннотацию `@interface Marker {}`, поставь её над классом `Book` и выведи `Book.class.isAnnotationPresent(Marker.class)`.',
        hint: 'Аннотация-маркер не содержит элементов. Чтобы прочитать её через reflection, нужна retention-политика `RUNTIME`.',
        starter: `import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@interface Marker {
}

// TODO: поставь @Marker над классом Book
class Book {
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Book.class.isAnnotationPresent(Marker.class));
    }
}`,
        expected: 'true',
        solution: `import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@interface Marker {
}

@Marker
class Book {
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Book.class.isAnnotationPresent(Marker.class));
    }
}`,
        check: {
          includes: [
            { pattern: '@interface\\s+Marker', message: 'Объяви аннотацию @interface Marker.' },
            { pattern: '@Retention', message: 'Укажи retention RUNTIME.' },
            { pattern: '@Marker', message: 'Поставь @Marker над классом Book.' },
            { pattern: 'isAnnotationPresent', message: 'Проверь аннотацию через isAnnotationPresent.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. Значение аннотации',
        task: 'Добавь в аннотацию `Author` элемент `String value()`, поставь `@Author("Анна")` над классом `Book` и выведи значение через `getAnnotation`.',
        hint: 'Элемент аннотации объявляется как метод без параметров. Значение читается через `Book.class.getAnnotation(Author.class).value()`.',
        starter: `import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@interface Author {
    // TODO: добавь String value()
}

@Author("Анна")
class Book {
}

public class Main {
    public static void main(String[] args) {
        Author author = Book.class.getAnnotation(Author.class);
        System.out.println(author.value());
    }
}`,
        expected: 'Анна',
        solution: `import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@interface Author {
    String value();
}

@Author("Анна")
class Book {
}

public class Main {
    public static void main(String[] args) {
        Author author = Book.class.getAnnotation(Author.class);
        System.out.println(author.value());
    }
}`,
        check: {
          includes: [
            { pattern: 'String\\s+value\\s*\\(\\s*\\)', message: 'Добавь элемент String value().' },
            { pattern: '@Author', message: 'Поставь @Author над классом Book.' },
            { pattern: 'getAnnotation', message: 'Прочитай аннотацию через getAnnotation.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: @Author с retention и target',
    starter: `import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Author {
    // TODO: добавь элемент value()
}

@Author("Анна")
class Book {
}

public class Main {
    public static void main(String[] args) {
        Author author = Book.class.getAnnotation(Author.class);
        System.out.println(author.value());
    }
}`,
    expected: 'Анна',
    check: {
      includes: [
        { pattern: '@interface\\s+Author', message: 'Объяви аннотацию @interface Author.' },
        { pattern: 'String\\s+value\\s*\\(\\s*\\)', message: 'Добавь элемент String value().' },
        { pattern: '@Retention', message: 'Укажи @Retention.' },
        { pattern: '@Target', message: 'Укажи @Target.' },
        { pattern: 'getAnnotation', message: 'Прочитай аннотацию через getAnnotation.' }
      ],
      minTokens: 3
    }
  },

  'exceptions-intro': {
    starter: `public class Main {
    static int divide(int a, int b) {
        // TODO: поймай деление на ноль и верни 0
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(divide(10, 0));
        System.out.println(divide(10, 2));
    }
}`,
    expected: `На ноль делить нельзя: 10 / 0
0
5`,
    check: {
      includes: [
        { pattern: 'try\\s*\\{', message: 'Оберни деление в try.' },
        { pattern: 'catch\\s*\\(\\s*ArithmeticException', message: 'Поймай ArithmeticException.' },
        { pattern: 'return\\s+0', message: 'Верни 0 при делении на ноль.' }
      ],
      minTokens: 3
    }
  },

  'try-with-resources': {
    steps: [
      {
        label: 'Шаг 1. Закрытие вручную',
        task: 'Создай `Timer`, выведи `"working"` и закрой ресурс вручную через `timer.close()`.',
        hint: '`AutoCloseable` требует метод `close()`. Пока без try-with-resources: вызови `close()` сам.',
        starter: `class Timer implements AutoCloseable {
    Timer() {
        System.out.println("timer started");
    }

    @Override
    public void close() {
        // TODO: выведи timer stopped
    }
}

public class Main {
    public static void main(String[] args) {
        Timer timer = new Timer();
        System.out.println("working");
        // TODO: закрой timer вручную
    }
}`,
        expected: `timer started
working
timer stopped`,
        solution: `Timer timer = new Timer();
System.out.println("working");
timer.close();`,
        check: {
          includes: [
            { pattern: 'implements\\s+AutoCloseable', message: 'Timer должен реализовать AutoCloseable.' },
            { pattern: 'void\\s+close\\s*\\(', message: 'Реализуй close().' },
            { pattern: 'timer\\.close\\s*\\(', message: 'Закрой ресурс через timer.close().' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: try-with-resources',
    starter: `class Timer implements AutoCloseable {
    Timer() {
        System.out.println("timer started");
    }

    @Override
    public void close() {
        // TODO: выведи timer stopped
    }
}

public class Main {
    public static void main(String[] args) {
        // TODO: используй Timer в try-with-resources
    }
}`,
    expected: `timer started
working
timer stopped`,
    check: {
      includes: [
        { pattern: 'implements\\s+AutoCloseable', message: 'Timer должен реализовать AutoCloseable.' },
        { pattern: 'void\\s+close\\s*\\(', message: 'Реализуй close().' },
        { pattern: 'try\\s*\\(', message: 'Используй try-with-resources.' },
        { pattern: 'timer stopped', message: 'Выведи timer stopped в close().' }
      ],
      minTokens: 3
    }
  },

  'custom-exceptions': {
    starter: `class InvalidAgeException extends RuntimeException {
    InvalidAgeException(String message) {
        super(message);
    }
}

class Human {
    private int age;

    public void setAge(int age) {
        // TODO: брось InvalidAgeException при возрасте < 0 или > 120
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        Human human = new Human();
        try {
            human.setAge(-1);
            System.out.println(false);
        } catch (InvalidAgeException e) {
            System.out.println(true);
        }
    }
}`,
    expected: 'true',
    check: {
      includes: [
        { pattern: 'extends\\s+RuntimeException', message: 'InvalidAgeException должен наследовать RuntimeException.' },
        { pattern: 'throw\\s+new\\s+InvalidAgeException', message: 'Брось InvalidAgeException в setAge.' },
        { pattern: 'age\\s*<\\s*0|age\\s*>\\s*120', message: 'Проверь границы возраста.' }
      ],
      minTokens: 3
    }
  },

  'collections-overview': {
    type: 'text',
    starter: `1) Телефонная книга имя → номер — ...
2) Теги без дубликатов — ...
3) История просмотров с порядком — ...
4) Очередь задач на печать — ...`,
    expected: `1) Map<String, String>
2) Set<String>
3) List<String>
4) Queue<String>`,
    check: {
      keywords: ['map', 'set', 'list', 'queue'],
      minWords: 4
    }
  },

  list: {
    steps: [
      {
        label: 'Шаг 1. Список и add',
        task: 'Создай `List<String> names = new ArrayList<>();`, добавь `"Alice"` и `"Bob"` через `add` и выведи список.',
        hint: '`ArrayList` — изменяемый список. `add(value)` добавляет элемент в конец, `toString()` у списка уже печатает элементы в скобках.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        // TODO: добавь "Alice" и "Bob"
        // TODO: выведи список
    }
}`,
        expected: '[Alice, Bob]',
        solution: `List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
System.out.println(names);`,
        check: {
          includes: [
            { pattern: 'List<', message: 'Используй List.' },
            { pattern: 'add\\s*\\(', message: 'Добавь элементы через add.' },
            { pattern: 'System\\.out\\.println', message: 'Выведи список.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. Сортировка списка',
        task: 'Отсортируй список `["Bob", "Alice"]` по алфавиту через `sort(Comparator.naturalOrder())` и выведи результат.',
        hint: '`List.of` создаёт неизменяемый список, поэтому сначала оберни его в `new ArrayList<>(...)`.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Bob", "Alice"));
        // TODO: отсортируй по алфавиту
        // TODO: выведи результат
    }
}`,
        expected: '[Alice, Bob]',
        solution: `List<String> names = new ArrayList<>(List.of("Bob", "Alice"));
names.sort(Comparator.naturalOrder());
System.out.println(names);`,
        check: {
          includes: [
            { pattern: 'sort\\s*\\(', message: 'Отсортируй список через sort.' },
            { pattern: 'Comparator\\.naturalOrder', message: 'Используй Comparator.naturalOrder.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: сортировка и removeIf',
    starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Alice", "Bob", "Christopher", "Diana"));
        // TODO: отсортируй список
        // TODO: удали имена длиннее 5 символов через removeIf
        // TODO: выведи результат
    }
}`,
    expected: '[Alice, Bob, Diana]',
    check: {
      includes: [
        { pattern: 'List<', message: 'Используй List.' },
        { pattern: 'sort\\s*\\(', message: 'Отсортируй список через sort.' },
        { pattern: 'removeIf\\s*\\(', message: 'Удали длинные имена через removeIf.' },
        { pattern: 'System\\.out\\.println', message: 'Выведи результат.' }
      ],
      minTokens: 3
    }
  },

  set: {
    starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> values = List.of("java", "sql", "java", "git", "sql");
        // TODO: убери дубликаты, сохранив порядок
        // TODO: выведи результат
    }
}`,
    expected: '[java, sql, git]',
    check: {
      includes: [
        { pattern: 'Set<', message: 'Используй Set.' },
        { pattern: 'LinkedHashSet', message: 'Для сохранения порядка нужен LinkedHashSet.' },
        { pattern: 'System\\.out\\.println', message: 'Выведи результат.' }
      ],
      minTokens: 3
    }
  },

  map: {
    steps: [
      {
        label: 'Шаг 1. Одна пара ключ-значение',
        task: 'Создай `Map<String, Integer> ages = new HashMap<>();`, положи `"Анна" -> 25` и выведи `ages.get("Анна")`.',
        hint: '`put(key, value)` добавляет пару, `get(key)` возвращает значение по ключу.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> ages = new HashMap<>();
        // TODO: положи "Анна" -> 25
        // TODO: выведи значение по ключу "Анна"
    }
}`,
        expected: '25',
        solution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Анна", 25);
        System.out.println(ages.get("Анна"));
    }
}`,
        check: {
          includes: [
            { pattern: 'Map<', message: 'Используй Map.' },
            { pattern: 'put\\s*\\(', message: 'Положи пару через put.' },
            { pattern: 'get\\s*\\(', message: 'Прочитай значение через get.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. Подсчёт слов',
        task: 'Посчитай частоту слов в строке `"java sql java"` через `getOrDefault` и `put`. Выведи получившуюся Map.',
        hint: 'Для каждого слова: `freq.put(word, freq.getOrDefault(word, 0) + 1)`.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        String text = "java sql java";
        Map<String, Integer> freq = new HashMap<>();
        // TODO: разбей строку через split(" ") и посчитай слова
        // TODO: выведи Map
    }
}`,
        expected: '{java=2, sql=1}',
        solution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        String text = "java sql java";
        Map<String, Integer> freq = new HashMap<>();
        for (String word : text.split(" ")) {
            freq.put(word, freq.getOrDefault(word, 0) + 1);
        }
        System.out.println(freq);
    }
}`,
        check: {
          includes: [
            { pattern: 'split\\s*\\(', message: 'Разбей строку через split.' },
            { pattern: 'getOrDefault', message: 'Используй getOrDefault для счётчика.' },
            { pattern: 'put\\s*\\(', message: 'Сохрани результат через put.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: частота слов',
    starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        String text = "java sql java git sql java";
        Map<String, Integer> freq = new HashMap<>();
        // TODO: посчитай частоту слов через merge
        // TODO: выведи Map
    }
}`,
    expected: '{java=3, sql=2, git=1}',
    check: {
      includes: [
        { pattern: 'Map<', message: 'Используй Map.' },
        { pattern: 'merge\\s*\\(|getOrDefault', message: 'Посчитай частоту через merge или getOrDefault.' },
        { pattern: 'System\\.out\\.println', message: 'Выведи Map.' }
      ],
      minTokens: 2
    }
  },

  'threads-overview': {
    type: 'text',
    starter: `1) ...
2) ...
3) ...
4) Где конкурентность только усложнит код: ...`,
    expected: 'Три ситуации, где конкурентность полезна, и одна, где нет.',
    check: {
      minWords: 20
    }
  },

  'thread-vs-runnable': {
    starter: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        // TODO: два потока через Runnable
        // первый печатает 1..3, второй A..C
        // TODO: дождись обоих через join
    }
}`,
    expected: '1 2 3 и A B C в произвольном порядке.',
    check: {
      includes: [
        { pattern: 'new\\s+Thread', message: 'Создай потоки через new Thread.' },
        { pattern: 'Runnable|->', message: 'Используй Runnable или лямбду.' },
        { pattern: 'start\\s*\\(', message: 'Запусти потоки через start().' },
        { pattern: 'join\\s*\\(', message: 'Дождись завершения через join().' }
      ],
      minTokens: 3
    }
  },

  'callable-future': {
    starter: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        // TODO: отправь две Callable<Integer> задачи: 20 и 22
        // TODO: получи Future и выведи сумму
        // TODO: shutdown
    }
}`,
    expected: '42',
    check: {
      includes: [
        { pattern: 'Callable', message: 'Используй Callable<Integer>.' },
        { pattern: 'ExecutorService', message: 'Создай ExecutorService.' },
        { pattern: 'submit', message: 'Отправь задачи через submit.' },
        { pattern: 'Future', message: 'Получи Future.' },
        { pattern: '\\.get\\s*\\(', message: 'Забери результат через get().' },
        { pattern: 'shutdown', message: 'Закрой executor через shutdown().' }
      ],
      minTokens: 3
    }
  },

  synchronized: {
    steps: [
      {
        label: 'Шаг 1. synchronized в одном потоке',
        task: 'Сделай метод `increment()` synchronized, запусти один поток с тремя вызовами, дождись его и выведи `counter.count`.',
        hint: 'Ключевое слово `synchronized` ставится в объявление метода: `synchronized void increment()`.',
        starter: `public class Main {
    static class Counter {
        private int count;

        void increment() {
            // TODO: сделай метод synchronized
            count++;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        Thread worker = new Thread(() -> {
            for (int i = 0; i < 3; i++) counter.increment();
        });
        // TODO: запусти поток и дождись его
        System.out.println(counter.count);
    }
}`,
        expected: '3',
        solution: `synchronized void increment() {
    count++;
}

// в main:
worker.start();
worker.join();`,
        check: {
          includes: [
            { pattern: 'synchronized', message: 'Добавь synchronized к increment.' },
            { pattern: 'start\\s*\\(', message: 'Запусти поток через start().' },
            { pattern: 'join\\s*\\(', message: 'Дождись потока через join.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: десять потоков',
    starter: `public class Main {
    static class Counter {
        private int count;

        void increment() {
            // TODO: защити count++ через synchronized
            count++;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        Thread[] threads = new Thread[10];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) counter.increment();
            });
            threads[i].start();
        }
        for (Thread t : threads) t.join();
        System.out.println(counter.count);
    }
}`,
    expected: '10000',
    check: {
      includes: [
        { pattern: 'synchronized', message: 'Защити increment через synchronized.' },
        { pattern: 'Thread', message: 'Используй Thread.' },
        { pattern: 'join\\s*\\(', message: 'Дождись всех потоков через join.' },
        { pattern: 'count', message: 'Счётчик должен остаться count.' }
      ],
      minTokens: 3
    }
  },

  'optional-and-friends': {
    steps: [
      {
        label: 'Шаг 1. Optional и значение',
        task: 'Создай `Optional<String> name = Optional.of("Аня");` и выведи `name.isPresent()` и `name.get()`.',
        hint: '`Optional.of` создаёт контейнер с непустым значением. `isPresent()` проверяет наличие, `get()` возвращает значение.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Optional<String> name = Optional.of("Аня");
        // TODO: выведи isPresent()
        // TODO: выведи get()
    }
}`,
        expected: `true
Аня`,
        solution: `Optional<String> name = Optional.of("Аня");
System.out.println(name.isPresent());
System.out.println(name.get());`,
        check: {
          includes: [
            { pattern: 'Optional', message: 'Используй Optional.' },
            { pattern: 'isPresent', message: 'Проверь наличие через isPresent.' },
            { pattern: 'get\\s*\\(', message: 'Получи значение через get.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. filter и findFirst',
        task: 'Найди первое имя длиннее 4 символов в списке `["Ann", "Alice", "Bob"]` через `stream().filter(...).findFirst()` и выведи его через `ifPresent`.',
        hint: '`findFirst()` возвращает `Optional`. `ifPresent(System.out::println)` выведет значение, только если оно есть.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("Ann", "Alice", "Bob");
        // TODO: найди первое имя длиннее 4 символов
        // TODO: выведи его через ifPresent
    }
}`,
        expected: 'Alice',
        solution: `Optional<String> found = names.stream()
        .filter(name -> name.length() > 4)
        .findFirst();
found.ifPresent(System.out::println);`,
        check: {
          includes: [
            { pattern: 'filter\\s*\\(', message: 'Отфильтруй имена по длине.' },
            { pattern: 'findFirst', message: 'Найди первый элемент через findFirst.' },
            { pattern: 'ifPresent', message: 'Выведи значение через ifPresent.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: Optional и Comparator',
    starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("Ann", "Alice", "Bob", "Christopher");
        // TODO: найди первое имя длиннее 4 символов через Optional
        // TODO: отсортируй имена по длине через Comparator.comparingInt
        // TODO: выведи результаты
    }
}`,
    expected: `Alice
Ann
Bob
Alice
Christopher`,
    check: {
      includes: [
        { pattern: 'Optional', message: 'Используй Optional.' },
        { pattern: 'filter\\s*\\(', message: 'Отфильтруй имена по длине.' },
        { pattern: 'findFirst', message: 'Найди первый подходящий элемент через findFirst.' },
        { pattern: 'Comparator\\.comparingInt', message: 'Отсортируй по длине через Comparator.comparingInt.' }
      ],
      minTokens: 3
    }
  },

  'stream-api': {
    steps: [
      {
        label: 'Шаг 1. filter и collect',
        task: 'Из списка `["alice", "bob", "anna"]` оставь имена длиннее 3 символов через `stream().filter(...).collect(Collectors.toList())` и выведи результат.',
        hint: '`filter` принимает условие, `collect(Collectors.toList())` собирает оставшиеся элементы в список.',
        starter: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("alice", "bob", "anna");
        // TODO: оставь имена длиннее 3 символов
        // TODO: собери в список и выведи
    }
}`,
        expected: '[alice, anna]',
        solution: `List<String> result = names.stream()
        .filter(name -> name.length() > 3)
        .collect(Collectors.toList());
System.out.println(result);`,
        check: {
          includes: [
            { pattern: '\\.stream\\s*\\(\\s*\\)', message: 'Начни с stream().' },
            { pattern: 'filter\\s*\\(', message: 'Отфильтруй имена через filter.' },
            { pattern: 'collect\\s*\\(', message: 'Собери результат через collect.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. map и uppercase',
        task: 'Переведи имена `["alice", "bob", "anna"]` в верхний регистр через `stream().map(String::toUpperCase)` и выведи список.',
        hint: '`map` заменяет каждый элемент результатом функции. `String::toUpperCase` — ссылка на метод.',
        starter: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("alice", "bob", "anna");
        // TODO: переведи имена в верхний регистр через map
        // TODO: собери в список и выведи
    }
}`,
        expected: '[ALICE, BOB, ANNA]',
        solution: `List<String> result = names.stream()
        .map(String::toUpperCase)
        .collect(Collectors.toList());
System.out.println(result);`,
        check: {
          includes: [
            { pattern: 'map\\s*\\(', message: 'Используй map.' },
            { pattern: 'toUpperCase', message: 'Переведи строку в верхний регистр.' },
            { pattern: 'collect\\s*\\(', message: 'Собери результат через collect.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: сортировка и группировка',
    starter: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("alice", "bob", "christopher", "anna", "diana");
        // TODO: оставь имена длиннее 4 символов, uppercase, sorted, collect
        // TODO: сгруппируй имена по первой букве через groupingBy
        // TODO: выведи результаты
    }
}`,
    expected: `[ALICE, CHRISTOPHER, DIANA]
{a=[alice, anna], b=[bob], c=[christopher], d=[diana]}
(порядок ключей в HashMap может отличаться)`,
    check: {
      includes: [
        { pattern: '\\.stream\\s*\\(\\s*\\)', message: 'Начни с stream().' },
        { pattern: 'filter\\s*\\(', message: 'Оставь длинные имена через filter.' },
        { pattern: 'map\\s*\\(', message: 'Переведи в верхний регистр через map.' },
        { pattern: 'sorted\\s*\\(', message: 'Отсортируй через sorted.' },
        { pattern: 'collect\\s*\\(', message: 'Собери результат через collect.' },
        { pattern: 'groupingBy', message: 'Сгруппируй через Collectors.groupingBy.' }
      ],
      minTokens: 3
    }
  },

  'variables-and-operators': {
    starter: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        // TODO: выведи сумму, разность, произведение, частное и остаток
        // TODO: выведи результат сравнения a > b
    }
}`,
    expected: `13
7
30
3
1
true`,
    check: {
      includes: [
        { pattern: 'a\\s*\\+\\s*b', message: 'Выведи сумму a + b.' },
        { pattern: 'a\\s*/\\s*b', message: 'Выведи целое частное a / b.' },
        { pattern: 'a\\s*%\\s*b', message: 'Выведи остаток a % b.' },
        { pattern: 'a\\s*>\\s*b', message: 'Сравни a и b через >.' },
        { pattern: 'System\\.out\\.println', message: 'Выведи результаты через System.out.println.' }
      ],
      minTokens: 3
    }
  },

  'string-builder': {
    steps: [
      {
        label: 'Шаг 1. append',
        task: 'Создай `StringBuilder builder`, добавь `"Hello"` и `" Java"` через `append` и выведи результат.',
        hint: '`append` дописывает текст в конец и возвращает тот же builder. Можно вызывать цепочкой.',
        starter: `public class Main {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder();
        // TODO: добавь "Hello" и " Java"
        // TODO: выведи builder
    }
}`,
        expected: 'Hello Java',
        solution: `StringBuilder builder = new StringBuilder();
builder.append("Hello");
builder.append(" Java");
System.out.println(builder);`,
        check: {
          includes: [
            { pattern: 'StringBuilder', message: 'Используй StringBuilder.' },
            { pattern: 'append\\s*\\(', message: 'Добавляй части через append.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. reverse',
        task: 'Создай `StringBuilder` со строкой `"Hello"`, разверни её через `reverse()` и выведи результат.',
        hint: '`reverse()` меняет порядок символов в самом builder, а не возвращает новую строку.',
        starter: `public class Main {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder("Hello");
        // TODO: разверни строку
        // TODO: выведи результат
    }
}`,
        expected: 'olleH',
        solution: `StringBuilder builder = new StringBuilder("Hello");
builder.reverse();
System.out.println(builder);`,
        check: {
          includes: [
            { pattern: 'reverse\\s*\\(', message: 'Разверни строку через reverse.' },
            { pattern: 'System\\.out\\.println', message: 'Выведи результат.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: числа 1..5 и reverse',
    starter: `public class Main {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder();
        // TODO: добавь числа 1..5 через append
        // TODO: выведи строку и разверни её через reverse
    }
}`,
    expected: `1 2 3 4 5
5 4 3 2 1`,
    check: {
      includes: [
        { pattern: 'StringBuilder', message: 'Используй StringBuilder.' },
        { pattern: 'append\\s*\\(', message: 'Добавляй части через append.' },
        { pattern: 'reverse\\s*\\(', message: 'Разверни строку через reverse.' },
        { pattern: 'for\\s*\\(', message: 'Собери числа в цикле for.' }
      ],
      minTokens: 3
    }
  },

  'two-dimensional-arrays': {
    steps: [
      {
        label: 'Шаг 1. Строки и столбцы',
        task: 'Создай `int[][] matrix = {{1, 2, 3}, {4, 5, 6}}` и выведи `matrix.length` и `matrix[0].length`.',
        hint: '`matrix.length` — количество строк. `matrix[0].length` — длина первой строки, то есть количество столбцов.',
        starter: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
        // TODO: выведи количество строк
        // TODO: выведи количество столбцов
    }
}`,
        expected: `2
3`,
        solution: `int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
System.out.println(matrix.length);
System.out.println(matrix[0].length);`,
        check: {
          includes: [
            { pattern: 'int\\[\\]\\[\\]', message: 'Объяви двумерный массив int[][].' },
            { pattern: 'matrix\\.length', message: 'Используй matrix.length.' },
            { pattern: 'matrix\\[0\\]\\.length', message: 'Используй matrix[0].length.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. Первая строка циклом',
        task: 'Выведи элементы первой строки матрицы через один цикл `for`, каждый с новой строки.',
        hint: 'Цикл идёт по столбцам: `for (int column = 0; column < matrix[0].length; column++)`. Элемент — `matrix[0][column]`.',
        starter: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
        // TODO: выведи 1, 2 и 3 через цикл по первой строке
    }
}`,
        expected: `1
2
3`,
        solution: `for (int column = 0; column < matrix[0].length; column++) {
    System.out.println(matrix[0][column]);
}`,
        check: {
          includes: [
            { pattern: 'for\\s*\\(', message: 'Используй цикл for.' },
            { pattern: 'matrix\\[0\\]', message: 'Обращайся к первой строке matrix[0].' },
            { pattern: 'System\\.out\\.println', message: 'Выведи элементы.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: все строки и сумма',
    starter: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
        // TODO: выведи строки через вложенные циклы
        // TODO: посчитай сумму всех элементов
    }
}`,
    expected: `1 2 3
4 5 6
21`,
    check: {
      includes: [
        { pattern: 'int\\[\\]\\[\\]', message: 'Объяви двумерный массив int[][].' },
        { pattern: 'matrix\\.length', message: 'Используй matrix.length для числа строк.' },
        { pattern: 'System\\.out\\.print', message: 'Печатай элементы через System.out.print.' }
      ],
      counts: [
        { pattern: 'for\\s*\\(', min: 2, message: 'Нужны два вложенных цикла for.' }
      ],
      minTokens: 3
    }
  },

  'console-input': {
    starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner("42 Анна");
        // TODO: прочитай число через nextInt и имя через next
        // TODO: выведи оба значения
    }
}`,
    expected: `42
Анна`,
    check: {
      includes: [
        { pattern: 'new\\s+Scanner', message: 'Создай Scanner.' },
        { pattern: 'nextInt\\s*\\(', message: 'Прочитай число через nextInt().' },
        { pattern: 'next\\s*\\(', message: 'Прочитай имя через next().' },
        { pattern: 'System\\.out\\.println', message: 'Выведи результат.' }
      ],
      minTokens: 3
    }
  },

  'constructors-and-this': {
    steps: [
      {
        label: 'Шаг 1. Конструктор и this',
        task: 'Добавь в класс `Point` конструктор `Point(int x, int y)`, сохрани значения через `this.x` и `this.y` и выведи `point.x + "," + point.y`.',
        hint: 'Параметры конструктора называются так же, как поля. `this.x = x` отличает поле объекта от параметра.',
        starter: `public class Main {
    static class Point {
        int x;
        int y;

        Point(int x, int y) {
            // TODO: сохрани значения через this
        }
    }

    public static void main(String[] args) {
        Point point = new Point(3, 4);
        System.out.println(point.x + "," + point.y);
    }
}`,
        expected: '3,4',
        solution: `Point(int x, int y) {
    this.x = x;
    this.y = y;
}`,
        check: {
          includes: [
            { pattern: 'this\\.x\\s*=', message: 'Сохрани x через this.x.' },
            { pattern: 'this\\.y\\s*=', message: 'Сохрани y через this.y.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: Book и цепочка this(...)',
    starter: `public class Main {
    static class Book {
        private String title;
        private int pages;

        Book() {
            this("Без названия", 1);
        }

        Book(String title, int pages) {
            // TODO: сохрани значения через this
        }

        String describe() {
            return title + ", страниц: " + pages;
        }
    }

    public static void main(String[] args) {
        System.out.println(new Book().describe());
        System.out.println(new Book("Java", 350).describe());
    }
}`,
    expected: `Без названия, страниц: 1
Java, страниц: 350`,
    check: {
      includes: [
        { pattern: 'this\\.title\\s*=', message: 'Сохрани title через this.title.' },
        { pattern: 'this\\.pages\\s*=', message: 'Сохрани pages через this.pages.' },
        { pattern: 'this\\s*\\(', message: 'Оставь цепочку конструкторов через this(...).' }
      ],
      minTokens: 3
    }
  },

  'static-vs-instance': {
    starter: `public class Main {
    static class Counter {
        static int created;
        int value;

        Counter() {
            created++;
        }

        void increment() {
            value++;
        }
    }

    public static void main(String[] args) {
        Counter first = new Counter();
        Counter second = new Counter();
        first.increment();
        // TODO: выведи first.value, second.value и Counter.created
    }
}`,
    expected: `1
0
2`,
    check: {
      includes: [
        { pattern: 'static\\s+int\\s+created', message: 'Оставь created статическим полем.' },
        { pattern: 'first\\.value', message: 'Выведи значение первого счётчика.' },
        { pattern: 'second\\.value', message: 'Выведи значение второго счётчика.' },
        { pattern: 'Counter\\.created', message: 'Выведи общий счётчик через Counter.created.' }
      ],
      minTokens: 3
    }
  },

  'inheritance-basics': {
    starter: `public class Main {
    static class Animal {
        protected String name;

        Animal(String name) {
            this.name = name;
        }

        String sound() {
            return "...";
        }
    }

    static class Dog extends Animal {
        Dog(String name) {
            super(name);
        }

        // TODO: переопредели sound() и верни "Гав!"
    }

    public static void main(String[] args) {
        Animal dog = new Dog("Рекс");
        System.out.println(dog.name + ": " + dog.sound());
    }
}`,
    expected: `Рекс: Гав!`,
    check: {
      includes: [
        { pattern: 'extends\\s+Animal', message: 'Dog должен наследовать Animal.' },
        { pattern: '@Override', message: 'Поставь @Override над sound().' },
        { pattern: 'super\\s*\\(', message: 'Вызови конструктор родителя через super(name).' },
        { pattern: 'return\\s+"Гав!"', message: 'Верни "Гав!" из sound().' }
      ],
      minTokens: 3
    }
  },

  'default-interface-methods': {
    starter: `interface Greeter {
    String name();

    default String greet() {
        // TODO: верни приветствие
        return "";
    }

    static String version() {
        return "Greeter 1.0";
    }
}

class SimpleGreeter implements Greeter {
    private final String name;

    SimpleGreeter(String name) {
        this.name = name;
    }

    public String name() {
        return name;
    }
}

public class Main {
    public static void main(String[] args) {
        Greeter greeter = new SimpleGreeter("Анна");
        System.out.println(greeter.greet());
        System.out.println(Greeter.version());
    }
}`,
    expected: `Привет, Анна
Greeter 1.0`,
    check: {
      includes: [
        { pattern: 'default\\s+String\\s+greet', message: 'Оставь greet default-методом.' },
        { pattern: 'static\\s+String\\s+version', message: 'Оставь version static-методом.' },
        { pattern: 'return\\s+"Привет, "\\s*\\+\\s*name', message: 'Собери приветствие из строки и name().' },
        { pattern: 'Greeter\\.version', message: 'Вызови static-метод через имя интерфейса.' }
      ],
      minTokens: 3
    }
  },

  'abstract-vs-interface': {
    starter: `abstract class Shape {
    abstract double area();
}

interface Drawable {
    void draw();
}

class Circle extends Shape implements Drawable {
    private final double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    // TODO: реализуй area() и draw()
}

public class Main {
    public static void main(String[] args) {
        Circle circle = new Circle(5);
        System.out.println(circle.area());
        circle.draw();
    }
}`,
    expected: `78.53981633974483
Рисуем круг`,
    check: {
      includes: [
        { pattern: 'abstract\\s+class\\s+Shape', message: 'Оставь Shape абстрактным классом.' },
        { pattern: 'interface\\s+Drawable', message: 'Оставь Drawable интерфейсом.' },
        { pattern: 'extends\\s+Shape', message: 'Circle должен наследовать Shape.' },
        { pattern: 'implements\\s+Drawable', message: 'Circle должен реализовать Drawable.' },
        { pattern: 'Math\\.PI', message: 'Посчитай площадь круга через Math.PI.' }
      ],
      minTokens: 3
    }
  },

  'exception-types': {
    starter: `public class Main {
    public static void main(String[] args) {
        String text = null;
        // TODO: поймай NullPointerException
        int[] numbers = {1, 2, 3};
        // TODO: поймай ArrayIndexOutOfBoundsException
    }
}`,
    expected: `NullPointerException
ArrayIndexOutOfBoundsException`,
    check: {
      includes: [
        { pattern: 'try\\s*\\{', message: 'Используй try/catch.' },
        { pattern: 'catch\\s*\\(\\s*NullPointerException', message: 'Поймай NullPointerException.' },
        { pattern: 'catch\\s*\\(\\s*ArrayIndexOutOfBoundsException', message: 'Поймай ArrayIndexOutOfBoundsException.' },
        { pattern: 'getSimpleName|getMessage', message: 'Выведи имя или сообщение исключения.' }
      ],
      minTokens: 3
    }
  },

  'throw-and-throws': {
    starter: `public class Main {
    static int parseAge(String text) throws Exception {
        int age = Integer.parseInt(text);
        if (age < 0) {
            // TODO: брось Exception с сообщением
        }
        return age;
    }

    public static void main(String[] args) {
        try {
            parseAge("-5");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    expected: `Возраст не может быть отрицательным`,
    check: {
      includes: [
        { pattern: 'throws\\s+Exception', message: 'Оставь throws Exception в сигнатуре.' },
        { pattern: 'throw\\s+new\\s+Exception', message: 'Брось Exception через throw new.' },
        { pattern: 'getMessage', message: 'Выведи сообщение через getMessage().' },
        { pattern: 'parseAge', message: 'Используй метод parseAge.' }
      ],
      minTokens: 3
    }
  },

  'stack-trace': {
    steps: [
      {
        label: 'Шаг 1. Сообщение исключения',
        task: 'Поймай `IllegalStateException` из `levelOne()` и выведи только `e.getMessage()`.',
        hint: 'Исключение уже создаётся внутри `levelThree`. В catch достаточно вывести сообщение.',
        starter: `public class Main {
    static void levelThree() {
        throw new IllegalStateException("Данные не найдены");
    }

    static void levelTwo() {
        levelThree();
    }

    static void levelOne() {
        levelTwo();
    }

    public static void main(String[] args) {
        try {
            levelOne();
        } catch (IllegalStateException e) {
            // TODO: выведи сообщение исключения
        }
    }
}`,
        expected: 'Данные не найдены',
        solution: `try {
    levelOne();
} catch (IllegalStateException e) {
    System.out.println(e.getMessage());
}`,
        check: {
          includes: [
            { pattern: 'catch\\s*\\(\\s*IllegalStateException', message: 'Поймай IllegalStateException.' },
            { pattern: 'getMessage', message: 'Выведи сообщение через getMessage().' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: сообщение и стек',
    starter: `public class Main {
    static void levelThree() {
        throw new IllegalStateException("Данные не найдены");
    }

    static void levelTwo() {
        levelThree();
    }

    static void levelOne() {
        levelTwo();
    }

    public static void main(String[] args) {
        try {
            levelOne();
        } catch (IllegalStateException e) {
            // TODO: выведи сообщение и стек вызовов
        }
    }
}`,
    expected: `Данные не найдены
levelThree
levelTwo
levelOne
main`,
    check: {
      includes: [
        { pattern: 'getMessage', message: 'Выведи сообщение через getMessage().' },
        { pattern: 'getStackTrace', message: 'Получи стек через getStackTrace().' },
        { pattern: 'StackTraceElement', message: 'Обойди массив StackTraceElement.' },
        { pattern: 'for\\s*\\(', message: 'Используй цикл для обхода стека.' }
      ],
      minTokens: 3
    }
  },

  'queue-basics': {
    steps: [
      {
        label: 'Шаг 1. Очередь и peek',
        task: 'Создай `Queue<String> queue = new ArrayDeque<>();`, добавь `"Анна"` и `"Борис"` через `offer` и выведи первого через `peek`.',
        hint: '`offer` добавляет элемент в конец очереди. `peek` показывает первый элемент, но не удаляет его.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<String> queue = new ArrayDeque<>();
        queue.offer("Анна");
        queue.offer("Борис");
        // TODO: выведи первого через peek
    }
}`,
        expected: 'Анна',
        solution: `Queue<String> queue = new ArrayDeque<>();
queue.offer("Анна");
queue.offer("Борис");
System.out.println(queue.peek());`,
        check: {
          includes: [
            { pattern: 'Queue<', message: 'Используй Queue.' },
            { pattern: 'ArrayDeque', message: 'Создай очередь через ArrayDeque.' },
            { pattern: 'peek\\s*\\(', message: 'Посмотри первого через peek.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. poll и следующий',
        task: 'Забери первого из очереди через `poll` и выведи следующего через `peek`.',
        hint: '`poll` удаляет первый элемент и возвращает его. После этого `peek` покажет уже следующего.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<String> queue = new ArrayDeque<>();
        queue.offer("Анна");
        queue.offer("Борис");
        // TODO: забери первого через poll
        // TODO: выведи следующего через peek
    }
}`,
        expected: `Анна
Борис`,
        solution: `Queue<String> queue = new ArrayDeque<>();
queue.offer("Анна");
queue.offer("Борис");
System.out.println(queue.poll());
System.out.println(queue.peek());`,
        check: {
          includes: [
            { pattern: 'poll\\s*\\(', message: 'Забери элемент через poll.' },
            { pattern: 'peek\\s*\\(', message: 'Посмотри следующего через peek.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: Queue и Deque',
    starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<String> queue = new ArrayDeque<>();
        queue.offer("Анна");
        queue.offer("Борис");
        // TODO: выведи первого, забери его через poll и выведи следующего
        // TODO: создай Deque, положи три элемента через push и забери через pop
    }
}`,
    expected: `Анна
Анна
Борис
Третий`,
    check: {
      includes: [
        { pattern: 'Queue<', message: 'Используй Queue.' },
        { pattern: 'ArrayDeque', message: 'Создай очередь через ArrayDeque.' },
        { pattern: 'peek\\s*\\(', message: 'Посмотри первого через peek.' },
        { pattern: 'poll\\s*\\(', message: 'Забери элемент через poll.' },
        { pattern: 'Deque<', message: 'Создай Deque.' },
        { pattern: 'push\\s*\\(', message: 'Положи элементы в стек через push.' },
        { pattern: 'pop\\s*\\(', message: 'Забери верхний элемент через pop.' }
      ],
      minTokens: 3
    }
  },

  'iterating-collections': {
    steps: [
      {
        label: 'Шаг 1. for-each',
        task: 'Обойди список `["Анна", "Борис", "Вера"]` через for-each и выведи каждое имя с новой строки.',
        hint: 'Синтаксис: `for (String name : names) { ... }`. Переменная `name` по очереди получает каждый элемент.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Анна", "Борис", "Вера"));
        // TODO: выведи каждое имя через for-each
    }
}`,
        expected: `Анна
Борис
Вера`,
        solution: `for (String name : names) {
    System.out.println(name);
}`,
        check: {
          includes: [
            { pattern: 'for\\s*\\(', message: 'Используй for-each.' },
            { pattern: 'System\\.out\\.println', message: 'Выведи каждое имя.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: удаление через Iterator',
    starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Анна", "Борис", "Вера"));
        // TODO: обойди список через for-each и выведи имена
        // TODO: удали "Борис" через Iterator
    }
}`,
    expected: `Анна
Борис
Вера
[Анна, Вера]`,
    check: {
      includes: [
        { pattern: 'for\\s*\\(', message: 'Используй for-each.' },
        { pattern: 'Iterator<', message: 'Создай Iterator.' },
        { pattern: 'iterator\\s*\\(', message: 'Получи iterator() у списка.' },
        { pattern: 'hasNext', message: 'Проверяй hasNext().' },
        { pattern: 'remove\\s*\\(', message: 'Удали элемент через remove().' }
      ],
      minTokens: 3
    }
  },

  'sorting-and-comparators': {
    steps: [
      {
        label: 'Шаг 1. Обычная сортировка',
        task: 'Отсортируй `["Борис", "Аня"]` по алфавиту через `Comparator.naturalOrder()` и выведи результат.',
        hint: '`naturalOrder()` использует естественный порядок строк — алфавитный.',
        starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Борис", "Аня"));
        // TODO: отсортируй по алфавиту
        // TODO: выведи результат
    }
}`,
        expected: '[Аня, Борис]',
        solution: `List<String> names = new ArrayList<>(List.of("Борис", "Аня"));
names.sort(Comparator.naturalOrder());
System.out.println(names);`,
        check: {
          includes: [
            { pattern: 'sort\\s*\\(', message: 'Отсортируй список через sort.' },
            { pattern: 'Comparator\\.naturalOrder', message: 'Используй Comparator.naturalOrder.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: сортировка по длине',
    starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Виктория", "Ян", "Аня", "Борис"));
        // TODO: отсортируй по длине через Comparator.comparingInt
        // TODO: выведи результат
    }
}`,
    expected: `[Ян, Аня, Борис, Виктория]`,
    check: {
      includes: [
        { pattern: 'sort\\s*\\(', message: 'Отсортируй список через sort.' },
        { pattern: 'Comparator\\.comparingInt', message: 'Используй Comparator.comparingInt.' },
        { pattern: 'String::length|length\\s*\\(\\)', message: 'Сравнивай по длине строки.' },
        { pattern: 'System\\.out\\.println', message: 'Выведи результат.' }
      ],
      minTokens: 3
    }
  },

  'thread-lifecycle': {
    steps: [
      {
        label: 'Шаг 1. Запуск и join',
        task: 'Создай `Thread worker = new Thread(() -> System.out.println("worker"));`, запусти его через `start()` и дождись через `join()`.',
        hint: '`start()` запускает новый поток, а `join()` заставляет main ждать его завершения.',
        starter: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> System.out.println("worker"));
        // TODO: запусти поток
        // TODO: дождись его завершения
    }
}`,
        expected: 'worker',
        solution: `Thread worker = new Thread(() -> System.out.println("worker"));
worker.start();
worker.join();`,
        check: {
          includes: [
            { pattern: 'new\\s+Thread', message: 'Создай поток через new Thread.' },
            { pattern: 'start\\s*\\(', message: 'Запусти поток через start().' },
            { pattern: 'join\\s*\\(', message: 'Дождись завершения через join().' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. Пауза внутри потока',
        task: 'В потоке выведи `"старт"`, усыпи его на 100 мс через `Thread.sleep(100)` и выведи `"конец"`. Дождись потока в main.',
        hint: '`Thread.sleep` бросает `InterruptedException`, поэтому нужен try/catch. После catch принято вызывать `Thread.currentThread().interrupt()`.',
        starter: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            System.out.println("старт");
            try {
                // TODO: усыпи поток на 100 мс
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("конец");
        });
        // TODO: запусти поток и дождись его
    }
}`,
        expected: `старт
конец`,
        solution: `Thread worker = new Thread(() -> {
    System.out.println("старт");
    try {
        Thread.sleep(100);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    System.out.println("конец");
});
worker.start();
worker.join();`,
        check: {
          includes: [
            { pattern: 'Thread\\.sleep', message: 'Усыпи поток через Thread.sleep.' },
            { pattern: 'catch\\s*\\(\\s*InterruptedException', message: 'Поймай InterruptedException.' },
            { pattern: 'start\\s*\\(', message: 'Запусти поток через start().' },
            { pattern: 'join\\s*\\(', message: 'Дождись завершения через join().' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: сообщение из main',
    starter: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            System.out.println("worker: старт");
            try {
                // TODO: усыпи поток на 100 мс
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("worker: конец");
        });
        // TODO: запусти поток и дождись через join
        System.out.println("main: worker завершён");
    }
}`,
    expected: `worker: старт
worker: конец
main: worker завершён`,
    check: {
      includes: [
        { pattern: 'Thread\\.sleep', message: 'Усыпи поток через Thread.sleep.' },
        { pattern: 'start\\s*\\(', message: 'Запусти поток через start().' },
        { pattern: 'join\\s*\\(', message: 'Дождись завершения через join().' },
        { pattern: 'main: worker завершён', message: 'Оставь финальный вывод.' }
      ],
      minTokens: 3
    }
  },

  'executor-service': {
    steps: [
      {
        label: 'Шаг 1. Пул и задача',
        task: 'Создай `ExecutorService` на два потока, отправь задачу через `submit`, которая печатает `"задача"`, и вызови `shutdown()`.',
        hint: '`submit(() -> System.out.println("задача"))` ставит задачу в очередь. `shutdown()` завершает пул после выполнения задач.',
        starter: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        // TODO: отправь задачу, которая печатает "задача"
        // TODO: вызови shutdown
    }
}`,
        expected: 'задача',
        solution: `ExecutorService executor = Executors.newFixedThreadPool(2);
executor.submit(() -> System.out.println("задача"));
executor.shutdown();`,
        check: {
          includes: [
            { pattern: 'ExecutorService', message: 'Используй ExecutorService.' },
            { pattern: 'Executors\\.newFixedThreadPool', message: 'Создай пул через newFixedThreadPool.' },
            { pattern: 'submit\\s*\\(', message: 'Отправь задачу через submit.' },
            { pattern: 'shutdown', message: 'Закрой пул через shutdown().' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. Callable и Future',
        task: 'Отправь в пул задачу `Callable<Integer>`, которая возвращает `42`, получи `Future<Integer>` и выведи `future.get()`.',
        hint: '`submit(() -> 42)` возвращает `Future<Integer>`. `get()` ждёт результат и может бросить исключение.',
        starter: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        // TODO: отправь Callable, который возвращает 42
        // TODO: получи Future и выведи результат через get()
        // TODO: вызови shutdown
    }
}`,
        expected: '42',
        solution: `ExecutorService executor = Executors.newFixedThreadPool(2);
Future<Integer> future = executor.submit(() -> 42);
System.out.println(future.get());
executor.shutdown();`,
        check: {
          includes: [
            { pattern: 'Future<', message: 'Получи Future.' },
            { pattern: 'submit\\s*\\(', message: 'Отправь задачу через submit.' },
            { pattern: 'get\\s*\\(', message: 'Забери результат через get().' },
            { pattern: 'shutdown', message: 'Закрой пул через shutdown().' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: пул и Future',
    starter: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        // TODO: отправь задачу через submit, получи Future и выведи результат
        // TODO: вызови shutdown
    }
}`,
    expected: `42`,
    check: {
      includes: [
        { pattern: 'ExecutorService', message: 'Используй ExecutorService.' },
        { pattern: 'Executors\\.newFixedThreadPool', message: 'Создай пул через newFixedThreadPool.' },
        { pattern: 'submit\\s*\\(', message: 'Отправь задачу через submit.' },
        { pattern: 'Future<', message: 'Получи Future.' },
        { pattern: 'get\\s*\\(', message: 'Забери результат через get().' },
        { pattern: 'shutdown', message: 'Закрой пул через shutdown().' }
      ],
      minTokens: 3
    }
  },

  'atomic-variables': {
    steps: [
      {
        label: 'Шаг 1. AtomicInteger в одном потоке',
        task: 'Создай `AtomicInteger counter`, увеличь его три раза через `incrementAndGet()` в отдельном потоке, дождись потока и выведи `counter.get()`.',
        hint: '`incrementAndGet()` атомарно увеличивает значение и возвращает новое. `join()` не даст main вывести результат раньше времени.',
        starter: `import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger counter = new AtomicInteger();
        Thread worker = new Thread(() -> {
            // TODO: увеличь counter три раза
        });
        // TODO: запусти поток и дождись его
        System.out.println(counter.get());
    }
}`,
        expected: '3',
        solution: `AtomicInteger counter = new AtomicInteger();
Thread worker = new Thread(() -> {
    counter.incrementAndGet();
    counter.incrementAndGet();
    counter.incrementAndGet();
});
worker.start();
worker.join();
System.out.println(counter.get());`,
        check: {
          includes: [
            { pattern: 'AtomicInteger', message: 'Используй AtomicInteger.' },
            { pattern: 'incrementAndGet|addAndGet', message: 'Увеличивай счётчик атомарной операцией.' },
            { pattern: 'start\\s*\\(', message: 'Запусти поток через start().' },
            { pattern: 'join\\s*\\(', message: 'Дождись потока через join.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: четыре потока',
    starter: `import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger counter = new AtomicInteger();
        Thread[] threads = new Thread[4];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    // TODO: атомарно увеличь counter
                }
            });
            threads[i].start();
        }
        for (Thread thread : threads) thread.join();
        System.out.println(counter.get());
    }
}`,
    expected: `4000`,
    check: {
      includes: [
        { pattern: 'AtomicInteger', message: 'Используй AtomicInteger.' },
        { pattern: 'incrementAndGet|addAndGet', message: 'Увеличивай счётчик атомарной операцией.' },
        { pattern: 'Thread', message: 'Используй несколько потоков.' },
        { pattern: 'join\\s*\\(', message: 'Дождись всех потоков через join.' },
        { pattern: 'counter\\.get', message: 'Выведи итог через get().' }
      ],
      minTokens: 3
    }
  },

  lambdas: {
    steps: [
      {
        label: 'Шаг 1. Лямбда и Function',
        task: 'Создай `Function<Integer, Integer> square = x -> x * x;` и выведи `square.apply(5)`.',
        hint: 'Лямбда `x -> x * x` — это реализация функционального интерфейса. `Function` вызывает её через `apply`.',
        starter: `import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // TODO: создай Function<Integer, Integer> square
        // TODO: выведи square.apply(5)
    }
}`,
        expected: '25',
        solution: `Function<Integer, Integer> square = x -> x * x;
System.out.println(square.apply(5));`,
        check: {
          includes: [
            { pattern: 'Function<Integer', message: 'Создай Function<Integer, Integer>.' },
            { pattern: '->', message: 'Используй лямбду.' },
            { pattern: 'apply\\s*\\(', message: 'Вызови функцию через apply.' }
          ],
          minTokens: 2
        }
      },
      {
        label: 'Шаг 2. Predicate и test',
        task: 'Создай `Predicate<String> isLong = s -> s.length() > 4;` и выведи `isLong.test("Анна")`.',
        hint: '`Predicate` возвращает boolean, поэтому его вызывают через `test`.',
        starter: `import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // TODO: создай Predicate<String> isLong
        // TODO: выведи isLong.test("Анна")
    }
}`,
        expected: 'false',
        solution: `Predicate<String> isLong = s -> s.length() > 4;
System.out.println(isLong.test("Анна"));`,
        check: {
          includes: [
            { pattern: 'Predicate<String', message: 'Создай Predicate<String>.' },
            { pattern: '->', message: 'Используй лямбду.' },
            { pattern: 'test\\s*\\(', message: 'Проверь значение через test.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: Function, Predicate и ссылка на метод',
    starter: `import java.util.*;
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // TODO: создай Function<String, Integer> length = String::length
        // TODO: создай Predicate<String> isLong = s -> s.length() > 4
        // TODO: выведи длину "Java" и результат проверки "Анна"
    }
}`,
    expected: `4
false`,
    check: {
      includes: [
        { pattern: 'Function<String', message: 'Создай Function<String, Integer>.' },
        { pattern: 'Predicate<String', message: 'Создай Predicate<String>.' },
        { pattern: 'String::length', message: 'Используй ссылку на метод String::length.' },
        { pattern: '->', message: 'Используй лямбду для Predicate.' },
        { pattern: 'test\\s*\\(', message: 'Проверь значение через test().' },
        { pattern: 'apply\\s*\\(', message: 'Получи результат через apply().' }
      ],
      minTokens: 3
    }
  },

  'date-time': {
    steps: [
      {
        label: 'Шаг 1. Дата и прибавление дней',
        task: 'Создай `LocalDate date = LocalDate.of(2024, 3, 15)`, выведи дату и дату через 10 дней.',
        hint: '`LocalDate.of(year, month, day)` создаёт дату. `plusDays(10)` возвращает новую дату, не меняя исходную.',
        starter: `import java.time.*;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 3, 15);
        // TODO: выведи дату
        // TODO: выведи дату через 10 дней
    }
}`,
        expected: `2024-03-15
2024-03-25`,
        solution: `LocalDate date = LocalDate.of(2024, 3, 15);
System.out.println(date);
System.out.println(date.plusDays(10));`,
        check: {
          includes: [
            { pattern: 'LocalDate', message: 'Используй LocalDate.' },
            { pattern: 'plusDays', message: 'Прибавь дни через plusDays.' },
            { pattern: 'System\\.out\\.println', message: 'Выведи обе даты.' }
          ],
          minTokens: 2
        }
      }
    ],
    mainLabel: 'Основная задача: день недели и формат',
    starter: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 3, 15);
        // TODO: выведи дату, дату через 10 дней и день недели
        // TODO: отформатируй дату как dd.MM.yyyy
    }
}`,
    expected: `2024-03-15
2024-03-25
FRIDAY
15.03.2024`,
    check: {
      includes: [
        { pattern: 'LocalDate', message: 'Используй LocalDate.' },
        { pattern: 'plusDays', message: 'Прибавь дни через plusDays.' },
        { pattern: 'getDayOfWeek', message: 'Получи день недели.' },
        { pattern: 'DateTimeFormatter', message: 'Создай DateTimeFormatter.' },
        { pattern: 'format\\s*\\(', message: 'Отформатируй дату через format.' }
      ],
      minTokens: 3
    }
  },

  'io-streams': {
    starter: `import java.io.*;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws IOException {
        byte[] data = "Java\\nIO".getBytes(StandardCharsets.UTF_8);
        // TODO: прочитай data через ByteArrayInputStream и BufferedReader
        // TODO: выведи строки в формате "1: Java" и "2: IO"
    }
}`,
    expected: `1: Java
2: IO`,
    check: {
      includes: [
        { pattern: 'ByteArrayInputStream', message: 'Создай ByteArrayInputStream из массива байтов.' },
        { pattern: 'InputStreamReader', message: 'Свяжи байты и символы через InputStreamReader.' },
        { pattern: 'BufferedReader', message: 'Оберни чтение в BufferedReader.' },
        { pattern: 'StandardCharsets\\.UTF_8', message: 'Укажи кодировку UTF-8.' },
        { pattern: 'readLine\\s*\\(', message: 'Читай строки через readLine().' }
      ],
      minTokens: 4
    }
  },

  'nio-files': {
    starter: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        Path file = Files.createTempFile("nio-", ".txt");
        // TODO: запиши "one\\ntwo" через Files.writeString
        // TODO: прочитай через Files.readAllLines и выведи строки
        Files.deleteIfExists(file);
    }
}`,
    expected: `Строк: 2
one
two`,
    check: {
      includes: [
        { pattern: 'Files\\.writeString', message: 'Запиши текст через Files.writeString.' },
        { pattern: 'Files\\.readAllLines', message: 'Прочитай строки через Files.readAllLines.' },
        { pattern: 'StandardCharsets\\.UTF_8', message: 'Укажи кодировку UTF-8.' },
        { pattern: 'lines\\.size\\s*\\(', message: 'Выведи количество строк через lines.size().' },
        { pattern: 'Files\\.deleteIfExists', message: 'Удали временный файл.' }
      ],
      minTokens: 4
    }
  },

  'reflection-annotations': {
    starter: `import java.lang.annotation.*;
import java.lang.reflect.Field;

public class Main {
    // TODO: объяви аннотацию @Secret с @Retention(RUNTIME) и @Target(FIELD)

    static class Config {
        // TODO: поставь @Secret над полем token
        private String token = "abc";
        private int timeout = 30;
    }

    public static void main(String[] args) {
        // TODO: найди поля с @Secret и выведи их имена
    }
}`,
    expected: `token`,
    check: {
      includes: [
        { pattern: '@interface\\s+Secret', message: 'Объяви аннотацию через @interface Secret.' },
        { pattern: 'RetentionPolicy\\.RUNTIME', message: 'Поставь retention RUNTIME.' },
        { pattern: 'ElementType\\.FIELD', message: 'Ограничь цель аннотации полем.' },
        { pattern: 'getDeclaredFields', message: 'Получи поля через getDeclaredFields.' },
        { pattern: 'isAnnotationPresent', message: 'Проверь наличие аннотации через isAnnotationPresent.' }
      ],
      minTokens: 4
    }
  },

  'jvm-internals': {
    starter: `public class Main {
    public static void main(String[] args) {
        // TODO: получи загрузчик класса String
        // TODO: выведи "String loader: bootstrap", если он null
        // TODO: выведи максимум heap в МБ
    }
}`,
    expected: `String loader: bootstrap
Heap max, МБ: зависит от машины`,
    check: {
      includes: [
        { pattern: 'String\\.class\\.getClassLoader', message: 'Получи загрузчик через String.class.getClassLoader().' },
        { pattern: '==\\s*null', message: 'Проверь, что bootstrap-загрузчик равен null.' },
        { pattern: 'Runtime\\.getRuntime\\(\\)\\.maxMemory', message: 'Получи максимум heap через Runtime.getRuntime().maxMemory().' },
        { pattern: '/\\s*1024\\s*/\\s*1024', message: 'Переведи байты в мегабайты.' }
      ],
      minTokens: 3
    }
  }
};
