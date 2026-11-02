package org.baileyseyes._1.types;

import org.baileyseyes._1.__start_from_here__.HelloWorld;

/**
 * Демонстрирует примитивные типы данных в Java.
 *
 * @see TypeConversion Следующая часть
 * @see HelloWorld Предыдущая часть
 */
@SuppressWarnings("all")
public class PrimitiveTypes {

    public static void howToCreateType() {
        /* чтобы создать какойто тип нужно его в начале объявить */
        int x = 5; // создали переменную 'х' и сразу присвоили ей значение 5
        int y; // можем так же создать переменную и не инициализировать ее сразу, а потом.

        System.out.println(x); // вывели в консоль значение переменной 'х'

        y = 5; // присваиваем значение тут

        System.out.println(y);
    }

    /**
     * Демонстрация целочисленных примитивных типов данных
     * <ul>
     *     <li>{@code byte} - 8-бит (-128 до 127)</li>
     *     <li>{@code short} - 16-бит (-32,768 до 32,767)</li>
     *     <li>{@code int} - 32-бит (-2,147,483,648 до 2,147,483,647)</li>
     *     <li>{@code long} - 64-бит (от -9,223,372,036,854,775,808 до 9,223,372,036,854,775,807)</li>
     * </ul>
     */
    public static void demonstrateIntegerTypes() {
        byte byteValue = 10;
        short shortValue = 1000;
        int intValue = 100000; /* int - самый часто используемый из целочисленных типов */
        long longValue = 1000000000000L; // 'L' нужен для обозначения long. Используется когда значения int-а не хватает (количество людей)

        System.out.println("Byte value: " + byteValue);
        System.out.println("Short value: " + shortValue);
        System.out.println("Int value: " + intValue);
        System.out.println("Long value: " + longValue);
    }

    /**
     * Демонстрация типов данных с плавающей точкой.
     * <ul>
     *     <li>{@code float} - 32-бит </li>
     *     <li>{@code double} - 64-бит </li>
     * </ul>
     * <p>
     * {@code double} является стандартным типом для чисел с плавающей точкой.
     * </p>
     */
    public static void demonstrateFloatingPointTypes() {
        float floatValue = 3.14f; // 'f' нужен для обозначения float
        double doubleValue = 3.14159265359;

        System.out.println("Float value: " + floatValue);
        System.out.println("Double value: " + doubleValue);
    }

    /**
     * Демонстрация типа {@code char}.
     * <p>
     * {@code char} представляет один 16-битный символ Юникода.
     * </p>
     */
    public static void demonstrateCharType() {
        char charValue = 'A';
        char unicodeChar = '\u0041'; // Unicode для 'A'
        char escapeChar = '\n'; // Переход на новую строку

        System.out.println("Char value: " + charValue);
        System.out.println("Unicode Char value: " + unicodeChar);
        System.out.println("Escape Char value (new line): " + escapeChar);
    }

    /**
     * Демонстрация типа {@code boolean}.
     * <p>
     * {@code boolean} может принимать только два значения: {@code true} или {@code false}.
     * </p>
     */
    public static void demonstrateBooleanType() {
        boolean boolTrue = true;
        boolean boolFalse = false;

        System.out.println("Boolean true: " + boolTrue);
        System.out.println("Boolean false: " + boolFalse);
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("\n=== Methods ===");
        demonstrateIntegerTypes();
        demonstrateFloatingPointTypes();
        demonstrateCharType();
        demonstrateBooleanType();

        System.out.println("\n=== Tricks ===");
        Tricks.primitiveTricks(); /* Как мы вызываем метод класса Tricks. С привязкой к самому классу через точку */

    }

    /**
     * Класс внутри класса. Так лучше не делать кроме крайних случаев. Всегда лучше создать класс в отдельном файле.
     * Тут показаны некоторые фишки, которые есть у примитивов.
     */
    static class Tricks {

        public static void primitiveTricks() {
            int maximumValue = Integer.MAX_VALUE; // сразу готовое максимальное значение инта
            int minimumValue = Integer.MIN_VALUE; // минимальное

            System.out.println(maximumValue + " " + minimumValue + " from Tricks.class");

            Integer objectInteger = 5; // это объект уже

            Boolean objectBoolean = true; //на самом деле превратится в Boolean.valueOf(true);
            Boolean objectBooleanOtherInit = Boolean.TRUE;
        }

        /**
         * Способ не объявлять тип, а дать среде разработки додуматься, какой тип использоваться должен на месте var.
         * <br>
         * Так лучше никогда не оставлять код ни при каких условиях. При разработке написании кода - можно, так легче будет.
         * <br>
         * А потом через alt-enter при активном курсоре var заменить на реальный тип, чтобы это визуально было понятно даже через блокнот.
         */
        public void demonstrateVarWithPrimitives() {
            var intValue = 42;          // Тип выводится как int
            var longValue = 1234567890L; // Тип выводится как long
            var floatValue = 3.14f;      // Тип выводится как float
            var doubleValue = 3.14159;   // Тип выводится как double
            var charValue = 'A';         // Тип выводится как char
            var boolValue = true;        // Тип выводится как boolean

            System.out.println("var with primitives:");
            System.out.println("int: " + intValue);
            System.out.println("long: " + longValue);
            System.out.println("float: " + floatValue);
            System.out.println("double: " + doubleValue);
            System.out.println("char: " + charValue);
            System.out.println("boolean: " + boolValue);
        }
    }
}