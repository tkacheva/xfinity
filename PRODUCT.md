# Product

<!-- impeccable:product-schema 1 -->
<!-- DESCRIPTIVE current-state snapshot written by stardust:extract from a 5-page crawl of https://www.xfinity.com (2026-07-27). It describes what the existing site IS, not a redesign target. Sections marked _provenance: inferred were reasoned from captured copy/structure, not confirmed by the owner. -->

## Platform

web

## Users

_provenance: inferred (from captured copy, IA, and offer structure)_

Primary user is a **US residential consumer shopping for or managing home connectivity and entertainment** — internet/WiFi, mobile, TV & streaming, home phone, and home security. Two dominant situations:

- **Prospects / shoppers** evaluating plans and prices, often gated by service availability at their address (every marketing page leads with an address-entry step). Price- and promo-sensitive; comparing against AT&T, Verizon, and T-Mobile.
- **Existing customers** coming to pay a bill, troubleshoot service, manage their account, or move service to a new address (the support hub and "Move" nav pillar serve this job).

Adjacent audiences surfaced in the IA but not central to the crawled pages: students (student offers), movers, and Comcast Business (a linked but distinct property).

## Product Purpose

Xfinity (the consumer brand of Comcast) sells and services residential internet, mobile, TV/streaming, home phone, and home-security products. The site's job is to **convert shoppers into subscribers** (check availability → compare plans → build a plan → shop/checkout) and to **retain and serve existing customers** (bill pay, support, account management, moving). Success on the marketing surface is a started plan-builder / address check; success on the support surface is a self-served resolution or a routed support path.

## Positioning

_provenance: inferred_

Positioned as the **value-and-quality leader in converged home connectivity** — the recurring claim is "award-winning WiFi + Mobile" bundled savings, anchored by third-party proof (OpenSignal "America's best quality combined WiFi + Mobile") and hard price guarantees ("5-year price guarantee", "$40/mo for 5 years"). The differentiating mechanism the copy leans on is **the converged bundle** (WiFi + Mobile + streaming + protection on one account) plus **explicit head-to-head price comparison** against AT&T, Verizon, and T-Mobile.

## Operating Context

- Shopping is **address-gated**: plans, prices, and availability resolve against a service address, so nearly every marketing entry point starts with an address-capture form ("Where do you live?" / "Find My Plan").
- The site spans a **marketing surface** (`/`, `/learn/*`, deals) and a **transactional/account surface** (plan-builder `/digital/offers/*`, `login.xfinity.com`, bill pay, `/support`).
- Heavy, time-bound **promotional cadence**: campaign bands ("Back to school event", "best price is back") and dated offers ("Offer ends 8/25") are load-bearing, not decorative.
- Sub-brands and sibling properties are linked in-context: **NOW** (NOW Internet / NOW Mobile / NOW TV — prepaid/no-contract line), **Xfinity Mobile**, and **Comcast Business**.

## Capabilities and Constraints

- Product lines represented: Internet/WiFi (incl. Gig), Xfinity Mobile, TV & Streaming (incl. StreamSaver app bundles: Peacock, Netflix, Apple TV+, Disney+, Hulu, HBO Max), Home Phone, Home Solutions / Home Security, and protection plans (device protection).
- Core flows: availability check, plan comparison, plan-builder, shop/checkout, bill pay, speed test, store locator, live chat / "Xfinity Assistant", move service, account management.
- Bilingual surface (English | Español toggle in the footer).
- Built on a mature **design-token system** (a 929-property CSS custom-property layer, "Patch"/"HMD" naming) and **web components** (header/logo live in shadow DOM). This is a large enterprise CMS, not a hand-authored site.
- Access constraint observed during extraction: the origin is behind **Akamai bot management** (intermittent HTTP 403 to automated headless browsers).

## Brand Commitments

- **Name & logo:** "Xfinity" (a Comcast brand). Wordmark is a monochrome single-path SVG "xfinity" logotype (captured at `stardust/current/assets/logo.svg`); theme-color meta is `#000000`.
- **Signature color:** Xfinity purple (`#5a23b9`) as the brand accent; near-black for primary actions.
- **Legal/parent identity:** "© 2026 Comcast" and Comcast corporate links persist in the footer on every page.
- **Proof commitments carried in copy:** OpenSignal award ranking; "5-year price guarantee"; explicit competitor price comparisons.

## Evidence on Hand

- **Real product copy, prices, and offers** captured across 5 pages (home, internet, deals, mobile, support) — see `stardust/current/pages/*.json`.
- **Third-party proof** referenced on-page: OpenSignal "America's best quality combined WiFi + Mobile" (Opensignal USA, April 2026, per on-page citation).
- **Captured assets:** logo SVG, favicon, apple-touch-icon, full-page screenshots of all 5 pages.
- **Absences future work must not fabricate:** exact live pricing changes constantly and is date-/address-bound; the crawl captured a snapshot on 2026-07-27. Font binaries (XSans, DM Sans) were not downloaded. Do not invent testimonials, customer counts, or benchmark figures beyond the OpenSignal citation already present.

## Product Principles

_provenance: inferred from the observed site_

1. **Lead with availability, then price.** Every shopping path starts by resolving the user's address; price and promo are the primary persuasion levers.
2. **Sell the converged bundle.** WiFi + Mobile + streaming + protection on one account is the recurring value story, backed by savings math.
3. **Prove it with third parties and guarantees.** Claims are anchored to OpenSignal awards and hard guarantees rather than adjectives alone.
4. **Serve shoppers and existing customers from the same brand surface**, with a clear split between marketing (`/learn`) and self-service (`/support`, account).
5. **Run on promotional cadence.** Time-bound campaigns and dated offers are a structural part of the experience.

## Accessibility & Inclusion

- Bilingual (English/Español) surface and a dedicated `/accessibility` + `/support/accessibility` path indicate an accessibility commitment.
- **Observed gap (current state):** ~84% of captured `<img>` elements carry empty `alt` attributes (see the brand review's Tensions). This is a current-state accessibility issue for a redesign to address, not a brand commitment.
