import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ContactSection } from "../sections/ContactSection";

export function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <Helmet>
        <title>Contact | Cirqle</title>
        <meta name="description" content="Get in touch with Cirqle. Reach out for premium design services, collaborations, and project inquiries." />
        <meta property="og:title" content="Contact | Cirqle" />
        <meta property="og:description" content="Get in touch with Cirqle. Reach out for premium design services, collaborations, and project inquiries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work/contact" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact | Cirqle" />
        <meta name="twitter:description" content="Get in touch with Cirqle. Reach out for premium design services, collaborations, and project inquiries." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work/contact" />
      </Helmet>
      <ContactSection />
    </main>
  );
}
