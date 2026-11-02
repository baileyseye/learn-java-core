package org.baileyseyes._3.annotation;

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

}
