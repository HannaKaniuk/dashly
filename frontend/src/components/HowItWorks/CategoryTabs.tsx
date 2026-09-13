"use client";

import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/strapi";

type Props = {
  categories: ProductCategory[];
  activeId: string | null;
  onChange: (documentId: string) => void;
  className?: string;
};

export function CategoryTabs({
  categories,
  activeId,
  onChange,
  className,
}: Props) {
  if (!categories.length) return null;

  return (
    <div
      className={cn(
        "soft-shadow flex w-fit max-w-full items-center gap-0 overflow-x-auto rounded-full bg-white p-1 scrollbar-hide",
        className,
      )}
      role="tablist"
      aria-label="Product categories"
    >
      {categories.map((cat) => {
        const active = cat.documentId === activeId;
        return (
          <button
            key={cat.documentId}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(cat.documentId)}
            className={cn(
              "shrink-0 rounded-full px-6 py-3.5 text-[15px] font-bold transition-colors duration-300 md:px-8 md:py-4 md:text-base",
              active
                ? "bg-neutral-900 text-white"
                : "bg-transparent text-neutral-900 hover:text-accents-teal",
            )}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
