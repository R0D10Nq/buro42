"use client";

import { useCallback, useRef, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface CTAProps {
  className?: string;
}

const TITLE_LINES = [
  ["Есть", "проект?"],
  ["Давайте", "обсудим."],
] as const;

export function CTA({ className }: CTAProps) {
  const shouldReduceMotion = useReducedMotion();
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (event.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.3;

      setOffset({ x, y });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const buttonClassName = cn(
    "relative inline-flex items-center gap-5 overflow-hidden rounded-full bg-accent px-8 py-4",
    "text-base font-semibold text-background transition-transform duration-300 hover:scale-105",
    "before:absolute before:inset-0 before:-translate-x-full before:bg-foreground",
    "before:transition-transform before:duration-300 hover:before:translate-x-0",
  );

  return (
    <section id="contact" className={cn("py-32 text-center md:py-48", className)}>
      <Container>
        <ScrollReveal className="mb-12">
          <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-none tracking-[-0.04em]">
            {TITLE_LINES.map((line, lineIndex) => (
              <span
                key={`cta-line-${lineIndex}`}
                className="mb-2 flex flex-wrap justify-center gap-x-3"
              >
                {line.map((word) => (
                  <span
                    key={word}
                    className={cn(
                      "inline-block transition-[color,transform] duration-300",
                      "hover:-translate-y-2 hover:text-accent",
                    )}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {shouldReduceMotion ? (
            <a href="mailto:hello@buro.dev" className={buttonClassName} data-hover>
              <span className="relative z-10">Написать нам</span>
              <span className="relative z-10">→</span>
            </a>
          ) : (
            <motion.a
              ref={buttonRef}
              href="mailto:hello@buro.dev"
              className={buttonClassName}
              data-hover
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: offset.x, y: offset.y }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              <span className="relative z-10">Написать нам</span>
              <span className="relative z-10">→</span>
            </motion.a>
          )}
        </ScrollReveal>
      </Container>
    </section>
  );
}
