'use client';

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface UseParallaxOptions {
  intensity?: number;
  isEnabled?: boolean;
}

const SPRING_CONFIG = {
  stiffness: 120,
  damping: 20,
  mass: 0.2,
} as const;

export function useParallax({
  intensity = 30,
  isEnabled = true,
}: UseParallaxOptions = {}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!isEnabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const offsetX = (event.clientX / window.innerWidth - 0.5) * intensity;
      const offsetY = (event.clientY / window.innerHeight - 0.5) * intensity;

      rawX.set(offsetX);
      rawY.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity, isEnabled, rawX, rawY]);

  return { x, y };
}
