/**
 * leaf-hero — SVOD/product-leaf dark hero with a buy card.
 * One row, cells: eyebrow | title | lede | quote | price-number | CTA (link)
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const val = (i) => (c[i] ? c[i].textContent.trim() : '');
  const ctaCell = c[5];
  block.textContent = '';
  const inner = document.createElement('div');
  inner.className = 'leaf-hero-inner';
  inner.innerHTML = `
    <div class="lh-copy">
      ${val(0) ? `<p class="lh-eyebrow">${val(0)}</p>` : ''}
      <h1>${val(1)}</h1>
      ${val(2) ? `<p class="lh-lede">${val(2)}</p>` : ''}
      ${val(3) ? `<p class="lh-quote">${val(3)}</p>` : ''}
    </div>
    <div class="lh-card">
      <h3>${val(1)}</h3>
      <div class="lh-price"><span class="amt"><sup>$</sup>${val(4)}</span><span class="per">/mo</span></div>
      <div class="lh-actions"></div>
    </div>`;
  if (ctaCell) [...ctaCell.childNodes].forEach((n) => inner.querySelector('.lh-actions').append(n.cloneNode(true)));
  block.append(inner);
}
