/**
 * movers — "New home, same great service" mover strip.
 * One row, cells: title | body | CTA (link)
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const title = c[0] ? c[0].textContent.trim() : '';
  const body = c[1] ? c[1].textContent.trim() : '';
  const ctaCell = c[2];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'movers-wrap';
  wrap.innerHTML = `
    <span class="movers-ic" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8l9-5 9 5v9l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/></svg>
    </span>
    <div class="movers-txt"><strong>${title}</strong><p>${body}</p></div>
    <div class="movers-actions"></div>`;
  const actions = wrap.querySelector('.movers-actions');
  if (ctaCell) [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
  block.append(wrap);
}
