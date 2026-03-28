import { Helmet } from "react-helmet-async";
import { Hero } from "../sections/Hero";
import { HighlightProjects } from "../sections/HighlightProjects";
import { SupermarketFlyers } from "../sections/SupermarketFlyers";
import { WhyCirqle } from "../sections/WhyCirqle";
import { AboutSection } from "../sections/AboutSection";

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
