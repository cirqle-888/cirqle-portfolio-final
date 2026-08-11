import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const projects = [
  {
    title: "Supermarket Campaign",
    category: "Promotional Design",
    image:
      "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=600",
    href: "/highlights/supermarket-campaign",
  },
  {
    title: "Event Branding",
    category: "Brand Experience",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGJyYW5kaW5nfGVufDF8fHx8MTc2MzE5Mjg0OXww&ixlib=rb-4.1.0&q=80&w=600",
    href: "/services/event-branding",
  },
  {
    title: "Brand Identity",
    category: "Visual System",
    image:
      "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc2MzEwMDQ3OXww&ixlib=rb-4.1.0&q=80&w=600",
    href: "/services/brand-identity",
  },
  {
    title: "UI/UX Design",
    category: "Digital Experience",
    image:
      "https://images.unsplash.com/photo-1676793894040-b6dd72276620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwdWl8ZW58MXx8fHwxNzYzMTkyODQ5fDA&ixlib=rb-4.1.0&q=80&w=600",
    href: "/services/ui-ux-design",
  },
  {
    title: "Marketing Pack",
    category: "Product Design",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBtYXRlcmlhbHxlbnwxfHx8fDE3NjMxOTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=600",
    href: "/products/marketing-pack",
  },
  {
    title: "Social Media Kit",
    category: "Digital Creatives",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
    href: "/services",
  },
];

export type Project = {
  title: string;
  category: string;
  image: string;
  href: string;
};

interface ShowcaseGridProps {
  items?: Project[];
  headingTag?: "h1" | "h2";
}

export function ShowcaseGrid({ items, headingTag = "h2" }: ShowcaseGridProps = {}) {
  const Heading = headingTag;
  const shown = items ?? projects;

  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm">Featured Work</span>
          </div>

          <Heading className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Work we're proud of
          </Heading>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A snapshot of what we make — tap any tile to explore
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shown.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={project.href}
                aria-label={`${project.title} — ${project.category}`}
                className="group block hover:-translate-y-2 transition-transform duration-300 transform-gpu rounded-2xl"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                      <div className="text-white relative z-10 w-full">
                        <p className="text-xs text-gray-300 mb-1">{project.category}</p>
                        <p className="font-medium drop-shadow-md">{project.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
