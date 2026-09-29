"use client";

import { useEffect, useRef, useState } from "react";
import { STEPS } from "@/data/steps";

const DESKTOP_STICKY_BASE = 72;
const DESKTOP_STICKY_STEP = 16;
const MOBILE_STICKY_BASE = 16;
const MOBILE_STICKY_STEP = 20;

function stickyLayoutTop(el: HTMLElement) {
  const previous = el.style.position;
  el.style.position = "relative";
  const top = el.getBoundingClientRect().top + window.scrollY;
  el.style.position = previous;
  return top;
}

function stuckStepIndex(refs: (HTMLElement | null)[]) {
  let active = 0;
  refs.forEach((el, index) => {
    if (!el) return;
    const stick = parseFloat(getComputedStyle(el).top) || 0;
    if (el.getBoundingClientRect().top <= stick + 1) active = index;
  });
  return active;
}

export function useStickySteps() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileStepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const [shopStep, setShopStep] = useState(0);
  const scrolledStepRef = useRef(0);
  const shopPinRef = useRef<number | null>(null);
  const [compact, setCompact] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const refs = isMobile ? mobileStepRefs.current : stepRefs.current;
      const stickyBase = isMobile ? MOBILE_STICKY_BASE : DESKTOP_STICKY_BASE;
      const stickyStep = isMobile ? MOBILE_STICKY_STEP : DESKTOP_STICKY_STEP;
      const anchor = stickyBase + stickyStep + 8;
      const nearest = stuckStepIndex(refs);
      if (nearest >= 0) {
        setActiveStep(nearest);
        if (shopPinRef.current === null) {
          if (nearest !== scrolledStepRef.current) {
            scrolledStepRef.current = nearest;
            setShopStep(nearest);
          }
        } else if (nearest === shopPinRef.current) {
          shopPinRef.current = null;
          scrolledStepRef.current = nearest;
        }
      }

      if (!isMobile) {
        const first = stepRefs.current[0];
        const last = stepRefs.current[STEPS.length - 1];
        if (first && last) {
          const span = Math.max(1, last.offsetTop - first.offsetTop);
          const progress = Math.min(
            1,
            Math.max(0, (anchor - first.getBoundingClientRect().top) / span),
          );
          setCompact(progress * 18);
        }
      }
    };

    const onScrollEnd = () => {
      shopPinRef.current = null;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToStep = (index: number) => {
    const el = stepRefs.current[index];
    if (!el) return;
    const stick = parseFloat(getComputedStyle(el).top) || 0;
    const top = Math.max(0, stickyLayoutTop(el) - stick);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const shopFromStep = (index: number) => {
    shopPinRef.current = index;
    scrolledStepRef.current = index;
    setShopStep(index);
    scrollToStep(index);
  };

  return {
    stepRefs,
    mobileStepRefs,
    activeStep,
    shopStep,
    setShopStep,
    compact,
    scrollToStep,
    shopFromStep,
  };
}

export const STICKY_OFFSETS = {
  desktopBase: DESKTOP_STICKY_BASE,
  desktopStep: DESKTOP_STICKY_STEP,
  mobileBase: MOBILE_STICKY_BASE,
  mobileStep: MOBILE_STICKY_STEP,
};
