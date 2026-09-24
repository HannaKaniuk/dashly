"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STEPS } from "@/data/steps";
import type { Product, ProductCategory } from "@/lib/strapi";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCardXS } from "./ProductCardXS";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  title: string;
  overlayStep: number;
  categories: ProductCategory[];
  activeCategoryId: string | null;
  products: Product[];
  onClose: () => void;
  onStepChange: (index: number) => void;
  onCategoryChange: (documentId: string) => void;
};

const backdropTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };
const panelTransition = {
  type: "spring" as const,
  damping: 26,
  stiffness: 320,
  mass: 0.85,
};
const sheetTransition = {
  type: "spring" as const,
  damping: 28,
  stiffness: 340,
  mass: 0.8,
};

/**
 * Mobile products popup — Figma 1:13225
 * Frosted overlay (white/80) + solid white plate (card shadow M).
 */
export function ProductsOverlay({
  open,
  title,
  overlayStep,
  categories,
  activeCategoryId,
  products,
  onClose,
  onStepChange,
  onCategoryChange,
}: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const scrollLockY = useRef(0);

  useEffect(() => {
    if (!open) return;

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    scrollLockY.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockY.current}px`;
    document.body.style.width = "100%";

    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
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
    };
  }, [open, onClose]);

  // Safety: clear body lock if overlay unmounts while open
  useEffect(() => {
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, []);

  /** Unlock scroll only after exit animation finishes — keeps close motion visible */
  const unlockScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollLockY.current);
    lastFocusRef.current?.focus?.();
  };

  return (
    <AnimatePresence onExitComplete={unlockScroll}>
      {open ? (
        <motion.div
          ref={panelRef}
          key="products-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50 flex items-center justify-center lg:hidden"
          initial={false}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
        >
          {/* Overlay — Figma 1:13227: rgba(255,255,255,0.8) */}
          <motion.button
            type="button"
            aria-label="Close products"
            className="absolute inset-0 bg-white/80"
            onClick={onClose}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
          />

          {/* Opened menus plate — Figma 1:13228 */}
          <motion.div
            className="relative z-10 flex h-[min(100%,847px)] w-[min(100%,371px)] max-w-[calc(100vw-8px)] flex-col gap-10 overflow-visible bg-gradient-to-b from-neutral-100 via-neutral-400 to-neutral-100 px-3 pb-[192px] pt-[60px]"
            initial={{ y: 56, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={panelTransition}
          >
            {/* Close — Figma 1:13249 @ right:20 top:20 */}
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-5 top-5 z-20 size-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/mobile/close.svg"
                alt=""
                width={32}
                height={32}
                className="size-8"
              />
            </button>

            {/* Title — Figma 1:13229 */}
            <h3 className="relative z-10 shrink-0 text-center text-2xl font-bold leading-[1.2] text-neutral-900">
              {title}
            </h3>

            {/* Tabs + products — Figma 1:13230 / 1:13242 */}
            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
              <CategoryTabs
                categories={categories}
                activeId={activeCategoryId}
                onChange={onCategoryChange}
                variant="overlay"
              />

              <div className="relative mt-[8px] min-h-0 flex-1">
                <div className="products-glow" aria-hidden />
                <div className="relative z-10 h-full overflow-x-auto overflow-y-auto pt-3 pb-8 scrollbar-hide">
                  <div className="flex w-max gap-2 pr-2">
                    {products.length ? (
                      products.map((p) => (
                        <ProductCardXS key={p.documentId} product={p} />
                      ))
                    ) : (
                      <p className="py-10 text-base font-medium text-neutral-800">
                        No products in this category yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom step switcher — Figma 1:13252 */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto flex h-[192px] w-full max-w-[375px] flex-col items-center overflow-hidden px-3.5 py-10"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={sheetTransition}
          >
            <div className="pointer-events-auto absolute bottom-8 left-3.5 flex w-[calc(100%-28px)] max-w-[347px] flex-col items-center gap-4">
              <p className="w-[219px] text-center text-[18px] font-medium leading-[1.3] text-neutral-700">
                Shop products for:
              </p>
              <div className="grid w-full grid-cols-2 gap-1">
                {STEPS.map((step, i) => {
                  const active = overlayStep === i;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      aria-current={active ? "true" : undefined}
                      onClick={() => onStepChange(i)}
                      className={cn(
                        "soft-shadow flex items-end gap-2.5 rounded-xl border px-3 py-1.5 transition-colors duration-300",
                        active
                          ? "justify-end border-[#f3f5f5] bg-neutral-900"
                          : "border-neutral-300 bg-white",
                      )}
                    >
                      <span className="relative h-5 w-[41.667px] shrink-0 overflow-hidden">
                        <span className="absolute left-1/2 top-[13.76px] -translate-x-1/2 -translate-y-1/2 text-center text-[38.095px] font-medium leading-none tracking-[-0.7619px] text-neutral-600">
                          {step.number}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "text-[18px] font-bold leading-[1.3]",
                          active ? "text-white" : "text-brand-900",
                        )}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
