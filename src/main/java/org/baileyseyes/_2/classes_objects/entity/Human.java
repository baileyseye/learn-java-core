package org.baileyseyes._2.classes_objects.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

/**
 * Это объект человека, класс. Он должен обладать какими-то качествами,
 * смыслом и функционалом с которым мы будем работать далее
 *
 * @see org.baileyseyes._2.classes_objects.service.HumanService Следующая часть
 * @see org.baileyseyes._2.__start_from_here__.HelloObjects Предыдущая часть
 */
@Getter
@Setter
@Builder
//@AllArgsConstructor после изучения - раскомментируйте строку и удалите все остальные явные конструкторы в коде
@SuppressWarnings("all")
//@FieldDefaults(level = AccessLevel.PRIVATE) - можно раскомментировать и не прописывать перед ПОЛЯМИ private
public class Human {

    /**
     * Имя человека - тут мы его никак не задаем, мы просто присваиваем это качество объекту, которое определим в будущем.
     */
    private String name; // private - для того, чтобы не было доступа к этой переменной без геттера

    /**
     * Возраст человека
     */
    private int age;

    /**
     * Является ли человек живым
     */
    private boolean isAlive;

    /*
    Но для того чтобы мы могли получить доступ к изменению или получению этих свойств объекта, нужно создать геттеры и сеттеры
    */

    /* <<< нажмите alt+insert -> generate -> getters setters -> выберите все поля >>> */

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean alive) {
        isAlive = alive;
    }

    /*
    Геттеры и сеттеры - это бойлер код, у них одна реализация для Java, альтернативно нужно использовать аннотации
    @Getter(14 строчка)
    @Setter(15 строчка)

    Имея эти аннотации мы можем удалить все методы геттеров и сеттеров, т.к. эти аннотации их сами сгенерируют по канону
    */

    /*
    Так же этот объект нужно собрать будет. Для сборки используется специальный метод - конструктор
    Его реализация приведена ниже. Точно так же alt + insert -> constructor
     */

    /**
     * Можно создавать разные конструкторы с разным вариантом "сборки" объекта
     */
    public Human(String name, int age, boolean isAlive) {
        this.name = name;
        this.age = age;
        this.isAlive = isAlive;
    }

    public Human(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Human(boolean isAlive, String name) {
        this.isAlive = isAlive;
        this.name = name;
    }

    public Human(int age) {
        this.age = age;
    }

    /*
    Либо всё это можно заменить аннотацией @AllArgsConstructor чтобы избавиться от бойлер-кода(16 строчка)
    Или @Builder чтобы собирать обьект не со всеми аргументами, а частично, чтобы избавиться от телескопического конструктора
     */
}
