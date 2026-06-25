import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Bike, Droplet, Scale, ShieldCheck, Wrench, MapPin } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { useI18n } from "@/lib/i18n";
import { listProducts } from "@/fns/products";
import { listGalleryImages } from "@/fns/gallery";
import type { GalleryImage, Product } from "@/lib/types";
import { EASE, fadeUp, fadeUpSmall, hoverLift, revealTransition, staggerContainer, tapScale } from "@/lib/motion";
import { buildSeoHead } from "@/lib/seo";
import heroImg from "@/assets/hero.jpg";
import bikeImg from "@/assets/cat-bikes.jpg";
import pumpImg from "@/assets/cat-pumps.jpg";
import scaleImg from "@/assets/cat-scales.jpg";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [products, gallery] = await Promise.all([listProducts(), listGalleryImages()]);
    return { featured: products.slice(0, 4), gallery: gallery.slice(0, 4) };
  },
  head: () =>
    buildSeoHead({
      title: "Bicycles, Water Pumps & Scales · Dire Dawa",
      description:
        "Premium bicycles, water pumps and weighing scales — sourced and serviced by Sami General Trading in Dire Dawa, Ethiopia.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const { featured, gallery } = Route.useLoaderData();
  return (
    <>
      <Hero />
      <Categories />
      {featured.length > 0 && <Featured products={featured} />}
      {gallery.length > 0 && <GalleryTeaser images={gallery} />}
      <WhyUs />
      <CTA />
    </>
  );
}

function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const titleParts = t("hero.title").split(".");
  const line1 = titleParts[0]?.trim() ?? t("hero.title");
  const line2 = titleParts[1]?.trim();

  return (
    <section ref={ref} className="relative overflow-hidden steel-gradient text-steel-foreground">
      <motion.div className="absolute inset-0 opacity-30" style={{ y: bgY }}>
        <img src={heroImg} alt="" className="w-full h-full object-cover mix-blend-luminosity" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.025_250)] via-transparent to-transparent" />

      <div className="container-x relative pt-20 pb-28 md:pt-28 md:pb-36">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeUpSmall}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold"
          >
            <MapPin size={12} /> {t("hero.tag")}
          </motion.span>

          <motion.h1
            variants={staggerContainer}
            className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] text-balance"
          >
            <motion.span variants={fadeUp} className="block">
              {line1}.
            </motion.span>
            {line2 && (
              <motion.span variants={fadeUp} className="block text-gold">
                {line2}.
              </motion.span>
            )}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base sm:text-lg text-steel-foreground/75 leading-relaxed">
            {t("hero.sub")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <motion.div whileHover={hoverLift} whileTap={tapScale}>
              <Link
                to="/catalog"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-gold-foreground hover:brightness-110 transition-all hover:shadow-[0_15px_40px_-15px_oklch(0.78_0.14_75)]"
              >
                {t("cta.catalog")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={hoverLift} whileTap={tapScale}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-steel-foreground/30 px-6 py-3.5 text-sm font-semibold text-steel-foreground hover:bg-steel-foreground/10 transition-colors"
              >
                {t("cta.contact")}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating product badges (animated) */}
        <div className="hidden lg:block absolute right-8 top-24 w-[340px]">
          {[
            { icon: Bike, label: t("hero.badge.bikes"), delay: 0.4 },
            { icon: Droplet, label: t("hero.badge.pumps"), delay: 0.55 },
            { icon: Scale, label: t("hero.badge.scales"), delay: 0.7 },
          ].map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, x: 40 }}
              animate={
                reduced
                  ? { opacity: 1, x: 0 }
                  : { opacity: 1, x: 0, y: [0, -6, 0] }
              }
              transition={
                reduced
                  ? { delay: b.delay, duration: 0.6, ease: EASE }
                  : { delay: b.delay, duration: 0.6, ease: EASE, y: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" } }
              }
              style={{ marginTop: i === 0 ? 0 : 14 }}
              className="flex items-center gap-3 rounded-2xl border border-steel-foreground/15 bg-steel-foreground/5 backdrop-blur-md px-5 py-4"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-gold-foreground">
                <b.icon size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gold">{t("hero.inStock")}</p>
                <p className="font-display font-semibold">{b.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const { t } = useI18n();
  const cats = [
    { id: "bikes", img: bikeImg, title: t("cat.bikes"), desc: t("cat.desc.bikes") },
    { id: "pumps", img: pumpImg, title: t("cat.pumps"), desc: t("cat.desc.pumps") },
    { id: "scales", img: scaleImg, title: t("cat.scales"), desc: t("cat.desc.scales") },
  ] as const;

  return (
    <section className="container-x py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={revealTransition}
        className="max-w-2xl"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">{t("cats.sub")}</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight text-balance">{t("cats.title")}</h2>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cats.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...revealTransition, delay: i * 0.08 }}
          >
            <Link
              to="/catalog"
              search={{ cat: c.id }}
              className="group relative block rounded-3xl overflow-hidden bg-steel text-steel-foreground h-[420px]"
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.025_250)] via-[oklch(0.14_0.025_250/0.4)] to-transparent" />
              <div className="relative h-full p-7 flex flex-col justify-end">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-steel-foreground/75 max-w-xs">{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  {t("cat.browse")} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Featured({ products }: { products: Product[] }) {
  const { t } = useI18n();
  return (
    <section className="container-x py-16 md:py-20 border-t border-border">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">{t("home.featured.sub")}</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">{t("home.featured.title")}</h2>
        </div>
        <Link to="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline underline-offset-4">
          {t("home.featured.more")} <ArrowRight size={14} />
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function GalleryTeaser({ images }: { images: GalleryImage[] }) {
  const { t } = useI18n();
  return (
    <section className="bg-muted/40 border-y border-border">
      <div className="container-x py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">{t("home.gallery.sub")}</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">{t("home.gallery.title")}</h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline underline-offset-4">
            {t("home.gallery.more")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...revealTransition, delay: i * 0.06 }}
            >
              <Link to="/gallery" className="group block aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={img.src}
                  alt={img.captionEn || ""}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const { t } = useI18n();
  const items = [
    { icon: ShieldCheck, title: t("why.1.title"), body: t("why.1.body") },
    { icon: Wrench, title: t("why.2.title"), body: t("why.2.body") },
    { icon: MapPin, title: t("why.3.title"), body: t("why.3.body") },
  ];
  return (
    <section className="bg-muted/50 border-y border-border">
      <div className="container-x py-20 md:py-24 grid gap-10 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...revealTransition, delay: i * 0.08 }}
          >
            <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
              <it.icon size={22} />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  const { t } = useI18n();
  return (
    <section className="container-x py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={revealTransition}
        className="relative overflow-hidden rounded-3xl bg-steel text-steel-foreground p-10 md:p-16"
      >
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-balance">
            {t("cta.title")} <span className="text-gold">{t("cta.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-steel-foreground/75">{t("cta.sub")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <motion.div whileHover={hoverLift} whileTap={tapScale}>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-gold-foreground hover:brightness-110 transition-all">
                {t("cta.contact")} <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={hoverLift} whileTap={tapScale}>
              <Link to="/catalog" className="inline-flex items-center gap-2 rounded-full border border-steel-foreground/30 px-6 py-3.5 text-sm font-semibold hover:bg-steel-foreground/10">
                {t("cta.catalog")}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
