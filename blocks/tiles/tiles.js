/**
 * tiles — Xfinity product row (Internet / Mobile / TV / Home Security / Build your plan).
 * One row per tile. Cells: image-url | label | href
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';
  const grid = document.createElement('div');
  grid.className = 'tiles-grid';
  rows.forEach((row) => {
    const c = [...row.children];
    const img = c[0] ? c[0].textContent.trim() : '';
    const label = c[1] ? c[1].textContent.trim() : '';
    const href = c[2] ? c[2].textContent.trim() : '#';
    const a = document.createElement('a');
    a.className = 'tile';
    a.href = href;
    a.innerHTML = `<span class="tile-img"${img ? ` style="background-image:url('${img}')"` : ''}></span><span class="tile-label">${label}</span>`;
    grid.append(a);
  });
  block.append(grid);
}
