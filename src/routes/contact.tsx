import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Send, Mail, MapPin } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { useI18n } from "@/lib/i18n";
import { getSettings } from "@/fns/settings";

export const Route = createFileRoute("/contact")({
  loader: () => getSettings(),
  head: () => ({
    meta: [
      { title: "Contact — Sami General Trading" },
      { name: "description", content: "Call, WhatsApp, Telegram or email Sami General Trading in Dire Dawa, Ethiopia." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const settings = Route.useLoaderData();

  const actions = [
    { label: "Call", value: settings.phone, href: `tel:${settings.phone}`, icon: Phone, bg: "bg-primary text-primary-foreground" },
    { label: "WhatsApp", value: settings.whatsapp, href: `https://wa.me/251${settings.whatsapp.replace(/^0/, "")}`, icon: MessageCircle, bg: "bg-[#25D366] text-white" },
    { label: "Telegram", value: `@${settings.telegram}`, href: `https://t.me/${settings.telegram}`, icon: Send, bg: "bg-[#229ED9] text-white" },
    { label: "Email", value: settings.email, href: `mailto:${settings.email}`, icon: Mail, bg: "bg-foreground text-background" },
  ];

  return (
    <SiteShell>
      <section className="container-x pt-14">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">Contact</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">{t("contact.title")}</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{t("contact.sub")}</p>
        </motion.div>
      </section>

      <section className="container-x mt-10 grid gap-4 sm:grid-cols-2">
        {actions.map((a, i) => (
          <motion.a
            key={a.label}
            href={a.href}
            target={a.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className={`group flex items-center gap-5 rounded-2xl p-6 ${a.bg} transition-shadow hover:shadow-2xl`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <a.icon size={26} />
            </span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.18em] opacity-80">{a.label}</p>
              <p className="mt-1 font-display text-xl font-semibold truncate">{a.value}</p>
            </div>
          </motion.a>
        ))}
      </section>

      <section className="container-x mt-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden border border-border bg-card"
        >
          <div className="aspect-[16/9] w-full bg-muted">
            <iframe
              title="Map"
              src={settings.mapUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-6 flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <MapPin size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("contact.address")}</p>
              <p className="mt-1 font-display text-lg font-semibold">{settings.address}</p>
            </div>
          </div>
        </motion.div>
      </section>
    </SiteShell>
  );
}
