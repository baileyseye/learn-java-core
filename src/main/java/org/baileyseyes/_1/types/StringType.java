package org.baileyseyes._1.types;

/**
 * Демонстрирует строковый тип данных в Java.
 *
 * @see IntArray Следующая часть
 * @see TypeConversion Предыдущая часть
 * @apiNote изучить StringPool
 */
@SuppressWarnings("all")
public class StringType {

    /**
     * Демонстрация основных характеристик строки.
     * <p>
     * {@code String} в Java - это не примитивный тип данных, а класс из пакета {@code java.lang}
     * Строки в Java неизменяемы (immutable), что означает, что после создания строку нельзя изменить.
     * Все операции над строками создают новую строку.
     * </p>
     * <p>
     * Строки в Java представлены как последовательности символов типа {@code char}
     * </p>
     */
    public static void demonstrateBasics() {
        // Создание строки
        String str1 = "Hello"; // Литерал строки
        String str2 = new String("World"); // Объект строки
        String str3 = "Hello"; // Ссылается на тот же объект в пуле строк("Hello")

        System.out.println("String literals: " + str1 + " " + str3);
        System.out.println("String object: " + str2);
        System.out.println("Are str1 and str3 equal? " + (str1 == str3)); // true (тот же объект в пуле)
        System.out.println("Are str1 and str2 equal? " + (str1 == str2)); // false (разные объекты)

        // Длина строки
        System.out.println("Length of '" + str1 + "': " + str1.length());

        // Доступ к символам
        char firstChar = str1.charAt(0); /* в java везде 0 - это первый номер чего-либо */
        System.out.println("First character of '" + str1 + "': " + firstChar);

        // Конкатенация строк
        String concatenated = str1 + " " + str2;
        String concatenatedWithConcat = str1.concat(str2);
        System.out.println("Concatenated: " + concatenated);
        System.out.println("Concatenated with .concat() : " + concatenatedWithConcat);
    }

    /**
     * Демонстрация методов класса {@code String}.
     * <p>
     * Класс {@code String} предоставляет множество полезных методов для работы со строками.
     * </p>
     */
    public static void demonstrateMethods() {
        String text = "  Hello World!  ";

        // Методы для получения информации
        System.out.println("Length: " + text.length());
        System.out.println("Trimmed: '" + text.trim() + "'");

        // Методы для изменения регистра
        System.out.println("Lowercase: " + text.toLowerCase());
        System.out.println("Uppercase: " + text.toUpperCase());

        // Поиск подстроки
        boolean contains = text.contains("World");
        System.out.println("Contains 'World': " + contains);

        // Замена
        String replaced = text.replace("World", "Java");
        System.out.println("Replaced: " + replaced);

        // Подстрока
        String substring = text.substring(2, 7);
        System.out.println("Substring from 2 to 7: '" + substring + "'");
    }

    /**
     * Демонстрация неизменяемости строки.
     * <p>
     * Строки в Java неизменяемы. Все операции, которые кажутся изменением строки,
     * создают новую строку.
     * </p>
     */
    public static void demonstrateImmutability() {
        String original = "Hello";
        System.out.println("Original before operations: '" + original + "'");

        // Эти операции создают новые строки
        String upper = original.toUpperCase();
        String trimmed = original.trim();
        String concat = original.concat(" World");

        System.out.println("Original after operations: '" + original + "'"); // Не изменилась
        System.out.println("Upper case: '" + upper + "'");
        System.out.println("Trimmed: '" + trimmed + "'");
        System.out.println("Concatenated: '" + concat + "'");
    }

    /**
     * Демонстрация сравнения строк.
     * <p>
     * Важно использовать метод {@code equals()} для сравнения содержимого строк.
     * Оператор {@code ==} проверяет ссылку на объект, а не содержимое.
     * </p>
     */
    public static void demonstrateComparison() {
        String str1 = "Hello";
        String str2 = new String("Hello");
        String str3 = "Hello";

        System.out.println("str1 == str2: " + (str1 == str2)); // false
        System.out.println("str1 == str3: " + (str1 == str3)); // true (в пуле строк)
        System.out.println("str1.equals(str2): " + str1.equals(str2)); // true
        System.out.println("str1.equals(str3): " + str1.equals(str3)); // true

        // Сравнение без учета регистра
        String lowerStr1 = "hello";
        String upperStr2 = "HELLO";
        System.out.println("Ignoring case: " + lowerStr1.equalsIgnoreCase(upperStr2)); // true
    }

    /**
     * Демонстрация специальных символов и экранирования.
     * <p>
     * Символы экранирования используются для представления специальных символов в строках.
     * </p>
     */
    public static void demonstrateSpecialChars() {
        String tab = "Hello\tWorld"; // Табуляция
        String newline = "Hello\nWorld"; // Новая строка
        String quote = "He said \"Hello\""; // Экранированные кавычки
        String backslash = "Path: C:\\Users\\Name"; // Экранированный обратный слеш

        System.out.println("Tab: " + tab);
        System.out.println("Newline:\n" + newline);
        System.out.println("Quote: " + quote);
        System.out.println("Backslash: " + backslash);
    }

    /**
     * Демонстрация форматирования строк.
     * <p>
     * Строки можно форматировать с помощью {@code String.format()}, {@code System.out.printf()},
     * или {@code MessageFormat}.
     * </p>
     */
    public static void demonstrateFormatting() {
        String name = "Alice";
        int age = 30;
        double score = 95.5;

        // Использование String.format()
        String format = String.format("Name: %s, Age: %d, Score: %.2f", name, age, score);
        System.out.println(format);

        // Использование String.formatted()
        String formatted = "Name: %s, Age: %d, Score: %.2f".formatted(name, age, score);
        System.out.println(formatted);

        // Использование System.out.printf()
        System.out.printf("Name: %s, Age: %d, Score: %.2f%n", name, age, score);
    }

    public static void stringTricks() {
        // Проверка на null и пустоту
        String nullStr = null;
        String emptyStr = "";
        String blankStr = "   ";

        System.out.println("Is nullStr null? " + (nullStr == null));
        System.out.println("Is emptyStr empty? " + (emptyStr.isEmpty()));
        System.out.println("Is blankStr empty? " + (blankStr.isEmpty()));
        System.out.println("Is blankStr blank? " + (blankStr.isBlank()));

        // Повторение строки
        String repeated = "Java ".repeat(3);
        System.out.println("Repeated: " + repeated);

        // Объединение строк через join
        String[] words = {"Hello", "beautiful", "world"}; // массив строк, где объявляем не одну строку, а сразу несколько в одной ссылке words
        String joined = String.join(" ", words);
        System.out.println("Joined: " + joined);
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\n=== Methods ===");
        demonstrateMethods();

        System.out.println("\n=== Immutability ===");
        demonstrateImmutability();

        System.out.println("\n=== Comparison ===");
        demonstrateComparison();

        System.out.println("\n=== Special Characters ===");
        demonstrateSpecialChars();

        System.out.println("\n=== Formatting ===");
        demonstrateFormatting();

        System.out.println("\n=== Tricks ===");
        stringTricks();
    }
}
