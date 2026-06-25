import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { EASE } from "@/lib/motion";
import { productCategoryBadge } from "@/lib/categories";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { lang } = useI18n();
  const name = lang === "en" ? product.nameEn : product.nameAm || product.nameEn;
  const catLabel = productCategoryBadge(product, lang);

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
        className="group block rounded-2xl bg-card border border-border overflow-hidden hover:border-gold/60 hover:shadow-[0_20px_60px_-25px_rgba(8,20,40,0.35)] transition-all duration-300"
      >
        <motion.div
          layoutId={`product-image-${product.id}`}
          className="relative aspect-[4/3] overflow-hidden bg-muted"
        >
          <img
            src={product.image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
            {catLabel}
          </span>
          <span className="absolute top-3 right-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-foreground text-background opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            <ArrowUpRight size={16} />
          </span>
        </motion.div>
        <div className="p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{product.subtype}</p>
          <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
