"use client";

import Image from "next/image";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import type { AnnouncementMessage } from "@/lib/strapi";

type Props = {
  announcements: AnnouncementMessage[];
};

function HeroBlurs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Ellipse 106 — top-left cool wash */}
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
      {/* Ellipse 107 — pink/right wash */}
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
      {/* Ellipse 120 — bottom teal */}
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

function scrollToHowItWorks() {
  document
    .getElementById("how-it-works")
    ?.scrollIntoView({ behavior: "smooth" });
}

export function Hero({ announcements }: Props) {
  return (
    <section
      id="top"
      className="relative w-full max-w-[1440px]"
      aria-label="Skincare made simple"
    >
      {/* ── Desktop 1440 (pixel-perfect) ─────────────────────────── */}
      <div className="relative hidden h-[936px] w-full overflow-hidden rounded-[24px] bg-[#fdfdfd] lg:block">
        <HeroBlurs />

        {/* Header + announcement — Figma 1:9069 @ x:80 y:44 w:1280 */}
        <div className="absolute left-1/2 top-[44px] z-30 flex w-[1280px] -translate-x-1/2 flex-col items-center gap-3">
          <AnnouncementBar messages={announcements} />
          <Header className="w-full" />
        </div>

        {/* Headline — Figma 1:9057 / 1:9058 (staggered) */}
        <h1 className="contents">
          <span className="absolute left-[100px] top-[186px] whitespace-nowrap text-[125px] font-bold leading-[0.8] tracking-[-2.5px] text-neutral-900">
            Skincare made{" "}
          </span>
          <span className="absolute left-[936.36px] top-[280px] whitespace-nowrap text-[125px] font-bold leading-[0.8] tracking-[-2.5px] text-accents-cyan">
            simple
          </span>
        </h1>

        {/* Subhead — Figma 1:9063 */}
        <p className="absolute left-[110px] top-[321px] w-[391px] text-[28px] font-bold leading-none text-accents-teal">
          Thoughtful formulas for healthy, glowing skin
        </p>

        {/* CTA — Figma 1:9059 */}
        <div className="absolute left-[100px] top-[498px] flex flex-col items-center gap-2">
          <p className="text-lg font-bold leading-[1.3] text-black">
            Not sure what your skin needs?
          </p>
          <Button size="lg" onClick={scrollToHowItWorks}>
            Find your routine
          </Button>
        </div>

        {/* Main image — Figma 19:1835 */}
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

        {/* Product thumb — Figma 19:1549 (sits above essentials card) */}
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

        {/* Trust badge outline — Figma 21:2294 */}
        <div
          className="pointer-events-none absolute left-[911.05px] top-[830.58px] h-[76px] w-[356.491px] rounded-xl border border-white"
          aria-hidden
        />

        {/* Trust badge — Figma 1:9053 */}
        <div className="absolute left-[922.36px] top-[840.36px] z-10 flex w-[331px] items-center justify-center rounded-xl bg-white p-5">
          <p className="w-[236.865px] text-center text-base font-bold leading-[1.1] text-neutral-800">
            Dermatologist-inspired care
          </p>
        </div>

        {/* LUMEA essentials — Figma 1:9073 */}
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

      {/* ── Mobile / tablet ──────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-none bg-[#fdfdfd] lg:hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-10 -top-10 h-[70%] w-[80%] rounded-full bg-[radial-gradient(circle,_rgba(210,220,225,0.7)_0%,_transparent_70%)] blur-3xl" />
          <div className="absolute right-[-10%] top-[20%] h-[60%] w-[70%] rounded-full bg-[radial-gradient(circle,_rgba(230,210,220,0.55)_0%,_transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[-5%] left-[35%] h-[45%] w-[40%] rounded-full bg-[radial-gradient(circle,_rgba(200,215,220,0.5)_0%,_transparent_70%)] blur-3xl" />
        </div>

        <div className="relative z-20 mx-auto flex w-full flex-col items-center gap-3 px-3.5 pt-6">
          <AnnouncementBar
            messages={announcements}
            className="max-w-[354px]"
          />
          <Header className="w-full px-1" />
        </div>

        <div className="relative z-10 mx-auto flex w-full flex-col items-center gap-8 px-4 pb-12 pt-8 text-center">
          <div className="flex flex-col items-center">
            <h1 className="max-w-[11ch] text-[42px] font-bold leading-[0.92] tracking-[-0.02em] text-neutral-900">
              Skincare made{" "}
              <span className="text-accents-cyan">simple</span>
            </h1>

            <p className="mt-4 max-w-[18rem] text-base font-bold leading-tight text-accents-teal">
              Thoughtful formulas for healthy, glowing skin
            </p>

            <div className="mt-8 flex w-full max-w-[234px] flex-col items-center gap-2">
              <p className="text-sm font-bold leading-[1.3] text-black">
                Not sure what your skin needs?
              </p>
              <Button
                size="lg"
                className="w-full px-8 py-[18px] text-lg"
                onClick={scrollToHowItWorks}
              >
                Find your routine
              </Button>
            </div>

            <div className="soft-shadow mt-8 flex w-full max-w-[280px] items-center justify-center rounded-xl bg-white px-4 py-4">
              <p className="text-sm font-bold leading-[1.1] text-neutral-800">
                Dermatologist-inspired care
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
