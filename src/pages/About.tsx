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
        <meta property="og:title" content="About | Cirqle" />
        <meta property="og:description" content="Learn more about Cirqle, a premium design ecosystem." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work/about" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | Cirqle" />
        <meta name="twitter:description" content="Learn more about Cirqle, a premium design ecosystem." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work/about" />
      </Helmet>
      <AboutSection />
    </main>
  );
}
