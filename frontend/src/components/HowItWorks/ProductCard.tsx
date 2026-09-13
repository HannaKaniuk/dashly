"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import {
  formatGBP,
  mediaUrl,
  resolvePrice,
  type Product,
} from "@/lib/strapi";
import { cn } from "@/lib/cn";

type Props = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: Props) {
  const price = resolvePrice(product);
  const image = mediaUrl(product.image);
  const badges = (product.badges ?? []).filter(Boolean);
  const variationGroups = product.variations ?? [];

  const [selected, setSelected] = useState<Record<number, number>>(() => {
    const init: Record<number, number> = {};
    variationGroups.forEach((_, i) => {
      init[i] = 0;
    });
    return init;
  });

  return (
    <article
      className={cn(
        "flex w-[264px] shrink-0 flex-col rounded-[28px] bg-white",
        className,
      )}
    >
      <div className="relative mx-2 mt-2 aspect-square overflow-hidden rounded-[22px] bg-neutral-200">
        {image ? (
          <Image
            src={image}
            alt={product.image?.alternativeText || product.title}
            fill
            sizes="248px"
            className="object-cover"
          />
        ) : null}

        {badges.length > 0 ? (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-xl bg-white px-3 py-2 text-[15px] font-bold leading-none text-neutral-900 soft-shadow"
              >
                {badge}
              </span>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          aria-label={`Add ${product.title} to wishlist`}
          className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-white/90 text-neutral-900 soft-shadow transition-colors hover:text-accents-teal"
        >
          <svg viewBox="0 0 22 22" className="size-5" fill="none" aria-hidden>
            <path
              d="M11 18s-6.5-4.1-6.5-8.2A3.7 3.7 0 0 1 11 6.6a3.7 3.7 0 0 1 6.5 3.2C17.5 13.9 11 18 11 18Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-2 pb-3 pt-4">
        <div className="space-y-4">
          <h3 className="text-[18px] font-bold leading-tight text-neutral-900">
            {product.title}
            {product.volume ? (
              <>
                <br />
                <span className="font-medium text-neutral-800">
                  {product.volume}
                </span>
              </>
            ) : null}
          </h3>

          {variationGroups.map((group, gi) => {
            const options = group.options ?? [];
            if (!options.length) return null;
            const style = group.displayStyle || "pills";

            return (
              <div key={`${group.label}-${gi}`} className="space-y-2">
                <p className="text-sm font-medium text-neutral-800">
                  {group.label}
                </p>
                {style === "list" ? (
                  <div className="flex flex-col gap-1.5">
                    {options.map((opt, oi) => {
                      const active = selected[gi] === oi;
                      const optImg = mediaUrl(opt.image);
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() =>
                            setSelected((s) => ({ ...s, [gi]: oi }))
                          }
                          className={cn(
                            "flex w-full items-center gap-2 rounded-full px-1.5 py-1.5 text-left text-sm font-medium transition-colors",
                            active
                              ? "bg-neutral-900 text-white"
                              : "bg-neutral-200 text-neutral-900 hover:bg-neutral-200/80",
                          )}
                        >
                          {optImg ? (
                            <span className="relative size-7 shrink-0 overflow-hidden rounded-full">
                              <Image
                                src={optImg}
                                alt=""
                                fill
                                sizes="28px"
                                className="object-cover"
                              />
                            </span>
                          ) : null}
                          <span className="px-1">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {options.map((opt, oi) => {
                      const active = selected[gi] === oi;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() =>
                            setSelected((s) => ({ ...s, [gi]: oi }))
                          }
                          className={cn(
                            "relative rounded-full px-3 py-2.5 text-sm font-medium transition-colors",
                            active
                              ? "bg-neutral-900 text-white"
                              : "bg-neutral-200 text-neutral-900 hover:bg-neutral-200/80",
                          )}
                        >
                          {opt.label}
                          {opt.optionDiscountPercent ? (
                            <span className="absolute -right-1 -top-2 rounded-md bg-neutral-900 px-1 py-0.5 text-[10px] font-bold text-white">
                              -{opt.optionDiscountPercent}%
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-auto space-y-3 pt-2">
          <div className="relative flex items-end gap-3 px-1">
            <div>
              {price.hasDiscount && price.original != null ? (
                <p className="text-sm font-medium text-neutral-800 line-through">
                  {formatGBP(price.original)}
                </p>
              ) : null}
              <p className="flex items-baseline gap-2 text-lg font-bold text-neutral-900">
                <span className="text-base font-bold text-neutral-800">
                  Price
                </span>
                {formatGBP(price.current)}
              </p>
            </div>
            {price.hasDiscount && price.discountPercent != null ? (
              <span className="mb-0.5 rounded-lg bg-neutral-900 px-2 py-1.5 text-sm font-bold text-white">
                -{price.discountPercent}%
              </span>
            ) : null}
          </div>

          <div className="space-y-2">
            <Button variant="mint" size="sm" fullWidth icon="arrow-up-right">
              Add to bag
            </Button>
            <Button variant="ghost" size="link" fullWidth icon="none" className="justify-center">
              View details
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
