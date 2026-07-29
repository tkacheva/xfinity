---
name: Xfinity (current state)
description: Converged home-connectivity marketing & support site — near-black actions, sparing Xfinity-purple accent, token-driven system
colors:
  background: "#ffffff"
  surface: "#f6f6f9"
  text-primary: "#141417"
  text-secondary: "#62626c"
  primary: "#5a23b9"
  primary-dark: "#3d1881"
  info: "#1f69ff"
  border: "#dde2e6"
typography:
  display:
    fontFamily: "XSans, DMSans, Helvetica, sans-serif"
    fontSize: "clamp(2.25rem, 2.07rem + 0.89vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04px"
  headline:
    fontFamily: "XSans, DMSans, Helvetica, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02px"
  body:
    fontFamily: "DMSans, Helvetica, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0px"
  label:
    fontFamily: "DMSans, Helvetica, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.5px"
rounded:
  xsmall: "2px"
  small: "4px"
  medium: "8px"
  large: "16px"
  xlarge: "32px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.medium}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.background}"
  chip-nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.large}"
    padding: "24px"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.medium}"
    padding: "12px 16px"
---

# Design System: Xfinity (current state)

## Overview

**Creative North Star: "The Converged Storefront"**

Xfinity's site reads as a **high-volume, promotion-driven retail storefront for home connectivity**, built on a disciplined enterprise design-token system. The chrome is clean and neutral — white backgrounds, near-black text and buttons, generous whitespace — and the brand's identity is delivered in **concentrated bursts of purple**: full-bleed gradient campaign bands, line-icon rows, check-bullets, and emphasis phrases. The effect is a calm, legible frame that lets loud, time-bound offers do the shouting.

The system is unmistakably **token-first**: 929 CSS custom properties define full color ramps, a multi-track type scale, a six-step radius scale, and semantic role colors. Layout is card-heavy and modular — offer-card pairs, 3-up pricing, feature-icon rows, competitive comparison tables, and repeating cross-promo bands — assembled into long, scannable marketing pages. Photography (device and lifestyle imagery) appears in supporting tiles rather than as a hero; the home page's "hero" is functional: an address-capture form, because shopping is availability-gated.

**Key Characteristics:**
- Near-black primary actions; purple as a **sparing** brand accent, not the button color.
- Signature **purple gradient promo band** with an oversized numeral as the campaign device.
- Clean white/`#f6f6f9` surfaces, thin `#dde2e6` borders, mostly flat with soft optional shadow.
- Sentence-case voice (0% uppercase headings); benefit- and price-led copy.
- Modular, card-based, long-scroll marketing pages with recurring system bands.

## Colors

A neutral black-and-white foundation carrying a single saturated brand hue (purple), with blue reserved for inline links and green/red held back for semantic states.

### Primary
- **Xfinity Purple** (`#5a23b9`, token `--palette-purple-50` / `--themeColorBase`): the brand signal. Used on promo/campaign gradient bands, line icons, check-bullets, selected sub-nav chips, and emphasis fragments inside headlines. Deployed sparingly against the neutral frame.
- **Deep Purple** (`#3d1881`, `--palette-purple-70` / `--themeColorHover`): hover state and the dark end of the signature gradient.

### Secondary
- **Link Blue** (`#1f69ff` base, `#0051d0` link, `--palette-blue-50/60`): informational inline text links. Appears almost exclusively as link text — rarely as a fill or surface.

### Neutral
- **White** (`#ffffff`): page background and card surfaces.
- **Cool Grey Surface** (`#f6f6f9`, `--palette-grey-05`): alternating section and muted-panel backgrounds.
- **Near-Black** (`#141417`, `--palette-grey-90`): primary text AND the primary-button fill.
- **Mid Grey** (`#62626c`, `--palette-grey-50`): secondary text, captions, legal copy.
- **Hairline Border** (`#dde2e6`, `--color-border-light`): card borders, dividers, input strokes.

### Named Rules
**The Black-Button Rule.** Primary conversion buttons are near-black (`#141417`), never purple. Purple is the brand's *voice*, not its *action* color — it marks campaign bands, icons, and emphasis, and loses its signal if spent on every button.

**The Rare-Purple Rule.** The saturated purple appears on a small fraction of any screen (promo band, icons, a few emphasized words). Its scarcity against the neutral frame is what makes it read as "Xfinity."

## Typography

**Display Font:** XSans / "Xfinity Sans" (with DMSans, Helvetica, sans-serif fallback)
**Body Font:** DMSans / "DM Sans" (with Helvetica, sans-serif fallback)
**Label Font:** DMSans

**Character:** A geometric-humanist sans pairing. XSans carries headings, buttons, and UI chrome with tight negative tracking on display sizes (a confident, contemporary telecom voice); DM Sans keeps body copy plain and highly legible. Both are non-decorative and workmanlike — the type gets out of the way of price and proof.

### Hierarchy
- **Display** (700, `clamp(2.25rem → 2.5rem)`, line-height ~1.1, letter-spacing −0.04px): section-opening and hero-scale headlines.
- **Headline** (600, 1.25–1.5rem, line-height ~1.25, letter-spacing −0.02px): card and sub-section titles.
- **Title / Callout** (600, 1rem, uppercase-ish label tracking on some callouts): small emphasis labels, tags.
- **Body** (400, 1–1.125rem, line-height 1.5): paragraph copy and list items.
- **Label** (500, 0.875rem, letter-spacing 0.5px): captions, meta, disclosure copy.

### Named Rules
**The Two-Track Scale Rule.** The type scale runs on two ratios: a **display track** (2.5 / 2.25 / 2.0rem) at ~1.12 and a **headline track** (1.5 / 1.25 / 1.0rem) at ~1.20–1.25, bridged by a larger jump. It is a deliberate token scale, not a single modular ratio.

**The Sentence-Case Rule.** Headings are sentence case (0% all-caps observed). Emphasis comes from size, weight, and a purple fragment — not from capitalization.

## Layout

Centered content within a `1280px` max-width container (`--max-width`). Spacing is built on a **4px base unit** (`--grid-gap-size = 4px × 2`), stepping 4 / 8 / 12 / 16 / 24 / 32 / 64px. Marketing pages are long, single-column, vertically-stacked **modular bands** — an offer-card pair, a 3-up pricing row, a feature-icon row, a comparison table, cross-promo bands — each full-width or contained, separated by generous vertical padding (~64–96px). Cards within a band use responsive multi-column grids that collapse to single-column on narrow viewports. A persistent horizontal mega-nav sits on top; a 3-column mega-footer closes every page.

## Elevation & Depth

The system reads **mostly flat**: white and `#f6f6f9` surfaces separated by hairline `#dde2e6` borders do the structural work. Depth is applied sparingly and softly — the token layer defines a full `--shadow-palette-*` family (all at ~0.51 alpha) plus `--shadow-color: rgba(0,0,0,0.5)` — surfacing as gentle lift on raised/hover cards and overlays, not as a pervasive drop-shadow style.

### Shadow Vocabulary
- **Resting** (`box-shadow: 0 1px 2px rgba(8,8,10,0.10)`): subtle definition on some cards (often replaced entirely by a border).
- **Raised / Hover** (`box-shadow: 0 4px 16px rgba(8,8,10,0.14)`): hover and elevated cards.
- **Overlay** (`box-shadow: 0 8px 24px rgba(0,0,0,0.20)`): modals and sticky nav on scroll.

### Named Rules
**The Border-First Rule.** Separation is a hairline border before it is a shadow. Shadows are a light accent for state and overlays, not the default surface treatment.

## Shapes

A six-step radius scale (`--border-radius-*`): none (0), xsmall (2px), small (4px), medium (8px), large (16px), xlarge (32px), plus full **pill** (9999px). In practice: **8px** on buttons, inputs, and small cards; **16px** on larger panels/offer cards; **32px** on big feature tiles; and **pills** on sub-navigation chips and tags. Forms are soft-cornered rectangles; the overall silhouette is rounded-friendly but restrained — no sharp corners, no heavy skeuomorphism.

## Components

### Buttons
- **Shape:** soft rectangle (8px radius, `--border-radius-medium`); some CTAs and all sub-nav chips are pills (9999px).
- **Primary:** near-black fill (`#141417`) with white label, XSans 600, ~`12px 24px` padding — e.g. "Shop internet", "Find My Plan", "Build your plan", "Shop Mobile Plus".
- **Hover / Focus:** darken toward deep purple / neutral, with token-driven focus outlines (`--outline-color-*`).
- **Secondary / Tertiary:** brand-purple **text links** (often with a chevron) — "Pricing & other info", "Learn more", "More details", "View Internet Support".

### Chips
- **Style:** pill (9999px), light surface (`#f6f6f9`) with neutral text; selected state picks up brand purple.
- **Use:** in-page sub-navigation (Overview / Plans / Mobile Deals / Shop Devices / Bring Your Own Device / Network) and content filter tabs.

### Cards / Containers
- **Corner Style:** 16px (offer/pricing cards); 8px on smaller tiles.
- **Background:** white; muted panels on `#f6f6f9`.
- **Shadow Strategy:** border-first (see Elevation); optional soft lift on hover.
- **Border:** 1px `#dde2e6`.
- **Internal Padding:** ~24px.

### Inputs / Fields
- **Style:** white fill, 1px `#dde2e6` border, 8px radius, ~`12px 16px` padding. The signature input is the **address-entry field** ("123 Main St, Apt 2, Pleasantville, MA 01040") paired with a black "Find My Plan" button.
- **Focus:** token-driven focus outline.

### Navigation
- **Header:** horizontal product mega-nav (Internet · Mobile · TV & Streaming · Home Solutions · Home Phone · Build Your Plan · Membership Benefits · Move · Comcast Business) with search, store locator, live chat, cart, and Sign In. Rendered as a web component (shadow DOM).
- **Footer:** 3-column mega-footer (About Us / Services / Policies) plus English|Español toggle, social icons (X, Facebook, YouTube), and a Comcast legal bar.

### Signature Component — Purple Promo Band
A full-bleed **purple gradient band** (`linear-gradient(120deg, #5a23b9, #3d1881, #270e48)`) carrying a campaign message and an **oversized numeral** ("5 year price guarantee"). This is the brand's loudest recurring device and appears across the marketing pillars.

### Signature Component — Competitive Comparison Table
"Poof! Make half your mobile bill disappear" — a head-to-head price table (Xfinity vs AT&T / Verizon / T-Mobile) with **purple savings pills**. A core persuasion module for Mobile.

## Do's and Don'ts

### Do:
- **Do** keep primary actions near-black (`#141417`) and reserve purple for brand voice (promo bands, icons, check-bullets, emphasis).
- **Do** lead shopping surfaces with the address-capture step; it is the site's real hero.
- **Do** build pages as stacked modular bands (offer pair → 3-up pricing → feature row → comparison → cross-promo) on a 4px spacing rhythm within a 1280px container.
- **Do** use sentence case and let size/weight/a purple fragment carry emphasis.
- **Do** separate surfaces with hairline `#dde2e6` borders first, soft shadows second.

### Don't:
- **Don't** paint primary buttons purple — it breaks the Black-Button Rule and dilutes the accent.
- **Don't** spread purple across large surfaces; its scarcity is the signal.
- **Don't** set headings in all-caps.
- **Don't** ship images with empty `alt` text (a current-state gap on ~84% of images — a redesign must fix, not inherit).
- **Don't** rely on heavy drop-shadows as the default surface style.
