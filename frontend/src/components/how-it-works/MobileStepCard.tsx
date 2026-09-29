"use client";

import type { StepDef } from "@/data/steps";
import { Asset } from "@/components/ui/Asset";
import { cn } from "@/lib/cn";

type Props = {
  step: StepDef;
  index: number;
  isCovered: boolean;
  coverDepth: number;
  onShop: () => void;
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
  onShop,
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
        className="mobile-step-shadow relative h-[420px] w-full overflow-hidden rounded-[20px]"
        style={{
          background: step.mobileBgCss,
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
                  <span
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 text-center text-[92px] font-medium leading-none tracking-[-2px] text-neutral-600",
                      isCleanse && "left-[calc(50%-2.5px)] top-[33px]",
                      (isTreat || isMoisturise) &&
                        "left-[calc(50%+0.5px)] top-[32.5px]",
                      isProtect && "left-1/2 top-[32.5px]",
                    )}
                  >
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
              <p
                className={cn(
                  "font-caveat text-[32px] leading-none text-neutral-500",
                  isTreat ? "font-normal" : "font-bold",
                )}
              >
                {step.tagline}
              </p>
            </div>

            <p
              className={cn(
                isProtect
                  ? "w-[320px] text-[18px] font-bold leading-[23px]"
                  : step.mobileDescSize === "16"
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
            onClick={onShop}
            aria-haspopup="dialog"
            className="inline-flex h-[23px] w-fit items-center gap-2 self-start whitespace-nowrap border-0 bg-transparent p-0 text-[18px] font-normal leading-[23px] text-neutral-900"
          >
            {isProtect ? `${step.cta} ` : step.cta}
            <Asset
              src="/icons/mobile/arrow-down-dark.svg"
              width={20}
              height={20}
              className="size-5 shrink-0"
            />
          </button>

          {isProtect ? (
            <div className="relative h-[92px] w-[186px] shrink-0 overflow-hidden rounded-[30px]">
              <Asset
                alt={step.imageAlt}
                src={step.mobileImage}
                className="pointer-events-none absolute left-0 top-[-101%] h-[302%] w-full max-w-none"
              />
            </div>
          ) : null}
        </div>

        {isCleanse ? (
          <div className="absolute bottom-0 right-0 h-[110px] w-[300px] overflow-hidden rounded-[13px]">
            <Asset
              alt={step.imageAlt}
              src={step.mobileImage}
              className="pointer-events-none absolute left-[0.02%] top-[-60.55%] h-[222.19%] w-[100%] max-w-none"
            />
          </div>
        ) : null}

        {isTreat ? (
          <div className="absolute bottom-0 right-0 h-[110px] w-[300px] overflow-hidden rounded-[18px]">
            <Asset
              alt={step.imageAlt}
              src={step.mobileImage}
              className="pointer-events-none absolute left-0 top-[-69%] h-[273%] w-full max-w-none"
            />
          </div>
        ) : null}

        {isMoisturise ? (
          <div className="absolute bottom-0 right-0 h-[210px] w-[300px] overflow-hidden">
            <div className="absolute left-[171px] top-[35px] h-[157px] w-[105px] overflow-hidden rounded-[30px]">
              <Asset
                alt={step.imageAlt}
                src={step.mobileImage}
                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[30px] object-cover"
              />
            </div>
          </div>
        ) : null}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[20px] border border-solid"
          style={{ borderColor: step.mobileBorder }}
        />
      </article>
    </div>
  );
}
