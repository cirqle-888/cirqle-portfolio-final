import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Expand } from "lucide-react";
import { contentfulAssetUrl, getPortfolio } from "../services/contentService";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    title: "Supermarket Campaign",
    category: "Promotional Design",
    image:
      "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    slug: "supermarket-campaign"
  },
  {
    title: "Festival Promo",
    category: "Cultural Design",
    image:
      "https://images.unsplash.com/photo-1553443236-e031f8bb39ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMHBvc3RlciUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxOTI4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    slug: "festival-promo"
  },
  {
    title: "Brand Identity",
    category: "Visual System",
    image:
      "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc2MzEwMDQ3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    slug: "brand-identity"
  },
  {
    title: "Digital Experience",
    category: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1676793894040-b6dd72276620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwdWl8ZW58MXx8fHwxNzYzMTkyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    slug: "digital-experience"
  },
  {
    title: "Social Media Kit",
    category: "Digital Creatives",
    image:
      "https://images.unsplash.com/photo-1611926653670-1ea63b810d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxOTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    slug: "social-media-kit"
  },
  {
    title: "Package Design",
    category: "Product Design",
    image:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYzMTkyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    slug: "package-design"
  },
  {
    title: "Marketing Collateral",
    category: "Print Design",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBtYXRlcmlhbHxlbnwxfHx8fDE3NjMxOTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    slug: "marketing-collateral"
  },
  {
    title: "Event Branding",
    category: "Brand Experience",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGJyYW5kaW5nfGVufDF8fHx8MTc2MzE5Mjg0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    slug: "event-branding"
  },
];

type Project = (typeof projects)[0] & { slug?: string };

export function HighlightProjects() {
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>(projects);
  const [sectionMeta, setSectionMeta] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    getPortfolio().then((items) => {
      if (cancelled || !Array.isArray(items) || !items.length) return;

      const meta = items?.[0]?.fields ?? null;
      const mapped = items
        .map((entry: any) => {
          const fields = entry?.fields ?? {};
          const rawImage = fields?.image;
          const image =
            typeof rawImage === "string" ? rawImage : (contentfulAssetUrl(rawImage) ?? null);
          const slug = fields?.slug ? String(fields.slug) : undefined;
          if (!fields?.title || !fields?.category || !image) return null;
          return {
            title: String(fields.title),
            category: String(fields.category),
            image,
            slug,
          };
        })
        .filter(Boolean) as Project[];

      if (!cancelled && mapped.length) {
        setSectionMeta(meta);
        setPortfolioProjects(mapped);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
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
              <span className="text-sm">{sectionMeta?.badgeText ?? "Featured Work"}</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
              {sectionMeta?.title ?? "Excellence in Every Project"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {sectionMeta?.subtitle ?? "Crafted with precision, delivered with speed"}
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-hover hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300 transform-gpu will-change-transform"
              >
                <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl transition-shadow duration-500 refraction liquid-ripple edge-glow-hover">
                  {/* Micro liquid movement */}
                  <div className="absolute inset-0 pointer-events-none z-20 micro-liquid">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-30"></div>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-white relative z-10 w-full pointer-events-none">
                        <p className="text-xs text-gray-300 mb-1">{project.category}</p>
                        <p className="font-medium drop-shadow-md">{project.title}</p>
                      </div>
                      <button
                        aria-label="View Project"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (project.slug) {
                            navigate(`/portfolio/${project.slug}`);
                          }
                        }}
                        className="pointer-events-auto absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-[16px] border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]"
                      >
                        <Expand className="w-5 h-5 drop-shadow-md" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
