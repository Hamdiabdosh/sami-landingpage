/** Returns true if URL can be used as an iframe embed src. */
export function isMapEmbedUrl(url: string): boolean {
  return /google\.com\/maps\/embed/i.test(url) || /[?&]output=embed/i.test(url);
}

/** Pick iframe src: dedicated embed field, or mapUrl when it is already embeddable. */
export function resolveMapEmbedUrl(mapUrl: string, mapEmbedUrl?: string | null): string | null {
  if (mapEmbedUrl?.trim()) return mapEmbedUrl.trim();
  if (mapUrl?.trim() && isMapEmbedUrl(mapUrl)) return mapUrl.trim();
  return null;
}

/** Link for opening directions in Google Maps (share / place URLs). */
export function resolveMapDirectionsUrl(mapUrl: string): string {
  const u = mapUrl.trim();
  if (!u) return "https://www.google.com/maps/search/?api=1&query=Dire+Dawa,+Ethiopia";
  if (isMapEmbedUrl(u)) {
    return "https://www.google.com/maps/search/?api=1&query=Dire+Dawa,+Ethiopia";
  }
  return u;
}

export const DEFAULT_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252796.8877045487!2d41.791389!3d9.593085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x165c5870e7b6088f%3A0x48f8c5d3e86f6e4b!2sDire%20Dawa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set";
