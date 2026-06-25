import type { GalleryImage as DbGallery, Product as DbProduct, SiteSettings as DbSettings } from "@prisma/client";
import { toUiCategory } from "./category-map";
import type { GalleryImage, Product, SiteSettings, Spec } from "./types";
import defaultLogo from "@/assets/logo.png";

function parseSpecs(raw: unknown): Spec[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (s): s is Spec =>
      typeof s === "object" &&
      s !== null &&
      "label" in s &&
      "value" in s &&
      typeof (s as Spec).label === "string" &&
      typeof (s as Spec).value === "string",
  );
}

export function toProduct(row: DbProduct): Product {
  return {
    id: row.id,
    nameEn: row.nameEn,
    nameAm: row.nameAm,
    category: toUiCategory(row.category),
    subtype: row.subtype ?? "",
    descriptionEn: row.descriptionEn,
    descriptionAm: row.descriptionAm,
    image: row.imageUrl ?? "",
    specs: parseSpecs(row.specs),
    active: row.isActive,
  };
}

export function toGalleryImage(row: DbGallery): GalleryImage {
  return {
    id: row.id,
    src: row.imageUrl,
    captionEn: row.captionEn ?? "",
    captionAm: row.captionAm ?? "",
    order: row.sortOrder,
  };
}

export function toSiteSettings(row: DbSettings): SiteSettings {
  return {
    aboutEn: row.aboutEn ?? "",
    aboutAm: row.aboutAm ?? "",
    phone: row.phone,
    whatsapp: row.whatsapp,
    telegram: row.telegramHandle,
    email: row.email,
    mapUrl: row.mapUrl,
    mapEmbedUrl: row.mapEmbedUrl ?? "",
    address: row.address,
    logo: row.logoUrl ?? defaultLogo,
  };
}
