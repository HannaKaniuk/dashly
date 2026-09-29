"use client";

import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { CartIcon, HeartIcon, MenuIcon, SearchIcon } from "./Icons";

type Props = {
  className?: string;
  mobileOnlyIcons?: boolean;
};

function IconButton({
  label,
  children,
  badge,
  className,
  size = 40,
}: {
  label: string;
  children: React.ReactNode;
  badge?: string;
  className?: string;
  size?: 40 | 44;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "soft-shadow group relative flex items-center justify-center rounded-full text-neutral-900 transition-colors duration-300 hover:text-accents-teal",
        size === 44 ? "size-11" : "size-10",
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

export function Header({ className, mobileOnlyIcons }: Props) {
  if (mobileOnlyIcons) {
    return (
      <header
        className={cn(
          "relative z-30 flex h-[50px] w-full items-center justify-end",
          className,
        )}
      >
        <div className="flex items-center gap-1">
          <IconButton label="Open menu" size={44} className="bg-neutral-400">
            <MenuIcon />
          </IconButton>
          <IconButton label="Wishlist" size={40} className="bg-white">
            <HeartIcon />
          </IconButton>
          <IconButton
            label="Shopping bag"
            badge="2"
            size={44}
            className="bg-white"
          >
            <CartIcon />
          </IconButton>
        </div>
      </header>
    );
  }

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
          <IconButton label="Search" className="bg-white">
            <SearchIcon />
          </IconButton>
        </span>
        <span className="md:hidden">
          <IconButton label="Open menu" className="bg-white">
            <MenuIcon />
          </IconButton>
        </span>
        <IconButton label="Wishlist" className="bg-white">
          <HeartIcon />
        </IconButton>
        <IconButton label="Shopping bag" badge="2" className="bg-white">
          <CartIcon />
        </IconButton>
      </div>
    </header>
  );
}
