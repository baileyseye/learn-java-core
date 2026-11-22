package org.baileyseyes._5;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Сортировка коллекций: Comparable и Comparator.
 * <p>
 * Comparable задаёт естественный порядок внутри класса (compareTo).
 * Comparator описывает порядок снаружи и позволяет сортировать одним и тем же
 * типом по разным ключам.
 * </p>
 *
 * @see QueueBasics Предыдущая часть
 * @see org.baileyseyes._6.__start_from_here__.HelloMultiThreading Следующая часть
 */
@SuppressWarnings("all")
public class SortingCollections {

    static class Person implements Comparable<Person> {
        private final String name;
        private final int age;

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public int compareTo(Person other) {
            return Integer.compare(age, other.age);
        }

        @Override
        public String toString() {
            return name + " (" + age + ")";
        }
    }

    /**
     * Сортировка по естественному порядку чисел.
     */
    public static void demonstrateNaturalSort() {
        List<Integer> numbers = new ArrayList<>(List.of(5, 2, 8, 1, 9));

        Collections.sort(numbers);

        System.out.println(numbers);
    }

    /**
     * Comparator.comparingInt задаёт ключ сравнения — длину строки.
     */
    public static void demonstrateComparator() {
        List<String> names = new ArrayList<>(List.of("Виктория", "Аня", "Борис"));

        names.sort(Comparator.comparingInt(String::length));
        System.out.println("По длине: " + names);

        names.sort(Comparator.comparingInt(String::length).reversed());
        System.out.println("По длине (убывание): " + names);
    }

    /**
     * Comparable реализован внутри Person, поэтому сортировка работает без Comparator.
     */
    public static void demonstrateComparable() {
        List<Person> people = new ArrayList<>(List.of(
                new Person("Аня", 20),
                new Person("Борис", 25),
                new Person("Виктория", 30)
        ));

        Collections.sort(people);

        for (Person person : people) {
            System.out.println(person);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Естественный порядок ===");
        demonstrateNaturalSort();

        System.out.println("\n=== Comparator ===");
        demonstrateComparator();

        System.out.println("\n=== Comparable ===");
        demonstrateComparable();
    }
}
