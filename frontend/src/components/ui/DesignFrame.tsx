"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Props = {
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function DesignFrame({
  width,
  height,
  className,
  style,
  children,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      if (w <= 0) return;
      setScale(w / width);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={outerRef}
      className={cn("relative w-full", className)}
      style={style}
    >
      <div className="relative w-full" style={{ height: height * scale }}>
        <div
          className="absolute left-0 top-0"
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
