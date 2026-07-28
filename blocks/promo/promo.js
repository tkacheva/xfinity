/**
 * promo — Xfinity signature purple campaign band with oversized numeral.
 * Authoring rows (each its own cell, one per row):
 *   1. eyebrow      (e.g. "Back to school event")
 *   2. heading      (e.g. "Our best price on WiFi is back")
 *   3. lede         (body sentence)
 *   4. guarantee    (e.g. "5 | year price guarantee"  — number | label, split on |)
 * Section background image is a CSS background (block CSS), fixed campaign asset.
 */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const val = (i) => (cells[i] ? cells[i].textContent.trim() : '');
  const [num, ...rest] = val(3).split('|').map((s) => s.trim());
  const label = rest.join(' ');

  block.textContent = '';
  const inner = document.createElement('div');
  inner.className = 'promo-inner';
  inner.innerHTML = `
    <div class="promo-copy">
      <p class="eyebrow">${val(0)}</p>
      <h2>${val(1)}</h2>
      <p class="lede">${val(2)}</p>
    </div>
    <div class="promo-guar"><span class="num">${num || ''}</span><span class="lbl">${label.replace(/\s(?=\S+$)/, '<br>')}</span></div>`;
  block.append(inner);
}
