"use client";

import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/strapi";

type Props = {
  categories: ProductCategory[];
  activeId: string | null;
  onChange: (documentId: string) => void;
  className?: string;
  /** Figma products popup menu (1:13234) inside scroll wrap (1:13233) */
  variant?: "default" | "overlay";
};

export function CategoryTabs({
  categories,
  activeId,
  onChange,
  className,
  variant = "default",
}: Props) {
  if (!categories.length) return null;

  const overlay = variant === "overlay";

  const tabs = categories.map((cat) => {
    const active = cat.documentId === activeId;
    return (
      <button
        key={cat.documentId}
        type="button"
        role="tab"
        aria-selected={active}
        onClick={() => onChange(cat.documentId)}
        className={cn(
          "shrink-0 rounded-full transition-colors duration-300",
          overlay
            ? cn(
                // Figma 1:13235 / 1:13238 — p:12, text 18 / leading 1.3 (no shadow on mobile)
                "flex items-center justify-center p-3 text-[18px] leading-[1.3]",
                active
                  ? "bg-neutral-900 font-medium text-[#fcfcfc]"
                  : "bg-transparent font-normal text-neutral-900",
              )
            : cn(
                // Figma 50:3794 / 50:3797 — px-32 py-24, text 18
                "px-8 py-6 text-[18px] font-bold tracking-[-0.36px]",
                active
                  ? "soft-shadow bg-neutral-900 text-[#fcfcfc]"
                  : "bg-transparent text-neutral-900 hover:text-accents-teal",
              ),
        )}
      >
        {cat.name}
      </button>
    );
  });

  // Overlay (mobile popup): no shadows
  if (overlay) {
    return (
      <div
        className={cn(
          "w-full shrink-0 overflow-x-auto scrollbar-hide",
          className,
        )}
      >
        <div
          role="tablist"
          aria-label="Product categories"
          className="relative z-10 inline-flex h-[55px] w-max items-center gap-3 rounded-[200px] bg-neutral-100 p-1"
        >
          {tabs}
        </div>
      </div>
    );
  }

  // Desktop menu — Figma 50:3793
  return (
    <div
      className={cn(
        "soft-shadow flex w-fit max-w-full items-center gap-6 overflow-x-auto rounded-[200px] border border-[#f3f5f5] bg-white p-1 scrollbar-hide",
        className,
      )}
      role="tablist"
      aria-label="Product categories"
    >
      {tabs}
    </div>
  );
}
