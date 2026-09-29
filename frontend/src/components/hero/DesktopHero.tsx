import Image from "next/image";
import { Header } from "@/components/header/Header";
import { Button } from "@/components/ui/Button";
import { DesignFrame } from "@/components/ui/DesignFrame";
import type { AnnouncementMessage } from "@/lib/strapi";
import { AnnouncementBar } from "./AnnouncementBar";
import { HeroBlurs } from "./Blurs";

type Props = {
  announcements: AnnouncementMessage[];
  onFindRoutine: () => void;
};

export function DesktopHero({ announcements, onFindRoutine }: Props) {
  return (
    <div className="hidden w-full lg:block">
      <DesignFrame width={1440} height={936}>
        <div className="relative h-[936px] w-[1440px] overflow-hidden bg-[#fdfdfd]">
          <HeroBlurs />

          <div className="absolute left-1/2 top-[44px] z-30 flex w-[1280px] -translate-x-1/2 flex-col items-center gap-3">
            <AnnouncementBar messages={announcements} />
            <Header className="w-full" />
          </div>

          <h1 className="contents">
            <span className="absolute left-[100px] top-[186px] whitespace-nowrap text-[125px] font-bold leading-[0.8] tracking-[-2.5px] text-neutral-900">
              Skincare made{" "}
            </span>
            <span className="absolute left-[936px] top-[280px] whitespace-nowrap text-[125px] font-bold leading-[0.8] tracking-[-2.5px] text-accents-cyan">
              simple
            </span>
          </h1>

          <p className="absolute left-[110px] top-[321px] w-[391px] text-[28px] font-bold leading-none text-accents-teal">
            Thoughtful formulas for healthy, glowing skin
          </p>

          <div className="absolute left-[100px] top-[498px] flex flex-col items-center gap-2">
            <p className="text-lg font-bold leading-[1.3] text-black">
              Not sure what your skin needs?
            </p>
            <Button size="lg" onClick={onFindRoutine}>
              Find your routine
            </Button>
          </div>

          <div className="absolute left-[486px] top-[438px] h-[374.443px] w-[562px] overflow-hidden rounded-[30px]">
            <Image
              src="/images/hero/woman.jpg"
              alt="Woman with glowing skin resting peacefully"
              fill
              priority
              sizes="562px"
              className="object-cover"
            />
          </div>

          <div className="absolute left-[1127px] top-[468px] h-[129px] w-[184px] overflow-hidden rounded-[20px] bg-white">
            <div className="absolute left-[-18px] top-[-73px] h-[275px] w-[220px]">
              <Image
                src="/images/hero/product-thumb.jpg"
                alt=""
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-[911px] top-[830px] h-[76px] w-[356px] rounded-xl border border-white"
            aria-hidden
          />

          <div className="absolute left-[922px] top-[840px] z-10 flex w-[331px] items-center justify-center rounded-xl bg-white p-5">
            <p className="w-[237px] text-center text-base font-bold leading-[1.1] text-neutral-800">
              Dermatologist-inspired care
            </p>
          </div>

          <aside className="soft-shadow absolute right-[100px] top-[585.5px] z-20 flex h-[201px] w-[246px] flex-col gap-4 rounded-[32px] bg-white px-5 pb-3 pt-[25px]">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold leading-none text-[#2b2b2b]">
                LUMEA essentials
              </h2>
              <p className="w-[206px] text-base font-medium leading-[1.16] text-black">
                Simple formulas. Thoughtful ingredients. Everyday results.
              </p>
              <Button
                variant="light"
                icon="arrow-up-right"
                fullWidth
                className="rounded-full px-8 py-4 text-lg leading-[1.2]"
                onClick={onFindRoutine}
              >
                Shop now
              </Button>
            </div>
          </aside>
        </div>
      </DesignFrame>
    </div>
  );
}
