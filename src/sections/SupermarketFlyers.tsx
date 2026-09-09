import { Suspense, lazy, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { FlyerPaperMockup } from "./FlyerPaperMockup";
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
 * Existing portfolio images are mapped onto curved paper surfaces. The reader
 * keeps the original images; presentation geometry lives in FlyerPaperMockup.
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

  // Show every published page, preserving the original reader index.
  // The legacy limit prop now only controls the existing portfolio CTA.
  const groups = useMemo(() => groupFlyers(flyers).flatMap(group =>
    group.pages.map((page, offset) => ({ pages: [page], startIndex: group.startIndex + offset }))
  ), [flyers]);

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

/** Stable variation, seeded by the real image URL rather than render timing. */
function paperModel(src: string, index: number) {
  let seed = 2166136261;
  for (const char of src) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619);
  const random = () => {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
  return {
    model: index % 3, bend: 0.55 + random() * 0.35,
    direction: random() > 0.5 ? 1 : -1,
    rx: -4 + random() * 8, ry: -7 + random() * 14,
    rz: (index % 2 ? 1 : -1) * (1.5 + random() * 2.5),
    z: -30 + random() * 55, scale: 0.91 + random() * 0.07,
    phase: random() * Math.PI * 2, duration: 4 + random() * 3,
    drift: 2 + random() * 3,
  };
}

function FlyerField({ groups, paused, onOpen }: {
  groups: FlyerGroup[]; paused: boolean; onOpen: (index: number) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [stopped, setStopped] = useState(false);
  const models = useMemo(() => groups.map((g, i) => paperModel(g.pages[0].src, i)), [groups]);
  const frozen = useRef({ paused, stopped });
  useEffect(() => { frozen.current = { paused, stopped }; }, [paused, stopped]);

  useEffect(() => {
    const field = stage.current;
    if (!field || reduced) return;
    const slots = Array.from(field.querySelectorAll<HTMLElement>(".sf-slot"));
    const sheets = slots.map(slot => slot.querySelector<HTMLButtonElement>(".sf-item")!);
    const states = models.map(() => ({ t: 0, hover: 0 }));
    const visible = new Set<number>();
    const lookup = new Map(slots.map((slot, index) => [slot, index]));
    const phone = window.matchMedia("(max-width: 639px)");
    let frame = 0, last = 0, px = 0, py = 0, mx = 0, my = 0;
    let scrollOffset = 0, previousScroll = window.scrollY;
    const pointer = (event: PointerEvent) => {
      if (phone.matches || event.pointerType !== "mouse") return;
      px = (event.clientX / window.innerWidth - 0.5) * 2;
      py = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const leave = () => { px = 0; py = 0; };
    const scroll = () => {
      scrollOffset = Math.max(-10, Math.min(10, scrollOffset + (window.scrollY - previousScroll) * 0.035));
      previousScroll = window.scrollY;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible.size || document.hidden) { last = 0; return; }
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (!frozen.current.paused && !frozen.current.stopped) {
        mx += (px - mx) * (1 - Math.exp(-dt * 3));
        my += (py - my) * (1 - Math.exp(-dt * 3));
        scrollOffset *= Math.exp(-dt * 1.6);
        // All projects remain visible in normal flow; at most eight animate.
        Array.from(visible).slice(0, 8).forEach(i => {
          const s = states[i], p = models[i], sheet = sheets[i];
          const hovering = sheet.matches(":hover, :focus-visible");
          s.hover += ((hovering ? 1 : 0) - s.hover) * (1 - Math.exp(-dt * 5));
          s.t += dt * (1 - s.hover);
          const power = phone.matches ? 0.3 : 1;
          const settle = -Math.exp(-s.t / p.duration) * (phone.matches ? 12 : 32);
          const wind = Math.sin(s.t * 0.23 + p.phase);
          const x = (wind * p.drift + mx * 2) * power;
          const y = settle + Math.sin(s.t * 0.17 + p.phase) * p.drift * power + scrollOffset * power - s.hover * 5;
          const rx = (p.rx + Math.sin(s.t * 0.19 + p.phase) * 3 + my) * power * (1 - s.hover * 0.65);
          const ry = (p.ry + wind * 3 - mx) * power * (1 - s.hover * 0.65);
          const rz = p.rz * (phone.matches ? 0.6 : 1) + wind * power;
          sheet.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${(p.z * power + s.hover * 12).toFixed(2)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg) scale(${p.scale})`;
        });
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (visible.size && !document.hidden && !frame) { last = 0; frame = requestAnimationFrame(tick); }
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; last = 0; }
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const i = lookup.get(entry.target as HTMLElement)!;
        if (entry.isIntersecting) visible.add(i); else visible.delete(i);
      }
      if (visible.size) start();
      else { cancelAnimationFrame(frame); frame = 0; last = 0; }
    }, { threshold: 0.05 });
    slots.forEach(slot => observer.observe(slot));
    field.addEventListener("pointermove", pointer, { passive: true });
    field.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", start);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      field.removeEventListener("pointermove", pointer); field.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll); document.removeEventListener("visibilitychange", start);
      sheets.forEach(sheet => sheet.style.removeProperty("transform"));
    };
  }, [models, reduced]);

  return (
    <>
      {!reduced && <div className="sf-controls">
        <button type="button" onClick={() => setStopped(!stopped)} aria-pressed={stopped}>
          {stopped ? "Resume motion" : "Pause motion"}
        </button>
      </div>}
      <div ref={stage} className="sf-field" aria-label="All supermarket flyers">
        {groups.map((group, i) => (
          <div className="sf-slot" key={group.startIndex}>
            <FlyerSheet group={group} model={models[i]} onOpen={() => onOpen(group.startIndex)} />
          </div>
        ))}
      </div>
    </>
  );
}

function FlyerSheet({ group, model: p, onOpen }: {
  group: FlyerGroup; model: ReturnType<typeof paperModel>; onOpen: () => void;
}) {
  const page = group.pages[0];
  return (
    <button type="button" className="sf-item" data-model={p.model}
      style={{
        "--rx": `${p.rx}deg`, "--ry": `${p.ry}deg`, "--rz": `${p.rz}deg`,
        "--z": `${p.z}px`, "--scale": p.scale,
      } as CSSProperties}
      aria-label={`Open ${page.title || "supermarket flyer"}`} onClick={onOpen}>
      <FlyerPaperMockup page={page} shape={p.model} bend={p.bend} direction={p.direction} />
    </button>
  );
}
