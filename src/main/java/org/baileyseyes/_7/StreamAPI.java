package org.baileyseyes._7;

import java.util.Arrays;
import java.util.Comparator;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @see Else Предыдущая часть
 */
@SuppressWarnings("all")
public class StreamAPI {

    /**
     * Демонстрация создания стримов.
     */
    public static void demonstrateStreamCreation() {
        System.out.println("=== Stream Creation ===");

        // Создание стрима из коллекции
        List<String> list = Arrays.asList("A", "B", "C", "D");
        Stream<String> stream1 = list.stream();

        // Создание стрима из массива
        String[] array = {"X", "Y", "Z"};
        Stream<String> stream2 = Arrays.stream(array);

        // Создание стрима из значений
        Stream<String> stream3 = Stream.of("P", "Q", "R");

        // Создание пустого стрима
        Stream<String> emptyStream = Stream.empty();

        // Создание стрима с помощью Stream.builder()
        Stream<String> builderStream = Stream.<String>builder()
            .add("Builder1")
            .add("Builder2")
            .build();

        System.out.println("Stream from collection: " + list);
        System.out.println("Stream from array: " + Arrays.toString(array));
        System.out.println("Stream from values: " + stream3.toList());
    }

    /**
     * Демонстрация методов filter().
     */
    public static void demonstrateFilter() {
        System.out.println("\n=== Filter Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Фильтрация четных чисел
        List<Integer> evenNumbers = numbers.stream()
            .filter(n -> n % 2 == 0)
            .toList();
        System.out.println("Even numbers: " + evenNumbers);

        // Фильтрация по длине строки
        List<String> words = Arrays.asList("Hello", "Java", "Stream", "API", "Programming");
        List<String> longWords = words.stream()
            .filter(word -> word.length() > 4)
            .toList();
        System.out.println("Words longer than 4 chars: " + longWords);

        // Сложные фильтры
        List<Integer> filtered = numbers.stream()
            .filter(n -> n > 3)
            .filter(n -> n < 8)
            .toList();
        System.out.println("Numbers between 3 and 8: " + filtered);
    }

    /**
     * Демонстрация методов map().
     */
    public static void demonstrateMap() {
        System.out.println("\n=== Map Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Преобразование чисел в их квадраты
        List<Integer> squares = numbers.stream()
            .map(n -> n * n)
            .toList();
        System.out.println("Squares: " + squares);

        // Преобразование строк в длины
        List<String> words = Arrays.asList("Hello", "World", "Java", "Stream");
        List<Integer> lengths = words.stream()
            .map(String::length)
            .toList();
        System.out.println("Word lengths: " + lengths);

        // Преобразование в объекты
        List<String> upperCase = words.stream()
            .map(String::toUpperCase)
            .toList();
        System.out.println("Uppercase words: " + upperCase);
    }

    /**
     * Демонстрация методов flatMap().
     */
    public static void demonstrateFlatMap() {
        System.out.println("\n=== FlatMap Method ===");

        List<List<Integer>> nestedLists = Arrays.asList(
            Arrays.asList(1, 2),
            Arrays.asList(3, 4),
            Arrays.asList(5, 6)
        );

        List<Integer> flattened = nestedLists.stream()
            .flatMap(List::stream)
            .toList();
        System.out.println("Flattened list: " + flattened);

        // Работа со строками
        List<String> sentences = Arrays.asList("Hello World", "Java Stream", "API Example");
        List<String> words = sentences.stream()
            .map(sentence -> sentence.split(" "))
            .flatMap(Arrays::stream)
            .toList();
        System.out.println("Words from sentences: " + words);
    }

    /**
     * Демонстрация методов distinct().
     */
    public static void demonstrateDistinct() {
        System.out.println("\n=== Distinct Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 4, 4, 5, 5, 5);

        // Удаление дубликатов
        List<Integer> uniqueNumbers = numbers.stream()
            .distinct()
            .toList();
        System.out.println("Unique numbers: " + uniqueNumbers);

        // Работа со строками
        List<String> words = Arrays.asList("Apple", "Banana", "Apple", "Cherry", "Banana");
        List<String> uniqueWords = words.stream()
            .distinct()
            .toList();
        System.out.println("Unique words: " + uniqueWords);
    }

    /**
     * Демонстрация методов sorted().
     */
    public static void demonstrateSorted() {
        System.out.println("\n=== Sorted Method ===");

        List<String> words = Arrays.asList("Banana", "Apple", "Cherry", "Date");

        // Сортировка по умолчанию
        List<String> sorted = words.stream()
            .sorted()
            .toList();
        System.out.println("Alphabetically sorted: " + sorted);

        // Сортировка с компаратором
        List<String> reverseSorted = words.stream()
            .sorted(Comparator.reverseOrder())
            .toList();
        System.out.println("Reverse sorted: " + reverseSorted);

        // Сортировка по длине
        List<String> sortByLength = words.stream()
            .sorted(Comparator.comparing(String::length))
            .toList();
        System.out.println("Sorted by length: " + sortByLength);
    }

    /**
     * Демонстрация методов limit() и skip().
     */
    public static void demonstrateLimitSkip() {
        System.out.println("\n=== Limit and Skip Methods ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Ограничение количества элементов
        List<Integer> limited = numbers.stream()
            .limit(5)
            .toList();
        System.out.println("First 5 numbers: " + limited);

        // Пропуск элементов
        List<Integer> skipped = numbers.stream()
            .skip(5)
            .toList();
        System.out.println("Numbers after skipping first 5: " + skipped);

        // Комбинация limit и skip
        List<Integer> limitSkip = numbers.stream()
            .skip(2)
            .limit(3)
            .toList();
        System.out.println("Skip 2, take 3: " + limitSkip);
    }

    /**
     * Демонстрация методов peek().
     */
    public static void demonstratePeek() {
        System.out.println("\n=== Peek Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Использование peek для отладки
        List<Integer> result = numbers.stream()
            .peek(n -> System.out.println("Processing: " + n))
            .map(n -> n * 2)
            .peek(n -> System.out.println("After map: " + n))
            .toList();
        System.out.println("Final result: " + result);
    }

    /**
     * Демонстрация методов reduce().
     */
    public static void demonstrateReduce() {
        System.out.println("\n=== Reduce Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Суммирование
        Optional<Integer> sum = numbers.stream()
            .reduce(Integer::sum);
        System.out.println("Sum: " + sum.orElse(0));

        // Суммирование с начальным значением
        int sumWithInit = numbers.stream()
            .reduce(10, Integer::sum);
        System.out.println("Sum with initial value 10: " + sumWithInit);

        // Конкатенация строк
        List<String> words = Arrays.asList("Hello", " ", "World", "!");
        Optional<String> sentence = words.stream()
            .reduce(String::concat);
        System.out.println("Sentence: " + sentence.orElse(""));

        // Максимальное значение
        Optional<Integer> max = numbers.stream()
            .reduce(Integer::max);
        System.out.println("Maximum: " + max.orElse(0));
    }

    /**
     * Демонстрация методов collect().
     */
    public static void demonstrateCollect() {
        System.out.println("\n=== Collect Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Сбор в список
        List<Integer> list = numbers.stream()
            .collect(Collectors.toList());
        System.out.println("Collected to list: " + list);

        // Сбор в массив
        Integer[] array = numbers.stream()
            .toArray(Integer[]::new);
        System.out.println("Collected to array: " + Arrays.toString(array));

        // Сбор в Set
        Set<Integer> set = numbers.stream()
            .collect(Collectors.toSet());
        System.out.println("Collected to set: " + set);

        // Сбор в Map
        Map<Integer, String> map = numbers.stream()
            .collect(Collectors.toMap(
                n -> n,
                n -> "Number_" + n
            ));
        System.out.println("Collected to map: " + map);

        // Сбор в строку
        String joined = numbers.stream()
            .map(String::valueOf)
            .collect(Collectors.joining(", "));
        System.out.println("Joined string: " + joined);
    }

    /**
     * Демонстрация методов min() и max().
     */
    public static void demonstrateMinMaxLength() {
        System.out.println("\n=== Min and Max Methods ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Минимальное значение
        Optional<Integer> min = numbers.stream()
            .min(Integer::compareTo);
        System.out.println("Minimum: " + min.orElse(0));

        // Максимальное значение
        Optional<Integer> max = numbers.stream()
            .max(Integer::compareTo);
        System.out.println("Maximum: " + max.orElse(0));

        // Минимальное по критерию
        List<String> words = Arrays.asList("Apple", "Banana", "Cherry", "Date");
        Optional<String> shortest = words.stream()
            .min(Comparator.comparing(String::length));
        System.out.println("Shortest word: " + shortest.orElse(""));
    }

    /**
     * Демонстрация методов count(), anyMatch(), allMatch(), noneMatch().
     */
    public static void demonstrateTerminalOperations() {
        System.out.println("\n=== Terminal Operations ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Подсчет элементов
        long count = numbers.stream().count();
        System.out.println("Total count: " + count);

        // Проверка наличия элементов
        boolean anyEven = numbers.stream().anyMatch(n -> n % 2 == 0);
        System.out.println("Any even number: " + anyEven);

        boolean allEven = numbers.stream().allMatch(n -> n % 2 == 0);
        System.out.println("All even numbers: " + allEven);

        boolean noneNegative = numbers.stream().noneMatch(n -> n < 0);
        System.out.println("No negative numbers: " + noneNegative);

        // Поиск первого элемента
        Optional<Integer> first = numbers.stream().findFirst();
        System.out.println("First element: " + first.orElse(0));

        // Поиск любого элемента
        Optional<Integer> any = numbers.stream().findAny();
        System.out.println("Any element: " + any.orElse(0));
    }

    /**
     * Демонстрация методов groupingBy().
     */
    public static void demonstrateGroupingBy() {
        System.out.println("\n=== GroupingBy Method ===");

        List<String> words = Arrays.asList("Apple", "Banana", "Cherry", "Date", "Elderberry");

        // Группировка по длине строки
        Map<Integer, List<String>> groupedByLength = words.stream()
            .collect(Collectors.groupingBy(String::length));
        System.out.println("Grouped by length: " + groupedByLength);

        // Группировка по первой букве
        Map<Character, List<String>> groupedByFirstLetter = words.stream()
            .collect(Collectors.groupingBy(word -> word.charAt(0)));
        System.out.println("Grouped by first letter: " + groupedByFirstLetter);

        // Группировка с подсчетом
        Map<Integer, Long> countByLength = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));
        System.out.println("Count by length: " + countByLength);
    }

    /**
     * Демонстрация методов partitioningBy().
     */
    public static void demonstratePartitioningBy() {
        System.out.println("\n=== PartitioningBy Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Разделение на четные и нечетные
        Map<Boolean, List<Integer>> partitioned = numbers.stream()
            .collect(Collectors.partitioningBy(n -> n % 2 == 0));
        System.out.println("Even and odd numbers: " + partitioned);

        // Разделение с дополнительной группировкой
        Map<Boolean, Map<Integer, List<Integer>>> complexPartition = numbers.stream()
            .collect(Collectors.partitioningBy(
                n -> n % 2 == 0,
                Collectors.groupingBy(n -> n % 3)
            ));
        System.out.println("Complex partition: " + complexPartition);
    }

    /**
     * Демонстрация методов mapping().
     */
    public static void demonstrateMapping() {
        System.out.println("\n=== Mapping Method ===");

        List<Person> people = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 35)
        );

        // Извлечение и преобразование полей
        List<String> names = people.stream()
            .map(Person::getName)
            .collect(Collectors.toList());
        System.out.println("Names: " + names);

        // Группировка с маппингом
        Map<Integer, List<String>> groupedByAge = people.stream()
            .collect(Collectors.groupingBy(
                Person::getAge,
                Collectors.mapping(Person::getName, Collectors.toList())
            ));
        System.out.println("Grouped by age with names: " + groupedByAge);
    }

    /**
     * Демонстрация методов collectingAndThen().
     */
    public static void demonstrateCollectingAndThen() {
        System.out.println("\n=== CollectingAndThen Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Сбор в список и преобразование в строку
        String result = numbers.stream()
            .collect(Collectors.collectingAndThen(
                Collectors.toList(),
                list -> "List contains " + list.size() + " elements"
            ));
        System.out.println(result);
    }

    /**
     * Демонстрация методов averaging(), summing(), summarizing().
     */
    public static void demonstrateStatistics() {
        System.out.println("\n=== Statistics Methods ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Среднее значение
        double average = numbers.stream()
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0.0);
        System.out.println("Average: " + average);

        // Сумма
        int sum = numbers.stream()
            .mapToInt(Integer::intValue)
            .sum();
        System.out.println("Sum: " + sum);

        // Статистика
        IntSummaryStatistics stats = numbers.stream()
            .mapToInt(Integer::intValue)
            .summaryStatistics();
        System.out.println("Statistics - Count: " + stats.getCount() +
            ", Min: " + stats.getMin() +
            ", Max: " + stats.getMax() +
            ", Average: " + stats.getAverage() +
            ", Sum: " + stats.getSum());
    }

    /**
     * Демонстрация параллельных стримов.
     */
    public static void demonstrateParallelStreams() {
        System.out.println("\n=== Parallel Streams ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Последовательный стрим
        long startTime = System.nanoTime();
        List<Integer> sequential = numbers.stream()
            .map(n -> n * n)
            .collect(Collectors.toList());
        long sequentialTime = System.nanoTime() - startTime;

        // Параллельный стрим
        startTime = System.nanoTime();
        List<Integer> parallel = numbers.parallelStream()
            .map(n -> n * n)
            .collect(Collectors.toList());
        long parallelTime = System.nanoTime() - startTime;

        System.out.println("Sequential time: " + sequentialTime / 1000000.0 + " ms");
        System.out.println("Parallel time: " + parallelTime / 1000000.0 + " ms");
        System.out.println("Results equal: " + sequential.equals(parallel));
    }

    static class Person {
        private String name;
        private int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public int getAge() {
            return age;
        }
    }

    public static void main(String[] args) {
        demonstrateStreamCreation();
        demonstrateFilter();
        demonstrateMap();
        demonstrateFlatMap();
        demonstrateDistinct();
        demonstrateSorted();
        demonstrateLimitSkip();
        demonstratePeek();
        demonstrateReduce();
        demonstrateCollect();
        demonstrateMinMaxLength();
        demonstrateTerminalOperations();
        demonstrateGroupingBy();
        demonstratePartitioningBy();
        demonstrateMapping();
        demonstrateCollectingAndThen();
        demonstrateStatistics();
        demonstrateParallelStreams();
    }
}
