/**
 * compare-table — plan/feature comparison table.
 * Optional leading single-cell row: section heading.
 * Next row: column headers (feature label cell | one cell per plan).
 * Following rows: feature name | one value cell per plan.
 */
export default function decorate(block) {
  let rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'ct-wrap';

  if (rows[0] && [...rows[0].children].length === 1) {
    const h2 = document.createElement('h2');
    h2.innerHTML = rows[0].children[0].innerHTML;
    wrap.append(h2);
    rows = rows.slice(1);
  }

  const table = document.createElement('table');
  const [headRow, ...bodyRows] = rows;
  if (headRow) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    [...headRow.children].forEach((cell) => {
      const th = document.createElement('th');
      th.innerHTML = cell.innerHTML.trim();
      tr.append(th);
    });
    thead.append(tr);
    table.append(thead);
  }

  const tbody = document.createElement('tbody');
  bodyRows.forEach((row) => {
    const c = [...row.children];
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerHTML = c[0] ? c[0].innerHTML.trim() : '';
    tr.append(th);
    c.slice(1).forEach((cell) => {
      const td = document.createElement('td');
      td.innerHTML = cell.innerHTML.trim();
      tr.append(td);
    });
    tbody.append(tr);
  });
  table.append(tbody);
  wrap.append(table);
  block.append(wrap);
}
