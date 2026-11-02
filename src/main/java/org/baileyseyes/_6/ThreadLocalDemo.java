package org.baileyseyes._6;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * ThreadLocal — переменная, уникальная для каждого потока.
 * Каждый поток получает свою КОПИЮ переменной, не видя чужие.
 * Используется для:
 * — хранение контекста пользователя (сессии, токены)
 * — SimpleDateFormatter (потокобезопасный для каждого потока)
 * — Hibernate Session (каждый поток — своя сессия)
 *
 * @see org.baileyseyes._6.ReentrantLockDemo Предыдущая часть
 * @see org.baileyseyes._7.GenericsDemo Следующая часть
 */
@SuppressWarnings("all")
public class ThreadLocalDemo {

    // ===================== Базовый ThreadLocal =====================

    /**
     * ThreadLocal — каждая нить хранит своё значение.
     */
    public static void demonstrateBasic() {
        System.out.println("=== Базовый ThreadLocal ===");

        // Создаём ThreadLocal с начальным значением
        ThreadLocal<String> threadId = new ThreadLocal<>();

        // Главный поток
        threadId.set("Главный");
        System.out.println("Главный поток видит: " + threadId.get());

        // Новый поток
        Thread t = new Thread(() -> {
            // Новый поток НЕ видит значение главного!
            System.out.println("Новый поток: get() = " + threadId.get()); // null!
            threadId.set("Поток-" + Thread.currentThread().getName());
            System.out.println("Новый поток после set(): " + threadId.get());
        });

        t.start();
        try { t.join(); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        // Главный поток по-прежнему видит своё
        System.out.println("Главный поток снова: " + threadId.get()); // Главный
    }

    /**
     * с initialValue() — задаём значение по умолчанию для каждого потока.
     */
    public static void demonstrateWithInitialValue() {
        System.out.println("\n=== initialValue() ===");

        ThreadLocal<Integer> counter = new ThreadLocal<Integer>() {
            @Override
            protected Integer initialValue() {
                return 0; // каждый поток начинает с 0
            }
        };

        // Главный поток
        System.out.println("Главный: " + counter.get()); // 0

        // Потоки
        for (int i = 1; i <= 3; i++) {
            final int id = i;
            Thread t = new Thread(() -> {
                for (int j = 0; j < 3; j++) {
                    counter.set(counter.get() + 1);
                    System.out.println("  Поток " + id + ": " + counter.get());
                }
            });
            t.start();
        }
    }

    /**
     * ThreadLocal с Integer — инкремент без синхронизации.
     */
    public static void demonstrateThreadLocalCounter() {
        System.out.println("\n=== ThreadLocal счётчик ===");

        ThreadLocal<Integer> threadCounter = new ThreadLocal<Integer>() {
            @Override
            protected Integer initialValue() {
                return 0;
            }
        };

        for (int i = 1; i <= 5; i++) {
            Thread t = new Thread(() -> {
                for (int j = 0; j < 5; j++) {
                    threadCounter.set(threadCounter.get() + 1);
                }
                System.out.println("Поток " + Thread.currentThread().getName() + ": " + threadCounter.get());
            });
            t.start();
        }
    }

    // ===================== ThreadLocal с SimpleDateFormat =====================

    /**
     * ThreadLocal для потокобезопасного SimpleDateFormat.
     * SimpleDateFormat НЕ потокобезопасен — каждый поток получает свой экземпляр.
     */
    public static class ThreadSafeFormatter {
        // ThreadLocal с lazy-initialization
        private static final ThreadLocal<java.text.SimpleDateFormat> dateFormat =
                ThreadLocal.withInitial(() -> new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

        public static String format(java.util.Date date) {
            return dateFormat.get().format(date);
        }

        public static java.util.Date parse(String text) throws java.text.ParseException {
            return dateFormat.get().parse(text);
        }
    }

    public static void demonstrateDateFormat() {
        System.out.println("\n=== ThreadLocal для SimpleDateFormat ===");

        java.util.Date now = new java.util.Date();

        // Главный поток
        String mainFormatted = ThreadSafeFormatter.format(now);
        System.out.println("Главный: " + mainFormatted);

        // Параллельные потоки
        for (int i = 1; i <= 3; i++) {
            final int id = i;
            Thread t = new Thread(() -> {
                String formatted = ThreadSafeFormatter.format(new java.util.Date());
                System.out.println("Поток " + id + ": " + formatted);
            });
            t.start();
        }

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // ===================== ThreadLocal для User Context =====================

    /**
     * ThreadLocal для хранения контекста пользователя.
     * Реальный паттерн в веб-приложениях!
     */
    public static class UserContext {
        // Храним текущего пользователя для каждого потока
        private static final ThreadLocal<String> currentUser = new ThreadLocal<>();

        public static void setCurrentUser(String user) {
            currentUser.set(user);
        }

        public static String getCurrentUser() {
            return currentUser.get();
        }

        public static void clearUser() {
            currentUser.remove(); // ← ОБЯЗАТЕЛЬНО очищаем!
        }
    }

    public static void demonstrateUserContext() {
        System.out.println("\n=== Контекст пользователя (UserContext) ===");

        // Запрос от пользователя "Алексей"
        UserContext.setCurrentUser("Алексей");
        System.out.println("Запрос от: " + UserContext.getCurrentUser());

        // Параллельный запрос от пользователя "Мария"
        Thread maria = new Thread(() -> {
            UserContext.setCurrentUser("Мария");
            System.out.println("Мария видит: " + UserContext.getCurrentUser());
            UserContext.clearUser();
        });

        // Параллельный запрос от пользователя "Дмитрий"
        Thread dmitry = new Thread(() -> {
            UserContext.setCurrentUser("Дмитрий");
            System.out.println("Дмитрий видит: " + UserContext.getCurrentUser());
            UserContext.clearUser();
        });

        maria.start();
        dmitry.start();

        // Главный поток всё ещё видит "Алексей"
        System.out.println("Главный всё ещё: " + UserContext.getCurrentUser());

        try {
            maria.join();
            dmitry.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Теперь главный очистил — get() вернёт null
        System.out.println("После clear: " + UserContext.getCurrentUser());
    }

    // ===================== ThreadLocal vs synchronized =====================

    /**
     * ThreadLocal vs synchronized: когда что использовать.
     * — ThreadLocal: каждый поток — СВОЕ значение (не нужно синхронизироваться!)
     * — synchronized: все потоки — ОДНО значение (нужна блокировка!)
     */
    public static void demonstrateThreadLocalVsSynchronized() {
        System.out.println("\n=== ThreadLocal vs synchronized ===");

        // ThreadLocal: каждый поток имеет СВОЮ копию
        ThreadLocal<Integer> threadLocalValue = new ThreadLocal<Integer>() {
            @Override
            protected Integer initialValue() {
                return 0;
            }
        };

        // synchronized: общий ресурс, защищённый замком
        AtomicInteger synchronizedValue = new AtomicInteger(0);

        Thread tlThread = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                threadLocalValue.set(threadLocalValue.get() + 1);
            }
            System.out.println("ThreadLocal: " + threadLocalValue.get());
        });

        Thread syncThread = new Thread(() -> {
            synchronized (ThreadLocalDemo.class) {
                for (int i = 0; i < 10; i++) {
                    synchronizedValue.incrementAndGet();
                }
            }
            System.out.println("Synchronized: " + synchronizedValue.get());
        });

        tlThread.start();
        syncThread.start();

        try {
            tlThread.join();
            syncThread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // ===================== remove() — очистка =====================

    /**
     * ThreadLocal.remove() — ОЧИЩАЕТ значение потока.
     * КРИТИЧЕСКИ ВАЖНО в web-серверах: без remove() значения накапливаются!
     */
    public static void demonstrateRemove() {
        System.out.println("\n=== remove() ===");

        ThreadLocal<String> value = new ThreadLocal<>();
        value.set("Значение 1");
        System.out.println("До remove(): " + value.get()); // Значение 1

        value.remove();
        System.out.println("После remove(): " + value.get()); // null

        // Следующий get() вернёт initialValue(), если он задан
        ThreadLocal<Integer> withInitial = new ThreadLocal<Integer>() {
            @Override
            protected Integer initialValue() {
                return 42;
            }
        };
        withInitial.set(100);
        System.out.println("До remove(): " + withInitial.get()); // 100

        withInitial.remove();
        System.out.println("После remove(): " + withInitial.get()); // 42 (initialValue!)
    }

    // ===================== Сложный ThreadLocal паттерн =====================

    /**
     * Реальный паттерн: корреляционный ID для трейсинга запросов.
     */
    public static class RequestTracer {
        private static final ThreadLocal<String> traceId = new ThreadLocal<>();

        public static void startTrace(String id) {
            traceId.set(id);
        }

        public static String getTraceId() {
            return traceId.get();
        }

        public static void endTrace() {
            traceId.remove();
        }
    }

    public static void demonstrateTracing() {
        System.out.println("\n=== Трейсинг запросов (traceId) ===");

        // Имитация HTTP-запроса
        Runnable request = () -> {
            String traceId = java.util.UUID.randomUUID().toString().substring(0, 8);
            RequestTracer.startTrace(traceId);

            System.out.println("Запрос " + traceId + ": начался");

            // Вложенный вызов — traceId доступен!
            nestedMethod();

            System.out.println("Запрос " + traceId + ": завершился");
            RequestTracer.endTrace();
        };

        // Несколько параллельных запросов
        for (int i = 1; i <= 3; i++) {
            new Thread(request).start();
        }

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private static void nestedMethod() {
        String traceId = RequestTracer.getTraceId();
        System.out.println("  Вложенный метод: traceId=" + traceId);
    }

    public static void main(String[] args) {
        System.out.println("=== ThreadLocal ===");
        demonstrateBasic();
        demonstrateWithInitialValue();
        demonstrateThreadLocalCounter();
        demonstrateDateFormat();
        demonstrateUserContext();
        demonstrateThreadLocalVsSynchronized();
        demonstrateRemove();
        demonstrateTracing();
    }
}
