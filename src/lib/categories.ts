import type { Category } from "@/lib/types";

export const CATEGORIES: Category[] = ["bikes", "pumps", "scales", "other"];

export const CATEGORY_LABEL: Record<Category, { en: string; am: string }> = {
  bikes: { en: "Bicycles & Parts", am: "ብስክሌት" },
  pumps: { en: "Water Pumps", am: "የውሃ ፓምፕ" },
  scales: { en: "Scales", am: "ሚዛን" },
  other: { en: "Other", am: "ሌላ" },
};

export function categoryLabel(cat: Category, lang: "en" | "am"): string {
  return CATEGORY_LABEL[cat][lang];
}

/** Badge text on product cards — subtype wins for "other". */
export function productCategoryBadge(product: { category: Category; subtype?: string }, lang: "en" | "am"): string {
  if (product.category === "other" && product.subtype?.trim()) return product.subtype.trim();
  return categoryLabel(product.category, lang);
}
