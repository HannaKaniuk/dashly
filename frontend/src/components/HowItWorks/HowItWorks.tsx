"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STEPS } from "@/data/steps";
import type { Product, ProductCategory } from "@/lib/strapi";
import { CategoryTabs } from "./CategoryTabs";
import { MobileShopModal } from "./MobileShopModal";
import { ProductCard } from "./ProductCard";
import { StepCard } from "./StepCard";
import { MobileStepCard } from "./MobileStepCard";

type Props = {
  products: Product[];
  categories: ProductCategory[];
};

const STICKY_BASE = 72;
const STICKY_STEP = 16;
const MOBILE_STICKY_BASE = 16;
const MOBILE_STICKY_STEP = 20;

function stickyLayoutTop(el: HTMLElement) {
  const previous = el.style.position;
  el.style.position = "relative";
  const top = el.getBoundingClientRect().top + window.scrollY;
  el.style.position = previous;
  return top;
}

function stuckStepIndex(refs: (HTMLElement | null)[]) {
  let active = 0;
  refs.forEach((el, index) => {
    if (!el) return;
    const stick = parseFloat(getComputedStyle(el).top) || 0;
    if (el.getBoundingClientRect().top <= stick + 1) active = index;
  });
  return active;
}

export function HowItWorks({ products, categories }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const shelfRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileStepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const [shopStep, setShopStep] = useState(0);
  const scrolledStepRef = useRef(0);
  const shopPinRef = useRef<number | null>(null);
  const [compact, setCompact] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories[0]?.documentId ?? null,
  );
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  useEffect(() => {
    if (!activeCategoryId && categories[0]) {
      setActiveCategoryId(categories[0].documentId);
    }
  }, [categories, activeCategoryId]);

  useEffect(() => {
    const onScroll = () => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const refs = isMobile ? mobileStepRefs.current : stepRefs.current;
      const stickyBase = isMobile ? MOBILE_STICKY_BASE : STICKY_BASE;
      const stickyStep = isMobile ? MOBILE_STICKY_STEP : STICKY_STEP;
      const anchor = stickyBase + stickyStep + 8;
      const nearest = stuckStepIndex(refs);
      if (nearest >= 0) {
        setActiveStep(nearest);
        if (shopPinRef.current === null) {
          if (nearest !== scrolledStepRef.current) {
            scrolledStepRef.current = nearest;
            setShopStep(nearest);
          }
        } else if (nearest === shopPinRef.current) {
          shopPinRef.current = null;
          scrolledStepRef.current = nearest;
        }
      }

      if (!isMobile) {
        const first = stepRefs.current[0];
        const last = stepRefs.current[STEPS.length - 1];
        if (first && last) {
          const span = Math.max(1, last.offsetTop - first.offsetTop);
          const progress = Math.min(
            1,
            Math.max(0, (anchor - first.getBoundingClientRect().top) / span),
          );
          setCompact(progress * 18);
        }
      }
    };

    const onScrollEnd = () => {
      shopPinRef.current = null;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!activeCategoryId) return products;
    return products.filter((p) =>
      (p.categories ?? []).some((c) => c.documentId === activeCategoryId),
    );
  }, [products, activeCategoryId]);

  const scrollToStep = (index: number) => {
    const el = stepRefs.current[index];
    if (!el) return;
    const stick = parseFloat(getComputedStyle(el).top) || 0;
    const top = Math.max(0, stickyLayoutTop(el) - stick);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const shopFromStep = (index: number) => {
    shopPinRef.current = index;
    scrolledStepRef.current = index;
    setShopStep(index);
    scrollToStep(index);
  };

  const openMobileShop = (index: number) => {
    setShopStep(index);
    setMobileShopOpen(true);
  };

  const stackGap = "clamp(7.5rem, 18vh, 16rem)";
  const mobileStackGap = "clamp(5.5rem, 22vh, 11rem)";

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full"
      aria-label="How it works"
    >
      <div className="mx-auto flex w-full flex-col items-center px-3.5 pb-[35px] pt-[137px] lg:hidden">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center gap-3">
            <h2 className="flex items-center gap-1.5 text-[30px] font-normal leading-none text-neutral-900">
              How it
              <span
                className="relative inline-flex size-8 shrink-0"
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/mobile/star.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="size-8"
                />
              </span>
              <span className="text-brand-500">works</span>
            </h2>
            <p className="max-w-[219px] text-center text-[18px] font-medium leading-[1.2] text-neutral-800">
              4 simple steps to healthier-looking skin
            </p>
          </div>

          <div className="relative flex w-full flex-col items-start">
            {STEPS.map((step, index) => {
              const stickyTop = MOBILE_STICKY_BASE + index * MOBILE_STICKY_STEP;
              const coverDepth = Math.max(0, activeStep - index);
              const isLast = index === STEPS.length - 1;
              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    mobileStepRefs.current[index] = el;
                  }}
                  className="sticky w-full"
                  style={{
                    top: stickyTop,
                    marginBottom: mobileStackGap,
                    zIndex: index + 1,
                    paddingBottom: isLast ? 0 : "0.75rem",
                  }}
                >
                  <MobileStepCard
                    step={step}
                    index={index}
                    isCovered={activeStep > index}
                    coverDepth={coverDepth}
                    onShop={() => openMobileShop(index)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative hidden w-full pb-32 pt-[160px] lg:block">
        <div className="mx-auto flex w-[min(100%,88.8889%)] flex-col items-center gap-[clamp(3rem,6vw,5rem)] px-4 lg:px-0">
          <div className="card-shadow flex w-full max-w-[45.9vw] flex-col items-center gap-3 rounded-[200px] bg-gradient-to-b from-[#f3f5f5] from-[11.5%] to-[#f5fcfd] to-[104.6%] px-[clamp(2rem,11vw,12rem)] py-7 text-center">
            <h2 className="flex items-center gap-1.5 text-[clamp(1.75rem,3vw,2.375rem)] font-bold leading-none text-neutral-900">
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

          <div className="grid w-full gap-[clamp(1.5rem,2.78vw,2.5rem)] lg:grid-cols-[minmax(280px,39.0625%)_minmax(0,1fr)] lg:items-start">
            <div className="relative flex flex-col">
              {STEPS.map((step, index) => {
                const stickyTop = STICKY_BASE + index * STICKY_STEP;
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
                      marginBottom: index === STEPS.length - 1 ? 0 : stackGap,
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
                      onSelect={() => scrollToStep(index)}
                      onShop={() => shopFromStep(index)}
                    />
                  </div>
                );
              })}
              <div className="h-16 w-full shrink-0" aria-hidden />
            </div>

            <aside
              id="products-shelf"
              ref={shelfRef}
              className="sticky top-[4.5rem] self-start overflow-visible"
              style={{
                paddingBottom: `${Math.max(0, 8 - compact / 2)}px`,
                maxHeight: "calc(100vh - 5.5rem)",
              }}
            >
              <div className="flex w-full flex-col items-start gap-3 overflow-visible">
                <p className="text-base font-bold leading-[1.1] text-neutral-900">
                  {STEPS[shopStep]?.cta ?? "Shop cleansers"}
                </p>
                <CategoryTabs
                  categories={categories}
                  activeId={activeCategoryId}
                  onChange={setActiveCategoryId}
                />
                <div className="-mx-2 w-[calc(100%+1rem)] overflow-x-auto overflow-y-visible p-4 scrollbar-hide">
                  <div className="flex w-max items-stretch gap-3 pr-2">
                    {filteredProducts.length ? (
                      filteredProducts.map((p) => (
                        <ProductCard key={p.documentId} product={p} />
                      ))
                    ) : (
                      <p className="rounded-3xl bg-neutral-200 px-6 py-10 text-base font-medium text-neutral-800">
                        No products in this category yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

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
