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
        <meta name="description" content="Cirqle is a complete design ecosystem delivering premium creative services, brand identity, digital production, and supermarket promotional design." />
        <meta property="og:title" content="Cirqle – Premium Design Ecosystem" />
        <meta property="og:description" content="Cirqle is a complete design ecosystem delivering premium creative services, brand identity, digital production, and supermarket promotional design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cirqle – Premium Design Ecosystem" />
        <meta name="twitter:description" content="Cirqle is a complete design ecosystem delivering premium creative services, brand identity, digital production, and supermarket promotional design." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
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
