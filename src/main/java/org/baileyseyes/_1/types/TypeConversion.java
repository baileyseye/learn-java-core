package org.baileyseyes._1.types;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Класс демонстрирует преобразование типов данных в Java.
 *
 * @see StringType Следующая часть
 * @see PrimitiveTypes Предыдущая часть
 */
@SuppressWarnings("all")
@UselessButNeedToKnow
public class TypeConversion {

    /**
     * Демонстрация явного преобразования (casting)
     * <p>
     * Требуется явное указание типа
     * </p>
     * <pre>
     * double -> float -> long -> int -> short -> byte
     * </pre>
     */
    public void demonstrateNarrowing() {
        double doubleValue = 123.456;
        float floatValue = 123.456f;
        long longValue = 1234567890L;
        int intValue = 123456789;

        // Явное преобразование
        byte narrowedByte = (byte) intValue; // int -> byte (может потерять данные)
        short narrowedShort = (short) longValue; // long -> short (может потерять данные)
        int narrowedInt = (int) floatValue; // float -> int (может потерять дробную часть)
        float narrowedFloat = (float) doubleValue; // double -> float (может потерять точность)

        System.out.println("\nNarrowing conversions:");
        System.out.println("double " + doubleValue + " to byte " + narrowedByte);
        System.out.println("long " + longValue + " to short " + narrowedShort);
        System.out.println("float " + floatValue + " to int " + narrowedInt);
        System.out.println("double " + doubleValue + " to float " + narrowedFloat);
    }

    /**
     * Демонстрация преобразования между примитивными и ссылочными типами.
     * <p>
     * Например, преобразование строки в число и обратно.
     * </p>
     *
     * @see StringType ознакомиться со строками вначале тут
     */
    public void demonstrateStringConversion() {
        // int -> String
        int number = 123;
        String stringNumber = Integer.toString(number); // или "" + number
        System.out.println("int " + number + " to String " + stringNumber);

        // String -> int
        String input = "456";
        int parsedNumber = Integer.parseInt(input);
        System.out.println("String " + input + " to int " + parsedNumber);

        // double -> String
        double doubleValue = 123.456;
        String stringDouble = Double.toString(doubleValue);
        System.out.println("double " + doubleValue + " to String " + stringDouble);

        // String -> double
        String doubleInput = "789.012";
        double parsedDouble = Double.parseDouble(doubleInput);
        System.out.println("String " + doubleInput + " to double " + parsedDouble);
    }
}