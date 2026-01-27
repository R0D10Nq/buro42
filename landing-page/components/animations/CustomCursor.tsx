"use client";

import { useEffect, useState } from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import { cn } from "@/lib/utils";

const CURSOR_SIZE = 20;
const DOT_SIZE = 6;

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 30, mass: 0.2 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 30, mass: 0.2 });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    if (mediaQuery.matches) {
      return;
    }

    setIsEnabled(true);
    document.body.classList.add("cursor-hidden");

    const handleMouseMove = (event: MouseEvent) => {
      const offset = CURSOR_SIZE / 2;
      cursorX.set(event.clientX - offset);
      cursorY.set(event.clientY - offset);
      dotX.set(event.clientX - DOT_SIZE / 2);
      dotY.set(event.clientY - DOT_SIZE / 2);
    };

    const handleMouseEnter = () => setIsHover(true);
    const handleMouseLeave = () => setIsHover(false);

    const hoverTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-hover], a, button"),
    );

    hoverTargets.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.classList.remove("cursor-hidden");
      document.removeEventListener("mousemove", handleMouseMove);
      hoverTargets.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY, dotX, dotY, shouldReduceMotion]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className={cn(
          "custom-cursor pointer-events-none fixed left-0 top-0 z-[9999]",
          "h-5 w-5 rounded-full border-2 border-accent mix-blend-difference",
          "transition-[background-color] duration-200",
          isHover && "bg-accent",
        )}
        style={{ x: smoothX, y: smoothY }}
        animate={{ scale: isHover ? 3 : 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        aria-hidden="true"
      />
      <motion.div
        className={cn(
          "custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[9999]",
          "h-1.5 w-1.5 rounded-full bg-accent",
        )}
        style={{ x: dotX, y: dotY }}
        aria-hidden="true"
      />
    </>
  );
}
