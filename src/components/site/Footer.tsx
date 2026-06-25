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
    <footer className="relative z-10 mt-24 bg-steel text-steel-foreground">
      <div className="container-x py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Logo size={44} tone="light" />
          <p className="mt-4 text-sm text-steel-foreground/70 max-w-xs">
            {t("footer.tagline")} · Dire Dawa, Ethiopia
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Navigate</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/catalog" className="hover:text-gold transition-colors">{t("nav.catalog")}</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-colors">{t("nav.gallery")}</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Reach us</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={telLink(s.phone)} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone size={14} className="text-gold shrink-0" /> {s.phone}
              </a>
            </li>
            <li>
              <a href={waLink(s.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <MessageCircle size={14} className="text-gold shrink-0" /> WhatsApp {s.whatsapp}
              </a>
            </li>
            <li>
              <a href={tgLink(s.telegram)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Send size={14} className="text-gold shrink-0" /> @{s.telegram.replace(/^@/, "")}
              </a>
            </li>
            <li>
              <a href={mailLink(s.email)} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail size={14} className="text-gold shrink-0" /> {s.email}
              </a>
            </li>
            <li>
              <a href={mapDirectionsLink(s)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <MapPin size={14} className="text-gold shrink-0" /> {s.address}
              </a>
            </li>
          </ul>
          {isLoading && !settings && (
            <p className="mt-3 text-xs text-steel-foreground/50">Loading contact…</p>
          )}
        </div>
      </div>
      <div className="border-t border-steel-foreground/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-steel-foreground/60">
          <span>© {new Date().getFullYear()} Sami General Trading. {t("footer.rights")}</span>
          <Link to="/admin/login" className="hover:text-gold transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
