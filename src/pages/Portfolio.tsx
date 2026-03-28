import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { HighlightProjects } from "../sections/HighlightProjects";

export function Portfolio() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <Helmet>
        <title>Portfolio | Cirqle</title>
        <meta name="description" content="Discover the portfolio of Cirqle, featuring premium design and creative projects." />
        <meta property="og:title" content="Portfolio | Cirqle" />
        <meta property="og:description" content="Discover the portfolio of Cirqle, featuring premium design and creative projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work/portfolio" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | Cirqle" />
        <meta name="twitter:description" content="Discover the portfolio of Cirqle, featuring premium design and creative projects." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work/portfolio" />
      </Helmet>
      <HighlightProjects />
    </main>
  );
}
