package org.baileyseyes._8.io;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

/**
 * NIO на минимальном уровне:
 * — Path и Files вместо старого File;
 * — чтение и запись текста в пару строк;
 * — канал FileChannel и буфер ByteBuffer;
 * — обход директории.
 *
 * @see org.baileyseyes._8.io.StreamsDemo Предыдущая часть
 * @see org.baileyseyes._8.reflection.ReflectionAnnotationsDemo Следующая часть
 */
public class NioFilesDemo {

    /**
     * Files — это набор готовых операций над Path.
     * Для текста чаще всего достаточно writeString, readString и readAllLines.
     */
    public static void demonstrateFiles(Path dir) throws IOException {
        System.out.println("=== Files: быстрые операции ===");

        Path note = dir.resolve("note.txt");
        Files.writeString(note, "Первая строка\nВторая строка", StandardCharsets.UTF_8);
        System.out.println("Записано строк: 2");
        System.out.println("Размер: " + Files.size(note) + " байт");

        List<String> lines = Files.readAllLines(note, StandardCharsets.UTF_8);
        for (int i = 0; i < lines.size(); i++) {
            System.out.println((i + 1) + ": " + lines.get(i));
        }

        Path copy = dir.resolve("copy.txt");
        Files.copy(note, copy, StandardCopyOption.REPLACE_EXISTING);
        System.out.println("Копия существует: " + Files.exists(copy));
    }

    /**
     * Канал читает и пишет байты, а ByteBuffer хранит их в памяти.
     * position — текущая позиция, flip() переключает буфер с записи на чтение.
     */
    public static void demonstrateChannel(Path dir) throws IOException {
        System.out.println("\n=== Канал и буфер ===");

        Path file = dir.resolve("channel.txt");
        ByteBuffer buffer = ByteBuffer.allocate(32);
        buffer.put("NIO".getBytes(StandardCharsets.UTF_8));
        buffer.flip();

        try (FileChannel channel = FileChannel.open(
                file,
                StandardOpenOption.CREATE,
                StandardOpenOption.WRITE,
                StandardOpenOption.TRUNCATE_EXISTING)) {
            channel.write(buffer);
        }
        System.out.println("Записано байтов: " + Files.size(file));

        ByteBuffer readBuffer = ByteBuffer.allocate(32);
        int read;
        try (FileChannel channel = FileChannel.open(file, StandardOpenOption.READ)) {
            read = channel.read(readBuffer);
        }
        System.out.println("Прочитано байтов: " + read);

        readBuffer.flip();
        byte[] data = new byte[readBuffer.remaining()];
        readBuffer.get(data);
        System.out.println("Содержимое: " + new String(data, StandardCharsets.UTF_8));
    }

    /**
     * Files.walk возвращает Stream путей: его тоже нужно закрывать.
     */
    public static void demonstrateWalk(Path dir) throws IOException {
        System.out.println("\n=== Обход директории ===");

        try (Stream<Path> paths = Files.walk(dir)) {
            paths.filter(Files::isRegularFile)
                    .map(path -> path.getFileName().toString())
                    .sorted()
                    .forEach(name -> System.out.println("  " + name));
        }
    }

    public static void main(String[] args) throws IOException {
        Path dir = Files.createTempDirectory("java-nio-");
        try {
            System.out.println("=== NIO: Path, Files, каналы ===");
            demonstrateFiles(dir);
            demonstrateChannel(dir);
            demonstrateWalk(dir);
        } finally {
            try (Stream<Path> paths = Files.walk(dir)) {
                paths.sorted(Comparator.reverseOrder()).forEach(path -> {
                    try {
                        Files.deleteIfExists(path);
                    } catch (IOException ignored) {
                        // временная директория: ошибку удаления не считаем критичной
                    }
                });
            }
        }
    }
}
