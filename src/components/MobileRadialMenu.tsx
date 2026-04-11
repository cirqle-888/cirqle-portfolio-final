import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";

interface MobileRadialMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileRadialMenu({ isOpen, onClose }: MobileRadialMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll Safety Bound
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const menuItems = ["Home", "Ecosystem", "Services", "Portfolio", "About", "Contact"];

  const getPath = (item: string) => {
    switch (item) {
      case "Home":
        return "/";
      case "Services":
        return "/services";
      case "Portfolio":
        return "/portfolio";
      case "About":
        return "/about";
      case "Contact":
        return "/contact";
      default:
        return `/#${item.toLowerCase()}`;
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent closing from the background click immediately before routing
    onClose();

    const path = getPath(item);

    // Give the menu closing animation time to play before hard jumping DOM
    setTimeout(() => {
      if (path.startsWith("/#")) {
        const targetId = path.substring(2);
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => {
            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(path);
      }
    }, 300);
  };

  // Math Radius mapped organically safely inside valid contexts
  const radius = typeof window !== 'undefined' ? Math.min(window.innerWidth, window.innerHeight) * (window.innerWidth < 640 ? 0.28 : 0.35) : 140;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: "circle(0px at 90% 10%)" }}
          animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
          exit={{ opacity: 0, clipPath: "circle(0px at 90% 10%)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-white/70 backdrop-blur-2xl md:hidden"
          onClick={onClose}
        >
          {/* Centered Mathematical Frame */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 flex items-center justify-center">
            
            {/* Core Close Trigger */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute w-16 h-16 rounded-full flex items-center justify-center bg-gray-900 text-white shadow-2xl z-50 hover:scale-110 active:scale-95 transition-transform"
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Orbiting Objects */}
            {menuItems.map((item, index) => {
              const angle = (-90 + index * 60) * (Math.PI / 180);
              const xPos = Math.cos(angle) * radius;
              const yPos = Math.sin(angle) * radius;

              return (
                <motion.a
                  key={item}
                  href={getPath(item)}
                  onClick={(e) => handleNavClick(e, item)}
                  className="absolute flex items-center justify-center rounded-full bg-white shadow-xl border border-white/40 backdrop-blur-md text-sm font-medium text-gray-800 hover:text-black transition-all hover:scale-110 hover:shadow-2xl"
                  style={{ width: "84px", height: "84px" }}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, opacity: 1, x: xPos, y: yPos }}
                  exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.1 + index * 0.05,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
