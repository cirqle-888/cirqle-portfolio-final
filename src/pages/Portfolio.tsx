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
        <meta
          name="description"
          content="Discover the portfolio of Cirqle, featuring premium design and creative projects."
        />
        <link rel="canonical" href="https://cirqle.work/portfolio" />
      </Helmet>
      <HighlightProjects />
    </main>
  );
}
