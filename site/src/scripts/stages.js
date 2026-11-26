const STAGE_SECTIONS = [
  ['goal', 0],
  ['ideas', 0],
  ['code', 1],
  ['output', 1],
  ['practice', 2],
  ['quiz', 3],
  ['full', 3]
];

let scheduled = false;

function cssLengthPx(name, fallback = 0) {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue(name).trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) return fallback;
  if (raw.endsWith('rem')) {
    const rootFont = parseFloat(getComputedStyle(root).fontSize);
    return value * (Number.isFinite(rootFont) ? rootFont : 16);
  }
  return value;
}

function stickyOffset() {
  return cssLengthPx('--sl-nav-height', 56) + cssLengthPx('--sl-mobile-toc-height', 0);
}

function updateRail(rail) {
  const items = [...rail.querySelectorAll('[data-stage]')];
  if (!items.length) return;

  const links = items.map((item) => item.querySelector('[data-stage-link]'));
  const fill = rail.querySelector('[data-stages-fill]');
  const offset = stickyOffset() + rail.getBoundingClientRect().height + 24;

  let active = 0;
  for (const [id, stage] of STAGE_SECTIONS) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= offset) {
      active = Math.max(active, stage);
    }
  }

  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) active = items.length - 1;

  items.forEach((item, index) => {
    const link = links[index];
    item.classList.toggle('is-active', index === active);
    item.classList.toggle('is-done', index < active);
    if (link) {
      if (index === active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    }
  });

  if (fill) fill.style.width = `${((active + 1) / items.length) * 100}%`;
}

function updateAll() {
  document.querySelectorAll('[data-lesson-stages]').forEach(updateRail);
}

function scheduleUpdate() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    updateAll();
  });
}

window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate, { passive: true });
document.addEventListener('astro:page-load', scheduleUpdate);
document.addEventListener('DOMContentLoaded', scheduleUpdate);
scheduleUpdate();
