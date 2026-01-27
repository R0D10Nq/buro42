import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  className?: string;
}

const NAV_LINKS: readonly FooterLink[] = [
  { label: "Услуги", href: "#services" },
  { label: "Проекты", href: "#projects" },
  { label: "Процесс", href: "#process" },
  { label: "Контакт", href: "#contact" },
] as const;

const SOCIAL_LINKS: readonly FooterLink[] = [
  { label: "Telegram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const;

const CONTACT_LINKS: readonly FooterLink[] = [
  { label: "hello@buro.dev", href: "mailto:hello@buro.dev" },
  { label: "+7 900 123 45 67", href: "tel:+79001234567" },
  { label: "Москва, Россия", href: "#" },
] as const;

export function Footer({ className }: FooterProps) {
  const linkClassName =
    "block text-sm text-foreground transition-[color,transform] duration-300 hover:translate-x-1 hover:text-accent";

  return (
    <footer className={cn("border-t border-border py-12 md:py-16", className)}>
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Навигация
            </h4>
            <div className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={linkClassName}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Социальные сети
            </h4>
            <div className="space-y-2.5">
              {SOCIAL_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={linkClassName}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Контакты
            </h4>
            <div className="space-y-2.5">
              {CONTACT_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={linkClassName}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row">
          <span>© 2024 БЮРО. Все права защищены.</span>
          <span>Сделано с любовью и кодом.</span>
        </div>
      </Container>
    </footer>
  );
}
