import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "../components/ui/button";
import { getSupermarketFlyers, groupFlyers, type Flyer } from "../services/flyerService";
import { useNavigate } from "react-router-dom";

// The flip-book reader (react-pageflip) is heavy — load it only when a flyer is opened.
const BrochureReader = lazy(() =>
  import("../components/ui/BrochureReader").then((m) => ({ default: m.BrochureReader }))
);

// So is three.js. It only ever renders this one section, so it is fetched when
// the section is, not with the rest of the site.
const FlyerPaper = lazy(() =>
  import("../components/work/FlyerPaper").then((m) => ({ default: m.FlyerPaper }))
);

/** WebGL can be absent (old device, hardened browser) — then we show stills. */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

interface SupermarketFlyersProps {
  limit?: number;
}

// Shown until real flyers load, and if the project is unreachable.
const FALLBACK_FLYERS: Flyer[] = [
  {
    title: "Sample flyer",
    width: 600,
    height: 800,
    src: "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    srcset: "",
    bookletContinues: false,
  },
];

export function SupermarketFlyers({ limit }: SupermarketFlyersProps = {}) {
  const [flyers, setFlyers] = useState<Flyer[]>(FALLBACK_FLYERS);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  // Checked once, lazily, on first render. This app has no server render, so
  // document is available and an effect would only cost a second pass.
  const [webgl] = useState(hasWebGL);

  useEffect(() => {
    let cancelled = false;

    getSupermarketFlyers()
      .then((rows) => {
        if (cancelled) return;
        if (rows.length > 0) setFlyers(rows);
      })
      .catch((err) => {
        console.error("Error fetching supermarket flyers:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Fold the pages into booklets first, THEN apply the limit — a limit that
  // cut a brochure in half would show a spread missing its other page.
  const groups = useMemo(() => {
    const all = groupFlyers(flyers);
    return limit && limit > 0 ? all.slice(0, limit) : all;
  }, [flyers, limit]);

  return (
    <section
      id="supermarket-flyers"
      className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Light from above, so the sheets read as lying on a surface. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(162,89,255,0.07),transparent_70%)]"
      />

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

        {webgl ? (
          <Suspense fallback={<div className="flyer-stage" />}>
            <FlyerPaper groups={groups} onOpen={setActiveIndex} reduceMotion={!!reduceMotion} />
          </Suspense>
        ) : (
          // No WebGL: the same flyers, flat. Nothing about the section depends
          // on the paper simulation except how good it looks.
          <div className="flyer-fallback mb-14">
            {groups.map((group) => (
              <button
                key={group.startIndex}
                type="button"
                className="flyer-still"
                onClick={() => setActiveIndex(group.startIndex)}
              >
                <img
                  src={group.pages[0].src}
                  srcSet={group.pages[0].srcset || undefined}
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
                  alt={group.pages[0].title || "Supermarket campaign flyer"}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}

        {/* The canvas cannot be tabbed to or read out, so every flyer also has
            a real button here. Off screen, not hidden from assistive tech. */}
        <ul className="flyer-index">
          {groups.map((group, i) => (
            <li key={group.startIndex}>
              <button type="button" onClick={() => setActiveIndex(group.startIndex)}>
                {group.pages.length > 1
                  ? `Open the ${group.pages.length}-page brochure ${i + 1}`
                  : `Open supermarket flyer ${i + 1}`}
              </button>
            </li>
          ))}
        </ul>

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
            images={flyers.map((f) => f.src)}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </Suspense>
      )}
    </section>
  );
}
