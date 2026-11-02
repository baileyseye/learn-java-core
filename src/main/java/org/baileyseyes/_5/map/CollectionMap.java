package org.baileyseyes._5.map;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._6.__start_from_here__.HelloMultiThreading Следующая часть
 * @see org.baileyseyes._5.set.CollectionSet Предыдущая часть
 */
@SuppressWarnings("all")
public class CollectionMap {

    /**
     * Демонстрация основных характеристик HashMap.
     * <p>
     * {@code HashMap} - это реализация интерфейса {@code Map}, которая использует хеш-таблицу для хранения пар ключ-значение.
     * </p>
     * <p>
     * Основные особенности:
     * <ul>
     *     <li>Хранит пары ключ-значение.</li>
     *     <li>Ключи уникальны, значения могут повторяться.</li>
     *     <li>Быстрый доступ (O(1) в среднем для добавления, удаления и поиска).</li>
     *     <li>Не синхронизирован (не потокобезопасен).</li>
     *     <li>Позволяет хранить один null как ключ и несколько null как значения.</li>
     *     <li>Не гарантирует порядок элементов.</li>
     * </ul>
     * </p>
     */
    public static void demonstrateBasics() {
        // Создание HashMap
        Map<String, Integer> map = new HashMap<>();

        // Добавление пар ключ-значение
        map.put("Apple", 5);
        map.put("Banana", 3);
        map.put("Cherry", 8);
        map.put("Date", 12);

        System.out.println("Initial map: " + map);
        System.out.println("Size: " + map.size());

        // Получение значения по ключу
        Integer appleCount = map.get("Apple");
        System.out.println("Apples count: " + appleCount);

        // Получение значения по несуществующему ключу
        Integer grapeCount = map.get("Grape");
        System.out.println("Grapes count: " + grapeCount); // null

        // Проверка наличия ключа
        System.out.println("Contains key 'Banana': " + map.containsKey("Banana"));
        System.out.println("Contains value 8: " + map.containsValue(8));

        // Обновление значения
        map.put("Apple", 10);
        System.out.println("After updating apples: " + map);

        // Удаление по ключу
        Integer removedValue = map.remove("Cherry");
        System.out.println("Removed Cherry value: " + removedValue);
        System.out.println("After removal: " + map);

        // Попытка удаления несуществующего ключа
        Integer nonExistent = map.remove("NonExistent");
        System.out.println("Removed NonExistent: " + nonExistent); // null
    }

    /**
     * Демонстрация методов класса {@code HashMap}.
     */
    public static void demonstrateMethods() {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // Проверка на пустоту
        System.out.println("Is empty: " + map.isEmpty());

        // Проверка размера
        System.out.println("Size: " + map.size());

        // Получение набора ключей
        Set<String> keys = map.keySet();
        System.out.println("Keys: " + keys);

        // Получение коллекции значений
        Collection<Integer> values = map.values();
        System.out.println("Values: " + values);

        // Получение набора entry
        Set<Map.Entry<String, Integer>> entries = map.entrySet();
        System.out.println("Entries: " + entries);

        // Очистка
        map.clear();
        System.out.println("After clear: " + map);
        System.out.println("Is empty after clear: " + map.isEmpty());
    }

    /**
     * Демонстрация различных способов итерации по HashMap.
     */
    public static void demonstrateIteration() {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);
        map.put("D", 4);

        // Итерация по ключам
        System.out.print("Iterating by keys: ");
        for (String key : map.keySet()) {
            System.out.print(key + "=" + map.get(key) + " ");
        }
        System.out.println();

        // Итерация по значениям
        System.out.print("Iterating by values: ");
        for (Integer value : map.values()) {
            System.out.print(value + " ");
        }
        System.out.println();

        // Итерация по entrySet
        System.out.print("Iterating by entrySet: ");
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.print(entry.getKey() + "=" + entry.getValue() + " ");
        }
        System.out.println();

        // Использование Stream API (Java 8+)
        System.out.print("Stream API: ");
        map.entrySet().stream()
            .forEach(entry -> System.out.print(entry.getKey() + "=" + entry.getValue() + " "));
        System.out.println();
    }

    /**
     * Демонстрация работы с коллекциями и null значениями.
     */
    public static void demonstrateNullHandling() {
        Map<String, String> map = new HashMap<>();
        map.put("Key1", "Value1");
        map.put(null, "NullKey");
        map.put("Key2", null);
        map.put("Key3", "Value3");

        System.out.println("Map with nulls: " + map);
        System.out.println("Value for null key: " + map.get(null));
        System.out.println("Value for Key2 (null): " + map.get("Key2"));

        // Проверка наличия null ключа
        System.out.println("Contains null key: " + map.containsKey(null));

        // Проверка наличия null значения
        System.out.println("Contains null value: " + map.containsValue(null));
    }

    @UselessButNeedToKnow
    public static void demonstrateMapOperations() {
        Map<String, Integer> map1 = new HashMap<>();
        map1.put("A", 1);
        map1.put("B", 2);
        map1.put("C", 3);

        Map<String, Integer> map2 = new HashMap<>();
        map2.put("B", 20);
        map2.put("C", 30);
        map2.put("D", 4);

        // Объединение карт (вторая перезаписывает первую)
        Map<String, Integer> merged = new HashMap<>(map1);
        merged.putAll(map2);
        System.out.println("Merged map: " + merged);

        // Проверка на равенство
        System.out.println("Maps equal: " + map1.equals(map2));

        // Копирование
        Map<String, Integer> copy = new HashMap<>(map1);
        System.out.println("Copy of map1: " + copy);
    }

    public static void primitiveTricks() {
        // Использование Stream API для фильтрации
        Map<String, Integer> numbers = new HashMap<>();
        numbers.put("One", 1);
        numbers.put("Two", 2);
        numbers.put("Three", 3);
        numbers.put("Four", 4);
        numbers.put("Five", 5);

        Map<String, Integer> evenNumbers = numbers.entrySet().stream()
            .filter(entry -> entry.getValue() % 2 == 0)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue
            ));
        System.out.println("Even numbers: " + evenNumbers);

        // Проверка на пустоту с использованием Optional
        Map<String, String> emptyMap = new HashMap<>();
        String value = Optional.ofNullable(emptyMap.get("NonExistent"))
            .orElse("Default Value");
        System.out.println("Default value for missing key: " + value);

        // Использование compute для вычисления нового значения
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Player1", 100);
        scores.put("Player2", 200);

        scores.compute("Player1", (key, oldValue) -> oldValue != null ? oldValue + 50 : 50);
        System.out.println("Updated scores: " + scores);
    }

    /**
     * Демонстрация преимуществ HashMap.
     * <p>
     * {@code HashMap} предоставляет множество преимуществ, которые делают его предпочтительным выбором
     * для большинства задач
     * </p>
     */
    public static void demonstrateHashMapAdvantages() {
        System.out.println("=== Advantages of HashMap ===");

        // 1. Быстрый доступ к элементам
        System.out.println("1. Fast access (O(1) average case):");
        Map<Integer, String> fastMap = new HashMap<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            fastMap.put(i, "Value" + i);
        }
        long endTime = System.nanoTime();
        System.out.println("   Adding 100,000 elements took: " + (endTime - startTime) / 1000000.0 + " ms");

        // 2. Уникальность ключей
        System.out.println("\n2. Unique keys guarantee:");
        Map<String, Integer> uniqueMap = new HashMap<>();
        uniqueMap.put("Key1", 1);
        uniqueMap.put("Key2", 2);
        uniqueMap.put("Key1", 3); // Перезапись значения
        System.out.println("   Map with duplicate key: " + uniqueMap);
        System.out.println("   Size after duplicate key: " + uniqueMap.size());

        // 3. Быстрая проверка наличия
        System.out.println("\n3. Fast lookup (containsKey, containsValue):");
        startTime = System.nanoTime();
        boolean found = fastMap.containsKey(50000);
        endTime = System.nanoTime();
        System.out.println(
            "   Found element in 100,000 element map: " + found + " (in " + (endTime - startTime) / 1000.0 + " ns)");

        // 4. Эффективная работа с большими наборами данных
        System.out.println("\n4. Efficient for large datasets:");
        Map<String, Integer> largeMap = new HashMap<>();
        for (int i = 0; i < 1000000; i++) {
            largeMap.put("Key" + i, i);
        }
        System.out.println("   Created map of 1,000,000 key-value pairs");

        // 5. Простота использования
        System.out.println("\n5. Simple and intuitive API:");
        Map<String, String> simpleMap = new HashMap<>();
        simpleMap.put("Name", "John");
        simpleMap.put("Age", "30");
        simpleMap.remove("Age");
        System.out.println("   Basic operations: put, get, remove, containsKey, size");

        // 6. Поддержка Stream API
        System.out.println("\n6. Integration with Stream API:");
        Map<String, Integer> numbersMap = new HashMap<>();
        numbersMap.put("One", 1);
        numbersMap.put("Two", 2);
        numbersMap.put("Three", 3);
        numbersMap.put("Four", 4);
        numbersMap.put("Five", 5);

        long evenCount = numbersMap.values().stream()
            .filter(n -> n % 2 == 0)
            .count();
        System.out.println("   Count of even values in map: " + evenCount);

        // 7. Использование в алгоритмах
        System.out.println("\n7. Common in algorithms:");
        int[] array = {1, 2, 3, 4, 5, 2, 3, 4, 5, 6};
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : array) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        System.out.println("   Frequency map of array: " + frequencyMap);
        System.out.println("   Original array: " + Arrays.toString(array));

        // 8. Поддержка null значений
        System.out.println("\n8. Null support:");
        Map<String, String> mapWithNulls = new HashMap<>();
        mapWithNulls.put("Key1", "Value1");
        mapWithNulls.put(null, "NullKey");
        mapWithNulls.put("Key2", null);
        System.out.println("   Map with null key and value: " + mapWithNulls);

        // 9. Использование в кэшировании
        System.out.println("\n9. Cache implementation:");
        Map<String, String> cache = new HashMap<>();
        cache.put("user123", "UserData123");
        cache.put("user456", "UserData456");
        String cachedData = cache.get("user123");
        System.out.println("   Cached data retrieval: " + cachedData);

        // 10. Гибкость в типах ключей и значений
        System.out.println("\n10. Flexible key/value types:");
        Map<Integer, List<String>> complexMap = new HashMap<>();
        complexMap.put(1, Arrays.asList("Item1", "Item2"));
        complexMap.put(2, Arrays.asList("Item3", "Item4", "Item5"));
        System.out.println("   Complex map with List values: " + complexMap);
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\n=== Methods ===");
        demonstrateMethods();

        System.out.println("\n=== Iteration ===");
        demonstrateIteration();

        System.out.println("\n=== Null Handling ===");
        demonstrateNullHandling();

        System.out.println("\n=== Map Operations ===");
        demonstrateMapOperations();

        System.out.println("\n=== Tricks ===");
        primitiveTricks();

        System.out.println("\n=== HashMap Advantages ===");
        demonstrateHashMapAdvantages();
    }

    @UselessButNeedToKnow
    public static class CollectionTreeMap {

        /**
         * Демонстрация базовых операций TreeMap.
         */
        public static void demonstrateBasicOperations() {
            TreeMap<String, Integer> treeMap = new TreeMap<>();

            // Добавление элементов
            treeMap.put("Apple", 5);
            treeMap.put("Banana", 3);
            treeMap.put("Cherry", 8);
            treeMap.put("Date", 12);

            System.out.println("=== Basic Operations ===");
            System.out.println("TreeMap: " + treeMap);
            System.out.println("Size: " + treeMap.size());

            // Получение значений
            System.out.println("Apples count: " + treeMap.get("Apple"));
            System.out.println("Grapes count: " + treeMap.get("Grape")); // null

            // Проверка наличия
            System.out.println("Contains Apple: " + treeMap.containsKey("Apple"));
            System.out.println("Contains value 8: " + treeMap.containsValue(8));

            // Обновление значения
            treeMap.put("Apple", 10);
            System.out.println("After updating Apple: " + treeMap);

            // Удаление
            Integer removed = treeMap.remove("Cherry");
            System.out.println("Removed Cherry value: " + removed);
            System.out.println("After removal: " + treeMap);
        }

        /**
         * Демонстрация навигационных методов.
         */
        public static void demonstrateNavigationMethods() {
            TreeMap<Integer, String> treeMap = new TreeMap<>();
            treeMap.put(10, "Ten");
            treeMap.put(20, "Twenty");
            treeMap.put(30, "Thirty");
            treeMap.put(40, "Forty");
            treeMap.put(50, "Fifty");

            System.out.println("\n=== Navigation Methods ===");
            System.out.println("TreeMap: " + treeMap);

            // Методы получения крайних значений
            System.out.println("First key: " + treeMap.firstKey());
            System.out.println("Last key: " + treeMap.lastKey());
            System.out.println("First entry: " + treeMap.firstEntry());
            System.out.println("Last entry: " + treeMap.lastEntry());

            // Методы получения подмножеств
            System.out.println("Head map (exclusive) up to 30: " + treeMap.headMap(30));
            System.out.println("Head map (inclusive) up to 30: " + treeMap.headMap(30, true));
            System.out.println("Tail map (exclusive) from 30: " + treeMap.tailMap(30));
            System.out.println("Tail map (inclusive) from 30: " + treeMap.tailMap(30, true));
            System.out.println("Sub map (20 to 40): " + treeMap.subMap(20, 40));
            System.out.println("Sub map (inclusive start, exclusive end): " + treeMap.subMap(20, true, 40, false));
        }

        /**
         * Демонстрация навигационных методов с ключами.
         */
        public static void demonstrateKeyNavigation() {
            TreeMap<String, Integer> treeMap = new TreeMap<>();
            treeMap.put("Alpha", 1);
            treeMap.put("Beta", 2);
            treeMap.put("Gamma", 3);
            treeMap.put("Delta", 4);
            treeMap.put("Epsilon", 5);

            System.out.println("\n=== Key Navigation Methods ===");
            System.out.println("TreeMap: " + treeMap);

            // Методы для работы с ключами
            System.out.println("Floor key of 'Delta': " + treeMap.floorKey("Delta"));
            System.out.println("Ceiling key of 'Delta': " + treeMap.ceilingKey("Delta"));
            System.out.println("Lower key of 'Delta': " + treeMap.lowerKey("Delta"));
            System.out.println("Higher key of 'Delta': " + treeMap.higherKey("Delta"));

            // Сравнение с несуществующими ключами
            System.out.println("Floor key of 'Zeta': " + treeMap.floorKey("Zeta"));
            System.out.println("Ceiling key of 'Zeta': " + treeMap.ceilingKey("Zeta"));
        }

        public static void demonstrateCustomComparator() {
            System.out.println("\n=== Custom Comparator ===");

            // Сортировка по длине строк
            TreeMap<String, Integer> lengthSorted = new TreeMap<>((s1, s2) -> Integer.compare(s1.length(), s2.length()));
            lengthSorted.put("Short", 1);
            lengthSorted.put("Medium length", 2);
            lengthSorted.put("Very long string", 3);
            lengthSorted.put("A", 4);
            lengthSorted.put("Longer string", 5);

            System.out.println("Sorted by string length: " + lengthSorted);

            // Сортировка по значению
            TreeMap<String, Integer> valueSorted = new TreeMap<>((s1, s2) -> treeMapByValue(s1, s2));
            valueSorted.put("First", 10);
            valueSorted.put("Second", 5);
            valueSorted.put("Third", 15);
            valueSorted.put("Fourth", 2);

            System.out.println("Sorted by value: " + valueSorted);
        }

        /**
         * Вспомогательный метод для сортировки по значению.
         */
        private static int treeMapByValue(String s1, String s2) {
            // Этот метод должен работать с реальным TreeMap, который содержит эти ключи
            // Для демонстрации просто возвращаем порядок
            return 0;
        }

        /**
         * Демонстрация использования TreeMap в алгоритмах.
         */
        public static void demonstrateAlgorithmUsage() {
            System.out.println("\n=== Algorithm Usage ===");

            // Подсчет частоты элементов
            String text = "hello world hello java world";
            TreeMap<Character, Integer> charFrequency = new TreeMap<>();

            for (char c : text.toCharArray()) {
                charFrequency.put(c, charFrequency.getOrDefault(c, 0) + 1);
            }

            System.out.println("Character frequency: " + charFrequency);

            // Использование в статистике
            TreeMap<String, Double> studentGrades = new TreeMap<>();
            studentGrades.put("Alice", 95.5);
            studentGrades.put("Bob", 87.0);
            studentGrades.put("Charlie", 92.3);
            studentGrades.put("David", 78.5);

            System.out.println("Student grades: " + studentGrades);

            // Нахождение медианы (пример упрощенного подхода)
            System.out.println("Sorted grades: " + studentGrades.values());
        }
    }
}