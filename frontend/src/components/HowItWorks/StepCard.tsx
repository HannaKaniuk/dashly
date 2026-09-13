"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import type { StepDef } from "@/data/steps";
import { cn } from "@/lib/cn";

type Props = {
  step: StepDef;
  index: number;
  isCovered: boolean;
  coverDepth: number;
  onSelect: () => void;
  onShop: () => void;
  compactPadding: number;
};

export function StepCard({
  step,
  index,
  isCovered,
  coverDepth,
  onSelect,
  onShop,
  compactPadding,
}: Props) {
  const pad = Math.max(20, 40 - compactPadding);

  return (
    <article
      id={`step-${step.id}`}
      className={cn(
        "relative w-full overflow-hidden rounded-[32px] shadow-[0_8px_24px_rgba(156,182,186,0.12)] transition-[transform,box-shadow,filter,padding] duration-300 ease-out md:rounded-[40px]",
        isCovered && "cursor-pointer",
      )}
      style={{
        background: step.bg,
        zIndex: index + 1,
        padding: `${pad}px`,
        transform: isCovered
          ? `translateY(${-6 * coverDepth}px) scale(${1 - Math.min(coverDepth, 3) * 0.012})`
          : "translateY(0) scale(1)",
        filter: isCovered ? "brightness(0.97)" : "brightness(1)",
        boxShadow: isCovered
          ? "0 12px 32px rgba(33, 39, 33, 0.12)"
          : "0 8px 24px rgba(156,182,186,0.12)",
      }}
      onClick={() => {
        if (isCovered) onSelect();
      }}
      onKeyDown={(e) => {
        if (isCovered && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect();
        }
      }}
      role={isCovered ? "button" : undefined}
      tabIndex={isCovered ? 0 : undefined}
      aria-label={
        isCovered ? `Show step ${step.number} ${step.title}` : undefined
      }
    >
      <div className="flex flex-col gap-3 md:gap-5">
        <div>
          <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
            <span
              className="text-[36px] font-bold leading-none tracking-tight md:text-[50px]"
              style={{ color: step.accent }}
            >
              {step.number}
            </span>
            <h3
              className="text-[32px] font-bold leading-none md:text-[50px]"
              style={{ color: step.accent }}
            >
              {step.title}
            </h3>
          </div>
          <p className="mt-2 text-lg font-bold leading-tight text-neutral-900 md:text-[28px] md:leading-8">
            {step.tagline}
          </p>
        </div>

        <p className="max-w-[320px] text-[15px] font-medium leading-snug text-neutral-900 md:text-lg">
          {step.description}
        </p>

        <Button
          variant="ghost"
          size="link"
          className="w-fit"
          onClick={(e) => {
            e.stopPropagation();
            onShop();
          }}
        >
          {step.cta}
        </Button>

        <div className="relative mt-1 aspect-[320/160] w-full max-w-[390px] overflow-hidden rounded-[100px] md:mt-2 md:aspect-[320/213] md:rounded-[24px]">
          <Image
            src={step.image}
            alt={step.imageAlt}
            fill
            sizes="(max-width: 768px) 90vw, 390px"
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}
