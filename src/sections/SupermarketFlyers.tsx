import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { contentfulAssetUrl, getSupermarketFlyers } from "../services/contentService";
import { useNavigate } from "react-router-dom";

// The flip-book reader (react-pageflip) is heavy — load it only when a flyer is opened.
const BrochureReader = lazy(() =>
  import("../components/ui/BrochureReader").then((m) => ({ default: m.BrochureReader }))
);

interface SupermarketFlyersProps {
  limit?: number;
}

const FALLBACK_FLYER =
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";

const FALLBACK_FLYERS = [FALLBACK_FLYER];

export function SupermarketFlyers({ limit }: SupermarketFlyersProps = {}) {
  const [flyers, setFlyers] = useState<string[]>(FALLBACK_FLYERS);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const displayFlyers = limit && limit > 0 ? flyers.slice(0, limit) : flyers;

  useEffect(() => {
    let cancelled = false;

    getSupermarketFlyers()
      .then((items) => {
        if (cancelled) return;

        const flyersField = items?.[0]?.fields?.flyers;
        const flyersFromCms = Array.isArray(flyersField)
          ? (flyersField
              .map((asset: any) => {
                if (typeof asset === "string") return asset;
                return contentfulAssetUrl(asset);
              })
              .filter(Boolean) as string[])
          : [];

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

  return (
    <section id="supermarket-flyers" className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm text-gray-900 font-medium">Core Specialty</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Supermarket campaigns,
            <br />
            <span className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
              straight from our portfolio
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real offer flyers we've produced — tap one to flip through it like a printed brochure.
          </p>
        </motion.div>

        {/* Flyer samples */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
          {displayFlyers.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Open supermarket flyer ${i + 1} in brochure viewer`}
                className="group block w-full text-left hover:-translate-y-2 transition-transform duration-300 transform-gpu rounded-2xl"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt={`Supermarket campaign flyer ${i + 1}`}
                      width={600}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {limit !== undefined && (
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => navigate('/portfolio#supermarket-flyers')}
              className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity px-10 py-7 text-lg rounded-full shadow-lg shadow-[#A259FF]/25"
            >
              View Full Portfolio
            </Button>
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <Suspense fallback={null}>
          <BrochureReader
            images={displayFlyers}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </Suspense>
      )}
    </section>
  );
}
