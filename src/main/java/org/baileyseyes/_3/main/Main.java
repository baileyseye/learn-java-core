package org.baileyseyes._3.main;

import org.baileyseyes._3.interface_class.impl.SayNoImpl;

/**
 * @see org.baileyseyes._3.enum_class.DaysOfTheWeek Следующая часть
 * @see SayNoImpl Предыдущая часть
 */
public class Main {

    public static void main(String[] args) {
        SayNoImpl sayNoImpl = new SayNoImpl();
        sayNoImpl.sayNo(); //вызываем метод реализацию которого определили в классе SayNoImpl
    }
}
