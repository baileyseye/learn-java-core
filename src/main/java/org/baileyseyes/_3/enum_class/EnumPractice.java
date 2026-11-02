package org.baileyseyes._3.enum_class;

import org.baileyseyes._3.record.Human;

/**
 * @see Human Следующая часть
 * @see InformatedDaysOfTheWeek Предыдущая часть
 */
@SuppressWarnings("all")
public class EnumPractice {

    /**
     * Метод для демонстрации базового использования енама
     * <p>
     * енам позволяют создавать типизированные константы.
     * </p>
     */
    public static void demonstrateBasicUsage() {
        // Создание переменной типа енам
        DaysOfTheWeek today = DaysOfTheWeek.MONDAY;

        System.out.println("Сегодня: " + today);
        System.out.println("Название дня: " + today.name());
        System.out.println("Порядковый номер: " + today.ordinal());

        // Сравнение перечислений
        if (today == DaysOfTheWeek.MONDAY) {
            System.out.println("Сегодня понедельник");
        }

        // Перебор всех значений енам
        System.out.println("Все дни недели:");
        for (DaysOfTheWeek day : DaysOfTheWeek.values()) {
            System.out.println(day.name() + " (порядковый номер: " + day.ordinal() + ")");
        }
    }

    /**
     * Метод для демонстрации использования енам в условных операторах.
     */
    public static void demonstrateConditionalUsage() {
        DaysOfTheWeek day = DaysOfTheWeek.WEDNESDAY;

        System.out.println("\n=== Использование в условных операторах ===");
        switch (day) {
            case MONDAY:
                System.out.println("Начало рабочей недели");
                break;
            case FRIDAY:
                System.out.println("Конец рабочей недели");
                break;
            case SATURDAY:
            case SUNDAY:
                System.out.println("Выходной день");
                break;
            default:
                System.out.println("Рабочий день");
        }

        // Использование в if-else
        if (day == DaysOfTheWeek.SATURDAY || day == DaysOfTheWeek.SUNDAY) {
            System.out.println("Сегодня выходной");
        } else {
            System.out.println("Сегодня рабочий день");
        }
    }

    /**
     * Метод для демонстрации работы с перечислением как с константами.
     */
    public static void demonstrateConstantsUsage() {
        System.out.println("\n=== Использование как константы ===");

        // Все значения енам являются константами
        DaysOfTheWeek monday = DaysOfTheWeek.MONDAY;
        DaysOfTheWeek friday = DaysOfTheWeek.FRIDAY;
        DaysOfTheWeek sunday = DaysOfTheWeek.SUNDAY;

        System.out.println("Понедельник: " + monday);
        System.out.println("Пятница: " + friday);
        System.out.println("Воскресенье: " + sunday);

        // Сравнение констант
        System.out.println("Понедельник == Понедельник: " + (monday == DaysOfTheWeek.MONDAY));
        System.out.println("Пятница != Воскресенье: " + (friday != sunday));
    }

    /**
     * Метод для демонстрации перегрузки методов с использованием перечислений.
     */
    public static void demonstrateMethodOverloading() {
        System.out.println("\n=== Перегрузка методов с енамми ===");

        // Вызов методов с разными параметрами
        processDay(DaysOfTheWeek.MONDAY);
        processDay(DaysOfTheWeek.WEDNESDAY, "Среда");
        processDay(DaysOfTheWeek.FRIDAY, "Пятница", true);
    }

    /**
     * Метод для обработки дня недели.
     *
     * @param day день недели
     */
    public static void processDay(DaysOfTheWeek day) {
        System.out.println("Обработка дня: " + day.name());
    }

    /**
     * Метод для обработки дня недели с дополнительной информацией.
     *
     * @param day день недели
     * @param description описание дня
     */
    public static void processDay(DaysOfTheWeek day, String description) {
        System.out.println("Обработка дня: " + day.name() + " - " + description);
    }

    /**
     * Метод для обработки дня недели с дополнительными параметрами.
     *
     * @param day день недели
     * @param description описание дня
     * @param isWorkingDay является ли день рабочим
     */
    public static void processDay(DaysOfTheWeek day, String description, boolean isWorkingDay) {
        System.out.println("Обработка дня: " + day.name() + " - " + description +
            " (рабочий день: " + isWorkingDay + ")");
    }

    /**
     * Метод для демонстрации создания методов внутри енам.
     */
    public static void demonstrateEnumMethods() {
        System.out.println("\n=== Методы перечислений ===");

        // Использование методов енам
        DaysOfTheWeek today = DaysOfTheWeek.THURSDAY;
        System.out.println("Сегодня: " + today);
        System.out.println("Название: " + today.name());
        System.out.println("Порядковый номер: " + today.ordinal());
        System.out.println("Количество значений: " + DaysOfTheWeek.values().length);

        // Проверка на рабочий день
        boolean isWorkingDay = isWorkingDay(today);
        System.out.println("Рабочий день: " + isWorkingDay);

        // Получение следующего дня
        DaysOfTheWeek nextDay = getNextDay(today);
        System.out.println("Следующий день: " + nextDay);
    }

    /**
     * Метод для проверки, является ли день рабочим.
     *
     * @param day день недели
     * @return true если рабочий день, иначе false
     */
    public static boolean isWorkingDay(DaysOfTheWeek day) {
        return day != DaysOfTheWeek.SATURDAY && day != DaysOfTheWeek.SUNDAY;
    }

    /**
     * Метод для получения следующего дня недели.
     *
     * @param day текущий день
     * @return следующий день
     */
    public static DaysOfTheWeek getNextDay(DaysOfTheWeek day) {
        switch (day) {
            case MONDAY: return DaysOfTheWeek.TUESDAY;
            case TUESDAY: return DaysOfTheWeek.WEDNESDAY;
            case WEDNESDAY: return DaysOfTheWeek.THURSDAY;
            case THURSDAY: return DaysOfTheWeek.FRIDAY;
            case FRIDAY: return DaysOfTheWeek.SATURDAY;
            case SATURDAY: return DaysOfTheWeek.SUNDAY;
            case SUNDAY: return DaysOfTheWeek.MONDAY;
            default: return day;
        }
    }

    /**
     * Метод для получения русского названия дня недели.
     * <p>
     * Метод использует поле russianName для возврата человеческого названия дня.
     * </p>
     *
     * @param day день недели
     * @return русское название дня недели
     */
    public static String getRussianName(DaysOfTheWeek day) {
        switch (day) {
            case MONDAY: return "Понедельник";
            case TUESDAY: return "Вторник";
            case WEDNESDAY: return "Среда";
            case THURSDAY: return "Четверг";
            case FRIDAY: return "Пятница";
            case SATURDAY: return "Суббота";
            case SUNDAY: return "Воскресенье";
            default: return "Неизвестный день";
        }
    }

    /**
     * Метод для проверки, является ли день выходным.
     * <p>
     * Выходные дни - это суббота и воскресенье.
     * </p>
     *
     * @param day день недели
     * @return true если выходной день, иначе false
     */
    public static boolean isWeekend(DaysOfTheWeek day) {
        return day == DaysOfTheWeek.SATURDAY || day == DaysOfTheWeek.SUNDAY;
    }

    /**
     * Метод для получения всех рабочих дней.
     * <p>
     * Возвращает массив всех рабочих дней недели.
     * </p>
     *
     * @return массив рабочих дней
     */
    public static DaysOfTheWeek[] getWorkingDays() {
        return new DaysOfTheWeek[]{
            DaysOfTheWeek.MONDAY,
            DaysOfTheWeek.TUESDAY,
            DaysOfTheWeek.WEDNESDAY,
            DaysOfTheWeek.THURSDAY,
            DaysOfTheWeek.FRIDAY
        };
    }

    /**
     * Метод для получения всех выходных дней.
     * <p>
     * Возвращает массив всех выходных дней недели.
     * </p>
     *
     * @return массив выходных дней
     */
    public static DaysOfTheWeek[] getWeekendDays() {
        return new DaysOfTheWeek[]{
            DaysOfTheWeek.SATURDAY,
            DaysOfTheWeek.SUNDAY
        };
    }

    /**
     * Главный метод для демонстрации работы с енамми.
     */
    public static void main(String[] args) {
        System.out.println("=== Базовое использование перечислений ===");
        demonstrateBasicUsage();

        System.out.println("\n=== Условное использование ===");
        demonstrateConditionalUsage();

        System.out.println("\n=== Использование как константы ===");
        demonstrateConstantsUsage();

        System.out.println("\n=== Перегрузка методов ===");
        demonstrateMethodOverloading();

        System.out.println("\n=== Методы перечислений ===");
        demonstrateEnumMethods();
    }
}