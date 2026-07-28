/**
 * feature-rows — alternating text/media rows (accessibility, moving, etc.).
 * One row per feature. Cells: eyebrow | heading | body | link | image-url
 * Even rows put media on the right, odd rows on the left.
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'fr-wrap';
  rows.forEach((row, i) => {
    const c = [...row.children];
    const eyebrow = c[0] ? c[0].textContent.trim() : '';
    const heading = c[1] ? c[1].textContent.trim() : '';
    const body = c[2] ? c[2].textContent.trim() : '';
    const linkCell = c[3];
    const img = c[4] ? c[4].textContent.trim() : '';
    const feat = document.createElement('div');
    feat.className = `fr-row${i % 2 ? ' reverse' : ''}`;
    feat.innerHTML = `
      <div class="fr-art"${img ? ` style="background-image:url('${img}')"` : ''}></div>
      <div class="fr-copy">
        ${eyebrow ? `<p class="fr-eyebrow">${eyebrow}</p>` : ''}
        <h2>${heading}</h2>
        ${body ? `<p>${body}</p>` : ''}
        <div class="fr-actions"></div>
      </div>`;
    if (linkCell) [...linkCell.childNodes].forEach((n) => feat.querySelector('.fr-actions').append(n.cloneNode(true)));
    wrap.append(feat);
  });
  block.append(wrap);
}
