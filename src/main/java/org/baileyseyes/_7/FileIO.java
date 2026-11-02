package org.baileyseyes._7;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.List;
import java.util.stream.Stream;

/**
 * Работа с файлами:
 * — Базовый FileInputStream/FileOutputStream (байты)
 * — BufferedReader/Writer (символы, строки)
 * — NIO.2: Files, Path — современный API (Java 7+)
 * — Files.readAllLines, Files.write, Files.copy, Files.walk
 *
 * @see org.baileyseyes._7.FunctionalInterfaces Предыдущая часть
 */
@SuppressWarnings("all")
public class FileIO {

    /**
     * Запись файла через FileWriter (символы).
     */
    public static void demonstrateFileWriter() {
        System.out.println("=== FileWriter ===");
        String path = "output_demo.txt";

        try (FileWriter writer = new FileWriter(path)) {
            writer.write("Привет, файл!\n");
            writer.write("Строка 2\n");
            writer.write("Строка 3");
            System.out.println("Файл '" + path + "' записан");
        } catch (IOException e) {
            System.out.println("Ошибка записи: " + e.getMessage());
        }
    }

    /**
     * Чтение файла через FileReader и BufferedReader.
     * BufferedReader читает буферами, что быстрее чем по символу.
     */
    public static void demonstrateFileReader() {
        System.out.println("\n=== BufferedReader ===");
        String path = "output_demo.txt";

        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String line;
            int lineNum = 1;
            while ((line = reader.readLine()) != null) {
                System.out.println("Строка " + lineNum + ": " + line);
                lineNum++;
            }
        } catch (IOException e) {
            System.out.println("Ошибка чтения: " + e.getMessage());
        }
    }

    /**
     * Чтение и запись с кодировкой UTF-8 (проблема Windows: кодировка по умолчанию не UTF-8!).
     */
    public static void demonstrateUtf8Encoding() {
        System.out.println("\n=== UTF-8 кодировка ===");
        String path = "output_utf8.txt";

        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(path), StandardCharsets.UTF_8)) {
            writer.write("Привет мир! Привет Java! Привет НАО!");
            writer.newLine();
            writer.write("Кириллица, цифры 123, символы: @#€");
            System.out.println("Файл '" + path + "' записан в UTF-8");
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.readAllLines — чтение всего файла в список строк.
     */
    public static void demonstrateReadAllLines() {
        System.out.println("\n=== Files.readAllLines ===");
        try {
            List<String> lines = Files.readAllLines(Paths.get("output_utf8.txt"), StandardCharsets.UTF_8);
            System.out.println("Всего строк: " + lines.size());
            for (int i = 0; i < lines.size(); i++) {
                System.out.println("  [" + (i + 1) + "] " + lines.get(i));
            }
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.write — запись списка строк в файл.
     */
    public static void demonstrateWriteAllLines() {
        System.out.println("\n=== Files.write ===");
        String path = "write_all_demo.txt";

        List<String> lines = List.of(
                "Строка 1: первая",
                "Строка 2: вторая",
                "Строка 3: третья"
        );

        try {
            // Стандартный режим: перезапись
            Files.write(Paths.get(path), lines, StandardCharsets.UTF_8);
            System.out.println("Записано " + lines.size() + " строк в '" + path + "'");

            // Режим добавления (append)
            Files.write(Paths.get(path), List.of("Строка 4: appended"),
                    StandardCharsets.UTF_8, java.nio.file.StandardOpenOption.APPEND);
            System.out.println("Добавлена строка");
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.copy — копирование файла.
     */
    public static void demonstrateCopy() {
        System.out.println("\n=== Files.copy ===");

        Path source = Paths.get("output_demo.txt");
        Path destination = Paths.get("output_demo_copy.txt");

        try {
            // REPLACE_EXISTING — перезаписать, если файл существует
            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Скопировано: " + source + " → " + destination);

            // Посчитать размер файла
            long size = Files.size(destination);
            System.out.println("Размер: " + size + " байт");
        } catch (IOException e) {
            System.out.println("Ошибка копирования: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.move — перемещение файла.
     */
    public static void demonstrateMove() {
        System.out.println("\n=== Files.move ===");

        Path from = Paths.get("output_demo_copy.txt");
        Path to = Paths.get("output_demo_moved.txt");

        try {
            // REPLACE_EXISTING — заменить, если целевой файл есть
            Files.move(from, to, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Перемещено: " + from + " → " + to);

            // Проверить существование
            System.out.println("Old exists: " + Files.exists(from));
            System.out.println("New exists: " + Files.exists(to));
        } catch (IOException e) {
            System.out.println("Ошибка перемещения: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.walk — рекурсивный обход директории.
     */
    public static void demonstrateWalkDirectory() {
        System.out.println("\n=== Files.walk (обход директории) ===");

        try {
            Path start = Paths.get(".");

            // Stream<Path> — итерируемся по всем файлам и папкам
            try (Stream<Path> stream = Files.walk(start, 2)) { // глубина 2 уровня
                stream.filter(Files::isRegularFile) // только файлы
                      .forEach(path -> {
                          try {
                              long size = Files.size(path);
                              System.out.println("  " + path + " (" + size + " байт)");
                          } catch (IOException e) {
                              // игнорируем недоступные
                          }
                      });
            }
        } catch (IOException e) {
            System.out.println("Ошибка обхода: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.createTempFile — создание временного файла.
     */
    public static void demonstrateTempFile() {
        System.out.println("\n=== Временный файл ===");

        try {
            Path tempFile = Files.createTempFile("myapp", ".tmp");
            System.out.println("Временный файл: " + tempFile);
            System.out.println("В системе temp: " + System.getProperty("java.io.tmpdir"));
            System.out.println("Delete on exit: " + tempFile);
            tempFile.toFile().deleteOnExit();

            Files.write(tempFile, "временные данные".getBytes(StandardCharsets.UTF_8));
            System.out.println("Записано в временный файл");
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.exists, Files.isDirectory, Files.isHidden.
     */
    public static void demonstrateFileCheck() throws IOException {
        System.out.println("\n=== Проверки файлов ===");

        String path = "output_demo.txt";
        Path p = Paths.get(path);

        System.out.println("exists: " + Files.exists(p));
        System.out.println("isDirectory: " + Files.isDirectory(p));
        System.out.println("isRegularFile: " + Files.isRegularFile(p));
        System.out.println("isHidden: " + Files.isHidden(p));

        try {
            BasicFileAttributes attrs = Files.readAttributes(p, BasicFileAttributes.class);
            System.out.println("создан: " + attrs.creationTime());
            System.out.println("модифицирован: " + attrs.lastModifiedTime());
            System.out.println("размер: " + attrs.size() + " байт");
        } catch (IOException e) {
            System.out.println("Ошибка чтения атрибутов: " + e.getMessage());
        }
    }

    /**
     * Чтение файла поблочно (chunked read) — для больших файлов.
     */
    public static void demonstrateChunkedRead() {
        System.out.println("\n=== Поблочное чтение (InputStream) ===");
        String path = "output_demo.txt";

        try (FileInputStream fis = new FileInputStream(path);
             BufferedInputStream bis = new BufferedInputStream(fis)) {

            byte[] buffer = new byte[16]; // буфер 16 байт
            int bytesRead;
            int totalBytes = 0;

            while ((bytesRead = bis.read(buffer)) != -1) {
                String chunk = new String(buffer, 0, bytesRead, StandardCharsets.UTF_8);
                System.out.print(chunk); // выводим поблочно
                totalBytes += bytesRead;
            }
            System.out.println("\nВсего прочитано: " + totalBytes + " байт");

        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * Подсчёт строк, слов и символов в файле.
     */
    public static void demonstrateTextStats() {
        System.out.println("\n=== Статистика текста ===");
        String path = "output_utf8.txt";

        try {
            List<String> lines = Files.readAllLines(Paths.get(path), StandardCharsets.UTF_8);
            int charCount = 0;
            int wordCount = 0;

            for (String line : lines) {
                charCount += line.length();
                // Подсчёт слов: делим по пробелам
                if (!line.trim().isEmpty()) {
                    wordCount += line.trim().split("\\s+").length;
                }
            }
            System.out.println("Строк: " + lines.size());
            System.out.println("Слов: " + wordCount);
            System.out.println("Символов: " + charCount);
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    public static void main(String[] args) throws IOException {
        System.out.println("=== Работа с файлами ===");
        demonstrateFileWriter();
        demonstrateFileReader();
        demonstrateUtf8Encoding();
        demonstrateReadAllLines();
        demonstrateWriteAllLines();
        demonstrateCopy();
        demonstrateMove();
        demonstrateWalkDirectory();
        demonstrateTempFile();
        demonstrateFileCheck();
        demonstrateChunkedRead();
        demonstrateTextStats();
    }
}
