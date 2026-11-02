package org.baileyseyes._1.cycles;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует оператор цикла for в Java.
 *
 * @see While Следующая часть
 * @see org.baileyseyes._1.if_else.AssigningWithIfElse Предыдущая часть
 */
@SuppressWarnings("all")
public class For {

    /**
     * Демонстрация базового синтаксиса цикла for.
     * <p>
     * Базовый синтаксис цикла for: {@code for (initialization; condition; update) { body; }}
     * </p>
     * <p>
     * Цикл for выполняется до тех пор, пока условие истинно.
     * </p>
     */
    public static void demonstrateBasicFor() {
        // Простой цикл от 1 до 5
        System.out.println("Basic for loop (1 to 5):");
        for (int i = 1; i <= 5; i++) { /*Дословно i = это итерируемое число внутри цикла(1) и мы его инкрементируем i++ пока оно не станет равно 5*/
            System.out.print(i + " ");
        }
        System.out.println();

        // Цикл с убывающим счетчиком
        System.out.println("Countdown from 5 to 1:");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Цикл с шагом больше 1
        System.out.println("Even numbers from 2 to 10:");
        for (int i = 2; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация цикла for с массивами.
     * <p>
     * Цикл for часто используется для прохождения по элементам массива.
     * </p>
     */
    public static void demonstrateForWithArrays() {
        int[] numbers = {1, 2, 3, 4, 5};
        String[] names = {"Alice", "Bob", "Charlie", "David"};

        // Проход по массиву с использованием индекса
        System.out.println("Numbers array:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }

        // Проход по строковому массиву
        System.out.println("Names array:");
        for (int i = 0; i < names.length; i++) {
            System.out.println("Index " + i + ": " + names[i]);
        }

        // Суммирование элементов массива
        int sum = 0;
        for (int i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        System.out.println("Sum of array elements: " + sum);

        // Поиск максимального элемента
        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        System.out.println("Maximum element: " + max);
    }

    /**
     * Демонстрация for-each
     * <p>
     * Улучшенный цикл for позволяет проходить по элементам коллекции или массива без использования индексов.
     * Синтаксис: {@code for (type variable : collection) { body; }}
     * </p>
     */
    public static void demonstrateEnhancedFor() {
        int[] numbers = {10, 20, 30, 40, 50};
        String[] fruits = {"Apple", "Banana", "Cherry", "Date"};

        // Использование for-each с массивом чисел
        System.out.println("Enhanced for loop with numbers:");
        for (int number : numbers) {
            System.out.print(number + " ");
        }
        System.out.println();

        // Использование for-each со строковым массивом
        System.out.println("Enhanced for loop with fruits:");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация вложенных циклов for.
     * <p>
     * Циклы могут быть вложенными друг в друга.
     * </p>
     */
    public static void demonstrateNestedFor() {
        // Таблица умножения
        System.out.println("Multiplication table (5x5):");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 5; j++) {
                System.out.printf("%3d ", i * j);
            }
            System.out.println();
        }

        // Вложенные циклы с разными переменными
        System.out.println("Nested loop with different counters:");
        for (int i = 0; i < 3; i++) {
            System.out.println("Outer loop iteration " + i);
            for (int j = 0; j < 2; j++) {
                System.out.println("  Inner loop iteration " + j);
            }
        }
    }

    /**
     * Демонстрация использования break и continue в цикле for.
     * <p>
     * Оператор {@code break} прерывает выполнение цикла.
     * Оператор {@code continue} пропускает текущую итерацию и переходит к следующей.
     * </p>
     */
    public static void demonstrateBreakContinue() {
        // Использование break
        System.out.println("Using break:");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break; // Прерываем цикл при достижении 5
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // Использование continue
        System.out.println("Using continue:");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue; // Пропускаем четные числа
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // Комбинированное использование
        System.out.println("Combined break and continue:");
        for (int i = 1; i <= 10; i++) {
            if (i > 7) {
                break; // Прерываем при достижении 8
            }
            if (i % 2 == 0) {
                continue; // Пропускаем четные числа
            }
            System.out.print(i + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация цикла for с различными типами данных.
     */
    public static void demonstrateForWithDifferentTypes() {
        // Цикл с char
        System.out.println("Characters from A to E:");
        for (char c = 'A'; c <= 'E'; c++) {
            System.out.print(c + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация различных паттернов использования цикла for.
     */
    public static void demonstratePatterns() {
        // Поиск элемента в массиве
        int[] searchArray = {1, 3, 5, 7, 9, 11, 13};
        int target = 7;
        boolean found = false;
        int index = -1;

        for (int i = 0; i < searchArray.length; i++) {
            if (searchArray[i] == target) {
                found = true;
                index = i;
                break;
            }
        }
        if (found) {
            System.out.println("Element " + target + " found at index " + index);
        } else {
            System.out.println("Element " + target + " not found");
        }

        // Сортировка пузырьком (пример)
        @UselessButNeedToKnow
        int[] bubbleArray = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + java.util.Arrays.toString(bubbleArray));

        for (int i = 0; i < bubbleArray.length - 1; i++) {
            for (int j = 0; j < bubbleArray.length - i - 1; j++) {
                if (bubbleArray[j] > bubbleArray[j + 1]) {
                    // Swap
                    int temp = bubbleArray[j];
                    bubbleArray[j] = bubbleArray[j + 1];
                    bubbleArray[j + 1] = temp;
                }
            }
        }
        System.out.println("Sorted array: " + java.util.Arrays.toString(bubbleArray));

        // Генерация последовательности
        System.out.println("Fibonacci sequence (first 10 terms):");
        int a = 0, b = 1;
        System.out.print(a + " " + b + " ");
        for (int i = 2; i < 10; i++) {
            int next = a + b;
            System.out.print(next + " ");
            a = b;
            b = next;
        }
        System.out.println();
    }

    public static void forTricks() {
        // Использование for для создания строк
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append(i).append(" ");
        }
        System.out.println("Built string with for loop: " + sb.toString());

        // Использование for с условием, зависящим от внешнего состояния
        boolean shouldContinue = true;
        int iterations = 0;
        for (int i = 0; shouldContinue && i < 100; i++) {
            iterations++;
            if (i > 50) {
                shouldContinue = false;
            }
        }
        System.out.println("Iterations before stopping: " + iterations);
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basic For ===");
        demonstrateBasicFor();

        System.out.println("\n=== For with Arrays ===");
        demonstrateForWithArrays();

        System.out.println("\n=== Enhanced For ===");
        demonstrateEnhancedFor();

        System.out.println("\n=== Nested For ===");
        demonstrateNestedFor();

        System.out.println("\n=== Break Continue ===");
        demonstrateBreakContinue();

        System.out.println("\n=== Different Types ===");
        demonstrateForWithDifferentTypes();

        System.out.println("\n=== Patterns ===");
        demonstratePatterns();

        System.out.println("\n=== Tricks ===");
        forTricks();
    }
}