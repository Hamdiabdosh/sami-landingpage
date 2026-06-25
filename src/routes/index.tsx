import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ShieldCheck, Wrench, MapPin, Phone, MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { useI18n } from "@/lib/i18n";
import { listProducts } from "@/fns/products";
import { listGalleryImages } from "@/fns/gallery";
import { getSettings } from "@/fns/settings";
import type { GalleryImage, Product, SiteSettings } from "@/lib/types";
import { fadeUp, fadeUpSmall, hoverLift, revealTransition, staggerContainer, tapScale } from "@/lib/motion";
import { buildSeoHead } from "@/lib/seo";
import { telLink, waLink } from "@/lib/contact-links";
import heroImg from "@/assets/hero.jpg";
import bikeImg from "@/assets/cat-bikes.jpg";
import pumpImg from "@/assets/cat-pumps.jpg";
import scaleImg from "@/assets/cat-scales.jpg";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [products, gallery, settings] = await Promise.all([
      listProducts(),
      listGalleryImages(),
      getSettings(),
    ]);
    return { featured: products.slice(0, 4), gallery: gallery.slice(0, 4), settings };
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
  const { featured, gallery, settings } = Route.useLoaderData();
  return (
    <>
      <Hero />
      <Categories />
      {featured.length > 0 && <Featured products={featured} />}
      {gallery.length > 0 && <GalleryTeaser images={gallery} />}
      <WhyUs />
      <Visit settings={settings} />
    </>
  );
}

function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const titleParts = t("hero.title").split(".");
  const line1 = titleParts[0]?.trim() ?? t("hero.title");
  const line2 = titleParts[1]?.trim();

  const badges = [
    t("hero.badge.bikes"),
    t("hero.badge.pumps"),
    t("hero.badge.scales"),
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary text-primary-foreground">
      <motion.div className="absolute inset-0 opacity-30" style={{ y: bgY }}>
        <img src={heroImg} alt="" aria-hidden className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-transparent" />
      <div
        className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--color-primary-glow)" }}
      />

      <div className="container-x relative grid gap-10 pt-16 pb-20 md:grid-cols-2 md:items-center md:pt-24 md:pb-28">
        <motion.div initial="hidden" animate="show" variants={staggerContainer}>
          <motion.div
            variants={fadeUpSmall}
            className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-glow"
          >
            <span className="h-px w-8 bg-primary-glow" />
            {t("hero.tag")}
          </motion.div>

          <motion.h1 variants={staggerContainer} className="text-4xl font-bold leading-[1.05] md:text-6xl">
            <motion.span variants={fadeUp} className="block font-display">
              {line1}.
            </motion.span>
            {line2 && (
              <motion.span variants={fadeUp} className="block font-display text-primary-glow">
                {line2}.
              </motion.span>
            )}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 max-w-md text-base leading-relaxed text-primary-foreground/80">
            {t("hero.sub")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <motion.div whileHover={hoverLift} whileTap={tapScale}>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-lg bg-surface px-6 py-3 text-sm font-semibold text-primary shadow-xl transition hover:translate-y-[-1px]"
              >
                {t("cta.catalog")}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={hoverLift} whileTap={tapScale}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
              >
                {t("cta.contact")}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {badges.map((label) => (
              <div
                key={label}
                className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-2.5"
              >
                <div className="text-[10px] font-semibold uppercase tracking-widest text-primary-glow">
                  {t("hero.inStock")}
                </div>
                <div className="mt-0.5 text-sm font-semibold">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
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
    <section id="categories" className="container-x py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={revealTransition}
      >
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">{t("cats.sub")}</div>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{t("cats.title")}</h2>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
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
              className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="aspect-[5/4] overflow-hidden bg-surface-muted">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  0{i + 1}
                </div>
                <h3 className="mt-1 font-display text-lg font-bold text-card-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  {t("cat.browse")}
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </div>
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
    <section id="featured" className="border-y border-border bg-surface-muted/60 py-16 md:py-24">
      <div className="container-x">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">{t("home.featured.sub")}</div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{t("home.featured.title")}</h2>
          </div>
          <Link
            to="/catalog"
            className="hidden text-sm font-semibold text-gold hover:underline md:inline"
          >
            {t("home.featured.more")} →
          </Link>
        </div>

        <div className="flex snap-x gap-5 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-4 md:overflow-visible">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryTeaser({ images }: { images: GalleryImage[] }) {
  const { t } = useI18n();
  return (
    <section className="border-y border-border bg-surface-muted/40">
      <div className="container-x py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">{t("home.gallery.sub")}</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{t("home.gallery.title")}</h2>
          </div>
          <Link to="/gallery" className="text-sm font-semibold text-gold hover:underline">
            {t("home.gallery.more")} →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...revealTransition, delay: i * 0.06 }}
            >
              <Link
                to="/gallery"
                className="group block aspect-square overflow-hidden rounded-xl border border-border bg-surface-muted"
              >
                <img
                  src={img.src}
                  alt={img.captionEn || ""}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
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
    <section className="border-y border-border bg-surface-muted/50">
      <div className="container-x grid gap-10 py-16 md:grid-cols-3 md:py-24">
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
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Visit({ settings }: { settings: SiteSettings }) {
  const { t } = useI18n();
  const rows = [
    [t("home.visit.location"), settings.address],
    [t("home.visit.hours"), t("home.visit.hoursValue")],
    [t("home.visit.phone"), settings.phone],
    [t("home.visit.whatsapp"), t("home.visit.whatsappValue")],
  ] as const;

  return (
    <section id="visit" className="container-x py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={revealTransition}
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">{t("home.visit.sub")}</div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{t("home.visit.title")}</h2>
          <p className="mt-4 max-w-md text-muted-foreground">{t("home.visit.body")}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{k}</dt>
                <dd className="mt-1 text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...revealTransition, delay: 0.08 }}
          className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-[var(--shadow-elegant)]"
        >
          <h3 className="font-display text-2xl font-bold">{t("home.visit.cardTitle")}</h3>
          <p className="mt-2 text-sm text-primary-foreground/80">{t("home.visit.cardSub")}</p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={telLink(settings.phone)}
              className="flex items-center justify-center gap-2 rounded-lg bg-surface py-3 font-bold text-primary transition hover:opacity-95"
            >
              <Phone size={18} />
              {t("home.visit.call")}
            </a>
            <a
              href={waLink(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 font-bold text-whatsapp-foreground transition hover:opacity-95"
            >
              <MessageCircle size={18} />
              {t("home.visit.wa")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
