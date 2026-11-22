package org.baileyseyes._5;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.PriorityQueue;
import java.util.Queue;

/**
 * Очереди: Queue, Deque и PriorityQueue.
 * <p>
 * Queue работает по принципу FIFO: первый пришёл — первый ушёл.
 * Deque позволяет добавлять и забирать элементы с обоих концов.
 * PriorityQueue выдаёт элементы по приоритету, а не по порядку добавления.
 * </p>
 *
 * @see map.CollectionMap Предыдущая часть
 * @see SortingCollections Следующая часть
 */
@SuppressWarnings("all")
public class QueueBasics {

    /**
     * Обычная очередь: offer добавляет, peek смотрит, poll забирает.
     */
    public static void demonstrateQueue() {
        Queue<String> queue = new ArrayDeque<>();
        queue.offer("Анна");
        queue.offer("Борис");
        queue.offer("Вера");

        System.out.println("Очередь: " + queue);
        System.out.println("Первый: " + queue.peek());
        System.out.println("Обслужен: " + queue.poll());
        System.out.println("Следующий: " + queue.peek());
    }

    /**
     * Deque как стек: push кладёт наверх, pop забирает сверху.
     */
    public static void demonstrateDequeAsStack() {
        Deque<String> stack = new ArrayDeque<>();
        stack.push("Первый");
        stack.push("Второй");
        stack.push("Третий");

        System.out.println("Стек: " + stack);
        System.out.println("Взят: " + stack.pop());
        System.out.println("Осталось: " + stack);
    }

    /**
     * PriorityQueue всегда отдаёт минимальный (или максимальный) элемент.
     */
    public static void demonstratePriorityQueue() {
        Queue<Integer> numbers = new PriorityQueue<>();
        numbers.add(5);
        numbers.add(1);
        numbers.add(10);
        numbers.add(3);

        StringBuilder order = new StringBuilder();
        while (!numbers.isEmpty()) {
            if (order.length() > 0) {
                order.append(" ");
            }
            order.append(numbers.poll());
        }

        System.out.println("Порядок: " + order);
    }

    public static void main(String[] args) {
        System.out.println("=== Queue (FIFO) ===");
        demonstrateQueue();

        System.out.println("\n=== Deque как стек ===");
        demonstrateDequeAsStack();

        System.out.println("\n=== PriorityQueue ===");
        demonstratePriorityQueue();
    }
}
