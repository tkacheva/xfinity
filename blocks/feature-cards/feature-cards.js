/**
 * feature-cards — "Award-winning WiFi + Mobile" 2-up photo cards.
 * Row 0: section-heading | CTA (link)
 * Rows 1..n (one per card): card-heading | link | bg-image-url
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const headCells = rows[0] ? [...rows[0].children] : [];
  const head = headCells[0] ? headCells[0].innerHTML.trim() : '';
  const headCta = headCells[1];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'fc-wrap';
  wrap.innerHTML = `<div class="fc-head"><h2>${head}</h2><div class="fc-head-actions"></div></div><div class="fc-grid"></div>`;
  const ha = wrap.querySelector('.fc-head-actions');
  if (headCta) [...headCta.childNodes].forEach((n) => ha.append(n.cloneNode(true)));
  const grid = wrap.querySelector('.fc-grid');
  rows.slice(1).forEach((row) => {
    const c = [...row.children];
    const title = c[0] ? c[0].textContent.trim() : '';
    const img = c[c.length - 1] ? c[c.length - 1].textContent.trim() : '';
    // 3 cells: heading | link | image (legacy). 4+ cells: heading | body | link | image.
    const body = c.length >= 4 && c[1] ? c[1].innerHTML.trim() : '';
    const linkCell = c.length >= 4 ? c[2] : c[1];
    const card = document.createElement('div');
    card.className = 'fc-card';
    if (img) card.style.backgroundImage = `linear-gradient(180deg, rgb(39 14 72 / 15%), rgb(39 14 72 / 55%)), url('${img}')`;
    card.innerHTML = `<h3>${title}</h3>${body ? `<p class="fc-body">${body}</p>` : ''}<div class="fc-card-actions"></div>`;
    const ca = card.querySelector('.fc-card-actions');
    if (linkCell) [...linkCell.childNodes].forEach((n) => ca.append(n.cloneNode(true)));
    grid.append(card);
  });
  block.append(wrap);
}
