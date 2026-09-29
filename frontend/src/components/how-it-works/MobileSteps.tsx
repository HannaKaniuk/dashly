import type { RefObject } from "react";
import { STEPS } from "@/data/steps";
import { Asset } from "@/components/ui/Asset";
import { MobileStepCard } from "./MobileStepCard";
import { STICKY_OFFSETS } from "./useStickySteps";

type Props = {
  stepRefs: RefObject<(HTMLDivElement | null)[]>;
  activeStep: number;
  onShop: (index: number) => void;
};

const STACK_GAP = "clamp(5.5rem, 22vh, 11rem)";

export function MobileSteps({ stepRefs, activeStep, onShop }: Props) {
  return (
    <div className="mx-auto flex w-full flex-col items-center px-3.5 pb-[35px] pt-[137px] lg:hidden">
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-3">
          <h2 className="flex items-center gap-1.5 text-[30px] font-normal leading-none text-neutral-900">
            How it
            <span className="relative inline-flex size-8 shrink-0" aria-hidden>
              <Asset
                src="/icons/mobile/star.svg"
                width={32}
                height={32}
                className="size-8"
              />
            </span>
            <span className="text-brand-500">works</span>
          </h2>
          <p className="max-w-[219px] text-center text-[18px] font-medium leading-[1.2] text-neutral-800">
            4 simple steps to healthier-looking skin
          </p>
        </div>

        <div className="relative flex w-full flex-col items-start">
          {STEPS.map((step, index) => {
            const stickyTop = STICKY_OFFSETS.mobileBase + index * STICKY_OFFSETS.mobileStep;
            const coverDepth = Math.max(0, activeStep - index);
            const isLast = index === STEPS.length - 1;
            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="sticky w-full"
                style={{
                  top: stickyTop,
                  marginBottom: STACK_GAP,
                  zIndex: index + 1,
                  paddingBottom: isLast ? 0 : "0.75rem",
                }}
              >
                <MobileStepCard
                  step={step}
                  index={index}
                  isCovered={activeStep > index}
                  coverDepth={coverDepth}
                  onShop={() => onShop(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
