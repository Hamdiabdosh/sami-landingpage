import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Send, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";
import { useSettings, queryKeys } from "@/lib/queries";
import { mailLink, mapDirectionsLink, telLink, tgLink, waLink } from "@/lib/contact-links";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSettings } from "@/fns/settings";
import type { SiteSettings } from "@/lib/types";

const FALLBACK: SiteSettings = {
  aboutEn: "",
  aboutAm: "",
  phone: "0936999996",
  whatsapp: "0936999996",
  telegram: "SamiAzizKurtu",
  email: "Samikurtu3@gmail.com",
  mapUrl: "https://maps.app.goo.gl/nYbpaQzwrzp2iBqTA",
  mapEmbedUrl: "",
  address: "Dire Dawa, Ethiopia",
  logo: "",
};

export function Footer() {
  const { t } = useI18n();
  const qc = useQueryClient();
  const { settings, isLoading } = useSettings();

  useEffect(() => {
    void qc.prefetchQuery({ queryKey: queryKeys.settings, queryFn: () => getSettings() });
  }, [qc]);

  const s = settings ?? FALLBACK;

  return (
    <footer className="relative z-10 mt-auto border-t border-border bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo size={44} />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {t("footer.tagline")} · Dire Dawa, Ethiopia
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">Navigate</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/catalog" className="text-muted-foreground transition-colors hover:text-foreground">{t("nav.catalog")}</Link></li>
            <li><Link to="/gallery" className="text-muted-foreground transition-colors hover:text-foreground">{t("nav.gallery")}</Link></li>
            <li><Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">Reach us</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={telLink(s.phone)} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Phone size={14} className="shrink-0 text-gold" /> {s.phone}
              </a>
            </li>
            <li>
              <a href={waLink(s.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <MessageCircle size={14} className="shrink-0 text-gold" /> WhatsApp {s.whatsapp}
              </a>
            </li>
            <li>
              <a href={tgLink(s.telegram)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Send size={14} className="shrink-0 text-gold" /> @{s.telegram.replace(/^@/, "")}
              </a>
            </li>
            <li>
              <a href={mailLink(s.email)} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Mail size={14} className="shrink-0 text-gold" /> {s.email}
              </a>
            </li>
            <li>
              <a href={mapDirectionsLink(s)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <MapPin size={14} className="shrink-0 text-gold" /> {s.address}
              </a>
            </li>
          </ul>
          {isLoading && !settings && (
            <p className="mt-3 text-xs text-muted-foreground/60">Loading contact…</p>
          )}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Sami General Trading. {t("footer.rights")}</span>
          <Link to="/admin/login" className="transition-colors hover:text-foreground">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
