import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

interface Service {
  title: string;
  desc: string;
  caps: string[];
  href?: string;
}

const SERVICES: Service[] = [
  {
    title: "Retail & Promotions",
    desc: "Offer artwork built to move products off shelves — our core craft, on weekly deadlines.",
    href: "/highlights/supermarket-campaign",
    caps: [
      "Supermarket offer flyers",
      "Seasonal catalogues",
      "Shelf & in-store signage",
      "Price and product layouts",
      "Print-ready artwork",
      "Weekly campaign rollouts",
    ],
  },
  {
    title: "Brand & Identity",
    desc: "The mark, the rules, and the language that make a brand recognisable anywhere.",
    href: "/services/brand-identity",
    caps: [
      "Logo & identity design",
      "Colour and type systems",
      "Brand guidelines",
      "Naming & messaging",
      "Stationery & brand assets",
      "Rebranding",
    ],
  },
  {
    title: "Social & Content",
    desc: "A feed that stays active, on-brand, and worth following.",
    caps: [
      "Post & story design",
      "Reels and short-form video",
      "Content calendars",
      "Motion graphics",
      "Campaign creatives",
      "Profile & highlight design",
    ],
  },
  {
    title: "Video Production",
    desc: "Video cut for the platform it lives on, not repurposed as an afterthought.",
    caps: [
      "Promo & product films",
      "Event coverage edits",
      "Motion graphics & titles",
      "Ad cuts for Meta",
      "Subtitles & versioning",
      "Colour and sound polish",
    ],
  },
  {
    title: "Digital & Web",
    desc: "Interfaces that are easy to use, easy to update, and ready for developers.",
    href: "/services/ui-ux-design",
    caps: [
      "Website design (UI/UX)",
      "Landing pages",
      "E-commerce layouts",
      "Responsive design",
      "Prototyping & testing",
      "Design systems",
    ],
  },
  {
    title: "Advertising",
    desc: "Creative and campaigns pointed at results, not impressions.",
    caps: [
      "Meta ads creatives",
      "Campaign setup & optimisation",
      "A/B creative variants",
      "Audience targeting",
      "Budget planning",
      "Performance reporting",
    ],
  },
  {
    title: "Events & Spaces",
    desc: "Everything an event needs to look like one brand, from entrance to stage.",
    href: "/services/event-branding",
    caps: [
      "Stage & backdrop design",
      "Standees and banners",
      "Booth & exhibition graphics",
      "Invites and passes",
      "Wayfinding signage",
      "Post-event creatives",
    ],
  },
];

export function ServicesOverview() {
  const navigate = useNavigate();

  return (
    <>
      {/* Statement */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
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
                What We Do
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1]">
              Everything your brand needs.
              <br />
              <span className="font-display-i bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
                Made in one place.
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              One team across design, video, marketing, and web — so nothing gets
              lost between vendors, and everything looks like it belongs together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capability rows */}
      <section id="services" className="pb-28 px-6 bg-white">
        <div className="svc-list">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "80px" }}
              transition={{ duration: 0.5 }}
              className="svc-row"
            >
              <div className="svc-index">{String(i + 1).padStart(2, "0")}</div>

              <div>
                <h2 className="svc-title">{service.title}</h2>
                <p className="svc-desc">{service.desc}</p>
                {service.href && (
                  <button
                    type="button"
                    onClick={() => navigate(service.href!)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium mt-4"
                    style={{ color: "#A259FF" }}
                  >
                    See examples <ArrowRight style={{ width: 14, height: 14 }} />
                  </button>
                )}
              </div>

              <ul className="svc-caps">
                {service.caps.map((cap) => (
                  <li key={cap}>{cap}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 tracking-tight">
              Not sure where to{" "}
              <span className="font-display-i bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
                start?
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Send what you have — a rough idea, a product list, or just a deadline.
              We'll tell you what it needs.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity px-10 py-7 text-lg rounded-full shadow-lg shadow-[#A259FF]/25"
            >
              Get a Quote
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
