import React, { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface BrochureReaderProps {
  images: string[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

// ─── Single page for the book ──────────────────────────────────────────────
const Page = React.forwardRef<
  HTMLDivElement,
  { imageUrl: string; pageNumber: number; isPortrait: boolean }
>((props, ref) => {
  const isRight = props.isPortrait ? true : props.pageNumber % 2 !== 0;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        borderRadius: isRight ? "0 4px 4px 0" : "4px 0 0 4px",
      }}
    >
      <img
        src={props.imageUrl}
        alt={`Flyer ${props.pageNumber}`}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
          display: "block",
        }}
      />
      {/* Spine shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: isRight
            ? "linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 18%)"
            : "linear-gradient(to left,  rgba(0,0,0,0.18) 0%, transparent 18%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 6,
          [isRight ? "right" : "left"]: 10,
          fontSize: 11,
          color: "rgba(0,0,0,0.25)",
          fontFamily: "serif",
          pointerEvents: "none",
        }}
      >
        {props.pageNumber}
      </span>
    </div>
  );
});
Page.displayName = "BrochurePage";

// ─── Main component ────────────────────────────────────────────────────────
export function BrochureReader({ images, activeIndex, setActiveIndex }: BrochureReaderProps) {
  const isOpen = activeIndex !== null;
  const bookRef   = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isPortrait, setIsPortrait] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= window.innerHeight : true
  );
  const [dims, setDims] = useState({ vw: window.innerWidth, vh: window.innerHeight });
  const [currentPage, setCurrentPage] = useState(0);

  // Sync start page
  useEffect(() => {
    if (activeIndex !== null) setCurrentPage(activeIndex);
  }, [activeIndex]);

  // Dimensions + orientation tracking
  useEffect(() => {
    const update = () => {
      setIsPortrait(window.innerWidth <= window.innerHeight);
      setDims({ vw: window.innerWidth, vh: window.innerHeight });
    };
    const delayed = () => setTimeout(update, 150); // let browser settle after rotate
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", delayed);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", delayed);
    };
  }, []);

  const handleClose = useCallback(() => setActiveIndex(null), [setActiveIndex]);

  const goPrev = useCallback(() => {
    try { bookRef.current?.pageFlip()?.flipPrev(); } catch {}
  }, []);

  const goNext = useCallback(() => {
    try { bookRef.current?.pageFlip()?.flipNext(); } catch {}
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     handleClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, handleClose, goNext, goPrev]);

  if (!isOpen) return null;

  const { vw, vh } = dims;

  // Phone landscape = narrow height (typically < 500 CSS px)
  const isPhoneLandscape = !isPortrait && vh < 500;

  const TOPBAR = 52;
  const BOTBAR = isPhoneLandscape ? 0 : 68;
  const PAD    = 0; // no padding — use every pixel

  const availW = vw;
  const availH = vh - TOPBAR - BOTBAR - PAD;

  // ── Book page dimensions: fill the available space ──
  // Images use object-contain inside, so no distortion regardless of ratio
  const pageW = isPortrait
    ? availW
    : Math.floor(availW / 2);
  const pageH = availH;

  const safePageW = Math.max(pageW, 180);
  const safePageH = Math.max(pageH, 240);

  // ── Shared overlay ──────────────────────────────────────────────────────
  const overlay: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    background: "rgba(8, 8, 14, 0.97)",
  };

  // ── Top bar ─────────────────────────────────────────────────────────────
  const topBar = (
    <div
      style={{
        height: TOPBAR,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px",
        flexShrink: 0,
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 500, letterSpacing: "0.05em" }}>
        {isPortrait
          ? `${currentPage + 1} / ${images.length}`
          : `${currentPage + 1}–${Math.min(currentPage + 2, images.length)} / ${images.length}`}
      </span>
      <button
        onClick={handleClose}
        aria-label="Close"
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.1)",
          border: "1.5px solid rgba(255,255,255,0.2)",
          borderRadius: 999,
          padding: "7px 14px 7px 10px",
          color: "white", fontSize: 13, fontWeight: 500,
          cursor: "pointer",
          minHeight: 36,
        }}
      >
        <X size={14} strokeWidth={2.5} />
        <span>Close</span>
      </button>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // PHONE LANDSCAPE — horizontal swipe-snap gallery
  // ══════════════════════════════════════════════════════════════════════════
  if (isPhoneLandscape) {
    return createPortal(
      <div style={overlay} role="dialog" aria-modal="true">
        {topBar}

        {/* Scroll strip */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
          onScroll={(e) => {
            const idx = Math.round(e.currentTarget.scrollLeft / vw);
            setCurrentPage(idx);
          }}
        >
          {images.map((url, i) => (
            <div
              key={i}
              style={{
                width: vw,
                height: availH,
                flexShrink: 0,
                scrollSnapAlign: "start",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={url}
                alt={`Flyer ${i + 1}`}
                loading={Math.abs(currentPage - i) <= 1 ? "eager" : "lazy"}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          flexShrink: 0,
        }}>
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                scrollRef.current?.scrollTo({ left: i * vw, behavior: "smooth" });
                setCurrentPage(i);
              }}
              style={{
                width: i === currentPage ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === currentPage ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                transition: "all 250ms ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>,
      document.body
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PORTRAIT & TABLET/DESKTOP LANDSCAPE — book-flip viewer
  // ══════════════════════════════════════════════════════════════════════════
  return createPortal(
    <div style={overlay} role="dialog" aria-modal="true">
      {topBar}

      {/* Book area — fills all remaining space */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* key forces remount on orientation change */}
        {/* @ts-ignore */}
        <HTMLFlipBook
          key={isPortrait ? "portrait" : "landscape"}
          width={safePageW}
          height={safePageH}
          size="fixed"
          minWidth={safePageW}
          maxWidth={safePageW}
          minHeight={safePageH}
          maxHeight={safePageH}
          maxShadowOpacity={0.45}
          showCover={false}
          mobileScrollSupport={false}
          className="drop-shadow-[0_16px_48px_rgba(0,0,0,0.75)]"
          ref={bookRef}
          onFlip={(e: any) => setCurrentPage(e.data)}
          startPage={activeIndex || 0}
          drawShadow={true}
          flippingTime={650}
          usePortrait={isPortrait}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={25}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {images.map((url, i) => (
            <Page key={i} imageUrl={url} pageNumber={i + 1} isPortrait={isPortrait} />
          ))}
        </HTMLFlipBook>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          height: BOTBAR,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          flexShrink: 0,
        }}
      >
        <button
          onClick={goPrev}
          aria-label="Previous"
          style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1.5px solid rgba(255,255,255,0.15)",
            color: "white", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}
        >
          <ChevronLeft size={22} />
        </button>
        <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 12, letterSpacing: "0.05em", userSelect: "none" }}>
          {isPortrait ? "Swipe or tap edges" : "Click corners to turn"}
        </span>
        <button
          onClick={goNext}
          aria-label="Next"
          style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1.5px solid rgba(255,255,255,0.15)",
            color: "white", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>,
    document.body
  );
}
