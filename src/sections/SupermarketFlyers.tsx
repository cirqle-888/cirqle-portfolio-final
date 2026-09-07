import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "../components/ui/button";
import { getSupermarketFlyers, groupFlyers, type Flyer, type FlyerGroup } from "../services/flyerService";
import { useNavigate } from "react-router-dom";

// The flip-book reader (react-pageflip) is heavy — load it only when a flyer is opened.
const BrochureReader = lazy(() =>
  import("../components/ui/BrochureReader").then((m) => ({ default: m.BrochureReader }))
);

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

/**
 * Deterministic pseudo-random in [-1, 1] from an integer seed.
 *
 * The scatter has to be identical on every render — Math.random() would
 * re-tilt every sheet on each re-render, and the whole shelf would twitch.
 */
function jitter(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

/**
 * How one sheet behaves, fixed by its position in the list.
 *
 * The point is that no two sheets are alike: some have a corner turned up and
 * some lie flat, some drop almost straight while others swing further before
 * they settle. A shelf where every sheet falls the same way stops reading as
 * paper within about two seconds.
 */
function paperOf(seed: number) {
  const r = jitter(seed + 1);
  const r2 = jitter(seed + 17);
  const r3 = jitter(seed + 41);

  // Around two sheets in five have a turned corner, and which corner varies.
  // Many more than that and the fold stops reading as an accident of handling.
  // The offset is chosen, not arbitrary: it is the one that lands about two in
  // five over the first dozen sheets without ever folding three in a row.
  const foldRoll = (jitter(seed + 36) + 1) / 2;
  const fold = foldRoll > 0.62 ? (r > 0 ? "br" : "bl") : null;

  return {
    fold,
    /** Turned corners are not all the same size either. */
    foldSize: Math.round(34 + Math.abs(r3) * 24),
    /** Resting tilt. Small — paper on a desk, not a scrapbook. */
    rest: r * 2.6,
    /** How far it swings sideways on the way down. */
    swing: r2 * 26,
    /** A heavy sheet drops; a light one takes its time and flutters. */
    fall: 0.95 + Math.abs(r3) * 0.75,
  } as const;
}

export function SupermarketFlyers({ limit }: SupermarketFlyersProps = {}) {
  const [flyers, setFlyers] = useState<Flyer[]>(FALLBACK_FLYERS);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

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

        <div className="flyer-shelf mb-14">
          {groups.map((group, i) => (
            <FlyerPiece
              key={group.startIndex}
              group={group}
              index={i}
              reduceMotion={!!reduceMotion}
              onOpen={() => setActiveIndex(group.startIndex)}
            />
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
 * One thing on the shelf: a single sheet, or a booklet shown as an open spread.
 *
 * Two nested motion elements on purpose. The outer one owns the entrance — the
 * sheet falls in and settles — and the inner one owns the endless drift.
 * Putting both on one element would mean `animate` fighting `whileInView` for
 * the same transform, and the sheet would snap instead of settling.
 */
function FlyerPiece({
  group, index, reduceMotion, onOpen,
}: {
  group: FlyerGroup;
  index: number;
  reduceMotion: boolean;
  onOpen: () => void;
}) {
  const isBooklet = group.pages.length > 1;
  const paper = paperOf(group.startIndex);
  const cover = group.pages[0];

  // Sheets are dropped one after another rather than all at once, and the wait
  // is capped so a long shelf does not keep the reader waiting on the last row.
  const delay = Math.min(index * 0.11, 1);
  const driftDuration = 7 + jitter(index + 31) * 2;

  // Falling paper does not travel in a straight line: it is caught, pushed
  // sideways, over-rotates, then settles. Three keyframes are enough to read
  // as that, and cheap enough to run on a dozen sheets at once.
  const fall = reduceMotion
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.4, delay: delay / 2 },
      }
    : {
        initial: {
          opacity: 0,
          y: -170,
          x: paper.swing,
          rotate: paper.rest + paper.swing * 0.5,
          scale: 0.95,
        },
        whileInView: {
          opacity: [0, 1, 1],
          y: [-170, -26, 0],
          x: [paper.swing, -paper.swing * 0.45, 0],
          rotate: [paper.rest + paper.swing * 0.5, paper.rest - paper.swing * 0.2, paper.rest],
          scale: [0.95, 1.01, 1],
        },
        transition: {
          duration: paper.fall,
          delay,
          ease: [0.28, 0.9, 0.34, 1] as [number, number, number, number],
          times: [0, 0.62, 1],
        },
      };

  const foldClass = paper.fold ? ` flyer-paper--fold-${paper.fold}` : "";

  return (
    <motion.div
      className={isBooklet ? "flyer-piece flyer-piece--booklet" : "flyer-piece"}
      initial={fall.initial}
      whileInView={fall.whileInView}
      viewport={{ once: true, margin: "-40px" }}
      transition={fall.transition}
    >
      <motion.div
        // Once landed, the sheet never goes completely still — but the drift
        // stays under half a degree, which reads as paper settling rather than
        // as an animation asking for attention.
        animate={reduceMotion ? undefined : { y: [0, -4, 0], rotate: [0, 0.4, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: driftDuration, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }
        }
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={
            isBooklet
              ? `Open this ${group.pages.length}-page booklet in the brochure viewer`
              : `Open supermarket flyer ${index + 1} in the brochure viewer`
          }
          className={`flyer-paper group${foldClass}`}
          style={{ ["--fold" as string]: `${paper.foldSize}px` }}
        >
          <span className="flyer-sheet">
            {isBooklet ? (
              <span className="flyer-spread">
                <span className="flyer-leaf flyer-leaf--left">
                  <img
                    src={cover.src}
                    srcSet={cover.srcset || undefined}
                    sizes="(min-width: 1024px) 28vw, 45vw"
                    alt={cover.title || "Supermarket campaign flyer"}
                    width={cover.width}
                    height={cover.height}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </span>
                <span className="flyer-leaf flyer-leaf--right">
                  <img
                    src={group.pages[1].src}
                    srcSet={group.pages[1].srcset || undefined}
                    sizes="(min-width: 1024px) 28vw, 45vw"
                    alt={group.pages[1].title || "Supermarket campaign flyer, inside page"}
                    width={group.pages[1].width}
                    height={group.pages[1].height}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </span>
                <span aria-hidden className="flyer-spine" />
              </span>
            ) : (
              <span className="flyer-leaf">
                <img
                  src={cover.src}
                  srcSet={cover.srcset || undefined}
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
                  alt={cover.title || `Supermarket campaign flyer ${index + 1}`}
                  width={cover.width}
                  height={cover.height}
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                />
              </span>
            )}

            {/* Shading the fold casts back onto the page, and a sheen that
                sweeps across on hover — the one thing that says "this is paper
                you can pick up" without adding chrome. */}
            {paper.fold && <span aria-hidden className="flyer-fold-shade" />}
            <span aria-hidden className="flyer-sheen" />
          </span>

          {/* Outside the clipped page on purpose: this IS the corner that was
              cut away, turned over to show the blank back of the sheet. */}
          {paper.fold && <span aria-hidden className="flyer-fold" />}

          {group.pages.length > 2 && (
            <span className="flyer-badge">{group.pages.length} pages</span>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
