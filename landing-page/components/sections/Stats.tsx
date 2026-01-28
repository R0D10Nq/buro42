"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  label: string;
}

interface StatsProps {
  className?: string;
}

const STATS: readonly StatItem[] = [
  { value: 127, label: "Проектов завершено" },
  { value: 8, label: "Лет на рынке" },
  { value: 24, label: "Человек в команде" },
  { value: 15, label: "Стран с клиентами" },
] as const;

const COUNTER_DURATION = 2000;
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export function Stats({ className }: StatsProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
  const [values, setValues] = useState(() => STATS.map(() => 0));

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (shouldReduceMotion) {
      setValues(STATS.map((stat) => stat.value));
      return;
    }

    const start = performance.now();
    let rafId = 0;

    const update = (time: number) => {
      const progress = Math.min((time - start) / COUNTER_DURATION, 1);
      const easedProgress = easeOutCubic(progress);

      setValues(STATS.map((stat) => Math.round(stat.value * easedProgress)));

      if (progress < 1) {
        rafId = requestAnimationFrame(update);
      }
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [inView, shouldReduceMotion]);

  return (
    <section ref={ref} className={cn("border-b border-border py-24 md:py-28", className)}>
      <Container>
        <div className="grid grid-cols-2 gap-8 md:gap-10 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.06} y={40}>
              <div className="text-center">
                <div className="text-[clamp(3rem,6vw,5rem)] font-black leading-none tracking-[-0.03em] text-accent">
                  {values[index]}+
                </div>
                <div className="mt-4 text-sm text-muted md:text-[0.95rem]">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
