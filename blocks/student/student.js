/**
 * student — "Student WiFi packed with perks" dark photo band.
 * One row, cells: heading | body | CTA (link) | secondary-link
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const heading = c[0] ? c[0].textContent.trim() : '';
  const body = c[1] ? c[1].textContent.trim() : '';
  const ctaCell = c[2];
  const linkCell = c[3];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'student-wrap';
  wrap.innerHTML = `<div class="student-band"><div class="student-copy"><h3>${heading}</h3><p>${body}</p><div class="student-actions"></div></div></div>`;
  const actions = wrap.querySelector('.student-actions');
  if (ctaCell) [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
  if (linkCell) [...linkCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
  block.append(wrap);
}
