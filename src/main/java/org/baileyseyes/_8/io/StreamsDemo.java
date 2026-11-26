package org.baileyseyes._8.io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

/**
 * Потоки ввода-вывода на минимальном уровне:
 * — байтовые потоки InputStream/OutputStream;
 * — символьные потоки Reader/Writer;
 * — буферы и кодировка UTF-8;
 * — try-with-resources для автоматического закрытия.
 *
 * @see org.baileyseyes._8.io.NioFilesDemo Следующая часть
 */
public class StreamsDemo {

    /**
     * Байтовые потоки работают с сырыми байтами: файлами, картинками, сетью.
     * ByteArrayOutputStream позволяет собрать байты в памяти без диска.
     */
    public static void demonstrateByteStreams() throws IOException {
        System.out.println("=== Байтовые потоки ===");

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        try (OutputStream output = new BufferedOutputStream(buffer)) {
            output.write("Java".getBytes(StandardCharsets.UTF_8));
            output.write('!');
        }

        byte[] bytes = buffer.toByteArray();
        System.out.println("Байтов записано: " + bytes.length);

        try (InputStream input = new BufferedInputStream(new ByteArrayInputStream(bytes))) {
            int first = input.read();
            System.out.println("Первый байт: " + first + " ('" + (char) first + "')");
            System.out.println("Осталось байтов: " + input.readAllBytes().length);
        }
    }

    /**
     * Reader/Writer работают с символами и учитывают кодировку.
     * InputStreamReader и OutputStreamWriter — мост между байтами и символами.
     */
    public static void demonstrateCharacterStreams() throws IOException {
        System.out.println("\n=== Символьные потоки ===");

        String text = "Привет, Java!\nВторая строка";
        ByteArrayOutputStream raw = new ByteArrayOutputStream();
        try (Writer writer = new OutputStreamWriter(raw, StandardCharsets.UTF_8)) {
            writer.write(text);
        }

        byte[] utf8 = raw.toByteArray();
        System.out.println("Символов: " + text.length() + ", байтов UTF-8: " + utf8.length);

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new ByteArrayInputStream(utf8), StandardCharsets.UTF_8))) {
            String line;
            int number = 1;
            while ((line = reader.readLine()) != null) {
                System.out.println(number++ + ": " + line);
            }
        }
    }

    /**
     * Свой ресурс — это просто класс с методом close().
     * try-with-resources вызывает close() автоматически, даже если внутри была ошибка.
     */
    public static void demonstrateTryWithResources() {
        System.out.println("\n=== try-with-resources ===");

        try (Report report = new Report();
             StringReader reader = new StringReader("one two three");
             BufferedReader buffered = new BufferedReader(reader);
             StringWriter writer = new StringWriter()) {
            String line = buffered.readLine();
            writer.write(line.toUpperCase());
            writer.write(" / слов: " + line.split(" ").length);
            System.out.println(writer);
        } catch (IOException e) {
            System.out.println("Ошибка чтения: " + e.getMessage());
        }
    }

    /**
     * Минимальный AutoCloseable: кроме close() ничего не нужно.
     */
    static class Report implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("report closed");
        }
    }

    public static void main(String[] args) throws IOException {
        System.out.println("=== Потоки ввода-вывода ===");
        demonstrateByteStreams();
        demonstrateCharacterStreams();
        demonstrateTryWithResources();
    }
}
