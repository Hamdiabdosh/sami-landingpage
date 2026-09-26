# Sami UI Redesign — Phase 1

**Scope:** Header + Hero (above-the-fold) only.  
**Direction:** Editorial / premium Ethiopian trading house.  
**Date:** 2026-09-26

---

## Files changed

| File | Change |
|---|---|
| `src/components/site/Header.tsx` | Quiet editorial header presentation |
| `src/components/site/Hero.tsx` | New editorial hero component (extracted from homepage) |
| `src/routes/index.tsx` | Imports `Hero`; other sections untouched |
| `docs/UI-REDESIGN-PHASE-1.md` | This report |

**Not changed:** Categories, Featured, Gallery, WhyUs, Visit, Footer, Catalog, About, Contact, Prisma, auth, routing, i18n keys/architecture, SEO, logo asset, `hero.jpg`.

---

## Design decisions

### Header

- Sticky bar with light paper wash; thin border + soft blur only after scroll.
- **1px gold** scroll-progress line as the sole accent chrome.
- Navigation is type + spacing only (`gap-10`); active state = thin gold underline.
- **Single Contact** destination (in primary nav only — no duplicate CTA).
- Language switcher: `EN / AM` text with gold underline on active (no pills).
- Logo: smaller scale + slight opacity so the illustrated mark sits quieter without redesigning the asset.
- Mobile: borderless icon button, generous tap targets, rule-separated list.

### Hero

- Desktop **5 / 7** split: typography column + photographic plane (`min-h ≈ 92vh`).
- Hierarchy:
  1. Eyebrow — `hero.tag` + short gold rule  
  2. Large **SAMI / GENERAL / TRADING** identity (Space Grotesk, steel primary)  
  3. Gold hairline separating identity from message  
  4. Headline from `hero.title` (message, bolder weight)  
  5. Supporting `hero.sub`  
  6. One CTA — underline link to catalog (`cta.catalog`)
- Removed: category badges, dual CTAs, full-bleed dark overlay, blur blob, card chrome.
- Photography: existing `hero.jpg`, `object-cover`, no heavy overlays/gradients.
- Motion: slow opacity (+ light y) reveal choreography via existing Framer Motion + `EASE`; respects `prefers-reduced-motion`.
- Fonts/tokens: Space Grotesk + Inter; existing primary / gold / muted tokens.

### Copy (preserved)

| Key | Notes |
|---|---|
| `hero.tag` | Kept as-is. EN “Dire Dawa · Since establishment” is awkward (see Remaining). |
| `hero.title` | Kept; split on `.` for two-line editorial set. |
| `hero.sub` | Kept; category story lives here until Phase 2 Categories. |
| `cta.catalog` | Kept as sole primary action. |

No invented claims or statistics.

---

## Responsive considerations

| Breakpoint | Behavior |
|---|---|
| Desktop (~1280–1440) | Side-by-side 5/7 composition; ~90vh+ height |
| Laptop | Same grid; clamp type scales down |
| Tablet / mobile | **Intentional stack**, not a collapsed desktop grid: brand → headline → description → CTA → substantial photo band (~58–62vh) |
| Photo crop | `object-[center_38%]` on small screens; centered on large |

---

## Validation

| Check | Result |
|---|---|
| ESLint (`Header.tsx`, `Hero.tsx`) | Pass (after Prettier on these files) |
| `npm run build` | Pass |
| Full-repo `npm run lint` | Still fails on **pre-existing** Prettier issues in untouched files — not modified |

---

## Remaining visual issues

1. **`hero.tag` EN copy** — “Since establishment” is vague; recommend a copy pass later (not rewritten in Phase 1).
2. **Illustrated logo** still busy at header size; quieter presentation only — wordmark treatment deferred.
3. **Homepage below the fold** still uses the old card-heavy language (Categories, ProductCard, etc.) — intentional until later phases.
4. **Production domain conflict** (Istiqama/Next.js intermittently sharing `sami.raafat.site`) is a Coolify routing issue, unrelated to this UI phase — fix in Coolify by binding the domain only to Sami.
