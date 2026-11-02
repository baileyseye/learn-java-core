package org.baileyseyes._5.set;

import java.util.HashSet;
import java.util.Set;

/**
 * @see org.baileyseyes._5.map.CollectionMap Следующая часть
 * @see org.baileyseyes._5.list.CollectionList Предыдущая часть
 */
@SuppressWarnings("all")
public class CollectionSet {

    /**
     * Демонстрация основных характеристик HashSet.
     * <p>
     * {@code HashSet} - это реализация интерфейса {@code Set}, которая использует хеш-таблицу для хранения элементов.
     * Он не гарантирует порядок элементов.
     * </p>
     * <p>
     * Основные особенности:
     * <ul>
     *     <li>Уникальность элементов (дубликаты не допускаются).</li>
     *     <li>Быстрый доступ (O(1) в среднем для добавления, удаления и поиска).</li>
     *     <li>Не синхронизирован (не потокобезопасен).</li>
     *     <li>Позволяет хранить один null.</li>
     *     <li>Нет индексированного доступа.</li>
     * </ul>
     * </p>
     */
    public static void demonstrateBasics() {
        // Создание HashSet
        Set<String> set = new HashSet<>();

        // Добавление элементов
        set.add("Apple");
        set.add("Banana");
        set.add("Cherry");
        set.add("Apple"); // Дубликат, не будет добавлен

        System.out.println("Set after adding elements: " + set);
        System.out.println("Size: " + set.size());

        // Проверка наличия элемента
        System.out.println("Contains 'Banana': " + set.contains("Banana"));
        System.out.println("Contains 'Grape': " + set.contains("Grape"));

        // Удаление элемента
        boolean removed = set.remove("Banana");
        System.out.println("Removed 'Banana': " + removed);
        System.out.println("Set after removal: " + set);

        // Попытка удаления несуществующего элемента
        removed = set.remove("NonExistent");
        System.out.println("Removed 'NonExistent': " + removed);
    }

    /**
     * Демонстрация работы с коллекциями и null значениями.
     */
    public static void demonstrateNullHandling() {
        Set<String> set = new HashSet<>();
        set.add("First");
        set.add(null); // Допустимо (только один null)
        set.add("Third");

        System.out.println("Set with null: " + set);
        System.out.println("Contains null: " + set.contains(null));

        // Попытка добавить второй null
        boolean added = set.add(null);
        System.out.println("Added second null: " + added); // false
        System.out.println("Set after second null attempt: " + set);
    }

    /**
     * Демонстрация получения значения из HashSet с проверкой наличия.
     */
    public static void demonstrateGettingValueWithContains() {
        Set<String> stringSet = new HashSet<>();
        stringSet.add("Apple");
        stringSet.add("Banana");
        stringSet.add("Cherry");

        // Проверяем наличие значения и затем работаем с ним
        String targetValue = "Banana";

        if (stringSet.contains(targetValue)) {
            System.out.println("Found value: " + targetValue);
            // Здесь можно выполнять дальнейшие действия с найденным значением
            // Например, использовать его для других операций
            String processedValue = targetValue.toUpperCase();
            System.out.println("Processed value: " + processedValue);
        } else {
            System.out.println("Value '" + targetValue + "' not found in set");
        }

        // Пример с числом
        Set<Integer> numberSet = new HashSet<>();
        numberSet.add(10);
        numberSet.add(20);
        numberSet.add(30);

        int targetNumber = 20;

        if (numberSet.contains(targetNumber)) {
            System.out.println("Found number: " + targetNumber);
            int doubled = targetNumber * 2;
            System.out.println("Doubled value: " + doubled);
        } else {
            System.out.println("Number '" + targetNumber + "' not found in set");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\n=== Getting Value With Contains ===");
        demonstrateGettingValueWithContains();

        System.out.println("\n=== Null Handling ===");
        demonstrateNullHandling();
    }
}