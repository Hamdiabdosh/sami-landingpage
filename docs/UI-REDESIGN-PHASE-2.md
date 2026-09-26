# Sami UI Redesign — Phase 2

**Scope:** Homepage Categories (“What We Trade”) only.  
**Direction:** Editorial / premium trading house (continues Phase 1).  
**Date:** 2026-09-26

---

## Files changed

| File | Change |
|---|---|
| `src/components/site/Categories.tsx` | New editorial category features component |
| `src/routes/index.tsx` | Imports `Categories`; removes old 3-card grid |
| `docs/UI-REDESIGN-PHASE-2.md` | This report |

**Not changed:** Header, Hero, Featured, Gallery, WhyUs, Visit, Footer, ProductCard, catalog/about/contact routes, Prisma, auth, i18n keys, SEO, fonts, logo, category image assets.

---

## Layout decisions

Replaced equal `md:grid-cols-3` rounded cards with **three stacked editorial features**.

### Section header

- Thin gold rule + quiet `01 — 03` marker
- Large display title from existing `cats.title` (“What we trade”)
- Omitted `cats.sub` (“Four categories…”) — inaccurate (only three categories); see Remaining

### Each feature (01 bikes · 02 pumps · 03 scales)

Desktop **5 / 7** alternating composition:

| Index | Copy | Image |
|---|---|---|
| 01 Bicycles | left | right |
| 02 Water Pumps | right | left |
| 03 Scales | left | right |

- Large `object-cover` photography (~4:3 / 5:4), no cards, borders, shadows, or pills
- Number in gold (`01`, `02`, `03`)
- Title (display) → description → underline text action (`cat.browse` → `/catalog?cat=…`)
- Image also links to the same catalog filter (accessibility label = category title)

Preserved: category IDs, images (`cat-*.jpg`), titles, descriptions, destinations, translations.

---

## Responsive behavior

| Viewport | Behavior |
|---|---|
| Desktop / laptop | Alternating 5/7 image–text spreads; generous vertical rhythm (`space-y-28`+) |
| Mobile | **Intentional stack per story:** number → title → description → browse link → large image. Not a collapsed desktop grid. |
| Spacing | ~`space-y-20` between stories on small screens |

---

## Motion decisions

- Section header: fade + slight vertical reveal (`whileInView`, once)
- Each story: copy and image reveal independently (image slightly delayed)
- Hover: subtle image scale (`1.03`, ~1.1s) when motion allowed
- CTA arrow nudges on hover
- `prefers-reduced-motion`: no entrance offset, no hover scale
- Uses existing `EASE` / `revealTransition` from `src/lib/motion.ts`

---

## Validation

| Check | Result |
|---|---|
| ESLint (`Categories.tsx` + related) | Pass (after Prettier on phase files) |
| `npm run build` | Pass |
| Full-repo `npm run lint` | Pre-existing Prettier failures elsewhere — **not** introduced by Phase 2 |

---

## Remaining issues

1. **`cats.sub` EN** still says “Four categories…” while the site shows three — needs a copy fix in a later i18n pass (not rewritten here).
2. **Homepage Featured / Gallery / WhyUs / Visit** remain card-heavy — intentional until later phases.
3. Category studio photos still lack on-site Dire Dawa authenticity (Phase 0 audit) — assets unchanged by design.
