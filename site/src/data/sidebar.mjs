import { modules, lessonsOfModule, extrasOfModule } from './course.mjs';

export const sidebar = [
  {
    label: 'Старт',
    items: [
      { label: 'Как учиться', link: '/start/' },
      { label: 'Запуск в IntelliJ IDEA', link: '/start/ide/' }
    ]
  },
  ...modules.map((module) => ({
    label: `${module.number}. ${module.title}`,
    collapsed: true,
    items: [
      { label: 'Обзор модуля', link: `/modules/${module.number}/` },
      ...lessonsOfModule(module.number).map((lesson) => ({
        label: `${lesson.order}. ${lesson.title}`,
        link: `/lessons/${lesson.id}/`,
        attrs: { 'data-lesson-id': lesson.id }
      })),
      ...(extrasOfModule(module.number).length
        ? [
            {
              label: 'Дополнительно',
              collapsed: true,
              items: extrasOfModule(module.number).map((extra) => ({
                label: extra.title,
                link: `/reference/${extra.id}/`,
                attrs: { 'data-extra-id': extra.id }
              }))
            }
          ]
        : [])
    ]
  })),
  {
    label: 'Прогресс',
    items: [
      { label: 'Мой прогресс', link: '/progress/' },
      { label: 'Что дальше', link: '/next/' }
    ]
  },
  {
    label: 'Для автора',
    collapsed: true,
    items: [
      { label: 'Как устроен курс', link: '/contributors/' },
      { label: 'Инвентарь файлов', link: '/contributors/inventory/' },
      { label: 'Карта маршрута', link: '/contributors/route/' }
    ]
  }
];
