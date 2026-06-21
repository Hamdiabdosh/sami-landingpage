import type { Category as DbCategory } from "@prisma/client";
import type { Category as UiCategory } from "./types";

const TO_DB: Record<UiCategory, DbCategory> = {
  bikes: "BICYCLES_PARTS",
  pumps: "WATER_PUMPS",
  scales: "SCALES",
};

const TO_UI: Record<DbCategory, UiCategory> = {
  BICYCLES_PARTS: "bikes",
  WATER_PUMPS: "pumps",
  SCALES: "scales",
};

export function toDbCategory(cat: UiCategory): DbCategory {
  return TO_DB[cat];
}

export function toUiCategory(cat: DbCategory): UiCategory {
  return TO_UI[cat];
}
