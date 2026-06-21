Got it. Here's my understanding:
Sami General Trading needs a visually stunning, animation-rich showcase website for its bicycles/spare parts, water pumps, and scales business in Dire Dawa. Customers should be able to browse products and easily reach Sami via phone/WhatsApp/Telegram/email or find the shop on the map — no online checkout needed. Sami (sole admin) needs a simple back-end panel to manage products, categories, and site content himself without needing technical help.
Does this capture it correctly?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 SPEC BLOCK — Phase 1: Idea Investigation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project Name: Sami General Trading — Website

Type: Business Showcase Website + Lightweight Admin CMS

Problem Solved: Sami General Trading currently has no online presence; potential customers in Dire Dawa (and beyond) have no way to browse the store's product range or get in touch/find the location without visiting in person or asking around directly.

Vision: A breathtaking, animation-driven website that presents Sami General Trading's three product lines (bicycles & spare parts, water pumps, scales) with strong visual craft befitting a serious trading business — paired with frictionless contact paths (call, WhatsApp, Telegram, email, map) — and a dead-simple admin area where Sami alone can add/edit/remove products and update content without touching code.

Out of scope (for now): Online ordering, payments, checkout, customer accounts.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 AI PROMPT — Phase 1: Idea Investigation (Master Vision)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: Sami General Trading Website

VISION:
Build a visually stunning, animation-rich showcase website for Sami General
Trading, a general trading business in Dire Dawa, Ethiopia, selling bicycles
& bike spare parts, water pumps, and scales (various types). The site must
feel premium and trustworthy through motion design and polish — NOT a
generic template. It is a showcase + contact site, NOT an e-commerce
checkout system. A single owner-admin (non-technical) must be able to
manage all products and content through a simple admin panel.

OUT OF SCOPE: online payments, checkout, cart, customer accounts.

CONSTRAINTS:
- No online payment processing
- Admin UX must be simple enough for a non-technical single user
- Must support: product catalog (3 categories), contact info (phone,
  WhatsApp, Telegram, email), embedded map location, owner branding (logo)
Happy with this? Ready for Phase 2: System Understanding (actors + master context)?You said: ContinueContinue6:13 PMClaude responded: Phase 2 — System UnderstandingPivoted toward clarifying content scope and multilingual requirementsPivoted toward clarifying content scope and multilingual requirementsPhase 2 — System Understanding
Quick questions:You said: Q: Language(s) for the site?Q: Language(s) for the site?
A: English + AmharicQ: Roughly how many products will Sami list to start?
A: Under 20Q: Should products show prices, or just details + "contact for price"?
A: Contact for price (no prices shown)6:13 PMClaude responded: Good — small catalog, bilingual, inquiry-based pricing.Good — small catalog, bilingual, inquiry-based pricing. That keeps things lean.
Understanding check: Two actors — Public Visitor (browses products in EN/AM, contacts via call/WhatsApp/Telegram/email, views map) and Admin/Owner (Sami — logs in, manages <20 products across 3 categories, edits contact/about info, no price fields needed beyond optional notes). Correct?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 SPEC BLOCK — Phase 2: System Understanding

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Actors:

Public Visitor — browses categories/products, switches EN/AM, contacts via phone/WhatsApp/Telegram/email, views map location, sees store branding/logo
Admin (Sami) — single authenticated user; logs into a simple dashboard; creates/edits/deletes products (name, category, description EN+AM, images, optional spec notes); edits store contact info if it changes; no price management needed (contact-for-price model)

Language Strategy: Bilingual EN/AM with a toggle; content fields (product name, description) stored per-language; UI labels translated.
Core Modules (preview for Phase 3):

Public site: Home/Hero, Product Catalog (3 categories), Product Detail, Contact/Location, About
Admin: Auth (login), Product Management, (maybe) Category management, Site Settings (contact info)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 AI PROMPT — Phase 2: System Understanding (Master Context)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: Sami General Trading Website
VISION: Visually stunning, animation-rich bilingual (EN/AM) showcase site
for a Dire Dawa trading business selling bicycles & spare parts, water
pumps, and scales. Contact-for-price model, no checkout. Single
non-technical admin manages a small catalog (<20 products).

ACTORS:
1. Public Visitor — browse, switch language, contact via phone/WhatsApp/
   Telegram/email, view map
2. Admin (Sami) — single user, authenticated, manages products + contact
   info via simple dashboard

CONSTRAINTS:
- No payments/checkout/cart
- Bilingual content (EN + AM) on all product/site text
- Admin must be extremely simple (single non-technical user)
- Small data volume (<20 products) — don't over-engineer the backend
Ready for Phase 3: Module Decomposition?You said: ContinueContinue6:14 PMClaude responded: Phase 3 — Module DecompositionOrchestrated module decomposition through inquiry and categorizationOrchestrated module decomposition through inquiry and categorizationPhase 3 — Module DecompositionYou said: Q: Want a 'gallery' or 'past work/clients' section, or keep it strictly to the 3 product categories?Q: Want a 'gallery' or 'past work/clients' section, or keep it strictly to the 3 product categories?
A: Yes, a gallery/portfolio sectionQ: Want a per-product "Inquire about this" button that opens WhatsApp/Telegram with a pre-filled message?
A: Yes - simple WhatsApp/Telegram inquiry button per productQ: Want a short 'About the business' section (story, years in business, etc.)?
A: Yes, short About section6:14 PMClaude responded: Great, that rounds the site out nicely.Great, that rounds the site out nicely. Here's the module breakdown:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 SPEC BLOCK — Phase 3: Module Decomposition

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Public-facing modules:

Hero/Home — animated landing, brand intro, language toggle, entry points to catalog/contact
Product Catalog — 3 categories (Bicycles & Parts, Water Pumps, Scales), grid with filtering by category
Product Detail — images, EN/AM description, specs, "Inquire via WhatsApp/Telegram" button (pre-filled message with product name)
Gallery — photos of products/store/work, lightbox view
About — short business story, years active, location
Contact — phone, WhatsApp, Telegram, email, embedded Google Map, contact form (optional) → sends to email or WhatsApp

Admin modules:

7. Auth — single-user login (Sami only)

8. Product Management — CRUD for products (name EN/AM, category, description EN/AM, images, specs)

9. Gallery Management — upload/remove gallery images

10. Site Settings — edit contact info, about text, social links (in case phone/email ever changes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 AI PROMPT — Phase 3: Module Decomposition (Module Context)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: Sami General Trading Website
[Carry forward Vision + Actors from Phase 1-2]

MODULES:
Public: Hero/Home, Product Catalog, Product Detail (w/ WhatsApp/Telegram
inquiry deep-link), Gallery, About, Contact (map + form)
Admin: Auth (single user), Product Management (CRUD), Gallery Management
(CRUD), Site Settings (contact/about text editing)

CONSTRAINTS:
- All public content bilingual (EN/AM)
- Inquiry button generates a pre-filled WhatsApp/Telegram link using
  product name, no backend messaging logic needed
- Admin is single-user — no roles/permissions system needed
- Keep modules decoupled: Site Settings should not require redeploying
  the site (i.e. content must be DB-driven, not hardcoded)
Ready for Phase 4: Deep Module Analysis — we'll start with whichever module you want to detail first. I'd suggest starting with Product Management (the core of the admin), then Product Catalog/Detail on the public side. Sound good?You said: ContinueContinue6:16 PMClaude responded: Phase 4 — Deep Module Analysis: Product ManagementOrchestrated deep module analysis commencing with product management inquiryOrchestrated deep module analysis commencing with product management inquiryPhase 4 — Deep Module Analysis: Product ManagementYou said: Q: How many images per product?Q: How many images per product?
A: One photo per productQ: Do products need sub-categories, or is the top-level category (Bicycles & Parts / Water Pumps / Scales) enough?
A: Category + sub-type (e.g. bike vs spare part vs scale type)Q: How should product specs work?
A: Structured spec fields (e.g. brand, model, weight capacity)6:17 PMClaude responded: Makes sense.Reconciled structured specs with admin simplicity through flexible designReconciled structured specs with admin simplicity through flexible designMakes sense. Since Sami's non-technical and the catalog is small, I'll design specs as simple flexible key-value pairs (e.g. "Brand: Phoenix", "Capacity: 500kg") rather than rigid per-category schemas — gives structure without complexity.
Understanding check: Each product has one photo, belongs to a category + sub-type, and has a short list of label/value spec rows Sami can add freely (no fixed schema per category). Sound right?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 SPEC BLOCK — Phase 4: Deep Module Analysis — Product Management

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Entity: Product
FieldTypeNotesidUUIDprimary keyname_enstringrequiredname_amstringrequiredcategoryenumBicycles & Parts / Water Pumps / Scalessubtypestringfree text, e.g. "Mountain Bike", "Brake Pad", "Digital Scale"description_entextrequireddescription_amtextrequiredimage_urlstringone image, uploaded via adminspecsJSON array[{label, value}, ...] — admin adds/removes rows freelyis_activebooleantoggle visibility on public site without deletingcreated_at / updated_attimestampauto
Admin actions: Create, Edit, Delete, Toggle active/inactive, Reorder (optional, nice-to-have), Search/filter by category in admin list view.
Validation rules:

name_en, name_am, category, description_en, description_am required before publish
image required before marking active
subtype optional but recommended

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 AI PROMPT — Phase 4: Product Management Module

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Carry forward Vision, Actors, Modules from Phases 1-3]

MODULE: Product Management (Admin)

ENTITY: Product
- id (uuid)
- name_en, name_am (string, required)
- category (enum: bicycles_parts | water_pumps | scales)
- subtype (string, optional)
- description_en, description_am (text, required)
- image_url (string, single image)
- specs (jsonb array of {label, value} pairs, admin-editable list)
- is_active (boolean, default false until published)
- created_at, updated_at

ADMIN UX REQUIREMENTS:
- Simple list view of all products, filterable by category, with active/
  inactive indicator
- Create/edit form: text inputs for EN/AM fields side by side, category
  dropdown, subtype text input, image upload (single), dynamic spec rows
  (add/remove label-value pairs), active toggle
- Delete with confirmation
- No bulk import needed (small catalog, manual entry is fine)
- Validate required fields before allowing "active" status

CONSTRAINTS:
- Single admin user, no roles
- Keep the form on ONE page, no multi-step wizard (small catalog, simple UX)
Ready for Phase 5: Smart Chunking for this module, or want to knock out the other modules' deep analysis first (Gallery, Site Settings, Product Catalog/Detail) before chunking everything together?You said: ContinueContinue6:17 PMClaude responded: Let's wrap up the remaining module specs quickly — these are simpler so I'll move faster.Expedited remaining module analysis before consolidating specificationsExpedited remaining module analysis before consolidating specificationsLet's wrap up the remaining module specs quickly — these are simpler so I'll move faster.You said: Q: Gallery: just images, or images with captions/labels?Q: Gallery: just images, or images with captions/labels?
A: Images + short caption textQ: Contact page: include an actual form, or just clickable contact buttons (call/WhatsApp/Telegram/email)?
A: No, just buttons/links to WhatsApp/Telegram/email6:18 PMClaude responded: Simpler is better here — no form means no backend mail handling to worry about, just direct deep-links.Simpler is better here — no form means no backend mail handling to worry about, just direct deep-links.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 SPEC BLOCK — Phase 4 (cont.): Remaining Modules

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Entity: GalleryImage
FieldTypeNotesidUUIDimage_urlstringrequiredcaption_en / caption_amstringoptional short captionsort_orderintfor manual orderingcreated_attimestamp
Entity: SiteSettings (single row, admin-editable)
FieldTypeNotesabout_en / about_amtextAbout section contentphonestring0936999996whatsappstring0936999996telegram_handlestring@SamiAzizKurtuemailstringSamikurtu3@gmail.commap_urlstringGoogle Maps linklogo_urlstringuploaded logo
Product Catalog/Detail (public):

Catalog: grid view filterable by category, each card shows image, name (current language), category badge
Detail: full image, name, description, specs table, sub-type, "Inquire" button → https://wa.me/2519XXXXXXXX?text=... and Telegram link, pre-filled with product name
All text respects EN/AM toggle stored in URL or local state

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 AI PROMPT — Phase 4 (cont.): Gallery, Settings, Catalog/Detail

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Carry forward Vision, Actors, Modules, Product entity from prior phases]

MODULE: Gallery Management (Admin) + Gallery (Public)
ENTITY: GalleryImage { id, image_url, caption_en, caption_am, sort_order,
created_at }
ADMIN UX: simple list, upload image + optional captions, drag-to-reorder
(or manual sort_order number), delete with confirmation
PUBLIC UX: responsive grid, lightbox on click, caption shown in current
language

MODULE: Site Settings (Admin) + reflected across Public site
ENTITY: SiteSettings (singleton row) { about_en, about_am, phone,
whatsapp, telegram_handle, email, map_url, logo_url }
ADMIN UX: single settings form, all fields editable, image upload for logo
PUBLIC UX: About section pulls about_en/am; Contact section renders
phone/WhatsApp/Telegram/email as clickable links/buttons + embedded map
from map_url; footer/header use logo_url

MODULE: Product Catalog + Product Detail (Public)
- Catalog: category-filterable grid, animated card transitions
- Detail page: image, name, description, specs table, subtype, two
  buttons: "Inquire on WhatsApp" (deep link wa.me/<number>?text=<product
  name + inquiry phrase, localized>) and "Inquire on Telegram"
  (t.me/<handle>)
- No contact form anywhere on site — only direct links/buttons to phone,
  WhatsApp, Telegram, email (mailto:)

CONSTRAINTS:
- No backend email/SMS sending logic needed — all "contact" actions are
  client-side deep links
- EN/AM toggle affects all rendered text sitewide
That completes Phase 4 for all modules. Ready for Phase 5: Smart Chunking — breaking this into buildable task chunks?You said: ContinueContinue6:19 PMClaude responded: Given your usual workflow (Claude → plan, Lovable → UI, Cursor → backend wiring), I'll structure chunks to match that pattern.Orchestrated workflow-aligned chunking strategy with tech stack verificationOrchestrated workflow-aligned chunking strategy with tech stack verificationGiven your usual workflow (Claude → plan, Lovable → UI, Cursor → backend wiring), I'll structure chunks to match that pattern.You said: Q: Use your usual stack (TanStack Start + Prisma + PostgreSQL + Better Auth + Tailwind/shadcn), or something lighter given this is a small catalog site?Q: Use your usual stack (TanStack Start + Prisma + PostgreSQL + Better Auth + Tailwind/shadcn), or something lighter given this is a small catalog site?
A: Yes, same stack (TanStack Start + Prisma + Postgres + Better Auth)6:20 PMClaude responded: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━Validated tech stack and prepared next phase specificationValidated tech stack and prepared next phase specification━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 SPEC BLOCK — Phase 5: Smart Chunking

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tech Stack (confirmed): TanStack Start, Prisma, PostgreSQL, Better Auth (single admin user), Tailwind CSS + shadcn/ui, Cloudinary for image hosting, Coolify for deployment. Animation: Framer Motion (or GSAP for the hero) since "breathtaking animations" is a core requirement.
Build Chunk Sequence:
#ChunkToolOutput1Database schema (Product, GalleryImage, SiteSettings, Admin user)CursorPrisma schema + migration2Auth setup (Better Auth, single admin, seeded)CursorWorking login/logout3Admin layout shell (sidebar/nav, protected routes)Lovable → Cursor wireAdmin shell4Product Management CRUD (admin)Lovable UI → Cursor wireFull CRUD working5Gallery Management CRUD (admin)Lovable UI → Cursor wireFull CRUD working6Site Settings form (admin)Lovable UI → Cursor wireSettings editable7Public Hero/Home (animated)Lovable UI → Cursor wireAnimated landing8Public Product Catalog (filterable grid, animated cards)Lovable UI → Cursor wireLive data-driven grid9Public Product Detail (specs, inquire buttons)Lovable UI → Cursor wireWorking detail page10Public Gallery (lightbox)Lovable UI → Cursor wireWorking gallery11Public About + Contact (map embed, contact buttons)Lovable UI → Cursor wireWorking contact/about12EN/AM language toggle (sitewide)Cursori18n working across all pages13Polish pass: micro-interactions, page transitions, scroll animationsCursor + manualFinal animation polish14Deploy to CoolifyCursor/manualLive site
Each chunk = one responsibility, matches your Claude→Lovable→Cursor flow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 AI PROMPT — Phase 5: Chunk 1 (Database Schema) — ready to use in Cursor

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: Sami General Trading Website
STACK: TanStack Start, Prisma, PostgreSQL, Better Auth, Tailwind, shadcn/ui

TASK: Create the Prisma schema for this project. Models:

model Product {
  id            String   @id @default(uuid())
  nameEn        String
  nameAm        String
  category      Category
  subtype       String?
  descriptionEn String
  descriptionAm String
  imageUrl      String?
  specs         Json     // array of {label, value}
  isActive      Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum Category {
  BICYCLES_PARTS
  WATER_PUMPS
  SCALES
}

model GalleryImage {
  id         String   @id @default(uuid())
  imageUrl   String
  captionEn  String?
  captionAm  String?
  sortOrder  Int      @default(0)
  createdAt  DateTime @default(now())
}

model SiteSettings {
  id              String  @id @default("singleton")
  aboutEn         String?
  aboutAm         String?
  phone           String
  whatsapp        String
  telegramHandle  String
  email           String
  mapUrl          String
  logoUrl         String?
}

// Plus Better Auth's required User/Session/Account models for a single
// admin user (no public registration — seed the one admin manually)

CONSTRAINTS:
- Single admin only — do not build public registration flows
- Generate migration and a seed script that creates the one admin user
  and the singleton SiteSettings row pre-filled with:
  phone: 0936999996, whatsapp: 0936999996, telegramHandle: SamiAzizKurtu,
  email: Samikurtu3@gmail.com, mapUrl: https://maps.app.goo.gl/nYbpaQzwrzp2iBqTA
DELIVERABLE: prisma/schema.prisma, migration files, prisma/seed.ts
Want me to keep generating the rest of the chunk-by-chunk prompts (2-14) now, or move to Phase 6: Database Architecture detail first (entity relationships, indexes) before locking the schema?You said: Generate in one run 2-14Generate in one run 2-146:22 PMClaude responded: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━Orchestrated batch generation of sequential prompts efficientlyOrchestrated batch generation of sequential prompts efficiently━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 AI PROMPTS — Chunks 2–14

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Chunk 2 — Auth Setup (Cursor)
PROJECT: Sami General Trading Website
STACK: TanStack Start, Better Auth, Prisma, PostgreSQL
CONTEXT: Single-admin system, no public registration.

TASK: Set up Better Auth with email/password provider only.
- Create login page at /admin/login
- Protect all /admin/* routes with auth middleware — redirect to
  /admin/login if no session
- Logout button/action in admin layout
- Use the admin user seeded in the Prisma seed script (Chunk 1)
- No signup/registration UI anywhere — admin account is fixed

CONSTRAINTS: Single user only, no roles/permissions, no password reset
flow needed yet (Sami can be given new credentials manually if needed).
DELIVERABLE: working /admin/login, protected route middleware, logout.
Chunk 3 — Admin Layout Shell (Lovable UI → Cursor wire)
LOVABLE PROMPT:
Design a clean, simple admin dashboard shell for a small business owner
(non-technical). Sidebar nav with: Dashboard, Products, Gallery, Settings,
Logout. Use Tailwind + shadcn/ui. Minimal, calm, no clutter — this admin
will be used by someone with no coding background. Include a placeholder
content area for each section.

CURSOR WIRE-UP PROMPT:
Wire the Lovable-generated admin shell into TanStack Start routes under
/admin. Sidebar links route to /admin (dashboard), /admin/products,
/admin/gallery, /admin/settings. Logout calls the Better Auth signOut
action (Chunk 2). Active route highlighted in sidebar.
CONSTRAINT: keep navigation to these 4 items only — no extra admin pages.
Chunk 4 — Product Management CRUD (Lovable → Cursor)
LOVABLE PROMPT:
Design a Product admin page: top has "Add Product" button + category
filter dropdown. Below, a table/list of products showing thumbnail, name,
category, active/inactive badge, edit/delete icons. "Add/Edit Product"
opens a single-page form (not multi-step) with: Name (EN), Name (AM),
Category dropdown, Subtype text input, Description (EN) textarea,
Description (AM) textarea, single image upload with preview, dynamic
spec rows (label + value, add/remove button per row), Active toggle,
Save/Cancel buttons. Clean, simple, big touch targets — non-technical
user.

CURSOR WIRE-UP PROMPT:
Wire this UI to the Product model (Chunk 1). Implement:
- Server functions: listProducts (filter by category), createProduct,
  updateProduct, deleteProduct (with confirm dialog), toggleActive
- Image upload → Cloudinary, store returned URL in imageUrl
- specs field stored/read as JSON array of {label, value}
- Validation: nameEn, nameAm, category, descriptionEn, descriptionAm
  required before isActive can be set true; show inline errors
CONSTRAINT: one page form, no wizard. Single admin, no audit log needed.
Chunk 5 — Gallery Management CRUD (Lovable → Cursor)
LOVABLE PROMPT:
Design a Gallery admin page: grid of uploaded images with caption (EN/AM)
below each, drag handles or up/down arrows to reorder, delete button per
image, "Add Image" button opening upload + caption EN/AM inputs.

CURSOR WIRE-UP PROMPT:
Wire to GalleryImage model. Implement listGalleryImages (ordered by
sortOrder), createGalleryImage (Cloudinary upload), updateSortOrder
(on reorder), deleteGalleryImage (with confirm).
CONSTRAINT: simple reorder UX (arrows are fine, drag-and-drop optional
nice-to-have, not required).
Chunk 6 — Site Settings Form (Lovable → Cursor)
LOVABLE PROMPT:
Design a single settings form page with sections: "About" (About EN
textarea, About AM textarea), "Contact" (Phone, WhatsApp, Telegram
handle, Email inputs), "Location" (Map URL input + live preview),
"Branding" (logo upload + preview). One "Save Changes" button at bottom.

CURSOR WIRE-UP PROMPT:
Wire to the singleton SiteSettings row. Implement getSettings and
updateSettings server functions (upsert against the fixed "singleton" id).
Logo upload → Cloudinary.
CONSTRAINT: single row, no versioning/history needed.
Chunk 7 — Public Hero/Home (Lovable → Cursor)
LOVABLE PROMPT:
Design a breathtaking animated hero/landing section for "Sami General
Trading," a Dire Dawa, Ethiopia trading business selling bicycles & parts,
water pumps, and scales. Use the uploaded logo (gears/saw/bike/wrench +
"SAMI" wordmark) as a brand anchor. Strong motion design: animated entry
(staggered reveal), subtle parallax or scroll-triggered reveals, smooth
category preview cards linking to the 3 product categories, clear CTAs
to Catalog and Contact. Premium, trustworthy feel — not generic template.
Tailwind + Framer Motion.

CURSOR WIRE-UP PROMPT:
Wire hero CTAs to /catalog and /contact routes. Pull logo from
SiteSettings.logoUrl. Ensure animations are performant (lazy-load below-
fold content, respect prefers-reduced-motion).
CONSTRAINT: animations must degrade gracefully on low-end mobile (common
in target market) — test perceived performance, not just desktop.
Chunk 8 — Public Product Catalog (Lovable → Cursor)
LOVABLE PROMPT:
Design a product catalog page: category filter tabs/pills (Bicycles &
Parts / Water Pumps / Scales / All), animated grid of product cards
(image, name in current language, subtype, category badge), smooth
filter transitions (cards animate in/out on filter change), empty state
if a category has no active products.

CURSOR WIRE-UP PROMPT:
Wire to listProducts (only isActive=true), filter client-side or via
query param by category. Card click routes to /catalog/[id]. Respect
current language (EN/AM) for displayed name.
CONSTRAINT: only show isActive products publicly; inactive/draft never
leak to public routes.
Chunk 9 — Public Product Detail (Lovable → Cursor)
LOVABLE PROMPT:
Design a product detail page: large image, name + subtype + category
badge, description, specs rendered as a clean label/value table, two
prominent buttons — "Inquire on WhatsApp" and "Inquire on Telegram" —
plus secondary phone/email links. Animated entrance, image zoom-on-hover
or subtle parallax.

CURSOR WIRE-UP PROMPT:
Wire to getProductById (404 if not found or inactive). Build WhatsApp
deep link: https://wa.me/<whatsapp number, no +/0 prefix per wa.me format>
?text=<URL-encoded message including product name, localized to current
language>. Build Telegram deep link: https://t.me/SamiAzizKurtu. Pull
both from SiteSettings rather than hardcoding, so Sami can update numbers
without a redeploy.
CONSTRAINT: no contact form, only deep links. Validate wa.me number
formatting (Ethiopian numbers need country code 251 prefix, dropping
leading 0).
Chunk 10 — Public Gallery (Lovable → Cursor)
LOVABLE PROMPT:
Design a gallery page: responsive masonry/grid of images with caption
overlay on hover, click opens a lightbox (full image, caption, prev/next
navigation), smooth fade/scale transitions.

CURSOR WIRE-UP PROMPT:
Wire to listGalleryImages (ordered by sortOrder). Lightbox keyboard
navigation (arrows, Esc to close). Lazy-load images below the fold.
Chunk 11 — Public About + Contact (Lovable → Cursor)
LOVABLE PROMPT:
Design an About section (story + years active, pulled from settings) and
a Contact page: clickable buttons/icons for Call, WhatsApp, Telegram,
Email, plus an embedded Google Map (from map URL) and store address text.
Clean, animated section reveals on scroll.

CURSOR WIRE-UP PROMPT:
Pull all text/links from SiteSettings. Phone → tel: link, WhatsApp →
wa.me deep link, Telegram → t.me link, Email → mailto: link. Embed map
via iframe using the Google Maps share URL (or convert to embed format).
CONSTRAINT: no contact form — confirmed direct-link-only approach.
Chunk 12 — EN/AM Language Toggle (Cursor)
TASK: Implement sitewide language toggle (EN/AM) for the public site.
- Toggle in header, persists via URL param or localStorage
- All static UI labels translated (use a simple i18n dictionary file,
  no heavy i18n library needed given small scope)
- Dynamic content (product names/descriptions, gallery captions, about
  text) already stored per-language in DB — render the field matching
  current language, fallback to EN if AM is empty
CONSTRAINT: admin panel stays English-only (Sami's working language for
content entry); only the PUBLIC site needs the toggle.
Chunk 13 — Polish Pass (Cursor + manual review)
TASK: Final animation/interaction polish across the public site.
- Smooth page transitions between routes
- Scroll-triggered reveals on About/Contact/Gallery sections
- Hover/tap micro-interactions on buttons and cards
- Loading states/skeletons for data-driven sections (catalog, gallery)
- Audit for prefers-reduced-motion support
- Mobile performance pass (test on mid/low-tier Android given target
  market in Dire Dawa)
CONSTRAINT: animation should feel premium but never block content or
hurt load time on slow connections.
Chunk 14 — Deploy (Cursor/manual)
TASK: Deploy to Coolify.
- Provision PostgreSQL instance
- Set env vars (DATABASE_URL, Better Auth secret, Cloudinary keys)
- Run migrations + seed script (admin user + default SiteSettings)
- Point domain, verify SSL
- Smoke test: admin login, create a product, verify it appears publicly,
  test WhatsApp/Telegram deep links on a real phone
That's the full build sequence, Chunks 1–14. Want me to move to Phase 6: Database Architecture (relationships/indexes deep dive) next, or do you have what you need to start handing these to Cursor/Lovable now?You said: Give me the prompt that is needed for lovable.Give me the prompt that is needed for lovable.dev6:24 PMClaude responded: Here's a single comprehensive prompt to paste into Lovable to scaffold the entire UI in one shot — design system + all pages.Consolidated comprehensive Lovable prompt covering design system and pagesConsolidated comprehensive Lovable prompt covering design system and pagesHere's a single comprehensive prompt to paste into Lovable to scaffold the entire UI in one shot — design system + all pages. Lovable works best with one rich initial prompt rather than 14 fragmented ones.
Build a visually stunning, animation-rich website for "Sami General Trading," 
a trading business in Dire Dawa, Ethiopia selling bicycles & bike spare parts, 
water pumps, and scales (weighing equipment). This is a showcase/catalog site 
— NOT e-commerce, no checkout or cart. The brand should feel premium and 
trustworthy, not like a generic template. Logo features gears/saw/bike/wrench 
imagery with a "SAMI" wordmark.

DESIGN DIRECTION:
- Strong motion design throughout: staggered entrance animations, scroll-
  triggered reveals, smooth hover/tap micro-interactions, animated page 
  transitions
- Color palette: industrial/trustworthy tones (consider deep steel blue or 
  charcoal as primary, with a warm gold/amber accent echoing the logo's 
  metallic gear theme) — propose a cohesive palette
- Typography: confident, modern, readable — avoid generic SaaS fonts
- Mobile-first: target market is Dire Dawa, many users on mid/low-tier 
  Android phones, so animations must feel premium but stay lightweight
- Respect prefers-reduced-motion

PAGES / SECTIONS:

1. HOME / HERO
   - Animated hero with brand intro, logo placement, tagline
   - Three animated category preview cards: "Bicycles & Spare Parts," 
     "Water Pumps," "Scales" — each links into the catalog filtered by 
     that category
   - Clear CTAs to Catalog and Contact
   - Language toggle (EN / Amharic) visible in header

2. PRODUCT CATALOG
   - Category filter pills/tabs: All / Bicycles & Parts / Water Pumps / 
     Scales
   - Animated grid of product cards: image, name, subtype, category badge
   - Smooth filter transitions (cards animate in/out on filter change)
   - Empty state for a category with no products
   - NO prices shown anywhere — this business uses "contact for price"

3. PRODUCT DETAIL (dynamic page per product)
   - Large product image, name, subtype, category badge, description
   - Specs shown as a clean label/value table (e.g. Brand, Model, Capacity)
   - Two prominent buttons: "Inquire on WhatsApp" and "Inquire on Telegram"
   - Secondary links: call, email
   - Subtle image zoom/parallax on scroll or hover

4. GALLERY
   - Responsive grid/masonry of photos with short captions
   - Caption overlay on hover, click opens lightbox with prev/next nav

5. ABOUT
   - Short business story/years active section with scroll-reveal animation

6. CONTACT
   - Large, clear clickable buttons/icons for: Call, WhatsApp, Telegram, 
     Email — NOT a contact form, just direct deep links
   - Embedded Google Map
   - Store address/location text (Dire Dawa, Ethiopia)

7. ADMIN AREA (separate, simple, non-technical-user-friendly)
   - /admin/login — simple login form
   - /admin dashboard shell with sidebar: Dashboard, Products, Gallery, 
     Settings, Logout
   - Products page: table/list of products (thumbnail, name, category, 
     active badge, edit/delete), "Add Product" opens a SINGLE-PAGE form 
     (not multi-step) with: Name (EN), Name (AM), Category dropdown, 
     Subtype, Description (EN), Description (AM), single image upload 
     with preview, dynamic spec rows (label + value, add/remove), 
     Active toggle
   - Gallery page: grid of images with captions (EN/AM), reorder controls, 
     delete, "Add Image" upload
   - Settings page: About (EN/AM textareas), Contact (phone, WhatsApp, 
     Telegram handle, email), Location (map URL + preview), Branding 
     (logo upload)
   - Keep admin UI calm, minimal, and large-touch-target — built for a 
     non-technical single user, no clutter, no advanced features

CONTENT/DATA TO USE FOR PLACEHOLDERS:
- Business name: Sami General Trading
- Location: Dire Dawa, Ethiopia
- Phone/WhatsApp: 0936999996
- Telegram: @SamiAzizKurtu
- Email: Samikurtu3@gmail.com
- Product categories: Bicycles & Spare Parts, Water Pumps, Scales

CONSTRAINTS:
- No pricing displayed anywhere
- No cart, checkout, or payment UI
- No contact form — only direct call/WhatsApp/Telegram/email links
- Bilingual EN/Amharic toggle affects all public-facing text
- Admin panel can stay English-only

Use Tailwind CSS for styling. Make this feel like a premium small business 
brand, not a template.
Once Lovable generates this, hand the output to Cursor along with the Chunk 1–14 prompts above to wire up the actual Prisma/Postgres/Better Auth backend, since Lovable's output is UI-only.