import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
      </main>
    </SmoothScroll>
  );
}
