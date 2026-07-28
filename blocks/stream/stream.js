/**
 * stream — "Streaming, simplified" purple app-bundle band.
 * One row, cells: section-heading | card-heading | card-body | CTA (link)
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const val = (i) => (c[i] ? c[i].textContent.trim() : '');
  const ctaCell = c[3];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'stream-wrap';
  wrap.innerHTML = `<h2>${val(0)}</h2>
    <div class="stream-band"><div class="stream-copy"><h3>${val(1)}</h3><p>${val(2)}</p><div class="stream-actions"></div></div></div>`;
  const actions = wrap.querySelector('.stream-actions');
  if (ctaCell) [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
  block.append(wrap);
}
