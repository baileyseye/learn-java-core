package org.baileyseyes._2.classes_objects.service;

import org.baileyseyes._2.classes_objects.entity.Human;

/**
 * Так как у нас уже есть объект {@linkplain Human человек}, мы должны что-то научиться делать с ним.
 * <br>
 * В том же классе нельзя производить какую-либо логику с ним, следуя принципам инкапсуляции объект человека только
 * <br>
 * Хранит в себе его свойства, поэтому мы создаем этот класс-сервис в котором будет логика связанная с человеком.
 *
 * @see org.baileyseyes._2.main.HumanMain Следующая часть
 * @see Human Предыдущая часть
 */
@SuppressWarnings("all")
public class HumanService {

    /**
     * Метод для создания нового человека с заданными параметрами.
     * <p>
     * Использует {@linkplain Human#Human(String, int, boolean) конструктор} класса для создания объекта.
     * </p>
     *
     * @param name   имя человека
     * @param age    возраст человека
     * @param isAlive состояние жизни человека
     * @return новый объект {@link Human}
     */
    public Human createHuman(String name, int age, boolean isAlive) { //параметры метода, соотевтствуют полям самого объекта
        // Создание объекта человека с помощью конструктора
        Human human = new Human(name, age, isAlive);
        return human;
    }

    /**
     * Метод для создания человека с использованием конструктора с параметрами.
     * <p>
     * Простой пример создания объекта через конструктор.
     * </p>
     *
     * @return новый объект {@link Human} с заданными значениями
     */
    public Human createSimpleHuman() {
        // Простой пример создания объекта с помощью конструктора со сразу заданными значениями
        Human human = new Human("John", 25, true);
        return human;
    }

    /**
     * Метод для создания человека только с именем и возрастом.
     * <p>
     * Использует конструктор с двумя параметрами.
     * </p>
     *
     * @param name имя человека
     * @param age  возраст человека
     * @return новый объект {@link Human}
     */
    public Human createHumanWithNameAndAge(String name, int age) { //Можно создать человека без boolean isAlive
        // Создание объекта человека с помощью конструктора
        Human human = new Human(name, age);
        return human;
    }

    /**
     * Метод для создания человека с указанием только возраста.
     * <p>
     * Использует конструктор с одним параметром.
     * </p>
     *
     * @param age возраст человека
     * @return новый объект {@link Human}
     */
    public Human createHumanWithAge(int age) {
        // Создание объекта человека с помощью конструктора
        Human human = new Human(age);
        return human;
    }

    /**
     * Метод для получения информации о человеке.
     * <p>
     * Использует геттеры для получения значений полей объекта.
     * </p>
     *
     * @param human объект человека
     * @return строка с информацией о человеке
     */
    public String getHumanInfo(Human human) {
        // Получение значений полей через геттеры
        String name = human.getName();
        int age = human.getAge();
        boolean isAlive = human.isAlive();

        return "Human info - Name: " + name + ", Age: " + age + ", Alive: " + isAlive;
    }

    /**
     * Метод для изменения возраста человека.
     * <p>
     * Использует сеттер для изменения значения поля.
     * </p>
     *
     * @param human объект человека
     * @param newAge новый возраст
     */
    public void changeAge(Human human, int newAge) {
        // Изменение значения поля через сеттер
        human.setAge(newAge);
    }

    /**
     * Метод для изменения имени человека.
     * <p>
     * Использует сеттер для изменения значения поля.
     * </p>
     *
     * @param human объект человека
     * @param newName новое имя
     */
    public void changeName(Human human, String newName) {
        // Изменение значения поля через сеттер
        human.setName(newName);
    }

    /**
     * Метод для изменения состояния жизни человека.
     * <p>
     * Использует сеттер для изменения значения поля.
     * </p>
     *
     * @param human объект человека
     * @param isAlive новое состояние жизни
     */
    public void changeAliveStatus(Human human, boolean isAlive) {
        // Изменение значения поля через сеттер
        human.setAlive(isAlive);
    }

    /**
     * Метод для проверки, является ли человек взрослым.
     * <p>
     * Логика проверки возраста для определения взрослости.
     * </p>
     *
     * @param human объект человека
     * @return true если человек взрослый (возраст >= 18), иначе false
     */
    public boolean isAdult(Human human) {
        // Получение возраста через геттер и проверка условия
        int age = human.getAge();
        return age >= 18;
    }

    /**
     * Метод для увеличения возраста человека на один год.
     * <p>
     * Использует геттер для получения текущего возраста и сеттер для установки нового значения.
     * </p>
     *
     * @param human объект человека
     */
    public void celebrateBirthday(Human human) {
        // Получение текущего возраста
        int currentAge = human.getAge();
        // Увеличение возраста на 1
        human.setAge(currentAge + 1);
    }

    /**
     * Метод для проверки, жив ли человек.
     * <p>
     * Использует геттер для получения значения поля.
     * </p>
     *
     * @param human объект человека
     * @return true если человек жив, иначе false
     */
    public boolean isAlive(Human human) {
        // Получение значения поля через геттер
        return human.isAlive();
    }

    /**
     * Метод для создания человека с использованием Builder паттерна.
     * <p>
     * Использует метод build() для создания объекта через Builder.
     * </p>
     *
     * @param name   имя человека
     * @param age    возраст человека
     * @param isAlive состояние жизни человека
     * @return новый объект {@link Human}
     */
    public Human createHumanWithBuilder(String name, int age, boolean isAlive) {
        // Создание объекта с помощью Builder паттерна
        Human human = Human.builder()
            .name(name)
            .age(age)
            .isAlive(isAlive)
            .build();

        return human;
    }

    /**
     * Метод для изменения нескольких параметров человека одновременно.
     * <p>
     * Использует несколько сеттеров для изменения значений полей.
     * </p>
     *
     * @param human объект человека
     * @param name  новое имя
     * @param age   новый возраст
     * @param isAlive новое состояние жизни
     */
    public void updateHuman(Human human, String name, int age, boolean isAlive) {
        // Изменение нескольких полей через сеттеры
        human.setName(name);
        human.setAge(age);
        human.setAlive(isAlive);
    }
}