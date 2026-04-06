import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, selectedIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = selectedIndex !== null;

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        onNavigate((selectedIndex + 1) % images.length);
      }
    },
    [selectedIndex, images.length, onNavigate]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        onNavigate((selectedIndex - 1 + images.length) % images.length);
      }
    },
    [selectedIndex, images.length, onNavigate]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Main Image Container */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex!]}
                alt={`Flyer ${selectedIndex! + 1}`}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="max-w-full max-h-full object-contain pointer-events-auto shadow-2xl rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="fixed bottom-8 flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl pointer-events-auto">
            <button
              onClick={handlePrev}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all font-medium"
            >
              <X size={20} />
              <span>Close</span>
            </button>

            <button
              onClick={handleNext}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Optional Counter */}
          <div className="fixed top-8 text-white/50 text-sm font-medium">
            {selectedIndex! + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
