package org.baileyseyes._3.enum_class;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @see EnumPractice Следующая часть
 * @see DaysOfTheWeek Предыдущая часть
 */
@Getter
@AllArgsConstructor
public enum InformatedDaysOfTheWeek {

    /*
    Можно делать енам со строкой которая будет сразу определять его значение, в данном случае - перевод
     */

    MONDAY("Понедельник"),
    TUESDAY("Вторник"),
    WEDNESDAY("Среда"),
    THURSDAY("Четверг"),
    FRIDAY("Пятница"),
    SATURDAY("Суббота"),
    SUNDAY("Воскресенье");

    private final String russianName;
}
