"use client";

import { useEffect, useState } from "react";
import type { AnnouncementMessage } from "@/lib/strapi";
import { cn } from "@/lib/cn";

type Props = {
  messages: AnnouncementMessage[];
  className?: string;
};

export function AnnouncementBar({ messages, className }: Props) {
  const items =
    messages.length > 0
      ? messages
      : [
          {
            id: 0,
            documentId: "fallback",
            text: "Get 15% off with code LUMEAFIRST15",
            order: 0,
          },
        ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <div
      className={cn(
        "soft-shadow mx-auto flex h-11 w-full max-w-[458px] items-center justify-center bg-neutral-900 px-5 text-center",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="relative h-[18px] w-full overflow-hidden">
        {items.map((msg, i) => (
          <p
            key={msg.documentId}
            className={cn(
              "absolute inset-x-0 top-0 text-center text-base font-bold leading-[1.1] text-white transition-all duration-500",
              i === index
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0",
            )}
          >
            {msg.text}
          </p>
        ))}
      </div>
    </div>
  );
}
