"use client";

import { NAV_LINKS } from "@/data/steps";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

function IconButton({
  label,
  children,
  badge,
}: {
  label: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="soft-shadow group relative flex size-10 items-center justify-center rounded-full bg-white text-neutral-900 transition-colors duration-300 hover:text-accents-teal"
    >
      <span className="transition-colors duration-300 [&_svg]:size-[22px]">
        {children}
      </span>
      {badge ? (
        <span className="absolute -bottom-1 -right-2 flex size-5 items-center justify-center rounded-full bg-neutral-900 text-[14px] font-bold leading-none tracking-[-0.02em] text-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M15 15l4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M11 18s-6.5-4.1-6.5-8.2A3.7 3.7 0 0 1 11 6.6a3.7 3.7 0 0 1 6.5 3.2C17.5 13.9 11 18 11 18Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M4 5h1.4l1.2 10h9.8l1.3-7H6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="18" r="1.2" fill="currentColor" />
      <circle cx="15" cy="18" r="1.2" fill="currentColor" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M4 7h14M4 11h14M4 15h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header({ className }: Props) {
  return (
    <header
      className={cn(
        "relative z-30 flex w-full items-center justify-between",
        className,
      )}
    >
      <a
        href="#top"
        className="font-logo text-[28px] font-bold leading-none tracking-tight text-black transition-opacity hover:opacity-80 md:text-[40px]"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        LUMEA
      </a>

      <nav
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex"
        aria-label="Primary"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-base font-bold leading-[1.1] text-neutral-900 transition-colors duration-300 hover:text-accents-teal"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <span className="hidden md:inline-flex">
          <IconButton label="Search">
            <SearchIcon />
          </IconButton>
        </span>
        <span className="md:hidden">
          <IconButton label="Open menu">
            <MenuIcon />
          </IconButton>
        </span>
        <IconButton label="Wishlist">
          <HeartIcon />
        </IconButton>
        <IconButton label="Shopping bag" badge="2">
          <CartIcon />
        </IconButton>
      </div>
    </header>
  );
}
