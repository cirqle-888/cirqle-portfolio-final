import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Link2, Download, Check, ExternalLink, Play } from "lucide-react";
import type { WorkItem } from "../../lib/work";
import { describeItem, absoluteUrl, PLATFORM_LABEL, youtubeId } from "../../lib/work";

interface WorkLightboxProps {
  items: WorkItem[];
  index: number | null;
  setIndex: (i: number | null) => void;
  /** Base path used to build the shareable link for a single creative */
  shareBase: string;
}

/**
 * Full-screen viewer. Shows a still, plays a video we host, or embeds/opens a
 * reel that lives on a social platform. Keyboard (arrows / Esc), swipe on
 * touch, plus "Copy link" so one piece can be sent to a client.
 */
export function WorkLightbox({ items, index, setIndex, shareBase }: WorkLightboxProps) {
  // Tracks which creative the "Copied" confirmation belongs to, so moving to
  // another one clears it without an effect.
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const touchX = useRef<number | null>(null);
  const isOpen = index !== null && index >= 0 && index < items.length;
  const item = isOpen ? items[index as number] : undefined;

  const close = useCallback(() => setIndex(null), [setIndex]);
  const prev = useCallback(() => {
    setIndex(index === null ? null : (index - 1 + items.length) % items.length);
  }, [index, items.length, setIndex]);
  const next = useCallback(() => {
    setIndex(index === null ? null : (index + 1) % items.length);
  }, [index, items.length, setIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // Arrow keys belong to the player while a video is focused.
      else if (e.key === "ArrowRight" && !isMediaFocused()) next();
      else if (e.key === "ArrowLeft" && !isMediaFocused()) prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, next, prev]);

  if (!isOpen || !item) return null;

  const copied = copiedId === item.id;
  const shareUrl = absoluteUrl(`${shareBase}?v=${encodeURIComponent(item.slug)}`);
  const embedId = item.externalUrl ? youtubeId(item.externalUrl) : null;
  const platformName = item.platform ? PLATFORM_LABEL[item.platform] : null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      window.prompt("Copy this link", shareUrl);
    }
  };

  // ── The media itself ──────────────────────────────────────────────────────
  let stage: React.ReactNode;
  if (item.videoUrl) {
    // A clip we host plays here whatever its kind. For a linked reel that clip
    // is the preview, and the button below still sends the viewer to the post.
    stage = (
      <div className="work-lb__player" key={item.id}>
        <video
          className="work-lb__media"
          src={item.videoUrl}
          poster={item.src || undefined}
          controls
          autoPlay
          playsInline
          loop
          preload="metadata"
        />
        {item.kind === "reel" && item.externalUrl && (
          <a
            className="work-lb__cta"
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={15} />
            Watch the full reel on {platformName}
          </a>
        )}
      </div>
    );
  } else if (embedId) {
    // YouTube embeds reliably, so it plays without leaving the site.
    stage = (
      <div className="work-lb__embed" key={item.id}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0`}
          title={describeItem(item)}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  } else if (item.externalUrl) {
    // Instagram and the rest refuse to be embedded, so show the thumbnail and
    // hand the viewer over to the platform.
    stage = (
      <a
        key={item.id}
        className="work-lb__link-card"
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.src ? (
          <img className="work-lb__media" src={item.src} alt={describeItem(item)} />
        ) : (
          <span className="work-lb__blank" />
        )}
        <span className="work-lb__overlay">
          <span className="work-lb__play">
            <Play size={26} fill="currentColor" strokeWidth={0} />
          </span>
          <span className="work-lb__overlay-text">Watch on {platformName}</span>
        </span>
      </a>
    );
  } else {
    stage = (
      <img
        key={item.id}
        className="work-lb__media"
        src={item.src}
        srcSet={item.srcset}
        sizes="100vw"
        width={item.width}
        height={item.height}
        alt={describeItem(item)}
      />
    );
  }

  const canDownload = item.kind === "image" && item.src;

  return createPortal(
    <div className="work-lb" role="dialog" aria-modal="true" aria-label={describeItem(item)}>
      <div className="work-lb__bar">
        <span className="work-lb__counter">
          {(index as number) + 1} / {items.length}
        </span>
        <div className="work-lb__actions">
          {/* A hosted video can still point at the post it came from. The
              linked-reel stages carry their own button, so skip it there. */}
          {item.externalUrl && !(item.kind === "reel" && (item.videoUrl || !embedId)) && (
            <a className="work-lb__btn" href={item.externalUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} />
              <span>{platformName}</span>
            </a>
          )}
          <button type="button" className="work-lb__btn" onClick={copyLink}>
            {copied ? <Check size={14} /> : <Link2 size={14} />}
            <span>{copied ? "Copied" : "Copy link"}</span>
          </button>
          {canDownload && (
            <a className="work-lb__btn" href={item.src} download={`${item.brandSlug}-${item.slug}.webp`}>
              <Download size={14} />
              <span>Download</span>
            </a>
          )}
          <button type="button" className="work-lb__btn work-lb__btn--icon" onClick={close} aria-label="Close">
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        className="work-lb__stage"
        onTouchStart={(e) => {
          // Dragging a video's scrubber is a horizontal swipe too; paging away
          // mid-scrub made the player unusable on a phone.
          touchX.current = isPlayerTarget(e.target) ? null : (e.touches[0]?.clientX ?? null);
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX;
          touchX.current = null;
          if (start === null || end === undefined || Math.abs(end - start) < 45) return;
          if (end < start) next();
          else prev();
        }}
      >
        {items.length > 1 && (
          <button type="button" className="work-lb__nav work-lb__nav--prev" onClick={prev} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
        )}

        {stage}

        {items.length > 1 && (
          <button type="button" className="work-lb__nav work-lb__nav--next" onClick={next} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      <div className="work-lb__cap">
        <p className="work-lb__cap-brand">{item.brandName}</p>
        {item.caption && <p className="work-lb__cap-title">{item.caption}</p>}
        <p className="work-lb__hint">{items.length > 1 ? "Swipe or use arrow keys · Esc to close" : "Esc to close"}</p>
      </div>
    </div>,
    document.body
  );
}

/** True when a touch landed on the player itself rather than the backdrop. */
function isPlayerTarget(target: EventTarget | null): boolean {
  return target instanceof Element && !!target.closest("video, iframe");
}

/** True while a video or embed has focus, so arrow keys scrub instead of paging. */
function isMediaFocused(): boolean {
  const el = document.activeElement;
  return !!el && (el.tagName === "VIDEO" || el.tagName === "IFRAME");
}
