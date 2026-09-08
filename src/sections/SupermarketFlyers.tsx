import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { getSupermarketFlyers, groupFlyers, type Flyer, type FlyerGroup } from "../services/flyerService";
import "../styles/flyers.css";

// The flip-book reader is heavy — it loads when a flyer is actually opened.
const BrochureReader = lazy(() =>
  import("../components/ui/BrochureReader").then((m) => ({ default: m.BrochureReader }))
);

interface SupermarketFlyersProps {
  limit?: number;
}

// Shown until the real flyers arrive, and if the project is unreachable.
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

/**
 * The flyers, as printed sheets.
 *
 * The artwork is drawn by the browser's own image pipeline and nothing is
 * placed over it: these are offer sheets, where a colour is a decision someone
 * signed off, and a canvas or a gloss layer changes it. The three-dimensional
 * part is entirely geometry and shadow around the picture — see
 * styles/flyers.css.
 */
export function SupermarketFlyers({ limit }: SupermarketFlyersProps = {}) {
  const [flyers, setFlyers] = useState<Flyer[]>(FALLBACK_FLYERS);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    getSupermarketFlyers()
      .then((rows) => {
        if (cancelled) return;
        if (rows.length > 0) setFlyers(rows);
      })
      .catch((err) => console.error("Error fetching supermarket flyers:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  // Fold pages into brochures BEFORE limiting, or a limit could cut a spread
  // in half and show one page of a two-page piece.
  const groups = useMemo(() => {
    const all = groupFlyers(flyers);
    return limit && limit > 0 ? all.slice(0, limit) : all;
  }, [flyers, limit]);

  return (
    <section id="supermarket-flyers" className="py-28 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
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

        <div className="sf-grid">
          {groups.map((group, i) => (
            <FlyerSheet
              key={group.startIndex}
              group={group}
              index={i}
              onOpen={() => setActiveIndex(group.startIndex)}
            />
          ))}
        </div>

        {limit !== undefined && (
          <div className="text-center mt-6">
            <Button
              size="lg"
              onClick={() => navigate("/portfolio#supermarket-flyers")}
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

/**
 * Deterministic pseudo-random in [-1, 1].
 *
 * Seeded by the flyer's place in the list rather than by Math.random(), so a
 * sheet keeps the angle it landed at instead of re-rolling on every render —
 * which would have the whole table twitch whenever anything else changed.
 */
function jitter(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

/** How one sheet sits, and how it breathes. */
function poseOf(seed: number) {
  const a = jitter(seed + 1);
  const b = jitter(seed + 13);
  const c = jitter(seed + 29);

  return {
    /** Tipped back, but not all by the same amount. */
    rx: 4.5 + a * 2.5,
    /** Turned away from the viewer — sometimes left, sometimes right. */
    ry: b * 15,
    /** A degree or so of lie, which is what stops a grid looking set out. */
    rz: c * 1.4,
    /** Curled corner: which one, and how far it has lifted. */
    curlCorner: b > 0 ? "br" : "bl",
    curl: Math.round(26 + Math.abs(c) * 22),
    /** Slow, and no two sheets on the same clock. */
    drift: (8 + Math.abs(a) * 5).toFixed(1),
    driftDelay: (Math.abs(b) * 4).toFixed(1),
    driftTilt: (0.15 + Math.abs(c) * 0.3).toFixed(2),
  } as const;
}

/** One sheet, or one open brochure. */
function FlyerSheet({
  group, index, onOpen,
}: {
  group: FlyerGroup;
  index: number;
  onOpen: () => void;
}) {
  const pages = group.pages;
  const spread = pages.length > 1;
  const pose = poseOf(group.startIndex);

  return (
    <motion.button
      type="button"
      className={[
        "sf-item",
        spread ? "sf-item--spread" : `sf-item--curl-${pose.curlCorner}`,
      ].join(" ")}
      style={
        {
          "--rx": `${pose.rx.toFixed(2)}deg`,
          "--ry": `${pose.ry.toFixed(2)}deg`,
          "--rz": `${pose.rz.toFixed(2)}deg`,
          "--curl": `${pose.curl}px`,
          "--drift": `${pose.drift}s`,
          "--drift-delay": `${pose.driftDelay}s`,
          "--drift-tilt": `${pose.driftTilt}deg`,
        } as React.CSSProperties
      }
      onClick={onOpen}
      aria-label={
        spread
          ? `Open the ${pages.length}-page brochure ${index + 1}`
          : `Open supermarket flyer ${index + 1}`
      }
      // Sheets arrive one after another as the section comes into view, close
      // enough together to read as one movement rather than as a queue.
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay: Math.min(index * 0.07, 0.6), ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="sf-float">
        <span className={spread ? "sf-paper sf-spread" : "sf-paper"}>
          {spread ? (
            <>
              <span className="sf-half sf-half--left">
                <PageFace page={pages[0]} eager={index < 3} />
                <span aria-hidden className="sf-gutter" />
              </span>
              <span className="sf-half sf-half--right">
                <PageFace page={pages[1]} eager={index < 3} />
                <span aria-hidden className="sf-gutter" />
              </span>
            </>
          ) : (
            <>
              {/* Behind the printed side: the rest of the stack, giving the
                  sheet an edge to show at this angle. */}
              <span aria-hidden className="sf-leaf sf-leaf--1" />
              <span aria-hidden className="sf-leaf sf-leaf--2" />
              <span aria-hidden className="sf-leaf sf-leaf--3" />
              <PageFace page={pages[0]} eager={index < 3} />
              {/* Drawn after the face, over the corner the face gave up. */}
              <span aria-hidden className="sf-curl-shade" />
              <span aria-hidden className="sf-curl" />
            </>
          )}

          <span aria-hidden className="sf-shadow" />
        </span>
      </span>
    </motion.button>
  );
}

function PageFace({ page, eager }: { page: Flyer; eager: boolean }) {
  return (
    <img
      className="sf-face"
      src={page.src}
      srcSet={page.srcset || undefined}
      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
      alt={page.title || "Supermarket campaign flyer"}
      width={page.width}
      height={page.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
