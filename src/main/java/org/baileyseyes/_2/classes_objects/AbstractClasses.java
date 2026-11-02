package org.baileyseyes._2.classes_objects;

/**
 * Абстрактные классы и полиморфизм.
 * Абстрактный класс НЕЛЬЗЯ создать через new — он для шаблона.
 * Абстрактный метод обязателен для реализации в потомке.
 *
 * @see org.baileyseyes._3.enum_class.DaysOfTheWeek Предыдущая часть
 * @see org.baileyseyes._3.interface_class.SayNo Следующая часть
 */
@SuppressWarnings("all")
public class AbstractClasses {

    /**
     * Абстрактный класс — «фигура».
     * Не существует абстрактной «Фигуры» — только конкретные (круг, прямоугольник).
     */
    abstract static class Shape {
        private String color;

        public Shape(String color) {
            this.color = color;
        }

        /**
         * Абстрактный метод — нет тела. Каждый потомок ОБЯЗАН его реализовать.
         * Абстрактные методы — это «контракт»: «Я считаю площадь, но как — решай ты».
         */
        public abstract double calculateArea();

        public abstract double calculatePerimeter();

        /**
         * Обычный метод в абстрактном классе — есть тело, потомки его унаследуют.
         */
        public String describe() {
            return "Фигура цвета " + color + ", площадь = " + String.format("%.2f", calculateArea());
        }

        public String getColor() {
            return color;
        }
    }

    /**
     * Круг — конкретный потомок Shape.
     */
    static class Circle extends Shape {
        private double radius;

        public Circle(String color, double radius) {
            super(color);
            this.radius = radius;
        }

        @Override
        public double calculateArea() {
            // Формула: π * r²
            return Math.PI * radius * radius;
        }

        @Override
        public double calculatePerimeter() {
            // Длина окружности: 2 * π * r
            return 2 * Math.PI * radius;
        }

        public double getRadius() {
            return radius;
        }
    }

    /**
     * Прямоугольник — другой потомк Shape.
     * Реализует те же абстрактные методы, но по-своему.
     */
    static class Rectangle extends Shape {
        private double width;
        private double height;

        public Rectangle(String color, double width, double height) {
            super(color);
            this.width = width;
            this.height = height;
        }

        @Override
        public double calculateArea() {
            return width * height;
        }

        @Override
        public double calculatePerimeter() {
            return 2 * (width + height);
        }
    }

    /**
     * Треугольник — ещё один потомок.
     */
    static class Triangle extends Shape {
        private double a, b, c;

        public Triangle(String color, double a, double b, double c) {
            super(color);
            this.a = a;
            this.b = b;
            this.c = c;
        }

        @Override
        public double calculateArea() {
            // Формула Герона
            double s = (a + b + c) / 2.0;
            return Math.sqrt(s * (s - a) * (s - b) * (s - c));
        }

        @Override
        public double calculatePerimeter() {
            return a + b + c;
        }
    }

    /**
     * Полиморфизм с абстрактными классами:
     * Метод принимает Shape, работает с любой фигурой.
     */
    public static void demonstrateAbstractPolymorphism() {
        System.out.println("=== Полиморфизм абстрактных классов ===");

        // Храним разные фигуры в одном списке абстрактного типа Shape
        Shape[] shapes = new Shape[4];
        shapes[0] = new Circle("Красный", 5.0);
        shapes[1] = new Rectangle("Зелёный", 10.0, 5.0);
        shapes[2] = new Rectangle("Синий", 3.0, 7.0);
        shapes[3] = new Triangle("Жёлтый", 3.0, 4.0, 5.0); // прямоугольный 3-4-5

        // Вызываем методы — каждая фигура считает по-своему!
        for (Shape shape : shapes) {
            System.out.println("\n" + shape.describe());
            System.out.println("Периметр: " + String.format("%.2f", shape.calculatePerimeter()));
        }
    }

    /**
     * Невозможно создать экземпляр абстрактного класса напрямую:
     * new Shape("Красный") → ошибка компиляции.
     */
    public static void demonstrateCannotInstantiateAbstract() {
        System.out.println("\n=== Абстрактный класс нельзя создать напрямую ===");
        System.out.println("Shape shape = new Shape(...) — ОШИБКА КОМПИЛЯЦИИ!");
        System.out.println("Нужно: new Circle(...) или new Rectangle(...)");
    }

    /**
     * Абстрактный класс МОЖЕТ иметь и абстрактные, и обычные методы.
     * Интерфейс (до Java 8) — только абстрактные.
     */
    abstract static class Calculator {
        // Абстрактный метод
        public abstract double calculate(double a, double b);

        // Обычный метод — уже готовый
        public void printResult(double a, double b) {
            double result = calculate(a, b);
            System.out.println("Результат: " + result);
        }
    }

    static class Adder extends Calculator {
        @Override
        public double calculate(double a, double b) {
            return a + b;
        }
    }

    static class Multiplier extends Calculator {
        @Override
        public double calculate(double a, double b) {
            return a * b;
        }
    }

    public static void demonstrateAbstractMethods() {
        System.out.println("\n=== Абстрактные методы ===");
        Calculator adder = new Adder();
        Calculator multiplier = new Multiplier();

        adder.printResult(3, 5);        // через обычный метод родителя → вызовет adder.calculate
        multiplier.printResult(4, 7);   // через обычный метод родителя → вызовет multiplier.calculate
    }

    public static void main(String[] args) {
        System.out.println("=== Абстрактные классы ===");
        demonstrateAbstractPolymorphism();
        demonstrateCannotInstantiateAbstract();
        demonstrateAbstractMethods();
    }
}
