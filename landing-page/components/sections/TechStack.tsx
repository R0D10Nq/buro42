import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface TechStackProps {
  className?: string;
}

const TECH_STACK = [
  "React",
  "Vue.js",
  "Next.js",
  "Node.js",
  "Python",
  "Go",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Docker",
  "Kubernetes",
  "Flutter",
  "Swift",
  "Kotlin",
  "Figma",
  "GraphQL",
] as const;

export function TechStack({ className }: TechStackProps) {
  return (
    <section
      id="tech-stack"
      className={cn("bg-[#050505] py-24 md:py-28", className)}
    >
      <Container>
        <ScrollReveal className="mb-12 flex items-end justify-between gap-8 md:mb-16">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-[-0.03em]">
            Технологии
          </h2>
          <span className="font-mono text-sm text-muted">(04)</span>
        </ScrollReveal>

        <div className="mt-10 flex flex-wrap gap-4 md:gap-5">
          {TECH_STACK.map((tech, index) => (
            <ScrollReveal
              key={tech}
              delay={index * 0.03}
              y={30}
              className="inline-flex"
            >
              <span
                data-hover
                className={cn(
                  "inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium",
                  "transition-[color,background,transform,border-color] duration-300",
                  "hover:scale-105 hover:border-accent hover:bg-accent hover:text-background",
                )}
              >
                {tech}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
