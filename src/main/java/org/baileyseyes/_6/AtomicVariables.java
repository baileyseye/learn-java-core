package org.baileyseyes._6;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * AtomicInteger и атомарные операции.
 * <p>
 * {@code count++} состоит из чтения, сложения и записи. Два потока могут
 * прочитать одно и то же значение и потерять один инкремент. AtomicInteger
 * выполняет такие операции атомарно без ручного synchronized.
 * </p>
 *
 * @see implements_callable.ImplementsCallable Предыдущая часть
 * @see synchronized_method.SynchronizedMethods Следующая часть
 */
@SuppressWarnings("all")
public class AtomicVariables {

    /**
     * Четыре потока по 1000 инкрементов — итог всегда 4000.
     */
    public static void demonstrateAtomicCounter() throws InterruptedException {
        AtomicInteger counter = new AtomicInteger();
        Thread[] threads = new Thread[4];

        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    counter.incrementAndGet();
                }
            });
            threads[i].start();
        }

        for (Thread thread : threads) {
            thread.join();
        }

        System.out.println("Итог: " + counter.get());
    }

    /**
     * Основные операции AtomicInteger.
     */
    public static void demonstrateOperations() {
        AtomicInteger value = new AtomicInteger();

        System.out.println("Начало: " + value.get());
        System.out.println("После incrementAndGet: " + value.incrementAndGet());
        System.out.println("После addAndGet(5): " + value.addAndGet(5));
        System.out.println("compareAndSet(6, 10): " + value.compareAndSet(6, 10));
        System.out.println("Текущее значение: " + value.get());
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== AtomicInteger ===");
        demonstrateAtomicCounter();

        System.out.println("\n=== Операции ===");
        demonstrateOperations();
    }
}
