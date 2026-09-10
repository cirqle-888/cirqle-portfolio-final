import { useRef, useState } from "react";
import { Play } from "lucide-react";
import type { Chrome, WorkItem } from "../../lib/work";
import { chromeFor, describeItem, formatDuration, srcFor } from "../../lib/work";

interface WorkTileProps {
  item: WorkItem;
  onOpen: () => void;
  /** Force a uniform 4:5 crop (used in the compact preview grid) */
  crop?: boolean;
  /** First screenful loads eagerly; the rest lazily */
  eager?: boolean;
  sizes?: string;
  /**
   * Override the frame the artwork sits in. Normally derived from the item's
   * format; passed explicitly only where the surrounding layout has already
   * committed to a shape — the 4:5 preview grid, for instance, would clip a
   * phone shell.
   */
  chrome?: Chrome;
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
export function WorkTile({
  item,
  onOpen,
  crop = false,
  eager = false,
  sizes,
  chrome: chromeProp,
}: WorkTileProps) {
  // A forced crop has already decided the shape, so a medium frame on top of
  // it would be a phone squashed into a 4:5 box.
  const chrome: Chrome = chromeProp ?? (crop ? "bare" : chromeFor(item.format));
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

  const media = (
    <>
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
    </>
  );

  // A phone is 9:16 whatever the artwork measures — a reel letterboxed into
  // its own natural ratio would defeat the point of the shell. Everything else
  // keeps the artwork's real proportions.
  const frameStyle =
    crop ? undefined : { aspectRatio: chrome === "phone" ? "9 / 16" : `${item.aspect}` };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      className={`work-tile work-tile--${chrome}${crop ? " work-tile--crop" : ""}`}
      aria-label={`${isMotion ? "Play" : "Open"} ${describeItem(item)}`}
    >
      {/* Social chrome carries the brand itself, so the caption moves under
          the action row and the overlay below is skipped — otherwise the tile
          would say the brand name twice. */}
      {chrome === "post" && (
        <span className="work-post__bar" aria-hidden="true">
          <span className="work-post__avatar">{item.brandName.charAt(0)}</span>
          <span className="work-post__handle">{item.brandName}</span>
        </span>
      )}

      <span className="work-frame" style={frameStyle}>
        {media}
        {chrome === "phone" && <span className="work-phone__pill" aria-hidden="true" />}
        {/* Only what is actually folded. A poster, a menu card and a label all
            print flat, and a crease drawn down one is a defect, not a mockup. */}
        {item.format === "brochure" && <span className="work-paper__fold" aria-hidden="true" />}

        {/* Inside the frame, not the tile: outdoor chrome draws legs below the
            board, and an overlay anchored to the tile would darken those
            instead of the artwork. */}
        {chrome !== "post" && (
          <span className="work-tile__meta">
            <span className="work-tile__brand">{item.brandName}</span>
            {/* Only a caption someone wrote. The title is the uploaded file's
                name — useful for finding the piece in the dashboard, never
                something a visitor should read. */}
            {item.caption && <span className="work-tile__title">{item.caption}</span>}
          </span>
        )}
      </span>

      {/* Two legs under the board. Drawn outside the frame so the artwork is
          never overlapped by them. */}
      {chrome === "outdoor" && <span className="work-board__legs" aria-hidden="true" />}

      {chrome === "post" && (
        <span className="work-post__foot">
          <span className="work-post__actions" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 20.5 3.8 12.3a5 5 0 1 1 7.1-7.1l1.1 1.1 1.1-1.1a5 5 0 1 1 7.1 7.1Z" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.3A8.4 8.4 0 1 1 21 11.5Z" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />
            </svg>
          </span>
          {item.caption && (
            <span className="work-post__caption">
              <b>{item.brandName}</b> {item.caption}
            </span>
          )}
        </span>
      )}
    </button>
  );
}
