"use client";

import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/strapi";

type Props = {
  categories: ProductCategory[];
  activeId: string | null;
  onChange: (documentId: string) => void;
  className?: string;
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
                "flex items-center justify-center p-3 text-[18px] leading-[1.3]",
                active
                  ? "bg-neutral-900 font-medium text-[#fcfcfc]"
                  : "bg-transparent font-normal text-neutral-900",
              )
            : cn(
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

  if (overlay) {
    return (
      <div
        className={cn(
          "-mx-3 w-[calc(100%+1.5rem)] shrink-0 overflow-x-auto scrollbar-hide",
          className,
        )}
      >
        <div className="inline-flex w-max pl-3 pr-3">
          <div
            role="tablist"
            aria-label="Product categories"
            className="relative z-10 inline-flex h-[55px] w-max items-center gap-3 rounded-[200px] bg-neutral-100 p-1"
          >
            {tabs}
          </div>
        </div>
      </div>
    );
  }

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
