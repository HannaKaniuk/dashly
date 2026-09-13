export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export type AnnouncementMessage = {
  id: number;
  documentId: string;
  text: string;
  order: number;
};

export type ProductCategory = {
  id: number;
  documentId: string;
  name: string;
  order: number;
};

export type VariationOption = {
  id?: number;
  label: string;
  optionDiscountPercent?: number | null;
  image?: StrapiMedia | null;
};

export type VariationGroup = {
  id?: number;
  label: string;
  displayStyle?: "pills" | "list";
  options?: VariationOption[];
};

export type PricingMode = "percent_off" | "sale_price";

export type Product = {
  id: number;
  documentId: string;
  title: string;
  volume?: string | null;
  badges?: string[] | null;
  pricingMode: PricingMode;
  price?: number | null;
  discountPercent?: number | null;
  compareAtPrice?: number | null;
  salePrice?: number | null;
  order: number;
  image?: StrapiMedia | null;
  variations?: VariationGroup[] | null;
  categories?: ProductCategory[] | null;
};

export type ResolvedPrice = {
  current: number;
  original: number | null;
  discountPercent: number | null;
  hasDiscount: boolean;
};

export function resolvePrice(product: Product): ResolvedPrice {
  if (product.pricingMode === "sale_price") {
    const sale = Number(product.salePrice ?? 0);
    const compare = Number(product.compareAtPrice ?? 0);
    if (compare > sale && sale > 0) {
      const pct = Math.round(((compare - sale) / compare) * 100);
      return {
        current: sale,
        original: compare,
        discountPercent: pct,
        hasDiscount: true,
      };
    }
    const fallback = sale || compare || Number(product.price ?? 0);
    return {
      current: fallback,
      original: null,
      discountPercent: null,
      hasDiscount: false,
    };
  }

  const base = Number(product.price ?? 0);
  const pct = Number(product.discountPercent ?? 0);
  if (pct > 0 && base > 0) {
    const sale = Math.round(base * (1 - pct / 100) * 100) / 100;
    return {
      current: sale,
      original: base,
      discountPercent: pct,
      hasDiscount: true,
    };
  }

  return {
    current: base,
    original: null,
    discountPercent: null,
    hasDiscount: false,
  };
}

export function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

const STRAPI_URL =
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

type StrapiListResponse<T> = { data: T[] };

async function strapiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };

  if (process.env.STRAPI_API_TOKEN) {
    (headers as Record<string, string>).Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
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
