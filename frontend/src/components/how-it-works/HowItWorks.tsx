"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product, ProductCategory } from "@/lib/strapi";
import { DesktopSteps } from "./DesktopSteps";
import { MobileShopModal } from "./MobileShopModal";
import { MobileSteps } from "./MobileSteps";
import { useStickySteps } from "./useStickySteps";

type Props = {
  products: Product[];
  categories: ProductCategory[];
};

export function HowItWorks({ products, categories }: Props) {
  const {
    stepRefs,
    mobileStepRefs,
    activeStep,
    shopStep,
    setShopStep,
    compact,
    scrollToStep,
    shopFromStep,
  } = useStickySteps();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories[0]?.documentId ?? null,
  );
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  useEffect(() => {
    if (!activeCategoryId && categories[0]) {
      setActiveCategoryId(categories[0].documentId);
    }
  }, [categories, activeCategoryId]);

  const filteredProducts = useMemo(() => {
    if (!activeCategoryId) return products;
    return products.filter((product) =>
      (product.categories ?? []).some(
        (category) => category.documentId === activeCategoryId,
      ),
    );
  }, [products, activeCategoryId]);

  const openMobileShop = (index: number) => {
    setShopStep(index);
    setMobileShopOpen(true);
  };

  return (
    <section
      id="how-it-works"
      className="relative w-full"
      aria-label="How it works"
    >
      <MobileSteps
        stepRefs={mobileStepRefs}
        activeStep={activeStep}
        onShop={openMobileShop}
      />
      <DesktopSteps
        stepRefs={stepRefs}
        activeStep={activeStep}
        shopStep={shopStep}
        compact={compact}
        products={filteredProducts}
        categories={categories}
        activeCategoryId={activeCategoryId}
        onCategoryChange={setActiveCategoryId}
        onSelect={scrollToStep}
        onShop={shopFromStep}
      />
      <MobileShopModal
        open={mobileShopOpen}
        stepIndex={shopStep}
        onStepChange={setShopStep}
        onClose={() => setMobileShopOpen(false)}
        products={filteredProducts}
        categories={categories}
        activeCategoryId={activeCategoryId}
        onCategoryChange={setActiveCategoryId}
      />
    </section>
  );
}
