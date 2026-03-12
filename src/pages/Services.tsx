import { useEffect } from "react";
import { EcosystemServices } from "../components/EcosystemServices";

export function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <EcosystemServices />
    </main>
  );
}
