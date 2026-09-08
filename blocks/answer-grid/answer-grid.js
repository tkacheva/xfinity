/**
 * answer-grid — direct-answer verdict cards for a specific query (AEO).
 * Optional leading single-cell row: section heading.
 * Optional next single-cell row: intro lede paragraph.
 * Following rows, one per item: status ("Included" / "Not offered") | heading | body
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'ag-wrap';

  let items = rows;
  if (items[0] && [...items[0].children].length === 1) {
    const h2 = document.createElement('h2');
    h2.innerHTML = items[0].children[0].innerHTML;
    wrap.append(h2);
    items = items.slice(1);
  }
  if (items[0] && [...items[0].children].length === 1) {
    const lede = document.createElement('p');
    lede.className = 'ag-lede';
    lede.innerHTML = items[0].children[0].innerHTML;
    wrap.append(lede);
    items = items.slice(1);
  }

  const grid = document.createElement('div');
  grid.className = 'ag-grid';
  items.forEach((row) => {
    const c = [...row.children];
    const status = c[0] ? c[0].textContent.trim() : '';
    const heading = c[1] ? c[1].innerHTML.trim() : '';
    const body = c[2] ? c[2].innerHTML.trim() : '';
    const negative = /not|no\b/i.test(status);
    const card = document.createElement('div');
    card.className = 'ag-card';
    card.innerHTML = `
      <span class="ag-badge ${negative ? 'no' : 'yes'}">${status}</span>
      <h3>${heading}</h3>
      <p>${body}</p>`;
    grid.append(card);
  });
  wrap.append(grid);
  block.append(wrap);
}
