import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { EASE } from "@/lib/motion";
import { productCategoryBadge } from "@/lib/categories";

type Props = {
  product: Product;
  index?: number;
  variant?: "default" | "compact";
};

export function ProductCard({ product, index = 0, variant = "default" }: Props) {
  const { lang, t } = useI18n();
  const name = lang === "en" ? product.nameEn : product.nameAm || product.nameEn;
  const catLabel = productCategoryBadge(product, lang);

  if (variant === "compact") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04, ease: EASE }}
        className="snap-start flex-none w-60 md:w-auto overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1"
      >
        <Link to="/catalog/$id" params={{ id: product.id }} className="group block">
          <div className="aspect-square overflow-hidden bg-surface-muted">
            <img
              src={product.image}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{catLabel}</div>
            <h3 className="mt-1 text-sm font-bold text-card-foreground">{name}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{t("product.priceInquire")}</p>
          </div>
        </Link>
        <div className="px-4 pb-4">
          <Link
            to="/contact"
            className="block rounded-md bg-primary py-2 text-center text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {t("product.inquire")}
          </Link>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04, ease: EASE }}
      whileHover={{ y: -4 }}
    >
      <Link
        to="/catalog/$id"
        params={{ id: product.id }}
        className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
      >
        <motion.div
          layoutId={`product-image-${product.id}`}
          className="relative aspect-square overflow-hidden bg-surface-muted"
        >
          <img
            src={product.image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
            {catLabel}
          </span>
          <span className="absolute top-3 right-3 inline-flex h-9 w-9 translate-y-[-4px] items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </motion.div>
        <div className="p-4">
          {product.subtype && (
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{product.subtype}</p>
          )}
          <h3 className="mt-1 font-display text-sm font-bold leading-snug text-card-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="mt-2 text-xs font-semibold text-gold">{t("product.priceInquire")}</p>
        </div>
      </Link>
    </motion.div>
  );
}
