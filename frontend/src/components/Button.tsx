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
  light: "bg-neutral-200 text-neutral-900",
  mint: "bg-brand-200 text-neutral-900",
  ghost: "bg-transparent text-neutral-900",
};

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
        "group/cta relative inline-flex items-center justify-center overflow-hidden font-bold transition-colors duration-300",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "cta-gradient",
          variant === "light" && "cta-gradient--muted",
          variant === "mint" && "cta-gradient--dark",
          variant === "ghost" && "cta-gradient--ghost",
        )}
        aria-hidden
      />
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
        {icon === "arrow-up-right" && <ArrowUpRight />}
        {icon === "arrow-down" && <ArrowDown />}
      </span>
    </button>
  );
}
