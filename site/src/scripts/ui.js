function fixSearchLabel() {
  const button = document.querySelector('button[data-open-modal]');
  if (!button) return;
  const visible = button.innerText.replace(/\s+/g, ' ').trim();
  if (visible) button.setAttribute('aria-label', visible);
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  button.title = `Поиск (${isMac ? '⌘K' : 'Ctrl+K'})`;
}

document.addEventListener('DOMContentLoaded', fixSearchLabel);
document.addEventListener('astro:page-load', fixSearchLabel);
fixSearchLabel();
