"use client";

import Image from "next/image";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import type { AnnouncementMessage } from "@/lib/strapi";

type Props = {
  announcements: AnnouncementMessage[];
};

export function Hero({ announcements }: Props) {
  return (
    <section
      id="top"
      className="relative w-full max-w-[1440px] px-0 md:px-5"
      aria-labelledby="hero-heading"
    >
      <div className="relative overflow-hidden rounded-none bg-[#fdfdfd] md:rounded-[24px]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-10 -top-10 h-[70%] w-[80%] rounded-full bg-[radial-gradient(circle,_rgba(210,220,225,0.7)_0%,_transparent_70%)] blur-3xl" />
          <div className="absolute right-[-10%] top-[20%] h-[60%] w-[70%] rounded-full bg-[radial-gradient(circle,_rgba(230,210,220,0.55)_0%,_transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[-5%] left-[35%] h-[45%] w-[40%] rounded-full bg-[radial-gradient(circle,_rgba(200,215,220,0.5)_0%,_transparent_70%)] blur-3xl" />
        </div>

        <div className="relative z-20 mx-auto flex w-full max-w-[1280px] flex-col items-center gap-3 px-3.5 pt-6 md:px-0 md:pt-11">
          <AnnouncementBar
            messages={announcements}
            className="max-w-[354px] md:max-w-[458px]"
          />
          <Header className="w-full px-1 md:px-0" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-8 px-4 pb-12 pt-8 md:min-h-[760px] md:grid-cols-[1fr_1.1fr] md:gap-6 md:px-10 md:pb-16 md:pt-12 lg:px-[100px]">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1
              id="hero-heading"
              className="max-w-[11ch] text-[42px] font-bold leading-[0.92] tracking-[-0.02em] text-neutral-900 md:max-w-none md:text-[72px] md:leading-[0.85] lg:text-[125px] lg:leading-[0.8] lg:tracking-[-2.5px]"
            >
              Skincare made{" "}
              <span className="text-accents-cyan">simple</span>
            </h1>

            <p className="mt-4 max-w-[18rem] text-base font-bold leading-tight text-accents-teal md:mt-6 md:max-w-[24rem] md:text-[28px] md:leading-none">
              Thoughtful formulas for healthy, glowing skin
            </p>

            <div className="mt-8 flex w-full max-w-[234px] flex-col items-center gap-2 md:mt-14 md:max-w-none md:items-start">
              <p className="text-sm font-bold leading-[1.3] text-black md:text-lg">
                Not sure what your skin needs?
              </p>
              <Button
                size="lg"
                className="w-full px-8 py-[18px] text-lg md:w-auto md:px-[74px] md:py-[30px] md:text-2xl"
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Find your routine
              </Button>
            </div>

            {/* Mobile trust badge under CTA (375px Figma) */}
            <div className="soft-shadow mt-8 flex w-full max-w-[280px] items-center justify-center rounded-xl bg-white px-4 py-4 md:hidden">
              <p className="text-sm font-bold leading-[1.1] text-neutral-800">
                Dermatologist-inspired care
              </p>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[560px] md:mx-0 md:block md:max-w-none">
            <div className="relative aspect-[561/374] w-full overflow-hidden rounded-[30px]">
              <Image
                src="/images/hero/woman.jpg"
                alt="Woman with glowing skin resting peacefully"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 560px"
                className="object-cover"
              />
            </div>

            <aside className="soft-shadow absolute -right-2 bottom-[-28px] hidden w-[220px] flex-col gap-3 rounded-[32px] bg-white px-5 pb-3 pt-6 lg:flex xl:right-0 xl:w-[246px]">
              <div className="relative -mt-20 mb-1 ml-auto h-[110px] w-[90px] overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero/product-thumb.jpg"
                  alt=""
                  fill
                  sizes="90px"
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold leading-none text-[#2b2b2b]">
                LUMEA essentials
              </h2>
              <p className="text-base font-medium leading-[1.16] text-black">
                Simple formulas. Thoughtful ingredients. Everyday results.
              </p>
              <Button
                variant="light"
                size="sm"
                fullWidth
                className="mt-1"
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop now
              </Button>
            </aside>

            <div className="absolute -bottom-3 right-8 flex w-[280px] items-center justify-center rounded-xl bg-white p-4 text-center lg:right-[18%] lg:w-[331px]">
              <p className="text-base font-bold leading-[1.1] text-neutral-800">
                Dermatologist-inspired care
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
