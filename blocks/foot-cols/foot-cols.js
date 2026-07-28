/**
 * foot-cols — footer link columns. One row, one cell per column (h4 + links).
 * Keeps each column grouped (fixes EDS default-content flattening of h4/ul pairs).
 * Injects the social icons into the last column (DA strips inline SVG from content).
 */
const SOCIAL = {
  X: 'M18 2h3l-7 8 8 12h-6l-5-7-5 7H3l7-9L2 2h6l4 6 6-6z',
  Facebook: 'M13 22v-8h3l1-4h-4V8c0-1 .3-2 2-2h2V2.2C18.5 2 17.3 2 16 2c-3 0-5 1.8-5 5.2V10H8v4h3v8z',
  YouTube: 'M23 8s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-.9C17 4.5 12 4.5 12 4.5s-5 0-8.1.3c-.4 0-1.3 0-2.1.9C1.2 6.4 1 8 1 8S.8 9.9.8 11.8v1.4C.8 15 1 17 1 17s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.1 7.8.2 7.8.2s5 0 8.1-.3c.4 0 1.3 0 2.1-.9.6-.7.8-2.3.8-2.3s.2-1.9.2-3.8v-1.4C23.2 9.9 23 8 23 8zM9.7 15.3V8.7l5.2 3.3z',
};

export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  row.classList.add('foot-cols-row');
  const cells = [...row.children];
  const last = cells[cells.length - 1];
  if (last && /Espa/i.test(last.textContent)) {
    const langP = last.querySelector('p');
    if (langP) langP.classList.add('foot-lang');
    const social = document.createElement('p');
    social.className = 'foot-social';
    social.innerHTML = Object.entries(SOCIAL).map(([name, d]) => `<a href="https://${name.toLowerCase()}.com/xfinity" aria-label="${name}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="${d}"/></svg></a>`).join('');
    last.append(social);
  }
}
