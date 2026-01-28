"use client";

import { useCallback, useEffect, useRef } from "react";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
}

interface ScrambleItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";
const SCRAMBLE_CHANGE_CHANCE = 0.28;
const SCRAMBLE_STEPS = 20;

export function TextScramble({ text, className }: TextScrambleProps) {
  const shouldReduceMotion = useReducedMotion();
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const frameRequestRef = useRef<number | null>(null);
  const frameRef = useRef(0);
  const queueRef = useRef<ScrambleItem[]>([]);

  const randomChar = useCallback(() => {
    const index = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
    return SCRAMBLE_CHARS[index];
  }, []);

  const stopAnimation = useCallback(() => {
    if (frameRequestRef.current !== null) {
      cancelAnimationFrame(frameRequestRef.current);
      frameRequestRef.current = null;
    }
  }, []);

  const startScramble = useCallback(() => {
    if (shouldReduceMotion) return;

    const element = spanRef.current;
    if (!element) return;

    stopAnimation();

    const fromText = element.innerText;
    const length = Math.max(fromText.length, text.length);

    queueRef.current = Array.from({ length }, (_, index) => {
      const start = Math.floor(Math.random() * SCRAMBLE_STEPS);
      const end = start + Math.floor(Math.random() * SCRAMBLE_STEPS);

      return {
        from: fromText[index] ?? "",
        to: text[index] ?? "",
        start,
        end,
      };
    });

    frameRef.current = 0;

    const update = () => {
      const target = spanRef.current;
      if (!target) return;

      let output = "";
      let completed = 0;

      queueRef.current = queueRef.current.map((item) => {
        if (frameRef.current >= item.end) {
          completed += 1;
          return { ...item, char: undefined };
        }

        if (frameRef.current >= item.start) {
          const shouldChange = !item.char || Math.random() < SCRAMBLE_CHANGE_CHANCE;
          const char = shouldChange ? randomChar() : item.char;

          output += `<span class=\"text-accent\">${char ?? ""}</span>`;
          return { ...item, char };
        }

        output += item.from;
        return item;
      });

      if (completed === queueRef.current.length) {
        target.textContent = text;
        frameRequestRef.current = null;
        return;
      }

      target.innerHTML = output;
      frameRef.current += 1;
      frameRequestRef.current = requestAnimationFrame(update);
    };

    frameRequestRef.current = requestAnimationFrame(update);
  }, [randomChar, shouldReduceMotion, stopAnimation, text]);

  useEffect(() => {
    const element = spanRef.current;
    if (!element) return;

    element.textContent = text;
    if (shouldReduceMotion) {
      stopAnimation();
    }
  }, [shouldReduceMotion, stopAnimation, text]);

  useEffect(() => () => stopAnimation(), [stopAnimation]);

  return (
    <span
      ref={spanRef}
      className={cn(className)}
      data-text={text}
      onMouseEnter={startScramble}
    >
      {text}
    </span>
  );
}
