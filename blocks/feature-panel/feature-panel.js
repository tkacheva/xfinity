/**
 * feature-panel — dark horizontal offer panel (image | copy), mirroring the OF1
 * spotlight "featured" card in xfinity dark colors.
 * Cells (flat): image-url | eyebrow | heading | price | body | features(<ul>) | cta(<a>)
 * The image URL is read from the cell text and applied as a CSS background so
 * its case is preserved (EDS would otherwise lowercase a linked bare URL).
 */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const txt = (i) => (cells[i] ? cells[i].textContent.trim() : '');
  const img = txt(0);
  const featsCell = cells[5];
  const ctaCell = cells[6];

  block.textContent = '';
  const panel = document.createElement('div');
  panel.className = 'fp-panel';

  const media = document.createElement('div');
  media.className = 'fp-media';
  if (img) media.style.setProperty('--fp-img', `url('${img}')`);

  const body = document.createElement('div');
  body.className = 'fp-body';
  body.innerHTML = `
    ${txt(1) ? `<p class="fp-eyebrow">${txt(1)}</p>` : ''}
    <h2 class="fp-title">${txt(2)}</h2>
    <p class="fp-price">${txt(3)}</p>
    <p class="fp-lede">${txt(4)}</p>`;
  if (featsCell) {
    const ul = featsCell.querySelector('ul');
    if (ul) {
      const list = ul.cloneNode(true);
      list.className = 'fp-feats';
      body.append(list);
    }
  }
  const actions = document.createElement('div');
  actions.className = 'fp-actions';
  if (ctaCell) [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
  actions.querySelectorAll('a:not(.button)').forEach((a) => a.classList.add('button'));
  body.append(actions);

  panel.append(media, body);
  block.append(panel);
}
