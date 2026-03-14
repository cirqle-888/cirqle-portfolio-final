import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { EcosystemServices } from "../components/EcosystemServices";

export function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <Helmet>
        <title>Services | Cirqle Design Ecosystem</title>
        <meta
          name="description"
          content="Explore our comprehensive creative services including supermarket campaigns, brand identity design, and digital UI/UX solutions."
        />
        <link rel="canonical" href="https://cirqle.work/services" />
      </Helmet>
      <EcosystemServices />
    </main>
  );
}
