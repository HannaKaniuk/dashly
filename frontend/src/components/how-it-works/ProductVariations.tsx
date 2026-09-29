"use client";

import { useState } from "react";
import Image from "next/image";
import { mediaUrl, type VariationGroup } from "@/lib/strapi";
import { cn } from "@/lib/cn";

type Props = {
  groups: VariationGroup[];
};

export function ProductVariations({ groups }: Props) {
  const [selected, setSelected] = useState<Record<number, number>>(() => {
    const init: Record<number, number> = {};
    groups.forEach((_, index) => {
      init[index] = 0;
    });
    return init;
  });

  return (
    <>
      {groups.map((group, groupIndex) => {
        const options = group.options ?? [];
        if (!options.length) return null;
        const style = group.displayStyle || "pills";

        return (
          <div
            key={`${group.label}-${groupIndex}`}
            className="flex flex-col gap-1"
          >
            <p className="text-sm font-bold leading-none tracking-[-0.28px] text-neutral-700">
              {group.label}
            </p>
            {style === "list" ? (
              <div className="flex flex-col gap-1.5">
                {options.map((option, optionIndex) => {
                  const active = selected[groupIndex] === optionIndex;
                  const optionImage = mediaUrl(option.image);
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() =>
                        setSelected((current) => ({
                          ...current,
                          [groupIndex]: optionIndex,
                        }))
                      }
                      className={cn(
                        "soft-shadow flex h-10 w-full items-center gap-2 rounded-lg border border-neutral-600 p-1.5 text-left text-sm font-bold tracking-[-0.28px] transition-colors duration-200",
                        active
                          ? "bg-neutral-400 text-neutral-900"
                          : "bg-white text-neutral-900 hover:bg-neutral-200",
                      )}
                    >
                      {optionImage ? (
                        <span className="relative size-7 shrink-0 overflow-hidden rounded">
                          <Image
                            src={optionImage}
                            alt=""
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </span>
                      ) : null}
                      <span className="min-w-0 flex-1 leading-none">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1">
                {options.map((option, optionIndex) => {
                  const active = selected[groupIndex] === optionIndex;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() =>
                        setSelected((current) => ({
                          ...current,
                          [groupIndex]: optionIndex,
                        }))
                      }
                      className={cn(
                        "relative flex h-10 items-center justify-center rounded-lg border border-neutral-600 px-3 py-2 text-sm font-bold tracking-[-0.28px] transition-colors duration-200",
                        active
                          ? "bg-neutral-400 text-brand-900"
                          : "bg-white text-neutral-900 hover:bg-neutral-200",
                      )}
                    >
                      <span className="leading-none">{option.label}</span>
                      {option.optionDiscountPercent ? (
                        <span className="absolute -right-2.5 -top-3 -rotate-3 rounded-full bg-neutral-900 p-1 text-sm font-bold leading-none tracking-[-0.28px] text-white">
                          -{option.optionDiscountPercent}%
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
    </>
  );
}
