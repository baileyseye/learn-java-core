package org.baileyseyes._7;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * @see StreamAPI Следующая часть
 * @see org.baileyseyes._6.synchronized_method.SynchronizedMethods Предыдущая часть
 */
@SuppressWarnings("all")
public class Else {

    /**
     * Демонстрация Optional и его использования.
     */
    public static void demonstrateOptional() {
        // Создание Optional
        Optional<String> optionalValue = Optional.of("Hello");
        Optional<String> optionalEmpty = Optional.empty();
        Optional<String> optionalNullable = Optional.ofNullable(null);

        // Проверка наличия значения
        System.out.println("Optional with value present: " + optionalValue.isPresent());
        System.out.println("Optional empty present: " + optionalEmpty.isPresent());

        // Получение значения с дефолтным значением
        String value = optionalValue.orElse("Default");
        String defaultValue = optionalEmpty.orElse("Default");
        System.out.println("Value with default: " + value + ", " + defaultValue);

        // Получение значения с обработкой исключения
        try {
            String valueOrThrow = optionalEmpty.orElseThrow(() -> new RuntimeException("No value"));
        } catch (RuntimeException e) {
            System.out.println("Exception thrown: " + e.getMessage());
        }

        // Условное выполнение
        optionalValue.ifPresent(System.out::println);
        optionalEmpty.ifPresent(System.out::println); // Не выполнится

        // Преобразование значения
        Optional<Integer> length = optionalValue.map(String::length);
        System.out.println("Length of optional value: " + length.orElse(0));

        // Фильтрация
        Optional<String> filtered = optionalValue.filter(s -> s.length() > 3);
        System.out.println("Filtered value: " + filtered.orElse("Not matched"));
    }

    /**
     * Демонстрация использования Predicate.
     */
    public static void demonstratePredicate() {
        List<String> strings = Arrays.asList("Hello", "World", "Java", "Programming", "Stream");

        // Создание предикатов
        Predicate<String> startsWithJ = s -> s.startsWith("J");
        Predicate<String> longerThan5 = s -> s.length() > 5;
        Predicate<String> containsA = s -> s.contains("a");

        // Использование предикатов
        List<String> filtered = strings.stream()
            .filter(startsWithJ)
            .collect(Collectors.toList());
        System.out.println("Strings starting with J: " + filtered);

        // Комбинирование предикатов
        Predicate<String> combined = startsWithJ.and(longerThan5);
        List<String> combinedFilter = strings.stream()
            .filter(combined)
            .collect(Collectors.toList());
        System.out.println("Strings starting with J and longer than 5: " + combinedFilter);

        // Использование в методах
        long count = strings.stream().filter(containsA).count();
        System.out.println("Strings containing 'a': " + count);
    }

    /**
     * Демонстрация использования Comparator.
     */
    public static void demonstrateComparator() {
        List<String> strings = Arrays.asList("Banana", "Apple", "Cherry", "Date");

        // Стандартная сортировка
        Collections.sort(strings);
        System.out.println("Natural order: " + strings);

        // Сортировка с Comparator
        List<String> reversed = new ArrayList<>(strings);
        Collections.sort(reversed, Comparator.reverseOrder());
        System.out.println("Reverse order: " + reversed);

        // Сортировка по длине строки
        List<String> byLength = new ArrayList<>(strings);
        Collections.sort(byLength, Comparator.comparing(String::length));
        System.out.println("Sorted by length: " + byLength);

        // Сравнение с null значениями
        List<String> withNull = Arrays.asList("Banana", null, "Apple", "Cherry");
        withNull.sort(Comparator.nullsLast(String::compareTo));
        System.out.println("Sorted with nulls last: " + withNull);
    }

    /**
     * Демонстрация работы с коллекциями и Stream API.
     */
    public static void demonstrateStreamApi() {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Фильтрация и маппинг
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .collect(Collectors.toList());
        System.out.println("Even squares: " + evenSquares);

        // Суммирование
        int sum = numbers.stream().mapToInt(Integer::intValue).sum();
        System.out.println("Sum of numbers: " + sum);

        // Максимальное значение
        Optional<Integer> max = numbers.stream().max(Integer::compareTo);
        System.out.println("Maximum: " + max.orElse(0));

        // Группировка
        Map<Boolean, List<Integer>> grouped = numbers.stream()
            .collect(Collectors.partitioningBy(n -> n % 2 == 0));
        System.out.println("Even/odd grouping: " + grouped);
    }

    /**
     * Демонстрация работы с датами и временем (Java 8+).
     */
    public static void demonstrateDateTime() {
        // Получение текущей даты и времени
        java.time.LocalDateTime now = java.time.LocalDateTime.now();
        System.out.println("Current datetime: " + now);

        // Форматирование даты
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formatted = now.format(formatter);
        System.out.println("Formatted datetime: " + formatted);

        // Работа с датами
        java.time.LocalDate today = java.time.LocalDate.now();
        java.time.LocalDate tomorrow = today.plusDays(1);
        System.out.println("Today: " + today + ", Tomorrow: " + tomorrow);

        // Работа с временем
        java.time.LocalTime nowTime = java.time.LocalTime.now();
        System.out.println("Current time: " + nowTime);
    }


    /**
     * Демонстрация работы с аннотациями.
     */
    public static void demonstrateAnnotations() {
        // Использование стандартных аннотаций
        @SuppressWarnings("unused")
        String unusedVariable = "This won't cause warning";

        // Пример использования @Override
        System.out.println("Annotations demonstrated");
    }

    /**
     * Демонстрация работы с модификаторами доступа.
     */
    public static void demonstrateAccessModifiers() {
        // Пример использования различных модификаторов
        // (реализация в отдельном классе для демонстрации)
        System.out.println("Access modifiers demonstrated");
    }

    public static void main(String[] args) {
        System.out.println("=== Optional Demonstration ===");
        demonstrateOptional();

        System.out.println("\n=== Predicate Demonstration ===");
        demonstratePredicate();

        System.out.println("\n=== Comparator Demonstration ===");
        demonstrateComparator();

        System.out.println("\n=== Stream API Demonstration ===");
        demonstrateStreamApi();

        System.out.println("\n=== DateTime Demonstration ===");
        demonstrateDateTime();

        System.out.println("\n=== Annotations Demonstration ===");
        demonstrateAnnotations();
    }
}