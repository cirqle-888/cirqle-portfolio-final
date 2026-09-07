import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { WorkTile } from "../components/work/WorkTile";
import { WorkLightbox } from "../components/work/WorkLightbox";
import { findCollection, useWork } from "../lib/work";

interface WorkPreviewProps {
  /** Which collection to preview (slug in the CMS) */
  collection?: string;
  /** How many creatives to show */
  limit?: number;
  headingTag?: "h1" | "h2";
}

/**
 * Compact preview of a work collection for the home and portfolio pages.
 * Renders nothing until there is work to show, so an empty or unreachable
 * portfolio never leaves a hole in the page.
 */
export function WorkPreview({ collection = "social-media", limit = 8, headingTag = "h2" }: WorkPreviewProps) {
  const Heading = headingTag;
  const { collections, loading } = useWork();
  const [index, setIndex] = useState<number | null>(null);

  const data = findCollection(collections, collection);
  if (loading || !data || !data.items.length) return null;

  const items = data.items.slice(0, limit);

  return (
    // The id follows the collection: the portfolio page now renders more than
    // one of these, and two sections sharing an id break in-page links.
    <section id={`${data.slug}-work`} className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm text-gray-900 font-medium">{data.eyebrow}</span>
          </div>

          <Heading className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">{data.title}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{data.description}</p>

          <div className="work-stats">
            <span>
              {data.items.length} {data.items.length === 1 ? "creative" : "creatives"}
            </span>
            <span>
              {data.brands.length} {data.brands.length === 1 ? "brand" : "brands"}
            </span>
          </div>
        </motion.div>

        <div className="work-preview-grid mb-14">
          {items.map((item, i) => (
            <WorkTile
              key={item.id}
              item={item}
              onOpen={() => setIndex(i)}
              crop
              eager={i < 4}
              sizes="(min-width: 768px) 22vw, 45vw"
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            to={`/portfolio/${data.slug}`}
            className="work-share-btn work-share-btn--primary"
            style={{ height: 48, padding: "0 1.75rem" }}
          >
            See all {data.items.length} {data.title.toLowerCase()}
          </Link>
        </div>
      </div>

      <WorkLightbox items={items} index={index} setIndex={setIndex} shareBase={`/portfolio/${data.slug}`} />
    </section>
  );
}
