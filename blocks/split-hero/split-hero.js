/**
 * split-hero — moving offer hero: purple band with copy + big price on the left,
 * a photo on the right, and a full-width sign-in bar below.
 * Row 1 (hero): heading | lede | price | price-suffix | primary CTA (link) | secondary (link) | fineprint | image-url
 * Row 2 (sign-in bar, optional): heading | body | CTA (link)
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const r0 = rows[0] ? [...rows[0].children] : [];
  const html = (el) => (el ? el.innerHTML.trim() : '');
  const txt = (el) => (el ? el.textContent.trim() : '');
  const img = txt(r0[7]);

  block.textContent = '';

  const hero = document.createElement('div');
  hero.className = 'sph-hero';
  hero.innerHTML = `
    <div class="sph-copy">
      <h1>${html(r0[0])}</h1>
      ${txt(r0[1]) ? `<p class="sph-lede">${html(r0[1])}</p>` : ''}
      ${txt(r0[2]) ? `<div class="sph-price"><span class="sph-amt">${txt(r0[2])}</span>${txt(r0[3]) ? `<span class="sph-suf">${txt(r0[3])}</span>` : ''}</div>` : ''}
      <div class="sph-actions"></div>
      ${txt(r0[6]) ? `<p class="sph-fine">${html(r0[6])}</p>` : ''}
    </div>
    <div class="sph-art"${img ? ` style="background-image:url('${img}')"` : ''}></div>`;
  const acts = hero.querySelector('.sph-actions');
  [r0[4], r0[5]].forEach((cell) => { if (cell) [...cell.childNodes].forEach((n) => acts.append(n.cloneNode(true))); });
  block.append(hero);

  if (rows[1]) {
    const c = [...rows[1].children];
    const bar = document.createElement('div');
    bar.className = 'sph-signin';
    bar.innerHTML = `<div class="sph-signin-inner"><div class="sph-signin-copy"><h3>${txt(c[0])}</h3>${txt(c[1]) ? `<p>${txt(c[1])}</p>` : ''}</div><div class="sph-signin-cta"></div></div>`;
    if (c[2]) [...c[2].childNodes].forEach((n) => bar.querySelector('.sph-signin-cta').append(n.cloneNode(true)));
    block.append(bar);
  }
}
