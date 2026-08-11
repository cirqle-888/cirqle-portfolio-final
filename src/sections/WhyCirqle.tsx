import { motion } from "motion/react";
import { FileText, Layers, Clock3 } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Supermarket Specialists",
    description:
      "Offer flyers and promotional campaigns are our core craft — print-ready artwork for single offers through full seasonal catalogues.",
  },
  {
    icon: Layers,
    title: "One Team, Every Format",
    description:
      "Design, video, and social content from the same team, so your brand looks consistent on the shelf, on screen, and in the feed.",
  },
  {
    icon: Clock3,
    title: "Built for Retail Deadlines",
    description:
      "A streamlined production workflow means campaign artwork lands on time, even on tight weekly offer cycles.",
  },
];

export function WhyCirqle() {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm">Why Cirqle</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Why businesses work with us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="liquid-glass-card p-8 rounded-3xl text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-xl">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
