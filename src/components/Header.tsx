import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import cirqleLogo from "figma:asset/a79873ff7b54a9a37128bda14561149e5eeb12b3.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube, LucideIcon, Menu, X } from "lucide-react";

interface NavItem { label: string; path: string; }
interface SocialLink { icon: LucideIcon; href: string; label: string; hoverColorClass: string; }

const SCROLL_THRESHOLD = 20;
const RADIAL_RADIUS = 132;
const CIRCLE_SIZE = 84;

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home",      path: "/" },
  { label: "Ecosystem", path: "/services" },
  { label: "Services",  path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About",     path: "/about" },
  { label: "Contact",   path: "/contact" },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  { icon: Instagram, href: "https://www.instagram.com/cirqle.work",        label: "Cirqle on Instagram", hoverColorClass: "hover:text-[#A259FF]" },
  { icon: Facebook,  href: "https://www.facebook.com/cirqle.work",         label: "Cirqle on Facebook",  hoverColorClass: "hover:text-[#4CC3FF]" },
  { icon: Linkedin,  href: "https://www.linkedin.com/company/cirqle-work", label: "Cirqle on LinkedIn",  hoverColorClass: "hover:text-[#A259FF]" },
  { icon: Youtube,   href: "https://www.youtube.com/@cirqle.work",         label: "Cirqle on YouTube",   hoverColorClass: "hover:text-[#4CC3FF]" },
];

// Gradient border utility (padding-box / border-box trick)
const glassBorder = (alpha = 0.88) =>
  `linear-gradient(rgba(255,255,255,${alpha}),rgba(255,255,255,${alpha})) padding-box,
   linear-gradient(135deg,#A259FF,#4CC3FF) border-box`;

export const Header = memo(function Header() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      e.preventDefault();
      if (path.startsWith("/#")) {
        const id = path.substring(2);
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(path);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    },
    [navigate, location.pathname]
  );

  const close = () => setMobileMenuOpen(false);

  return (
    <>
      {/* ── Header bar ── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 w-full max-w-[100vw] z-50 transition-all duration-500 box-border ${
          isScrolled ? "liquid-glass-card shadow-2xl edge-glow-hover" : "liquid-glass border-b border-white/10"
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
              <img src={cirqleLogo} alt="Cirqle Design" width={160} height={40} loading="eager" fetchPriority="high" className="h-10 w-auto" />
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10 relative z-10">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors group cursor-hover py-3 px-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] origin-left rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.a>
              ))}
              <div className="flex items-center gap-4 ml-2 border-l border-gray-200 pl-6">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label, hoverColorClass }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className={`text-gray-500 transition-colors hover:-translate-y-0.5 transform duration-200 p-2.5 -m-2.5 rounded-lg ${hoverColorClass}`}>
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </nav>

            {/* Hamburger — mobile only */}
            <motion.button
              className="md:hidden flex-shrink-0 focus:outline-none relative"
              style={{ zIndex: 60, padding: 8, borderRadius: 8, color: "#374151" }}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: "block" }}>
                    <X style={{ width: 26, height: 26 }} />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: "block" }}>
                    <Menu style={{ width: 26, height: 26 }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </motion.header>

      {/* ── Fullscreen circular mobile menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="md:hidden"
            style={{ position: "fixed", inset: 0, zIndex: 45 }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >

            {/* ── Liquid-glass backdrop ── */}
            <div
              onClick={close}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(160deg, rgba(245,241,255,0.97) 0%, rgba(236,246,255,0.97) 60%, rgba(248,240,255,0.97) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
              }}
            />

            {/* ── Ambient glow blobs ── */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: "12%", left: "10%",
                width: 220, height: 220, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(162,89,255,0.14) 0%, transparent 70%)",
                filter: "blur(24px)",
              }} />
              <div style={{
                position: "absolute", bottom: "18%", right: "8%",
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(76,195,255,0.12) 0%, transparent 70%)",
                filter: "blur(24px)",
              }} />
            </div>

            {/* ── Orbital ring ── */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              marginLeft: -RADIAL_RADIUS,
              marginTop: -RADIAL_RADIUS,
              width: RADIAL_RADIUS * 2,
              height: RADIAL_RADIUS * 2,
              borderRadius: "50%",
              border: "1.5px dashed rgba(162,89,255,0.22)",
              pointerEvents: "none",
            }} />
            {/* outer faint ring */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              marginLeft: -(RADIAL_RADIUS + CIRCLE_SIZE / 2 + 10),
              marginTop:  -(RADIAL_RADIUS + CIRCLE_SIZE / 2 + 10),
              width:  (RADIAL_RADIUS + CIRCLE_SIZE / 2 + 10) * 2,
              height: (RADIAL_RADIUS + CIRCLE_SIZE / 2 + 10) * 2,
              borderRadius: "50%",
              border: "1px solid rgba(162,89,255,0.08)",
              pointerEvents: "none",
            }} />

            {/* ── Nav circles ── */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {NAV_ITEMS.map((item, index) => {
                const angle = (index / NAV_ITEMS.length) * 2 * Math.PI - Math.PI / 2;
                const px = Math.cos(angle) * RADIAL_RADIUS;
                const py = Math.sin(angle) * RADIAL_RADIUS;

                return (
                  <motion.a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => { close(); handleNavClick(e, item.path); }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.14 } }}
                    transition={{ type: "spring", stiffness: 320, damping: 24, delay: index * 0.055 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.93 }}
                    style={{
                      position: "absolute",
                      left: `calc(50% + ${px}px)`,
                      top:  `calc(50% + ${py}px)`,
                      marginLeft: -CIRCLE_SIZE / 2,
                      marginTop:  -CIRCLE_SIZE / 2,
                      width:  CIRCLE_SIZE,
                      height: CIRCLE_SIZE,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #A259FF 0%, #4CC3FF 100%)",
                      border: "none",
                      boxShadow: "0 10px 24px rgba(162,89,255,0.35), 0 4px 8px rgba(76,195,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      pointerEvents: "auto",
                      cursor: "pointer",
                      userSelect: "none",
                      color: "#fff",
                    }}
                  >
                    <span style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      color: "#fff",
                    }}>
                      {item.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* ── Centre favicon button (Home) ── */}
            {/* Pulsing outer ring */}
            <motion.div
              animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                marginLeft: -46, marginTop: -46,
                width: 92, height: 92,
                borderRadius: "50%",
                border: "2px solid rgba(162,89,255,0.45)",
                pointerEvents: "none",
              }}
            />
            {/* Second slower ring */}
            <motion.div
              animate={{ scale: [1, 1.28, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                marginLeft: -52, marginTop: -52,
                width: 104, height: 104,
                borderRadius: "50%",
                border: "1.5px solid rgba(76,195,255,0.3)",
                pointerEvents: "none",
              }}
            />

            {/* Favicon circle — NOTE: no transform here, use marginLeft/marginTop */}
            <motion.a
              href="/"
              onClick={(e) => { close(); handleNavClick(e, "/"); }}
              aria-label="Go to Home"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                marginLeft: -38,   // -(width/2)
                marginTop:  -38,   // -(height/2)
                width:  76,
                height: 76,
                borderRadius: "50%",
                background: glassBorder(0.98),
                border: "2px solid transparent",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow:
                  "0 0 0 5px rgba(162,89,255,0.09), 0 8px 36px rgba(162,89,255,0.28), inset 0 1px 0 rgba(255,255,255,1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
                cursor: "pointer",
                zIndex: 10,
                textDecoration: "none",
              }}
            >
              <img
                src="/favicon.ico"
                alt="Home"
                style={{ width: 36, height: 36, objectFit: "contain" }}
              />
            </motion.a>

            {/* ── Social icons ── */}
            <div style={{
              position: "absolute",
              bottom: "2.5rem", left: 0, right: 0,
              display: "flex", justifyContent: "center", gap: "0.9rem",
              pointerEvents: "auto",
            }}>
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16, transition: { duration: 0.12 } }}
                  transition={{ delay: 0.32 + i * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.18, y: -2 }}
                  style={{
                    width: 46, height: 46,
                    borderRadius: "50%",
                    background: glassBorder(0.75),
                    border: "1.5px solid transparent",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 4px 16px rgba(162,89,255,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#8B3CF7",
                  }}
                >
                  <Icon style={{ width: 18, height: 18 }} />
                </motion.a>
              ))}
            </div>

            {/* ── "tap outside to close" hint ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              style={{
                position: "absolute",
                top: "calc(50% + 200px)",
                left: 0, right: 0,
                textAlign: "center",
                color: "rgba(130,90,200,0.4)",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              tap outside to close
            </motion.p>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
