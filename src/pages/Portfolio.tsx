import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { ShowcaseGrid } from "../sections/ShowcaseGrid";
import { SupermarketFlyers } from "../sections/SupermarketFlyers";

export function Portfolio() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

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
      <ShowcaseGrid />
      <SupermarketFlyers />
    </main>
  );
}
