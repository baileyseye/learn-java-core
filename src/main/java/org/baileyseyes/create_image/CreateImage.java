package org.baileyseyes.create_image;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class CreateImage {
    // Параметры изображения
    private static final int WIDTH = 600;
    private static final int HEIGHT = 600;
    private static final int MARGIN = 30;
    private static final int CIRCLE_RADIUS = 10;
    private static final int CIRCLE_SPACING = 20;
    private static final int ROW_HEIGHT = 35;
    private static final int MAX_PER_ROW = 15;  // Максимум кружочков в строке
    private static final int LABEL_TEXT_OFFSET_Y = 8;  // Выравнивание текста по вертикали

    public static void main(String[] args) {
        try {
            BufferedImage image = generateMedicationImage();
            File output = new File("medication_schedule.jpg");
            ImageIO.write(image, "jpg", output);
            System.out.println("Изображение успешно сохранено: " + output.getAbsolutePath());
        } catch (IOException e) {
            System.err.println("Ошибка при создании изображения: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static BufferedImage generateMedicationImage() {
        BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image.createGraphics();

        // Настройка рендеринга
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.setColor(Color.WHITE);
        g.fillRect(0, 0, WIDTH, HEIGHT);
        g.setColor(Color.BLACK);
        g.setStroke(new BasicStroke(1.5f));

        Font font = new Font("Arial", Font.BOLD, 16);
        g.setFont(font);

        String[] medications = {
            "Амоксиклав",
            "Флуконазол",
            "Мелоксикам",
            "Аципол",
            "Гепато"
        };

        int[] counts = {45, 45, 15, 45, 45};
        boolean[] twiceDaily = {true, true, true, false, false};

        int y = MARGIN;

        for (int i = 0; i < medications.length; i++) {
            int totalCircles = counts[i];
            int rows = (int) Math.ceil((double) totalCircles / MAX_PER_ROW);

            // === Координаты для первой строки кружочков ===
            int firstCircleRowY = y + ROW_HEIGHT / 2;

            // === Рисуем название напротив первой строки кружочков ===
            g.drawString(medications[i], MARGIN, firstCircleRowY + LABEL_TEXT_OFFSET_Y);

            // === Рисуем кружочки, начиная с позиции справа от названия ===
            int currentY = firstCircleRowY;

            for (int row = 0; row < rows; row++) {
                int startX = MARGIN + 130;  // Сдвигаем кружочки правее
                int startCircle = row * MAX_PER_ROW;
                int endCircle = Math.min(startCircle + MAX_PER_ROW, totalCircles);

                for (int j = startCircle; j < endCircle; j++) {
                    int circleX = startX + (j - startCircle) * CIRCLE_SPACING;
                    int circleY = currentY;

                    g.drawOval(circleX - CIRCLE_RADIUS, circleY - CIRCLE_RADIUS,
                        2 * CIRCLE_RADIUS, 2 * CIRCLE_RADIUS);

                    if (twiceDaily[i]) {
                        g.drawLine(circleX, circleY - CIRCLE_RADIUS, circleX, circleY + CIRCLE_RADIUS);
                    }
                }

                currentY += ROW_HEIGHT; // Переход на следующую строку
            }

            // Перемещаем y на позицию после всех строк кружочков + небольшой отступ
            y = currentY + 10;
        }

        g.dispose();
        return image;
    }
}