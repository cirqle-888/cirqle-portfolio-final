import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import cirqleLogo from "../assets/cirqle-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube, LucideIcon, Menu, X } from "lucide-react";

interface NavItem { label: string; path: string; hint: string; }
interface SocialLink { icon: LucideIcon; href: string; label: string; hoverColorClass: string; }

const SCROLL_THRESHOLD = 20;

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home",     path: "/",          hint: "Start here" },
  { label: "Work",     path: "/portfolio", hint: "What we've made" },
  { label: "Services", path: "/services",  hint: "What we create" },
  { label: "About",    path: "/about",     hint: "Who we are" },
  { label: "Careers",  path: "/careers",   hint: "Join the team" },
  { label: "Contact",  path: "/contact",   hint: "Start a project" },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  { icon: Instagram, href: "https://www.instagram.com/cirqle.work",        label: "Cirqle on Instagram", hoverColorClass: "hover:text-[#A259FF]" },
  { icon: Facebook,  href: "https://www.facebook.com/cirqle.work",         label: "Cirqle on Facebook",  hoverColorClass: "hover:text-[#4CC3FF]" },
  { icon: Linkedin,  href: "https://www.linkedin.com/company/cirqle-work", label: "Cirqle on LinkedIn",  hoverColorClass: "hover:text-[#A259FF]" },
  { icon: Youtube,   href: "https://www.youtube.com/@cirqle.work",         label: "Cirqle on YouTube",   hoverColorClass: "hover:text-[#4CC3FF]" },
];

/**
 * Cirqle Navigation System geometry — orbit radius and node size derived from
 * BOTH viewport axes, with vertical bands reserved for the header label,
 * the contextual hint, and the social row (plus safe-area). Everything scales
 * down together on small phones; nothing may leave the viewport.
 */
function orbitLayout(vw: number, vh: number) {
  const halfW = vw / 2 - 8;                    // horizontal breathing room
  const halfH = (vh - 128 - 168) / 2;          // reserve: header+label / hint+socials
  const usable = Math.max(110, Math.min(halfW, halfH));
  const node   = Math.max(44, Math.min(64, Math.round(usable * 0.36)));
  const radius = Math.max(90, Math.min(148, Math.round(usable - node / 2 - 14)));
  return { node, radius };
}

export const Header = memo(function Header() {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewport, setViewport] = useState<{ vw: number; vh: number } | null>(null);
  const [focusNode, setFocusNode] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const navigate  = useNavigate();
  const location  = useLocation();
  const menuRef       = useRef<HTMLDivElement | null>(null);
  const hamburgerRef  = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: track viewport for the orbit layout, lock scroll,
  // move focus in, close on Escape, restore focus to the trigger on close.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const measure = () => setViewport({ vw: window.innerWidth, vh: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    document.body.style.overflow = "hidden";
    const firstLink = menuRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", measure);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      setFocusNode(null);
      hamburgerRef.current?.focus();
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      e.preventDefault();
      navigate(path);
      window.scrollTo({ top: 0, left: 0 });
    },
    [navigate]
  );

  const close = () => setMobileMenuOpen(false);

  const isActive = (path: string): boolean => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const vw = viewport?.vw ?? 375;
  const vh = viewport?.vh ?? 700;
  const { node: NODE, radius: RADIUS } = orbitLayout(vw, vh);
  const HUB = Math.round(Math.min(92, Math.max(72, RADIUS * 0.62)));
  // Orbit centre sits at the middle of the band between header and footer rows
  const centerY = 128 + (vh - 128 - 168) / 2;

  const nodePos = (index: number) => {
    const angle = (index / NAV_ITEMS.length) * 2 * Math.PI - Math.PI / 2;
    return { px: Math.cos(angle) * RADIUS, py: Math.sin(angle) * RADIUS };
  };

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className={`fixed top-0 left-0 w-full max-w-[100vw] z-50 transition-all duration-500 box-border ${
          isScrolled ? "liquid-glass-card shadow-lg" : "liquid-glass border-b border-white/10"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 sm:py-5 relative z-10 box-border">
          <div className="flex items-center justify-between w-full">

            {/* Logo */}
            <a
              href="/"
              aria-label="Cirqle Homepage"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center relative z-10"
            >
              <img src={cirqleLogo} alt="Cirqle Design" width={160} height={40} loading="eager" className="h-10 w-auto" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10 relative z-10" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={`text-sm tracking-wide transition-colors py-3 px-1 ${
                      active ? "text-black font-medium" : "text-gray-500 hover:text-black"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
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
            <button
              ref={hamburgerRef}
              className="md:hidden flex-shrink-0 relative"
              style={{ zIndex: 60, padding: 8, borderRadius: 8, color: "#374151" }}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X style={{ width: 26, height: 26 }} /> : <Menu style={{ width: 26, height: 26 }} />}
            </button>

          </div>
        </div>
      </header>

      {/* ── Cirqle Navigation System ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{ position: "fixed", inset: 0, zIndex: 45 }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            {/* Environment: near-white lavender + fine technical grid */}
            <div
              onClick={close}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(165deg, #fbfaff 0%, #f6f4fd 55%, #f3f6fe 100%)",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backgroundImage:
                  "linear-gradient(rgba(122,89,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(122,89,255,0.045) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
              }}
            />
            {/* Soft light fields — static, no blur filters */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: "-8%", right: "-12%",
                width: "60vw", height: "60vw", maxWidth: 360, maxHeight: 360, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(162,89,255,0.08) 0%, transparent 65%)",
              }} />
              <div style={{
                position: "absolute", bottom: "-6%", left: "-14%",
                width: "55vw", height: "55vw", maxWidth: 320, maxHeight: 320, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(76,195,255,0.07) 0%, transparent 65%)",
              }} />
            </div>

            {/* Faint Q-inspired geometry */}
            <svg
              aria-hidden="true"
              width={vw}
              height={vh}
              viewBox={`0 0 ${vw} ${vh}`}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <defs>
                <linearGradient id="cirqle-spoke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A259FF" />
                  <stop offset="100%" stopColor="#4CC3FF" />
                </linearGradient>
              </defs>
              {/* oversized Q ring + tail, barely visible */}
              <circle cx={vw * 0.82} cy={vh * 0.2} r={Math.min(vw, vh) * 0.34}
                fill="none" stroke="rgba(122,89,255,0.05)" strokeWidth="1.5" />
              <line x1={vw * 0.94} y1={vh * 0.31} x2={vw * 1.02} y2={vh * 0.39}
                stroke="rgba(122,89,255,0.07)" strokeWidth="1.5" />
              {/* connection spokes: centre → node */}
              <g>
                {NAV_ITEMS.map((item, index) => {
                  const { px, py } = nodePos(index);
                  const lit = focusNode === index || (focusNode === null && isActive(item.path));
                  return (
                    <motion.line
                      key={item.label}
                      x1={vw / 2}
                      y1={centerY}
                      x2={vw / 2 + px}
                      y2={centerY + py}
                      stroke={lit ? "url(#cirqle-spoke)" : "rgba(122,89,255,0.35)"}
                      strokeWidth={lit ? 1.5 : 1}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: lit ? 0.5 : 0.1 }}
                      transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.55 }}
                    />
                  );
                })}
              </g>
            </svg>

            {/* System label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.15 }}
              style={{
                position: "absolute",
                top: 96,
                left: 24,
                margin: 0,
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(100,80,160,0.55)",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              Cirqle / Navigation
            </motion.p>

            {/* Orbit ring — hairline */}
            <motion.div
              aria-hidden="true"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                top: centerY - RADIUS,
                left: "50%",
                marginLeft: -RADIUS,
                width: RADIUS * 2,
                height: RADIUS * 2,
                borderRadius: "50%",
                border: "1px solid rgba(122,89,255,0.14)",
                pointerEvents: "none",
              }}
            />

            {/* Navigation nodes */}
            <nav aria-label="Mobile navigation" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {NAV_ITEMS.map((item, index) => {
                const { px, py } = nodePos(index);
                const active = isActive(item.path);
                const isContact = item.path === "/contact";
                const lit = focusNode === index;
                const size = isContact ? Math.round(NODE * 1.1) : NODE;

                return (
                  <motion.a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => { close(); handleNavClick(e, item.path); }}
                    onMouseEnter={() => setFocusNode(index)}
                    onMouseLeave={() => setFocusNode(null)}
                    onFocus={() => setFocusNode(index)}
                    onBlur={() => setFocusNode(null)}
                    aria-current={active ? "page" : undefined}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -px, y: -py, scale: 0.3 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: lit ? 1.08 : 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={
                      reducedMotion
                        ? { duration: 0.2 }
                        : { type: "spring", stiffness: 260, damping: 26, delay: 0.18 + index * 0.05 }
                    }
                    whileTap={{ scale: 0.94 }}
                    style={{
                      position: "absolute",
                      left: `calc(50% + ${px}px)`,
                      top: centerY + py,
                      marginLeft: -size / 2,
                      marginTop: -size / 2,
                      width: size,
                      height: size,
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 3,
                      textDecoration: "none",
                      pointerEvents: "auto",
                      userSelect: "none",
                      background: isContact
                        ? "linear-gradient(135deg, #A259FF 0%, #4CC3FF 100%)"
                        : "rgba(255,255,255,0.78)",
                      border: isContact ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(122,89,255,0.22)",
                      boxShadow: isContact
                        ? lit
                          ? "0 6px 26px rgba(162,89,255,0.5), 0 2px 8px rgba(76,195,255,0.3)"
                          : "0 5px 20px rgba(162,89,255,0.35)"
                        : lit
                          ? "0 6px 22px rgba(162,89,255,0.28), 0 0 0 1px rgba(162,89,255,0.25)"
                          : active
                            ? "0 4px 14px rgba(162,89,255,0.16), 0 0 0 2px #fff, 0 0 0 3px rgba(162,89,255,0.35)"
                            : "0 4px 14px rgba(122,89,255,0.1)",
                      transition: "box-shadow 0.25s ease",
                    }}
                  >
                    {/* luminous point */}
                    <span
                      aria-hidden="true"
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: isContact
                          ? "#fff"
                          : "linear-gradient(135deg, #A259FF, #4CC3FF)",
                        boxShadow: lit || isContact ? "0 0 6px rgba(162,89,255,0.6)" : "none",
                      }}
                    />
                    <span
                      style={{
                        fontSize: size >= 58 ? "0.6rem" : "0.54rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: isContact ? "#fff" : "#26203c",
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            {/* Central hub — the Cirqle mark */}
            <motion.a
              href="/"
              onClick={(e) => { close(); handleNavClick(e, "/"); }}
              aria-label="Go to Home"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={reducedMotion ? { duration: 0.2 } : { type: "spring", stiffness: 300, damping: 24 }}
              whileTap={{ scale: 0.94 }}
              style={{
                position: "absolute",
                top: centerY - HUB / 2,
                left: "50%",
                marginLeft: -HUB / 2,
                width: HUB,
                height: HUB,
                borderRadius: "50%",
                background:
                  "linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(135deg,#A259FF,#4CC3FF) border-box",
                border: "1.5px solid transparent",
                boxShadow: "0 10px 36px rgba(162,89,255,0.22), 0 0 0 6px rgba(162,89,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
                zIndex: 10,
                textDecoration: "none",
              }}
            >
              <img
                src="/favicon.ico"
                alt=""
                aria-hidden="true"
                style={{ width: Math.round(HUB * 0.5), height: Math.round(HUB * 0.5), objectFit: "contain" }}
              />
            </motion.a>

            {/* Contextual hint — supplemental only, never required */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: centerY + RADIUS + NODE / 2 + 18,
                left: 0,
                right: 0,
                textAlign: "center",
                pointerEvents: "none",
                userSelect: "none",
                minHeight: 34,
              }}
            >
              <AnimatePresence mode="wait">
                {focusNode !== null && (
                  <motion.div
                    key={NAV_ITEMS[focusNode].label}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p style={{ margin: 0, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#5b4b8a" }}>
                      {NAV_ITEMS[focusNode].label}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.72rem", color: "rgba(91,75,138,0.65)" }}>
                      {NAV_ITEMS[focusNode].hint}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social row — quiet, minimal */}
            <div style={{
              position: "absolute",
              bottom: "max(1.6rem, env(safe-area-inset-bottom, 0px))",
              left: 0, right: 0,
              display: "flex", justifyContent: "center", gap: "0.75rem",
              pointerEvents: "auto",
            }}>
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ delay: reducedMotion ? 0 : 0.55 + i * 0.04, duration: 0.25 }}
                  style={{
                    width: 38, height: 38,
                    borderRadius: "50%",
                    border: "1px solid rgba(122,89,255,0.22)",
                    background: "rgba(255,255,255,0.6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(100,80,160,0.75)",
                  }}
                >
                  <Icon style={{ width: 15, height: 15 }} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
