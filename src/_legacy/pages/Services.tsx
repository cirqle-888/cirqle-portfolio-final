import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ServicesOverview } from "../sections/ServicesOverview";

export function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16">
      <Helmet>
        <title>Design Services | Graphic Design, Video, Social Media &amp; Ads | Cirqle</title>
        <meta name="description" content="Explore Cirqle's creative services: graphic design, video production, social media management, Meta Ads, brand identity, event branding, and UI/UX design." />
        <meta property="og:title" content="Design Services | Graphic Design, Video, Social Media &amp; Ads | Cirqle" />
        <meta property="og:description" content="Explore Cirqle's creative services: graphic design, video production, social media management, Meta Ads, brand identity, event branding, and UI/UX design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work/services" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Design Services | Graphic Design, Video, Social Media &amp; Ads | Cirqle" />
        <meta name="twitter:description" content="Explore Cirqle's creative services: graphic design, video production, social media management, Meta Ads, brand identity, event branding, and UI/UX design." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work/services" />
      </Helmet>
      <ServicesOverview />
    </div>
  );
}
