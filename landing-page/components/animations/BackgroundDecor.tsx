"use client";

import { useEffect, useState } from "react";

import { motion, useReducedMotion, useTransform } from "framer-motion";

import { useParallax } from "@/lib/hooks/useParallax";

export function BackgroundDecor() {
  const shouldReduceMotion = useReducedMotion();
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => setIsPointerFine(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  const { x, y } = useParallax({
    intensity: 30,
    isEnabled: isPointerFine && !shouldReduceMotion,
  });

  const shapeOneX = useTransform(x, (value) => value * 0.5);
  const shapeOneY = useTransform(y, (value) => value * 0.5);
  const shapeTwoX = useTransform(x, (value) => value * 1);
  const shapeTwoY = useTransform(y, (value) => value * 1);
  const shapeThreeX = useTransform(x, (value) => value * 1.5);
  const shapeThreeY = useTransform(y, (value) => value * 1.5);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="floating-shapes" aria-hidden="true">
        <motion.span className="floating-shape" style={{ x: shapeOneX, y: shapeOneY }} />
        <motion.span className="floating-shape" style={{ x: shapeTwoX, y: shapeTwoY }} />
        <motion.span className="floating-shape" style={{ x: shapeThreeX, y: shapeThreeY }} />
      </div>
    </>
  );
}
