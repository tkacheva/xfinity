/**
 * deals — "Get more with Xfinity" device-offer 4-up cross-promo.
 * First row: section heading (single cell).
 * Following rows (one per card): image-url | title | fine-print | CTA (link)
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const head = rows[0] ? rows[0].textContent.trim() : '';
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'deals-wrap';
  wrap.innerHTML = `<h2>${head}</h2><div class="deals-grid"></div>`;
  const grid = wrap.querySelector('.deals-grid');
  rows.slice(1).forEach((row) => {
    const c = [...row.children];
    const img = c[0] ? c[0].textContent.trim() : '';
    const title = c[1] ? c[1].textContent.trim() : '';
    const fine = c[2] ? c[2].textContent.trim() : '';
    const ctaCell = c[3];
    const card = document.createElement('div');
    card.className = 'deal';
    card.innerHTML = `<div class="deal-img"${img ? ` style="background-image:url('${img}')"` : ''} role="img" aria-label="${title}"></div>
      <div class="deal-body"><h3>${title}</h3><p class="deal-fine">${fine}</p><div class="deal-actions"></div></div>`;
    const actions = card.querySelector('.deal-actions');
    if (ctaCell) [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    grid.append(card);
  });
  block.append(wrap);
}
