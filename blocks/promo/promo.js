/**
 * promo — Xfinity signature purple campaign hero.
 * Authoring rows (each its own cell, one per row):
 *   1. eyebrow      (e.g. "Back to school event")
 *   2. heading      (e.g. "Our best price on WiFi is back")
 *   3. lede         (body sentence)
 *   4. guarantee    (e.g. "5 | year price guarantee"  — number | label, split on |)
 *   5. image URL    (OPTIONAL) — when present the hero uses this photo as a
 *      full-bleed background (with a legibility gradient) and shows the
 *      guarantee as a compact chip instead of the oversized numeral.
 */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const val = (i) => (cells[i] ? cells[i].textContent.trim() : '');
  const img = val(4);
  const [num, ...rest] = val(3).split('|').map((s) => s.trim());
  const label = rest.join(' ');

  block.textContent = '';
  const inner = document.createElement('div');
  inner.className = 'promo-inner';

  if (img) {
    block.classList.add('has-hero-img');
    block.style.setProperty('--hero-img', `url('${img}')`);
    inner.innerHTML = `
      <div class="promo-copy">
        <p class="eyebrow">${val(0)}</p>
        <h2>${val(1)}</h2>
        <p class="lede">${val(2)}</p>
        ${num ? `<p class="promo-chip"><span>${num}</span>${label ? `&nbsp;${label}` : ''}</p>` : ''}
      </div>`;
  } else {
    inner.innerHTML = `
      <div class="promo-copy">
        <p class="eyebrow">${val(0)}</p>
        <h2>${val(1)}</h2>
        <p class="lede">${val(2)}</p>
      </div>
      <div class="promo-guar"><span class="num">${num || ''}</span><span class="lbl">${label.replace(/\s(?=\S+$)/, '<br>')}</span></div>`;
  }
  block.append(inner);
}
