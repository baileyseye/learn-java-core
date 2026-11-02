package org.baileyseyes._1.types;

/**
 * Тернарный оператор — короткая версия if-else.
 * 
 * Синтаксис: условие ? значение1 : значение2
 * Если условие true → значение1, иначе → значение2.
 * 
 * @see org.baileyseyes._1.if_else.IfElse Предыдущая часть
 */
@SuppressWarnings("all")
public class TernaryOperator {

    public static void demonstrateBasic() {
        // ===================== Базовый тернарный оператор =====================

        int age = 20;
        String status;

        // Обычный if-else
        if (age >= 18) {
            status = "Совершеннолетний";
        } else {
            status = "Несовершеннолетний";
        }
        System.out.println("if-else: " + status);

        // Тот же код через тернарный оператор
        status = (age >= 18) ? "Совершеннолетний" : "Несовершеннолетний";
        System.out.println("Тернарный: " + status);
    }

    // ===================== Вложенный тернарный оператор =====================

    /**
     * Тернарный оператор можно вкладывать.
     * Но! Вложенность > 2 делает код нечитаемым — лучше if-else!
     */
    public static void demonstrateNestedTernary() {
        System.out.println("\n=== Вложенный тернарный ===");

        int score = 85;
        // Вложенный тернарный: оценка по баллам
        String grade = (score >= 90) ? "Отлично"
                 : (score >= 70) ? "Хорошо"
                 : (score >= 50) ? "Удовлетворительно"
                 : "Неудовлетворительно";

        System.out.println("Баллы: " + score + " → Оценка: " + grade);
        // НЕ РЕКОМЕНДУЕТСЯ вложенность > 2 — используйте switch/if-else!
    }

    // ===================== Тернарный в присваивании =====================

    /**
     * Тернарный оператор в присваивании переменной.
     */
    public static void demonstrateAssignment() {
        System.out.println("\n=== Присваивание ===");

        int a = 10, b = 20;
        // Находим максимум
        int max = (a > b) ? a : b;
        System.out.println("a=" + a + ", b=" + b + " → max=" + max);

        // Минимум
        int min = (a < b) ? a : b;
        System.out.println("min=" + min);

        // Абсолютное значение
        int x = -42;
        int absX = (x >= 0) ? x : -x;
        System.out.println("abs(" + x + ") = " + absX);
    }

    // ===================== Тернарный в методе =====================

    /**
     * Возврат из тернарного оператора напрямую.
     */
    public static void demonstrateReturnValue() {
        System.out.println("\n=== Возврат из метода ===");

        int temperature = 35;
        String advice = getAdvice(temperature);
        System.out.println("При " + temperature + "°C: " + advice);

        temperature = -5;
        advice = getAdvice(temperature);
        System.out.println("При " + temperature + "°C: " + advice);

        temperature = 20;
        advice = getAdvice(temperature);
        System.out.println("При " + temperature + "°C: " + advice);
    }

    private static String getAdvice(int temperature) {
        // Возвращаем строку напрямую из тернарного
        return (temperature > 30) ? "Пейте воду и не перегревайтесь!"
                 : (temperature < 0)  ? "Наденьте тёплую одежду!"
                 : "Отличная погода для прогулки!";
    }

    // ===================== Тернарный с вычислениями =====================

    /**
     * Тернарный оператор может участвовать в выражениях.
     */
    public static void demonstrateWithCalculations() {
        System.out.println("\n=== Тернарный с вычислениями ===");

        int hours = 40;
        // Оклад + премия (если worked > 40)
        int baseSalary = 1000;
        int bonus = (hours > 40) ? (hours - 40) * 50 : 0;
        int total = baseSalary + bonus;

        System.out.println("Часов: " + hours + ", премия: " + bonus + ", итого: " + total);

        hours = 35;
        bonus = (hours > 40) ? (hours - 40) * 50 : 0;
        total = baseSalary + bonus;
        System.out.println("Часов: " + hours + ", премия: " + bonus + ", итого: " + total);
    }

    // ===================== Тернарный vs switch =====================

    /**
     * Когда использовать тернарный, а когда switch?
     * Тернарный: 2 варианта
     * Switch: 3+ варианта (или с break, yield)
     */
    public static void demonstrateWhenToUse() {
        System.out.println("\n=== Когда тернарный, когда switch? ===");

        // Тернарный — два варианта (хорошо!)
        String weekend = (java.time.DayOfWeek.from(java.time.LocalDate.now()) == java.time.DayOfWeek.SATURDAY
                       || java.time.DayOfWeek.from(java.time.LocalDate.now()) == java.time.DayOfWeek.SUNDAY)
                         ? "Выходной" : "Рабочий день";
        System.out.println("Сегодня: " + weekend);

        // Switch — 3+ варианта (лучше чем вложенный тернарный!)
        int dayOfWeek = java.time.LocalDate.now().getDayOfWeek().getValue();
        String dayType;

        switch (dayOfWeek) {
            case 1 -> dayType = "Понедельник (трудный)";
            case 2, 3, 4 -> dayType = "Середина недели";
            case 5 -> dayType = "Пятница (почти выходные!)";
            case 6, 7 -> dayType = "Выходной";
            default -> dayType = "Неделя из " + dayOfWeek + " дней";
        }
        System.out.println("Тип дня: " + dayType);
    }

    // ===================== Тернарный с null =====================

    /**
     * Тернарный оператор с null — полезен для дефолтных значений.
     */
    public static void demonstrateWithNull() {
        System.out.println("\n=== Тернарный с null ===");

        String userName = null;
        String displayName = (userName != null) ? userName : "Гость";
        System.out.println("Отображаемое имя: " + displayName);

        userName = "Алексей";
        displayName = (userName != null) ? userName : "Гость";
        System.out.println("Отображаемое имя: " + displayName);
    }

    // ===================== Тернарный vs метод =====================

    /**
     * Если тернарный становится сложным — вынесите в метод.
     */
    public static void demonstrateExtractMethod() {
        System.out.println("\n=== Извлечение метода ===");

        int score = 75;
        String result = describeScore(score);
        System.out.println("Баллы " + score + ": " + result);

        score = 92;
        result = describeScore(score);
        System.out.println("Баллы " + score + ": " + result);

        score = 40;
        result = describeScore(score);
        System.out.println("Баллы " + score + ": " + result);
    }

    private static String describeScore(int score) {
        // Pattern matching для switch не работает с примитивами (int), поэтому — обычные проверки
        if (score >= 90) return "Превосходно! 🏆";
        if (score >= 70) return "Хорошо! 👍";
        if (score >= 50) return "Можно лучше 📚";
        return "Нужно подучить 😔";
    }

    // ===================== Тернарный в цикле =====================

    /**
     * Тернарный оператор внутри циклов — частый паттерн.
     */
    public static void demonstrateInLoop() {
        System.out.println("\n=== Тернарный в цикле ===");

        // Отметка чётности для чисел 1-10
        for (int i = 1; i <= 10; i++) {
            String evenOdd = (i % 2 == 0) ? "чётное" : "нечётное";
            System.out.print(i + " — " + evenOdd + "  ");
        }
        System.out.println();

        // Таблица умножения через тернарный
        System.out.println("\nТаблица умножения (7):");
        for (int i = 1; i <= 10; i++) {
            System.out.println("  7 × " + i + " = " + (7 * i));
        }
    }

    // ===================== Практические примеры =====================

    /**
     * Практический пример: определение сезона по месяцу.
     */
    public static void demonstrateSeason() {
        System.out.println("\n=== Определение сезона ===");

        int month = 7; // Июль
        String season = switch (month) {
            case 12, 1, 2 -> "❄️ Зима";
            case 3, 4, 5 -> "🌸 Весна";
            case 6, 7, 8 -> "☀️ Лето";
            case 9, 10, 11 -> "🍂 Осень";
            default -> "❓ Неизвестный месяц";
        };
        System.out.println(month + "-й месяц: " + season);
    }

    /**
     * Практический пример: расчёт скидки.
     */
    public static void demonstrateDiscount() {
        System.out.println("\n=== Расчёт скидки ===");

        int cartTotal = 15000;
        // Скидка 10% если > 10000, 5% если > 5000, иначе 0
        int discount = (cartTotal > 10000) ? cartTotal * 10 / 100
                     : (cartTotal > 5000)  ? cartTotal * 5 / 100
                     : 0;
        int finalPrice = cartTotal - discount;

        System.out.println("Корзина: " + cartTotal);
        System.out.println("Скидка: " + discount);
        System.out.println("Итого: " + finalPrice);
    }

    public static void main(String[] args) {
        System.out.println("=== Тернарный оператор ===");
        demonstrateBasic();
        demonstrateNestedTernary();
        demonstrateAssignment();
        demonstrateReturnValue();
        demonstrateWithCalculations();
        demonstrateWhenToUse();
        demonstrateWithNull();
        demonstrateExtractMethod();
        demonstrateInLoop();
        demonstrateSeason();
        demonstrateDiscount();
    }
}
