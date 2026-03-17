import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Expand } from "lucide-react";
import { contentfulAssetUrl, getPortfolio } from "../services/contentService";
import { useNavigate } from "react-router-dom";

type Project = {
  title: string;
  category: string;
  image: string;
  slug: string;
};

export function HighlightProjects() {
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [sectionMeta, setSectionMeta] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const items = await getPortfolio();

        console.log("Contentful Items:", items); // DEBUG

        if (!Array.isArray(items) || !items.length) return;

        const meta = items?.[0]?.fields ?? null;

        const mapped = items
          .map((entry: any) => {
            const fields = entry?.fields ?? {};

            console.log("Fields:", fields); // DEBUG

            const rawImage = fields?.image;
            const image = contentfulAssetUrl(rawImage);

            // 🔥 SAFE slug fallback
            const slug =
              fields?.slug ||
              fields?.title
                ?.toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "");

            return {
              title: fields?.title ?? "Untitled Project",
              category: fields?.category ?? "General",
              image: image ?? "/fallback.jpg", // fallback image
              slug: slug ?? "",
            };
          })
          .filter((item) => item.image); // remove broken ones only

        if (!cancelled) {
          setSectionMeta(meta);
          setPortfolioProjects(mapped);
        }
      } catch (error) {
        console.error("Failed to load portfolio:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm">
  Featured Work
</span>

<h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
  Excellence in Every Project
</h2>

<p className="text-xl text-gray-600 max-w-2xl mx-auto">
  Crafted with precision, delivered with speed
</p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading projects...</p>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer hover:-translate-y-2 hover:scale-[1.02] transition"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl">

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="text-white w-full">
                        <p className="text-xs text-gray-300 mb-1">
                          {project.category}
                        </p>
                        <p className="font-medium">
                          {project.title}
                        </p>
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (project.slug) {
                            navigate(`/portfolio/${project.slug}`);
                          }
                        }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:scale-110 transition"
                      >
                        <Expand className="w-5 h-5" />
                      </button>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
