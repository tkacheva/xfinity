/**
 * faq — Xfinity FAQ card grid.
 * First row: section heading (single cell).
 * Following rows (one per Q/A): question | answer
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const head = rows[0] ? rows[0].textContent.trim() : '';
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'faq-wrap';
  wrap.innerHTML = `<h2>${head}</h2><div class="faq-grid"></div>`;
  const grid = wrap.querySelector('.faq-grid');
  rows.slice(1).forEach((row) => {
    const c = [...row.children];
    const q = c[0] ? c[0].textContent.trim() : '';
    const a = c[1] ? c[1].innerHTML.trim() : '';
    const card = document.createElement('div');
    card.className = 'faq-card';
    card.innerHTML = `<h3>${q}</h3><p>${a}</p>`;
    grid.append(card);
  });
  block.append(wrap);
}
