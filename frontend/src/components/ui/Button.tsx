"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Asset } from "./Asset";

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
  mint: "bg-brand-500 text-white",
  ghost: "bg-transparent text-neutral-900",
};

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
    return (
      <span className="cta-rings cta-rings--dark" aria-hidden>
        <span className="cta-ring cta-ring--1" />
        <span className="cta-ring cta-ring--2" />
        <span className="cta-ring cta-ring--3" />
        <span className="cta-ring cta-ring--4" />
      </span>
    );
  }

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

function ArrowDown() {
  return (
    <Asset src="/icons/arrow-down.svg" width={20} height={20} className="shrink-0" />
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
      <span
        className={cn(
          "relative z-10 inline-flex items-center",
          icon === "arrow-down" ? "gap-2" : "gap-1.5",
        )}
      >
        {children}
        {icon === "arrow-up-right" && <ArrowUpRight />}
        {icon === "arrow-down" && <ArrowDown />}
      </span>
    </button>
  );
}
