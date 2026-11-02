package org.baileyseyes._6.extends_thread;

import lombok.AllArgsConstructor;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует работу с многопоточностью через расширение класса Thread.
 *
 * @see org.baileyseyes._6.implements_runnable.ImplementsRunnable Следующая часть
 * @see org.baileyseyes._6.__start_from_here__.HelloMultiThreading Предыдущая часть
 */
@AllArgsConstructor
@UselessButNeedToKnow
public class ExtendsThread extends Thread { // - !!! НИКОГДА НЕ ДЕЛАЙТЕ ТАК !!! - \\

    private String threadName;
    private int delay;

    /**
     * Переопределенный метод run(), который выполняется в отдельном потоке.
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
     * Демонстрация создания и запуска потока.
     */
    @UselessButNeedToKnow
    public static void demonstrateCreationAndExecution() {
        // Создание потоков
        ExtendsThread thread1 = new ExtendsThread("Thread-1", 500);
        ExtendsThread thread2 = new ExtendsThread("Thread-2", 300);

        // Запуск потоков
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