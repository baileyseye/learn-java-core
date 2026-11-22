package org.baileyseyes._2.classes_objects;

/**
 * Конструкторы и ключевое слово {@code this}.
 * <p>
 * Конструктор создаёт объект и приводит его в корректное состояние.
 * Перегрузка конструкторов позволяет собирать объект разными способами.
 * </p>
 *
 * @see org.baileyseyes._2.__start_from_here__.HelloObjects Предыдущая часть
 * @see entity.Human Следующая часть
 */
@SuppressWarnings("all")
public class ConstructorsAndThis {

    static class Book {
        private String title;
        private int pages;

        /**
         * Конструктор без параметров вызывает другой конструктор через this(...).
         */
        Book() {
            this("Без названия", 1);
        }

        /**
         * Конструктор с названием и количеством страниц по умолчанию.
         */
        Book(String title) {
            this(title, 100);
        }

        /**
         * Основной конструктор. this.title отличает поле от параметра title.
         */
        Book(String title, int pages) {
            this.title = title;
            this.pages = pages;
        }

        /**
         * Текучий метод: меняет страницы и возвращает этот же объект.
         */
        Book withPages(int pages) {
            this.pages = pages;
            return this;
        }

        String describe() {
            return "Книга: " + title + ", страниц: " + pages;
        }
    }

    /**
     * Первый конструктор вызывает второй через this(...).
     */
    public static void demonstrateConstructorChaining() {
        Book book = new Book();
        System.out.println(book.describe());
    }

    /**
     * Один класс — несколько конструкторов с разными параметрами.
     */
    public static void demonstrateOverloadedConstructors() {
        Book book = new Book("Java для начинающих", 350);
        System.out.println(book.describe());
    }

    /**
     * this позволяет вернуть текущий объект и продолжить цепочку вызовов.
     */
    public static void demonstrateThisInMethod() {
        Book book = new Book("Java для начинающих").withPages(120);
        System.out.println(book.describe());
    }

    public static void main(String[] args) {
        System.out.println("=== Цепочка конструкторов ===");
        demonstrateConstructorChaining();

        System.out.println("\n=== Перегрузка конструкторов ===");
        demonstrateOverloadedConstructors();

        System.out.println("\n=== this в методах ===");
        demonstrateThisInMethod();
    }
}
