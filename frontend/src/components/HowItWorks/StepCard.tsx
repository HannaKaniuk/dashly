"use client";

import Image from "next/image";
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

/**
 * Desktop step card — Figma 50:3740 / 50:3752 / 50:3765 / 50:3778 (1440)
 */
export function StepCard({
  step,
  index,
  isCovered,
  coverDepth,
  onSelect,
  onShop,
  compactPadding,
}: Props) {
  const pad = Math.max(28, 40 - compactPadding);

  return (
    <article
      id={`step-${step.id}`}
      className={cn(
        "step-card-shadow relative w-full overflow-hidden rounded-[32px] border border-solid transition-[transform,filter,padding] duration-300 ease-out",
        isCovered && "cursor-pointer",
      )}
      style={{
        background: step.bg,
        borderColor: step.border ?? "#f3f5f5",
        zIndex: index + 1,
        padding: `${pad}px`,
        transform: isCovered
          ? `translateY(${-6 * coverDepth}px) scale(${1 - Math.min(coverDepth, 3) * 0.012})`
          : "translateY(0) scale(1)",
        filter: isCovered ? "brightness(0.97)" : "brightness(1)",
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
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2.5">
              <div className="relative h-[42px] w-[85px] shrink-0 overflow-hidden">
                <span className="absolute left-1/2 top-[29px] -translate-x-1/2 -translate-y-1/2 text-center text-[80px] font-bold leading-none text-neutral-600">
                  {step.number}
                </span>
              </div>
              <h3 className="min-w-0 flex-1 text-[50px] font-bold leading-none text-brand-500">
                {step.title}
              </h3>
            </div>
            <p className="font-caveat text-[32px] font-bold leading-none text-neutral-500">
              {step.tagline}
            </p>
          </div>

          <p
            className="max-w-[405px] text-lg font-bold leading-[1.3]"
            style={{ color: step.descColor ?? "#858585" }}
          >
            {step.description}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onShop();
          }}
          className="cta-underline group inline-flex w-fit items-end gap-2 pb-1 text-2xl font-bold leading-none text-neutral-900"
        >
          {step.cta}
          <svg
            viewBox="0 0 22 22"
            className="mb-0.5 size-[22px] shrink-0 transition-transform duration-[400ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 16L16 6M16 6H8M16 6V14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative mt-1 aspect-[320/213] w-full max-w-[390px] overflow-hidden rounded-[30px]">
          <Image
            src={step.image}
            alt={step.imageAlt}
            fill
            sizes="390px"
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}
