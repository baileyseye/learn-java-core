package org.baileyseyes._5.list;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._5.set.CollectionSet Следующая часть
 * @see org.baileyseyes._5.__start_from_here__.HelloCollections Предыдущая часть
 */
@SuppressWarnings("all")
public class CollectionList {

    /**
     * Демонстрация основных характеристик ArrayList.
     * <p>
     * {@code ArrayList} - это реализация интерфейса {@code List}, которая использует массив для хранения элементов.
     * Она предоставляет динамический массив, который может увеличиваться и уменьшаться по мере необходимости.
     * </p>
     * <p>
     * Основные особенности:
     * <ul>
     *     <li>Доступ к элементам по индексу за O(1).</li>
     *     <li>Вставка/удаление элементов в середину за O(n).</li>
     *     <li>Изменяемый размер.</li>
     *     <li>Не синхронизирован (не потокобезопасен).</li>
     *     <li>Позволяет хранить дубликаты и null.</li>
     * </ul>
     * </p>
     */
    public static void demonstrateBasics() {
        // Создание ArrayList
        List<Integer> list = new ArrayList<>(); // По умолчанию размер 10

        // Добавление элементов
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(0, 10); // Вставка в начало

        System.out.println("Initial list: " + list);
        System.out.println("Size: " + list.size());

        // Доступ к элементам по индексу
        System.out.println("Element at index 1: " + list.get(1));
        System.out.println("Element at index 0: " + list.get(0));


        // Изменение элемента
        list.set(1, 20);
        System.out.println("After setting index 1 to 20: " + list);

        // Удаление элемента
        list.remove(0); // Удаление по индексу
        System.out.println("After removing index 0: " + list);

        list.remove(Integer.valueOf(20)); // Удаление по значению
        System.out.println("After removing value 20: " + list);
    }

    /**
     * Демонстрация методов класса {@code ArrayList}.
     */
    public static void demonstrateMethods() {
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");

        // Проверка наличия элемента
        System.out.println("Contains 'Banana': " + list.contains("Banana"));

        // Проверка на пустоту
        System.out.println("Is empty: " + list.isEmpty());
    }

    /**
     * Демонстрация работы с итератором.
     */
    @UselessButNeedToKnow
    public static void demonstrateIterator() {
        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        // Использование Iterator
        Iterator<Integer> iterator = list.iterator();
        System.out.print("Iterator traversal: ");
        while (iterator.hasNext()) {
            Integer element = iterator.next();
            System.out.print(element + " ");
            if (element == 3) {
                iterator.remove(); // Безопасное удаление во время итерации
            }
        }
        System.out.println("\nAfter removing 3: " + list);

        // Использование foreach (более предпочтительный способ)
        list.clear();
        list.addAll(Arrays.asList(10, 20, 30, 40, 50));
        System.out.print("Enhanced for loop: ");
        for (Integer element : list) {
            System.out.print(element + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация различных способов итерации по ArrayList.
     */
    @UselessButNeedToKnow
    public static void demonstrateIteration() {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));

        // Стандартный for-loop
        System.out.print("Standard for loop: ");
        for (int i = 0; i < list.size(); i++) {
            System.out.print(list.get(i) + " ");
        }
        System.out.println();

        // Enhanced for loop (for-each)
        System.out.print("Enhanced for loop: ");
        for (String element : list) {
            System.out.print(element + " ");
        }
        System.out.println();

        // Использование Iterator
        System.out.print("Iterator: ");
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            System.out.print(iterator.next() + " ");
        }
        System.out.println();

        // Использование ListIterator (двусторонняя итерация)
        System.out.print("ListIterator: ");
        ListIterator<String> listIterator = list.listIterator();
        while (listIterator.hasNext()) {
            System.out.print(listIterator.next() + " ");
        }
        System.out.println();

        // Использование Stream API (Java 8+)
        System.out.print("Stream API: ");
        list.stream().forEach(element -> System.out.print(element + " "));
        System.out.println();
    }

    /**
     * Демонстрация сортировки ArrayList.
     */
    @UselessButNeedToKnow
    public static void demonstrateSorting() {
        List<Integer> list = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));

        System.out.println("Original list: " + list);

        // Сортировка по возрастанию
        Collections.sort(list);
        System.out.println("Sorted ascending: " + list);

        // Сортировка по убыванию
        Collections.sort(list, Collections.reverseOrder());
        System.out.println("Sorted descending: " + list);

        // Сортировка с использованием Comparator
        List<String> stringList = new ArrayList<>(Arrays.asList("banana", "apple", "cherry"));
        Collections.sort(stringList, String.CASE_INSENSITIVE_ORDER);
        System.out.println("Sorted case-insensitive: " + stringList);
    }

    /**
     * Демонстрация работы с коллекциями и null значениями.
     */
    @UselessButNeedToKnow
    public static void demonstrateNullHandling() {
        List<String> list = new ArrayList<>();
        list.add("First");
        list.add(null); // Допустимо
        list.add("Third");

        System.out.println("List with null: " + list);
        System.out.println("Element at index 1 (should be null): " + list.get(1));

        // Проверка на null
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) == null) {
                System.out.println("Found null at index " + i);
            }
        }

        // Удаление null
        list.remove(null);
        System.out.println("After removing null: " + list);
    }

    /**
     * Демонстрация производительности ArrayList.
     */
    @UselessButNeedToKnow
    public static void demonstratePerformance() {
        int size = 1000000;

        // ArrayList
        List<Integer> arrayList = new ArrayList<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < size; i++) {
            arrayList.add(i);
        }
        long endTime = System.nanoTime();
        System.out.println("ArrayList add time for " + size + " elements: " + (endTime - startTime) / 1000000.0 + " ms");

        // Доступ по индексу
        startTime = System.nanoTime();
        for (int i = 0; i < size; i += 10000) {
            int value = arrayList.get(i);
        }
        endTime = System.nanoTime();
        System.out.println("ArrayList get time for " + (size / 10000) + " accesses: " + (endTime - startTime) / 1000000.0 + " ms");

        // Вставка в середину
        startTime = System.nanoTime();
        arrayList.add(size / 2, -1);
        endTime = System.nanoTime();
        System.out.println("ArrayList insert in middle time: " + (endTime - startTime) / 1000.0 + " ns");
    }

    public static void primitiveTricks() {
        // Инициализация с помощью Arrays.asList()
        List<Integer> fixedList = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("Fixed list: " + fixedList);

        // Попытка изменить фиксированный список приведет к ошибке
        try {
            fixedList.add(6); // UnsupportedOperationException
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify fixed list: " + e.getMessage());
        }

        // Использование методов класса Collections
        List<Integer> mutableList = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        Collections.shuffle(mutableList);
        System.out.println("Shuffled list: " + mutableList);

        // Использование Arrays.copyOf() для создания копии
        int[] originalArray = {1, 2, 3, 4, 5};
        int[] copiedArray = Arrays.copyOf(originalArray, originalArray.length);
        System.out.println("Copied array: " + Arrays.toString(copiedArray));

        // Создание списка из массива
        String[] stringArray = {"A", "B", "C"};
        List<String> listFromArray = Arrays.asList(stringArray);
        System.out.println("List from array: " + listFromArray);

        // Использование Stream API для фильтрации
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        List<Integer> evenNumbers = numbers.stream()
            .filter(n -> n % 2 == 0)
            .toList();
        System.out.println("Even numbers: " + evenNumbers);

        // Использование removeAll для удаления нескольких элементов
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry", "Date"));
        fruits.removeAll(Arrays.asList("Banana", "Date"));
        System.out.println("After removing some fruits: " + fruits);
    }

    /**
     * Демонстрация почему LinkedList считается самой худшей коллекцией.
     * <p>
     * {@code LinkedList} реализует интерфейс {@code List} и {@code Deque} с использованием двусвязного списка.
     * Несмотря на то, что вставка/удаление в начале/конце списка быстрые (O(1)), доступ к элементам по индексу медленный (O(n)).
     * </p>
     * <p>
     * Основные проблемы LinkedList:
     * <ul>
     *     <li>Доступ к элементам по индексу требует обхода списка от начала или конца (O(n)).</li>
     *     <li>Больше потребление памяти из-за хранения ссылок на предыдущие и следующие элементы.</li>
     *     <li>Худшие производительность при итерации по большому количеству элементов из-за неэффективного использования кэша.</li>
     *     <li>Нет преимуществ перед ArrayList при большинстве операций, кроме специфических случаев вставки/удаления в начале/конце.</li>
     * </ul>
     * </p>
     * <p>
     * В большинстве случаев лучше использовать {@code ArrayList} или {@code Vector} (устарел).
     * </p>
     */
    @UselessButNeedToKnow
    public static void demonstrateWhyLinkedListIsBad() {
        System.out.println("=== Why LinkedList is considered the worst collection ===");

        // 1. Доступ по индексу медленный
        List<Integer> linkedList = new LinkedList<>();
        List<Integer> arrayList = new ArrayList<>();

        int size = 100000;
        for (int i = 0; i < size; i++) {
            linkedList.add(i);
            arrayList.add(i);
        }

        // Измерение времени доступа по индексу
        long startTime = System.nanoTime();
        for (int i = 0; i < size; i += 1000) {
            int value = linkedList.get(i); // O(n) для LinkedList
        }
        long linkedListGetTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < size; i += 1000) {
            int value = arrayList.get(i); // O(1) для ArrayList
        }
        long arrayListGetTime = System.nanoTime() - startTime;

        System.out.println("LinkedList get time for " + (size / 1000) + " accesses: " + linkedListGetTime / 1000.0 + " ns");
        System.out.println("ArrayList get time for " + (size / 1000) + " accesses: " + arrayListGetTime / 1000.0 + " ns");
        System.out.println("ArrayList is " + (linkedListGetTime / (double) arrayListGetTime) + " times faster for get operations");

        // 2. Потребление памяти
        // LinkedList требует больше памяти на хранение ссылок

        // 3. Итерация
        // LinkedList менее эффективна из-за плохой локальности данных

        // 4. Специфические случаи, где LinkedList может быть лучше
        System.out.println("\n--- Cases where LinkedList might be better ---");
        System.out.println("1. Frequent insertion/deletion at beginning/end");
        System.out.println("2. Implementation of Deque interface (ArrayDeque often preferred)");
        System.out.println("3. Complex list manipulation algorithms");

        // Пример: вставка в начало
        LinkedList<Integer> ll = new LinkedList<>();
        ArrayList<Integer> al = new ArrayList<>();

        startTime = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            ll.addFirst(i); // O(1)
        }
        long llAddFirstTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            al.add(0, i); // O(n)
        }
        long alAddFirstTime = System.nanoTime() - startTime;

        System.out.println("\nLinkedList addFirst time: " + llAddFirstTime / 1000.0 + " ns");
        System.out.println("ArrayList addFirst time: " + alAddFirstTime / 1000.0 + " ns");
        System.out.println("LinkedList is faster for addFirst operations");

        System.out.println("\n--- Conclusion ---");
        System.out.println("While LinkedList has advantages in specific cases (insertion/deletion at ends),");
        System.out.println("it generally performs worse than ArrayList for most common operations.");
        System.out.println("ArrayList is recommended for general use unless specific characteristics of LinkedList are needed.");
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\n=== Methods ===");
        demonstrateMethods();

        System.out.println("\n=== Iterator ===");
        demonstrateIterator();

        System.out.println("\n=== Iteration ===");
        demonstrateIteration();

        System.out.println("\n=== Sorting ===");
        demonstrateSorting();

        System.out.println("\n=== Null Handling ===");
        demonstrateNullHandling();

        System.out.println("\n=== Performance ===");
        demonstratePerformance();

        System.out.println("\n=== Tricks ===");
        primitiveTricks();

        System.out.println("\n=== Why LinkedList is Bad ===");
        demonstrateWhyLinkedListIsBad();
    }
}