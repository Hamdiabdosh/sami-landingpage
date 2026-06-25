import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useMemo } from "react";
import { z } from "zod";
import { ProductCard } from "@/components/site/ProductCard";
import { CatalogSkeleton } from "@/components/site/CatalogSkeleton";
import { useI18n } from "@/lib/i18n";
import { listProducts } from "@/fns/products";
import type { Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";
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
  const { t } = useI18n();
  const { cat } = Route.useSearch();
  const products = Route.useLoaderData();

  const filtered = useMemo(
    () => products.filter((p) => !cat || p.category === cat),
    [products, cat],
  );

  const filters: { id: Category | "all"; label: string }[] = [
    { id: "all", label: t("cat.all") },
    ...CATEGORIES.map((id) => ({ id, label: t(`cat.${id}` as "cat.bikes") })),
  ];

  return (
    <>
      <section className="container-x pt-14 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">Catalog</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
            {t("catalog.title")}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{t("catalog.sub")}</p>
        </motion.div>

        <LayoutGroup>
          <div className="mt-8 flex flex-wrap gap-2">
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
      </section>

      <section className="container-x pb-24">
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
                View all products
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
