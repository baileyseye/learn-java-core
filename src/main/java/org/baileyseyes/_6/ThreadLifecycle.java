package org.baileyseyes._6;

/**
 * Жизненный цикл потока: sleep, interrupt и join.
 * <p>
 * Поток начинает жизнь в состоянии NEW, после start() становится RUNNABLE,
 * во время sleep() — TIMED_WAITING, после завершения — TERMINATED.
 * </p>
 *
 * @see __start_from_here__.HelloMultiThreading Предыдущая часть
 * @see extends_thread.ExtendsThread Следующая часть
 */
@SuppressWarnings("all")
public class ThreadLifecycle {

    /**
     * join заставляет main дождаться завершения worker.
     */
    public static void demonstrateSleepAndJoin() throws InterruptedException {
        Thread worker = new Thread(() -> {
            System.out.println("worker: старт");
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("worker: конец");
        });

        worker.start();
        worker.join();

        System.out.println("main: worker завершён");
    }

    /**
     * interrupt не убивает поток, а сообщает ему просьбу остановиться.
     * Спящий поток получает InterruptedException.
     */
    public static void demonstrateInterrupt() throws InterruptedException {
        Thread worker = new Thread(() -> {
            System.out.println("worker: жду");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("worker: прерван");
            }
        });

        worker.start();
        Thread.sleep(100);

        System.out.println("main: отправляю interrupt");
        worker.interrupt();
        worker.join();

        System.out.println("main: завершено");
    }

    /**
     * Состояние потока можно посмотреть через getState().
     */
    public static void demonstrateStates() throws InterruptedException {
        Thread worker = new Thread(() -> {
            // поток ничего не делает — нам важны только состояния
        });

        System.out.println("До старта: " + worker.getState());
        worker.start();
        worker.join();
        System.out.println("После завершения: " + worker.getState());
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== sleep и join ===");
        demonstrateSleepAndJoin();

        System.out.println("\n=== interrupt ===");
        demonstrateInterrupt();

        System.out.println("\n=== состояния потока ===");
        demonstrateStates();
    }
}
