package org.baileyseyes._3.interface_class.impl;

import org.baileyseyes._3.interface_class.SayNo;

/**
 * Impl в конце класса означает что это реализация какого-то интерфейса, обычно по имени класса должно быть понятно какого
 *
 * @see org.baileyseyes._3.main.Main Следующая часть
 * @see org.baileyseyes._3.interface_class.SayNo Предыдущая часть
 */
public class SayNoImpl implements SayNo {

    @Override //аннотация показывает, что мы определяем поведение метода интерфейса
    public void sayNo() {
        System.out.println("No.");
    }
}
