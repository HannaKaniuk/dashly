import Image from "next/image";
import { Header } from "@/components/header/Header";
import { Button } from "@/components/ui/Button";
import { DesignFrame } from "@/components/ui/DesignFrame";
import type { AnnouncementMessage } from "@/lib/strapi";
import { AnnouncementBar } from "./AnnouncementBar";
import { MobileHeroBlurs } from "./Blurs";

type Props = {
  announcements: AnnouncementMessage[];
  onFindRoutine: () => void;
};

export function MobileHero({ announcements, onFindRoutine }: Props) {
  return (
    <div className="w-full lg:hidden">
      <DesignFrame width={375} height={807}>
        <div className="relative h-[807px] w-[375px]">
          <div className="soft-shadow relative h-[807px] w-full overflow-hidden rounded-b-[40px] bg-neutral-200">
            <MobileHeroBlurs />

            <div className="absolute left-1/2 top-[540px] z-[1] h-[218px] w-[328px] -translate-x-1/2 overflow-hidden rounded-[30px]">
              <Image
                src="/images/hero/woman.jpg"
                alt="Woman with glowing skin resting peacefully"
                fill
                priority
                sizes="328px"
                className="object-cover"
              />
            </div>

            <div className="absolute left-1/2 top-[162px] z-10 flex h-[272px] w-[319px] -translate-x-1/2 flex-col items-center gap-[25px]">
              <div className="flex w-full flex-col gap-[15px]">
                <h1 className="w-full text-center text-[40px] font-bold leading-[0.9] tracking-[-0.8px] text-neutral-900">
                  Skincare made{" "}
                  <span className="block font-extrabold text-accents-teal">
                    simple
                  </span>
                </h1>
                <p className="mx-auto w-[231px] text-center text-[18px] font-bold leading-none text-black">
                  Thoughtful formulas for healthy, glowing skin
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="whitespace-nowrap text-[14px] font-bold leading-none tracking-[-0.28px] text-black">
                  Not sure what your skin needs?
                </p>
                <Button
                  icon="arrow-down"
                  className="!font-medium rounded-full px-8 py-4 text-[18px] leading-[1.2]"
                  onClick={onFindRoutine}
                >
                  Find your routine
                </Button>
              </div>
            </div>

            <div
              className="pointer-events-none absolute left-1/2 top-[calc(50%+55.02px)] h-[76px] w-[258px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white"
              aria-hidden
            />
            <div className="soft-shadow absolute left-1/2 top-[calc(50%+55.02px)] z-10 flex w-[245px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white p-4">
              <p className="whitespace-nowrap text-center text-base font-bold leading-[1.1] text-neutral-800">
                Dermatologist-inspired care
              </p>
            </div>
          </div>

          <div className="absolute left-1/2 top-[26px] z-30 flex w-full -translate-x-1/2 flex-col items-center gap-2">
            <AnnouncementBar
              messages={announcements}
              className="!w-[354px] !max-w-[354px] [&_p]:!font-normal"
            />
            <Header mobileOnlyIcons className="!w-[347px]" />
          </div>
        </div>
      </DesignFrame>
    </div>
  );
}
