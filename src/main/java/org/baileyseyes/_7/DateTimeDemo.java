package org.baileyseyes._7;

import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

/**
 * Дата и время: java.time.
 * <p>
 * LocalDate хранит дату без времени, LocalTime — время, LocalDateTime — и то,
 * и другое. Period измеряет разницу в датах, Duration — в часах и минутах.
 * </p>
 *
 * @see Else Предыдущая часть
 */
@SuppressWarnings("all")
public class DateTimeDemo {

    /**
     * LocalDate неизменяем: plusDays возвращает новую дату.
     */
    public static void demonstrateLocalDate() {
        LocalDate date = LocalDate.of(2024, 3, 15);

        System.out.println("Дата: " + date);
        System.out.println("Плюс 10 дней: " + date.plusDays(10));
        System.out.println("День недели: " + date.getDayOfWeek());
        System.out.println("Високосный год: " + date.isLeapYear());
    }

    /**
     * Period — разница между датами, Duration — длительность во времени.
     */
    public static void demonstratePeriodAndDuration() {
        LocalDate start = LocalDate.of(2024, 1, 1);
        LocalDate end = LocalDate.of(2024, 12, 31);

        Period period = Period.between(start, end);
        Duration duration = Duration.ofHours(2).plusMinutes(30);

        System.out.println("Период: " + period);
        System.out.println("Длительность: " + duration);
    }

    /**
     * DateTimeFormatter превращает дату в строку нужного формата.
     */
    public static void demonstrateFormatting() {
        LocalDate date = LocalDate.of(2024, 3, 15);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        System.out.println(date.format(formatter));
    }

    public static void main(String[] args) {
        System.out.println("=== LocalDate ===");
        demonstrateLocalDate();

        System.out.println("\n=== Period и Duration ===");
        demonstratePeriodAndDuration();

        System.out.println("\n=== Форматирование ===");
        demonstrateFormatting();
    }
}
