import type { SiteSettings } from "@/lib/types";

export const SITE_NAME = "Sami General Trading";
export const DEFAULT_OG_IMAGE = "/og.jpg";

const DEFAULT_DESCRIPTION =
  "Bicycles & spare parts, water pumps, and weighing scales in Dire Dawa, Ethiopia. Contact Sami General Trading for pricing and availability.";

/** ponytail: SITE_URL || BETTER_AUTH_URL || localhost — set SITE_URL in production. */
export function getSiteUrl(): string {
  const raw = process.env.SITE_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${p}`;
}

export function resolveImageUrl(image?: string | null): string {
  if (!image) return absoluteUrl(DEFAULT_OG_IMAGE);
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return absoluteUrl(image.startsWith("/") ? image : `/${image}`);
}

export function truncate(text: string, max = 160): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

type SeoOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string | null;
  type?: "website" | "product";
  noindex?: boolean;
};

export function buildSeoHead(opts: SeoOptions) {
  const description = truncate(opts.description ?? DEFAULT_DESCRIPTION);
  const url = opts.path ? absoluteUrl(opts.path) : getSiteUrl();
  const image = resolveImageUrl(opts.image);
  const fullTitle = opts.title.includes(SITE_NAME) ? opts.title : `${opts.title} · ${SITE_NAME}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "robots", content: opts.noindex ? "noindex, nofollow" : "index, follow" },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_ET" },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function adminHead(title: string) {
  return buildSeoHead({ title, noindex: true });
}

export function jsonLdScript(data: Record<string, unknown>) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function localBusinessJsonLd(settings: SiteSettings) {
  const phone = settings.phone.replace(/^0/, "+251");
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: truncate(settings.aboutEn ?? DEFAULT_DESCRIPTION, 300),
    url: getSiteUrl(),
    image: resolveImageUrl(settings.logo ?? DEFAULT_OG_IMAGE),
    telephone: phone.startsWith("+") ? phone : `+251${phone}`,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dire Dawa",
      addressCountry: "ET",
      streetAddress: settings.address,
    },
    areaServed: { "@type": "City", name: "Dire Dawa" },
    sameAs: [`https://t.me/${settings.telegram}`],
  };
}

export function productJsonLd(product: {
  id: string;
  nameEn: string;
  descriptionEn: string;
  image?: string | null;
  subtype?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nameEn,
    description: truncate(product.descriptionEn, 300),
    image: product.image ? resolveImageUrl(product.image) : resolveImageUrl(),
    category: product.subtype ?? undefined,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "ETB",
      url: absoluteUrl(`/catalog/${product.id}`),
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    description: DEFAULT_DESCRIPTION,
    inLanguage: ["en", "am"],
  };
}
