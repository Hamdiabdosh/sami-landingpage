const FIELD_LABELS: Record<string, string> = {
  nameEn: "English name",
  nameAm: "Amharic name",
  descriptionEn: "English description",
  descriptionAm: "Amharic description",
  category: "Category",
  subtype: "Subtype",
  image: "Image",
};

export function formatServerError(error: unknown): string {
  if (!(error instanceof Error)) return "Something went wrong. Please try again.";

  const raw = error.message.trim();
  if (!raw) return "Something went wrong. Please try again.";

  if (raw.startsWith("[") || raw.startsWith("{")) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        const lines = parsed
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const path = "path" in item && Array.isArray(item.path) ? item.path.join(".") : "field";
            const label = FIELD_LABELS[path] ?? path;
            const code = "code" in item && typeof item.code === "string" ? item.code : "";
            if (code === "too_small") return `${label} is required.`;
            return `${label}: invalid input.`;
          })
          .filter(Boolean);
        if (lines.length) return lines.join("\n");
      }
    } catch {
      // fall through
    }
  }

  return raw;
}
