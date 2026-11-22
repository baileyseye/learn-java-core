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
    starter: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // TODO: создай int[5] и заполни квадратами 1..5
        // TODO: выведи массив через Arrays.toString
        // TODO: найди сумму элементов
    }
}`,
    expected: `[1, 4, 9, 16, 25]
55`,
    check: {
      includes: [
        { pattern: 'int\\[\\]', message: 'Создай массив int[].' },
        { pattern: 'new\\s+int\\s*\\[', message: 'Выдели массив через new int[...].' },
        { pattern: 'Arrays\\.toString', message: 'Выведи массив через Arrays.toString.' },
        { pattern: 'for\\s*\\(|Arrays\\.stream', message: 'Заполни массив и/или посчитай сумму циклом.' }
      ],
      minTokens: 3
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
        { pattern: 'merge\\s*\\(', message: 'Посчитай частоту через merge.' },
        { pattern: 'Integer::sum|Integer\\.sum', message: 'Для merge подойдёт Integer::sum.' },
        { pattern: 'System\\.out\\.println', message: 'Выведи Map.' }
      ],
      minTokens: 3
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
  }
};
