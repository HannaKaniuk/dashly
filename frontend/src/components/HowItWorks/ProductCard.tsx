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
    <div className={cn("relative flex w-[264px] shrink-0 self-stretch", className)}>
      <article className="soft-shadow flex h-full w-[264px] flex-col gap-4 rounded-[12px] border border-[#f3f5f5] bg-white p-2">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[12px] bg-neutral-200">
          {image ? (
            <Image
              src={image}
              alt={product.image?.alternativeText || product.title}
              fill
              sizes="248px"
              className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
            />
          ) : null}

          {badges.length > 0 ? (
            <div className="absolute left-[3px] top-[3px] z-10 flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="soft-shadow rounded-lg bg-neutral-900 px-3 py-2 text-[18px] font-bold leading-[1.3] text-white"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-2 pb-1">
          <div className="flex flex-col gap-3">
            <h3 className="text-[18px] font-bold leading-[1.2] text-neutral-900">
              {product.title}
              {product.volume ? (
                <>
                  <br />
                  {product.volume}
                </>
              ) : null}
            </h3>

            {variationGroups.map((group, gi) => {
              const options = group.options ?? [];
              if (!options.length) return null;
              const style = group.displayStyle || "pills";

              return (
                <div key={`${group.label}-${gi}`} className="flex flex-col gap-1">
                  <p className="text-sm font-bold leading-none tracking-[-0.28px] text-neutral-700">
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
                              "soft-shadow flex h-10 w-full items-center gap-2 rounded-lg border border-neutral-600 p-1.5 text-left text-sm font-bold tracking-[-0.28px] transition-colors duration-200",
                              active
                                ? "bg-neutral-400 text-neutral-900"
                                : "bg-white text-neutral-900 hover:bg-neutral-200",
                            )}
                          >
                            {optImg ? (
                              <span className="relative size-7 shrink-0 overflow-hidden rounded">
                                <Image
                                  src={optImg}
                                  alt=""
                                  fill
                                  sizes="28px"
                                  className="object-cover"
                                />
                              </span>
                            ) : null}
                            <span className="min-w-0 flex-1 leading-none">
                              {opt.label}
                            </span>
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
                              "relative flex h-10 items-center justify-center rounded-lg border border-neutral-600 px-3 py-2 text-sm font-bold tracking-[-0.28px] transition-colors duration-200",
                              active
                                ? "bg-neutral-400 text-brand-900"
                                : "bg-white text-neutral-900 hover:bg-neutral-200",
                            )}
                          >
                            <span className="leading-none">{opt.label}</span>
                            {opt.optionDiscountPercent ? (
                              <span className="absolute -right-2.5 -top-3 -rotate-3 rounded-full bg-neutral-900 p-1 text-sm font-bold leading-none tracking-[-0.28px] text-white">
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

          <div className="flex flex-col gap-2 pt-3">
            <div className="relative flex flex-col items-start justify-center rounded-[30px] bg-neutral-200 px-6 py-1">
              {price.hasDiscount && price.original != null ? (
                <p className="text-sm font-bold leading-none tracking-[-0.28px] text-neutral-700 line-through">
                  {formatGBP(price.original)}
                </p>
              ) : null}
              <p className="flex items-center gap-1.5 font-bold text-neutral-900">
                <span className="text-base leading-[1.1]">Price</span>
                <span className="text-lg leading-[1.2]">
                  {formatGBP(price.current)}
                </span>
              </p>
              {price.hasDiscount && price.discountPercent != null ? (
                <span className="absolute right-6 top-1/2 -translate-y-1/2 -rotate-3 rounded-full bg-neutral-900 px-2 py-1.5 text-base font-bold leading-[1.1] text-white">
                  -{price.discountPercent}%
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <Button
                variant="mint"
                size="sm"
                fullWidth
                icon="arrow-down"
                className="justify-start gap-2 px-6 py-3 text-base leading-[1.1] text-white"
              >
                Add to bag
              </Button>
              <Button
                variant="light"
                size="sm"
                fullWidth
                icon="none"
                className="justify-start px-6 py-3 text-base leading-[1.1]"
              >
                View details
              </Button>
            </div>
          </div>
        </div>
      </article>

      <button
        type="button"
        aria-label={`Add ${product.title} to wishlist`}
        className="card-shadow absolute right-[15px] top-[204px] z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-200 transition-colors duration-300 hover:bg-white hover:text-accents-teal"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/heart-product.svg"
          alt=""
          width={32}
          height={32}
          className="size-8 max-w-none shrink-0"
        />
      </button>
    </div>
  );
}
