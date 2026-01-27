import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessProps {
  className?: string;
}

const STEPS: readonly ProcessStep[] = [
  {
    number: "01",
    title: "Исследование",
    description:
      "Глубоко погружаемся в бизнес, изучаем рынок и конкурентов, формируем понимание задачи",
  },
  {
    number: "02",
    title: "Проектирование",
    description:
      "Создаём прототипы, проектируем архитектуру, продумываем каждый сценарий использования",
  },
  {
    number: "03",
    title: "Разработка",
    description:
      "Пишем чистый код, используем современные технологии, регулярно показываем прогресс",
  },
  {
    number: "04",
    title: "Запуск",
    description:
      "Тестируем, оптимизируем, запускаем и остаёмся на связи для поддержки",
  },
] as const;

export function Process({ className }: ProcessProps) {
  return (
    <section id="process" className={cn("py-28 md:py-36", className)}>
      <Container>
        <ScrollReveal className="mb-14 flex items-end justify-between gap-10 md:mb-20">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-[-0.03em]">
            Как мы
            <br />
            работаем
          </h2>
          <span className="font-mono text-sm text-muted">(03)</span>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.06} y={40}>
              <article
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border p-8 transition-colors duration-300 md:p-10",
                  "before:absolute before:inset-0 before:z-0 before:translate-y-full before:bg-accent",
                  "before:transition-transform before:duration-300 before:content-['']",
                  "group-hover:before:translate-y-0 group-hover:text-background",
                )}
              >
                <div className="relative z-10 flex h-full flex-col">
                  <span className="mb-7 text-[clamp(2.5rem,4vw,4rem)] font-black leading-none opacity-10 transition-opacity duration-300 group-hover:opacity-30">
                    {step.number}
                  </span>
                  <h3 className="mb-3 text-[1.2rem] font-bold transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted/80 transition-colors group-hover:text-background">
                    {step.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
