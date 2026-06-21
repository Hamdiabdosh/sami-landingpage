import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGalleryImage,
  deleteGalleryImage,
  listGalleryImages,
  reorderGalleryImage,
  updateGalleryImage,
} from "@/fns/gallery";
import { deleteProduct, listProducts, listProductsAdmin, upsertProduct } from "@/fns/products";
import { getSettings, updateSettings } from "@/fns/settings";
import { uploadImageFn } from "@/fns/upload";
import type { GalleryImage, Product, SiteSettings } from "./types";

export const queryKeys = {
  products: (opts?: { activeOnly?: boolean; category?: string }) => ["products", opts] as const,
  gallery: ["gallery"] as const,
  settings: ["settings"] as const,
};

export function useProducts(opts?: { admin?: boolean }) {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.products({ admin: opts?.admin }),
    queryFn: () => (opts?.admin ? listProductsAdmin() : listProducts()),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["products"] });

  const upsert = useMutation({
    mutationFn: (p: Product) =>
      upsertProduct({
        data: {
          ...(p.id ? { id: p.id } : {}),
          nameEn: p.nameEn,
          nameAm: p.nameAm,
          category: p.category,
          subtype: p.subtype,
          descriptionEn: p.descriptionEn,
          descriptionAm: p.descriptionAm,
          image: p.image,
          specs: p.specs,
          active: p.active,
        },
      }),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteProduct({ data: { id } }),
    onSuccess: invalidate,
  });

  return {
    products: query.data ?? [],
    isLoading: query.isLoading,
    upsert: (p: Product) => upsert.mutateAsync(p),
    remove: (id: string) => remove.mutateAsync(id),
    refetch: query.refetch,
  };
}

export function useGallery() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.gallery,
    queryFn: () => listGalleryImages(),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: queryKeys.gallery });

  const add = useMutation({
    mutationFn: (img: Pick<GalleryImage, "src" | "captionEn" | "captionAm">) =>
      createGalleryImage({ data: img }),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: (img: GalleryImage) =>
      updateGalleryImage({ data: { id: img.id, captionEn: img.captionEn, captionAm: img.captionAm } }),
    onSuccess: invalidate,
  });

  const move = useMutation({
    mutationFn: ({ id, direction }: { id: string; direction: -1 | 1 }) =>
      reorderGalleryImage({ data: { id, direction } }),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteGalleryImage({ data: { id } }),
    onSuccess: invalidate,
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    add: (img: Pick<GalleryImage, "src" | "captionEn" | "captionAm">) => add.mutateAsync(img),
    update: (img: GalleryImage) => update.mutateAsync(img),
    move: (id: string, direction: -1 | 1) => move.mutateAsync({ id, direction }),
    remove: (id: string) => remove.mutateAsync(id),
  };
}

export function useSettings() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => getSettings(),
  });

  const save = useMutation({
    mutationFn: (s: SiteSettings) =>
      updateSettings({
        data: {
          aboutEn: s.aboutEn,
          aboutAm: s.aboutAm,
          phone: s.phone,
          whatsapp: s.whatsapp,
          telegram: s.telegram,
          email: s.email,
          mapUrl: s.mapUrl,
          address: s.address,
          logo: s.logo,
        },
      }),
    onSuccess: (data) => qc.setQueryData(queryKeys.settings, data),
  });

  return {
    settings: query.data,
    isLoading: query.isLoading,
    save: (s: SiteSettings) => save.mutateAsync(s),
  };
}

export async function uploadImage(dataUrl: string) {
  return uploadImageFn({ data: { dataUrl } });
}
