import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-28 px-6 min-h-screen bg-white">
      <Helmet>
        <title>Terms of Service | Cirqle</title>
        <meta name="description" content="Terms of service for Cirqle Design – the conditions governing use of our website and services." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://cirqle.work/terms" />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl mb-6 tracking-tight">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: {new Date().getFullYear()}</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl mb-3 text-gray-900">Use of This Website</h2>
            <p>
              By accessing cirqle.work, you agree to use the website for lawful purposes only. You may
              not use this site in any way that could damage, disable, or impair the website or
              interfere with others' use of it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-gray-900">Intellectual Property</h2>
            <p>
              All content on this website — including designs, text, graphics, logos, and images — is
              the property of Cirqle Design and protected by applicable copyright laws. No content may
              be reproduced without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-gray-900">Service Agreements</h2>
            <p>
              Design services provided by Cirqle are governed by individual project agreements made
              between Cirqle and the client. These terms govern website use only and do not replace
              any project-specific contracts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-gray-900">Limitation of Liability</h2>
            <p>
              Cirqle Design provides this website on an "as is" basis. We make no warranties,
              expressed or implied, and disclaim all warranties including merchantability or fitness
              for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-gray-900">Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
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
