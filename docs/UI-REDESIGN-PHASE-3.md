# Sami UI Redesign — Phase 3

**Scope:** Homepage Featured Products (“Available now”) only.  
**Direction:** Editorial catalogue spreads (continues Phase 1–2).  
**Date:** 2026-09-26

---

## What changed

Replaced the homepage Featured **4-column `ProductCard` carousel/grid** with stacked editorial product features: large photography, asymmetric 7/5 image–text layouts, restrained metadata, and no cards/shadows/pills/horizontal scroll.

Product data source unchanged: loader still returns `products.slice(0, 4)`. Links still go to `/catalog/$id`. `ProductCard.tsx` untouched (catalog continues to use it).

---

## Files changed

| File | Change |
|---|---|
| `src/components/site/Featured.tsx` | New homepage-only featured showcase |
| `src/routes/index.tsx` | Uses `Featured`; removes local card grid |
| `docs/UI-REDESIGN-PHASE-3.md` | This report |

**Not changed:** Header, Hero, Categories, Gallery, WhyUs, Visit, Footer, ProductCard, product fns/types, Prisma, auth, i18n keys, SEO, fonts, logo.

---

## Layout decisions

### Section header

- Gold rule + `home.featured.sub` (“From the catalog”)
- Large display title: `home.featured.title` (“Available now”)
- Catalog action: underline link with `home.featured.more` (“View all products”)

### Each featured product

Alternating desktop composition (odd: text left / image right; even: image left / text right):

- Editorial number `01`…`04` in gold  
- Category badge (+ subtype when present) as quiet uppercase metadata  
- Product name as primary display link  
- Truncated existing description (EN/AM) when present — no invented copy  
- `product.priceInquire` (“Contact for price”) — no invented pricing  
- Underline action uses the **localized product name** (no new “View product” i18n key; none existed)  
- Image links to the same product detail route; missing `product.image` → empty muted plane (no stock fill)

---

## Responsive behavior

| Viewport | Behavior |
|---|---|
| Desktop | Alternating 7/5 spreads; substantial vertical rhythm |
| Mobile | **Intentional order:** number → large image → category/subtype → name → description → price line → name link. No horizontal scroll. |

---

## Motion / accessibility

- Slow `whileInView` fade + slight vertical reveal (header + each feature)
- Subtle image scale on hover when motion allowed
- `prefers-reduced-motion`: no offset entrance, no hover scale
- Existing `EASE` / `revealTransition`
- Image and title/links remain keyboard-focusable `<Link>`s; image `aria-label` = product name
- EN/AM via existing `useI18n` + `nameEn`/`nameAm` / descriptions

---

## Validation

| Check | Result |
|---|---|
| ESLint (`Featured.tsx`, `index.tsx`) | Pass |
| `npm run build` | Pass |
| Full-repo lint | Pre-existing Prettier noise elsewhere — not from Phase 3 |

---

## Known limitations

1. No dedicated “View product” translation — action label reuses the product name.
2. Featured list is empty until products exist in the DB (section still conditionally omitted).
3. Gallery / WhyUs / Visit below remain card-like until later phases.
4. Product photography quality depends on admin uploads; Phase 3 does not replace assets.
