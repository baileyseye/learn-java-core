package org.baileyseyes._7;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;

/**
 * Лямбда-выражения и функциональные интерфейсы.
 * <p>
 * Лямбда — короткая запись реализации функционального интерфейса:
 * интерфейса ровно с одним абстрактным методом.
 * </p>
 *
 * @see org.baileyseyes._7.StreamAPI Следующая часть
 */
@SuppressWarnings("all")
public class LambdasDemo {

    @FunctionalInterface
    interface MathOperation {
        int apply(int a, int b);
    }

    /**
     * Синтаксис лямбды и собственный функциональный интерфейс.
     */
    public static void demonstrateLambdaSyntax() {
        MathOperation add = (a, b) -> a + b;
        System.out.println("3 + 5 = " + add.apply(3, 5));

        Runnable task = () -> System.out.println("Runnable: привет из лямбды");
        task.run();
    }

    /**
     * Стандартные функциональные интерфейсы из java.util.function.
     */
    public static void demonstrateFunctionalInterfaces() {
        Predicate<String> isLong = text -> text.length() > 4;
        Function<String, Integer> length = String::length;
        Consumer<String> printer = text -> System.out.println(text);

        System.out.println("Анна длиннее 4: " + isLong.test("Анна"));
        System.out.println("Длина Java: " + length.apply("Java"));

        printer.accept("Анна");
        printer.accept("Борис");
    }

    /**
     * Лямбды в коллекциях: removeIf и Comparator.
     */
    public static void demonstrateCollections() {
        List<String> names = new ArrayList<>(List.of("Виктория", "Аня", "Борис"));

        names.removeIf(name -> name.length() > 5);
        names.sort(Comparator.comparingInt(String::length));

        System.out.println(names);
    }

    public static void main(String[] args) {
        System.out.println("=== Синтаксис лямбды ===");
        demonstrateLambdaSyntax();

        System.out.println("\n=== Функциональные интерфейсы ===");
        demonstrateFunctionalInterfaces();

        System.out.println("\n=== Коллекции ===");
        demonstrateCollections();
    }
}
