package org.baileyseyes._3.interface_class;

/**
 * default- и static-методы интерфейса.
 * <p>
 * До Java 8 интерфейс содержал только объявления методов. Сейчас интерфейс
 * может дать готовую реализацию через default и утилитарный метод через static.
 * </p>
 *
 * @see SayNo Предыдущая часть
 * @see org.baileyseyes._3.AbstractVsInterface Следующая часть
 */
@SuppressWarnings("all")
public class DefaultInterfaceMethods {

    interface Greeter {
        String name();

        /**
         * default-метод не обязан реализовывать каждый класс.
         */
        default String greet() {
            return "Привет, " + name();
        }

        /**
         * static-метод принадлежит интерфейсу, а не объекту.
         */
        static String version() {
            return "Greeter 1.0";
        }
    }

    static class SimpleGreeter implements Greeter {
        private final String name;

        SimpleGreeter(String name) {
            this.name = name;
        }

        @Override
        public String name() {
            return name;
        }
    }

    /**
     * Класс может переопределить default-метод своим поведением.
     */
    static class LoudGreeter implements Greeter {
        private final String name;

        LoudGreeter(String name) {
            this.name = name;
        }

        @Override
        public String name() {
            return name;
        }

        @Override
        public String greet() {
            return "ПРИВЕТ, " + name().toUpperCase() + "!!!";
        }
    }

    public static void main(String[] args) {
        System.out.println("=== default-метод ===");
        Greeter simple = new SimpleGreeter("Анна");
        System.out.println(simple.greet());

        System.out.println("\n=== Переопределение default-метода ===");
        Greeter loud = new LoudGreeter("Анна");
        System.out.println(loud.greet());

        System.out.println("\n=== static-метод интерфейса ===");
        System.out.println(Greeter.version());
    }
}
