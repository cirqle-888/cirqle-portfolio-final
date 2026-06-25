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
        <title>About Us | Creative Design Agency in Kerala | Cirqle</title>
        <meta name="description" content="Cirqle is a Kerala-based creative agency built for ambitious brands. We deliver graphic design, video production, social media content, and Meta Ads — all under one roof." />
        <meta property="og:title" content="About Us | Creative Design Agency in Kerala | Cirqle" />
        <meta property="og:description" content="Cirqle is a Kerala-based creative agency built for ambitious brands. We deliver graphic design, video production, social media content, and Meta Ads — all under one roof." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work/about" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Creative Design Agency in Kerala | Cirqle" />
        <meta name="twitter:description" content="Cirqle is a Kerala-based creative agency built for ambitious brands. We deliver graphic design, video production, social media content, and Meta Ads — all under one roof." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work/about" />
      </Helmet>
      <AboutSection headingTag="h1" />
    </main>
  );
}
