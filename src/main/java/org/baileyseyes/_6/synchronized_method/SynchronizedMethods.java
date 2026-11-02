package org.baileyseyes._6.synchronized_method;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._7.Else Следующая часть
 * @see org.baileyseyes._6.implements_callable.ImplementsCallable Предыдущая часть
 */
@UselessButNeedToKnow
public class SynchronizedMethods {

    private int counter = 0;
    private static int staticCounter = 0;

    /**
     * Синхронизированный метод экземпляра.
     * Блокирует объект (this) на время выполнения метода.
     */
    public synchronized void incrementCounter() {
        counter++;
        System.out.println("Instance counter: " + counter);
    }

    /**
     * Синхронизированный статический метод.
     * Блокирует класс (SynchronizedMethods.class) на время выполнения метода.
     */
    public static synchronized void incrementStaticCounter() {
        staticCounter++;
        System.out.println("Static counter: " + staticCounter);
    }

    /**
     * Синхронизированный блок с конкретным объектом.
     */
    public void synchronizedBlockExample() {
        synchronized (this) {
            counter += 10;
            System.out.println("Counter with synchronized block: " + counter);
        }
    }

    /**
     * Синхронизированный блок с классом.
     */
    public static void synchronizedClassBlock() {
        synchronized (SynchronizedMethods.class) {
            staticCounter += 10;
            System.out.println("Static counter with class block: " + staticCounter);
        }
    }

    /**
     * Демонстрация синхронизации в многопоточной среде.
     */
    public static void demonstrateSynchronization() {
        SynchronizedMethods instance = new SynchronizedMethods();

        // Создание нескольких потоков для демонстрации синхронизации
        Thread[] threads = new Thread[5];

        for (int i = 0; i < 5; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 3; j++) {
                    instance.incrementCounter();
                    incrementStaticCounter();
                }
            });
        }

        // Запуск всех потоков
        for (Thread thread : threads) {
            thread.start();
        }

        // Ожидание завершения всех потоков
        try {
            for (Thread thread : threads) {
                thread.join();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("Final counters - Instance: " + instance.counter + ", Static: " + staticCounter);
    }

    /**
     * Вложенный класс с демонстрацией volatile.
     */
    public static class Volatile {

        // volatile переменная гарантирует видимость изменений в других потоках
        private volatile boolean flag = false;
        private volatile int counter = 0;

        /**
         * Метод, изменяющий volatile переменные.
         */
        public void updateValues() {
            counter = 100;
            flag = true;
            System.out.println("Updated volatile variables: counter=" + counter + ", flag=" + flag);
        }

        /**
         * Метод, читающий volatile переменные.
         */
        public void readValues() {
            System.out.println("Reading volatile variables: counter=" + counter + ", flag=" + flag);
        }

        /**
         * Демонстрация использования volatile в многопоточной среде.
         */
        @SuppressWarnings("all")
        public static void demonstrateVolatile() {
            Volatile demo = new Volatile();

            // Поток, который изменяет volatile переменные
            Thread writerThread = new Thread(() -> {
                try {
                    Thread.sleep(100);
                    demo.updateValues();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });

            // Поток, который читает volatile переменные
            Thread readerThread = new Thread(() -> {
                // Ожидание, пока writerThread не изменит значения
                while (!demo.flag) {
                    // Busy wait - ждем, пока флаг станет true
                }
                demo.readValues();
            });

            readerThread.start();
            writerThread.start();

            try {
                writerThread.join();
                readerThread.join();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

            System.out.println("Volatile demonstration completed");
        }
    }

    /**
     * Демонстрация использования volatile с потоками.
     */
    public static void demonstrateVolatileWithThreads() {
        Volatile.demonstrateVolatile();
    }

    public static void main(String[] args) {
        System.out.println("=== Synchronization Demonstration ===");
        demonstrateSynchronization();

        System.out.println("\n=== Volatile Demonstration ===");
        demonstrateVolatileWithThreads();
    }
}