"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(
    () => [
      { href: "#services", label: "Услуги" },
      { href: "#projects", label: "Проекты" },
      { href: "#process", label: "Процесс" },
      { href: "#contact", label: "Контакт" },
    ],
    [],
  );

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
          {navItems.map((item) => (
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
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className="h-[2px] w-7 bg-foreground" />
          <span className="h-[2px] w-7 bg-foreground" />
          <span className="h-[2px] w-7 bg-foreground" />
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "md:hidden",
          isMenuOpen ? "block" : "hidden",
        )}
      >
        <Container className="pt-4">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={linkClassName}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
