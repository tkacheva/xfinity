/**
 * member-tiers — Silver/Gold/Platinum/Diamond benefit cards with accordions.
 * Optional leading single-cell row = centered heading.
 * Tier rows: tier-name | eligibility | discounts (a <ul>) | extra section names (comma, optional)
 */
const TIER = {
  silver: 't-silver', gold: 't-gold', platinum: 't-platinum', diamond: 't-diamond',
};

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'mt-wrap';
  let items = rows;
  if (rows[0] && [...rows[0].children].length === 1) {
    const head = document.createElement('div');
    head.className = 'mt-head';
    head.innerHTML = rows[0].children[0].innerHTML;
    wrap.append(head);
    items = rows.slice(1);
  }
  const grid = document.createElement('div');
  grid.className = 'mt-grid';
  items.forEach((r) => {
    const c = [...r.children];
    const name = c[0] ? c[0].textContent.trim() : '';
    const elig = c[1] ? c[1].innerHTML.trim() : '';
    const disc = c[2] ? c[2].innerHTML.trim() : '';
    const extras = (c[3] ? c[3].textContent.trim() : 'Exclusives,Perks,Benefits').split(',').map((s) => s.trim()).filter(Boolean);
    const card = document.createElement('div');
    card.className = `mt-card ${TIER[name.toLowerCase()] || ''}`;
    card.innerHTML = `
      <div class="mt-headband"><h3>${name}</h3><p>${elig}</p></div>
      <div class="mt-body">
        <div class="mt-sec open"><button type="button">Discounts<span class="mt-caret"></span></button><div class="mt-panel">${disc}</div></div>
        ${extras.map((s) => `<div class="mt-sec"><button type="button">${s}<span class="mt-caret"></span></button><div class="mt-panel"></div></div>`).join('')}
      </div>`;
    grid.append(card);
  });
  wrap.append(grid);
  block.append(wrap);
  grid.querySelectorAll('.mt-sec > button').forEach((btn) => {
    btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
  });
}
