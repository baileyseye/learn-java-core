package org.baileyseyes._2.classes_objects.util;

/**
 * Отсюда мы начнем знакомство с понятием интерфейса. Вообще его суть не быть утиль классом, но на этом мы посмотрим на ключевые
 * отличия интерфейса от обычного класса
 *
 * @see org.baileyseyes._3.__start_from_here__.HelloJavaClassTypes Следующая часть
 * @see ConstantsClass Предыдущая часть
 */
public interface ConstantInterface {

    String HELLO = "hello"; //все поля public static final по дефолту, поэтому можно не прописывать. Подходит для создания констант.
}
