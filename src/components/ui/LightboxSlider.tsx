import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from "react-dom";

interface LightboxSliderProps {
  images: string[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

export function LightboxSlider({ images, activeIndex, setActiveIndex }: LightboxSliderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const isOpen = activeIndex !== null;

  const onClose = useCallback(() => {
    setActiveIndex(null);
  }, [setActiveIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
    }
  }, [activeIndex, images.length, setActiveIndex]);

  const goNext = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % images.length);
    }
  }, [activeIndex, images.length, setActiveIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  // Shared button base style
  const navBtnBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 100000,
    background: 'transparent',
    border: '2px solid #1e40af',
    borderRadius: '50%',
    width: 52,
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#1e40af',
    fontSize: 30,
    lineHeight: 1,
    transition: 'all 200ms ease',
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(4px)',
        animation: 'lightboxFadeIn 250ms ease-out',
        overflow: 'hidden',
      }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Slider container with transform transition */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          transform: `translateX(-${(activeIndex || 0) * 100}vw)`,
          transition: 'transform 1000ms ease-in-out',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {images.map((imgUrl, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: `${i * 100}%`,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          >
            <img
              src={imgUrl}
              alt={`Gallery image ${i + 1}`}
              loading={Math.abs((activeIndex || 0) - i) <= 1 ? "eager" : "lazy"}
              decoding="async"
              style={{
                maxHeight: '90vh',
                maxWidth: 'calc(100vw - 120px)',
                objectFit: 'contain',
                borderRadius: 8,
                boxShadow: 'none',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 100000,
          background: 'transparent',
          border: '2px solid #e11d2e',
          borderRadius: '50%',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#e11d2e',
          fontSize: 20,
          fontWeight: 700,
          transition: 'all 200ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#e11d2e';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#e11d2e';
        }}
        aria-label="Close viewer"
      >
        ✕
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          style={{ ...navBtnBase, left: 12 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1e40af';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#1e40af';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          style={{ ...navBtnBase, right: 12 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1e40af';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#1e40af';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Counter */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#1e40af',
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: '0.05em',
          background: 'rgba(30,64,175,0.06)',
          padding: '6px 18px',
          borderRadius: 999,
          pointerEvents: 'none',
          zIndex: 100000,
          whiteSpace: 'nowrap',
        }}
      >
        {(activeIndex || 0) + 1} / {images.length}
      </div>

      <style>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>,
    document.body
  );
}
