"use client";

import type { AnnouncementMessage } from "@/lib/strapi";
import { DesktopHero } from "./DesktopHero";
import { MobileHero } from "./MobileHero";

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
      <DesktopHero
        announcements={announcements}
        onFindRoutine={scrollToHowItWorks}
      />
      <MobileHero
        announcements={announcements}
        onFindRoutine={scrollToHowItWorks}
      />
    </section>
  );
}
