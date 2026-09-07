import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { WorkTile } from "./WorkTile";
import { FormatIcon } from "./FormatIcon";
import { WorkLightbox } from "./WorkLightbox";
import { FORMAT_LABEL, FORMATS, type WorkBrand, type WorkFormat, type WorkItem } from "../../lib/work";

/**
 * How many masonry columns are on screen right now.
 *
 * The layout used to be CSS multi-column (`columns: 4`), which fills
 * COLUMN-BY-COLUMN: with 16 tiles the first column held creatives 1-4, the
 * second 5-8, and so on — so reading the grid left-to-right showed 1, 5, 9,
 * 13 and the order set in the dashboard looked scrambled. Distributing the
 * items across real columns in JS is the only way to keep the staggered
 * masonry look while reading in the authored order, and that needs the live
 * column count here.
 */
function useColumnCount(max: number): number {
  const read = () => {
    if (typeof window === "undefined") return Math.min(4, max);
    const w = window.innerWidth;
    const base = w >= 1024 ? 4 : w >= 640 ? 3 : 2;
    return Math.max(1, Math.min(base, max));
  };
  const [cols, setCols] = useState(read);
  useEffect(() => {
    const onResize = () => setCols(read());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [max]);
  return cols;
}

interface WorkGalleryProps {
  items: WorkItem[];
  /** When given, renders brand filter chips above the grid */
  brands?: WorkBrand[];
  /** Base path for shareable single-creative links */
  shareBase: string;
  /** Path prefix used when a brand chip is selected (collection page only) */
  brandLinkBase?: string;
}

/**
 * Masonry gallery with optional brand filtering and a full-screen lightbox.
 *
 * Deep links are driven by the query string so any view can be pasted to a
 * client:  ?brand=cell-world  filters,  ?v=<slug>  opens that creative.
 */
export function WorkGallery({ items, brands, shareBase, brandLinkBase }: WorkGalleryProps) {
  const [params, setParams] = useSearchParams();
  const brandParam = params.get("brand");
  const viewParam = params.get("v");

  const formatParam = params.get("format");

  const activeBrand = brands?.find((b) => b.slug === brandParam);
  const activeFormat = FORMATS.find((f) => f === formatParam);

  // Brand and format are independent axes — a Roots Bahrain story is reachable
  // from either chip row, and from both together.
  const byBrand = useMemo(
    () => (activeBrand ? items.filter((i) => i.brandSlug === activeBrand.slug) : items),
    [items, activeBrand]
  );
  const shown = useMemo(
    () => (activeFormat ? byBrand.filter((i) => i.format === activeFormat) : byBrand),
    [byBrand, activeFormat]
  );

  // The counts are not shown any more, but they still decide WHICH formats are
  // offered: a chip for a format with nothing in it is a dead end.
  const formatCounts = useMemo(() => {
    const counts = new Map<WorkFormat, number>();
    for (const item of byBrand) counts.set(item.format, (counts.get(item.format) ?? 0) + 1);
    return FORMATS.filter((f) => counts.has(f)).map((f) => ({ format: f, count: counts.get(f)! }));
  }, [byBrand]);

  // The open creative lives in the URL (?v=<slug>) rather than in local state,
  // so every view is directly shareable and nothing has to be synced.
  const index = useMemo(() => {
    if (!viewParam) return null;
    const i = shown.findIndex((it) => it.slug === viewParam);
    return i === -1 ? null : i;
  }, [viewParam, shown]);

  const setIndex = (i: number | null) => {
    const next = new URLSearchParams(params);
    if (i === null) next.delete("v");
    else next.set("v", shown[i].slug);
    setParams(next, { replace: true });
  };

  const setBrand = (slug: string | null) => {
    const next = new URLSearchParams(params);
    if (slug) next.set("brand", slug);
    else next.delete("brand");
    // The chosen format may not exist inside the new brand, which would show an
    // empty gallery with both chips lit. Dropping it is the kinder default.
    const pool = slug ? items.filter((i) => i.brandSlug === slug) : items;
    if (activeFormat && !pool.some((i) => i.format === activeFormat)) next.delete("format");
    next.delete("v");
    setParams(next, { replace: true });
  };

  const setFormat = (format: WorkFormat | null) => {
    const next = new URLSearchParams(params);
    if (format) next.set("format", format);
    else next.delete("format");
    next.delete("v");
    setParams(next, { replace: true });
  };

  if (!items.length) {
    return (
      <div className="work-empty">
        <p>No work published in this collection yet.</p>
      </div>
    );
  }

  const maxColumns = Math.min(shown.length, 4);
  const columnCount = useColumnCount(maxColumns);

  // Round-robin, so tile n lands in column n % columnCount. Reading across the
  // top row gives creatives 1, 2, 3, 4 — the dashboard order — while each
  // column still flows at its own height.
  const columns = useMemo(() => {
    const cols: { item: WorkItem; index: number }[][] = Array.from(
      { length: columnCount },
      () => []
    );
    shown.forEach((item, index) => cols[index % columnCount].push({ item, index }));
    return cols;
  }, [shown, columnCount]);

  return (
    <>
      {brands && brands.length > 1 && (
        <div className="work-filter" role="group" aria-label="Filter by brand">
          <button
            type="button"
            className="work-chip"
            aria-pressed={!activeBrand}
            onClick={() => setBrand(null)}
          >
            All
          </button>
          {brands.map((b) => (
            <button
              key={b.slug}
              type="button"
              className="work-chip"
              aria-pressed={activeBrand?.slug === b.slug}
              onClick={() => setBrand(b.slug)}
            >
              {/* A logo replaces the name visually only: the alt text carries
                  it, so the chip still reads as the brand to a screen reader
                  and to a search engine. */}
              {b.logo ? (
                // Two layers in one fixed-size box. The span paints the logo's
                // own alpha channel in currentColor — one flat colour that
                // follows the chip in light and dark alike — and the real
                // image fades in over it on hover. The <img> is always in the
                // DOM, transparent rather than absent, so the brand name is
                // still announced and indexed.
                <span
                  className="work-chip__logo"
                  style={{ ["--logo" as string]: `url(${JSON.stringify(b.logo)})` }}
                >
                  <span aria-hidden className="work-chip__logo-mono" />
                  <img
                    className="work-chip__logo-colour"
                    src={b.logo}
                    alt={b.name}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              ) : (
                b.name
              )}
            </button>
          ))}
        </div>
      )}

      {formatCounts.length > 1 && (
        <div className="work-filter work-filter--format" role="group" aria-label="Filter by format">
          <button
            type="button"
            className="work-chip work-chip--format"
            aria-pressed={!activeFormat}
            onClick={() => setFormat(null)}
          >
            <FormatIcon format="all" />
            <span className="work-chip__label">All formats</span>
          </button>
          {formatCounts.map(({ format }) => (
            <button
              key={format}
              type="button"
              className="work-chip work-chip--format"
              aria-pressed={activeFormat === format}
              onClick={() => setFormat(format)}
            >
              <FormatIcon format={format} />
              {/* The label is always in the DOM — clipped to nothing until the
                  chip is pointed at or chosen — so the filter still has a real
                  name for a screen reader and for search, and the reveal is a
                  width animation rather than an appearance. */}
              <span className="work-chip__label">{FORMAT_LABEL[format]}</span>
            </button>
          ))}
        </div>
      )}

      {activeBrand && brandLinkBase && (
        <p className="work-active">
          <span>
            Showing {shown.length} {shown.length === 1 ? "creative" : "creatives"} for{" "}
            {activeBrand.name}
            {activeFormat ? ` · ${FORMAT_LABEL[activeFormat].toLowerCase()}` : ""}
          </span>
          <a href={`${brandLinkBase}/${activeBrand.slug}`}>Open its own page →</a>
        </p>
      )}

      <div className="work-masonry" data-max={maxColumns}>
        {columns.map((col, c) => (
          <div className="work-masonry__col" key={c}>
            {col.map(({ item, index }) => (
              <WorkTile
                key={item.id}
                item={item}
                onOpen={() => setIndex(index)}
                eager={index < 4}
              />
            ))}
          </div>
        ))}
      </div>

      <WorkLightbox items={shown} index={index} setIndex={setIndex} shareBase={shareBase} />
    </>
  );
}
