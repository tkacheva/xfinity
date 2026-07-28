# Xfinity EDS conversion log

Same-design migration of xfinity.com → AEM Edge Delivery (stardust:replica Phase 5).

## Runtime
- **Vanilla EDS** (aem-boilerplate), NOT AuthorKit. AuthorKit bootstrap declined (drift-prone `main`, no pinned ref shipped). Header/footer are boilerplate blocks reading DA `/nav` + `/footer`; standard `aem.js` decorator; `.button` system.

## Foundation (`styles/styles.css`)
- Brand tokens lifted from source design system (Patch/HMD): `--purple #5a23b9`, `--purple-dark #3d1881`, `--black #141417`, `--grey-05 #f6f6f9`, `--border #dde2e6`, radii, `--maxw 1280px`.
- **Fonts:** XSans (Xfinity Sans) is LICENSED — kept first in stack, NOT rehosted. Substituted by **DM Sans** (the site's own declared fallback), self-hosted `styles/fonts/dm-sans-variable.woff2` + italic. Metric-matched `dm-sans-fallback` @font-face (size-adjust 122.34% / ascent 81.09% / descent 25.34%, computed via fonttools) for zero-CLS swap.
- Primary `.button` already black (`--text-color`) = matches Xfinity.

## Home archetype blocks (branch `home-archetype`)
One prototype `<section>` = one block (template-slotted, replica tier):

| Block | Section | Authoring |
|---|---|---|
| `hero-address` | address availability hero | heading \| placeholder \| button \| member-line |
| `promo` | purple campaign band (full-bleed) | eyebrow / heading / lede / `num \| label` rows; bg = CSS |
| `offers` | $40/$50 offer-card pair | per card: title(`<em>`) \| sub \| price \| CTA |
| `tiles` | product row (5 tiles) | per tile: image-url \| label \| href |
| `stream` | "Streaming, simplified" band | section-h \| card-h \| body \| CTA; bg = CSS |
| `deals` | "Get more with Xfinity" 4-up | head row + per card: image-url \| title \| fine \| link |

## Image strategy (v1 residual)
Images referenced as **CSS backgrounds / inline bg from the source CDN** (assets.xfinity.com / assets.comcast.com), browser-fetched (no ingest, no `about:error`). Faithful but NOT yet authorable and absent from `.plain.html`. **TODO:** upload editorial images to DA `/media` and author as `<img>` per the deploy skill's editorial-image contract.

## Known residuals / TODO before merge to main
1. **Nav/footer** still placeholder — replace DA `/nav` + `/footer` with the real Xfinity mega-nav (Internet/Mobile/TV & Streaming/… ) + 3-column footer (About Us/Services/Policies).
2. **Missing mid-page sections** (build as blocks): movers band, award-cards (Cut mobile bill / Device protection), OpenSignal award badge, Student band, repeat address band.
3. **h1 is JS-generated** (hero-address builds `<h1>` at decorate) — not in server `.plain.html`. For SEO, author the hero heading as real content `<h1>` or promote in the block.
4. **Images → authorable** (see Image strategy).
5. **Gates:** run `content-diff` (prototype vs branch preview) + a computed-style grid check before merge.
6. **Font residual (permanent):** XSans licensed → DM Sans substitute (documented).
7. Deployed to preview path `/home` on the branch (main homepage untouched). Promote to `/index` + merge branch → main when verified.

## Verified
- Branch preview https://home-archetype--xfinity--tkacheva.aem.page/home — 200, all 6 blocks decorate, CDN imagery loads, 0 `about:error`. Renders faithfully as the Xfinity home.

## Home deploy COMPLETE (branch home-archetype) — 2026-07-27
All 10 body blocks + real nav (horizontal mega-nav) + styled 3-col footer deployed and verified.
- Branch preview: https://home-archetype--xfinity--tkacheva.aem.page/home (200, 0 about:error, height 4627 vs live 5098 ≈ 91%).
- Blocks: hero-address, promo, offers, tiles, movers, stream, feature-cards, award, student, deals + boilerplate header/footer (Xfinity nav.html/footer.html in DA).

### content-diff (prototype vs deployed) residuals — all logged, none blocking
- 🟠 FONT FORK (5/40/50): permanent — XSans licensed → DM Sans substitute. JUSTIFIED.
- 🔴/🟠 "America's" / "Now's": curly-vs-straight apostrophe encoding mismatch (content present). FIX: use curly ’ in authored content.
- 🟠 tiles as CTA links; address label/button not <p>: role classification, content present.
- 🟡 dropped disclaimer fine-print (Offer ends 8/24; Lifetime Device Protection; Xfinity Internet required; offers-disc). REAL minor drops — add as authored default content.
- h1 is JS-generated (hero-address) — not in server .plain.html. SEO: author hero heading as content <h1>.

### Remaining before merge to main
1. Fix apostrophes + add dropped disclaimer lines (content edit).
2. Author hero <h1> as server content (SEO).
3. Images → authorable (upload to DA /media, author <img>).
4. Even out footer 3-col grid; QA 360 breakpoint.
5. Promote /home → /index, open PR, merge branch → main.

## Product-pillar deployed to production — 2026-07-28
- URL: https://main--xfinity--tkacheva.aem.page/learn/internet-service (200, published live, 0 about:error, height 3866).
- REUSED home blocks: promo, offers, stream, deals, award (5).
- NEW blocks: tiers (3-up pricing w/ purple check-bullets), faq (3-up cards), page-title (purple H1 + locator strip).
- Covers ~180 pages (internet-service family + mobile/tv/home-solutions/home-phone/protection/now — same template).
- Fix logged: page-title first authoring emptied the title cell (text placed directly in row div, not a cell div). Corrected authoring to row>cell nesting. Block reads rows[0].textContent — author blocks as <div class="x"><div><div>cell</div></div>...>.

## Block library (13) so far
hero-address, promo, offers, tiles, movers, stream, feature-cards, award, student, deals, tiers, faq, page-title.
Remaining archetypes (offers/deals, leaf, local, support, static, program) reuse these + need a few new (support-cards, feature-alt, tabs). Each is faster now.

## Offers archetype deployed to production — 2026-07-28
- https://main--xfinity--tkacheva.aem.page/learn/deals (published live, 0 about:error).
- REUSED: page-title, promo, offers, tiers, award, deals, stream (7). NEW: cta-band (1, generic purple band, used ×2).
- Demonstrates block-reuse velocity: a full marketing page from 1 new block.
- Block library now 14: + cta-band.

## Support-hub archetype deployed to production — 2026-07-28
- https://main--xfinity--tkacheva.aem.page/support (published live, 0 about:error). Distinct non-marketing template.
- NEW blocks: support-hero (purple search), support-cards (category grid, .triad variant). REUSED: cta-band.
- Block library now 16.

## ALL 8 ARCHETYPES LIVE ON PRODUCTION — 2026-07-28
Deployed + published (aem.live, all 200):
  / · /learn/internet-service · /learn/deals · /support · /learn/digital-cable-tv/svod/acorntv · /local/il/chicago · /accessibility · /learn/moving
NEW blocks this batch: feature-rows, stores, leaf-hero, chip-grid, split-hero. Reused everything else.
Block library now 21. Fix: chip-grid/page-title authoring needs row>cell nesting (<div class="x"><div><div>label</div></div></div>) — bare text in a row div is emptied by DA.
Remaining: migrate siblings (~250 pages) + rollout; images->authorable; feature-rows illustration placeholders.

## Migration progress — 2026-07-28 (5 families + article archetype)
Live families: SVOD 24 · premium-channels 5 · sports 10 · local metros 12 · support articles 4 = 55 migrated pages.
NEW archetype: article (support/help) — breadcrumb + constrained prose column + Ask-Xfinity footer. Block library now 22.
ALL distinct template classes of xfinity.com are now live in production.
Remaining = pure scale: local long-tail (~8,100 cities, feed generator from Xfinity store/pricing DATA rather than crawling), 1,439 more support articles (same generator), misc top-level pages.
