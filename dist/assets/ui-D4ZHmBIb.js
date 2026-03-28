import { r as B } from "./vendor-CIVdjJUp.js";
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Oe = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  qe = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (r, t, o) => (o ? o.toUpperCase() : t.toLowerCase())),
  ge = (e) => {
    const r = qe(e);
    return r.charAt(0).toUpperCase() + r.slice(1);
  },
  Ce = (...e) =>
    e
      .filter((r, t, o) => !!r && r.trim() !== "" && o.indexOf(r) === t)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Fe = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const We = B.forwardRef(
  (
    {
      color: e = "currentColor",
      size: r = 24,
      strokeWidth: t = 2,
      absoluteStrokeWidth: o,
      className: a = "",
      children: c,
      iconNode: i,
      ...b
    },
    m
  ) =>
    B.createElement(
      "svg",
      {
        ref: m,
        ...Fe,
        width: r,
        height: r,
        stroke: e,
        strokeWidth: o ? (Number(t) * 24) / Number(r) : t,
        className: Ce("lucide", a),
        ...b,
      },
      [...i.map(([u, h]) => B.createElement(u, h)), ...(Array.isArray(c) ? c : [c])]
    )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const f = (e, r) => {
  const t = B.forwardRef(({ className: o, ...a }, c) =>
    B.createElement(We, {
      ref: c,
      iconNode: r,
      className: Ce(`lucide-${Oe(ge(e))}`, `lucide-${e}`, o),
      ...a,
    })
  );
  return ((t.displayName = ge(e)), t);
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Be = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }],
  ],
  rt = f("arrow-left", Be);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ue = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  st = f("arrow-right", Ue);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const He = [
    [
      "path",
      {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
        key: "1yiouv",
      },
    ],
    ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }],
  ],
  nt = f("award", He);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const De = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  at = f("circle-check", De);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ze = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ],
  it = f("circle-dot", Ze);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ye = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }],
  ],
  lt = f("clock-3", Ye);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xe = [
    ["polyline", { points: "16 18 22 12 16 6", key: "z7tu5w" }],
    ["polyline", { points: "8 6 2 12 8 18", key: "1eg1df" }],
  ],
  ct = f("code", Xe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Je = [
    ["path", { d: "m15 15 6 6", key: "1s409w" }],
    ["path", { d: "m15 9 6-6", key: "ko1vev" }],
    ["path", { d: "M21 16.2V21h-4.8", key: "1hrera" }],
    ["path", { d: "M21 7.8V3h-4.8", key: "ul1q53" }],
    ["path", { d: "M3 16.2V21h4.8", key: "1x04uo" }],
    ["path", { d: "m3 21 6-6", key: "wwnumi" }],
    ["path", { d: "M3 7.8V3h4.8", key: "1ijppm" }],
    ["path", { d: "M9 9 3 3", key: "v551iv" }],
  ],
  dt = f("expand", Je);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ke = [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }],
  ],
  mt = f("file-text", Ke);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qe = [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }],
  ],
  pt = f("link-2", Qe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const eo = [
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ],
  bt = f("mail", eo);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const oo = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z",
      },
    ],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ],
  ut = f("map-pin", oo);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const to = [["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]],
  ft = f("message-circle", to);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ro = [
    ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
    ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
    ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
    ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
    [
      "path",
      {
        d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
        key: "12rzf8",
      },
    ],
  ],
  ht = f("palette", ro);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const so = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M3 9h18", key: "1pudct" }],
    ["path", { d: "M9 21V9", key: "1oto5p" }],
  ],
  gt = f("panels-top-left", so);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const no = [
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
        key: "foiqr5",
      },
    ],
  ],
  yt = f("phone", no);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ao = [
    ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
    ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
    ["path", { d: "M16 16h5v5", key: "ccwih5" }],
  ],
  kt = f("refresh-ccw", ao);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const io = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3",
      },
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
  ],
  xt = f("send", io);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const lo = [
    ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
    ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
    ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
    ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
    ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }],
  ],
  wt = f("share-2", lo);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const co = [
    [
      "path",
      {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
        key: "4pj2yx",
      },
    ],
    ["path", { d: "M20 3v4", key: "1olli1" }],
    ["path", { d: "M22 5h-4", key: "1gvqau" }],
    ["path", { d: "M4 17v2", key: "vumght" }],
    ["path", { d: "M5 18H3", key: "zchphs" }],
  ],
  vt = f("sparkles", co);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mo = [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq",
      },
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ],
  zt = f("triangle-alert", mo);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const po = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  Ct = f("x", po);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bo = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db",
      },
    ],
  ],
  Mt = f("zap", bo);
function Me(e) {
  var r,
    t,
    o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var a = e.length;
      for (r = 0; r < a; r++) e[r] && (t = Me(e[r])) && (o && (o += " "), (o += t));
    } else for (t in e) e[t] && (o && (o += " "), (o += t));
  return o;
}
function At() {
  for (var e, r, t = 0, o = "", a = arguments.length; t < a; t++)
    (e = arguments[t]) && (r = Me(e)) && (o && (o += " "), (o += r));
  return o;
}
const uo = (e, r) => {
    const t = new Array(e.length + r.length);
    for (let o = 0; o < e.length; o++) t[o] = e[o];
    for (let o = 0; o < r.length; o++) t[e.length + o] = r[o];
    return t;
  },
  fo = (e, r) => ({ classGroupId: e, validator: r }),
  Ae = (e = new Map(), r = null, t) => ({ nextPart: e, validators: r, classGroupId: t }),
  Q = "-",
  ye = [],
  ho = "arbitrary..",
  go = (e) => {
    const r = ko(e),
      { conflictingClassGroups: t, conflictingClassGroupModifiers: o } = e;
    return {
      getClassGroupId: (i) => {
        if (i.startsWith("[") && i.endsWith("]")) return yo(i);
        const b = i.split(Q),
          m = b[0] === "" && b.length > 1 ? 1 : 0;
        return _e(b, m, r);
      },
      getConflictingClassGroupIds: (i, b) => {
        if (b) {
          const m = o[i],
            u = t[i];
          return m ? (u ? uo(u, m) : m) : u || ye;
        }
        return t[i] || ye;
      },
    };
  },
  _e = (e, r, t) => {
    if (e.length - r === 0) return t.classGroupId;
    const a = e[r],
      c = t.nextPart.get(a);
    if (c) {
      const u = _e(e, r + 1, c);
      if (u) return u;
    }
    const i = t.validators;
    if (i === null) return;
    const b = r === 0 ? e.join(Q) : e.slice(r).join(Q),
      m = i.length;
    for (let u = 0; u < m; u++) {
      const h = i[u];
      if (h.validator(b)) return h.classGroupId;
    }
  },
  yo = (e) =>
    e.slice(1, -1).indexOf(":") === -1
      ? void 0
      : (() => {
          const r = e.slice(1, -1),
            t = r.indexOf(":"),
            o = r.slice(0, t);
          return o ? ho + o : void 0;
        })(),
  ko = (e) => {
    const { theme: r, classGroups: t } = e;
    return xo(t, r);
  },
  xo = (e, r) => {
    const t = Ae();
    for (const o in e) {
      const a = e[o];
      ie(a, t, o, r);
    }
    return t;
  },
  ie = (e, r, t, o) => {
    const a = e.length;
    for (let c = 0; c < a; c++) {
      const i = e[c];
      wo(i, r, t, o);
    }
  },
  wo = (e, r, t, o) => {
    if (typeof e == "string") {
      vo(e, r, t);
      return;
    }
    if (typeof e == "function") {
      zo(e, r, t, o);
      return;
    }
    Co(e, r, t, o);
  },
  vo = (e, r, t) => {
    const o = e === "" ? r : Se(r, e);
    o.classGroupId = t;
  },
  zo = (e, r, t, o) => {
    if (Mo(e)) {
      ie(e(o), r, t, o);
      return;
    }
    (r.validators === null && (r.validators = []), r.validators.push(fo(t, e)));
  },
  Co = (e, r, t, o) => {
    const a = Object.entries(e),
      c = a.length;
    for (let i = 0; i < c; i++) {
      const [b, m] = a[i];
      ie(m, Se(r, b), t, o);
    }
  },
  Se = (e, r) => {
    let t = e;
    const o = r.split(Q),
      a = o.length;
    for (let c = 0; c < a; c++) {
      const i = o[c];
      let b = t.nextPart.get(i);
      (b || ((b = Ae()), t.nextPart.set(i, b)), (t = b));
    }
    return t;
  },
  Mo = (e) => "isThemeGetter" in e && e.isThemeGetter === !0,
  Ao = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let r = 0,
      t = Object.create(null),
      o = Object.create(null);
    const a = (c, i) => {
      ((t[c] = i), r++, r > e && ((r = 0), (o = t), (t = Object.create(null))));
    };
    return {
      get(c) {
        let i = t[c];
        if (i !== void 0) return i;
        if ((i = o[c]) !== void 0) return (a(c, i), i);
      },
      set(c, i) {
        c in t ? (t[c] = i) : a(c, i);
      },
    };
  },
  ae = "!",
  ke = ":",
  _o = [],
  xe = (e, r, t, o, a) => ({
    modifiers: e,
    hasImportantModifier: r,
    baseClassName: t,
    maybePostfixModifierPosition: o,
    isExternal: a,
  }),
  So = (e) => {
    const { prefix: r, experimentalParseClassName: t } = e;
    let o = (a) => {
      const c = [];
      let i = 0,
        b = 0,
        m = 0,
        u;
      const h = a.length;
      for (let C = 0; C < h; C++) {
        const w = a[C];
        if (i === 0 && b === 0) {
          if (w === ke) {
            (c.push(a.slice(m, C)), (m = C + 1));
            continue;
          }
          if (w === "/") {
            u = C;
            continue;
          }
        }
        w === "[" ? i++ : w === "]" ? i-- : w === "(" ? b++ : w === ")" && b--;
      }
      const z = c.length === 0 ? a : a.slice(m);
      let A = z,
        L = !1;
      z.endsWith(ae)
        ? ((A = z.slice(0, -1)), (L = !0))
        : z.startsWith(ae) && ((A = z.slice(1)), (L = !0));
      const I = u && u > m ? u - m : void 0;
      return xe(c, L, A, I);
    };
    if (r) {
      const a = r + ke,
        c = o;
      o = (i) => (i.startsWith(a) ? c(i.slice(a.length)) : xe(_o, !1, i, void 0, !0));
    }
    if (t) {
      const a = o;
      o = (c) => t({ className: c, parseClassName: a });
    }
    return o;
  },
  No = (e) => {
    const r = new Map();
    return (
      e.orderSensitiveModifiers.forEach((t, o) => {
        r.set(t, 1e6 + o);
      }),
      (t) => {
        const o = [];
        let a = [];
        for (let c = 0; c < t.length; c++) {
          const i = t[c],
            b = i[0] === "[",
            m = r.has(i);
          b || m ? (a.length > 0 && (a.sort(), o.push(...a), (a = [])), o.push(i)) : a.push(i);
        }
        return (a.length > 0 && (a.sort(), o.push(...a)), o);
      }
    );
  },
  Ro = (e) => ({ cache: Ao(e.cacheSize), parseClassName: So(e), sortModifiers: No(e), ...go(e) }),
  Lo = /\s+/,
  Io = (e, r) => {
    const {
        parseClassName: t,
        getClassGroupId: o,
        getConflictingClassGroupIds: a,
        sortModifiers: c,
      } = r,
      i = [],
      b = e.trim().split(Lo);
    let m = "";
    for (let u = b.length - 1; u >= 0; u -= 1) {
      const h = b[u],
        {
          isExternal: z,
          modifiers: A,
          hasImportantModifier: L,
          baseClassName: I,
          maybePostfixModifierPosition: C,
        } = t(h);
      if (z) {
        m = h + (m.length > 0 ? " " + m : m);
        continue;
      }
      let w = !!C,
        P = o(w ? I.substring(0, C) : I);
      if (!P) {
        if (!w) {
          m = h + (m.length > 0 ? " " + m : m);
          continue;
        }
        if (((P = o(I)), !P)) {
          m = h + (m.length > 0 ? " " + m : m);
          continue;
        }
        w = !1;
      }
      const U = A.length === 0 ? "" : A.length === 1 ? A[0] : c(A).join(":"),
        q = L ? U + ae : U,
        E = q + P;
      if (i.indexOf(E) > -1) continue;
      i.push(E);
      const V = a(P, w);
      for (let $ = 0; $ < V.length; ++$) {
        const F = V[$];
        i.push(q + F);
      }
      m = h + (m.length > 0 ? " " + m : m);
    }
    return m;
  },
  Po = (...e) => {
    let r = 0,
      t,
      o,
      a = "";
    for (; r < e.length; ) (t = e[r++]) && (o = Ne(t)) && (a && (a += " "), (a += o));
    return a;
  },
  Ne = (e) => {
    if (typeof e == "string") return e;
    let r,
      t = "";
    for (let o = 0; o < e.length; o++) e[o] && (r = Ne(e[o])) && (t && (t += " "), (t += r));
    return t;
  },
  $o = (e, ...r) => {
    let t, o, a, c;
    const i = (m) => {
        const u = r.reduce((h, z) => z(h), e());
        return ((t = Ro(u)), (o = t.cache.get), (a = t.cache.set), (c = b), b(m));
      },
      b = (m) => {
        const u = o(m);
        if (u) return u;
        const h = Io(m, t);
        return (a(m, h), h);
      };
    return ((c = i), (...m) => c(Po(...m)));
  },
  To = [],
  g = (e) => {
    const r = (t) => t[e] || To;
    return ((r.isThemeGetter = !0), r);
  },
  Re = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Le = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  jo = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Go = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Eo =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Vo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Oo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  qo =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  S = (e) => jo.test(e),
  p = (e) => !!e && !Number.isNaN(Number(e)),
  N = (e) => !!e && Number.isInteger(Number(e)),
  ne = (e) => e.endsWith("%") && p(e.slice(0, -1)),
  _ = (e) => Go.test(e),
  Ie = () => !0,
  Fo = (e) => Eo.test(e) && !Vo.test(e),
  le = () => !1,
  Wo = (e) => Oo.test(e),
  Bo = (e) => qo.test(e),
  Uo = (e) => !s(e) && !n(e),
  Ho = (e) => R(e, Te, le),
  s = (e) => Re.test(e),
  j = (e) => R(e, je, Fo),
  we = (e) => R(e, et, p),
  Do = (e) => R(e, Ee, Ie),
  Zo = (e) => R(e, Ge, le),
  ve = (e) => R(e, Pe, le),
  Yo = (e) => R(e, $e, Bo),
  J = (e) => R(e, Ve, Wo),
  n = (e) => Le.test(e),
  W = (e) => G(e, je),
  Xo = (e) => G(e, Ge),
  ze = (e) => G(e, Pe),
  Jo = (e) => G(e, Te),
  Ko = (e) => G(e, $e),
  K = (e) => G(e, Ve, !0),
  Qo = (e) => G(e, Ee, !0),
  R = (e, r, t) => {
    const o = Re.exec(e);
    return o ? (o[1] ? r(o[1]) : t(o[2])) : !1;
  },
  G = (e, r, t = !1) => {
    const o = Le.exec(e);
    return o ? (o[1] ? r(o[1]) : t) : !1;
  },
  Pe = (e) => e === "position" || e === "percentage",
  $e = (e) => e === "image" || e === "url",
  Te = (e) => e === "length" || e === "size" || e === "bg-size",
  je = (e) => e === "length",
  et = (e) => e === "number",
  Ge = (e) => e === "family-name",
  Ee = (e) => e === "number" || e === "weight",
  Ve = (e) => e === "shadow",
  ot = () => {
    const e = g("color"),
      r = g("font"),
      t = g("text"),
      o = g("font-weight"),
      a = g("tracking"),
      c = g("leading"),
      i = g("breakpoint"),
      b = g("container"),
      m = g("spacing"),
      u = g("radius"),
      h = g("shadow"),
      z = g("inset-shadow"),
      A = g("text-shadow"),
      L = g("drop-shadow"),
      I = g("blur"),
      C = g("perspective"),
      w = g("aspect"),
      P = g("ease"),
      U = g("animate"),
      q = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
      E = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      V = () => [...E(), n, s],
      $ = () => ["auto", "hidden", "clip", "visible", "scroll"],
      F = () => ["auto", "contain", "none"],
      l = () => [n, s, m],
      v = () => [S, "full", "auto", ...l()],
      ce = () => [N, "none", "subgrid", n, s],
      de = () => ["auto", { span: ["full", N, n, s] }, N, n, s],
      H = () => [N, "auto", n, s],
      me = () => ["auto", "min", "max", "fr", n, s],
      ee = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      O = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"],
      M = () => ["auto", ...l()],
      T = () => [
        S,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...l(),
      ],
      oe = () => [S, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...l()],
      te = () => [S, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...l()],
      d = () => [e, n, s],
      pe = () => [...E(), ze, ve, { position: [n, s] }],
      be = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      ue = () => ["auto", "cover", "contain", Jo, Ho, { size: [n, s] }],
      re = () => [ne, W, j],
      k = () => ["", "none", "full", u, n, s],
      x = () => ["", p, W, j],
      D = () => ["solid", "dashed", "dotted", "double"],
      fe = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      y = () => [p, ne, ze, ve],
      he = () => ["", "none", I, n, s],
      Z = () => ["none", p, n, s],
      Y = () => ["none", p, n, s],
      se = () => [p, n, s],
      X = () => [S, "full", ...l()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [_],
        breakpoint: [_],
        color: [Ie],
        container: [_],
        "drop-shadow": [_],
        ease: ["in", "out", "in-out"],
        font: [Uo],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [_],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
        radius: [_],
        shadow: [_],
        spacing: ["px", p],
        text: [_],
        "text-shadow": [_],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", S, s, n, w] }],
        container: ["container"],
        columns: [{ columns: [p, s, n, b] }],
        "break-after": [{ "break-after": q() }],
        "break-before": [{ "break-before": q() }],
        "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
        "object-position": [{ object: V() }],
        overflow: [{ overflow: $() }],
        "overflow-x": [{ "overflow-x": $() }],
        "overflow-y": [{ "overflow-y": $() }],
        overscroll: [{ overscroll: F() }],
        "overscroll-x": [{ "overscroll-x": F() }],
        "overscroll-y": [{ "overscroll-y": F() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: v() }],
        "inset-x": [{ "inset-x": v() }],
        "inset-y": [{ "inset-y": v() }],
        start: [{ "inset-s": v(), start: v() }],
        end: [{ "inset-e": v(), end: v() }],
        "inset-bs": [{ "inset-bs": v() }],
        "inset-be": [{ "inset-be": v() }],
        top: [{ top: v() }],
        right: [{ right: v() }],
        bottom: [{ bottom: v() }],
        left: [{ left: v() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [N, "auto", n, s] }],
        basis: [{ basis: [S, "full", "auto", b, ...l()] }],
        "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [p, S, "auto", "initial", "none", s] }],
        grow: [{ grow: ["", p, n, s] }],
        shrink: [{ shrink: ["", p, n, s] }],
        order: [{ order: [N, "first", "last", "none", n, s] }],
        "grid-cols": [{ "grid-cols": ce() }],
        "col-start-end": [{ col: de() }],
        "col-start": [{ "col-start": H() }],
        "col-end": [{ "col-end": H() }],
        "grid-rows": [{ "grid-rows": ce() }],
        "row-start-end": [{ row: de() }],
        "row-start": [{ "row-start": H() }],
        "row-end": [{ "row-end": H() }],
        "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
        "auto-cols": [{ "auto-cols": me() }],
        "auto-rows": [{ "auto-rows": me() }],
        gap: [{ gap: l() }],
        "gap-x": [{ "gap-x": l() }],
        "gap-y": [{ "gap-y": l() }],
        "justify-content": [{ justify: [...ee(), "normal"] }],
        "justify-items": [{ "justify-items": [...O(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...O()] }],
        "align-content": [{ content: ["normal", ...ee()] }],
        "align-items": [{ items: [...O(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...O(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": ee() }],
        "place-items": [{ "place-items": [...O(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...O()] }],
        p: [{ p: l() }],
        px: [{ px: l() }],
        py: [{ py: l() }],
        ps: [{ ps: l() }],
        pe: [{ pe: l() }],
        pbs: [{ pbs: l() }],
        pbe: [{ pbe: l() }],
        pt: [{ pt: l() }],
        pr: [{ pr: l() }],
        pb: [{ pb: l() }],
        pl: [{ pl: l() }],
        m: [{ m: M() }],
        mx: [{ mx: M() }],
        my: [{ my: M() }],
        ms: [{ ms: M() }],
        me: [{ me: M() }],
        mbs: [{ mbs: M() }],
        mbe: [{ mbe: M() }],
        mt: [{ mt: M() }],
        mr: [{ mr: M() }],
        mb: [{ mb: M() }],
        ml: [{ ml: M() }],
        "space-x": [{ "space-x": l() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": l() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: T() }],
        "inline-size": [{ inline: ["auto", ...oe()] }],
        "min-inline-size": [{ "min-inline": ["auto", ...oe()] }],
        "max-inline-size": [{ "max-inline": ["none", ...oe()] }],
        "block-size": [{ block: ["auto", ...te()] }],
        "min-block-size": [{ "min-block": ["auto", ...te()] }],
        "max-block-size": [{ "max-block": ["none", ...te()] }],
        w: [{ w: [b, "screen", ...T()] }],
        "min-w": [{ "min-w": [b, "screen", "none", ...T()] }],
        "max-w": [{ "max-w": [b, "screen", "none", "prose", { screen: [i] }, ...T()] }],
        h: [{ h: ["screen", "lh", ...T()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...T()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...T()] }],
        "font-size": [{ text: ["base", t, W, j] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [o, Qo, Do] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              ne,
              s,
            ],
          },
        ],
        "font-family": [{ font: [Xo, Zo, r] }],
        "font-features": [{ "font-features": [s] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [a, n, s] }],
        "line-clamp": [{ "line-clamp": [p, "none", n, we] }],
        leading: [{ leading: [c, ...l()] }],
        "list-image": [{ "list-image": ["none", n, s] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", n, s] }],
        "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
        "placeholder-color": [{ placeholder: d() }],
        "text-color": [{ text: d() }],
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        "text-decoration-style": [{ decoration: [...D(), "wavy"] }],
        "text-decoration-thickness": [{ decoration: [p, "from-font", "auto", n, j] }],
        "text-decoration-color": [{ decoration: d() }],
        "underline-offset": [{ "underline-offset": [p, "auto", n, s] }],
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: l() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              n,
              s,
            ],
          },
        ],
        whitespace: [
          { whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", n, s] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: pe() }],
        "bg-repeat": [{ bg: be() }],
        "bg-size": [{ bg: ue() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [{ to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, N, n, s],
                radial: ["", n, s],
                conic: [N, n, s],
              },
              Ko,
              Yo,
            ],
          },
        ],
        "bg-color": [{ bg: d() }],
        "gradient-from-pos": [{ from: re() }],
        "gradient-via-pos": [{ via: re() }],
        "gradient-to-pos": [{ to: re() }],
        "gradient-from": [{ from: d() }],
        "gradient-via": [{ via: d() }],
        "gradient-to": [{ to: d() }],
        rounded: [{ rounded: k() }],
        "rounded-s": [{ "rounded-s": k() }],
        "rounded-e": [{ "rounded-e": k() }],
        "rounded-t": [{ "rounded-t": k() }],
        "rounded-r": [{ "rounded-r": k() }],
        "rounded-b": [{ "rounded-b": k() }],
        "rounded-l": [{ "rounded-l": k() }],
        "rounded-ss": [{ "rounded-ss": k() }],
        "rounded-se": [{ "rounded-se": k() }],
        "rounded-ee": [{ "rounded-ee": k() }],
        "rounded-es": [{ "rounded-es": k() }],
        "rounded-tl": [{ "rounded-tl": k() }],
        "rounded-tr": [{ "rounded-tr": k() }],
        "rounded-br": [{ "rounded-br": k() }],
        "rounded-bl": [{ "rounded-bl": k() }],
        "border-w": [{ border: x() }],
        "border-w-x": [{ "border-x": x() }],
        "border-w-y": [{ "border-y": x() }],
        "border-w-s": [{ "border-s": x() }],
        "border-w-e": [{ "border-e": x() }],
        "border-w-bs": [{ "border-bs": x() }],
        "border-w-be": [{ "border-be": x() }],
        "border-w-t": [{ "border-t": x() }],
        "border-w-r": [{ "border-r": x() }],
        "border-w-b": [{ "border-b": x() }],
        "border-w-l": [{ "border-l": x() }],
        "divide-x": [{ "divide-x": x() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": x() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...D(), "hidden", "none"] }],
        "divide-style": [{ divide: [...D(), "hidden", "none"] }],
        "border-color": [{ border: d() }],
        "border-color-x": [{ "border-x": d() }],
        "border-color-y": [{ "border-y": d() }],
        "border-color-s": [{ "border-s": d() }],
        "border-color-e": [{ "border-e": d() }],
        "border-color-bs": [{ "border-bs": d() }],
        "border-color-be": [{ "border-be": d() }],
        "border-color-t": [{ "border-t": d() }],
        "border-color-r": [{ "border-r": d() }],
        "border-color-b": [{ "border-b": d() }],
        "border-color-l": [{ "border-l": d() }],
        "divide-color": [{ divide: d() }],
        "outline-style": [{ outline: [...D(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [p, n, s] }],
        "outline-w": [{ outline: ["", p, W, j] }],
        "outline-color": [{ outline: d() }],
        shadow: [{ shadow: ["", "none", h, K, J] }],
        "shadow-color": [{ shadow: d() }],
        "inset-shadow": [{ "inset-shadow": ["none", z, K, J] }],
        "inset-shadow-color": [{ "inset-shadow": d() }],
        "ring-w": [{ ring: x() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: d() }],
        "ring-offset-w": [{ "ring-offset": [p, j] }],
        "ring-offset-color": [{ "ring-offset": d() }],
        "inset-ring-w": [{ "inset-ring": x() }],
        "inset-ring-color": [{ "inset-ring": d() }],
        "text-shadow": [{ "text-shadow": ["none", A, K, J] }],
        "text-shadow-color": [{ "text-shadow": d() }],
        opacity: [{ opacity: [p, n, s] }],
        "mix-blend": [{ "mix-blend": [...fe(), "plus-darker", "plus-lighter"] }],
        "bg-blend": [{ "bg-blend": fe() }],
        "mask-clip": [
          { "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"] },
          "mask-no-clip",
        ],
        "mask-composite": [{ mask: ["add", "subtract", "intersect", "exclude"] }],
        "mask-image-linear-pos": [{ "mask-linear": [p] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": y() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": y() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": d() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": d() }],
        "mask-image-t-from-pos": [{ "mask-t-from": y() }],
        "mask-image-t-to-pos": [{ "mask-t-to": y() }],
        "mask-image-t-from-color": [{ "mask-t-from": d() }],
        "mask-image-t-to-color": [{ "mask-t-to": d() }],
        "mask-image-r-from-pos": [{ "mask-r-from": y() }],
        "mask-image-r-to-pos": [{ "mask-r-to": y() }],
        "mask-image-r-from-color": [{ "mask-r-from": d() }],
        "mask-image-r-to-color": [{ "mask-r-to": d() }],
        "mask-image-b-from-pos": [{ "mask-b-from": y() }],
        "mask-image-b-to-pos": [{ "mask-b-to": y() }],
        "mask-image-b-from-color": [{ "mask-b-from": d() }],
        "mask-image-b-to-color": [{ "mask-b-to": d() }],
        "mask-image-l-from-pos": [{ "mask-l-from": y() }],
        "mask-image-l-to-pos": [{ "mask-l-to": y() }],
        "mask-image-l-from-color": [{ "mask-l-from": d() }],
        "mask-image-l-to-color": [{ "mask-l-to": d() }],
        "mask-image-x-from-pos": [{ "mask-x-from": y() }],
        "mask-image-x-to-pos": [{ "mask-x-to": y() }],
        "mask-image-x-from-color": [{ "mask-x-from": d() }],
        "mask-image-x-to-color": [{ "mask-x-to": d() }],
        "mask-image-y-from-pos": [{ "mask-y-from": y() }],
        "mask-image-y-to-pos": [{ "mask-y-to": y() }],
        "mask-image-y-from-color": [{ "mask-y-from": d() }],
        "mask-image-y-to-color": [{ "mask-y-to": d() }],
        "mask-image-radial": [{ "mask-radial": [n, s] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": y() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": y() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": d() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": d() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          { "mask-radial": [{ closest: ["side", "corner"], farthest: ["side", "corner"] }] },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": E() }],
        "mask-image-conic-pos": [{ "mask-conic": [p] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": y() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": y() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": d() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": d() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          { "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"] },
        ],
        "mask-position": [{ mask: pe() }],
        "mask-repeat": [{ mask: be() }],
        "mask-size": [{ mask: ue() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", n, s] }],
        filter: [{ filter: ["", "none", n, s] }],
        blur: [{ blur: he() }],
        brightness: [{ brightness: [p, n, s] }],
        contrast: [{ contrast: [p, n, s] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", L, K, J] }],
        "drop-shadow-color": [{ "drop-shadow": d() }],
        grayscale: [{ grayscale: ["", p, n, s] }],
        "hue-rotate": [{ "hue-rotate": [p, n, s] }],
        invert: [{ invert: ["", p, n, s] }],
        saturate: [{ saturate: [p, n, s] }],
        sepia: [{ sepia: ["", p, n, s] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", n, s] }],
        "backdrop-blur": [{ "backdrop-blur": he() }],
        "backdrop-brightness": [{ "backdrop-brightness": [p, n, s] }],
        "backdrop-contrast": [{ "backdrop-contrast": [p, n, s] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", p, n, s] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [p, n, s] }],
        "backdrop-invert": [{ "backdrop-invert": ["", p, n, s] }],
        "backdrop-opacity": [{ "backdrop-opacity": [p, n, s] }],
        "backdrop-saturate": [{ "backdrop-saturate": [p, n, s] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", p, n, s] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": l() }],
        "border-spacing-x": [{ "border-spacing-x": l() }],
        "border-spacing-y": [{ "border-spacing-y": l() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          { transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", n, s] },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [p, "initial", n, s] }],
        ease: [{ ease: ["linear", "initial", P, n, s] }],
        delay: [{ delay: [p, n, s] }],
        animate: [{ animate: ["none", U, n, s] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [C, n, s] }],
        "perspective-origin": [{ "perspective-origin": V() }],
        rotate: [{ rotate: Z() }],
        "rotate-x": [{ "rotate-x": Z() }],
        "rotate-y": [{ "rotate-y": Z() }],
        "rotate-z": [{ "rotate-z": Z() }],
        scale: [{ scale: Y() }],
        "scale-x": [{ "scale-x": Y() }],
        "scale-y": [{ "scale-y": Y() }],
        "scale-z": [{ "scale-z": Y() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: se() }],
        "skew-x": [{ "skew-x": se() }],
        "skew-y": [{ "skew-y": se() }],
        transform: [{ transform: [n, s, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: V() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: X() }],
        "translate-x": [{ "translate-x": X() }],
        "translate-y": [{ "translate-y": X() }],
        "translate-z": [{ "translate-z": X() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: d() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: d() }],
        "color-scheme": [
          { scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"] },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              n,
              s,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": l() }],
        "scroll-mx": [{ "scroll-mx": l() }],
        "scroll-my": [{ "scroll-my": l() }],
        "scroll-ms": [{ "scroll-ms": l() }],
        "scroll-me": [{ "scroll-me": l() }],
        "scroll-mbs": [{ "scroll-mbs": l() }],
        "scroll-mbe": [{ "scroll-mbe": l() }],
        "scroll-mt": [{ "scroll-mt": l() }],
        "scroll-mr": [{ "scroll-mr": l() }],
        "scroll-mb": [{ "scroll-mb": l() }],
        "scroll-ml": [{ "scroll-ml": l() }],
        "scroll-p": [{ "scroll-p": l() }],
        "scroll-px": [{ "scroll-px": l() }],
        "scroll-py": [{ "scroll-py": l() }],
        "scroll-ps": [{ "scroll-ps": l() }],
        "scroll-pe": [{ "scroll-pe": l() }],
        "scroll-pbs": [{ "scroll-pbs": l() }],
        "scroll-pbe": [{ "scroll-pbe": l() }],
        "scroll-pt": [{ "scroll-pt": l() }],
        "scroll-pr": [{ "scroll-pr": l() }],
        "scroll-pb": [{ "scroll-pb": l() }],
        "scroll-pl": [{ "scroll-pl": l() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", n, s] }],
        fill: [{ fill: ["none", ...d()] }],
        "stroke-w": [{ stroke: [p, W, j, we] }],
        stroke: [{ stroke: ["none", ...d()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "inset-bs",
          "inset-be",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-bs",
          "border-w-be",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-bs",
          "border-color-be",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mbs",
          "scroll-mbe",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pbs",
          "scroll-pbe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  _t = $o(ot);
export {
  st as A,
  lt as C,
  dt as E,
  mt as F,
  pt as L,
  bt as M,
  yt as P,
  kt as R,
  vt as S,
  zt as T,
  Ct as X,
  Mt as Z,
  ut as a,
  nt as b,
  At as c,
  it as d,
  ht as e,
  wt as f,
  ct as g,
  gt as h,
  xt as i,
  ft as j,
  rt as k,
  at as l,
  _t as t,
};
