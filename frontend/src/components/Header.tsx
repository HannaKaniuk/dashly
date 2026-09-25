"use client";

import { NAV_LINKS } from "@/data/steps";
import { cn } from "@/lib/cn";

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
        d="M11.0009 18.5625C11.0009 18.5625 2.40715 13.75 2.40715 7.90626C2.40732 6.8734 2.76521 5.87249 3.41996 5.07368C4.07471 4.27488 4.98591 3.7275 5.99864 3.5246C7.01136 3.3217 8.06311 3.47581 8.97505 3.96072C9.887 4.44564 10.6028 5.23143 11.0009 6.1845L11.0009 6.18451C11.3989 5.23144 12.1148 4.44564 13.0267 3.96073C13.9387 3.47581 14.9904 3.3217 16.0032 3.5246C17.0159 3.7275 17.9271 4.27488 18.5818 5.07368C19.2366 5.87249 19.5945 6.8734 19.5946 7.90626C19.5946 13.75 11.0009 18.5625 11.0009 18.5625Z"
        stroke="currentColor"
        strokeWidth="0.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M16.5 15.8125H5.88627C5.72527 15.8125 5.56937 15.756 5.44576 15.6528C5.32214 15.5497 5.23866 15.4064 5.20986 15.248L2.91514 2.62702C2.88634 2.46861 2.80285 2.32533 2.67924 2.22217C2.55563 2.11901 2.39973 2.0625 2.23873 2.0625H0.6875"
        stroke="currentColor"
        strokeWidth="0.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.1875 19.25C7.13674 19.25 7.90625 18.4805 7.90625 17.5312C7.90625 16.582 7.13674 15.8125 6.1875 15.8125C5.23826 15.8125 4.46875 16.582 4.46875 17.5312C4.46875 18.4805 5.23826 19.25 6.1875 19.25Z"
        stroke="currentColor"
        strokeWidth="0.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 19.25C17.4492 19.25 18.2188 18.4805 18.2188 17.5312C18.2188 16.582 17.4492 15.8125 16.5 15.8125C15.5508 15.8125 14.7812 16.582 14.7812 17.5312C14.7812 18.4805 15.5508 19.25 16.5 19.25Z"
        stroke="currentColor"
        strokeWidth="0.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.4375 5.5H18.4262C18.5269 5.5 18.6264 5.52212 18.7176 5.5648C18.8088 5.60748 18.8895 5.66967 18.9541 5.74698C19.0186 5.8243 19.0653 5.91484 19.091 6.01221C19.1167 6.10958 19.1207 6.21141 19.1026 6.31048L17.9776 12.498C17.9488 12.6564 17.8654 12.7997 17.7417 12.9028C17.6181 13.006 17.4622 13.0625 17.3012 13.0625H4.8125"
        stroke="currentColor"
        strokeWidth="0.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M3.4375 11H18.5625"
        stroke="currentColor"
        strokeWidth="0.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.4375 5.5H18.5625"
        stroke="currentColor"
        strokeWidth="0.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.4375 16.5H18.5625"
        stroke="currentColor"
        strokeWidth="0.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
          <IconButton
            label="Open menu"
            size={44}
            className="bg-neutral-400"
          >
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
