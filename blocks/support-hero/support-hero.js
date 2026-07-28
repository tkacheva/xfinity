/**
 * support-hero — purple support search hero.
 * One row, cells: heading | search-placeholder
 */
export default function decorate(block) {
  const c = [...block.querySelectorAll(':scope > div > div')];
  const heading = c[0] ? c[0].textContent.trim() : '';
  const placeholder = c[1] ? c[1].textContent.trim() : 'Search here';
  block.textContent = '';
  const inner = document.createElement('div');
  inner.className = 'support-hero-inner';
  inner.innerHTML = `
    <h1>${heading}</h1>
    <div class="sh-search">
      <input type="search" placeholder="${placeholder}" aria-label="Search support">
      <button type="button" aria-label="Search">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
      </button>
    </div>`;
  block.append(inner);
}
