import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AboutSection } from "../sections/AboutSection";

export function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <Helmet>
        <title>About | Cirqle</title>
        <meta name="description" content="Learn more about Cirqle, a premium design ecosystem." />
        <link rel="canonical" href="https://cirqle.work/about" />
      </Helmet>
      <AboutSection />
    </main>
  );
}
