import { Helmet } from "react-helmet-async";
import { Hero } from "../sections/Hero";
import { ShowcaseGrid } from "../sections/ShowcaseGrid";
import { SupermarketFlyers } from "../sections/SupermarketFlyers";
import { WhyCirqle } from "../sections/WhyCirqle";
import { AboutSection } from "../sections/AboutSection";

export function Home() {
  return (
    <main>
      <Helmet>
        <title>Creative Design Agency in Kerala | Graphic Design, Video &amp; Social Media | Cirqle</title>
        <meta name="description" content="Cirqle is a Kerala-based creative design agency offering graphic design, video production, social media content, Meta Ads, and brand identity services. Premium quality, fast delivery." />
        <meta property="og:title" content="Creative Design Agency in Kerala | Graphic Design, Video &amp; Social Media | Cirqle" />
        <meta property="og:description" content="Cirqle is a Kerala-based creative design agency offering graphic design, video production, social media content, Meta Ads, and brand identity services. Premium quality, fast delivery." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Creative Design Agency in Kerala | Graphic Design, Video &amp; Social Media | Cirqle" />
        <meta name="twitter:description" content="Cirqle is a Kerala-based creative design agency offering graphic design, video production, social media content, Meta Ads, and brand identity services. Premium quality, fast delivery." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work" />
      </Helmet>
      <Hero />
      <ShowcaseGrid />
      <SupermarketFlyers limit={8} />
      <WhyCirqle />
      <AboutSection />
    </main>
  );
}
