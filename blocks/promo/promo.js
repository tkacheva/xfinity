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
/* Per-image background-position so the subject lands in the visible right panel
   (copy sits left, image shows right). Default is "center right". */
const FOCAL = [
  ['homephone-overview-half-image-1', 'right 20%'], // home-phone pillar: woman laughing
  ['BlueGateway', 'left center'], // internet equipment: gateway is centre-left → shift right
  ['2UP_Phone-Upgrades', 'left center'], // cell-phones: subject centre → shift right
];
/* Per-image zoom for centre-composed images whose subject would otherwise sit
   under the copy panel — enlarge so it moves into the right panel. */
const SIZE = [
  ['BlueGateway', '185% auto'],
  ['2UP_Phone-Upgrades', '150% auto'],
];

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
    const focal = FOCAL.find(([k]) => img.includes(k));
    if (focal) block.style.setProperty('--hero-pos', focal[1]);
    const size = SIZE.find(([k]) => img.includes(k));
    if (size) block.style.setProperty('--hero-size', size[1]);
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
