"use client";

import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { CartIcon, HeartIcon, MenuIcon, SearchIcon } from "./Icons";

type Props = {
  className?: string;
};

function IconButton({
  label,
  children,
  badge,
  className,
}: {
  label: string;
  children: React.ReactNode;
  badge?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "soft-shadow group relative flex size-10 shrink-0 items-center justify-center rounded-full text-neutral-900 transition-colors duration-300 hover:text-accents-teal",
        className,
      )}
    >
      <span className="transition-colors duration-300 [&_svg]:size-[22px] [&_img]:size-[22px]">
        {children}
      </span>
      {badge ? (
        <span className="absolute -bottom-1 -right-2 flex size-5 items-center justify-center rounded-full bg-neutral-900 text-[14px] font-medium leading-none tracking-[-0.02em] text-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

export function Header({ className }: Props) {
  return (
    <header
      className={cn(
        "relative z-30 flex h-[50px] w-full items-center justify-end",
        className,
      )}
    >
      <a
        href="#top"
        className="hero-logo font-logo absolute left-0 text-[clamp(28px,2.78cqi,40px)] font-bold leading-none tracking-tight text-black transition-opacity hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        LUMEA
      </a>

      <nav
        className="hero-nav absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-10"
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

      <div className="flex items-center gap-1">
        <span className="hero-menu inline-flex">
          <IconButton label="Open menu" className="size-11 bg-neutral-400">
            <MenuIcon />
          </IconButton>
        </span>
        <span className="hero-search inline-flex">
          <IconButton label="Search" className="bg-white">
            <SearchIcon />
          </IconButton>
        </span>
        <IconButton label="Wishlist" className="bg-white">
          <HeartIcon />
        </IconButton>
        <IconButton
          label="Shopping bag"
          badge="2"
          className="size-11 bg-white"
        >
          <CartIcon />
        </IconButton>
      </div>
    </header>
  );
}
