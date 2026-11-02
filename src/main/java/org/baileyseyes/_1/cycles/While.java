package org.baileyseyes._1.cycles;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует операторы цикла while и do-while в Java.
 *
 * @see org.baileyseyes._1.methods.Methods Следующая часть
 * @see For Предыдущая часть
 */
@UselessButNeedToKnow
@SuppressWarnings("all")
public class While {

    /**
     * Демонстрация базового синтаксиса цикла while.
     * <p>
     * Цикл {@code while} выполняет блок кода, пока условие истинно.
     * Синтаксис: {@code while (condition) { body; }}
     * </p>
     * <p>
     * Условие проверяется перед каждой итерацией.
     * Если условие изначально ложно, тело цикла не выполнится ни разу.
     * </p>
     */
    public static void demonstrateBasicWhile() {
        // Простой счетчик
        int i = 1;
        System.out.println("Basic while loop (1 to 5):");
        while (i <= 5) {
            System.out.print(i + " ");
            i++;
        }
        System.out.println();

        // Цикл с убывающим счетчиком
        int j = 5;
        System.out.println("Countdown from 5 to 1:");
        while (j >= 1) {
            System.out.print(j + " ");
            j--;
        }
        System.out.println();

        // Цикл с условием на основе ввода пользователя
        int counter = 0;
        System.out.println("While loop with increment condition:");
        while (counter < 3) {
            System.out.println("Iteration " + (counter + 1));
            counter++;
        }
    }

    /**
     * Демонстрация цикла while с массивами.
     * <p>
     * Цикл while может использоваться для обхода массивов.
     * </p>
     */
    public static void demonstrateWhileWithArrays() {
        int[] numbers = {10, 20, 30, 40, 50};

        // Обход массива с использованием while
        System.out.println("While loop with numbers array:");
        int index = 0;
        while (index < numbers.length) {
            System.out.println("Index " + index + ": " + numbers[index]);
            index++;
        }
    }

    /**
     * Демонстрация использования break и continue в цикле while.
     * <p>
     * Оператор {@code break} прерывает выполнение цикла.
     * Оператор {@code continue} пропускает текущую итерацию и переходит к следующей.
     * </p>
     */
    public static void demonstrateWhileBreakContinue() {
        // Использование break
        System.out.println("While loop with break:");
        int k = 1;
        while (k <= 10) {
            if (k == 5) {
                break; // Прерываем цикл при достижении 5
            }
            System.out.print(k + " ");
            k++;
        }
        System.out.println();

        // Использование continue
        System.out.println("While loop with continue:");
        int l = 1;
        while (l <= 10) {
            if (l % 2 == 0) {
                l++;
                continue; // Пропускаем четные числа
            }
            System.out.print(l + " ");
            l++;
        }
        System.out.println();
    }

    /**
     * Демонстрация цикла do-while.
     * <p>
     * Цикл {@code do-while} выполняет блок кода хотя бы один раз,
     * а затем проверяет условие для продолжения.
     * Синтаксис: {@code do { body; } while (condition);}
     * </p>
     * <p>
     * В отличие от {@code while}, {@code do-while} гарантирует выполнение тела хотя бы один раз.
     * </p>
     */
    public static void demonstrateDoWhile() {
        // Простой пример
        int n = 1;
        System.out.println("Do-while loop (1 to 5):");
        do {
            System.out.print(n + " ");
            n++;
        } while (n <= 5);
        System.out.println();

        // Цикл с проверкой ввода пользователя
        int attempts = 0;
        int maxAttempts = 3;
        boolean validInput = false;
        System.out.println("Do-while for input validation:");
        do {
            attempts++;
            System.out.println("Attempt " + attempts + " (minimum 1 attempt guaranteed)");
            // Здесь могла бы быть проверка ввода
            if (attempts >= 2) {
                validInput = true;
            }
        } while (!validInput && attempts < maxAttempts);
    }

    /**
     * Вложенный класс для демонстрации примеров do-while.
     */
    static class DoWhileExamples {

        /**
         * Демонстрация базовых примеров do-while.
         */
        public static void demonstrateBasicDoWhile() {
            // Простой пример с счетчиком
            int counter = 1;
            System.out.println("Basic do-while with counter:");
            do {
                System.out.print(counter + " ");
                counter++;
            } while (counter <= 5);
            System.out.println();

            // Пример с пользовательским вводом
            System.out.println("Do-while for menu selection:");
            int choice = 0;
            do {
                System.out.println("Menu:");
                System.out.println("1. Option 1");
                System.out.println("2. Option 2");
                System.out.println("3. Exit");
                System.out.println("Enter your choice (1-3):");
                // В реальном приложении здесь был бы Scanner
                choice = 3; // Имитация выбора
                if (choice == 1) {
                    System.out.println("You selected Option 1");
                } else if (choice == 2) {
                    System.out.println("You selected Option 2");
                } else if (choice == 3) {
                    System.out.println("Exiting...");
                } else {
                    System.out.println("Invalid choice, please try again");
                }
            } while (choice != 3);
        }

        /**
         * Демонстрация do-while с вводом данных.
         */
        public static void demonstrateInputValidation() {
            // Пример валидации ввода
            int number = -1;
            boolean validInput = false;

            System.out.println("Do-while for input validation:");
            do {
                // Имитация ввода
                number = 15; // Имитация ввода пользователя
                if (number >= 0 && number <= 100) {
                    validInput = true;
                    System.out.println("Valid input received: " + number);
                } else {
                    System.out.println("Invalid input. Please enter a number between 0 and 100.");
                }
            } while (!validInput);
        }
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basic While ===");
        demonstrateBasicWhile();

        System.out.println("\n=== While with Arrays ===");
        demonstrateWhileWithArrays();

        System.out.println("\n=== While Break Continue ===");
        demonstrateWhileBreakContinue();

        System.out.println("\n=== Do-While ===");
        demonstrateDoWhile();

        System.out.println("\n=== Do-While Examples ===");
        DoWhileExamples.demonstrateBasicDoWhile();
        DoWhileExamples.demonstrateInputValidation();
    }
}