// add delayed functionality here

/**
 * Floating "Ask Xfinity" AI search launcher.
 * Appears on every page (post-LCP) and opens the OF1 generative search
 * experience: typing a question routes to /of1?q=<query>, which composes a
 * personalized landing page. Skipped on the /of1 page itself.
 */
(function initAskXfinity() {
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/of1') return;
  if (document.querySelector('.ask-of1')) return;

  const wrap = document.createElement('div');
  wrap.className = 'ask-of1';
  wrap.innerHTML = `
    <div class="ask-of1-panel" role="dialog" aria-label="Ask Xfinity AI search" hidden>
      <div class="ask-of1-panel-head">
        <span class="ask-of1-title">Ask Xfinity</span>
        <button class="ask-of1-close" type="button" aria-label="Close">&times;</button>
      </div>
      <p class="ask-of1-sub">Describe what you need and we'll build a page for you.</p>
      <form class="ask-of1-form">
        <input class="ask-of1-input" type="text" autocomplete="off"
          placeholder="e.g. No-contract gig internet for a new apartment" aria-label="Ask Xfinity" />
        <button class="ask-of1-go" type="submit" aria-label="Search">&rarr;</button>
      </form>
      <div class="ask-of1-chips">
        <button type="button" data-q="No-contract gig internet for my new apartment move-in">Moving in</button>
        <button type="button" data-q="Cut my mobile bill in half">Lower my bill</button>
        <button type="button" data-q="Best internet for working from home">Work from home</button>
      </div>
    </div>
    <button class="ask-of1-fab" type="button" aria-expanded="false" aria-label="Ask Xfinity AI search">
      <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
        <path d="M12 3l1.9 5.4 5.4 1.9-5.4 1.9L12 17.6l-1.9-5.4-5.4-1.9 5.4-1.9z" fill="currentColor"/>
      </svg>
      <span>Ask Xfinity</span>
    </button>`;
  document.body.appendChild(wrap);

  const fab = wrap.querySelector('.ask-of1-fab');
  const panel = wrap.querySelector('.ask-of1-panel');
  const input = wrap.querySelector('.ask-of1-input');

  const go = (q) => {
    const query = (q || '').trim();
    window.location.href = query ? `/of1?q=${encodeURIComponent(query)}` : '/of1';
  };
  const open = () => {
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    wrap.classList.add('open');
    window.setTimeout(() => input.focus(), 50);
  };
  const close = () => {
    panel.hidden = true;
    fab.setAttribute('aria-expanded', 'false');
    wrap.classList.remove('open');
  };

  fab.addEventListener('click', () => (panel.hidden ? open() : close()));
  wrap.querySelector('.ask-of1-close').addEventListener('click', close);
  wrap.querySelector('.ask-of1-form').addEventListener('submit', (e) => {
    e.preventDefault();
    go(input.value);
  });
  wrap.querySelectorAll('.ask-of1-chips button').forEach((b) => {
    b.addEventListener('click', () => go(b.dataset.q));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) close();
  });
}());
