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
