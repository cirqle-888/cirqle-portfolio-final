import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Link2, Download, Check } from "lucide-react";
import type { WorkItem } from "../../lib/work";
import { absoluteUrl } from "../../lib/work";

interface WorkLightboxProps {
  items: WorkItem[];
  index: number | null;
  setIndex: (i: number | null) => void;
  /** Base path used to build the shareable link for a single creative */
  shareBase: string;
}

/**
 * Full-screen viewer for a single creative. Keyboard (arrows / Esc), swipe on
 * touch, plus "Copy link" and "Download" so one piece can be sent to a client.
 */
export function WorkLightbox({ items, index, setIndex, shareBase }: WorkLightboxProps) {
  // Tracks which creative the "Copied" confirmation belongs to, so moving to
  // another image clears it without an effect.
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
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      window.prompt("Copy this link", shareUrl);
    }
  };

  return createPortal(
    <div className="work-lb" role="dialog" aria-modal="true" aria-label={`${item.brandName} — ${item.title}`}>
      <div className="work-lb__bar">
        <span className="work-lb__counter">
          {(index as number) + 1} / {items.length}
        </span>
        <div className="work-lb__actions">
          <button type="button" className="work-lb__btn" onClick={copyLink}>
            {copied ? <Check size={14} /> : <Link2 size={14} />}
            <span>{copied ? "Copied" : "Copy link"}</span>
          </button>
          <a className="work-lb__btn" href={item.src} download={`${item.brandSlug}-${item.slug}.webp`}>
            <Download size={14} />
            <span>Download</span>
          </a>
          <button type="button" className="work-lb__btn work-lb__btn--icon" onClick={close} aria-label="Close">
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        className="work-lb__stage"
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
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

        <img
          key={item.id}
          className="work-lb__img"
          src={item.src}
          srcSet={item.srcset}
          sizes="100vw"
          width={item.width}
          height={item.height}
          alt={`${item.brandName} — ${item.title}`}
        />

        {items.length > 1 && (
          <button type="button" className="work-lb__nav work-lb__nav--next" onClick={next} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      <div className="work-lb__cap">
        <p className="work-lb__cap-brand">{item.brandName}</p>
        <p className="work-lb__cap-title">{item.title}</p>
        <p className="work-lb__hint">{items.length > 1 ? "Swipe or use arrow keys · Esc to close" : "Esc to close"}</p>
      </div>
    </div>,
    document.body
  );
}
