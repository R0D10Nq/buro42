"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { EASING } from "@/lib/constants/animations";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 60,
  threshold = 0.2,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useScrollReveal({ threshold });

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: EASING.easeOut }}
    >
      {children}
    </motion.div>
  );
}
