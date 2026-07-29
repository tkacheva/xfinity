/**
 * center-hero — editorial hero: full-width image band on top, centered copy below
 * (matches xfinity.com learn L2 feature pages).
 * Cells: image-url | eyebrow | heading | lede | CTA (link, optional)
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const val = (i) => (c[i] ? c[i].textContent.trim() : '');
  const linkCell = c[4];
  const img = val(0);

  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'ch-wrap';
  wrap.innerHTML = `
    <div class="ch-media"${img ? ` style="background-image:url('${img}')"` : ''}></div>
    <div class="ch-copy">
      ${val(1) ? `<p class="ch-eyebrow">${val(1)}</p>` : ''}
      <h1>${val(2)}</h1>
      ${val(3) ? `<p class="ch-lede">${val(3)}</p>` : ''}
      <div class="ch-actions"></div>
    </div>`;
  if (linkCell) [...linkCell.childNodes].forEach((n) => wrap.querySelector('.ch-actions').append(n.cloneNode(true)));
  block.append(wrap);
}
