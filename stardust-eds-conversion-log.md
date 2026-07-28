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
