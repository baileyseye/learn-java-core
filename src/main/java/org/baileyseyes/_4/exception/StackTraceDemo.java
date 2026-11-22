package org.baileyseyes._4.exception;

/**
 * Как читать stack trace.
 * <p>
 * Первая строка показывает тип исключения и сообщение. Следующие строки —
 * стек вызовов: сверху находится место, где ошибка возникла, ниже — кто
 * вызвал этот метод.
 * </p>
 *
 * @see ThrowAndThrows Предыдущая часть
 * @see org.baileyseyes._4.try_catch_finally.TryWithResources Следующая часть
 */
@SuppressWarnings("all")
public class StackTraceDemo {

    static void levelThree() {
        throw new IllegalStateException("Данные не найдены");
    }

    static void levelTwo() {
        levelThree();
    }

    static void levelOne() {
        levelTwo();
    }

    /**
     * Печатаем сообщение, тип и только свои кадры стека.
     */
    public static void demonstrateReadingStackTrace() {
        try {
            levelOne();
        } catch (IllegalStateException e) {
            System.out.println("Сообщение: " + e.getMessage());
            System.out.println("Тип: " + e.getClass().getSimpleName());
            System.out.println("Стек вызовов:");

            for (StackTraceElement element : e.getStackTrace()) {
                if (element.getClassName().startsWith("org.baileyseyes")) {
                    String simpleName = element.getClassName()
                            .substring(element.getClassName().lastIndexOf('.') + 1);
                    System.out.println("  " + simpleName + "." + element.getMethodName()
                            + ":" + element.getLineNumber());
                }
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Чтение stack trace ===");
        demonstrateReadingStackTrace();
    }
}
