import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { ProductCard } from "@/components/site/ProductCard";
import { CatalogSkeleton } from "@/components/site/CatalogSkeleton";
import { useI18n } from "@/lib/i18n";
import { listProducts } from "@/fns/products";
import type { Category } from "@/lib/types";
import { CATEGORIES, categoryLabel } from "@/lib/categories";
import { revealTransition, spring, tapScale } from "@/lib/motion";
import { buildSeoHead } from "@/lib/seo";

const searchSchema = z.object({
  cat: z.enum(["bikes", "pumps", "scales", "other"]).optional(),
});

export const Route = createFileRoute("/catalog")({
  validateSearch: searchSchema,
  loader: () => listProducts(),
  pendingComponent: CatalogPending,
  head: () =>
    buildSeoHead({
      title: "Product Catalog",
      description:
        "Browse bicycles & spare parts, water pumps and weighing scales available at Sami General Trading, Dire Dawa.",
      path: "/catalog",
    }),
  component: Catalog,
});

function CatalogPending() {
  return <CatalogSkeleton />;
}

function Catalog() {
  const { t, lang } = useI18n();
  const { cat } = Route.useSearch();
  const products = Route.useLoaderData();

  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const byCat = products.filter((p) => !cat || p.category === cat);
    const term = q.trim().toLowerCase();
    if (!term) return byCat;
    return byCat.filter((p) =>
      [p.nameEn, p.nameAm, p.subtype].some((s) => s?.toLowerCase().includes(term)),
    );
  }, [products, cat, q]);

  const filters: { id: Category | "all"; label: string }[] = [
    { id: "all", label: t("cat.all") },
    ...CATEGORIES.map((id) => ({ id, label: t(`cat.${id}` as "cat.bikes") })),
  ];

  return (
    <>
      {cat ? (
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-transparent" />
          <div className="container-x relative py-14 md:py-16">
            <nav className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-glow">
              <Link to="/" className="hover:underline">
                {t("nav.home")}
              </Link>
              <span className="mx-2 opacity-50">/</span>
              <span>{categoryLabel(cat, lang)}</span>
            </nav>
            <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">
              {categoryLabel(cat, lang)}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/80">
              {cat === "other" ? t("catalog.sub") : t(`cat.desc.${cat}` as "cat.desc.bikes")}
            </p>
          </div>
        </section>
      ) : (
        <section className="container-x pt-14 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">{t("nav.catalog")}</p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">{t("catalog.title")}</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">{t("catalog.sub")}</p>
          </motion.div>
        </section>
      )}

      <section className={`container-x ${cat ? "pt-8 pb-8" : "pb-8"}`}>

        <LayoutGroup>
          <div className={`flex flex-wrap gap-2 ${cat ? "" : "mt-8"}`}>
            {filters.map((f) => {
              const active = f.id === "all" ? !cat : cat === f.id;
              return (
                <Link
                  key={f.id}
                  to="/catalog"
                  search={f.id === "all" ? {} : { cat: f.id }}
                  className={`relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    active ? "text-primary-foreground" : "text-foreground border border-border hover:border-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={spring}
                    />
                  )}
                  <motion.span className="relative" whileTap={tapScale}>
                    {f.label}
                  </motion.span>
                </Link>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-6 relative max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("catalog.search")}
            className="w-full rounded-full border border-border bg-background py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          />
        </div>
      </section>

      <section className="container-x pb-24">
        {filtered.length > 0 && (
          <p className="mb-6 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
        )}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <p className="text-lg font-medium">{t("catalog.empty")}</p>
              <Link to="/catalog" className="mt-4 inline-block text-sm text-gold underline-offset-4 hover:underline">
                {t("catalog.viewAll")}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
