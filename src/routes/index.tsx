import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Wrench, MapPin, Phone, MessageCircle } from "lucide-react";
import { Categories } from "@/components/site/Categories";
import { Featured } from "@/components/site/Featured";
import { GalleryTeaser } from "@/components/site/GalleryTeaser";
import { Hero } from "@/components/site/Hero";
import { useI18n } from "@/lib/i18n";
import { listProducts } from "@/fns/products";
import { listGalleryImages } from "@/fns/gallery";
import { getSettings } from "@/fns/settings";
import type { SiteSettings } from "@/lib/types";
import { revealTransition } from "@/lib/motion";
import { buildSeoHead } from "@/lib/seo";
import { telLink, waLink } from "@/lib/contact-links";

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
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
            {t("home.visit.sub")}
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {t("home.visit.title")}
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">{t("home.visit.body")}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {k}
                </dt>
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
