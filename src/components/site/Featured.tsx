import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { productCategoryBadge } from "@/lib/categories";
import { EASE, revealTransition } from "@/lib/motion";

function truncate(text: string, max = 140) {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : max).trim()}…`;
}

export function Featured({ products }: { products: Product[] }) {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  if (products.length === 0) return null;

  return (
    <section id="featured" className="border-t border-border/60 bg-background py-20 md:py-28">
      <div className="container-x">
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.14em] text-muted-foreground">
              <span className="inline-block h-px w-7 bg-gold" aria-hidden />
              <span>{t("home.featured.sub")}</span>
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              {t("home.featured.title")}
            </h2>
          </div>

          <Link
            to="/catalog"
            className="group inline-flex w-fit items-center gap-2 border-b border-primary pb-1 text-[13px] font-medium tracking-[0.06em] text-primary transition-colors hover:border-gold hover:text-foreground"
          >
            {t("home.featured.more")}
            <ArrowRight
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.header>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28 lg:space-y-32">
          {products.map((product, index) => (
            <FeaturedProduct key={product.id} product={product} index={index} reduced={!!reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProduct({
  product,
  index,
  reduced,
}: {
  product: Product;
  index: number;
  reduced: boolean;
}) {
  const { lang, t } = useI18n();
  const name = lang === "en" ? product.nameEn : product.nameAm || product.nameEn;
  const description =
    lang === "en" ? product.descriptionEn : product.descriptionAm || product.descriptionEn;
  const catLabel = productCategoryBadge(product, lang);
  const num = String(index + 1).padStart(2, "0");
  const imageFirst = index % 2 === 1;
  const blurb = description ? truncate(description) : "";

  return (
    <article className="flex flex-col gap-6 lg:gap-0">
      {/* Mobile-first: number before photography */}
      <p className="font-display text-[13px] tracking-[0.18em] text-gold lg:hidden">{num}</p>

      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...revealTransition, duration: 0.8 }}
          className={`lg:col-span-7 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
        >
          <Link
            to="/catalog/$id"
            params={{ id: product.id }}
            className="group relative block overflow-hidden bg-surface-muted"
            aria-label={name}
          >
            <div className="aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[4/3]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={name}
                  loading="lazy"
                  className={`h-full w-full object-cover ${
                    reduced ? "" : "transition duration-[1.1s] ease-out group-hover:scale-[1.03]"
                  }`}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface-muted" />
              )}
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 0.06 }}
          className={`flex flex-col lg:col-span-5 ${
            imageFirst ? "lg:order-2 lg:pl-2" : "lg:order-1 lg:pr-2"
          }`}
        >
          <p className="hidden font-display text-[13px] tracking-[0.18em] text-gold lg:block">
            {num}
          </p>

          <p className="mt-0 text-[11px] uppercase tracking-[0.16em] text-muted-foreground lg:mt-5">
            {catLabel}
            {product.subtype?.trim() && product.category !== "other"
              ? ` · ${product.subtype.trim()}`
              : ""}
          </p>

          <h3 className="mt-3 font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold leading-[1.12] tracking-[-0.025em] text-foreground">
            <Link
              to="/catalog/$id"
              params={{ id: product.id }}
              className="transition-colors hover:text-primary"
            >
              {name}
            </Link>
          </h3>

          {blurb && (
            <p className="mt-4 max-w-[36ch] text-[15px] leading-[1.65] text-muted-foreground">
              {blurb}
            </p>
          )}

          <p className="mt-4 text-[13px] text-muted-foreground">{t("product.priceInquire")}</p>

          <Link
            to="/catalog/$id"
            params={{ id: product.id }}
            className="group mt-8 inline-flex w-fit items-center gap-2.5 border-b border-primary pb-1 text-[13px] font-medium tracking-[0.06em] text-primary transition-colors hover:border-gold hover:text-foreground"
          >
            <span className="max-w-[28ch] truncate">{name}</span>
            <ArrowRight
              size={14}
              strokeWidth={1.75}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
