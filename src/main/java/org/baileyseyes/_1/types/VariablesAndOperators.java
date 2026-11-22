package org.baileyseyes._1.types;

/**
 * Переменные и операторы Java.
 * <p>
 * Темы урока:
 * <ul>
 *     <li>объявление и изменение переменных;</li>
 *     <li>арифметические операторы и остаток от деления;</li>
 *     <li>сравнение и логические операторы;</li>
 *     <li>инкремент, декремент и составное присваивание.</li>
 * </ul>
 *
 * @see PrimitiveTypes Следующая часть
 * @see org.baileyseyes._1.__start_from_here__.HelloWorld Предыдущая часть
 */
@SuppressWarnings("all")
public class VariablesAndOperators {

    /**
     * Переменная — имя для значения. Тип указывается при объявлении.
     * <p>
     * {@code final} означает, что значение нельзя переприсвоить.
     * </p>
     */
    public static void demonstrateVariables() {
        String name = "Анна";
        int age = 25;
        final int BIRTH_YEAR = 2000;

        age = age + 1; // переменную можно изменить

        System.out.println("Имя: " + name);
        System.out.println("Возраст через год: " + age);
        System.out.println("Год рождения: " + BIRTH_YEAR);
    }

    /**
     * Арифметические операторы: {@code +}, {@code -}, {@code *}, {@code /}, {@code %}.
     * <p>
     * Если делятся два int, дробная часть отбрасывается. Чтобы получить
     * дробный результат, хотя бы одно число должно быть double.
     * </p>
     */
    public static void demonstrateArithmetic() {
        int a = 10;
        int b = 3;

        System.out.println(a + " + " + b + " = " + (a + b));
        System.out.println(a + " - " + b + " = " + (a - b));
        System.out.println(a + " * " + b + " = " + (a * b));
        System.out.println(a + " / " + b + " = " + (a / b));
        System.out.println(a + " % " + b + " = " + (a % b));
        System.out.println("10.0 / 4 = " + (10.0 / 4));
        System.out.println("(2 + 3) * 4 = " + ((2 + 3) * 4));
    }

    /**
     * Сравнение возвращает boolean. Логические операторы объединяют условия.
     * <p>
     * Важно не путать присваивание {@code =} и сравнение {@code ==}.
     * </p>
     */
    public static void demonstrateComparisonAndLogic() {
        int age = 25;
        boolean isWeekend = false;

        System.out.println("10 > 3: " + (10 > 3));
        System.out.println("10 == 3: " + (10 == 3));
        System.out.println("Возраст от 18 до 65: " + (age >= 18 && age <= 65));
        System.out.println("Рабочий день: " + !isWeekend);
    }

    /**
     * Инкремент и декремент.
     * <p>
     * {@code i++} сначала возвращает текущее значение, потом увеличивает.
     * {@code ++i} сначала увеличивает, потом возвращает новое значение.
     * </p>
     */
    public static void demonstrateIncrement() {
        int i = 5;
        int old = i++;

        System.out.println("i++ вернул: " + old + ", i стало: " + i);

        int updated = ++i;
        System.out.println("++i вернул: " + updated + ", i стало: " + i);

        int sum = 7;
        sum += 10;
        System.out.println("sum += 10: " + sum);
    }

    public static void main(String[] args) {
        System.out.println("=== Переменные ===");
        demonstrateVariables();

        System.out.println("\n=== Арифметика ===");
        demonstrateArithmetic();

        System.out.println("\n=== Сравнение и логика ===");
        demonstrateComparisonAndLogic();

        System.out.println("\n=== Инкремент ===");
        demonstrateIncrement();
    }
}
