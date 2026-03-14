import { Helmet } from "react-helmet-async";
import { Hero } from "../components/Hero";
import { HighlightProjects } from "../components/HighlightProjects";
import { SupermarketFlyers } from "../components/SupermarketFlyers";
import { WhyCirqle } from "../components/WhyCirqle";
import { AboutSection } from "../components/AboutSection";

export function Home() {
  return (
    <main>
      <Helmet>
        <title>Cirqle – Premium Design Ecosystem</title>
        <meta
          name="description"
          content="Cirqle is a complete design ecosystem delivering premium creative services, brand identity, digital production, and supermarket promotional design."
        />
        <link rel="canonical" href="https://cirqle.work" />
      </Helmet>
      <Hero />
      <HighlightProjects />
      <SupermarketFlyers />
      <WhyCirqle />
      <AboutSection />
    </main>
  );
}
