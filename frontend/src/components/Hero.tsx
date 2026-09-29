"use client";

import Image from "next/image";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { DesignFrame } from "@/components/DesignFrame";
import type { AnnouncementMessage } from "@/lib/strapi";

type Props = {
  announcements: AnnouncementMessage[];
};

function HeroBlurs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute left-0 top-0 h-[734.942px] w-[1194.888px]">
        <div className="absolute inset-[-27.21%_-16.74%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/icons/blur-ellipse-106.svg"
            className="block size-full max-w-none"
          />
        </div>
      </div>
      <div className="absolute left-[401.98px] top-[225px] flex h-[711.004px] w-[1038.024px] items-center justify-center">
        <div className="flex-none rotate-[-177.74deg] skew-x-[-1.95deg]">
          <div className="relative h-[673.794px] w-[989.327px]">
            <div className="absolute inset-[-29.68%_-20.22%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/icons/blur-ellipse-107.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[604.14px] top-[522.23px] h-[379.26px] w-[432.677px]">
        <div className="absolute inset-[-79.1%_-69.34%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/icons/blur-ellipse-120.svg"
            className="block size-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function MobileHeroBlurs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute left-[0.5px] top-0 h-[840px] w-[388px]">
        <div className="absolute inset-[-23.81%_-131.19%_-42.5%_-51.55%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/icons/mobile/blur-bg.svg"
            className="block size-full max-w-none"
          />
        </div>
      </div>
      <div className="absolute left-[-8px] top-0 h-[812.198px] w-[396px]">
        <div className="absolute inset-[-24.62%_-51.05%_-33.25%_-50.51%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/icons/mobile/blur-grey.svg"
            className="block size-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function scrollToHowItWorks() {
  document
    .getElementById("how-it-works")
    ?.scrollIntoView({ behavior: "smooth" });
}

export function Hero({ announcements }: Props) {
  return (
    <section
      id="top"
      className="relative w-full"
      aria-label="Skincare made simple"
    >
      {/* Desktop artboard 1440×936 — exact at 1440, scales fluidly above/below */}
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
              <span className="absolute left-[936.36px] top-[280px] whitespace-nowrap text-[125px] font-bold leading-[0.8] tracking-[-2.5px] text-accents-cyan">
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
              <Button size="lg" onClick={scrollToHowItWorks}>
                Find your routine
              </Button>
            </div>

            <div className="absolute left-[486.37px] top-[438.43px] h-[374.443px] w-[561.596px] overflow-hidden rounded-[30px]">
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
              <div className="absolute left-[-18.2px] top-[-73.24px] h-[275.483px] w-[220.4px]">
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
              className="pointer-events-none absolute left-[911.05px] top-[830.58px] h-[76px] w-[356.491px] rounded-xl border border-white"
              aria-hidden
            />

            <div className="absolute left-[922.36px] top-[840.36px] z-10 flex w-[331px] items-center justify-center rounded-xl bg-white p-5">
              <p className="w-[236.865px] text-center text-base font-bold leading-[1.1] text-neutral-800">
                Dermatologist-inspired care
              </p>
            </div>

            <aside className="soft-shadow absolute right-[100px] top-[585.5px] z-20 flex h-[201px] w-[246px] flex-col gap-4 rounded-[32px] bg-white px-5 pb-3 pt-[25px]">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold leading-none text-[#2b2b2b]">
                  LUMEA essentials
                </h2>
                <p className="w-[205.711px] text-base font-medium leading-[1.16] text-black">
                  Simple formulas. Thoughtful ingredients. Everyday results.
                </p>
                <Button
                  variant="light"
                  icon="arrow-up-right"
                  fullWidth
                  className="rounded-full px-8 py-4 text-lg leading-[1.2]"
                  onClick={scrollToHowItWorks}
                >
                  Shop now
                </Button>
              </div>
            </aside>
          </div>
        </DesignFrame>
      </div>

      {/* Mobile artboard 375×807 — exact at 375, fluid below lg */}
      <div className="w-full lg:hidden">
        <DesignFrame width={375} height={807}>
          <div className="relative h-[807px] w-[375px]">
            <div className="soft-shadow relative h-[807px] w-full overflow-hidden rounded-b-[40px] bg-neutral-200">
              <MobileHeroBlurs />

              <div className="absolute left-1/2 top-[540.18px] z-[1] h-[218.411px] w-[327.576px] -translate-x-1/2 overflow-hidden rounded-[30px]">
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
                    onClick={scrollToHowItWorks}
                  >
                    Find your routine
                  </Button>
                </div>
              </div>

              <div
                className="pointer-events-none absolute left-1/2 top-[calc(50%+55.02px)] h-[76px] w-[257.86px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white"
                aria-hidden
              />
              <div className="soft-shadow absolute left-1/2 top-[calc(50%+55.02px)] z-10 flex w-[244.551px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white p-4">
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
    </section>
  );
}
