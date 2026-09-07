import type { WorkItem } from "../../lib/work";
import { srcFor } from "../../lib/work";

interface WorkTileProps {
  item: WorkItem;
  onOpen: () => void;
  /** Force a uniform 4:5 crop (used in the compact preview grid) */
  crop?: boolean;
  /** First screenful loads eagerly; the rest lazily */
  eager?: boolean;
  sizes?: string;
}

/** One creative in the gallery. Keeps the image's natural ratio unless cropped. */
export function WorkTile({ item, onOpen, crop = false, eager = false, sizes }: WorkTileProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`work-tile${crop ? " work-tile--crop" : ""}`}
      style={crop ? undefined : { aspectRatio: `${item.aspect}` }}
      aria-label={`Open ${item.brandName} — ${item.title}`}
    >
      <img
        src={srcFor(item, 960)}
        srcSet={item.srcset}
        sizes={sizes ?? "(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"}
        width={item.width}
        height={item.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        alt={`${item.brandName} — ${item.title}`}
      />
      <span className="work-tile__meta">
        <span className="work-tile__brand">{item.brandName}</span>
        <span className="work-tile__title">{item.title}</span>
      </span>
    </button>
  );
}
