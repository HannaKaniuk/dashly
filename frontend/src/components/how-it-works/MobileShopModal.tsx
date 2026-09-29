"use client";

import { useEffect, useId, useRef } from "react";
import { STEPS } from "@/data/steps";
import { cn } from "@/lib/cn";
import type { Product, ProductCategory } from "@/lib/strapi";
import { Asset } from "@/components/ui/Asset";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCardXS } from "./ProductCardXS";

type Props = {
  open: boolean;
  stepIndex: number;
  onStepChange: (index: number) => void;
  onClose: () => void;
  products: Product[];
  categories: ProductCategory[];
  activeCategoryId: string | null;
  onCategoryChange: (documentId: string) => void;
};

export function MobileShopModal({
  open,
  stepIndex,
  onStepChange,
  onClose,
  products,
  categories,
  activeCategoryId,
  onCategoryChange,
}: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const step = STEPS[stepIndex] ?? STEPS[0];

  return (
    <div className="fixed inset-0 z-[80] bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_8%,#e8e8e8_18%,#d9d9d9_26%,#d9d9d9_58%,#ececec_74%,#ffffff_92%,#ffffff_100%)] lg:hidden">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-dvh flex-col overflow-y-auto bg-transparent"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 size-8 border-0 bg-transparent p-0"
        >
          <Asset
            src="/icons/mobile/close.svg"
            width={32}
            height={32}
            className="size-8"
          />
        </button>

        <h2
          id={titleId}
          className="px-3 pt-[60px] text-center text-[24px] font-bold leading-[1.2] text-neutral-900"
        >
          {step.cta}
        </h2>

        <div className="mt-10 min-w-0 shrink-0">
          <CategoryTabs
            variant="overlay"
            categories={categories}
            activeId={activeCategoryId}
            onChange={onCategoryChange}
          />
        </div>

        <div className="-mt-4 min-w-0 shrink-0 overflow-x-auto scrollbar-hide">
          {products.length ? (
            <div className="flex w-max items-start gap-2 pb-2 pl-[22px] pr-3">
              {products.map((product) => (
                <ProductCardXS key={product.documentId} product={product} />
              ))}
            </div>
          ) : (
            <p className="px-[22px] py-6 text-base font-medium text-neutral-800">
              No products in this category yet.
            </p>
          )}
        </div>

        <div className="mt-auto flex w-full shrink-0 flex-col items-center gap-4 px-3.5 pb-8 pt-6">
          <p className="w-[219px] text-center text-[18px] font-medium leading-[1.3] text-neutral-700">
            Shop products for:
          </p>
          <div className="grid w-full grid-cols-2 gap-1">
            {STEPS.map((item, index) => {
              const active = index === stepIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onStepChange(index)}
                  className={cn(
                    "soft-shadow flex h-[35px] items-end rounded-[12px] border border-solid px-3 pb-[5px] text-left",
                    active
                      ? "border-[#f3f5f5] bg-neutral-900"
                      : "border-neutral-300 bg-white",
                  )}
                >
                  <span className="flex items-end gap-2.5">
                    <span className="relative h-5 w-[41.667px] shrink-0 overflow-hidden">
                      <span className="absolute left-1/2 top-[14px] -translate-x-1/2 -translate-y-1/2 text-[38px] font-medium leading-none tracking-[-1px] text-neutral-600">
                        {item.number}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "text-[18px] font-bold leading-[1.3]",
                        active ? "text-white" : "text-brand-900",
                      )}
                    >
                      {item.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
