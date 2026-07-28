/**
 * award — OpenSignal centered award badge band.
 * One row, cells: heading | body
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const heading = c[0] ? c[0].textContent.trim() : '';
  const body = c[1] ? c[1].textContent.trim() : '';
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'award-wrap';
  wrap.innerHTML = `<div class="award-band"><h3>${heading}</h3><p>${body}</p></div>`;
  block.append(wrap);
}
