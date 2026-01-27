"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
}

const ITEMS = [
  "Сайты",
  "Приложения",
  "Платформы",
  "Дизайн",
  "Брендинг",
  "E-commerce",
  "SaaS",
] as const;

export function Marquee({ className }: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={cn("border-y border-border py-7", className)}>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 px-5 md:px-10">
          {ITEMS.map((label) => (
            <div
              key={label}
              className="flex items-center gap-7 whitespace-nowrap text-lg font-semibold uppercase tracking-[0.05em] md:text-2xl"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div className={cn("border-y border-border py-7 overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((label, index) => (
          <div
            key={`${label}-${index}`}
            className="flex items-center gap-7 px-7 whitespace-nowrap text-lg font-semibold uppercase tracking-[0.05em] md:text-2xl"
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent"
            />
            <span>{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
