package org.baileyseyes._5;

import java.util.*;

/**
 * Collections — утилиты для работы с коллекциями.
 * static методы: sort(), shuffle(), fill(), repeat(), singleton(), emptyList()
 * Collections.unmodifiableList() — защитный wrapper.
 * Collections.synchronizedList() — потокобезопасная обёртка.
 *
 * @see org.baileyseyes._5.QueueAndDeque Предыдущая часть
 * @see org.baileyseyes._6.CompletableFutureDemo Следующая часть
 */
@SuppressWarnings("all")
public class CollectionsUtils {

    /**
     * Collections.sort() — сортировка списка.
     * Метод сортирует список НА МЕСТЕ (mutates).
     */
    public static void demonstrateSort() {
        System.out.println("=== Collections.sort() ===");

        List<String> names = new ArrayList<>(Arrays.asList("Чарли", "Алиса", "Боб", "Дана"));
        System.out.println("До сортировки: " + names);

        Collections.sort(names);
        System.out.println("После sort(): " + names);

        // Обратная сортировка — Collections.reverseOrder()
        Collections.sort(names, Collections.reverseOrder());
        System.out.println("reverseOrder: " + names);
    }

    /**
     * Collections.shuffle() — перемешивание.
     * Как перетасовка колоды карт.
     */
    public static void demonstrateShuffle() {
        System.out.println("\n=== Collections.shuffle() ===");

        List<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            numbers.add(i);
        }
        System.out.println("До: " + numbers);

        Collections.shuffle(numbers);
        System.out.println("После shuffle: " + numbers);

        Collections.shuffle(numbers);
        System.out.println("Ещё раз shuffle: " + numbers);
    }

    /**
     * Collections.fill() — заполнение списка одним значением.
     */
    public static void demonstrateFill() {
        System.out.println("\n=== Collections.fill() ===");

        List<String> words = new ArrayList<>(Collections.nCopies(5, "Hello"));
        System.out.println("nCopies(5, 'Hello'): " + words);

        Collections.fill(words, "World");
        System.out.println("После fill('World'): " + words);
    }

    /**
     * Collections.copy() — копирование из одной коллекции в другую.
     * ВАЖНО: целевая коллекция должна быть НЕ МЕНЬШЕ исходной!
     */
    public static void demonstrateCopy() {
        System.out.println("\n=== Collections.copy() ===");

        List<String> source = Arrays.asList("Один", "Два", "Три");
        List<String> target = new ArrayList<>(Collections.nCopies(source.size(), ""));
        System.out.println("Target до: " + target);

        Collections.copy(target, source);
        System.out.println("Target после: " + target);
    }

    /**
     * Collections.swap(), rotate(), reverse() — перестановки элементов.
     */
    public static void demonstrateSwaps() {
        System.out.println("\n=== swap(), rotate(), reverse() ===");

        List<String> items = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
        System.out.println("Исходный: " + items);

        // swap — поменять местами два элемента
        Collections.swap(items, 0, 4);
        System.out.println("После swap(0,4): " + items);

        // rotate — сдвинуть элементы циклически
        Collections.rotate(items, 2);
        System.out.println("После rotate(2): " + items);

        // reverse — перевернуть список
        Collections.reverse(items);
        System.out.println("После reverse(): " + items);
    }

    /**
     * Collections.binarySearch() — бинарный поиск.
     * Сортировка ОБЯЗАТЕЛЬНА! Иначе результат неопределён.
     */
    public static void demonstrateBinarySearch() {
        System.out.println("\n=== Collections.binarySearch() ===");

        List<Integer> numbers = new ArrayList<>(Arrays.asList(10, 20, 30, 40, 50, 60, 70, 80, 90));
        System.out.println("Массив: " + numbers);

        int index = Collections.binarySearch(numbers, 50);
        System.out.println("Поиск 50: индекс " + index);

        index = Collections.binarySearch(numbers, 25);
        System.out.println("Поиск 25 (нет в списке): " + index);
        // Если элемент не найден: -(insertion point) - 1
        // -(точка вставки) - 1 = -(6) - 1 = -7 → 25 встанет на позицию 6
    }

    /**
     * Collections.min(), max() — минимум и максимум.
     */
    public static void demonstrateMinMax() {
        System.out.println("\n=== min(), max() ===");

        List<Integer> scores = Arrays.asList(85, 92, 78, 95, 60, 88);

        int min = Collections.min(scores);
        int max = Collections.max(scores);
        System.out.println("Мин: " + min + ", Макс: " + max);

        // Можно задать свой компаратор
        List<String> stringScores = scores.stream().map(Object::toString).toList();
        String longest = Collections.max(stringScores, (a, b) -> Integer.compare(a.length(), b.length()));
    }

    /**
     * Collections.frequency() — подсчёт повторений.
     */
    public static void demonstrateFrequency() {
        System.out.println("\n=== frequency() ===");

        List<String> fruits = Arrays.asList("яблоко", "банан", "яблоко", "вишня", "банан", "яблоко");
        System.out.println("Фрукты: " + fruits);

        int count = Collections.frequency(fruits, "яблоко");
        System.out.println("яблоко встречается: " + count + " раз");

        count = Collections.frequency(fruits, "вишня");
        System.out.println("вишня встречается: " + count + " раз");
    }

    /**
     * Collections.disjoint() — нет ли общих элементов.
     */
    public static void demonstrateDisjoint() {
        System.out.println("\n=== disjoint() ===");

        List<Integer> setA = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> setB = Arrays.asList(6, 7, 8, 9, 10);
        List<Integer> setC = Arrays.asList(3, 4, 11, 12);

        System.out.println("A и B: disjoint = " + Collections.disjoint(setA, setB)); // true
        System.out.println("A и C: disjoint = " + Collections.disjoint(setA, setC)); // false (3 и 4 общие)
    }

    /**
     * Collections.replaceAll() — замена всех вхождений.
     */
    public static void demonstrateReplaceAll() {
        System.out.println("\n=== replaceAll() ===");

        List<String> words = new ArrayList<>(Arrays.asList("hello", "world", "hello", "java", "hello"));
        System.out.println("До: " + words);

        Collections.replaceAll(words, "hello", "hi");
        System.out.println("После replaceAll('hello', 'hi'): " + words);
    }

    /**
     * Collections.rotate() — циклический сдвиг.
     */
    public static void demonstrateRotateDetail() {
        System.out.println("\n=== rotate() подробно ===");

        List<String> items = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
        System.out.println("Исходный: " + items);

        for (int i = 1; i <= 5; i++) {
            Collections.rotate(items, 1);
            System.out.println("После rotate(1) #" + i + ": " + items);
        }
    }

    /**
     * Collections.unmodifiableList() — защитный wrapper.
     * Если кто-то попробует модифицировать — ClassCastException.
     */
    public static void demonstrateUnmodifiable() {
        System.out.println("\n=== unmodifiableList() ===");

        List<String> original = new ArrayList<>(Arrays.asList("A", "B", "C"));
        List<String> protectedList = Collections.unmodifiableList(original);

        System.out.println("Защищённый список: " + protectedList);

        try {
            protectedList.add("D"); // ← Исключение!
            System.out.println("Это НЕ должно произойти!");
        } catch (UnsupportedOperationException e) {
            System.out.println("Попытка модификации заблокирована: " + e.getClass().getSimpleName());
        }

        // Но можно изменить исходный!
        original.add("D");
        System.out.println("После добавления в original: " + protectedList);
    }

    /**
     * Collections.synchronizedList() — потокобезопасный wrapper.
     */
    public static void demonstrateSynchronizedList() {
        System.out.println("\n=== synchronizedList() ===");

        List<String> syncList = Collections.synchronizedList(new ArrayList<>());

        syncList.add("Безопасный");
        syncList.add("для");
        syncList.add("многопоточности");

        System.out.println("Синхронизированный список: " + syncList);
        System.out.println("Обратите внимание: итерация всё равно требует синхронизации!");
    }

    /**
     * Collections.singletonList(), singletonMap() — одноэлементные коллекции.
     */
    public static void demonstrateSingletons() {
        System.out.println("\n=== singletonList(), singletonMap() ===");

        List<String> oneItem = Collections.singletonList("Единственный");
        System.out.println("singletonList: " + oneItem);
        // immutable! cannot add/remove

        Map<String, String> oneEntry = Collections.singletonMap("key", "value");
        System.out.println("singletonMap: " + oneEntry);
        // immutable! cannot put/remove
    }

    /**
     * Collections.emptyList(), emptyMap(), emptySet() — пустые коллекции.
     * Это singletons — все пустые списки равны друг другу!
     */
    public static void demonstrateEmptyCollections() {
        System.out.println("\n=== emptyList(), emptyMap() ===");

        List<String> empty = Collections.emptyList();
        System.out.println("emptyList: " + empty);
        System.out.println("Пустой: " + empty.isEmpty());

        Map<String, String> emptyMap = Collections.emptyMap();
        System.out.println("emptyMap: " + emptyMap);
        System.out.println("Размер: " + emptyMap.size());

        // Не null! А EMPTY — безопасно, без проверок!
        System.out.println("Можно итерировать без NullPointerException:");
        for (String item : empty) {
            System.out.println("  " + item);
        }
        System.out.println("  (пусто)");
    }

    /**
     * Collections.nCopies() — коллекция из N одинаковых элементов.
     */
    public static void demonstrateNCopies() {
        System.out.println("\n=== nCopies() ===");

        List<String> copies = Collections.nCopies(5, "★");
        System.out.println("5 звёзд: " + copies);

        // Это immutable!
        try {
            copies.set(0, "✦"); // ← UnsupportedOperationException!
            System.out.println("Не должно произойти");
        } catch (UnsupportedOperationException e) {
            System.out.println("nCopies — immutable (как и ожидалось)");
        }
    }

    /**
     * Практический пример: частотный анализ слов.
     */
    public static void demonstrateFrequencyAnalysis() {
        System.out.println("\n=== Частотный анализ слов ===");

        String text = "Java Java is great Java is fun Python is also great C++ is fast";
        List<String> words = Arrays.asList(text.split("\\s+"));
        System.out.println("Слова: " + words);

        Map<String, Integer> frequency = new HashMap<>();
        for (String word : words) {
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }

        System.out.println("Частоты:");
        for (Map.Entry<String, Integer> entry : frequency.entrySet()) {
            System.out.println("  " + entry.getKey() + ": " + entry.getValue() + " раз");
        }

        // Самая частая
        String mostFrequent = Collections.max(frequency.entrySet(),
                Map.Entry.comparingByValue()).getKey();
        System.out.println("Самое частое слово: " + mostFrequent);
    }

    public static void main(String[] args) {
        System.out.println("=== Collections утилиты ===");
        demonstrateSort();
        demonstrateShuffle();
        demonstrateFill();
        demonstrateCopy();
        demonstrateSwaps();
        demonstrateBinarySearch();
        demonstrateMinMax();
        demonstrateFrequency();
        demonstrateDisjoint();
        demonstrateReplaceAll();
        demonstrateRotateDetail();
        demonstrateUnmodifiable();
        demonstrateSynchronizedList();
        demonstrateSingletons();
        demonstrateEmptyCollections();
        demonstrateNCopies();
        demonstrateFrequencyAnalysis();
    }
}
