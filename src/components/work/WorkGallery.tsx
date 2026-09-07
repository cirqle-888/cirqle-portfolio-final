import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { WorkTile } from "./WorkTile";
import { WorkLightbox } from "./WorkLightbox";
import type { WorkBrand, WorkItem } from "../../lib/work";

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

  const activeBrand = brands?.find((b) => b.slug === brandParam);
  const shown = useMemo(
    () => (activeBrand ? items.filter((i) => i.brandSlug === activeBrand.slug) : items),
    [items, activeBrand]
  );

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
            <span className="work-chip__count">{items.length}</span>
          </button>
          {brands.map((b) => (
            <button
              key={b.slug}
              type="button"
              className="work-chip"
              aria-pressed={activeBrand?.slug === b.slug}
              onClick={() => setBrand(b.slug)}
            >
              {b.name}
              <span className="work-chip__count">{b.items.length}</span>
            </button>
          ))}
        </div>
      )}

      {activeBrand && brandLinkBase && (
        <p className="work-active">
          <span>
            Showing {activeBrand.items.length}{" "}
            {activeBrand.items.length === 1 ? "creative" : "creatives"} for {activeBrand.name}
          </span>
          <a href={`${brandLinkBase}/${activeBrand.slug}`}>Open its own page →</a>
        </p>
      )}

      <div className="work-masonry" data-max={maxColumns}>
        {shown.map((item, i) => (
          <WorkTile key={item.id} item={item} onOpen={() => setIndex(i)} eager={i < 4} />
        ))}
      </div>

      <WorkLightbox items={shown} index={index} setIndex={setIndex} shareBase={shareBase} />
    </>
  );
}
