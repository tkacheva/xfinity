/**
 * video-hero — full-bleed autoplay background video with centered copy.
 * Cells: video-url | heading | lede | CTA (link) | subnote (link, optional)
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const val = (i) => (c[i] ? c[i].textContent.trim() : '');
  const src = val(0);
  const ctaCell = c[3];
  const subCell = c[4];

  block.textContent = '';
  if (src) {
    const v = document.createElement('video');
    v.className = 'vh-video';
    v.autoplay = true; v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    v.src = src;
    block.append(v);
  }
  const inner = document.createElement('div');
  inner.className = 'vh-inner';
  inner.innerHTML = `
    <div class="vh-copy">
      <h1>${val(1)}</h1>
      ${val(2) ? `<p class="vh-lede">${val(2)}</p>` : ''}
      <div class="vh-actions"></div>
      <p class="vh-sub"></p>
    </div>`;
  if (ctaCell) [...ctaCell.childNodes].forEach((n) => inner.querySelector('.vh-actions').append(n.cloneNode(true)));
  if (subCell) [...subCell.childNodes].forEach((n) => inner.querySelector('.vh-sub').append(n.cloneNode(true)));
  block.append(inner);
}
