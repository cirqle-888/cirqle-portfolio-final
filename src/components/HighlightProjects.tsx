import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Expand, X } from "lucide-react";
import { contentfulAssetUrl, getPortfolio } from "../services/contentService";

const projects = [
  {
    title: "Supermarket Campaign",
    category: "Promotional Design",
    image: "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Festival Promo",
    category: "Cultural Design",
    image: "https://images.unsplash.com/photo-1553443236-e031f8bb39ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMHBvc3RlciUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxOTI4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Brand Identity",
    category: "Visual System",
    image: "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc2MzEwMDQ3OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Digital Experience",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1676793894040-b6dd72276620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwdWl8ZW58MXx8fHwxNzYzMTkyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Social Media Kit",
    category: "Digital Creatives",
    image: "https://images.unsplash.com/photo-1611926653670-1ea63b810d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxOTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Package Design",
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYzMTkyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Marketing Collateral",
    category: "Print Design",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBtYXRlcmlhbHxlbnwxfHx8fDE3NjMxOTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Event Branding",
    category: "Brand Experience",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGJyYW5kaW5nfGVufDF8fHx8MTc2MzE5Mjg0OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

type Project = typeof projects[0];

export function HighlightProjects() {
  const [portfolioProjects, setPortfolioProjects] = useState(projects);
  const [sectionMeta, setSectionMeta] = useState<any | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
            typeof rawImage === "string"
              ? rawImage
              : contentfulAssetUrl(rawImage) ?? null;
          if (!fields?.title || !fields?.category || !image) return null;
          return {
            title: String(fields.title),
            category: String(fields.category),
            image,
          };
        })
        .filter(Boolean) as typeof projects;

      if (!cancelled && mapped.length) {
        setSectionMeta(meta);
        setPortfolioProjects(mapped);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

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
                className="cursor-hover hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300 transform-gpu will-change-transform"
              >
                <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl transition-shadow duration-500 refraction liquid-ripple edge-glow-hover">
                  {/* Micro liquid movement */}
                  <div className="absolute inset-0 pointer-events-none z-20 micro-liquid">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-30"></div>
                  </div>
                  
                  {/* Image */}
                  <div className="group relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* NEW: Independent Button Div */}
                    <div className="absolute top-4 left-4 z-[50] pointer-events-auto">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-[16px] border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                      >
                        <Expand className="w-5 h-5 drop-shadow-md" />
                      </button>
                    </div>

                    {/* Text Overlay Div */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="text-white relative z-10 w-full">
                        <p className="text-xs text-gray-300 mb-1">{project.category}</p>
                        <p className="font-medium drop-shadow-md">{project.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Liquid Glass Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 w-full h-full z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
            className="fixed top-4 right-4 md:top-8 md:right-8 z-[10000] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all hover:scale-110 text-white"
          >
            <X strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div 
            className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-[2rem] p-2 md:p-6 shadow-2xl w-[95vw] md:w-[90vw] lg:max-w-5xl h-fit max-h-[92vh] mx-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[75vh] md:h-[80vh] flex flex-col items-center justify-center rounded-xl overflow-hidden min-h-0">
              <ImageWithFallback
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-auto h-auto max-w-full max-h-full object-contain drop-shadow-2xl"
              />
              
              {/* Subtle Modal Info Overlay */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 right-4 md:right-16 pointer-events-none z-10">
                <div className="inline-block liquid-glass-card backdrop-blur-md bg-black/40 border border-white/10 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-white shadow-lg">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">{selectedProject.title}</h3>
                  <p className="text-gray-300 text-xs md:text-sm mt-0.5">{selectedProject.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
