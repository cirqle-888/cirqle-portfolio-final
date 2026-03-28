const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/Home-X2TcIq-N.js",
      "assets/vendor-CIVdjJUp.js",
      "assets/contentService-DANRjCIE.js",
      "assets/contentful-9eS7a33o.js",
      "assets/ui-D4ZHmBIb.js",
      "assets/HighlightProjects-DKrcBD6p.js",
      "assets/ImageWithFallback-BYbe2C9v.js",
      "assets/AboutSection-BKiDN2GC.js",
      "assets/motion-D6IIJ6jz.js",
      "assets/Services-CJ4XHArF.js",
      "assets/Contact-Dvqb-U4S.js",
      "assets/ProjectDetail-4RViTCuz.js",
      "assets/About-BN7fU3mL.js",
      "assets/Portfolio-BQcMfXhf.js",
    ])
) => i.map((i) => d[i]);
import {
  b as Zt,
  d as te,
  r as c,
  R as ee,
  u as ne,
  e as se,
  L as C,
  B as oe,
  f as ie,
  h as N,
  H as re,
} from "./vendor-CIVdjJUp.js";
import { c as Nt, t as ae, T as le, R as ce, M as ue, P as de, a as he } from "./ui-D4ZHmBIb.js";
import {
  g as fe,
  s as Mt,
  i as At,
  a as nt,
  b as Vt,
  c as me,
  d as pe,
  e as ge,
  f as ve,
  r as xe,
  h as ye,
  j as Dt,
  k as we,
  l as Pe,
  m as be,
  o as Ce,
  S as Ee,
  H as je,
  F as S,
  n as Se,
  p as kt,
  q as F,
  t as Le,
  u as st,
  v as b,
  w as Rt,
  x as Ne,
  y as ot,
  z as Me,
  A as O,
  B as J,
  C as it,
  D as Ae,
  E as Ve,
  G as E,
  I as De,
  J as ke,
  K as Re,
  L as rt,
  M as Te,
  N as Ie,
  O as at,
  P as _e,
  Q as Fe,
  R as _,
  T as Oe,
  U as He,
  V as Tt,
  W as We,
  X as Be,
} from "./motion-D6IIJ6jz.js";
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const a of i.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
var z = { exports: {} },
  V = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var lt;
function ze() {
  if (lt) return V;
  lt = 1;
  var e = Zt(),
    t = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    s = Object.prototype.hasOwnProperty,
    o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(l, u, d) {
    var m,
      h = {},
      f = null,
      g = null;
    (d !== void 0 && (f = "" + d),
      u.key !== void 0 && (f = "" + u.key),
      u.ref !== void 0 && (g = u.ref));
    for (m in u) s.call(u, m) && !i.hasOwnProperty(m) && (h[m] = u[m]);
    if (l && l.defaultProps) for (m in ((u = l.defaultProps), u)) h[m] === void 0 && (h[m] = u[m]);
    return { $$typeof: t, type: l, key: f, ref: g, props: h, _owner: o.current };
  }
  return ((V.Fragment = n), (V.jsx = a), (V.jsxs = a), V);
}
var ct;
function Ge() {
  return (ct || ((ct = 1), (z.exports = ze())), z.exports);
}
var r = Ge(),
  T = {},
  ut;
function Ue() {
  if (ut) return T;
  ut = 1;
  var e = te();
  return ((T.createRoot = e.createRoot), (T.hydrateRoot = e.hydrateRoot), T);
}
var qe = Ue();
function dt(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function $e(...e) {
  return (t) => {
    let n = !1;
    const s = e.map((o) => {
      const i = dt(o, t);
      return (!n && typeof i == "function" && (n = !0), i);
    });
    if (n)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const i = s[o];
          typeof i == "function" ? i() : dt(e[o], null);
        }
      };
  };
}
var Ye = Symbol.for("react.lazy"),
  H = ee[" use ".trim().toString()];
function Xe(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function It(e) {
  return (
    e != null &&
    typeof e == "object" &&
    "$$typeof" in e &&
    e.$$typeof === Ye &&
    "_payload" in e &&
    Xe(e._payload)
  );
}
function Je(e) {
  const t = Qe(e),
    n = c.forwardRef((s, o) => {
      let { children: i, ...a } = s;
      It(i) && typeof H == "function" && (i = H(i._payload));
      const l = c.Children.toArray(i),
        u = l.find(tn);
      if (u) {
        const d = u.props.children,
          m = l.map((h) =>
            h === u
              ? c.Children.count(d) > 1
                ? c.Children.only(null)
                : c.isValidElement(d)
                  ? d.props.children
                  : null
              : h
          );
        return r.jsx(t, {
          ...a,
          ref: o,
          children: c.isValidElement(d) ? c.cloneElement(d, void 0, m) : null,
        });
      }
      return r.jsx(t, { ...a, ref: o, children: i });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var Ke = Je("Slot");
function Qe(e) {
  const t = c.forwardRef((n, s) => {
    let { children: o, ...i } = n;
    if ((It(o) && typeof H == "function" && (o = H(o._payload)), c.isValidElement(o))) {
      const a = nn(o),
        l = en(i, o.props);
      return (o.type !== c.Fragment && (l.ref = s ? $e(s, a) : a), c.cloneElement(o, l));
    }
    return c.Children.count(o) > 1 ? c.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Ze = Symbol("radix.slottable");
function tn(e) {
  return (
    c.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === Ze
  );
}
function en(e, t) {
  const n = { ...t };
  for (const s in t) {
    const o = e[s],
      i = t[s];
    /^on[A-Z]/.test(s)
      ? o && i
        ? (n[s] = (...l) => {
            const u = i(...l);
            return (o(...l), u);
          })
        : o && (n[s] = o)
      : s === "style"
        ? (n[s] = { ...o, ...i })
        : s === "className" && (n[s] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function nn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
const ht = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  ft = Nt,
  sn = (e, t) => (n) => {
    var s;
    if (t?.variants == null) return ft(e, n?.class, n?.className);
    const { variants: o, defaultVariants: i } = t,
      a = Object.keys(o).map((d) => {
        const m = n?.[d],
          h = i?.[d];
        if (m === null) return null;
        const f = ht(m) || ht(h);
        return o[d][f];
      }),
      l =
        n &&
        Object.entries(n).reduce((d, m) => {
          let [h, f] = m;
          return (f === void 0 || (d[h] = f), d);
        }, {}),
      u =
        t == null || (s = t.compoundVariants) === null || s === void 0
          ? void 0
          : s.reduce((d, m) => {
              let { class: h, className: f, ...g } = m;
              return Object.entries(g).every((p) => {
                let [v, x] = p;
                return Array.isArray(x) ? x.includes({ ...i, ...l }[v]) : { ...i, ...l }[v] === x;
              })
                ? [...d, h, f]
                : d;
            }, []);
    return ft(e, a, u, n?.class, n?.className);
  };
function _t(...e) {
  return ae(Nt(e));
}
const on = sn(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);
function mt({ className: e, variant: t, size: n, asChild: s = !1, ...o }) {
  const i = s ? Ke : "button";
  return r.jsx(i, {
    "data-slot": "button",
    className: _t(on({ variant: t, size: n, className: e })),
    ...o,
  });
}
class rn extends c.Component {
  state = { hasError: !1 };
  static getDerivedStateFromError(t) {
    return { hasError: !0, error: t };
  }
  componentDidCatch(t, n) {
    console.error("Uncaught error:", t, n);
  }
  handleReset = () => {
    this.setState({ hasError: !1, error: void 0 });
  };
  render() {
    return this.state.hasError
      ? r.jsx("div", {
          className:
            "min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white",
          children: r.jsxs("div", {
            className:
              "max-w-md w-full liquid-glass-card refraction p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden",
            children: [
              r.jsx("div", {
                className:
                  "absolute -inset-10 bg-gradient-to-tr from-[#A259FF]/10 to-[#4CC3FF]/10 blur-3xl rounded-full z-0 pointer-events-none",
              }),
              r.jsxs("div", {
                className: "relative z-10",
                children: [
                  r.jsx("div", {
                    className:
                      "w-16 h-16 mx-auto bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100",
                    children: r.jsx(le, { className: "w-8 h-8" }),
                  }),
                  r.jsx("h1", {
                    className: "text-2xl font-bold mb-3 tracking-tight text-gray-900",
                    children: "Oops, something went wrong",
                  }),
                  r.jsx("p", {
                    className: "text-gray-600 mb-8 leading-relaxed",
                    children:
                      "We apologize for the inconvenience. The application encountered an unexpected error.",
                  }),
                  r.jsxs("div", {
                    className: "flex flex-col gap-3",
                    children: [
                      r.jsxs(mt, {
                        onClick: this.handleReset,
                        className:
                          "w-full rounded-full py-6 text-base bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 shadow-lg cursor-hover",
                        children: [r.jsx(ce, { className: "w-4 h-4 mr-2" }), "Try Again"],
                      }),
                      r.jsx(mt, {
                        variant: "outline",
                        onClick: () => window.location.reload(),
                        className:
                          "w-full rounded-full py-6 text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 cursor-hover",
                        children: "Reload Page",
                      }),
                    ],
                  }),
                  !1,
                ],
              }),
            ],
          }),
        })
      : this.props.children;
  }
}
const an = "modulepreload",
  ln = function (e) {
    return "/" + e;
  },
  pt = {},
  A = function (t, n, s) {
    let o = Promise.resolve();
    if (n && n.length > 0) {
      let a = function (d) {
        return Promise.all(
          d.map((m) =>
            Promise.resolve(m).then(
              (h) => ({ status: "fulfilled", value: h }),
              (h) => ({ status: "rejected", reason: h })
            )
          )
        );
      };
      document.getElementsByTagName("link");
      const l = document.querySelector("meta[property=csp-nonce]"),
        u = l?.nonce || l?.getAttribute("nonce");
      o = a(
        n.map((d) => {
          if (((d = ln(d)), d in pt)) return;
          pt[d] = !0;
          const m = d.endsWith(".css"),
            h = m ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${d}"]${h}`)) return;
          const f = document.createElement("link");
          if (
            ((f.rel = m ? "stylesheet" : an),
            m || (f.as = "script"),
            (f.crossOrigin = ""),
            (f.href = d),
            u && f.setAttribute("nonce", u),
            document.head.appendChild(f),
            m)
          )
            return new Promise((g, p) => {
              (f.addEventListener("load", g),
                f.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${d}`))));
            });
        })
      );
    }
    function i(a) {
      const l = new Event("vite:preloadError", { cancelable: !0 });
      if (((l.payload = a), window.dispatchEvent(l), !l.defaultPrevented)) throw a;
    }
    return o.then((a) => {
      for (const l of a || []) l.status === "rejected" && i(l.reason);
      return t().catch(i);
    });
  },
  Ft = c.createContext({});
function cn(e) {
  const t = c.useRef(null);
  return (t.current === null && (t.current = e()), t.current);
}
const un = typeof window < "u",
  dn = un ? c.useLayoutEffect : c.useEffect,
  Z = c.createContext(null),
  Ot = c.createContext({ transformPagePoint: (e) => e, isStatic: !1, reducedMotion: "never" });
function hn(e = !0) {
  const t = c.useContext(Z);
  if (t === null) return [!0, null];
  const { isPresent: n, onExitComplete: s, register: o } = t,
    i = c.useId();
  c.useEffect(() => {
    if (e) return o(i);
  }, [e]);
  const a = c.useCallback(() => e && s && s(i), [i, s, e]);
  return !n && s ? [!1, a] : [!0];
}
const Ht = c.createContext({ strict: !1 }),
  gt = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  };
let vt = !1;
function fn() {
  if (vt) return;
  const e = {};
  for (const t in gt) e[t] = { isEnabled: (n) => gt[t].some((s) => !!n[s]) };
  (Mt(e), (vt = !0));
}
function Wt() {
  return (fn(), fe());
}
function mn(e) {
  const t = Wt();
  for (const n in e) t[n] = { ...t[n], ...e[n] };
  Mt(t);
}
const pn = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport",
]);
function W(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    pn.has(e)
  );
}
let Bt = (e) => !W(e);
function gn(e) {
  typeof e == "function" && (Bt = (t) => (t.startsWith("on") ? !W(t) : e(t)));
}
try {
  gn(require("@emotion/is-prop-valid").default);
} catch {}
function vn(e, t, n) {
  const s = {};
  for (const o in e)
    (o === "values" && typeof e.values == "object") ||
      ((Bt(o) || (n === !0 && W(o)) || (!t && !W(o)) || (e.draggable && o.startsWith("onDrag"))) &&
        (s[o] = e[o]));
  return s;
}
const B = c.createContext({});
function xn(e, t) {
  if (At(e)) {
    const { initial: n, animate: s } = e;
    return { initial: n === !1 || nt(n) ? n : void 0, animate: nt(s) ? s : void 0 };
  }
  return e.inherit !== !1 ? t : {};
}
function yn(e) {
  const { initial: t, animate: n } = xn(e, c.useContext(B));
  return c.useMemo(() => ({ initial: t, animate: n }), [xt(t), xt(n)]);
}
function xt(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const tt = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function zt(e, t, n) {
  for (const s in t) !Vt(t[s]) && !me(s, n) && (e[s] = t[s]);
}
function wn({ transformTemplate: e }, t) {
  return c.useMemo(() => {
    const n = tt();
    return (pe(n, t, e), Object.assign({}, n.vars, n.style));
  }, [t]);
}
function Pn(e, t) {
  const n = e.style || {},
    s = {};
  return (zt(s, n, e), Object.assign(s, wn(e, t)), s);
}
function bn(e, t) {
  const n = {},
    s = Pn(e, t);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((n.draggable = !1),
      (s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none"),
      (s.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0),
    (n.style = s),
    n
  );
}
const Gt = () => ({ ...tt(), attrs: {} });
function Cn(e, t, n, s) {
  const o = c.useMemo(() => {
    const i = Gt();
    return (ge(i, t, ve(s), e.transformTemplate, e.style), { ...i.attrs, style: { ...i.style } });
  }, [t]);
  if (e.style) {
    const i = {};
    (zt(i, e.style, e), (o.style = { ...i, ...o.style }));
  }
  return o;
}
const En = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function et(e) {
  return typeof e != "string" || e.includes("-") ? !1 : !!(En.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function jn(e, t, n, { latestValues: s }, o, i = !1, a) {
  const u = ((a ?? et(e)) ? Cn : bn)(t, s, o, e),
    d = vn(t, typeof e == "string", i),
    m = e !== c.Fragment ? { ...d, ...u, ref: n } : {},
    { children: h } = t,
    f = c.useMemo(() => (Vt(h) ? h.get() : h), [h]);
  return c.createElement(e, { ...m, children: f });
}
function Sn({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, s, o) {
  return { latestValues: Ln(n, s, o, e), renderState: t() };
}
function Ln(e, t, n, s) {
  const o = {},
    i = s(e, {});
  for (const f in i) o[f] = xe(i[f]);
  let { initial: a, animate: l } = e;
  const u = At(e),
    d = ye(e);
  t &&
    d &&
    !u &&
    e.inherit !== !1 &&
    (a === void 0 && (a = t.initial), l === void 0 && (l = t.animate));
  let m = n ? n.initial === !1 : !1;
  m = m || a === !1;
  const h = m ? l : a;
  if (h && typeof h != "boolean" && !Dt(h)) {
    const f = Array.isArray(h) ? h : [h];
    for (let g = 0; g < f.length; g++) {
      const p = we(e, f[g]);
      if (p) {
        const { transitionEnd: v, transition: x, ...w } = p;
        for (const y in w) {
          let P = w[y];
          if (Array.isArray(P)) {
            const R = m ? P.length - 1 : 0;
            P = P[R];
          }
          P !== null && (o[y] = P);
        }
        for (const y in v) o[y] = v[y];
      }
    }
  }
  return o;
}
const Ut = (e) => (t, n) => {
    const s = c.useContext(B),
      o = c.useContext(Z),
      i = () => Sn(e, t, s, o);
    return n ? i() : cn(i);
  },
  Nn = Ut({ scrapeMotionValuesFromProps: Pe, createRenderState: tt }),
  Mn = Ut({ scrapeMotionValuesFromProps: be, createRenderState: Gt }),
  An = Symbol.for("motionComponentSymbol");
function Vn(e, t, n) {
  const s = c.useRef(n);
  c.useInsertionEffect(() => {
    s.current = n;
  });
  const o = c.useRef(null);
  return c.useCallback(
    (i) => {
      i && e.onMount?.(i);
      const a = s.current;
      if (typeof a == "function")
        if (i) {
          const l = a(i);
          typeof l == "function" && (o.current = l);
        } else o.current ? (o.current(), (o.current = null)) : a(i);
      else a && (a.current = i);
      t && (i ? t.mount(i) : t.unmount());
    },
    [t]
  );
}
const qt = c.createContext({});
function M(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function Dn(e, t, n, s, o, i) {
  const { visualElement: a } = c.useContext(B),
    l = c.useContext(Ht),
    u = c.useContext(Z),
    d = c.useContext(Ot),
    m = d.reducedMotion,
    h = d.skipAnimations,
    f = c.useRef(null),
    g = c.useRef(!1);
  ((s = s || l.renderer),
    !f.current &&
      s &&
      ((f.current = s(e, {
        visualState: t,
        parent: a,
        props: n,
        presenceContext: u,
        blockInitialAnimation: u ? u.initial === !1 : !1,
        reducedMotionConfig: m,
        skipAnimations: h,
        isSVG: i,
      })),
      g.current && f.current && (f.current.manuallyAnimateOnMount = !0)));
  const p = f.current,
    v = c.useContext(qt);
  p && !p.projection && o && (p.type === "html" || p.type === "svg") && kn(f.current, n, o, v);
  const x = c.useRef(!1);
  c.useInsertionEffect(() => {
    p && x.current && p.update(n, u);
  });
  const w = n[Ce],
    y = c.useRef(
      !!w &&
        typeof window < "u" &&
        !window.MotionHandoffIsComplete?.(w) &&
        window.MotionHasOptimisedAnimation?.(w)
    );
  return (
    dn(() => {
      ((g.current = !0),
        p &&
          ((x.current = !0),
          (window.MotionIsMounted = !0),
          p.updateFeatures(),
          p.scheduleRenderMicrotask(),
          y.current && p.animationState && p.animationState.animateChanges()));
    }),
    c.useEffect(() => {
      p &&
        (!y.current && p.animationState && p.animationState.animateChanges(),
        y.current &&
          (queueMicrotask(() => {
            window.MotionHandoffMarkAsComplete?.(w);
          }),
          (y.current = !1)),
        (p.enteringChildren = void 0));
    }),
    p
  );
}
function kn(e, t, n, s) {
  const {
    layoutId: o,
    layout: i,
    drag: a,
    dragConstraints: l,
    layoutScroll: u,
    layoutRoot: d,
    layoutCrossfade: m,
  } = t;
  ((e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : $t(e.parent))),
    e.projection.setOptions({
      layoutId: o,
      layout: i,
      alwaysMeasureLayout: !!a || (l && M(l)),
      visualElement: e,
      animationType: typeof i == "string" ? i : "both",
      initialPromotionConfig: s,
      crossfade: m,
      layoutScroll: u,
      layoutRoot: d,
    }));
}
function $t(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : $t(e.parent);
}
function G(e, { forwardMotionProps: t = !1, type: n } = {}, s, o) {
  s && mn(s);
  const i = n ? n === "svg" : et(e),
    a = i ? Mn : Nn;
  function l(d, m) {
    let h;
    const f = { ...c.useContext(Ot), ...d, layoutId: Rn(d) },
      { isStatic: g } = f,
      p = yn(d),
      v = a(d, g);
    if (!g && typeof window < "u") {
      Tn();
      const x = In(f);
      ((h = x.MeasureLayout), (p.visualElement = Dn(e, v, f, o, x.ProjectionNode, i)));
    }
    return r.jsxs(B.Provider, {
      value: p,
      children: [
        h && p.visualElement ? r.jsx(h, { visualElement: p.visualElement, ...f }) : null,
        jn(e, d, Vn(v, p.visualElement, m), v, g, t, i),
      ],
    });
  }
  l.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
  const u = c.forwardRef(l);
  return ((u[An] = e), u);
}
function Rn({ layoutId: e }) {
  const t = c.useContext(Ft).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function Tn(e, t) {
  c.useContext(Ht).strict;
}
function In(e) {
  const t = Wt(),
    { drag: n, layout: s } = t;
  if (!n && !s) return {};
  const o = { ...n, ...s };
  return {
    MeasureLayout: n?.isEnabled(e) || s?.isEnabled(e) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode,
  };
}
function _n(e, t) {
  if (typeof Proxy > "u") return G;
  const n = new Map(),
    s = (i, a) => G(i, a, e, t),
    o = (i, a) => s(i, a);
  return new Proxy(o, {
    get: (i, a) => (a === "create" ? s : (n.has(a) || n.set(a, G(a, void 0, e, t)), n.get(a))),
  });
}
const Fn = (e, t) =>
  (t.isSVG ?? et(e)) ? new Ee(t) : new je(t, { allowProjection: e !== c.Fragment });
class On extends S {
  constructor(t) {
    (super(t), t.animationState || (t.animationState = Se(t)));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Dt(t) && (this.unmountControls = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    (this.node.animationState.reset(), this.unmountControls?.());
  }
}
let Hn = 0;
class Wn extends S {
  constructor() {
    (super(...arguments), (this.id = Hn++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === s) return;
    const o = this.node.animationState.setActive("exit", !t);
    n &&
      !t &&
      o.then(() => {
        n(this.id);
      });
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {};
    (n && n(this.id), t && (this.unmount = t(this.id)));
  }
  unmount() {}
}
const Bn = { animation: { Feature: On }, exit: { Feature: Wn } };
function k(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
const zn = (e) => (t) => kt(t) && e(t, k(t));
function D(e, t, n, s) {
  return F(e, t, zn(n), s);
}
const Yt = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  yt = new Set(["auto", "scroll"]);
class Xt {
  constructor(
    t,
    n,
    {
      transformPagePoint: s,
      contextWindow: o = window,
      dragSnapToOrigin: i = !1,
      distanceThreshold: a = 3,
      element: l,
    } = {}
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.scrollPositions = new Map()),
      (this.removeScrollListeners = null),
      (this.onElementScroll = (g) => {
        this.handleScroll(g.target);
      }),
      (this.onWindowScroll = () => {
        this.handleScroll(window);
      }),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const g = q(this.lastMoveEventInfo, this.history),
          p = this.startEvent !== null,
          v = Le(g.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!p && !v) return;
        const { point: x } = g,
          { timestamp: w } = st;
        this.history.push({ ...x, timestamp: w });
        const { onStart: y, onMove: P } = this.handlers;
        (p || (y && y(this.lastMoveEvent, g), (this.startEvent = this.lastMoveEvent)),
          P && P(this.lastMoveEvent, g));
      }),
      (this.handlePointerMove = (g, p) => {
        ((this.lastMoveEvent = g),
          (this.lastMoveEventInfo = U(p, this.transformPagePoint)),
          b.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (g, p) => {
        this.end();
        const { onEnd: v, onSessionEnd: x, resumeAnimation: w } = this.handlers;
        if (
          ((this.dragSnapToOrigin || !this.startEvent) && w && w(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const y = q(
          g.type === "pointercancel" ? this.lastMoveEventInfo : U(p, this.transformPagePoint),
          this.history
        );
        (this.startEvent && v && v(g, y), x && x(g, y));
      }),
      !kt(t))
    )
      return;
    ((this.dragSnapToOrigin = i),
      (this.handlers = n),
      (this.transformPagePoint = s),
      (this.distanceThreshold = a),
      (this.contextWindow = o || window));
    const u = k(t),
      d = U(u, this.transformPagePoint),
      { point: m } = d,
      { timestamp: h } = st;
    this.history = [{ ...m, timestamp: h }];
    const { onSessionStart: f } = n;
    (f && f(t, q(d, this.history)),
      (this.removeListeners = Rt(
        D(this.contextWindow, "pointermove", this.handlePointerMove),
        D(this.contextWindow, "pointerup", this.handlePointerUp),
        D(this.contextWindow, "pointercancel", this.handlePointerUp)
      )),
      l && this.startScrollTracking(l));
  }
  startScrollTracking(t) {
    let n = t.parentElement;
    for (; n; ) {
      const s = getComputedStyle(n);
      ((yt.has(s.overflowX) || yt.has(s.overflowY)) &&
        this.scrollPositions.set(n, { x: n.scrollLeft, y: n.scrollTop }),
        (n = n.parentElement));
    }
    (this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }),
      window.addEventListener("scroll", this.onElementScroll, { capture: !0 }),
      window.addEventListener("scroll", this.onWindowScroll),
      (this.removeScrollListeners = () => {
        (window.removeEventListener("scroll", this.onElementScroll, { capture: !0 }),
          window.removeEventListener("scroll", this.onWindowScroll));
      }));
  }
  handleScroll(t) {
    const n = this.scrollPositions.get(t);
    if (!n) return;
    const s = t === window,
      o = s ? { x: window.scrollX, y: window.scrollY } : { x: t.scrollLeft, y: t.scrollTop },
      i = { x: o.x - n.x, y: o.y - n.y };
    (i.x === 0 && i.y === 0) ||
      (s
        ? this.lastMoveEventInfo &&
          ((this.lastMoveEventInfo.point.x += i.x), (this.lastMoveEventInfo.point.y += i.y))
        : this.history.length > 0 && ((this.history[0].x -= i.x), (this.history[0].y -= i.y)),
      this.scrollPositions.set(t, o),
      b.update(this.updatePoint, !0));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    (this.removeListeners && this.removeListeners(),
      this.removeScrollListeners && this.removeScrollListeners(),
      this.scrollPositions.clear(),
      Ne(this.updatePoint));
  }
}
function U(e, t) {
  return t ? { point: t(e.point) } : e;
}
function wt(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function q({ point: e }, t) {
  return { point: e, delta: wt(e, Jt(t)), offset: wt(e, Gn(t)), velocity: Un(t, 0.1) };
}
function Gn(e) {
  return e[0];
}
function Jt(e) {
  return e[e.length - 1];
}
function Un(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    s = null;
  const o = Jt(e);
  for (; n >= 0 && ((s = e[n]), !(o.timestamp - s.timestamp > ot(t))); ) n--;
  if (!s) return { x: 0, y: 0 };
  s === e[0] && e.length > 2 && o.timestamp - s.timestamp > ot(t) * 2 && (s = e[1]);
  const i = Me(o.timestamp - s.timestamp);
  if (i === 0) return { x: 0, y: 0 };
  const a = { x: (o.x - s.x) / i, y: (o.y - s.y) / i };
  return (a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a);
}
function qn(e, { min: t, max: n }, s) {
  return (
    t !== void 0 && e < t
      ? (e = s ? O(t, e, s.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = s ? O(n, e, s.max) : Math.min(e, n)),
    e
  );
}
function Pt(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function $n(e, { top: t, left: n, bottom: s, right: o }) {
  return { x: Pt(e.x, n, o), y: Pt(e.y, t, s) };
}
function bt(e, t) {
  let n = t.min - e.min,
    s = t.max - e.max;
  return (t.max - t.min < e.max - e.min && ([n, s] = [s, n]), { min: n, max: s });
}
function Yn(e, t) {
  return { x: bt(e.x, t.x), y: bt(e.y, t.y) };
}
function Xn(e, t) {
  let n = 0.5;
  const s = J(e),
    o = J(t);
  return (
    o > s ? (n = it(t.min, t.max - s, e.min)) : s > o && (n = it(e.min, e.max - o, t.min)),
    Ae(0, 1, n)
  );
}
function Jn(e, t) {
  const n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
const K = 0.35;
function Kn(e = K) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = K),
    { x: Ct(e, "left", "right"), y: Ct(e, "top", "bottom") }
  );
}
function Ct(e, t, n) {
  return { min: Et(e, t), max: Et(e, n) };
}
function Et(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const Qn = new WeakMap();
class Zn {
  constructor(t) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = Ve()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = t));
  }
  start(t, { snapToCursor: n = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1) return;
    const i = (h) => {
        (n && this.snapToCursor(k(h).point), this.stopAnimation());
      },
      a = (h, f) => {
        const { drag: g, dragPropagation: p, onDragStart: v } = this.getProps();
        if (
          g &&
          !p &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = Ie(g)),
          !this.openDragLock)
        )
          return;
        ((this.latestPointerEvent = h),
          (this.latestPanInfo = f),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          E((w) => {
            let y = this.getAxisMotionValue(w).get() || 0;
            if (_e.test(y)) {
              const { projection: P } = this.visualElement;
              if (P && P.layout) {
                const R = P.layout.layoutBox[w];
                R && (y = J(R) * (parseFloat(y) / 100));
              }
            }
            this.originPoint[w] = y;
          }),
          v && b.update(() => v(h, f), !1, !0),
          rt(this.visualElement, "transform"));
        const { animationState: x } = this.visualElement;
        x && x.setActive("whileDrag", !0);
      },
      l = (h, f) => {
        ((this.latestPointerEvent = h), (this.latestPanInfo = f));
        const {
          dragPropagation: g,
          dragDirectionLock: p,
          onDirectionLock: v,
          onDrag: x,
        } = this.getProps();
        if (!g && !this.openDragLock) return;
        const { offset: w } = f;
        if (p && this.currentDirection === null) {
          ((this.currentDirection = es(w)),
            this.currentDirection !== null && v && v(this.currentDirection));
          return;
        }
        (this.updateAxis("x", f.point, w),
          this.updateAxis("y", f.point, w),
          this.visualElement.render(),
          x && b.update(() => x(h, f), !1, !0));
      },
      u = (h, f) => {
        ((this.latestPointerEvent = h),
          (this.latestPanInfo = f),
          this.stop(h, f),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null));
      },
      d = () => {
        const { dragSnapToOrigin: h } = this.getProps();
        (h || this.constraints) && this.startAnimation({ x: 0, y: 0 });
      },
      { dragSnapToOrigin: m } = this.getProps();
    this.panSession = new Xt(
      t,
      { onSessionStart: i, onStart: a, onMove: l, onSessionEnd: u, resumeAnimation: d },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: m,
        distanceThreshold: s,
        contextWindow: Yt(this.visualElement),
        element: this.visualElement.current,
      }
    );
  }
  stop(t, n) {
    const s = t || this.latestPointerEvent,
      o = n || this.latestPanInfo,
      i = this.isDragging;
    if ((this.cancel(), !i || !o || !s)) return;
    const { velocity: a } = o;
    this.startAnimation(a);
    const { onDragEnd: l } = this.getProps();
    l && b.postRender(() => l(s, o));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    (t && (t.isAnimationBlocked = !1), this.endPanSession());
    const { dragPropagation: s } = this.getProps();
    (!s && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive("whileDrag", !1));
  }
  endPanSession() {
    (this.panSession && this.panSession.end(), (this.panSession = void 0));
  }
  updateAxis(t, n, s) {
    const { drag: o } = this.getProps();
    if (!s || !I(t, o, this.currentDirection)) return;
    const i = this.getAxisMotionValue(t);
    let a = this.originPoint[t] + s[t];
    (this.constraints && this.constraints[t] && (a = qn(a, this.constraints[t], this.elastic[t])),
      i.set(a));
  }
  resolveConstraints() {
    const { dragConstraints: t, dragElastic: n } = this.getProps(),
      s =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : this.visualElement.projection?.layout,
      o = this.constraints;
    (t && M(t)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : t && s
        ? (this.constraints = $n(s.layoutBox, t))
        : (this.constraints = !1),
      (this.elastic = Kn(n)),
      o !== this.constraints &&
        !M(t) &&
        s &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        E((i) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(i) &&
            (this.constraints[i] = Jn(s.layoutBox[i], this.constraints[i]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !M(t)) return !1;
    const s = t.current,
      { projection: o } = this.visualElement;
    if (!o || !o.layout) return !1;
    const i = De(s, o.root, this.visualElement.getTransformPagePoint());
    let a = Yn(o.layout.layoutBox, i);
    if (n) {
      const l = n(ke(a));
      ((this.hasMutatedConstraints = !!l), l && (a = Re(l)));
    }
    return a;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: s,
        dragElastic: o,
        dragTransition: i,
        dragSnapToOrigin: a,
        onDragTransitionEnd: l,
      } = this.getProps(),
      u = this.constraints || {},
      d = E((m) => {
        if (!I(m, n, this.currentDirection)) return;
        let h = (u && u[m]) || {};
        a && (h = { min: 0, max: 0 });
        const f = o ? 200 : 1e6,
          g = o ? 40 : 1e7,
          p = {
            type: "inertia",
            velocity: s ? t[m] : 0,
            bounceStiffness: f,
            bounceDamping: g,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...i,
            ...h,
          };
        return this.startAxisValueAnimation(m, p);
      });
    return Promise.all(d).then(l);
  }
  startAxisValueAnimation(t, n) {
    const s = this.getAxisMotionValue(t);
    return (rt(this.visualElement, t), s.start(Te(t, s, 0, n, this.visualElement, !1)));
  }
  stopAnimation() {
    E((t) => this.getAxisMotionValue(t).stop());
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      s = this.visualElement.getProps(),
      o = s[n];
    return o || this.visualElement.getValue(t, (s.initial ? s.initial[t] : void 0) || 0);
  }
  snapToCursor(t) {
    E((n) => {
      const { drag: s } = this.getProps();
      if (!I(n, s, this.currentDirection)) return;
      const { projection: o } = this.visualElement,
        i = this.getAxisMotionValue(n);
      if (o && o.layout) {
        const { min: a, max: l } = o.layout.layoutBox[n],
          u = i.get() || 0;
        i.set(t[n] - O(a, l, 0.5) + u);
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: s } = this.visualElement;
    if (!M(n) || !s || !this.constraints) return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    E((a) => {
      const l = this.getAxisMotionValue(a);
      if (l && this.constraints !== !1) {
        const u = l.get();
        o[a] = Xn({ min: u, max: u }, this.constraints[a]);
      }
    });
    const { transformTemplate: i } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = i ? i({}, "") : "none"),
      s.root && s.root.updateScroll(),
      s.updateLayout(),
      (this.constraints = !1),
      this.resolveConstraints(),
      E((a) => {
        if (!I(a, t, null)) return;
        const l = this.getAxisMotionValue(a),
          { min: u, max: d } = this.constraints[a];
        l.set(O(u, d, o[a]));
      }),
      this.visualElement.render());
  }
  addListeners() {
    if (!this.visualElement.current) return;
    Qn.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = D(t, "pointerdown", (d) => {
        const { drag: m, dragListener: h = !0 } = this.getProps(),
          f = d.target,
          g = f !== t && Fe(f);
        m && h && !g && this.start(d);
      });
    let s;
    const o = () => {
        const { dragConstraints: d } = this.getProps();
        M(d) &&
          d.current &&
          ((this.constraints = this.resolveRefConstraints()),
          s || (s = ts(t, d.current, () => this.scalePositionWithinConstraints())));
      },
      { projection: i } = this.visualElement,
      a = i.addEventListener("measure", o);
    (i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), b.read(o));
    const l = F(window, "resize", () => this.scalePositionWithinConstraints()),
      u = i.addEventListener("didUpdate", ({ delta: d, hasLayoutChanged: m }) => {
        this.isDragging &&
          m &&
          (E((h) => {
            const f = this.getAxisMotionValue(h);
            f && ((this.originPoint[h] += d[h].translate), f.set(f.get() + d[h].translate));
          }),
          this.visualElement.render());
      });
    return () => {
      (l(), n(), a(), u && u(), s && s());
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: s = !1,
        dragPropagation: o = !1,
        dragConstraints: i = !1,
        dragElastic: a = K,
        dragMomentum: l = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: o,
      dragConstraints: i,
      dragElastic: a,
      dragMomentum: l,
    };
  }
}
function jt(e) {
  let t = !0;
  return () => {
    if (t) {
      t = !1;
      return;
    }
    e();
  };
}
function ts(e, t, n) {
  const s = at(e, jt(n)),
    o = at(t, jt(n));
  return () => {
    (s(), o());
  };
}
function I(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function es(e, t = 10) {
  let n = null;
  return (Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n);
}
class ns extends S {
  constructor(t) {
    (super(t),
      (this.removeGroupControls = _),
      (this.removeListeners = _),
      (this.controls = new Zn(t)));
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    (t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || _));
  }
  update() {
    const { dragControls: t } = this.node.getProps(),
      { dragControls: n } = this.node.prevProps || {};
    t !== n &&
      (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)));
  }
  unmount() {
    (this.removeGroupControls(),
      this.removeListeners(),
      this.controls.isDragging || this.controls.endPanSession());
  }
}
const $ = (e) => (t, n) => {
  e && b.update(() => e(t, n), !1, !0);
};
class ss extends S {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = _));
  }
  onPointerDown(t) {
    this.session = new Xt(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Yt(this.node),
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: s, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: $(t),
      onStart: $(n),
      onMove: $(s),
      onEnd: (i, a) => {
        (delete this.session, o && b.postRender(() => o(i, a)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = D(this.node.current, "pointerdown", (t) =>
      this.onPointerDown(t)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
let Y = !1;
class os extends c.Component {
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: s, layoutId: o } = this.props,
      { projection: i } = t;
    (i &&
      (n.group && n.group.add(i),
      s && s.register && o && s.register(i),
      Y && i.root.didUpdate(),
      i.addEventListener("animationComplete", () => {
        this.safeToRemove();
      }),
      i.setOptions({
        ...i.options,
        layoutDependency: this.props.layoutDependency,
        onExitComplete: () => this.safeToRemove(),
      })),
      (He.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: s, drag: o, isPresent: i } = this.props,
      { projection: a } = s;
    return (
      a &&
        ((a.isPresent = i),
        t.layoutDependency !== n && a.setOptions({ ...a.options, layoutDependency: n }),
        (Y = !0),
        o || t.layoutDependency !== n || n === void 0 || t.isPresent !== i
          ? a.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== i &&
          (i
            ? a.promote()
            : a.relegate() ||
              b.postRender(() => {
                const l = a.getStack();
                (!l || !l.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      Oe.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: s } = this.props,
      { projection: o } = t;
    ((Y = !0),
      o &&
        (o.scheduleCheckAfterUnmount(),
        n && n.group && n.group.remove(o),
        s && s.deregister && s.deregister(o)));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function Kt(e) {
  const [t, n] = hn(),
    s = c.useContext(Ft);
  return r.jsx(os, {
    ...e,
    layoutGroup: s,
    switchLayoutGroup: c.useContext(qt),
    isPresent: t,
    safeToRemove: n,
  });
}
const is = { pan: { Feature: ss }, drag: { Feature: ns, ProjectionNode: Tt, MeasureLayout: Kt } };
function St(e, t, n) {
  const { props: s } = e;
  e.animationState && s.whileHover && e.animationState.setActive("whileHover", n === "Start");
  const o = "onHover" + n,
    i = s[o];
  i && b.postRender(() => i(t, k(t)));
}
class rs extends S {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = We(t, (n, s) => (St(this.node, s, "Start"), (o) => St(this.node, o, "End"))));
  }
  unmount() {}
}
class as extends S {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0), (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1), (this.isActive = !1));
  }
  mount() {
    this.unmount = Rt(
      F(this.node.current, "focus", () => this.onFocus()),
      F(this.node.current, "blur", () => this.onBlur())
    );
  }
  unmount() {}
}
function Lt(e, t, n) {
  const { props: s } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
  e.animationState && s.whileTap && e.animationState.setActive("whileTap", n === "Start");
  const o = "onTap" + (n === "End" ? "" : n),
    i = s[o];
  i && b.postRender(() => i(t, k(t)));
}
class ls extends S {
  mount() {
    const { current: t } = this.node;
    if (!t) return;
    const { globalTapTarget: n, propagate: s } = this.node.props;
    this.unmount = Be(
      t,
      (o, i) => (
        Lt(this.node, i, "Start"),
        (a, { success: l }) => Lt(this.node, a, l ? "End" : "Cancel")
      ),
      { useGlobalTarget: n, stopPropagation: s?.tap === !1 }
    );
  }
  unmount() {}
}
const Q = new WeakMap(),
  X = new WeakMap(),
  cs = (e) => {
    const t = Q.get(e.target);
    t && t(e);
  },
  us = (e) => {
    e.forEach(cs);
  };
function ds({ root: e, ...t }) {
  const n = e || document;
  X.has(n) || X.set(n, {});
  const s = X.get(n),
    o = JSON.stringify(t);
  return (s[o] || (s[o] = new IntersectionObserver(us, { root: e, ...t })), s[o]);
}
function hs(e, t, n) {
  const s = ds(t);
  return (
    Q.set(e, n),
    s.observe(e),
    () => {
      (Q.delete(e), s.unobserve(e));
    }
  );
}
const fs = { some: 0, all: 1 };
class ms extends S {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: s, amount: o = "some", once: i } = t,
      a = {
        root: n ? n.current : void 0,
        rootMargin: s,
        threshold: typeof o == "number" ? o : fs[o],
      },
      l = (u) => {
        const { isIntersecting: d } = u;
        if (this.isInView === d || ((this.isInView = d), i && !d && this.hasEnteredView)) return;
        (d && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive("whileInView", d));
        const { onViewportEnter: m, onViewportLeave: h } = this.node.getProps(),
          f = d ? m : h;
        f && f(u);
      };
    return hs(this.node.current, a, l);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(ps(t, n)) && this.startObserver();
  }
  unmount() {}
}
function ps({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const gs = {
    inView: { Feature: ms },
    tap: { Feature: ls },
    focus: { Feature: as },
    hover: { Feature: rs },
  },
  vs = { layout: { ProjectionNode: Tt, MeasureLayout: Kt } },
  xs = { ...Bn, ...gs, ...is, ...vs },
  L = _n(xs, Fn),
  Qt = "/assets/a79873ff7b54a9a37128bda14561149e5eeb12b3-CNlqmVld.png",
  ys = c.memo(function () {
    const [t, n] = c.useState(!1),
      s = ne(),
      o = se();
    c.useEffect(() => {
      const u = () => {
        n(window.scrollY > 20);
      };
      return (window.addEventListener("scroll", u), () => window.removeEventListener("scroll", u));
    }, []);
    const i = ["Home", "Ecosystem", "Services", "Portfolio", "About", "Contact"],
      a = (u) => {
        switch (u) {
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
            return `/#${u.toLowerCase()}`;
        }
      },
      l = (u, d) => {
        u.preventDefault();
        const m = a(d);
        if (m.startsWith("/#")) {
          const h = m.substring(2);
          o.pathname !== "/"
            ? (s("/"),
              setTimeout(() => {
                document.getElementById(h)?.scrollIntoView({ behavior: "smooth" });
              }, 100))
            : document.getElementById(h)?.scrollIntoView({ behavior: "smooth" });
        } else s(m);
      };
    return r.jsx(L.header, {
      initial: { y: -100 },
      animate: { y: 0 },
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${t ? "liquid-glass-card shadow-2xl edge-glow-hover" : "liquid-glass border-b border-white/10"}`,
      children: r.jsx("div", {
        className: "max-w-7xl mx-auto px-6 lg:px-8 py-5 relative z-10",
        children: r.jsxs("div", {
          className: "flex items-center justify-between",
          children: [
            r.jsx(L.a, {
              href: "/",
              "aria-label": "Cirqle Homepage",
              onClick: (u) => {
                (u.preventDefault(), s("/"));
              },
              className: "flex items-center cursor-hover relative z-10",
              whileHover: { scale: 1.05 },
              transition: { duration: 0.3, type: "spring", stiffness: 400 },
              children: r.jsx("img", {
                src: Qt,
                alt: "Cirqle Design",
                width: 160,
                height: 40,
                loading: "eager",
                fetchPriority: "high",
                className: "h-10 w-auto",
              }),
            }),
            r.jsx("nav", {
              className: "hidden md:flex items-center gap-10 relative z-10",
              children: i.map((u, d) =>
                r.jsxs(
                  L.a,
                  {
                    href: a(u),
                    onClick: (m) => l(m, u),
                    className:
                      "relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors group cursor-hover",
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.4, delay: d * 0.1 },
                    whileHover: { y: -2 },
                    children: [
                      u,
                      r.jsx(L.span, {
                        className:
                          "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] origin-left rounded-full",
                        initial: { scaleX: 0 },
                        whileHover: { scaleX: 1 },
                        transition: { duration: 0.4, ease: "easeOut" },
                      }),
                    ],
                  },
                  u
                )
              ),
            }),
          ],
        }),
      }),
    });
  }),
  ws = c.memo(function () {
    const t = new Date().getFullYear();
    return r.jsx("footer", {
      className: "bg-black text-white py-20 px-6",
      children: r.jsxs("div", {
        className: "max-w-7xl mx-auto",
        children: [
          r.jsxs("div", {
            className: "grid md:grid-cols-4 gap-14 mb-16",
            children: [
              r.jsxs("div", {
                className: "md:col-span-1",
                children: [
                  r.jsx("div", {
                    className: "mb-5",
                    children: r.jsx("img", {
                      src: Qt,
                      alt: "Cirqle Design",
                      width: 160,
                      height: 40,
                      loading: "lazy",
                      className: "h-10 w-auto brightness-0 invert",
                    }),
                  }),
                  r.jsx("p", {
                    className: "text-gray-400 text-sm leading-relaxed",
                    children:
                      "Premium design ecosystem delivering excellence across all creative services.",
                  }),
                ],
              }),
              r.jsxs("div", {
                children: [
                  r.jsx("h3", { className: "text-lg mb-6", children: "Services" }),
                  r.jsxs("ul", {
                    className: "space-y-3 text-sm text-gray-400",
                    children: [
                      r.jsx("li", {
                        children: r.jsx(C, {
                          to: "/services",
                          className:
                            "hover:text-white transition-colors hover:translate-x-1 inline-block",
                          children: "Supermarket Campaigns",
                        }),
                      }),
                      r.jsx("li", {
                        children: r.jsx(C, {
                          to: "/services",
                          className:
                            "hover:text-white transition-colors hover:translate-x-1 inline-block",
                          children: "Brand Design",
                        }),
                      }),
                      r.jsx("li", {
                        children: r.jsx(C, {
                          to: "/services",
                          className:
                            "hover:text-white transition-colors hover:translate-x-1 inline-block",
                          children: "Digital Solutions",
                        }),
                      }),
                      r.jsx("li", {
                        children: r.jsx(C, {
                          to: "/services",
                          className:
                            "hover:text-white transition-colors hover:translate-x-1 inline-block",
                          children: "UI/UX Design",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              r.jsxs("div", {
                children: [
                  r.jsx("h3", { className: "text-lg mb-6", children: "Company" }),
                  r.jsxs("ul", {
                    className: "space-y-3 text-sm text-gray-400",
                    children: [
                      r.jsx("li", {
                        children: r.jsx(C, {
                          to: "/about",
                          className:
                            "hover:text-white transition-colors hover:translate-x-1 inline-block",
                          children: "About Cirqle",
                        }),
                      }),
                      r.jsx("li", {
                        children: r.jsx(C, {
                          to: "/portfolio",
                          className:
                            "hover:text-white transition-colors hover:translate-x-1 inline-block",
                          children: "Portfolio",
                        }),
                      }),
                      r.jsx("li", {
                        children: r.jsx(C, {
                          to: "/#ecosystem",
                          className:
                            "hover:text-white transition-colors hover:translate-x-1 inline-block",
                          children: "Ecosystem",
                        }),
                      }),
                      r.jsx("li", {
                        children: r.jsx(C, {
                          to: "/contact",
                          className:
                            "hover:text-white transition-colors hover:translate-x-1 inline-block",
                          children: "Contact",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              r.jsxs("div", {
                children: [
                  r.jsx("h3", { className: "text-lg mb-6", children: "Connect" }),
                  r.jsxs("ul", {
                    className: "space-y-4 text-sm text-gray-400",
                    children: [
                      r.jsxs("li", {
                        className: "flex items-start gap-3",
                        children: [
                          r.jsx(ue, { className: "w-4 h-4 mt-0.5 flex-shrink-0 text-[#A259FF]" }),
                          r.jsx("a", {
                            href: "mailto:team@cirqle.work",
                            "aria-label": "Email Cirqle team",
                            className: "hover:text-white transition-colors",
                            children: "team@cirqle.work",
                          }),
                        ],
                      }),
                      r.jsxs("li", {
                        className: "flex items-start gap-3",
                        children: [
                          r.jsx(de, { className: "w-4 h-4 mt-0.5 flex-shrink-0 text-[#4CC3FF]" }),
                          r.jsx("a", {
                            href: "tel:+918129534377",
                            "aria-label": "Call Cirqle",
                            className: "hover:text-white transition-colors",
                            children: "+91 8129 5343 77",
                          }),
                        ],
                      }),
                      r.jsxs("li", {
                        className: "flex items-start gap-3",
                        children: [
                          r.jsx(he, { className: "w-4 h-4 mt-0.5 flex-shrink-0 text-[#A259FF]" }),
                          r.jsx("span", { children: "India" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          r.jsx("div", {
            className: "pt-10 border-t border-gray-800",
            children: r.jsxs("div", {
              className:
                "flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400",
              children: [
                r.jsxs("p", { children: ["© ", t, " Cirqle Design. All rights reserved."] }),
                r.jsxs("div", {
                  className: "flex gap-8",
                  children: [
                    r.jsx("a", {
                      href: "#",
                      className: "hover:text-white transition-colors",
                      children: "Privacy",
                    }),
                    r.jsx("a", {
                      href: "#",
                      className: "hover:text-white transition-colors",
                      children: "Terms",
                    }),
                  ],
                }),
              ],
            }),
          }),
          r.jsx("div", {
            className: "mt-10 pt-10 border-t border-gray-800 text-xs text-gray-700 leading-relaxed",
            children: r.jsx("p", {
              children:
                "Professional supermarket flyer design | Premium promotional campaign design | Brand identity design services | Digital creative design agency | Cirqle design ecosystem | Modern UI/UX design | Creative graphic design studio | Fast turnaround design services | Quality brand design solutions",
            }),
          }),
        ],
      }),
    });
  }),
  Ps = "/assets/fda5abfd538782442882b2f230e1b2307e39e0bc-QsOrVb0r.png",
  bs = c.memo(function () {
    const [t, n] = c.useState({ x: 0, y: 0 }),
      [s, o] = c.useState(!1);
    return (
      c.useEffect(() => {
        const i = (l) => {
            n({ x: l.clientX, y: l.clientY });
          },
          a = (l) => {
            const u = l.target;
            u.tagName === "A" ||
            u.tagName === "BUTTON" ||
            u.closest("a") ||
            u.closest("button") ||
            u.classList.contains("cursor-hover")
              ? o(!0)
              : o(!1);
          };
        return (
          window.addEventListener("mousemove", i),
          window.addEventListener("mouseover", a),
          (document.body.style.cursor = "none"),
          () => {
            (window.removeEventListener("mousemove", i),
              window.removeEventListener("mouseover", a),
              (document.body.style.cursor = "auto"));
          }
        );
      }, []),
      r.jsxs(r.Fragment, {
        children: [
          r.jsx(L.div, {
            className:
              "fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center",
            animate: { x: t.x, y: t.y, scale: s ? 1.15 : 1 },
            transition: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 },
            style: { transform: "translate(-50%, -50%)" },
            children: r.jsx("img", {
              src: Ps,
              alt: "",
              width: 32,
              height: 32,
              loading: "lazy",
              className: "w-8 h-auto object-contain",
              style: {
                filter: s
                  ? "drop-shadow(0 4px 16px rgba(162, 89, 255, 0.6)) drop-shadow(0 8px 32px rgba(162, 89, 255, 0.4))"
                  : "drop-shadow(0 2px 8px rgba(162, 89, 255, 0.4)) drop-shadow(0 4px 16px rgba(162, 89, 255, 0.2))",
                transition: "filter 0.3s ease",
              },
            }),
          }),
          s &&
            r.jsxs(r.Fragment, {
              children: [
                r.jsx(L.div, {
                  className: "fixed top-0 left-0 pointer-events-none z-[9998] rounded-full",
                  initial: { x: t.x - 24, y: t.y - 24, scale: 0.8, opacity: 0.6 },
                  animate: { x: t.x - 24, y: t.y - 24, scale: 1.5, opacity: 0 },
                  transition: { duration: 0.8, repeat: 1 / 0, ease: "easeOut" },
                  style: {
                    width: "48px",
                    height: "48px",
                    border: "2px solid rgba(162, 89, 255, 0.6)",
                    background: "radial-gradient(circle, rgba(162, 89, 255, 0.2), transparent 70%)",
                  },
                }),
                r.jsx(L.div, {
                  className: "fixed top-0 left-0 pointer-events-none z-[9997] rounded-full",
                  animate: { x: t.x - 20, y: t.y - 20 },
                  transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.5 },
                  style: {
                    width: "40px",
                    height: "40px",
                    border: "2px solid rgba(76, 195, 255, 0.5)",
                    backdropFilter: "blur(8px)",
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%)",
                    boxShadow:
                      "0 0 20px rgba(162, 89, 255, 0.4), inset 0 0 10px rgba(76, 195, 255, 0.3)",
                  },
                }),
              ],
            }),
        ],
      })
    );
  });
function j({ className: e, ...t }) {
  return r.jsx("div", { className: _t("animate-pulse rounded-md bg-gray-200/60", e), ...t });
}
const Cs = c.memo(function () {
    return r.jsxs("div", {
      className: "min-h-screen w-full pt-32 px-6 flex flex-col max-w-7xl mx-auto",
      "aria-busy": "true",
      "aria-label": "Loading page content",
      role: "status",
      children: [
        r.jsx("span", { className: "sr-only", children: "Loading content..." }),
        r.jsxs("div", {
          className: "flex flex-col items-center justify-center space-y-8 mt-10 mb-20",
          children: [
            r.jsx(j, { className: "w-40 h-10 rounded-full" }),
            r.jsx(j, { className: "w-3/4 max-w-4xl h-16 md:h-24 rounded-3xl" }),
            r.jsx(j, { className: "w-2/3 max-w-2xl h-8 rounded-xl mt-4" }),
            r.jsxs("div", {
              className: "flex gap-4 mt-8",
              children: [
                r.jsx(j, { className: "w-40 h-14 rounded-full" }),
                r.jsx(j, { className: "w-40 h-14 rounded-full opacity-70" }),
              ],
            }),
          ],
        }),
        r.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12 mb-20",
          children: [...Array(6)].map((t, n) =>
            r.jsxs(
              "div",
              {
                className: "flex flex-col space-y-4",
                children: [
                  r.jsx(j, { className: "w-full aspect-[4/3] rounded-3xl" }),
                  r.jsx(j, { className: "w-3/4 h-6 rounded-lg" }),
                  r.jsx(j, { className: "w-1/2 h-4 rounded-md opacity-70" }),
                ],
              },
              n
            )
          ),
        }),
      ],
    });
  }),
  Es = c.lazy(() =>
    A(() => import("./Home-X2TcIq-N.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8])).then(
      (e) => ({ default: e.Home })
    )
  ),
  js = c.lazy(() =>
    A(() => import("./Services-CJ4XHArF.js"), __vite__mapDeps([9, 1, 2, 3, 4, 8])).then((e) => ({
      default: e.Services,
    }))
  ),
  Ss = c.lazy(() =>
    A(() => import("./Contact-Dvqb-U4S.js"), __vite__mapDeps([10, 1, 2, 3, 4, 8])).then((e) => ({
      default: e.Contact,
    }))
  ),
  Ls = c.lazy(() =>
    A(() => import("./ProjectDetail-4RViTCuz.js"), __vite__mapDeps([11, 1, 2, 3, 4, 8])).then(
      (e) => ({ default: e.ProjectDetail })
    )
  ),
  Ns = c.lazy(() =>
    A(() => import("./About-BN7fU3mL.js"), __vite__mapDeps([12, 1, 7, 6, 2, 3, 4, 8])).then(
      (e) => ({ default: e.About })
    )
  ),
  Ms = c.lazy(() =>
    A(() => import("./Portfolio-BQcMfXhf.js"), __vite__mapDeps([13, 1, 5, 6, 2, 3, 4, 8])).then(
      (e) => ({ default: e.Portfolio })
    )
  );
function As() {
  return r.jsx(oe, {
    children: r.jsxs("div", {
      className: "min-h-screen flex flex-col bg-white",
      children: [
        r.jsx(bs, {}),
        r.jsx(ys, {}),
        r.jsx(c.Suspense, {
          fallback: r.jsx(Cs, {}),
          children: r.jsx("main", {
            className: "flex-1",
            children: r.jsxs(ie, {
              children: [
                r.jsx(N, { path: "/", element: r.jsx(Es, {}) }),
                r.jsx(N, { path: "/services", element: r.jsx(js, {}) }),
                r.jsx(N, { path: "/portfolio", element: r.jsx(Ms, {}) }),
                r.jsx(N, { path: "/portfolio/:slug", element: r.jsx(Ls, {}) }),
                r.jsx(N, { path: "/about", element: r.jsx(Ns, {}) }),
                r.jsx(N, { path: "/contact", element: r.jsx(Ss, {}) }),
              ],
            }),
          }),
        }),
        r.jsx(ws, {}),
      ],
    }),
  });
}
qe.createRoot(document.getElementById("root")).render(
  r.jsx(c.StrictMode, { children: r.jsx(re, { children: r.jsx(rn, { children: r.jsx(As, {}) }) }) })
);
export { mt as B, Cs as P, _t as c, r as j, L as m };
