import type { RefObject } from "react";
import { STEPS } from "@/data/steps";
import type { Product, ProductCategory } from "@/lib/strapi";
import { ProductShelf } from "./ProductShelf";
import { StepCard } from "./StepCard";
import { STICKY_OFFSETS } from "./useStickySteps";

type Props = {
  stepRefs: RefObject<(HTMLDivElement | null)[]>;
  activeStep: number;
  shopStep: number;
  compact: number;
  products: Product[];
  categories: ProductCategory[];
  activeCategoryId: string | null;
  onCategoryChange: (documentId: string) => void;
  onSelect: (index: number) => void;
  onShop: (index: number) => void;
};

const STACK_GAP = "clamp(7.5rem, 18vh, 16rem)";

export function DesktopSteps({
  stepRefs,
  activeStep,
  shopStep,
  compact,
  products,
  categories,
  activeCategoryId,
  onCategoryChange,
  onSelect,
  onShop,
}: Props) {
  return (
    <div className="relative hidden w-full pb-32 pt-[160px] lg:block">
      <div className="mx-auto flex w-[min(100%,89%)] flex-col items-center gap-[clamp(3rem,6vw,5rem)] px-4 lg:px-0">
        <div className="card-shadow flex w-full max-w-[46vw] flex-col items-center gap-3 rounded-[200px] bg-gradient-to-b from-[#f3f5f5] from-[11.5%] to-[#f5fcfd] to-[104.6%] px-[clamp(2rem,11vw,12rem)] py-7 text-center">
          <h2 className="flex items-center gap-1.5 text-[clamp(2rem,3vw,2rem)] font-bold leading-none text-neutral-900">
            How it
            <span
              className="inline-flex size-8 items-center justify-center text-brand-500"
              aria-hidden
            >
              <svg viewBox="0 0 32 32" className="size-8" fill="none">
                <path
                  d="M16.5514 23.8416L22.8558 27.8358C23.6617 28.3464 24.6622 27.587 24.4231 26.6463L22.6016 19.481C22.5503 19.2815 22.5564 19.0715 22.6191 18.8752C22.6819 18.6789 22.7987 18.5044 22.9563 18.3716L28.6097 13.6661C29.3525 13.0478 28.9691 11.815 28.0147 11.7531L20.6318 11.2739C20.4329 11.2597 20.2422 11.1893 20.0818 11.0709C19.9214 10.9525 19.7979 10.791 19.7258 10.6051L16.9722 3.67098C16.8974 3.47371 16.7643 3.30388 16.5906 3.18403C16.417 3.06419 16.211 3.00001 16 3.00001C15.789 3.00001 15.583 3.06419 15.4094 3.18403C15.2357 3.30388 15.1026 3.47371 15.0278 3.67098L12.2742 10.6051C12.2021 10.791 12.0786 10.9525 11.9182 11.0709C11.7578 11.1893 11.5671 11.2597 11.3682 11.2739L3.98525 11.7531C3.03087 11.815 2.64746 13.0478 3.39029 13.6661L9.04371 18.3716C9.20126 18.5044 9.31813 18.6789 9.38087 18.8752C9.44362 19.0715 9.44969 19.2815 9.3984 19.481L7.70918 26.1261C7.42222 27.2549 8.62287 28.1661 9.5899 27.5534L15.4486 23.8416C15.6134 23.7367 15.8047 23.681 16 23.681C16.1953 23.681 16.3866 23.7367 16.5514 23.8416Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-brand-500">works</span>
          </h2>
          <p className="text-lg font-bold leading-[1.2] text-neutral-800">
            4 simple steps to healthier-looking skin
          </p>
        </div>

        <div className="grid w-full gap-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-[minmax(280px,39.0625%)_minmax(0,1fr)] lg:items-start">
          <div className="relative flex flex-col">
            {STEPS.map((step, index) => {
              const stickyTop =
                STICKY_OFFSETS.desktopBase + index * STICKY_OFFSETS.desktopStep;
              const coverDepth = Math.max(0, activeStep - index);
              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="sticky"
                  style={{
                    top: `clamp(0.75rem, ${stickyTop}px, 28vh)`,
                    marginBottom: index === STEPS.length - 1 ? 0 : STACK_GAP,
                    zIndex: index + 1,
                    paddingBottom: index === STEPS.length - 1 ? 0 : "1.5rem",
                  }}
                >
                  <StepCard
                    step={step}
                    index={index}
                    isCovered={activeStep > index}
                    coverDepth={coverDepth}
                    compactPadding={compact}
                    onSelect={() => onSelect(index)}
                    onShop={() => onShop(index)}
                  />
                </div>
              );
            })}
            <div className="h-16 w-full shrink-0" aria-hidden />
          </div>

          <ProductShelf
            shopStep={shopStep}
            compact={compact}
            products={products}
            categories={categories}
            activeCategoryId={activeCategoryId}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>
    </div>
  );
}
