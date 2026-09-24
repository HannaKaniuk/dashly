"use client";

import { motion } from "framer-motion";
import type { StepDef } from "@/data/steps";
import { cn } from "@/lib/cn";

type Props = {
  step: StepDef;
  index: number;
  onShop: () => void;
};

const titleSizeClass = {
  "40": "text-[40px]",
  "36": "text-[36px]",
  "50": "text-[50px]",
} as const;

/**
 * Pixel-perfect mobile step card — Figma Home Page 375px (1:11176+)
 * Tap / press: spring scale + open products overlay.
 */
export function MobileStepCard({ step, index, onShop }: Props) {
  const isProtect = index === 3;
  const isMoisturise = index === 2;
  const isCleanse = index === 0;
  const isTreat = index === 1;

  return (
    <motion.article
      id={`step-${step.id}`}
      role="button"
      tabIndex={0}
      aria-label={`${step.number} ${step.title}. ${step.cta}`}
      onClick={onShop}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onShop();
        }
      }}
      className="step-card-shadow relative h-[min(420px,112vw)] min-h-[360px] w-full cursor-pointer overflow-hidden rounded-[20px] border border-solid touch-manipulation origin-center"
      style={{
        background: step.mobileBgCss,
        borderColor: step.mobileBorder,
        zIndex: index + 1,
      }}
      initial={false}
      whileTap={{
        scale: 0.97,
        y: 4,
        transition: { type: "spring", stiffness: 420, damping: 28 },
      }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    >
      <div
        className={cn(
          "relative z-10 flex flex-col gap-8 overflow-clip rounded-[20px]",
          isCleanse && "px-3.5 pb-[100px] pt-5",
          isTreat && "p-2",
          isMoisturise && "h-full px-2 pb-5 pt-2",
          isProtect && "px-2 pb-40 pt-2",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-6",
            (isTreat || isMoisturise || isProtect) && "px-1.5 py-3",
          )}
        >
          <div className="flex flex-col gap-4">
            <div
              className={cn(
                "flex items-end gap-2.5",
                isCleanse ? "h-[58px]" : "",
              )}
            >
              <div className="relative h-12 w-[100px] shrink-0 overflow-hidden">
                <span className="absolute left-1/2 top-[32.5px] -translate-x-1/2 -translate-y-1/2 text-center text-[91.429px] font-medium leading-none tracking-[-1.8286px] text-neutral-600">
                  {step.number}
                </span>
              </div>
              <h3
                className={cn(
                  "min-w-0 flex-1 text-brand-500",
                  titleSizeClass[step.mobileTitleSize],
                  step.mobileTitleWeight === "bold"
                    ? "font-bold leading-none"
                    : "font-normal leading-[0.8]",
                )}
              >
                {step.title}
              </h3>
            </div>
            <p className="font-caveat text-[32px] font-bold leading-none text-neutral-500">
              {step.tagline}
            </p>
          </div>

          <p
            className={cn(
              step.mobileDescSize === "16"
                ? "text-base font-normal leading-[1.1]"
                : "text-lg font-bold leading-[1.3]",
            )}
            style={{ color: step.mobileDescColor }}
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
          className="cta-underline inline-flex items-center gap-2 pb-px text-[18px] font-normal leading-[1.3] text-neutral-900"
        >
          {step.cta}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/mobile/arrow-down-dark.svg"
            alt=""
            width={20}
            height={20}
            className="size-5 shrink-0"
          />
        </button>

        {/* Protect image — Figma 52:4518 crop */}
        {isProtect ? (
          <div className="relative h-[92.041px] w-[185.612px] overflow-hidden rounded-[30px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={step.imageAlt}
              src={step.mobileImage}
              className="pointer-events-none absolute left-0 top-[-101.23%] h-[302.46%] w-full max-w-none"
            />
          </div>
        ) : null}
      </div>

      {/* Cleanse image — Figma 1:11187 */}
      {isCleanse ? (
        <div className="absolute bottom-0 right-0 h-[110px] w-[300px] overflow-hidden rounded-[13.333px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={step.imageAlt}
            src={step.mobileImage}
            className="pointer-events-none absolute left-[0.02%] top-[-60.55%] h-[222.19%] w-[99.98%] max-w-none"
          />
        </div>
      ) : null}

      {/* Treat image — Figma 1:11200 */}
      {isTreat ? (
        <div className="absolute bottom-[-1px] right-[-1px] h-[110px] w-[300px] overflow-hidden rounded-[17.712px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={step.imageAlt}
            src={step.mobileImage}
            className="pointer-events-none absolute left-0 top-[-69.34%] h-[272.73%] w-full max-w-none"
          />
        </div>
      ) : null}

      {/* Moisturise image — Figma 52:4563 */}
      {isMoisturise ? (
        <div className="absolute bottom-[-1px] right-[-1px] h-[210px] w-[300px] overflow-hidden">
          <div className="absolute left-[171.05px] top-[34.51px] h-[156.964px] w-[104.771px] overflow-hidden rounded-[30px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={step.imageAlt}
              src={step.mobileImage}
              className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[30px] object-cover"
            />
          </div>
        </div>
      ) : null}
    </motion.article>
  );
}
