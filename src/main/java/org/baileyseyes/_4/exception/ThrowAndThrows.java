package org.baileyseyes._4.exception;

/**
 * throw и throws.
 * <p>
 * {@code throw} бросает конкретное исключение, {@code throws} объявляет
 * в сигнатуре метода, что он может выбросить checked-исключение.
 * </p>
 *
 * @see ExceptionTypes Предыдущая часть
 * @see StackTraceDemo Следующая часть
 */
@SuppressWarnings("all")
public class ThrowAndThrows {

    /**
     * Checked-исключение: компилятор требует обработки или объявления throws.
     */
    static class AgeException extends Exception {
        AgeException(String message) {
            super(message);
        }
    }

    /**
     * Метод объявляет throws AgeException, поэтому вызывающий код обязан
     * обработать исключение или пробросить его дальше.
     */
    public static int parseAge(String text) throws AgeException {
        try {
            int age = Integer.parseInt(text);
            if (age < 0) {
                throw new AgeException("Возраст не может быть отрицательным");
            }
            return age;
        } catch (NumberFormatException e) {
            throw new AgeException("Это не число: " + text);
        }
    }

    /**
     * Исключение возникает на нижнем уровне...
     */
    static void levelThree() throws AgeException {
        System.out.println("levelThree: бросаю исключение");
        throw new AgeException("Что-то пошло не так");
    }

    /**
     * ...не обрабатывается здесь и пробрасывается дальше...
     */
    static void levelTwo() throws AgeException {
        System.out.println("levelTwo: пробрасываю дальше");
        levelThree();
    }

    /**
     * ...и ловится только на верхнем уровне.
     */
    static void levelOne() {
        System.out.println("levelOne: ловлю");
        try {
            levelTwo();
        } catch (AgeException e) {
            System.out.println("Поймано в levelOne: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        System.out.println("=== throw ===");
        try {
            parseAge("-5");
        } catch (AgeException e) {
            System.out.println("Поймано: " + e.getMessage());
        }
        try {
            parseAge("abc");
        } catch (AgeException e) {
            System.out.println("Поймано: " + e.getMessage());
        }

        System.out.println("\n=== throws и проброс ===");
        levelOne();
    }
}
