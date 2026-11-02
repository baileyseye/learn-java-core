package org.baileyseyes._1.if_else;

import java.util.Scanner;

/**
 * Демонстрирует работу оператора switch в Java.
 * Показывает классический switch, switch как выражение (Java 14+),
 * и использование yield для возврата значения.
 *
 * @see org.baileyseyes._1.methods.Methods Предыдущая часть
 */
@SuppressWarnings("all")
public class SwitchStatement {

    /**
     * Базовый switch — классический синтаксис.
     * Каждое break обязательно, иначе произойдёт «проваливание» (fall-through).
     */
    public static void demonstrateBasicSwitch() {
        System.out.println("=== Базовый switch ===");
        int day = 3;

        String dayName;
        switch (day) {
            case 1:
                dayName = "Понедельник";
                break;
            case 2:
                dayName = "Вторник";
                break;
            case 3:
                dayName = "Среда";
                break;
            case 4:
                dayName = "Четверг";
                break;
            case 5:
                dayName = "Пятница";
                break;
            case 6:
                dayName = "Суббота";
                break;
            case 7:
                dayName = "Воскресенье";
                break;
            default:
                dayName = "Неизвестный день";
                break;
        }

        System.out.println("День " + day + " — это " + dayName);
    }

    /**
     * Fall-through — несколько case используют один блок кода.
     * Показывается, когда это полезно.
     */
    public static void demonstrateFallThrough() {
        System.out.println("\n=== Fall-through (несколько case → один блок) ===");

        char grade = 'B';

        switch (grade) {
            case 'A':
            case 'B':
                System.out.println("Отлично или хорошо!");
                break;
            case 'C':
                System.out.println("Удовлетворительно");
                break;
            case 'D':
            case 'F':
                System.out.println("Неудовлетворительно");
                break;
            default:
                System.out.println("Неизвестная оценка");
        }
    }

    /**
     * Switch как выражение (Java 14+):
     * Возвращает значение напрямую, без break и fall-through.
     * Arrow-синтаксис (->) вместо двоеточия (:).
     */
    public static String getMonthNameModern(int month) {
        // Arrow-синтаксис: нет break, нет fall-through — чистый и читаемый код
        return switch (month) {
            case 1 -> "Январь";
            case 2 -> "Февраль";
            case 3 -> "Март";
            case 4 -> "Апрель";
            case 5 -> "Май";
            case 6 -> "Июнь";
            case 7 -> "Июль";
            case 8 -> "Август";
            case 9 -> "Сентябрь";
            case 10 -> "Октябрь";
            case 11 -> "Ноябрь";
            case 12 -> "Декабрь";
            default -> "Неверный номер месяца";
        };
    }

    /**
     * Switch как выражение с yield:
     * Можно вложить несколько строк кода в один case и вернуть значение через yield.
     */
    public static String getSeasonDescription(int month) {
        return switch (month) {
            case 12, 1, 2 -> "Зима — холодно и снег";
            case 3, 4, 5 -> {
                // Несколько инструкций в блоке
                String description = "Весна — всё цветёт";
                yield description;
            }
            case 6, 7, 8 -> "Лето — жарко и тепло";
            case 9, 10, 11 -> "Осень — листья опадают";
            default -> {
                System.err.println("Месяц вне допустимого диапазона: " + month);
                yield "Ошибка ввода";
            }
        };
    }

    /**
     * Switch с строками (Java 12+):
     * Строки сравниваются через .equals(), а не через ==.
     */
    public static void demonstrateSwitchWithString() {
        System.out.println("\n=== Switch со строками ===");
        String fruit = "яблоко";

        switch (fruit) {
            case "яблоко":
                System.out.println("Красное или зелёное, хрустящее");
                break;
            case "банан":
                System.out.println("Жёлтое, сладкое");
                break;
            case "апельсин":
                System.out.println("Оранжевое, сочное");
                break;
            default:
                System.out.println("Не знакомый фрукт");
        }
    }

    /**
     * Тернарный оператор — компактная замена if-else для простых условий.
     * Синтаксис: (условие) ? значение_если_истина : значение_если_ложь
     */
    public static void demonstrateTernaryOperator() {
        System.out.println("\n=== Тернарный оператор ===");
        int age = 20;

        // Простое тернарное выражение
        String status = (age >= 18) ? "взрослый" : "несовершеннолетний";
        System.out.println("Возраст " + age + " — " + status);

        // Вложенный тернарный оператор
        int score = 85;
        String rating = (score >= 90) ? "A" : (score >= 70) ? "B" : (score >= 50) ? "C" : "F";
        System.out.println("Оценка " + score + " — " + rating);

        // Тернарный оператор для выбора числа
        int x = 10, y = 20;
        int max = (x > y) ? x : y;
        System.out.println("Максимум из " + x + " и " + y + " = " + max);
    }

    /**
     * Работа с Scanner для чтения пользовательского ввода.
     * Scanner читает из System.in (клавиатуры).
     */
    public static void demonstrateScanner() {
        System.out.println("\n=== Работа с Scanner ===");
        Scanner scanner = new Scanner(System.in);

        try {
            // Чтение целой строки
            System.out.print("Как вас зовут? ");
            String name = scanner.nextLine();
            System.out.println("Привет, " + name + "!");

            // Число
            System.out.print("Сколько вам лет? ");
            int age = scanner.nextInt();
            System.out.println("Через 10 лет вам будет " + (age + 10));

            // Вещественное число
            System.out.print("Ваш любимый процент (дробное число): ");
            double percent = scanner.nextDouble();
            System.out.println("Интересный выбор: " + percent);

        } catch (Exception e) {
            System.out.println("Ошибка при вводе данных");
        } finally {
            scanner.close(); // Всегда закрываем ресурсы
        }
    }

    /**
     * Безопасное чтение с Scanner — проверка типов перед вводом.
     * hasNextInt(), hasNextDouble() предотвращают ошибки ввода.
     */
    public static void demonstrateSafeScanner() {
        System.out.println("\n=== Безопасное чтение с Scanner ===");
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Введите число (или 'q' для выхода): ");

            // hasNextInt() проверяет тип БЕЗ consumption (не «съедает» ввод)
            if (scanner.hasNextInt()) {
                int number = scanner.nextInt();
                System.out.println("Вы ввели: " + number);
                System.out.println("Квадрат: " + (number * number));
            } else {
                String token = scanner.next();
                System.out.println("Не число, а '" + token + "'");
            }

        } finally {
            scanner.close();
        }
    }

    /**
     * Частый паттерн: чтение числа с проверкой.
     * Цикл повторяет запрос до получения корректного значения.
     */
    public static void demonstrateReadWithValidation() {
        System.out.println("\n=== Число с валидацией ===");
        Scanner scanner = new Scanner(System.in);
        int validNumber = -1;

        while (true) {
            System.out.print("Введите число от 1 до 10: ");
            if (scanner.hasNextInt()) {
                validNumber = scanner.nextInt();
                if (validNumber >= 1 && validNumber <= 10) {
                    break; // Всё верно — выходим из цикла
                } else {
                    System.out.println("Число вне диапазона 1-10!");
                }
            } else {
                System.out.println("Это не число! Попробуйте снова.");
                scanner.next(); // Очищаем некорректный ввод
            }
        }
        System.out.println("Принято число: " + validNumber);
        scanner.close();
    }

    public static void main(String[] args) {
        System.out.println("=== Демонстрация switch и Scanner ===");
        demonstrateBasicSwitch();
        demonstrateFallThrough();
        System.out.println("\nМесяц 7: " + getMonthNameModern(7));
        System.out.println("Сезон месяца 5: " + getSeasonDescription(5));
        demonstrateSwitchWithString();
        demonstrateTernaryOperator();
        // Для интерактивности — раскомментируйте следующие строки:
        // demonstrateScanner();
        // demonstrateSafeScanner();
        // demonstrateReadWithValidation();
    }
}
