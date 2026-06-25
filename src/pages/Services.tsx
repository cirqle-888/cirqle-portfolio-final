import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { EcosystemServices } from "../sections/EcosystemServices";

export function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <Helmet>
        <title>Design Services in Kerala | Graphic Design, Video, Social Media &amp; Ads | Cirqle</title>
        <meta name="description" content="Explore Cirqle's creative services in Kerala: graphic design, video production, social media management, Meta Ads, brand identity, event branding, and UI/UX design." />
        <meta property="og:title" content="Design Services in Kerala | Graphic Design, Video, Social Media &amp; Ads | Cirqle" />
        <meta property="og:description" content="Explore Cirqle's creative services in Kerala: graphic design, video production, social media management, Meta Ads, brand identity, event branding, and UI/UX design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work/services" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Design Services in Kerala | Graphic Design, Video, Social Media &amp; Ads | Cirqle" />
        <meta name="twitter:description" content="Explore Cirqle's creative services in Kerala: graphic design, video production, social media management, Meta Ads, brand identity, event branding, and UI/UX design." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work/services" />
      </Helmet>
      <EcosystemServices />
    </main>
  );
}
