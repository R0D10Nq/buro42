import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <Stats />
        <Process />
        <TechStack />
      </main>
    </SmoothScroll>
  );
}
