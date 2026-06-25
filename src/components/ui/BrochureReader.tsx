import React, { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface BrochureReaderProps {
  images: string[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const Page = React.forwardRef<
  HTMLDivElement,
  { imageUrl: string; pageNumber: number; isPortrait: boolean }
>((props, ref) => {
  const isRightPage = props.isPortrait ? true : props.pageNumber % 2 !== 0;

  return (
    <div
      className={`page relative h-full overflow-hidden flex flex-col bg-[#f8f8f8] shadow-[inset_0_0_15px_rgba(0,0,0,0.05)] ${
        isRightPage ? "rounded-r-[4px]" : "rounded-l-[4px]"
      }`}
      ref={ref}
    >
      <div className="flex-1 w-full h-full p-1 sm:p-2 relative flex items-center justify-center">
        <img
          src={props.imageUrl}
          alt={`Brochure Page ${props.pageNumber}`}
          loading="lazy"
          className="w-full h-full object-contain pointer-events-none select-none"
        />
        <div
          className={`absolute bottom-2 ${
            isRightPage ? "right-3 sm:right-5" : "left-3 sm:left-5"
          } text-gray-400 font-serif text-xs`}
        >
          {props.pageNumber}
        </div>
      </div>

      {/* Spine shadow */}
      <div className="absolute inset-0 pointer-events-none z-10 flex">
        {isRightPage ? (
          <>
            <div className="w-[10%] h-full bg-gradient-to-r from-black/25 via-black/5 to-transparent mix-blend-multiply" />
            <div className="w-[5%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="flex-1" />
            <div className="w-[5%] h-full bg-gradient-to-l from-transparent via-white/40 to-transparent" />
            <div className="w-[10%] h-full bg-gradient-to-l from-black/25 via-black/5 to-transparent mix-blend-multiply" />
          </>
        )}
      </div>

      <div
        className={`absolute inset-0 pointer-events-none border ${
          isRightPage
            ? "border-l-0 border-black/5 rounded-r-[4px]"
            : "border-r-0 border-black/5 rounded-l-[4px]"
        }`}
      />
    </div>
  );
});

Page.displayName = "BrochurePage";

export function BrochureReader({
  images,
  activeIndex,
  setActiveIndex,
}: BrochureReaderProps) {
  const isOpen = activeIndex !== null;
  const bookRef = useRef<any>(null);

  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth < window.innerHeight || window.innerWidth < 768;
  });

  const [currentPage, setCurrentPage] = useState(0);

  // Sync currentPage when activeIndex changes
  useEffect(() => {
    if (activeIndex !== null) setCurrentPage(activeIndex);
  }, [activeIndex]);

  // Recalculate portrait on resize / orientation change
  useEffect(() => {
    const update = () => {
      setIsPortrait(window.innerWidth < window.innerHeight || window.innerWidth < 768);
    };
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, [setActiveIndex]);

  const goPrev = useCallback(() => {
    try {
      bookRef.current?.pageFlip()?.flipPrev();
    } catch {}
  }, []);

  const goNext = useCallback(() => {
    try {
      bookRef.current?.pageFlip()?.flipNext();
    } catch {}
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, handleClose, goNext, goPrev]);

  if (!isOpen) return null;

  // Book dimensions
  // Portrait: single-page, fill near the full screen
  // Landscape: two-page spread, fill the width
  const vw = typeof window !== "undefined" ? window.innerWidth : 390;
  const vh = typeof window !== "undefined" ? window.innerHeight : 844;

  const CONTROLS_H = 80; // bottom bar height
  const CLOSE_H = 56;    // top close bar clearance
  const PADDING = 8;

  let bookW: number;
  let bookH: number;

  if (isPortrait) {
    // Single page: use full width
    bookW = vw - PADDING * 2;
    bookH = vh - CONTROLS_H - CLOSE_H - PADDING * 2;
  } else {
    // Two-page spread: fill width, aspect ratio derived from page dims
    bookW = Math.min(vw - PADDING * 2, 1400);
    bookH = vh - CONTROLS_H - CLOSE_H - PADDING * 2;
  }

  // Clamp to avoid degenerate sizes
  bookW = Math.max(bookW, 280);
  bookH = Math.max(bookH, 300);

  const displayPage = isPortrait ? currentPage + 1 : `${currentPage + 1}–${Math.min(currentPage + 2, images.length)}`;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(10, 10, 18, 0.96)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* ── Top bar: counter + close ── */}
      <div
        style={{
          width: "100%",
          height: CLOSE_H,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          flexShrink: 0,
        }}
      >
        {/* Page counter */}
        <span
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.06em",
          }}
        >
          {displayPage} / {images.length}
        </span>

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close preview"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.1)",
            border: "1.5px solid rgba(255,255,255,0.18)",
            borderRadius: 999,
            padding: "8px 16px 8px 12px",
            color: "white",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "background 180ms, border-color 180ms",
            minHeight: 40,
            minWidth: 40,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.18)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
          }}
        >
          <X size={16} strokeWidth={2.5} />
          <span>Close</span>
        </button>
      </div>

      {/* ── Book area ── */}
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `0 ${PADDING}px`,
          overflow: "hidden",
        }}
      >
        {/* @ts-ignore */}
        <HTMLFlipBook
          width={isPortrait ? bookW : Math.floor(bookW / 2)}
          height={bookH}
          size="fixed"
          minWidth={isPortrait ? bookW : Math.floor(bookW / 2)}
          maxWidth={isPortrait ? bookW : Math.floor(bookW / 2)}
          minHeight={bookH}
          maxHeight={bookH}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={false}
          className="drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          ref={bookRef}
          onInit={() => {
            try {
              const flip = bookRef.current?.pageFlip();
              if (flip?.getOrientation) {
                setIsPortrait(flip.getOrientation() === "portrait");
              }
            } catch {}
          }}
          onChangeOrientation={(e: any) => setIsPortrait(e.data === "portrait")}
          onFlip={(e: any) => setCurrentPage(e.data)}
          startPage={activeIndex || 0}
          drawShadow={true}
          flippingTime={700}
          usePortrait={isPortrait}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={20}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {images.map((imgUrl, i) => (
            <Page key={i} imageUrl={imgUrl} pageNumber={i + 1} isPortrait={isPortrait} />
          ))}
        </HTMLFlipBook>
      </div>

      {/* ── Bottom controls ── */}
      <div
        style={{
          height: CONTROLS_H,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexShrink: 0,
          paddingBottom: 8,
        }}
      >
        {/* Prev */}
        <button
          onClick={goPrev}
          aria-label="Previous page"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1.5px solid rgba(255,255,255,0.15)",
            color: "white",
            cursor: "pointer",
            transition: "background 180ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Swipe hint */}
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, letterSpacing: "0.05em", userSelect: "none" }}>
          {isPortrait ? "Tap edges or swipe" : "Click corners to turn"}
        </span>

        {/* Next */}
        <button
          onClick={goNext}
          aria-label="Next page"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1.5px solid rgba(255,255,255,0.15)",
            color: "white",
            cursor: "pointer",
            transition: "background 180ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>,
    document.body
  );
}
