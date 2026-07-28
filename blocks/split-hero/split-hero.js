/**
 * split-hero — moving/program purple split hero with a sign-in card.
 * One row, cells: heading | body | CTA (link) | card-heading | card-body | card-CTA (link)
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const val = (i) => (c[i] ? c[i].innerHTML.trim() : '');
  block.textContent = '';
  const inner = document.createElement('div');
  inner.className = 'split-hero-inner';
  inner.innerHTML = `
    <div class="sph-copy">
      <h1>${val(0)}</h1>
      ${val(1) ? `<p>${val(1)}</p>` : ''}
      <div class="sph-actions"></div>
    </div>
    <div class="sph-card">
      <h3>${val(3)}</h3>
      ${val(4) ? `<p>${val(4)}</p>` : ''}
      <div class="sph-card-actions"></div>
    </div>`;
  if (c[2]) [...c[2].childNodes].forEach((n) => inner.querySelector('.sph-actions').append(n.cloneNode(true)));
  if (c[5]) [...c[5].childNodes].forEach((n) => inner.querySelector('.sph-card-actions').append(n.cloneNode(true)));
  block.append(inner);
}
