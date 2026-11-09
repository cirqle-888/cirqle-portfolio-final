import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AboutSection } from "../sections/AboutSection";

export function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16">
      <Helmet>
        <title>About Us | Creative Design Agency | Cirqle</title>
        <meta name="description" content="Cirqle means a circle of skilled people — designers, video editors, marketers, and developers working as one team for supermarket campaigns, branding, social media, and video." />
        <meta property="og:title" content="About Us | Creative Design Agency | Cirqle" />
        <meta property="og:description" content="Cirqle means a circle of skilled people — designers, video editors, marketers, and developers working as one team for supermarket campaigns, branding, social media, and video." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work/about" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Creative Design Agency | Cirqle" />
        <meta name="twitter:description" content="Cirqle means a circle of skilled people — designers, video editors, marketers, and developers working as one team for supermarket campaigns, branding, social media, and video." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work/about" />
      </Helmet>
      <AboutSection headingTag="h1" />
    </div>
  );
}
