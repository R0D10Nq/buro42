"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { EASING } from "@/lib/constants/animations";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const titleContainer = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? undefined
        : {
            staggerChildren: 0.1,
          },
    },
  } as const;

  const titleLine = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: shouldReduceMotion
        ? undefined
        : {
            duration: 0.9,
            ease: EASING.easeOut,
          },
    },
  } as const;

  return (
    <section className={className}>
      <Container className="flex min-h-screen flex-col justify-center pb-16 pt-28 md:pt-32">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={titleContainer}
          className="mb-10 text-[clamp(3rem,12vw,12rem)] font-black leading-[0.9] tracking-[-0.04em]"
        >
          <span className="block overflow-hidden">
            <motion.span className="block" variants={titleLine}>
              Создаём
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.span
              className="block text-transparent"
              style={{ WebkitTextStroke: "2px var(--fg)" }}
              variants={titleLine}
            >
              цифровые
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.span className="block" variants={titleLine}>
              продукты<span className="text-accent">.</span>
            </motion.span>
          </span>
        </motion.h1>

        <div className="mt-auto flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 0.6, ease: EASING.easeOut, delay: 0.25 }
            }
            className="max-w-md text-base leading-relaxed text-muted md:text-lg"
          >
            Полный цикл разработки — от идеи до запуска. Веб, мобильные приложения,
            сложные платформы и всё между ними.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 0.6, ease: EASING.easeOut, delay: 0.35 }
            }
            className="flex items-center gap-4 text-xs uppercase tracking-[0.1em] text-foreground"
          >
            <span className="relative h-px w-16 overflow-hidden bg-muted">
              {!shouldReduceMotion && (
                <motion.span
                  className="absolute left-0 top-0 h-full w-5 bg-accent"
                  animate={{ x: ["-20px", "60px", "-20px"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </span>
            <span>Скролль вниз</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
