function fixSearchLabel() {
  const button = document.querySelector('button[data-open-modal]');
  if (!button) return;
  const visible = button.innerText.replace(/\s+/g, ' ').trim();
  if (visible) button.setAttribute('aria-label', visible);
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  button.title = `Поиск (${isMac ? '⌘K' : 'Ctrl+K'})`;
}

function localizeCopyButtons() {
  document.querySelectorAll('.expressive-code .copy button').forEach((button) => {
    if (button.dataset.localized === 'true') return;
    button.dataset.localized = 'true';
    button.title = 'Копировать';
    button.dataset.copied = 'Скопировано';
    button.setAttribute('aria-label', 'Копировать код');
  });
}

function enhance() {
  fixSearchLabel();
  localizeCopyButtons();
}

document.addEventListener('DOMContentLoaded', enhance);
document.addEventListener('astro:page-load', enhance);
enhance();
