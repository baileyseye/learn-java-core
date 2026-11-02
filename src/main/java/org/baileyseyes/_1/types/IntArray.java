package org.baileyseyes._1.types;

import java.util.Arrays;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует массивы целых чисел в Java.
 * <br>
 *
 * @see org.baileyseyes._1.if_else.IfElse Следующая часть
 * @see StringType Предыдущая часть
 */
@SuppressWarnings("all")
@UselessButNeedToKnow
public class IntArray {

    /**
     * Демонстрация основных характеристик массивов.
     * <p>
     * Массив в Java - это упорядоченная коллекция элементов одного типа.
     * Массивы имеют фиксированный размер, который определяется при создании.
     * Все элементы массива инициализируются значениями по умолчанию для их типа.
     * Для {@code int[]} значения по умолчанию равны 0.
     * </p>
     * <p>
     * Массивы в Java являются объектами и хранятся в куче (heap).
     * Переменная массива содержит ссылку на объект массива в куче.
     * </p>
     */
    public static void demonstrateBasics() {
        int[] arr1 = new int[3]; // Создание массива размером 3(может хранить 3 значения)

        // Инициализация при создании
        int[] arr2 = {1, 2, 3, 4, 5};

        // Инициализация с помощью литерала массива
        int[] arr3 = new int[]{10, 20, 30};

        System.out.println("Length of arr3: " + arr2.length);
    }

    /**
     * Демонстрация методов класса {@code Arrays} для работы с массивами.
     */
    public static void demonstrateArraysClass() {
        int[] arr1 = {5, 2, 8, 1, 9};
        int[] arr2 = {5, 2, 8, 1, 9};

        // Сравнение массивов
        boolean isEqual = Arrays.equals(arr1, arr2);
        System.out.println("Arrays equal: " + isEqual);

        String[] strArr1 = {"Zebra", "Apple", "Banana", "Cat"};
        String[] strArr2 = {"Zebra", "Apple", "Banana", "Cat"};

        // Сравнение массивов строк
        boolean isEqualStrings = Arrays.equals(strArr1, strArr2);
        System.out.println("Arrays equal: " + isEqualStrings);
    }

    /**
     * Демонстрация различных операций с массивами.
     */
    public static void demonstrateOperations() {
        int[] arr1 = {1, 2, 3, 4, 5};
        int[] arr2 = {6, 7, 8, 9, 10};

        // Поиск минимального и максимального значения
        int min = Arrays.stream(arr1)
            .min()
            .orElse(Integer.MAX_VALUE);

        int max = Arrays.stream(arr1)
            .max()
            .orElse(Integer.MIN_VALUE);

        System.out.println("Min in arr1: " + min);
        System.out.println("Max in arr1: " + max);

        // Сумма элементов
        int sum = Arrays.stream(arr1).sum();
        System.out.println("Sum of arr1 elements: " + sum);
    }

    public static void arraysTricks() {
        // Сравнение ссылок на массивы (не содержимого)
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {1, 2, 3};
        int[] arr3 = arr1; // Та же ссылка

        System.out.println("arr1 == arr2: " + (arr1 == arr2)); // false (разные объекты)
        System.out.println("arr1 == arr3: " + (arr1 == arr3)); // true (та же ссылка)

        // Использование Arrays.toString()
        int[] simpleArray = {1, 2, 3, 4, 5};
        System.out.println("Array as string: " + Arrays.toString(simpleArray));
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\n=== Arrays Class ===");
        demonstrateArraysClass();

        System.out.println("\n=== Operations ===");
        demonstrateOperations();

        System.out.println("\n=== Tricks ===");
        arraysTricks();
    }
}