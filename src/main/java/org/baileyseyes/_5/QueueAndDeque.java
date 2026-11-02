package org.baileyseyes._5;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Queue;

/**
 * Queue и Deque — очереди.
 * — Queue (очередь): FIFO (первый вошёл — первый вышел). add(), offer(), poll(), peek().
 * — Deque (двойная очередь): можно добавлять/удалять с обоих концов. Stack-подобное поведение.
 * — PriorityQueue: элементы в порядке приоритета (не FIFO!).
 *
 * @see org.baileyseyes._5.map.CollectionMap Предыдущая часть
 * @see org.baileyseyes._6.__start_from_here__.HelloMultiThreading Следующая часть
 */
@SuppressWarnings("all")
public class QueueAndDeque {

    /**
     * Queue (FIFO): первый вошёл — первый вышел.
     * 4 операции для добавления: add(), offer()
     * 4 операции для удаления: remove(), poll()
     * 4 операции для просмотра: element(), peek()
     */
    public static void demonstrateQueue() {
        System.out.println("=== Queue (FIFO) ===");
        Queue<String> queue = new LinkedList<>();

        // Добавляем в очередь
        queue.add("Первый");
        queue.add("Второй");
        queue.add("Третий");
        queue.offer("Четвёртый");

        System.out.println("Очередь: " + queue);
        System.out.println("На голове (peek): " + queue.peek()); // не удаляем

        // Удаляем — всегда первого (FIFO)
        String first = queue.poll(); // возвращает null если пустая
        System.out.println("Убран: " + first);
        System.out.println("Теперь на голове: " + queue.peek());

        // remove() vs poll(): remove() выбрасывает исключение, если пустая
        String second = queue.poll();
        System.out.println("Убран: " + second);

        // Добавляем ещё
        queue.add("Пятый");
        System.out.println("Очередь после удалений: " + queue);
    }

    /**
     * add() vs offer():
     * add() — выбрасывает IllegalStateException, если очередь заполнена (ограниченная)
     * offer() — возвращает false, если очередь заполнена
     */
    public static void demonstrateAddVsOffer() {
        System.out.println("\n=== add() vs offer() ===");

        Queue<String> bounded = new java.util.LinkedList<>();
        // Добавляем в неограниченную очередь — add() и offer() одинаковы
        boolean added = bounded.add("X");
        System.out.println("add() вернул: " + added);

        boolean offered = bounded.offer("Y");
        System.out.println("offer() вернул: " + offered);
    }

    /**
     * Deque — двойная очередь:
     * Добавление/удаление с ВЕРХА (как стек): push(), pop()
     * Добавление/удаление СНИЗУ (как очередь): addLast(), removeFirst()
     */
    public static void demonstrateDeque() {
        System.out.println("\n=== Deque (двойная очередь) ===");
        Deque<String> deque = new ArrayDeque<>();

        // Добавляем наверх
        deque.push("Верхний 1");
        deque.push("Верхний 2");
        deque.push("Верхний 3");

        System.out.println("После push(): " + deque);

        // Удаляем с верха — LIFO (как стек)
        String top = deque.pop();
        System.out.println("Поп (LIFO): " + top);

        // Добавляем снизу
        deque.addLast("Нижний 1");
        System.out.println("После addLast: " + deque);

        // Удаляем снизу — FIFO (как очередь)
        String bottom = deque.removeFirst();
        System.out.println("Убран снизу (FIFO): " + bottom);

        System.out.println("Итог: " + deque);
    }

    /**
     * Deque как стек (LIFO): push/pop.
     * Класс Stack устарел — Deque предпочтительнее.
     */
    public static void demonstrateDequeAsStack() {
        System.out.println("\n=== Deque как стек (LIFO) ===");
        Deque<Integer> stack = new ArrayDeque<>();

        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.push(40);

        System.out.println("Стек: " + stack);

        while (!stack.isEmpty()) {
            System.out.println("Поп: " + stack.pop());
        }
        System.out.println("Стек пуст: " + stack.isEmpty());
    }

    /**
     * PriorityQueue — элементы идут по приоритету (не по порядку вставки).
     * При peek() или poll() всегда возвращается элемент с НАИВЫСШИМ приоритетом.
     * Для чисел: наименьшее число = наивысший приоритет.
     */
    public static void demonstratePriorityQueue() {
        System.out.println("\n=== PriorityQueue ===");
        Queue<Integer> pq = new PriorityQueue<>();

        pq.add(50);
        pq.add(10);
        pq.add(30);
        pq.add(5);
        pq.add(100);

        System.out.println("Приоритетная очередь: " + pq);
        // Внутренняя структура не отсортирована, но:

        // Poll всегда возвращает наименьший элемент
        while (!pq.isEmpty()) {
            int value = pq.poll();
            System.out.println("  Выдан (наименьший): " + value);
        }
    }

    /**
     * PriorityQueue с компаратором (обратный порядок):
     * Наивысший приоритет у НАИБОЛЬШЕГО числа.
     */
    public static void demonstratePriorityQueueReverse() {
        System.out.println("\n=== PriorityQueue (обратный порядок) ===");
        Queue<Integer> pq = new PriorityQueue<>(java.util.Comparator.reverseOrder());

        pq.add(50);
        pq.add(10);
        pq.add(30);
        pq.add(5);
        pq.add(100);

        System.out.println("Приоритетная очередь (по убыванию): " + pq);

        while (!pq.isEmpty()) {
            System.out.println("  Выдан (наибольший): " + pq.poll());
        }
    }

    /**
     * Практический пример: очередь задач для принтера.
     */
    public static void demonstratePrinterQueue() {
        System.out.println("\n=== Очередь задач принтера ===");
        Queue<String> printQueue = new LinkedList<>();

        printQueue.add("document.pdf");
        printQueue.add("photo.jpg");
        printQueue.add("report.docx");
        printQueue.offer("presentation.pptx");

        System.out.println("Очередь печати: " + printQueue);

        int docCount = 0;
        while (!printQueue.isEmpty()) {
            String document = printQueue.poll();
            System.out.println("Печатаю: " + document);
            docCount++;
        }
        System.out.println("Всего напечатано: " + docCount);
    }

    /**
     * PriorityQueue для объектов: сортировка по полю.
     */
    static class Task implements Comparable<Task> {
        private final String name;
        private final int priority;

        public Task(String name, int priority) {
            this.name = name;
            this.priority = priority;
        }

        @Override
        public int compareTo(Task other) {
            // Высокий приоритет = меньшее число → раньше обрабатывается
            return Integer.compare(this.priority, other.priority);
        }

        @Override
        public String toString() {
            return "Task{name='" + name + "', priority=" + priority + "}";
        }
    }

    public static void demonstrateObjectPriorityQueue() {
        System.out.println("\n=== PriorityQueue объектов ===");
        Queue<Task> taskQueue = new PriorityQueue<>();

        taskQueue.add(new Task("Починить сервер", 1));    // высокий приоритет
        taskQueue.add(new Task("Написать документацию", 5));
        taskQueue.add(new Task("Обновить библиотеки", 3));
        taskQueue.add(new Task("Код-ревью", 2));

        System.out.println("Очередь задач (по приоритету):");
        while (!taskQueue.isEmpty()) {
            Task task = taskQueue.poll();
            System.out.println("  Делаем: " + task);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Очереди: Queue, Deque, PriorityQueue ===");
        demonstrateQueue();
        demonstrateAddVsOffer();
        demonstrateDeque();
        demonstrateDequeAsStack();
        demonstratePriorityQueue();
        demonstratePriorityQueueReverse();
        demonstratePrinterQueue();
        demonstrateObjectPriorityQueue();
    }
}
