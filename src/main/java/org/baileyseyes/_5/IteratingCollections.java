package org.baileyseyes._5;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Обход коллекций: for-each, Iterator, removeIf и Map.
 * <p>
 * for-each удобен для чтения. Если во время обхода нужно удалять элементы,
 * используют Iterator.remove() или removeIf().
 * </p>
 *
 * @see list.CollectionList Предыдущая часть
 * @see set.CollectionSet Следующая часть
 */
@SuppressWarnings("all")
public class IteratingCollections {

    /**
     * Самый читаемый способ обойти коллекцию, когда индекс не нужен.
     */
    public static void demonstrateForEach() {
        List<String> languages = List.of("java", "sql", "git");

        for (String language : languages) {
            System.out.println(language);
        }
    }

    /**
     * Iterator умеет безопасно удалять текущий элемент во время обхода.
     */
    public static void demonstrateIterator() {
        List<String> names = new ArrayList<>(List.of("Анна", "Борис", "Вера"));
        System.out.println("До удаления: " + names);

        Iterator<String> iterator = names.iterator();
        while (iterator.hasNext()) {
            String name = iterator.next();
            if (name.equals("Борис")) {
                iterator.remove();
                System.out.println("Удалён: " + name);
            }
        }

        System.out.println("После удаления: " + names);
    }

    /**
     * removeIf короче ручного Iterator, когда условие удаления простое.
     */
    public static void demonstrateRemoveIf() {
        List<String> names = new ArrayList<>(List.of("Анна", "Борис", "Вера"));

        names.removeIf(name -> name.length() <= 4);

        System.out.println(names);
    }

    /**
     * Map обходят через entrySet, если нужны и ключ, и значение.
     */
    public static void demonstrateMapIteration() {
        Map<String, Integer> frequency = new LinkedHashMap<>();
        frequency.put("java", 3);
        frequency.put("sql", 2);
        frequency.put("git", 1);

        for (Map.Entry<String, Integer> entry : frequency.entrySet()) {
            System.out.println(entry.getKey() + "=" + entry.getValue());
        }
    }

    public static void main(String[] args) {
        System.out.println("=== for-each ===");
        demonstrateForEach();

        System.out.println("\n=== Iterator ===");
        demonstrateIterator();

        System.out.println("\n=== removeIf ===");
        demonstrateRemoveIf();

        System.out.println("\n=== Map ===");
        demonstrateMapIteration();
    }
}
