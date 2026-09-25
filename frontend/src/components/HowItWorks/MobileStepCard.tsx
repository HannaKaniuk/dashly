"use client";

import type { StepDef } from "@/data/steps";
import { cn } from "@/lib/cn";

type Props = {
  step: StepDef;
  index: number;
  isCovered: boolean;
  coverDepth: number;
};

const titleSizeClass = {
  "40": "text-[40px]",
  "36": "text-[36px]",
  "50": "text-[50px]",
} as const;

export function MobileStepCard({
  step,
  index,
  isCovered,
  coverDepth,
}: Props) {
  const isProtect = index === 3;
  const isMoisturise = index === 2;
  const isCleanse = index === 0;
  const isTreat = index === 1;
  const depth = Math.min(coverDepth, 3);

  return (
    <div
      className="origin-center will-change-transform"
      style={{
        transform: isCovered
          ? `translateY(${-10 * depth}px) scale(${1 - depth * 0.025})`
          : "translateY(0) scale(1)",
        filter: isCovered ? "brightness(0.94)" : "brightness(1)",
        transition: "transform 300ms ease-out, filter 300ms ease-out",
      }}
    >
      <article
        id={`step-${step.id}`}
        className="step-card-shadow relative h-[min(420px,112vw)] min-h-[360px] w-full overflow-hidden rounded-[20px] border border-solid"
        style={{
          background: step.mobileBgCss,
          borderColor: step.mobileBorder,
          zIndex: index + 1,
        }}
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

          <span className="cta-underline inline-flex items-center gap-2 pb-px text-[18px] font-normal leading-[1.3] text-neutral-900">
            {step.cta}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/mobile/arrow-down-dark.svg"
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0"
            />
          </span>

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
      </article>
    </div>
  );
}
