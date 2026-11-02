package org.baileyseyes._4.try_catch_finally;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует работу с try-with-resources в Java.
 * <p>
 * Try-with-resources - это улучшенный синтаксис оператора try,
 * который автоматически закрывает ресурсы, (классы, реализующие интерфейс {@linkplain AutoCloseable}
 * </p>
 *
 * @see org.baileyseyes._4.exception.HumanNotFoundException Следующая часть
 * @see TryCatchFinally Предыдущая часть
 */
@UselessButNeedToKnow
public class TryWithResources {

    /**
     * Метод для демонстрации базового использования try-with-resources.
     * <p>
     * Ресурсы автоматически закрываются даже при возникновении исключения.
     * </p>
     */
    public static void demonstrateBasicTryWithResources() {
        System.out.println("=== Базовое использование try-with-resources ===");

        // Try-with-resources для одного ресурса
        try (FileReader file = new FileReader("example.txt")) {
            int character;
            while ((character = file.read()) != -1) {
                System.out.print((char) character);
            }
        } catch (IOException e) {
            System.out.println("Ошибка при работе с файлом: " + e.getMessage());
        }
        System.out.println(); // Перевод строки
    }

    /**
     * Метод для демонстрации try-with-resources с несколькими ресурсами.
     */
    public static void demonstrateMultipleResources() {
        System.out.println("\n=== Try-with-resources с несколькими ресурсами ===");

        // Try-with-resources для нескольких ресурсов
        try (FileReader fileReader = new FileReader("input.txt");
            FileWriter fileWriter = new FileWriter("output.txt")) {

            int character;
            while ((character = fileReader.read()) != -1) {
                fileWriter.write(character);
            }
            System.out.println("Данные успешно скопированы");

        } catch (IOException e) {
            System.out.println("Ошибка при работе с файлами: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации try-with-resources с пользовательскими ресурсами.
     */
    public static void demonstrateCustomResource() {
        System.out.println("\n=== Try-with-resources с пользовательским ресурсом ===");

        try (CustomResource resource = new CustomResource()) {
            resource.doSomething();
            System.out.println("Работа с пользовательским ресурсом завершена");
        } catch (Exception e) {
            System.out.println("Ошибка при работе с ресурсом: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации работы с BufferedReader и PrintWriter.
     */
    public static void demonstrateBufferedReaderPrintWriter() {
        System.out.println("\n=== BufferedReader и PrintWriter ===");

        try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"));
            PrintWriter writer = new PrintWriter(new FileWriter("output.txt"))) {

            String line;
            while ((line = reader.readLine()) != null) {
                writer.println(line.toUpperCase());
            }
            System.out.println("Файл успешно обработан и преобразован в верхний регистр");

        } catch (IOException e) {
            System.out.println("Ошибка при работе с файлами: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации обработки исключений в try-with-resources.
     */
    public static void demonstrateExceptionHandling() {
        System.out.println("\n=== Обработка исключений в try-with-resources ===");

        try (FileInputStream fis = new FileInputStream("nonexistent.txt")) {
            // Этот код не выполнится из-за отсутствия файла
            int data = fis.read();
            System.out.println("Данные: " + data);
        } catch (IOException e) {
            System.out.println("Перехвачено исключение: " + e.getClass().getSimpleName() +
                " - " + e.getMessage());
            // Исключение при закрытии ресурса также может быть записано в стек
        }
    }

    /**
     * Метод для демонстрации автоматического закрытия ресурсов.
     */
    public static void demonstrateAutomaticClosing() {
        System.out.println("\n=== Автоматическое закрытие ресурсов ===");

        try (AutoCloseableResource resource1 = new AutoCloseableResource("Ресурс 1");
            AutoCloseableResource resource2 = new AutoCloseableResource("Ресурс 2")) {

            System.out.println("Ресурсы созданы и используются");
            resource1.doWork();
            resource2.doWork();

            // Ресурсы автоматически закроются при выходе из блока try
            System.out.println("Работа с ресурсами завершена");

        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации try-with-resources с потоками данных.
     */
    public static void demonstrateInputStreamOutputStream() {
        System.out.println("\n=== InputStream и OutputStream ===");

        try (FileInputStream fis = new FileInputStream("input.dat");
            FileOutputStream fos = new FileOutputStream("output.dat")) {

            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
            System.out.println("Данные успешно скопированы из input.dat в output.dat");

        } catch (IOException e) {
            System.out.println("Ошибка при работе с потоками: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации правильного использования try-with-resources.
     */
    public static void demonstrateBestPractices() {
        System.out.println("\n=== Лучшие практики try-with-resources ===");

        // Правильное использование - ресурсы объявлены в самом try
        try (FileReader fr = new FileReader("data.txt");
            BufferedReader br = new BufferedReader(fr)) {

            String line = br.readLine();
            System.out.println("Чтение данных: " + line);

        } catch (IOException e) {
            System.out.println("Ошибка чтения файла: " + e.getMessage());
        }

        // Неправильное использование - ресурсы не объявлены в try
        // FileReader fr = new FileReader("data.txt"); // Так не делаем
        // try (BufferedReader br = new BufferedReader(fr)) { ... } // Используем только в try
    }

    /**
     * Пользовательский класс, реализующий AutoCloseable.
     */
    @SuppressWarnings("all")
    static class CustomResource implements AutoCloseable {
        private String name;

        public CustomResource() {
            this.name = "CustomResource";
            System.out.println(name + " создан");
        }

        public void doSomething() {
            System.out.println(name + " выполняет действие");
        }

        @Override
        public void close() {
            System.out.println(name + " закрыт автоматически");
        }
    }

    /**
     * Класс, реализующий AutoCloseable для демонстрации.
     */
    @SuppressWarnings("all")
    static class AutoCloseableResource implements AutoCloseable {
        private String name;

        public AutoCloseableResource(String name) {
            this.name = name;
            System.out.println(name + " создан");
        }

        public void doWork() {
            System.out.println(name + " выполняет работу");
        }

        @Override
        public void close() {
            System.out.println(name + " закрыт");
        }
    }

    /**
     * Главный метод для демонстрации try-with-resources.
     */
    public static void main(String[] args) {
        System.out.println("=== Демонстрация try-with-resources ===");

        demonstrateBasicTryWithResources();
        demonstrateMultipleResources();
        demonstrateCustomResource();
        demonstrateBufferedReaderPrintWriter();
        demonstrateExceptionHandling();
        demonstrateAutomaticClosing();
        demonstrateInputStreamOutputStream();
        demonstrateBestPractices();
    }
}