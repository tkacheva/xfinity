/**
 * offers — Xfinity offer-card pair that overlaps the promo band.
 * One row per card. Cells (in order):
 *   title (may use <em> for the purple accent) | subhead | price-number | CTA (link)
 */
export default function decorate(block) {
  const cards = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';
  const grid = document.createElement('div');
  grid.className = 'offers-grid';
  cards.forEach((row) => {
    const c = [...row.children];
    const title = c[0] ? c[0].innerHTML.trim() : '';
    const sub = c[1] ? c[1].textContent.trim() : '';
    const price = c[2] ? c[2].textContent.trim() : '';
    const ctaCell = c[3];
    const card = document.createElement('div');
    card.className = 'offer';
    card.innerHTML = `
      <h3>${title}</h3>
      <p class="offer-sub">${sub}</p>
      <div class="offer-price"><span class="amt"><sup>$</sup>${price}</span><span class="per">/mo for<br>5 years</span></div>`;
    const actions = document.createElement('div');
    actions.className = 'offer-actions';
    if (ctaCell) [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    card.append(actions);
    grid.append(card);
  });
  block.append(grid);
}
