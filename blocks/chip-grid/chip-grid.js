/**
 * chip-grid — "Get Even More" grid of channel/label chips.
 * First row: section heading. Following rows: a single label per row.
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const head = rows[0] ? rows[0].textContent.trim() : '';
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'cg-wrap';
  wrap.innerHTML = `<h2>${head}</h2><div class="cg-grid"></div>`;
  const grid = wrap.querySelector('.cg-grid');
  rows.slice(1).forEach((row) => {
    const chip = document.createElement('div');
    chip.className = 'cg-chip';
    chip.textContent = row.textContent.trim();
    grid.append(chip);
  });
  block.append(wrap);
}
