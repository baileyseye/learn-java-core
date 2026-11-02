package org.baileyseyes._7;

import java.util.*;

/**
 * Generics (обобщения / дженерики) — типы как параметры.
 * Дженерики позволяют писать код, работающий с ЛЮБЫМИ типами безопасно.
 * 
 * Синтаксис: class Container<T>, interface List<E>, method <K, V> getMap()
 * Тире <?> — wildcards: ? extends T, ? super T
 * 
 * @see org.baileyseyes._7.FileIO Предыдущая часть
 * @see org.baileyseyes._7.StreamAPI Следующая часть
 */
@SuppressWarnings("all")
public class GenericsDemo {

    // ===================== Базовый generic класс =====================

    /**
     * Generic-класс Container<T>: работает с любым типом.
     */
    static class Container<T> {
        private T value;

        public Container(T value) {
            this.value = value;
        }

        public T getValue() {
            return value;
        }

        public void setValue(T value) {
            this.value = value;
        }
    }

    public static void demonstrateBasicGeneric() {
        System.out.println("=== Базовый generic-класс ===");

        Container<String> stringContainer = new Container<>("Привет");
        System.out.println("Строка: " + stringContainer.getValue());

        Container<Integer> intContainer = new Container<>(42);
        System.out.println("Число: " + intContainer.getValue());

        // БЕЗ дженериков пришлось бы casting:
        Container rawContainer = new Container("Привет");
        String text = (String) rawContainer.getValue(); // ← cast, может выбросить ClassCastException!

        // С дженериками: компилятор проверяет тип АВТОМАТИЧЕСКИ!
        // String bad = new Container<>(42).getValue(); // ОШИБКА КОМПИЛЯЦИИ!
    }

    // ===================== Generic метод =====================

    /**
     * Generic-метод: <T> — тип определяется из аргументов.
     */
    public static <T> void printArray(T[] array) {
        System.out.print("[");
        for (int i = 0; i < array.length; i++) {
            if (i > 0) System.out.print(", ");
            System.out.print(array[i]);
        }
        System.out.println("]");
    }

    /**
     * Generic-метод с возвращаемым значением.
     */
    public static <T> T firstElement(List<T> list) {
        if (list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }

    public static void demonstrateGenericMethod() {
        System.out.println("\n=== Generic-методы ===");

        String[] strings = {"А", "Б", "В"};
        Integer[] ints = {1, 2, 3};
        Double[] doubles = {1.1, 2.2, 3.3};

        printArray(strings);  // [А, Б, В]
        printArray(ints);     // [1, 2, 3]
        printArray(doubles);  // [1.1, 2.2, 3.3]

        // firstElement
        List<String> names = Arrays.asList("Алексей", "Мария", "Иван");
        String first = firstElement(names);
        System.out.println("Первое имя: " + first); // Алексей
    }

    // ===================== Type Inference (вывод типов) =====================

    /**
     * Java 7+:Diamond operator <> — компилятор выводит тип из контекста.
     */
    public static void demonstrateTypeInference() {
        System.out.println("\n=== Вывод типов (Diamond operator) ===");

        // Java 7+: не нужно писать new HashMap<String, Integer>()
        Map<String, Integer> scores = new HashMap<>(); // ← <> — вывод типа!
        scores.put("Алексей", 95);
        scores.put("Мария", 88);

        // Без вывода типов (Java 6 и старее):
        // Map<String, Integer> scores = new HashMap<String, Integer>();

        // List<String> list = new ArrayList<>(); // ← <> выводит String из переменной
        List<String> list = new ArrayList<>();
        list.add("Элемент");

        // Но <> нельзя использовать справа от присваивания без типа:
        // var map = new HashMap<>(); // ← ошибка, нет контекста!
    }

    // ===================== Multiple Type Parameters =====================

    /**
     * Generic-класс с ДВУМЯ и БОЛЕЕ типами.
     */
    static class Pair<K, V> {
        private final K key;
        private final V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }

        @Override
        public String toString() {
            return "Pair<" + key.getClass().getSimpleName() + ", " +
                   value.getClass().getSimpleName() + "> = (" + key + ", " + value + ")";
        }
    }

    /**
     * Generic-метод с тремя типами.
     */
    public static <K, V, R> Map<K, R> transform(Map<K, V> map, java.util.function.Function<V, R> fn) {
        Map<K, R> result = new HashMap<>();
        for (Map.Entry<K, V> entry : map.entrySet()) {
            result.put(entry.getKey(), fn.apply(entry.getValue()));
        }
        return result;
    }

    public static void demonstrateMultipleTypes() {
        System.out.println("\n=== Множественные типы (K, V) ===");

        Pair<String, Integer> pair = new Pair<>("Возраст", 30);
        System.out.println(pair);

        // map<String, Integer> → map<String, String>
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Алексей", 25);
        ages.put("Мария", 30);
        ages.put("Иван", 35);

        Map<String, String> ageStrings = transform(ages, age -> age + " лет");
        System.out.println("Преобразованные: " + ageStrings);
    }

    // ===================== Wildcards =====================

    /**
     * <? extends T> — upper bound: любой тип, НАСЛЕДУЮЩИЙ T.
     * READ-ONLY: можем читать T, но НЕ можем добавлять (кроме null).
     */
    public static void demonstrateUpperBound() {
        System.out.println("\n=== Upper bound (? extends T) ===");

        List<Integer> ints = Arrays.asList(1, 2, 3, 4, 5);
        List<Double> doubles = Arrays.asList(1.1, 2.2);
        List<Number> numbers = new ArrayList<>();
        numbers.addAll(ints); // Integer extends Number
        numbers.addAll(doubles); // Double extends Number

        printSum(ints);    // OK
        printSum(doubles); // OK
        printSum(numbers); // OK
    }

    private static void printSum(List<? extends Number> numbers) {
        double sum = 0;
        for (Number n : numbers) {
            sum += n.doubleValue();
        }
        System.out.println("Сумма: " + sum);
    }

    /**
     * <? super T> — lower bound: любой тип, ЯВЛЯЮЩИЙСЯ ПРЕДКОМ T.
     * WRITE-ONLY: можем добавлять T, но не знаем, какого типа будут элементы.
     */
    public static void demonstrateLowerBound() {
        System.out.println("\n=== Lower bound (? super T) ===");

        List<Number> numbers = new ArrayList<>();
        List<Object> objects = new ArrayList<>();

        addNumbers(numbers);   // OK: Number super Integer
        addNumbers(objects);   // OK: Object super Integer
    }

    private static void addNumbers(List<? super Integer> list) {
        list.add(42);
        list.add(100);
        System.out.println("Добавлено в: " + list);
    }

    /**
     * PECS: Producer Extends, Consumer Super.
     * — Если коллекция ПРОИЗВОДИТ данные (для чтения) → extends
     * — Если коллекция ПОТРЕБЛЯЕТ данные (для записи) → super
     */
    public static void demonstratePECS() {
        System.out.println("\n=== PECS (Producer Extends, Consumer Super) ===");

        // Producer (читаем из коллекции) — extends
        List<Integer> source = Arrays.asList(1, 2, 3);
        consumeSource(source); // OK

        // Consumer (пишем в коллекцию) — super
        List<Object> target = new ArrayList<>();
        writeToTarget(target); // OK
    }

    private static void consumeSource(List<? extends Number> source) {
        for (Number n : source) {
            System.out.print(n + " ");
        }
        System.out.println();
    }

    private static void writeToTarget(List<? super Integer> target) {
        target.add(1);
        target.add(2);
        target.add(3);
    }

    // ===================== Бounded Wildcards =====================

    /**
     * Бounded wildcard — ограничение типа.
     */
    public static void demonstrateBoundedWildcard() {
        System.out.println("\n=== Bounded wildcard ===");

        // Список чисел — можем считать
        List<Integer> numbers = Arrays.asList(10, 20, 30);
        findMax(numbers); // 30

        // Если передать String — ОШИБКА: String не extends Number
    }

    private static void findMax(List<? extends Number> list) {
        Number max = null;
        for (Number n : list) {
            if (max == null || n.doubleValue() > max.doubleValue()) {
                max = n;
            }
        }
        System.out.println("Максимум: " + max);
    }

    // ===================== Generic vs raw type =====================

    /**
     * Raw type (без дженериков) — ОПАСНО!
     */
    public static void demonstrateRawTypeDanger() {
        System.out.println("\n=== Опасность raw type ===");

        // Raw type — нет проверки типов!
        List rawList = new ArrayList();
        rawList.add("Строка");
        rawList.add(42);          // Integer — компилятор НЕ предупреждает!
        rawList.add(new Object());

        // При чтении — приходится кастовать, и можно получить ClassCastException!
        String s = (String) rawList.get(0); // OK
        // String bad = (String) rawList.get(1); // ClassCastException!

        System.out.println("Первый элемент: " + s);

        // С дженериками — компилятор НЕ ДАСТ добавить Integer в List<String>!
        List<String> safeList = new ArrayList<>();
        safeList.add("Строка");
        // safeList.add(42); // ← ОШИБКА КОМПИЛЯЦИИ!
    }

    // ===================== Generic интерфейс =====================

    /**
     * Generic-интерфейс.
     */
    interface Repository<E> {
        void save(E entity);
        E findById(int id);
        List<E> findAll();
    }

    static class UserRepository implements Repository<String> {
        private final Map<Integer, String> store = new HashMap<>();

        @Override
        public void save(String entity) {
            store.put(store.size() + 1, entity);
            System.out.println("Сохранён: " + entity);
        }

        @Override
        public String findById(int id) {
            return store.get(id);
        }

        @Override
        public List<String> findAll() {
            return new ArrayList<>(store.values());
        }
    }

    /**
     * Generic класс реализующий generic интерфейс.
     */
    static class GenericRepository<E> implements Repository<E> {
        private final List<E> store = new ArrayList<>();

        @Override
        public void save(E entity) {
            store.add(entity);
            System.out.println("Сохранён: " + entity);
        }

        @Override
        public E findById(int id) {
            if (id >= 0 && id < store.size()) {
                return store.get(id);
            }
            return null;
        }

        @Override
        public List<E> findAll() {
            return new ArrayList<>(store);
        }
    }

    public static void demonstrateGenericInterface() {
        System.out.println("\n=== Generic интерфейс ===");

        // Конкретный тип
        UserRepository userRepo = new UserRepository();
        userRepo.save("Алексей");
        userRepo.save("Мария");
        System.out.println("Все пользователи: " + userRepo.findAll());

        // Generic тип
        GenericRepository<String> repo = new GenericRepository<>();
        repo.save("Первый");
        repo.save("Второй");
        System.out.println("Найдено по ID=0: " + repo.findById(0));
        System.out.println("Все: " + repo.findAll());
    }

    // ===================== Generic enum =====================

    /**
     * Generic enum (Java 5+) — ограничивает тип значением enum.
     */
    enum Status { PENDING, RUNNING, DONE, ERROR }

    static class Task<T> {
        private final T data;
        private final Status status;

        public Task(T data, Status status) {
            this.data = data;
            this.status = status;
        }

        public T getData() { return data; }
        public Status getStatus() { return status; }
    }

    public static void demonstrateGenericEnum() {
        System.out.println("\n=== Generic + enum ===");

        Task<String> task1 = new Task<>("Обработка файла", Status.DONE);
        Task<Integer> task2 = new Task<>(42, Status.RUNNING);
        Task<Double> task3 = new Task<>(3.14, Status.PENDING);

        System.out.println(task1.getData() + " — " + task1.getStatus());
        System.out.println(task2.getData() + " — " + task2.getStatus());
        System.out.println(task3.getData() + " — " + task3.getStatus());
    }

    // ===================== Generic в циклах =====================

    /**
     * Дженерики в цикле forEach.
     */
    public static void demonstrateForEach() {
        System.out.println("\n=== forEach с дженериками ===");

        Map<String, List<Integer>> scores = new HashMap<>();
        scores.put("Алексей", Arrays.asList(85, 90, 78));
        scores.put("Мария", Arrays.asList(92, 88, 95));

        for (Map.Entry<String, List<Integer>> entry : scores.entrySet()) {
            String name = entry.getKey();
            List<Integer> grades = entry.getValue();
            int avg = grades.stream().mapToInt(Integer::intValue).sum() / grades.size();
            System.out.println(name + ": средний балл = " + avg);
        }
    }

    // ===================== Diamond с анонимным классом =====================

    /**
     * Diamond <> с анонимными классами.
     */
    public static void demonstrateDiamondWithAnonymous() {
        System.out.println("\n=== Diamond с анонимным классом ===");

        // Java 8+: <> работает даже с анонимными классами!
        java.util.Comparator<String> byLength = new java.util.Comparator<>() {
            @Override
            public int compare(String a, String b) {
                return Integer.compare(a.length(), b.length());
            }
        };

        List<String> words = Arrays.asList("короткий", "длинный", "средний");
        words.sort(byLength);
        System.out.println("По длине: " + words);
    }

    // ===================== Generic метод с несколькими типами =====================

    /**
     * Swap элементов массива — generic.
     */
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    /**
     * Бинарный поиск — generic с Comparator.
     */
    public static <T> int binarySearch(T[] array, T key, java.util.Comparator<? super T> comp) {
        int low = 0;
        int high = array.length - 1;

        while (low <= high) {
            int mid = (low + high) >>> 1;
            int cmp = comp.compare(array[mid], key);
            if (cmp < 0) low = mid + 1;
            else if (cmp > 0) high = mid - 1;
            else return mid; // found
        }
        return -(low + 1); // not found
    }

    public static void demonstrateGenericAlgorithms() {
        System.out.println("\n=== Generic алгоритмы ===");

        // Swap
        String[] names = {"Алиса", "Боб", "Чарли"};
        swap(names, 0, 2);
        System.out.println("После swap: " + java.util.Arrays.toString(names));

        // Binary search (требует отсортированный массив!)
        Integer[] numbers = {10, 20, 30, 40, 50};
        int index = binarySearch(numbers, 30, Integer::compareTo);
        System.out.println("Поиск 30: индекс " + index); // 2
    }

    public static void main(String[] args) {
        System.out.println("=== Generics (дженерики) ===");
        demonstrateBasicGeneric();
        demonstrateGenericMethod();
        demonstrateTypeInference();
        demonstrateMultipleTypes();
        demonstrateUpperBound();
        demonstrateLowerBound();
        demonstratePECS();
        demonstrateBoundedWildcard();
        demonstrateRawTypeDanger();
        demonstrateGenericInterface();
        demonstrateGenericEnum();
        demonstrateForEach();
        demonstrateDiamondWithAnonymous();
        demonstrateGenericAlgorithms();
    }
}
