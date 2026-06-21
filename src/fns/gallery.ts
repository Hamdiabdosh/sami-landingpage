import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/lib/db";
import { toGalleryImage } from "@/lib/mappers";
import { adminMiddleware } from "./admin-middleware";

export const listGalleryImages = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await db.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(toGalleryImage);
});

export const createGalleryImage = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      src: z.string().min(1),
      captionEn: z.string().optional(),
      captionAm: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const max = await db.galleryImage.aggregate({ _max: { sortOrder: true } });
    const row = await db.galleryImage.create({
      data: {
        imageUrl: data.src,
        captionEn: data.captionEn ?? "",
        captionAm: data.captionAm ?? "",
        sortOrder: (max._max.sortOrder ?? -1) + 1,
      },
    });
    return toGalleryImage(row);
  });

export const updateGalleryImage = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(
    z.object({
      id: z.string().uuid(),
      captionEn: z.string().optional(),
      captionAm: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const row = await db.galleryImage.update({
      where: { id: data.id },
      data: { captionEn: data.captionEn, captionAm: data.captionAm },
    });
    return toGalleryImage(row);
  });

export const reorderGalleryImage = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(z.object({ id: z.string().uuid(), direction: z.union([z.literal(-1), z.literal(1)]) }))
  .handler(async ({ data }) => {
    const items = await db.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
    const idx = items.findIndex((x) => x.id === data.id);
    const swap = idx + data.direction;
    if (idx < 0 || swap < 0 || swap >= items.length) {
      const rows = await db.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
      return rows.map(toGalleryImage);
    }

    const a = items[idx];
    const b = items[swap];
    await db.$transaction([
      db.galleryImage.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
      db.galleryImage.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
    ]);
    const rows = await db.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map(toGalleryImage);
  });

export const deleteGalleryImage = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await db.galleryImage.delete({ where: { id: data.id } });
    return { ok: true };
  });
