/**
 * page-title — Xfinity product page title (purple H1) + optional locator strip.
 * Row 1: title (becomes the page <h1>)
 * Row 2 (optional): locator text | locator-link
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const title = rows[0] ? rows[0].textContent.trim() : '';
  const locRow = rows[1] ? [...rows[1].children] : [];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'page-title-wrap';
  if (locRow.length) {
    const loc = document.createElement('div');
    loc.className = 'pt-locator';
    loc.append(document.createTextNode(`${locRow[0] ? locRow[0].textContent.trim() : ''} `));
    if (locRow[1]) [...locRow[1].childNodes].forEach((n) => loc.append(n.cloneNode(true)));
    wrap.append(loc);
  }
  const h1 = document.createElement('h1');
  h1.textContent = title;
  wrap.append(h1);
  block.append(wrap);
}
