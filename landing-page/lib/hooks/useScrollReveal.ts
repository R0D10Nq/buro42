"use client";

import { useInView } from "react-intersection-observer";

interface UseScrollRevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.2,
    triggerOnce = true,
    rootMargin,
  } = options;

  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  return { ref, inView };
}
