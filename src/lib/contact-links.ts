import type { SiteSettings } from "@/lib/types";
import { resolveMapDirectionsUrl } from "@/lib/map-url";

export function telLink(phone: string) {
  return `tel:${phone}`;
}

export function waLink(whatsapp: string) {
  return `https://wa.me/251${whatsapp.replace(/^0/, "")}`;
}

export function tgLink(telegram: string) {
  const handle = telegram.replace(/^@/, "");
  return `https://t.me/${handle}`;
}

export function mailLink(email: string) {
  return `mailto:${email}`;
}

export function mapDirectionsLink(settings: Pick<SiteSettings, "mapUrl">) {
  return resolveMapDirectionsUrl(settings.mapUrl);
}
