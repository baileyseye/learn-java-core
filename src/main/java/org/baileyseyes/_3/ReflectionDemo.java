package org.baileyseyes._3;

import java.lang.reflect.*;

/**
 * Reflection (рефлексия) — доступ к информации о классе во время выполнения.
 * Позволяет:
 * — читать поля, методы, конструкторы класса
 * — вызывать методы динамически
 * — создавать объекты без new
 * — читать/записывать поля (даже private!)
 *
 * Это «магия» фреймворков: Spring, Jackson, Hibernate используют reflection.
 *
 * @see org.baileyseyes._3.AccessModifiersDemo Предыдущая часть
 */
public class ReflectionDemo {

    /**
     * Класс — объект первого класса.
     * Каждый класс в Java представлен объектом Class<?> в памяти.
     */
    public static void demonstrateClassObject() {
        System.out.println("=== Класс — объект ===");

        // 3 способа получить Class объект
        Class<String> stringClass1 = String.class;
        // getClass() возвращает Class<? extends String> — нужен каст к Class<String>
        @SuppressWarnings("unchecked")
        Class<String> stringClass2 = (Class<String>) "".getClass();
        Class<String> stringClass3 = null;
        try {
            stringClass3 = (Class<String>) Class.forName("java.lang.String");
        } catch (ClassNotFoundException e) {
            System.out.println("Класс не найден!");
        }

        System.out.println("stringClass1 == stringClass2: " + (stringClass1 == stringClass2));
        System.out.println("stringClass1 == stringClass3: " + (stringClass1 == stringClass3));
        // Все три способа дают ОДИН и ТОТ ЖЕ объект Class!

        // Что можно узнать о классе
        System.out.println("Имя класса: " + stringClass1.getName());
        System.out.println("Простое имя: " + stringClass1.getSimpleName());
        System.out.println("Модификаторы: " + Modifier.toString(stringClass1.getModifiers()));
        System.out.println("Пакет: " + stringClass1.getPackageName());
        System.out.println("Суперкласс: " + stringClass1.getSuperclass());
        System.out.println("Реализованные интерфейсы:");
        for (Class<?> iface : stringClass1.getInterfaces()) {
            System.out.println("  " + iface.getSimpleName());
        }
    }

    /**
     * Чтение полей класса.
     */
    public static void demonstrateFields() {
        System.out.println("\n=== Поля класса ===");

        Class<?> clazz = java.util.ArrayList.class;

        System.out.println("Поля ArrayList:");
        for (Field field : clazz.getDeclaredFields()) {
            int mods = field.getModifiers();
            String modStr = Modifier.toString(mods);
            System.out.println("  " + modStr + " " + field.getType().getSimpleName() + " " + field.getName());
        }
    }

    /**
     * Чтение методов класса.
     */
    public static void demonstrateMethods() {
        System.out.println("\n=== Методы класса ===");

        Class<?> clazz = String.class;

        System.out.println("Методы String (первые 10):");
        int count = 0;
        for (Method method : clazz.getDeclaredMethods()) {
            if (count++ >= 10) break;
            StringBuilder sig = new StringBuilder();
            sig.append(Modifier.toString(method.getModifiers()));
            sig.append(" ");
            sig.append(method.getReturnType().getSimpleName());
            sig.append(" ");
            sig.append(method.getName());
            sig.append("(");
            Class<?>[] params = method.getParameterTypes();
            for (int i = 0; i < params.length; i++) {
                if (i > 0) sig.append(", ");
                sig.append(params[i].getSimpleName());
            }
            sig.append(")");
            System.out.println("  " + sig);
        }
    }

    /**
     * Вызов метода через reflection.
     */
    public static void demonstrateInvokeMethod() {
        System.out.println("\n=== Вызов метода через reflection ===");

        String text = "hello world";
        Class<?> clazz = text.getClass();

        try {
            // Получаем метод String.toUpperCase()
            Method toUpperCase = clazz.getMethod("toUpperCase");
            Object result = toUpperCase.invoke(text); // вызываем метод на объекте text
            System.out.println("toUpperCase(): " + result);

            // Получаем метод String.split(String)
            Method split = clazz.getMethod("split", String.class);
            Object[] parts = (Object[]) split.invoke(text, " ");
            System.out.println("split(' '):");
            for (Object part : parts) {
                System.out.println("  " + part);
            }

            // Получаем метод String.indexOf(int)
            Method indexOf = clazz.getMethod("indexOf", int.class);
            int pos = (int) indexOf.invoke(text, 'w');
            System.out.println("indexOf('w'): " + pos);

        } catch (Exception e) {
            System.out.println("Ошибка вызова метода: " + e.getMessage());
        }
    }

    /**
     * Доступ к private полю через reflection.
     * Это «взлом» инкапсуляции — безопасно только во фреймворках и тестах.
     */
    public static void demonstratePrivateFieldAccess() {
        System.out.println("\n=== Доступ к private полю ===");

        StringBuilder sb = new StringBuilder("Hello");

        try {
            // Получаем private поле AbstractStringBuilder.value (byte[] в новых Java)
            Field valueField = StringBuilder.class.getSuperclass().getDeclaredField("value");
            valueField.setAccessible(true); // ← ОТКРЫВАЕМ ДОСТУП к private!

            Object value = valueField.get(sb); // ЧИТАЕМ значение private поля
            System.out.println("Значение value: " + java.util.Arrays.toString((Object[]) value));

        } catch (NoSuchFieldException | IllegalAccessException e) {
            System.out.println("Не удалось получить поле: " + e.getMessage());
        }
    }

    /**
     * Создание объекта через конструктор reflection.
     */
    public static void demonstrateConstructor() {
        System.out.println("\n=== Создание объекта через конструктор ===");

        try {
            // Получаем конструктор ArrayList(int)
            Constructor<?> constructor = java.util.ArrayList.class.getConstructor(int.class);
            // Создаём экземпляр с initialCapacity=5
            Object instance = constructor.newInstance(5);
            System.out.println("Создан ArrayList с capacity=5: " + instance);

            // Метод add для добавления элементов
            Method add = instance.getClass().getMethod("add", Object.class);
            add.invoke(instance, "Элемент 1");
            add.invoke(instance, "Элемент 2");
            add.invoke(instance, "Элемент 3");

            System.out.println("Список: " + instance);

        } catch (Exception e) {
            System.out.println("Ошибка создания объекта: " + e.getMessage());
        }
    }

    /**
     * Универсальный метод «всё о классе» — реальный пример использования reflection.
     */
    public static void demonstrateFullIntrospection() {
        System.out.println("\n=== Полная инспекция класса ===");

        introspectClass(java.util.HashMap.class);
    }

    private static void introspectClass(Class<?> clazz) {
        System.out.println("Класс: " + clazz.getName());
        System.out.println("Модификаторы: " + Modifier.toString(clazz.getModifiers()));
        System.out.println("Суперкласс: " + clazz.getSuperclass());
        System.out.println();

        System.out.println("Конструкторы:");
        for (Constructor<?> ctor : clazz.getDeclaredConstructors()) {
            System.out.print("  ");
            System.out.print(Modifier.toString(ctor.getModifiers()) + " ");
            System.out.print(ctor.getName() + "(");
            Class<?>[] params = ctor.getParameterTypes();
            for (int i = 0; i < params.length; i++) {
                if (i > 0) System.out.print(", ");
                System.out.print(params[i].getSimpleName());
            }
            System.out.println(")");
        }
        System.out.println();

        System.out.println("Методы:");
        for (Method method : clazz.getDeclaredMethods()) {
            System.out.print("  ");
            System.out.print(Modifier.toString(method.getModifiers()) + " ");
            System.out.print(method.getReturnType().getSimpleName() + " ");
            System.out.print(method.getName() + "(");
            Class<?>[] params = method.getParameterTypes();
            for (int i = 0; i < params.length; i++) {
                if (i > 0) System.out.print(", ");
                System.out.print(params[i].getSimpleName());
            }
            System.out.println(")");
        }
    }

    /**
     * Reflection — создание объекта без known класса.
     * Полезно для DI-контейнеров и ORM.
     */
    public static void demonstrateDynamicCreation() {
        System.out.println("\n=== Динамическое создание объекта ===");

        try {
            // Создаём объект по имени класса (строка!)
            String className = "java.util.TreeMap";
            Class<?> clazz = Class.forName(className);
            Object instance = clazz.getDeclaredConstructor().newInstance();
            System.out.println("Создан объект класса: " + className + " → " + instance);

        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * Reflection + invoke — вызов метода по имени (строка!).
     */
    public static void demonstrateDynamicMethodCall() {
        System.out.println("\n=== Вызов метода по имени ===");

        String text = "Hello Java!";

        try {
            Class<?> clazz = text.getClass();

            // Методы вызываем по имени (строка!)
            Method length = clazz.getMethod("length");
            System.out.println("length(): " + length.invoke(text));

            Method substring = clazz.getMethod("substring", int.class);
            System.out.println("substring(6): " + substring.invoke(text, 6));

            Method replace = clazz.getMethod("replace", CharSequence.class, CharSequence.class);
            System.out.println("replace('Java', 'World'): " + replace.invoke(text, "Java", "World"));

        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * Reflection с обобщённым классом — erased generics.
     * Дженерики стираются при компиляции — reflection не видит типизацию!
     */
    public static void demonstrateErasedGenerics() {
        System.out.println("\n=== Стертые дженерики ===");

        java.util.List<String> stringList = new java.util.ArrayList<>();
        java.util.List<Integer> intList = new java.util.ArrayList<>();

        // Reflection НЕ видит разницу!
        System.out.println("Type of stringList: " + stringList.getClass());
        System.out.println("Type of intList: " + intList.getClass());
        System.out.println("Одинаковые: " + (stringList.getClass() == intList.getClass()));
        // true — дженерики стираются!
    }

    public static void main(String[] args) {
        System.out.println("=== Reflection (рефлексия) ===");
        demonstrateClassObject();
        demonstrateFields();
        demonstrateMethods();
        demonstrateInvokeMethod();
        demonstratePrivateFieldAccess();
        demonstrateConstructor();
        demonstrateFullIntrospection();
        demonstrateDynamicCreation();
        demonstrateDynamicMethodCall();
        demonstrateErasedGenerics();
    }
}
