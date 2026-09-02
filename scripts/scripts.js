import {
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  buildBlock,
  getMetadata,
} from './aem.js';
import {
  initMartech, martechEager, martechLazy, sendEvent,
} from '../plugins/martech/src/index.js';

if (window.trustedTypes && window.trustedTypes.createPolicy) {
  const innerTT = window.trustedTypes.createPolicy('tt-inner', {
    createHTML: (s) => s, // avoid stack overflow
  });

  window.trustedTypes.createPolicy('default', {
    createHTML: (input, type, sink) => {
      let processedInput = input;
      if (/srcdoc\s*=/i.test(processedInput)) {
        const doc = new DOMParser().parseFromString(innerTT.createHTML(processedInput), 'text/html');
        doc.querySelectorAll('iframe[srcdoc]').forEach((el) => el.removeAttribute('srcdoc'));
        processedInput = doc.body.innerHTML;
      }
      if (sink.includes('createContextualFragment') || sink.includes('Document write')) {
        const doc = new DOMParser().parseFromString(innerTT.createHTML(processedInput), 'text/html');
        doc.querySelectorAll('script').forEach((el) => el.remove());
        processedInput = doc.body.innerHTML;
      }
      return processedInput;
    },
    createScriptURL: (input) => input,
    createScript: (input) => input,
  });
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Turns `/widgets/...` links into widget blocks.
 * @param {Element} main The container element
 */
function buildWidgetAutoBlocks(main) {
  const widgetLinks = [...main.querySelectorAll('a[href*="/widgets/"]')];
  widgetLinks.forEach((link) => {
    if (link.closest('.widget')) return;
    const newLink = link.cloneNode(true);
    const widgetBlock = buildBlock('widget', { elems: [newLink] });
    const p = link.closest('p');
    if (
      p
      && p.querySelectorAll('a').length === 1
      && p.querySelector('a') === link
      && p.textContent.trim() === link.textContent.trim()
    ) {
      p.replaceWith(widgetBlock);
    } else {
      link.replaceWith(widgetBlock);
    }
  });
}

const AI_REFERRAL_UTM_SOURCES = [
  'chatgpt', 'chatgpt.com', 'openai',
  'perplexity', 'perplexity.ai',
  'claude', 'claude.ai',
  'copilot', 'gemini',
];

/**
 * Whether the page was reached from an AI assistant (`utm_source=chatgpt.com` etc.).
 * @returns {boolean}
 */
function isAiReferral() {
  const utmSource = (new URLSearchParams(window.location.search).get('utm_source') || '').toLowerCase();
  return !!utmSource && AI_REFERRAL_UTM_SOURCES.some((src) => utmSource.includes(src));
}

// Set by seedQueryFromAiReferral, consumed by buildOf1QueryAutoBlock: `query` is the
// real, full text sent to generate() (good retrieval needs the whole preset question
// set); `label` is what's actually shown in the of1 input box — a short, readable
// stand-in, since echoing 25 concatenated questions back at the visitor as if it were
// one typed question produced an unreadable wall of text in the UI.
let seededQuery = null;
let seededLabel = null;

/**
 * If the page was reached from an AI assistant and has no explicit `q`/`llm_app_ctx`,
 * resolves a per-path preset question set (`of1/config/page-questions.json`) so
 * `buildOf1QueryAutoBlock` can seed the of1 block with it. Only the non-competitor
 * question set is used — competitor pricing questions are a known content gap and are
 * left out to avoid hallucinated answers.
 */
async function seedQueryFromAiReferral() {
  if (!isAiReferral()) return;
  const params = new URLSearchParams(window.location.search);
  if (params.get('q') || params.get('llm_app_ctx')) return;
  try {
    const res = await fetch(`${window.hlx.codeBasePath}/of1/config/page-questions.json`);
    if (!res.ok) return;
    const pageQuestions = await res.json();
    const entry = pageQuestions[window.location.pathname];
    if (!entry || !entry.questions?.length) return;
    seededQuery = entry.questions.join(' ');
    seededLabel = entry.label || document.title;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('AI-referral query seeding failed', error);
  }
}

// Same tenant id the real DA-authored /of1 page hardcodes as its own `domain` config
// row. Without it, of1.js falls back to the page's own hostname (blocks/of1/of1.js's
// `!config.domain` branch) — fine on the real `.aem.page`/`.aem.live` host, but on a
// local `aem up` dev server that resolves to the literal string "localhost", which
// isn't a registered tenant anywhere: the worker then has no products/features/faqs/
// templates to ground on and falls back to fully ungrounded, generic generation.
const TENANT_DOMAIN = 'main--xfinity--tkacheva';

/**
 * If the URL has a `q` param, or an AI-referral query was seeded, replaces the page's
 * entire main content with a single `of1` block — the same experience as visiting
 * `/of1?q=...` — instead of the page's normal static blocks. Header/footer are
 * untouched. The seeded query (when there's no explicit `?q=`) is passed as an authored
 * `query` config row rather than a URL param, along with a short `query-label` row so
 * the of1 input box shows a readable stand-in instead of the full preset question set
 * (see `seedQueryFromAiReferral`'s doc comment). `?of1-endpoint=<url>` lets testing
 * point the block at a non-prod worker (e.g. a personal dev deploy) instead of the of1
 * block's own default; unset in normal use.
 *
 * `decorateMain` (and therefore `buildAutoBlocks`) also runs on detached, temporary
 * `<main>` containers built by `loadFragment` (used by the header for `/nav` and — via
 * the generic `/fragments/` auto-block above — any other fragment reference on the
 * page), not just the real page `<main>`. Only the real one should ever be replaced.
 * @param {Element} main The container element
 */
function buildOf1QueryAutoBlock(main) {
  if (main !== document.querySelector('main')) return;
  const params = new URLSearchParams(window.location.search);
  const explicitQuery = params.get('q');
  const query = explicitQuery || seededQuery;
  if (!query) return;
  const endpointOverride = params.get('of1-endpoint');
  const rows = [['domain', TENANT_DOMAIN]];
  if (!explicitQuery) {
    rows.push(['query', query]);
    if (seededLabel) rows.push(['query-label', seededLabel]);
  }
  if (endpointOverride) rows.push(['api-endpoint', endpointOverride]);
  main.textContent = '';
  const section = document.createElement('div');
  section.append(buildBlock('of1', rows));
  main.append(section);
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // auto load `*/fragments/*` references
    const fragments = [...main.querySelectorAll('a[href*="/fragments/"]')].filter((f) => !f.closest('.fragment'));
    if (fragments.length > 0) {
      // eslint-disable-next-line import/no-cycle
      import('../blocks/fragment/fragment.js').then(({ loadFragment }) => {
        fragments.forEach(async (fragment) => {
          try {
            const { pathname } = new URL(fragment.href);
            const frag = await loadFragment(pathname);
            fragment.parentElement.replaceWith(...frag.children);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Fragment loading failed', error);
          }
        });
      });
    }
    buildWidgetAutoBlocks(main);
    buildOf1QueryAutoBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates formatted links to style them as buttons.
 * @param {HTMLElement} main The main container element
 */
function decorateButtons(main) {
  main.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();

    // quick structural checks
    if (a.querySelector('img') || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (new URL(a.href).href === new URL(text, window.location).href) return;
    } catch { /* continue */ }

    // require authored formatting for buttonization
    const strong = a.closest('strong');
    const em = a.closest('em');
    if (!strong && !em) return;

    p.className = 'button-wrapper';
    a.className = 'button';
    if (strong && em) { // high-impact call-to-action
      a.classList.add('accent');
      const outer = strong.contains(em) ? strong : em;
      outer.replaceWith(a);
    } else if (strong) {
      a.classList.add('primary');
      strong.replaceWith(a);
    } else {
      a.classList.add('secondary');
      em.replaceWith(a);
    }
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decorateButtons(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';

  const martechLoadedPromise = initMartech({
    datastreamId: 'cc68fdd3-4db1-432c-adce-288917ddf108',
    orgId: '908936ED5D35CC220A495CD4@AdobeOrg',
    defaultConsent: 'in',
  }, {
    launchUrls: [
      'https://assets.adobedtm.com/1281f6ff0c59/10bd8e51e424/launch-c7a9cd9019d1-development.min.js',
    ],
    personalization: getMetadata('target') || new URLSearchParams(window.location.search).has('target'),
  });

  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await martechLoadedPromise;
    martechEager();
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Fetches and applies classic mbox-based Target personalization for the given mbox name.
 * The martech plugin's automatic `applyPropositions` only renders VEC (dom-action) content,
 * so form-based mbox HTML offers are fetched and injected into their container manually.
 * The container is a section tagged via Section Metadata (`Style: <mboxName>`), since DA's
 * markdown round-trip strips arbitrary `id` attributes off plain content divs.
 *
 * The global mbox is requested implicitly on every page-view event and must NOT be listed
 * explicitly in `decisionScopes` (the Edge Network rejects it with a TGT-12005-400 "global
 * mbox is not allowed in mboxes" error) — its proposition just shows up in the response.
 * @param {String} mboxName The name of the mbox location to personalize
 */
async function applyMboxPersonalization(mboxName) {
  const container = document.querySelector(`.${mboxName}`);
  if (!container) return;
  try {
    const result = await sendEvent({
      type: 'decisioning.propositionFetch',
      renderDecisions: false,
      personalization: {
        decisionScopes: ['__view__'],
        sendDisplayEvent: true,
      },
    });
    // Classic (non-VEC) Target activities delivered over the Edge Network come back with
    // `scope: "__view__"` (the mbox name is NOT preserved in scope), wrapped as a dom-action
    // proposition with a meaningless selector (e.g. "head") since they have no real CSS
    // selector — so match by content-bearing dom-action items instead of by scope/mbox name.
    const domActionSchema = 'https://ns.adobe.com/personalization/dom-action';
    const proposition = result?.propositions?.find(
      (p) => p.items?.some((i) => i.schema === domActionSchema && i.data?.content),
    );
    const item = proposition?.items?.find((i) => i.data?.content);
    if (item) container.innerHTML = item.data.content;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Mbox personalization failed for "${mboxName}"`, error);
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  loadHeader(doc.querySelector('header'));
  martechLazy();
  if (getMetadata('target') || new URLSearchParams(window.location.search).has('target')) {
    applyMboxPersonalization('target-global-mbox');
  }

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await seedQueryFromAiReferral();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
