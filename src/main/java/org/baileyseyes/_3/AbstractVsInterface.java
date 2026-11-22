package org.baileyseyes._3;

/**
 * Абстрактный класс и интерфейс: в чём разница и что выбирать.
 * <p>
 * Абстрактный класс может хранить состояние и общий код. Интерфейс описывает
 * контракт и позволяет реализовать несколько независимых «умений».
 * </p>
 *
 * @see org.baileyseyes._3.interface_class.DefaultInterfaceMethods Предыдущая часть
 * @see org.baileyseyes._3.enum_class.DaysOfTheWeek Следующая часть
 */
@SuppressWarnings("all")
public class AbstractVsInterface {

    /**
     * Абстрактный класс: есть общее поле name и готовая логика describe().
     */
    abstract static class Shape {
        private final String name;

        Shape(String name) {
            this.name = name;
        }

        String getName() {
            return name;
        }

        abstract double area();

        String describe() {
            double rounded = Math.round(area() * 10) / 10.0;
            return getName() + ": площадь " + rounded;
        }
    }

    /**
     * Интерфейс описывает отдельное умение — рисование.
     */
    interface Drawable {
        void draw();
    }

    static class Circle extends Shape implements Drawable {
        private final double radius;

        Circle(double radius) {
            super("Круг");
            this.radius = radius;
        }

        @Override
        double area() {
            return Math.PI * radius * radius;
        }

        @Override
        public void draw() {
            System.out.println("Рисуем круг");
        }
    }

    static class Rectangle extends Shape {
        private final double width;
        private final double height;

        Rectangle(double width, double height) {
            super("Прямоугольник");
            this.width = width;
            this.height = height;
        }

        @Override
        double area() {
            return width * height;
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Абстрактный класс ===");
        Shape circle = new Circle(5);
        Shape rectangle = new Rectangle(6, 4);
        System.out.println(circle.describe());
        System.out.println(rectangle.describe());

        System.out.println("\n=== Интерфейс ===");
        Drawable drawable = new Circle(3);
        drawable.draw();
    }
}
