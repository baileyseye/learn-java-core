package org.baileyseyes._6;

import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * ReentrantLock + Condition — альтернатива synchronized.
 * — ReentrantLock — явный замок с методами lock()/unlock()
 * — Condition — альтернатива wait()/notify() — несколько условий!
 * — tryLock() — попытка получить замок с таймаутом
 * — isLocked(), getHoldCount() — инспекция
 *
 * @see org.baileyseyes._6.CompletableFutureDemo Предыдущая часть
 */
public class ReentrantLockDemo {

    // ===================== Базовый ReentrantLock =====================

    /**
     * ReentrantLock — явный замок.
     * В отличие от synchronized, замок можно получить и отпустить в разных местах.
     */
    public static void demonstrateBasicLock() {
        System.out.println("=== Базовый ReentrantLock ===");

        ReentrantLock lock = new ReentrantLock();
        AtomicInteger counter = new AtomicInteger(0);

        // Потоки, инкрементирующие счётчик
        Thread t1 = new Thread(() -> {
            lock.lock();
            try {
                for (int i = 0; i < 5; i++) {
                    System.out.println("Т-1: " + counter.incrementAndGet());
                }
            } finally {
                lock.unlock(); // ← всегда в finally!
            }
        });

        Thread t2 = new Thread(() -> {
            lock.lock();
            try {
                for (int i = 0; i < 5; i++) {
                    System.out.println("Т-2: " + counter.incrementAndGet());
                }
            } finally {
                lock.unlock();
            }
        });

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("Итог: " + counter.get()); // всегда 10!
    }

    // ===================== Reentrant = повторное захватывание =====================

    /**
     * Reentrant — «повторно входимый».
     * Один и тот же поток может захватить замок многократно без блокировки.
     */
    public static void demonstrateReentrant() {
        System.out.println("\n=== Reentrant (повторный вход) ===");

        ReentrantLock lock = new ReentrantLock();

        Thread t = new Thread(() -> {
            lock.lock();
            System.out.println("Поток захватил замок (1x)");
            System.out.println("  getHoldCount: " + lock.getHoldCount());

            lock.lock();
            System.out.println("Поток захватил замок (2x)");
            System.out.println("  getHoldCount: " + lock.getHoldCount());

            lock.unlock();
            System.out.println("Поток отпустил замок (1x осталось)");
            System.out.println("  getHoldCount: " + lock.getHoldCount());

            lock.unlock();
            System.out.println("Поток отпустил замок (0x осталось)");
            System.out.println("  getHoldCount: " + lock.getHoldCount());
        });

        t.start();
        try { t.join(); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
    }

    // ===================== tryLock() с таймаутом =====================

    /**
     * tryLock() — НЕ БЛОКИРУЕТ навсегда!
     * — tryLock() — попытаться получить сейчас, вернуть true/false
     * — tryLock(timeout, unit) — ждать не дольше timeout
     */
    public static void demonstrateTryLock() {
        System.out.println("\n=== tryLock() ===");

        ReentrantLock lock = new ReentrantLock();

        // Поток 1: захватит замок и держит
        Thread t1 = new Thread(() -> {
            lock.lock();
            System.out.println("Т-1: замок захвачен, работаю...");
            try { Thread.sleep(3000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            lock.unlock();
            System.out.println("Т-1: замок отпущен");
        });

        // Поток 2: попробует получить замок с таймаутом
        Thread t2 = new Thread(() -> {
            System.out.println("Т-2: пытаюсь получить замок...");
            try {
                boolean acquired = lock.tryLock(2, java.util.concurrent.TimeUnit.SECONDS);
                if (acquired) {
                    System.out.println("Т-2: замок получен!");
                    lock.unlock();
                } else {
                    System.out.println("Т-2: замок не получен за 2 секунды — ушёл");
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Т-2: прерван");
            }
        });

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    /**
     * tryLock() без таймаута — сразу возвращает true/false.
     */
    public static void demonstrateTryLockNoWait() {
        System.out.println("\n=== tryLock() без ожидания ===");

        ReentrantLock lock = new ReentrantLock();
        lock.lock(); // захватим замок

        Thread t = new Thread(() -> {
            boolean got = lock.tryLock();
            System.out.println("Получил замок сразу? " + got); // false!
        });

        t.start();
        try { t.join(); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        lock.unlock();
    }

    // ===================== FairLock =====================

    /**
     * ReentrantLock с fair=true — справедливый замок.
     * Потоки получают замок в порядке FIFO, не нарушая очереди.
     */
    public static void demonstrateFairLock() {
        System.out.println("\n=== FairLock ===");

        ReentrantLock fairLock = new ReentrantLock(true); // fair = true
        AtomicInteger counter = new AtomicInteger(0);

        for (int i = 1; i <= 3; i++) {
            final int id = i;
            Thread t = new Thread(() -> {
                for (int j = 0; j < 3; j++) {
                    fairLock.lock();
                    try {
                        System.out.println("Поток " + id + ": " + counter.incrementAndGet());
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    } finally {
                        fairLock.unlock();
                    }
                }
            });
            t.start();
        }
    }

    // ===================== Condition — условия =====================

    /**
     * Condition — альтернатива wait()/notify().
     * Можно создать ДРУГИЕ условия (не только one wait-set).
     */
    public static void demonstrateCondition() {
        System.out.println("\n=== Condition (условия) ===");

        ReentrantLock lock = new ReentrantLock();
        Condition notEmpty = lock.newCondition();
        Condition notFull = lock.newCondition();

        java.util.List<Integer> buffer = new java.util.ArrayList<>();
        final int MAX = 3;

        // Производитель
        Thread producer = new Thread(() -> {
            for (int i = 1; i <= 6; i++) {
                lock.lock();
                try {
                    while (buffer.size() >= MAX) {
                        System.out.println("Буфер полон, производитель ждёт...");
                        notFull.await(); // ждём пока освободится место
                    }
                    buffer.add(i);
                    System.out.println("Произв: " + i + " (в буфере: " + buffer.size() + ")");
                    notEmpty.signal(); // говорим потребителю: есть данные!
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    lock.unlock();
                }
            }
        });

        // Потребитель
        Thread consumer = new Thread(() -> {
            for (int i = 1; i <= 6; i++) {
                lock.lock();
                try {
                    while (buffer.isEmpty()) {
                        System.out.println("Буфер пуст, потребитель ждёт...");
                        notEmpty.await(); // ждём пока появятся данные
                    }
                    int item = buffer.remove(0);
                    System.out.println("Потр: " + item + " (в буфере: " + buffer.size() + ")");
                    notFull.signal(); // говорим производителю: освободилось место!
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    lock.unlock();
                }
            }
        });

        producer.start();
        consumer.start();

        try {
            producer.join();
            consumer.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // ===================== isLocked() и getHoldCount() =====================

    /**
     * Инспекция замка: isLocked(), isHeldByCurrentThread(), getHoldCount().
     */
    public static void demonstrateLockInspection() {
        System.out.println("\n=== Инспекция замка ===");

        ReentrantLock lock = new ReentrantLock();

        System.out.println("isLocked: " + lock.isLocked()); // false
        System.out.println("isHeldByCurrentThread: " + lock.isHeldByCurrentThread()); // false

        lock.lock();
        System.out.println("После lock():");
        System.out.println("  isLocked: " + lock.isLocked()); // true
        System.out.println("  isHeldByCurrentThread: " + lock.isHeldByCurrentThread()); // true
        System.out.println("  getHoldCount: " + lock.getHoldCount()); // 1

        lock.lock();
        System.out.println("После второго lock():");
        System.out.println("  getHoldCount: " + lock.getHoldCount()); // 2

        lock.unlock();
        System.out.println("После unlock():");
        System.out.println("  getHoldCount: " + lock.getHoldCount()); // 1
        System.out.println("  isHeldByCurrentThread: " + lock.isHeldByCurrentThread()); // true

        lock.unlock();
        System.out.println("После второго unlock():");
        System.out.println("  isHeldByCurrentThread: " + lock.isHeldByCurrentThread()); // false
        System.out.println("  isLocked: " + lock.isLocked()); // false
    }

    // ===================== lockInterruptibly() =====================

    /**
     * lockInterruptibly() — замок можно прервать.
     * Если поток заблокирован на lockInterruptibly(), вызов interrupt() вернёт InterruptedIOException.
     */
    public static void demonstrateLockInterruptibly() {
        System.out.println("\n=== lockInterruptibly() ===");

        ReentrantLock lock = new ReentrantLock();

        // Поток 1: захватит замок
        Thread t1 = new Thread(() -> {
            lock.lock();
            System.out.println("Т-1: замок захвачен, работаю долго...");
            try { Thread.sleep(5000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            lock.unlock();
            System.out.println("Т-1: замок отпущен");
        });

        // Поток 2: попытается получить замок с прерыванием
        Thread t2 = new Thread(() -> {
            System.out.println("Т-2: пытаюсь lockInterruptibly()...");
            try {
                lock.lockInterruptibly();
                System.out.println("Т-2: замок получен!");
                lock.unlock();
            } catch (InterruptedException e) {
                System.out.println("Т-2: прерван (Interrupted!)");
            }
        });

        t1.start();
        t2.start();

        // Ждём чуть-чуть и прерываем Т-2
        try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        System.out.println("Главный поток: прерываю Т-2...");
        t2.interrupt();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        System.out.println("=== ReentrantLock и Condition ===");
        demonstrateBasicLock();
        demonstrateReentrant();
        demonstrateTryLock();
        demonstrateTryLockNoWait();
        demonstrateFairLock();
        demonstrateCondition();
        demonstrateLockInspection();
        demonstrateLockInterruptibly();
    }
}
