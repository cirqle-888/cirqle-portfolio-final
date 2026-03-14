import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ContactSection } from "../components/ContactSection";

export function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <Helmet>
        <title>Contact | Cirqle</title>
        <meta
          name="description"
          content="Get in touch with Cirqle. Reach out for premium design services, collaborations, and project inquiries."
        />
        <link rel="canonical" href="https://cirqle.work/contact" />
      </Helmet>
      <ContactSection />
    </main>
  );
}
