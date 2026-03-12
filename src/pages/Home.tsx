import { Hero } from "../components/Hero";
import { HighlightProjects } from "../components/HighlightProjects";
import { SupermarketFlyers } from "../components/SupermarketFlyers";
import { WhyCirqle } from "../components/WhyCirqle";
import { AboutSection } from "../components/AboutSection";

export function Home() {
  return (
    <main>
      <Hero />
      <HighlightProjects />
      <SupermarketFlyers />
      <WhyCirqle />
      <AboutSection />
    </main>
  );
}
