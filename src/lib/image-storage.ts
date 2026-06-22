import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

export function getUploadDir() {
  return process.env.UPLOAD_DIR ?? path.join(process.cwd(), "data", "uploads");
}

export async function ensureUploadDir() {
  await mkdir(getUploadDir(), { recursive: true });
}

function parseDataUrl(dataUrl: string): Buffer {
  const match = dataUrl.match(/^data:[^;]+;base64,(.+)$/);
  if (!match) throw new Error("Invalid image data");
  return Buffer.from(match[1], "base64");
}

/** Converts uploads to WebP on disk; returns `/uploads/<id>.webp` for fast static serving. */
export async function uploadImage(source: string): Promise<string> {
  if (!source.startsWith("data:")) return source;

  const dir = getUploadDir();
  await ensureUploadDir();

  const webp = await sharp(parseDataUrl(source))
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  const filename = `${randomUUID()}.webp`;
  await writeFile(path.join(dir, filename), webp);
  return `/uploads/${filename}`;
}
