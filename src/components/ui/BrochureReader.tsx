import React, {
  useEffect, useCallback, useRef, useState,
} from "react";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import { X, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";

interface BrochureReaderProps {
  images: string[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

// A4 portrait ratio: height / width
const A4 = 297 / 210; // ≈ 1.4142

// ─── Single book page ────────────────────────────────────────────────────────
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
        background: "#f5f4f0",
        borderRadius: isRight ? "0 3px 3px 0" : "3px 0 0 3px",
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
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Spine shadow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isRight
          ? "linear-gradient(to right, rgba(0,0,0,0.16) 0%, transparent 20%)"
          : "linear-gradient(to left,  rgba(0,0,0,0.16) 0%, transparent 20%)",
      }} />
      <span style={{
        position: "absolute", bottom: 5, fontSize: 10,
        [isRight ? "right" : "left"]: 8,
        color: "rgba(0,0,0,0.2)", fontFamily: "serif", pointerEvents: "none",
      }}>
        {props.pageNumber}
      </span>
    </div>
  );
});
Page.displayName = "BrochurePage";

// ─── Main component ───────────────────────────────────────────────────────────
export function BrochureReader({ images, activeIndex, setActiveIndex }: BrochureReaderProps) {
  const isOpen = activeIndex !== null;
  const bookRef    = useRef<any>(null);
  const stripRef   = useRef<HTMLDivElement>(null);

  const [isPortrait,   setIsPortrait]   = useState(() => window.innerWidth <= window.innerHeight);
  const [vw, setVw]                     = useState(() => window.innerWidth);
  const [vh, setVh]                     = useState(() => window.innerHeight);
  const [currentPage,  setCurrentPage]  = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const supportsFullscreen =
    typeof document !== "undefined" && !!document.documentElement.requestFullscreen;

  // ── Track dimensions & orientation ─────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
      setIsPortrait(window.innerWidth <= window.innerHeight);
    };
    const delayed = () => setTimeout(update, 150);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", delayed);
    document.addEventListener("fullscreenchange", () =>
      setIsFullscreen(!!document.fullscreenElement)
    );
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", delayed);
    };
  }, []);

  // Sync start page
  useEffect(() => {
    if (activeIndex !== null) setCurrentPage(activeIndex);
  }, [activeIndex]);

  const handleClose = useCallback(() => setActiveIndex(null), [setActiveIndex]);

  const goPrev = useCallback(() => {
    try { bookRef.current?.pageFlip()?.flipPrev(); } catch {}
  }, []);
  const goNext = useCallback(() => {
    try { bookRef.current?.pageFlip()?.flipNext(); } catch {}
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
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

  // ── Layout constants ────────────────────────────────────────────────────────
  const isPhoneLandscape = !isPortrait && vh < 500;

  const TOPBAR = 50;
  const BOTBAR = isPhoneLandscape ? 40 : 64; // dots vs nav buttons
  const availW = vw;
  const availH = vh - TOPBAR - BOTBAR;

  // ── A4-correct page dims (portrait & tablet/desktop landscape) ──────────────
  let pageW: number, pageH: number;
  if (isPortrait) {
    pageW = Math.min(availW, availH / A4);
    pageH = pageW * A4;
  } else {
    // Two-page spread: each page is half the width, capped by height
    pageW = Math.min(Math.floor(availW / 2), Math.floor(availH / A4));
    pageH = Math.round(pageW * A4);
  }
  pageW = Math.max(pageW, 180);
  pageH = Math.max(pageH, 240);

  // ── Filmstrip slide dims (phone landscape) ──────────────────────────────────
  // Make the active slide fill most of the available height
  const activeSlideH  = availH * 0.9;
  const activeSlideW  = activeSlideH / A4;
  const thumbSlideH   = availH * 0.7;
  const thumbSlideW   = thumbSlideH / A4;
  const STRIP_GAP     = 10;
  // Effective scroll width per slide (use thumbnail size for scroll math)
  const scrollItemW   = thumbSlideW + STRIP_GAP;
  const stripPaddingX = Math.max((availW - activeSlideW) / 2, 8);

  // ── Shared overlay style — z-index 9000 keeps it BELOW the custom cursor (z-9999) ──
  const overlayStyle: React.CSSProperties = {
    position: "fixed", inset: 0,
    zIndex: 9000,
    display: "flex",
    flexDirection: "column",
    background: "rgba(6, 6, 12, 0.97)",
    cursor: "none", // let CustomCursor render on top
  };

  // ── Top bar ──────────────────────────────────────────────────────────────────
  const pageLabel = isPhoneLandscape
    ? `${currentPage + 1} / ${images.length}`
    : isPortrait
      ? `${currentPage + 1} / ${images.length}`
      : `${currentPage + 1}–${Math.min(currentPage + 2, images.length)} / ${images.length}`;

  const topBar = (
    <div style={{
      height: TOPBAR, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 12px", flexShrink: 0,
      gap: 8,
    }}>
      {/* Counter */}
      <span style={{
        color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 500,
        letterSpacing: "0.06em", minWidth: 60,
      }}>
        {pageLabel}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Fullscreen button */}
        {supportsFullscreen && (
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              color: "white", cursor: "pointer",
            }}
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>
        )}

        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(255,255,255,0.09)",
            border: "1.5px solid rgba(255,255,255,0.18)",
            borderRadius: 999,
            padding: "6px 14px 6px 10px",
            color: "white", fontSize: 13, fontWeight: 500,
            cursor: "pointer", minHeight: 34,
          }}
        >
          <X size={13} strokeWidth={2.5} />
          <span>Close</span>
        </button>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════════
  // PHONE LANDSCAPE — filmstrip: all pages in one view, swipe to navigate
  // ════════════════════════════════════════════════════════════════════════════
  if (isPhoneLandscape) {
    const handleStripScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const scrollLeft = e.currentTarget.scrollLeft;
      const idx = Math.round(scrollLeft / scrollItemW);
      setCurrentPage(Math.max(0, Math.min(idx, images.length - 1)));
    };

    // Scroll to initial page on open
    const initScroll = (el: HTMLDivElement | null) => {
      if (!el || activeIndex === null) return;
      el.scrollLeft = activeIndex * scrollItemW;
    };

    return createPortal(
      <div style={overlayStyle} role="dialog" aria-modal="true">
        {topBar}

        {/* Filmstrip */}
        <div
          ref={(el) => { (stripRef as any).current = el; initScroll(el); }}
          onScroll={handleStripScroll}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            gap: STRIP_GAP,
            paddingLeft:  stripPaddingX,
            paddingRight: stripPaddingX,
            // Hide scrollbar
            scrollbarWidth: "none",
          }}
        >
          {images.map((url, i) => {
            const isActive = i === currentPage;
            const w = isActive ? activeSlideW : thumbSlideW;
            const h = isActive ? activeSlideH : thumbSlideH;
            return (
              <div
                key={i}
                onClick={() => {
                  if (!isActive && stripRef.current) {
                    stripRef.current.scrollTo({ left: i * scrollItemW, behavior: "smooth" });
                  }
                }}
                style={{
                  width: w,
                  height: h,
                  flexShrink: 0,
                  scrollSnapAlign: "center",
                  borderRadius: 6,
                  overflow: "hidden",
                  transition: "width 300ms ease, height 300ms ease, opacity 300ms ease, box-shadow 300ms ease",
                  opacity: isActive ? 1 : 0.55,
                  boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.7)" : "none",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <img
                  src={url}
                  alt={`Flyer ${i + 1}`}
                  loading={Math.abs(currentPage - i) <= 2 ? "eager" : "lazy"}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "contain",
                    background: "#f5f4f0",
                    pointerEvents: "none", userSelect: "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div style={{
          height: BOTBAR, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 5, flexShrink: 0,
        }}>
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                if (stripRef.current) {
                  stripRef.current.scrollTo({ left: i * scrollItemW, behavior: "smooth" });
                }
                setCurrentPage(i);
              }}
              style={{
                width: i === currentPage ? 16 : 5,
                height: 5, borderRadius: 3,
                background: i === currentPage ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.22)",
                transition: "all 260ms ease", cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>,
      document.body
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // PORTRAIT & TABLET/DESKTOP LANDSCAPE — book-flip viewer (A4-correct)
  // ════════════════════════════════════════════════════════════════════════════
  return createPortal(
    <div style={overlayStyle} role="dialog" aria-modal="true">
      {topBar}

      {/* Book area */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", overflow: "hidden",
      }}>
        {/* @ts-ignore */}
        <HTMLFlipBook
          key={isPortrait ? "portrait" : "landscape"}
          width={pageW}
          height={pageH}
          size="fixed"
          minWidth={pageW}
          maxWidth={pageW}
          minHeight={pageH}
          maxHeight={pageH}
          maxShadowOpacity={0.45}
          showCover={false}
          mobileScrollSupport={false}
          className="drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
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
      <div style={{
        height: BOTBAR, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 18, flexShrink: 0,
      }}>
        <button onClick={goPrev} aria-label="Previous" style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          border: "1.5px solid rgba(255,255,255,0.14)",
          color: "white", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ChevronLeft size={20} />
        </button>

        <span style={{
          color: "rgba(255,255,255,0.25)", fontSize: 11,
          letterSpacing: "0.05em", userSelect: "none",
        }}>
          {isPortrait ? "Swipe or tap edges" : "Click corners to turn"}
        </span>

        <button onClick={goNext} aria-label="Next" style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          border: "1.5px solid rgba(255,255,255,0.14)",
          color: "white", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>,
    document.body
  );
}
