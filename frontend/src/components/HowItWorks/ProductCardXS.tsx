"use client";

import Image from "next/image";
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

/**
 * Mobile XS product card — Figma 52:4859 (160px)
 * Collapsed shop-popup state: no variation pickers.
 */
export function ProductCardXS({ product, className }: Props) {
  const price = resolvePrice(product);
  const image = mediaUrl(product.image);
  const badges = (product.badges ?? []).filter(Boolean);

  return (
    <div className={cn("relative w-[160px] shrink-0", className)}>
      <article className="soft-shadow relative flex w-[160px] flex-col gap-3 overflow-hidden rounded-[12px] border border-[#f3f5f5] bg-white px-1 pb-3 pt-1">
        <div className="relative h-[150.204px] w-[149.901px] shrink-0 overflow-hidden rounded-[12px] bg-neutral-200">
          {image ? (
            <Image
              src={image}
              alt={product.image?.alternativeText || product.title}
              fill
              sizes="150px"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-2">
          <h3 className="line-clamp-2 overflow-hidden text-ellipsis text-base font-medium leading-[1.2] text-neutral-900">
            {product.title}
            {product.volume ? (
              <>
                <br />
                {product.volume}
              </>
            ) : null}
          </h3>

          <div className="flex flex-col gap-3">
            <div className="relative flex flex-col items-start justify-center gap-1 rounded-[12px] py-1">
              <p className="flex items-center gap-0.5 text-base font-medium leading-[1.2] text-neutral-900">
                <span>Price</span>
                <span>{formatGBP(price.current)}</span>
              </p>
              {price.hasDiscount && price.discountPercent != null ? (
                <span className="absolute right-0 top-[calc(50%+1.94px)] -translate-y-1/2 -rotate-3 rounded-full bg-neutral-900 px-2 py-1 text-base font-medium leading-[1.2] text-white">
                  -{price.discountPercent}%
                </span>
              ) : null}
            </div>

            <div className="flex flex-col items-start justify-end gap-3">
              <button
                type="button"
                className="cta-underline flex h-[15px] items-end justify-center pb-px text-sm font-normal leading-[1.2] tracking-[-0.28px] text-neutral-900"
              >
                View details
              </button>
              <button
                type="button"
                className="soft-shadow group/cta relative flex w-full items-center justify-center gap-2 self-stretch overflow-hidden whitespace-nowrap rounded-[100px] bg-brand-500 px-3 py-3 text-base font-medium leading-[1.2] text-white transition-colors duration-[400ms] ease-in-out"
              >
                <span className="cta-rings cta-rings--dark" aria-hidden>
                  <span className="cta-ring cta-ring--1" />
                  <span className="cta-ring cta-ring--2" />
                  <span className="cta-ring cta-ring--3" />
                  <span className="cta-ring cta-ring--4" />
                </span>
                <span className="relative z-10 inline-flex shrink-0 items-center gap-2 whitespace-nowrap">
                  Add to bag
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/mobile/arrow-down-white.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="size-[22px] shrink-0"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {badges.length > 0 ? (
          <div className="absolute left-[7px] top-[7px] z-10 flex flex-wrap gap-1">
            {badges.map((badge) => (
              <span
                key={badge}
                className="soft-shadow rounded-lg bg-neutral-900 px-2 py-1 text-base font-normal leading-[1.2] text-white"
              >
                {badge}
              </span>
            ))}
          </div>
        ) : null}
      </article>

      {/* Heart — Figma 52:4911, outside overflow-clip; top = pt(4)+img(150.204)-size(32.727) */}
      <button
        type="button"
        aria-label={`Add ${product.title} to wishlist`}
        className="heart-shadow absolute right-[7.27px] top-[121.48px] z-10 flex size-[32.727px] items-center justify-center rounded-full bg-neutral-200 p-[6.875px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/mobile/heart-product.svg"
          alt=""
          width={20}
          height={20}
          className="size-[19.636px]"
        />
      </button>
    </div>
  );
}
