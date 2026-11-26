package org.baileyseyes._8.jvm;

/**
 * Минимальная картина устройства JVM:
 * — загрузка классов через ClassLoader;
 * — память: heap, stack и метаданные классов;
 * — сборка мусора;
 * — JIT-компиляция горячего кода.
 *
 * @see org.baileyseyes._8.reflection.ReflectionAnnotationsDemo Предыдущая часть
 */
public class JvmInternalsDemo {

    static class Demo {
        private final int value;

        Demo(int value) {
            this.value = value;
        }

        int value() {
            return value;
        }
    }

    /**
     * JVM загружает .class-файлы через цепочку ClassLoader.
     * Bootstrap-загрузчик отвечает за базовые классы JDK, поэтому у String он null.
     */
    public static void demonstrateClassLoading() {
        System.out.println("=== Загрузка классов ===");

        System.out.println("String loader: " + loaderName(String.class.getClassLoader()));
        System.out.println("Наш loader: " + loaderName(JvmInternalsDemo.class.getClassLoader()));
        System.out.println("Родитель: " + loaderName(JvmInternalsDemo.class.getClassLoader().getParent()));
        System.out.println("Superclass Demo: " + Demo.class.getSuperclass().getSimpleName());
    }

    /**
     * Heap — общая память для объектов. Stack — кадры методов и локальные переменные.
     * Точные размеры зависят от машины и флагов -Xms/-Xmx.
     */
    public static void demonstrateMemory() {
        System.out.println("\n=== Память JVM ===");

        Runtime runtime = Runtime.getRuntime();
        System.out.println("Процессоров: " + runtime.availableProcessors());
        System.out.println("Heap max, МБ: " + runtime.maxMemory() / 1024 / 1024);
        System.out.println(
                "Heap используется, МБ: " + (runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024);
        System.out.println("Стек и метаданные классов находятся вне heap.");
    }

    /**
     * Объект удаляется, когда на него не осталось ссылок.
     * GC работает сам, а System.gc() — только подсказка, которую JVM может проигнорировать.
     */
    public static void demonstrateGarbageCollector() {
        System.out.println("\n=== Сборка мусора ===");

        int created = 0;
        for (int i = 0; i < 10_000; i++) {
            Demo demo = new Demo(i);
            created++;
        }
        System.out.println("Создано объектов: " + created + " (ссылки больше не нужны)");
        System.gc();
        System.out.println("System.gc() — только подсказка, JVM решает сама.");
    }

    /**
     * JIT замечает горячие методы и компилирует их байткод в машинный код.
     * Поэтому первые запуски могут быть медленнее последующих.
     */
    public static void demonstrateJit() {
        System.out.println("\n=== JIT-компиляция ===");

        long sum = 0;
        for (int i = 0; i < 1_000_000; i++) {
            sum += i;
        }
        System.out.println("Сумма: " + sum);
        System.out.println("Горячий цикл JIT компилирует в машинный код по ходу работы.");
    }

    static String loaderName(ClassLoader loader) {
        return loader == null ? "bootstrap" : loader.getName();
    }

    public static void main(String[] args) {
        System.out.println("=== Как устроена JVM ===");
        demonstrateClassLoading();
        demonstrateMemory();
        demonstrateGarbageCollector();
        demonstrateJit();
    }
}
