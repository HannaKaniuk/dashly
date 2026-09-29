import { STRAPI_URL } from "./media";
import type { AnnouncementMessage, Product, ProductCategory } from "./types";

type StrapiListResponse<T> = { data: T[] };

async function strapiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };

  if (process.env.STRAPI_API_TOKEN) {
    (headers as Record<string, string>).Authorization =
      `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...init,
    headers,
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(`Strapi ${path} failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function getAnnouncements(): Promise<AnnouncementMessage[]> {
  try {
    const json = await strapiFetch<StrapiListResponse<AnnouncementMessage>>(
      "/api/announcement-messages?sort=order:asc&pagination[pageSize]=50",
    );
    return json.data ?? [];
  } catch {
    return [
      {
        id: 1,
        documentId: "fallback-1",
        text: "Get 15% off with code LUMEAFIRST15",
        order: 1,
      },
    ];
  }
}

export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const json = await strapiFetch<StrapiListResponse<ProductCategory>>(
      "/api/product-categories?sort=order:asc&pagination[pageSize]=50",
    );
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const json = await strapiFetch<StrapiListResponse<Product>>(
      "/api/products?sort=order:asc&populate[image]=true&populate[categories]=true&populate[variations][populate][options][populate][image]=true&pagination[pageSize]=50",
    );
    return json.data ?? [];
  } catch {
    return [];
  }
}
