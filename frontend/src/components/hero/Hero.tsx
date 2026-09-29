"use client";

import Image from "next/image";
import type { AnnouncementMessage } from "@/lib/strapi";
import { Header } from "@/components/header/Header";
import { Button } from "@/components/ui/Button";
import { Asset } from "@/components/ui/Asset";
import { AnnouncementBar } from "./AnnouncementBar";
import { HeroBlurs } from "./Blurs";

type Props = {
  announcements: AnnouncementMessage[];
};

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
      <div className="hero-canvas">
        <HeroBlurs />

        <div className="hero-top">
          <AnnouncementBar
            messages={announcements}
            className="hero-announce [&_p]:font-normal"
          />
          <Header />
        </div>

        <h1 className="contents">
          <span className="hero-made">Skincare made </span>
          <span className="hero-simple">simple</span>
        </h1>

        <p className="hero-sub">
          Thoughtful formulas for healthy, glowing skin
        </p>

        <div className="hero-cta">
          <p className="hero-cta-label">Not sure what your skin needs?</p>
          <Button
            icon="none"
            onClick={scrollToHowItWorks}
            className="hero-cta-btn rounded-full leading-[1.2]"
          >
            Find your routine
            <Asset
              src="/icons/arrow-down.svg"
              width={20}
              height={20}
              className="hero-cta-icon-down shrink-0"
            />
            <svg
              className="hero-cta-icon-up shrink-0"
              viewBox="0 0 22 22"
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
          </Button>
        </div>

        <div className="hero-photo">
          <Image
            src="/images/hero/woman.jpg"
            alt="Woman with glowing skin resting peacefully"
            fill
            priority
            sizes="(min-width: 1024px) 39vw, 87vw"
            className="object-cover"
          />
        </div>

        <div className="hero-trust-ring" aria-hidden />
        <div className="hero-trust">
          <p>Dermatologist-inspired care</p>
        </div>

        <div className="hero-thumb" aria-hidden>
          <div className="absolute left-[-9.89%] top-[-56.78%] h-[213.55%] w-[119.78%]">
            <Image
              src="/images/hero/product-thumb.jpg"
              alt=""
              fill
              sizes="184px"
              className="object-cover"
            />
          </div>
        </div>

        <aside className="hero-essentials">
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <h2 className="text-[clamp(14px,1.67cqi,24px)] font-bold leading-none text-[#2b2b2b]">
              LUMEA essentials
            </h2>
            <p className="w-[84%] text-[clamp(12px,1.11cqi,16px)] font-medium leading-[1.16] text-black">
              Simple formulas. Thoughtful ingredients. Everyday results.
            </p>
            <Button
              variant="light"
              icon="arrow-up-right"
              fullWidth
              className="mt-auto rounded-full px-8 py-4 text-[clamp(14px,1.25cqi,18px)] leading-[1.2]"
              onClick={scrollToHowItWorks}
            >
              Shop now
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
