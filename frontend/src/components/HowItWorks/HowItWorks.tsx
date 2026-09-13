"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STEPS } from "@/data/steps";
import type { Product, ProductCategory } from "@/lib/strapi";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";
import { StepCard } from "./StepCard";
import { cn } from "@/lib/cn";

type Props = {
  products: Product[];
  categories: ProductCategory[];
};

const STICKY_BASE = 72;
const STICKY_STEP = 16;

export function HowItWorks({ products, categories }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const shelfRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [compact, setCompact] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories[0]?.documentId ?? null,
  );
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayStep, setOverlayStep] = useState(0);
  const scrollLockY = useRef(0);

  useEffect(() => {
    if (!activeCategoryId && categories[0]) {
      setActiveCategoryId(categories[0].documentId);
    }
  }, [categories, activeCategoryId]);

  useEffect(() => {
    const onScroll = () => {
      const anchor = STICKY_BASE + 24;
      const offsets = stepRefs.current.map((el) => {
        if (!el) return Number.POSITIVE_INFINITY;
        return Math.abs(el.getBoundingClientRect().top - anchor);
      });
      const nearest = offsets.indexOf(Math.min(...offsets));
      if (nearest >= 0) setActiveStep(nearest);

      const first = stepRefs.current[0];
      const last = stepRefs.current[STEPS.length - 1];
      if (first && last) {
        const span = Math.max(1, last.offsetTop - first.offsetTop);
        const progress = Math.min(
          1,
          Math.max(0, (anchor - first.getBoundingClientRect().top) / span),
        );
        // Stronger compact so step bottoms can meet product column visual
        setCompact(progress * 18);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayOpen(false);
  }, []);

  useEffect(() => {
    if (!overlayOpen) {
      lastFocusRef.current?.focus?.();
      return;
    }

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    scrollLockY.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockY.current}px`;
    document.body.style.width = "100%";

    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeOverlay();
        return;
      }
      if (e.key !== "Tab" || !overlayRef.current) return;

      const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const list = Array.from(focusables).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
      );
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollLockY.current);
    };
  }, [overlayOpen, closeOverlay]);

  const filteredProducts = useMemo(() => {
    if (!activeCategoryId) return products;
    return products.filter((p) =>
      (p.categories ?? []).some((c) => c.documentId === activeCategoryId),
    );
  }, [products, activeCategoryId]);

  const scrollToStep = (index: number) => {
    stepRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const openOverlay = (index: number) => {
    setOverlayStep(index);
    setOverlayOpen(true);
  };

  const stackGap =
    "clamp(7.5rem, 18vh, 16rem)";

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full max-w-[1440px] px-4 pb-24 pt-14 md:px-5 md:pb-32 md:pt-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 md:gap-20">
        <div className="card-shadow flex w-full max-w-[661px] flex-col items-center gap-3 rounded-[200px] bg-gradient-to-b from-[#f3f5f5] to-[#f5fcfd] px-6 py-6 text-center md:px-40 md:py-7">
          <h2
            id="how-it-works-heading"
            className="flex items-center gap-1.5 text-[28px] font-bold leading-none text-neutral-900 md:text-[38px]"
          >
            How it
            <span
              className="inline-flex size-7 items-center justify-center md:size-8"
              aria-hidden
            >
              <svg viewBox="0 0 32 32" className="size-full" fill="none">
                <path
                  d="M16 5.5l2.1 6.5H25l-5.3 3.9 2 6.6L16 18.6l-5.7 3.9 2-6.6L7 12h6.9L16 5.5z"
                  stroke="#63cc96"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-brand-500">works</span>
          </h2>
          <p className="text-base font-medium text-neutral-800 md:text-lg">
            4 simple steps to healthier-looking skin
          </p>
        </div>

        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,500px)_minmax(0,1fr)] lg:items-start lg:gap-10">
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
                    marginBottom:
                      index === STEPS.length - 1 ? 0 : stackGap,
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
                    onShop={() => {
                      if (window.matchMedia("(max-width: 1023px)").matches) {
                        openOverlay(index);
                      } else {
                        shelfRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                        });
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>

          <aside
            id="products-shelf"
            ref={shelfRef}
            className="sticky top-[4.5rem] hidden self-start overflow-hidden lg:block"
            style={{
              paddingBottom: `${Math.max(0, 8 - compact / 2)}px`,
              maxHeight: "calc(100vh - 5.5rem)",
            }}
          >
            <div className="flex flex-col gap-3 overflow-hidden">
              <p className="text-base font-bold text-neutral-900">
                {STEPS[activeStep]?.cta ?? "Shop cleansers"}
              </p>
              <CategoryTabs
                categories={categories}
                activeId={activeCategoryId}
                onChange={setActiveCategoryId}
              />
              <div className="overflow-x-auto overflow-y-visible pb-2 scrollbar-hide">
                <div className="flex w-max gap-3 pr-2">
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

      <AnimatePresence>
        {overlayOpen ? (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close products"
              className="absolute inset-0 bg-white/85 backdrop-blur-sm"
              onClick={closeOverlay}
              tabIndex={-1}
            />
            <motion.div
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              aria-label="Products"
              className="absolute inset-x-0 bottom-0 top-0 flex flex-col bg-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="flex items-center justify-between px-4 pt-6">
                <h3 className="text-2xl font-bold text-neutral-900">
                  {STEPS[overlayStep]?.cta}
                </h3>
                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label="Close"
                  onClick={closeOverlay}
                  className="flex size-11 items-center justify-center rounded-full bg-neutral-200 text-2xl font-bold text-neutral-900"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 px-4">
                <CategoryTabs
                  categories={categories}
                  activeId={activeCategoryId}
                  onChange={setActiveCategoryId}
                />
              </div>

              <div className="mt-4 flex-1 overflow-x-auto overflow-y-auto px-4 pb-28 scrollbar-hide">
                <div className="flex w-max gap-3">
                  {filteredProducts.length ? (
                    filteredProducts.map((p) => (
                      <ProductCard key={p.documentId} product={p} />
                    ))
                  ) : (
                    <p className="py-10 text-base font-medium text-neutral-800">
                      No products in this category yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 border-t border-neutral-200 bg-white px-2 py-2.5">
                <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                  {STEPS.map((step, i) => (
                    <button
                      key={step.id}
                      type="button"
                      aria-current={overlayStep === i ? "true" : undefined}
                      onClick={() => setOverlayStep(i)}
                      className={cn(
                        "shrink-0 rounded-full px-3 py-2.5 text-xs font-bold transition-colors",
                        overlayStep === i
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-200 text-neutral-900",
                      )}
                    >
                      <span className="tabular-nums">{step.number}</span>{" "}
                      {step.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
