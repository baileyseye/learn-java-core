package org.baileyseyes._7;

import java.util.*;

/**
 * Паттерны проектирования — решения типичных проблем.
 * — Singleton: один экземпляр на всю программу
 * — Factory: создание объектов без know о конкретном типе
 * — Observer: публикация-подписка (pub/sub)
 * — Strategy: замена алгоритма в рантайме
 *
 * @see org.baileyseyes._7.GenericsDemo Предыдущая часть
 */
@SuppressWarnings("all")
public class DesignPatternsDemo {

    // ===================== Singleton =====================

    /**
     * Singleton — гарантируем ОДИН экземпляр класса.
     * Еdda-поток-safe версия (без synchronized).
     */
    static class Singleton {
        // volatile гарантирует видимость изменения между потоками
        private static volatile Singleton instance;
        private final String name;

        // private constructor — никто не может создать экземпляр!
        private Singleton(String name) {
            this.name = name;
            System.out.println("Singleton '" + name + "' создан!");
        }

        /**
         * Double-checked locking: проверка без блокировки, блокировка при null.
         */
        public static Singleton getInstance() {
            if (instance == null) { // 1-я проверка (без блокировки!)
                synchronized (Singleton.class) {
                    if (instance == null) { // 2-я проверка (внутри блокировки)
                        instance = new Singleton("Главный");
                    }
                }
            }
            return instance;
        }

        public String getName() { return name; }

        public void doWork() {
            System.out.println("Singleton '" + name + "' работает...");
        }
    }

    public static void demonstrateSingleton() {
        System.out.println("=== Singleton ===");

        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();

        // ОДИН И ТОТ ЖЕ объект!
        System.out.println("s1 == s2: " + (s1 == s2)); // true
        System.out.println("s1.hashCode() == s2.hashCode(): " + (s1.hashCode() == s2.hashCode()));

        s1.doWork();
        s2.doWork(); // тот же объект!
    }

    // ===================== Eager Singleton (ленивый) =====================

    /**
     * Простой eager-singleton: создаётся при загрузке класса.
     * Безопасен и проще, но создаётся даже если не нужен.
     */
    static class EagerSingleton {
        private static final EagerSingleton INSTANCE = new EagerSingleton();
        private EagerSingleton() {}
        public static EagerSingleton getInstance() { return INSTANCE; }
    }

    // ===================== Factory =====================

    /**
     * Factory — создаём объекты без know о конкретном типе.
     * Клиент вызывает factory.create(), а не new Circle().
     */
    interface Shape {
        String draw();
        double area();
    }

    static class Circle implements Shape {
        private final double radius;
        public Circle(double radius) { this.radius = radius; }
        @Override public String draw() { return "Рисую круг радиусом " + radius; }
        @Override public double area() { return Math.PI * radius * radius; }
    }

    static class Rectangle implements Shape {
        private final double width, height;
        public Rectangle(double width, double height) { this.width = width; this.height = height; }
        @Override public String draw() { return "Рисую прямоугольник " + width + "x" + height; }
        @Override public double area() { return width * height; }
    }

    static class Triangle implements Shape {
        private final double base, height;
        public Triangle(double base, double height) { this.base = base; this.height = height; }
        @Override public String draw() { return "Рисую треугольник основание=" + base + ", высота=" + height; }
        @Override public double area() { return 0.5 * base * height; }
    }

    /**
     * Factory-класс для создания фигур.
     */
    static class ShapeFactory {
        /**
         * Статическая фабрика с switch.
         */
        public static Shape createShape(String type, Object... params) {
            return switch (type.toLowerCase()) {
                case "circle" -> new Circle((Double) params[0]);
                case "rectangle" -> new Rectangle((Double) params[0], (Double) params[1]);
                case "triangle" -> new Triangle((Double) params[0], (Double) params[1]);
                default -> throw new IllegalArgumentException("Неизвестная фигура: " + type);
            };
        }

        /**
         * Фабрика с Builder-подобным интерфейсом.
         */
        static class Builder {
            private double a, b;
            private String type;

            public Builder circle(double radius) {
                this.type = "circle";
                this.a = radius;
                return this;
            }

            public Builder rectangle(double width, double height) {
                this.type = "rectangle";
                this.a = width;
                this.b = height;
                return this;
            }

            public Builder triangle(double base, double height) {
                this.type = "triangle";
                this.a = base;
                this.b = height;
                return this;
            }

            public Shape build() {
                return switch (type) {
                    case "circle" -> new Circle(a);
                    case "rectangle" -> new Rectangle(a, b);
                    case "triangle" -> new Triangle(a, b);
                    default -> throw new IllegalStateException("Не указана фигура!");
                };
            }
        }

        public static Builder newBuilder() {
            return new Builder();
        }
    }

    public static void demonstrateFactory() {
        System.out.println("\n=== Factory (создание фигур) ===");

        // Способ 1: статическая фабрика
        Shape circle = ShapeFactory.createShape("circle", 5.0);
        System.out.println(circle.draw());
        System.out.println("Площадь: " + String.format("%.2f", circle.area()));

        Shape rect = ShapeFactory.createShape("rectangle", 4.0, 6.0);
        System.out.println(rect.draw());
        System.out.println("Площадь: " + String.format("%.2f", rect.area()));

        // Способ 2: Builder
        Shape triangle = ShapeFactory.newBuilder()
                .triangle(3.0, 8.0)
                .build();
        System.out.println(triangle.draw());
        System.out.println("Площадь: " + String.format("%.2f", triangle.area()));
    }

    // ===================== Observer =====================

    /**
     * Observer (Pub/Sub): подписчики получают уведомления при изменениях.
     * Реальный пример: EventListener в Swing, Observable в RxJava.
     */
    interface Observer {
        void update(String message);
    }

    /**
     * Subject: хранит список подписчиков и рассылает уведомления.
     */
    static class NewsService {
        private final List<Observer> subscribers = new ArrayList<>();

        public void subscribe(Observer observer) {
            subscribers.add(observer);
            System.out.println("  Подписчик #" + subscribers.size() + ": " + observer);
        }

        public void unsubscribe(Observer observer) {
            subscribers.remove(observer);
        }

        public void publish(String news) {
            System.out.println("\n  📢 Новость: " + news);
            for (Observer sub : subscribers) {
                sub.update(news);
            }
        }
    }

    /**
     * Пример Observer — уведомления.
     */
    static class EmailSubscriber implements Observer {
        private final String name;
        public EmailSubscriber(String name) { this.name = name; }
        @Override public void update(String message) {
            System.out.println("  ✉️ " + name + " получил email: " + message);
        }
        @Override public String toString() { return name + " (email)"; }
    }

    static class PushSubscriber implements Observer {
        private final String name;
        public PushSubscriber(String name) { this.name = name; }
        @Override public void update(String message) {
            System.out.println("  📱 " + name + " получил push: " + message);
        }
        @Override public String toString() { return name + " (push)"; }
    }

    public static void demonstrateObserver() {
        System.out.println("\n=== Observer (подписка на новости) ===");

        NewsService service = new NewsService();

        service.subscribe(new EmailSubscriber("Алексей"));
        service.subscribe(new PushSubscriber("Мария"));
        service.subscribe(new EmailSubscriber("Дмитрий"));

        service.publish("Java 23 вышел!");
        service.publish("Новая библиотека для AI доступна!");
    }

    // ===================== Strategy =====================

    /**
     * Strategy: замена алгоритма в рантайме.
     * Клиент использует Strategy, но не знает конкретную реализацию.
     */
    interface SortingStrategy {
        void sort(int[] array);
    }

    static class BubbleSort implements SortingStrategy {
        @Override
        public void sort(int[] array) {
            int n = array.length;
            for (int i = 0; i < n - 1; i++) {
                for (int j = 0; j < n - i - 1; j++) {
                    if (array[j] > array[j + 1]) {
                        int temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                    }
                }
            }
        }
        @Override public String toString() { return "Bubble Sort"; }
    }

    static class QuickSort implements SortingStrategy {
        @Override
        public void sort(int[] array) {
            quickSort(array, 0, array.length - 1);
        }
        private void quickSort(int[] array, int low, int high) {
            if (low < high) {
                int pi = partition(array, low, high);
                quickSort(array, low, pi - 1);
                quickSort(array, pi + 1, high);
            }
        }
        private int partition(int[] array, int low, int high) {
            int pivot = array[high];
            int i = low - 1;
            for (int j = low; j < high; j++) {
                if (array[j] < pivot) {
                    i++;
                    int temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            int temp = array[i + 1];
            array[i + 1] = array[high];
            array[high] = temp;
            return i + 1;
        }
        @Override public String toString() { return "Quick Sort"; }
    }

    /**
     * Context: использует Strategy.
     */
    static class SortEngine {
        private SortingStrategy strategy;
        public void setStrategy(SortingStrategy strategy) { this.strategy = strategy; }
        public void sort(int[] array) {
            System.out.println("Сортирую через " + strategy + "...");
            strategy.sort(array);
        }
    }

    public static void demonstrateStrategy() {
        System.out.println("\n=== Strategy (сортировка) ===");

        int[] data = {5, 2, 8, 1, 9, 3};

        // Меняем стратегию в рантайме!
        SortEngine engine = new SortEngine();

        engine.setStrategy(new BubbleSort());
        int[] copy1 = data.clone();
        engine.sort(copy1);
        System.out.println("Bubble Sort: " + Arrays.toString(copy1));

        engine.setStrategy(new QuickSort());
        int[] copy2 = data.clone();
        engine.sort(copy2);
        System.out.println("Quick Sort:  " + Arrays.toString(copy2));
    }

    // ===================== Chain of Responsibility =====================

    /**
     * Chain of Responsibility: запрос проходит по цепочке обработчиков.
     * Каждый обработчик решает: обрабатывать или передать дальше.
     */
    static abstract class Handler {
        protected Handler next;
        public void setNext(Handler next) { this.next = next; }

        public void handle(String request) {
            if (next != null) {
                next.handle(request);
            }
        }
    }

    static class LoggingHandler extends Handler {
        @Override
        public void handle(String request) {
            System.out.println("  📝 Log: '" + request + "'");
            super.handle(request);
        }
    }

    static class ValidationHandler extends Handler {
        @Override
        public void handle(String request) {
            if (request == null || request.trim().isEmpty()) {
                System.out.println("  ❌ Валидация: пустой запрос!");
                return;
            }
            System.out.println("  ✅ Валидация: OK");
            super.handle(request);
        }
    }

    static class ProcessingHandler extends Handler {
        @Override
        public void handle(String request) {
            System.out.println("  ⚙️ Обработка: '" + request + "'");
            super.handle(request);
        }
    }

    public static void demonstrateChain() {
        System.out.println("\n=== Chain of Responsibility ===");

        // Строим цепочку: Log → Validate → Process
        Handler log = new LoggingHandler();
        Handler validate = new ValidationHandler();
        Handler process = new ProcessingHandler();

        log.setNext(validate);
        validate.setNext(process);

        System.out.println("Обработка 'Hello':");
        log.handle("Hello");

        System.out.println("\nОбработка '': (пустой)");
        log.handle("");
    }

    // ===================== Decorator =====================

    /**
     * Decorator: добавляем поведение объекту динамически.
     * Реальный пример: BufferedReader(InputStream) — декорированный InputStream.
     */
    interface Message {
        String send();
        int cost();
    }

    static class BasicMessage implements Message {
        private final String text;
        public BasicMessage(String text) { this.text = text; }
        @Override public String send() { return "Отправка: " + text; }
        @Override public int cost() { return 1; }
    }

    static class EncryptedDecorator implements Message {
        private final Message wrapped;
        public EncryptedDecorator(Message wrapped) { this.wrapped = wrapped; }
        @Override public String send() { return "🔒 [encrypted] " + wrapped.send(); }
        @Override public int cost() { return wrapped.cost() + 2; }
    }

    static class SignedDecorator implements Message {
        private final Message wrapped;
        public SignedDecorator(Message wrapped) { this.wrapped = wrapped; }
        @Override public String send() { return "✍️ [signed] " + wrapped.send(); }
        @Override public int cost() { return wrapped.cost() + 1; }
    }

    public static void demonstrateDecorator() {
        System.out.println("\n=== Decorator (декорирование сообщений) ===");

        Message msg = new BasicMessage("Привет, мир!");
        System.out.println("Базовое: " + msg.send() + ", стоимость: " + msg.cost());

        msg = new EncryptedDecorator(msg);
        System.out.println("Шифр: " + msg.send() + ", стоимость: " + msg.cost());

        msg = new SignedDecorator(msg);
        System.out.println("Шифр+подпись: " + msg.send() + ", стоимость: " + msg.cost());

        // Это как BufferedReader(InputStream) — декораторы наслаиваются!
        System.out.println("Аналог: BufferedReader = new BufferedReader(new InputStreamReader(System.in))");
    }

    // ===================== Практический пример: Builder + Factory =====================

    /**
     * Builder — построение сложных объектов по частям.
     */
    static class HttpRequestBuilder {
        private String url = "";
        private String method = "GET";
        private final Map<String, String> headers = new HashMap<>();
        private String body = "";

        public HttpRequestBuilder url(String url) {
            this.url = url;
            return this;
        }

        public HttpRequestBuilder method(String method) {
            this.method = method.toUpperCase();
            return this;
        }

        public HttpRequestBuilder header(String key, String value) {
            headers.put(key, value);
            return this;
        }

        public HttpRequestBuilder body(String body) {
            this.body = body;
            return this;
        }

        public HttpRequest build() {
            return new HttpRequest(url, method, headers, body);
        }
    }

    static class HttpRequest {
        private final String url;
        private final String method;
        private final Map<String, String> headers;
        private final String body;

        HttpRequest(String url, String method, Map<String, String> headers, String body) {
            this.url = url;
            this.method = method;
            this.headers = new HashMap<>(headers);
            this.body = body;
        }

        @Override
        public String toString() {
            return method + " " + url + "\n" +
                   headers.entrySet().stream()
                           .map(e -> e.getKey() + ": " + e.getValue())
                           .reduce((a, b) -> a + "\n" + b)
                           .orElse("") +
                   (body.isEmpty() ? "" : "\n\n" + body);
        }
    }

    public static void demonstrateBuilder() {
        System.out.println("\n=== Builder (HTTP-запрос) ===");

        HttpRequest request = new HttpRequestBuilder()
                .url("https://api.example.com/users")
                .method("POST")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer token123")
                .body("{\"name\": \"Алексей\", \"age\": 30}")
                .build();

        System.out.println(request);
    }

    public static void main(String[] args) {
        System.out.println("=== Паттерны проектирования ===");
        demonstrateSingleton();
        demonstrateFactory();
        demonstrateObserver();
        demonstrateStrategy();
        demonstrateChain();
        demonstrateDecorator();
        demonstrateBuilder();
    }
}
