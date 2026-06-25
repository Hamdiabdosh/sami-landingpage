import { Link, useNavigate } from "@tanstack/react-router";

export type Product = {
  title: string;
  spec: string;
  image: string;
};

type Props = {
  category: "bicycles" | "pumps" | "scales";
  eyebrow: string;
  title: string;
  blurb: string;
  heroImage: string;
  products: Product[];
  page: number;
  pageSize?: number;
};

export function CategoryPage({
  category,
  eyebrow,
  title,
  blurb,
  heroImage,
  products,
  page,
  pageSize = 9,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  const visible = products.slice(start, start + pageSize);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex flex-col leading-none">
            <span className="text-lg font-bold uppercase tracking-tight text-primary">Sami</span>
            <span className="-mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
              General Trading
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link to="/bicycles" className="text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-sm font-semibold text-foreground" }}>
              Bicycles
            </Link>
            <Link to="/pumps" className="text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-sm font-semibold text-foreground" }}>
              Pumps
            </Link>
            <Link to="/scales" className="text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-sm font-semibold text-foreground" }}>
              Scales
            </Link>
            <Link
              to="/"
              hash="visit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
          <nav className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-glow">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2 opacity-50">/</span>
            <span>{eyebrow}</span>
          </nav>
          <h1 className="text-4xl font-bold leading-[1.05] md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/80">
            {blurb}
          </p>
        </div>
      </header>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{start + 1}–{start + visible.length}</span> of{" "}
            <span className="font-semibold text-foreground">{products.length}</span>
          </p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Page {current} / {totalPages}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {visible.map((p) => (
            <article
              key={p.title}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden bg-surface-muted">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-card-foreground">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.spec}</p>
                <p className="mt-3 text-xs font-semibold text-accent">Contact for price</p>
                <Link
                  to="/"
                  hash="visit"
                  className="mt-3 block rounded-md bg-primary py-2 text-center text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Inquire
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && <Pagination category={category} current={current} totalPages={totalPages} />}
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

function Pagination({
  category,
  current,
  totalPages,
}: {
  category: "bicycles" | "pumps" | "scales";
  current: number;
  totalPages: number;
}) {
  const navigate = useNavigate();
  const go = (n: number) => {
    const to = category === "bicycles" ? "/bicycles" : category === "pumps" ? "/pumps" : "/scales";
    navigate({ to, search: { page: n } });
  };
  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => go(Math.max(1, current - 1))}
        disabled={current === 1}
        className="rounded-md border border-border px-4 py-2 text-sm font-semibold transition hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
      >
        ← Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => go(n)}
          className={`min-w-10 rounded-md px-3 py-2 text-center text-sm font-semibold transition ${
            n === current
              ? "bg-primary text-primary-foreground"
              : "border border-border hover:bg-surface-muted"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => go(Math.min(totalPages, current + 1))}
        disabled={current === totalPages}
        className="rounded-md border border-border px-4 py-2 text-sm font-semibold transition hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
      >
        Next →
      </button>
    </nav>
  );
}

