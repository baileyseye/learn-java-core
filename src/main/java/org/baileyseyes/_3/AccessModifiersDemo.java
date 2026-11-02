package org.baileyseyes._3;

/**
 * Пакеты (package) и package-private модификатор доступа.
 * Java — не только public и private. Есть ещё 4 уровня доступа.
 *
 * 4 модификатора доступа:
 * 1. public — доступно ВСЕМ
 * 2. protected — в пакете + подклассах (даже в других пакетах)
 * 3. package-private (default, без слова) — только внутри пакета
 * 4. private — только внутри класса
 *
 * @see org.baileyseyes._3.record.Human Следующая часть
 */
@SuppressWarnings("all")
public class AccessModifiersDemo {

    /**
     * Публичный метод — доступен из любого пакета.
     */
    public void publicMethod() {
        System.out.println("publicMethod: вызван из любого места");
    }

    /**
     * Private метод — только внутри этого класса.
     * Ни один другой класс не может его увидеть.
     */
    private void privateMethod() {
        System.out.println("privateMethod: только внутри этого класса");
    }

    /**
     * Package-private (default) — нет никакого модификатора!
     * Доступен классам ТОЛЬКО в пакете org.baileyseyes._3.
     * Класы в org.baileyseyes._4 НЕ увидят его.
     */
    void packagePrivateMethod() {
        System.out.println("package-private: только в одном пакете");
    }

    /**
     * Защищённый метод — доступен в пакете И в подклассах.
     */
    protected void protectedMethod() {
        System.out.println("protected: пакет + подклассы");
    }

    /**
     * Демонстрация: private нельзя вызвать снаружи.
     */
    public void demonstratePrivateAccess() {
        System.out.println("=== Private доступ ===");
        // privateMethod(); // НЕЛЬЗЯ — ошибка компиляции!
        // Но мы здесь, внутри класса, поэтому можем:
        privateMethod();
    }

    /**
     * Класс в другом пакете НЕ МОЖЕТ вызвать packagePrivateMethod().
     * Это механизм инкапсуляции — скрываем детали реализации.
     */
    public void demonstratePackagePrivateAccess() {
        System.out.println("=== Package-private доступ ===");
        // packagePrivateMethod(); // МОЖЕМ, потому что этот класс в том же пакете
        packagePrivateMethod();
    }

    /**
     * Вложенный класс с примерами всех модификаторов.
     */
    class NestedAccess {
        private String secret = "секрет класса";
        String packageField = "виден в пакете";
        protected String protectedField = "виден подклассам";
        public String publicField = "виден всем";

        public void showAll() {
            System.out.println("secret: " + secret);
            System.out.println("packageField: " + packageField);
            System.out.println("protectedField: " + protectedField);
            System.out.println("publicField: " + publicField);
        }
    }

    /**
     * Пример: почему package-private важен.
     * Класс Utility для пакета _3 — виден только внутри пакета.
     */
    static class Utility {
        static String internalCode = "секретный код пакета _3";

        static void doSecretWork() {
            System.out.println("Внутренняя работа: " + internalCode);
        }
    }

    public static void demonstrateUtilityAccess() {
        System.out.println("=== Utility (package-private) ===");
        // Utility.utilityMethod() — из другого пакета НЕ ВИДЕН!
        Utility.doSecretWork();
    }

    public static void main(String[] args) {
        AccessModifiersDemo demo = new AccessModifiersDemo();
        demo.demonstratePrivateAccess();
        demo.demonstratePackagePrivateAccess();

        NestedAccess nested = demo.new NestedAccess();
        nested.showAll();
        demonstrateUtilityAccess();
    }
}
