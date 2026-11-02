package org.baileyseyes._1.methods;

import java.util.Scanner;

/**
 * Scanner — чтение ввода с клавиатуры.
 * Основной класс для работы с пользовательским вводом в Java.
 * 
 * Методы: next(), nextInt(), nextDouble(), nextLine(), nextBoolean(), hasNext()
 * 
 * @see org.baileyseyes._1.methods.Methods Предыдущая часть
 * @see org.baileyseyes._1.types.TernaryOperator Следующая часть
 */
@SuppressWarnings("all")
public class ScannerInput {

    // Создаём один Scanner — не создаём новый для каждого чтения!
    private static final Scanner scanner = new Scanner(System.in);

    /**
     * Базовое чтение: nextInt() — целое число.
     */
    public static void demonstrateReadInt() {
        System.out.println("=== Чтение целого числа ===");
        System.out.print("Введите возраст: ");
        
        if (scanner.hasNextInt()) {
            int age = scanner.nextInt();
            System.out.println("Ваш возраст: " + age);
            System.out.println("Через 10 лет вам будет: " + (age + 10));
        } else {
            System.out.println("Это не число!");
            scanner.next(); // сбросим некорректный ввод
        }
    }

    /**
     * Чтение: nextDouble() — дробное число.
     */
    public static void demonstrateReadDouble() {
        System.out.println("\n=== Число с плавающей точкой ===");
        System.out.print("Введите зарплату (например, 75000.50): ");
        
        if (scanner.hasNextDouble()) {
            double salary = scanner.nextDouble();
            double tax = salary * 0.13; // НДФЛ 13%
            double netSalary = salary - tax;
            System.out.println("Зарплата: " + salary);
            System.out.println("Налог (13%): " + tax);
            System.out.println("На руки: " + netSalary);
        } else {
            System.out.println("Это не число!");
            scanner.next();
        }
    }

    /**
     * Чтение: next() — одно слово (до пробела).
     */
    public static void demonstrateReadWord() {
        System.out.println("\n=== Одно слово ===");
        System.out.print("Введите ваше имя: ");
        
        if (scanner.hasNext()) {
            String name = scanner.next();
            System.out.println("Привет, " + name + "!");
        }
    }

    /**
     * Чтение: nextLine() — полная строка (всё до Enter).
     */
    public static void demonstrateReadLine() {
        System.out.println("\n=== Полная строка ===");
        System.out.print("Введите полный адрес: ");
        
        String address = scanner.nextLine();
        System.out.println("Адрес: " + address);
        System.out.println("Длина адреса: " + address.length() + " символов");
    }

    /**
     * Чтение: nextBoolean() — логическое значение.
     */
    public static void demonstrateReadBoolean() {
        System.out.println("\n=== Логическое значение ===");
        System.out.print("Вы согласны с условиями? (true/false): ");
        
        if (scanner.hasNextBoolean()) {
            boolean agreed = scanner.nextBoolean();
            System.out.println("Согласие: " + agreed);
            System.out.println(agreed ? "Добро пожаловать!" : "Доступ запрещён.");
        } else {
            System.out.println("Введите true или false!");
            scanner.next();
        }
    }

    /**
     * Чтение в цикле — пока пользователь не введёт "stop".
     */
    public static void demonstrateLoopWithStop() {
        System.out.println("\n=== Цикл до stop ===");
        System.out.println("Вводите слова (напишите 'stop' для выхода):");
        
        int wordCount = 0;
        while (true) {
            String word = scanner.next();
            if (word.equalsIgnoreCase("stop")) { // ignoreCase — не регистрозависимо
                System.out.println("Выход по команде 'stop'");
                break;
            }
            wordCount++;
            System.out.println("Получено: " + word + " (слов: " + wordCount + ")");
        }
    }

    /**
     * Чтение чисел в цикле до отрицательного.
     */
    public static void demonstrateLoopUntilNegative() {
        System.out.println("\n=== Числа до отрицательного ===");
        System.out.println("Вводите числа (отрицательное = конец):");
        
        int sum = 0;
        int count = 0;
        int max = Integer.MIN_VALUE;
        
        while (true) {
            System.out.print("  Число: ");
            if (scanner.hasNextInt()) {
                int number = scanner.nextInt();
                if (number < 0) {
                    System.out.println("Отрицательное число — выход!");
                    break;
                }
                sum += number;
                count++;
                if (number > max) max = number;
                System.out.println("  Сумма: " + sum + ", Среднее: " + (double) sum / count);
            } else {
                System.out.println("  Не число — пропущено!");
                scanner.next(); // сброс
            }
        }
        
        if (count > 0) {
            System.out.println("Итого: count=" + count + ", sum=" + sum + ", max=" + max + ", avg=" + ((double) sum / count));
        }
    }

    /**
     * Чтение строк в цикле — accumulate все строки.
     */
    public static void demonstrateReadLines() {
        System.out.println("\n=== Чтение строк ===");
        System.out.println("Вводите строки (пустая строка = конец):");
        
        StringBuilder allText = new StringBuilder();
        int lineCount = 0;
        
        while (true) {
            String line = scanner.nextLine();
            if (line.isEmpty()) {
                System.out.println("Пустая строка — выход!");
                break;
            }
            allText.append(line).append("\n");
            lineCount++;
            System.out.println("  Строка " + lineCount + ": " + line);
        }
        
        System.out.println("Всего строк: " + lineCount);
        System.out.println("Общий текст: " + allText.length() + " символов");
    }

    /**
     * hasNext() — проверка перед чтением.
     */
    public static void demonstrateHasNext() {
        System.out.println("\n=== Проверка ввода (hasNext) ===");
        
        System.out.print("Введите 3 слова: ");
        for (int i = 1; i <= 3; i++) {
            if (scanner.hasNext()) {
                String word = scanner.next();
                System.out.println("  Слово " + i + ": " + word);
            } else {
                System.out.println("  Ввод закончился раньше!");
                break;
            }
        }
    }

    /**
     * Комбинирование nextInt() и nextLine().
     * ВАЖНО: nextInt() НЕ съедает перевод строки! nextLine() вернёт пустую строку!
     * Решение: после nextInt() вызвать scanner.nextLine() чтобы «съесть» оставшийся \n.
     */
    public static void demonstrateMixedRead() {
        System.out.println("\n=== Смешанное чтение (осторожно!) ===");
        
        System.out.print("Введите возраст: ");
        int age = scanner.nextInt();
        scanner.nextLine(); // ← СЪЕДАЕМ оставшийся перевод строки!
        
        System.out.print("Введите имя: ");
        String name = scanner.nextLine();
        
        System.out.println("Имя: " + name + ", Возраст: " + age);
    }

    /**
     * Реальный пример: простое меню для пользователя.
     */
    public static void demonstrateMenu() {
        System.out.println("\n=== Простое меню ===");
        System.out.println("1. Приветствие");
        System.out.println("2. Калькулятор (X + Y)");
        System.out.println("3. Таблица умножения");
        System.out.println("0. Выход");
        System.out.print("Выберите: ");
        
        if (scanner.hasNextInt()) {
            int choice = scanner.nextInt();
            
            switch (choice) {
                case 1 -> greetUser();
                case 2 -> simpleCalculator();
                case 3 -> multiplicationTable();
                case 0 -> System.out.println("До свидания!");
                default -> System.out.println("Неизвестный выбор!");
            }
        }
    }

    private static void greetUser() {
        scanner.nextLine(); // сброс
        System.out.print("Как вас зовут? ");
        String name = scanner.nextLine();
        System.out.println("Привет, " + name + "!");
    }

    private static void simpleCalculator() {
        scanner.nextLine(); // сброс
        System.out.print("Введите X: ");
        int x = scanner.nextInt();
        System.out.print("Введите Y: ");
        int y = scanner.nextInt();
        System.out.println("X + Y = " + (x + y));
    }

    private static void multiplicationTable() {
        scanner.nextLine(); // сброс
        System.out.print("Число для таблицы: ");
        int n = scanner.nextInt();
        for (int i = 1; i <= 10; i++) {
            System.out.println("  " + n + " × " + i + " = " + (n * i));
        }
    }

    /**
     * Безопасное чтение целого числа с повторным запросом.
     */
    public static int readIntSafely(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextInt()) {
            System.out.println("  Это не число! Повторите:");
            scanner.next(); // сброс некорректного ввода
            System.out.print(prompt);
        }
        int value = scanner.nextInt();
        scanner.nextLine(); // сброс перевода строки
        return value;
    }

    /**
     * Безопасное чтение строки с повторным запросом.
     */
    public static String readLineSafely(String prompt) {
        System.out.print(prompt);
        String line = scanner.nextLine();
        while (line.isEmpty()) {
            System.out.println("  Пустая строка! Повторите:");
            line = scanner.nextLine();
        }
        return line;
    }

    public static void main(String[] args) {
        System.out.println("=== Scanner — чтение ввода ===");
        System.out.println("Вводите данные по мере появления запросов!");
        demonstrateReadInt();
        demonstrateReadDouble();
        demonstrateReadWord();
        demonstrateReadLine();
        demonstrateReadBoolean();
        demonstrateLoopWithStop();
        demonstrateLoopUntilNegative();
        demonstrateReadLines();
        demonstrateHasNext();
        demonstrateMixedRead();
        demonstrateMenu();
    }
}
