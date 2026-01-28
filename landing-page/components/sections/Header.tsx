"use client";

import { useCallback, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { EASING } from "@/lib/constants/animations";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  className?: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { href: "#services", label: "Услуги" },
  { href: "#projects", label: "Проекты" },
  { href: "#process", label: "Процесс" },
  { href: "#contact", label: "Контакт" },
] as const;

export function Header({ className }: HeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const linkClassName =
    "relative py-1 text-sm font-medium text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 py-4 mix-blend-difference",
        className,
      )}
    >
      <Container className="flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-extrabold tracking-tight text-foreground"
        >
          БЮРО<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={linkClassName}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Меню"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={handleToggleMenu}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <motion.span
            className="h-[2px] w-7 bg-foreground"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 6 : 0,
            }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.2, ease: EASING.easeOut }
            }
          />
          <motion.span
            className="h-[2px] w-7 bg-foreground"
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.2, ease: EASING.easeOut }
            }
          />
          <motion.span
            className="h-[2px] w-7 bg-foreground"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -6 : 0,
            }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.2, ease: EASING.easeOut }
            }
          />
        </button>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: EASING.easeOut }
            }
          >
            <Container className="flex h-full flex-col items-center justify-center gap-8">
              <nav className="flex flex-col items-center gap-8 text-lg">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={linkClassName}
                    onClick={handleCloseMenu}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
