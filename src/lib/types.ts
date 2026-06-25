export type Category = "bikes" | "pumps" | "scales" | "other";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  nameEn: string;
  nameAm: string;
  category: Category;
  subtype: string;
  descriptionEn: string;
  descriptionAm: string;
  image: string;
  specs: Spec[];
  active: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  captionEn: string;
  captionAm: string;
  order: number;
}

export interface SiteSettings {
  aboutEn: string;
  aboutAm: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  email: string;
  mapUrl: string;
  mapEmbedUrl: string;
  address: string;
  logo: string;
}
