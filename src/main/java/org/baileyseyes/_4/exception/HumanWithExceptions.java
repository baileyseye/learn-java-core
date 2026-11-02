package org.baileyseyes._4.exception;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import org.baileyseyes._2.classes_objects.entity.Human;

/**
 * @see org.baileyseyes._5.__start_from_here__.HelloCollections Следующая часть
 * @see HumanNotFoundException Предыдущая часть
 */
public class HumanWithExceptions {

    private static final int ZERO_AGE = 0; // Хорошая практика выносить магические числа в константы и давать им адекватные имена
    private static final int IMPOSSIBLE_AGE = 150;

    /**
     * Метод для поиска человека по имени.
     * <p>
     * Если человек не найден, выбрасывается кастомное исключение.
     * </p>
     *
     * @param humans массив людей
     * @param name имя для поиска
     * @return найденный человек
     * @throws HumanNotFoundException если человек не найден
     */
    public static Human findHumanByName(Human[] humans, String name) throws HumanNotFoundException {
        try {
            if (humans == null) {
                throw new IllegalArgumentException("Массив людей не может быть null");
            }

            for (Human human : humans) {
                if (human != null && human.getName() != null && human.getName().equals(name)) {
                    return human;
                }
            }

            throw new HumanNotFoundException("Человек с именем '" + name + "' не найден");
        } catch (IllegalArgumentException e) {
            throw e; // Пробрасываем IllegalArgumentException как есть
        } catch (Exception e) {
            throw new HumanNotFoundException("Ошибка при поиске человека: " + e.getMessage());
        }
    }

    /**
     * Метод для записи данных человека в файл.
     * <p>
     * Использует try-with-resources для автоматического закрытия ресурсов.
     * </p>
     *
     * @param human объект человека
     * @param filename имя файла
     * @throws IOException если возникает ошибка ввода-вывода
     */
    public static void writeHumanToFile(Human human, String filename) throws IOException {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filename))) {
            writer.println(human.getName() + "," + human.getAge() + "," + human.isAlive());
        }
    }

    /**
     * Метод для безопасного получения возраста человека.
     * <p>
     * Обрабатывает возможные исключения при работе с данными.
     * </p>
     *
     * @param human объект человека
     * @return возраст человека или 0 если возникла ошибка
     */
    public static int getHumanAgeSafely(Human human) {
        try {
            if (human == null) {
                throw new NullPointerException("Человек не может быть null");
            }
            return human.getAge();
        } catch (NullPointerException e) {
            System.out.println("Ошибка получения возраста: " + e.getMessage());
            return ZERO_AGE;
        }
    }

    /**
     * Метод для проверки корректности возраста.
     * <p>
     * Выбрасывает исключение при некорректном возрасте.
     * </p>
     *
     * @param age возраст для проверки
     * @throws IllegalArgumentException если возраст некорректен
     */
    public static void validateAge(int age) throws IllegalArgumentException {
        if (age < ZERO_AGE) {
            throw new IllegalArgumentException("Возраст не может быть отрицательным: " + age);
        }
        if (age > IMPOSSIBLE_AGE) {
            throw new IllegalArgumentException("Возраст не может быть больше 150: " + age);
        }
    }

    /**
     * Метод для создания человека с валидацией.
     * <p>
     * Использует try-catch для обработки исключений валидации.
     * </p>
     *
     * @param name имя человека
     * @param age возраст человека
     * @param isAlive состояние жизни
     * @return созданный человек или null если возникла ошибка
     */
    public static Human createHumanWithValidation(String name, int age, boolean isAlive) {
        try {
            validateAge(age);

            return Human.builder()
                .name(name)
                .age(age)
                .isAlive(isAlive)
                .build();
        } catch (IllegalArgumentException e) {
            System.out.println("Ошибка валидации: " + e.getMessage());
            return null;
        }
    }

    /**
     * Главный метод для демонстрации работы с исключениями.
     */
    public static void main(String[] args) {
        System.out.println("=== Демонстрация исключений с классом Human ===");

        Human[] humans = {
            Human.builder().name("Иван").age(25).isAlive(true).build(),
            Human.builder().name("Мария").age(30).isAlive(true).build(),
            Human.builder().name("Петр").age(35).isAlive(false).build()
        };

        // Демонстрация поиска человека
        System.out.println("\n=== Поиск человека ===");
        try {
            Human found = findHumanByName(humans, "Иван");
            System.out.println("Найден человек: " + found.getName() + ", возраст: " + found.getAge());
        } catch (HumanNotFoundException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        try {
            Human found = findHumanByName(humans, "Анна");
            System.out.println("Найден человек: " + found.getName());
        } catch (HumanNotFoundException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Демонстрация валидации возраста
        System.out.println("\n=== Валидация возраста ===");
        try {
            validateAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Ошибка валидации: " + e.getMessage());
        }

        try {
            validateAge(200);
        } catch (IllegalArgumentException e) {
            System.out.println("Ошибка валидации: " + e.getMessage());
        }

        // Демонстрация безопасного получения возраста
        System.out.println("\n=== Безопасное получение возраста ===");
        Human human = humans[0];
        int age = getHumanAgeSafely(human);
        System.out.println("Возраст: " + age);

        Human nullHuman = null;
        int nullAge = getHumanAgeSafely(nullHuman);
        System.out.println("Возраст null человека: " + nullAge);

        // Демонстрация создания человека с валидацией
        System.out.println("\n=== Создание человека с валидацией ===");
        Human validHuman = createHumanWithValidation("Анна", 28, true);
        if (validHuman != null) {
            System.out.println("Создан человек: " + validHuman.getName() + ", возраст: " + validHuman.getAge());
        }

        Human invalidHuman = createHumanWithValidation("Борис", -10, true);
        if (invalidHuman != null) {
            System.out.println("Создан человек: " + invalidHuman.getName());
        } else {
            System.out.println("Не удалось создать человека из-за ошибки валидации");
        }

        // Демонстрация работы с файлами
        System.out.println("\n=== Работа с файлами ===");
        try {
            // Создаем временный файл для демонстрации
            Human testHuman = Human.builder()
                .name("Тест")
                .age(40)
                .isAlive(true)
                .build();

            writeHumanToFile(testHuman, "temp_human.txt");
            System.out.println("Человек записан в файл");
        } catch (IOException e) {
            System.out.println("Ошибка работы с файлами: " + e.getMessage());
        }
    }
}