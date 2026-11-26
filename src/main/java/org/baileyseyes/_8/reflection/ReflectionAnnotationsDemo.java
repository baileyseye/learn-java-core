package org.baileyseyes._8.reflection;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * Рефлексия и аннотации на минимальном уровне:
 * — своя аннотация с retention RUNTIME;
 * — чтение аннотации через reflection;
 * — поля и методы класса во время выполнения;
 * — вызов метода по имени.
 *
 * @see org.baileyseyes._8.io.NioFilesDemo Предыдущая часть
 * @see org.baileyseyes._8.jvm.JvmInternalsDemo Следующая часть
 */
public class ReflectionAnnotationsDemo {

    /**
     * Аннотация — это метаданные. Без RUNTIME её не будет видно через reflection.
     */
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.TYPE)
    @interface Info {
        String author();

        int version() default 1;
    }

    @Info(author = "Java Core", version = 2)
    static class Book {
        private String title = "Effective Java";
        private int pages = 416;

        public String getTitle() {
            return title;
        }

        public String describe() {
            return title + ", страниц: " + pages;
        }
    }

    /**
     * Class — точка входа в reflection. Через него читаем аннотацию класса.
     */
    public static void demonstrateAnnotation() {
        System.out.println("=== Аннотация через reflection ===");

        Info info = Book.class.getAnnotation(Info.class);
        System.out.println("Автор: " + info.author());
        System.out.println("Версия: " + info.version());
    }

    /**
     * getDeclaredFields возвращает все поля, включая private.
     * setAccessible(true) разрешает прочитать значение, но ломает инкапсуляцию.
     */
    public static void demonstrateFields() throws IllegalAccessException {
        System.out.println("\n=== Поля класса ===");

        Book book = new Book();
        Field[] fields = Book.class.getDeclaredFields();
        Arrays.sort(fields, (left, right) -> left.getName().compareTo(right.getName()));

        for (Field field : fields) {
            field.setAccessible(true);
            System.out.println(
                    field.getName() + " (" + field.getType().getSimpleName() + ") = " + field.get(book));
        }
    }

    /**
     * Метод можно найти по имени и вызвать через invoke().
     * Так работают многие фреймворки и библиотеки.
     */
    public static void demonstrateMethods() throws ReflectiveOperationException {
        System.out.println("\n=== Методы класса ===");

        Method[] methods = Book.class.getDeclaredMethods();
        Arrays.sort(methods, (left, right) -> left.getName().compareTo(right.getName()));
        for (Method method : methods) {
            System.out.println(method.getName() + " -> " + method.getReturnType().getSimpleName());
        }

        Method describe = Book.class.getDeclaredMethod("describe");
        Object result = describe.invoke(new Book());
        System.out.println("invoke describe(): " + result);
    }

    public static void main(String[] args) throws ReflectiveOperationException {
        System.out.println("=== Рефлексия и аннотации ===");
        demonstrateAnnotation();
        demonstrateFields();
        demonstrateMethods();
    }
}
