import { j as e, m as t, B as p } from "./index-CwkK_v2a.js";
import { r as c, i as y } from "./vendor-CIVdjJUp.js";
import { g as w, a as b, c as v } from "./contentService-DANRjCIE.js";
import {
  S as j,
  A as N,
  b as F,
  Z as g,
  C as H,
  E as C,
  X as z,
  d as k,
  L as W,
} from "./ui-D4ZHmBIb.js";
import { H as M } from "./HighlightProjects-DKrcBD6p.js";
import { I as f } from "./ImageWithFallback-BYbe2C9v.js";
import { A } from "./AboutSection-BKiDN2GC.js";
import "./motion-D6IIJ6jz.js";
import "./contentful-9eS7a33o.js";
function I() {
  const [a, d] = c.useState(null);
  return (
    c.useEffect(() => {
      let s = !1;
      return (
        w().then((l) => {
          const o = l?.[0]?.fields ?? null;
          !s && o && d(o);
        }),
        () => {
          s = !0;
        }
      );
    }, []),
    e.jsxs("section", {
      id: "home",
      className:
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 pb-16",
      children: [
        e.jsxs("div", {
          className: "absolute inset-0 overflow-hidden",
          children: [
            e.jsx(t.div, {
              className:
                "absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-[#A259FF]/15 to-[#4CC3FF]/15 rounded-full blur-3xl",
              animate: { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0] },
              transition: { duration: 10, repeat: 1 / 0, ease: "easeInOut" },
            }),
            e.jsx(t.div, {
              className:
                "absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-[#4CC3FF]/15 to-[#A259FF]/15 rounded-full blur-3xl",
              animate: { scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5], x: [0, -30, 0] },
              transition: { duration: 10, repeat: 1 / 0, ease: "easeInOut" },
            }),
            [...Array(8)].map((s, l) =>
              e.jsx(
                t.div,
                {
                  className:
                    "absolute w-2 h-2 bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] rounded-full",
                  style: { left: `${15 + l * 12}%`, top: `${25 + (l % 3) * 25}%` },
                  animate: { y: [0, -25, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] },
                  transition: { duration: 3 + l * 0.4, repeat: 1 / 0, ease: "easeInOut" },
                },
                l
              )
            ),
          ],
        }),
        e.jsxs("div", {
          className: "relative z-10 max-w-6xl mx-auto px-6 text-center",
          children: [
            e.jsxs(t.div, {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
              className: "mb-6",
              children: [
                e.jsxs(t.div, {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.6, delay: 0.2 },
                  className:
                    "inline-flex items-center gap-2 px-4 py-2 liquid-glass-card rounded-full mb-8 shadow-xl edge-glow float",
                  children: [
                    e.jsx(j, { className: "w-4 h-4 text-[#A259FF]" }),
                    e.jsx("span", {
                      className: "text-sm text-gray-900 font-medium",
                      children: a?.badgeText ?? "Premium Design Ecosystem",
                    }),
                  ],
                }),
                e.jsxs("h1", {
                  className:
                    "text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 tracking-tight leading-[1.1]",
                  children: [
                    a?.title ?? "One Circle.",
                    e.jsx("br", {}),
                    e.jsx("span", {
                      className:
                        "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent",
                      children: a?.highlight ?? "Infinite Possibilities.",
                    }),
                  ],
                }),
              ],
            }),
            e.jsx(t.p, {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.3 },
              className:
                "text-lg md:text-xl lg:text-2xl text-gray-800 max-w-3xl mx-auto mb-12 leading-relaxed",
              children:
                a?.subtitle ??
                "Premium designs delivered with speed and precision. From supermarket promotions to complete brand ecosystems — experience quality that speaks for itself.",
            }),
            e.jsxs(t.div, {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.5 },
              className: "flex flex-col sm:flex-row gap-5 justify-center items-center",
              children: [
                e.jsx(t.div, {
                  whileHover: { scale: 1.05, y: -2 },
                  whileTap: { scale: 0.98 },
                  children: e.jsxs(p, {
                    size: "lg",
                    className:
                      "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity px-10 py-7 text-lg rounded-full group shadow-lg shadow-[#A259FF]/25 cursor-hover",
                    children: [
                      a?.primaryCtaText ?? "Explore Our Work",
                      e.jsx(N, {
                        className: "ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform",
                      }),
                    ],
                  }),
                }),
                e.jsx(t.div, {
                  whileHover: { scale: 1.05, y: -2 },
                  whileTap: { scale: 0.98 },
                  children: e.jsx(p, {
                    size: "lg",
                    variant: "outline",
                    className:
                      "border-2 border-black text-black hover:bg-black hover:text-white transition-all px-10 py-7 text-lg rounded-full cursor-hover",
                    children: a?.secondaryCtaText ?? "Get Started",
                  }),
                }),
              ],
            }),
            e.jsx(t.div, {
              className: "mt-24",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1 },
              children: e.jsx(t.div, {
                animate: { y: [0, 12, 0] },
                transition: { duration: 2, repeat: 1 / 0, ease: "easeInOut" },
                className: "inline-block",
                children: e.jsx("div", {
                  className:
                    "w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2",
                  children: e.jsx(t.div, {
                    className:
                      "w-1.5 h-1.5 bg-gradient-to-b from-[#A259FF] to-[#4CC3FF] rounded-full",
                    animate: { y: [0, 12, 0] },
                    transition: { duration: 1.5, repeat: 1 / 0, ease: "easeInOut" },
                  }),
                }),
              }),
            }),
          ],
        }),
      ],
    })
  );
}
const T = [
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=1",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=2",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=3",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=4",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=5",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=6",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=7",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=8",
];
function X() {
  const [a, d] = c.useState(T),
    [s, l] = c.useState(null),
    [o, x] = c.useState(null);
  return (
    c.useEffect(() => {
      let i = !1;
      return (
        b()
          .then((r) => {
            if (i) return;
            const n = r?.[0]?.fields ?? null;
            if (!n) return;
            l(n);
            const h = n?.flyers,
              u = Array.isArray(h)
                ? h.map((m) => (typeof m == "string" ? m : v(m))).filter(Boolean)
                : [];
            u.length > 0 && d(u);
          })
          .catch((r) => {
            console.error("Error fetching supermarket flyers:", r);
          }),
        () => {
          i = !0;
        }
      );
    }, []),
    c.useEffect(() => {
      const i = (r) => {
        r.key === "Escape" && o && x(null);
      };
      return (
        o && window.addEventListener("keydown", i),
        () => {
          window.removeEventListener("keydown", i);
        }
      );
    }, [o]),
    e.jsxs("section", {
      className: "py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden",
      children: [
        e.jsx("div", {
          className:
            "absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none",
          style: {
            background:
              "radial-gradient(circle, rgba(162, 89, 255, 0.15) 0%, rgba(76, 195, 255, 0.1) 40%, rgba(255, 255, 255, 0) 70%)",
          },
        }),
        e.jsxs("div", {
          className: "max-w-7xl mx-auto relative z-10",
          children: [
            e.jsxs(t.div, {
              initial: { opacity: 0, filter: "blur(10px)" },
              whileInView: { opacity: 1, filter: "blur(0px)" },
              viewport: { once: !0, margin: "100px" },
              transition: { duration: 0.7 },
              className: "text-center mb-20",
              children: [
                e.jsx(t.div, {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: !0 },
                  transition: { duration: 0.5 },
                  className:
                    "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
                  children: e.jsx("span", {
                    className: "text-sm text-gray-900 font-medium",
                    children: s?.badgeText ?? "Core Specialty",
                  }),
                }),
                e.jsxs("h2", {
                  className: "text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight",
                  children: [
                    s?.title ?? "Supermarket Campaigns",
                    e.jsx("br", {}),
                    e.jsx("span", {
                      className:
                        "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent",
                      children: s?.highlight ?? "That Deliver Results",
                    }),
                  ],
                }),
                e.jsx("p", {
                  className: "text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed",
                  children:
                    s?.subtitle ??
                    "Professional promotional designs optimized for maximum impact across digital and print platforms.",
                }),
              ],
            }),
            e.jsx(t.div, {
              initial: { opacity: 0, filter: "blur(5px)" },
              whileInView: { opacity: 1, filter: "blur(0px)" },
              viewport: { once: !0, margin: "50px" },
              transition: { duration: 0.7, delay: 0.2 },
              className: "flex flex-wrap justify-center gap-6 mb-20",
              children: [
                { icon: F, label: "Premium Quality" },
                { icon: g, label: "High Impact" },
                { icon: H, label: "Rapid Delivery" },
              ].map((i, r) => {
                const n = i.icon;
                return e.jsxs(
                  t.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: !0, margin: "100px" },
                    transition: { duration: 0.4, delay: 0.2 + r * 0.1 },
                    className:
                      "flex items-center gap-3 liquid-glass-card px-7 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1 transform-gpu duration-300 cursor-hover edge-glow-hover refraction",
                    children: [
                      e.jsx("div", {
                        className:
                          "w-11 h-11 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-lg",
                        children: e.jsx(n, { className: "w-5 h-5 text-white" }),
                      }),
                      e.jsx("span", { className: "font-medium", children: i.label }),
                    ],
                  },
                  r
                );
              }),
            }),
            e.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14",
              children: a.map((i, r) =>
                e.jsx(
                  t.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: !0, margin: "100px" },
                    transition: { duration: 0.4, delay: (r + 1) * 0.05 },
                    className:
                      "group cursor-hover hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300 transform-gpu will-change-transform",
                    children: e.jsxs("div", {
                      className:
                        "relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl transition-shadow duration-500 refraction liquid-ripple edge-glow-hover",
                      children: [
                        e.jsx("div", {
                          className: "absolute inset-0 pointer-events-none z-20 micro-liquid",
                          children: e.jsx("div", {
                            className:
                              "absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-30",
                          }),
                        }),
                        e.jsxs("div", {
                          className: "relative aspect-[3/4] overflow-hidden",
                          children: [
                            e.jsx(f, {
                              src: i,
                              alt: `Supermarket Campaign ${r + 1}`,
                              width: 600,
                              height: 800,
                              className:
                                "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                            }),
                            e.jsx("div", {
                              className:
                                "absolute inset-0 p-4 flex justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                              children: e.jsx("button", {
                                "aria-label": "View Project",
                                onClick: (n) => {
                                  (n.preventDefault(), n.stopPropagation(), x(i));
                                },
                                className:
                                  "pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur-[16px] border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]",
                                children: e.jsx(C, { className: "w-5 h-5 drop-shadow-md" }),
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  },
                  r
                )
              ),
            }),
            e.jsx(t.div, {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { duration: 0.7 },
              className: "text-center",
              children: e.jsx(t.div, {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.98 },
                children: e.jsx(p, {
                  size: "lg",
                  className:
                    "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity px-10 py-7 text-lg rounded-full shadow-lg shadow-[#A259FF]/25 cursor-hover",
                  children: "View Full Portfolio",
                }),
              }),
            }),
          ],
        }),
        o &&
          e.jsxs("div", {
            className:
              "fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl",
            onClick: () => x(null),
            children: [
              e.jsx("button", {
                "aria-label": "Close Preview",
                onClick: (i) => {
                  (i.stopPropagation(), x(null));
                },
                className:
                  "fixed top-4 right-4 md:top-8 md:right-8 z-[10000] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all hover:scale-110 text-white",
                children: e.jsx(z, { strokeWidth: 1.5, className: "w-5 h-5 md:w-6 md:h-6" }),
              }),
              e.jsx("div", {
                className:
                  "relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-[2rem] p-4 md:p-8 shadow-[0_0_50px_-10px_rgba(162,89,255,0.2)] flex flex-col items-center justify-center overflow-hidden",
                onClick: (i) => i.stopPropagation(),
                children: e.jsx("div", {
                  className: "relative flex items-center justify-center rounded-xl overflow-hidden",
                  children: e.jsx(f, {
                    src: o,
                    alt: "Flyer Overview",
                    width: 1200,
                    height: 1600,
                    className: "max-w-[90vw] max-h-[90vh] object-contain drop-shadow-2xl",
                  }),
                }),
              }),
            ],
          }),
      ],
    })
  );
}
const Y = [
  {
    icon: k,
    title: "Premium Quality",
    description:
      "Every project crafted with meticulous attention to detail and professional excellence.",
  },
  {
    icon: W,
    title: "Seamless Integration",
    description: "All services work together harmoniously to deliver cohesive, impactful results.",
  },
  {
    icon: g,
    title: "Rapid Execution",
    description: "Fast turnaround times without compromising on quality or precision.",
  },
];
function D() {
  return e.jsxs("section", {
    className: "py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden",
    children: [
      e.jsx(t.div, {
        className:
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gray-200 rounded-full",
        animate: { rotate: 360 },
        transition: { duration: 60, repeat: 1 / 0, ease: "linear" },
        style: { opacity: 0.2 },
      }),
      e.jsx(t.div, {
        className:
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gray-200 rounded-full",
        animate: { rotate: -360 },
        transition: { duration: 45, repeat: 1 / 0, ease: "linear" },
        style: { opacity: 0.2 },
      }),
      e.jsx(t.div, {
        className:
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gray-200 rounded-full",
        animate: { rotate: 360 },
        transition: { duration: 30, repeat: 1 / 0, ease: "linear" },
        style: { opacity: 0.2 },
      }),
      e.jsxs("div", {
        className: "max-w-7xl mx-auto relative z-10",
        children: [
          e.jsxs(t.div, {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.7 },
            className: "text-center mb-20",
            children: [
              e.jsx(t.div, {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: !0 },
                transition: { duration: 0.5 },
                className:
                  "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
                children: e.jsx("span", { className: "text-sm", children: "Why Choose Us" }),
              }),
              e.jsx("h2", {
                className: "text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight",
                children: "The Cirqle Difference",
              }),
              e.jsx("p", {
                className: "text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed",
                children: "Experience excellence at every touchpoint",
              }),
            ],
          }),
          e.jsx("div", {
            className: "grid md:grid-cols-3 gap-10 max-w-6xl mx-auto",
            children: Y.map((a, d) => {
              const s = a.icon;
              return e.jsx(
                t.div,
                {
                  initial: { opacity: 0, scale: 0.8 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: !0 },
                  transition: { duration: 0.6, delay: d * 0.15 },
                  whileHover: { scale: 1.05, rotate: 2 },
                  className: "cursor-hover",
                  children: e.jsxs("div", {
                    className:
                      "liquid-glass-card p-8 rounded-3xl text-center shadow-xl hover:shadow-2xl transition-all duration-500 refraction edge-glow-hover",
                    children: [
                      e.jsx("div", {
                        className: "relative inline-block",
                        children: e.jsx(t.div, {
                          className:
                            "w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-xl edge-glow",
                          whileHover: { rotate: 360 },
                          transition: { duration: 0.6 },
                          children: e.jsx(s, { className: "w-10 h-10 text-white" }),
                        }),
                      }),
                      e.jsx("h3", { className: "text-2xl mb-3", children: a.title }),
                      e.jsx("p", {
                        className: "text-gray-600 leading-relaxed",
                        children: a.description,
                      }),
                    ],
                  }),
                },
                d
              );
            }),
          }),
        ],
      }),
    ],
  });
}
function Q() {
  return e.jsxs("main", {
    children: [
      e.jsxs(y, {
        children: [
          e.jsx("title", { children: "Cirqle – Premium Design Ecosystem" }),
          e.jsx("meta", {
            name: "description",
            content:
              "Cirqle is a complete design ecosystem delivering premium creative services, brand identity, digital production, and supermarket promotional design.",
          }),
          e.jsx("link", { rel: "canonical", href: "https://cirqle.work" }),
        ],
      }),
      e.jsx(I, {}),
      e.jsx(M, {}),
      e.jsx(X, {}),
      e.jsx(D, {}),
      e.jsx(A, {}),
    ],
  });
}
export { Q as Home };
