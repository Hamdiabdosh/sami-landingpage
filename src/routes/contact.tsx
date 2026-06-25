import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Send, Mail, MapPin, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getSettings } from "@/fns/settings";
import { hoverLift, revealTransition, tapScale } from "@/lib/motion";
import { buildSeoHead, jsonLdScript, localBusinessJsonLd } from "@/lib/seo";
import { resolveMapEmbedUrl, resolveMapDirectionsUrl } from "@/lib/map-url";
import { mailLink, telLink, tgLink, waLink } from "@/lib/contact-links";

export const Route = createFileRoute("/contact")({
  loader: () => getSettings(),
  head: ({ loaderData }) => {
    const seo = buildSeoHead({
      title: "Contact",
      description: "Call, WhatsApp, Telegram or email Sami General Trading in Dire Dawa, Ethiopia.",
      path: "/contact",
    });
    const scripts = loaderData ? [jsonLdScript(localBusinessJsonLd(loaderData))] : [];
    return { ...seo, scripts };
  },
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const settings = Route.useLoaderData();
  const embedSrc = resolveMapEmbedUrl(settings.mapUrl, settings.mapEmbedUrl);
  const directionsUrl = resolveMapDirectionsUrl(settings.mapUrl);

  const actions = [
    { label: t("contact.call"), value: settings.phone, href: telLink(settings.phone), icon: Phone, bg: "bg-primary text-primary-foreground" },
    { label: t("contact.whatsapp"), value: settings.whatsapp, href: waLink(settings.whatsapp), icon: MessageCircle, bg: "bg-whatsapp text-whatsapp-foreground" },
    { label: t("contact.telegram"), value: `@${settings.telegram.replace(/^@/, "")}`, href: tgLink(settings.telegram), icon: Send, bg: "bg-[#229ED9] text-white" },
    { label: t("contact.email"), value: settings.email, href: mailLink(settings.email), icon: Mail, bg: "bg-foreground text-background" },
  ];

  return (
    <>
      <section className="container-x pt-14">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={revealTransition}>
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">{t("nav.contact")}</p>
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
            transition={{ ...revealTransition, delay: i * 0.06 }}
            whileHover={hoverLift}
            whileTap={tapScale}
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
          transition={revealTransition}
          className="rounded-3xl overflow-hidden border border-border bg-card"
        >
          <div className="aspect-[16/9] w-full bg-muted relative">
            {embedSrc ? (
              <iframe
                title="Map"
                src={embedSrc}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center p-8 text-center">
                <MapPin size={40} className="text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm max-w-sm">Map preview unavailable. Open directions in Google Maps.</p>
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <MapPin size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("contact.address")}</p>
                <p className="mt-1 font-display text-lg font-semibold">{settings.address}</p>
              </div>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground hover:brightness-110 shrink-0"
            >
              {t("contact.directions")} <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
