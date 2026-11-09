import { useEffect, useRef } from "react";
import cursorImage from "../assets/cirqle-cursor.png";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, label, summary";

/**
 * Brand cursor: replaces the native pointer with the Cirqle arrow.
 *
 * Performance notes — this deliberately avoids React state:
 * position updates go straight to style.transform inside a
 * requestAnimationFrame loop, so mouse movement never re-renders the tree.
 * It self-disables on touch devices and for prefers-reduced-motion users.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const el = cursorRef.current;
    if (!el) return;

    // Hide native cursor only while the brand cursor is active
    document.documentElement.classList.add("has-custom-cursor");

    let targetX = -100;
    let targetY = -100;
    let raf = 0;
    let hovering = false;
    let visible = false;

    const render = () => {
      raf = 0;
      el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${hovering ? 1.35 : 1})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      schedule();
    };
    const onOver = (e: MouseEvent) => {
      const next = !!(e.target as Element | null)?.closest?.(INTERACTIVE_SELECTOR);
      if (next !== hovering) {
        hovering = next;
        schedule();
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <img
      ref={cursorRef}
      src={cursorImage}
      alt=""
      aria-hidden="true"
      width={24}
      height={32}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 24,
        height: "auto",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transform: "translate3d(-100px, -100px, 0)",
        transition: "opacity 0.2s ease",
        willChange: "transform",
      }}
    />
  );
}
