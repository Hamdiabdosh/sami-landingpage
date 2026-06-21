import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { useI18n } from "@/lib/i18n";
import { getSettings } from "@/fns/settings";

export const Route = createFileRoute("/about")({
  loader: () => getSettings(),
  head: () => ({
    meta: [
      { title: "About — Sami General Trading" },
      { name: "description", content: "Our story, our market, and how we serve Dire Dawa and eastern Ethiopia." },
    ],
  }),
  component: About,
});

function About() {
  const { t, lang } = useI18n();
  const settings = Route.useLoaderData();
  const story = lang === "en" ? settings.aboutEn : settings.aboutAm;

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.22em] text-gold font-semibold"
        >
          About
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance"
        >
          {t("about.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-8 text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap"
        >
          {story}
        </motion.p>

        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-10">
          {[
            { k: "3", v: "Product categories" },
            { k: "100+", v: "SKUs in stock" },
            { k: "Dire Dawa", v: "Local presence" },
          ].map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
