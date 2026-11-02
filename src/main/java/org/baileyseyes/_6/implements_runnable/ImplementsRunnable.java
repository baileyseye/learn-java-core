package org.baileyseyes._6.implements_runnable;

import lombok.AllArgsConstructor;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._6.implements_callable.ImplementsCallable Следующая часть
 * @see org.baileyseyes._6.extends_thread.ExtendsThread Предыдущая часть
 */
@AllArgsConstructor
@SuppressWarnings("all")
@UselessButNeedToKnow
public class ImplementsRunnable implements Runnable {

    private String threadName;
    private int delay;

    /**
     * Реализованный метод run() из интерфейса Runnable.
     */
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + " - Iteration " + i);
            try {
                Thread.sleep(delay);
            } catch (InterruptedException e) {
                System.out.println(threadName + " was interrupted");
                return;
            }
        }
        System.out.println(threadName + " finished execution");
    }

    /**
     * Демонстрация создания и запуска потока через Runnable.
     */
    public static void demonstrateCreationAndExecution() {
        // Создание задач
        ImplementsRunnable task1 = new ImplementsRunnable("Runnable-1", 500);
        ImplementsRunnable task2 = new ImplementsRunnable("Runnable-2", 300);

        // Создание и запуск потоков
        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(task2);

        thread1.start();
        thread2.start();

        // Ожидание завершения потоков
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }

        System.out.println("All threads completed");
    }

    public static void main(String[] args) {
        demonstrateCreationAndExecution();
    }
}