import { Helmet } from "react-helmet-async";
import { Hero } from "../sections/Hero";
import { ShowcaseGrid } from "../sections/ShowcaseGrid";
import { SupermarketFlyers } from "../sections/SupermarketFlyers";
import { HowCirqleWorks } from "../sections/HowCirqleWorks";
import { FaqSection, FAQS } from "../sections/FaqSection";
import { ContactSection } from "../sections/ContactSection";

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export function Home() {
  return (
    <>
      <Helmet>
        <title>Creative Design Agency | Graphic Design, Video &amp; Social Media | Cirqle</title>
        <meta name="description" content="Cirqle is a team of skilled creators — designers, video editors, marketers, and developers working as one. Supermarket campaigns, branding, social media, and video, delivered on retail deadlines." />
        <meta property="og:title" content="Creative Design Agency | Graphic Design, Video &amp; Social Media | Cirqle" />
        <meta property="og:description" content="Cirqle is a team of skilled creators — designers, video editors, marketers, and developers working as one. Supermarket campaigns, branding, social media, and video." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Creative Design Agency | Graphic Design, Video &amp; Social Media | Cirqle" />
        <meta name="twitter:description" content="Cirqle is a team of skilled creators working as one. Supermarket campaigns, branding, social media, and video." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work" />
        <script type="application/ld+json">{faqJsonLd}</script>
      </Helmet>
      <Hero />
      <ShowcaseGrid />
      <SupermarketFlyers limit={8} />
      <HowCirqleWorks />
      <FaqSection />
      <ContactSection headingTag="h2" />
    </>
  );
}
