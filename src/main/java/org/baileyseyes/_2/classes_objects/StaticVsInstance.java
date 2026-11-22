package org.baileyseyes._2.classes_objects;

/**
 * static и поля экземпляра.
 * <p>
 * Поле экземпляра своё у каждого объекта. static-поле одно на весь класс.
 * static-метод не имеет доступа к this и работает только со статическими членами.
 * </p>
 *
 * @see entity.Human Предыдущая часть
 * @see service.HumanService Следующая часть
 */
@SuppressWarnings("all")
public class StaticVsInstance {

    static class Counter {
        /**
         * Одно общее значение на весь класс.
         */
        private static int created;

        /**
         * Своё значение у каждого объекта.
         */
        private int value;

        Counter() {
            created++;
        }

        void increment() {
            value++;
        }

        int getValue() {
            return value;
        }

        static int getCreated() {
            return created;
        }

        static String info() {
            return "Создано счётчиков: " + created;
        }
    }

    /**
     * У каждого объекта свой value.
     */
    public static void demonstrateInstanceFields() {
        Counter first = new Counter();
        Counter second = new Counter();

        first.increment();

        System.out.println("first: " + first.getValue());
        System.out.println("second: " + second.getValue());
    }

    /**
     * created общий для всех объектов и уже содержит два предыдущих счётчика.
     */
    public static void demonstrateStaticField() {
        System.out.println("Создано счётчиков: " + Counter.getCreated());

        Counter third = new Counter();
        System.out.println("После третьего: " + Counter.getCreated());
    }

    /**
     * Статический метод вызывают через имя класса, а не через объект.
     */
    public static void demonstrateStaticMethod() {
        System.out.println(Counter.info());
    }

    public static void main(String[] args) {
        System.out.println("=== Поля экземпляра ===");
        demonstrateInstanceFields();

        System.out.println("\n=== Статическое поле ===");
        demonstrateStaticField();

        System.out.println("\n=== Статический метод ===");
        demonstrateStaticMethod();
    }
}
