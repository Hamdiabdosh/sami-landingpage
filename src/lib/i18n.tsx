import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "am";

type Dict = Record<string, { en: string; am: string }>;

const dict: Dict = {
  "nav.home": { en: "Home", am: "መነሻ" },
  "nav.catalog": { en: "Catalog", am: "ካታሎግ" },
  "nav.gallery": { en: "Gallery", am: "ጋለሪ" },
  "nav.about": { en: "About", am: "ስለ እኛ" },
  "nav.contact": { en: "Contact", am: "አግኙን" },
  "cta.catalog": { en: "Explore Catalog", am: "ካታሎግ ይመልከቱ" },
  "cta.contact": { en: "Contact Us", am: "ያግኙን" },
  "hero.tag": { en: "Dire Dawa · Since establishment", am: "ድሬዳዋ" },
  "hero.title": { en: "Built for work. Trusted in Dire Dawa.", am: "ለስራ የተዘጋጀ። በድሬዳዋ የታመነ።" },
  "hero.sub": {
    en: "Bicycles & spare parts, water pumps, and weighing scales — sourced and serviced by Sami General Trading.",
    am: "ብስክሌቶችና መለዋወጫዎች፣ የውሃ ፓምፖች እና ሚዛኖች — በሳሚ ጄኔራል ትሬዲንግ የሚቀርቡ።",
  },
  "cats.title": { en: "What we trade", am: "የምንሸጠው" },
  "cats.sub": { en: "Four categories. Built for daily use.", am: "አራት ምድቦች። ለዕለታዊ አጠቃቀም።" },
  "cat.bikes": { en: "Bicycles & Spare Parts", am: "ብስክሌቶችና መለዋወጫዎች" },
  "cat.pumps": { en: "Water Pumps", am: "የውሃ ፓምፖች" },
  "cat.scales": { en: "Scales", am: "ሚዛኖች" },
  "cat.other": { en: "Other", am: "ሌላ" },
  "cat.all": { en: "All", am: "ሁሉም" },
  "catalog.title": { en: "Product Catalog", am: "የምርት ካታሎግ" },
  "catalog.sub": { en: "Filter by category. Inquire for pricing.", am: "በምድብ ያጣሩ። ለዋጋ ይጠይቁ።" },
  "catalog.empty": { en: "No products in this category yet.", am: "በዚህ ምድብ ውስጥ ምርት የለም።" },
  "product.specs": { en: "Specifications", am: "ዝርዝሮች" },
  "product.inquire.wa": { en: "Inquire on WhatsApp", am: "በዋትስአፕ ይጠይቁ" },
  "product.inquire.tg": { en: "Inquire on Telegram", am: "በቴሌግራም ይጠይቁ" },
  "product.call": { en: "Call", am: "ይደውሉ" },
  "product.email": { en: "Email", am: "ኢሜይል" },
  "product.back": { en: "Back to catalog", am: "ወደ ካታሎግ ተመለስ" },
  "gallery.title": { en: "Gallery", am: "ጋለሪ" },
  "gallery.sub": { en: "A look inside our shop and the goods we move.", am: "ወደ ሱቃችን እና ወደምንሸጠው ዕቃ።" },
  "about.title": { en: "About Sami General Trading", am: "ስለ ሳሚ ጄኔራል ትሬዲንግ" },
  "contact.title": { en: "Get in touch", am: "ያግኙን" },
  "contact.sub": { en: "Reach us directly. We respond fast.", am: "በቀጥታ ያግኙን። በፍጥነት እንመልሳለን።" },
  "contact.address": { en: "Address", am: "አድራሻ" },
  "footer.rights": { en: "All rights reserved.", am: "ሁሉም መብቶች የተጠበቁ ናቸው።" },
  "footer.tagline": { en: "Bicycles · Water Pumps · Scales", am: "ብስክሌት · የውሃ ፓምፕ · ሚዛን" },
  "contact.directions": { en: "Get directions", am: "አቅጣጫ ያግኙ" },
  "contact.call": { en: "Call", am: "ይደውሉ" },
  "contact.whatsapp": { en: "WhatsApp", am: "ዋትስአፕ" },
  "contact.telegram": { en: "Telegram", am: "ቴሌግራም" },
  "contact.email": { en: "Email", am: "ኢሜይል" },
  "hero.inStock": { en: "In stock", am: "በመጋዘን ውስጥ" },
  "hero.badge.bikes": { en: "Bicycles", am: "ብስክሌቶች" },
  "hero.badge.pumps": { en: "Water Pumps", am: "የውሃ ፓምፖች" },
  "hero.badge.scales": { en: "Scales", am: "ሚዛኖች" },
  "cat.desc.bikes": {
    en: "City, mountain & kids bikes, plus full range of spare parts.",
    am: "የከተማ፣ ማውንቴን እና የልጆች ብስክሌቶች እንዲሁም ሙሉ መለዋወጫዎች።",
  },
  "cat.desc.pumps": {
    en: "Surface and submersible water pumps for homes, farms and industry.",
    am: "ለቤት፣ ለእርሻና ለኢንዱስትሪ ፓምፖች።",
  },
  "cat.desc.scales": {
    en: "Platform, counter and digital scales calibrated for daily trade.",
    am: "ለዕለታዊ ንግድ የሚሆኑ ሚዛኖች።",
  },
  "cat.browse": { en: "Browse", am: "ይመልከቱ" },
  "why.1.title": { en: "Trusted goods", am: "የታመኑ ዕቃዎች" },
  "why.1.body": {
    en: "We stock proven brands and inspect every shipment before it reaches our shop floor.",
    am: "የታመኑ ብራንዶችን እናስቀምጣለን እና ወደ ሱቃችን ከመድረሱ በፊት እያንዳንዱን ሸክም እንፈትሻለን።",
  },
  "why.2.title": { en: "Spares & service", am: "መለዋወጫዎች እና አገልግሎት" },
  "why.2.body": {
    en: "Full inventory of spare parts and quick fitting support for bicycles and water pumps.",
    am: "ሙሉ የመለዋወጫ ክምችት እና ለብስክሌትና ለውሃ ፓምፕ ፈጣን አገልግሎት።",
  },
  "why.3.title": { en: "Local to Dire Dawa", am: "በድሬዳዋ ቀርበን" },
  "why.3.body": {
    en: "On-the-ground presence means fast pickup, fair prices and honest after-sales.",
    am: "በቦታ ላይ መኖራችን ፈጣን ቅጠል፣ ተመጣጣኝ ዋጋ እና ታማኝ አገልግሎት ይማለት ነው።",
  },
  "cta.title": { en: "Need a price or availability?", am: "ዋጋ ወይም ትኩረት ይፈልጋሉ?" },
  "cta.titleAccent": { en: "Talk to us directly.", am: "በቀጥታ ያግኙን።" },
  "cta.sub": {
    en: "We respond fast on WhatsApp and Telegram, in Amharic or English.",
    am: "በዋትስአፕ እና ቴሌግራም በፍጥነት እንመልሳለን — በአማርኛ ወይም በእንግሊዝኛ።",
  },
  "home.featured.sub": { en: "From the catalog", am: "ከካታሎጉ" },
  "home.featured.title": { en: "Available now", am: "አሁን ያሉ" },
  "home.featured.more": { en: "View all products", am: "ሁሉንም ይመልከቱ" },
  "home.gallery.sub": { en: "Inside the shop", am: "በሱቃችን ውስጥ" },
  "home.gallery.title": { en: "Gallery", am: "ጋለሪ" },
  "home.gallery.more": { en: "View gallery", am: "ጋለሪ ይመልከቱ" },
  "home.visit.sub": { en: "Visit the shop", am: "ሱቁን ይጎብኙ" },
  "home.visit.title": { en: "Find us in Dire Dawa", am: "በድሬዳዋ ያግኙን" },
  "home.visit.body": {
    en: "Walk in for advice, parts, or a price quote. We service what we sell — and we keep stock on hand for the items shopkeepers and farmers need most.",
    am: "ለምክር፣ ለመለዋወጫ ወይም ለዋጋ ጥያቄ ይመጡ። የምንሸጠውን እናገልግላለን — ለሱቅ ባለቤቶችና ለገበሬዎች በጣም የሚያስፈልጉ ዕቃዎችን በመጋዘን እናስቀምጣለን።",
  },
  "home.visit.location": { en: "Location", am: "ቦታ" },
  "home.visit.hours": { en: "Hours", am: "ሰዓት" },
  "home.visit.phone": { en: "Phone", am: "ስልክ" },
  "home.visit.whatsapp": { en: "WhatsApp", am: "ዋትስአፕ" },
  "home.visit.hoursValue": { en: "Mon–Sat · 8:30–18:30", am: "ሰ–ቅ · 8:30–18:30" },
  "home.visit.whatsappValue": { en: "Available daily", am: "በየቀኑ ይገኛል" },
  "home.visit.cardTitle": { en: "Get a price or place an order", am: "ዋጋ ይጠይቁ ወይም ትዕዛዝ ይስጡ" },
  "home.visit.cardSub": {
    en: "Most catalog items are priced on request — message us with the model and quantity you need and we'll reply quickly.",
    am: "አብዛኛውን የካታሎግ ዕቃዎች ዋጋ በጥያቄ ነው — የሚፈልጉትን ሞዴልና ብዛት ይላኩልን፣ በፍጥነት እንመልሳለን።",
  },
  "home.visit.call": { en: "Call for inquiry", am: "ለመጠየቅ ይደውሉ" },
  "home.visit.wa": { en: "WhatsApp now", am: "አሁን በዋትስአፕ" },
  "about.label": { en: "About", am: "ስለ እኛ" },
  "about.stat.cats": { en: "Product categories", am: "የምርት ምድቦች" },
  "about.stat.skus": { en: "SKUs in stock", am: "ዕቃዎች በመጋዘን" },
  "about.stat.local": { en: "Local presence", am: "በአካባቢ ቀርበን" },
  "product.priceInquire": { en: "Contact for price", am: "ለዋጋ ይጠይቁ" },
  "product.inquire": { en: "Inquire", am: "ይጠይቁ" },
  "product.related": { en: "More in this category", am: "ተጨማሪ በዚህ ምድብ" },
  "catalog.search": { en: "Search products…", am: "ምርት ይፈልጉ…" },
  "catalog.viewAll": { en: "View all products", am: "ሁሉንም ይመልከቱ" },
  "fab.whatsapp": { en: "Chat on WhatsApp", am: "በዋትስአፕ ይወያዩ" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("sami_lang") as Lang)) || "en";
    setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("sami_lang", l);
  };

  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? String(key);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be inside I18nProvider");
  return ctx;
}

export function pick<T extends { en: string; am: string } | { nameEn: string; nameAm: string } | { descriptionEn: string; descriptionAm: string } | { captionEn: string; captionAm: string } | { aboutEn: string; aboutAm: string }>(
  obj: T,
  lang: Lang,
  field: "name" | "description" | "caption" | "about" | "plain" = "plain",
): string {
  const o = obj as Record<string, string>;
  if (field === "plain") return o[lang] ?? o.en;
  const key = field + (lang === "en" ? "En" : "Am");
  return o[key] ?? o[field + "En"];
}
