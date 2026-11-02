package org.baileyseyes._3.interface_class.impl;

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
}
