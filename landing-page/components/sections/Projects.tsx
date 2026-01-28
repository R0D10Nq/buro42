import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface Project {
  typeLabel: string;
  name: string;
  description: string;
  gradient: string;
}

interface ProjectsProps {
  className?: string;
}

const PROJECTS: readonly Project[] = [
  {
    typeLabel: "Финтех платформа",
    name: "PayFlow",
    description:
      "Платёжная система нового поколения с интеграцией криптовалют",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  },
  {
    typeLabel: "Мобильное приложение",
    name: "MindSpace",
    description: "Приложение для медитации и ментального здоровья",
    gradient: "linear-gradient(135deg, #2d132c 0%, #801336 100%)",
  },
  {
    typeLabel: "E-commerce",
    name: "Artisan",
    description: "Маркетплейс для ремесленников и дизайнеров",
    gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
  },
  {
    typeLabel: "SaaS платформа",
    name: "TeamSync",
    description: "Инструмент для управления распределёнными командами",
    gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
  },
] as const;

export function Projects({ className }: ProjectsProps) {
  return (
    <section id="projects" className={cn("bg-[#050505] py-24 md:py-32", className)}>
      <Container>
        <ScrollReveal className="mb-14 flex items-end justify-between gap-10 md:mb-20">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-[-0.03em]">
            Избранные
            <br />
            работы
          </h2>
          <span className="font-mono text-sm text-muted">(02)</span>
        </ScrollReveal>

        <div className="grid gap-7 md:grid-cols-2 md:gap-8">
          {PROJECTS.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <ScrollReveal key={project.name} delay={index * 0.08} y={50}>
                <article
                  className={cn(
                    "group relative overflow-hidden rounded-[20px]",
                    "bg-black/10",
                    "transition-shadow duration-300",
                    "hover:shadow-[0_0_0_1px_rgba(200,255,0,0.2)]",
                    isFeatured
                      ? "aspect-[4/3] md:row-span-2 md:aspect-auto md:min-h-[520px]"
                      : "aspect-[4/3]",
                  )}
                  data-hover
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ background: project.gradient }}
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,transparent_60%)]" />

                  <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
                    <span className="mb-2 text-xs uppercase tracking-[0.1em] text-accent">
                      {project.typeLabel}
                    </span>
                    <h3 className="mb-3 text-[clamp(1.5rem,2.5vw,2rem)] font-bold">
                      {project.name}
                    </h3>
                    <p className="max-w-[300px] text-sm text-muted md:text-[0.95rem]">
                      {project.description}
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute right-7 top-7 flex h-12 w-12 items-center justify-center rounded-full",
                      "border border-white/20 text-lg",
                      "transition-colors duration-300",
                      "group-hover:border-accent group-hover:bg-accent group-hover:text-background",
                    )}
                  >
                    ↗
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
