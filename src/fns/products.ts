import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toDbCategory } from "@/lib/category-map";
import { db } from "@/lib/db";
import { toProduct } from "@/lib/mappers";
import type { Category } from "@/lib/types";
import { adminMiddleware } from "./admin-middleware";

const specSchema = z.object({ label: z.string(), value: z.string() });

const categorySchema = z.enum(["bikes", "pumps", "scales", "other"]);

const productInput = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  nameEn: z.string().min(1),
  nameAm: z.string().default(""),
  category: categorySchema,
  subtype: z.string().optional(),
  descriptionEn: z.string().min(1),
  descriptionAm: z.string().default(""),
  image: z.string().optional(),
  specs: z.array(specSchema).default([]),
  active: z.boolean().default(false),
});

function validateActive(input: z.infer<typeof productInput>) {
  if (!input.active) return;
  if (!input.nameEn || !input.descriptionEn) {
    throw new Error("English name and description are required to publish.");
  }
  if (input.category === "other" && !input.subtype?.trim()) {
    throw new Error("Subtype is required when category is Other.");
  }
  if (!input.image) throw new Error("Image is required before marking a product active.");
}

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator(
    z
      .object({
        activeOnly: z.boolean().optional(),
        category: categorySchema.optional(),
      })
      .optional(),
  )
  .handler(async ({ data }) => {
    const rows = await db.product.findMany({
      where: {
        isActive: true,
        ...(data?.category ? { category: toDbCategory(data.category as Category) } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(toProduct);
  });

export const listProductsAdmin = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const rows = await db.product.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map(toProduct);
  });

export const getProductById = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const row = await db.product.findUnique({ where: { id: data.id } });
    if (!row || !row.isActive) return null;
    return toProduct(row);
  });

export const upsertProduct = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(productInput)
  .handler(async ({ data }) => {
    validateActive(data);

    const payload = {
      nameEn: data.nameEn,
      nameAm: data.nameAm,
      category: toDbCategory(data.category),
      subtype: data.subtype || null,
      descriptionEn: data.descriptionEn,
      descriptionAm: data.descriptionAm,
      imageUrl: data.image || null,
      specs: data.specs.filter((s) => s.label.trim() || s.value.trim()),
      isActive: data.active,
    };

    const existing = data.id ? await db.product.findUnique({ where: { id: data.id } }) : null;
    const row = existing
      ? await db.product.update({ where: { id: data.id! }, data: payload })
      : await db.product.create({ data: payload });

    return toProduct(row);
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await db.product.delete({ where: { id: data.id } });
    return { ok: true };
  });
