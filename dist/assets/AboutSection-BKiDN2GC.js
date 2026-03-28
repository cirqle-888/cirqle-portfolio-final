import { j as e, m as a } from "./index-CwkK_v2a.js";
import { r as n } from "./vendor-CIVdjJUp.js";
import { I as d } from "./ImageWithFallback-BYbe2C9v.js";
import { f as m, c as x } from "./contentService-DANRjCIE.js";
import { l as g } from "./ui-D4ZHmBIb.js";
const h = [
  "Professional design team",
  "Rapid turnaround",
  "Premium quality standards",
  "Modern technology",
];
function w() {
  const [t, o] = n.useState(null);
  n.useEffect(() => {
    let i = !1;
    return (
      m().then((s) => {
        const l = s?.[0]?.fields ?? null;
        !i && l && o(l);
      }),
      () => {
        i = !0;
      }
    );
  }, []);
  const c = t?.image && typeof t.image == "string" ? t.image : x(t?.image),
    r = Array.isArray(t?.strengths)
      ? t.strengths.map((i) => (typeof i == "string" ? i : null)).filter(Boolean)
      : null;
  return e.jsx("section", {
    id: "about",
    className: "py-28 px-6 bg-white",
    children: e.jsx("div", {
      className: "max-w-7xl mx-auto",
      children: e.jsxs("div", {
        className: "grid lg:grid-cols-2 gap-20 items-center",
        children: [
          e.jsxs(a.div, {
            initial: { opacity: 0, x: -50 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.8 },
            className: "relative order-2 lg:order-1",
            children: [
              e.jsx("div", {
                className:
                  "absolute -inset-6 bg-gradient-to-r from-[#A259FF]/15 to-[#4CC3FF]/15 rounded-3xl blur-3xl",
              }),
              e.jsxs(a.div, {
                className:
                  "relative rounded-3xl overflow-hidden shadow-2xl liquid-glass-thumbnail edge-glow-hover refraction",
                whileHover: { scale: 1.02 },
                transition: { duration: 0.4 },
                children: [
                  e.jsx("div", {
                    className: "absolute inset-0 pointer-events-none z-20 micro-liquid",
                    children: e.jsx("div", {
                      className:
                        "absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50",
                    }),
                  }),
                  e.jsx(d, {
                    src:
                      c ??
                      "https://images.unsplash.com/photo-1510832758362-af875829efcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxNDU2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
                    alt: t?.imageAlt ?? "Cirqle Creative Space",
                    width: 800,
                    height: 800,
                    className: "w-full aspect-square object-cover",
                  }),
                ],
              }),
            ],
          }),
          e.jsxs(a.div, {
            initial: { opacity: 0, x: 50 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.8 },
            className: "order-1 lg:order-2",
            children: [
              e.jsx(a.div, {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: !0 },
                transition: { duration: 0.5 },
                className:
                  "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
                children: e.jsx("span", {
                  className: "text-sm",
                  children: t?.badgeText ?? "About Cirqle",
                }),
              }),
              e.jsxs("h2", {
                className: "text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight",
                children: [
                  t?.headingPrefix ?? "Built on",
                  e.jsxs("span", {
                    className:
                      "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent",
                    children: [" ", t?.headingHighlight ?? "Excellence"],
                  }),
                ],
              }),
              e.jsx("p", {
                className: "text-xl text-gray-600 mb-6 leading-relaxed",
                children:
                  t?.paragraph1 ??
                  "Cirqle brings together design expertise and modern technology to deliver exceptional results. Every project is crafted with precision and delivered with speed.",
              }),
              e.jsx("p", {
                className: "text-lg text-gray-600 mb-10 leading-relaxed",
                children:
                  t?.paragraph2 ??
                  "Specializing in supermarket campaigns while offering comprehensive creative services — from branding to digital solutions. We focus on quality, professionalism, and delivering results that exceed expectations.",
              }),
              e.jsx("div", {
                className: "space-y-5",
                children: (r?.length ? r : h).map((i, s) =>
                  e.jsxs(
                    a.div,
                    {
                      initial: { opacity: 0, x: 20 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: !0 },
                      transition: { duration: 0.5, delay: s * 0.1 },
                      whileHover: { x: 5 },
                      className: "flex items-center gap-4",
                      children: [
                        e.jsx("div", {
                          className:
                            "w-7 h-7 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center flex-shrink-0 shadow-md",
                          children: e.jsx(g, { className: "w-4 h-4 text-white" }),
                        }),
                        e.jsx("span", { className: "text-lg", children: i }),
                      ],
                    },
                    s
                  )
                ),
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
export { w as A };
