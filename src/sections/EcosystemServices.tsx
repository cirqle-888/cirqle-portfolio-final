import { motion } from "motion/react";
import { FileText, Palette, Share2, Sparkles, Package, Layout } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: FileText,
    title: "Supermarket Campaigns",
    description: "Offer flyers, seasonal catalogues, and promotional artwork built for print and digital.",
    href: "/highlights/supermarket-campaign",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Logos, colour systems, and brand guidelines that make lasting impressions.",
    href: "/services/brand-identity",
  },
  {
    icon: Sparkles,
    title: "Event Branding",
    description: "Stage backdrops, standees, invites, and complete event visual systems.",
    href: "/services/event-branding",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description: "Websites and app interfaces that are beautiful, intuitive, and easy to use.",
    href: "/services/ui-ux-design",
  },
  {
    icon: Package,
    title: "Marketing Pack",
    description: "A ready-to-use set of digital and print templates tailored to your brand.",
    href: "/products/marketing-pack",
  },
  {
    icon: Share2,
    title: "Social Media & Video",
    description: "Posts, reels, and video content produced to keep your feed active and on-brand.",
    href: "/contact",
  },
];

export function EcosystemServices() {
  return (
    <section id="services" className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm">Our Services</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">What We Do</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Design, video, and social content for retail and growing brands — from one team
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link key={index} to={service.href} className="block group cursor-pointer">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <div className="relative h-full liquid-glass-card p-9 rounded-3xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-xl">
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl mb-3 tracking-tight">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
