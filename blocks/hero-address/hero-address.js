/**
 * hero-address — Xfinity availability-check hero (the site's real hero).
 * One row, cells: heading | input-placeholder | button-label | member-line (may hold a link)
 * NOTE: reproduces the captured shell state; the live plan-builder widget is wired at delivery.
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  // prefer an authored heading element (server-rendered <h1> for SEO)
  const authoredH = c[0] ? c[0].querySelector('h1, h2, h3') : null;
  const heading = authoredH ? authoredH.textContent.trim() : (c[0] ? c[0].textContent.trim() : '');
  const placeholder = c[1] ? c[1].textContent.trim() : '';
  const btn = c[2] ? c[2].textContent.trim() : 'Find My Plan';
  const memberCell = c[3];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'hero-address-wrap';
  wrap.innerHTML = `
    <h1>${heading}</h1>
    <div class="ha-form">
      <div class="ha-field">
        <label>Street address and apartment</label>
        <input type="text" placeholder="${placeholder}" aria-label="Street address and apartment">
      </div>
      <button type="button" class="ha-btn">${btn}</button>
    </div>
    <p class="ha-member"></p>`;
  const member = wrap.querySelector('.ha-member');
  if (memberCell) [...memberCell.childNodes].forEach((n) => member.append(n.cloneNode(true)));
  block.append(wrap);
}
