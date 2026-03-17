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
      "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9",
    slug: "supermarket-campaign",
  },
  {
    title: "Festival Promo",
    category: "Cultural Design",
    image:
      "https://images.unsplash.com/photo-1553443236-e031f8bb39ae",
    slug: "festival-promo",
  },
  {
    title: "Brand Identity",
    category: "Visual System",
    image:
      "https://images.unsplash.com/photo-1762787863004-767d5d7eac07",
    slug: "brand-identity",
  },
  {
    title: "Digital Experience",
    category: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1676793894040-b6dd72276620",
    slug: "digital-experience",
  },
];

type Project = (typeof projects)[0] & {
  slug?: string;
};

export function HighlightProjects() {
  const [portfolioProjects, setPortfolioProjects] =
    useState<Project[]>(projects);

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
            typeof rawImage === "string"
              ? rawImage
              : contentfulAssetUrl(rawImage) ?? null;

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
    <section className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 rounded-full mb-6 border">
            <span className="text-sm">
              {sectionMeta?.badgeText ?? "Featured Work"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            {sectionMeta?.title ?? "Excellence in Every Project"}
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {sectionMeta?.subtitle ??
              "Crafted with precision, delivered with speed"}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">

                {/* Image */}
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-end p-5">

                    <div className="text-white">
                      <p className="text-xs text-gray-300">
                        {project.category}
                      </p>
                      <p className="font-medium">{project.title}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.slug) {
                          navigate(`/portfolio/${project.slug}`);
                        }
                      }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <Expand className="w-5 h-5 text-white" />
                    </button>

                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
