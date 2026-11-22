package org.baileyseyes._6;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

/**
 * Пул потоков через ExecutorService.
 * <p>
 * Вместо создания нового Thread на каждую задачу пул переиспользует
 * ограниченное число потоков. execute запускает Runnable, submit возвращает
 * Future с результатом.
 * </p>
 *
 * @see extends_thread.ExtendsThread Предыдущая часть
 * @see implements_callable.ImplementsCallable Следующая часть
 */
@SuppressWarnings("all")
public class ExecutorServiceDemo {

    /**
     * execute — самый простой запуск задачи без результата.
     */
    public static void demonstrateExecute() throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.execute(() -> System.out.println("Задача выполняется в пуле"));

        executor.shutdown();
        executor.awaitTermination(2, TimeUnit.SECONDS);
    }

    /**
     * submit возвращает Future — обещание результата.
     */
    public static void demonstrateSubmit() throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        Future<Integer> future = executor.submit(() -> 21 * 2);
        System.out.println("Результат: " + future.get());

        executor.shutdown();
    }

    /**
     * invokeAll запускает несколько задач и возвращает список Future.
     */
    public static void demonstrateInvokeAll() throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        List<Callable<Integer>> tasks = List.of(
                () -> 1,
                () -> 2,
                () -> 3
        );

        List<Future<Integer>> futures = executor.invokeAll(tasks);
        int sum = 0;
        for (Future<Integer> future : futures) {
            sum += future.get();
        }

        System.out.println("Сумма: " + sum);
        executor.shutdown();
    }

    public static void main(String[] args) throws Exception {
        System.out.println("=== execute ===");
        demonstrateExecute();

        System.out.println("\n=== submit и Future ===");
        demonstrateSubmit();

        System.out.println("\n=== invokeAll ===");
        demonstrateInvokeAll();
    }
}
