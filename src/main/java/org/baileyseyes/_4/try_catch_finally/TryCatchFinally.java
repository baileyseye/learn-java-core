package org.baileyseyes._4.try_catch_finally;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Scanner;

/**
 * @see TryWithResources Следующая часть
 * @see org.baileyseyes._4.__start_from_here.HelloExceptionsAndTryCatch Предыдущая часть
 */
@SuppressWarnings("all")
public class TryCatchFinally {

    /**
     * Метод для демонстрации базового использования try-catch.
     * <p>
     * Базовый синтаксис: try { код, который может вызвать исключение }
     * catch (ExceptionType e) { обработка исключения }
     * </p>
     */
    public static void demonstrateBasicTryCatch() {
        System.out.println("=== Базовое использование try-catch ===");

        try {
            // Попытка деления на ноль
            int result = 10 / 0;
            System.out.println("Результат: " + result);
        } catch (ArithmeticException e) { //делаем так потому что мы ОЖИДАЕМ и ЗНАЕМ что будет ошибка, заранее даем инструкции программе
            System.out.println("Произошло арифметическое исключение: " + e.getMessage());
            System.out.println("Исключение типа: " + e.getClass().getSimpleName());
        }

        System.out.println("Программа продолжает работу после обработки исключения");
    }

    /**
     * Метод для демонстрации обработки нескольких типов исключений.
     */
    public static void demonstrateMultipleCatchBlocks() {
        System.out.println("\n=== Обработка нескольких типов исключений ===");

        try {
            // Попытка выполнить несколько операций
            int[] array = new int[5];
            array[10] = 5; // ArrayIndexOutOfBoundsException

            int result = 10 / 0; // ArithmeticException

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Ошибка индекса массива: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Арифметическая ошибка: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Общее исключение: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации использования finally.
     * <p>
     * Блок finally выполняется всегда, независимо от того, было ли исключение или нет.
     * </p>
     */
    public static void demonstrateFinallyBlock() {
        System.out.println("\n=== Блок finally ===");

        try {
            System.out.println("В блоке try");
            int result = 10 / 2;
            System.out.println("Результат: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Ошибка: " + e.getMessage());
        } finally {
            System.out.println("Блок finally всегда выполняется");
        }

        System.out.println("Программа продолжает работу");
    }

    /**
     * Метод для демонстрации проверяемых исключений IOException.
     * <p>
     * IOException - это проверяемое исключение, которое должно быть обработано.
     * </p>
     */
    public static void demonstrateIOException() {
        System.out.println("\n=== Проверяемое исключение IOException ===");

        try {
            // Попытка чтения файла, который может не существовать
            FileReader file = new FileReader("nonexistent.txt");
            BufferedReader reader = new BufferedReader(file);
            String line = reader.readLine();
            System.out.println("Содержимое файла: " + line);
            reader.close();
        } catch (IOException e) {
            System.out.println("Ошибка ввода-вывода: " + e.getMessage());
            System.out.println("Тип исключения: " + e.getClass().getSimpleName());
        }
    }

    /**
     * Метод для демонстрации проверяемых исключений с несколькими catch блоками.
     */
    public static void demonstrateMultipleCheckedExceptions() {
        System.out.println("\n=== Обработка нескольких проверяемых исключений ===");

        try {
            // Попытка выполнить операции, которые могут вызвать разные исключения
            int[] numbers = new int[3];
            numbers[5] = 10; // ArrayIndexOutOfBoundsException

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Ошибка индекса массива: " + e.getMessage());
        } catch (NullPointerException e) {
            System.out.println("Ошибка null ссылки: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Общее исключение: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации работы с пользовательским вводом и исключениями.
     */
    public static void demonstrateUserInputWithExceptionHandling() {
        System.out.println("\n=== Работа с пользовательским вводом ===");

        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Введите число: ");
            int number = scanner.nextInt();
            System.out.println("Вы ввели число: " + number);
        } catch (Exception e) {
            System.out.println("Ошибка ввода: " + e.getMessage());
            System.out.println("Пожалуйста, введите корректное число");
        } finally {
            scanner.close();
        }
    }

    /**
     * Метод для демонстрации создания собственного исключения.
     */
    public static void demonstrateCustomException() {
        System.out.println("\n=== Собственное исключение ===");

        try {
            validateAge(150);
        } catch (InvalidAgeException e) {
            System.out.println("Ошибка валидации: " + e.getMessage());
        }
    }

    /**
     * Метод для валидации возраста.
     *
     * @param age возраст для проверки
     * @throws InvalidAgeException если возраст некорректен
     */
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 0 || age > 150) {
            throw new InvalidAgeException("Возраст должен быть между 0 и 150, а был: " + age);
        }
        System.out.println("Возраст " + age + " корректен");
    }

    /**
     * Метод для демонстрации использования try-with-resources.
     * <p>
     * Try-with-resources автоматически закрывает ресурсы, реализующие AutoCloseable.
     * </p>
     */
    public static void demonstrateTryWithResources() {
        System.out.println("\n=== Try-with-resources ===");

        // В данном случае используем заглушку, так как файл не существует
        try (FileReader file = new FileReader("example.txt")) {
            // Этот код не выполнится из-за отсутствия файла
            System.out.println("Файл открыт успешно");
        } catch (IOException e) {
            System.out.println("Ошибка при работе с файлом: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации вложенных try-catch блоков.
     */
    public static void demonstrateNestedTryCatch() {
        System.out.println("\n=== Вложенные try-catch блоки ===");

        try {
            System.out.println("Внешний try");
            try {
                System.out.println("Внутренний try");
                int result = 10 / 0; // Вызовет ArithmeticException
            } catch (ArithmeticException e) {
                System.out.println("Обработка внутреннего исключения: " + e.getMessage());
                throw e; // Переброс исключения
            }
        } catch (ArithmeticException e) {
            System.out.println("Обработка внешнего исключения: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации работы с несколькими исключениями в одном catch.
     */
    public static void demonstrateMultiCatch() {
        System.out.println("\n=== Multi-catch (обработка нескольких исключений в одном блоке) ===");

        try {
            // Попытка выполнить операции, которые могут вызвать разные исключения
            String str = null;
            int length = str.length(); // NullPointerException

            int[] array = new int[5];
            array[10] = 5; // ArrayIndexOutOfBoundsException

        } catch (NullPointerException | ArrayIndexOutOfBoundsException e) {
            System.out.println("Общая обработка нескольких исключений: " + e.getClass().getSimpleName());
            System.out.println("Сообщение: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации использования throw для генерации исключений.
     */
    public static void demonstrateThrowKeyword() {
        System.out.println("\n=== Ключевое слово throw ===");

        try {
            int age = -5;
            if (age < 0) {
                throw new IllegalArgumentException("Возраст не может быть отрицательным: " + age);
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Перехвачено исключение: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации проверяемых исключений с методами.
     */
    public static void demonstrateCheckedExceptionsInMethods() {
        System.out.println("\n=== Проверяемые исключения в методах ===");

        try {
            // Вызов метода, который может выбросить checked exception
            readFileContent("test.txt");
        } catch (IOException e) {
            System.out.println("Обработано исключение в методе: " + e.getMessage());
        }
    }

    /**
     * Метод, который может выбросить проверяемое исключение.
     *
     * @param fileName имя файла
     * @throws IOException если файл не найден или возникает ошибка ввода-вывода
     */
    public static void readFileContent(String fileName) throws IOException {
        FileReader file = new FileReader(fileName);
        BufferedReader reader = new BufferedReader(file);
        String content = reader.readLine();
        System.out.println("Содержимое файла: " + content);
        reader.close();
    }

    /**
     * Собственное исключение для демонстрации.
     */
    static class InvalidAgeException extends Exception {
        public InvalidAgeException(String message) {
            super(message);
        }
    }

    /**
     * Главный метод для демонстрации работы с исключениями.
     */
    public static void main(String[] args) {
        System.out.println("=== Демонстрация исключений try-catch ===");

        demonstrateBasicTryCatch();
        demonstrateMultipleCatchBlocks();
        demonstrateFinallyBlock();
        demonstrateIOException();
        demonstrateMultipleCheckedExceptions();
        demonstrateUserInputWithExceptionHandling();
        demonstrateCustomException();
        demonstrateTryWithResources();
        demonstrateNestedTryCatch();
        demonstrateMultiCatch();
        demonstrateThrowKeyword();
        demonstrateCheckedExceptionsInMethods();
    }
}