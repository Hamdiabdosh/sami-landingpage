# Sami UI Redesign — Phase 4

**Scope:** Homepage Gallery teaser only.  
**Direction:** Editorial photographic story (continues Phase 1–3).  
**Date:** 2026-09-26

---

## What changed

Replaced the equal 2×2 / 4-column rounded image grid with an asymmetric editorial photography composition: one dominant frame, supporting frames, and intentional whitespace.

Data source unchanged: homepage loader still passes `gallery.slice(0, 4)`. Full `/gallery` page untouched.

---

## Files changed

| File | Change |
|---|---|
| `src/components/site/GalleryTeaser.tsx` | New homepage-only editorial teaser |
| `src/routes/index.tsx` | Imports `GalleryTeaser`; removes local card grid |
| `docs/UI-REDESIGN-PHASE-4.md` | This report |

**Not changed:** Header, Hero, Categories, Featured, WhyUs, Visit, Footer, ProductCard, gallery fns/types, full Gallery page, Prisma, auth, i18n keys, SEO, fonts, logo.

---

## Layout decisions

### Header

- Gold rule + `home.gallery.sub` (“Inside the shop”)
- Large display title: `home.gallery.title`
- Underline action: `home.gallery.more` → `/gallery`

### Desktop composition (~12-col)

| Cell | Role |
|---|---|
| Cols 1–7, 2 rows | Dominant image (first gallery item) |
| Cols 8–12 | Support image 02 |
| Cols 8–12 | Support image 03 |
| Cols 1–5 | Support image 04 |
| Cols 6–12 | Editorial whitespace + existing `gallery.sub` line |

No cards, rounded corners, shadows, overlays, or caption chips on images.

### Photography

- `img.src` only; `object-cover`; deliberate aspects
- Subtle hover scale when motion allowed
- Every frame links to `/gallery`
- `alt` = localized caption when present; otherwise empty (no invented descriptions)

---

## Responsive behavior

| Viewport | Behavior |
|---|---|
| Desktop | Asymmetric mosaic with breathing room |
| Mobile | Vertical stack: dominant (taller 4:5) then supporting 5:4 frames — substantial, no horizontal scroll, no tiny thumbs |

---

## Motion / accessibility

- Slow `whileInView` fade + slight y
- Staggered delays on frames
- `prefers-reduced-motion`: no offset / no hover scale
- Keyboard-accessible `<Link>` wrappers
- EN/AM captions via `useI18n` for `alt` only

---

## Validation

| Check | Result |
|---|---|
| ESLint (`GalleryTeaser.tsx`, `index.tsx`) | Pass |
| `npm run build` | Pass |
| Full-repo lint | Pre-existing Prettier noise elsewhere — not from Phase 4 |

---

## Known limitations

1. Section omitted when gallery is empty (same as before).
2. With fewer than 4 images, support cells simply omit (composition still works).
3. Full Gallery page still uses the older masonry/card treatment — out of Phase 4 scope.
4. WhyUs / Visit below remain pre-redesign until later phases.
