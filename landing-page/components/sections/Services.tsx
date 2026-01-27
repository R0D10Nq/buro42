import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

interface Service {
  number: string;
  name: string;
  tags: readonly string[];
}

interface ServicesProps {
  className?: string;
}

const SERVICES: readonly Service[] = [
  { number: "01", name: "Веб-разработка", tags: ["React", "Vue", "Node.js"] },
  { number: "02", name: "Мобильные приложения", tags: ["iOS", "Android", "Flutter"] },
  {
    number: "03",
    name: "UI/UX Дизайн",
    tags: ["Figma", "Prototyping", "Research"],
  },
  { number: "04", name: "Сложные платформы", tags: ["CRM", "ERP", "SaaS"] },
  { number: "05", name: "E-commerce", tags: ["Shopify", "Custom", "Payments"] },
  {
    number: "06",
    name: "DevOps & Поддержка",
    tags: ["AWS", "Docker", "CI/CD"],
  },
] as const;

export function Services({ className }: ServicesProps) {
  return (
    <section id="services" className={cn("py-28 md:py-36", className)}>
      <Container>
        <ScrollReveal className="mb-14 flex items-end justify-between gap-10 md:mb-20">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-[-0.03em]">
            Что мы
            <br />
            умеем
          </h2>
          <span className="font-mono text-sm text-muted">(01)</span>
        </ScrollReveal>

        <div>
          {SERVICES.map((service, index) => (
            <ScrollReveal key={service.number} delay={index * 0.06} y={40}>
              <div
                className={cn(
                  "group border-t border-border py-10 transition-colors",
                  "hover:bg-[linear-gradient(90deg,rgba(200,255,0,0.05)_0%,transparent_100%)]",
                )}
              >
                <div
                  className={cn(
                    "grid grid-cols-[50px_1fr_40px] items-center gap-4",
                    "lg:grid-cols-[80px_1fr_300px_50px] lg:gap-10",
                  )}
                >
                  <span className="font-mono text-sm text-muted">
                    {service.number}
                  </span>

                  <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.02em] transition-colors group-hover:text-accent">
                    <span className="glitch" data-text={service.name}>
                      {service.name}
                    </span>
                  </h3>

                  <div className="hidden flex-wrap gap-2 lg:flex">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3.5 py-1.5 text-xs transition-colors group-hover:border-accent group-hover:text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-2xl opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
