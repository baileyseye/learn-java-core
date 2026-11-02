package org.baileyseyes._6.implements_callable;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import lombok.AllArgsConstructor;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._6.synchronized_method.SynchronizedMethods Следующая часть
 * @see org.baileyseyes._6.implements_runnable.ImplementsRunnable Предыдущая часть
 */
@AllArgsConstructor
@UselessButNeedToKnow
public class ImplementsCallable implements Callable<String> {

    private String taskName;
    private int delay;

    /**
     * Реализованный метод call() из интерфейса Callable.
     * Возвращает результат выполнения задачи.
     */
    @Override
    public String call() throws Exception {
        StringBuilder result = new StringBuilder();
        result.append(taskName).append(" - Executing:\n");

        for (int i = 1; i <= 3; i++) {
            result.append(taskName).append(" - Iteration ").append(i).append("\n");
            Thread.sleep(delay);
        }

        result.append(taskName).append(" - Completed");
        return result.toString();
    }

    /**
     * Демонстрация создания и запуска задачи через Callable.
     */
    public static void demonstrateCreationAndExecution() {
        // Создание задач
        ImplementsCallable task1 = new ImplementsCallable("Callable-1", 500);
        ImplementsCallable task2 = new ImplementsCallable("Callable-2", 300);

        // Создание ThreadPoolExecutor
        ExecutorService executor = Executors.newFixedThreadPool(2); //про ExecutorService/Executors отдельно почитать всё

        try {
            // Запуск задач и получение результатов
            Future<String> future1 = executor.submit(task1);
            Future<String> future2 = executor.submit(task2);

            // Получение результатов
            String result1 = future1.get(); // Блокирует до завершения задачи
            String result2 = future2.get(); // Блокирует до завершения задачи

            System.out.println(result1);
            System.out.println(result2);

        } catch (InterruptedException | ExecutionException e) {
            System.out.println("Task execution failed: " + e.getMessage());
        } finally {
            // Завершение работы пула потоков
            executor.shutdown();
        }

        System.out.println("All tasks completed");
    }

    public static void main(String[] args) {
        demonstrateCreationAndExecution();
    }
}