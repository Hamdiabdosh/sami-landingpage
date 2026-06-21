import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Send, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";
import { useSettings } from "@/lib/queries";

export function Footer() {
  const { t } = useI18n();
  const { settings } = useSettings();

  if (!settings) return null;

  return (
    <footer className="mt-24 bg-steel text-steel-foreground">
      <div className="container-x py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Logo size={40} tone="light" />
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
            <li className="flex items-center gap-2"><Phone size={14} className="text-gold" /> {settings.phone}</li>
            <li className="flex items-center gap-2"><MessageCircle size={14} className="text-gold" /> WhatsApp {settings.whatsapp}</li>
            <li className="flex items-center gap-2"><Send size={14} className="text-gold" /> @{settings.telegram}</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-gold" /> {settings.email}</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> {settings.address}</li>
          </ul>
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
