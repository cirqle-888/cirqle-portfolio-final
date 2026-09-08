import { Suspense, lazy, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
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
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    getSupermarketFlyers()
      .then((rows) => {
        if (cancelled) return;
        setFlyers(rows);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching supermarket flyers:", err);
        if (!cancelled) setLoading(false);
      });
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
    <section id="supermarket-flyers" className="sf-section py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
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

        {groups.length ? (
          <FlyerField groups={groups} paused={activeIndex !== null} onOpen={setActiveIndex} />
        ) : (
          <div className="sf-empty" role="status" aria-busy={loading}>
            {loading ? "Loading flyers…" : "Flyers are unavailable right now. Please check back shortly."}
          </div>
        )}

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

/** Positions are art-directed; only the small variations are seeded.
 * The central sheet remains readable while peripheral sheets cross the space.
 */
const PLACES = [
  [50, 42, 95, -3], [19, 30, -90, -10], [81, 25, -165, 9],
  [24, 77, -35, 7], [76, 76, 15, -7], [51, 87, -230, 5],
];
const PHONE_PLACES = [[50, 28, 20, -2], [26, 73, -30, -5], [77, 70, -50, 5]];

function FlyerField({ groups, paused, onOpen }: {
  groups: FlyerGroup[]; paused: boolean; onOpen: (index: number) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 639px)").matches);
  const [page, setPage] = useState(0);
  const [stopped, setStopped] = useState(false);
  const size = mobile ? 3 : 6;
  const pageCount = Math.ceil(groups.length / size);
  const currentPage = Math.min(page, pageCount - 1);
  const shown = useMemo(() => groups.slice(currentPage * size, (currentPage + 1) * size),
    [groups, currentPage, size]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => { setMobile(query.matches); setPage(0); };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const field = stage.current;
    if (!field || reduced || stopped || paused) return;
    const sheets = Array.from(field.querySelectorAll<HTMLButtonElement>(".sf-item"));
    const places = mobile ? PHONE_PLACES : PLACES;
    const states = sheets.map((_, i) => ({
      t: 0, y: 0, vy: 0, turn: 0, spin: 0, hover: 0,
      phase: (jitter(shown[i].startIndex + 11) + 1) * Math.PI,
    }));
    let frame = 0, last = 0, visible = false, amount = 0, activity = 0;
    let rect = field.getBoundingClientRect();
    let scroll = 0, px = 0, py = 0, mx = 0, my = 0;
    const measure = () => {
      rect = field.getBoundingClientRect();
      scroll = Math.max(-1, Math.min(1,
        (window.innerHeight / 2 - rect.top - rect.height / 2) / (window.innerHeight / 2 + rect.height / 2)));
    };
    const pointer = (event: PointerEvent) => {
      if (mobile || event.pointerType !== "mouse") return;
      px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const leave = () => { px = 0; py = 0; };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) { last = 0; return; }
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      const ease = 1 - Math.exp(-dt * 2.4);
      activity += (amount - activity) * ease;
      mx += (px - mx) * ease; my += (py - my) * ease;
      sheets.forEach((sheet, i) => {
        const s = states[i], p = places[i];
        const focused = sheet.matches(":hover, :focus-within");
        s.hover += ((focused ? 1 : 0) - s.hover) * (1 - Math.exp(-dt * 6));
        // Damped gravity with a slow, varying air current. No per-frame React
        // state, layout reads, spawning, or timers for individual sheets.
        const step = dt * activity * (1 - s.hover);
        s.t += step;
        const wind = Math.sin(s.t * 0.19 + s.phase) + 0.35 * Math.sin(s.t * 0.071 + s.phase * 2);
        s.vy += (1.6 + jitter(i + 3) * 0.35 - 0.45 * s.vy + wind * 0.18) * step;
        s.y += s.vy * step;
        s.spin += (Math.sin(s.t * 0.23 + s.phase) * 0.3 - s.spin * 0.8) * step;
        s.turn += s.spin * step;
        // Five sheets stay within composition lanes, suspended by air. Only
        // the sixth, distant sheet traverses the boundary; the field never
        // drains to one flyer after a visitor spends a minute here.
        const travel = mobile || i < 5
          ? Math.sin(s.t * 0.08 + s.phase) * (mobile ? 8 : i === 0 ? 16 : 26)
            + (i === 0 ? 0 : Math.min(s.y, mobile ? 5 : 18))
          : s.y;
        const threshold = rect.height * (1 - p[1] / 100) + rect.height * 0.65;
        if (s.y > threshold) { s.y = -rect.height * (p[1] / 100 + 0.65); }
        const strength = mobile ? 0.32 : 1;
        const z = p[2] + Math.sin(s.t * 0.13 + s.phase) * 14 * strength + scroll * 14 * strength;
        const x = wind * 13 * strength + mx * 3 * strength;
        const y = travel + scroll * (i % 2 ? 20 : -14) * strength - s.hover * 7;
        const rx = (3 + Math.sin(s.t * 0.3 + s.phase) * 4 + my) * strength;
        const ry = (Math.sin(s.t * 0.21 + s.phase) * 7 - mx) * strength;
        const rz = p[3] + Math.sin(s.turn) * 3 * strength;
        sheet.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${(z + s.hover * 14).toFixed(2)}px) rotateX(${(rx * (1 - s.hover * 0.65)).toFixed(2)}deg) rotateY(${(ry * (1 - s.hover * 0.7)).toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
        sheet.style.setProperty("--bend", `${(Math.sin(s.t * 0.6 + s.phase) * 0.65 * strength * (1 - s.hover)).toFixed(3)}deg`);
        sheet.style.setProperty("--shadow-opacity", String((0.1 + (z + 240) / 340 * 0.12 + s.hover * 0.035).toFixed(3)));
      });
      frame = requestAnimationFrame(tick);
    };
    const resume = () => {
      if (visible && !document.hidden && !frame) { last = 0; frame = requestAnimationFrame(tick); }
      else if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; last = 0; }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      amount = Math.min(1, entry.intersectionRatio * 2);
      if (!visible) { cancelAnimationFrame(frame); frame = 0; last = 0; }
      else resume();
    }, { threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1] });
    observer.observe(field);
    const resize = new ResizeObserver(measure);
    resize.observe(field);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    field.addEventListener("pointermove", pointer, { passive: true });
    field.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", resume);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect();
      window.removeEventListener("scroll", measure); window.removeEventListener("resize", measure);
      field.removeEventListener("pointermove", pointer); field.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", resume);
      sheets.forEach(sheet => {
        sheet.style.removeProperty("transform");
        sheet.style.removeProperty("--bend");
        sheet.style.removeProperty("--shadow-opacity");
      });
    };
  }, [shown, mobile, reduced, stopped, paused]);

  return (
    <>
      <div ref={stage} className="sf-field" aria-label="Supermarket flyer portfolio">
        {shown.map((group, index) => (
          <FlyerSheet key={group.startIndex} group={group} index={index} mobile={mobile}
            count={shown.length} onOpen={() => onOpen(group.startIndex)} />
        ))}
      </div>
      <div className="sf-controls">
        {!reduced && <button type="button" onClick={() => setStopped(!stopped)} aria-pressed={stopped}>
          {stopped ? "Resume motion" : "Pause motion"}
        </button>}
        {pageCount > 1 && (
          <div className="sf-pagination" aria-label="Flyer sets">
            <button type="button" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>Previous flyers</button>
            <span role="status">{currentPage + 1} / {pageCount}</span>
            <button type="button" disabled={currentPage === pageCount - 1} onClick={() => setPage(currentPage + 1)}>Next flyers</button>
          </div>
        )}
      </div>
    </>
  );
}

function FlyerSheet({ group, index, mobile, count, onOpen }: {
  group: FlyerGroup; index: number; mobile: boolean; count: number; onOpen: () => void;
}) {
  const page = group.pages[0];
  const [failed, setFailed] = useState(false);
  const p = (mobile ? PHONE_PLACES : PLACES)[index];
  const single = count === 1;
  return (
    <button type="button" className="sf-item" data-layer={index === 0 ? "lead" : index === 2 || index === 5 ? "back" : "middle"}
      style={{
        "--x": `${single ? 50 : p[0]}%`, "--y": `${single ? 48 : p[1]}%`,
        "--z": `${p[2]}px`, "--rz": `${p[3]}deg`,
        "--aspect": page.width / page.height,
      } as CSSProperties}
      aria-label={group.pages.length > 1 ? `Open the ${group.pages.length}-page brochure: ${page.title || "Supermarket campaign"}` : `Open ${page.title || "supermarket flyer"}`}
      onClick={onOpen}>
      <span className="sf-paper">
        <span aria-hidden="true" className="sf-shadow" />
        {failed ? <span className="sf-image-error">{page.title || "Supermarket flyer"}<br />Open flyer</span> : (
          <>
            <img className="sf-face" src={page.src} srcSet={page.srcset || undefined}
              sizes="(max-width: 639px) 48vw, (max-width: 1023px) 28vw, 320px"
              alt={page.title || "Supermarket campaign flyer"} width={page.width} height={page.height}
              loading="lazy" decoding="async" onError={() => setFailed(true)} />
            {/* The last 12% of the SAME print flexes less than a degree.
                No canvas, colour filter, artificial artwork or cropped prices. */}
            <span className="sf-flex" aria-hidden="true">
              <img src={page.src} srcSet={page.srcset || undefined}
                sizes="(max-width: 639px) 48vw, (max-width: 1023px) 28vw, 320px"
                alt="" width={page.width} height={page.height} loading="lazy" decoding="async" />
            </span>
          </>
        )}
      </span>
    </button>
  );
}
