import { useEffect } from "react";
import { ContactSection } from "../components/ContactSection";

export function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      <ContactSection />
    </main>
  );
}
