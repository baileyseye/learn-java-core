/* ===== Learn Java Core — визуализатор курса (vanilla JS, без зависимостей) ===== */
try {

    /* ==================== ДАННЫЕ ==================== */

    var MODULES = [
        {n:0,folder:null,title:'Точка входа',sub:'Демо Main от IntelliJ',color:'#7a8699'},
        {n:1,folder:'_1',title:'Основы языка',sub:'типы, строки, массивы, условия, циклы, методы',color:'#e0672c'},
        {n:2,folder:'_2',title:'Классы и объекты',sub:'ООП база, entity/service/main, Lombok',color:'#c0392b'},
        {n:3,folder:'_3',title:'Виды классов',sub:'interface, enum, record, annotation, reflection',color:'#8e44ad'},
        {n:4,folder:'_4',title:'Исключения',sub:'try/catch/finally, try-with-resources',color:'#2f6fed'},
        {n:5,folder:'_5',title:'Коллекции',sub:'List, Set, Map, Queue/Deque',color:'#0f9d8f'},
        {n:6,folder:'_6',title:'Многопоточность',sub:'Thread, Runnable, Callable, synchronized',color:'#d48806'},
        {n:7,folder:'_7',title:'Продвинутый Core',sub:'Optional, Stream, Generics, IO, паттерны',color:'#5b6ee1'}
    ];

    /* [id, kind, loc, main, start, nextId, summary] */
    var CHAIN_NODES = [
        ['_1.__start_from_here__.HelloWorld','class',52,true,true,'_1.types.PrimitiveTypes','Старт курса. Метод main — точка входа. Javadoc задаёт ссылку на следующий шаг.'],
        ['_1.types.PrimitiveTypes','class',153,true,false,'_1.types.TypeConversion','byte/short/int/long/float/double/boolean/char, диапазоны, суффикс L.'],
        ['_1.types.TypeConversion','class',72,false,false,'_1.types.StringType','Неявное widening, явное narrowing, число<->строка.'],
        ['_1.types.StringType','class',213,true,false,'_1.types.IntArray','Неизменяемость String, equals vs ==, substring/trim/replace.'],
        ['_1.types.IntArray','class',116,true,false,'_1.if_else.IfElse','Массивы int[], Arrays.toString/sort, min/max/sum.'],
        ['_1.if_else.IfElse','class',363,true,false,'_1.if_else.AssigningWithIfElse','if / else if / else, && || !, вложенные условия.'],
        ['_1.if_else.AssigningWithIfElse','class',93,true,false,'_1.cycles.For','Присваивание переменной в ветках условия.'],
        ['_1.cycles.For','class',293,true,false,'_1.cycles.While','for(init;cond;step), вложенный for, for-each.'],
        ['_1.cycles.While','class',226,true,false,'_1.methods.Methods','while, do-while, break/continue.'],
        ['_1.methods.Methods','class',226,true,false,'_2.__start_from_here__.HelloObjects','Сигнатура метода, параметры, return, перегрузка.'],
        ['_2.__start_from_here__.HelloObjects','class',11,false,true,'_2.classes_objects.entity.Human','Вход в модуль ООП: класс=чертёж, объект=экземпляр.'],
        ['_2.classes_objects.entity.Human','class',110,false,false,'_2.classes_objects.service.HumanService','Поля private name/age/alive, геттеры/сеттеры, @Getter/@Setter/@Builder.'],
        ['_2.classes_objects.service.HumanService','class',223,false,false,'_2.main.HumanMain','Сервис создаёт/меняет/читает Human — разделение ответственности.'],
        ['_2.main.HumanMain','class',72,true,false,'_2.classes_objects.util.ConstantsClass','Запуск сценария жизни объекта.'],
        ['_2.classes_objects.util.ConstantsClass','class',15,false,false,'_2.classes_objects.util.ConstantInterface','static final константы в классе.'],
        ['_2.classes_objects.util.ConstantInterface','interface',13,false,false,'_3.__start_from_here__.HelloJavaClassTypes','Константы в интерфейсе.'],
        ['_3.__start_from_here__.HelloJavaClassTypes','class',10,false,true,'_3.interface_class.SayNo','Вход в виды классов: interface/enum/record/annotation.'],
        ['_3.interface_class.SayNo','interface',12,false,false,'_3.interface_class.impl.SayNoImpl','void sayNo() — контракт без реализации.'],
        ['_3.interface_class.impl.SayNoImpl','class',17,false,false,'_3.main.Main','implements SayNo + @Override.'],
        ['_3.main.Main','class',15,true,false,'_3.enum_class.DaysOfTheWeek','Точка запуска модуля _3.'],
        ['_3.enum_class.DaysOfTheWeek','enum',17,false,false,'_3.enum_class.InformatedDaysOfTheWeek','MONDAY..SUNDAY — простые константы.'],
        ['_3.enum_class.InformatedDaysOfTheWeek','enum',27,false,false,'_3.enum_class.EnumPractice','enum с полем-описанием, конструктором и методом.'],
        ['_3.enum_class.EnumPractice','class',269,true,false,'_3.record.Human','values()/valueOf()/ordinal(), switch по enum.'],
        ['_3.record.Human','record',18,false,false,'_3.annotation.Service','record(name, age, isAlive) — иммутабельный DTO вместо class Human.'],
        ['_3.annotation.Service','annotation',22,false,false,'_3.annotation.HumanService','Своя аннотация @Target(TYPE) @Retention(SOURCE).'],
        ['_3.annotation.HumanService','class',10,false,false,'_4.__start_from_here.HelloExceptionsAndTryCatch','Класс, помеченный своей аннотацией @Service.'],
        ['_4.__start_from_here.HelloExceptionsAndTryCatch','class',23,false,true,'_4.try_catch_finally.TryCatchFinally','Вход в тему исключений (папка называется __start_from_here без парных__).'],
        ['_4.try_catch_finally.TryCatchFinally','class',299,true,false,'_4.try_catch_finally.TryWithResources','ArithmeticException, ArrayIndexOutOfBounds, finally всегда выполняется.'],
        ['_4.try_catch_finally.TryWithResources','class',242,true,false,'_4.exception.HumanNotFoundException','try(resource) и AutoCloseable, suppressed exceptions.'],
        ['_4.exception.HumanNotFoundException','class',17,false,false,'_4.exception.HumanWithExceptions','Свой exception с сообщением.'],
        ['_4.exception.HumanWithExceptions','class',207,true,false,'_5.__start_from_here__.HelloCollections','Валидация возраста: throw + перехват.'],
        ['_5.__start_from_here__.HelloCollections','class',11,false,true,'_5.list.CollectionList','Вход в коллекции.'],
        ['_5.list.CollectionList','class',389,true,false,'_5.set.CollectionSet','ArrayList add/get/set/remove, removeIf.'],
        ['_5.set.CollectionSet','class',124,true,false,'_5.map.CollectionMap','HashSet уникальность, LinkedHashSet порядок, TreeSet сортировка.'],
        ['_5.map.CollectionMap','class',502,true,false,'_6.__start_from_here__.HelloMultiThreading','HashMap put/get, computeIfAbsent, merge, TreeMap.'],
        ['_6.__start_from_here__.HelloMultiThreading','class',12,false,true,'_6.extends_thread.ExtendsThread','Вход в многопоточность.'],
        ['_6.extends_thread.ExtendsThread','class',63,true,false,'_6.implements_runnable.ImplementsRunnable','class X extends Thread, run(), start().'],
        ['_6.implements_runnable.ImplementsRunnable','class',64,true,false,'_6.implements_callable.ImplementsCallable','class X implements Runnable + lambda.'],
        ['_6.implements_callable.ImplementsCallable','class',76,true,false,'_6.synchronized_method.SynchronizedMethods','Callable<V> + Future.get().'],
        ['_6.synchronized_method.SynchronizedMethods','class',167,true,false,'_7.Else','synchronized метод/блок против гонок.'],
        ['_7.Else','class',204,true,false,'_7.StreamAPI','Optional, Predicate, Comparator, java.time.'],
        ['_7.StreamAPI','class',538,true,false,null,'filter/map/flatMap/collect/groupingBy — финальный шаг курса.']
    ];

    /* [id, kind, loc, main, anchorId, summary] */
    var EXTRA_NODES = [
        ['Main','class',23,true,'_1.__start_from_here__.HelloWorld','Демо-файл IntelliJ, создан до начала курса.'],
        ['_1.if_else.SwitchStatement','class',268,true,'_1.if_else.IfElse','switch и switch-выражения, yield.'],
        ['_1.types.TernaryOperator','class',275,true,'_1.if_else.AssigningWithIfElse','Тернарный оператор.'],
        ['_1.methods.ScannerInput','class',305,true,'_1.methods.Methods','Ввод с клавиатуры Scanner.'],
        ['_2.classes_objects.Inheritance','class',192,true,'_2.classes_objects.entity.Human','extends, super, @Override.'],
        ['_2.classes_objects.AbstractClasses','class',199,true,'_2.classes_objects.Inheritance','abstract класс и полиморфизм.'],
        ['_2.classes_objects.BuilderAndLombok','class',363,true,'_2.classes_objects.AbstractClasses','Builder + Lombok boilerplate.'],
        ['_3.AccessModifiersDemo','class',113,true,'_3.__start_from_here__.HelloJavaClassTypes','public/protected/package-private/private.'],
        ['_3.ReflectionDemo','class',299,true,'_3.AccessModifiersDemo','getDeclaredFields, setAccessible.'],
        ['_3.interface_class.SayNothing','interface',6,false,'_3.interface_class.SayNo','Минимальный интерфейс.'],
        ['_3.interface_class.SayYes','interface',6,false,'_3.interface_class.SayNo','Второй интерфейс.'],
        ['_3.interface_class.impl.SayYesImpl','class',11,false,'_3.interface_class.SayYes','Реализация SayYes.'],
        ['_3.interface_class.impl.SayNothingImpl','class',11,false,'_3.interface_class.SayNothing','Реализация SayNothing.'],
        ['_3.interface_class.impl.SayNothingMoreImpl','class',11,false,'_3.interface_class.impl.SayNothingImpl','Цепочка реализаций.'],
        ['_3.interface_class.impl.SayNothingNeverMoreImpl','class',11,false,'_3.interface_class.impl.SayNothingMoreImpl','Цепочка реализаций.'],
        ['_3.interface_class.impl.SayEverything','class',20,false,'_3.interface_class.SayNo','implements двух интерфейсов сразу.'],
        ['_3.annotation.UselessButNeedToKnow','annotation',28,false,'_3.annotation.Service','@interface с ElementType.TYPE.'],
        ['_4.exception.AdditionalExceptions','class',308,true,'_4.try_catch_finally.TryWithResources','checked vs unchecked, rethrow.'],
        ['_5.QueueAndDeque','class',243,true,'_5.map.CollectionMap','Queue/Deque/PriorityQueue.'],
        ['_5.CollectionsUtils','class',341,true,'_5.QueueAndDeque','Collections.sort/shuffle/unmodifiableList.'],
        ['_6.CompletableFutureDemo','class',361,true,'_6.synchronized_method.SynchronizedMethods','supplyAsync/thenApply/thenCompose.'],
        ['_6.ReentrantLockDemo','class',359,true,'_6.CompletableFutureDemo','lock/unlock/tryLock + Condition.'],
        ['_6.ThreadLocalDemo','class',353,true,'_6.ReentrantLockDemo','Локальные переменные потока.'],
        ['_7.FunctionalInterfaces','class',347,true,'_7.Else','Function/Consumer/Predicate/Supplier.'],
        ['_7.GenericsDemo','class',512,true,'_7.FunctionalInterfaces','Дженерики и wildcards.'],
        ['_7.Container','class',513,false,'_7.GenericsDemo','Generic-класс Container<T> внутри того же файла GenericsDemo.java.'],
        ['_7.FileIO','class',301,true,'_7.GenericsDemo','Files.readString/BufferedReader/Writer.'],
        ['_7.DesignPatternsDemo','class',542,true,'_7.FileIO','Singleton/Builder/Factory/Strategy/Observer.']
    ];

    var SNIPPETS = {};

    /*
     * Полные тексты исходников. Сгенерировано из src/main/java — не править вручную,
     * иначе код на странице разъедется с реальным файлом.
     */

    SNIPPETS['_1.__start_from_here__.HelloWorld'] = `package org.baileyseyes._1.__start_from_here__;

import org.baileyseyes._1.types.PrimitiveTypes;

/**
 * В Java нельзя объявить какой-либо метод без класса-объекта
 *
 * @see PrimitiveTypes Следующая часть
 */
@SuppressWarnings("all") //способ скрыть отображение "ошибок" по мнению InteliJ IDEA
public class HelloWorld {  // <--- класс-объект

    public static void main(String[] args) { //<--- какой-либо метод, находится внутри фигурных скобок класса-объекта
        /*
        С этого места программа и начинает выполнение разного кода. С метода main.
        Для удобства можно написать psvm(при активном курсоре в пространстве класса, без метода) и затем enter.
        А любое программирование начинается с самого простого - вывода текста в консоль!
        Ниже будет представлен способ это сделать
         */
        System.out.println("Hello World");
        /*
        Чтобы не запоминать как там что пишется System точка out тра-ляля, можно просто написать sout и затем enter
        println - это метод. Метод - набор инструкций с заранее продуманным сценарием, который задаете вы.
        метод println принимает в себя строку(текст). Принимает - это означает что после его объявления в скобочки () нужно вписать строку
        через литералы "", как показано на 15 строке. main - это тоже метод, в данном классе в методе main вызовется метод println внутри
        которого находится Hello World и выведется в консоль Hello World. Попробуйте ниже вывести в консоль что-нибудь своё
         */

        //TODO: тут нужно что-то вывести в консоль своё

        /*
        После этого нажмите на зеленую стрелочку около main либо HelloWorld класс.
         */
    }

    /**
     * Дальше продолжайте изучение типов данных, которые присутствуют в языке. Начиная с {@linkplain PrimitiveTypes примитивных типов}
     */
    public static void whatToDoNext(){
        /*
        Имя этого метода - серое, потому что он просто создан и... Нигде не используется.
        Метод без использования какого-либо = ничего не делает. Вообще.
        Чтобы его использовать нужно написать внутри метода main(например на 25 строчке) whatToDoNext();
        Если так сделать - ничего не произойдет, потому что внутри этого метода нет никакой логики.
         */
    }

    /*
    Добавлено несколько отступов для визуального наглядного примера, где заканчивается метод main (29 строка)
    И где заканчивается сам класс-объект HelloWorld(49 строка).
    */
}`;

    SNIPPETS['_1.types.PrimitiveTypes'] = `package org.baileyseyes._1.types;

import org.baileyseyes._1.__start_from_here__.HelloWorld;

/**
 * Демонстрирует примитивные типы данных в Java.
 *
 * @see TypeConversion Следующая часть
 * @see HelloWorld Предыдущая часть
 */
@SuppressWarnings("all")
public class PrimitiveTypes {

    public static void howToCreateType() {
        /* чтобы создать какойто тип нужно его в начале объявить */
        int x = 5; // создали переменную 'х' и сразу присвоили ей значение 5
        int y; // можем так же создать переменную и не инициализировать ее сразу, а потом.

        System.out.println(x); // вывели в консоль значение переменной 'х'

        y = 5; // присваиваем значение тут

        System.out.println(y);
    }

    /**
     * Демонстрация целочисленных примитивных типов данных
     * <ul>
     *     <li>{@code byte} - 8-бит (-128 до 127)</li>
     *     <li>{@code short} - 16-бит (-32,768 до 32,767)</li>
     *     <li>{@code int} - 32-бит (-2,147,483,648 до 2,147,483,647)</li>
     *     <li>{@code long} - 64-бит (от -9,223,372,036,854,775,808 до 9,223,372,036,854,775,807)</li>
     * </ul>
     */
    public static void demonstrateIntegerTypes() {
        byte byteValue = 10;
        short shortValue = 1000;
        int intValue = 100000; /* int - самый часто используемый из целочисленных типов */
        long longValue = 1000000000000L; // 'L' нужен для обозначения long. Используется когда значения int-а не хватает (количество людей)

        System.out.println("Byte value: " + byteValue);
        System.out.println("Short value: " + shortValue);
        System.out.println("Int value: " + intValue);
        System.out.println("Long value: " + longValue);
    }

    /**
     * Демонстрация типов данных с плавающей точкой.
     * <ul>
     *     <li>{@code float} - 32-бит </li>
     *     <li>{@code double} - 64-бит </li>
     * </ul>
     * <p>
     * {@code double} является стандартным типом для чисел с плавающей точкой.
     * </p>
     */
    public static void demonstrateFloatingPointTypes() {
        float floatValue = 3.14f; // 'f' нужен для обозначения float
        double doubleValue = 3.14159265359;

        System.out.println("Float value: " + floatValue);
        System.out.println("Double value: " + doubleValue);
    }

    /**
     * Демонстрация типа {@code char}.
     * <p>
     * {@code char} представляет один 16-битный символ Юникода.
     * </p>
     */
    public static void demonstrateCharType() {
        char charValue = 'A';
        char unicodeChar = '\\u0041'; // Unicode для 'A'
        char escapeChar = '\\n'; // Переход на новую строку

        System.out.println("Char value: " + charValue);
        System.out.println("Unicode Char value: " + unicodeChar);
        System.out.println("Escape Char value (new line): " + escapeChar);
    }

    /**
     * Демонстрация типа {@code boolean}.
     * <p>
     * {@code boolean} может принимать только два значения: {@code true} или {@code false}.
     * </p>
     */
    public static void demonstrateBooleanType() {
        boolean boolTrue = true;
        boolean boolFalse = false;

        System.out.println("Boolean true: " + boolTrue);
        System.out.println("Boolean false: " + boolFalse);
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("\\n=== Methods ===");
        demonstrateIntegerTypes();
        demonstrateFloatingPointTypes();
        demonstrateCharType();
        demonstrateBooleanType();

        System.out.println("\\n=== Tricks ===");
        Tricks.primitiveTricks(); /* Как мы вызываем метод класса Tricks. С привязкой к самому классу через точку */

    }

    /**
     * Класс внутри класса. Так лучше не делать кроме крайних случаев. Всегда лучше создать класс в отдельном файле.
     * Тут показаны некоторые фишки, которые есть у примитивов.
     */
    static class Tricks {

        public static void primitiveTricks() {
            int maximumValue = Integer.MAX_VALUE; // сразу готовое максимальное значение инта
            int minimumValue = Integer.MIN_VALUE; // минимальное

            System.out.println(maximumValue + " " + minimumValue + " from Tricks.class");

            Integer objectInteger = 5; // это объект уже

            Boolean objectBoolean = true; //на самом деле превратится в Boolean.valueOf(true);
            Boolean objectBooleanOtherInit = Boolean.TRUE;
        }

        /**
         * Способ не объявлять тип, а дать среде разработки додуматься, какой тип использоваться должен на месте var.
         * <br>
         * Так лучше никогда не оставлять код ни при каких условиях. При разработке написании кода - можно, так легче будет.
         * <br>
         * А потом через alt-enter при активном курсоре var заменить на реальный тип, чтобы это визуально было понятно даже через блокнот.
         */
        public void demonstrateVarWithPrimitives() {
            var intValue = 42;          // Тип выводится как int
            var longValue = 1234567890L; // Тип выводится как long
            var floatValue = 3.14f;      // Тип выводится как float
            var doubleValue = 3.14159;   // Тип выводится как double
            var charValue = 'A';         // Тип выводится как char
            var boolValue = true;        // Тип выводится как boolean

            System.out.println("var with primitives:");
            System.out.println("int: " + intValue);
            System.out.println("long: " + longValue);
            System.out.println("float: " + floatValue);
            System.out.println("double: " + doubleValue);
            System.out.println("char: " + charValue);
            System.out.println("boolean: " + boolValue);
        }
    }
}`;

    SNIPPETS['_1.types.TypeConversion'] = `package org.baileyseyes._1.types;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Класс демонстрирует преобразование типов данных в Java.
 *
 * @see StringType Следующая часть
 * @see PrimitiveTypes Предыдущая часть
 */
@SuppressWarnings("all")
@UselessButNeedToKnow
public class TypeConversion {

    /**
     * Демонстрация явного преобразования (casting)
     * <p>
     * Требуется явное указание типа
     * </p>
     * <pre>
     * double -> float -> long -> int -> short -> byte
     * </pre>
     */
    public void demonstrateNarrowing() {
        double doubleValue = 123.456;
        float floatValue = 123.456f;
        long longValue = 1234567890L;
        int intValue = 123456789;

        // Явное преобразование
        byte narrowedByte = (byte) intValue; // int -> byte (может потерять данные)
        short narrowedShort = (short) longValue; // long -> short (может потерять данные)
        int narrowedInt = (int) floatValue; // float -> int (может потерять дробную часть)
        float narrowedFloat = (float) doubleValue; // double -> float (может потерять точность)

        System.out.println("\\nNarrowing conversions:");
        System.out.println("double " + doubleValue + " to byte " + narrowedByte);
        System.out.println("long " + longValue + " to short " + narrowedShort);
        System.out.println("float " + floatValue + " to int " + narrowedInt);
        System.out.println("double " + doubleValue + " to float " + narrowedFloat);
    }

    /**
     * Демонстрация преобразования между примитивными и ссылочными типами.
     * <p>
     * Например, преобразование строки в число и обратно.
     * </p>
     *
     * @see StringType ознакомиться со строками вначале тут
     */
    public void demonstrateStringConversion() {
        // int -> String
        int number = 123;
        String stringNumber = Integer.toString(number); // или "" + number
        System.out.println("int " + number + " to String " + stringNumber);

        // String -> int
        String input = "456";
        int parsedNumber = Integer.parseInt(input);
        System.out.println("String " + input + " to int " + parsedNumber);

        // double -> String
        double doubleValue = 123.456;
        String stringDouble = Double.toString(doubleValue);
        System.out.println("double " + doubleValue + " to String " + stringDouble);

        // String -> double
        String doubleInput = "789.012";
        double parsedDouble = Double.parseDouble(doubleInput);
        System.out.println("String " + doubleInput + " to double " + parsedDouble);
    }
}`;

    SNIPPETS['_1.types.StringType'] = `package org.baileyseyes._1.types;

/**
 * Демонстрирует строковый тип данных в Java.
 *
 * @see IntArray Следующая часть
 * @see TypeConversion Предыдущая часть
 * @apiNote изучить StringPool
 */
@SuppressWarnings("all")
public class StringType {

    /**
     * Демонстрация основных характеристик строки.
     * <p>
     * {@code String} в Java - это не примитивный тип данных, а класс из пакета {@code java.lang}
     * Строки в Java неизменяемы (immutable), что означает, что после создания строку нельзя изменить.
     * Все операции над строками создают новую строку.
     * </p>
     * <p>
     * Строки в Java представлены как последовательности символов типа {@code char}
     * </p>
     */
    public static void demonstrateBasics() {
        // Создание строки
        String str1 = "Hello"; // Литерал строки
        String str2 = new String("World"); // Объект строки
        String str3 = "Hello"; // Ссылается на тот же объект в пуле строк("Hello")

        System.out.println("String literals: " + str1 + " " + str3);
        System.out.println("String object: " + str2);
        System.out.println("Are str1 and str3 equal? " + (str1 == str3)); // true (тот же объект в пуле)
        System.out.println("Are str1 and str2 equal? " + (str1 == str2)); // false (разные объекты)

        // Длина строки
        System.out.println("Length of '" + str1 + "': " + str1.length());

        // Доступ к символам
        char firstChar = str1.charAt(0); /* в java везде 0 - это первый номер чего-либо */
        System.out.println("First character of '" + str1 + "': " + firstChar);

        // Конкатенация строк
        String concatenated = str1 + " " + str2;
        String concatenatedWithConcat = str1.concat(str2);
        System.out.println("Concatenated: " + concatenated);
        System.out.println("Concatenated with .concat() : " + concatenatedWithConcat);
    }

    /**
     * Демонстрация методов класса {@code String}.
     * <p>
     * Класс {@code String} предоставляет множество полезных методов для работы со строками.
     * </p>
     */
    public static void demonstrateMethods() {
        String text = "  Hello World!  ";

        // Методы для получения информации
        System.out.println("Length: " + text.length());
        System.out.println("Trimmed: '" + text.trim() + "'");

        // Методы для изменения регистра
        System.out.println("Lowercase: " + text.toLowerCase());
        System.out.println("Uppercase: " + text.toUpperCase());

        // Поиск подстроки
        boolean contains = text.contains("World");
        System.out.println("Contains 'World': " + contains);

        // Замена
        String replaced = text.replace("World", "Java");
        System.out.println("Replaced: " + replaced);

        // Подстрока
        String substring = text.substring(2, 7);
        System.out.println("Substring from 2 to 7: '" + substring + "'");
    }

    /**
     * Демонстрация неизменяемости строки.
     * <p>
     * Строки в Java неизменяемы. Все операции, которые кажутся изменением строки,
     * создают новую строку.
     * </p>
     */
    public static void demonstrateImmutability() {
        String original = "Hello";
        System.out.println("Original before operations: '" + original + "'");

        // Эти операции создают новые строки
        String upper = original.toUpperCase();
        String trimmed = original.trim();
        String concat = original.concat(" World");

        System.out.println("Original after operations: '" + original + "'"); // Не изменилась
        System.out.println("Upper case: '" + upper + "'");
        System.out.println("Trimmed: '" + trimmed + "'");
        System.out.println("Concatenated: '" + concat + "'");
    }

    /**
     * Демонстрация сравнения строк.
     * <p>
     * Важно использовать метод {@code equals()} для сравнения содержимого строк.
     * Оператор {@code ==} проверяет ссылку на объект, а не содержимое.
     * </p>
     */
    public static void demonstrateComparison() {
        String str1 = "Hello";
        String str2 = new String("Hello");
        String str3 = "Hello";

        System.out.println("str1 == str2: " + (str1 == str2)); // false
        System.out.println("str1 == str3: " + (str1 == str3)); // true (в пуле строк)
        System.out.println("str1.equals(str2): " + str1.equals(str2)); // true
        System.out.println("str1.equals(str3): " + str1.equals(str3)); // true

        // Сравнение без учета регистра
        String lowerStr1 = "hello";
        String upperStr2 = "HELLO";
        System.out.println("Ignoring case: " + lowerStr1.equalsIgnoreCase(upperStr2)); // true
    }

    /**
     * Демонстрация специальных символов и экранирования.
     * <p>
     * Символы экранирования используются для представления специальных символов в строках.
     * </p>
     */
    public static void demonstrateSpecialChars() {
        String tab = "Hello\\tWorld"; // Табуляция
        String newline = "Hello\\nWorld"; // Новая строка
        String quote = "He said \\"Hello\\""; // Экранированные кавычки
        String backslash = "Path: C:\\\\Users\\\\Name"; // Экранированный обратный слеш

        System.out.println("Tab: " + tab);
        System.out.println("Newline:\\n" + newline);
        System.out.println("Quote: " + quote);
        System.out.println("Backslash: " + backslash);
    }

    /**
     * Демонстрация форматирования строк.
     * <p>
     * Строки можно форматировать с помощью {@code String.format()}, {@code System.out.printf()},
     * или {@code MessageFormat}.
     * </p>
     */
    public static void demonstrateFormatting() {
        String name = "Alice";
        int age = 30;
        double score = 95.5;

        // Использование String.format()
        String format = String.format("Name: %s, Age: %d, Score: %.2f", name, age, score);
        System.out.println(format);

        // Использование String.formatted()
        String formatted = "Name: %s, Age: %d, Score: %.2f".formatted(name, age, score);
        System.out.println(formatted);

        // Использование System.out.printf()
        System.out.printf("Name: %s, Age: %d, Score: %.2f%n", name, age, score);
    }

    public static void stringTricks() {
        // Проверка на null и пустоту
        String nullStr = null;
        String emptyStr = "";
        String blankStr = "   ";

        System.out.println("Is nullStr null? " + (nullStr == null));
        System.out.println("Is emptyStr empty? " + (emptyStr.isEmpty()));
        System.out.println("Is blankStr empty? " + (blankStr.isEmpty()));
        System.out.println("Is blankStr blank? " + (blankStr.isBlank()));

        // Повторение строки
        String repeated = "Java ".repeat(3);
        System.out.println("Repeated: " + repeated);

        // Объединение строк через join
        String[] words = {"Hello", "beautiful", "world"}; // массив строк, где объявляем не одну строку, а сразу несколько в одной ссылке words
        String joined = String.join(" ", words);
        System.out.println("Joined: " + joined);
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\\n=== Methods ===");
        demonstrateMethods();

        System.out.println("\\n=== Immutability ===");
        demonstrateImmutability();

        System.out.println("\\n=== Comparison ===");
        demonstrateComparison();

        System.out.println("\\n=== Special Characters ===");
        demonstrateSpecialChars();

        System.out.println("\\n=== Formatting ===");
        demonstrateFormatting();

        System.out.println("\\n=== Tricks ===");
        stringTricks();
    }
}`;

    SNIPPETS['_1.types.IntArray'] = `package org.baileyseyes._1.types;

import java.util.Arrays;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует массивы целых чисел в Java.
 * <br>
 *
 * @see org.baileyseyes._1.if_else.IfElse Следующая часть
 * @see StringType Предыдущая часть
 */
@SuppressWarnings("all")
@UselessButNeedToKnow
public class IntArray {

    /**
     * Демонстрация основных характеристик массивов.
     * <p>
     * Массив в Java - это упорядоченная коллекция элементов одного типа.
     * Массивы имеют фиксированный размер, который определяется при создании.
     * Все элементы массива инициализируются значениями по умолчанию для их типа.
     * Для {@code int[]} значения по умолчанию равны 0.
     * </p>
     * <p>
     * Массивы в Java являются объектами и хранятся в куче (heap).
     * Переменная массива содержит ссылку на объект массива в куче.
     * </p>
     */
    public static void demonstrateBasics() {
        int[] arr1 = new int[3]; // Создание массива размером 3(может хранить 3 значения)

        // Инициализация при создании
        int[] arr2 = {1, 2, 3, 4, 5};

        // Инициализация с помощью литерала массива
        int[] arr3 = new int[]{10, 20, 30};

        System.out.println("Length of arr3: " + arr2.length);
    }

    /**
     * Демонстрация методов класса {@code Arrays} для работы с массивами.
     */
    public static void demonstrateArraysClass() {
        int[] arr1 = {5, 2, 8, 1, 9};
        int[] arr2 = {5, 2, 8, 1, 9};

        // Сравнение массивов
        boolean isEqual = Arrays.equals(arr1, arr2);
        System.out.println("Arrays equal: " + isEqual);

        String[] strArr1 = {"Zebra", "Apple", "Banana", "Cat"};
        String[] strArr2 = {"Zebra", "Apple", "Banana", "Cat"};

        // Сравнение массивов строк
        boolean isEqualStrings = Arrays.equals(strArr1, strArr2);
        System.out.println("Arrays equal: " + isEqualStrings);
    }

    /**
     * Демонстрация различных операций с массивами.
     */
    public static void demonstrateOperations() {
        int[] arr1 = {1, 2, 3, 4, 5};
        int[] arr2 = {6, 7, 8, 9, 10};

        // Поиск минимального и максимального значения
        int min = Arrays.stream(arr1)
            .min()
            .orElse(Integer.MAX_VALUE);

        int max = Arrays.stream(arr1)
            .max()
            .orElse(Integer.MIN_VALUE);

        System.out.println("Min in arr1: " + min);
        System.out.println("Max in arr1: " + max);

        // Сумма элементов
        int sum = Arrays.stream(arr1).sum();
        System.out.println("Sum of arr1 elements: " + sum);
    }

    public static void arraysTricks() {
        // Сравнение ссылок на массивы (не содержимого)
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {1, 2, 3};
        int[] arr3 = arr1; // Та же ссылка

        System.out.println("arr1 == arr2: " + (arr1 == arr2)); // false (разные объекты)
        System.out.println("arr1 == arr3: " + (arr1 == arr3)); // true (та же ссылка)

        // Использование Arrays.toString()
        int[] simpleArray = {1, 2, 3, 4, 5};
        System.out.println("Array as string: " + Arrays.toString(simpleArray));
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\\n=== Arrays Class ===");
        demonstrateArraysClass();

        System.out.println("\\n=== Operations ===");
        demonstrateOperations();

        System.out.println("\\n=== Tricks ===");
        arraysTricks();
    }
}`;

    SNIPPETS['_1.if_else.IfElse'] = `package org.baileyseyes._1.if_else;

/**
 * Демонстрирует операторы условий if-else в Java
 *
 * @see AssigningWithIfElse Следующая часть
 * @see org.baileyseyes._1.types.IntArray  Предыдущая часть
 */
@SuppressWarnings("all")
public class IfElse {

    /**
     * Демонстрация базового синтаксиса оператора if.
     * <p>
     * Оператор {@code if} выполняет блок кода, если условие истинно.
     * Синтаксис: {@code if (condition) { block_of_code; }}
     * </p>
     */
    public static void demonstrateBasicIf() {
        int x = 10;
        int y = 20;

        if (x < y) { // дословно - если 10 меньше 20 (в данном случае условие всегда истинно)
            System.out.println("x is less than y");
        }

        // Условие может быть любым выражением, результат которого boolean
        if (x == 10) {
            System.out.println("x equals 10");
        }

        // Нельзя использовать не boolean выражения
        // if (x) { } // Ошибка компиляции
    }

    /**
     * Демонстрация оператора if-else.
     * <p>
     * Оператор {@code if-else} выполняет один блок кода, если условие истинно,
     * и другой блок, если условие ложно.
     * Синтаксис: {@code if (condition) { block_if_true; } else { block_if_false; }}
     * </p>
     */
    public static void demonstrateIfElse() {
        int score = 85;

        if (score >= 60) {
            System.out.println("Passed");
        } else {
            System.out.println("Failed");
        }

        // Проверка четности числа
        int number = 7;

        if (number % 2 == 0) { // операция ОСТАТОК ОТ ДЕЛЕНИЯ (прогуглить как оно)
            System.out.println(number + " is even");
        } else {
            System.out.println(number + " is odd");
        }
    }

    /**
     * Демонстрация оператора if-else-if.
     * <p>
     * Оператор {@code if-else-if} позволяет проверять несколько условий.
     * Блок выполняется, когда первое истинное условие.
     * </p>
     */
    public static void demonstrateIfElseIf() {
        int grade = 85;

        if (grade >= 90) {
            System.out.println("Grade: A");
        } else if (grade >= 80) {
            System.out.println("Grade: B");
        } else if (grade >= 70) {
            System.out.println("Grade: C");
        } else if (grade >= 60) {
            System.out.println("Grade: D");
        } else {
            System.out.println("Grade: F");
        }

        // Пример с логическими операторами
        int age = 25;

        if (age < 13) {
            System.out.println("Child");
        } else if (age < 20) {
            System.out.println("Teenager");
        } else if (age < 65) {
            System.out.println("Adult");
        } else {
            System.out.println("Senior");
        }
    }

    /**
     * Демонстрация вложенных условий.
     * <p>
     * Условия могут быть вложенными друг в друга.
     * </p>
     *
     * @apiNote так лучше не делать, лучше вложенные ифы выносить в приватные методы (выделить -> extract -> method)
     */
    public static void demonstrateNestedIf() {
        int x = 10;
        int y = 20;

        if (x > 0) {
            if (y > 0) {
                System.out.println("Both x and y are positive");
            } else {
                System.out.println("x is positive, y is not positive");
            }
        } else {
            System.out.println("x is not positive");
        }

        // Пример с проверкой диапазона
        int temperature = 25;

        if (temperature > 0) {
            if (temperature < 10) {
                System.out.println("Cold");
            } else if (temperature < 20) {
                System.out.println("Cool");
            } else {
                System.out.println("Warm");
            }
        } else {
            System.out.println("Freezing");
        }
    }

    /**
     * Демонстрация логических операторов в условиях.
     * <p>
     * Логические операторы {@code &&}, {@code ||}, {@code !} используются для комбинирования условий.
     * </p>
     */
    public static void demonstrateLogicalOperators() {
        int age = 25;
        boolean hasLicense = true;
        boolean hasCar = false;

        // Оператор AND (&&)
        if (age >= 18 && hasLicense) {
            System.out.println("Can drive legally");
        }

        // Оператор OR (||)
        if (hasCar || hasLicense) {
            System.out.println("Has means to travel");
        }

        // Оператор NOT (!)
        if (!hasCar) {
            System.out.println("Does not have a car");
        }

        // Сложное условие
        if ((age >= 18 && hasLicense) || hasCar) {
            System.out.println("Eligible for driving or transportation");
        }
    }

    /**
     * Демонстрация тернарного оператора.
     * <p>
     * Тернарный оператор {@code ? :} является сокращенной формой if-else.
     * Синтаксис: {@code condition ? value_if_true : value_if_false}
     * </p>
     */
    public static void demonstrateTernaryOperator() {
        int a = 10;
        int b = 20;

        // Простое использование
        int max = (a > b) ? a : b; // если а больше б то а, иначе б
        System.out.println("Maximum of " + a + " and " + b + " is " + max);

        // Присвоение значения переменной
        String result = (a > b) ? "a is greater" : "b is greater or equal";
        System.out.println(result);

        // Вложенные тернарные операторы (не рекомендуется так делать))
        int x = 10;
        int y = 20;
        int z = 30;
        int greatest = (x > y) ? ((x > z) ? x : z) : ((y > z) ? y : z);
        System.out.println("Greatest among " + x + ", " + y + ", " + z + " is " + greatest);

        // Использование в выводе
        int number = 15;
        System.out.println(number + " is " + ((number % 2 == 0) ? "even" : "odd"));
    }

    /**
     * Демонстрация оператора switch.
     * <p>
     * Оператор {@code switch} используется для множественного выбора на основе значения.
     * </p>
     */
    public static void demonstrateSwitch() {
        int dayOfWeek = 3;

        // Switch с операторами break
        switch (dayOfWeek) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }

        // Switch с выражением - возвращает значение
        String dayName = switch (dayOfWeek) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6 -> "Saturday";
            case 7 -> "Sunday";
            default -> "Invalid day";
        };

        System.out.println("Day name using switch expression: " + dayName);
    }

    /**
     * Демонстрация различных паттернов использования условий.
     */
    public static void demonstratePatterns() {
        // Проверка на null
        String str = null;

        if (str != null) {
            System.out.println("String length: " + str.length());
        } else {
            System.out.println("String is null");
        }

        // Проверка на пустую строку
        String emptyStr = "";

        if (emptyStr != null && !emptyStr.isEmpty()) {
            System.out.println("String is not empty");
        } else {
            System.out.println("String is null or empty");
        }

        // Проверка на диапазон
        int value = 50;

        if (value >= 0 && value <= 100) {
            System.out.println("Value is in range [0, 100]");
        } else {
            System.out.println("Value is out of range [0, 100]");
        }

        // Использование в методах
        int result = calculateGrade(85);
        System.out.println("Calculated grade: " + result);
    }

    /**
     * Пример метода, использующего условные конструкции.
     *
     * @param score оценка
     * @return числовая оценка
     */
    private static int calculateGrade(int score) {
        if (score >= 90) {
            return 5;
        } else if (score >= 80) {
            return 4;
        } else if (score >= 70) {
            return 3;
        } else if (score >= 60) {
            return 2;
        } else {
            return 1;
        }
    }

    public static void isElseTricks() {
        // Использование switch с enum
        Day today = Day.WEDNESDAY;

        String activity = switch (today) {
            case MONDAY -> "Start of work week";
            case TUESDAY -> "Work day";
            case WEDNESDAY -> "Midweek";
            case THURSDAY -> "Work day";
            case FRIDAY -> "End of work week";
            case SATURDAY -> "Weekend";
            case SUNDAY -> "Weekend";
        };

        System.out.println("Today (" + today + ") is " + activity);
    }

    /**
     * Перечисление для демонстрации switch с enum.
     */
    enum Day {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basic If ===");
        demonstrateBasicIf();

        System.out.println("\\n=== If-Else ===");
        demonstrateIfElse();

        System.out.println("\\n=== If-Else-If ===");
        demonstrateIfElseIf();

        System.out.println("\\n=== Nested If ===");
        demonstrateNestedIf();

        System.out.println("\\n=== Logical Operators ===");
        demonstrateLogicalOperators();

        System.out.println("\\n=== Ternary Operator ===");
        demonstrateTernaryOperator();

        System.out.println("\\n=== Switch ===");
        demonstrateSwitch();

        System.out.println("\\n=== Patterns ===");
        demonstratePatterns();

        System.out.println("\\n=== Tricks ===");
        isElseTricks();
    }
}`;

    SNIPPETS['_1.if_else.AssigningWithIfElse'] = `package org.baileyseyes._1.if_else;

import java.util.Random;
import java.util.Scanner;

/**
 * Способ присвоить значение переменной в if-else блоке
 *
 * @see org.baileyseyes._1.cycles.For Следующая часть
 * @see IfElse Предыдущая часть
 */
public class AssigningWithIfElse {

    /**
     * Пример создания константы, можно поменять только тут значение и оно автоматически поменяется в остальных местах
     */
    private static final String NAME = "name";
    private static final int AGE = 18;

    public static void main(String[] args) {
        /*
        Создаем сканер, при запуске этого метода нужно будет перевести курсор на консоль
        и ввести name - нажать enter - затем 18 - enter.
         */
        Scanner scanner = new Scanner(System.in);

        String name = scanner.nextLine(); // создаем переменную, значение которой сами напишем ручками в консоль
        int age = scanner.nextInt();

        /*создаем два булина, значение которым присвоим в зависимости от условий, и исходя от их значения выполним определенную логику */
        boolean isAllowedName;
        boolean isAllowedAge;

        if (name.equalsIgnoreCase(NAME)) {
            System.out.println("Your name is : " + name);
            isAllowedName = true;
        } else {
            isAllowedName = false;
            System.out.println("Your name is wrong");
        }

        if (age >= AGE) {
            System.out.println("Your age is : " + age);
            isAllowedAge = true;
        } else {
            System.out.println("Your age is wrong");
            isAllowedAge = false;
        }

        /*в случае если все проверки успешны - выводится надпись, что мы победили*/
        if (isAllowedName && isAllowedAge) {
            System.out.println("You win");
        } else {
            System.out.println("You lose");
        }

       // demonstrateRandomEvenCheck();
    }

    /**
     * Дополнительный метод для понимания того, что присваивание значений в зависимости от входных данных - очень гибкий механизм
     */
    public static void demonstrateRandomEvenCheck() {
        Random random = new Random();

        boolean isEven;
        int randomNumber;

        for (int i = 1; i <= 10; i++) {
            randomNumber = random.nextInt(100) + 1; // Генерируем случайное число от 1 до 100
            System.out.println("Iteration " + i + ": Generated number = " + randomNumber);

            if (randomNumber % 2 == 0) { // если случайное число окажется четным
                isEven = true;
                System.out.println("Number " + randomNumber + " is even");
            } else {
                isEven = false;
                System.out.println("Number " + randomNumber + " is odd");
            }

            // Если число четное, можно выполнять дополнительные действия
            if (isEven) {
                System.out.println("Action performed because the number is even.");
            } else {
                System.out.println("Action performed because the number is odd.");
            }
        }
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }
}`;

    SNIPPETS['_1.cycles.For'] = `package org.baileyseyes._1.cycles;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует оператор цикла for в Java.
 *
 * @see While Следующая часть
 * @see org.baileyseyes._1.if_else.AssigningWithIfElse Предыдущая часть
 */
@SuppressWarnings("all")
public class For {

    /**
     * Демонстрация базового синтаксиса цикла for.
     * <p>
     * Базовый синтаксис цикла for: {@code for (initialization; condition; update) { body; }}
     * </p>
     * <p>
     * Цикл for выполняется до тех пор, пока условие истинно.
     * </p>
     */
    public static void demonstrateBasicFor() {
        // Простой цикл от 1 до 5
        System.out.println("Basic for loop (1 to 5):");
        for (int i = 1; i <= 5; i++) { /*Дословно i = это итерируемое число внутри цикла(1) и мы его инкрементируем i++ пока оно не станет равно 5*/
            System.out.print(i + " ");
        }
        System.out.println();

        // Цикл с убывающим счетчиком
        System.out.println("Countdown from 5 to 1:");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Цикл с шагом больше 1
        System.out.println("Even numbers from 2 to 10:");
        for (int i = 2; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация цикла for с массивами.
     * <p>
     * Цикл for часто используется для прохождения по элементам массива.
     * </p>
     */
    public static void demonstrateForWithArrays() {
        int[] numbers = {1, 2, 3, 4, 5};
        String[] names = {"Alice", "Bob", "Charlie", "David"};

        // Проход по массиву с использованием индекса
        System.out.println("Numbers array:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }

        // Проход по строковому массиву
        System.out.println("Names array:");
        for (int i = 0; i < names.length; i++) {
            System.out.println("Index " + i + ": " + names[i]);
        }

        // Суммирование элементов массива
        int sum = 0;
        for (int i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        System.out.println("Sum of array elements: " + sum);

        // Поиск максимального элемента
        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        System.out.println("Maximum element: " + max);
    }

    /**
     * Демонстрация for-each
     * <p>
     * Улучшенный цикл for позволяет проходить по элементам коллекции или массива без использования индексов.
     * Синтаксис: {@code for (type variable : collection) { body; }}
     * </p>
     */
    public static void demonstrateEnhancedFor() {
        int[] numbers = {10, 20, 30, 40, 50};
        String[] fruits = {"Apple", "Banana", "Cherry", "Date"};

        // Использование for-each с массивом чисел
        System.out.println("Enhanced for loop with numbers:");
        for (int number : numbers) {
            System.out.print(number + " ");
        }
        System.out.println();

        // Использование for-each со строковым массивом
        System.out.println("Enhanced for loop with fruits:");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация вложенных циклов for.
     * <p>
     * Циклы могут быть вложенными друг в друга.
     * </p>
     */
    public static void demonstrateNestedFor() {
        // Таблица умножения
        System.out.println("Multiplication table (5x5):");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 5; j++) {
                System.out.printf("%3d ", i * j);
            }
            System.out.println();
        }

        // Вложенные циклы с разными переменными
        System.out.println("Nested loop with different counters:");
        for (int i = 0; i < 3; i++) {
            System.out.println("Outer loop iteration " + i);
            for (int j = 0; j < 2; j++) {
                System.out.println("  Inner loop iteration " + j);
            }
        }
    }

    /**
     * Демонстрация использования break и continue в цикле for.
     * <p>
     * Оператор {@code break} прерывает выполнение цикла.
     * Оператор {@code continue} пропускает текущую итерацию и переходит к следующей.
     * </p>
     */
    public static void demonstrateBreakContinue() {
        // Использование break
        System.out.println("Using break:");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break; // Прерываем цикл при достижении 5
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // Использование continue
        System.out.println("Using continue:");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue; // Пропускаем четные числа
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // Комбинированное использование
        System.out.println("Combined break and continue:");
        for (int i = 1; i <= 10; i++) {
            if (i > 7) {
                break; // Прерываем при достижении 8
            }
            if (i % 2 == 0) {
                continue; // Пропускаем четные числа
            }
            System.out.print(i + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация цикла for с различными типами данных.
     */
    public static void demonstrateForWithDifferentTypes() {
        // Цикл с char
        System.out.println("Characters from A to E:");
        for (char c = 'A'; c <= 'E'; c++) {
            System.out.print(c + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация различных паттернов использования цикла for.
     */
    public static void demonstratePatterns() {
        // Поиск элемента в массиве
        int[] searchArray = {1, 3, 5, 7, 9, 11, 13};
        int target = 7;
        boolean found = false;
        int index = -1;

        for (int i = 0; i < searchArray.length; i++) {
            if (searchArray[i] == target) {
                found = true;
                index = i;
                break;
            }
        }
        if (found) {
            System.out.println("Element " + target + " found at index " + index);
        } else {
            System.out.println("Element " + target + " not found");
        }

        // Сортировка пузырьком (пример)
        @UselessButNeedToKnow
        int[] bubbleArray = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + java.util.Arrays.toString(bubbleArray));

        for (int i = 0; i < bubbleArray.length - 1; i++) {
            for (int j = 0; j < bubbleArray.length - i - 1; j++) {
                if (bubbleArray[j] > bubbleArray[j + 1]) {
                    // Swap
                    int temp = bubbleArray[j];
                    bubbleArray[j] = bubbleArray[j + 1];
                    bubbleArray[j + 1] = temp;
                }
            }
        }
        System.out.println("Sorted array: " + java.util.Arrays.toString(bubbleArray));

        // Генерация последовательности
        System.out.println("Fibonacci sequence (first 10 terms):");
        int a = 0, b = 1;
        System.out.print(a + " " + b + " ");
        for (int i = 2; i < 10; i++) {
            int next = a + b;
            System.out.print(next + " ");
            a = b;
            b = next;
        }
        System.out.println();
    }

    public static void forTricks() {
        // Использование for для создания строк
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append(i).append(" ");
        }
        System.out.println("Built string with for loop: " + sb.toString());

        // Использование for с условием, зависящим от внешнего состояния
        boolean shouldContinue = true;
        int iterations = 0;
        for (int i = 0; shouldContinue && i < 100; i++) {
            iterations++;
            if (i > 50) {
                shouldContinue = false;
            }
        }
        System.out.println("Iterations before stopping: " + iterations);
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basic For ===");
        demonstrateBasicFor();

        System.out.println("\\n=== For with Arrays ===");
        demonstrateForWithArrays();

        System.out.println("\\n=== Enhanced For ===");
        demonstrateEnhancedFor();

        System.out.println("\\n=== Nested For ===");
        demonstrateNestedFor();

        System.out.println("\\n=== Break Continue ===");
        demonstrateBreakContinue();

        System.out.println("\\n=== Different Types ===");
        demonstrateForWithDifferentTypes();

        System.out.println("\\n=== Patterns ===");
        demonstratePatterns();

        System.out.println("\\n=== Tricks ===");
        forTricks();
    }
}`;

    SNIPPETS['_1.cycles.While'] = `package org.baileyseyes._1.cycles;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует операторы цикла while и do-while в Java.
 *
 * @see org.baileyseyes._1.methods.Methods Следующая часть
 * @see For Предыдущая часть
 */
@UselessButNeedToKnow
@SuppressWarnings("all")
public class While {

    /**
     * Демонстрация базового синтаксиса цикла while.
     * <p>
     * Цикл {@code while} выполняет блок кода, пока условие истинно.
     * Синтаксис: {@code while (condition) { body; }}
     * </p>
     * <p>
     * Условие проверяется перед каждой итерацией.
     * Если условие изначально ложно, тело цикла не выполнится ни разу.
     * </p>
     */
    public static void demonstrateBasicWhile() {
        // Простой счетчик
        int i = 1;
        System.out.println("Basic while loop (1 to 5):");
        while (i <= 5) {
            System.out.print(i + " ");
            i++;
        }
        System.out.println();

        // Цикл с убывающим счетчиком
        int j = 5;
        System.out.println("Countdown from 5 to 1:");
        while (j >= 1) {
            System.out.print(j + " ");
            j--;
        }
        System.out.println();

        // Цикл с условием на основе ввода пользователя
        int counter = 0;
        System.out.println("While loop with increment condition:");
        while (counter < 3) {
            System.out.println("Iteration " + (counter + 1));
            counter++;
        }
    }

    /**
     * Демонстрация цикла while с массивами.
     * <p>
     * Цикл while может использоваться для обхода массивов.
     * </p>
     */
    public static void demonstrateWhileWithArrays() {
        int[] numbers = {10, 20, 30, 40, 50};

        // Обход массива с использованием while
        System.out.println("While loop with numbers array:");
        int index = 0;
        while (index < numbers.length) {
            System.out.println("Index " + index + ": " + numbers[index]);
            index++;
        }
    }

    /**
     * Демонстрация использования break и continue в цикле while.
     * <p>
     * Оператор {@code break} прерывает выполнение цикла.
     * Оператор {@code continue} пропускает текущую итерацию и переходит к следующей.
     * </p>
     */
    public static void demonstrateWhileBreakContinue() {
        // Использование break
        System.out.println("While loop with break:");
        int k = 1;
        while (k <= 10) {
            if (k == 5) {
                break; // Прерываем цикл при достижении 5
            }
            System.out.print(k + " ");
            k++;
        }
        System.out.println();

        // Использование continue
        System.out.println("While loop with continue:");
        int l = 1;
        while (l <= 10) {
            if (l % 2 == 0) {
                l++;
                continue; // Пропускаем четные числа
            }
            System.out.print(l + " ");
            l++;
        }
        System.out.println();
    }

    /**
     * Демонстрация цикла do-while.
     * <p>
     * Цикл {@code do-while} выполняет блок кода хотя бы один раз,
     * а затем проверяет условие для продолжения.
     * Синтаксис: {@code do { body; } while (condition);}
     * </p>
     * <p>
     * В отличие от {@code while}, {@code do-while} гарантирует выполнение тела хотя бы один раз.
     * </p>
     */
    public static void demonstrateDoWhile() {
        // Простой пример
        int n = 1;
        System.out.println("Do-while loop (1 to 5):");
        do {
            System.out.print(n + " ");
            n++;
        } while (n <= 5);
        System.out.println();

        // Цикл с проверкой ввода пользователя
        int attempts = 0;
        int maxAttempts = 3;
        boolean validInput = false;
        System.out.println("Do-while for input validation:");
        do {
            attempts++;
            System.out.println("Attempt " + attempts + " (minimum 1 attempt guaranteed)");
            // Здесь могла бы быть проверка ввода
            if (attempts >= 2) {
                validInput = true;
            }
        } while (!validInput && attempts < maxAttempts);
    }

    /**
     * Вложенный класс для демонстрации примеров do-while.
     */
    static class DoWhileExamples {

        /**
         * Демонстрация базовых примеров do-while.
         */
        public static void demonstrateBasicDoWhile() {
            // Простой пример с счетчиком
            int counter = 1;
            System.out.println("Basic do-while with counter:");
            do {
                System.out.print(counter + " ");
                counter++;
            } while (counter <= 5);
            System.out.println();

            // Пример с пользовательским вводом
            System.out.println("Do-while for menu selection:");
            int choice = 0;
            do {
                System.out.println("Menu:");
                System.out.println("1. Option 1");
                System.out.println("2. Option 2");
                System.out.println("3. Exit");
                System.out.println("Enter your choice (1-3):");
                // В реальном приложении здесь был бы Scanner
                choice = 3; // Имитация выбора
                if (choice == 1) {
                    System.out.println("You selected Option 1");
                } else if (choice == 2) {
                    System.out.println("You selected Option 2");
                } else if (choice == 3) {
                    System.out.println("Exiting...");
                } else {
                    System.out.println("Invalid choice, please try again");
                }
            } while (choice != 3);
        }

        /**
         * Демонстрация do-while с вводом данных.
         */
        public static void demonstrateInputValidation() {
            // Пример валидации ввода
            int number = -1;
            boolean validInput = false;

            System.out.println("Do-while for input validation:");
            do {
                // Имитация ввода
                number = 15; // Имитация ввода пользователя
                if (number >= 0 && number <= 100) {
                    validInput = true;
                    System.out.println("Valid input received: " + number);
                } else {
                    System.out.println("Invalid input. Please enter a number between 0 and 100.");
                }
            } while (!validInput);
        }
    }

    public static void tryIt() {
        //TODO потренироваться можно здесь
    }

    public static void main(String[] args) {
        System.out.println("=== Basic While ===");
        demonstrateBasicWhile();

        System.out.println("\\n=== While with Arrays ===");
        demonstrateWhileWithArrays();

        System.out.println("\\n=== While Break Continue ===");
        demonstrateWhileBreakContinue();

        System.out.println("\\n=== Do-While ===");
        demonstrateDoWhile();

        System.out.println("\\n=== Do-While Examples ===");
        DoWhileExamples.demonstrateBasicDoWhile();
        DoWhileExamples.demonstrateInputValidation();
    }
}`;

    SNIPPETS['_1.methods.Methods'] = `package org.baileyseyes._1.methods;

/**
 * Демонстрация понятия методов в Java
 *
 * @see org.baileyseyes._2.__start_from_here__.HelloObjects Следующая часть
 * @see org.baileyseyes._1.cycles.While Предыдущая часть
 */
@SuppressWarnings("all")
public class Methods {

    /**
     * Метод без возвращаемого значения и без параметров.
     * <p>
     * Синтаксис: {@code public void methodName()}
     * </p>
     * <p>
     * {@code public} - модификатор доступа (метод доступен из любого места)
     * {@code void} - тип возвращаемого значения (ничего не возвращает)
     * {@code methodName} - имя метода
     * </p>
     */
    public void methodWithoutReturnAndParameters() {
        System.out.println("Этот метод ничего не возвращает и не принимает параметры");
        System.out.println("Он просто выполняет действия");
    }

    /**
     * Метод без возвращаемого значения, но с параметрами.
     * <p>
     * Синтаксис: {@code public void methodName(parameterType parameterName)}
     * </p>
     *
     * @param name имя человека
     * @param age  возраст человека
     */
    public void methodWithoutReturnWithParameters(String name, int age) { // подходит для динамических входных данных
        System.out.println("Метод с параметрами:");
        System.out.println("Имя: " + name);
        System.out.println("Возраст: " + age);
    }

    /**
     * Метод с возвращаемым значением и без параметров.
     * <p>
     * Синтаксис: {@code public returnType methodName()}
     * </p>
     *
     * @return возвращает целое число
     */
    public int methodWithReturnAndNoParameters() { // подходит для статических данных, тут всегда возвращает 42
        System.out.println("Этот метод возвращает целое число ");
        return 42;
    }

    /**
     * Метод с возвращаемым значением и параметрами.
     * <p>
     * Синтаксис: {@code public returnType methodName(parameterType parameterName)}
     * </p>
     *
     * @param age возраст человека
     * @return возвращает удвоенное значение возраста
     */
    public int methodWithReturnAndParameters(int age) { //то есть мы передаем туда возраст, а он возвращает его удвоенный
        System.out.println("Метод с параметрами и возвращаемым значением");
        System.out.println("Принятый возраст: " + age);
        int doubledAge = age * 2;
        System.out.println("Удвоенный возраст: " + doubledAge);

        return doubledAge; //возвращаем измененный возраст
    }

    /**
     * Метод с несколькими параметрами и возвращаемым значением.
     * <p>
     * Метод может принимать несколько параметров разных типов.
     * </p>
     *
     * @param name имя человека
     * @param age  возраст человека
     * @param isAlive жив ли человек
     * @return строку с информацией о человеке
     */
    public String methodWithMultipleParameters(String name, int age, boolean isAlive) {
        System.out.println("Метод с несколькими параметрами:");
        System.out.println("Имя: " + name);
        System.out.println("Возраст: " + age);
        System.out.println("Жив: " + isAlive);

        String result = "Человек: " + name + ", возраст " + age + ", " + (isAlive ? "жив" : "мертв");
        return result;
    }

    /**
     * Метод для проверки, является ли человек взрослым.
     * <p>
     * Метод принимает возраст и возвращает булево значение.
     * </p>
     *
     * @param age возраст человека
     * @return true если человек взрослый (возраст >= 18), иначе false
     */
    public boolean isAdult(int age) {
        System.out.println("Проверка взрослости для возраста: " + age);
        boolean result = age >= 18;
        System.out.println("Результат: " + result);
        return result;
    }

    /**
     * Метод для увеличения возраста человека.
     * <p>
     * Метод принимает текущий возраст и возвращает новый возраст.
     * </p>
     *
     * @param currentAge текущий возраст
     * @return новый возраст (на 1 больше текущего)
     */
    public int increaseAge(int currentAge) {
        System.out.println("Увеличение возраста:");
        System.out.println("Сейчас: " + currentAge);
        int newAge = currentAge + 1;
        System.out.println("Стало: " + newAge);
        return newAge;
    }

    /**
     * Метод для демонстрации работы с несколькими параметрами.
     * <p>
     * Показывает, как можно передавать разные типы данных в метод.
     * </p>
     *
     * @param name    имя человека
     * @param age     возраст человека
     * @param height  рост человека (в см)
     * @param weight  вес человека (в кг)
     * @param isAlive жив ли человек
     * @return строку с полной информацией
     */
    public String getFullHumanInfo(String name, int age, int height, int weight, boolean isAlive) {
        System.out.println("Получение полной информации о человеке:");
        System.out.println("Имя: " + name);
        System.out.println("Возраст: " + age);
        System.out.println("Рост: " + height + " см");
        System.out.println("Вес: " + weight + " кг");
        System.out.println("Жив: " + isAlive);

        return String.format("Человек %s, возраст %d лет, рост %d см, вес %d кг, %s",
            name, age, height, weight, isAlive ? "жив" : "мертв");
    }

    /**
     * Метод для демонстрации возврата значения.
     * <p>
     * Метод выполняет вычисления и возвращает результат.
     * </p>
     *
     * @param a первое число
     * @param b второе число
     * @return сумму двух чисел
     */
    public int numbersSum(int a, int b) {
        System.out.println("Сложение чисел:");
        System.out.println("Число 1: " + a);
        System.out.println("Число 2: " + b);
        int sum = a + b;
        System.out.println("Сумма: " + sum);
        return sum;
    }

    /**
     * Метод для демонстрации выполнения действий без возврата.
     * <p>
     * Метод выполняет действия, но не возвращает значение.
     * </p>
     *
     * @param message сообщение для вывода
     */
    public void printMessage(String message) {
        System.out.println("Вывод сообщения:");
        System.out.println(message);
    }

    public static void main(String[] args) {
        // Создание экземпляра класса Methods
        Methods methods = new Methods();

        System.out.println("=== Метод без возвращаемого значения и без параметров ===");
        methods.methodWithoutReturnAndParameters();

        System.out.println("\\n=== Метод без возвращаемого значения, но с параметрами ===");
        methods.methodWithoutReturnWithParameters("Алексей", 25);

        System.out.println("\\n=== Метод с возвращаемым значением и без параметров ===");
        int result1 = methods.methodWithReturnAndNoParameters();
        System.out.println("Возвращенное значение: " + result1);

        System.out.println("\\n=== Метод с возвращаемым значением и параметрами ===");
        int result2 = methods.methodWithReturnAndParameters(30); // вернет 60
        System.out.println("Возвращенное значение: " + result2);

        System.out.println("\\n=== Метод с несколькими параметрами и возвращаемым значением ===");
        String result3 = methods.methodWithMultipleParameters("Мария", 28, true);
        System.out.println("Возвращенное значение: " + result3);

        System.out.println("\\n=== Метод проверки взрослости ===");
        boolean adult = methods.isAdult(25);
        System.out.println("Человек взрослый: " + adult);

        System.out.println("\\n=== Метод увеличения возраста ===");
        int newAge = methods.increaseAge(30);
        System.out.println("Новый возраст: " + newAge);

        System.out.println("\\n=== Метод получения полной информации ===");
        String fullInfo = methods.getFullHumanInfo("Анна", 32, 170, 65, true);
        System.out.println("Полная информация: " + fullInfo);

        System.out.println("\\n=== Метод сложения чисел ===");
        int sum = methods.numbersSum(15, 25);
        System.out.println("Сумма: " + sum);

        System.out.println("\\n=== Метод вывода сообщения ===");
        methods.printMessage("Это тестовое сообщение");
    }
}`;

    SNIPPETS['_2.__start_from_here__.HelloObjects'] = `package org.baileyseyes._2.__start_from_here__;

/**
 * Тут мы будем учиться сами создавать свои объекты, а затем использовать их
 *
 * @see org.baileyseyes._2.classes_objects.entity.Human Следующая часть
 * @see org.baileyseyes._1.methods.Methods Предыдущая часть
 */
public class HelloObjects {

}`;

    SNIPPETS['_2.classes_objects.entity.Human'] = `package org.baileyseyes._2.classes_objects.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

/**
 * Это объект человека, класс. Он должен обладать какими-то качествами,
 * смыслом и функционалом с которым мы будем работать далее
 *
 * @see org.baileyseyes._2.classes_objects.service.HumanService Следующая часть
 * @see org.baileyseyes._2.__start_from_here__.HelloObjects Предыдущая часть
 */
@Getter
@Setter
@Builder
//@AllArgsConstructor после изучения - раскомментируйте строку и удалите все остальные явные конструкторы в коде
@SuppressWarnings("all")
//@FieldDefaults(level = AccessLevel.PRIVATE) - можно раскомментировать и не прописывать перед ПОЛЯМИ private
public class Human {

    /**
     * Имя человека - тут мы его никак не задаем, мы просто присваиваем это качество объекту, которое определим в будущем.
     */
    private String name; // private - для того, чтобы не было доступа к этой переменной без геттера

    /**
     * Возраст человека
     */
    private int age;

    /**
     * Является ли человек живым
     */
    private boolean isAlive;

    /*
    Но для того чтобы мы могли получить доступ к изменению или получению этих свойств объекта, нужно создать геттеры и сеттеры
    */

    /* <<< нажмите alt+insert -> generate -> getters setters -> выберите все поля >>> */

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

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean alive) {
        isAlive = alive;
    }

    /*
    Геттеры и сеттеры - это бойлер код, у них одна реализация для Java, альтернативно нужно использовать аннотации
    @Getter(14 строчка)
    @Setter(15 строчка)

    Имея эти аннотации мы можем удалить все методы геттеров и сеттеров, т.к. эти аннотации их сами сгенерируют по канону
    */

    /*
    Так же этот объект нужно собрать будет. Для сборки используется специальный метод - конструктор
    Его реализация приведена ниже. Точно так же alt + insert -> constructor
     */

    /**
     * Можно создавать разные конструкторы с разным вариантом "сборки" объекта
     */
    public Human(String name, int age, boolean isAlive) {
        this.name = name;
        this.age = age;
        this.isAlive = isAlive;
    }

    public Human(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Human(boolean isAlive, String name) {
        this.isAlive = isAlive;
        this.name = name;
    }

    public Human(int age) {
        this.age = age;
    }

    /*
    Либо всё это можно заменить аннотацией @AllArgsConstructor чтобы избавиться от бойлер-кода(16 строчка)
    Или @Builder чтобы собирать обьект не со всеми аргументами, а частично, чтобы избавиться от телескопического конструктора
     */
}`;

    SNIPPETS['_2.classes_objects.service.HumanService'] = `package org.baileyseyes._2.classes_objects.service;

import org.baileyseyes._2.classes_objects.entity.Human;

/**
 * Так как у нас уже есть объект {@linkplain Human человек}, мы должны что-то научиться делать с ним.
 * <br>
 * В том же классе нельзя производить какую-либо логику с ним, следуя принципам инкапсуляции объект человека только
 * <br>
 * Хранит в себе его свойства, поэтому мы создаем этот класс-сервис в котором будет логика связанная с человеком.
 *
 * @see org.baileyseyes._2.main.HumanMain Следующая часть
 * @see Human Предыдущая часть
 */
@SuppressWarnings("all")
public class HumanService {

    /**
     * Метод для создания нового человека с заданными параметрами.
     * <p>
     * Использует {@linkplain Human#Human(String, int, boolean) конструктор} класса для создания объекта.
     * </p>
     *
     * @param name   имя человека
     * @param age    возраст человека
     * @param isAlive состояние жизни человека
     * @return новый объект {@link Human}
     */
    public Human createHuman(String name, int age, boolean isAlive) { //параметры метода, соотевтствуют полям самого объекта
        // Создание объекта человека с помощью конструктора
        Human human = new Human(name, age, isAlive);
        return human;
    }

    /**
     * Метод для создания человека с использованием конструктора с параметрами.
     * <p>
     * Простой пример создания объекта через конструктор.
     * </p>
     *
     * @return новый объект {@link Human} с заданными значениями
     */
    public Human createSimpleHuman() {
        // Простой пример создания объекта с помощью конструктора со сразу заданными значениями
        Human human = new Human("John", 25, true);
        return human;
    }

    /**
     * Метод для создания человека только с именем и возрастом.
     * <p>
     * Использует конструктор с двумя параметрами.
     * </p>
     *
     * @param name имя человека
     * @param age  возраст человека
     * @return новый объект {@link Human}
     */
    public Human createHumanWithNameAndAge(String name, int age) { //Можно создать человека без boolean isAlive
        // Создание объекта человека с помощью конструктора
        Human human = new Human(name, age);
        return human;
    }

    /**
     * Метод для создания человека с указанием только возраста.
     * <p>
     * Использует конструктор с одним параметром.
     * </p>
     *
     * @param age возраст человека
     * @return новый объект {@link Human}
     */
    public Human createHumanWithAge(int age) {
        // Создание объекта человека с помощью конструктора
        Human human = new Human(age);
        return human;
    }

    /**
     * Метод для получения информации о человеке.
     * <p>
     * Использует геттеры для получения значений полей объекта.
     * </p>
     *
     * @param human объект человека
     * @return строка с информацией о человеке
     */
    public String getHumanInfo(Human human) {
        // Получение значений полей через геттеры
        String name = human.getName();
        int age = human.getAge();
        boolean isAlive = human.isAlive();

        return "Human info - Name: " + name + ", Age: " + age + ", Alive: " + isAlive;
    }

    /**
     * Метод для изменения возраста человека.
     * <p>
     * Использует сеттер для изменения значения поля.
     * </p>
     *
     * @param human объект человека
     * @param newAge новый возраст
     */
    public void changeAge(Human human, int newAge) {
        // Изменение значения поля через сеттер
        human.setAge(newAge);
    }

    /**
     * Метод для изменения имени человека.
     * <p>
     * Использует сеттер для изменения значения поля.
     * </p>
     *
     * @param human объект человека
     * @param newName новое имя
     */
    public void changeName(Human human, String newName) {
        // Изменение значения поля через сеттер
        human.setName(newName);
    }

    /**
     * Метод для изменения состояния жизни человека.
     * <p>
     * Использует сеттер для изменения значения поля.
     * </p>
     *
     * @param human объект человека
     * @param isAlive новое состояние жизни
     */
    public void changeAliveStatus(Human human, boolean isAlive) {
        // Изменение значения поля через сеттер
        human.setAlive(isAlive);
    }

    /**
     * Метод для проверки, является ли человек взрослым.
     * <p>
     * Логика проверки возраста для определения взрослости.
     * </p>
     *
     * @param human объект человека
     * @return true если человек взрослый (возраст >= 18), иначе false
     */
    public boolean isAdult(Human human) {
        // Получение возраста через геттер и проверка условия
        int age = human.getAge();
        return age >= 18;
    }

    /**
     * Метод для увеличения возраста человека на один год.
     * <p>
     * Использует геттер для получения текущего возраста и сеттер для установки нового значения.
     * </p>
     *
     * @param human объект человека
     */
    public void celebrateBirthday(Human human) {
        // Получение текущего возраста
        int currentAge = human.getAge();
        // Увеличение возраста на 1
        human.setAge(currentAge + 1);
    }

    /**
     * Метод для проверки, жив ли человек.
     * <p>
     * Использует геттер для получения значения поля.
     * </p>
     *
     * @param human объект человека
     * @return true если человек жив, иначе false
     */
    public boolean isAlive(Human human) {
        // Получение значения поля через геттер
        return human.isAlive();
    }

    /**
     * Метод для создания человека с использованием Builder паттерна.
     * <p>
     * Использует метод build() для создания объекта через Builder.
     * </p>
     *
     * @param name   имя человека
     * @param age    возраст человека
     * @param isAlive состояние жизни человека
     * @return новый объект {@link Human}
     */
    public Human createHumanWithBuilder(String name, int age, boolean isAlive) {
        // Создание объекта с помощью Builder паттерна
        Human human = Human.builder()
            .name(name)
            .age(age)
            .isAlive(isAlive)
            .build();

        return human;
    }

    /**
     * Метод для изменения нескольких параметров человека одновременно.
     * <p>
     * Использует несколько сеттеров для изменения значений полей.
     * </p>
     *
     * @param human объект человека
     * @param name  новое имя
     * @param age   новый возраст
     * @param isAlive новое состояние жизни
     */
    public void updateHuman(Human human, String name, int age, boolean isAlive) {
        // Изменение нескольких полей через сеттеры
        human.setName(name);
        human.setAge(age);
        human.setAlive(isAlive);
    }
}`;

    SNIPPETS['_2.main.HumanMain'] = `package org.baileyseyes._2.main;

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
        System.out.println("\\n=== Создание человека через метод createHuman ===");
        Human human2 = service.createHuman("Alice", 30, true);
        System.out.println("Создан человек: " + service.getHumanInfo(human2));

        // Демонстрация изменения данных человека
        System.out.println("\\n=== Изменение данных человека ===");
        System.out.println("Изначально: " + service.getHumanInfo(human1));
        service.changeName(human1, "Bob");
        service.changeAge(human1, 28);
        System.out.println("После изменений: " + service.getHumanInfo(human1));

        // Демонстрация проверки взрослости
        System.out.println("\\n=== Проверка взрослости ===");
        System.out.println("Человек 1 (возраст " + human1.getAge() + ") взрослый: " + service.isAdult(human1));
        System.out.println("Человек 2 (возраст " + human2.getAge() + ") взрослый: " + service.isAdult(human2));

        // Демонстрация празднования дня рождения
        System.out.println("\\n=== Празднование дня рождения ===");
        System.out.println("До дня рождения: " + service.getHumanInfo(human1));
        service.celebrateBirthday(human1);
        System.out.println("После дня рождения: " + service.getHumanInfo(human1));

        // Демонстрация создания человека с разными конструкторами
        System.out.println("\\n=== Создание человеков с разными конструкторами ===");
        Human human3 = service.createHumanWithNameAndAge("Charlie", 22);
        System.out.println("Человек с именем и возрастом: " + service.getHumanInfo(human3));

        Human human4 = service.createHumanWithAge(35);
        System.out.println("Человек только с возрастом: " + service.getHumanInfo(human4));

        // Демонстрация работы с Builder
        System.out.println("\\n=== Создание человека с помощью Builder ===");
        Human human5 = service.createHumanWithBuilder("Diana", 27, true);
        System.out.println("Человек через Builder: " + service.getHumanInfo(human5));

        // Демонстрация обновления нескольких параметров
        System.out.println("\\n=== Обновление нескольких параметров ===");
        System.out.println("Изначально: " + service.getHumanInfo(human4));
        service.updateHuman(human4, "Eve", 40, false);
        System.out.println("После обновления: " + service.getHumanInfo(human4));
    }
}`;

    SNIPPETS['_2.classes_objects.util.ConstantsClass'] = `package org.baileyseyes._2.classes_objects.util;

import lombok.experimental.UtilityClass;

/**
 * Утиль класс, содержащий в себе константы, у которых есть использование в разных классах
 *
 * @see ConstantInterface Следующая часть
 * @see org.baileyseyes._2.main.HumanMain Предыдущая часть
 */
@UtilityClass //полезная константа для утиль класса, можно не делать пустой конструктор
public class ConstantsClass {

    public static final int JAVA_VERSION = 17;
}`;

    SNIPPETS['_2.classes_objects.util.ConstantInterface'] = `package org.baileyseyes._2.classes_objects.util;

/**
 * Отсюда мы начнем знакомство с понятием интерфейса. Вообще его суть не быть утиль классом, но на этом мы посмотрим на ключевые
 * отличия интерфейса от обычного класса
 *
 * @see org.baileyseyes._3.__start_from_here__.HelloJavaClassTypes Следующая часть
 * @see ConstantsClass Предыдущая часть
 */
public interface ConstantInterface {

    String HELLO = "hello"; //все поля public static final по дефолту, поэтому можно не прописывать. Подходит для создания констант.
}`;

    SNIPPETS['_3.__start_from_here__.HelloJavaClassTypes'] = `package org.baileyseyes._3.__start_from_here__;

/**
 * Теперь перейдем к знакомству с разными видами классов, интерфейсы енамы итд.
 * @see org.baileyseyes._3.interface_class.SayNo Следующая часть
 * @see org.baileyseyes._2.classes_objects.util.ConstantInterface Предыдущая часть
 */
public class HelloJavaClassTypes {

}`;

    SNIPPETS['_3.interface_class.SayNo'] = `package org.baileyseyes._3.interface_class;

/**
 * Это интерфейс, с помощью которого мы обозначаем поведение - контракт класса
 *
 * @see org.baileyseyes._3.interface_class.impl.SayNoImpl Следующая часть
 * @see org.baileyseyes._3.__start_from_here__.HelloJavaClassTypes Предыдущая часть
 */
public interface SayNo {

    void sayNo(); //абстрактный метод, реализацию которого дадим в классе, который реализует этот интерфейс
}`;

    SNIPPETS['_3.interface_class.impl.SayNoImpl'] = `package org.baileyseyes._3.interface_class.impl;

import org.baileyseyes._3.interface_class.SayNo;

/**
 * Impl в конце класса означает что это реализация какого-то интерфейса, обычно по имени класса должно быть понятно какого
 *
 * @see org.baileyseyes._3.main.Main Следующая часть
 * @see org.baileyseyes._3.interface_class.SayNo Предыдущая часть
 */
public class SayNoImpl implements SayNo {

    @Override //аннотация показывает, что мы определяем поведение метода интерфейса
    public void sayNo() {
        System.out.println("No.");
    }
}`;

    SNIPPETS['_3.main.Main'] = `package org.baileyseyes._3.main;

import org.baileyseyes._3.interface_class.impl.SayNoImpl;

/**
 * @see org.baileyseyes._3.enum_class.DaysOfTheWeek Следующая часть
 * @see SayNoImpl Предыдущая часть
 */
public class Main {

    public static void main(String[] args) {
        SayNoImpl sayNoImpl = new SayNoImpl();
        sayNoImpl.sayNo(); //вызываем метод реализацию которого определили в классе SayNoImpl
    }
}`;

    SNIPPETS['_3.enum_class.DaysOfTheWeek'] = `package org.baileyseyes._3.enum_class;

/**
 * Это самая примитивная вариация енама. Раньше это был просто утиль-класс с константами.
 *
 * @see InformatedDaysOfTheWeek Следующая часть
 * @see org.baileyseyes._3.main.Main Предыдущая часть
 */
public enum DaysOfTheWeek {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}`;

    SNIPPETS['_3.enum_class.InformatedDaysOfTheWeek'] = `package org.baileyseyes._3.enum_class;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @see EnumPractice Следующая часть
 * @see DaysOfTheWeek Предыдущая часть
 */
@Getter
@AllArgsConstructor
public enum InformatedDaysOfTheWeek {

    /*
    Можно делать енам со строкой которая будет сразу определять его значение, в данном случае - перевод
     */

    MONDAY("Понедельник"),
    TUESDAY("Вторник"),
    WEDNESDAY("Среда"),
    THURSDAY("Четверг"),
    FRIDAY("Пятница"),
    SATURDAY("Суббота"),
    SUNDAY("Воскресенье");

    private final String russianName;
}`;

    SNIPPETS['_3.enum_class.EnumPractice'] = `package org.baileyseyes._3.enum_class;

import org.baileyseyes._3.record.Human;

/**
 * @see Human Следующая часть
 * @see InformatedDaysOfTheWeek Предыдущая часть
 */
@SuppressWarnings("all")
public class EnumPractice {

    /**
     * Метод для демонстрации базового использования енама
     * <p>
     * енам позволяют создавать типизированные константы.
     * </p>
     */
    public static void demonstrateBasicUsage() {
        // Создание переменной типа енам
        DaysOfTheWeek today = DaysOfTheWeek.MONDAY;

        System.out.println("Сегодня: " + today);
        System.out.println("Название дня: " + today.name());
        System.out.println("Порядковый номер: " + today.ordinal());

        // Сравнение перечислений
        if (today == DaysOfTheWeek.MONDAY) {
            System.out.println("Сегодня понедельник");
        }

        // Перебор всех значений енам
        System.out.println("Все дни недели:");
        for (DaysOfTheWeek day : DaysOfTheWeek.values()) {
            System.out.println(day.name() + " (порядковый номер: " + day.ordinal() + ")");
        }
    }

    /**
     * Метод для демонстрации использования енам в условных операторах.
     */
    public static void demonstrateConditionalUsage() {
        DaysOfTheWeek day = DaysOfTheWeek.WEDNESDAY;

        System.out.println("\\n=== Использование в условных операторах ===");
        switch (day) {
            case MONDAY:
                System.out.println("Начало рабочей недели");
                break;
            case FRIDAY:
                System.out.println("Конец рабочей недели");
                break;
            case SATURDAY:
            case SUNDAY:
                System.out.println("Выходной день");
                break;
            default:
                System.out.println("Рабочий день");
        }

        // Использование в if-else
        if (day == DaysOfTheWeek.SATURDAY || day == DaysOfTheWeek.SUNDAY) {
            System.out.println("Сегодня выходной");
        } else {
            System.out.println("Сегодня рабочий день");
        }
    }

    /**
     * Метод для демонстрации работы с перечислением как с константами.
     */
    public static void demonstrateConstantsUsage() {
        System.out.println("\\n=== Использование как константы ===");

        // Все значения енам являются константами
        DaysOfTheWeek monday = DaysOfTheWeek.MONDAY;
        DaysOfTheWeek friday = DaysOfTheWeek.FRIDAY;
        DaysOfTheWeek sunday = DaysOfTheWeek.SUNDAY;

        System.out.println("Понедельник: " + monday);
        System.out.println("Пятница: " + friday);
        System.out.println("Воскресенье: " + sunday);

        // Сравнение констант
        System.out.println("Понедельник == Понедельник: " + (monday == DaysOfTheWeek.MONDAY));
        System.out.println("Пятница != Воскресенье: " + (friday != sunday));
    }

    /**
     * Метод для демонстрации перегрузки методов с использованием перечислений.
     */
    public static void demonstrateMethodOverloading() {
        System.out.println("\\n=== Перегрузка методов с енамми ===");

        // Вызов методов с разными параметрами
        processDay(DaysOfTheWeek.MONDAY);
        processDay(DaysOfTheWeek.WEDNESDAY, "Среда");
        processDay(DaysOfTheWeek.FRIDAY, "Пятница", true);
    }

    /**
     * Метод для обработки дня недели.
     *
     * @param day день недели
     */
    public static void processDay(DaysOfTheWeek day) {
        System.out.println("Обработка дня: " + day.name());
    }

    /**
     * Метод для обработки дня недели с дополнительной информацией.
     *
     * @param day день недели
     * @param description описание дня
     */
    public static void processDay(DaysOfTheWeek day, String description) {
        System.out.println("Обработка дня: " + day.name() + " - " + description);
    }

    /**
     * Метод для обработки дня недели с дополнительными параметрами.
     *
     * @param day день недели
     * @param description описание дня
     * @param isWorkingDay является ли день рабочим
     */
    public static void processDay(DaysOfTheWeek day, String description, boolean isWorkingDay) {
        System.out.println("Обработка дня: " + day.name() + " - " + description +
            " (рабочий день: " + isWorkingDay + ")");
    }

    /**
     * Метод для демонстрации создания методов внутри енам.
     */
    public static void demonstrateEnumMethods() {
        System.out.println("\\n=== Методы перечислений ===");

        // Использование методов енам
        DaysOfTheWeek today = DaysOfTheWeek.THURSDAY;
        System.out.println("Сегодня: " + today);
        System.out.println("Название: " + today.name());
        System.out.println("Порядковый номер: " + today.ordinal());
        System.out.println("Количество значений: " + DaysOfTheWeek.values().length);

        // Проверка на рабочий день
        boolean isWorkingDay = isWorkingDay(today);
        System.out.println("Рабочий день: " + isWorkingDay);

        // Получение следующего дня
        DaysOfTheWeek nextDay = getNextDay(today);
        System.out.println("Следующий день: " + nextDay);
    }

    /**
     * Метод для проверки, является ли день рабочим.
     *
     * @param day день недели
     * @return true если рабочий день, иначе false
     */
    public static boolean isWorkingDay(DaysOfTheWeek day) {
        return day != DaysOfTheWeek.SATURDAY && day != DaysOfTheWeek.SUNDAY;
    }

    /**
     * Метод для получения следующего дня недели.
     *
     * @param day текущий день
     * @return следующий день
     */
    public static DaysOfTheWeek getNextDay(DaysOfTheWeek day) {
        switch (day) {
            case MONDAY: return DaysOfTheWeek.TUESDAY;
            case TUESDAY: return DaysOfTheWeek.WEDNESDAY;
            case WEDNESDAY: return DaysOfTheWeek.THURSDAY;
            case THURSDAY: return DaysOfTheWeek.FRIDAY;
            case FRIDAY: return DaysOfTheWeek.SATURDAY;
            case SATURDAY: return DaysOfTheWeek.SUNDAY;
            case SUNDAY: return DaysOfTheWeek.MONDAY;
            default: return day;
        }
    }

    /**
     * Метод для получения русского названия дня недели.
     * <p>
     * Метод использует поле russianName для возврата человеческого названия дня.
     * </p>
     *
     * @param day день недели
     * @return русское название дня недели
     */
    public static String getRussianName(DaysOfTheWeek day) {
        switch (day) {
            case MONDAY: return "Понедельник";
            case TUESDAY: return "Вторник";
            case WEDNESDAY: return "Среда";
            case THURSDAY: return "Четверг";
            case FRIDAY: return "Пятница";
            case SATURDAY: return "Суббота";
            case SUNDAY: return "Воскресенье";
            default: return "Неизвестный день";
        }
    }

    /**
     * Метод для проверки, является ли день выходным.
     * <p>
     * Выходные дни - это суббота и воскресенье.
     * </p>
     *
     * @param day день недели
     * @return true если выходной день, иначе false
     */
    public static boolean isWeekend(DaysOfTheWeek day) {
        return day == DaysOfTheWeek.SATURDAY || day == DaysOfTheWeek.SUNDAY;
    }

    /**
     * Метод для получения всех рабочих дней.
     * <p>
     * Возвращает массив всех рабочих дней недели.
     * </p>
     *
     * @return массив рабочих дней
     */
    public static DaysOfTheWeek[] getWorkingDays() {
        return new DaysOfTheWeek[]{
            DaysOfTheWeek.MONDAY,
            DaysOfTheWeek.TUESDAY,
            DaysOfTheWeek.WEDNESDAY,
            DaysOfTheWeek.THURSDAY,
            DaysOfTheWeek.FRIDAY
        };
    }

    /**
     * Метод для получения всех выходных дней.
     * <p>
     * Возвращает массив всех выходных дней недели.
     * </p>
     *
     * @return массив выходных дней
     */
    public static DaysOfTheWeek[] getWeekendDays() {
        return new DaysOfTheWeek[]{
            DaysOfTheWeek.SATURDAY,
            DaysOfTheWeek.SUNDAY
        };
    }

    /**
     * Главный метод для демонстрации работы с енамми.
     */
    public static void main(String[] args) {
        System.out.println("=== Базовое использование перечислений ===");
        demonstrateBasicUsage();

        System.out.println("\\n=== Условное использование ===");
        demonstrateConditionalUsage();

        System.out.println("\\n=== Использование как константы ===");
        demonstrateConstantsUsage();

        System.out.println("\\n=== Перегрузка методов ===");
        demonstrateMethodOverloading();

        System.out.println("\\n=== Методы перечислений ===");
        demonstrateEnumMethods();
    }
}`;

    SNIPPETS['_3.record.Human'] = `package org.baileyseyes._3.record;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;
import org.baileyseyes._3.enum_class.EnumPractice;

/**
 * Почти то же самое, что и {@linkplain org.baileyseyes._2.classes_objects.entity.Human Human}
 *
 * @see org.baileyseyes._3.annotation.Service Следующая часть
 * @see EnumPractice Предыдущая часть
 */
@UselessButNeedToKnow
public record Human(String name, int age, boolean isAlive) {
    // Record автоматически создаёт:
    // - конструктор Human(String name, int age, boolean isAlive)
    // - геттеры: name(), age(), isAlive()
    // - методы equals(), hashCode(), toString()
}`;

    SNIPPETS['_3.annotation.Service'] = `package org.baileyseyes._3.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Это аннотация, которая, ставится над классом.
 * <br>
 * В данном случае это маркерная аннотация, можно ее поставить на класс, чтобы показать что класс связан с сервисом
 * <br>
 * То есть с какой-либо логикой, как будет реализовано в следующей части.
 *
 * @see HumanService Следующая часть
 * @see org.baileyseyes._3.record.Human Предыдущая часть
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.SOURCE)
public @interface Service {

}`;

    SNIPPETS['_3.annotation.HumanService'] = `package org.baileyseyes._3.annotation;

/**
 * @see org.baileyseyes._4.__start_from_here.HelloExceptionsAndTryCatch Следующая часть
 * @see Service Предыдущая часть
 */
@Service
public class HumanService {
    // какая-либо логика
}`;

    SNIPPETS['_4.__start_from_here.HelloExceptionsAndTryCatch'] = `package org.baileyseyes._4.__start_from_here;

import lombok.experimental.UtilityClass;
import org.baileyseyes._3.annotation.HumanService;

/**
 * @see org.baileyseyes._4.try_catch_finally.TryCatchFinally Следующая часть
 * @see HumanService Предыдущая часть
 */
@UtilityClass
public class HelloExceptionsAndTryCatch {
    /*
    Начнем тему исключений

    Исключения - это ошибки возникающие во время работы кода, они могут быть как ожидаемыми, так и неожидаемыми.
    Есть два вида - проверяемые и непроверяемые, о них и будем разговаривать в следующей части.

    Смысл перехватывать исключения в том, что если этого не делать, программа завершит свою работу, а если перехватить -
    Мы можем дать программе инструкции на случай что делать, если произойдет ошибка. В проверяемых исключениях проще,
    Джава заранее знает где МОЖЕТ быть ошибка и поэтому прямо говорит - дай мне инструкции если это случится.
    С непроверяемыми (Runtime) всё иначе. Их мы сами вставляем туда, где знаем что может быть ошибка.
     */
}`;

    SNIPPETS['_4.try_catch_finally.TryCatchFinally'] = `package org.baileyseyes._4.try_catch_finally;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Scanner;

/**
 * @see TryWithResources Следующая часть
 * @see org.baileyseyes._4.__start_from_here.HelloExceptionsAndTryCatch Предыдущая часть
 */
@SuppressWarnings("all")
public class TryCatchFinally {

    /**
     * Метод для демонстрации базового использования try-catch.
     * <p>
     * Базовый синтаксис: try { код, который может вызвать исключение }
     * catch (ExceptionType e) { обработка исключения }
     * </p>
     */
    public static void demonstrateBasicTryCatch() {
        System.out.println("=== Базовое использование try-catch ===");

        try {
            // Попытка деления на ноль
            int result = 10 / 0;
            System.out.println("Результат: " + result);
        } catch (ArithmeticException e) { //делаем так потому что мы ОЖИДАЕМ и ЗНАЕМ что будет ошибка, заранее даем инструкции программе
            System.out.println("Произошло арифметическое исключение: " + e.getMessage());
            System.out.println("Исключение типа: " + e.getClass().getSimpleName());
        }

        System.out.println("Программа продолжает работу после обработки исключения");
    }

    /**
     * Метод для демонстрации обработки нескольких типов исключений.
     */
    public static void demonstrateMultipleCatchBlocks() {
        System.out.println("\\n=== Обработка нескольких типов исключений ===");

        try {
            // Попытка выполнить несколько операций
            int[] array = new int[5];
            array[10] = 5; // ArrayIndexOutOfBoundsException

            int result = 10 / 0; // ArithmeticException

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Ошибка индекса массива: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Арифметическая ошибка: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Общее исключение: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации использования finally.
     * <p>
     * Блок finally выполняется всегда, независимо от того, было ли исключение или нет.
     * </p>
     */
    public static void demonstrateFinallyBlock() {
        System.out.println("\\n=== Блок finally ===");

        try {
            System.out.println("В блоке try");
            int result = 10 / 2;
            System.out.println("Результат: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Ошибка: " + e.getMessage());
        } finally {
            System.out.println("Блок finally всегда выполняется");
        }

        System.out.println("Программа продолжает работу");
    }

    /**
     * Метод для демонстрации проверяемых исключений IOException.
     * <p>
     * IOException - это проверяемое исключение, которое должно быть обработано.
     * </p>
     */
    public static void demonstrateIOException() {
        System.out.println("\\n=== Проверяемое исключение IOException ===");

        try {
            // Попытка чтения файла, который может не существовать
            FileReader file = new FileReader("nonexistent.txt");
            BufferedReader reader = new BufferedReader(file);
            String line = reader.readLine();
            System.out.println("Содержимое файла: " + line);
            reader.close();
        } catch (IOException e) {
            System.out.println("Ошибка ввода-вывода: " + e.getMessage());
            System.out.println("Тип исключения: " + e.getClass().getSimpleName());
        }
    }

    /**
     * Метод для демонстрации проверяемых исключений с несколькими catch блоками.
     */
    public static void demonstrateMultipleCheckedExceptions() {
        System.out.println("\\n=== Обработка нескольких проверяемых исключений ===");

        try {
            // Попытка выполнить операции, которые могут вызвать разные исключения
            int[] numbers = new int[3];
            numbers[5] = 10; // ArrayIndexOutOfBoundsException

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Ошибка индекса массива: " + e.getMessage());
        } catch (NullPointerException e) {
            System.out.println("Ошибка null ссылки: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Общее исключение: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации работы с пользовательским вводом и исключениями.
     */
    public static void demonstrateUserInputWithExceptionHandling() {
        System.out.println("\\n=== Работа с пользовательским вводом ===");

        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Введите число: ");
            int number = scanner.nextInt();
            System.out.println("Вы ввели число: " + number);
        } catch (Exception e) {
            System.out.println("Ошибка ввода: " + e.getMessage());
            System.out.println("Пожалуйста, введите корректное число");
        } finally {
            scanner.close();
        }
    }

    /**
     * Метод для демонстрации создания собственного исключения.
     */
    public static void demonstrateCustomException() {
        System.out.println("\\n=== Собственное исключение ===");

        try {
            validateAge(150);
        } catch (InvalidAgeException e) {
            System.out.println("Ошибка валидации: " + e.getMessage());
        }
    }

    /**
     * Метод для валидации возраста.
     *
     * @param age возраст для проверки
     * @throws InvalidAgeException если возраст некорректен
     */
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 0 || age > 150) {
            throw new InvalidAgeException("Возраст должен быть между 0 и 150, а был: " + age);
        }
        System.out.println("Возраст " + age + " корректен");
    }

    /**
     * Метод для демонстрации использования try-with-resources.
     * <p>
     * Try-with-resources автоматически закрывает ресурсы, реализующие AutoCloseable.
     * </p>
     */
    public static void demonstrateTryWithResources() {
        System.out.println("\\n=== Try-with-resources ===");

        // В данном случае используем заглушку, так как файл не существует
        try (FileReader file = new FileReader("example.txt")) {
            // Этот код не выполнится из-за отсутствия файла
            System.out.println("Файл открыт успешно");
        } catch (IOException e) {
            System.out.println("Ошибка при работе с файлом: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации вложенных try-catch блоков.
     */
    public static void demonstrateNestedTryCatch() {
        System.out.println("\\n=== Вложенные try-catch блоки ===");

        try {
            System.out.println("Внешний try");
            try {
                System.out.println("Внутренний try");
                int result = 10 / 0; // Вызовет ArithmeticException
            } catch (ArithmeticException e) {
                System.out.println("Обработка внутреннего исключения: " + e.getMessage());
                throw e; // Переброс исключения
            }
        } catch (ArithmeticException e) {
            System.out.println("Обработка внешнего исключения: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации работы с несколькими исключениями в одном catch.
     */
    public static void demonstrateMultiCatch() {
        System.out.println("\\n=== Multi-catch (обработка нескольких исключений в одном блоке) ===");

        try {
            // Попытка выполнить операции, которые могут вызвать разные исключения
            String str = null;
            int length = str.length(); // NullPointerException

            int[] array = new int[5];
            array[10] = 5; // ArrayIndexOutOfBoundsException

        } catch (NullPointerException | ArrayIndexOutOfBoundsException e) {
            System.out.println("Общая обработка нескольких исключений: " + e.getClass().getSimpleName());
            System.out.println("Сообщение: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации использования throw для генерации исключений.
     */
    public static void demonstrateThrowKeyword() {
        System.out.println("\\n=== Ключевое слово throw ===");

        try {
            int age = -5;
            if (age < 0) {
                throw new IllegalArgumentException("Возраст не может быть отрицательным: " + age);
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Перехвачено исключение: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации проверяемых исключений с методами.
     */
    public static void demonstrateCheckedExceptionsInMethods() {
        System.out.println("\\n=== Проверяемые исключения в методах ===");

        try {
            // Вызов метода, который может выбросить checked exception
            readFileContent("test.txt");
        } catch (IOException e) {
            System.out.println("Обработано исключение в методе: " + e.getMessage());
        }
    }

    /**
     * Метод, который может выбросить проверяемое исключение.
     *
     * @param fileName имя файла
     * @throws IOException если файл не найден или возникает ошибка ввода-вывода
     */
    public static void readFileContent(String fileName) throws IOException {
        FileReader file = new FileReader(fileName);
        BufferedReader reader = new BufferedReader(file);
        String content = reader.readLine();
        System.out.println("Содержимое файла: " + content);
        reader.close();
    }

    /**
     * Собственное исключение для демонстрации.
     */
    static class InvalidAgeException extends Exception {
        public InvalidAgeException(String message) {
            super(message);
        }
    }

    /**
     * Главный метод для демонстрации работы с исключениями.
     */
    public static void main(String[] args) {
        System.out.println("=== Демонстрация исключений try-catch ===");

        demonstrateBasicTryCatch();
        demonstrateMultipleCatchBlocks();
        demonstrateFinallyBlock();
        demonstrateIOException();
        demonstrateMultipleCheckedExceptions();
        demonstrateUserInputWithExceptionHandling();
        demonstrateCustomException();
        demonstrateTryWithResources();
        demonstrateNestedTryCatch();
        demonstrateMultiCatch();
        demonstrateThrowKeyword();
        demonstrateCheckedExceptionsInMethods();
    }
}`;

    SNIPPETS['_4.try_catch_finally.TryWithResources'] = `package org.baileyseyes._4.try_catch_finally;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует работу с try-with-resources в Java.
 * <p>
 * Try-with-resources - это улучшенный синтаксис оператора try,
 * который автоматически закрывает ресурсы, (классы, реализующие интерфейс {@linkplain AutoCloseable}
 * </p>
 *
 * @see org.baileyseyes._4.exception.HumanNotFoundException Следующая часть
 * @see TryCatchFinally Предыдущая часть
 */
@UselessButNeedToKnow
public class TryWithResources {

    /**
     * Метод для демонстрации базового использования try-with-resources.
     * <p>
     * Ресурсы автоматически закрываются даже при возникновении исключения.
     * </p>
     */
    public static void demonstrateBasicTryWithResources() {
        System.out.println("=== Базовое использование try-with-resources ===");

        // Try-with-resources для одного ресурса
        try (FileReader file = new FileReader("example.txt")) {
            int character;
            while ((character = file.read()) != -1) {
                System.out.print((char) character);
            }
        } catch (IOException e) {
            System.out.println("Ошибка при работе с файлом: " + e.getMessage());
        }
        System.out.println(); // Перевод строки
    }

    /**
     * Метод для демонстрации try-with-resources с несколькими ресурсами.
     */
    public static void demonstrateMultipleResources() {
        System.out.println("\\n=== Try-with-resources с несколькими ресурсами ===");

        // Try-with-resources для нескольких ресурсов
        try (FileReader fileReader = new FileReader("input.txt");
            FileWriter fileWriter = new FileWriter("output.txt")) {

            int character;
            while ((character = fileReader.read()) != -1) {
                fileWriter.write(character);
            }
            System.out.println("Данные успешно скопированы");

        } catch (IOException e) {
            System.out.println("Ошибка при работе с файлами: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации try-with-resources с пользовательскими ресурсами.
     */
    public static void demonstrateCustomResource() {
        System.out.println("\\n=== Try-with-resources с пользовательским ресурсом ===");

        try (CustomResource resource = new CustomResource()) {
            resource.doSomething();
            System.out.println("Работа с пользовательским ресурсом завершена");
        } catch (Exception e) {
            System.out.println("Ошибка при работе с ресурсом: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации работы с BufferedReader и PrintWriter.
     */
    public static void demonstrateBufferedReaderPrintWriter() {
        System.out.println("\\n=== BufferedReader и PrintWriter ===");

        try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"));
            PrintWriter writer = new PrintWriter(new FileWriter("output.txt"))) {

            String line;
            while ((line = reader.readLine()) != null) {
                writer.println(line.toUpperCase());
            }
            System.out.println("Файл успешно обработан и преобразован в верхний регистр");

        } catch (IOException e) {
            System.out.println("Ошибка при работе с файлами: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации обработки исключений в try-with-resources.
     */
    public static void demonstrateExceptionHandling() {
        System.out.println("\\n=== Обработка исключений в try-with-resources ===");

        try (FileInputStream fis = new FileInputStream("nonexistent.txt")) {
            // Этот код не выполнится из-за отсутствия файла
            int data = fis.read();
            System.out.println("Данные: " + data);
        } catch (IOException e) {
            System.out.println("Перехвачено исключение: " + e.getClass().getSimpleName() +
                " - " + e.getMessage());
            // Исключение при закрытии ресурса также может быть записано в стек
        }
    }

    /**
     * Метод для демонстрации автоматического закрытия ресурсов.
     */
    public static void demonstrateAutomaticClosing() {
        System.out.println("\\n=== Автоматическое закрытие ресурсов ===");

        try (AutoCloseableResource resource1 = new AutoCloseableResource("Ресурс 1");
            AutoCloseableResource resource2 = new AutoCloseableResource("Ресурс 2")) {

            System.out.println("Ресурсы созданы и используются");
            resource1.doWork();
            resource2.doWork();

            // Ресурсы автоматически закроются при выходе из блока try
            System.out.println("Работа с ресурсами завершена");

        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации try-with-resources с потоками данных.
     */
    public static void demonstrateInputStreamOutputStream() {
        System.out.println("\\n=== InputStream и OutputStream ===");

        try (FileInputStream fis = new FileInputStream("input.dat");
            FileOutputStream fos = new FileOutputStream("output.dat")) {

            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
            System.out.println("Данные успешно скопированы из input.dat в output.dat");

        } catch (IOException e) {
            System.out.println("Ошибка при работе с потоками: " + e.getMessage());
        }
    }

    /**
     * Метод для демонстрации правильного использования try-with-resources.
     */
    public static void demonstrateBestPractices() {
        System.out.println("\\n=== Лучшие практики try-with-resources ===");

        // Правильное использование - ресурсы объявлены в самом try
        try (FileReader fr = new FileReader("data.txt");
            BufferedReader br = new BufferedReader(fr)) {

            String line = br.readLine();
            System.out.println("Чтение данных: " + line);

        } catch (IOException e) {
            System.out.println("Ошибка чтения файла: " + e.getMessage());
        }

        // Неправильное использование - ресурсы не объявлены в try
        // FileReader fr = new FileReader("data.txt"); // Так не делаем
        // try (BufferedReader br = new BufferedReader(fr)) { ... } // Используем только в try
    }

    /**
     * Пользовательский класс, реализующий AutoCloseable.
     */
    @SuppressWarnings("all")
    static class CustomResource implements AutoCloseable {
        private String name;

        public CustomResource() {
            this.name = "CustomResource";
            System.out.println(name + " создан");
        }

        public void doSomething() {
            System.out.println(name + " выполняет действие");
        }

        @Override
        public void close() {
            System.out.println(name + " закрыт автоматически");
        }
    }

    /**
     * Класс, реализующий AutoCloseable для демонстрации.
     */
    @SuppressWarnings("all")
    static class AutoCloseableResource implements AutoCloseable {
        private String name;

        public AutoCloseableResource(String name) {
            this.name = name;
            System.out.println(name + " создан");
        }

        public void doWork() {
            System.out.println(name + " выполняет работу");
        }

        @Override
        public void close() {
            System.out.println(name + " закрыт");
        }
    }

    /**
     * Главный метод для демонстрации try-with-resources.
     */
    public static void main(String[] args) {
        System.out.println("=== Демонстрация try-with-resources ===");

        demonstrateBasicTryWithResources();
        demonstrateMultipleResources();
        demonstrateCustomResource();
        demonstrateBufferedReaderPrintWriter();
        demonstrateExceptionHandling();
        demonstrateAutomaticClosing();
        demonstrateInputStreamOutputStream();
        demonstrateBestPractices();
    }
}`;

    SNIPPETS['_4.exception.HumanNotFoundException'] = `package org.baileyseyes._4.exception;

import lombok.experimental.StandardException;

/**
 * Это наше кастомное исключение, обязательно extends Runtime!!!
 *
 * @see HumanWithExceptions Следующая часть
 * @see org.baileyseyes._4.try_catch_finally.TryWithResources Предыдущая часть
 */
@StandardException
public class HumanNotFoundException extends RuntimeException{
    //из-за @StandardException внутри нет никакой логики, аннотация сама добавит
    public HumanNotFoundException(String message) {
        super(message);
    }
}`;

    SNIPPETS['_4.exception.HumanWithExceptions'] = `package org.baileyseyes._4.exception;

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

            return new Human(name, age, isAlive);
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
            new Human("Иван", 25, true),
            new Human("Мария", 30, true),
            new Human("Петр", 35, false)
        };

        // Демонстрация поиска человека
        System.out.println("\\n=== Поиск человека ===");
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
        System.out.println("\\n=== Валидация возраста ===");
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
        System.out.println("\\n=== Безопасное получение возраста ===");
        Human human = humans[0];
        int age = getHumanAgeSafely(human);
        System.out.println("Возраст: " + age);

        Human nullHuman = null;
        int nullAge = getHumanAgeSafely(nullHuman);
        System.out.println("Возраст null человека: " + nullAge);

        // Демонстрация создания человека с валидацией
        System.out.println("\\n=== Создание человека с валидацией ===");
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
        System.out.println("\\n=== Работа с файлами ===");
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
}`;

    SNIPPETS['_5.__start_from_here__.HelloCollections'] = `package org.baileyseyes._5.__start_from_here__;

/**
 * Одна из самых важных тем - коллекции. Массивы данных, динамически расширяющиеся со своими разными особенностями
 *
 * @see org.baileyseyes._5.list.CollectionList Следующая часть
 * @see org.baileyseyes._4.exception.HumanWithExceptions Предыдущая часть
 */
public class HelloCollections {

}`;

    SNIPPETS['_5.list.CollectionList'] = `package org.baileyseyes._5.list;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._5.set.CollectionSet Следующая часть
 * @see org.baileyseyes._5.__start_from_here__.HelloCollections Предыдущая часть
 */
@SuppressWarnings("all")
public class CollectionList {

    /**
     * Демонстрация основных характеристик ArrayList.
     * <p>
     * {@code ArrayList} - это реализация интерфейса {@code List}, которая использует массив для хранения элементов.
     * Она предоставляет динамический массив, который может увеличиваться и уменьшаться по мере необходимости.
     * </p>
     * <p>
     * Основные особенности:
     * <ul>
     *     <li>Доступ к элементам по индексу за O(1).</li>
     *     <li>Вставка/удаление элементов в середину за O(n).</li>
     *     <li>Изменяемый размер.</li>
     *     <li>Не синхронизирован (не потокобезопасен).</li>
     *     <li>Позволяет хранить дубликаты и null.</li>
     * </ul>
     * </p>
     */
    public static void demonstrateBasics() {
        // Создание ArrayList
        List<Integer> list = new ArrayList<>(); // По умолчанию размер 10

        // Добавление элементов
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(0, 10); // Вставка в начало

        System.out.println("Initial list: " + list);
        System.out.println("Size: " + list.size());

        // Доступ к элементам по индексу
        System.out.println("Element at index 1: " + list.get(1));
        System.out.println("Element at index 0: " + list.get(0));


        // Изменение элемента
        list.set(1, 20);
        System.out.println("After setting index 1 to 20: " + list);

        // Удаление элемента
        list.remove(0); // Удаление по индексу
        System.out.println("After removing index 0: " + list);

        list.remove(Integer.valueOf(20)); // Удаление по значению
        System.out.println("After removing value 20: " + list);
    }

    /**
     * Демонстрация методов класса {@code ArrayList}.
     */
    public static void demonstrateMethods() {
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");

        // Проверка наличия элемента
        System.out.println("Contains 'Banana': " + list.contains("Banana"));

        // Проверка на пустоту
        System.out.println("Is empty: " + list.isEmpty());
    }

    /**
     * Демонстрация работы с итератором.
     */
    @UselessButNeedToKnow
    public static void demonstrateIterator() {
        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        // Использование Iterator
        Iterator<Integer> iterator = list.iterator();
        System.out.print("Iterator traversal: ");
        while (iterator.hasNext()) {
            Integer element = iterator.next();
            System.out.print(element + " ");
            if (element == 3) {
                iterator.remove(); // Безопасное удаление во время итерации
            }
        }
        System.out.println("\\nAfter removing 3: " + list);

        // Использование foreach (более предпочтительный способ)
        list.clear();
        list.addAll(Arrays.asList(10, 20, 30, 40, 50));
        System.out.print("Enhanced for loop: ");
        for (Integer element : list) {
            System.out.print(element + " ");
        }
        System.out.println();
    }

    /**
     * Демонстрация различных способов итерации по ArrayList.
     */
    @UselessButNeedToKnow
    public static void demonstrateIteration() {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));

        // Стандартный for-loop
        System.out.print("Standard for loop: ");
        for (int i = 0; i < list.size(); i++) {
            System.out.print(list.get(i) + " ");
        }
        System.out.println();

        // Enhanced for loop (for-each)
        System.out.print("Enhanced for loop: ");
        for (String element : list) {
            System.out.print(element + " ");
        }
        System.out.println();

        // Использование Iterator
        System.out.print("Iterator: ");
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            System.out.print(iterator.next() + " ");
        }
        System.out.println();

        // Использование ListIterator (двусторонняя итерация)
        System.out.print("ListIterator: ");
        ListIterator<String> listIterator = list.listIterator();
        while (listIterator.hasNext()) {
            System.out.print(listIterator.next() + " ");
        }
        System.out.println();

        // Использование Stream API (Java 8+)
        System.out.print("Stream API: ");
        list.stream().forEach(element -> System.out.print(element + " "));
        System.out.println();
    }

    /**
     * Демонстрация сортировки ArrayList.
     */
    @UselessButNeedToKnow
    public static void demonstrateSorting() {
        List<Integer> list = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));

        System.out.println("Original list: " + list);

        // Сортировка по возрастанию
        Collections.sort(list);
        System.out.println("Sorted ascending: " + list);

        // Сортировка по убыванию
        Collections.sort(list, Collections.reverseOrder());
        System.out.println("Sorted descending: " + list);

        // Сортировка с использованием Comparator
        List<String> stringList = new ArrayList<>(Arrays.asList("banana", "apple", "cherry"));
        Collections.sort(stringList, String.CASE_INSENSITIVE_ORDER);
        System.out.println("Sorted case-insensitive: " + stringList);
    }

    /**
     * Демонстрация работы с коллекциями и null значениями.
     */
    @UselessButNeedToKnow
    public static void demonstrateNullHandling() {
        List<String> list = new ArrayList<>();
        list.add("First");
        list.add(null); // Допустимо
        list.add("Third");

        System.out.println("List with null: " + list);
        System.out.println("Element at index 1 (should be null): " + list.get(1));

        // Проверка на null
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) == null) {
                System.out.println("Found null at index " + i);
            }
        }

        // Удаление null
        list.remove(null);
        System.out.println("After removing null: " + list);
    }

    /**
     * Демонстрация производительности ArrayList.
     */
    @UselessButNeedToKnow
    public static void demonstratePerformance() {
        int size = 1000000;

        // ArrayList
        List<Integer> arrayList = new ArrayList<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < size; i++) {
            arrayList.add(i);
        }
        long endTime = System.nanoTime();
        System.out.println("ArrayList add time for " + size + " elements: " + (endTime - startTime) / 1000000.0 + " ms");

        // Доступ по индексу
        startTime = System.nanoTime();
        for (int i = 0; i < size; i += 10000) {
            int value = arrayList.get(i);
        }
        endTime = System.nanoTime();
        System.out.println("ArrayList get time for " + (size / 10000) + " accesses: " + (endTime - startTime) / 1000000.0 + " ms");

        // Вставка в середину
        startTime = System.nanoTime();
        arrayList.add(size / 2, -1);
        endTime = System.nanoTime();
        System.out.println("ArrayList insert in middle time: " + (endTime - startTime) / 1000.0 + " ns");
    }

    public static void primitiveTricks() {
        // Инициализация с помощью Arrays.asList()
        List<Integer> fixedList = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("Fixed list: " + fixedList);

        // Попытка изменить фиксированный список приведет к ошибке
        try {
            fixedList.add(6); // UnsupportedOperationException
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify fixed list: " + e.getMessage());
        }

        // Использование методов класса Collections
        List<Integer> mutableList = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        Collections.shuffle(mutableList);
        System.out.println("Shuffled list: " + mutableList);

        // Использование Arrays.copyOf() для создания копии
        int[] originalArray = {1, 2, 3, 4, 5};
        int[] copiedArray = Arrays.copyOf(originalArray, originalArray.length);
        System.out.println("Copied array: " + Arrays.toString(copiedArray));

        // Создание списка из массива
        String[] stringArray = {"A", "B", "C"};
        List<String> listFromArray = Arrays.asList(stringArray);
        System.out.println("List from array: " + listFromArray);

        // Использование Stream API для фильтрации
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        List<Integer> evenNumbers = numbers.stream()
            .filter(n -> n % 2 == 0)
            .toList();
        System.out.println("Even numbers: " + evenNumbers);

        // Использование removeAll для удаления нескольких элементов
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry", "Date"));
        fruits.removeAll(Arrays.asList("Banana", "Date"));
        System.out.println("After removing some fruits: " + fruits);
    }

    /**
     * Демонстрация почему LinkedList считается самой худшей коллекцией.
     * <p>
     * {@code LinkedList} реализует интерфейс {@code List} и {@code Deque} с использованием двусвязного списка.
     * Несмотря на то, что вставка/удаление в начале/конце списка быстрые (O(1)), доступ к элементам по индексу медленный (O(n)).
     * </p>
     * <p>
     * Основные проблемы LinkedList:
     * <ul>
     *     <li>Доступ к элементам по индексу требует обхода списка от начала или конца (O(n)).</li>
     *     <li>Больше потребление памяти из-за хранения ссылок на предыдущие и следующие элементы.</li>
     *     <li>Худшие производительность при итерации по большому количеству элементов из-за неэффективного использования кэша.</li>
     *     <li>Нет преимуществ перед ArrayList при большинстве операций, кроме специфических случаев вставки/удаления в начале/конце.</li>
     * </ul>
     * </p>
     * <p>
     * В большинстве случаев лучше использовать {@code ArrayList} или {@code Vector} (устарел).
     * </p>
     */
    @UselessButNeedToKnow
    public static void demonstrateWhyLinkedListIsBad() {
        System.out.println("=== Why LinkedList is considered the worst collection ===");

        // 1. Доступ по индексу медленный
        List<Integer> linkedList = new LinkedList<>();
        List<Integer> arrayList = new ArrayList<>();

        int size = 100000;
        for (int i = 0; i < size; i++) {
            linkedList.add(i);
            arrayList.add(i);
        }

        // Измерение времени доступа по индексу
        long startTime = System.nanoTime();
        for (int i = 0; i < size; i += 1000) {
            int value = linkedList.get(i); // O(n) для LinkedList
        }
        long linkedListGetTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < size; i += 1000) {
            int value = arrayList.get(i); // O(1) для ArrayList
        }
        long arrayListGetTime = System.nanoTime() - startTime;

        System.out.println("LinkedList get time for " + (size / 1000) + " accesses: " + linkedListGetTime / 1000.0 + " ns");
        System.out.println("ArrayList get time for " + (size / 1000) + " accesses: " + arrayListGetTime / 1000.0 + " ns");
        System.out.println("ArrayList is " + (linkedListGetTime / (double) arrayListGetTime) + " times faster for get operations");

        // 2. Потребление памяти
        // LinkedList требует больше памяти на хранение ссылок

        // 3. Итерация
        // LinkedList менее эффективна из-за плохой локальности данных

        // 4. Специфические случаи, где LinkedList может быть лучше
        System.out.println("\\n--- Cases where LinkedList might be better ---");
        System.out.println("1. Frequent insertion/deletion at beginning/end");
        System.out.println("2. Implementation of Deque interface (ArrayDeque often preferred)");
        System.out.println("3. Complex list manipulation algorithms");

        // Пример: вставка в начало
        LinkedList<Integer> ll = new LinkedList<>();
        ArrayList<Integer> al = new ArrayList<>();

        startTime = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            ll.addFirst(i); // O(1)
        }
        long llAddFirstTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            al.add(0, i); // O(n)
        }
        long alAddFirstTime = System.nanoTime() - startTime;

        System.out.println("\\nLinkedList addFirst time: " + llAddFirstTime / 1000.0 + " ns");
        System.out.println("ArrayList addFirst time: " + alAddFirstTime / 1000.0 + " ns");
        System.out.println("LinkedList is faster for addFirst operations");

        System.out.println("\\n--- Conclusion ---");
        System.out.println("While LinkedList has advantages in specific cases (insertion/deletion at ends),");
        System.out.println("it generally performs worse than ArrayList for most common operations.");
        System.out.println("ArrayList is recommended for general use unless specific characteristics of LinkedList are needed.");
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\\n=== Methods ===");
        demonstrateMethods();

        System.out.println("\\n=== Iterator ===");
        demonstrateIterator();

        System.out.println("\\n=== Iteration ===");
        demonstrateIteration();

        System.out.println("\\n=== Sorting ===");
        demonstrateSorting();

        System.out.println("\\n=== Null Handling ===");
        demonstrateNullHandling();

        System.out.println("\\n=== Performance ===");
        demonstratePerformance();

        System.out.println("\\n=== Tricks ===");
        primitiveTricks();

        System.out.println("\\n=== Why LinkedList is Bad ===");
        demonstrateWhyLinkedListIsBad();
    }
}`;

    SNIPPETS['_5.set.CollectionSet'] = `package org.baileyseyes._5.set;

import java.util.HashSet;
import java.util.Set;

/**
 * @see org.baileyseyes._5.map.CollectionMap Следующая часть
 * @see org.baileyseyes._5.list.CollectionList Предыдущая часть
 */
@SuppressWarnings("all")
public class CollectionSet {

    /**
     * Демонстрация основных характеристик HashSet.
     * <p>
     * {@code HashSet} - это реализация интерфейса {@code Set}, которая использует хеш-таблицу для хранения элементов.
     * Он не гарантирует порядок элементов.
     * </p>
     * <p>
     * Основные особенности:
     * <ul>
     *     <li>Уникальность элементов (дубликаты не допускаются).</li>
     *     <li>Быстрый доступ (O(1) в среднем для добавления, удаления и поиска).</li>
     *     <li>Не синхронизирован (не потокобезопасен).</li>
     *     <li>Позволяет хранить один null.</li>
     *     <li>Нет индексированного доступа.</li>
     * </ul>
     * </p>
     */
    public static void demonstrateBasics() {
        // Создание HashSet
        Set<String> set = new HashSet<>();

        // Добавление элементов
        set.add("Apple");
        set.add("Banana");
        set.add("Cherry");
        set.add("Apple"); // Дубликат, не будет добавлен

        System.out.println("Set after adding elements: " + set);
        System.out.println("Size: " + set.size());

        // Проверка наличия элемента
        System.out.println("Contains 'Banana': " + set.contains("Banana"));
        System.out.println("Contains 'Grape': " + set.contains("Grape"));

        // Удаление элемента
        boolean removed = set.remove("Banana");
        System.out.println("Removed 'Banana': " + removed);
        System.out.println("Set after removal: " + set);

        // Попытка удаления несуществующего элемента
        removed = set.remove("NonExistent");
        System.out.println("Removed 'NonExistent': " + removed);
    }

    /**
     * Демонстрация работы с коллекциями и null значениями.
     */
    public static void demonstrateNullHandling() {
        Set<String> set = new HashSet<>();
        set.add("First");
        set.add(null); // Допустимо (только один null)
        set.add("Third");

        System.out.println("Set with null: " + set);
        System.out.println("Contains null: " + set.contains(null));

        // Попытка добавить второй null
        boolean added = set.add(null);
        System.out.println("Added second null: " + added); // false
        System.out.println("Set after second null attempt: " + set);
    }

    /**
     * Демонстрация получения значения из HashSet с проверкой наличия.
     */
    public static void demonstrateGettingValueWithContains() {
        Set<String> stringSet = new HashSet<>();
        stringSet.add("Apple");
        stringSet.add("Banana");
        stringSet.add("Cherry");

        // Проверяем наличие значения и затем работаем с ним
        String targetValue = "Banana";

        if (stringSet.contains(targetValue)) {
            System.out.println("Found value: " + targetValue);
            // Здесь можно выполнять дальнейшие действия с найденным значением
            // Например, использовать его для других операций
            String processedValue = targetValue.toUpperCase();
            System.out.println("Processed value: " + processedValue);
        } else {
            System.out.println("Value '" + targetValue + "' not found in set");
        }

        // Пример с числом
        Set<Integer> numberSet = new HashSet<>();
        numberSet.add(10);
        numberSet.add(20);
        numberSet.add(30);

        int targetNumber = 20;

        if (numberSet.contains(targetNumber)) {
            System.out.println("Found number: " + targetNumber);
            int doubled = targetNumber * 2;
            System.out.println("Doubled value: " + doubled);
        } else {
            System.out.println("Number '" + targetNumber + "' not found in set");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\\n=== Getting Value With Contains ===");
        demonstrateGettingValueWithContains();

        System.out.println("\\n=== Null Handling ===");
        demonstrateNullHandling();
    }
}`;

    SNIPPETS['_5.map.CollectionMap'] = `package org.baileyseyes._5.map;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._6.__start_from_here__.HelloMultiThreading Следующая часть
 * @see org.baileyseyes._5.set.CollectionSet Предыдущая часть
 */
@SuppressWarnings("all")
public class CollectionMap {

    /**
     * Демонстрация основных характеристик HashMap.
     * <p>
     * {@code HashMap} - это реализация интерфейса {@code Map}, которая использует хеш-таблицу для хранения пар ключ-значение.
     * </p>
     * <p>
     * Основные особенности:
     * <ul>
     *     <li>Хранит пары ключ-значение.</li>
     *     <li>Ключи уникальны, значения могут повторяться.</li>
     *     <li>Быстрый доступ (O(1) в среднем для добавления, удаления и поиска).</li>
     *     <li>Не синхронизирован (не потокобезопасен).</li>
     *     <li>Позволяет хранить один null как ключ и несколько null как значения.</li>
     *     <li>Не гарантирует порядок элементов.</li>
     * </ul>
     * </p>
     */
    public static void demonstrateBasics() {
        // Создание HashMap
        Map<String, Integer> map = new HashMap<>();

        // Добавление пар ключ-значение
        map.put("Apple", 5);
        map.put("Banana", 3);
        map.put("Cherry", 8);
        map.put("Date", 12);

        System.out.println("Initial map: " + map);
        System.out.println("Size: " + map.size());

        // Получение значения по ключу
        Integer appleCount = map.get("Apple");
        System.out.println("Apples count: " + appleCount);

        // Получение значения по несуществующему ключу
        Integer grapeCount = map.get("Grape");
        System.out.println("Grapes count: " + grapeCount); // null

        // Проверка наличия ключа
        System.out.println("Contains key 'Banana': " + map.containsKey("Banana"));
        System.out.println("Contains value 8: " + map.containsValue(8));

        // Обновление значения
        map.put("Apple", 10);
        System.out.println("After updating apples: " + map);

        // Удаление по ключу
        Integer removedValue = map.remove("Cherry");
        System.out.println("Removed Cherry value: " + removedValue);
        System.out.println("After removal: " + map);

        // Попытка удаления несуществующего ключа
        Integer nonExistent = map.remove("NonExistent");
        System.out.println("Removed NonExistent: " + nonExistent); // null
    }

    /**
     * Демонстрация методов класса {@code HashMap}.
     */
    public static void demonstrateMethods() {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // Проверка на пустоту
        System.out.println("Is empty: " + map.isEmpty());

        // Проверка размера
        System.out.println("Size: " + map.size());

        // Получение набора ключей
        Set<String> keys = map.keySet();
        System.out.println("Keys: " + keys);

        // Получение коллекции значений
        Collection<Integer> values = map.values();
        System.out.println("Values: " + values);

        // Получение набора entry
        Set<Map.Entry<String, Integer>> entries = map.entrySet();
        System.out.println("Entries: " + entries);

        // Очистка
        map.clear();
        System.out.println("After clear: " + map);
        System.out.println("Is empty after clear: " + map.isEmpty());
    }

    /**
     * Демонстрация различных способов итерации по HashMap.
     */
    public static void demonstrateIteration() {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);
        map.put("D", 4);

        // Итерация по ключам
        System.out.print("Iterating by keys: ");
        for (String key : map.keySet()) {
            System.out.print(key + "=" + map.get(key) + " ");
        }
        System.out.println();

        // Итерация по значениям
        System.out.print("Iterating by values: ");
        for (Integer value : map.values()) {
            System.out.print(value + " ");
        }
        System.out.println();

        // Итерация по entrySet
        System.out.print("Iterating by entrySet: ");
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.print(entry.getKey() + "=" + entry.getValue() + " ");
        }
        System.out.println();

        // Использование Stream API (Java 8+)
        System.out.print("Stream API: ");
        map.entrySet().stream()
            .forEach(entry -> System.out.print(entry.getKey() + "=" + entry.getValue() + " "));
        System.out.println();
    }

    /**
     * Демонстрация работы с коллекциями и null значениями.
     */
    public static void demonstrateNullHandling() {
        Map<String, String> map = new HashMap<>();
        map.put("Key1", "Value1");
        map.put(null, "NullKey");
        map.put("Key2", null);
        map.put("Key3", "Value3");

        System.out.println("Map with nulls: " + map);
        System.out.println("Value for null key: " + map.get(null));
        System.out.println("Value for Key2 (null): " + map.get("Key2"));

        // Проверка наличия null ключа
        System.out.println("Contains null key: " + map.containsKey(null));

        // Проверка наличия null значения
        System.out.println("Contains null value: " + map.containsValue(null));
    }

    @UselessButNeedToKnow
    public static void demonstrateMapOperations() {
        Map<String, Integer> map1 = new HashMap<>();
        map1.put("A", 1);
        map1.put("B", 2);
        map1.put("C", 3);

        Map<String, Integer> map2 = new HashMap<>();
        map2.put("B", 20);
        map2.put("C", 30);
        map2.put("D", 4);

        // Объединение карт (вторая перезаписывает первую)
        Map<String, Integer> merged = new HashMap<>(map1);
        merged.putAll(map2);
        System.out.println("Merged map: " + merged);

        // Проверка на равенство
        System.out.println("Maps equal: " + map1.equals(map2));

        // Копирование
        Map<String, Integer> copy = new HashMap<>(map1);
        System.out.println("Copy of map1: " + copy);
    }

    public static void primitiveTricks() {
        // Использование Stream API для фильтрации
        Map<String, Integer> numbers = new HashMap<>();
        numbers.put("One", 1);
        numbers.put("Two", 2);
        numbers.put("Three", 3);
        numbers.put("Four", 4);
        numbers.put("Five", 5);

        Map<String, Integer> evenNumbers = numbers.entrySet().stream()
            .filter(entry -> entry.getValue() % 2 == 0)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue
            ));
        System.out.println("Even numbers: " + evenNumbers);

        // Проверка на пустоту с использованием Optional
        Map<String, String> emptyMap = new HashMap<>();
        String value = Optional.ofNullable(emptyMap.get("NonExistent"))
            .orElse("Default Value");
        System.out.println("Default value for missing key: " + value);

        // Использование compute для вычисления нового значения
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Player1", 100);
        scores.put("Player2", 200);

        scores.compute("Player1", (key, oldValue) -> oldValue != null ? oldValue + 50 : 50);
        System.out.println("Updated scores: " + scores);
    }

    /**
     * Демонстрация преимуществ HashMap.
     * <p>
     * {@code HashMap} предоставляет множество преимуществ, которые делают его предпочтительным выбором
     * для большинства задач
     * </p>
     */
    public static void demonstrateHashMapAdvantages() {
        System.out.println("=== Advantages of HashMap ===");

        // 1. Быстрый доступ к элементам
        System.out.println("1. Fast access (O(1) average case):");
        Map<Integer, String> fastMap = new HashMap<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            fastMap.put(i, "Value" + i);
        }
        long endTime = System.nanoTime();
        System.out.println("   Adding 100,000 elements took: " + (endTime - startTime) / 1000000.0 + " ms");

        // 2. Уникальность ключей
        System.out.println("\\n2. Unique keys guarantee:");
        Map<String, Integer> uniqueMap = new HashMap<>();
        uniqueMap.put("Key1", 1);
        uniqueMap.put("Key2", 2);
        uniqueMap.put("Key1", 3); // Перезапись значения
        System.out.println("   Map with duplicate key: " + uniqueMap);
        System.out.println("   Size after duplicate key: " + uniqueMap.size());

        // 3. Быстрая проверка наличия
        System.out.println("\\n3. Fast lookup (containsKey, containsValue):");
        startTime = System.nanoTime();
        boolean found = fastMap.containsKey(50000);
        endTime = System.nanoTime();
        System.out.println(
            "   Found element in 100,000 element map: " + found + " (in " + (endTime - startTime) / 1000.0 + " ns)");

        // 4. Эффективная работа с большими наборами данных
        System.out.println("\\n4. Efficient for large datasets:");
        Map<String, Integer> largeMap = new HashMap<>();
        for (int i = 0; i < 1000000; i++) {
            largeMap.put("Key" + i, i);
        }
        System.out.println("   Created map of 1,000,000 key-value pairs");

        // 5. Простота использования
        System.out.println("\\n5. Simple and intuitive API:");
        Map<String, String> simpleMap = new HashMap<>();
        simpleMap.put("Name", "John");
        simpleMap.put("Age", "30");
        simpleMap.remove("Age");
        System.out.println("   Basic operations: put, get, remove, containsKey, size");

        // 6. Поддержка Stream API
        System.out.println("\\n6. Integration with Stream API:");
        Map<String, Integer> numbersMap = new HashMap<>();
        numbersMap.put("One", 1);
        numbersMap.put("Two", 2);
        numbersMap.put("Three", 3);
        numbersMap.put("Four", 4);
        numbersMap.put("Five", 5);

        long evenCount = numbersMap.values().stream()
            .filter(n -> n % 2 == 0)
            .count();
        System.out.println("   Count of even values in map: " + evenCount);

        // 7. Использование в алгоритмах
        System.out.println("\\n7. Common in algorithms:");
        int[] array = {1, 2, 3, 4, 5, 2, 3, 4, 5, 6};
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : array) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        System.out.println("   Frequency map of array: " + frequencyMap);
        System.out.println("   Original array: " + Arrays.toString(array));

        // 8. Поддержка null значений
        System.out.println("\\n8. Null support:");
        Map<String, String> mapWithNulls = new HashMap<>();
        mapWithNulls.put("Key1", "Value1");
        mapWithNulls.put(null, "NullKey");
        mapWithNulls.put("Key2", null);
        System.out.println("   Map with null key and value: " + mapWithNulls);

        // 9. Использование в кэшировании
        System.out.println("\\n9. Cache implementation:");
        Map<String, String> cache = new HashMap<>();
        cache.put("user123", "UserData123");
        cache.put("user456", "UserData456");
        String cachedData = cache.get("user123");
        System.out.println("   Cached data retrieval: " + cachedData);

        // 10. Гибкость в типах ключей и значений
        System.out.println("\\n10. Flexible key/value types:");
        Map<Integer, List<String>> complexMap = new HashMap<>();
        complexMap.put(1, Arrays.asList("Item1", "Item2"));
        complexMap.put(2, Arrays.asList("Item3", "Item4", "Item5"));
        System.out.println("   Complex map with List values: " + complexMap);
    }

    public static void main(String[] args) {
        System.out.println("=== Basics ===");
        demonstrateBasics();

        System.out.println("\\n=== Methods ===");
        demonstrateMethods();

        System.out.println("\\n=== Iteration ===");
        demonstrateIteration();

        System.out.println("\\n=== Null Handling ===");
        demonstrateNullHandling();

        System.out.println("\\n=== Map Operations ===");
        demonstrateMapOperations();

        System.out.println("\\n=== Tricks ===");
        primitiveTricks();

        System.out.println("\\n=== HashMap Advantages ===");
        demonstrateHashMapAdvantages();
    }

    @UselessButNeedToKnow
    public static class CollectionTreeMap {

        /**
         * Демонстрация базовых операций TreeMap.
         */
        public static void demonstrateBasicOperations() {
            TreeMap<String, Integer> treeMap = new TreeMap<>();

            // Добавление элементов
            treeMap.put("Apple", 5);
            treeMap.put("Banana", 3);
            treeMap.put("Cherry", 8);
            treeMap.put("Date", 12);

            System.out.println("=== Basic Operations ===");
            System.out.println("TreeMap: " + treeMap);
            System.out.println("Size: " + treeMap.size());

            // Получение значений
            System.out.println("Apples count: " + treeMap.get("Apple"));
            System.out.println("Grapes count: " + treeMap.get("Grape")); // null

            // Проверка наличия
            System.out.println("Contains Apple: " + treeMap.containsKey("Apple"));
            System.out.println("Contains value 8: " + treeMap.containsValue(8));

            // Обновление значения
            treeMap.put("Apple", 10);
            System.out.println("After updating Apple: " + treeMap);

            // Удаление
            Integer removed = treeMap.remove("Cherry");
            System.out.println("Removed Cherry value: " + removed);
            System.out.println("After removal: " + treeMap);
        }

        /**
         * Демонстрация навигационных методов.
         */
        public static void demonstrateNavigationMethods() {
            TreeMap<Integer, String> treeMap = new TreeMap<>();
            treeMap.put(10, "Ten");
            treeMap.put(20, "Twenty");
            treeMap.put(30, "Thirty");
            treeMap.put(40, "Forty");
            treeMap.put(50, "Fifty");

            System.out.println("\\n=== Navigation Methods ===");
            System.out.println("TreeMap: " + treeMap);

            // Методы получения крайних значений
            System.out.println("First key: " + treeMap.firstKey());
            System.out.println("Last key: " + treeMap.lastKey());
            System.out.println("First entry: " + treeMap.firstEntry());
            System.out.println("Last entry: " + treeMap.lastEntry());

            // Методы получения подмножеств
            System.out.println("Head map (exclusive) up to 30: " + treeMap.headMap(30));
            System.out.println("Head map (inclusive) up to 30: " + treeMap.headMap(30, true));
            System.out.println("Tail map (exclusive) from 30: " + treeMap.tailMap(30));
            System.out.println("Tail map (inclusive) from 30: " + treeMap.tailMap(30, true));
            System.out.println("Sub map (20 to 40): " + treeMap.subMap(20, 40));
            System.out.println("Sub map (inclusive start, exclusive end): " + treeMap.subMap(20, true, 40, false));
        }

        /**
         * Демонстрация навигационных методов с ключами.
         */
        public static void demonstrateKeyNavigation() {
            TreeMap<String, Integer> treeMap = new TreeMap<>();
            treeMap.put("Alpha", 1);
            treeMap.put("Beta", 2);
            treeMap.put("Gamma", 3);
            treeMap.put("Delta", 4);
            treeMap.put("Epsilon", 5);

            System.out.println("\\n=== Key Navigation Methods ===");
            System.out.println("TreeMap: " + treeMap);

            // Методы для работы с ключами
            System.out.println("Floor key of 'Delta': " + treeMap.floorKey("Delta"));
            System.out.println("Ceiling key of 'Delta': " + treeMap.ceilingKey("Delta"));
            System.out.println("Lower key of 'Delta': " + treeMap.lowerKey("Delta"));
            System.out.println("Higher key of 'Delta': " + treeMap.higherKey("Delta"));

            // Сравнение с несуществующими ключами
            System.out.println("Floor key of 'Zeta': " + treeMap.floorKey("Zeta"));
            System.out.println("Ceiling key of 'Zeta': " + treeMap.ceilingKey("Zeta"));
        }

        public static void demonstrateCustomComparator() {
            System.out.println("\\n=== Custom Comparator ===");

            // Сортировка по длине строк
            TreeMap<String, Integer> lengthSorted = new TreeMap<>((s1, s2) -> Integer.compare(s1.length(), s2.length()));
            lengthSorted.put("Short", 1);
            lengthSorted.put("Medium length", 2);
            lengthSorted.put("Very long string", 3);
            lengthSorted.put("A", 4);
            lengthSorted.put("Longer string", 5);

            System.out.println("Sorted by string length: " + lengthSorted);

            // Сортировка по значению
            TreeMap<String, Integer> valueSorted = new TreeMap<>((s1, s2) -> treeMapByValue(s1, s2));
            valueSorted.put("First", 10);
            valueSorted.put("Second", 5);
            valueSorted.put("Third", 15);
            valueSorted.put("Fourth", 2);

            System.out.println("Sorted by value: " + valueSorted);
        }

        /**
         * Вспомогательный метод для сортировки по значению.
         */
        private static int treeMapByValue(String s1, String s2) {
            // Этот метод должен работать с реальным TreeMap, который содержит эти ключи
            // Для демонстрации просто возвращаем порядок
            return 0;
        }

        /**
         * Демонстрация использования TreeMap в алгоритмах.
         */
        public static void demonstrateAlgorithmUsage() {
            System.out.println("\\n=== Algorithm Usage ===");

            // Подсчет частоты элементов
            String text = "hello world hello java world";
            TreeMap<Character, Integer> charFrequency = new TreeMap<>();

            for (char c : text.toCharArray()) {
                charFrequency.put(c, charFrequency.getOrDefault(c, 0) + 1);
            }

            System.out.println("Character frequency: " + charFrequency);

            // Использование в статистике
            TreeMap<String, Double> studentGrades = new TreeMap<>();
            studentGrades.put("Alice", 95.5);
            studentGrades.put("Bob", 87.0);
            studentGrades.put("Charlie", 92.3);
            studentGrades.put("David", 78.5);

            System.out.println("Student grades: " + studentGrades);

            // Нахождение медианы (пример упрощенного подхода)
            System.out.println("Sorted grades: " + studentGrades.values());
        }
    }
}`;

    SNIPPETS['_6.__start_from_here__.HelloMultiThreading'] = `package org.baileyseyes._6.__start_from_here__;

/**
 * Не менее важная тема - многопоточность, про нее обязательно спросят на собесе но на практике встречается примерно никогда.
 * После ознакомления самостоятельно почитать изучить deadlock/livelock/race condition/starvation
 *
 * @see org.baileyseyes._6.extends_thread.ExtendsThread Следующая часть
 * @see org.baileyseyes._5.map.CollectionMap Предыдущая часть
 */
public class HelloMultiThreading {

}`;

    SNIPPETS['_6.extends_thread.ExtendsThread'] = `package org.baileyseyes._6.extends_thread;

import lombok.AllArgsConstructor;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * Демонстрирует работу с многопоточностью через расширение класса Thread.
 *
 * @see org.baileyseyes._6.implements_runnable.ImplementsRunnable Следующая часть
 * @see org.baileyseyes._6.__start_from_here__.HelloMultiThreading Предыдущая часть
 */
@AllArgsConstructor
@UselessButNeedToKnow
public class ExtendsThread extends Thread { // - !!! НИКОГДА НЕ ДЕЛАЙТЕ ТАК !!! - \\\\

    private String threadName;
    private int delay;

    /**
     * Переопределенный метод run(), который выполняется в отдельном потоке.
     */
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + " - Iteration " + i);
            try {
                Thread.sleep(delay);
            } catch (InterruptedException e) {
                System.out.println(threadName + " was interrupted");
                return;
            }
        }
        System.out.println(threadName + " finished execution");
    }

    /**
     * Демонстрация создания и запуска потока.
     */
    @UselessButNeedToKnow
    public static void demonstrateCreationAndExecution() {
        // Создание потоков
        ExtendsThread thread1 = new ExtendsThread("Thread-1", 500);
        ExtendsThread thread2 = new ExtendsThread("Thread-2", 300);

        // Запуск потоков
        thread1.start();
        thread2.start();

        // Ожидание завершения потоков
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }

        System.out.println("All threads completed");
    }

    public static void main(String[] args) {
        demonstrateCreationAndExecution();
    }
}`;

    SNIPPETS['_6.implements_runnable.ImplementsRunnable'] = `package org.baileyseyes._6.implements_runnable;

import lombok.AllArgsConstructor;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._6.implements_callable.ImplementsCallable Следующая часть
 * @see org.baileyseyes._6.extends_thread.ExtendsThread Предыдущая часть
 */
@AllArgsConstructor
@SuppressWarnings("all")
@UselessButNeedToKnow
public class ImplementsRunnable implements Runnable {

    private String threadName;
    private int delay;

    /**
     * Реализованный метод run() из интерфейса Runnable.
     */
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + " - Iteration " + i);
            try {
                Thread.sleep(delay);
            } catch (InterruptedException e) {
                System.out.println(threadName + " was interrupted");
                return;
            }
        }
        System.out.println(threadName + " finished execution");
    }

    /**
     * Демонстрация создания и запуска потока через Runnable.
     */
    public static void demonstrateCreationAndExecution() {
        // Создание задач
        ImplementsRunnable task1 = new ImplementsRunnable("Runnable-1", 500);
        ImplementsRunnable task2 = new ImplementsRunnable("Runnable-2", 300);

        // Создание и запуск потоков
        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(task2);

        thread1.start();
        thread2.start();

        // Ожидание завершения потоков
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }

        System.out.println("All threads completed");
    }

    public static void main(String[] args) {
        demonstrateCreationAndExecution();
    }
}`;

    SNIPPETS['_6.implements_callable.ImplementsCallable'] = `package org.baileyseyes._6.implements_callable;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import lombok.AllArgsConstructor;
import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._6.synchronized_method.SynchronizedMethods Следующая часть
 * @see org.baileyseyes._6.implements_runnable.ImplementsRunnable Предыдущая часть
 */
@AllArgsConstructor
@UselessButNeedToKnow
public class ImplementsCallable implements Callable<String> {

    private String taskName;
    private int delay;

    /**
     * Реализованный метод call() из интерфейса Callable.
     * Возвращает результат выполнения задачи.
     */
    @Override
    public String call() throws Exception {
        StringBuilder result = new StringBuilder();
        result.append(taskName).append(" - Executing:\\n");

        for (int i = 1; i <= 3; i++) {
            result.append(taskName).append(" - Iteration ").append(i).append("\\n");
            Thread.sleep(delay);
        }

        result.append(taskName).append(" - Completed");
        return result.toString();
    }

    /**
     * Демонстрация создания и запуска задачи через Callable.
     */
    public static void demonstrateCreationAndExecution() {
        // Создание задач
        ImplementsCallable task1 = new ImplementsCallable("Callable-1", 500);
        ImplementsCallable task2 = new ImplementsCallable("Callable-2", 300);

        // Создание ThreadPoolExecutor
        ExecutorService executor = Executors.newFixedThreadPool(2); //про ExecutorService/Executors отдельно почитать всё

        try {
            // Запуск задач и получение результатов
            Future<String> future1 = executor.submit(task1);
            Future<String> future2 = executor.submit(task2);

            // Получение результатов
            String result1 = future1.get(); // Блокирует до завершения задачи
            String result2 = future2.get(); // Блокирует до завершения задачи

            System.out.println(result1);
            System.out.println(result2);

        } catch (InterruptedException | ExecutionException e) {
            System.out.println("Task execution failed: " + e.getMessage());
        } finally {
            // Завершение работы пула потоков
            executor.shutdown();
        }

        System.out.println("All tasks completed");
    }

    public static void main(String[] args) {
        demonstrateCreationAndExecution();
    }
}`;

    SNIPPETS['_6.synchronized_method.SynchronizedMethods'] = `package org.baileyseyes._6.synchronized_method;

import org.baileyseyes._3.annotation.UselessButNeedToKnow;

/**
 * @see org.baileyseyes._7.Else Следующая часть
 * @see org.baileyseyes._6.implements_callable.ImplementsCallable Предыдущая часть
 */
@UselessButNeedToKnow
public class SynchronizedMethods {

    private int counter = 0;
    private static int staticCounter = 0;

    /**
     * Синхронизированный метод экземпляра.
     * Блокирует объект (this) на время выполнения метода.
     */
    public synchronized void incrementCounter() {
        counter++;
        System.out.println("Instance counter: " + counter);
    }

    /**
     * Синхронизированный статический метод.
     * Блокирует класс (SynchronizedMethods.class) на время выполнения метода.
     */
    public static synchronized void incrementStaticCounter() {
        staticCounter++;
        System.out.println("Static counter: " + staticCounter);
    }

    /**
     * Синхронизированный блок с конкретным объектом.
     */
    public void synchronizedBlockExample() {
        synchronized (this) {
            counter += 10;
            System.out.println("Counter with synchronized block: " + counter);
        }
    }

    /**
     * Синхронизированный блок с классом.
     */
    public static void synchronizedClassBlock() {
        synchronized (SynchronizedMethods.class) {
            staticCounter += 10;
            System.out.println("Static counter with class block: " + staticCounter);
        }
    }

    /**
     * Демонстрация синхронизации в многопоточной среде.
     */
    public static void demonstrateSynchronization() {
        SynchronizedMethods instance = new SynchronizedMethods();

        // Создание нескольких потоков для демонстрации синхронизации
        Thread[] threads = new Thread[5];

        for (int i = 0; i < 5; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 3; j++) {
                    instance.incrementCounter();
                    incrementStaticCounter();
                }
            });
        }

        // Запуск всех потоков
        for (Thread thread : threads) {
            thread.start();
        }

        // Ожидание завершения всех потоков
        try {
            for (Thread thread : threads) {
                thread.join();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("Final counters - Instance: " + instance.counter + ", Static: " + staticCounter);
    }

    /**
     * Вложенный класс с демонстрацией volatile.
     */
    public static class Volatile {

        // volatile переменная гарантирует видимость изменений в других потоках
        private volatile boolean flag = false;
        private volatile int counter = 0;

        /**
         * Метод, изменяющий volatile переменные.
         */
        public void updateValues() {
            counter = 100;
            flag = true;
            System.out.println("Updated volatile variables: counter=" + counter + ", flag=" + flag);
        }

        /**
         * Метод, читающий volatile переменные.
         */
        public void readValues() {
            System.out.println("Reading volatile variables: counter=" + counter + ", flag=" + flag);
        }

        /**
         * Демонстрация использования volatile в многопоточной среде.
         */
        @SuppressWarnings("all")
        public static void demonstrateVolatile() {
            Volatile demo = new Volatile();

            // Поток, который изменяет volatile переменные
            Thread writerThread = new Thread(() -> {
                try {
                    Thread.sleep(100);
                    demo.updateValues();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });

            // Поток, который читает volatile переменные
            Thread readerThread = new Thread(() -> {
                // Ожидание, пока writerThread не изменит значения
                while (!demo.flag) {
                    // Busy wait - ждем, пока флаг станет true
                }
                demo.readValues();
            });

            readerThread.start();
            writerThread.start();

            try {
                writerThread.join();
                readerThread.join();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

            System.out.println("Volatile demonstration completed");
        }
    }

    /**
     * Демонстрация использования volatile с потоками.
     */
    public static void demonstrateVolatileWithThreads() {
        Volatile.demonstrateVolatile();
    }

    public static void main(String[] args) {
        System.out.println("=== Synchronization Demonstration ===");
        demonstrateSynchronization();

        System.out.println("\\n=== Volatile Demonstration ===");
        demonstrateVolatileWithThreads();
    }
}`;

    SNIPPETS['_7.Else'] = `package org.baileyseyes._7;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * @see StreamAPI Следующая часть
 * @see org.baileyseyes._6.synchronized_method.SynchronizedMethods Предыдущая часть
 */
@SuppressWarnings("all")
public class Else {

    /**
     * Демонстрация Optional и его использования.
     */
    public static void demonstrateOptional() {
        // Создание Optional
        Optional<String> optionalValue = Optional.of("Hello");
        Optional<String> optionalEmpty = Optional.empty();
        Optional<String> optionalNullable = Optional.ofNullable(null);

        // Проверка наличия значения
        System.out.println("Optional with value present: " + optionalValue.isPresent());
        System.out.println("Optional empty present: " + optionalEmpty.isPresent());

        // Получение значения с дефолтным значением
        String value = optionalValue.orElse("Default");
        String defaultValue = optionalEmpty.orElse("Default");
        System.out.println("Value with default: " + value + ", " + defaultValue);

        // Получение значения с обработкой исключения
        try {
            String valueOrThrow = optionalEmpty.orElseThrow(() -> new RuntimeException("No value"));
        } catch (RuntimeException e) {
            System.out.println("Exception thrown: " + e.getMessage());
        }

        // Условное выполнение
        optionalValue.ifPresent(System.out::println);
        optionalEmpty.ifPresent(System.out::println); // Не выполнится

        // Преобразование значения
        Optional<Integer> length = optionalValue.map(String::length);
        System.out.println("Length of optional value: " + length.orElse(0));

        // Фильтрация
        Optional<String> filtered = optionalValue.filter(s -> s.length() > 3);
        System.out.println("Filtered value: " + filtered.orElse("Not matched"));
    }

    /**
     * Демонстрация использования Predicate.
     */
    public static void demonstratePredicate() {
        List<String> strings = Arrays.asList("Hello", "World", "Java", "Programming", "Stream");

        // Создание предикатов
        Predicate<String> startsWithJ = s -> s.startsWith("J");
        Predicate<String> longerThan5 = s -> s.length() > 5;
        Predicate<String> containsA = s -> s.contains("a");

        // Использование предикатов
        List<String> filtered = strings.stream()
            .filter(startsWithJ)
            .collect(Collectors.toList());
        System.out.println("Strings starting with J: " + filtered);

        // Комбинирование предикатов
        Predicate<String> combined = startsWithJ.and(longerThan5);
        List<String> combinedFilter = strings.stream()
            .filter(combined)
            .collect(Collectors.toList());
        System.out.println("Strings starting with J and longer than 5: " + combinedFilter);

        // Использование в методах
        long count = strings.stream().filter(containsA).count();
        System.out.println("Strings containing 'a': " + count);
    }

    /**
     * Демонстрация использования Comparator.
     */
    public static void demonstrateComparator() {
        List<String> strings = Arrays.asList("Banana", "Apple", "Cherry", "Date");

        // Стандартная сортировка
        Collections.sort(strings);
        System.out.println("Natural order: " + strings);

        // Сортировка с Comparator
        List<String> reversed = new ArrayList<>(strings);
        Collections.sort(reversed, Comparator.reverseOrder());
        System.out.println("Reverse order: " + reversed);

        // Сортировка по длине строки
        List<String> byLength = new ArrayList<>(strings);
        Collections.sort(byLength, Comparator.comparing(String::length));
        System.out.println("Sorted by length: " + byLength);

        // Сравнение с null значениями
        List<String> withNull = Arrays.asList("Banana", null, "Apple", "Cherry");
        withNull.sort(Comparator.nullsLast(String::compareTo));
        System.out.println("Sorted with nulls last: " + withNull);
    }

    /**
     * Демонстрация работы с коллекциями и Stream API.
     */
    public static void demonstrateStreamApi() {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Фильтрация и маппинг
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .collect(Collectors.toList());
        System.out.println("Even squares: " + evenSquares);

        // Суммирование
        int sum = numbers.stream().mapToInt(Integer::intValue).sum();
        System.out.println("Sum of numbers: " + sum);

        // Максимальное значение
        Optional<Integer> max = numbers.stream().max(Integer::compareTo);
        System.out.println("Maximum: " + max.orElse(0));

        // Группировка
        Map<Boolean, List<Integer>> grouped = numbers.stream()
            .collect(Collectors.partitioningBy(n -> n % 2 == 0));
        System.out.println("Even/odd grouping: " + grouped);
    }

    /**
     * Демонстрация работы с датами и временем (Java 8+).
     */
    public static void demonstrateDateTime() {
        // Получение текущей даты и времени
        java.time.LocalDateTime now = java.time.LocalDateTime.now();
        System.out.println("Current datetime: " + now);

        // Форматирование даты
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formatted = now.format(formatter);
        System.out.println("Formatted datetime: " + formatted);

        // Работа с датами
        java.time.LocalDate today = java.time.LocalDate.now();
        java.time.LocalDate tomorrow = today.plusDays(1);
        System.out.println("Today: " + today + ", Tomorrow: " + tomorrow);

        // Работа с временем
        java.time.LocalTime nowTime = java.time.LocalTime.now();
        System.out.println("Current time: " + nowTime);
    }


    /**
     * Демонстрация работы с аннотациями.
     */
    public static void demonstrateAnnotations() {
        // Использование стандартных аннотаций
        @SuppressWarnings("unused")
        String unusedVariable = "This won't cause warning";

        // Пример использования @Override
        System.out.println("Annotations demonstrated");
    }

    /**
     * Демонстрация работы с модификаторами доступа.
     */
    public static void demonstrateAccessModifiers() {
        // Пример использования различных модификаторов
        // (реализация в отдельном классе для демонстрации)
        System.out.println("Access modifiers demonstrated");
    }

    public static void main(String[] args) {
        System.out.println("=== Optional Demonstration ===");
        demonstrateOptional();

        System.out.println("\\n=== Predicate Demonstration ===");
        demonstratePredicate();

        System.out.println("\\n=== Comparator Demonstration ===");
        demonstrateComparator();

        System.out.println("\\n=== Stream API Demonstration ===");
        demonstrateStreamApi();

        System.out.println("\\n=== DateTime Demonstration ===");
        demonstrateDateTime();

        System.out.println("\\n=== Annotations Demonstration ===");
        demonstrateAnnotations();
    }
}`;

    SNIPPETS['_7.StreamAPI'] = `package org.baileyseyes._7;

import java.util.Arrays;
import java.util.Comparator;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @see Else Предыдущая часть
 */
@SuppressWarnings("all")
public class StreamAPI {

    /**
     * Демонстрация создания стримов.
     */
    public static void demonstrateStreamCreation() {
        System.out.println("=== Stream Creation ===");

        // Создание стрима из коллекции
        List<String> list = Arrays.asList("A", "B", "C", "D");
        Stream<String> stream1 = list.stream();

        // Создание стрима из массива
        String[] array = {"X", "Y", "Z"};
        Stream<String> stream2 = Arrays.stream(array);

        // Создание стрима из значений
        Stream<String> stream3 = Stream.of("P", "Q", "R");

        // Создание пустого стрима
        Stream<String> emptyStream = Stream.empty();

        // Создание стрима с помощью Stream.builder()
        Stream<String> builderStream = Stream.<String>builder()
            .add("Builder1")
            .add("Builder2")
            .build();

        System.out.println("Stream from collection: " + list);
        System.out.println("Stream from array: " + Arrays.toString(array));
        System.out.println("Stream from values: " + stream3.toList());
    }

    /**
     * Демонстрация методов filter().
     */
    public static void demonstrateFilter() {
        System.out.println("\\n=== Filter Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Фильтрация четных чисел
        List<Integer> evenNumbers = numbers.stream()
            .filter(n -> n % 2 == 0)
            .toList();
        System.out.println("Even numbers: " + evenNumbers);

        // Фильтрация по длине строки
        List<String> words = Arrays.asList("Hello", "Java", "Stream", "API", "Programming");
        List<String> longWords = words.stream()
            .filter(word -> word.length() > 4)
            .toList();
        System.out.println("Words longer than 4 chars: " + longWords);

        // Сложные фильтры
        List<Integer> filtered = numbers.stream()
            .filter(n -> n > 3)
            .filter(n -> n < 8)
            .toList();
        System.out.println("Numbers between 3 and 8: " + filtered);
    }

    /**
     * Демонстрация методов map().
     */
    public static void demonstrateMap() {
        System.out.println("\\n=== Map Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Преобразование чисел в их квадраты
        List<Integer> squares = numbers.stream()
            .map(n -> n * n)
            .toList();
        System.out.println("Squares: " + squares);

        // Преобразование строк в длины
        List<String> words = Arrays.asList("Hello", "World", "Java", "Stream");
        List<Integer> lengths = words.stream()
            .map(String::length)
            .toList();
        System.out.println("Word lengths: " + lengths);

        // Преобразование в объекты
        List<String> upperCase = words.stream()
            .map(String::toUpperCase)
            .toList();
        System.out.println("Uppercase words: " + upperCase);
    }

    /**
     * Демонстрация методов flatMap().
     */
    public static void demonstrateFlatMap() {
        System.out.println("\\n=== FlatMap Method ===");

        List<List<Integer>> nestedLists = Arrays.asList(
            Arrays.asList(1, 2),
            Arrays.asList(3, 4),
            Arrays.asList(5, 6)
        );

        List<Integer> flattened = nestedLists.stream()
            .flatMap(List::stream)
            .toList();
        System.out.println("Flattened list: " + flattened);

        // Работа со строками
        List<String> sentences = Arrays.asList("Hello World", "Java Stream", "API Example");
        List<String> words = sentences.stream()
            .map(sentence -> sentence.split(" "))
            .flatMap(Arrays::stream)
            .toList();
        System.out.println("Words from sentences: " + words);
    }

    /**
     * Демонстрация методов distinct().
     */
    public static void demonstrateDistinct() {
        System.out.println("\\n=== Distinct Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 4, 4, 5, 5, 5);

        // Удаление дубликатов
        List<Integer> uniqueNumbers = numbers.stream()
            .distinct()
            .toList();
        System.out.println("Unique numbers: " + uniqueNumbers);

        // Работа со строками
        List<String> words = Arrays.asList("Apple", "Banana", "Apple", "Cherry", "Banana");
        List<String> uniqueWords = words.stream()
            .distinct()
            .toList();
        System.out.println("Unique words: " + uniqueWords);
    }

    /**
     * Демонстрация методов sorted().
     */
    public static void demonstrateSorted() {
        System.out.println("\\n=== Sorted Method ===");

        List<String> words = Arrays.asList("Banana", "Apple", "Cherry", "Date");

        // Сортировка по умолчанию
        List<String> sorted = words.stream()
            .sorted()
            .toList();
        System.out.println("Alphabetically sorted: " + sorted);

        // Сортировка с компаратором
        List<String> reverseSorted = words.stream()
            .sorted(Comparator.reverseOrder())
            .toList();
        System.out.println("Reverse sorted: " + reverseSorted);

        // Сортировка по длине
        List<String> sortByLength = words.stream()
            .sorted(Comparator.comparing(String::length))
            .toList();
        System.out.println("Sorted by length: " + sortByLength);
    }

    /**
     * Демонстрация методов limit() и skip().
     */
    public static void demonstrateLimitSkip() {
        System.out.println("\\n=== Limit and Skip Methods ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Ограничение количества элементов
        List<Integer> limited = numbers.stream()
            .limit(5)
            .toList();
        System.out.println("First 5 numbers: " + limited);

        // Пропуск элементов
        List<Integer> skipped = numbers.stream()
            .skip(5)
            .toList();
        System.out.println("Numbers after skipping first 5: " + skipped);

        // Комбинация limit и skip
        List<Integer> limitSkip = numbers.stream()
            .skip(2)
            .limit(3)
            .toList();
        System.out.println("Skip 2, take 3: " + limitSkip);
    }

    /**
     * Демонстрация методов peek().
     */
    public static void demonstratePeek() {
        System.out.println("\\n=== Peek Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Использование peek для отладки
        List<Integer> result = numbers.stream()
            .peek(n -> System.out.println("Processing: " + n))
            .map(n -> n * 2)
            .peek(n -> System.out.println("After map: " + n))
            .toList();
        System.out.println("Final result: " + result);
    }

    /**
     * Демонстрация методов reduce().
     */
    public static void demonstrateReduce() {
        System.out.println("\\n=== Reduce Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Суммирование
        Optional<Integer> sum = numbers.stream()
            .reduce(Integer::sum);
        System.out.println("Sum: " + sum.orElse(0));

        // Суммирование с начальным значением
        int sumWithInit = numbers.stream()
            .reduce(10, Integer::sum);
        System.out.println("Sum with initial value 10: " + sumWithInit);

        // Конкатенация строк
        List<String> words = Arrays.asList("Hello", " ", "World", "!");
        Optional<String> sentence = words.stream()
            .reduce(String::concat);
        System.out.println("Sentence: " + sentence.orElse(""));

        // Максимальное значение
        Optional<Integer> max = numbers.stream()
            .reduce(Integer::max);
        System.out.println("Maximum: " + max.orElse(0));
    }

    /**
     * Демонстрация методов collect().
     */
    public static void demonstrateCollect() {
        System.out.println("\\n=== Collect Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Сбор в список
        List<Integer> list = numbers.stream()
            .collect(Collectors.toList());
        System.out.println("Collected to list: " + list);

        // Сбор в массив
        Integer[] array = numbers.stream()
            .toArray(Integer[]::new);
        System.out.println("Collected to array: " + Arrays.toString(array));

        // Сбор в Set
        Set<Integer> set = numbers.stream()
            .collect(Collectors.toSet());
        System.out.println("Collected to set: " + set);

        // Сбор в Map
        Map<Integer, String> map = numbers.stream()
            .collect(Collectors.toMap(
                n -> n,
                n -> "Number_" + n
            ));
        System.out.println("Collected to map: " + map);

        // Сбор в строку
        String joined = numbers.stream()
            .map(String::valueOf)
            .collect(Collectors.joining(", "));
        System.out.println("Joined string: " + joined);
    }

    /**
     * Демонстрация методов min() и max().
     */
    public static void demonstrateMinMaxLength() {
        System.out.println("\\n=== Min and Max Methods ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Минимальное значение
        Optional<Integer> min = numbers.stream()
            .min(Integer::compareTo);
        System.out.println("Minimum: " + min.orElse(0));

        // Максимальное значение
        Optional<Integer> max = numbers.stream()
            .max(Integer::compareTo);
        System.out.println("Maximum: " + max.orElse(0));

        // Минимальное по критерию
        List<String> words = Arrays.asList("Apple", "Banana", "Cherry", "Date");
        Optional<String> shortest = words.stream()
            .min(Comparator.comparing(String::length));
        System.out.println("Shortest word: " + shortest.orElse(""));
    }

    /**
     * Демонстрация методов count(), anyMatch(), allMatch(), noneMatch().
     */
    public static void demonstrateTerminalOperations() {
        System.out.println("\\n=== Terminal Operations ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Подсчет элементов
        long count = numbers.stream().count();
        System.out.println("Total count: " + count);

        // Проверка наличия элементов
        boolean anyEven = numbers.stream().anyMatch(n -> n % 2 == 0);
        System.out.println("Any even number: " + anyEven);

        boolean allEven = numbers.stream().allMatch(n -> n % 2 == 0);
        System.out.println("All even numbers: " + allEven);

        boolean noneNegative = numbers.stream().noneMatch(n -> n < 0);
        System.out.println("No negative numbers: " + noneNegative);

        // Поиск первого элемента
        Optional<Integer> first = numbers.stream().findFirst();
        System.out.println("First element: " + first.orElse(0));

        // Поиск любого элемента
        Optional<Integer> any = numbers.stream().findAny();
        System.out.println("Any element: " + any.orElse(0));
    }

    /**
     * Демонстрация методов groupingBy().
     */
    public static void demonstrateGroupingBy() {
        System.out.println("\\n=== GroupingBy Method ===");

        List<String> words = Arrays.asList("Apple", "Banana", "Cherry", "Date", "Elderberry");

        // Группировка по длине строки
        Map<Integer, List<String>> groupedByLength = words.stream()
            .collect(Collectors.groupingBy(String::length));
        System.out.println("Grouped by length: " + groupedByLength);

        // Группировка по первой букве
        Map<Character, List<String>> groupedByFirstLetter = words.stream()
            .collect(Collectors.groupingBy(word -> word.charAt(0)));
        System.out.println("Grouped by first letter: " + groupedByFirstLetter);

        // Группировка с подсчетом
        Map<Integer, Long> countByLength = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));
        System.out.println("Count by length: " + countByLength);
    }

    /**
     * Демонстрация методов partitioningBy().
     */
    public static void demonstratePartitioningBy() {
        System.out.println("\\n=== PartitioningBy Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Разделение на четные и нечетные
        Map<Boolean, List<Integer>> partitioned = numbers.stream()
            .collect(Collectors.partitioningBy(n -> n % 2 == 0));
        System.out.println("Even and odd numbers: " + partitioned);

        // Разделение с дополнительной группировкой
        Map<Boolean, Map<Integer, List<Integer>>> complexPartition = numbers.stream()
            .collect(Collectors.partitioningBy(
                n -> n % 2 == 0,
                Collectors.groupingBy(n -> n % 3)
            ));
        System.out.println("Complex partition: " + complexPartition);
    }

    /**
     * Демонстрация методов mapping().
     */
    public static void demonstrateMapping() {
        System.out.println("\\n=== Mapping Method ===");

        List<Person> people = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 35)
        );

        // Извлечение и преобразование полей
        List<String> names = people.stream()
            .map(Person::getName)
            .collect(Collectors.toList());
        System.out.println("Names: " + names);

        // Группировка с маппингом
        Map<Integer, List<String>> groupedByAge = people.stream()
            .collect(Collectors.groupingBy(
                Person::getAge,
                Collectors.mapping(Person::getName, Collectors.toList())
            ));
        System.out.println("Grouped by age with names: " + groupedByAge);
    }

    /**
     * Демонстрация методов collectingAndThen().
     */
    public static void demonstrateCollectingAndThen() {
        System.out.println("\\n=== CollectingAndThen Method ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Сбор в список и преобразование в строку
        String result = numbers.stream()
            .collect(Collectors.collectingAndThen(
                Collectors.toList(),
                list -> "List contains " + list.size() + " elements"
            ));
        System.out.println(result);
    }

    /**
     * Демонстрация методов averaging(), summing(), summarizing().
     */
    public static void demonstrateStatistics() {
        System.out.println("\\n=== Statistics Methods ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Среднее значение
        double average = numbers.stream()
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0.0);
        System.out.println("Average: " + average);

        // Сумма
        int sum = numbers.stream()
            .mapToInt(Integer::intValue)
            .sum();
        System.out.println("Sum: " + sum);

        // Статистика
        IntSummaryStatistics stats = numbers.stream()
            .mapToInt(Integer::intValue)
            .summaryStatistics();
        System.out.println("Statistics - Count: " + stats.getCount() +
            ", Min: " + stats.getMin() +
            ", Max: " + stats.getMax() +
            ", Average: " + stats.getAverage() +
            ", Sum: " + stats.getSum());
    }

    /**
     * Демонстрация параллельных стримов.
     */
    public static void demonstrateParallelStreams() {
        System.out.println("\\n=== Parallel Streams ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Последовательный стрим
        long startTime = System.nanoTime();
        List<Integer> sequential = numbers.stream()
            .map(n -> n * n)
            .collect(Collectors.toList());
        long sequentialTime = System.nanoTime() - startTime;

        // Параллельный стрим
        startTime = System.nanoTime();
        List<Integer> parallel = numbers.parallelStream()
            .map(n -> n * n)
            .collect(Collectors.toList());
        long parallelTime = System.nanoTime() - startTime;

        System.out.println("Sequential time: " + sequentialTime / 1000000.0 + " ms");
        System.out.println("Parallel time: " + parallelTime / 1000000.0 + " ms");
        System.out.println("Results equal: " + sequential.equals(parallel));
    }

    static class Person {
        private String name;
        private int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public int getAge() {
            return age;
        }
    }

    public static void main(String[] args) {
        demonstrateStreamCreation();
        demonstrateFilter();
        demonstrateMap();
        demonstrateFlatMap();
        demonstrateDistinct();
        demonstrateSorted();
        demonstrateLimitSkip();
        demonstratePeek();
        demonstrateReduce();
        demonstrateCollect();
        demonstrateMinMaxLength();
        demonstrateTerminalOperations();
        demonstrateGroupingBy();
        demonstratePartitioningBy();
        demonstrateMapping();
        demonstrateCollectingAndThen();
        demonstrateStatistics();
        demonstrateParallelStreams();
    }
}`;

    SNIPPETS['Main'] = `package org.baileyseyes;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {

    /**
     * <p>
     * Переходите в раздел {@linkplain org.baileyseyes._1.__start_from_here__.HelloWorld вступления}
     * </p>
     */
    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        System.out.print("Hello and welcome!");

        for (int i = 1; i <= 5; i++) {
            //TIP Press <shortcut actionId="Debug"/> to start debugging your code. We have set one <icon src="AllIcons.Debugger.Db_set_breakpoint"/> breakpoint
            // for you, but you can always add more by pressing <shortcut actionId="ToggleLineBreakpoint"/>.
            System.out.println("i = " + i);
        }
    }
}`;

    SNIPPETS['_1.if_else.SwitchStatement'] = `package org.baileyseyes._1.if_else;

import java.util.Scanner;

/**
 * Демонстрирует работу оператора switch в Java.
 * Показывает классический switch, switch как выражение (Java 14+),
 * и использование yield для возврата значения.
 *
 * @see org.baileyseyes._1.methods.Methods Предыдущая часть
 */
@SuppressWarnings("all")
public class SwitchStatement {

    /**
     * Базовый switch — классический синтаксис.
     * Каждое break обязательно, иначе произойдёт «проваливание» (fall-through).
     */
    public static void demonstrateBasicSwitch() {
        System.out.println("=== Базовый switch ===");
        int day = 3;

        String dayName;
        switch (day) {
            case 1:
                dayName = "Понедельник";
                break;
            case 2:
                dayName = "Вторник";
                break;
            case 3:
                dayName = "Среда";
                break;
            case 4:
                dayName = "Четверг";
                break;
            case 5:
                dayName = "Пятница";
                break;
            case 6:
                dayName = "Суббота";
                break;
            case 7:
                dayName = "Воскресенье";
                break;
            default:
                dayName = "Неизвестный день";
                break;
        }

        System.out.println("День " + day + " — это " + dayName);
    }

    /**
     * Fall-through — несколько case используют один блок кода.
     * Показывается, когда это полезно.
     */
    public static void demonstrateFallThrough() {
        System.out.println("\\n=== Fall-through (несколько case → один блок) ===");

        char grade = 'B';

        switch (grade) {
            case 'A':
            case 'B':
                System.out.println("Отлично или хорошо!");
                break;
            case 'C':
                System.out.println("Удовлетворительно");
                break;
            case 'D':
            case 'F':
                System.out.println("Неудовлетворительно");
                break;
            default:
                System.out.println("Неизвестная оценка");
        }
    }

    /**
     * Switch как выражение (Java 14+):
     * Возвращает значение напрямую, без break и fall-through.
     * Arrow-синтаксис (->) вместо двоеточия (:).
     */
    public static String getMonthNameModern(int month) {
        // Arrow-синтаксис: нет break, нет fall-through — чистый и читаемый код
        return switch (month) {
            case 1 -> "Январь";
            case 2 -> "Февраль";
            case 3 -> "Март";
            case 4 -> "Апрель";
            case 5 -> "Май";
            case 6 -> "Июнь";
            case 7 -> "Июль";
            case 8 -> "Август";
            case 9 -> "Сентябрь";
            case 10 -> "Октябрь";
            case 11 -> "Ноябрь";
            case 12 -> "Декабрь";
            default -> "Неверный номер месяца";
        };
    }

    /**
     * Switch как выражение с yield:
     * Можно вложить несколько строк кода в один case и вернуть значение через yield.
     */
    public static String getSeasonDescription(int month) {
        return switch (month) {
            case 12, 1, 2 -> "Зима — холодно и снег";
            case 3, 4, 5 -> {
                // Несколько инструкций в блоке
                String description = "Весна — всё цветёт";
                yield description;
            }
            case 6, 7, 8 -> "Лето — жарко и тепло";
            case 9, 10, 11 -> "Осень — листья опадают";
            default -> {
                System.err.println("Месяц вне допустимого диапазона: " + month);
                yield "Ошибка ввода";
            }
        };
    }

    /**
     * Switch с строками (Java 12+):
     * Строки сравниваются через .equals(), а не через ==.
     */
    public static void demonstrateSwitchWithString() {
        System.out.println("\\n=== Switch со строками ===");
        String fruit = "яблоко";

        switch (fruit) {
            case "яблоко":
                System.out.println("Красное или зелёное, хрустящее");
                break;
            case "банан":
                System.out.println("Жёлтое, сладкое");
                break;
            case "апельсин":
                System.out.println("Оранжевое, сочное");
                break;
            default:
                System.out.println("Не знакомый фрукт");
        }
    }

    /**
     * Тернарный оператор — компактная замена if-else для простых условий.
     * Синтаксис: (условие) ? значение_если_истина : значение_если_ложь
     */
    public static void demonstrateTernaryOperator() {
        System.out.println("\\n=== Тернарный оператор ===");
        int age = 20;

        // Простое тернарное выражение
        String status = (age >= 18) ? "взрослый" : "несовершеннолетний";
        System.out.println("Возраст " + age + " — " + status);

        // Вложенный тернарный оператор
        int score = 85;
        String rating = (score >= 90) ? "A" : (score >= 70) ? "B" : (score >= 50) ? "C" : "F";
        System.out.println("Оценка " + score + " — " + rating);

        // Тернарный оператор для выбора числа
        int x = 10, y = 20;
        int max = (x > y) ? x : y;
        System.out.println("Максимум из " + x + " и " + y + " = " + max);
    }

    /**
     * Работа с Scanner для чтения пользовательского ввода.
     * Scanner читает из System.in (клавиатуры).
     */
    public static void demonstrateScanner() {
        System.out.println("\\n=== Работа с Scanner ===");
        Scanner scanner = new Scanner(System.in);

        try {
            // Чтение целой строки
            System.out.print("Как вас зовут? ");
            String name = scanner.nextLine();
            System.out.println("Привет, " + name + "!");

            // Число
            System.out.print("Сколько вам лет? ");
            int age = scanner.nextInt();
            System.out.println("Через 10 лет вам будет " + (age + 10));

            // Вещественное число
            System.out.print("Ваш любимый процент (дробное число): ");
            double percent = scanner.nextDouble();
            System.out.println("Интересный выбор: " + percent);

        } catch (Exception e) {
            System.out.println("Ошибка при вводе данных");
        } finally {
            scanner.close(); // Всегда закрываем ресурсы
        }
    }

    /**
     * Безопасное чтение с Scanner — проверка типов перед вводом.
     * hasNextInt(), hasNextDouble() предотвращают ошибки ввода.
     */
    public static void demonstrateSafeScanner() {
        System.out.println("\\n=== Безопасное чтение с Scanner ===");
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Введите число (или 'q' для выхода): ");

            // hasNextInt() проверяет тип БЕЗ consumption (не «съедает» ввод)
            if (scanner.hasNextInt()) {
                int number = scanner.nextInt();
                System.out.println("Вы ввели: " + number);
                System.out.println("Квадрат: " + (number * number));
            } else {
                String token = scanner.next();
                System.out.println("Не число, а '" + token + "'");
            }

        } finally {
            scanner.close();
        }
    }

    /**
     * Частый паттерн: чтение числа с проверкой.
     * Цикл повторяет запрос до получения корректного значения.
     */
    public static void demonstrateReadWithValidation() {
        System.out.println("\\n=== Число с валидацией ===");
        Scanner scanner = new Scanner(System.in);
        int validNumber = -1;

        while (true) {
            System.out.print("Введите число от 1 до 10: ");
            if (scanner.hasNextInt()) {
                validNumber = scanner.nextInt();
                if (validNumber >= 1 && validNumber <= 10) {
                    break; // Всё верно — выходим из цикла
                } else {
                    System.out.println("Число вне диапазона 1-10!");
                }
            } else {
                System.out.println("Это не число! Попробуйте снова.");
                scanner.next(); // Очищаем некорректный ввод
            }
        }
        System.out.println("Принято число: " + validNumber);
        scanner.close();
    }

    public static void main(String[] args) {
        System.out.println("=== Демонстрация switch и Scanner ===");
        demonstrateBasicSwitch();
        demonstrateFallThrough();
        System.out.println("\\nМесяц 7: " + getMonthNameModern(7));
        System.out.println("Сезон месяца 5: " + getSeasonDescription(5));
        demonstrateSwitchWithString();
        demonstrateTernaryOperator();
        // Для интерактивности — раскомментируйте следующие строки:
        // demonstrateScanner();
        // demonstrateSafeScanner();
        // demonstrateReadWithValidation();
    }
}`;

    SNIPPETS['_1.types.TernaryOperator'] = `package org.baileyseyes._1.types;

/**
 * Тернарный оператор — короткая версия if-else.
 * 
 * Синтаксис: условие ? значение1 : значение2
 * Если условие true → значение1, иначе → значение2.
 * 
 * @see org.baileyseyes._1.if_else.IfElse Предыдущая часть
 */
@SuppressWarnings("all")
public class TernaryOperator {

    public static void demonstrateBasic() {
        // ===================== Базовый тернарный оператор =====================

        int age = 20;
        String status;

        // Обычный if-else
        if (age >= 18) {
            status = "Совершеннолетний";
        } else {
            status = "Несовершеннолетний";
        }
        System.out.println("if-else: " + status);

        // Тот же код через тернарный оператор
        status = (age >= 18) ? "Совершеннолетний" : "Несовершеннолетний";
        System.out.println("Тернарный: " + status);
    }

    // ===================== Вложенный тернарный оператор =====================

    /**
     * Тернарный оператор можно вкладывать.
     * Но! Вложенность > 2 делает код нечитаемым — лучше if-else!
     */
    public static void demonstrateNestedTernary() {
        System.out.println("\\n=== Вложенный тернарный ===");

        int score = 85;
        // Вложенный тернарный: оценка по баллам
        String grade = (score >= 90) ? "Отлично"
                 : (score >= 70) ? "Хорошо"
                 : (score >= 50) ? "Удовлетворительно"
                 : "Неудовлетворительно";

        System.out.println("Баллы: " + score + " → Оценка: " + grade);
        // НЕ РЕКОМЕНДУЕТСЯ вложенность > 2 — используйте switch/if-else!
    }

    // ===================== Тернарный в присваивании =====================

    /**
     * Тернарный оператор в присваивании переменной.
     */
    public static void demonstrateAssignment() {
        System.out.println("\\n=== Присваивание ===");

        int a = 10, b = 20;
        // Находим максимум
        int max = (a > b) ? a : b;
        System.out.println("a=" + a + ", b=" + b + " → max=" + max);

        // Минимум
        int min = (a < b) ? a : b;
        System.out.println("min=" + min);

        // Абсолютное значение
        int x = -42;
        int absX = (x >= 0) ? x : -x;
        System.out.println("abs(" + x + ") = " + absX);
    }

    // ===================== Тернарный в методе =====================

    /**
     * Возврат из тернарного оператора напрямую.
     */
    public static void demonstrateReturnValue() {
        System.out.println("\\n=== Возврат из метода ===");

        int temperature = 35;
        String advice = getAdvice(temperature);
        System.out.println("При " + temperature + "°C: " + advice);

        temperature = -5;
        advice = getAdvice(temperature);
        System.out.println("При " + temperature + "°C: " + advice);

        temperature = 20;
        advice = getAdvice(temperature);
        System.out.println("При " + temperature + "°C: " + advice);
    }

    private static String getAdvice(int temperature) {
        // Возвращаем строку напрямую из тернарного
        return (temperature > 30) ? "Пейте воду и не перегревайтесь!"
                 : (temperature < 0)  ? "Наденьте тёплую одежду!"
                 : "Отличная погода для прогулки!";
    }

    // ===================== Тернарный с вычислениями =====================

    /**
     * Тернарный оператор может участвовать в выражениях.
     */
    public static void demonstrateWithCalculations() {
        System.out.println("\\n=== Тернарный с вычислениями ===");

        int hours = 40;
        // Оклад + премия (если worked > 40)
        int baseSalary = 1000;
        int bonus = (hours > 40) ? (hours - 40) * 50 : 0;
        int total = baseSalary + bonus;

        System.out.println("Часов: " + hours + ", премия: " + bonus + ", итого: " + total);

        hours = 35;
        bonus = (hours > 40) ? (hours - 40) * 50 : 0;
        total = baseSalary + bonus;
        System.out.println("Часов: " + hours + ", премия: " + bonus + ", итого: " + total);
    }

    // ===================== Тернарный vs switch =====================

    /**
     * Когда использовать тернарный, а когда switch?
     * Тернарный: 2 варианта
     * Switch: 3+ варианта (или с break, yield)
     */
    public static void demonstrateWhenToUse() {
        System.out.println("\\n=== Когда тернарный, когда switch? ===");

        // Тернарный — два варианта (хорошо!)
        String weekend = (java.time.DayOfWeek.from(java.time.LocalDate.now()) == java.time.DayOfWeek.SATURDAY
                       || java.time.DayOfWeek.from(java.time.LocalDate.now()) == java.time.DayOfWeek.SUNDAY)
                         ? "Выходной" : "Рабочий день";
        System.out.println("Сегодня: " + weekend);

        // Switch — 3+ варианта (лучше чем вложенный тернарный!)
        int dayOfWeek = java.time.LocalDate.now().getDayOfWeek().getValue();
        String dayType;

        switch (dayOfWeek) {
            case 1 -> dayType = "Понедельник (трудный)";
            case 2, 3, 4 -> dayType = "Середина недели";
            case 5 -> dayType = "Пятница (почти выходные!)";
            case 6, 7 -> dayType = "Выходной";
            default -> dayType = "Неделя из " + dayOfWeek + " дней";
        }
        System.out.println("Тип дня: " + dayType);
    }

    // ===================== Тернарный с null =====================

    /**
     * Тернарный оператор с null — полезен для дефолтных значений.
     */
    public static void demonstrateWithNull() {
        System.out.println("\\n=== Тернарный с null ===");

        String userName = null;
        String displayName = (userName != null) ? userName : "Гость";
        System.out.println("Отображаемое имя: " + displayName);

        userName = "Алексей";
        displayName = (userName != null) ? userName : "Гость";
        System.out.println("Отображаемое имя: " + displayName);
    }

    // ===================== Тернарный vs метод =====================

    /**
     * Если тернарный становится сложным — вынесите в метод.
     */
    public static void demonstrateExtractMethod() {
        System.out.println("\\n=== Извлечение метода ===");

        int score = 75;
        String result = describeScore(score);
        System.out.println("Баллы " + score + ": " + result);

        score = 92;
        result = describeScore(score);
        System.out.println("Баллы " + score + ": " + result);

        score = 40;
        result = describeScore(score);
        System.out.println("Баллы " + score + ": " + result);
    }

    private static String describeScore(int score) {
        // Pattern matching для switch не работает с примитивами (int), поэтому — обычные проверки
        if (score >= 90) return "Превосходно! 🏆";
        if (score >= 70) return "Хорошо! 👍";
        if (score >= 50) return "Можно лучше 📚";
        return "Нужно подучить 😔";
    }

    // ===================== Тернарный в цикле =====================

    /**
     * Тернарный оператор внутри циклов — частый паттерн.
     */
    public static void demonstrateInLoop() {
        System.out.println("\\n=== Тернарный в цикле ===");

        // Отметка чётности для чисел 1-10
        for (int i = 1; i <= 10; i++) {
            String evenOdd = (i % 2 == 0) ? "чётное" : "нечётное";
            System.out.print(i + " — " + evenOdd + "  ");
        }
        System.out.println();

        // Таблица умножения через тернарный
        System.out.println("\\nТаблица умножения (7):");
        for (int i = 1; i <= 10; i++) {
            System.out.println("  7 × " + i + " = " + (7 * i));
        }
    }

    // ===================== Практические примеры =====================

    /**
     * Практический пример: определение сезона по месяцу.
     */
    public static void demonstrateSeason() {
        System.out.println("\\n=== Определение сезона ===");

        int month = 7; // Июль
        String season = switch (month) {
            case 12, 1, 2 -> "❄️ Зима";
            case 3, 4, 5 -> "🌸 Весна";
            case 6, 7, 8 -> "☀️ Лето";
            case 9, 10, 11 -> "🍂 Осень";
            default -> "❓ Неизвестный месяц";
        };
        System.out.println(month + "-й месяц: " + season);
    }

    /**
     * Практический пример: расчёт скидки.
     */
    public static void demonstrateDiscount() {
        System.out.println("\\n=== Расчёт скидки ===");

        int cartTotal = 15000;
        // Скидка 10% если > 10000, 5% если > 5000, иначе 0
        int discount = (cartTotal > 10000) ? cartTotal * 10 / 100
                     : (cartTotal > 5000)  ? cartTotal * 5 / 100
                     : 0;
        int finalPrice = cartTotal - discount;

        System.out.println("Корзина: " + cartTotal);
        System.out.println("Скидка: " + discount);
        System.out.println("Итого: " + finalPrice);
    }

    public static void main(String[] args) {
        System.out.println("=== Тернарный оператор ===");
        demonstrateBasic();
        demonstrateNestedTernary();
        demonstrateAssignment();
        demonstrateReturnValue();
        demonstrateWithCalculations();
        demonstrateWhenToUse();
        demonstrateWithNull();
        demonstrateExtractMethod();
        demonstrateInLoop();
        demonstrateSeason();
        demonstrateDiscount();
    }
}`;

    SNIPPETS['_1.methods.ScannerInput'] = `package org.baileyseyes._1.methods;

import java.util.Scanner;

/**
 * Scanner — чтение ввода с клавиатуры.
 * Основной класс для работы с пользовательским вводом в Java.
 * 
 * Методы: next(), nextInt(), nextDouble(), nextLine(), nextBoolean(), hasNext()
 * 
 * @see org.baileyseyes._1.methods.Methods Предыдущая часть
 * @see org.baileyseyes._1.types.TernaryOperator Следующая часть
 */
@SuppressWarnings("all")
public class ScannerInput {

    // Создаём один Scanner — не создаём новый для каждого чтения!
    private static final Scanner scanner = new Scanner(System.in);

    /**
     * Базовое чтение: nextInt() — целое число.
     */
    public static void demonstrateReadInt() {
        System.out.println("=== Чтение целого числа ===");
        System.out.print("Введите возраст: ");
        
        if (scanner.hasNextInt()) {
            int age = scanner.nextInt();
            System.out.println("Ваш возраст: " + age);
            System.out.println("Через 10 лет вам будет: " + (age + 10));
        } else {
            System.out.println("Это не число!");
            scanner.next(); // сбросим некорректный ввод
        }
    }

    /**
     * Чтение: nextDouble() — дробное число.
     */
    public static void demonstrateReadDouble() {
        System.out.println("\\n=== Число с плавающей точкой ===");
        System.out.print("Введите зарплату (например, 75000.50): ");
        
        if (scanner.hasNextDouble()) {
            double salary = scanner.nextDouble();
            double tax = salary * 0.13; // НДФЛ 13%
            double netSalary = salary - tax;
            System.out.println("Зарплата: " + salary);
            System.out.println("Налог (13%): " + tax);
            System.out.println("На руки: " + netSalary);
        } else {
            System.out.println("Это не число!");
            scanner.next();
        }
    }

    /**
     * Чтение: next() — одно слово (до пробела).
     */
    public static void demonstrateReadWord() {
        System.out.println("\\n=== Одно слово ===");
        System.out.print("Введите ваше имя: ");
        
        if (scanner.hasNext()) {
            String name = scanner.next();
            System.out.println("Привет, " + name + "!");
        }
    }

    /**
     * Чтение: nextLine() — полная строка (всё до Enter).
     */
    public static void demonstrateReadLine() {
        System.out.println("\\n=== Полная строка ===");
        System.out.print("Введите полный адрес: ");
        
        String address = scanner.nextLine();
        System.out.println("Адрес: " + address);
        System.out.println("Длина адреса: " + address.length() + " символов");
    }

    /**
     * Чтение: nextBoolean() — логическое значение.
     */
    public static void demonstrateReadBoolean() {
        System.out.println("\\n=== Логическое значение ===");
        System.out.print("Вы согласны с условиями? (true/false): ");
        
        if (scanner.hasNextBoolean()) {
            boolean agreed = scanner.nextBoolean();
            System.out.println("Согласие: " + agreed);
            System.out.println(agreed ? "Добро пожаловать!" : "Доступ запрещён.");
        } else {
            System.out.println("Введите true или false!");
            scanner.next();
        }
    }

    /**
     * Чтение в цикле — пока пользователь не введёт "stop".
     */
    public static void demonstrateLoopWithStop() {
        System.out.println("\\n=== Цикл до stop ===");
        System.out.println("Вводите слова (напишите 'stop' для выхода):");
        
        int wordCount = 0;
        while (true) {
            String word = scanner.next();
            if (word.equalsIgnoreCase("stop")) { // ignoreCase — не регистрозависимо
                System.out.println("Выход по команде 'stop'");
                break;
            }
            wordCount++;
            System.out.println("Получено: " + word + " (слов: " + wordCount + ")");
        }
    }

    /**
     * Чтение чисел в цикле до отрицательного.
     */
    public static void demonstrateLoopUntilNegative() {
        System.out.println("\\n=== Числа до отрицательного ===");
        System.out.println("Вводите числа (отрицательное = конец):");
        
        int sum = 0;
        int count = 0;
        int max = Integer.MIN_VALUE;
        
        while (true) {
            System.out.print("  Число: ");
            if (scanner.hasNextInt()) {
                int number = scanner.nextInt();
                if (number < 0) {
                    System.out.println("Отрицательное число — выход!");
                    break;
                }
                sum += number;
                count++;
                if (number > max) max = number;
                System.out.println("  Сумма: " + sum + ", Среднее: " + (double) sum / count);
            } else {
                System.out.println("  Не число — пропущено!");
                scanner.next(); // сброс
            }
        }
        
        if (count > 0) {
            System.out.println("Итого: count=" + count + ", sum=" + sum + ", max=" + max + ", avg=" + ((double) sum / count));
        }
    }

    /**
     * Чтение строк в цикле — accumulate все строки.
     */
    public static void demonstrateReadLines() {
        System.out.println("\\n=== Чтение строк ===");
        System.out.println("Вводите строки (пустая строка = конец):");
        
        StringBuilder allText = new StringBuilder();
        int lineCount = 0;
        
        while (true) {
            String line = scanner.nextLine();
            if (line.isEmpty()) {
                System.out.println("Пустая строка — выход!");
                break;
            }
            allText.append(line).append("\\n");
            lineCount++;
            System.out.println("  Строка " + lineCount + ": " + line);
        }
        
        System.out.println("Всего строк: " + lineCount);
        System.out.println("Общий текст: " + allText.length() + " символов");
    }

    /**
     * hasNext() — проверка перед чтением.
     */
    public static void demonstrateHasNext() {
        System.out.println("\\n=== Проверка ввода (hasNext) ===");
        
        System.out.print("Введите 3 слова: ");
        for (int i = 1; i <= 3; i++) {
            if (scanner.hasNext()) {
                String word = scanner.next();
                System.out.println("  Слово " + i + ": " + word);
            } else {
                System.out.println("  Ввод закончился раньше!");
                break;
            }
        }
    }

    /**
     * Комбинирование nextInt() и nextLine().
     * ВАЖНО: nextInt() НЕ съедает перевод строки! nextLine() вернёт пустую строку!
     * Решение: после nextInt() вызвать scanner.nextLine() чтобы «съесть» оставшийся \\n.
     */
    public static void demonstrateMixedRead() {
        System.out.println("\\n=== Смешанное чтение (осторожно!) ===");
        
        System.out.print("Введите возраст: ");
        int age = scanner.nextInt();
        scanner.nextLine(); // ← СЪЕДАЕМ оставшийся перевод строки!
        
        System.out.print("Введите имя: ");
        String name = scanner.nextLine();
        
        System.out.println("Имя: " + name + ", Возраст: " + age);
    }

    /**
     * Реальный пример: простое меню для пользователя.
     */
    public static void demonstrateMenu() {
        System.out.println("\\n=== Простое меню ===");
        System.out.println("1. Приветствие");
        System.out.println("2. Калькулятор (X + Y)");
        System.out.println("3. Таблица умножения");
        System.out.println("0. Выход");
        System.out.print("Выберите: ");
        
        if (scanner.hasNextInt()) {
            int choice = scanner.nextInt();
            
            switch (choice) {
                case 1 -> greetUser();
                case 2 -> simpleCalculator();
                case 3 -> multiplicationTable();
                case 0 -> System.out.println("До свидания!");
                default -> System.out.println("Неизвестный выбор!");
            }
        }
    }

    private static void greetUser() {
        scanner.nextLine(); // сброс
        System.out.print("Как вас зовут? ");
        String name = scanner.nextLine();
        System.out.println("Привет, " + name + "!");
    }

    private static void simpleCalculator() {
        scanner.nextLine(); // сброс
        System.out.print("Введите X: ");
        int x = scanner.nextInt();
        System.out.print("Введите Y: ");
        int y = scanner.nextInt();
        System.out.println("X + Y = " + (x + y));
    }

    private static void multiplicationTable() {
        scanner.nextLine(); // сброс
        System.out.print("Число для таблицы: ");
        int n = scanner.nextInt();
        for (int i = 1; i <= 10; i++) {
            System.out.println("  " + n + " × " + i + " = " + (n * i));
        }
    }

    /**
     * Безопасное чтение целого числа с повторным запросом.
     */
    public static int readIntSafely(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextInt()) {
            System.out.println("  Это не число! Повторите:");
            scanner.next(); // сброс некорректного ввода
            System.out.print(prompt);
        }
        int value = scanner.nextInt();
        scanner.nextLine(); // сброс перевода строки
        return value;
    }

    /**
     * Безопасное чтение строки с повторным запросом.
     */
    public static String readLineSafely(String prompt) {
        System.out.print(prompt);
        String line = scanner.nextLine();
        while (line.isEmpty()) {
            System.out.println("  Пустая строка! Повторите:");
            line = scanner.nextLine();
        }
        return line;
    }

    public static void main(String[] args) {
        System.out.println("=== Scanner — чтение ввода ===");
        System.out.println("Вводите данные по мере появления запросов!");
        demonstrateReadInt();
        demonstrateReadDouble();
        demonstrateReadWord();
        demonstrateReadLine();
        demonstrateReadBoolean();
        demonstrateLoopWithStop();
        demonstrateLoopUntilNegative();
        demonstrateReadLines();
        demonstrateHasNext();
        demonstrateMixedRead();
        demonstrateMenu();
    }
}`;

    SNIPPETS['_2.classes_objects.Inheritance'] = `package org.baileyseyes._2.classes_objects;

/**
 * Демонстрирует наследование в Java.
 * Ключевые понятия: extends, super, переопределение методов (@Override),
 * цепочка инициализации (родитель → потомок).
 *
 * @see org.baileyseyes._2.classes_objects.entity.Human Предыдущая часть
 */
public class Inheritance {

    /**
     * Базовый класс — «транспорт».
     */
    static class Vehicle {
        protected String brand;
        protected int year;

        public Vehicle(String brand, int year) {
            this.brand = brand;
            this.year = year;
            System.out.println("Vehicle создан: " + brand + " (" + year + ")");
        }

        public void startEngine() {
            System.out.println(brand + ": двигатель запущен");
        }

        public void stopEngine() {
            System.out.println(brand + ": двигатель остановлен");
        }

        public String getInfo() {
            return brand + " " + year;
        }
    }

    /**
     * Наследуемся от Vehicle.
     * Автомобиль получает все методы и поля Vehicle,
     * плюс добавляет свои собственные.
     */
    static class Car extends Vehicle {
        private int doors;

        public Car(String brand, int year, int doors) {
            // super() — вызов конструктора родителя. ОБЯЗАТЕЛЕН первой строкой!
            super(brand, year);
            this.doors = doors;
            System.out.println("Car создан: " + doors + " дверей");
        }

        /**
         * Переопределение (override) метода родителя.
         * @Override — подсказка компилятору: если родительский метод изменится,
         * мы получим ошибку, а не баг в продакшене.
         */
        @Override
        public void startEngine() {
            System.out.println(brand + " (" + doors + " дверей): двигатель запущен с турбо-звучком!");
        }

        /**
         * Доступ к методу родителя через super.
         */
        public void startEngineAndDoors() {
            startEngine();          // сначала свой
            System.out.println(brand + ": все " + doors + " дверей закрыты");
        }

        public int getDoors() {
            return doors;
        }
    }

    /**
     * Ещё один потомок Vehicle — мотоцикл.
     */
    static class Motorcycle extends Vehicle {
        private boolean hasSidecar;

        public Motorcycle(String brand, int year, boolean hasSidecar) {
            super(brand, year);
            this.hasSidecar = hasSidecar;
            System.out.println("Мотоцикл: " + brand + ", боковой прицеп: " + hasSidecar);
        }

        @Override
        public void startEngine() {
            System.out.println(brand + ": двигатель рвёт дорогу!");
        }

        public void wheelie() {
            if (!hasSidecar) {
                System.out.println(brand + " делает «козло» (wheelie)!");
            } else {
                System.out.println("С боковым прицепом колесо не сделать — перевесимся!");
            }
        }
    }

    /**
     * Трёхуровневая иерархия: Vehicle → Car → ElectricCar.
     * Показывает, как цепочка super работает на каждом уровне.
     */
    static class ElectricCar extends Car {
        private int batteryKwh;

        public ElectricCar(String brand, int year, int doors, int batteryKwh) {
            super(brand, year, doors);
            this.batteryKwh = batteryKwh;
            System.out.println("ElectricCar: батарея " + batteryKwh + " кВт·ч");
        }

        @Override
        public void startEngine() {
            // Вызываем родительский Car.startEngine(), потом добавляем своё
            super.startEngine();
            System.out.println(brand + ": электрический мотор молчит");
        }

        public void showBattery() {
            System.out.println(brand + ": заряд батареи " + batteryKwh + " кВт·ч");
        }
    }

    public static void demonstrateBasicInheritance() {
        System.out.println("=== Базовое наследование ===");
        Car car = new Car("Toyota", 2023, 5);
        car.startEngine();
        System.out.println("Информация: " + car.getInfo()); // унаследовано от Vehicle
        System.out.println("Двери: " + car.getDoors());
    }

    public static void demonstratePolymorphism() {
        System.out.println("\\n=== Полиморфизм ===");

        // Переменная типа Vehicle хранит разные типы объектов
        Vehicle vehicle1 = new Car("Toyota", 2023, 5);
        Vehicle vehicle2 = new Motorcycle("Harley-Davidson", 2022, false);

        // Вызов startEngine() — разные реализации для разных классов!
        vehicle1.startEngine();
        vehicle2.startEngine();

        // Vehicle не знает о методе wheelie(), а Car знает — нужен приведение типа
        if (vehicle1 instanceof Car) {
            Car car = (Car) vehicle1;
            System.out.println("Это машина, дверей: " + car.getDoors());
        }

        if (vehicle2 instanceof Motorcycle) {
            Motorcycle moto = (Motorcycle) vehicle2;
            moto.wheelie();
        }
    }

    public static void demonstrateMultiLevelInheritance() {
        System.out.println("\\n=== Многоуровневое наследование ===");
        ElectricCar ev = new ElectricCar("Tesla", 2024, 4, 100);
        ev.startEngine();       // Tesla (4 дверей): двигатель рвёт... → электрический молчит
        ev.showBattery();       // Tesla: батарея 100 кВт·ч
        ev.stopEngine();        // унаследовано от Vehicle
    }

    /**
     * Ключевое слово final:
     * — final класс нельзя наследовать.
     * — final поле нельзя изменить после инициализации.
     * — final метод нельзя переопределить.
     */
    public static void demonstrateFinal() {
        System.out.println("\\n=== Ключевое слово final ===");

        // Финальное поле — не может быть изменено
        final String APP_NAME = "MyApp";
        System.out.println("Приложение: " + APP_NAME);
        // APP_NAME = "Changed" → ОШИБКА: нельзя переназначить final

        // Финальный метод — нельзя переопределить
        Vehicle fastCar = new Car("Ferrari", 2024, 2);
        fastCar.startEngine(); // Ferrari (2 дверей): двигатель рвёт дорогу!
    }

    public static void main(String[] args) {
        System.out.println("=== Наследование и полиморфизм ===");
        demonstrateBasicInheritance();
        demonstratePolymorphism();
        demonstrateMultiLevelInheritance();
        demonstrateFinal();
    }
}`;

    SNIPPETS['_2.classes_objects.AbstractClasses'] = `package org.baileyseyes._2.classes_objects;

/**
 * Абстрактные классы и полиморфизм.
 * Абстрактный класс НЕЛЬЗЯ создать через new — он для шаблона.
 * Абстрактный метод обязателен для реализации в потомке.
 *
 * @see org.baileyseyes._3.enum_class.DaysOfTheWeek Предыдущая часть
 * @see org.baileyseyes._3.interface_class.SayNo Следующая часть
 */
@SuppressWarnings("all")
public class AbstractClasses {

    /**
     * Абстрактный класс — «фигура».
     * Не существует абстрактной «Фигуры» — только конкретные (круг, прямоугольник).
     */
    abstract static class Shape {
        private String color;

        public Shape(String color) {
            this.color = color;
        }

        /**
         * Абстрактный метод — нет тела. Каждый потомок ОБЯЗАН его реализовать.
         * Абстрактные методы — это «контракт»: «Я считаю площадь, но как — решай ты».
         */
        public abstract double calculateArea();

        public abstract double calculatePerimeter();

        /**
         * Обычный метод в абстрактном классе — есть тело, потомки его унаследуют.
         */
        public String describe() {
            return "Фигура цвета " + color + ", площадь = " + String.format("%.2f", calculateArea());
        }

        public String getColor() {
            return color;
        }
    }

    /**
     * Круг — конкретный потомок Shape.
     */
    static class Circle extends Shape {
        private double radius;

        public Circle(String color, double radius) {
            super(color);
            this.radius = radius;
        }

        @Override
        public double calculateArea() {
            // Формула: π * r²
            return Math.PI * radius * radius;
        }

        @Override
        public double calculatePerimeter() {
            // Длина окружности: 2 * π * r
            return 2 * Math.PI * radius;
        }

        public double getRadius() {
            return radius;
        }
    }

    /**
     * Прямоугольник — другой потомк Shape.
     * Реализует те же абстрактные методы, но по-своему.
     */
    static class Rectangle extends Shape {
        private double width;
        private double height;

        public Rectangle(String color, double width, double height) {
            super(color);
            this.width = width;
            this.height = height;
        }

        @Override
        public double calculateArea() {
            return width * height;
        }

        @Override
        public double calculatePerimeter() {
            return 2 * (width + height);
        }
    }

    /**
     * Треугольник — ещё один потомок.
     */
    static class Triangle extends Shape {
        private double a, b, c;

        public Triangle(String color, double a, double b, double c) {
            super(color);
            this.a = a;
            this.b = b;
            this.c = c;
        }

        @Override
        public double calculateArea() {
            // Формула Герона
            double s = (a + b + c) / 2.0;
            return Math.sqrt(s * (s - a) * (s - b) * (s - c));
        }

        @Override
        public double calculatePerimeter() {
            return a + b + c;
        }
    }

    /**
     * Полиморфизм с абстрактными классами:
     * Метод принимает Shape, работает с любой фигурой.
     */
    public static void demonstrateAbstractPolymorphism() {
        System.out.println("=== Полиморфизм абстрактных классов ===");

        // Храним разные фигуры в одном списке абстрактного типа Shape
        Shape[] shapes = new Shape[4];
        shapes[0] = new Circle("Красный", 5.0);
        shapes[1] = new Rectangle("Зелёный", 10.0, 5.0);
        shapes[2] = new Rectangle("Синий", 3.0, 7.0);
        shapes[3] = new Triangle("Жёлтый", 3.0, 4.0, 5.0); // прямоугольный 3-4-5

        // Вызываем методы — каждая фигура считает по-своему!
        for (Shape shape : shapes) {
            System.out.println("\\n" + shape.describe());
            System.out.println("Периметр: " + String.format("%.2f", shape.calculatePerimeter()));
        }
    }

    /**
     * Невозможно создать экземпляр абстрактного класса напрямую:
     * new Shape("Красный") → ошибка компиляции.
     */
    public static void demonstrateCannotInstantiateAbstract() {
        System.out.println("\\n=== Абстрактный класс нельзя создать напрямую ===");
        System.out.println("Shape shape = new Shape(...) — ОШИБКА КОМПИЛЯЦИИ!");
        System.out.println("Нужно: new Circle(...) или new Rectangle(...)");
    }

    /**
     * Абстрактный класс МОЖЕТ иметь и абстрактные, и обычные методы.
     * Интерфейс (до Java 8) — только абстрактные.
     */
    abstract static class Calculator {
        // Абстрактный метод
        public abstract double calculate(double a, double b);

        // Обычный метод — уже готовый
        public void printResult(double a, double b) {
            double result = calculate(a, b);
            System.out.println("Результат: " + result);
        }
    }

    static class Adder extends Calculator {
        @Override
        public double calculate(double a, double b) {
            return a + b;
        }
    }

    static class Multiplier extends Calculator {
        @Override
        public double calculate(double a, double b) {
            return a * b;
        }
    }

    public static void demonstrateAbstractMethods() {
        System.out.println("\\n=== Абстрактные методы ===");
        Calculator adder = new Adder();
        Calculator multiplier = new Multiplier();

        adder.printResult(3, 5);        // через обычный метод родителя → вызовет adder.calculate
        multiplier.printResult(4, 7);   // через обычный метод родителя → вызовет multiplier.calculate
    }

    public static void main(String[] args) {
        System.out.println("=== Абстрактные классы ===");
        demonstrateAbstractPolymorphism();
        demonstrateCannotInstantiateAbstract();
        demonstrateAbstractMethods();
    }
}`;

    SNIPPETS['_2.classes_objects.BuilderAndLombok'] = `package org.baileyseyes._2.classes_objects;

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
        System.out.println("\\n=== Lombok: всё то же самое в 8 строк ===");

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
        System.out.println("\\n=== Builder для Order ===");

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
            System.out.println("\\nОшибка: " + e.getMessage());
        }
    }

    public static void demonstrateLombokStyle() {
        System.out.println("\\n=== Lombok-стиль (вручную) ===");

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
}`;

    SNIPPETS['_3.AccessModifiersDemo'] = `package org.baileyseyes._3;

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
}`;

    SNIPPETS['_3.ReflectionDemo'] = `package org.baileyseyes._3;

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
        System.out.println("\\n=== Поля класса ===");

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
        System.out.println("\\n=== Методы класса ===");

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
        System.out.println("\\n=== Вызов метода через reflection ===");

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
        System.out.println("\\n=== Доступ к private полю ===");

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
        System.out.println("\\n=== Создание объекта через конструктор ===");

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
        System.out.println("\\n=== Полная инспекция класса ===");

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
        System.out.println("\\n=== Динамическое создание объекта ===");

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
        System.out.println("\\n=== Вызов метода по имени ===");

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
        System.out.println("\\n=== Стертые дженерики ===");

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
}`;

    SNIPPETS['_3.interface_class.SayNothing'] = `package org.baileyseyes._3.interface_class;

public interface SayNothing {

    void sayNothing();
}`;

    SNIPPETS['_3.interface_class.SayYes'] = `package org.baileyseyes._3.interface_class;

public interface SayYes {

    void sayYes();
}`;

    SNIPPETS['_3.interface_class.impl.SayYesImpl'] = `package org.baileyseyes._3.interface_class.impl;

import org.baileyseyes._3.interface_class.SayYes;

public class SayYesImpl implements SayYes {

    @Override
    public void sayYes() {
        System.out.println("Yes.");
    }
}`;

    SNIPPETS['_3.interface_class.impl.SayNothingImpl'] = `package org.baileyseyes._3.interface_class.impl;

import org.baileyseyes._3.interface_class.SayNothing;

public class SayNothingImpl implements SayNothing {

    @Override
    public void sayNothing() {
        System.out.println("nothing v1");
    }
}`;

    SNIPPETS['_3.interface_class.impl.SayNothingMoreImpl'] = `package org.baileyseyes._3.interface_class.impl;

import org.baileyseyes._3.interface_class.SayNothing;

public class SayNothingMoreImpl implements SayNothing {

    @Override
    public void sayNothing() {
        System.out.println("nothing v2");
    }
}`;

    SNIPPETS['_3.interface_class.impl.SayNothingNeverMoreImpl'] = `package org.baileyseyes._3.interface_class.impl;

import org.baileyseyes._3.interface_class.SayNothing;

public class SayNothingNeverMoreImpl implements SayNothing {

    @Override
    public void sayNothing() {
        System.out.println("nothing v3");
    }
}`;

    SNIPPETS['_3.interface_class.impl.SayEverything'] = `package org.baileyseyes._3.interface_class.impl;

import org.baileyseyes._3.interface_class.SayNo;
import org.baileyseyes._3.interface_class.SayYes;

/**
 * Можно имплементировать сразу два интерфейса
 */
public class SayEverything implements SayNo, SayYes {

    @Override
    public void sayNo() {
        System.out.println("NO");
    }

    @Override
    public void sayYes() {
        System.out.println("YES");
    }
}`;

    SNIPPETS['_3.annotation.UselessButNeedToKnow'] = `package org.baileyseyes._3.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Всё что помечено этой аннотацией - на практике бесполезно, но про это могут спрашивать на собесе
 * <br>
 * Иными словами это просто надо знать или хотя бы помнить что такое есть и иметь об этом малейшее представление
 */
@Target({
    ElementType.TYPE,
    ElementType.FIELD,
    ElementType.METHOD,
    ElementType.PARAMETER,
    ElementType.CONSTRUCTOR,
    ElementType.LOCAL_VARIABLE,
    ElementType.ANNOTATION_TYPE,
    ElementType.PACKAGE,
    ElementType.TYPE_PARAMETER,
    ElementType.TYPE_USE
})
@Retention(RetentionPolicy.SOURCE)
public @interface UselessButNeedToKnow {

}`;

    SNIPPETS['_4.exception.AdditionalExceptions'] = `package org.baileyseyes._4.exception;

/**
 * Дополнительно к try-catch-finally:
 * — checked vs unchecked исключения
 * — suppressed exceptions
 * — многократное бросание (rethrow)
 * — Exception vs Error
 *
 * @see org.baileyseyes._4.try_catch_finally.TryWithResources Предыдущая часть
 */
public class AdditionalExceptions {

    // ===================== Checked vs Unchecked =====================

    /**
     * Checked-исключение — компилятор ТРЕБУЕТ обработки.
     * IOException, SQLException, ClassNotFoundException — checked.
     * Почему? Потому что проблема внешняя — файл, база данных — мы не контролируем.
     */
    public static void demonstrateCheckedException() {
        System.out.println("=== Checked-исключение ===");

        // Компилятор ЗАСТАВИТ нас обработить FileNotFoundException
        try {
            throw new java.io.FileNotFoundException("file.txt");
        } catch (java.io.FileNotFoundException e) {
            System.out.println("Файл не найден: " + e.getMessage());
        }
        // Без try-catch или throws — ошибка компиляции!
    }

    /**
     * Unchecked-исключение (RuntimeException) — компилятор НЕ требует обработки.
     * NullPointerException, ArithmeticException, IllegalArgumentException — unchecked.
     * Почему? Потому что это баг кода — мы МОЖЕМ и ДОЛЖНЫ это предотвратить.
     */
    public static void demonstrateUncheckedException() {
        System.out.println("\\n=== Unchecked-исключение ===");

        try {
            String text = null;
            System.out.println(text.length()); // NullPointerException!
        } catch (NullPointerException e) {
            System.out.println("Ой, null! Это баг — надо проверить перед использованием: " + e.getMessage());
        }
    }

    // ===================== Exception Hierarchy =====================

    /**
     * Иерархия: Throwable → Exception / Error
     * — Exception: проблемы, которые можно и нужно обработить
     * — Error: катастрофы (OutOfMemoryError, StackOverflowError) — обычно не ловятся
     */
    public static void demonstrateExceptionHierarchy() {
        System.out.println("\\n=== Иерархия исключений ===");

        // Показываем иерархию для разных исключений
        printHierarchy(new NullPointerException());
        printHierarchy(new ArithmeticException());
        printHierarchy(new java.io.IOException());
    }

    private static void printHierarchy(Throwable t) {
        System.out.print(t.getClass().getSimpleName() + ": ");
        Throwable current = t;
        while (current.getCause() != null) {
            current = current.getCause();
        }
        System.out.println("корень: " + t.getClass().getName());

        // Показываем весь стек наследования
        System.out.print("  Иерархия: ");
        Throwable parent = t;
        while (parent != null) {
            System.out.print(parent.getClass().getSimpleName());
            parent = parent.getCause();
            if (parent != null) System.out.print(" → ");
        }
        System.out.println();
        System.out.println("  Checked? " + !((t instanceof RuntimeException) || (t instanceof Error)));
    }

    // ===================== Suppressed Exceptions =====================

    /**
     * Suppressed exceptions:
     * Когда в try-with-resources возникает исключение при закрытии,
     * оно «приглашается» к основному исключению через addSuppressed().
     * В Java 7+ это позволяет увидеть ВСЕ проблемы, а не только первую.
     */
    public static void demonstrateSuppressedExceptions() {
        System.out.println("\\n=== Suppressed исключения ===");

        try {
            doSomethingThatThrows();
        } catch (Exception e) {
            System.out.println("Главная ошибка: " + e.getMessage());
            System.out.println("Дополнительные suppressed исключения:");
            for (Throwable suppressed : e.getSuppressed()) {
                System.out.println("  Suppressed: " + suppressed.getClass().getSimpleName() + " — " + suppressed.getMessage());
            }
        }
    }

    private static void doSomethingThatThrows() throws Exception {
        Exception main = new Exception("Ошибка при чтении файла");

        try {
            throw main;
        } catch (Exception e) {
            // Имитируем: при закрытии ресурса тоже произошла ошибка
            Exception resourceError = new Exception("Ошибка при закрытии ресурса");
            e.addSuppressed(resourceError); // suppressed exception
            throw e;
        }
    }

    // ===================== Rethrow (повторное бросание) =====================

    /**
     * Ретраскивание (rethrow) исключения:
     * Ловим, обрабатываем логирование, бросаем дальше — выше по стеку.
     * Это «я не могу это починить, но я знаю, что случилось».
     */
    public static void demonstrateRethrow() {
        System.out.println("\\n=== Rethrow (повторное бросание) ===");

        try {
            processOrder(0);
        } catch (IllegalArgumentException e) {
            System.out.println("Главный метод получил: " + e.getMessage());
        }
    }

    private static void processOrder(int quantity) throws IllegalArgumentException {
        try {
            calculatePrice(quantity);
        } catch (IllegalArgumentException e) {
            System.out.println("Служба заказов: логгирую ошибку — " + e.getMessage());
            throw e; // ретраскиваем дальше
        }
    }

    private static double calculatePrice(int quantity) throws IllegalArgumentException {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Количество должно быть > 0, а было: " + quantity);
        }
        return quantity * 100.0;
    }

    // ===================== Error vs Exception =====================

    /**
     * Error — это НЕ исключение, это катастрофа.
     * OutOfMemoryError, StackOverflowError, NoClassDefFoundError.
     * Их НЕЛЬЗЯ и НЕ НУЖНО ловить — они значат «система сломалась».
     */
    public static void demonstrateErrorVsException() {
        System.out.println("\\n=== Error vs Exception ===");

        System.out.println("Error: система сломалась, ловить бесполезно");
        System.out.println("Exception: проблема внешняя, можно обработать");
        System.out.println("RuntimeException: баг в коде, надо исправить");
    }

    /**
     * Custom exception — собственный тип исключения.
     * Расширяем RuntimeException для unchecked-исключения.
     */
    static class OrderException extends RuntimeException {
        public OrderException(String message) {
            super(message);
        }

        public OrderException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    /**
     * Использование custom exception в цепочке вызовов.
     */
    public static void demonstrateCustomExceptionChain() {
        System.out.println("\\n=== Custom exception цепочка ===");

        try {
            registerUser("Алексей", -5);
        } catch (OrderException e) {
            System.out.println("Главный метод: " + e.getMessage());
            if (e.getCause() != null) {
                System.out.println("  Причина: " + e.getCause().getMessage());
            }
        }
    }

    private static void registerUser(String name, int age) throws OrderException {
        try {
            validateAge(age);
        } catch (IllegalArgumentException e) {
            // Оборачиваем исключение в наше custom-исключение
            throw new OrderException("Не удалось зарегистрировать пользователя: " + name, e);
        }
    }

    private static void validateAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Возраст: " + age);
        }
    }

    // ===================== Try-catch внутри цикла =====================

    /**
     * Частый паттерн: обработка ошибок внутри обработки данных.
     * Если один элемент не прошёл — пропускаем, но остальные обрабатываем.
     */
    public static void demonstrateCatchInsideLoop() {
        System.out.println("\\n=== Обработка ошибок в цикле ===");

        String[] inputs = {"100", "200", "abc", "400", "def", "600"};
        int processedCount = 0;
        int errorCount = 0;

        for (String input : inputs) {
            try {
                int value = Integer.parseInt(input);
                System.out.println("Обработано: " + input + " → " + (value * 2));
                processedCount++;
            } catch (NumberFormatException e) {
                System.out.println("Пропускаем некорректное значение: '" + input + "'");
                errorCount++;
            }
        }

        System.out.println("Итого: обработано " + processedCount + ", ошибок " + errorCount);
    }

    // ===================== Multi-catch с catch-перехватом =====================

    /**
     * Java 7+: multi-catch (одно catch для нескольких типов).
     * Исключение в multi-catch — final! Его нельзя изменять.
     */
    public static void demonstrateMultiCatchPatterns() {
        System.out.println("\\n=== Multi-catch паттерны ===");

        String input = "hello";

        try {
            int value = Integer.parseInt(input);
        } catch (NumberFormatException | NullPointerException e) {
            // e — implicitly final, нельзя делать e = new Exception(...)
            System.out.println("Некорректный ввод: " + e.getClass().getSimpleName());
        }
    }

    // ===================== Throwable.getStackTrace() =====================

    /**
     * Получение и разбор стека вызовов.
     * Полезно для логирования: «кто вызвал метод, приведший к ошибке».
     */
    public static void demonstrateStackTrace() {
        System.out.println("\\n=== Разбор стека вызовов ===");

        try {
            methodA();
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
            System.out.println("Стек вызовов:");
            StackTraceElement[] stack = e.getStackTrace();
            for (StackTraceElement element : stack) {
                System.out.println("  " + element.getClassName() + "." +
                                   element.getMethodName() + "(" +
                                   element.getFileName() + ":" +
                                   element.getLineNumber() + ")");
            }
        }
    }

    private static void methodA() {
        methodB();
    }

    private static void methodB() {
        methodC();
    }

    private static void methodC() {
        throw new RuntimeException("Ошибка здесь!");
    }

    public static void main(String[] args) {
        System.out.println("=== Дополнительные исключения ===");
        demonstrateCheckedException();
        demonstrateUncheckedException();
        demonstrateExceptionHierarchy();
        demonstrateSuppressedExceptions();
        demonstrateRethrow();
        demonstrateErrorVsException();
        demonstrateCustomExceptionChain();
        demonstrateCatchInsideLoop();
        demonstrateMultiCatchPatterns();
        demonstrateStackTrace();
    }
}`;

    SNIPPETS['_5.QueueAndDeque'] = `package org.baileyseyes._5;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Queue;

/**
 * Queue и Deque — очереди.
 * — Queue (очередь): FIFO (первый вошёл — первый вышел). add(), offer(), poll(), peek().
 * — Deque (двойная очередь): можно добавлять/удалять с обоих концов. Stack-подобное поведение.
 * — PriorityQueue: элементы в порядке приоритета (не FIFO!).
 *
 * @see org.baileyseyes._5.map.CollectionMap Предыдущая часть
 * @see org.baileyseyes._6.__start_from_here__.HelloMultiThreading Следующая часть
 */
@SuppressWarnings("all")
public class QueueAndDeque {

    /**
     * Queue (FIFO): первый вошёл — первый вышел.
     * 4 операции для добавления: add(), offer()
     * 4 операции для удаления: remove(), poll()
     * 4 операции для просмотра: element(), peek()
     */
    public static void demonstrateQueue() {
        System.out.println("=== Queue (FIFO) ===");
        Queue<String> queue = new LinkedList<>();

        // Добавляем в очередь
        queue.add("Первый");
        queue.add("Второй");
        queue.add("Третий");
        queue.offer("Четвёртый");

        System.out.println("Очередь: " + queue);
        System.out.println("На голове (peek): " + queue.peek()); // не удаляем

        // Удаляем — всегда первого (FIFO)
        String first = queue.poll(); // возвращает null если пустая
        System.out.println("Убран: " + first);
        System.out.println("Теперь на голове: " + queue.peek());

        // remove() vs poll(): remove() выбрасывает исключение, если пустая
        String second = queue.poll();
        System.out.println("Убран: " + second);

        // Добавляем ещё
        queue.add("Пятый");
        System.out.println("Очередь после удалений: " + queue);
    }

    /**
     * add() vs offer():
     * add() — выбрасывает IllegalStateException, если очередь заполнена (ограниченная)
     * offer() — возвращает false, если очередь заполнена
     */
    public static void demonstrateAddVsOffer() {
        System.out.println("\\n=== add() vs offer() ===");

        Queue<String> bounded = new java.util.LinkedList<>();
        // Добавляем в неограниченную очередь — add() и offer() одинаковы
        boolean added = bounded.add("X");
        System.out.println("add() вернул: " + added);

        boolean offered = bounded.offer("Y");
        System.out.println("offer() вернул: " + offered);
    }

    /**
     * Deque — двойная очередь:
     * Добавление/удаление с ВЕРХА (как стек): push(), pop()
     * Добавление/удаление СНИЗУ (как очередь): addLast(), removeFirst()
     */
    public static void demonstrateDeque() {
        System.out.println("\\n=== Deque (двойная очередь) ===");
        Deque<String> deque = new ArrayDeque<>();

        // Добавляем наверх
        deque.push("Верхний 1");
        deque.push("Верхний 2");
        deque.push("Верхний 3");

        System.out.println("После push(): " + deque);

        // Удаляем с верха — LIFO (как стек)
        String top = deque.pop();
        System.out.println("Поп (LIFO): " + top);

        // Добавляем снизу
        deque.addLast("Нижний 1");
        System.out.println("После addLast: " + deque);

        // Удаляем снизу — FIFO (как очередь)
        String bottom = deque.removeFirst();
        System.out.println("Убран снизу (FIFO): " + bottom);

        System.out.println("Итог: " + deque);
    }

    /**
     * Deque как стек (LIFO): push/pop.
     * Класс Stack устарел — Deque предпочтительнее.
     */
    public static void demonstrateDequeAsStack() {
        System.out.println("\\n=== Deque как стек (LIFO) ===");
        Deque<Integer> stack = new ArrayDeque<>();

        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.push(40);

        System.out.println("Стек: " + stack);

        while (!stack.isEmpty()) {
            System.out.println("Поп: " + stack.pop());
        }
        System.out.println("Стек пуст: " + stack.isEmpty());
    }

    /**
     * PriorityQueue — элементы идут по приоритету (не по порядку вставки).
     * При peek() или poll() всегда возвращается элемент с НАИВЫСШИМ приоритетом.
     * Для чисел: наименьшее число = наивысший приоритет.
     */
    public static void demonstratePriorityQueue() {
        System.out.println("\\n=== PriorityQueue ===");
        Queue<Integer> pq = new PriorityQueue<>();

        pq.add(50);
        pq.add(10);
        pq.add(30);
        pq.add(5);
        pq.add(100);

        System.out.println("Приоритетная очередь: " + pq);
        // Внутренняя структура не отсортирована, но:

        // Poll всегда возвращает наименьший элемент
        while (!pq.isEmpty()) {
            int value = pq.poll();
            System.out.println("  Выдан (наименьший): " + value);
        }
    }

    /**
     * PriorityQueue с компаратором (обратный порядок):
     * Наивысший приоритет у НАИБОЛЬШЕГО числа.
     */
    public static void demonstratePriorityQueueReverse() {
        System.out.println("\\n=== PriorityQueue (обратный порядок) ===");
        Queue<Integer> pq = new PriorityQueue<>(java.util.Comparator.reverseOrder());

        pq.add(50);
        pq.add(10);
        pq.add(30);
        pq.add(5);
        pq.add(100);

        System.out.println("Приоритетная очередь (по убыванию): " + pq);

        while (!pq.isEmpty()) {
            System.out.println("  Выдан (наибольший): " + pq.poll());
        }
    }

    /**
     * Практический пример: очередь задач для принтера.
     */
    public static void demonstratePrinterQueue() {
        System.out.println("\\n=== Очередь задач принтера ===");
        Queue<String> printQueue = new LinkedList<>();

        printQueue.add("document.pdf");
        printQueue.add("photo.jpg");
        printQueue.add("report.docx");
        printQueue.offer("presentation.pptx");

        System.out.println("Очередь печати: " + printQueue);

        int docCount = 0;
        while (!printQueue.isEmpty()) {
            String document = printQueue.poll();
            System.out.println("Печатаю: " + document);
            docCount++;
        }
        System.out.println("Всего напечатано: " + docCount);
    }

    /**
     * PriorityQueue для объектов: сортировка по полю.
     */
    static class Task implements Comparable<Task> {
        private final String name;
        private final int priority;

        public Task(String name, int priority) {
            this.name = name;
            this.priority = priority;
        }

        @Override
        public int compareTo(Task other) {
            // Высокий приоритет = меньшее число → раньше обрабатывается
            return Integer.compare(this.priority, other.priority);
        }

        @Override
        public String toString() {
            return "Task{name='" + name + "', priority=" + priority + "}";
        }
    }

    public static void demonstrateObjectPriorityQueue() {
        System.out.println("\\n=== PriorityQueue объектов ===");
        Queue<Task> taskQueue = new PriorityQueue<>();

        taskQueue.add(new Task("Починить сервер", 1));    // высокий приоритет
        taskQueue.add(new Task("Написать документацию", 5));
        taskQueue.add(new Task("Обновить библиотеки", 3));
        taskQueue.add(new Task("Код-ревью", 2));

        System.out.println("Очередь задач (по приоритету):");
        while (!taskQueue.isEmpty()) {
            Task task = taskQueue.poll();
            System.out.println("  Делаем: " + task);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Очереди: Queue, Deque, PriorityQueue ===");
        demonstrateQueue();
        demonstrateAddVsOffer();
        demonstrateDeque();
        demonstrateDequeAsStack();
        demonstratePriorityQueue();
        demonstratePriorityQueueReverse();
        demonstratePrinterQueue();
        demonstrateObjectPriorityQueue();
    }
}`;

    SNIPPETS['_5.CollectionsUtils'] = `package org.baileyseyes._5;

import java.util.*;

/**
 * Collections — утилиты для работы с коллекциями.
 * static методы: sort(), shuffle(), fill(), repeat(), singleton(), emptyList()
 * Collections.unmodifiableList() — защитный wrapper.
 * Collections.synchronizedList() — потокобезопасная обёртка.
 *
 * @see org.baileyseyes._5.QueueAndDeque Предыдущая часть
 * @see org.baileyseyes._6.CompletableFutureDemo Следующая часть
 */
@SuppressWarnings("all")
public class CollectionsUtils {

    /**
     * Collections.sort() — сортировка списка.
     * Метод сортирует список НА МЕСТЕ (mutates).
     */
    public static void demonstrateSort() {
        System.out.println("=== Collections.sort() ===");

        List<String> names = new ArrayList<>(Arrays.asList("Чарли", "Алиса", "Боб", "Дана"));
        System.out.println("До сортировки: " + names);

        Collections.sort(names);
        System.out.println("После sort(): " + names);

        // Обратная сортировка — Collections.reverseOrder()
        Collections.sort(names, Collections.reverseOrder());
        System.out.println("reverseOrder: " + names);
    }

    /**
     * Collections.shuffle() — перемешивание.
     * Как перетасовка колоды карт.
     */
    public static void demonstrateShuffle() {
        System.out.println("\\n=== Collections.shuffle() ===");

        List<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            numbers.add(i);
        }
        System.out.println("До: " + numbers);

        Collections.shuffle(numbers);
        System.out.println("После shuffle: " + numbers);

        Collections.shuffle(numbers);
        System.out.println("Ещё раз shuffle: " + numbers);
    }

    /**
     * Collections.fill() — заполнение списка одним значением.
     */
    public static void demonstrateFill() {
        System.out.println("\\n=== Collections.fill() ===");

        List<String> words = new ArrayList<>(Collections.nCopies(5, "Hello"));
        System.out.println("nCopies(5, 'Hello'): " + words);

        Collections.fill(words, "World");
        System.out.println("После fill('World'): " + words);
    }

    /**
     * Collections.copy() — копирование из одной коллекции в другую.
     * ВАЖНО: целевая коллекция должна быть НЕ МЕНЬШЕ исходной!
     */
    public static void demonstrateCopy() {
        System.out.println("\\n=== Collections.copy() ===");

        List<String> source = Arrays.asList("Один", "Два", "Три");
        List<String> target = new ArrayList<>(Collections.nCopies(source.size(), ""));
        System.out.println("Target до: " + target);

        Collections.copy(target, source);
        System.out.println("Target после: " + target);
    }

    /**
     * Collections.swap(), rotate(), reverse() — перестановки элементов.
     */
    public static void demonstrateSwaps() {
        System.out.println("\\n=== swap(), rotate(), reverse() ===");

        List<String> items = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
        System.out.println("Исходный: " + items);

        // swap — поменять местами два элемента
        Collections.swap(items, 0, 4);
        System.out.println("После swap(0,4): " + items);

        // rotate — сдвинуть элементы циклически
        Collections.rotate(items, 2);
        System.out.println("После rotate(2): " + items);

        // reverse — перевернуть список
        Collections.reverse(items);
        System.out.println("После reverse(): " + items);
    }

    /**
     * Collections.binarySearch() — бинарный поиск.
     * Сортировка ОБЯЗАТЕЛЬНА! Иначе результат неопределён.
     */
    public static void demonstrateBinarySearch() {
        System.out.println("\\n=== Collections.binarySearch() ===");

        List<Integer> numbers = new ArrayList<>(Arrays.asList(10, 20, 30, 40, 50, 60, 70, 80, 90));
        System.out.println("Массив: " + numbers);

        int index = Collections.binarySearch(numbers, 50);
        System.out.println("Поиск 50: индекс " + index);

        index = Collections.binarySearch(numbers, 25);
        System.out.println("Поиск 25 (нет в списке): " + index);
        // Если элемент не найден: -(insertion point) - 1
        // -(точка вставки) - 1 = -(6) - 1 = -7 → 25 встанет на позицию 6
    }

    /**
     * Collections.min(), max() — минимум и максимум.
     */
    public static void demonstrateMinMax() {
        System.out.println("\\n=== min(), max() ===");

        List<Integer> scores = Arrays.asList(85, 92, 78, 95, 60, 88);

        int min = Collections.min(scores);
        int max = Collections.max(scores);
        System.out.println("Мин: " + min + ", Макс: " + max);

        // Можно задать свой компаратор
        List<String> stringScores = scores.stream().map(Object::toString).toList();
        String longest = Collections.max(stringScores, (a, b) -> Integer.compare(a.length(), b.length()));
    }

    /**
     * Collections.frequency() — подсчёт повторений.
     */
    public static void demonstrateFrequency() {
        System.out.println("\\n=== frequency() ===");

        List<String> fruits = Arrays.asList("яблоко", "банан", "яблоко", "вишня", "банан", "яблоко");
        System.out.println("Фрукты: " + fruits);

        int count = Collections.frequency(fruits, "яблоко");
        System.out.println("яблоко встречается: " + count + " раз");

        count = Collections.frequency(fruits, "вишня");
        System.out.println("вишня встречается: " + count + " раз");
    }

    /**
     * Collections.disjoint() — нет ли общих элементов.
     */
    public static void demonstrateDisjoint() {
        System.out.println("\\n=== disjoint() ===");

        List<Integer> setA = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> setB = Arrays.asList(6, 7, 8, 9, 10);
        List<Integer> setC = Arrays.asList(3, 4, 11, 12);

        System.out.println("A и B: disjoint = " + Collections.disjoint(setA, setB)); // true
        System.out.println("A и C: disjoint = " + Collections.disjoint(setA, setC)); // false (3 и 4 общие)
    }

    /**
     * Collections.replaceAll() — замена всех вхождений.
     */
    public static void demonstrateReplaceAll() {
        System.out.println("\\n=== replaceAll() ===");

        List<String> words = new ArrayList<>(Arrays.asList("hello", "world", "hello", "java", "hello"));
        System.out.println("До: " + words);

        Collections.replaceAll(words, "hello", "hi");
        System.out.println("После replaceAll('hello', 'hi'): " + words);
    }

    /**
     * Collections.rotate() — циклический сдвиг.
     */
    public static void demonstrateRotateDetail() {
        System.out.println("\\n=== rotate() подробно ===");

        List<String> items = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
        System.out.println("Исходный: " + items);

        for (int i = 1; i <= 5; i++) {
            Collections.rotate(items, 1);
            System.out.println("После rotate(1) #" + i + ": " + items);
        }
    }

    /**
     * Collections.unmodifiableList() — защитный wrapper.
     * Если кто-то попробует модифицировать — ClassCastException.
     */
    public static void demonstrateUnmodifiable() {
        System.out.println("\\n=== unmodifiableList() ===");

        List<String> original = new ArrayList<>(Arrays.asList("A", "B", "C"));
        List<String> protectedList = Collections.unmodifiableList(original);

        System.out.println("Защищённый список: " + protectedList);

        try {
            protectedList.add("D"); // ← Исключение!
            System.out.println("Это НЕ должно произойти!");
        } catch (UnsupportedOperationException e) {
            System.out.println("Попытка модификации заблокирована: " + e.getClass().getSimpleName());
        }

        // Но можно изменить исходный!
        original.add("D");
        System.out.println("После добавления в original: " + protectedList);
    }

    /**
     * Collections.synchronizedList() — потокобезопасный wrapper.
     */
    public static void demonstrateSynchronizedList() {
        System.out.println("\\n=== synchronizedList() ===");

        List<String> syncList = Collections.synchronizedList(new ArrayList<>());

        syncList.add("Безопасный");
        syncList.add("для");
        syncList.add("многопоточности");

        System.out.println("Синхронизированный список: " + syncList);
        System.out.println("Обратите внимание: итерация всё равно требует синхронизации!");
    }

    /**
     * Collections.singletonList(), singletonMap() — одноэлементные коллекции.
     */
    public static void demonstrateSingletons() {
        System.out.println("\\n=== singletonList(), singletonMap() ===");

        List<String> oneItem = Collections.singletonList("Единственный");
        System.out.println("singletonList: " + oneItem);
        // immutable! cannot add/remove

        Map<String, String> oneEntry = Collections.singletonMap("key", "value");
        System.out.println("singletonMap: " + oneEntry);
        // immutable! cannot put/remove
    }

    /**
     * Collections.emptyList(), emptyMap(), emptySet() — пустые коллекции.
     * Это singletons — все пустые списки равны друг другу!
     */
    public static void demonstrateEmptyCollections() {
        System.out.println("\\n=== emptyList(), emptyMap() ===");

        List<String> empty = Collections.emptyList();
        System.out.println("emptyList: " + empty);
        System.out.println("Пустой: " + empty.isEmpty());

        Map<String, String> emptyMap = Collections.emptyMap();
        System.out.println("emptyMap: " + emptyMap);
        System.out.println("Размер: " + emptyMap.size());

        // Не null! А EMPTY — безопасно, без проверок!
        System.out.println("Можно итерировать без NullPointerException:");
        for (String item : empty) {
            System.out.println("  " + item);
        }
        System.out.println("  (пусто)");
    }

    /**
     * Collections.nCopies() — коллекция из N одинаковых элементов.
     */
    public static void demonstrateNCopies() {
        System.out.println("\\n=== nCopies() ===");

        List<String> copies = Collections.nCopies(5, "★");
        System.out.println("5 звёзд: " + copies);

        // Это immutable!
        try {
            copies.set(0, "✦"); // ← UnsupportedOperationException!
            System.out.println("Не должно произойти");
        } catch (UnsupportedOperationException e) {
            System.out.println("nCopies — immutable (как и ожидалось)");
        }
    }

    /**
     * Практический пример: частотный анализ слов.
     */
    public static void demonstrateFrequencyAnalysis() {
        System.out.println("\\n=== Частотный анализ слов ===");

        String text = "Java Java is great Java is fun Python is also great C++ is fast";
        List<String> words = Arrays.asList(text.split("\\\\s+"));
        System.out.println("Слова: " + words);

        Map<String, Integer> frequency = new HashMap<>();
        for (String word : words) {
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }

        System.out.println("Частоты:");
        for (Map.Entry<String, Integer> entry : frequency.entrySet()) {
            System.out.println("  " + entry.getKey() + ": " + entry.getValue() + " раз");
        }

        // Самая частая
        String mostFrequent = Collections.max(frequency.entrySet(),
                Map.Entry.comparingByValue()).getKey();
        System.out.println("Самое частое слово: " + mostFrequent);
    }

    public static void main(String[] args) {
        System.out.println("=== Collections утилиты ===");
        demonstrateSort();
        demonstrateShuffle();
        demonstrateFill();
        demonstrateCopy();
        demonstrateSwaps();
        demonstrateBinarySearch();
        demonstrateMinMax();
        demonstrateFrequency();
        demonstrateDisjoint();
        demonstrateReplaceAll();
        demonstrateRotateDetail();
        demonstrateUnmodifiable();
        demonstrateSynchronizedList();
        demonstrateSingletons();
        demonstrateEmptyCollections();
        demonstrateNCopies();
        demonstrateFrequencyAnalysis();
    }
}`;

    SNIPPETS['_6.CompletableFutureDemo'] = `package org.baileyseyes._6;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.function.Supplier;

/**
 * CompletableFuture — асинхронное программирование без адов колбэков.
 * Заменяет Callback-холодец на цепочку методов: thenApply, thenCompose, thenAccept.
 * Позволяет объединять результаты разных асинхронных задач.
 *
 * @see org.baileyseyes._6.synchronized_method.SynchronizedMethods Предыдущая часть
 */
@SuppressWarnings("all")
public class CompletableFutureDemo {

    // ===================== Базовый CompletableFuture =====================

    /**
     * Создание CompletableFuture и получение результата.
     */
    public static void demonstrateBasicCompletableFuture() {
        System.out.println("=== Базовый CompletableFuture ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            // Эта работа выполняется в другом потоке
            System.out.println("Работа выполняется в: " + Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return "Результат после секунды!";
        });

        System.out.println("Главный поток не ждёт...");

        // Ждём результат
        String result = future.join(); // блокирует до получения результата
        System.out.println("Получили: " + result);
    }

    // ===================== thenApply =====================

    /**
     * thenApply: преобразование результата.
     * Как map, но для асинхронных задач.
     */
    public static void demonstrateThenApply() {
        System.out.println("\\n=== thenApply (цепочка преобразований) ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "hello")
                .thenApply(String::toUpperCase)
                .thenApply(s -> s + " WORLD")
                .thenApply(s -> s + "!");

        System.out.println("Результат: " + future.join());
        // HELLO WORLD!
    }

    /**
     * thenApply с проверкой на null (thenApplyIfPresent — нет в Java 8).
     * Вместо этого: thenApply с if внутри.
     */
    public static void demonstrateSafeThenApply() {
        System.out.println("\\n=== Безопасное преобразование ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "test")
                .thenApply(s -> {
                    if (s == null) {
                        return "default";
                    }
                    return s.toUpperCase();
                });

        System.out.println("Результат: " + future.join());
    }

    // ===================== thenAccept =====================

    /**
     * thenAccept: обработка результата без преобразования (void).
     * Как forEach для асинхронных задач.
     */
    public static void demonstrateThenAccept() {
        System.out.println("\\n=== thenAccept (обработка без преобразования) ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "Загрузка завершена");
        // thenAccept потребляет результат и возвращает CompletableFuture<Void>
        CompletableFuture<Void> consumed = future.thenAccept(result -> {
            System.out.println("Получили: " + result);
        });

        consumed.join();
    }

    // ===================== thenRun =====================

    /**
     * thenRun: действие БЕЗ доступа к результату.
     * Просто «сделай что-то после завершения».
     */
    public static void demonstrateThenRun() {
        System.out.println("\\n=== thenRun (действие без результата) ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "данные");
        CompletableFuture<Void> thenRunFuture = future.thenRun(() -> {
            System.out.println("Теперь что-то делаем, но без данных");
        });

        future.join();
        thenRunFuture.join();
    }

    // ===================== exceptionally =====================

    /**
     * exceptionally: обработка ошибок.
     * Аналог catch для CompletableFuture.
     */
    public static void demonstrateExceptionally() {
        System.out.println("\\n=== exceptionally (обработка ошибок) ===");

        CompletableFuture<String> future = CompletableFuture.supplyAsync((Supplier<String>) () -> {
            throw new RuntimeException("Ой, ошибка!");
        }).exceptionally(throwable -> {
            // Ловим ошибку и возвращаем значение по умолчанию
            System.out.println("Ловим: " + throwable.getMessage());
            return "Значение по умолчанию при ошибке";
        });

        System.out.println("Результат: " + future.join());
    }

    // ===================== thenCombine =====================

    /**
     * thenCombine: объединение двух CompletableFuture.
     * Ждём обе задачи и объединяем их результаты.
     */
    public static void demonstrateThenCombine() {
        System.out.println("\\n=== thenCombine (объединение двух задач) ===");

        CompletableFuture<String> nameFuture = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Алексей";
        });

        CompletableFuture<Integer> ageFuture = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(300); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return 30;
        });

        CompletableFuture<String> combined = nameFuture.thenCombine(ageFuture, (name, age) -> {
            return name + ", " + age + " лет";
        });

        System.out.println("Результат: " + combined.join());
    }

    // ===================== thenAcceptBoth =====================

    /**
     * thenAcceptBoth: обработка двух результатов без возврата.
     */
    public static void demonstrateThenAcceptBoth() {
        System.out.println("\\n=== thenAcceptBoth (обработка двух результатов) ===");

        CompletableFuture<String> cityFuture = CompletableFuture.supplyAsync(() -> "Москва");
        CompletableFuture<Integer> tempFuture = CompletableFuture.supplyAsync(() -> 25);

        cityFuture.thenAcceptBoth(tempFuture, (city, temp) -> {
            System.out.println("В " + city + " сейчас " + temp + "°C");
        });

        cityFuture.join();
        tempFuture.join();
    }

    // ===================== runAfterBoth =====================

    /**
     * runAfterBoth: действие ПОСЛЕ завершения двух задач.
     */
    public static void demonstrateRunAfterBoth() {
        System.out.println("\\n=== runAfterBoth (действие после двух задач) ===");

        CompletableFuture<String> data1 = CompletableFuture.supplyAsync(() -> "данные A");
        CompletableFuture<String> data2 = CompletableFuture.supplyAsync(() -> "данные B");

        CompletableFuture<Void> done = data1.runAfterBoth(data2, () -> {
            System.out.println("Обе задачи завершены, выводим итог!");
        });

        done.join();
    }

    // ===================== applyToEither / acceptEither =====================

    /**
     * applyToEither: берём результат ПЕРВОЙ завершившейся задачи.
     * Полезно, когда есть резервный источник данных.
     */
    public static void demonstrateApplyToEither() {
        System.out.println("\\n=== applyToEither (результат первой задачи) ===");

        // Медленная задача
        CompletableFuture<String> slow = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Медленный результат";
        });

        // Быстрая задача
        CompletableFuture<String> fast = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Быстрый результат";
        });

        // Берём ПЕРВЫЙ результат — whichever finishes first
        CompletableFuture<String> result = fast.applyToEither(slow, s -> "Победа: " + s);
        System.out.println("Результат: " + result.join());
        // "Победа: Быстрый результат"
    }

    // ===================== allOf =====================

    /**
     * allOf: ждём ВСЕ задачи одновременно.
     */
    public static void demonstrateAllOf() {
        System.out.println("\\n=== allOf (ожидание всех задач) ===");

        CompletableFuture<String> task1 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(200); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Задача 1";
        });

        CompletableFuture<String> task2 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(300); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Задача 2";
        });

        CompletableFuture<String> task3 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Задача 3";
        });

        // allOf ждёт все три, но не возвращает их результаты
        CompletableFuture<Void> allDone = CompletableFuture.allOf(task1, task2, task3);

        allDone.join(); // дождались
        System.out.println(task1.join() + ", " + task2.join() + ", " + task3.join());
    }

    // ===================== anyOf =====================

    /**
     * anyOf: результат ПЕРВОЙ завершившейся из списка.
     */
    public static void demonstrateAnyOf() {
        System.out.println("\\n=== anyOf (результат первой из списка) ===");

        CompletableFuture<String> slow = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Медленный";
        });

        CompletableFuture<String> fast = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return "Быстрый";
        });

        Object result = CompletableFuture.anyOf(slow, fast).join();
        System.out.println("Первым завершил: " + result);
    }

    // ===================== exception handling patterns =====================

    /**
     * Обработка ошибок с fallback — «если первая не работает, пробуем вторую».
     */
    public static void demonstrateFallback() {
        System.out.println("\\n=== Fallback (резервный источник) ===");

        CompletableFuture<String> primary = CompletableFuture.supplyAsync((Supplier<String>) () -> {
            // Имитируем недоступность основного источника
            throw new RuntimeException("Основной источник недоступен!");
        }).orTimeout(1, java.util.concurrent.TimeUnit.SECONDS) // таймаут 1 секунда
          .exceptionally(ex -> "Данные из кэша");

        System.out.println("Результат: " + primary.join());
    }

    /**
     * Задержка с CompletableFuture (как Thread.sleep, но асинхронно).
     */
    public static void demonstrateDelay() {
        System.out.println("\\n=== Задержка (delay) ===");

        long start = System.currentTimeMillis();

        CompletableFuture.delayedExecutor(2, java.util.concurrent.TimeUnit.MILLISECONDS)
                .execute(() -> {
                    System.out.println("Прошло ~2 мс: " + (System.currentTimeMillis() - start) + " мс");
                });

        System.out.println("Главный поток не заблокирован!");
    }

    // ===================== Real-world example: загрузка данных =====================

    /**
     * Реальный паттерн: загрузка пользователя и его заказов параллельно.
     */
    public static void demonstrateRealWorldExample() {
        System.out.println("\\n=== Реальный пример: пользователь + заказы ===");

        long start = System.currentTimeMillis();

        CompletableFuture<String> user = CompletableFuture.supplyAsync(() -> {
            simulateNetworkCall(500);
            return "Пользователь: Алексей";
        });

        CompletableFuture<String> orders = CompletableFuture.supplyAsync(() -> {
            simulateNetworkCall(300);
            return "Заказов: 15";
        });

        CompletableFuture<String> combined = user.thenCombine(orders, (u, o) -> u + " | " + o);

        System.out.println("Итог: " + combined.join());
        System.out.println("Время: " + (System.currentTimeMillis() - start) + " мс (параллельно!)");
        // ~500 мс вместо ~800 мс последовательно
    }

    private static void simulateNetworkCall(int ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        System.out.println("=== CompletableFuture ===");
        demonstrateBasicCompletableFuture();
        demonstrateThenApply();
        demonstrateThenAccept();
        demonstrateThenRun();
        demonstrateExceptionally();
        demonstrateThenCombine();
        demonstrateThenAcceptBoth();
        demonstrateRunAfterBoth();
        demonstrateApplyToEither();
        demonstrateAllOf();
        demonstrateAnyOf();
        demonstrateFallback();
        demonstrateRealWorldExample();
    }
}`;

    SNIPPETS['_6.ReentrantLockDemo'] = `package org.baileyseyes._6;

import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * ReentrantLock + Condition — альтернатива synchronized.
 * — ReentrantLock — явный замок с методами lock()/unlock()
 * — Condition — альтернатива wait()/notify() — несколько условий!
 * — tryLock() — попытка получить замок с таймаутом
 * — isLocked(), getHoldCount() — инспекция
 *
 * @see org.baileyseyes._6.CompletableFutureDemo Предыдущая часть
 */
public class ReentrantLockDemo {

    // ===================== Базовый ReentrantLock =====================

    /**
     * ReentrantLock — явный замок.
     * В отличие от synchronized, замок можно получить и отпустить в разных местах.
     */
    public static void demonstrateBasicLock() {
        System.out.println("=== Базовый ReentrantLock ===");

        ReentrantLock lock = new ReentrantLock();
        AtomicInteger counter = new AtomicInteger(0);

        // Потоки, инкрементирующие счётчик
        Thread t1 = new Thread(() -> {
            lock.lock();
            try {
                for (int i = 0; i < 5; i++) {
                    System.out.println("Т-1: " + counter.incrementAndGet());
                }
            } finally {
                lock.unlock(); // ← всегда в finally!
            }
        });

        Thread t2 = new Thread(() -> {
            lock.lock();
            try {
                for (int i = 0; i < 5; i++) {
                    System.out.println("Т-2: " + counter.incrementAndGet());
                }
            } finally {
                lock.unlock();
            }
        });

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("Итог: " + counter.get()); // всегда 10!
    }

    // ===================== Reentrant = повторное захватывание =====================

    /**
     * Reentrant — «повторно входимый».
     * Один и тот же поток может захватить замок многократно без блокировки.
     */
    public static void demonstrateReentrant() {
        System.out.println("\\n=== Reentrant (повторный вход) ===");

        ReentrantLock lock = new ReentrantLock();

        Thread t = new Thread(() -> {
            lock.lock();
            System.out.println("Поток захватил замок (1x)");
            System.out.println("  getHoldCount: " + lock.getHoldCount());

            lock.lock();
            System.out.println("Поток захватил замок (2x)");
            System.out.println("  getHoldCount: " + lock.getHoldCount());

            lock.unlock();
            System.out.println("Поток отпустил замок (1x осталось)");
            System.out.println("  getHoldCount: " + lock.getHoldCount());

            lock.unlock();
            System.out.println("Поток отпустил замок (0x осталось)");
            System.out.println("  getHoldCount: " + lock.getHoldCount());
        });

        t.start();
        try { t.join(); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
    }

    // ===================== tryLock() с таймаутом =====================

    /**
     * tryLock() — НЕ БЛОКИРУЕТ навсегда!
     * — tryLock() — попытаться получить сейчас, вернуть true/false
     * — tryLock(timeout, unit) — ждать не дольше timeout
     */
    public static void demonstrateTryLock() {
        System.out.println("\\n=== tryLock() ===");

        ReentrantLock lock = new ReentrantLock();

        // Поток 1: захватит замок и держит
        Thread t1 = new Thread(() -> {
            lock.lock();
            System.out.println("Т-1: замок захвачен, работаю...");
            try { Thread.sleep(3000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            lock.unlock();
            System.out.println("Т-1: замок отпущен");
        });

        // Поток 2: попробует получить замок с таймаутом
        Thread t2 = new Thread(() -> {
            System.out.println("Т-2: пытаюсь получить замок...");
            try {
                boolean acquired = lock.tryLock(2, java.util.concurrent.TimeUnit.SECONDS);
                if (acquired) {
                    System.out.println("Т-2: замок получен!");
                    lock.unlock();
                } else {
                    System.out.println("Т-2: замок не получен за 2 секунды — ушёл");
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Т-2: прерван");
            }
        });

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    /**
     * tryLock() без таймаута — сразу возвращает true/false.
     */
    public static void demonstrateTryLockNoWait() {
        System.out.println("\\n=== tryLock() без ожидания ===");

        ReentrantLock lock = new ReentrantLock();
        lock.lock(); // захватим замок

        Thread t = new Thread(() -> {
            boolean got = lock.tryLock();
            System.out.println("Получил замок сразу? " + got); // false!
        });

        t.start();
        try { t.join(); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        lock.unlock();
    }

    // ===================== FairLock =====================

    /**
     * ReentrantLock с fair=true — справедливый замок.
     * Потоки получают замок в порядке FIFO, не нарушая очереди.
     */
    public static void demonstrateFairLock() {
        System.out.println("\\n=== FairLock ===");

        ReentrantLock fairLock = new ReentrantLock(true); // fair = true
        AtomicInteger counter = new AtomicInteger(0);

        for (int i = 1; i <= 3; i++) {
            final int id = i;
            Thread t = new Thread(() -> {
                for (int j = 0; j < 3; j++) {
                    fairLock.lock();
                    try {
                        System.out.println("Поток " + id + ": " + counter.incrementAndGet());
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    } finally {
                        fairLock.unlock();
                    }
                }
            });
            t.start();
        }
    }

    // ===================== Condition — условия =====================

    /**
     * Condition — альтернатива wait()/notify().
     * Можно создать ДРУГИЕ условия (не только one wait-set).
     */
    public static void demonstrateCondition() {
        System.out.println("\\n=== Condition (условия) ===");

        ReentrantLock lock = new ReentrantLock();
        Condition notEmpty = lock.newCondition();
        Condition notFull = lock.newCondition();

        java.util.List<Integer> buffer = new java.util.ArrayList<>();
        final int MAX = 3;

        // Производитель
        Thread producer = new Thread(() -> {
            for (int i = 1; i <= 6; i++) {
                lock.lock();
                try {
                    while (buffer.size() >= MAX) {
                        System.out.println("Буфер полон, производитель ждёт...");
                        notFull.await(); // ждём пока освободится место
                    }
                    buffer.add(i);
                    System.out.println("Произв: " + i + " (в буфере: " + buffer.size() + ")");
                    notEmpty.signal(); // говорим потребителю: есть данные!
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    lock.unlock();
                }
            }
        });

        // Потребитель
        Thread consumer = new Thread(() -> {
            for (int i = 1; i <= 6; i++) {
                lock.lock();
                try {
                    while (buffer.isEmpty()) {
                        System.out.println("Буфер пуст, потребитель ждёт...");
                        notEmpty.await(); // ждём пока появятся данные
                    }
                    int item = buffer.remove(0);
                    System.out.println("Потр: " + item + " (в буфере: " + buffer.size() + ")");
                    notFull.signal(); // говорим производителю: освободилось место!
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    lock.unlock();
                }
            }
        });

        producer.start();
        consumer.start();

        try {
            producer.join();
            consumer.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // ===================== isLocked() и getHoldCount() =====================

    /**
     * Инспекция замка: isLocked(), isHeldByCurrentThread(), getHoldCount().
     */
    public static void demonstrateLockInspection() {
        System.out.println("\\n=== Инспекция замка ===");

        ReentrantLock lock = new ReentrantLock();

        System.out.println("isLocked: " + lock.isLocked()); // false
        System.out.println("isHeldByCurrentThread: " + lock.isHeldByCurrentThread()); // false

        lock.lock();
        System.out.println("После lock():");
        System.out.println("  isLocked: " + lock.isLocked()); // true
        System.out.println("  isHeldByCurrentThread: " + lock.isHeldByCurrentThread()); // true
        System.out.println("  getHoldCount: " + lock.getHoldCount()); // 1

        lock.lock();
        System.out.println("После второго lock():");
        System.out.println("  getHoldCount: " + lock.getHoldCount()); // 2

        lock.unlock();
        System.out.println("После unlock():");
        System.out.println("  getHoldCount: " + lock.getHoldCount()); // 1
        System.out.println("  isHeldByCurrentThread: " + lock.isHeldByCurrentThread()); // true

        lock.unlock();
        System.out.println("После второго unlock():");
        System.out.println("  isHeldByCurrentThread: " + lock.isHeldByCurrentThread()); // false
        System.out.println("  isLocked: " + lock.isLocked()); // false
    }

    // ===================== lockInterruptibly() =====================

    /**
     * lockInterruptibly() — замок можно прервать.
     * Если поток заблокирован на lockInterruptibly(), вызов interrupt() вернёт InterruptedIOException.
     */
    public static void demonstrateLockInterruptibly() {
        System.out.println("\\n=== lockInterruptibly() ===");

        ReentrantLock lock = new ReentrantLock();

        // Поток 1: захватит замок
        Thread t1 = new Thread(() -> {
            lock.lock();
            System.out.println("Т-1: замок захвачен, работаю долго...");
            try { Thread.sleep(5000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            lock.unlock();
            System.out.println("Т-1: замок отпущен");
        });

        // Поток 2: попытается получить замок с прерыванием
        Thread t2 = new Thread(() -> {
            System.out.println("Т-2: пытаюсь lockInterruptibly()...");
            try {
                lock.lockInterruptibly();
                System.out.println("Т-2: замок получен!");
                lock.unlock();
            } catch (InterruptedException e) {
                System.out.println("Т-2: прерван (Interrupted!)");
            }
        });

        t1.start();
        t2.start();

        // Ждём чуть-чуть и прерываем Т-2
        try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        System.out.println("Главный поток: прерываю Т-2...");
        t2.interrupt();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        System.out.println("=== ReentrantLock и Condition ===");
        demonstrateBasicLock();
        demonstrateReentrant();
        demonstrateTryLock();
        demonstrateTryLockNoWait();
        demonstrateFairLock();
        demonstrateCondition();
        demonstrateLockInspection();
        demonstrateLockInterruptibly();
    }
}`;

    SNIPPETS['_6.ThreadLocalDemo'] = `package org.baileyseyes._6;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * ThreadLocal — переменная, уникальная для каждого потока.
 * Каждый поток получает свою КОПИЮ переменной, не видя чужие.
 * Используется для:
 * — хранение контекста пользователя (сессии, токены)
 * — SimpleDateFormatter (потокобезопасный для каждого потока)
 * — Hibernate Session (каждый поток — своя сессия)
 *
 * @see org.baileyseyes._6.ReentrantLockDemo Предыдущая часть
 * @see org.baileyseyes._7.GenericsDemo Следующая часть
 */
@SuppressWarnings("all")
public class ThreadLocalDemo {

    // ===================== Базовый ThreadLocal =====================

    /**
     * ThreadLocal — каждая нить хранит своё значение.
     */
    public static void demonstrateBasic() {
        System.out.println("=== Базовый ThreadLocal ===");

        // Создаём ThreadLocal с начальным значением
        ThreadLocal<String> threadId = new ThreadLocal<>();

        // Главный поток
        threadId.set("Главный");
        System.out.println("Главный поток видит: " + threadId.get());

        // Новый поток
        Thread t = new Thread(() -> {
            // Новый поток НЕ видит значение главного!
            System.out.println("Новый поток: get() = " + threadId.get()); // null!
            threadId.set("Поток-" + Thread.currentThread().getName());
            System.out.println("Новый поток после set(): " + threadId.get());
        });

        t.start();
        try { t.join(); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }

        // Главный поток по-прежнему видит своё
        System.out.println("Главный поток снова: " + threadId.get()); // Главный
    }

    /**
     * с initialValue() — задаём значение по умолчанию для каждого потока.
     */
    public static void demonstrateWithInitialValue() {
        System.out.println("\\n=== initialValue() ===");

        ThreadLocal<Integer> counter = new ThreadLocal<Integer>() {
            @Override
            protected Integer initialValue() {
                return 0; // каждый поток начинает с 0
            }
        };

        // Главный поток
        System.out.println("Главный: " + counter.get()); // 0

        // Потоки
        for (int i = 1; i <= 3; i++) {
            final int id = i;
            Thread t = new Thread(() -> {
                for (int j = 0; j < 3; j++) {
                    counter.set(counter.get() + 1);
                    System.out.println("  Поток " + id + ": " + counter.get());
                }
            });
            t.start();
        }
    }

    /**
     * ThreadLocal с Integer — инкремент без синхронизации.
     */
    public static void demonstrateThreadLocalCounter() {
        System.out.println("\\n=== ThreadLocal счётчик ===");

        ThreadLocal<Integer> threadCounter = new ThreadLocal<Integer>() {
            @Override
            protected Integer initialValue() {
                return 0;
            }
        };

        for (int i = 1; i <= 5; i++) {
            Thread t = new Thread(() -> {
                for (int j = 0; j < 5; j++) {
                    threadCounter.set(threadCounter.get() + 1);
                }
                System.out.println("Поток " + Thread.currentThread().getName() + ": " + threadCounter.get());
            });
            t.start();
        }
    }

    // ===================== ThreadLocal с SimpleDateFormat =====================

    /**
     * ThreadLocal для потокобезопасного SimpleDateFormat.
     * SimpleDateFormat НЕ потокобезопасен — каждый поток получает свой экземпляр.
     */
    public static class ThreadSafeFormatter {
        // ThreadLocal с lazy-initialization
        private static final ThreadLocal<java.text.SimpleDateFormat> dateFormat =
                ThreadLocal.withInitial(() -> new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

        public static String format(java.util.Date date) {
            return dateFormat.get().format(date);
        }

        public static java.util.Date parse(String text) throws java.text.ParseException {
            return dateFormat.get().parse(text);
        }
    }

    public static void demonstrateDateFormat() {
        System.out.println("\\n=== ThreadLocal для SimpleDateFormat ===");

        java.util.Date now = new java.util.Date();

        // Главный поток
        String mainFormatted = ThreadSafeFormatter.format(now);
        System.out.println("Главный: " + mainFormatted);

        // Параллельные потоки
        for (int i = 1; i <= 3; i++) {
            final int id = i;
            Thread t = new Thread(() -> {
                String formatted = ThreadSafeFormatter.format(new java.util.Date());
                System.out.println("Поток " + id + ": " + formatted);
            });
            t.start();
        }

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // ===================== ThreadLocal для User Context =====================

    /**
     * ThreadLocal для хранения контекста пользователя.
     * Реальный паттерн в веб-приложениях!
     */
    public static class UserContext {
        // Храним текущего пользователя для каждого потока
        private static final ThreadLocal<String> currentUser = new ThreadLocal<>();

        public static void setCurrentUser(String user) {
            currentUser.set(user);
        }

        public static String getCurrentUser() {
            return currentUser.get();
        }

        public static void clearUser() {
            currentUser.remove(); // ← ОБЯЗАТЕЛЬНО очищаем!
        }
    }

    public static void demonstrateUserContext() {
        System.out.println("\\n=== Контекст пользователя (UserContext) ===");

        // Запрос от пользователя "Алексей"
        UserContext.setCurrentUser("Алексей");
        System.out.println("Запрос от: " + UserContext.getCurrentUser());

        // Параллельный запрос от пользователя "Мария"
        Thread maria = new Thread(() -> {
            UserContext.setCurrentUser("Мария");
            System.out.println("Мария видит: " + UserContext.getCurrentUser());
            UserContext.clearUser();
        });

        // Параллельный запрос от пользователя "Дмитрий"
        Thread dmitry = new Thread(() -> {
            UserContext.setCurrentUser("Дмитрий");
            System.out.println("Дмитрий видит: " + UserContext.getCurrentUser());
            UserContext.clearUser();
        });

        maria.start();
        dmitry.start();

        // Главный поток всё ещё видит "Алексей"
        System.out.println("Главный всё ещё: " + UserContext.getCurrentUser());

        try {
            maria.join();
            dmitry.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Теперь главный очистил — get() вернёт null
        System.out.println("После clear: " + UserContext.getCurrentUser());
    }

    // ===================== ThreadLocal vs synchronized =====================

    /**
     * ThreadLocal vs synchronized: когда что использовать.
     * — ThreadLocal: каждый поток — СВОЕ значение (не нужно синхронизироваться!)
     * — synchronized: все потоки — ОДНО значение (нужна блокировка!)
     */
    public static void demonstrateThreadLocalVsSynchronized() {
        System.out.println("\\n=== ThreadLocal vs synchronized ===");

        // ThreadLocal: каждый поток имеет СВОЮ копию
        ThreadLocal<Integer> threadLocalValue = new ThreadLocal<Integer>() {
            @Override
            protected Integer initialValue() {
                return 0;
            }
        };

        // synchronized: общий ресурс, защищённый замком
        AtomicInteger synchronizedValue = new AtomicInteger(0);

        Thread tlThread = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                threadLocalValue.set(threadLocalValue.get() + 1);
            }
            System.out.println("ThreadLocal: " + threadLocalValue.get());
        });

        Thread syncThread = new Thread(() -> {
            synchronized (ThreadLocalDemo.class) {
                for (int i = 0; i < 10; i++) {
                    synchronizedValue.incrementAndGet();
                }
            }
            System.out.println("Synchronized: " + synchronizedValue.get());
        });

        tlThread.start();
        syncThread.start();

        try {
            tlThread.join();
            syncThread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // ===================== remove() — очистка =====================

    /**
     * ThreadLocal.remove() — ОЧИЩАЕТ значение потока.
     * КРИТИЧЕСКИ ВАЖНО в web-серверах: без remove() значения накапливаются!
     */
    public static void demonstrateRemove() {
        System.out.println("\\n=== remove() ===");

        ThreadLocal<String> value = new ThreadLocal<>();
        value.set("Значение 1");
        System.out.println("До remove(): " + value.get()); // Значение 1

        value.remove();
        System.out.println("После remove(): " + value.get()); // null

        // Следующий get() вернёт initialValue(), если он задан
        ThreadLocal<Integer> withInitial = new ThreadLocal<Integer>() {
            @Override
            protected Integer initialValue() {
                return 42;
            }
        };
        withInitial.set(100);
        System.out.println("До remove(): " + withInitial.get()); // 100

        withInitial.remove();
        System.out.println("После remove(): " + withInitial.get()); // 42 (initialValue!)
    }

    // ===================== Сложный ThreadLocal паттерн =====================

    /**
     * Реальный паттерн: корреляционный ID для трейсинга запросов.
     */
    public static class RequestTracer {
        private static final ThreadLocal<String> traceId = new ThreadLocal<>();

        public static void startTrace(String id) {
            traceId.set(id);
        }

        public static String getTraceId() {
            return traceId.get();
        }

        public static void endTrace() {
            traceId.remove();
        }
    }

    public static void demonstrateTracing() {
        System.out.println("\\n=== Трейсинг запросов (traceId) ===");

        // Имитация HTTP-запроса
        Runnable request = () -> {
            String traceId = java.util.UUID.randomUUID().toString().substring(0, 8);
            RequestTracer.startTrace(traceId);

            System.out.println("Запрос " + traceId + ": начался");

            // Вложенный вызов — traceId доступен!
            nestedMethod();

            System.out.println("Запрос " + traceId + ": завершился");
            RequestTracer.endTrace();
        };

        // Несколько параллельных запросов
        for (int i = 1; i <= 3; i++) {
            new Thread(request).start();
        }

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private static void nestedMethod() {
        String traceId = RequestTracer.getTraceId();
        System.out.println("  Вложенный метод: traceId=" + traceId);
    }

    public static void main(String[] args) {
        System.out.println("=== ThreadLocal ===");
        demonstrateBasic();
        demonstrateWithInitialValue();
        demonstrateThreadLocalCounter();
        demonstrateDateFormat();
        demonstrateUserContext();
        demonstrateThreadLocalVsSynchronized();
        demonstrateRemove();
        demonstrateTracing();
    }
}`;

    SNIPPETS['_7.FunctionalInterfaces'] = `package org.baileyseyes._7;

import java.util.Arrays;
import java.util.List;
import java.util.function.*;

/**
 * Функциональные интерфейсы Java (java.util.function).
 * — Predicate<T>: T → boolean (проверка, фильтрация)
 * — Consumer<T>: T → void (обработка, печать)
 * — Function<T, R>: T → R (преобразование)
 * — Supplier<T>: () → T (генерация значения)
 * — BiFunction<T, U, R>: (T, U) → R (обработка двух аргументов)
 * — UnaryOperator<T>: T → T (преобразование того же типа)
 *
 * Это основа Stream API и лямбда-выражений.
 *
 * @see org.baileyseyes._7.StreamAPI Следующая часть
 */
@SuppressWarnings("all")
public class FunctionalInterfaces {

    // ===================== Predicate =====================

    /**
     * Predicate: функция, которая проверяет и возвращает true/false.
     * Основной метод: boolean test(T t)
     * Методы and(), or(), negate() для комбинирования.
     */
    public static void demonstratePredicate() {
        System.out.println("=== Predicate ===");

        List<String> names = Arrays.asList("Алексей", "Мария", "Иван", "Анна", "Дмитрий");

        // Предикат: начинается с буквы А
        Predicate<String> startsWithA = name -> name.startsWith("А");

        // Предикат: длина больше 4
        Predicate<String> longEnough = name -> name.length() > 4;

        // Комбинируем: начинается с А ИЛИ длина > 5
        Predicate<String> filter = startsWithA.or(longEnough);

        List<String> result = names.stream()
                .filter(filter)
                .toList();
        System.out.println("Отфильтровано: " + result);
        // Алексей, Анна, Дмитрий
    }

    /**
     * Negate: инвертировать предикат.
     */
    public static void demonstratePredicateNegate() {
        System.out.println("\\n=== Predicate.negate() ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        Predicate<Integer> isEven = n -> n % 2 == 0;

        // negate() — берём НЕ чётные (нечётные)
        List<Integer> oddNumbers = numbers.stream()
                .filter(isEven.negate())
                .toList();
        System.out.println("Нечётные: " + oddNumbers);
    }

    // ===================== Consumer =====================

    /**
     * Consumer: функция, которая что-то делает с аргументом (ничего не возвращает).
     * Основной метод: void accept(T t)
     * Метод andThen() для цепочки обработчиков.
     */
    public static void demonstrateConsumer() {
        System.out.println("\\n=== Consumer ===");

        List<String> words = Arrays.asList("Hello", "World", "Java");

        // Печатаем каждое слово
        Consumer<String> printer = word -> System.out.println("Печать: " + word);

        words.forEach(printer); // forEach — это consumer!
    }

    /**
     * andThen: цепочка обработчиков.
     */
    public static void demonstrateConsumerAndThen() {
        System.out.println("\\n=== Consumer.andThen() ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        Consumer<Integer> doubler = n -> System.out.print(n * 2 + " ");
        Consumer<Integer> suffixer = n -> System.out.print(" → " + (n * 2 > 5 ? "чётное" : "нечётное"));

        // Сначала удвоить, потом определить чётность
        Consumer<Integer> combined = doubler.andThen(suffixer);

        numbers.forEach(combined);
        System.out.println();
    }

    // ===================== Function =====================

    /**
     * Function: функция, которая преобразует T в R.
     * Основной метод: R apply(T t)
     * Методы andThen(), compose() для цепочек.
     */
    public static void demonstrateFunction() {
        System.out.println("\\n=== Function ===");

        List<String> names = Arrays.asList("алексей", "мария", "иван");

        // Преобразуем: lowercase → uppercase → capitalize
        Function<String, String> toUpper = String::toUpperCase;
        Function<String, String> capitalize = s -> s.substring(0, 1).toUpperCase() + s.substring(1);

        List<String> capitalized = names.stream()
                .map(toUpper.andThen(capitalize))
                .toList();
        System.out.println("Capitalized: " + capitalized);
    }

    /**
     * compose: применяем сначала compose-функцию, потом основную.
     * compose(f) = this(f(x))
     * andThen(f) = f(this(x))
     */
    public static void demonstrateCompose() {
        System.out.println("\\n=== Function.compose() ===");

        Function<Integer, Integer> multiplyBy2 = x -> x * 2;
        Function<Integer, Integer> add10 = x -> x + 10;

        // compose: сначала add10, потом multiplyBy2 → (x + 10) * 2
        Function<Integer, Integer> composed = multiplyBy2.compose(add10);
        System.out.println("composed.apply(5) = " + composed.apply(5)); // (5 + 10) * 2 = 30

        // andThen: сначала multiplyBy2, потом add10 → (x * 2) + 10
        Function<Integer, Integer> thenApplied = multiplyBy2.andThen(add10);
        System.out.println("thenApplied.apply(5) = " + thenApplied.apply(5)); // (5 * 2) + 10 = 20
    }

    /**
     * Function.identity(): стандартная функция, возвращающая аргумент без изменений.
     * Полезно как «ничего не делать» в коллекторах.
     */
    public static void demonstrateIdentity() {
        System.out.println("\\n=== Function.identity() ===");

        List<Integer> numbers = Arrays.asList(1, 2, 3);

        List<Integer> copied = numbers.stream()
                .map(Function.identity())
                .toList();
        System.out.println("Копия: " + copied);
    }

    // ===================== Supplier =====================

    /**
     * Supplier: функция, которая НЕ принимает аргументов, но возвращает значение.
     * Основной метод: T get()
     * Используется для ленивой инициализации, генераторов, фабрик.
     */
    public static void demonstrateSupplier() {
        System.out.println("\\n=== Supplier ===");

        // Генератор случайных чисел
        Supplier<Double> randomSupplier = Math::random;

        System.out.println("Случайное число 1: " + randomSupplier.get());
        System.out.println("Случайное число 2: " + randomSupplier.get());
        System.out.println("Случайное число 3: " + randomSupplier.get());
    }

    /**
     * Ленивая инициализация с Supplier:
     * Значение вычисляется только при первом вызове.
     */
    static class LazyLoader {
        private Supplier<String> dataSupplier;
        private String cachedValue;
        private boolean loaded = false;

        public LazyLoader(Supplier<String> supplier) {
            this.dataSupplier = supplier;
        }

        public String load() {
            if (!loaded) {
                System.out.println("Вычисляем значение впервые...");
                this.cachedValue = dataSupplier.get(); // вычисляем только один раз
                this.loaded = true;
            }
            return cachedValue;
        }
    }

    public static void demonstrateLazyLoading() {
        System.out.println("\\n=== Ленивая загрузка (Supplier) ===");

        LazyLoader loader = new LazyLoader(() -> {
            System.out.println("Долгое вычисление...");
            return "Готово!";
        });

        System.out.println("Первый вызов: " + loader.load());
        System.out.println("Второй вызов: " + loader.load()); // без вычисления!
    }

    // ===================== BiFunction =====================

    /**
     * BiFunction: функция с ДВУМЯ аргументами.
     * Основной метод: R apply(T t, U u)
     */
    public static void demonstrateBiFunction() {
        System.out.println("\\n=== BiFunction ===");

        BiFunction<Double, Double, Double> add = (a, b) -> a + b;
        BiFunction<Double, Double, Double> multiply = (a, b) -> a * b;

        System.out.println("10 + 5 = " + add.apply(10.0, 5.0));
        System.out.println("10 * 5 = " + multiply.apply(10.0, 5.0));

        // Комбинируем: сначала сложить, потом умножить на 2
        BiFunction<Double, Double, Double> combined = (a, b) -> multiply.apply(add.apply(a, b), 2.0);
        System.out.println("(10 + 5) * 2 = " + combined.apply(10.0, 5.0));
    }

    /**
     * DoubleBinaryOperator: BiFunction для double (без boxing).
     */
    public static void demonstratePrimitiveBiFunction() {
        System.out.println("\\n=== DoubleBinaryOperator ===");

        java.util.function.DoubleBinaryOperator sum = (a, b) -> a + b;
        java.util.function.DoubleBinaryOperator product = (a, b) -> a * b;

        System.out.println("Сумма: " + sum.applyAsDouble(3.14, 2.72));
        System.out.println("Произведение: " + product.applyAsDouble(3.14, 2.72));
    }

    // ===================== UnaryOperator =====================

    /**
     * UnaryOperator: Function, где вход и выход одного типа.
     * T → T. Специализация Function<T, T>.
     */
    public static void demonstrateUnaryOperator() {
        System.out.println("\\n=== UnaryOperator ===");

        List<String> words = Arrays.asList("hello", "world", "java");

        java.util.function.UnaryOperator<String> capitalize =
                s -> s.substring(0, 1).toUpperCase() + s.substring(1);

        List<String> result = words.stream()
                .map(capitalize)
                .toList();
        System.out.println("Capitalized: " + result);

        // UnaryOperator для чисел
        java.util.function.UnaryOperator<Integer> doubleIt = x -> x * 2;
        List<Integer> doubled = Arrays.asList(1, 2, 3).stream()
                .map(doubleIt)
                .toList();
        System.out.println("Удвоенные: " + doubled);
    }

    // ===================== IntPredicate, LongConsumer и т.д. =====================

    /**
     * Примитивные варианты функциональных интерфейсов:
     * IntPredicate, LongConsumer, DoubleFunction и др.
     * Избегают autoboxing (Integer → int), что важнее для производительности.
     */
    public static void demonstratePrimitiveTypes() {
        System.out.println("\\n=== Примитивные функциональные интерфейсы ===");

        java.util.function.IntPredicate isEven = n -> n % 2 == 0;
        java.util.function.IntPredicate isPositive = n -> n > 0;

        int count = java.util.stream.IntStream.rangeClosed(-5, 10)
                .filter(isEven)
                .filter(isPositive)
                .map(i -> i * i)
                .sum();
        System.out.println("Сумма квадратов чётных положительных: " + count);
    }

    // ===================== Реальный пример =====================

    /**
     * Реальный пример: обработка данных с разными функциями.
     */
    public static void demonstrateRealWorldExample() {
        System.out.println("\\n=== Реальный пример: обработка данных ===");

        List<String> rawData = Arrays.asList("100", "200", "abc", "300", "400");

        // Функция парсинга
        Function<String, Integer> parse = s -> Integer.parseInt(s.trim());

        // Предикат для валидации
        Predicate<Integer> isValid = n -> n > 0;

        // Consumer для вывода
        Consumer<Integer> print = n -> System.out.println("  Обработано: " + n);

        List<Integer> result = rawData.stream()
                .filter(s -> {
                    try {
                        int value = parse.apply(s);
                        return isValid.test(value);
                    } catch (NumberFormatException e) {
                        return false;
                    }
                })
                .map(Integer::parseInt)
                .peek(print)
                .toList();

        System.out.println("Итог: " + result);
    }

    public static void main(String[] args) {
        System.out.println("=== Функциональные интерфейсы ===");
        demonstratePredicate();
        demonstratePredicateNegate();
        demonstrateConsumer();
        demonstrateConsumerAndThen();
        demonstrateFunction();
        demonstrateCompose();
        demonstrateIdentity();
        demonstrateSupplier();
        demonstrateLazyLoading();
        demonstrateBiFunction();
        demonstratePrimitiveBiFunction();
        demonstrateUnaryOperator();
        demonstratePrimitiveTypes();
        demonstrateRealWorldExample();
    }
}`;

    SNIPPETS['_7.GenericsDemo'] = `package org.baileyseyes._7;

import java.util.*;

/**
 * Generics (обобщения / дженерики) — типы как параметры.
 * Дженерики позволяют писать код, работающий с ЛЮБЫМИ типами безопасно.
 * 
 * Синтаксис: class Container<T>, interface List<E>, method <K, V> getMap()
 * Тире <?> — wildcards: ? extends T, ? super T
 * 
 * @see org.baileyseyes._7.FileIO Предыдущая часть
 * @see org.baileyseyes._7.StreamAPI Следующая часть
 */
@SuppressWarnings("all")
public class GenericsDemo {

    // ===================== Базовый generic класс =====================

    /**
     * Generic-класс Container<T>: работает с любым типом.
     */
    static class Container<T> {
        private T value;

        public Container(T value) {
            this.value = value;
        }

        public T getValue() {
            return value;
        }

        public void setValue(T value) {
            this.value = value;
        }
    }

    public static void demonstrateBasicGeneric() {
        System.out.println("=== Базовый generic-класс ===");

        Container<String> stringContainer = new Container<>("Привет");
        System.out.println("Строка: " + stringContainer.getValue());

        Container<Integer> intContainer = new Container<>(42);
        System.out.println("Число: " + intContainer.getValue());

        // БЕЗ дженериков пришлось бы casting:
        Container rawContainer = new Container("Привет");
        String text = (String) rawContainer.getValue(); // ← cast, может выбросить ClassCastException!

        // С дженериками: компилятор проверяет тип АВТОМАТИЧЕСКИ!
        // String bad = new Container<>(42).getValue(); // ОШИБКА КОМПИЛЯЦИИ!
    }

    // ===================== Generic метод =====================

    /**
     * Generic-метод: <T> — тип определяется из аргументов.
     */
    public static <T> void printArray(T[] array) {
        System.out.print("[");
        for (int i = 0; i < array.length; i++) {
            if (i > 0) System.out.print(", ");
            System.out.print(array[i]);
        }
        System.out.println("]");
    }

    /**
     * Generic-метод с возвращаемым значением.
     */
    public static <T> T firstElement(List<T> list) {
        if (list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }

    public static void demonstrateGenericMethod() {
        System.out.println("\\n=== Generic-методы ===");

        String[] strings = {"А", "Б", "В"};
        Integer[] ints = {1, 2, 3};
        Double[] doubles = {1.1, 2.2, 3.3};

        printArray(strings);  // [А, Б, В]
        printArray(ints);     // [1, 2, 3]
        printArray(doubles);  // [1.1, 2.2, 3.3]

        // firstElement
        List<String> names = Arrays.asList("Алексей", "Мария", "Иван");
        String first = firstElement(names);
        System.out.println("Первое имя: " + first); // Алексей
    }

    // ===================== Type Inference (вывод типов) =====================

    /**
     * Java 7+:Diamond operator <> — компилятор выводит тип из контекста.
     */
    public static void demonstrateTypeInference() {
        System.out.println("\\n=== Вывод типов (Diamond operator) ===");

        // Java 7+: не нужно писать new HashMap<String, Integer>()
        Map<String, Integer> scores = new HashMap<>(); // ← <> — вывод типа!
        scores.put("Алексей", 95);
        scores.put("Мария", 88);

        // Без вывода типов (Java 6 и старее):
        // Map<String, Integer> scores = new HashMap<String, Integer>();

        // List<String> list = new ArrayList<>(); // ← <> выводит String из переменной
        List<String> list = new ArrayList<>();
        list.add("Элемент");

        // Но <> нельзя использовать справа от присваивания без типа:
        // var map = new HashMap<>(); // ← ошибка, нет контекста!
    }

    // ===================== Multiple Type Parameters =====================

    /**
     * Generic-класс с ДВУМЯ и БОЛЕЕ типами.
     */
    static class Pair<K, V> {
        private final K key;
        private final V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }

        @Override
        public String toString() {
            return "Pair<" + key.getClass().getSimpleName() + ", " +
                   value.getClass().getSimpleName() + "> = (" + key + ", " + value + ")";
        }
    }

    /**
     * Generic-метод с тремя типами.
     */
    public static <K, V, R> Map<K, R> transform(Map<K, V> map, java.util.function.Function<V, R> fn) {
        Map<K, R> result = new HashMap<>();
        for (Map.Entry<K, V> entry : map.entrySet()) {
            result.put(entry.getKey(), fn.apply(entry.getValue()));
        }
        return result;
    }

    public static void demonstrateMultipleTypes() {
        System.out.println("\\n=== Множественные типы (K, V) ===");

        Pair<String, Integer> pair = new Pair<>("Возраст", 30);
        System.out.println(pair);

        // map<String, Integer> → map<String, String>
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Алексей", 25);
        ages.put("Мария", 30);
        ages.put("Иван", 35);

        Map<String, String> ageStrings = transform(ages, age -> age + " лет");
        System.out.println("Преобразованные: " + ageStrings);
    }

    // ===================== Wildcards =====================

    /**
     * <? extends T> — upper bound: любой тип, НАСЛЕДУЮЩИЙ T.
     * READ-ONLY: можем читать T, но НЕ можем добавлять (кроме null).
     */
    public static void demonstrateUpperBound() {
        System.out.println("\\n=== Upper bound (? extends T) ===");

        List<Integer> ints = Arrays.asList(1, 2, 3, 4, 5);
        List<Double> doubles = Arrays.asList(1.1, 2.2);
        List<Number> numbers = new ArrayList<>();
        numbers.addAll(ints); // Integer extends Number
        numbers.addAll(doubles); // Double extends Number

        printSum(ints);    // OK
        printSum(doubles); // OK
        printSum(numbers); // OK
    }

    private static void printSum(List<? extends Number> numbers) {
        double sum = 0;
        for (Number n : numbers) {
            sum += n.doubleValue();
        }
        System.out.println("Сумма: " + sum);
    }

    /**
     * <? super T> — lower bound: любой тип, ЯВЛЯЮЩИЙСЯ ПРЕДКОМ T.
     * WRITE-ONLY: можем добавлять T, но не знаем, какого типа будут элементы.
     */
    public static void demonstrateLowerBound() {
        System.out.println("\\n=== Lower bound (? super T) ===");

        List<Number> numbers = new ArrayList<>();
        List<Object> objects = new ArrayList<>();

        addNumbers(numbers);   // OK: Number super Integer
        addNumbers(objects);   // OK: Object super Integer
    }

    private static void addNumbers(List<? super Integer> list) {
        list.add(42);
        list.add(100);
        System.out.println("Добавлено в: " + list);
    }

    /**
     * PECS: Producer Extends, Consumer Super.
     * — Если коллекция ПРОИЗВОДИТ данные (для чтения) → extends
     * — Если коллекция ПОТРЕБЛЯЕТ данные (для записи) → super
     */
    public static void demonstratePECS() {
        System.out.println("\\n=== PECS (Producer Extends, Consumer Super) ===");

        // Producer (читаем из коллекции) — extends
        List<Integer> source = Arrays.asList(1, 2, 3);
        consumeSource(source); // OK

        // Consumer (пишем в коллекцию) — super
        List<Object> target = new ArrayList<>();
        writeToTarget(target); // OK
    }

    private static void consumeSource(List<? extends Number> source) {
        for (Number n : source) {
            System.out.print(n + " ");
        }
        System.out.println();
    }

    private static void writeToTarget(List<? super Integer> target) {
        target.add(1);
        target.add(2);
        target.add(3);
    }

    // ===================== Бounded Wildcards =====================

    /**
     * Бounded wildcard — ограничение типа.
     */
    public static void demonstrateBoundedWildcard() {
        System.out.println("\\n=== Bounded wildcard ===");

        // Список чисел — можем считать
        List<Integer> numbers = Arrays.asList(10, 20, 30);
        findMax(numbers); // 30

        // Если передать String — ОШИБКА: String не extends Number
    }

    private static void findMax(List<? extends Number> list) {
        Number max = null;
        for (Number n : list) {
            if (max == null || n.doubleValue() > max.doubleValue()) {
                max = n;
            }
        }
        System.out.println("Максимум: " + max);
    }

    // ===================== Generic vs raw type =====================

    /**
     * Raw type (без дженериков) — ОПАСНО!
     */
    public static void demonstrateRawTypeDanger() {
        System.out.println("\\n=== Опасность raw type ===");

        // Raw type — нет проверки типов!
        List rawList = new ArrayList();
        rawList.add("Строка");
        rawList.add(42);          // Integer — компилятор НЕ предупреждает!
        rawList.add(new Object());

        // При чтении — приходится кастовать, и можно получить ClassCastException!
        String s = (String) rawList.get(0); // OK
        // String bad = (String) rawList.get(1); // ClassCastException!

        System.out.println("Первый элемент: " + s);

        // С дженериками — компилятор НЕ ДАСТ добавить Integer в List<String>!
        List<String> safeList = new ArrayList<>();
        safeList.add("Строка");
        // safeList.add(42); // ← ОШИБКА КОМПИЛЯЦИИ!
    }

    // ===================== Generic интерфейс =====================

    /**
     * Generic-интерфейс.
     */
    interface Repository<E> {
        void save(E entity);
        E findById(int id);
        List<E> findAll();
    }

    static class UserRepository implements Repository<String> {
        private final Map<Integer, String> store = new HashMap<>();

        @Override
        public void save(String entity) {
            store.put(store.size() + 1, entity);
            System.out.println("Сохранён: " + entity);
        }

        @Override
        public String findById(int id) {
            return store.get(id);
        }

        @Override
        public List<String> findAll() {
            return new ArrayList<>(store.values());
        }
    }

    /**
     * Generic класс реализующий generic интерфейс.
     */
    static class GenericRepository<E> implements Repository<E> {
        private final List<E> store = new ArrayList<>();

        @Override
        public void save(E entity) {
            store.add(entity);
            System.out.println("Сохранён: " + entity);
        }

        @Override
        public E findById(int id) {
            if (id >= 0 && id < store.size()) {
                return store.get(id);
            }
            return null;
        }

        @Override
        public List<E> findAll() {
            return new ArrayList<>(store);
        }
    }

    public static void demonstrateGenericInterface() {
        System.out.println("\\n=== Generic интерфейс ===");

        // Конкретный тип
        UserRepository userRepo = new UserRepository();
        userRepo.save("Алексей");
        userRepo.save("Мария");
        System.out.println("Все пользователи: " + userRepo.findAll());

        // Generic тип
        GenericRepository<String> repo = new GenericRepository<>();
        repo.save("Первый");
        repo.save("Второй");
        System.out.println("Найдено по ID=0: " + repo.findById(0));
        System.out.println("Все: " + repo.findAll());
    }

    // ===================== Generic enum =====================

    /**
     * Generic enum (Java 5+) — ограничивает тип значением enum.
     */
    enum Status { PENDING, RUNNING, DONE, ERROR }

    static class Task<T> {
        private final T data;
        private final Status status;

        public Task(T data, Status status) {
            this.data = data;
            this.status = status;
        }

        public T getData() { return data; }
        public Status getStatus() { return status; }
    }

    public static void demonstrateGenericEnum() {
        System.out.println("\\n=== Generic + enum ===");

        Task<String> task1 = new Task<>("Обработка файла", Status.DONE);
        Task<Integer> task2 = new Task<>(42, Status.RUNNING);
        Task<Double> task3 = new Task<>(3.14, Status.PENDING);

        System.out.println(task1.getData() + " — " + task1.getStatus());
        System.out.println(task2.getData() + " — " + task2.getStatus());
        System.out.println(task3.getData() + " — " + task3.getStatus());
    }

    // ===================== Generic в циклах =====================

    /**
     * Дженерики в цикле forEach.
     */
    public static void demonstrateForEach() {
        System.out.println("\\n=== forEach с дженериками ===");

        Map<String, List<Integer>> scores = new HashMap<>();
        scores.put("Алексей", Arrays.asList(85, 90, 78));
        scores.put("Мария", Arrays.asList(92, 88, 95));

        for (Map.Entry<String, List<Integer>> entry : scores.entrySet()) {
            String name = entry.getKey();
            List<Integer> grades = entry.getValue();
            int avg = grades.stream().mapToInt(Integer::intValue).sum() / grades.size();
            System.out.println(name + ": средний балл = " + avg);
        }
    }

    // ===================== Diamond с анонимным классом =====================

    /**
     * Diamond <> с анонимными классами.
     */
    public static void demonstrateDiamondWithAnonymous() {
        System.out.println("\\n=== Diamond с анонимным классом ===");

        // Java 8+: <> работает даже с анонимными классами!
        java.util.Comparator<String> byLength = new java.util.Comparator<>() {
            @Override
            public int compare(String a, String b) {
                return Integer.compare(a.length(), b.length());
            }
        };

        List<String> words = Arrays.asList("короткий", "длинный", "средний");
        words.sort(byLength);
        System.out.println("По длине: " + words);
    }

    // ===================== Generic метод с несколькими типами =====================

    /**
     * Swap элементов массива — generic.
     */
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    /**
     * Бинарный поиск — generic с Comparator.
     */
    public static <T> int binarySearch(T[] array, T key, java.util.Comparator<? super T> comp) {
        int low = 0;
        int high = array.length - 1;

        while (low <= high) {
            int mid = (low + high) >>> 1;
            int cmp = comp.compare(array[mid], key);
            if (cmp < 0) low = mid + 1;
            else if (cmp > 0) high = mid - 1;
            else return mid; // found
        }
        return -(low + 1); // not found
    }

    public static void demonstrateGenericAlgorithms() {
        System.out.println("\\n=== Generic алгоритмы ===");

        // Swap
        String[] names = {"Алиса", "Боб", "Чарли"};
        swap(names, 0, 2);
        System.out.println("После swap: " + java.util.Arrays.toString(names));

        // Binary search (требует отсортированный массив!)
        Integer[] numbers = {10, 20, 30, 40, 50};
        int index = binarySearch(numbers, 30, Integer::compareTo);
        System.out.println("Поиск 30: индекс " + index); // 2
    }

    public static void main(String[] args) {
        System.out.println("=== Generics (дженерики) ===");
        demonstrateBasicGeneric();
        demonstrateGenericMethod();
        demonstrateTypeInference();
        demonstrateMultipleTypes();
        demonstrateUpperBound();
        demonstrateLowerBound();
        demonstratePECS();
        demonstrateBoundedWildcard();
        demonstrateRawTypeDanger();
        demonstrateGenericInterface();
        demonstrateGenericEnum();
        demonstrateForEach();
        demonstrateDiamondWithAnonymous();
        demonstrateGenericAlgorithms();
    }
}`;

    SNIPPETS['_7.Container'] = `package org.baileyseyes._7;

// Вложенный static-класс внутри GenericsDemo.java (файл GenericsDemo.java)
    class Container<T> {
        private T value;

        public Container(T value) {
            this.value = value;
        }

        public T getValue() {
            return value;
        }

        public void setValue(T value) {
            this.value = value;
        }
    }
`;

    SNIPPETS['_7.FileIO'] = `package org.baileyseyes._7;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.List;
import java.util.stream.Stream;

/**
 * Работа с файлами:
 * — Базовый FileInputStream/FileOutputStream (байты)
 * — BufferedReader/Writer (символы, строки)
 * — NIO.2: Files, Path — современный API (Java 7+)
 * — Files.readAllLines, Files.write, Files.copy, Files.walk
 *
 * @see org.baileyseyes._7.FunctionalInterfaces Предыдущая часть
 */
@SuppressWarnings("all")
public class FileIO {

    /**
     * Запись файла через FileWriter (символы).
     */
    public static void demonstrateFileWriter() {
        System.out.println("=== FileWriter ===");
        String path = "output_demo.txt";

        try (FileWriter writer = new FileWriter(path)) {
            writer.write("Привет, файл!\\n");
            writer.write("Строка 2\\n");
            writer.write("Строка 3");
            System.out.println("Файл '" + path + "' записан");
        } catch (IOException e) {
            System.out.println("Ошибка записи: " + e.getMessage());
        }
    }

    /**
     * Чтение файла через FileReader и BufferedReader.
     * BufferedReader читает буферами, что быстрее чем по символу.
     */
    public static void demonstrateFileReader() {
        System.out.println("\\n=== BufferedReader ===");
        String path = "output_demo.txt";

        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String line;
            int lineNum = 1;
            while ((line = reader.readLine()) != null) {
                System.out.println("Строка " + lineNum + ": " + line);
                lineNum++;
            }
        } catch (IOException e) {
            System.out.println("Ошибка чтения: " + e.getMessage());
        }
    }

    /**
     * Чтение и запись с кодировкой UTF-8 (проблема Windows: кодировка по умолчанию не UTF-8!).
     */
    public static void demonstrateUtf8Encoding() {
        System.out.println("\\n=== UTF-8 кодировка ===");
        String path = "output_utf8.txt";

        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(path), StandardCharsets.UTF_8)) {
            writer.write("Привет мир! Привет Java! Привет НАО!");
            writer.newLine();
            writer.write("Кириллица, цифры 123, символы: @#€");
            System.out.println("Файл '" + path + "' записан в UTF-8");
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.readAllLines — чтение всего файла в список строк.
     */
    public static void demonstrateReadAllLines() {
        System.out.println("\\n=== Files.readAllLines ===");
        try {
            List<String> lines = Files.readAllLines(Paths.get("output_utf8.txt"), StandardCharsets.UTF_8);
            System.out.println("Всего строк: " + lines.size());
            for (int i = 0; i < lines.size(); i++) {
                System.out.println("  [" + (i + 1) + "] " + lines.get(i));
            }
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.write — запись списка строк в файл.
     */
    public static void demonstrateWriteAllLines() {
        System.out.println("\\n=== Files.write ===");
        String path = "write_all_demo.txt";

        List<String> lines = List.of(
                "Строка 1: первая",
                "Строка 2: вторая",
                "Строка 3: третья"
        );

        try {
            // Стандартный режим: перезапись
            Files.write(Paths.get(path), lines, StandardCharsets.UTF_8);
            System.out.println("Записано " + lines.size() + " строк в '" + path + "'");

            // Режим добавления (append)
            Files.write(Paths.get(path), List.of("Строка 4: appended"),
                    StandardCharsets.UTF_8, java.nio.file.StandardOpenOption.APPEND);
            System.out.println("Добавлена строка");
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.copy — копирование файла.
     */
    public static void demonstrateCopy() {
        System.out.println("\\n=== Files.copy ===");

        Path source = Paths.get("output_demo.txt");
        Path destination = Paths.get("output_demo_copy.txt");

        try {
            // REPLACE_EXISTING — перезаписать, если файл существует
            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Скопировано: " + source + " → " + destination);

            // Посчитать размер файла
            long size = Files.size(destination);
            System.out.println("Размер: " + size + " байт");
        } catch (IOException e) {
            System.out.println("Ошибка копирования: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.move — перемещение файла.
     */
    public static void demonstrateMove() {
        System.out.println("\\n=== Files.move ===");

        Path from = Paths.get("output_demo_copy.txt");
        Path to = Paths.get("output_demo_moved.txt");

        try {
            // REPLACE_EXISTING — заменить, если целевой файл есть
            Files.move(from, to, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Перемещено: " + from + " → " + to);

            // Проверить существование
            System.out.println("Old exists: " + Files.exists(from));
            System.out.println("New exists: " + Files.exists(to));
        } catch (IOException e) {
            System.out.println("Ошибка перемещения: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.walk — рекурсивный обход директории.
     */
    public static void demonstrateWalkDirectory() {
        System.out.println("\\n=== Files.walk (обход директории) ===");

        try {
            Path start = Paths.get(".");

            // Stream<Path> — итерируемся по всем файлам и папкам
            try (Stream<Path> stream = Files.walk(start, 2)) { // глубина 2 уровня
                stream.filter(Files::isRegularFile) // только файлы
                      .forEach(path -> {
                          try {
                              long size = Files.size(path);
                              System.out.println("  " + path + " (" + size + " байт)");
                          } catch (IOException e) {
                              // игнорируем недоступные
                          }
                      });
            }
        } catch (IOException e) {
            System.out.println("Ошибка обхода: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.createTempFile — создание временного файла.
     */
    public static void demonstrateTempFile() {
        System.out.println("\\n=== Временный файл ===");

        try {
            Path tempFile = Files.createTempFile("myapp", ".tmp");
            System.out.println("Временный файл: " + tempFile);
            System.out.println("В системе temp: " + System.getProperty("java.io.tmpdir"));
            System.out.println("Delete on exit: " + tempFile);
            tempFile.toFile().deleteOnExit();

            Files.write(tempFile, "временные данные".getBytes(StandardCharsets.UTF_8));
            System.out.println("Записано в временный файл");
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * NIO.2: Files.exists, Files.isDirectory, Files.isHidden.
     */
    public static void demonstrateFileCheck() throws IOException {
        System.out.println("\\n=== Проверки файлов ===");

        String path = "output_demo.txt";
        Path p = Paths.get(path);

        System.out.println("exists: " + Files.exists(p));
        System.out.println("isDirectory: " + Files.isDirectory(p));
        System.out.println("isRegularFile: " + Files.isRegularFile(p));
        System.out.println("isHidden: " + Files.isHidden(p));

        try {
            BasicFileAttributes attrs = Files.readAttributes(p, BasicFileAttributes.class);
            System.out.println("создан: " + attrs.creationTime());
            System.out.println("модифицирован: " + attrs.lastModifiedTime());
            System.out.println("размер: " + attrs.size() + " байт");
        } catch (IOException e) {
            System.out.println("Ошибка чтения атрибутов: " + e.getMessage());
        }
    }

    /**
     * Чтение файла поблочно (chunked read) — для больших файлов.
     */
    public static void demonstrateChunkedRead() {
        System.out.println("\\n=== Поблочное чтение (InputStream) ===");
        String path = "output_demo.txt";

        try (FileInputStream fis = new FileInputStream(path);
             BufferedInputStream bis = new BufferedInputStream(fis)) {

            byte[] buffer = new byte[16]; // буфер 16 байт
            int bytesRead;
            int totalBytes = 0;

            while ((bytesRead = bis.read(buffer)) != -1) {
                String chunk = new String(buffer, 0, bytesRead, StandardCharsets.UTF_8);
                System.out.print(chunk); // выводим поблочно
                totalBytes += bytesRead;
            }
            System.out.println("\\nВсего прочитано: " + totalBytes + " байт");

        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    /**
     * Подсчёт строк, слов и символов в файле.
     */
    public static void demonstrateTextStats() {
        System.out.println("\\n=== Статистика текста ===");
        String path = "output_utf8.txt";

        try {
            List<String> lines = Files.readAllLines(Paths.get(path), StandardCharsets.UTF_8);
            int charCount = 0;
            int wordCount = 0;

            for (String line : lines) {
                charCount += line.length();
                // Подсчёт слов: делим по пробелам
                if (!line.trim().isEmpty()) {
                    wordCount += line.trim().split("\\\\s+").length;
                }
            }
            System.out.println("Строк: " + lines.size());
            System.out.println("Слов: " + wordCount);
            System.out.println("Символов: " + charCount);
        } catch (IOException e) {
            System.out.println("Ошибка: " + e.getMessage());
        }
    }

    public static void main(String[] args) throws IOException {
        System.out.println("=== Работа с файлами ===");
        demonstrateFileWriter();
        demonstrateFileReader();
        demonstrateUtf8Encoding();
        demonstrateReadAllLines();
        demonstrateWriteAllLines();
        demonstrateCopy();
        demonstrateMove();
        demonstrateWalkDirectory();
        demonstrateTempFile();
        demonstrateFileCheck();
        demonstrateChunkedRead();
        demonstrateTextStats();
    }
}`;

    SNIPPETS['_7.DesignPatternsDemo'] = `package org.baileyseyes._7;

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
        System.out.println("\\n=== Factory (создание фигур) ===");

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
            System.out.println("\\n  📢 Новость: " + news);
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
        System.out.println("\\n=== Observer (подписка на новости) ===");

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
        System.out.println("\\n=== Strategy (сортировка) ===");

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
        System.out.println("\\n=== Chain of Responsibility ===");

        // Строим цепочку: Log → Validate → Process
        Handler log = new LoggingHandler();
        Handler validate = new ValidationHandler();
        Handler process = new ProcessingHandler();

        log.setNext(validate);
        validate.setNext(process);

        System.out.println("Обработка 'Hello':");
        log.handle("Hello");

        System.out.println("\\nОбработка '': (пустой)");
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
        System.out.println("\\n=== Decorator (декорирование сообщений) ===");

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
            return method + " " + url + "\\n" +
                   headers.entrySet().stream()
                           .map(e -> e.getKey() + ": " + e.getValue())
                           .reduce((a, b) -> a + "\\n" + b)
                           .orElse("") +
                   (body.isEmpty() ? "" : "\\n\\n" + body);
        }
    }

    public static void demonstrateBuilder() {
        System.out.println("\\n=== Builder (HTTP-запрос) ===");

        HttpRequest request = new HttpRequestBuilder()
                .url("https://api.example.com/users")
                .method("POST")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer token123")
                .body("{\\"name\\": \\"Алексей\\", \\"age\\": 30}")
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
}`;

    var KIND_COLORS = {'class':'#2f6fed','interface':'#0f9d8f','enum':'#8e44ad','record':'#c0392b','annotation':'#d48806'};
    var KIND_LETTER = {'class':'C','interface':'I','enum':'E','record':'R','annotation':'A'};
    var KIND_LIST = ['class','interface','enum','record','annotation'];

    /* ==================== HELPERS ==================== */

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function lsGet(key, fallback) {
        try {
            var v = localStorage.getItem(key);
            if (v === null) return fallback;
            return JSON.parse(v);
        } catch (e) { return fallback; }
    }

    function lsSet(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* file:// может блокировать */ }
    }

    function plural(n, one, few, many) {
        var m10 = n % 10, m100 = n % 100;
        if (m10 === 1 && m100 !== 11) return one;
        if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
        return many;
    }

    /* ==================== ПОДСВЕТКА JAVA ==================== */

    function tokenize(code) {
        var re = /(\/\*[\s\S]*?\*\/)|(\/\/[^\n]*)|("(?:\\.|[^"\\\n])*")|(@\w+)|(\b\d[\d_]*(?:\.\d[\d_]*)?[LlFfDd]?\b)|(\b(?:package|import|public|private|protected|static|final|class|interface|enum|record|extends|implements|return|void|new|try|catch|finally|throw|throws|if|else|for|while|do|switch|case|default|break|continue|this|super|abstract|synchronized|volatile|transient|native|instanceof|var|yield|int|long|short|byte|double|float|boolean|char|String)\b)|(\b[A-Z][A-Za-z0-9_]*\b)/g;
        var tokens = [];
        var m;
        while ((m = re.exec(code)) !== null) {
            var cls;
            if (m[1] !== undefined || m[2] !== undefined) cls = 't-com';
            else if (m[3] !== undefined) cls = 't-str';
            else if (m[4] !== undefined) cls = 't-anno';
            else if (m[5] !== undefined) cls = 't-num';
            else if (m[6] !== undefined) cls = 't-kw';
            else cls = 't-type';
            tokens.push({s: m.index, e: m.index + m[0].length, c: cls});
            if (m[0].length === 0) re.lastIndex++;
        }
        return tokens;
    }

    function codeLinesHTML(code) {
        code = String(code).replace(/\r\n?/g, '\n').replace(/\t/g, '    ');
        var tokens = tokenize(code);
        var raw = code.split('\n');
        var out = [];
        var pos = 0;
        for (var li = 0; li < raw.length; li++) {
            var line = raw[li];
            var lStart = pos, lEnd = pos + line.length;
            var html = '', cursor = lStart;
            for (var ti = 0; ti < tokens.length; ti++) {
                var t = tokens[ti];
                if (t.e <= lStart) continue;
                if (t.s >= lEnd) break;
                var s = Math.max(t.s, lStart), e = Math.min(t.e, lEnd);
                if (s > cursor) html += esc(code.slice(cursor, s));
                html += '<span class="' + t.c + '">' + esc(code.slice(s, e)) + '</span>';
                cursor = e;
            }
            if (cursor < lEnd) html += esc(code.slice(cursor, lEnd));
            out.push(html);
            pos = lEnd + 1;
        }
        return out;
    }

    function hl(code) {
        return codeLinesHTML(code).join('\n');
    }

    function renderCode(code) {
        var lines = codeLinesHTML(code);
        var h = '<div class="codeblock"><pre class="code">';
        for (var i = 0; i < lines.length; i++) {
            h += '<span class="cl"><span class="ln">' + (i + 1) + '</span><span class="ct">' + (lines[i].length ? lines[i] : '&nbsp;') + '</span></span>';
        }
        h += '</pre></div>';
        return h;
    }

    /* ==================== ГРАФ: УЗЛЫ И РЁБРА ==================== */

    var nodes = {};
    var chainOrder = [];
    var extraIds = [];
    var edges = [];
    var problems = [];

    CHAIN_NODES.forEach(function (row, i) {
        var id = row[0];
        var parts = id.split('.');
        nodes[id] = {
            id: id,
            simple: parts[parts.length - 1],
            pkg: parts.slice(0, -1).join('.'),
            kind: row[1],
            loc: row[2],
            main: !!row[3],
            start: !!row[4],
            nextId: row[5] || null,
            extra: false,
            anchor: null,
            summary: row[6],
            order: i + 1
        };
        chainOrder.push(id);
    });

    EXTRA_NODES.forEach(function (row) {
        var id = row[0];
        var parts = id.split('.');
        nodes[id] = {
            id: id,
            simple: parts[parts.length - 1],
            pkg: parts.slice(0, -1).join('.'),
            kind: row[1],
            loc: row[2],
            main: !!row[3],
            start: false,
            nextId: null,
            extra: true,
            anchor: row[4],
            summary: row[5],
            order: null
        };
        extraIds.push(id);
    });

    var allIds = chainOrder.concat(extraIds);

    chainOrder.forEach(function (id) {
        if (nodes[id].nextId) edges.push({from: id, to: nodes[id].nextId, type: 'next'});
    });
    extraIds.forEach(function (id) {
        edges.push({from: nodes[id].anchor, to: id, type: 'extra'});
    });

    /* проверка целостности */
    allIds.forEach(function (id) {
        var n = nodes[id];
        if (n.nextId && !nodes[n.nextId]) problems.push('Узел «' + id + '»: nextId «' + n.nextId + '» не найден');
        if (n.extra && n.anchor && !nodes[n.anchor]) problems.push('Узел «' + id + '»: anchor «' + n.anchor + '» не найден');
    });
    if (problems.length) console.warn('[learn-java-core] Нарушения целостности данных:', problems);

    function prevOf(id) {
        for (var i = 0; i < chainOrder.length; i++) {
            if (nodes[chainOrder[i]].nextId === id) return chainOrder[i];
        }
        return null;
    }

    function moduleOfNode(n) {
        var seg = n.id.split('.')[0];
        if (seg.charAt(0) === '_') {
            var num = parseInt(seg.slice(1), 10);
            if (!isNaN(num) && MODULES[num]) return MODULES[num];
        }
        return MODULES[0];
    }

    function filePath(id) {
        // Контейнер объявлен вложенным классом в чужом файле — ведём ссылку на него
        if (id === '_7.Container') return 'src/main/java/org/baileyseyes/_7/GenericsDemo.java';
        return 'src/main/java/org/baileyseyes/' + id.split('.').join('/');
    }

    function routeAnchorOrder(id) {
        var cur = nodes[id];
        var guard = 0;
        while (cur && cur.extra && guard++ < 30) cur = nodes[cur.anchor];
        return cur ? cur.order : null;
    }

    /* ==================== STATE ==================== */

    var state = {
        route: {name: 'home'},
        done: [],
        theme: 'dark',
        filters: {q: '', module: '', kind: '', onlyRunnable: false, onlyObligatory: false},
        readPos: 0
    };

    function isDone(id) { return state.done.indexOf(id) > -1; }
    function countChainDone() {
        var c = 0;
        for (var i = 0; i < chainOrder.length; i++) if (isDone(chainOrder[i])) c++;
        return c;
    }
    function firstUndone() {
        for (var i = 0; i < chainOrder.length; i++) if (!isDone(chainOrder[i])) return i;
        return -1;
    }
    function initReadPos() {
        var fu = firstUndone();
        state.readPos = (fu === -1) ? chainOrder.length - 1 : fu;
    }

    /* ==================== РАСКЛАДКА ГРАФА ==================== */

    var NODE_W = 176, NODE_H = 64, GAP_X = 48, GAP_Y = 88, PAD = 40;
    var currentPerRow = (typeof window !== 'undefined' && window.innerWidth < 700) ? 3 : 8;

    function buildLayout(perRow) {
        var pos = {};
        chainOrder.forEach(function (id, i) {
            var row = Math.floor(i / perRow);
            var col = i % perRow;
            pos[id] = {
                x: PAD + ((row % 2 === 0) ? col : (perRow - 1 - col)) * (NODE_W + GAP_X),
                y: PAD + row * (NODE_H + GAP_Y),
                row: row, col: col
            };
        });
        var pending = extraIds.slice();
        var kByAnchor = {};
        while (pending.length) {
            var placed = false;
            var remaining = [];
            for (var i = 0; i < pending.length; i++) {
                var id = pending[i];
                var a = nodes[id].anchor;
                if (a && pos[a]) {
                    var k = kByAnchor[a] || 0;
                    kByAnchor[a] = k + 1;
                    pos[id] = {x: pos[a].x + k * (NODE_W + 16), y: pos[a].y + NODE_H + 40, row: pos[a].row, col: -1};
                    placed = true;
                } else {
                    remaining.push(id);
                }
            }
            pending = remaining;
            if (!placed) break;
        }
        var maxX = 0, maxY = 0;
        Object.keys(pos).forEach(function (id) {
            if (pos[id].x > maxX) maxX = pos[id].x;
            if (pos[id].y > maxY) maxY = pos[id].y;
        });
        pending.forEach(function (id, i) {
            pos[id] = {x: PAD + i * (NODE_W + 16), y: maxY + NODE_H + GAP_Y, row: -2, col: -1};
            if (pos[id].x > maxX) maxX = pos[id].x;
            if (pos[id].y > maxY) maxY = pos[id].y;
        });
        return {pos: pos, w: maxX + NODE_W + PAD, h: maxY + NODE_H + PAD};
    }

    function edgePoints(p1, p2, ed) {
        if (ed.type === 'extra') {
            return {x1: p1.x + NODE_W / 2, y1: p1.y + NODE_H, x2: p2.x + NODE_W / 2, y2: p2.y};
        }
        if (p1.row === p2.row) {
            if (p2.x > p1.x) return {x1: p1.x + NODE_W, y1: p1.y + NODE_H / 2, x2: p2.x, y2: p2.y + NODE_H / 2};
            return {x1: p1.x, y1: p1.y + NODE_H / 2, x2: p2.x + NODE_W, y2: p2.y + NODE_H / 2};
        }
        if (p2.y > p1.y) return {x1: p1.x + NODE_W / 2, y1: p1.y + NODE_H, x2: p2.x + NODE_W / 2, y2: p2.y};
        return {x1: p1.x + NODE_W / 2, y1: p1.y, x2: p2.x + NODE_W / 2, y2: p2.y + NODE_H};
    }

    function graphSVG() {
        var L = buildLayout(currentPerRow);
        var pos = L.pos;
        var s = '<div class="card graphcard"><div class="graph-scroll">';
        s += '<svg class="course-graph" viewBox="0 0 ' + L.w + ' ' + L.h + '" preserveAspectRatio="xMidYMid meet" width="100%" role="group" aria-label="Граф маршрута курса">';
        s += '<defs>';
        s += '<marker id="ah-next" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L8,3 L0,6 Z" style="fill:var(--accent)"/></marker>';
        s += '<marker id="ah-extra" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L8,3 L0,6 Z" style="fill:var(--muted)"/></marker>';
        s += '</defs>';
        edges.forEach(function (ed) {
            var p1 = pos[ed.from], p2 = pos[ed.to];
            if (!p1 || !p2) return;
            var pt = edgePoints(p1, p2, ed);
            var dx = pt.x2 - pt.x1;
            var d = 'M' + pt.x1 + ',' + pt.y1 + ' C' + (pt.x1 + dx * 0.4) + ',' + pt.y1 + ' ' + (pt.x2 - dx * 0.4) + ',' + pt.y2 + ' ' + pt.x2 + ',' + pt.y2;
            var toN = nodes[ed.to];
            var cls = 'gedge ' + (ed.type === 'next' ? 'e-next' : 'e-extra');
            var w = ed.type === 'next' ? 2.2 : 1.4;
            if (ed.type === 'next' && toN && toN.start) w = 3;
            s += '<path class="' + cls + '" d="' + d + '" stroke-width="' + w + '" marker-end="url(#' + (ed.type === 'next' ? 'ah-next' : 'ah-extra') + ')"/>';
        });
        allIds.forEach(function (id) {
            var p = pos[id];
            if (!p) return;
            var n = nodes[id];
            var mod = moduleOfNode(n);
            var kc = KIND_COLORS[n.kind] || '#7a8699';
            var done = isDone(id);
            var nm = n.simple.length > 21 ? n.simple.slice(0, 20) + '…' : n.simple;
            s += '<g class="gnode' + (done ? ' done' : '') + '" data-id="' + esc(id) + '" transform="translate(' + p.x + ',' + p.y + ')" tabindex="0" role="link" aria-label="' + esc(n.simple) + '">';
            s += '<g class="ginner">';
            s += '<title>' + esc(n.simple + (n.extra ? ' (дополнение)' : ' (шаг ' + n.order + ')')) + ' — ' + esc(n.summary) + '</title>';
            s += '<rect class="nrect" width="' + NODE_W + '" height="' + NODE_H + '" rx="10" stroke="' + (done ? '#1f9d55' : kc) + '" stroke-width="1.5"/>';
            s += '<rect x="0" y="10" width="4" height="' + (NODE_H - 20) + '" rx="2" fill="' + mod.color + '"/>';
            s += '<text class="ntitle" x="14" y="27">' + esc(nm) + '</text>';
            s += '<text class="nsub" x="14" y="48">' + (n.extra ? 'extra' : '#' + n.order) + '</text>';
            s += '<text class="nkind" x="' + (NODE_W - 10) + '" y="20" text-anchor="end">' + (KIND_LETTER[n.kind] || '?') + '</text>';
            if (done) s += '<text class="ncheck" x="' + (NODE_W - 10) + '" y="52" text-anchor="end">✓</text>';
            s += '</g></g>';
        });
        s += '</svg></div></div>';
        return s;
    }

    function legendHTML() {
        var h = '<div class="card legend">';
        h += '<div class="leg-col"><h4>Модули</h4><div class="leg-items">';
        MODULES.forEach(function (m) {
            if (m.n === 0) return;
            h += '<span class="leg-item"><span class="leg-swatch" style="background:' + m.color + '"></span>' + esc(m.folder + ' · ' + m.title) + '</span>';
        });
        h += '</div></div><div class="leg-col"><h4>Типы</h4><div class="leg-items">';
        KIND_LIST.forEach(function (k) {
            h += '<span class="leg-item"><span class="leg-swatch" style="background:' + KIND_COLORS[k] + '"></span>' + k + ' (' + KIND_LETTER[k] + ')</span>';
        });
        h += '</div></div><div class="leg-col"><h4>Линии</h4><div class="leg-items">';
        h += '<span class="leg-item"><svg width="34" height="10"><line x1="0" y1="5" x2="34" y2="5" style="stroke:var(--accent)" stroke-width="2.2"/></svg>next — обязательный переход</span>';
        h += '<span class="leg-item"><svg width="34" height="10"><line x1="0" y1="5" x2="34" y2="5" style="stroke:var(--muted)" stroke-width="1.4" stroke-dasharray="5 4"/></svg>extra — дополнение</span>';
        h += '<span class="leg-item"><svg width="34" height="10"><line x1="0" y1="5" x2="34" y2="5" style="stroke:var(--accent)" stroke-width="3"/></svg>переход между модулями</span>';
        h += '</div></div></div>';
        return h;
    }

    /* ==================== ЭКРАНЫ ==================== */

    function countModuleChain(m) {
        if (!m.folder) return 0;
        var c = 0;
        chainOrder.forEach(function (id) { if (id.indexOf(m.folder + '.') === 0) c++; });
        return c;
    }

    function renderHeader() {
        var doneN = countChainDone();
        var r = state.route;
        function navLink(hash, label, active) {
            return '<a class="navlink' + (active ? ' active' : '') + '" href="' + hash + '">' + label + '</a>';
        }
        return '<header class="hdr"><div class="hdr-inner wrap">' +
            '<a class="brand" href="#/">☕ Learn Java Core</a>' +
            '<nav class="nav">' +
            navLink('#/', 'Карта курса', r.name === 'home') +
            navLink('#/steps', 'Все шаги', r.name === 'steps') +
            navLink('#/read', 'Режим чтения', r.name === 'read') +
            '</nav>' +
            '<div class="hdr-right">' +
            '<span class="progress-chip" id="hdr-progress">' + doneN + '/' + chainOrder.length + ' пройдено</span>' +
            '<button class="btn ghost icon-btn" data-action="toggle-theme" title="Переключить тему" aria-label="Переключить тему">🌓</button>' +
            '</div></div></header>';
    }

    function renderFooter() {
        return '<footer class="foot"><div class="wrap foot-inner">' +
            '<span>☕ Learn Java Core — визуальный маршрут курса</span>' +
            '<span>' + chainOrder.length + ' обязательных ' + plural(chainOrder.length, 'шаг', 'шага', 'шагов') +
            ' · ' + extraIds.length + ' ' + plural(extraIds.length, 'дополнение', 'дополнения', 'дополнений') +
            ' · ' + allIds.length + ' файлов</span></div></footer>';
    }

    function problemsBanner() {
        if (!problems.length) return '';
        return '<div class="wrap"><div class="integrity-banner">⚠ Нарушена целостность данных: ' +
            problems.map(function (p) { return esc(p); }).join('<br>') + '</div></div>';
    }

    function screenHome() {
        var doneN = countChainDone();
        var h = '<section class="hero">';
        h += '<h1>Как устроено обучение Java</h1>';
        h += '<p class="subtitle">7 модулей · 70 файлов · 42 обязательных шага · последовательность задана метками @see … Следующая часть в Javadoc</p>';
        h += '<div class="hero-actions">';
        h += '<a class="btn primary" href="#/step/' + encodeURIComponent(chainOrder[0]) + '">▶ Начать с шага 1</a>';
        if (doneN > 0) {
            var fu = firstUndone();
            var nx = (fu === -1) ? chainOrder.length : fu + 1;
            h += '<a class="btn ghost" href="#/step/' + encodeURIComponent(chainOrder[nx - 1]) + '">Продолжить с шага ' + nx + '</a>';
        }
        h += '<a class="btn ghost" href="#/read">Режим чтения</a>';
        h += '</div></section>';

        h += '<h2 class="sec-title">Модули курса</h2><div class="modgrid">';
        MODULES.forEach(function (m) {
            var cnt = countModuleChain(m);
            h += '<a class="modcard card" href="#/steps?m=' + m.n + '" style="border-top:4px solid ' + m.color + '">' +
                '<div class="modnum" style="background:' + m.color + '">' + m.n + '</div>' +
                '<div><div class="modtitle">' + esc(m.title) + '</div>' +
                '<div class="modsub">' + esc(m.sub) + '</div>' +
                '<div class="modcount">' + cnt + ' ' + plural(cnt, 'обязательный шаг', 'обязательных шага', 'обязательных шагов') + '</div></div></a>';
        });
        h += '</div>';

        h += '<h2 class="sec-title">Механика</h2><div class="mech">' +
            '<div class="mech-box card">Javadoc <code>&nbsp;@see "Следующая часть"</code></div>' +
            '<div class="mech-arrow">→</div>' +
            '<div class="mech-box card">переход в IDE</div>' +
            '<div class="mech-arrow">→</div>' +
            '<div class="mech-box card">ребро <b>next(A→B)</b> в графе</div>' +
            '</div>';

        h += '<h2 class="sec-title">Граф маршрута</h2>' + graphSVG() + legendHTML();
        return h;
    }

    function filteredNodes() {
        var f = state.filters;
        var q = f.q.trim().toLowerCase();
        return allIds.map(function (id) { return nodes[id]; }).filter(function (n) {
            if (q && n.simple.toLowerCase().indexOf(q) === -1 && n.summary.toLowerCase().indexOf(q) === -1) return false;
            if (f.module !== '' && String(moduleOfNode(n).n) !== String(f.module)) return false;
            if (f.kind !== '' && n.kind !== f.kind) return false;
            if (f.onlyRunnable && !n.main) return false;
            if (f.onlyObligatory && n.extra) return false;
            return true;
        });
    }

    function stepsAreaHTML() {
        var list = filteredNodes();
        var h = '<p class="shown">Показано ' + list.length + ' из ' + allIds.length + '</p>';
        if (!list.length) return h + '<div class="card empty">Ничего не найдено — измените фильтры.</div>';
        h += '<div class="tablewrap card"><table class="steps"><thead><tr>' +
            '<th>№ шага</th><th>Название</th><th>Тип</th><th>Модуль</th><th>Строк</th><th>main</th><th>Статус</th><th>Пройдено</th>' +
            '</tr></thead><tbody>';
        list.forEach(function (n) {
            var mod = moduleOfNode(n);
            var done = isDone(n.id);
            h += '<tr data-id="' + esc(n.id) + '"' + (done ? ' class="is-done"' : '') + '>';
            h += '<td data-label="№ шага">' + (n.extra ? '—' : n.order) + '</td>';
            h += '<td data-label="Название"><div class="nm">' + esc(n.simple) + '</div><div class="sm">' + esc(n.summary) + '</div></td>';
            h += '<td data-label="Тип"><span class="badge kind-' + esc(n.kind) + '">' + esc(n.kind) + '</span></td>';
            h += '<td data-label="Модуль"><span class="modchip" style="background:' + mod.color + '"></span>' + esc(mod.title) + '</td>';
            h += '<td data-label="Строк">' + n.loc + '</td>';
            h += '<td data-label="main"' + (n.main ? ' class="td-main"' : '') + '>' + (n.main ? '✓' : '—') + '</td>';
            h += '<td data-label="Статус">' + (n.extra ? 'Дополнение' : 'Обязательный') + '</td>';
            h += '<td data-label="Пройдено"><input type="checkbox" data-action="toggle-done" data-id="' + esc(n.id) + '"' + (done ? ' checked' : '') + ' aria-label="Пройдено: ' + esc(n.simple) + '"></td>';
            h += '</tr>';
        });
        h += '</tbody></table></div>';
        return h;
    }

    function screenSteps(routeModule) {
        if (routeModule !== undefined && routeModule !== null && routeModule !== '') state.filters.module = String(routeModule);
        var f = state.filters;
        var h = '<h1 class="page-title">Все шаги курса</h1>';
        h += '<div class="filters card">';
        h += '<input id="f-q" type="search" placeholder="Поиск по имени или описанию…" value="' + esc(f.q) + '" aria-label="Поиск">';
        h += '<select id="f-module" aria-label="Модуль"><option value="">Модуль: все</option>';
        MODULES.forEach(function (m) {
            h += '<option value="' + m.n + '"' + (String(f.module) === String(m.n) ? ' selected' : '') + '>' + m.n + ' — ' + esc(m.title) + '</option>';
        });
        h += '</select>';
        h += '<select id="f-kind" aria-label="Тип"><option value="">Тип: все</option>';
        KIND_LIST.forEach(function (k) {
            h += '<option value="' + k + '"' + (f.kind === k ? ' selected' : '') + '>' + k + '</option>';
        });
        h += '</select>';
        h += '<label class="chk"><input type="checkbox" id="f-runnable"' + (f.onlyRunnable ? ' checked' : '') + '> только runnable</label>';
        h += '<label class="chk"><input type="checkbox" id="f-obligatory"' + (f.onlyObligatory ? ' checked' : '') + '> только обязательные</label>';
        h += '<button class="btn ghost" data-action="reset-filters">Сбросить</button>';
        h += '</div>';
        h += '<div id="steps-area">' + stepsAreaHTML() + '</div>';
        return h;
    }

    function screenStep(id) {
        var n = nodes[id];
        if (!n) {
            return '<div class="card"><h2>Шаг не найден</h2><p>Узел <code>' + esc(id) + '</code> отсутствует в данных курса.</p>' +
                '<a class="btn primary" href="#/">← На карту курса</a></div>';
        }
        var mod = moduleOfNode(n);
        var done = isDone(id);
        var h = '<nav class="crumbs"><a href="#/">Главная</a><span class="sep">/</span>' +
            '<a href="#/steps?m=' + mod.n + '">Модуль ' + esc(mod.folder ? mod.folder : '0') + ' — ' + esc(mod.title) + '</a><span class="sep">/</span>' +
            '<span>' + (n.extra ? 'Дополнение' : 'Шаг ' + n.order) + '</span></nav>';

        h += '<div class="step-head card"><h2>' + esc(n.simple) + '</h2><div class="badges">';
        h += '<span class="badge kind-' + esc(n.kind) + '">' + esc(n.kind) + '</span>';
        h += '<span class="badge" style="border-color:' + mod.color + ';color:' + mod.color + '">' + esc(mod.title) + '</span>';
        if (n.start) h += '<span class="badge start">START MODULE</span>';
        h += n.main ? '<span class="badge run">▶ RUNNABLE</span>' : '<span class="badge code-only">📄 CODE ONLY</span>';
        if (n.extra) h += '<span class="badge extra">EXTRA</span>';
        h += '</div><div class="filepath"><code>' + esc(filePath(id)) + '</code></div></div>';

        h += '<section class="card"><h3>Зачем этот файл</h3><p>' + esc(n.summary) + '</p></section>';

        h += '<section class="card"><h3>Как это реализовано в коде</h3>';
        if (SNIPPETS[id]) {
            h += renderCode(SNIPPETS[id]);
        } else {
            h += '<div class="file-plaque">Файл: ' + esc(filePath(id)) + ' · ' + n.loc + ' строк · ' + esc(n.kind) + '</div>';
        }
        h += '</section>';

        h += '<section class="card"><h3>Связи</h3><div class="nav-row">';
        if (n.extra) {
            var ao = routeAnchorOrder(id);
            h += '<a class="btn ghost" href="#/step/' + encodeURIComponent(n.anchor) + '">← Вернуться к маршруту</a>';
            h += '<span class="step-counter">Дополнение' + (ao ? ' к шагу ' + ao + ' из ' + chainOrder.length : '') + '</span>';
        } else {
            var pv = prevOf(id);
            if (pv) h += '<a class="btn ghost" href="#/step/' + encodeURIComponent(pv) + '">← Предыдущая часть</a>';
            else h += '<button class="btn ghost" disabled>← Предыдущая часть</button>';
            h += '<span class="step-counter">Шаг ' + n.order + ' из ' + chainOrder.length + '</span>';
            if (n.nextId) h += '<a class="btn primary" href="#/step/' + encodeURIComponent(n.nextId) + '">Следующая часть →</a>';
            else h += '<button class="btn primary" disabled>Следующая часть →</button>';
        }
        h += '</div>';
        if (!n.extra) {
            h += '<div class="minibar"><div class="minibar-fill" style="width:' + Math.round(n.order / chainOrder.length * 100) + '%"></div></div>';
        }
        h += '</section>';

        h += '<div class="done-row"><button class="btn ' + (done ? 'ok-solid' : 'ok') + '" data-action="toggle-done" data-id="' + esc(id) + '">' +
            (done ? '✓ Пройдено — снять отметку' : 'Отметить пройденным ✓') + '</button></div>';
        return h;
    }

    function screenRead() {
        var total = chainOrder.length;
        var doneN = countChainDone();
        var h = '<div class="read-wrap">';
        if (doneN >= total) {
            h += '<div class="card read-card finish"><h2>🎉 Курс пройден!</h2>' +
                '<p class="finish-text">Курс пройден! Дальше — Spring, БД и тесты.</p>' +
                '<div class="hero-actions"><a class="btn primary" href="#/">На карту курса</a><a class="btn ghost" href="#/steps">Все шаги</a></div></div>';
        } else {
            var idx = Math.min(Math.max(state.readPos, 0), total - 1);
            var n = nodes[chainOrder[idx]];
            var done = isDone(n.id);
            h += '<div class="card read-card">';
            h += '<div class="read-top"><span class="read-step">ШАГ ' + (idx + 1) + '/' + total + '</span>' +
                (n.main ? '<span class="badge run">▶ RUNNABLE</span>' : '<span class="badge code-only">📄 CODE ONLY</span>') +
                '<span class="badge kind-' + esc(n.kind) + '">' + esc(n.kind) + '</span></div>';
            h += '<h2 class="read-title">' + esc(n.simple) + '</h2>';
            h += '<p class="read-sum">' + esc(n.summary) + '</p>';
            var snip = SNIPPETS[n.id];
            if (snip) {
                var all = snip.split('\n');
                var short = all.slice(0, 20).join('\n');
                h += renderCode(short);
                if (all.length > 20) h += '<p class="muted-note">…показаны первые 20 строк, полный код — на странице шага</p>';
            } else {
                h += '<div class="file-plaque">Файл: ' + esc(filePath(n.id)) + ' · ' + n.loc + ' строк · ' + esc(n.kind) + '</div>';
            }
            h += '<div class="nav-row" style="margin-top:16px">';
            h += idx > 0 ? '<button class="btn ghost" data-action="read-prev">←</button>' : '<button class="btn ghost" disabled>←</button>';
            h += '<button class="btn ' + (done ? 'ok-solid' : 'ok') + '" data-action="read-mark">' + (done ? '✓ Пройдено' : 'Отметить пройденным') + '</button>';
            h += idx < total - 1 ? '<button class="btn primary" data-action="read-next">→</button>' : '<button class="btn primary" disabled>→</button>';
            h += '<a class="btn ghost" href="#/step/' + encodeURIComponent(n.id) + '">Подробно</a>';
            h += '</div>';
            h += '<p class="keys-hint">Клавиши: ← → — листать шаги, пробел — отметить пройденным</p>';
            h += '</div>';
        }
        h += '<div class="dots" aria-label="Прогресс курса">';
        for (var i = 0; i < total; i++) {
            var cls = 'dot' + (isDone(chainOrder[i]) ? ' done' : '') + (i === state.readPos && doneN < total ? ' cur' : '');
            h += '<button class="' + cls + '" data-action="read-goto" data-idx="' + i + '" title="Шаг ' + (i + 1) + '" aria-label="Шаг ' + (i + 1) + '"></button>';
        }
        h += '</div></div>';
        return h;
    }

    function screenFor(r) {
        if (r.name === 'steps') return screenSteps(r.module);
        if (r.name === 'step') return screenStep(r.id);
        if (r.name === 'read') return screenRead();
        return screenHome();
    }

    /* ==================== ROUTER ==================== */

    function parseRoute() {
        var h = '';
        try { h = location.hash || ''; } catch (e) { h = ''; }
        if (!h || h === '#' || h === '#/') return {name: 'home'};
        if (h.indexOf('#/steps') === 0) {
            var mod = '';
            var mm = /[?&]m=(\d+)/.exec(h);
            if (mm) mod = mm[1];
            return {name: 'steps', module: mod};
        }
        if (h.indexOf('#/step/') === 0) {
            var id = h.slice(7);
            try { id = decodeURIComponent(id); } catch (e) { /* оставляем как есть */ }
            return {name: 'step', id: id};
        }
        if (h.indexOf('#/read') === 0) return {name: 'read'};
        return {name: 'home'};
    }

    /* ==================== RENDER ==================== */

    function fallbackHeader() {
        return '<header class="hdr"><div class="hdr-inner wrap"><a class="brand" href="#/">☕ Learn Java Core</a></div></header>';
    }

    function render() {
        var root = document.getElementById('root');
        if (!root) return;
        var r;
        try { r = parseRoute(); } catch (e) { r = {name: 'home'}; }
        var prevName = state.route ? state.route.name : null;
        state.route = r;
        if (r.name === 'read' && prevName !== 'read') initReadPos();
        if (r.name === 'read') {
            state.readPos = Math.min(Math.max(state.readPos, 0), chainOrder.length - 1);
        }

        var html = null;
        try {
            html = renderHeader() + problemsBanner() + '<main class="wrap">' + screenFor(r) + '</main>' + renderFooter();
        } catch (err) {
            var msg = (err && err.message) ? String(err.message) : String(err);
            var banner = '<div class="fatal-banner">⛔ Ошибка отрисовки: ' + esc(msg) +
                ' <button class="btn primary" data-action="go-home">Домой</button></div>';
            var mainEl = root.querySelector('main');
            if (mainEl) {
                mainEl.insertAdjacentHTML('afterbegin', banner);
            } else {
                var head = '';
                try { head = renderHeader(); } catch (e2) { head = fallbackHeader(); }
                try { root.innerHTML = head + '<main class="wrap">' + banner + '</main>'; } catch (e3) { /* root недоступен */ }
            }
            return;
        }
        try {
            root.innerHTML = html;
        } catch (err) {
            root.textContent = 'Ошибка отрисовки: ' + ((err && err.message) ? err.message : err);
        }
    }

    function updateStepsArea() {
        var area = document.getElementById('steps-area');
        if (area) area.innerHTML = stepsAreaHTML();
    }

    function toggleTheme() {
        state.theme = (state.theme === 'dark') ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);
        lsSet('jcm.theme', state.theme);
        render();
    }

    function toggleDone(id) {
        if (!id || !nodes[id]) return;
        var i = state.done.indexOf(id);
        if (i > -1) state.done.splice(i, 1);
        else state.done.push(id);
        lsSet('jcm.done', state.done);
        render();
    }

    function readMark() {
        var idx = Math.min(Math.max(state.readPos, 0), chainOrder.length - 1);
        var id = chainOrder[idx];
        if (id && state.done.indexOf(id) === -1) {
            state.done.push(id);
            lsSet('jcm.done', state.done);
        }
        initReadPos();
        render();
    }

    /* ==================== СОБЫТИЯ (делегирование на #root) ==================== */

    var rootEl = document.getElementById('root');

    rootEl.addEventListener('click', function (e) {
        var t = e.target;
        var closest = t && t.closest ? t.closest.bind(t) : null;
        if (!closest) return;

        var actionEl = closest('[data-action]');
        if (actionEl) {
            var a = actionEl.getAttribute('data-action');
            if (a === 'toggle-theme') { e.preventDefault(); toggleTheme(); return; }
            if (a === 'go-home') { e.preventDefault(); location.hash = '#/'; return; }
            if (a === 'toggle-done') { e.preventDefault(); e.stopPropagation(); toggleDone(actionEl.getAttribute('data-id')); return; }
            if (a === 'reset-filters') { e.preventDefault(); state.filters = {q: '', module: '', kind: '', onlyRunnable: false, onlyObligatory: false}; render(); return; }
            if (a === 'read-prev') { e.preventDefault(); state.readPos = Math.max(0, state.readPos - 1); render(); return; }
            if (a === 'read-next') { e.preventDefault(); state.readPos = Math.min(chainOrder.length - 1, state.readPos + 1); render(); return; }
            if (a === 'read-mark') { e.preventDefault(); readMark(); return; }
            if (a === 'read-goto') {
                e.preventDefault();
                var di = parseInt(actionEl.getAttribute('data-idx'), 10);
                if (!isNaN(di)) { state.readPos = di; render(); }
                return;
            }
        }

        var g = closest('.gnode');
        if (g && g.getAttribute('data-id')) {
            location.hash = '#/step/' + encodeURIComponent(g.getAttribute('data-id'));
            return;
        }

        var tr = closest('tr[data-id]');
        if (tr) {
            location.hash = '#/step/' + encodeURIComponent(tr.getAttribute('data-id'));
            return;
        }
    });

    var qTimer = null;
    rootEl.addEventListener('input', function (e) {
        var t = e.target;
        if (t && t.id === 'f-q') {
            var v = t.value;
            if (qTimer) clearTimeout(qTimer);
            qTimer = setTimeout(function () {
                state.filters.q = v;
                updateStepsArea();
            }, 200);
        }
    });

    rootEl.addEventListener('change', function (e) {
        var t = e.target;
        if (!t) return;
        if (t.id === 'f-module') { state.filters.module = t.value; updateStepsArea(); }
        else if (t.id === 'f-kind') { state.filters.kind = t.value; updateStepsArea(); }
        else if (t.id === 'f-runnable') { state.filters.onlyRunnable = !!t.checked; updateStepsArea(); }
        else if (t.id === 'f-obligatory') { state.filters.onlyObligatory = !!t.checked; updateStepsArea(); }
    });

    rootEl.addEventListener('keydown', function (e) {
        var g = e.target && e.target.closest ? e.target.closest('.gnode') : null;
        if (g && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            location.hash = '#/step/' + encodeURIComponent(g.getAttribute('data-id'));
        }
    });

    document.addEventListener('keydown', function (e) {
        var r = state.route;
        var tag = (e.target && e.target.tagName) || '';
        var typing = (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT');
        if (r.name === 'step' && !typing) {
            var n = nodes[r.id];
            if (!n) return;
            if (e.key === 'ArrowRight') {
                if (n.nextId) { e.preventDefault(); location.hash = '#/step/' + encodeURIComponent(n.nextId); }
            } else if (e.key === 'ArrowLeft') {
                var pv = n.extra ? n.anchor : prevOf(r.id);
                if (pv) { e.preventDefault(); location.hash = '#/step/' + encodeURIComponent(pv); }
            }
        } else if (r.name === 'read') {
            if (e.key === 'ArrowRight' && !typing && tag !== 'BUTTON' && tag !== 'A') {
                e.preventDefault(); state.readPos = Math.min(chainOrder.length - 1, state.readPos + 1); render();
            } else if (e.key === 'ArrowLeft' && !typing && tag !== 'BUTTON' && tag !== 'A') {
                e.preventDefault(); state.readPos = Math.max(0, state.readPos - 1); render();
            } else if (e.key === ' ') {
                if (typing || tag === 'BUTTON' || tag === 'A') return;
                e.preventDefault(); readMark();
            }
        }
    });

    var lastRouteSig = '';
    window.addEventListener('hashchange', function () {
        var r = parseRoute();
        var sig = r.name + '|' + (r.id || '') + '|' + (r.module || '');
        var changed = sig !== lastRouteSig;
        lastRouteSig = sig;
        render();
        if (changed) {
            try { window.scrollTo(0, 0); } catch (e) { /* noop */ }
        }
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            var pr = (window.innerWidth < 700) ? 3 : 8;
            if (pr !== currentPerRow) {
                currentPerRow = pr;
                if (state.route.name === 'home') render();
            }
        }, 200);
    });

    /* ==================== INIT ==================== */

    function init() {
        var savedTheme = lsGet('jcm.theme', 'dark');
        state.theme = (savedTheme === 'light') ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);

        var savedDone = lsGet('jcm.done', []);
        state.done = Array.isArray(savedDone)
            ? savedDone.filter(function (x) { return typeof x === 'string'; })
            : [];

        state.route = parseRoute();
        lastRouteSig = state.route.name + '|' + (state.route.id || '') + '|' + (state.route.module || '');
        if (state.route.name === 'read') initReadPos();
        render();
    }

    init();

} catch (e) {
    document.getElementById('root').innerHTML = '<pre style="color:#d64545;padding:20px">Ошибка: ' + ((e && e.stack) ? e.stack : String(e)) + '</pre>';
}