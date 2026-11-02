package org.baileyseyes._7;

import java.util.Arrays;
import java.util.List;
import java.util.function.*;

/**
 * Функциональные интерфейсы Java (java.util.function).
 * — Predicate<T>: T → boolean (проверка, фильтрация)
 * — Consumer<T>: T → void (обработка, печать)
 * — Function<T, R>: T → R (преобразование)
 * — Supplier<T>: () → T (генерация значения)
 * — BiFunction<T, U, R>: (T, U) → R (обработка двух аргументов)
 * — UnaryOperator<T>: T → T (преобразование того же типа)
 *
 * Это основа Stream API и лямбда-выражений.
 *
 * @see org.baileyseyes._7.StreamAPI Следующая часть
 */
@SuppressWarnings("all")
public class FunctionalInterfaces {

    // ===================== Predicate =====================

    /**
     * Predicate: функция, которая проверяет и возвращает true/false.
     * Основной метод: boolean test(T t)
     * Методы and(), or(), negate() для комбинирования.
     */
    public static void demonstratePredicate() {
        System.out.println("=== Predicate ===");

        List<String> names = Arrays.asList("Алексей", "Мария", "Иван", "Анна", "Дмитрий");

        // Предикат: начинается с буквы А
        Predicate<String> startsWithA = name -> name.startsWith("А");

        // Предикат: длина больше 4
        Predicate<String> longEnough = name -> name.length() > 4;

        // Комбинируем: начинается с А ИЛИ длина > 5
        Predicate<String> filter = startsWithA.or(longEnough);

        List<String> result = names.stream()
                .filter(filter)
                .toList();
        System.out.println("Отфильтровано: " + result);
        // Алексей, Анна, Дмитрий
    }

    /**
     * Negate: инвертировать предикат.
     */
    public static void demonstratePredicateNegate() {
        System.out.println("\n=== Predicate.negate() ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        Predicate<Integer> isEven = n -> n % 2 == 0;

        // negate() — берём НЕ чётные (нечётные)
        List<Integer> oddNumbers = numbers.stream()
                .filter(isEven.negate())
                .toList();
        System.out.println("Нечётные: " + oddNumbers);
    }

    // ===================== Consumer =====================

    /**
     * Consumer: функция, которая что-то делает с аргументом (ничего не возвращает).
     * Основной метод: void accept(T t)
     * Метод andThen() для цепочки обработчиков.
     */
    public static void demonstrateConsumer() {
        System.out.println("\n=== Consumer ===");

        List<String> words = Arrays.asList("Hello", "World", "Java");

        // Печатаем каждое слово
        Consumer<String> printer = word -> System.out.println("Печать: " + word);

        words.forEach(printer); // forEach — это consumer!
    }

    /**
     * andThen: цепочка обработчиков.
     */
    public static void demonstrateConsumerAndThen() {
        System.out.println("\n=== Consumer.andThen() ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        Consumer<Integer> doubler = n -> System.out.print(n * 2 + " ");
        Consumer<Integer> suffixer = n -> System.out.print(" → " + (n * 2 > 5 ? "чётное" : "нечётное"));

        // Сначала удвоить, потом определить чётность
        Consumer<Integer> combined = doubler.andThen(suffixer);

        numbers.forEach(combined);
        System.out.println();
    }

    // ===================== Function =====================

    /**
     * Function: функция, которая преобразует T в R.
     * Основной метод: R apply(T t)
     * Методы andThen(), compose() для цепочек.
     */
    public static void demonstrateFunction() {
        System.out.println("\n=== Function ===");

        List<String> names = Arrays.asList("алексей", "мария", "иван");

        // Преобразуем: lowercase → uppercase → capitalize
        Function<String, String> toUpper = String::toUpperCase;
        Function<String, String> capitalize = s -> s.substring(0, 1).toUpperCase() + s.substring(1);

        List<String> capitalized = names.stream()
                .map(toUpper.andThen(capitalize))
                .toList();
        System.out.println("Capitalized: " + capitalized);
    }

    /**
     * compose: применяем сначала compose-функцию, потом основную.
     * compose(f) = this(f(x))
     * andThen(f) = f(this(x))
     */
    public static void demonstrateCompose() {
        System.out.println("\n=== Function.compose() ===");

        Function<Integer, Integer> multiplyBy2 = x -> x * 2;
        Function<Integer, Integer> add10 = x -> x + 10;

        // compose: сначала add10, потом multiplyBy2 → (x + 10) * 2
        Function<Integer, Integer> composed = multiplyBy2.compose(add10);
        System.out.println("composed.apply(5) = " + composed.apply(5)); // (5 + 10) * 2 = 30

        // andThen: сначала multiplyBy2, потом add10 → (x * 2) + 10
        Function<Integer, Integer> thenApplied = multiplyBy2.andThen(add10);
        System.out.println("thenApplied.apply(5) = " + thenApplied.apply(5)); // (5 * 2) + 10 = 20
    }

    /**
     * Function.identity(): стандартная функция, возвращающая аргумент без изменений.
     * Полезно как «ничего не делать» в коллекторах.
     */
    public static void demonstrateIdentity() {
        System.out.println("\n=== Function.identity() ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3);

        List<Integer> copied = numbers.stream()
                .map(Function.identity())
                .toList();
        System.out.println("Копия: " + copied);
    }

    // ===================== Supplier =====================

    /**
     * Supplier: функция, которая НЕ принимает аргументов, но возвращает значение.
     * Основной метод: T get()
     * Используется для ленивой инициализации, генераторов, фабрик.
     */
    public static void demonstrateSupplier() {
        System.out.println("\n=== Supplier ===");

        // Генератор случайных чисел
        Supplier<Double> randomSupplier = Math::random;

        System.out.println("Случайное число 1: " + randomSupplier.get());
        System.out.println("Случайное число 2: " + randomSupplier.get());
        System.out.println("Случайное число 3: " + randomSupplier.get());
    }

    /**
     * Ленивая инициализация с Supplier:
     * Значение вычисляется только при первом вызове.
     */
    static class LazyLoader {
        private Supplier<String> dataSupplier;
        private String cachedValue;
        private boolean loaded = false;

        public LazyLoader(Supplier<String> supplier) {
            this.dataSupplier = supplier;
        }

        public String load() {
            if (!loaded) {
                System.out.println("Вычисляем значение впервые...");
                this.cachedValue = dataSupplier.get(); // вычисляем только один раз
                this.loaded = true;
            }
            return cachedValue;
        }
    }

    public static void demonstrateLazyLoading() {
        System.out.println("\n=== Ленивая загрузка (Supplier) ===");

        LazyLoader loader = new LazyLoader(() -> {
            System.out.println("Долгое вычисление...");
            return "Готово!";
        });

        System.out.println("Первый вызов: " + loader.load());
        System.out.println("Второй вызов: " + loader.load()); // без вычисления!
    }

    // ===================== BiFunction =====================

    /**
     * BiFunction: функция с ДВУМЯ аргументами.
     * Основной метод: R apply(T t, U u)
     */
    public static void demonstrateBiFunction() {
        System.out.println("\n=== BiFunction ===");

        BiFunction<Double, Double, Double> add = (a, b) -> a + b;
        BiFunction<Double, Double, Double> multiply = (a, b) -> a * b;

        System.out.println("10 + 5 = " + add.apply(10.0, 5.0));
        System.out.println("10 * 5 = " + multiply.apply(10.0, 5.0));

        // Комбинируем: сначала сложить, потом умножить на 2
        BiFunction<Double, Double, Double> combined = (a, b) -> multiply.apply(add.apply(a, b), 2.0);
        System.out.println("(10 + 5) * 2 = " + combined.apply(10.0, 5.0));
    }

    /**
     * DoubleBinaryOperator: BiFunction для double (без boxing).
     */
    public static void demonstratePrimitiveBiFunction() {
        System.out.println("\n=== DoubleBinaryOperator ===");

        java.util.function.DoubleBinaryOperator sum = (a, b) -> a + b;
        java.util.function.DoubleBinaryOperator product = (a, b) -> a * b;

        System.out.println("Сумма: " + sum.applyAsDouble(3.14, 2.72));
        System.out.println("Произведение: " + product.applyAsDouble(3.14, 2.72));
    }

    // ===================== UnaryOperator =====================

    /**
     * UnaryOperator: Function, где вход и выход одного типа.
     * T → T. Специализация Function<T, T>.
     */
    public static void demonstrateUnaryOperator() {
        System.out.println("\n=== UnaryOperator ===");

        List<String> words = Arrays.asList("hello", "world", "java");

        java.util.function.UnaryOperator<String> capitalize =
                s -> s.substring(0, 1).toUpperCase() + s.substring(1);

        List<String> result = words.stream()
                .map(capitalize)
                .toList();
        System.out.println("Capitalized: " + result);

        // UnaryOperator для чисел
        java.util.function.UnaryOperator<Integer> doubleIt = x -> x * 2;
        List<Integer> doubled = Arrays.asList(1, 2, 3).stream()
                .map(doubleIt)
                .toList();
        System.out.println("Удвоенные: " + doubled);
    }

    // ===================== IntPredicate, LongConsumer и т.д. =====================

    /**
     * Примитивные варианты функциональных интерфейсов:
     * IntPredicate, LongConsumer, DoubleFunction и др.
     * Избегают autoboxing (Integer → int), что важнее для производительности.
     */
    public static void demonstratePrimitiveTypes() {
        System.out.println("\n=== Примитивные функциональные интерфейсы ===");

        java.util.function.IntPredicate isEven = n -> n % 2 == 0;
        java.util.function.IntPredicate isPositive = n -> n > 0;

        int count = java.util.stream.IntStream.rangeClosed(-5, 10)
                .filter(isEven)
                .filter(isPositive)
                .map(i -> i * i)
                .sum();
        System.out.println("Сумма квадратов чётных положительных: " + count);
    }

    // ===================== Реальный пример =====================

    /**
     * Реальный пример: обработка данных с разными функциями.
     */
    public static void demonstrateRealWorldExample() {
        System.out.println("\n=== Реальный пример: обработка данных ===");

        List<String> rawData = Arrays.asList("100", "200", "abc", "300", "400");

        // Функция парсинга
        Function<String, Integer> parse = s -> Integer.parseInt(s.trim());

        // Предикат для валидации
        Predicate<Integer> isValid = n -> n > 0;

        // Consumer для вывода
        Consumer<Integer> print = n -> System.out.println("  Обработано: " + n);

        List<Integer> result = rawData.stream()
                .filter(s -> {
                    try {
                        int value = parse.apply(s);
                        return isValid.test(value);
                    } catch (NumberFormatException e) {
                        return false;
                    }
                })
                .map(Integer::parseInt)
                .peek(print)
                .toList();

        System.out.println("Итог: " + result);
    }

    public static void main(String[] args) {
        System.out.println("=== Функциональные интерфейсы ===");
        demonstratePredicate();
        demonstratePredicateNegate();
        demonstrateConsumer();
        demonstrateConsumerAndThen();
        demonstrateFunction();
        demonstrateCompose();
        demonstrateIdentity();
        demonstrateSupplier();
        demonstrateLazyLoading();
        demonstrateBiFunction();
        demonstratePrimitiveBiFunction();
        demonstrateUnaryOperator();
        demonstratePrimitiveTypes();
        demonstrateRealWorldExample();
    }
}
