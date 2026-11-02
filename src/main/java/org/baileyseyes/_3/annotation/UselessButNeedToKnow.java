package org.baileyseyes._3.annotation;

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

}
