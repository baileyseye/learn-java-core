const STORAGE_KEY = 'ljc.progress.v1';

function readProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function writeProgress(ids) {
  const unique = [...new Set(ids.filter((id) => typeof id === 'string'))];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
  } catch {
    /* localStorage может быть недоступен */
  }
  decorate();
}

function getManifest() {
  const node = document.getElementById('course-manifest');
  if (!node) return null;
  try {
    const data = JSON.parse(node.textContent || '');
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function setStatus(message) {
  document.querySelectorAll('[data-progress-status]').forEach((node) => {
    node.textContent = message;
  });
}

function decorate() {
  const done = new Set(readProgress());
  const manifest = getManifest();

  document.querySelectorAll('[data-lesson-id]').forEach((node) => {
    const id = node.getAttribute('data-lesson-id');
    const isDone = id ? done.has(id) : false;
    node.classList.toggle('is-done', isDone);

    if (node.hasAttribute('data-progress-toggle')) {
      node.setAttribute('aria-pressed', isDone ? 'true' : 'false');
      const label = node.querySelector('[data-progress-label]');
      if (label) {
        const todo = node.getAttribute('data-label-todo') || 'Отметить пройденным';
        const doneLabel = node.getAttribute('data-label-done') || 'Пройдено — снять отметку';
        label.textContent = isDone ? doneLabel : todo;
      }
      node.classList.toggle('is-complete', isDone);
    }
  });

  document.querySelectorAll('[data-progress-scope]').forEach((scope) => {
    let ids = [];
    try {
      const parsed = JSON.parse(scope.getAttribute('data-progress-scope') || '[]');
      if (Array.isArray(parsed)) ids = parsed;
    } catch {
      ids = [];
    }
    const completed = ids.filter((id) => done.has(id)).length;
    const total = ids.length;
    const countEl = scope.querySelector('[data-progress-count]');
    if (countEl) countEl.textContent = String(completed);
    const totalEl = scope.querySelector('[data-progress-total]');
    if (totalEl) totalEl.textContent = String(total);
    const fill = scope.querySelector('[data-progress-fill]');
    if (fill) fill.style.width = total ? `${Math.round((completed / total) * 100)}%` : '0%';
    const bar = scope.querySelector('[role="progressbar"]');
    if (bar) bar.setAttribute('aria-valuenow', String(completed));
    scope.classList.toggle('is-complete', total > 0 && completed === total);
  });

  document.querySelectorAll('[data-progress-chip]').forEach((chip) => {
    const ids = manifest ? manifest.map((item) => item.id) : done.size ? [...done] : [];
    const completed = ids.filter((id) => done.has(id)).length;
    chip.textContent = `${completed}/${ids.length}`;
  });

  const continueLinks = document.querySelectorAll('[data-continue-link]');
  if (manifest && continueLinks.length) {
    const next = manifest.find((item) => !done.has(item.id));
    continueLinks.forEach((link) => {
      const label = link.querySelector('[data-continue-label]');
      if (next) {
        link.href = next.url;
        link.removeAttribute('data-complete');
        if (label) {
          label.textContent = done.size > 0 ? `Продолжить: урок ${next.order}` : `Начать: урок ${next.order}`;
        }
        link.title = `${next.order}. ${next.title}`;
      } else {
        link.href = link.getAttribute('data-finished-url') || link.href;
        link.setAttribute('data-complete', 'true');
        if (label) label.textContent = 'Курс пройден — что дальше?';
      }
    });
  }
}

function toggleLesson(id) {
  if (!id) return;
  const ids = readProgress();
  const index = ids.indexOf(id);
  if (index >= 0) ids.splice(index, 1);
  else ids.push(id);
  writeProgress(ids);
}

function resetProgress() {
  if (!window.confirm('Сбросить весь прогресс? Это действие нельзя отменить.')) return;
  writeProgress([]);
  setStatus('Прогресс сброшен.');
}

function exportProgress() {
  const area = document.querySelector('[data-progress-io]');
  const json = JSON.stringify(readProgress());
  if (area) area.value = json;
  setStatus('Текст прогресса — в поле ниже.');
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(json).then(
      () => setStatus('Прогресс скопирован в буфер обмена.'),
      () => setStatus('Не удалось скопировать — скопируйте текст из поля вручную.')
    );
  }
}

function importProgress() {
  const area = document.querySelector('[data-progress-io]');
  if (!area) return;
  let parsed;
  try {
    parsed = JSON.parse(area.value);
  } catch {
    setStatus('Не удалось разобрать JSON. Проверьте формат.');
    return;
  }
  if (!Array.isArray(parsed)) {
    setStatus('Ожидается JSON-массив id уроков.');
    return;
  }
  const known = getManifest();
  const allowed = known ? new Set(known.map((item) => item.id)) : null;
  const ids = parsed
    .filter((id) => typeof id === 'string')
    .filter((id) => !allowed || allowed.has(id));
  writeProgress(ids);
  setStatus(`Импортировано уроков: ${readProgress().length}.`);
}

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const toggle = target.closest('[data-progress-toggle]');
  if (toggle) {
    event.preventDefault();
    toggleLesson(toggle.getAttribute('data-lesson-id'));
    return;
  }
  if (target.closest('[data-progress-reset]')) {
    event.preventDefault();
    resetProgress();
    return;
  }
  if (target.closest('[data-progress-export]')) {
    event.preventDefault();
    exportProgress();
    return;
  }
  if (target.closest('[data-progress-import]')) {
    event.preventDefault();
    importProgress();
  }
});

window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY) decorate();
});

document.addEventListener('DOMContentLoaded', decorate);
document.addEventListener('astro:page-load', decorate);
decorate();
