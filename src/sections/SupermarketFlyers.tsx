import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Zap, Award, Clock3, Expand } from "lucide-react";
import { contentfulAssetUrl, getSupermarketFlyers } from "../services/contentService";
import { BrochureReader } from "../components/ui/BrochureReader";

const FALLBACK_FLYERS = [
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=1",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=2",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=3",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=4",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=5",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=6",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=7",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=8",
];

export function SupermarketFlyers() {
  const [flyers, setFlyers] = useState<string[]>(FALLBACK_FLYERS);
  const [sectionMeta, setSectionMeta] = useState<any | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    getSupermarketFlyers()
      .then((items) => {
        if (cancelled) return;

        const fields = items?.[0]?.fields ?? null;
        if (!fields) return;

        setSectionMeta(fields);

        const flyersField = fields?.flyers;
        const flyersFromCms = Array.isArray(flyersField)
          ? (flyersField
              .map((asset: any) => {
                if (typeof asset === "string") return asset;
                return contentfulAssetUrl(asset);
              })
              .filter(Boolean) as string[])
          : [];

        // Use CMS flyers if available, otherwise fallback images stay active
        if (flyersFromCms.length > 0) {
          setFlyers(flyersFromCms);
        }
      })
      .catch((err) => {
        console.error("Error fetching supermarket flyers:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration - optimized for hardware acceleration without filters */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(162, 89, 255, 0.15) 0%, rgba(76, 195, 255, 0.1) 40%, rgba(255, 255, 255, 0) 70%)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20"
          >
            <span className="text-sm text-gray-900 font-medium">
              {sectionMeta?.badgeText ?? "Core Specialty"}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            {sectionMeta?.title ?? "Supermarket Campaigns"}
            <br />
            <span className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
              {sectionMeta?.highlight ?? "That Deliver Results"}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {sectionMeta?.subtitle ??
              "Professional promotional designs optimized for maximum impact across digital and print platforms."}
          </p>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          {[
            { icon: Award, label: "Premium Quality" },
            { icon: Zap, label: "High Impact" },
            { icon: Clock3, label: "Rapid Delivery" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 liquid-glass-card px-7 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1 transform-gpu duration-300 cursor-hover edge-glow-hover refraction"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Flyer samples - Clean Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14"
        >
          {flyers.map((image, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              onClick={() => setActiveIndex(i)}
              className="group cursor-pointer hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-500 transform-gpu will-change-transform"
            >
              <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl transition-shadow duration-500 refraction liquid-ripple edge-glow-hover">
                {/* Micro liquid movement */}
                <div className="absolute inset-0 pointer-events-none z-20 micro-liquid">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-30"></div>
                </div>

                <div className="relative aspect-[3/4] overflow-hidden pointer-events-none">
                  <ImageWithFallback
                    src={image}
                    alt={`Supermarket Campaign ${i + 1}`}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 p-4 flex justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      aria-label="View Project"
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-[16px] border border-white/20 flex items-center justify-center text-white transition-all duration-300 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] group-hover:scale-110 group-hover:bg-white/20"
                    >
                      <Expand className="w-5 h-5 drop-shadow-md" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity px-10 py-7 text-lg rounded-full shadow-lg shadow-[#A259FF]/25 cursor-hover"
            >
              View Full Portfolio
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <BrochureReader
        images={flyers}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </section>
  );
}