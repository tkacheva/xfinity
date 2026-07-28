/**
 * article — support/help article: breadcrumb + constrained prose column + support footer.
 * Row 1: breadcrumb text (optional). Row 2: rich article body (h1/h2/p/ul preserved).
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const crumb = rows.length > 1 ? rows[0].textContent.trim() : '';
  const bodyCell = rows.length > 1 ? rows[1].querySelector(':scope > div') : rows[0]?.querySelector(':scope > div');
  const html = bodyCell ? bodyCell.innerHTML : '';
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'article-wrap';
  wrap.innerHTML = `
    ${crumb ? `<p class="article-crumb">${crumb}</p>` : ''}
    <div class="article-body">${html}</div>
    <div class="article-foot">
      <h3>Didn’t find what you were looking for?</h3>
      <a class="button primary" href="/chat">Ask Xfinity Assistant</a>
    </div>`;
  block.append(wrap);
}
