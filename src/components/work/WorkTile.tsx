import { useRef, useState } from "react";
import { Play } from "lucide-react";
import type { WorkItem } from "../../lib/work";
import { describeItem, formatDuration, srcFor } from "../../lib/work";

interface WorkTileProps {
  item: WorkItem;
  onOpen: () => void;
  /** Force a uniform 4:5 crop (used in the compact preview grid) */
  crop?: boolean;
  /** First screenful loads eagerly; the rest lazily */
  eager?: boolean;
  sizes?: string;
}

/** Pointer that can actually hover, and a viewer who wants motion. */
function wantsHoverPreview(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * One entry in the gallery. Stills keep their natural ratio; anything that
 * moves gets a play badge, and if it has a clip attached that clip plays
 * silently on hover — the same tease Instagram and YouTube use.
 */
export function WorkTile({ item, onOpen, crop = false, eager = false, sizes }: WorkTileProps) {
  const isMotion = item.kind !== "image";
  // A reel's clip is a short preview, so its length is not the reel's length —
  // showing it would misstate how long the real thing runs.
  const duration = item.kind === "video" ? formatDuration(item.durationSeconds) : null;
  const videoRef = useRef<HTMLVideoElement>(null);
  // The clip is only fetched once someone hovers, so a page of reels does not
  // pull megabytes nobody asked for.
  const [previewArmed, setPreviewArmed] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const canPreview = Boolean(item.videoUrl);

  const startPreview = () => {
    if (!canPreview || !wantsHoverPreview()) return;
    setPreviewArmed(true);
    setPreviewing(true);
    // The element may not exist on the very first hover; play() is retried by
    // autoPlay once it mounts.
    videoRef.current?.play().catch(() => {});
  };

  const stopPreview = () => {
    setPreviewing(false);
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      className={`work-tile${crop ? " work-tile--crop" : ""}`}
      style={crop ? undefined : { aspectRatio: `${item.aspect}` }}
      aria-label={`${isMotion ? "Play" : "Open"} ${describeItem(item)}`}
    >
      {item.src ? (
        <img
          src={srcFor(item, 960)}
          srcSet={item.srcset}
          sizes={sizes ?? "(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"}
          width={item.width}
          height={item.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          alt={describeItem(item)}
        />
      ) : (
        // A linked reel with no cover still needs a face.
        <span className="work-tile__blank" aria-hidden="true" />
      )}

      {/* The still underneath is already painted, so the poster only covers
          the gap before the first frame — a small rendition is plenty and
          avoids refetching the 2000px one. */}
      {previewArmed && item.videoUrl && (
        <video
          ref={videoRef}
          className={`work-tile__preview${previewing ? " is-playing" : ""}`}
          src={item.videoUrl}
          poster={item.src ? srcFor(item, 480) : undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}

      {isMotion && (
        <span className={`work-tile__play${previewing ? " is-hidden" : ""}`} aria-hidden="true">
          <Play size={18} fill="currentColor" strokeWidth={0} />
        </span>
      )}

      {duration && (
        <span className="work-tile__duration" aria-hidden="true">
          {duration}
        </span>
      )}

      <span className="work-tile__meta">
        <span className="work-tile__brand">{item.brandName}</span>
        {/* Only a caption someone wrote. The title is the uploaded file's
            name — useful for finding the piece in the dashboard, never
            something a visitor should read. */}
        {item.caption && <span className="work-tile__title">{item.caption}</span>}
      </span>
    </button>
  );
}
