import { j as e, m as r } from "./index-CwkK_v2a.js";
import { r as a, i as p } from "./vendor-CIVdjJUp.js";
import { b as u } from "./contentService-DANRjCIE.js";
import { F as x, e as h, f as g, g as v, S as f, h as y } from "./ui-D4ZHmBIb.js";
import "./motion-D6IIJ6jz.js";
import "./contentful-9eS7a33o.js";
const w = [
  {
    icon: x,
    title: "Supermarket Campaigns",
    description: "Eye-catching promotional materials designed to captivate and convert.",
  },
  {
    icon: h,
    title: "Brand Design",
    description: "Complete visual identities that make lasting impressions.",
  },
  {
    icon: g,
    title: "Digital Creatives",
    description: "Engaging content crafted for maximum audience impact.",
  },
  {
    icon: v,
    title: "Tech Solutions",
    description: "Reliable technical support for seamless operations.",
  },
  {
    icon: f,
    title: "Future Services",
    description: "Forward-thinking solutions for tomorrow's challenges.",
  },
  { icon: y, title: "UI/UX Design", description: "Beautiful, intuitive experiences users love." },
];
function j() {
  const [s, o] = a.useState([]);
  a.useEffect(() => {
    let i = !1;
    return (
      u().then((t) => {
        !i && Array.isArray(t) && o(t);
      }),
      () => {
        i = !0;
      }
    );
  }, []);
  const l = s?.[0]?.fields?.sectionBadge ?? "Complete Ecosystem",
    c = s?.[0]?.fields?.sectionTitle ?? "All in One Cirqle",
    d = s?.[0]?.fields?.sectionSubtitle ?? "A complete suite of services, seamlessly connected";
  return e.jsx("section", {
    id: "services",
    className: "py-28 px-6 bg-white",
    children: e.jsxs("div", {
      className: "max-w-7xl mx-auto",
      children: [
        e.jsxs(r.div, {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          transition: { duration: 0.7 },
          className: "text-center mb-20",
          children: [
            e.jsx(r.div, {
              initial: { opacity: 0, scale: 0.9 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: !0 },
              transition: { duration: 0.5 },
              className:
                "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
              children: e.jsx("span", { className: "text-sm", children: l }),
            }),
            e.jsx("h2", {
              className: "text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight",
              children: c,
            }),
            e.jsx("p", {
              className: "text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed",
              children: d,
            }),
          ],
        }),
        e.jsx("div", {
          className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
          children: w.map((i, t) => {
            const m = i.icon,
              n = s?.[t]?.fields ?? null;
            return e.jsx(
              r.div,
              {
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: !0 },
                transition: { duration: 0.6, delay: t * 0.1 },
                whileHover: { y: -6, scale: 1.02 },
                className: "group cursor-hover",
                children: e.jsxs("div", {
                  className:
                    "relative h-full liquid-glass-card p-9 rounded-3xl hover:shadow-2xl transition-all duration-500 overflow-hidden refraction liquid-ripple edge-glow-hover",
                  children: [
                    e.jsx("div", {
                      className: "absolute inset-0 pointer-events-none z-10 micro-liquid",
                      children: e.jsx("div", {
                        className:
                          "absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-40",
                      }),
                    }),
                    e.jsx("div", {
                      className:
                        "absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-r from-[#A259FF]/20 to-[#4CC3FF]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400",
                    }),
                    e.jsxs("div", {
                      className: "relative z-10",
                      children: [
                        e.jsx(r.div, {
                          className:
                            "w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-xl edge-glow",
                          whileHover: { rotate: 5, scale: 1.1 },
                          transition: { duration: 0.4, type: "spring" },
                          children: e.jsx(m, { className: "w-8 h-8 text-white" }),
                        }),
                        e.jsx("h3", {
                          className: "text-2xl mb-3 tracking-tight",
                          children: n?.title ?? i.title,
                        }),
                        e.jsx("p", {
                          className: "text-gray-600 leading-relaxed",
                          children: n?.description ?? i.description,
                        }),
                      ],
                    }),
                  ],
                }),
              },
              t
            );
          }),
        }),
      ],
    }),
  });
}
function k() {
  return (
    a.useEffect(() => {
      window.scrollTo(0, 0);
    }, []),
    e.jsxs("main", {
      className: "pt-16",
      children: [
        e.jsxs(p, {
          children: [
            e.jsx("title", { children: "Services | Cirqle Design Ecosystem" }),
            e.jsx("meta", {
              name: "description",
              content:
                "Explore our comprehensive creative services including supermarket campaigns, brand identity design, and digital UI/UX solutions.",
            }),
            e.jsx("link", { rel: "canonical", href: "https://cirqle.work/services" }),
          ],
        }),
        e.jsx(j, {}),
      ],
    })
  );
}
export { k as Services };
