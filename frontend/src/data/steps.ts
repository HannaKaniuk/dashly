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
    accent: "#2f9e6e",
    bg: "#e5f7ed",
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
    accent: "#00c3d0",
    bg: "#f7f4ef",
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
    accent: "#e08aa4",
    bg: "#fdecef",
  },
];

export const NAV_LINKS = [
  { label: "Shop", href: "#how-it-works" },
  { label: "Skincare", href: "#how-it-works" },
  { label: "Sets", href: "#how-it-works" },
  { label: "About", href: "#" },
];
