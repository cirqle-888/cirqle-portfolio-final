import React, { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface BrochureReaderProps {
  images: string[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const Page = React.forwardRef<HTMLDivElement, { imageUrl: string, pageNumber: number, isPortrait: boolean }>((props, ref) => {
  const isRightPage = props.isPortrait ? true : props.pageNumber % 2 !== 0;

  return (
    <div 
      className={`page relative h-full overflow-hidden flex flex-col bg-[#f8f8f8] shadow-[inset_0_0_15px_rgba(0,0,0,0.05)] ${isRightPage ? 'rounded-r-[4px]' : 'rounded-l-[4px]'}`} 
      ref={ref}
    >
      {/* Page Content */}
      <div className="flex-1 w-full h-full p-2 sm:p-4 pb-8 relative flex items-center justify-center border-black/5">
        <img
          src={props.imageUrl}
          alt={`Brochure Page ${props.pageNumber}`}
          loading="lazy"
          className="w-full h-full object-contain pointer-events-none select-none"
        />
        {/* Folio numbering */}
        <div className={`absolute bottom-2 sm:bottom-4 ${isRightPage ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} text-gray-400 font-serif text-sm`}>
          {props.pageNumber}
        </div>
      </div>

      {/* Realistic Spine Shadow and Curvature Highlight */}
      <div className="absolute inset-0 pointer-events-none z-10 flex">
        {isRightPage ? (
          // Right page: Spine is on the left
          <>
            {/* Deep inner spine crease */}
            <div className="w-[10%] h-full bg-gradient-to-r from-black/30 via-black/5 to-transparent mix-blend-multiply"></div>
            {/* Subtle curve highlight */}
            <div className="w-[5%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </>
        ) : (
          // Left page: Spine is on the right
          <>
            <div className="flex-1"></div>
            {/* Subtle curve highlight */}
            <div className="w-[5%] h-full bg-gradient-to-l from-transparent via-white/50 to-transparent"></div>
            {/* Deep inner spine crease */}
            <div className="w-[10%] h-full bg-gradient-to-l from-black/30 via-black/5 to-transparent mix-blend-multiply"></div>
          </>
        )}
      </div>

      {/* Outer page edge subtle border to give paper precise physical thickness */}
      <div className={`absolute inset-0 pointer-events-none border ${isRightPage ? 'border-l-0 border-black/5 rounded-r-[4px]' : 'border-r-0 border-black/5 rounded-l-[4px]'}`}></div>
    </div>
  );
});

Page.displayName = "BrochurePage";

export function BrochureReader({ images, activeIndex, setActiveIndex }: BrochureReaderProps) {
  const isOpen = activeIndex !== null;
  const bookRef = useRef<any>(null); // Ref to access the pageFlip API methods
  
  const [isMobile, setIsMobile] = React.useState(false);
  const [isPortrait, setIsPortrait] = React.useState(() => typeof window !== 'undefined' ? (window.innerWidth < 768 || window.innerWidth < window.innerHeight) : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, [setActiveIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
      // Only execute page flips if the component is fully mounted and ready
      if (e.key === "ArrowRight" && bookRef.current?.pageFlip()) {
        try { bookRef.current.pageFlip().flipNext(); } catch (e) {}
      }
      if (e.key === "ArrowLeft" && bookRef.current?.pageFlip()) {
        try { bookRef.current.pageFlip().flipPrev(); } catch (e) {}
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Radial soft spotlight behind the book to create depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_60%)]"></div>

      {/* Close button at top-right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all border border-white/20 shadow-lg"
        aria-label="Close viewer"
      >
        <X size={24} strokeWidth={2.5} />
      </button>

      {/* Guide text */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/60 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase pointer-events-none z-[10000] drop-shadow-md">
        Drag edges to flip pages
      </div>

      {/* Container to prevent clicks from closing when clicking the book, but close on empty space */}
      <div 
        className="relative w-full max-w-[1200px] h-[80vh] sm:h-[90vh] flex items-center justify-center pointer-events-auto mx-auto"
        style={isMobile ? { maxWidth: 'calc(min(100vw, 80vh * 0.65))' } : {}}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        {/* @ts-ignore - Ignore strict React 18 children type incompatibility with react-pageflip */}
        <HTMLFlipBook
          width={450}           // Base width corresponding to A4 aspect
          height={636}          // Base height corresponding to A4 aspect
          size="stretch"        // Stretches symmetrically bounding inside the parent
          minWidth={280}        
          maxWidth={600}        // Max per single page
          minHeight={400}
          maxHeight={950}
          maxShadowOpacity={0.6} // Darker realistic soft shadow between leaves when turning
          showCover={true}      // The first page displays as a hard cover closed book initially
          mobileScrollSupport={true}
          className="book-comp drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
          ref={bookRef}
          onInit={() => {
            // Update orientation from the library directly upon init
            if (bookRef.current?.pageFlip) {
              const flip = bookRef.current.pageFlip();
              if (flip.getOrientation) {
                setIsPortrait(flip.getOrientation() === 'portrait');
              }
            }
          }}
          onChangeOrientation={(e: any) => setIsPortrait(e.data === 'portrait')}
          startPage={activeIndex || 0}
          drawShadow={true}
          flippingTime={900}    // Smooth comfortable turning speed
          usePortrait={true}    // If viewport is vertically narrow, switch to single page view
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true} // Crucial for UX fold hint
          disableFlipByClick={false}
        >
          {images.map((imgUrl, i) => (
            <Page key={i} imageUrl={imgUrl} pageNumber={i + 1} isPortrait={isPortrait} />
          ))}
        </HTMLFlipBook>
      </div>
      
      {/* Footer Navigation Buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-[10000] pointer-events-auto backdrop-blur-md bg-black/20 p-2 rounded-full border border-white/10 shadow-sm">
        <button 
          onClick={(e) => { e.stopPropagation(); try { bookRef.current?.pageFlip()?.flipPrev(); } catch(e){} }}
          className="p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
          aria-label="Previous Page"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
        <button 
          onClick={(e) => { e.stopPropagation(); try { bookRef.current?.pageFlip()?.flipNext(); } catch(e){} }}
          className="p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
          aria-label="Next Page"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </div>,
    document.body
  );
}
