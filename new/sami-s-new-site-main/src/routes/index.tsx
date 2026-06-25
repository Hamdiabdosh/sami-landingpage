import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import bikesImg from "@/assets/cat-bikes.jpg";
import pumpsImg from "@/assets/cat-pumps.jpg";
import scalesImg from "@/assets/cat-scales.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sami General Trading — Bicycles, Pumps & Scales · Dire Dawa" },
      {
        name: "description",
        content:
          "Sami General Trading: bicycles & spare parts, water pumps, and weighing scales sourced and serviced in Dire Dawa, Ethiopia.",
      },
      { property: "og:title", content: "Sami General Trading — Dire Dawa" },
      {
        property: "og:description",
        content:
          "Built for work. Trusted in Dire Dawa. Bicycles, water pumps, and weighing scales for farmers, households and industry.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const categories = [
  {
    n: "01",
    title: "Bicycles & Spare Parts",
    blurb: "City, mountain & kids bikes — plus a full range of spares.",
    image: bikesImg,
    href: "/bicycles",
  },
  {
    n: "02",
    title: "Water Pumps",
    blurb: "Surface and submersible pumps for homes, farms and industry.",
    image: pumpsImg,
    href: "/pumps",
  },
  {
    n: "03",
    title: "Weighing Scales",
    blurb: "Platform, counter and digital scales — calibrated for daily trade.",
    image: scalesImg,
    href: "/scales",
  },
];


const featured = [
  { title: "Mountain Bike 26”", category: "Bicycles & Parts", image: bikesImg },
  { title: "Submersible Pump 2HP", category: "Water Pumps", image: pumpsImg },
  { title: "Platform Scale 300kg", category: "Scales", image: scalesImg },
  { title: "City Bike", category: "Bicycles & Parts", image: bikesImg },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold uppercase tracking-tight text-primary">Sami</span>
            <span className="-mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
              General Trading
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground">Catalog</a>
            <a href="#featured" className="text-sm font-medium text-muted-foreground hover:text-foreground">Featured</a>
            <a href="#visit" className="text-sm font-medium text-muted-foreground hover:text-foreground">Visit</a>
            <a
              href="#visit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Contact
            </a>
          </div>
          <button className="p-2 md:hidden" aria-label="Open menu">
            <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          width={1280}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-transparent" />
        <div
          className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--color-primary-glow)" }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-20 md:grid-cols-2 md:items-center md:pt-24 md:pb-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-glow">
              <span className="h-px w-8 bg-primary-glow" />
              Dire Dawa · Since establishment
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
              Built for work.
              <br />
              Trusted in <span className="text-primary-glow">Dire Dawa</span>.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-primary-foreground/80">
              Bicycles &amp; spare parts, water pumps, and weighing scales — sourced and
              serviced by Sami General Trading.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#categories"
                className="rounded-lg bg-surface px-6 py-3 text-sm font-semibold text-primary shadow-xl transition hover:translate-y-[-1px]"
              >
                Explore Catalog
              </a>
              <a
                href="#visit"
                className="rounded-lg border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
              >
                Contact Us
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
              {["Bicycles", "Water Pumps", "Scales"].map((s) => (
                <div
                  key={s}
                  className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-2.5"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-primary-glow">
                    In stock
                  </div>
                  <div className="mt-0.5 text-sm font-semibold">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
              Four categories. Built for daily use.
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">What we trade</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((c) => (
            <a
              key={c.n}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="aspect-[5/4] overflow-hidden bg-surface-muted">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {c.n}
                </div>
                <h3 className="mt-1 text-lg font-bold text-card-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Browse
                  <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="border-y border-border bg-surface-muted/60 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between px-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                From the catalog
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Available now</h2>
            </div>
            <a href="/catalog" className="hidden text-sm font-semibold text-accent hover:underline md:inline">
              View all products →
            </a>
          </div>

          <div className="flex snap-x gap-5 overflow-x-auto px-5 pb-4 hide-scrollbar md:grid md:grid-cols-4 md:overflow-visible">
            {featured.map((p) => (
              <article
                key={p.title}
                className="snap-start flex-none w-60 md:w-auto overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-surface-muted">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {p.category}
                  </div>
                  <h4 className="mt-1 text-sm font-bold text-card-foreground">{p.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground">Contact for price</p>
                  <button className="mt-4 w-full rounded-md bg-primary py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90">
                    Inquire
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Visit */}
      <section id="visit" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
              Visit the shop
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Find us in Dire Dawa
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Walk in for advice, parts, or a price quote. We service what we sell —
              and we keep stock on hand for the items shopkeepers and farmers need most.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
              {[
                ["Location", "Dire Dawa, Ethiopia"],
                ["Hours", "Mon–Sat · 8:30–18:30"],
                ["Phone", "+251 91 000 0000"],
                ["WhatsApp", "Available daily"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-[var(--shadow-elegant)]">
            <h3 className="text-2xl font-bold">Get a price or place an order</h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Most catalog items are priced on request — message us with the model
              and quantity you need and we'll reply quickly.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:+251910000000"
                className="flex items-center justify-center gap-2 rounded-lg bg-surface py-3 font-bold text-primary transition hover:opacity-95"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call for inquiry
              </a>
              <a
                href="https://wa.me/251910000000"
                className="flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 font-bold text-whatsapp-foreground transition hover:opacity-95"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                </svg>
                WhatsApp now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 md:flex-row md:items-center">
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold uppercase tracking-tight text-primary">Sami</span>
            <span className="-mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
              General Trading
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sami General Trading · Dire Dawa, Ethiopia
          </p>
        </div>
      </footer>
    </div>
  );
}
