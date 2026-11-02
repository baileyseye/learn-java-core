package org.baileyseyes._6;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.function.Supplier;

/**
 * CompletableFuture — асинхронное программирование без адов колбэков.
 * Заменяет Callback-холодец на цепочку методов: thenApply, thenCompose, thenAccept.
 * Позволяет объединять результаты разных асинхронных задач.
 *
 * @see org.baileyseyes._6.synchronized_method.SynchronizedMethods Предыдущая часть
 */
@SuppressWarnings("all")
public class CompletableFutureDemo {

    // ===================== Базовый CompletableFuture =====================

    /**
     * Создание CompletableFuture и получение результата.
     */
    public static void demonstrateBasicCompletableFuture() {
        System.out.println("=== Базовый CompletableFuture ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            // Эта работа выполняется в другом потоке
            System.out.println("Работа выполняется в: " + Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return "Результат после секунды!";
        });

        System.out.println("Главный поток не ждёт...");

        // Ждём результат
        String result = future.join(); // блокирует до получения результата
        System.out.println("Получили: " + result);
    }

    // ===================== thenApply =====================

    /**
     * thenApply: преобразование результата.
     * Как map, но для асинхронных задач.
     */
    public static void demonstrateThenApply() {
        System.out.println("\n=== thenApply (цепочка преобразований) ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "hello")
                .thenApply(String::toUpperCase)
                .thenApply(s -> s + " WORLD")
                .thenApply(s -> s + "!");

        System.out.println("Результат: " + future.join());
        // HELLO WORLD!
    }

    /**
     * thenApply с проверкой на null (thenApplyIfPresent — нет в Java 8).
     * Вместо этого: thenApply с if внутри.
     */
    public static void demonstrateSafeThenApply() {
        System.out.println("\n=== Безопасное преобразование ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "test")
                .thenApply(s -> {
                    if (s == null) {
                        return "default";
                    }
                    return s.toUpperCase();
                });

        System.out.println("Результат: " + future.join());
    }

    // ===================== thenAccept =====================

    /**
     * thenAccept: обработка результата без преобразования (void).
     * Как forEach для асинхронных задач.
     */
    public static void demonstrateThenAccept() {
        System.out.println("\n=== thenAccept (обработка без преобразования) ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "Загрузка завершена");
        // thenAccept потребляет результат и возвращает CompletableFuture<Void>
        CompletableFuture<Void> consumed = future.thenAccept(result -> {
            System.out.println("Получили: " + result);
        });

        consumed.join();
    }

    // ===================== thenRun =====================

    /**
     * thenRun: действие БЕЗ доступа к результату.
     * Просто «сделай что-то после завершения».
     */
    public static void demonstrateThenRun() {
        System.out.println("\n=== thenRun (действие без результата) ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "данные");
        CompletableFuture<Void> thenRunFuture = future.thenRun(() -> {
            System.out.println("Теперь что-то делаем, но без данных");
        });

        future.join();
        thenRunFuture.join();
    }

    // ===================== exceptionally =====================

    /**
     * exceptionally: обработка ошибок.
     * Аналог catch для CompletableFuture.
     */
    public static void demonstrateExceptionally() {
        System.out.println("\n=== exceptionally (обработка ошибок) ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync((Supplier<String>) () -> {
            throw new RuntimeException("Ой, ошибка!");
        }).exceptionally(throwable -> {
            // Ловим ошибку и возвращаем значение по умолчанию
            System.out.println("Ловим: " + throwable.getMessage());
            return "Значение по умолчанию при ошибке";
        });

        System.out.println("Результат: " + future.join());
    }

    // ===================== thenCombine =====================

    /**
     * thenCombine: объединение двух CompletableFuture.
     * Ждём обе задачи и объединяем их результаты.
     */
    public static void demonstrateThenCombine() {
        System.out.println("\n=== thenCombine (объединение двух задач) ===");

        CompletableFuture<String> nameFuture = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Алексей";
        });

        CompletableFuture<Integer> ageFuture = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(300); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return 30;
        });

        CompletableFuture<String> combined = nameFuture.thenCombine(ageFuture, (name, age) -> {
            return name + ", " + age + " лет";
        });

        System.out.println("Результат: " + combined.join());
    }

    // ===================== thenAcceptBoth =====================

    /**
     * thenAcceptBoth: обработка двух результатов без возврата.
     */
    public static void demonstrateThenAcceptBoth() {
        System.out.println("\n=== thenAcceptBoth (обработка двух результатов) ===");

        CompletableFuture<String> cityFuture = CompletableFuture.supplyAsync(() -> "Москва");
        CompletableFuture<Integer> tempFuture = CompletableFuture.supplyAsync(() -> 25);

        cityFuture.thenAcceptBoth(tempFuture, (city, temp) -> {
            System.out.println("В " + city + " сейчас " + temp + "°C");
        });

        cityFuture.join();
        tempFuture.join();
    }

    // ===================== runAfterBoth =====================

    /**
     * runAfterBoth: действие ПОСЛЕ завершения двух задач.
     */
    public static void demonstrateRunAfterBoth() {
        System.out.println("\n=== runAfterBoth (действие после двух задач) ===");

        CompletableFuture<String> data1 = CompletableFuture.supplyAsync(() -> "данные A");
        CompletableFuture<String> data2 = CompletableFuture.supplyAsync(() -> "данные B");

        CompletableFuture<Void> done = data1.runAfterBoth(data2, () -> {
            System.out.println("Обе задачи завершены, выводим итог!");
        });

        done.join();
    }

    // ===================== applyToEither / acceptEither =====================

    /**
     * applyToEither: берём результат ПЕРВОЙ завершившейся задачи.
     * Полезно, когда есть резервный источник данных.
     */
    public static void demonstrateApplyToEither() {
        System.out.println("\n=== applyToEither (результат первой задачи) ===");

        // Медленная задача
        CompletableFuture<String> slow = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Медленный результат";
        });

        // Быстрая задача
        CompletableFuture<String> fast = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Быстрый результат";
        });

        // Берём ПЕРВЫЙ результат — whichever finishes first
        CompletableFuture<String> result = fast.applyToEither(slow, s -> "Победа: " + s);
        System.out.println("Результат: " + result.join());
        // "Победа: Быстрый результат"
    }

    // ===================== allOf =====================

    /**
     * allOf: ждём ВСЕ задачи одновременно.
     */
    public static void demonstrateAllOf() {
        System.out.println("\n=== allOf (ожидание всех задач) ===");

        CompletableFuture<String> task1 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(200); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Задача 1";
        });

        CompletableFuture<String> task2 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(300); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Задача 2";
        });

        CompletableFuture<String> task3 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Задача 3";
        });

        // allOf ждёт все три, но не возвращает их результаты
        CompletableFuture<Void> allDone = CompletableFuture.allOf(task1, task2, task3);

        allDone.join(); // дождались
        System.out.println(task1.join() + ", " + task2.join() + ", " + task3.join());
    }

    // ===================== anyOf =====================

    /**
     * anyOf: результат ПЕРВОЙ завершившейся из списка.
     */
    public static void demonstrateAnyOf() {
        System.out.println("\n=== anyOf (результат первой из списка) ===");

        CompletableFuture<String> slow = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Медленный";
        });

        CompletableFuture<String> fast = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Быстрый";
        });

        Object result = CompletableFuture.anyOf(slow, fast).join();
        System.out.println("Первым завершил: " + result);
    }

    // ===================== exception handling patterns =====================

    /**
     * Обработка ошибок с fallback — «если первая не работает, пробуем вторую».
     */
    public static void demonstrateFallback() {
        System.out.println("\n=== Fallback (резервный источник) ===");

        CompletableFuture<String> primary = CompletableFuture.supplyAsync((Supplier<String>) () -> {
            // Имитируем недоступность основного источника
            throw new RuntimeException("Основной источник недоступен!");
        }).orTimeout(1, java.util.concurrent.TimeUnit.SECONDS) // таймаут 1 секунда
          .exceptionally(ex -> "Данные из кэша");

        System.out.println("Результат: " + primary.join());
    }

    /**
     * Задержка с CompletableFuture (как Thread.sleep, но асинхронно).
     */
    public static void demonstrateDelay() {
        System.out.println("\n=== Задержка (delay) ===");

        long start = System.currentTimeMillis();

        CompletableFuture.delayedExecutor(2, java.util.concurrent.TimeUnit.MILLISECONDS)
                .execute(() -> {
                    System.out.println("Прошло ~2 мс: " + (System.currentTimeMillis() - start) + " мс");
                });

        System.out.println("Главный поток не заблокирован!");
    }

    // ===================== Real-world example: загрузка данных =====================

    /**
     * Реальный паттерн: загрузка пользователя и его заказов параллельно.
     */
    public static void demonstrateRealWorldExample() {
        System.out.println("\n=== Реальный пример: пользователь + заказы ===");

        long start = System.currentTimeMillis();

        CompletableFuture<String> user = CompletableFuture.supplyAsync(() -> {
            simulateNetworkCall(500);
            return "Пользователь: Алексей";
        });

        CompletableFuture<String> orders = CompletableFuture.supplyAsync(() -> {
            simulateNetworkCall(300);
            return "Заказов: 15";
        });

        CompletableFuture<String> combined = user.thenCombine(orders, (u, o) -> u + " | " + o);

        System.out.println("Итог: " + combined.join());
        System.out.println("Время: " + (System.currentTimeMillis() - start) + " мс (параллельно!)");
        // ~500 мс вместо ~800 мс последовательно
    }

    private static void simulateNetworkCall(int ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        System.out.println("=== CompletableFuture ===");
        demonstrateBasicCompletableFuture();
        demonstrateThenApply();
        demonstrateThenAccept();
        demonstrateThenRun();
        demonstrateExceptionally();
        demonstrateThenCombine();
        demonstrateThenAcceptBoth();
        demonstrateRunAfterBoth();
        demonstrateApplyToEither();
        demonstrateAllOf();
        demonstrateAnyOf();
        demonstrateFallback();
        demonstrateRealWorldExample();
    }
}
