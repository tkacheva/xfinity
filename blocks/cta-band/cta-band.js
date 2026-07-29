/**
 * cta-band — generic full-width purple CTA band (NOW, mobile-network exclusive, etc.).
 * One row, cells: eyebrow | heading | body | CTA (link) | bg-image-url (optional).
 * Variant classes: cta-band center|left|grey.
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const val = (i) => (c[i] ? c[i].textContent.trim() : '');
  const ctaCell = c[3];
  const bg = val(4);
  block.textContent = '';
  const inner = document.createElement('div');
  inner.className = 'cta-band-inner';
  if (bg) {
    block.classList.add('has-bg');
    inner.style.backgroundImage = `linear-gradient(105deg, rgb(39 14 72 / 82%), rgb(61 24 129 / 55%)), url('${bg}')`;
  }
  const eyebrow = val(0);
  inner.innerHTML = `${eyebrow ? `<p class="cta-eyebrow">${eyebrow}</p>` : ''}
    <h2>${val(1)}</h2>
    ${val(2) ? `<p class="cta-body">${val(2)}</p>` : ''}
    <div class="cta-band-actions"></div>`;
  const actions = inner.querySelector('.cta-band-actions');
  if (ctaCell) [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
  block.append(inner);
}
