import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { EcosystemServices } from "../sections/EcosystemServices";

export function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <Helmet>
        <title>Services | Cirqle Design Ecosystem</title>
        <meta name="description" content="Explore our comprehensive creative services including supermarket campaigns, brand identity design, and digital UI/UX solutions." />
        <meta property="og:title" content="Services | Cirqle Design Ecosystem" />
        <meta property="og:description" content="Explore our comprehensive creative services including supermarket campaigns, brand identity design, and digital UI/UX solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work/services" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services | Cirqle Design Ecosystem" />
        <meta name="twitter:description" content="Explore our comprehensive creative services including supermarket campaigns, brand identity design, and digital UI/UX solutions." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work/services" />
      </Helmet>
      <EcosystemServices />
    </main>
  );
}
