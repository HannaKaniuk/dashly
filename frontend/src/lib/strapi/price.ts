import type { Product, ResolvedPrice } from "./types";

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
