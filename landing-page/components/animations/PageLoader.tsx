"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { EASING } from "@/lib/constants/animations";

const LOADER_DURATION = 2500;

export function PageLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    if (shouldReduceMotion) {
      setIsVisible(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, LOADER_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isVisible, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-8 bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <motion.div
            className="text-[clamp(3rem,15vw,10rem)] font-black tracking-[-0.05em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASING.easeOut }}
          >
            БЮРО
          </motion.div>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: EASING.easeInOut }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
