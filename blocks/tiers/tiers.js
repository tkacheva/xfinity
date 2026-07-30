/**
 * tiers — Xfinity 3-up pricing (300 / 500 / 1 Gig).
 * One row per tier. Cells: name | use-label | price-number | features (a <ul>) | CTA (link)
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';
  const grid = document.createElement('div');
  grid.className = 'tiers-grid';
  rows.forEach((row) => {
    const c = [...row.children];
    const name = c[0] ? c[0].textContent.trim() : '';
    const use = c[1] ? c[1].textContent.trim() : '';
    const price = c[2] ? c[2].textContent.trim() : '';
    const featsCell = c[3];
    const ctaCell = c[4];
    const card = document.createElement('div');
    card.className = 'tier';
    card.innerHTML = `
      <div class="tier-name">${name}</div>
      <div class="tier-use">${use}</div>
      <div class="tier-price"><span class="amt"><sup>$</sup>${price}</span><span class="per">/mo for<br>5 years</span></div>`;
    if (featsCell) {
      const ul = featsCell.querySelector('ul') || featsCell;
      const list = document.createElement('ul');
      list.className = 'tier-feats';
      [...ul.querySelectorAll('li')].forEach((li) => {
        const item = document.createElement('li');
        item.innerHTML = li.innerHTML;
        list.append(item);
      });
      card.append(list);
    }
    const actions = document.createElement('div');
    actions.className = 'tier-actions';
    if (ctaCell) [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    // Ensure the CTA renders as a button even when EDS button-decoration was
    // skipped (e.g. authored links whose paragraph carried surrounding whitespace).
    actions.querySelectorAll('a:not(.button)').forEach((a) => a.classList.add('button'));
    card.append(actions);
    grid.append(card);
  });
  block.append(grid);
}
