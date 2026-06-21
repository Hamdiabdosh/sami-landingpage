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
  "cats.sub": { en: "Three categories. Built for daily use.", am: "ሶስት ምድቦች። ለዕለታዊ አጠቃቀም።" },
  "cat.bikes": { en: "Bicycles & Spare Parts", am: "ብስክሌቶችና መለዋወጫዎች" },
  "cat.pumps": { en: "Water Pumps", am: "የውሃ ፓምፖች" },
  "cat.scales": { en: "Scales", am: "ሚዛኖች" },
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
  "footer.tagline": { en: "Bicycles · Pumps · Scales", am: "ብስክሌት · ፓምፕ · ሚዛን" },
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
