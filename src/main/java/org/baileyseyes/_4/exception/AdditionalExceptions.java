package org.baileyseyes._4.exception;

/**
 * Дополнительно к try-catch-finally:
 * — checked vs unchecked исключения
 * — suppressed exceptions
 * — многократное бросание (rethrow)
 * — Exception vs Error
 *
 * @see org.baileyseyes._4.try_catch_finally.TryWithResources Предыдущая часть
 */
public class AdditionalExceptions {

    // ===================== Checked vs Unchecked =====================

    /**
     * Checked-исключение — компилятор ТРЕБУЕТ обработки.
     * IOException, SQLException, ClassNotFoundException — checked.
     * Почему? Потому что проблема внешняя — файл, база данных — мы не контролируем.
     */
    public static void demonstrateCheckedException() {
        System.out.println("=== Checked-исключение ===");

        // Компилятор ЗАСТАВИТ нас обработить FileNotFoundException
        try {
            throw new java.io.FileNotFoundException("file.txt");
        } catch (java.io.FileNotFoundException e) {
            System.out.println("Файл не найден: " + e.getMessage());
        }
        // Без try-catch или throws — ошибка компиляции!
    }

    /**
     * Unchecked-исключение (RuntimeException) — компилятор НЕ требует обработки.
     * NullPointerException, ArithmeticException, IllegalArgumentException — unchecked.
     * Почему? Потому что это баг кода — мы МОЖЕМ и ДОЛЖНЫ это предотвратить.
     */
    public static void demonstrateUncheckedException() {
        System.out.println("\n=== Unchecked-исключение ===");

        try {
            String text = null;
            System.out.println(text.length()); // NullPointerException!
        } catch (NullPointerException e) {
            System.out.println("Ой, null! Это баг — надо проверить перед использованием: " + e.getMessage());
        }
    }

    // ===================== Exception Hierarchy =====================

    /**
     * Иерархия: Throwable → Exception / Error
     * — Exception: проблемы, которые можно и нужно обработить
     * — Error: катастрофы (OutOfMemoryError, StackOverflowError) — обычно не ловятся
     */
    public static void demonstrateExceptionHierarchy() {
        System.out.println("\n=== Иерархия исключений ===");

        // Показываем иерархию для разных исключений
        printHierarchy(new NullPointerException());
        printHierarchy(new ArithmeticException());
        printHierarchy(new java.io.IOException());
    }

    private static void printHierarchy(Throwable t) {
        System.out.print(t.getClass().getSimpleName() + ": ");
        Throwable current = t;
        while (current.getCause() != null) {
            current = current.getCause();
        }
        System.out.println("корень: " + t.getClass().getName());

        // Показываем весь стек наследования
        System.out.print("  Иерархия: ");
        Throwable parent = t;
        while (parent != null) {
            System.out.print(parent.getClass().getSimpleName());
            parent = parent.getCause();
            if (parent != null) System.out.print(" → ");
        }
        System.out.println();
        System.out.println("  Checked? " + !((t instanceof RuntimeException) || (t instanceof Error)));
    }

    // ===================== Suppressed Exceptions =====================

    /**
     * Suppressed exceptions:
     * Когда в try-with-resources возникает исключение при закрытии,
     * оно «приглашается» к основному исключению через addSuppressed().
     * В Java 7+ это позволяет увидеть ВСЕ проблемы, а не только первую.
     */
    public static void demonstrateSuppressedExceptions() {
        System.out.println("\n=== Suppressed исключения ===");

        try {
            doSomethingThatThrows();
        } catch (Exception e) {
            System.out.println("Главная ошибка: " + e.getMessage());
            System.out.println("Дополнительные suppressed исключения:");
            for (Throwable suppressed : e.getSuppressed()) {
                System.out.println("  Suppressed: " + suppressed.getClass().getSimpleName() + " — " + suppressed.getMessage());
            }
        }
    }

    private static void doSomethingThatThrows() throws Exception {
        Exception main = new Exception("Ошибка при чтении файла");

        try {
            throw main;
        } catch (Exception e) {
            // Имитируем: при закрытии ресурса тоже произошла ошибка
            Exception resourceError = new Exception("Ошибка при закрытии ресурса");
            e.addSuppressed(resourceError); // suppressed exception
            throw e;
        }
    }

    // ===================== Rethrow (повторное бросание) =====================

    /**
     * Ретраскивание (rethrow) исключения:
     * Ловим, обрабатываем логирование, бросаем дальше — выше по стеку.
     * Это «я не могу это починить, но я знаю, что случилось».
     */
    public static void demonstrateRethrow() {
        System.out.println("\n=== Rethrow (повторное бросание) ===");

        try {
            processOrder(0);
        } catch (IllegalArgumentException e) {
            System.out.println("Главный метод получил: " + e.getMessage());
        }
    }

    private static void processOrder(int quantity) throws IllegalArgumentException {
        try {
            calculatePrice(quantity);
        } catch (IllegalArgumentException e) {
            System.out.println("Служба заказов: логгирую ошибку — " + e.getMessage());
            throw e; // ретраскиваем дальше
        }
    }

    private static double calculatePrice(int quantity) throws IllegalArgumentException {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Количество должно быть > 0, а было: " + quantity);
        }
        return quantity * 100.0;
    }

    // ===================== Error vs Exception =====================

    /**
     * Error — это НЕ исключение, это катастрофа.
     * OutOfMemoryError, StackOverflowError, NoClassDefFoundError.
     * Их НЕЛЬЗЯ и НЕ НУЖНО ловить — они значат «система сломалась».
     */
    public static void demonstrateErrorVsException() {
        System.out.println("\n=== Error vs Exception ===");

        System.out.println("Error: система сломалась, ловить бесполезно");
        System.out.println("Exception: проблема внешняя, можно обработать");
        System.out.println("RuntimeException: баг в коде, надо исправить");
    }

    /**
     * Custom exception — собственный тип исключения.
     * Расширяем RuntimeException для unchecked-исключения.
     */
    static class OrderException extends RuntimeException {
        public OrderException(String message) {
            super(message);
        }

        public OrderException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    /**
     * Использование custom exception в цепочке вызовов.
     */
    public static void demonstrateCustomExceptionChain() {
        System.out.println("\n=== Custom exception цепочка ===");

        try {
            registerUser("Алексей", -5);
        } catch (OrderException e) {
            System.out.println("Главный метод: " + e.getMessage());
            if (e.getCause() != null) {
                System.out.println("  Причина: " + e.getCause().getMessage());
            }
        }
    }

    private static void registerUser(String name, int age) throws OrderException {
        try {
            validateAge(age);
        } catch (IllegalArgumentException e) {
            // Оборачиваем исключение в наше custom-исключение
            throw new OrderException("Не удалось зарегистрировать пользователя: " + name, e);
        }
    }

    private static void validateAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Возраст: " + age);
        }
    }

    // ===================== Try-catch внутри цикла =====================

    /**
     * Частый паттерн: обработка ошибок внутри обработки данных.
     * Если один элемент не прошёл — пропускаем, но остальные обрабатываем.
     */
    public static void demonstrateCatchInsideLoop() {
        System.out.println("\n=== Обработка ошибок в цикле ===");

        String[] inputs = {"100", "200", "abc", "400", "def", "600"};
        int processedCount = 0;
        int errorCount = 0;

        for (String input : inputs) {
            try {
                int value = Integer.parseInt(input);
                System.out.println("Обработано: " + input + " → " + (value * 2));
                processedCount++;
            } catch (NumberFormatException e) {
                System.out.println("Пропускаем некорректное значение: '" + input + "'");
                errorCount++;
            }
        }

        System.out.println("Итого: обработано " + processedCount + ", ошибок " + errorCount);
    }

    // ===================== Multi-catch с catch-перехватом =====================

    /**
     * Java 7+: multi-catch (одно catch для нескольких типов).
     * Исключение в multi-catch — final! Его нельзя изменять.
     */
    public static void demonstrateMultiCatchPatterns() {
        System.out.println("\n=== Multi-catch паттерны ===");

        String input = "hello";

        try {
            int value = Integer.parseInt(input);
        } catch (NumberFormatException | NullPointerException e) {
            // e — implicitly final, нельзя делать e = new Exception(...)
            System.out.println("Некорректный ввод: " + e.getClass().getSimpleName());
        }
    }

    // ===================== Throwable.getStackTrace() =====================

    /**
     * Получение и разбор стека вызовов.
     * Полезно для логирования: «кто вызвал метод, приведший к ошибке».
     */
    public static void demonstrateStackTrace() {
        System.out.println("\n=== Разбор стека вызовов ===");

        try {
            methodA();
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
            System.out.println("Стек вызовов:");
            StackTraceElement[] stack = e.getStackTrace();
            for (StackTraceElement element : stack) {
                System.out.println("  " + element.getClassName() + "." +
                                   element.getMethodName() + "(" +
                                   element.getFileName() + ":" +
                                   element.getLineNumber() + ")");
            }
        }
    }

    private static void methodA() {
        methodB();
    }

    private static void methodB() {
        methodC();
    }

    private static void methodC() {
        throw new RuntimeException("Ошибка здесь!");
    }

    public static void main(String[] args) {
        System.out.println("=== Дополнительные исключения ===");
        demonstrateCheckedException();
        demonstrateUncheckedException();
        demonstrateExceptionHierarchy();
        demonstrateSuppressedExceptions();
        demonstrateRethrow();
        demonstrateErrorVsException();
        demonstrateCustomExceptionChain();
        demonstrateCatchInsideLoop();
        demonstrateMultiCatchPatterns();
        demonstrateStackTrace();
    }
}
