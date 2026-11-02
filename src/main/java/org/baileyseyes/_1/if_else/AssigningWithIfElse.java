package org.baileyseyes._1.if_else;

import java.util.Random;
import java.util.Scanner;

/**
 * Способ присвоить значение переменной в if-else блоке
 *
 * @see org.baileyseyes._1.cycles.For Следующая часть
 * @see IfElse Предыдущая часть
 */
public class AssigningWithIfElse {

    /**
     * Пример создания константы, можно поменять только тут значение и оно автоматически поменяется в остальных местах
     */
    private static final String NAME = "name";
    private static final int AGE = 18;

    public static void main(String[] args) {
        /*
        Создаем сканер, при запуске этого метода нужно будет перевести курсор на консоль
        и ввести name - нажать enter - затем 18 - enter.
         */
        Scanner scanner = new Scanner(System.in);

        String name = scanner.nextLine(); // создаем переменную, значение которой сами напишем ручками в консоль
        int age = scanner.nextInt();

        /*создаем два булина, значение которым присвоим в зависимости от условий, и исходя от их значения выполним определенную логику */
        boolean isAllowedName;
        boolean isAllowedAge;

        if (name.equalsIgnoreCase(NAME)) {
            System.out.println("Your name is : " + name);
            isAllowedName = true;
        } else {
            isAllowedName = false;
            System.out.println("Your name is wrong");
        }

        if (age >= AGE) {
            System.out.println("Your age is : " + age);
            isAllowedAge = true;
        } else {
            System.out.println("Your age is wrong");
            isAllowedAge = false;
        }

        /*в случае если все проверки успешны - выводится надпись, что мы победили*/
        if (isAllowedName && isAllowedAge) {
            System.out.println("You win");
        } else {
            System.out.println("You lose");
        }

       // demonstrateRandomEvenCheck();
    }

    /**
     * Дополнительный метод для понимания того, что присваивание значений в зависимости от входных данных - очень гибкий механизм
     */
    public static void demonstrateRandomEvenCheck() {
        Random random = new Random();

        boolean isEven;
        int randomNumber;

        for (int i = 1; i <= 10; i++) {
            randomNumber = random.nextInt(100) + 1; // Генерируем случайное число от 1 до 100
            System.out.println("Iteration " + i + ": Generated number = " + randomNumber);

            if (randomNumber % 2 == 0) { // если случайное число окажется четным
                isEven = true;
                System.out.println("Number " + randomNumber + " is even");
            } else {
                isEven = false;
                System.out.println("Number " + randomNumber + " is odd");
            }

            // Если число четное, можно выполнять дополнительные действия
            if (isEven) {
                System.out.println("Action performed because the number is even.");
            } else {
                System.out.println("Action performed because the number is odd.");
            }
        }
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }
}
