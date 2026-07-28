/**
 * support-cards — grid of support category cards.
 * First row: section heading (single cell) — optional.
 * Following rows (one per card): title | links (a <ul>) or body | view-link
 * Variant: support-cards.triad for a 3-up with description instead of links.
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  let start = 0;
  let head = '';
  if (rows[0] && rows[0].children.length === 1 && !rows[0].querySelector('ul, a')) {
    head = rows[0].textContent.trim();
    start = 1;
  }
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'sc-wrap';
  wrap.innerHTML = `${head ? `<h2>${head}</h2>` : ''}<div class="sc-grid"></div>`;
  const grid = wrap.querySelector('.sc-grid');
  rows.slice(start).forEach((row) => {
    const c = [...row.children];
    const title = c[0] ? c[0].textContent.trim() : '';
    const midCell = c[1];
    const viewCell = c[2];
    const card = document.createElement('div');
    card.className = 'sc-card';
    card.innerHTML = `<h3>${title}</h3><div class="sc-mid"></div><div class="sc-view"></div>`;
    if (midCell) [...midCell.childNodes].forEach((n) => card.querySelector('.sc-mid').append(n.cloneNode(true)));
    if (viewCell) [...viewCell.childNodes].forEach((n) => card.querySelector('.sc-view').append(n.cloneNode(true)));
    grid.append(card);
  });
  block.append(wrap);
}
