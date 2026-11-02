package org.baileyseyes._2.main;

import static org.baileyseyes._2.classes_objects.util.ConstantsClass.JAVA_VERSION;

import org.baileyseyes._2.classes_objects.entity.Human;
import org.baileyseyes._2.classes_objects.service.HumanService;

/**
 * Класс для демонстрации работы с объектом человека.
 *
 * @see org.baileyseyes._2.classes_objects.util.ConstantsClass Следующая часть
 * @see HumanService Предыдущая часть
 */
public class HumanMain {

    public static void main(String[] args) {
        if (JAVA_VERSION == 17){
            System.out.println("Поддерживаемая версия");
            System.out.println(" ");
        }

        // Создание экземпляра сервиса
        HumanService service = new HumanService();

        // Демонстрация создания человека с помощью метода createSimpleHuman
        System.out.println("=== Создание человека через метод createSimpleHuman ===");
        Human human1 = service.createSimpleHuman();
        System.out.println("Создан человек: " + service.getHumanInfo(human1));

        // Демонстрация создания человека с помощью метода createHuman
        System.out.println("\n=== Создание человека через метод createHuman ===");
        Human human2 = service.createHuman("Alice", 30, true);
        System.out.println("Создан человек: " + service.getHumanInfo(human2));

        // Демонстрация изменения данных человека
        System.out.println("\n=== Изменение данных человека ===");
        System.out.println("Изначально: " + service.getHumanInfo(human1));
        service.changeName(human1, "Bob");
        service.changeAge(human1, 28);
        System.out.println("После изменений: " + service.getHumanInfo(human1));

        // Демонстрация проверки взрослости
        System.out.println("\n=== Проверка взрослости ===");
        System.out.println("Человек 1 (возраст " + human1.getAge() + ") взрослый: " + service.isAdult(human1));
        System.out.println("Человек 2 (возраст " + human2.getAge() + ") взрослый: " + service.isAdult(human2));

        // Демонстрация празднования дня рождения
        System.out.println("\n=== Празднование дня рождения ===");
        System.out.println("До дня рождения: " + service.getHumanInfo(human1));
        service.celebrateBirthday(human1);
        System.out.println("После дня рождения: " + service.getHumanInfo(human1));

        // Демонстрация создания человека с разными конструкторами
        System.out.println("\n=== Создание человеков с разными конструкторами ===");
        Human human3 = service.createHumanWithNameAndAge("Charlie", 22);
        System.out.println("Человек с именем и возрастом: " + service.getHumanInfo(human3));

        Human human4 = service.createHumanWithAge(35);
        System.out.println("Человек только с возрастом: " + service.getHumanInfo(human4));

        // Демонстрация работы с Builder
        System.out.println("\n=== Создание человека с помощью Builder ===");
        Human human5 = service.createHumanWithBuilder("Diana", 27, true);
        System.out.println("Человек через Builder: " + service.getHumanInfo(human5));

        // Демонстрация обновления нескольких параметров
        System.out.println("\n=== Обновление нескольких параметров ===");
        System.out.println("Изначально: " + service.getHumanInfo(human4));
        service.updateHuman(human4, "Eve", 40, false);
        System.out.println("После обновления: " + service.getHumanInfo(human4));
    }
}
