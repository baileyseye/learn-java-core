package org.baileyseyes._2.classes_objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Builder-паттерн и Lombok.
 * Builder — когда у объекта много параметров, и не все обязательны.
 * Lombok — генерирует boilerplate-код (getters, setters, constructors) автоматически.
 *
 * @see org.baileyseyes._2.classes_objects.AbstractClasses Предыдущая часть
 */
public class BuilderAndLombok {

    /**
     * Класс без Lombok — вручную.
     * Lombok @Data = @ToString + @EqualsAndHashCode + @Getter + @Setter
     * Lombok @AllArgsConstructor = конструктор со всеми полями
     */
    static class User {
        private String name;
        private int age;
        private String email;
        private String phone;

        public User(String name, int age, String email, String phone) {
            this.name = name;
            this.age = age;
            this.email = email;
            this.phone = phone;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        @Override
        public String toString() {
            return "User{name='" + name + "', age=" + age + ", email='" + email + "', phone='" + phone + "'}";
        }
    }

    /**
     * Builder-паттерн — пошаговое создание объекта.
     * Особенно полезно, когда параметров много и большинство опционально.
     */
    static class Person {
        private final String name;
        private final int age;
        private final String city;
        private final String email;
        private final String phone;

        private Person(Builder builder) {
            this.name = builder.name;
            this.age = builder.age;
            this.city = builder.city;
            this.email = builder.email;
            this.phone = builder.phone;
        }

        // Builder — статический вложенный класс
        public static class Builder {
            private String name;
            private int age;
            private String city;
            private String email;
            private String phone;

            public Builder name(String name) {
                this.name = name;
                return this; // возвращаем себя для цепочки
            }

            public Builder age(int age) {
                this.age = age;
                return this;
            }

            public Builder city(String city) {
                this.city = city;
                return this;
            }

            public Builder email(String email) {
                this.email = email;
                return this;
            }

            public Builder phone(String phone) {
                this.phone = phone;
                return this;
            }

            public Person build() {
                return new Person(this);
            }
        }

        @Override
        public String toString() {
            return "Person{name='" + name + "', age=" + age +
                   ", city='" + city + "', email='" + email + "', phone='" + phone + "'}";
        }

        public String getName() { return name; }
        public int getAge() { return age; }
        public String getCity() { return city; }
        public String getEmail() { return email; }
        public String getPhone() { return phone; }
    }

    /**
     * Статический вложенный класс — Example (упрощённый builder без separate Builder-класса).
     */
    static class Order {
        private final String product;
        private final double price;
        private final int quantity;
        private final String discountCode;

        private Order(Builder builder) {
            this.product = builder.product;
            this.price = builder.price;
            this.quantity = builder.quantity;
            this.discountCode = builder.discountCode;
        }

        // Встроенный builder через вложенный класс
        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private String product;
            private double price;
            private int quantity = 1;
            private String discountCode = null;

            public Builder product(String product) {
                this.product = product;
                return this;
            }

            public Builder price(double price) {
                this.price = price;
                return this;
            }

            public Builder quantity(int quantity) {
                this.quantity = quantity;
                return this;
            }

            public Builder discountCode(String discountCode) {
                this.discountCode = discountCode;
                return this;
            }

            public Order build() {
                if (product == null || price <= 0) {
                    throw new IllegalStateException("product и price обязательны!");
                }
                return new Order(this);
            }
        }

        @Override
        public String toString() {
            return "Order{product='" + product + "', price=" + price +
                   ", quantity=" + quantity + ", discount='" + discountCode + "'}";
        }

        public double getTotal() {
            double total = price * quantity;
            if (discountCode != null && discountCode.equals("SAVE10")) {
                total *= 0.9;
            }
            return total;
        }
    }

    /**
     * Тот же User, что и выше (44 строки boilerplate), но с Lombok — 8 строк.
     * <p>
     * {@code @Data} = @Getter + @Setter + @ToString + @EqualsAndHashCode + @RequiredArgsConstructor<br>
     * {@code @Builder} = готовый builder() со всей цепочкой + приватный конструктор<br>
     * {@code @AllArgsConstructor} / {@code @NoArgsConstructor} = конструкторы со всеми/нулём полей
     * </p>
     */
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    static class LombokUser {
        private String name;
        private int age;
        private String email;
        private String phone;
    }

    /**
     * Неизменяемая версия: только чтение + builder.
     * {@code @Getter} вместо @Data — сеттеров нет, объект нельзя испортить извне.
     */
    @Getter
    @ToString
    @Builder
    static class ImmutableLombokUser {
        private final String name;
        private final int age;
        @Builder.Default // значение по умолчанию, если поле не задано в цепочке
        private final String city = "Москва";
    }

    public static void demonstrateLombokConcise() {
        System.out.println("\n=== Lombok: всё то же самое в 8 строк ===");

        // Builder генерируется сам — ни строчки кода Builder-класса
        LombokUser user = LombokUser.builder()
                .name("Дмитрий")
                .age(28)
                .email("dima@mail.ru")
                .phone("+7-495-111-22-33")
                .build();
        System.out.println("build(): " + user); // toString() тоже сгенерирован

        // Геттеры/сеттеры есть — но их нет в исходнике
        user.setName("Дмитрий Иванов");
        user.setPhone("+7-495-999-88-77");
        System.out.println("после сеттеров: " + user.getName() + ", " + user.getPhone());

        // Конструктор со всеми полями (@AllArgsConstructor)
        LombokUser full = new LombokUser("Анна", 30, "anna@mail.ru", "+7-495-000-00-00");
        System.out.println("AllArgsConstructor: " + full);

        // Пустой конструктор (@NoArgsConstructor) + сеттеры — удобно для JSON/ORM
        LombokUser empty = new LombokUser();
        empty.setName("Пустышка");
        System.out.println("NoArgsConstructor: " + empty);

        // equals()/hashCode() из @Data — сравнение по полям, а не по ссылке
        LombokUser copy = LombokUser.builder().name("Дмитрий Иванов").age(28)
                .email("dima@mail.ru").phone("+7-495-999-88-77").build();
        System.out.println("equals по полям: " + user.equals(copy));

        // Неизменяемая версия + @Builder.Default
        ImmutableLombokUser immutable = ImmutableLombokUser.builder().name("Иван").age(40).build();
        System.out.println("city по умолчанию: " + immutable);
    }

    public static void demonstrateBuilderPattern() {
        System.out.println("=== Builder-паттерн ===");

        // Только обязательные поля
        Person person1 = new Person.Builder()
                .name("Алексей")
                .age(30)
                .build();
        System.out.println("Person 1: " + person1);

        // Все поля
        Person person2 = new Person.Builder()
                .name("Мария")
                .age(25)
                .city("Москва")
                .email("maria@example.com")
                .phone("+7-999-123-45-67")
                .build();
        System.out.println("Person 2: " + person2);

        // Частичные поля — только то, что нужно
        Person person3 = new Person.Builder()
                .name("Иван")
                .city("Санкт-Петербург")
                .build();
        System.out.println("Person 3: " + person3);
    }

    public static void demonstrateOrderBuilder() {
        System.out.println("\n=== Builder для Order ===");

        Order order1 = Order.builder()
                .product("Ноутбук")
                .price(59999.0)
                .quantity(1)
                .build();
        System.out.println(order1);
        System.out.println("Итого: " + String.format("%.2f", order1.getTotal()));

        Order order2 = Order.builder()
                .product("Клавиатура")
                .price(2999.0)
                .quantity(3)
                .discountCode("SAVE10")
                .build();
        System.out.println(order2);
        System.out.println("Итого со скидкой: " + String.format("%.2f", order2.getTotal()));

        // Ошибочный заказ — пропущен product
        try {
            Order badOrder = Order.builder()
                    .price(100.0)
                    .build();
        } catch (IllegalStateException e) {
            System.out.println("\nОшибка: " + e.getMessage());
        }
    }

    public static void demonstrateLombokStyle() {
        System.out.println("\n=== Lombok-стиль (вручную) ===");

        // С Lombok @AllArgsConstructor и @Data — этот же класс был бы 2 строки.
        // Но пока Lombok нет — пишем вручную.
        User user = new User("Дмитрий", 28, "dima@mail.ru", "+7-495-111-22-33");
        System.out.println(user);

        // Модифицируем через setters
        user.setName("Дмитрий Иванов");
        user.setPhone("+7-495-999-88-77");
        System.out.println(user);
    }

    public static void main(String[] args) {
        System.out.println("=== Builder и Lombok ===");
        demonstrateBuilderPattern();
        demonstrateOrderBuilder();
        demonstrateLombokStyle();
        demonstrateLombokConcise();
    }
}
