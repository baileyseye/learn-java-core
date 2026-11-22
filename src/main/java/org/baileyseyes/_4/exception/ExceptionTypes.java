package org.baileyseyes._4.exception;

import java.io.IOException;

/**
 * Виды исключений и иерархия классов ошибок.
 * <p>
 * Все исключения наследуют Throwable. Ветка Exception делится на checked
 * (компилятор требует обработки) и unchecked (RuntimeException).
 * </p>
 *
 * @see org.baileyseyes._4.try_catch_finally.TryCatchFinally Предыдущая часть
 * @see ThrowAndThrows Следующая часть
 */
@SuppressWarnings("all")
public class ExceptionTypes {

    /**
     * Проверяем иерархию через instanceof.
     */
    public static void demonstrateHierarchy() {
        Exception checked = new IOException("Файл не найден");
        Exception unchecked = new NullPointerException("Ссылка равна null");

        System.out.println("IOException наследует Exception: " + (checked instanceof Exception));
        System.out.println("IOException наследует RuntimeException: " + (checked instanceof RuntimeException));
        System.out.println("NullPointerException наследует RuntimeException: " + (unchecked instanceof RuntimeException));
    }

    /**
     * Три частые ошибки времени выполнения.
     */
    public static void demonstrateCommonExceptions() {
        String text = null;
        try {
            text.length();
        } catch (NullPointerException e) {
            System.out.println("NullPointerException: String равен null");
        }

        int[] numbers = {1, 2, 3};
        try {
            System.out.println(numbers[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("ArrayIndexOutOfBoundsException: индекса 5 нет в массиве длины 3");
        }

        try {
            Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("NumberFormatException: \"abc\" не является числом");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Иерархия ===");
        demonstrateHierarchy();

        System.out.println("\n=== Частые ошибки ===");
        demonstrateCommonExceptions();
    }
}
