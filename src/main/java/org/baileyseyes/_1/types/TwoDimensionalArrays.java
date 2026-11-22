package org.baileyseyes._1.types;

import java.util.Arrays;

/**
 * Двумерные массивы Java.
 * <p>
 * Двумерный массив — это массив массивов. Строки могут иметь разную длину:
 * такие структуры называют «рваными» или «ступенчатыми».
 * </p>
 *
 * @see IntArray Предыдущая часть
 * @see org.baileyseyes._1.if_else.IfElse Следующая часть
 */
@SuppressWarnings("all")
public class TwoDimensionalArrays {

    /**
     * Создание матрицы и обход вложенными циклами.
     * <p>
     * {@code matrix.length} — число строк, {@code matrix[row].length} —
     * число элементов в конкретной строке.
     * </p>
     */
    public static void demonstrateMatrix() {
        int[][] matrix = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };

        for (int row = 0; row < matrix.length; row++) {
            for (int column = 0; column < matrix[row].length; column++) {
                if (column > 0) {
                    System.out.print(" ");
                }
                System.out.print(matrix[row][column]);
            }
            System.out.println();
        }
    }

    /**
     * Сумма и максимум по всем элементам матрицы.
     */
    public static void demonstrateAggregates() {
        int[][] matrix = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };

        int sum = 0;
        int max = matrix[0][0];

        for (int[] row : matrix) {
            for (int value : row) {
                sum += value;
                if (value > max) {
                    max = value;
                }
            }
        }

        System.out.println("Сумма: " + sum);
        System.out.println("Максимум: " + max);
    }

    /**
     * Матрица, созданная через new, заполняется значениями по умолчанию.
     */
    public static void demonstrateDefaultValues() {
        int[][] matrix = new int[2][3];

        for (int[] row : matrix) {
            for (int column = 0; column < row.length; column++) {
                if (column > 0) {
                    System.out.print(" ");
                }
                System.out.print(row[column]);
            }
            System.out.println();
        }

        System.out.println("Через Arrays.deepToString: " + Arrays.deepToString(matrix));
    }

    /**
     * Ступенчатый массив: каждая строка создаётся отдельно.
     */
    public static void demonstrateJaggedArray() {
        int[][] triangle = new int[3][];

        for (int row = 0; row < triangle.length; row++) {
            triangle[row] = new int[row + 1];
            for (int column = 0; column <= row; column++) {
                triangle[row][column] = 1;
            }
        }

        for (int[] row : triangle) {
            for (int value : row) {
                System.out.print("*");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Матрица 3x3 ===");
        demonstrateMatrix();

        System.out.println("\n=== Сумма и максимум ===");
        demonstrateAggregates();

        System.out.println("\n=== Значения по умолчанию ===");
        demonstrateDefaultValues();

        System.out.println("\n=== Ступенчатый массив ===");
        demonstrateJaggedArray();
    }
}
