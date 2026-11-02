package org.baileyseyes._1.methods;

/**
 * Демонстрация понятия методов в Java
 *
 * @see org.baileyseyes._2.__start_from_here__.HelloObjects Следующая часть
 * @see org.baileyseyes._1.cycles.While Предыдущая часть
 */
@SuppressWarnings("all")
public class Methods {

    /**
     * Метод без возвращаемого значения и без параметров.
     * <p>
     * Синтаксис: {@code public void methodName()}
     * </p>
     * <p>
     * {@code public} - модификатор доступа (метод доступен из любого места)
     * {@code void} - тип возвращаемого значения (ничего не возвращает)
     * {@code methodName} - имя метода
     * </p>
     */
    public void methodWithoutReturnAndParameters() {
        System.out.println("Этот метод ничего не возвращает и не принимает параметры");
        System.out.println("Он просто выполняет действия");
    }

    /**
     * Метод без возвращаемого значения, но с параметрами.
     * <p>
     * Синтаксис: {@code public void methodName(parameterType parameterName)}
     * </p>
     *
     * @param name имя человека
     * @param age  возраст человека
     */
    public void methodWithoutReturnWithParameters(String name, int age) { // подходит для динамических входных данных
        System.out.println("Метод с параметрами:");
        System.out.println("Имя: " + name);
        System.out.println("Возраст: " + age);
    }

    /**
     * Метод с возвращаемым значением и без параметров.
     * <p>
     * Синтаксис: {@code public returnType methodName()}
     * </p>
     *
     * @return возвращает целое число
     */
    public int methodWithReturnAndNoParameters() { // подходит для статических данных, тут всегда возвращает 42
        System.out.println("Этот метод возвращает целое число ");
        return 42;
    }

    /**
     * Метод с возвращаемым значением и параметрами.
     * <p>
     * Синтаксис: {@code public returnType methodName(parameterType parameterName)}
     * </p>
     *
     * @param age возраст человека
     * @return возвращает удвоенное значение возраста
     */
    public int methodWithReturnAndParameters(int age) { //то есть мы передаем туда возраст, а он возвращает его удвоенный
        System.out.println("Метод с параметрами и возвращаемым значением");
        System.out.println("Принятый возраст: " + age);
        int doubledAge = age * 2;
        System.out.println("Удвоенный возраст: " + doubledAge);

        return doubledAge; //возвращаем измененный возраст
    }

    /**
     * Метод с несколькими параметрами и возвращаемым значением.
     * <p>
     * Метод может принимать несколько параметров разных типов.
     * </p>
     *
     * @param name имя человека
     * @param age  возраст человека
     * @param isAlive жив ли человек
     * @return строку с информацией о человеке
     */
    public String methodWithMultipleParameters(String name, int age, boolean isAlive) {
        System.out.println("Метод с несколькими параметрами:");
        System.out.println("Имя: " + name);
        System.out.println("Возраст: " + age);
        System.out.println("Жив: " + isAlive);

        String result = "Человек: " + name + ", возраст " + age + ", " + (isAlive ? "жив" : "мертв");
        return result;
    }

    /**
     * Метод для проверки, является ли человек взрослым.
     * <p>
     * Метод принимает возраст и возвращает булево значение.
     * </p>
     *
     * @param age возраст человека
     * @return true если человек взрослый (возраст >= 18), иначе false
     */
    public boolean isAdult(int age) {
        System.out.println("Проверка взрослости для возраста: " + age);
        boolean result = age >= 18;
        System.out.println("Результат: " + result);
        return result;
    }

    /**
     * Метод для увеличения возраста человека.
     * <p>
     * Метод принимает текущий возраст и возвращает новый возраст.
     * </p>
     *
     * @param currentAge текущий возраст
     * @return новый возраст (на 1 больше текущего)
     */
    public int increaseAge(int currentAge) {
        System.out.println("Увеличение возраста:");
        System.out.println("Сейчас: " + currentAge);
        int newAge = currentAge + 1;
        System.out.println("Стало: " + newAge);
        return newAge;
    }

    /**
     * Метод для демонстрации работы с несколькими параметрами.
     * <p>
     * Показывает, как можно передавать разные типы данных в метод.
     * </p>
     *
     * @param name    имя человека
     * @param age     возраст человека
     * @param height  рост человека (в см)
     * @param weight  вес человека (в кг)
     * @param isAlive жив ли человек
     * @return строку с полной информацией
     */
    public String getFullHumanInfo(String name, int age, int height, int weight, boolean isAlive) {
        System.out.println("Получение полной информации о человеке:");
        System.out.println("Имя: " + name);
        System.out.println("Возраст: " + age);
        System.out.println("Рост: " + height + " см");
        System.out.println("Вес: " + weight + " кг");
        System.out.println("Жив: " + isAlive);

        return String.format("Человек %s, возраст %d лет, рост %d см, вес %d кг, %s",
            name, age, height, weight, isAlive ? "жив" : "мертв");
    }

    /**
     * Метод для демонстрации возврата значения.
     * <p>
     * Метод выполняет вычисления и возвращает результат.
     * </p>
     *
     * @param a первое число
     * @param b второе число
     * @return сумму двух чисел
     */
    public int numbersSum(int a, int b) {
        System.out.println("Сложение чисел:");
        System.out.println("Число 1: " + a);
        System.out.println("Число 2: " + b);
        int sum = a + b;
        System.out.println("Сумма: " + sum);
        return sum;
    }

    /**
     * Метод для демонстрации выполнения действий без возврата.
     * <p>
     * Метод выполняет действия, но не возвращает значение.
     * </p>
     *
     * @param message сообщение для вывода
     */
    public void printMessage(String message) {
        System.out.println("Вывод сообщения:");
        System.out.println(message);
    }

    public static void main(String[] args) {
        // Создание экземпляра класса Methods
        Methods methods = new Methods();

        System.out.println("=== Метод без возвращаемого значения и без параметров ===");
        methods.methodWithoutReturnAndParameters();

        System.out.println("\n=== Метод без возвращаемого значения, но с параметрами ===");
        methods.methodWithoutReturnWithParameters("Алексей", 25);

        System.out.println("\n=== Метод с возвращаемым значением и без параметров ===");
        int result1 = methods.methodWithReturnAndNoParameters();
        System.out.println("Возвращенное значение: " + result1);

        System.out.println("\n=== Метод с возвращаемым значением и параметрами ===");
        int result2 = methods.methodWithReturnAndParameters(30); // вернет 60
        System.out.println("Возвращенное значение: " + result2);

        System.out.println("\n=== Метод с несколькими параметрами и возвращаемым значением ===");
        String result3 = methods.methodWithMultipleParameters("Мария", 28, true);
        System.out.println("Возвращенное значение: " + result3);

        System.out.println("\n=== Метод проверки взрослости ===");
        boolean adult = methods.isAdult(25);
        System.out.println("Человек взрослый: " + adult);

        System.out.println("\n=== Метод увеличения возраста ===");
        int newAge = methods.increaseAge(30);
        System.out.println("Новый возраст: " + newAge);

        System.out.println("\n=== Метод получения полной информации ===");
        String fullInfo = methods.getFullHumanInfo("Анна", 32, 170, 65, true);
        System.out.println("Полная информация: " + fullInfo);

        System.out.println("\n=== Метод сложения чисел ===");
        int sum = methods.numbersSum(15, 25);
        System.out.println("Сумма: " + sum);

        System.out.println("\n=== Метод вывода сообщения ===");
        methods.printMessage("Это тестовое сообщение");
    }
}