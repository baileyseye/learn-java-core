package org.baileyseyes._2.classes_objects;

/**
 * Наследование: extends, super, @Override и полиморфизм.
 * <p>
 * Наследник получает доступные поля и методы родителя, может добавить свои
 * и переопределить поведение. Ссылка родительского типа может указывать
 * на объект наследника — это и есть полиморфизм.
 * </p>
 *
 * @see entity.Human Предыдущая часть
 * @see org.baileyseyes._3.__start_from_here__.HelloJavaClassTypes Следующая часть
 */
@SuppressWarnings("all")
public class InheritanceBasics {

    static class Animal {
        protected final String name;

        Animal(String name) {
            this.name = name;
        }

        String getName() {
            return name;
        }

        void eat() {
            System.out.println(name + " ест");
        }

        String sound() {
            return "...";
        }
    }

    /**
     * Dog наследует Animal, добавляет fetch() и переопределяет sound().
     */
    static class Dog extends Animal {
        Dog(String name) {
            super(name); // вызов конструктора родителя
        }

        @Override
        String sound() {
            return "Гав!";
        }

        void fetch() {
            System.out.println(name + " приносит мяч");
        }
    }

    static class Cat extends Animal {
        Cat(String name) {
            super(name);
        }

        @Override
        String sound() {
            return "Мяу!";
        }
    }

    /**
     * Наследник использует метод родителя и своё поведение.
     */
    public static void demonstrateInheritance() {
        Dog dog = new Dog("Рекс");
        dog.eat();
        dog.fetch();
    }

    /**
     * Одна ссылка Animal — разные реализации sound().
     */
    public static void demonstratePolymorphism() {
        Animal[] animals = {
                new Dog("Рекс"),
                new Cat("Мурка")
        };

        for (Animal animal : animals) {
            System.out.println(animal.getName() + ": " + animal.sound());
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Наследование ===");
        demonstrateInheritance();

        System.out.println("\n=== Полиморфизм ===");
        demonstratePolymorphism();
    }
}
