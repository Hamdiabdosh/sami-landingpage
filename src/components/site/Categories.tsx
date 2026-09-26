import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { EASE, revealTransition } from "@/lib/motion";
import bikeImg from "@/assets/cat-bikes.jpg";
import pumpImg from "@/assets/cat-pumps.jpg";
import scaleImg from "@/assets/cat-scales.jpg";

type CatId = "bikes" | "pumps" | "scales";

type Category = {
  id: CatId;
  img: string;
  title: string;
  desc: string;
  /** Desktop: image on the left when true */
  imageFirst: boolean;
};

export function Categories() {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  const cats: Category[] = [
    {
      id: "bikes",
      img: bikeImg,
      title: t("cat.bikes"),
      desc: t("cat.desc.bikes"),
      imageFirst: false,
    },
    {
      id: "pumps",
      img: pumpImg,
      title: t("cat.pumps"),
      desc: t("cat.desc.pumps"),
      imageFirst: true,
    },
    {
      id: "scales",
      img: scaleImg,
      title: t("cat.scales"),
      desc: t("cat.desc.scales"),
      imageFirst: false,
    },
  ];

  return (
    <section id="categories" className="border-t border-border/60 bg-background py-20 md:py-28">
      <div className="container-x">
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-xl"
        >
          <p className="flex items-center gap-3 text-[11px] tracking-[0.14em] text-muted-foreground">
            <span className="inline-block h-px w-7 bg-gold" aria-hidden />
            <span>01 — 03</span>
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
            {t("cats.title")}
          </h2>
        </motion.header>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28 lg:space-y-32">
          {cats.map((c, i) => (
            <CategoryFeature key={c.id} category={c} index={i} reduced={!!reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryFeature({
  category,
  index,
  reduced,
}: {
  category: Category;
  index: number;
  reduced: boolean;
}) {
  const { t } = useI18n();
  const num = String(index + 1).padStart(2, "0");
  const imageFirst = category.imageFirst;

  return (
    <article className="grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Copy — intentional mobile order: number → title → desc → CTA → image */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`flex flex-col lg:col-span-5 ${
          imageFirst ? "lg:order-2 lg:pl-2" : "lg:order-1 lg:pr-2"
        }`}
      >
        <p className="font-display text-[13px] tracking-[0.18em] text-gold">{num}</p>

        <h3 className="mt-4 font-display text-[clamp(1.65rem,3vw,2.35rem)] font-bold leading-[1.1] tracking-[-0.025em] text-foreground">
          {category.title}
        </h3>

        <p className="mt-4 max-w-[36ch] text-[15px] leading-[1.65] text-muted-foreground">
          {category.desc}
        </p>

        <Link
          to="/catalog"
          search={{ cat: category.id }}
          className="group mt-8 inline-flex w-fit items-center gap-2.5 border-b border-primary pb-1 text-[13px] font-medium tracking-[0.06em] text-primary transition-colors hover:border-gold hover:text-foreground"
        >
          {t("cat.browse")}
          <ArrowRight
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>

      {/* Photography */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ ...revealTransition, duration: 0.8, delay: reduced ? 0 : 0.08 }}
        className={`lg:col-span-7 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
      >
        <Link
          to="/catalog"
          search={{ cat: category.id }}
          className="group relative block overflow-hidden bg-surface-muted"
          aria-label={category.title}
        >
          <div className="aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[4/3]">
            <img
              src={category.img}
              alt={category.title}
              loading="lazy"
              className={`h-full w-full object-cover ${
                reduced ? "" : "transition duration-[1.1s] ease-out group-hover:scale-[1.03]"
              }`}
            />
          </div>
        </Link>
      </motion.div>
    </article>
  );
}
