import { motion } from "motion/react";

export const FAQS = [
  {
    q: "What does Cirqle do?",
    a: "Cirqle is a creative design team working with brands worldwide. We make supermarket offer flyers and campaigns, brand identities, social media content, video, Meta ads, and web design — all from one team.",
  },
  {
    q: "How do we work together remotely?",
    a: "We work remote-first with clients around the world — most projects run over WhatsApp and email, so distance is never a problem.",
  },
  {
    q: "How fast can you deliver a supermarket flyer?",
    a: "Flyers run on the retail clock. Once we have your offer list, artwork is usually designed, revised, and delivered within days — fast enough for weekly offer cycles.",
  },
  {
    q: "How do I share my offer list or brief?",
    a: "However it's easiest for you: a WhatsApp message, a spreadsheet, or a photo of a handwritten list all work. We take it from there.",
  },
  {
    q: "Can you work with international clients?",
    a: "Yes. Files are delivered digitally — print-ready for your local press and sized for social media — so we work with brands anywhere.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on what you need — a single flyer, a monthly package, or a full brand build. Message us on WhatsApp with your requirement and we'll send a clear quote.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #A259FF, #4CC3FF)",
                  display: "inline-block",
                }}
              />
              Common Questions
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Quick answers
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "80px" }}
          transition={{ duration: 0.6 }}
        >
          {FAQS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <div className="faq-body">{item.a}</div>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
