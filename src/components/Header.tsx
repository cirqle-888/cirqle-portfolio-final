import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import cirqleLogo from "figma:asset/a79873ff7b54a9a37128bda14561149e5eeb12b3.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube, Menu, X } from "lucide-react";

export const Header = memo(function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    const path = getPath(item);

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
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "shadow-2xl" : "border-b border-white/10"
      }`}
    >
      <div className={`absolute inset-0 pointer-events-none -z-10 transition-all duration-500 ${
        scrolled ? "liquid-glass-card edge-glow-hover" : "liquid-glass"
      }`}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            aria-label="Cirqle Homepage"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
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
            {menuItems.map((item, index) => (
              <motion.a
                key={item}
                href={getPath(item)}
                onClick={(e) => handleNavClick(e, item)}
                className="relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors group cursor-hover"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] origin-left rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                ></motion.span>
              </motion.a>
            ))}

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 ml-2 border-l border-gray-200 pl-6">
              <a
                href="https://www.instagram.com/cirqle.work"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cirqle on Instagram"
                className="text-gray-500 hover:text-[#A259FF] transition-colors hover:-translate-y-0.5 transform duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/cirqle.work"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cirqle on Facebook"
                className="text-gray-500 hover:text-[#4CC3FF] transition-colors hover:-translate-y-0.5 transform duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/cirqle-work"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cirqle on LinkedIn"
                className="text-gray-500 hover:text-[#A259FF] transition-colors hover:-translate-y-0.5 transform duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@cirqle.work"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cirqle on YouTube"
                className="text-gray-500 hover:text-[#4CC3FF] transition-colors hover:-translate-y-0.5 transform duration-200"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-gray-800 transition-transform active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full left-0 right-0 liquid-glass-card border-b border-white/20 shadow-2xl overflow-hidden md:hidden z-40"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={getPath(item)}
                  onClick={(e) => {
                    handleNavClick(e, item);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xl font-medium text-gray-800 tracking-wide hover:text-[#A259FF] transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                >
                  {item}
                </motion.a>
              ))}

              <motion.div 
                className="flex items-center gap-6 pt-6 border-t border-gray-200/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <a href="https://www.instagram.com/cirqle.work" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#A259FF] transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="https://www.facebook.com/cirqle.work" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4CC3FF] transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="https://www.linkedin.com/company/cirqle-work" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#A259FF] transition-colors"><Linkedin className="w-6 h-6" /></a>
                <a href="https://www.youtube.com/@cirqle.work" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4CC3FF] transition-colors"><Youtube className="w-6 h-6" /></a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});
