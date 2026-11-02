package org.baileyseyes._4.exception;

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
}
