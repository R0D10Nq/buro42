import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Projects />
      </main>
    </SmoothScroll>
  );
}
