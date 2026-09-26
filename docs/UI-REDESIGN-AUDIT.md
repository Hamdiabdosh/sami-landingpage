# Sami UI Redesign Audit

Phase 0 baseline for an editorial / premium trading-house redesign.  
**Scope of this document:** inspection only. No UI redesign was performed.

---

## Current Visual Direction

The live public site presents as an **industrial / trustworthy** product showcase: deep steel-blue primary, warm amber-gold accents, Space Grotesk headlines + Inter body, card-heavy category and product grids, and Framer Motion reveals.

It reads closer to a polished **catalog + contact** template than to an editorial trading-house magazine. Strengths: clear category story (bikes / pumps / scales), consistent tokens, bilingual i18n, photographic category art. Weaknesses for the new brief: rounded cards with borders/shadows, inset hero treatment (photo as dimmed background behind copy, not a full-bleed editorial plane), badge/stat strips in the hero, and a busy illustrated logo that fights a minimal photographic system.

---

## Existing Design System

Source of truth: `src/styles.css`, plus shared motion in `src/lib/motion.ts` and shadcn `Button` in `src/components/ui/button.tsx`.

### Fonts

| Role | Family | How loaded |
|---|---|---|
| Display (`--font-display`) | Space Grotesk 400–700 | `@fontsource/space-grotesk` |
| Body (`--font-sans`) | Inter 400–600 | `@fontsource/inter` |

Headings (`h1`–`h5`) use display + `-0.02em` tracking. Public pages lean on `font-display` for section titles.

**Editorial note:** Inter is a default SaaS stack font. Space Grotesk is geometric and competent, but neither pair strongly signals “established trading house.” Typography is the first likely redesign lever.

### Colors (semantic tokens)

Documented intent in CSS: *Industrial / trustworthy. Deep steel-blue + warm amber gold.*

| Token | Approx role |
|---|---|
| `--primary` | Deep steel blue (ink for CTAs / dark hero) |
| `--primary-glow` / `--gold` / `--accent` | Warm amber gold |
| `--steel` | Near-black steel surface for dark blocks |
| `--background` / `--surface` / `--surface-muted` | Cool light neutrals |
| `--whatsapp` | Brand-green contact actions |

Dark-mode tokens exist; public shell appears light-first.

### Spacing / container

- `@utility container-x` — `max-width: 80rem`, horizontal padding `1.25rem`
- Section rhythm on homepage: roughly `py-16 md:py-24`
- No formal spacing scale beyond Tailwind defaults

### Radii

- Global `--radius: 0.875rem` (~14px), with sm/md/lg/xl/2xl/3xl derivatives
- Public UI heavily uses `rounded-lg`, `rounded-xl`, `rounded-2xl`, and `rounded-full` (lang toggle, badges, FAB)

**Editorial conflict:** large corner radii + pill controls reinforce “app UI,” not editorial print.

### Shadows

| Token | Use |
|---|---|
| `--shadow-card` | Soft card elevation |
| `--shadow-elegant` | Stronger primary-tinted lift on hover / CTA panels |

### Buttons

- shadcn `buttonVariants`: `rounded-md`, default/outline/secondary/ghost/link
- Homepage CTAs often bypass `Button` and use ad-hoc `Link`/`a` with `rounded-lg` + solid fills
- WhatsApp green is a first-class token and FAB treatment

### Motion

- Library: Framer Motion
- Shared presets: `EASE`, `spring`, `fadeUp`, `staggerContainer`, `hoverLift`, `tapScale`, `revealTransition`, `pageTransition`
- `PageTransition` fades/slides on route change
- Header scroll shrink + gold progress bar
- Homepage: parallax hero bg, stagger entrance, `whileInView` section reveals, image scale on hover
- `prefers-reduced-motion` respected in CSS + some components

**Editorial note:** motion infrastructure is reusable; intensity and “lift card on hover” patterns should be dialed down toward restrained editorial transitions.

### Utilities of note

- `steel-gradient` — defined in CSS, **appears unused** in current components
- `gold-underline` — hover underline utility
- `hide-scrollbar` — featured product carousel on mobile
- `skeleton-shimmer` — loading skeletons

---

## Homepage Structure

Route: `src/routes/index.tsx`  
Shell: `SiteShell` → `Header` + `PageTransition(children)` + `Footer` + `WhatsAppFab`  
(`src/components/site/SiteShell.tsx`)

Loader fetches: `listProducts()` (first 4), `listGalleryImages()` (first 4), `getSettings()`.

| # | Section | Component / location | Data |
|---|---|---|---|
| 1 | Hero | `Hero` (local in `index.tsx`) | i18n copy; static `hero.jpg` |
| 2 | Categories | `Categories` | Static `cat-*.jpg` + i18n; links to `/catalog?cat=` |
| 3 | Featured products | `Featured` → `ProductCard` (`variant="compact"`) | DB products (slice 0–4); conditional if empty |
| 4 | Gallery teaser | `GalleryTeaser` | DB gallery (slice 0–4); conditional if empty |
| 5 | Why us | `WhyUs` | i18n + Lucide icons |
| 6 | Visit / contact CTA | `Visit` | `SiteSettings` + i18n |

Supporting chrome (all pages): `Header`, `Footer` (`BuiltByRaafat`), `WhatsAppFab`, `Logo`.

---

## Image Asset Audit

### Bundled / public assets (in repo)

| Asset | Path | Subject | Aspect | Editorial suitability |
|---|---|---|---|---|
| Hero background | `src/assets/hero.jpg` | Studio / stylized side-profile bicycle on black, warm rim light | 1600×1200 (~4:3) | **High** for mood/lighting; **uncertain authenticity** — does not read as on-site Dire Dawa photography. Strong candidate for full-bleed editorial hero *if* retained as brand photography. |
| Category — bikes | `src/assets/cat-bikes.jpg` | Studio mountain/hybrid bike, dual-tone lighting | 1024×1024 (1:1) | **High** photographic quality; same authenticity caveat. Fits category tiles or editorial spreads. |
| Category — pumps | `src/assets/cat-pumps.jpg` | Studio industrial pump / motor assembly, dark ground | 1024×1024 (1:1) | **High** tactile industrial mood; good trading-house signal. |
| Category — scales | `src/assets/cat-scales.jpg` | Studio stainless digital platform scale, teal ground, amber display | 1024×1024 (1:1) | **High** precision/product-catalog feel. |
| Brand logo | `src/assets/logo.png` | Illustrated “SAMI” badge: saw, bike, wrench, gear; yellow/black | 562×579 (~1:1) | **Low** for premium editorial UI. Busy, high-chroma, sticker-like. Likely the real business mark — preserve as asset; may need quieter wordmark treatment later (do not delete). |
| Favicon | `public/favicon.png` (+ `.ico`) | Same as logo | 562×579 | Functional; oversized source for favicon use. Same suitability notes as logo. |
| OG image | `public/og.jpg` | Same as logo (PNG data in `.jpg` name) | 562×579 | **Low** for social preview under editorial brand; square logo on pale ground. Prefer a photographic OG later. |

**File sizes:** category JPGs ~40–58 KB; hero ~121 KB; logo/og/favicon each ~424 KB (logo is large for a mark).

### Runtime / CMS photography (not in git)

| Asset class | Storage | Notes |
|---|---|---|
| Product images | DB `Product.imageUrl` → served as `/uploads/<uuid>.webp` via `data/uploads/` (`UPLOAD_DIR`) | Created through admin upload (`src/lib/image-storage.ts`, max width 1920, WebP q82). **Not present in the repository** (`data/uploads/` gitignored). Cannot audit content without a populated local/Docker volume. |
| Gallery images | DB `GalleryImage.imageUrl` → same upload pipeline | Same constraint. Homepage teaser shows up to 4. |
| Optional settings logo | `SiteSettings.logoUrl` | Falls back to bundled `logo.png` via `src/lib/mappers.ts`. |

**Assumption:** seeded DB does not ship product/gallery photos (`prisma/seed.ts` only settings + admin user). Any real product/gallery photography lives only in deployed upload storage.

### Authenticity summary

| Asset | Appears to be actual Sami business photography? |
|---|---|
| Logo / favicon / OG | **Yes (brand mark)** — illustrated identity, not a photo |
| Hero + category JPGs | **Unclear / unlikely as location docs** — polished studio (or studio-like) product art; no identifiable shop, street, or staff context |
| Product / gallery uploads | **Unknown** — not in repo; treat as the primary source of “locally authentic” imagery once available |

**Constraint honored:** no stock replacement, no generated fake business photos, no asset deletion in this phase.

---

## Reusable Foundation

Preserve these unless a later phase explicitly replaces them:

1. **Architecture** — TanStack Start routes, Prisma data layer, auth, upload pipeline, i18n, SEO helpers, contact link helpers.
2. **Semantic color roles** — steel primary + gold accent can evolve values but the token *structure* (`primary`, `gold`, `steel`, `surface`, etc.) is a good migration path.
3. **`container-x` + section composition pattern** — keep the shell; change density and asymmetry inside sections.
4. **`SiteShell` / `Header` / `Footer` / `Logo` / `ProductCard` / `WhatsAppFab`** — keep as ownership boundaries; restyle rather than rewrite routing.
5. **`src/lib/motion.ts` + reduced-motion CSS** — reuse easing/stagger; simplify choreography.
6. **Homepage data contracts** — featured products + gallery teaser + settings already match an editorial homepage’s content needs.
7. **Category photography set** — strong enough to carry early editorial layouts without new shoots.
8. **Agency credit** — `BuiltByRaafat` placement rules (footer / admin / login).

---

## UI Elements To Rework

What will likely fight the editorial direction (change in later phases, not now):

| Element | Why |
|---|---|
| **Hero layout** | Photo is background at 30% opacity under gradient; copy + 3 “in stock” mini-cards = dashboard-ish first viewport. Needs full-bleed photographic plane, fewer competing chrome pieces. |
| **Category cards** | `rounded-2xl` + border + `shadow-card` + hover lift = marketplace card grid. Prefer image-led editorial blocks / asymmetric rows. |
| **`ProductCard`** | Card chrome, pill badges, hover arrow circle, shadow lift — ecommerce catalog language. |
| **Radius system (`0.875rem`+)** | Soft app corners; editorial usually wants sharper or rule-based edges. |
| **Typography pair** | Inter + Space Grotesk skews SaaS; display/serif or stronger local-character pairing TBD in redesign. |
| **Logo presentation** | Full illustrated badge at 36–44px in header/footer is visually loud against minimal chrome. |
| **Gold uppercase eyebrows** everywhere | Useful hierarchy, but overused they feel template-y; editorial can use fewer labels + stronger type. |
| **Visit CTA “card”** | Nested `rounded-2xl` primary panel with dual buttons — keep function, lose card-in-card look. |
| **OG / favicon** | Logo-as-OG undermines photographic brand when sharing. |
| **Unused `steel-gradient`** | Either adopt intentionally or drop in a cleanup phase (not required for redesign). |

Admin UI can stay card/dashboard-oriented; public surfaces should diverge.

---

## Proposed Editorial Direction

Practical implementation language (for later phases):

- **World:** light editorial trading house — paper-like or soft warm/cool neutrals, deep ink type, restrained gold as a rare accent (rules, underlines, one CTA), large photography, generous whitespace, occasional asymmetry.
- **Type:** replace or heavily restyle display/body pairing; larger display sizes, tighter editorial measure for body, less all-caps chrome.
- **Imagery:** hero and category art bleed edge-to-edge or sit as primary compositional planes; product/gallery uploads preferred for authenticity when present; never invent business photos.
- **Layout:** one job per section; avoid card grids as the default; use rules, columns, overlapping image/text, and horizontal rhythm instead of equal card decks.
- **Radius / shadow:** reduce global radius; demote shadows to near-zero on public marketing surfaces.
- **Motion:** keep Framer; prefer opacity/y reveals and slow image pans over hover-lift cards and bouncing pills.
- **Logo:** keep asset; introduce quieter header treatment (cropped mark or wordmark) without deleting the illustrated file.
- **Do not:** purple SaaS gradients, cream+serif+terracotta cliché, broadsheet pastiche, fashion-luxury excess, Apple-minimal clone, ecommerce marketplace density.

---

## Recommended Homepage Direction

Intended *future* section structure (not implemented):

1. **Full-bleed hero** — brand name as hero-level signal + one headline + one short line + one CTA group over/beside dominant photography (reuse `hero.jpg` until authentic site photos exist). No in-stock badge strip.
2. **Category manifesto** — three image-led entries (bikes / pumps / scales) in an asymmetric editorial row or stacked spreads, not equal rounded cards.
3. **Selected goods** — featured products as a quiet horizontal or magazine strip (reuse loader + `ProductCard` data; restyle presentation).
4. **From the floor / gallery** — larger photographic teaser from real gallery uploads when available.
5. **Why Sami** — short proof points as typography + rules, not icon-in-rounded-square tiles (or one restrained icon treatment).
6. **Visit Dire Dawa** — address/hours + direct call/WhatsApp without nested marketing card chrome.
7. **Footer** — quieter mark, navigate, reach us, Built by RAAFAT-Technolgies.

Routing, loaders, i18n keys, and contact behavior stay; composition and surface styling change.

---

## Audit metadata

| Item | Detail |
|---|---|
| Date | 2026-09-26 |
| Files changed this phase | `docs/UI-REDESIGN-AUDIT.md` only |
| Out of scope (untouched) | Prisma, auth, routes architecture, product/gallery logic, i18n/SEO backends, asset binaries |
| Assumptions | (1) No local `data/uploads` tree was available to inspect product/gallery photos. (2) Hero/category JPGs are treated as existing brand photography of unknown shoot provenance — suitable visually, not verified as on-premise Sami photos. (3) Logo is the real business mark. (4) Nested `new/` and `.kilo/` trees are reference/worktree copies and were not treated as production sources of truth. |
