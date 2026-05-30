import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-28 px-6 min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy | Cirqle</title>
        <meta name="description" content="Privacy policy for Cirqle Design – how we collect, use, and protect your information." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://cirqle.work/privacy" />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: {new Date().getFullYear()}</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl mb-3 text-gray-900">Information We Collect</h2>
            <p>
              When you contact us through our website, we collect the information you provide — such as
              your name, email address, WhatsApp number, and project details. This information is used
              solely to respond to your inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-gray-900">How We Use Your Information</h2>
            <p>
              We use the information you share to respond to project inquiries, provide design services,
              and communicate updates relevant to your project. We do not sell, rent, or share your
              personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-gray-900">Third-Party Services</h2>
            <p>
              We use Formspree to process contact form submissions. Formspree's own privacy policy
              applies to data handled through their service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-gray-900">Contact</h2>
            <p>
              For any privacy-related questions, please reach out at{" "}
              <a href="mailto:team@cirqle.work" className="text-[#A259FF] hover:underline">
                team@cirqle.work
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-gray-100">
          <Link to="/" className="text-sm text-gray-500 hover:text-black transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
