import { modules, moduleByNumber } from './modules.mjs';
import module1 from './lessons/module-1.mjs';
import module2 from './lessons/module-2.mjs';
import module3 from './lessons/module-3.mjs';
import module4 from './lessons/module-4.mjs';
import module5 from './lessons/module-5.mjs';
import module6 from './lessons/module-6.mjs';
import module7 from './lessons/module-7.mjs';
import module8 from './lessons/module-8.mjs';
import extras from './extras.mjs';
import { practiceExtras } from './practice.mjs';

const groups = [module1, module2, module3, module4, module5, module6, module7, module8];

let runningOrder = 0;
export const lessons = groups.flatMap((group, index) =>
  group.map((lesson) => {
    const practice = {
      ...lesson.practice,
      ...(practiceExtras[lesson.id] ?? {})
    };
    return {
      ...lesson,
      module: index + 1,
      order: ++runningOrder,
      practice
    };
  })
);

const seen = new Set();
for (const lesson of lessons) {
  if (seen.has(lesson.id)) throw new Error(`Дублирующийся id урока: ${lesson.id}`);
  seen.add(lesson.id);
  if (!moduleByNumber.has(lesson.module)) throw new Error(`Урок ${lesson.id} ссылается на неизвестный модуль ${lesson.module}`);
  if (!lesson.sources?.length) throw new Error(`У урока ${lesson.id} нет sources`);
}

for (const id of Object.keys(practiceExtras)) {
  if (!seen.has(id)) throw new Error(`practiceExtras: неизвестный урок ${id}`);
}

export const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
export const extraById = new Map(extras.map((extra) => [extra.id, extra]));

for (const extra of extras) {
  if (!moduleByNumber.has(extra.module)) {
    throw new Error(`Дополнение ${extra.id} ссылается на неизвестный модуль ${extra.module}`);
  }
  if (!lessonById.has(extra.relatedLesson)) {
    throw new Error(`Дополнение ${extra.id} ссылается на неизвестный урок ${extra.relatedLesson}`);
  }
}

export function lessonsOfModule(moduleNumber) {
  return lessons.filter((lesson) => lesson.module === moduleNumber);
}

export function extrasOfModule(moduleNumber) {
  return extras.filter((extra) => extra.module === moduleNumber);
}

export function moduleOfLesson(lesson) {
  return moduleByNumber.get(lesson.module);
}

export function adjacentLessons(lessonId) {
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null
  };
}

export function firstLessonOfModule(moduleNumber) {
  return lessonsOfModule(moduleNumber)[0] ?? null;
}

export function lessonCountLabel(count) {
  const lastTwo = Math.abs(count) % 100;
  const last = lastTwo % 10;
  if (lastTwo > 10 && lastTwo < 20) return 'уроков';
  if (last === 1) return 'урок';
  if (last >= 2 && last <= 4) return 'урока';
  return 'уроков';
}

export const courseStats = {
  modules: modules.length,
  lessons: lessons.length,
  extras: extras.length,
  sourceFiles: new Set([
    ...lessons.flatMap((lesson) => lesson.sources.map((source) => source.file)),
    ...extras.map((extra) => extra.file)
  ]).size
};

export { modules, moduleByNumber, extras };
