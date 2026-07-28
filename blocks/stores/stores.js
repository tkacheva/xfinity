/**
 * stores — local store cards.
 * First row: section heading. Following rows: name | address | hours | link
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const head = rows[0] ? rows[0].textContent.trim() : '';
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'stores-wrap';
  wrap.innerHTML = `<h2>${head}</h2><div class="stores-grid"></div>`;
  const grid = wrap.querySelector('.stores-grid');
  rows.slice(1).forEach((row) => {
    const c = [...row.children];
    const card = document.createElement('div');
    card.className = 'store';
    card.innerHTML = `<h3>${c[0] ? c[0].textContent.trim() : ''}</h3>
      <p class="store-addr">${c[1] ? c[1].innerHTML.trim() : ''}</p>
      <p class="store-hours">${c[2] ? c[2].textContent.trim() : ''}</p>
      <div class="store-link"></div>`;
    if (c[3]) [...c[3].childNodes].forEach((n) => card.querySelector('.store-link').append(n.cloneNode(true)));
    grid.append(card);
  });
  block.append(wrap);
}
