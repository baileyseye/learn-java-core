package org.baileyseyes._1.types;

/**
 * StringBuilder — изменяемая последовательность символов.
 * <p>
 * String неизменяем: каждая операция создаёт новую строку. Если строку
 * собирают в цикле, удобнее StringBuilder: он меняет свой внутренний буфер.
 * </p>
 *
 * @see StringType Предыдущая часть
 * @see IntArray Следующая часть
 */
@SuppressWarnings("all")
public class StringBuilderDemo {

    /**
     * Сборка строки через append.
     */
    public static void demonstrateAppend() {
        StringBuilder builder = new StringBuilder();
        builder.append("Java");
        builder.append(" Core");

        System.out.println(builder);
    }

    /**
     * Основные методы StringBuilder.
     */
    public static void demonstrateMethods() {
        StringBuilder builder = new StringBuilder("Java Core");

        System.out.println("Длина: " + builder.length());
        System.out.println("Первый символ: " + builder.charAt(0));

        builder.insert(4, " 21");
        System.out.println("После insert: " + builder);

        builder.replace(5, 7, "17");
        System.out.println("После replace: " + builder);

        builder.delete(5, 8);
        System.out.println("После delete: " + builder);

        builder.reverse();
        System.out.println("После reverse: " + builder);
    }

    /**
     * Сборка строки в цикле — типичный сценарий для StringBuilder.
     */
    public static void demonstrateLoop() {
        StringBuilder builder = new StringBuilder();

        for (int i = 1; i <= 5; i++) {
            if (i > 1) {
                builder.append(", ");
            }
            builder.append(i);
        }

        System.out.println(builder);
    }

    public static void main(String[] args) {
        System.out.println("=== append ===");
        demonstrateAppend();

        System.out.println("\n=== Методы ===");
        demonstrateMethods();

        System.out.println("\n=== Сборка в цикле ===");
        demonstrateLoop();
    }
}
