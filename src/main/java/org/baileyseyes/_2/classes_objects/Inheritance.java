package org.baileyseyes._2.classes_objects;

/**
 * Демонстрирует наследование в Java.
 * Ключевые понятия: extends, super, переопределение методов (@Override),
 * цепочка инициализации (родитель → потомок).
 *
 * @see org.baileyseyes._2.classes_objects.entity.Human Предыдущая часть
 */
public class Inheritance {

    /**
     * Базовый класс — «транспорт».
     */
    static class Vehicle {
        protected String brand;
        protected int year;

        public Vehicle(String brand, int year) {
            this.brand = brand;
            this.year = year;
            System.out.println("Vehicle создан: " + brand + " (" + year + ")");
        }

        public void startEngine() {
            System.out.println(brand + ": двигатель запущен");
        }

        public void stopEngine() {
            System.out.println(brand + ": двигатель остановлен");
        }

        public String getInfo() {
            return brand + " " + year;
        }
    }

    /**
     * Наследуемся от Vehicle.
     * Автомобиль получает все методы и поля Vehicle,
     * плюс добавляет свои собственные.
     */
    static class Car extends Vehicle {
        private int doors;

        public Car(String brand, int year, int doors) {
            // super() — вызов конструктора родителя. ОБЯЗАТЕЛЕН первой строкой!
            super(brand, year);
            this.doors = doors;
            System.out.println("Car создан: " + doors + " дверей");
        }

        /**
         * Переопределение (override) метода родителя.
         * @Override — подсказка компилятору: если родительский метод изменится,
         * мы получим ошибку, а не баг в продакшене.
         */
        @Override
        public void startEngine() {
            System.out.println(brand + " (" + doors + " дверей): двигатель запущен с турбо-звучком!");
        }

        /**
         * Доступ к методу родителя через super.
         */
        public void startEngineAndDoors() {
            startEngine();          // сначала свой
            System.out.println(brand + ": все " + doors + " дверей закрыты");
        }

        public int getDoors() {
            return doors;
        }
    }

    /**
     * Ещё один потомок Vehicle — мотоцикл.
     */
    static class Motorcycle extends Vehicle {
        private boolean hasSidecar;

        public Motorcycle(String brand, int year, boolean hasSidecar) {
            super(brand, year);
            this.hasSidecar = hasSidecar;
            System.out.println("Мотоцикл: " + brand + ", боковой прицеп: " + hasSidecar);
        }

        @Override
        public void startEngine() {
            System.out.println(brand + ": двигатель рвёт дорогу!");
        }

        public void wheelie() {
            if (!hasSidecar) {
                System.out.println(brand + " делает «козло» (wheelie)!");
            } else {
                System.out.println("С боковым прицепом колесо не сделать — перевесимся!");
            }
        }
    }

    /**
     * Трёхуровневая иерархия: Vehicle → Car → ElectricCar.
     * Показывает, как цепочка super работает на каждом уровне.
     */
    static class ElectricCar extends Car {
        private int batteryKwh;

        public ElectricCar(String brand, int year, int doors, int batteryKwh) {
            super(brand, year, doors);
            this.batteryKwh = batteryKwh;
            System.out.println("ElectricCar: батарея " + batteryKwh + " кВт·ч");
        }

        @Override
        public void startEngine() {
            // Вызываем родительский Car.startEngine(), потом добавляем своё
            super.startEngine();
            System.out.println(brand + ": электрический мотор молчит");
        }

        public void showBattery() {
            System.out.println(brand + ": заряд батареи " + batteryKwh + " кВт·ч");
        }
    }

    public static void demonstrateBasicInheritance() {
        System.out.println("=== Базовое наследование ===");
        Car car = new Car("Toyota", 2023, 5);
        car.startEngine();
        System.out.println("Информация: " + car.getInfo()); // унаследовано от Vehicle
        System.out.println("Двери: " + car.getDoors());
    }

    public static void demonstratePolymorphism() {
        System.out.println("\n=== Полиморфизм ===");

        // Переменная типа Vehicle хранит разные типы объектов
        Vehicle vehicle1 = new Car("Toyota", 2023, 5);
        Vehicle vehicle2 = new Motorcycle("Harley-Davidson", 2022, false);

        // Вызов startEngine() — разные реализации для разных классов!
        vehicle1.startEngine();
        vehicle2.startEngine();

        // Vehicle не знает о методе wheelie(), а Car знает — нужен приведение типа
        if (vehicle1 instanceof Car) {
            Car car = (Car) vehicle1;
            System.out.println("Это машина, дверей: " + car.getDoors());
        }

        if (vehicle2 instanceof Motorcycle) {
            Motorcycle moto = (Motorcycle) vehicle2;
            moto.wheelie();
        }
    }

    public static void demonstrateMultiLevelInheritance() {
        System.out.println("\n=== Многоуровневое наследование ===");
        ElectricCar ev = new ElectricCar("Tesla", 2024, 4, 100);
        ev.startEngine();       // Tesla (4 дверей): двигатель рвёт... → электрический молчит
        ev.showBattery();       // Tesla: батарея 100 кВт·ч
        ev.stopEngine();        // унаследовано от Vehicle
    }

    /**
     * Ключевое слово final:
     * — final класс нельзя наследовать.
     * — final поле нельзя изменить после инициализации.
     * — final метод нельзя переопределить.
     */
    public static void demonstrateFinal() {
        System.out.println("\n=== Ключевое слово final ===");

        // Финальное поле — не может быть изменено
        final String APP_NAME = "MyApp";
        System.out.println("Приложение: " + APP_NAME);
        // APP_NAME = "Changed" → ОШИБКА: нельзя переназначить final

        // Финальный метод — нельзя переопределить
        Vehicle fastCar = new Car("Ferrari", 2024, 2);
        fastCar.startEngine(); // Ferrari (2 дверей): двигатель рвёт дорогу!
    }

    public static void main(String[] args) {
        System.out.println("=== Наследование и полиморфизм ===");
        demonstrateBasicInheritance();
        demonstratePolymorphism();
        demonstrateMultiLevelInheritance();
        demonstrateFinal();
    }
}
