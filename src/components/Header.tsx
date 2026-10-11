import { useDialogFocus } from '../hooks/useDialogFocus';
import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import cirqleLogo from "../assets/cirqle-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube, LucideIcon, Menu, X, Sun, Moon } from "lucide-react";

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
 * Shared navigation links for desktop and the mobile list.
 */
/** Light/dark switcher: toggles html.dark, persists, updates theme-color meta. */
function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("cirqle-theme", next ? "dark" : "light");
    } catch {
      /* private mode */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#0E0C15" : "#7C5CFF");
  };
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
    >
      {dark ? <Sun style={{ width: 17, height: 17 }} /> : <Moon style={{ width: 17, height: 17 }} />}
    </button>
  );
}

export const Header = memo(function Header() {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presentationNavigation, setPresentationNavigation] = useState<string | null>(null);
  const navigate  = useNavigate();
  const location  = useLocation();
  const presentation = location.pathname === "/portfolio" && !location.hash && new URLSearchParams(location.search).get("view") !== "gallery";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!presentation) return;
    window.scrollTo({top: 0, behavior: 'instant'});
    let touchY = 0, previousY = window.scrollY;
    const reveal = () => setPresentationNavigation(location.key);
    const gesture = (up: boolean) => setPresentationNavigation(up ? location.key : null);
    const nested = (target: EventTarget | null) => target instanceof Element && !!target.closest('.wp-clients,.wp-picker-menu,[role="dialog"],input,textarea,select,video');
    const wheel = (event: WheelEvent) => {
      if (nested(event.target) || event.ctrlKey || Math.abs(event.deltaY) < 4 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      gesture(event.deltaY < 0);
    };
    const scrollDirection = () => {
      const delta = window.scrollY - previousY;
      if (Math.abs(delta) > 8) { gesture(delta < 0); previousY = window.scrollY; }
    };
    const topEdge = (event: PointerEvent) => { if(event.pointerType === 'mouse' && event.clientY < 18) reveal(); };
    const touchStart = (event: TouchEvent) => { touchY = event.touches[0]?.clientY || 0; };
    const touchEnd = (event: TouchEvent) => {
      if (nested(event.target)) return;
      const distance = (event.changedTouches[0]?.clientY || 0) - touchY;
      if (Math.abs(distance) > 40) gesture(distance > 0);
    };
    window.addEventListener('scroll', scrollDirection, {passive:true});
    window.addEventListener('pointermove', topEdge, {passive:true});
    window.addEventListener('wheel', wheel, {passive:true});
    window.addEventListener('touchstart', touchStart, {passive:true});
    window.addEventListener('touchend', touchEnd, {passive:true});
    window.addEventListener('cirqle:show-navigation', reveal);
    return () => {
      window.removeEventListener('scroll', scrollDirection);
      window.removeEventListener('pointermove', topEdge);
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchend', touchEnd);
      window.removeEventListener('cirqle:show-navigation', reveal);
    };
  }, [presentation, location.key]);

  useDialogFocus(isMobileMenuOpen, '[aria-label="Navigation menu"]');

  // Close on Escape or when desktop navigation becomes available.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onResize = () => { if (window.innerWidth >= 1100) setMobileMenuOpen(false); };
    window.addEventListener("resize", onResize);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", onResize);

      document.removeEventListener("keydown", onKeyDown);


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

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className={`site-header ${presentation && presentationNavigation !== location.key && !isMobileMenuOpen ? "site-header--away" : ""} fixed top-0 left-0 w-full max-w-[100vw] z-50 transition-all duration-500 box-border ${
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
              className="site-logo flex items-center relative z-10"
            >
              <img src={cirqleLogo} alt="Cirqle Design" width={480} height={195} loading="eager" className="site-logo-image" />
            </a>

            {/* Desktop nav */}
            <nav className="site-desktop-nav hidden md:flex items-center gap-10 relative z-10" aria-label="Main navigation">
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
                <ThemeToggle />
              </div>
            </nav>

            {/* Theme toggle + hamburger — mobile only */}
            <div className="site-mobile-tools md:hidden flex items-center gap-3" style={{ zIndex: 60 }}>
            <ThemeToggle />
            <button
              className="flex-shrink-0 relative"
              style={{ padding: 8, borderRadius: 8, color: "var(--c-ink-soft)" }}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              type="button"
            >
              {isMobileMenuOpen ? <X style={{ width: 26, height: 26 }} /> : <Menu style={{ width: 26, height: 26 }} />}
            </button>
            </div>

          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div id="mobile-navigation" className="mobile-navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .15 }} role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div className="mobile-navigation__top"><a href="/" onClick={e => { handleNavClick(e, "/"); close(); }} aria-label="Cirqle home"><img src={cirqleLogo} alt="Cirqle" width="105" /></a><button type="button" onClick={close} aria-label="Close navigation menu" className="mobile-navigation__close"><X size={24} /></button></div>
            <div className="mobile-navigation__body"><nav aria-label="Mobile navigation" className="mobile-navigation__links">
              {NAV_ITEMS.map((item, index) => <a key={item.path} href={item.path} aria-current={isActive(item.path) ? 'page' : undefined} onClick={e => { handleNavClick(e, item.path); close(); }}><i aria-hidden="true">0{index + 1}</i><span>{item.label}</span><small aria-hidden="true">↗</small></a>)}
            </nav>
            <aside className="mobile-navigation__studio"><div className="mobile-navigation__orbit" aria-hidden="true"><svg viewBox="30 35 130 145" width="70" height="78"><image href={cirqleLogo} width="480" height="195" /></svg></div><p className="mobile-navigation__eyebrow">A CIRCLE OF CREATIVE PEOPLE</p><h2>Good things<br/>start with a <em>conversation.</em></h2><a href="/contact" className="site-cta" onClick={e => { handleNavClick(e, '/contact'); close(); }}>Let’s create together <span aria-hidden="true">↗</span></a>
            <div className="mobile-navigation__socials">{SOCIAL_LINKS.map(({ icon: Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={20}/></a>)}</div></aside></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
