package org.baileyseyes._3.record;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;
import org.baileyseyes._3.enum_class.EnumPractice;

/**
 * Почти то же самое, что и {@linkplain org.baileyseyes._2.classes_objects.entity.Human Human}
 *
 * @see org.baileyseyes._3.annotation.Service Следующая часть
 * @see EnumPractice Предыдущая часть
 */
@UselessButNeedToKnow
public record Human(String name, int age, boolean isAlive) {
    // Record автоматически создаёт:
    // - конструктор Human(String name, int age, boolean isAlive)
    // - геттеры: name(), age(), isAlive()
    // - методы equals(), hashCode(), toString()
}