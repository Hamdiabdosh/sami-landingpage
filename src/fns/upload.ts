import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { uploadImage } from "@/lib/cloudinary";
import { adminMiddleware } from "./admin-middleware";

export const uploadImageFn = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(z.object({ dataUrl: z.string().min(1) }))
  .handler(async ({ data }) => uploadImage(data.dataUrl));
