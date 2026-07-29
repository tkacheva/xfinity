/**
 * icon-features — centered icon feature grid (N-up, responsive).
 * One row per feature. Cells: icon-key | heading | body | CTA (link, optional)
 * Icons ship in the block (DA strips inline SVG from content). Section heading,
 * if any, is authored as default content ABOVE the block.
 * Variant: `icon-features (grey)` renders on a full-bleed grey band.
 */
const ICONS = {
  portal: '<rect x="3" y="4.5" width="18" height="12" rx="1.5"/><path d="M2 20h20M9.5 20l.5-3.5h4l.5 3.5"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="1.5"/><path d="M8 21h8"/><path d="m11 9 4 2.5-4 2.5z" fill="currentColor" stroke="none"/>',
  block: '<circle cx="12" cy="12" r="8.2"/><path d="m6.2 6.2 11.6 11.6"/>',
  number: '<path d="M6.5 3.5h3.2l1.3 4.6-2 1.2a12.5 12.5 0 0 0 5.7 5.7l1.2-2 4.6 1.3v3.2a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.5 5.6a2 2 0 0 1 2-2.1z"/>',
  e911: '<path d="M12 3.2 4.5 6v5.2c0 4.8 3.2 8.3 7.5 9.6 4.3-1.3 7.5-4.8 7.5-9.6V6z"/><path d="M12 8v4M12 15h.01"/>',
  phone: '<path d="M6.5 3.5h3.2l1.3 4.6-2 1.2a12.5 12.5 0 0 0 5.7 5.7l1.2-2 4.6 1.3v3.2a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.5 5.6a2 2 0 0 1 2-2.1z"/>',
  check: '<circle cx="12" cy="12" r="8.2"/><path d="m8.5 12 2.4 2.4 4.6-4.8"/>',
};

function icon(key) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[key] || ICONS.check}</svg>`;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'ifx-wrap';
  // an optional leading single-cell row is the centered section heading
  let items = rows;
  if (rows[0] && [...rows[0].children].length === 1) {
    const head = document.createElement('div');
    head.className = 'ifx-head';
    head.innerHTML = rows[0].children[0].innerHTML;
    wrap.append(head);
    items = rows.slice(1);
  }
  const grid = document.createElement('div');
  grid.className = 'ifx-grid';
  grid.style.setProperty('--n', items.length);
  items.forEach((row) => {
    const c = [...row.children];
    const key = (c[0] ? c[0].textContent.trim() : '').toLowerCase();
    const heading = c[1] ? c[1].innerHTML.trim() : '';
    const body = c[2] ? c[2].innerHTML.trim() : '';
    const linkCell = c[3];
    const item = document.createElement('div');
    item.className = 'ifx-item';
    item.innerHTML = `<span class="ifx-icon">${icon(key)}</span><h3>${heading}</h3><p>${body}</p><div class="ifx-actions"></div>`;
    if (linkCell) [...linkCell.childNodes].forEach((n) => item.querySelector('.ifx-actions').append(n.cloneNode(true)));
    grid.append(item);
  });
  wrap.append(grid);
  block.append(wrap);
}
