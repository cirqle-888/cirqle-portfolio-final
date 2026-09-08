import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useWork } from "../lib/work";
import { getSupermarketFlyers, type Flyer } from "../services/flyerService";

export type Project = {
  title: string;
  category: string;
  image: string;
  /** Renditions, when the tile comes from real published work. */
  srcset?: string;
  /** Short form for the jump chips; falls back to the category. */
  chip?: string;
  href: string;
};

interface ShowcaseGridProps {
  items?: Project[];
  headingTag?: "h1" | "h2";
  /**
   * Set false where the real portfolio sections follow immediately. The
   * portfolio page keeps the heading and the jump chips, but a grid of covers
   * directly above the same work read as the page saying everything twice.
   */
  showTiles?: boolean;
}

export function ShowcaseGrid({ items, headingTag = "h2", showTiles = true }: ShowcaseGridProps = {}) {
  const Heading = headingTag;
  const { collections } = useWork();
  const [flyers, setFlyers] = useState<Flyer[]>([]);

  // Fetched even where the tiles are hidden: the chips are built from the same
  // work, and a portfolio page missing its Flyers chip would be odd.
  useEffect(() => {
    let cancelled = false;
    getSupermarketFlyers()
      .then((rows) => { if (!cancelled) setFlyers(rows); })
      .catch((err) => console.error("Could not load flyers for the showcase:", err));
    return () => { cancelled = true; };
  }, []);

  /**
   * Only work that exists.
   *
   * This section used to carry a tile for every service, illustrated with
   * stock photography where nothing had been published. That is a promise the
   * page cannot keep: a visitor clicking "Event Branding" arrived at a sales
   * page with no work behind it. A kind of work earns its tile by having
   * something published, and gains one the moment it does.
   */
  const shown = useMemo(() => {
    if (items) return items;

    const live: Project[] = [];

    const flyer = flyers[0];
    if (flyer) {
      live.push({
        title: "Supermarket Campaigns",
        category: "Promotional Design",
        chip: "Flyers",
        image: flyer.src,
        srcset: flyer.srcset,
        href: "/portfolio#supermarket-flyers",
      });
    }

    for (const collection of collections) {
      const cover = collection.items[0];
      if (!cover) continue;
      live.push({
        title: collection.title,
        category: collection.eyebrow,
        image: cover.src,
        srcset: cover.srcset,
        href: `/portfolio/${collection.slug}`,
      });
    }

    return live;
  }, [items, collections, flyers]);

  // The chips follow the same rule, and are built from the same work, so the
  // two can never drift into offering different things.
  const chips = useMemo(
    () => shown.map((tile) => ({ label: tile.chip ?? tile.category, href: tile.href })),
    [shown],
  );

  return (
    // Without the tiles this is a page header, not a section: the work it
    // introduces starts immediately below, so it keeps its top air and gives
    // most of the bottom back.
    <section className={`px-6 bg-white ${showTiles ? "py-28" : "pt-28 pb-4"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className={showTiles ? "text-center mb-20" : "text-center"}
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm">Featured Work</span>
          </div>

          <Heading className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Work we're proud of
          </Heading>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {showTiles
              ? "A snapshot of what we make — tap any tile to explore"
              : "Everything we have published, by the kind of work it is"}
          </p>

          {/* Jump straight to a kind of work. */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {chips.map((chip) => (
              <Link
                key={chip.label}
                to={chip.href}
                className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:text-black transition-colors"
                style={{ background: "var(--c-surface-raised)" }}
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {showTiles && shown.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shown.map((project, index) => (
              <motion.div
                key={`${project.href}-${project.title}`}
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
                        srcSet={project.srcset || undefined}
                        sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
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
        )}
      </div>
    </section>
  );
}
