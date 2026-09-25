export type StepDef = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  accent: string;
  bg: string;
  border?: string;
  descColor?: string;
  mobileImage: string;
  mobileTitleSize: "40" | "36" | "50";
  mobileTitleWeight: "normal" | "bold";
  mobileDescSize: "18" | "16";
  mobileDescColor: string;
  mobileBorder: string;
  mobileBgCss: string;
};

export const STEPS: StepDef[] = [
  {
    id: "cleanse",
    number: "01",
    title: "Cleanse",
    tagline: "Start with a fresh canvas.",
    description:
      "Gently remove makeup, SPF and daily impurities without stripping your skin.",
    cta: "Shop cleansers",
    image: "/images/steps/cleanse.jpg",
    imageAlt: "Hands cleansing skin with a cotton pad",
    accent: "#63cc96",
    bg: "#f3f5f5",
    border: "#f3f5f5",
    descColor: "#858585",
    mobileImage: "/images/steps/mobile/cleanse.png",
    mobileTitleSize: "40",
    mobileTitleWeight: "normal",
    mobileDescSize: "18",
    mobileDescColor: "#858585",
    mobileBorder: "#f3f5f5",
    mobileBgCss: "#f3f5f5",
  },
  {
    id: "treat",
    number: "02",
    title: "Treat",
    tagline: "Target what your skin needs.",
    description:
      "Serums and treatments deliver targeted ingredients to help with dryness, dullness, texture and blemishes.",
    cta: "Shop treatments",
    image: "/images/steps/treat.jpg",
    imageAlt: "Skincare bottles and serum dropper",
    accent: "#63cc96",
    bg: "linear-gradient(141.34deg, #e5f7ed 1.43%, #92dbb6 100.66%)",
    border: "#f3f5f5",
    descColor: "#858585",
    mobileImage: "/images/steps/mobile/treat.png",
    mobileTitleSize: "36",
    mobileTitleWeight: "normal",
    mobileDescSize: "16",
    mobileDescColor: "#858585",
    mobileBorder: "#f3f5f5",
    mobileBgCss:
      "linear-gradient(137.05deg, #e5f7ed 1.43%, #92dbb6 100.66%)",
  },
  {
    id: "moisturise",
    number: "03",
    title: "Moisturise",
    tagline: "Lock in lasting hydration.",
    description:
      "Moisturisers help strengthen the skin barrier, lock in hydration and leave skin soft and balanced.",
    cta: "Shop moisturisers",
    image: "/images/steps/moisturise.jpg",
    imageAlt: "Woman applying moisturiser",
    accent: "#63cc96",
    bg: "#f3f5f5",
    border: "#f3f5f5",
    descColor: "#858585",
    mobileImage: "/images/steps/mobile/moisturise.png",
    mobileTitleSize: "36",
    mobileTitleWeight: "normal",
    mobileDescSize: "18",
    mobileDescColor: "#858585",
    mobileBorder: "#e5f7ed",
    mobileBgCss: "#f3f5f5",
  },
  {
    id: "protect",
    number: "04",
    title: "Protect",
    tagline: "Your essential final step.",
    description:
      "Daily SPF helps protect your skin from UV damage and keeps it looking healthy every day.",
    cta: "Shop SPF",
    image: "/images/steps/protect.jpg",
    imageAlt: "Woman applying SPF cream",
    accent: "#63cc96",
    bg: "radial-gradient(ellipse 68% 70% at 47% 87%, rgba(254,203,228,0.55) 0%, rgba(236,163,179,0.4) 36%, rgba(217,122,129,0.18) 55%, transparent 72%), #ffffff",
    border: "#f3f5f5",
    descColor: "#565b5a",
    mobileImage: "/images/steps/mobile/protect.png",
    mobileTitleSize: "50",
    mobileTitleWeight: "bold",
    mobileDescSize: "18",
    mobileDescColor: "#565b5a",
    mobileBorder: "#f3f5f5",
    mobileBgCss: "#ffe3f1",
  },
];

export const NAV_LINKS = [
  { label: "Shop", href: "#how-it-works" },
  { label: "Skincare", href: "#how-it-works" },
  { label: "Sets", href: "#how-it-works" },
  { label: "About", href: "#" },
];
