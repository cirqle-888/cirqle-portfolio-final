import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import cirqleLogo from "figma:asset/a79873ff7b54a9a37128bda14561149e5eeb12b3.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube, LucideIcon, Menu, X } from "lucide-react";

// --- Types ---
interface NavItem {
  label: string;
  path: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
  hoverColorClass: string;
}

// --- Constants ---
const SCROLL_THRESHOLD = 20;

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Ecosystem", path: "/#ecosystem" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  { 
    icon: Instagram, 
    href: "https://www.instagram.com/cirqle.work", 
    label: "Cirqle on Instagram", 
    hoverColorClass: "hover:text-[#A259FF]" 
  },
  { 
    icon: Facebook, 
    href: "https://www.facebook.com/cirqle.work", 
    label: "Cirqle on Facebook", 
    hoverColorClass: "hover:text-[#4CC3FF]" 
  },
  { 
    icon: Linkedin, 
    href: "https://www.linkedin.com/company/cirqle-work", 
    label: "Cirqle on LinkedIn", 
    hoverColorClass: "hover:text-[#A259FF]" 
  },
  { 
    icon: Youtube, 
    href: "https://www.youtube.com/@cirqle.work", 
    label: "Cirqle on YouTube", 
    hoverColorClass: "hover:text-[#4CC3FF]" 
  },
];

export const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    // Initial check in case of mid-page reload
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      e.preventDefault();

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
        // Ensure scrolling to top when navigating to a new page
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    },
    [navigate, location.pathname]
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 w-full max-w-[100vw] z-50 transition-all duration-500 box-border ${
        isScrolled
          ? "liquid-glass-card shadow-2xl edge-glow-hover"
          : "liquid-glass border-b border-white/10"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 sm:py-5 relative z-10 box-border">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <motion.a
            href="/"
            aria-label="Cirqle Homepage"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center cursor-hover relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
          >
            <img
              src={cirqleLogo}
              alt="Cirqle Design"
              width={160}
              height={40}
              loading="eager"
              fetchPriority="high"
              className="h-10 w-auto"
            />
          </motion.a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10 relative z-10">
            {NAV_ITEMS.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors group cursor-hover"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] origin-left rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                ></motion.span>
              </motion.a>
            ))}

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 ml-2 border-l border-gray-200 pl-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, hoverColorClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`text-gray-500 transition-colors hover:-translate-y-0.5 transform duration-200 ${hoverColorClass}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden flex-shrink-0 text-gray-700 hover:text-[#A259FF] focus:outline-none z-50 p-2 relative transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden w-full max-w-[100vw] liquid-glass-card shadow-2xl border-t border-white/10 origin-top box-border"
          >
            <div className="px-4 md:px-6 py-6 sm:py-8 flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(e, item.path);
                  }}
                  className="text-lg tracking-wide text-gray-700 hover:text-black font-medium transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
              
              {/* Divider */}
              <div className="h-px bg-gray-200/50 w-full max-w-[200px] my-2" />

              {/* Social Media Icons (Mobile) */}
              <div className="flex items-center gap-6">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label, hoverColorClass }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`text-gray-500 transition-colors transform duration-200 ${hoverColorClass}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});
