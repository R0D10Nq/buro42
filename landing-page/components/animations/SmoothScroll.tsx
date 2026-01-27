"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { useReducedMotion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId: number | null = null;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return <>{children}</>;
}
