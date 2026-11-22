package org.baileyseyes._1.methods;

import java.util.Locale;
import java.util.Scanner;

/**
 * Ввод с клавиатуры через {@link Scanner}.
 * <p>
 * В реальной программе Scanner создают поверх {@code System.in}. В примерах
 * ниже источником служит строка: так урок можно запустить без ожидания ввода,
 * но приёмы чтения остаются теми же.
 * </p>
 *
 * @see Methods Предыдущая часть
 */
@SuppressWarnings("all")
public class ConsoleInput {

    /**
     * Чтение числа, строки и дробного числа из источника.
     * <p>
     * {@code Scanner} реализует {@link AutoCloseable}, поэтому его удобно
     * создавать в try-with-resources.
     * </p>
     */
    public static void demonstrateReadFromString() {
        String source = "42\nАнна\n3.5";

        try (Scanner scanner = new Scanner(source)) {
            // Scanner учитывает локаль: для точки как разделителя дробной части
            // зафиксируем Locale.US, чтобы пример вёл себя одинаково везде.
            scanner.useLocale(Locale.US);

            int number = scanner.nextInt();
            String name = scanner.next();
            double value = scanner.nextDouble();

            System.out.println("Число: " + number);
            System.out.println("Имя: " + name);
            System.out.println("Дробное: " + value);
        }
    }

    /**
     * Суммирование чисел, пока они есть во входных данных.
     * <p>
     * {@code hasNextInt()} проверяет, можно ли прочитать следующее значение
     * как int. Это защищает от исключения на конце ввода.
     * </p>
     */
    public static void demonstrateSum() {
        int sum = 0;

        try (Scanner scanner = new Scanner("10 20 30")) {
            while (scanner.hasNextInt()) {
                sum += scanner.nextInt();
            }
        }

        System.out.println("Сумма: " + sum);
    }

    /**
     * Безопасное чтение числа: неверные токены пропускаются.
     * <p>
     * В настоящей программе вместо печати «Пропущено» лучше попросить
     * пользователя повторить ввод.
     * </p>
     */
    public static int readIntSafely(Scanner scanner) {
        while (!scanner.hasNextInt()) {
            String skipped = scanner.next();
            System.out.println("Пропущено: " + skipped);
        }
        return scanner.nextInt();
    }

    public static void main(String[] args) {
        System.out.println("=== Чтение из строки ===");
        demonstrateReadFromString();

        System.out.println("\n=== Сумма чисел ===");
        demonstrateSum();

        System.out.println("\n=== Безопасное чтение ===");
        try (Scanner scanner = new Scanner("abc 25")) {
            int value = readIntSafely(scanner);
            System.out.println("Получено число: " + value);
        }

        /*
        С клавиатуры это выглядит так:

        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Введите возраст: ");
            int age = scanner.nextInt();
            scanner.nextLine(); // дочитать конец строки после nextInt()
            System.out.print("Введите имя: ");
            String name = scanner.nextLine();
        }

        Scanner(System.in) закрывать не обязательно: поток System.in
        принадлежит всей программе, а не только этому Scanner.
         */
    }
}
