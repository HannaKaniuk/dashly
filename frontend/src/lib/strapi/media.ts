import type { StrapiMedia } from "./types";

export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:1337";

export function getStrapiUrl() {
  return STRAPI_URL;
}

export function mediaUrl(media?: StrapiMedia | null) {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}
