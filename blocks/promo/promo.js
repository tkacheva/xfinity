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
/* Per-image focal point overrides (keyed by filename substring) so the
   subject isn't cropped by the default vertical-centred fill. Default is
   "center right" (copy sits left, subject shows right). */
const FOCAL = [
  ['Solution_2', 'right 15%'], // home-solutions: woman at smart door
  ['homephone-overview-half-image-1', 'right 20%'], // home-phone: woman laughing
  ['homephone-overview-half-image-2', 'center 15%'], // features: woman in red
  ['tonight-show', 'center 22%'], // membership: keep face in frame
  ['3UPMetablock-Card_Generic-Phone', 'center 22%'], // plan-builder: smiling woman
  ['Metablock_Card2_Mobile', 'center bottom'], // xumo: keep the stream box in view
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
