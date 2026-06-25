import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/lib/db";
import { toSiteSettings } from "@/lib/mappers";
import type { SiteSettings } from "@/lib/types";
import { adminMiddleware } from "./admin-middleware";

const SETTINGS_ID = "singleton";

export const getSettings = createServerFn({ method: "GET" }).handler(async () => {
  const row = await db.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
  if (!row) throw new Error("Site settings not initialized — run db:seed");
  return toSiteSettings(row);
});

export const updateSettings = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      aboutEn: z.string(),
      aboutAm: z.string(),
      phone: z.string().min(1),
      whatsapp: z.string().min(1),
      telegram: z.string().min(1),
      email: z.string().email(),
      mapUrl: z.string().min(1),
      mapEmbedUrl: z.string().optional(),
      address: z.string().min(1),
      logo: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const row = await db.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      create: {
        id: SETTINGS_ID,
        aboutEn: data.aboutEn,
        aboutAm: data.aboutAm,
        phone: data.phone,
        whatsapp: data.whatsapp,
        telegramHandle: data.telegram,
        email: data.email,
        mapUrl: data.mapUrl,
        mapEmbedUrl: data.mapEmbedUrl || null,
        address: data.address,
        logoUrl: data.logo ?? null,
      },
      update: {
        aboutEn: data.aboutEn,
        aboutAm: data.aboutAm,
        phone: data.phone,
        whatsapp: data.whatsapp,
        telegramHandle: data.telegram,
        email: data.email,
        mapUrl: data.mapUrl,
        mapEmbedUrl: data.mapEmbedUrl || null,
        address: data.address,
        logoUrl: data.logo ?? null,
      },
    });
    return toSiteSettings(row);
  });

export type { SiteSettings };
