"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "dark" | "light" | "mint" | "ghost";
type ButtonSize = "lg" | "md" | "sm" | "link";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: "arrow-up-right" | "arrow-down" | "none";
  fullWidth?: boolean;
  children?: ReactNode;
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "px-[74px] py-[30px] text-2xl tracking-[-0.02em] gap-1.5 rounded-full",
  md: "px-8 py-4 text-lg gap-1.5 rounded-full",
  sm: "px-6 py-3 text-base gap-1.5 rounded-full",
  link: "px-3 py-2 text-lg gap-1.5 rounded-full",
};

const variantClasses: Record<ButtonVariant, string> = {
  dark: "bg-neutral-900 text-white",
  light: "bg-neutral-200 text-neutral-900 hover:text-brand-900",
  /* Figma green + “black hover” overlay (1:106 → 1:136) */
  mint: "bg-brand-500 text-white",
  ghost: "bg-transparent text-neutral-900",
};

/** Concentric rings — Figma “vibrant grad” / “vibrant grad black” */
function CtaRings({ variant }: { variant: ButtonVariant }) {
  if (variant === "ghost") {
    return (
      <span className="cta-rings cta-rings--ghost" aria-hidden>
        <span className="cta-ring cta-ring--1" />
      </span>
    );
  }

  if (variant === "light") {
    return (
      <span className="cta-rings cta-rings--muted" aria-hidden>
        <span className="cta-ring cta-ring--1" />
      </span>
    );
  }

  if (variant === "mint") {
    /* vibrant grad black — e3e8e9 → 858585 → 505050 → 212721 */
    return (
      <span className="cta-rings cta-rings--dark" aria-hidden>
        <span className="cta-ring cta-ring--1" />
        <span className="cta-ring cta-ring--2" />
        <span className="cta-ring cta-ring--3" />
        <span className="cta-ring cta-ring--4" />
      </span>
    );
  }

  /* dark button — brand greens rise in (1:36 → 1:62) */
  return (
    <span className="cta-rings cta-rings--brand" aria-hidden>
      <span className="cta-ring cta-ring--1" />
      <span className="cta-ring cta-ring--2" />
      <span className="cta-ring cta-ring--3" />
      <span className="cta-ring cta-ring--4" />
    </span>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-[22px] shrink-0", className)}
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
  );
}

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M10 4v12M10 16l-4-4M10 16l4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  children,
  className,
  variant = "dark",
  size = "md",
  icon = "arrow-up-right",
  fullWidth,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "group/cta relative inline-flex items-center justify-center overflow-hidden font-bold transition-colors duration-[400ms] ease-in-out",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      <CtaRings variant={variant} />
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
        {icon === "arrow-up-right" && <ArrowUpRight />}
        {icon === "arrow-down" && <ArrowDown />}
      </span>
    </button>
  );
}
