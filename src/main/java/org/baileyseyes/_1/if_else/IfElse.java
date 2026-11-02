package org.baileyseyes._1.if_else;

/**
 * Демонстрирует операторы условий if-else в Java
 *
 * @see AssigningWithIfElse Следующая часть
 * @see org.baileyseyes._1.types.IntArray  Предыдущая часть
 */
@SuppressWarnings("all")
public class IfElse {

    /**
     * Демонстрация базового синтаксиса оператора if.
     * <p>
     * Оператор {@code if} выполняет блок кода, если условие истинно.
     * Синтаксис: {@code if (condition) { block_of_code; }}
     * </p>
     */
    public static void demonstrateBasicIf() {
        int x = 10;
        int y = 20;

        if (x < y) { // дословно - если 10 меньше 20 (в данном случае условие всегда истинно)
            System.out.println("x is less than y");
        }

        // Условие может быть любым выражением, результат которого boolean
        if (x == 10) {
            System.out.println("x equals 10");
        }

        // Нельзя использовать не boolean выражения
        // if (x) { } // Ошибка компиляции
    }

    /**
     * Демонстрация оператора if-else.
     * <p>
     * Оператор {@code if-else} выполняет один блок кода, если условие истинно,
     * и другой блок, если условие ложно.
     * Синтаксис: {@code if (condition) { block_if_true; } else { block_if_false; }}
     * </p>
     */
    public static void demonstrateIfElse() {
        int score = 85;

        if (score >= 60) {
            System.out.println("Passed");
        } else {
            System.out.println("Failed");
        }

        // Проверка четности числа
        int number = 7;

        if (number % 2 == 0) { // операция ОСТАТОК ОТ ДЕЛЕНИЯ (прогуглить как оно)
            System.out.println(number + " is even");
        } else {
            System.out.println(number + " is odd");
        }
    }

    /**
     * Демонстрация оператора if-else-if.
     * <p>
     * Оператор {@code if-else-if} позволяет проверять несколько условий.
     * Блок выполняется, когда первое истинное условие.
     * </p>
     */
    public static void demonstrateIfElseIf() {
        int grade = 85;

        if (grade >= 90) {
            System.out.println("Grade: A");
        } else if (grade >= 80) {
            System.out.println("Grade: B");
        } else if (grade >= 70) {
            System.out.println("Grade: C");
        } else if (grade >= 60) {
            System.out.println("Grade: D");
        } else {
            System.out.println("Grade: F");
        }

        // Пример с логическими операторами
        int age = 25;

        if (age < 13) {
            System.out.println("Child");
        } else if (age < 20) {
            System.out.println("Teenager");
        } else if (age < 65) {
            System.out.println("Adult");
        } else {
            System.out.println("Senior");
        }
    }

    /**
     * Демонстрация вложенных условий.
     * <p>
     * Условия могут быть вложенными друг в друга.
     * </p>
     *
     * @apiNote так лучше не делать, лучше вложенные ифы выносить в приватные методы (выделить -> extract -> method)
     */
    public static void demonstrateNestedIf() {
        int x = 10;
        int y = 20;

        if (x > 0) {
            if (y > 0) {
                System.out.println("Both x and y are positive");
            } else {
                System.out.println("x is positive, y is not positive");
            }
        } else {
            System.out.println("x is not positive");
        }

        // Пример с проверкой диапазона
        int temperature = 25;

        if (temperature > 0) {
            if (temperature < 10) {
                System.out.println("Cold");
            } else if (temperature < 20) {
                System.out.println("Cool");
            } else {
                System.out.println("Warm");
            }
        } else {
            System.out.println("Freezing");
        }
    }

    /**
     * Демонстрация логических операторов в условиях.
     * <p>
     * Логические операторы {@code &&}, {@code ||}, {@code !} используются для комбинирования условий.
     * </p>
     */
    public static void demonstrateLogicalOperators() {
        int age = 25;
        boolean hasLicense = true;
        boolean hasCar = false;

        // Оператор AND (&&)
        if (age >= 18 && hasLicense) {
            System.out.println("Can drive legally");
        }

        // Оператор OR (||)
        if (hasCar || hasLicense) {
            System.out.println("Has means to travel");
        }

        // Оператор NOT (!)
        if (!hasCar) {
            System.out.println("Does not have a car");
        }

        // Сложное условие
        if ((age >= 18 && hasLicense) || hasCar) {
            System.out.println("Eligible for driving or transportation");
        }
    }

    /**
     * Демонстрация тернарного оператора.
     * <p>
     * Тернарный оператор {@code ? :} является сокращенной формой if-else.
     * Синтаксис: {@code condition ? value_if_true : value_if_false}
     * </p>
     */
    public static void demonstrateTernaryOperator() {
        int a = 10;
        int b = 20;

        // Простое использование
        int max = (a > b) ? a : b; // если а больше б то а, иначе б
        System.out.println("Maximum of " + a + " and " + b + " is " + max);

        // Присвоение значения переменной
        String result = (a > b) ? "a is greater" : "b is greater or equal";
        System.out.println(result);

        // Вложенные тернарные операторы (не рекомендуется так делать))
        int x = 10;
        int y = 20;
        int z = 30;
        int greatest = (x > y) ? ((x > z) ? x : z) : ((y > z) ? y : z);
        System.out.println("Greatest among " + x + ", " + y + ", " + z + " is " + greatest);

        // Использование в выводе
        int number = 15;
        System.out.println(number + " is " + ((number % 2 == 0) ? "even" : "odd"));
    }

    /**
     * Демонстрация оператора switch.
     * <p>
     * Оператор {@code switch} используется для множественного выбора на основе значения.
     * </p>
     */
    public static void demonstrateSwitch() {
        int dayOfWeek = 3;

        // Switch с операторами break
        switch (dayOfWeek) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }

        // Switch с выражением - возвращает значение
        String dayName = switch (dayOfWeek) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6 -> "Saturday";
            case 7 -> "Sunday";
            default -> "Invalid day";
        };

        System.out.println("Day name using switch expression: " + dayName);
    }

    /**
     * Демонстрация различных паттернов использования условий.
     */
    public static void demonstratePatterns() {
        // Проверка на null
        String str = null;

        if (str != null) {
            System.out.println("String length: " + str.length());
        } else {
            System.out.println("String is null");
        }

        // Проверка на пустую строку
        String emptyStr = "";

        if (emptyStr != null && !emptyStr.isEmpty()) {
            System.out.println("String is not empty");
        } else {
            System.out.println("String is null or empty");
        }

        // Проверка на диапазон
        int value = 50;

        if (value >= 0 && value <= 100) {
            System.out.println("Value is in range [0, 100]");
        } else {
            System.out.println("Value is out of range [0, 100]");
        }

        // Использование в методах
        int result = calculateGrade(85);
        System.out.println("Calculated grade: " + result);
    }

    /**
     * Пример метода, использующего условные конструкции.
     *
     * @param score оценка
     * @return числовая оценка
     */
    private static int calculateGrade(int score) {
        if (score >= 90) {
            return 5;
        } else if (score >= 80) {
            return 4;
        } else if (score >= 70) {
            return 3;
        } else if (score >= 60) {
            return 2;
        } else {
            return 1;
        }
    }

    public static void isElseTricks() {
        // Использование switch с enum
        Day today = Day.WEDNESDAY;

        String activity = switch (today) {
            case MONDAY -> "Start of work week";
            case TUESDAY -> "Work day";
            case WEDNESDAY -> "Midweek";
            case THURSDAY -> "Work day";
            case FRIDAY -> "End of work week";
            case SATURDAY -> "Weekend";
            case SUNDAY -> "Weekend";
        };

        System.out.println("Today (" + today + ") is " + activity);
    }

    /**
     * Перечисление для демонстрации switch с enum.
     */
    enum Day {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basic If ===");
        demonstrateBasicIf();

        System.out.println("\n=== If-Else ===");
        demonstrateIfElse();

        System.out.println("\n=== If-Else-If ===");
        demonstrateIfElseIf();

        System.out.println("\n=== Nested If ===");
        demonstrateNestedIf();

        System.out.println("\n=== Logical Operators ===");
        demonstrateLogicalOperators();

        System.out.println("\n=== Ternary Operator ===");
        demonstrateTernaryOperator();

        System.out.println("\n=== Switch ===");
        demonstrateSwitch();

        System.out.println("\n=== Patterns ===");
        demonstratePatterns();

        System.out.println("\n=== Tricks ===");
        isElseTricks();
    }
}