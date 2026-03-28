import { g as Je, c as De, a as pa } from "./vendor-CIVdjJUp.js";
function ii(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: da } = Object.prototype,
  { getPrototypeOf: tn } = Object,
  { iterator: ht, toStringTag: ai } = Symbol,
  mt = ((e) => (t) => {
    const r = da.call(t);
    return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  we = (e) => ((e = e.toLowerCase()), (t) => mt(t) === e),
  gt = (e) => (t) => typeof t === e,
  { isArray: Be } = Array,
  Me = gt("undefined");
function Qe(e) {
  return (
    e !== null &&
    !Me(e) &&
    e.constructor !== null &&
    !Me(e.constructor) &&
    le(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const si = we("ArrayBuffer");
function ya(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && si(e.buffer)),
    t
  );
}
const ha = gt("string"),
  le = gt("function"),
  ci = gt("number"),
  Xe = (e) => e !== null && typeof e == "object",
  ma = (e) => e === !0 || e === !1,
  ct = (e) => {
    if (mt(e) !== "object") return !1;
    const t = tn(e);
    return (
      (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
      !(ai in e) &&
      !(ht in e)
    );
  },
  ga = (e) => {
    if (!Xe(e) || Qe(e)) return !1;
    try {
      return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
    } catch {
      return !1;
    }
  },
  va = we("Date"),
  ba = we("File"),
  wa = (e) => !!(e && typeof e.uri < "u"),
  Sa = (e) => e && typeof e.getParts < "u",
  Oa = we("Blob"),
  Ea = we("FileList"),
  Aa = (e) => Xe(e) && le(e.pipe);
function Ra() {
  return typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : {};
}
const An = Ra(),
  Rn = typeof An.FormData < "u" ? An.FormData : void 0,
  Pa = (e) => {
    let t;
    return (
      e &&
      ((Rn && e instanceof Rn) ||
        (le(e.append) &&
          ((t = mt(e)) === "formdata" ||
            (t === "object" && le(e.toString) && e.toString() === "[object FormData]"))))
    );
  },
  Ta = we("URLSearchParams"),
  [xa, Ca, La, _a] = ["ReadableStream", "Request", "Response", "Headers"].map(we),
  ka = (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""));
function Ye(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let n, o;
  if ((typeof e != "object" && (e = [e]), Be(e)))
    for (n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
  else {
    if (Qe(e)) return;
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
      a = i.length;
    let s;
    for (n = 0; n < a; n++) ((s = i[n]), t.call(null, e[s], s, e));
  }
}
function ui(e, t) {
  if (Qe(e)) return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length,
    o;
  for (; n-- > 0; ) if (((o = r[n]), t === o.toLowerCase())) return o;
  return null;
}
const _e =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  li = (e) => !Me(e) && e !== _e;
function Kr() {
  const { caseless: e, skipUndefined: t } = (li(this) && this) || {},
    r = {},
    n = (o, i) => {
      if (i === "__proto__" || i === "constructor" || i === "prototype") return;
      const a = (e && ui(r, i)) || i;
      ct(r[a]) && ct(o)
        ? (r[a] = Kr(r[a], o))
        : ct(o)
          ? (r[a] = Kr({}, o))
          : Be(o)
            ? (r[a] = o.slice())
            : (!t || !Me(o)) && (r[a] = o);
    };
  for (let o = 0, i = arguments.length; o < i; o++) arguments[o] && Ye(arguments[o], n);
  return r;
}
const Ia = (e, t, r, { allOwnKeys: n } = {}) => (
    Ye(
      t,
      (o, i) => {
        r && le(o)
          ? Object.defineProperty(e, i, {
              value: ii(o, r),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(e, i, {
              value: o,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: n }
    ),
    e
  ),
  Na = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  ja = (e, t, r, n) => {
    ((e.prototype = Object.create(t.prototype, n)),
      Object.defineProperty(e.prototype, "constructor", {
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "super", { value: t.prototype }),
      r && Object.assign(e.prototype, r));
  },
  Fa = (e, t, r, n) => {
    let o, i, a;
    const s = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
        ((a = o[i]), (!n || n(a, e, t)) && !s[a] && ((t[a] = e[a]), (s[a] = !0)));
      e = r !== !1 && tn(e);
    } while (e && (!r || r(e, t)) && e !== Object.prototype);
    return t;
  },
  $a = (e, t, r) => {
    ((e = String(e)), (r === void 0 || r > e.length) && (r = e.length), (r -= t.length));
    const n = e.indexOf(t, r);
    return n !== -1 && n === r;
  },
  Ua = (e) => {
    if (!e) return null;
    if (Be(e)) return e;
    let t = e.length;
    if (!ci(t)) return null;
    const r = new Array(t);
    for (; t-- > 0; ) r[t] = e[t];
    return r;
  },
  Da = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && tn(Uint8Array)),
  Ma = (e, t) => {
    const n = (e && e[ht]).call(e);
    let o;
    for (; (o = n.next()) && !o.done; ) {
      const i = o.value;
      t.call(e, i[0], i[1]);
    }
  },
  Ba = (e, t) => {
    let r;
    const n = [];
    for (; (r = e.exec(t)) !== null; ) n.push(r);
    return n;
  },
  qa = we("HTMLFormElement"),
  Wa = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (r, n, o) {
      return n.toUpperCase() + o;
    }),
  Pn = (
    ({ hasOwnProperty: e }) =>
    (t, r) =>
      e.call(t, r)
  )(Object.prototype),
  Ha = we("RegExp"),
  fi = (e, t) => {
    const r = Object.getOwnPropertyDescriptors(e),
      n = {};
    (Ye(r, (o, i) => {
      let a;
      (a = t(o, i, e)) !== !1 && (n[i] = a || o);
    }),
      Object.defineProperties(e, n));
  },
  za = (e) => {
    fi(e, (t, r) => {
      if (le(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1) return !1;
      const n = e[r];
      if (le(n)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + r + "'");
          });
      }
    });
  },
  Ga = (e, t) => {
    const r = {},
      n = (o) => {
        o.forEach((i) => {
          r[i] = !0;
        });
      };
    return (Be(e) ? n(e) : n(String(e).split(t)), r);
  },
  Va = () => {},
  Ka = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Ja(e) {
  return !!(e && le(e.append) && e[ai] === "FormData" && e[ht]);
}
const Qa = (e) => {
    const t = new Array(10),
      r = (n, o) => {
        if (Xe(n)) {
          if (t.indexOf(n) >= 0) return;
          if (Qe(n)) return n;
          if (!("toJSON" in n)) {
            t[o] = n;
            const i = Be(n) ? [] : {};
            return (
              Ye(n, (a, s) => {
                const l = r(a, o + 1);
                !Me(l) && (i[s] = l);
              }),
              (t[o] = void 0),
              i
            );
          }
        }
        return n;
      };
    return r(e, 0);
  },
  Xa = we("AsyncFunction"),
  Ya = (e) => e && (Xe(e) || le(e)) && le(e.then) && le(e.catch),
  pi = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((r, n) => (
            _e.addEventListener(
              "message",
              ({ source: o, data: i }) => {
                o === _e && i === r && n.length && n.shift()();
              },
              !1
            ),
            (o) => {
              (n.push(o), _e.postMessage(r, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (r) => setTimeout(r))(typeof setImmediate == "function", le(_e.postMessage)),
  Za =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(_e)
      : (typeof process < "u" && process.nextTick) || pi,
  es = (e) => e != null && le(e[ht]),
  g = {
    isArray: Be,
    isArrayBuffer: si,
    isBuffer: Qe,
    isFormData: Pa,
    isArrayBufferView: ya,
    isString: ha,
    isNumber: ci,
    isBoolean: ma,
    isObject: Xe,
    isPlainObject: ct,
    isEmptyObject: ga,
    isReadableStream: xa,
    isRequest: Ca,
    isResponse: La,
    isHeaders: _a,
    isUndefined: Me,
    isDate: va,
    isFile: ba,
    isReactNativeBlob: wa,
    isReactNative: Sa,
    isBlob: Oa,
    isRegExp: Ha,
    isFunction: le,
    isStream: Aa,
    isURLSearchParams: Ta,
    isTypedArray: Da,
    isFileList: Ea,
    forEach: Ye,
    merge: Kr,
    extend: Ia,
    trim: ka,
    stripBOM: Na,
    inherits: ja,
    toFlatObject: Fa,
    kindOf: mt,
    kindOfTest: we,
    endsWith: $a,
    toArray: Ua,
    forEachEntry: Ma,
    matchAll: Ba,
    isHTMLForm: qa,
    hasOwnProperty: Pn,
    hasOwnProp: Pn,
    reduceDescriptors: fi,
    freezeMethods: za,
    toObjectSet: Ga,
    toCamelCase: Wa,
    noop: Va,
    toFiniteNumber: Ka,
    findKey: ui,
    global: _e,
    isContextDefined: li,
    isSpecCompliantForm: Ja,
    toJSONObject: Qa,
    isAsyncFn: Xa,
    isThenable: Ya,
    setImmediate: pi,
    asap: Za,
    isIterable: es,
  };
let U = class di extends Error {
  static from(t, r, n, o, i, a) {
    const s = new di(t.message, r || t.code, n, o, i);
    return (
      (s.cause = t),
      (s.name = t.name),
      t.status != null && s.status == null && (s.status = t.status),
      a && Object.assign(s, a),
      s
    );
  }
  constructor(t, r, n, o, i) {
    (super(t),
      Object.defineProperty(this, "message", {
        value: t,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = "AxiosError"),
      (this.isAxiosError = !0),
      r && (this.code = r),
      n && (this.config = n),
      o && (this.request = o),
      i && ((this.response = i), (this.status = i.status)));
  }
  toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: g.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  }
};
U.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
U.ERR_BAD_OPTION = "ERR_BAD_OPTION";
U.ECONNABORTED = "ECONNABORTED";
U.ETIMEDOUT = "ETIMEDOUT";
U.ERR_NETWORK = "ERR_NETWORK";
U.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
U.ERR_DEPRECATED = "ERR_DEPRECATED";
U.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
U.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
U.ERR_CANCELED = "ERR_CANCELED";
U.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
U.ERR_INVALID_URL = "ERR_INVALID_URL";
const ts = null;
function Jr(e) {
  return g.isPlainObject(e) || g.isArray(e);
}
function yi(e) {
  return g.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function It(e, t, r) {
  return e
    ? e
        .concat(t)
        .map(function (o, i) {
          return ((o = yi(o)), !r && i ? "[" + o + "]" : o);
        })
        .join(r ? "." : "")
    : t;
}
function rs(e) {
  return g.isArray(e) && !e.some(Jr);
}
const ns = g.toFlatObject(g, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function vt(e, t, r) {
  if (!g.isObject(e)) throw new TypeError("target must be an object");
  ((t = t || new FormData()),
    (r = g.toFlatObject(r, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (d, p) {
      return !g.isUndefined(p[d]);
    })));
  const n = r.metaTokens,
    o = r.visitor || f,
    i = r.dots,
    a = r.indexes,
    l = (r.Blob || (typeof Blob < "u" && Blob)) && g.isSpecCompliantForm(t);
  if (!g.isFunction(o)) throw new TypeError("visitor must be a function");
  function c(u) {
    if (u === null) return "";
    if (g.isDate(u)) return u.toISOString();
    if (g.isBoolean(u)) return u.toString();
    if (!l && g.isBlob(u)) throw new U("Blob is not supported. Use a Buffer instead.");
    return g.isArrayBuffer(u) || g.isTypedArray(u)
      ? l && typeof Blob == "function"
        ? new Blob([u])
        : Buffer.from(u)
      : u;
  }
  function f(u, d, p) {
    let P = u;
    if (g.isReactNative(t) && g.isReactNativeBlob(u)) return (t.append(It(p, d, i), c(u)), !1);
    if (u && !p && typeof u == "object") {
      if (g.endsWith(d, "{}")) ((d = n ? d : d.slice(0, -2)), (u = JSON.stringify(u)));
      else if (
        (g.isArray(u) && rs(u)) ||
        ((g.isFileList(u) || g.endsWith(d, "[]")) && (P = g.toArray(u)))
      )
        return (
          (d = yi(d)),
          P.forEach(function (R, I) {
            !(g.isUndefined(R) || R === null) &&
              t.append(a === !0 ? It([d], I, i) : a === null ? d : d + "[]", c(R));
          }),
          !1
        );
    }
    return Jr(u) ? !0 : (t.append(It(p, d, i), c(u)), !1);
  }
  const h = [],
    E = Object.assign(ns, { defaultVisitor: f, convertValue: c, isVisitable: Jr });
  function T(u, d) {
    if (!g.isUndefined(u)) {
      if (h.indexOf(u) !== -1) throw Error("Circular reference detected in " + d.join("."));
      (h.push(u),
        g.forEach(u, function (P, A) {
          (!(g.isUndefined(P) || P === null) &&
            o.call(t, P, g.isString(A) ? A.trim() : A, d, E)) === !0 && T(P, d ? d.concat(A) : [A]);
        }),
        h.pop());
    }
  }
  if (!g.isObject(e)) throw new TypeError("data must be an object");
  return (T(e), t);
}
function Tn(e) {
  const t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (n) {
    return t[n];
  });
}
function rn(e, t) {
  ((this._pairs = []), e && vt(e, this, t));
}
const hi = rn.prototype;
hi.append = function (t, r) {
  this._pairs.push([t, r]);
};
hi.toString = function (t) {
  const r = t
    ? function (n) {
        return t.call(this, n, Tn);
      }
    : Tn;
  return this._pairs
    .map(function (o) {
      return r(o[0]) + "=" + r(o[1]);
    }, "")
    .join("&");
};
function os(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function mi(e, t, r) {
  if (!t) return e;
  const n = (r && r.encode) || os,
    o = g.isFunction(r) ? { serialize: r } : r,
    i = o && o.serialize;
  let a;
  if (
    (i ? (a = i(t, o)) : (a = g.isURLSearchParams(t) ? t.toString() : new rn(t, o).toString(n)), a)
  ) {
    const s = e.indexOf("#");
    (s !== -1 && (e = e.slice(0, s)), (e += (e.indexOf("?") === -1 ? "?" : "&") + a));
  }
  return e;
}
class xn {
  constructor() {
    this.handlers = [];
  }
  use(t, r, n) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: r,
        synchronous: n ? n.synchronous : !1,
        runWhen: n ? n.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    g.forEach(this.handlers, function (n) {
      n !== null && t(n);
    });
  }
}
const nn = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
  },
  is = typeof URLSearchParams < "u" ? URLSearchParams : rn,
  as = typeof FormData < "u" ? FormData : null,
  ss = typeof Blob < "u" ? Blob : null,
  cs = {
    isBrowser: !0,
    classes: { URLSearchParams: is, FormData: as, Blob: ss },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  on = typeof window < "u" && typeof document < "u",
  Qr = (typeof navigator == "object" && navigator) || void 0,
  us = on && (!Qr || ["ReactNative", "NativeScript", "NS"].indexOf(Qr.product) < 0),
  ls =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  fs = (on && window.location.href) || "http://localhost",
  ps = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: on,
        hasStandardBrowserEnv: us,
        hasStandardBrowserWebWorkerEnv: ls,
        navigator: Qr,
        origin: fs,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  ie = { ...ps, ...cs };
function ds(e, t) {
  return vt(e, new ie.classes.URLSearchParams(), {
    visitor: function (r, n, o, i) {
      return ie.isNode && g.isBuffer(r)
        ? (this.append(n, r.toString("base64")), !1)
        : i.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function ys(e) {
  return g.matchAll(/\w+|\[(\w*)]/g, e).map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function hs(e) {
  const t = {},
    r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++) ((i = r[n]), (t[i] = e[i]));
  return t;
}
function gi(e) {
  function t(r, n, o, i) {
    let a = r[i++];
    if (a === "__proto__") return !0;
    const s = Number.isFinite(+a),
      l = i >= r.length;
    return (
      (a = !a && g.isArray(o) ? o.length : a),
      l
        ? (g.hasOwnProp(o, a) ? (o[a] = [o[a], n]) : (o[a] = n), !s)
        : ((!o[a] || !g.isObject(o[a])) && (o[a] = []),
          t(r, n, o[a], i) && g.isArray(o[a]) && (o[a] = hs(o[a])),
          !s)
    );
  }
  if (g.isFormData(e) && g.isFunction(e.entries)) {
    const r = {};
    return (
      g.forEachEntry(e, (n, o) => {
        t(ys(n), o, r, 0);
      }),
      r
    );
  }
  return null;
}
function ms(e, t, r) {
  if (g.isString(e))
    try {
      return ((t || JSON.parse)(e), g.trim(e));
    } catch (n) {
      if (n.name !== "SyntaxError") throw n;
    }
  return (r || JSON.stringify)(e);
}
const Ze = {
  transitional: nn,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, r) {
      const n = r.getContentType() || "",
        o = n.indexOf("application/json") > -1,
        i = g.isObject(t);
      if ((i && g.isHTMLForm(t) && (t = new FormData(t)), g.isFormData(t)))
        return o ? JSON.stringify(gi(t)) : t;
      if (
        g.isArrayBuffer(t) ||
        g.isBuffer(t) ||
        g.isStream(t) ||
        g.isFile(t) ||
        g.isBlob(t) ||
        g.isReadableStream(t)
      )
        return t;
      if (g.isArrayBufferView(t)) return t.buffer;
      if (g.isURLSearchParams(t))
        return (
          r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1),
          t.toString()
        );
      let s;
      if (i) {
        if (n.indexOf("application/x-www-form-urlencoded") > -1)
          return ds(t, this.formSerializer).toString();
        if ((s = g.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
          const l = this.env && this.env.FormData;
          return vt(s ? { "files[]": t } : t, l && new l(), this.formSerializer);
        }
      }
      return i || o ? (r.setContentType("application/json", !1), ms(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const r = this.transitional || Ze.transitional,
        n = r && r.forcedJSONParsing,
        o = this.responseType === "json";
      if (g.isResponse(t) || g.isReadableStream(t)) return t;
      if (t && g.isString(t) && ((n && !this.responseType) || o)) {
        const a = !(r && r.silentJSONParsing) && o;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (s) {
          if (a)
            throw s.name === "SyntaxError"
              ? U.from(s, U.ERR_BAD_RESPONSE, this, null, this.response)
              : s;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: ie.classes.FormData, Blob: ie.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } },
};
g.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Ze.headers[e] = {};
});
const gs = g.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  vs = (e) => {
    const t = {};
    let r, n, o;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (a) {
            ((o = a.indexOf(":")),
              (r = a.substring(0, o).trim().toLowerCase()),
              (n = a.substring(o + 1).trim()),
              !(!r || (t[r] && gs[r])) &&
                (r === "set-cookie"
                  ? t[r]
                    ? t[r].push(n)
                    : (t[r] = [n])
                  : (t[r] = t[r] ? t[r] + ", " + n : n)));
          }),
      t
    );
  },
  Cn = Symbol("internals");
function ze(e) {
  return e && String(e).trim().toLowerCase();
}
function ut(e) {
  return e === !1 || e == null ? e : g.isArray(e) ? e.map(ut) : String(e);
}
function bs(e) {
  const t = Object.create(null),
    r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; (n = r.exec(e)); ) t[n[1]] = n[2];
  return t;
}
const ws = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Nt(e, t, r, n, o) {
  if (g.isFunction(n)) return n.call(this, t, r);
  if ((o && (t = r), !!g.isString(t))) {
    if (g.isString(n)) return t.indexOf(n) !== -1;
    if (g.isRegExp(n)) return n.test(t);
  }
}
function Ss(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Os(e, t) {
  const r = g.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function (o, i, a) {
        return this[n].call(this, t, o, i, a);
      },
      configurable: !0,
    });
  });
}
let fe = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function i(s, l, c) {
      const f = ze(l);
      if (!f) throw new Error("header name must be a non-empty string");
      const h = g.findKey(o, f);
      (!h || o[h] === void 0 || c === !0 || (c === void 0 && o[h] !== !1)) && (o[h || l] = ut(s));
    }
    const a = (s, l) => g.forEach(s, (c, f) => i(c, f, l));
    if (g.isPlainObject(t) || t instanceof this.constructor) a(t, r);
    else if (g.isString(t) && (t = t.trim()) && !ws(t)) a(vs(t), r);
    else if (g.isObject(t) && g.isIterable(t)) {
      let s = {},
        l,
        c;
      for (const f of t) {
        if (!g.isArray(f)) throw TypeError("Object iterator must return a key-value pair");
        s[(c = f[0])] = (l = s[c]) ? (g.isArray(l) ? [...l, f[1]] : [l, f[1]]) : f[1];
      }
      a(s, r);
    } else t != null && i(r, t, n);
    return this;
  }
  get(t, r) {
    if (((t = ze(t)), t)) {
      const n = g.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r) return o;
        if (r === !0) return bs(o);
        if (g.isFunction(r)) return r.call(this, o, n);
        if (g.isRegExp(r)) return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (((t = ze(t)), t)) {
      const n = g.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || Nt(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function i(a) {
      if (((a = ze(a)), a)) {
        const s = g.findKey(n, a);
        s && (!r || Nt(n, n[s], s, r)) && (delete n[s], (o = !0));
      }
    }
    return (g.isArray(t) ? t.forEach(i) : i(t), o);
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length,
      o = !1;
    for (; n--; ) {
      const i = r[n];
      (!t || Nt(this, this[i], i, t, !0)) && (delete this[i], (o = !0));
    }
    return o;
  }
  normalize(t) {
    const r = this,
      n = {};
    return (
      g.forEach(this, (o, i) => {
        const a = g.findKey(n, i);
        if (a) {
          ((r[a] = ut(o)), delete r[i]);
          return;
        }
        const s = t ? Ss(i) : String(i).trim();
        (s !== i && delete r[i], (r[s] = ut(o)), (n[s] = !0));
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = Object.create(null);
    return (
      g.forEach(this, (n, o) => {
        n != null && n !== !1 && (r[o] = t && g.isArray(n) ? n.join(", ") : n);
      }),
      r
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return (r.forEach((o) => n.set(o)), n);
  }
  static accessor(t) {
    const n = (this[Cn] = this[Cn] = { accessors: {} }).accessors,
      o = this.prototype;
    function i(a) {
      const s = ze(a);
      n[s] || (Os(o, a), (n[s] = !0));
    }
    return (g.isArray(t) ? t.forEach(i) : i(t), this);
  }
};
fe.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
g.reduceDescriptors(fe.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    },
  };
});
g.freezeMethods(fe);
function jt(e, t) {
  const r = this || Ze,
    n = t || r,
    o = fe.from(n.headers);
  let i = n.data;
  return (
    g.forEach(e, function (s) {
      i = s.call(r, i, o.normalize(), t ? t.status : void 0);
    }),
    o.normalize(),
    i
  );
}
function vi(e) {
  return !!(e && e.__CANCEL__);
}
let et = class extends U {
  constructor(t, r, n) {
    (super(t ?? "canceled", U.ERR_CANCELED, r, n),
      (this.name = "CanceledError"),
      (this.__CANCEL__ = !0));
  }
};
function bi(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status)
    ? e(r)
    : t(
        new U(
          "Request failed with status code " + r.status,
          [U.ERR_BAD_REQUEST, U.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
          r.config,
          r.request,
          r
        )
      );
}
function Es(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function As(e, t) {
  e = e || 10;
  const r = new Array(e),
    n = new Array(e);
  let o = 0,
    i = 0,
    a;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (l) {
      const c = Date.now(),
        f = n[i];
      (a || (a = c), (r[o] = l), (n[o] = c));
      let h = i,
        E = 0;
      for (; h !== o; ) ((E += r[h++]), (h = h % e));
      if (((o = (o + 1) % e), o === i && (i = (i + 1) % e), c - a < t)) return;
      const T = f && c - f;
      return T ? Math.round((E * 1e3) / T) : void 0;
    }
  );
}
function Rs(e, t) {
  let r = 0,
    n = 1e3 / t,
    o,
    i;
  const a = (c, f = Date.now()) => {
    ((r = f), (o = null), i && (clearTimeout(i), (i = null)), e(...c));
  };
  return [
    (...c) => {
      const f = Date.now(),
        h = f - r;
      h >= n
        ? a(c, f)
        : ((o = c),
          i ||
            (i = setTimeout(() => {
              ((i = null), a(o));
            }, n - h)));
    },
    () => o && a(o),
  ];
}
const yt = (e, t, r = 3) => {
    let n = 0;
    const o = As(50, 250);
    return Rs((i) => {
      const a = i.loaded,
        s = i.lengthComputable ? i.total : void 0,
        l = a - n,
        c = o(l),
        f = a <= s;
      n = a;
      const h = {
        loaded: a,
        total: s,
        progress: s ? a / s : void 0,
        bytes: l,
        rate: c || void 0,
        estimated: c && s && f ? (s - a) / c : void 0,
        event: i,
        lengthComputable: s != null,
        [t ? "download" : "upload"]: !0,
      };
      e(h);
    }, r);
  },
  Ln = (e, t) => {
    const r = e != null;
    return [(n) => t[0]({ lengthComputable: r, total: e, loaded: n }), t[1]];
  },
  _n =
    (e) =>
    (...t) =>
      g.asap(() => e(...t)),
  Ps = ie.hasStandardBrowserEnv
    ? ((e, t) => (r) => (
        (r = new URL(r, ie.origin)),
        e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)
      ))(new URL(ie.origin), ie.navigator && /(msie|trident)/i.test(ie.navigator.userAgent))
    : () => !0,
  Ts = ie.hasStandardBrowserEnv
    ? {
        write(e, t, r, n, o, i, a) {
          if (typeof document > "u") return;
          const s = [`${e}=${encodeURIComponent(t)}`];
          (g.isNumber(r) && s.push(`expires=${new Date(r).toUTCString()}`),
            g.isString(n) && s.push(`path=${n}`),
            g.isString(o) && s.push(`domain=${o}`),
            i === !0 && s.push("secure"),
            g.isString(a) && s.push(`SameSite=${a}`),
            (document.cookie = s.join("; ")));
        },
        read(e) {
          if (typeof document > "u") return null;
          const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
          return t ? decodeURIComponent(t[1]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function xs(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Cs(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function wi(e, t, r) {
  let n = !xs(t);
  return e && (n || r == !1) ? Cs(e, t) : t;
}
const kn = (e) => (e instanceof fe ? { ...e } : e);
function Ie(e, t) {
  t = t || {};
  const r = {};
  function n(c, f, h, E) {
    return g.isPlainObject(c) && g.isPlainObject(f)
      ? g.merge.call({ caseless: E }, c, f)
      : g.isPlainObject(f)
        ? g.merge({}, f)
        : g.isArray(f)
          ? f.slice()
          : f;
  }
  function o(c, f, h, E) {
    if (g.isUndefined(f)) {
      if (!g.isUndefined(c)) return n(void 0, c, h, E);
    } else return n(c, f, h, E);
  }
  function i(c, f) {
    if (!g.isUndefined(f)) return n(void 0, f);
  }
  function a(c, f) {
    if (g.isUndefined(f)) {
      if (!g.isUndefined(c)) return n(void 0, c);
    } else return n(void 0, f);
  }
  function s(c, f, h) {
    if (h in t) return n(c, f);
    if (h in e) return n(void 0, c);
  }
  const l = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: s,
    headers: (c, f, h) => o(kn(c), kn(f), h, !0),
  };
  return (
    g.forEach(Object.keys({ ...e, ...t }), function (f) {
      if (f === "__proto__" || f === "constructor" || f === "prototype") return;
      const h = g.hasOwnProp(l, f) ? l[f] : o,
        E = h(e[f], t[f], f);
      (g.isUndefined(E) && h !== s) || (r[f] = E);
    }),
    r
  );
}
const Si = (e) => {
    const t = Ie({}, e);
    let {
      data: r,
      withXSRFToken: n,
      xsrfHeaderName: o,
      xsrfCookieName: i,
      headers: a,
      auth: s,
    } = t;
    if (
      ((t.headers = a = fe.from(a)),
      (t.url = mi(wi(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer)),
      s &&
        a.set(
          "Authorization",
          "Basic " +
            btoa(
              (s.username || "") +
                ":" +
                (s.password ? unescape(encodeURIComponent(s.password)) : "")
            )
        ),
      g.isFormData(r))
    ) {
      if (ie.hasStandardBrowserEnv || ie.hasStandardBrowserWebWorkerEnv) a.setContentType(void 0);
      else if (g.isFunction(r.getHeaders)) {
        const l = r.getHeaders(),
          c = ["content-type", "content-length"];
        Object.entries(l).forEach(([f, h]) => {
          c.includes(f.toLowerCase()) && a.set(f, h);
        });
      }
    }
    if (
      ie.hasStandardBrowserEnv &&
      (n && g.isFunction(n) && (n = n(t)), n || (n !== !1 && Ps(t.url)))
    ) {
      const l = o && i && Ts.read(i);
      l && a.set(o, l);
    }
    return t;
  },
  Ls = typeof XMLHttpRequest < "u",
  _s =
    Ls &&
    function (e) {
      return new Promise(function (r, n) {
        const o = Si(e);
        let i = o.data;
        const a = fe.from(o.headers).normalize();
        let { responseType: s, onUploadProgress: l, onDownloadProgress: c } = o,
          f,
          h,
          E,
          T,
          u;
        function d() {
          (T && T(),
            u && u(),
            o.cancelToken && o.cancelToken.unsubscribe(f),
            o.signal && o.signal.removeEventListener("abort", f));
        }
        let p = new XMLHttpRequest();
        (p.open(o.method.toUpperCase(), o.url, !0), (p.timeout = o.timeout));
        function P() {
          if (!p) return;
          const R = fe.from("getAllResponseHeaders" in p && p.getAllResponseHeaders()),
            C = {
              data: !s || s === "text" || s === "json" ? p.responseText : p.response,
              status: p.status,
              statusText: p.statusText,
              headers: R,
              config: e,
              request: p,
            };
          (bi(
            function (m) {
              (r(m), d());
            },
            function (m) {
              (n(m), d());
            },
            C
          ),
            (p = null));
        }
        ("onloadend" in p
          ? (p.onloadend = P)
          : (p.onreadystatechange = function () {
              !p ||
                p.readyState !== 4 ||
                (p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0)) ||
                setTimeout(P);
            }),
          (p.onabort = function () {
            p && (n(new U("Request aborted", U.ECONNABORTED, e, p)), (p = null));
          }),
          (p.onerror = function (I) {
            const C = I && I.message ? I.message : "Network Error",
              L = new U(C, U.ERR_NETWORK, e, p);
            ((L.event = I || null), n(L), (p = null));
          }),
          (p.ontimeout = function () {
            let I = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
            const C = o.transitional || nn;
            (o.timeoutErrorMessage && (I = o.timeoutErrorMessage),
              n(new U(I, C.clarifyTimeoutError ? U.ETIMEDOUT : U.ECONNABORTED, e, p)),
              (p = null));
          }),
          i === void 0 && a.setContentType(null),
          "setRequestHeader" in p &&
            g.forEach(a.toJSON(), function (I, C) {
              p.setRequestHeader(C, I);
            }),
          g.isUndefined(o.withCredentials) || (p.withCredentials = !!o.withCredentials),
          s && s !== "json" && (p.responseType = o.responseType),
          c && (([E, u] = yt(c, !0)), p.addEventListener("progress", E)),
          l &&
            p.upload &&
            (([h, T] = yt(l)),
            p.upload.addEventListener("progress", h),
            p.upload.addEventListener("loadend", T)),
          (o.cancelToken || o.signal) &&
            ((f = (R) => {
              p && (n(!R || R.type ? new et(null, e, p) : R), p.abort(), (p = null));
            }),
            o.cancelToken && o.cancelToken.subscribe(f),
            o.signal && (o.signal.aborted ? f() : o.signal.addEventListener("abort", f))));
        const A = Es(o.url);
        if (A && ie.protocols.indexOf(A) === -1) {
          n(new U("Unsupported protocol " + A + ":", U.ERR_BAD_REQUEST, e));
          return;
        }
        p.send(i || null);
      });
    },
  ks = (e, t) => {
    const { length: r } = (e = e ? e.filter(Boolean) : []);
    if (t || r) {
      let n = new AbortController(),
        o;
      const i = function (c) {
        if (!o) {
          ((o = !0), s());
          const f = c instanceof Error ? c : this.reason;
          n.abort(f instanceof U ? f : new et(f instanceof Error ? f.message : f));
        }
      };
      let a =
        t &&
        setTimeout(() => {
          ((a = null), i(new U(`timeout of ${t}ms exceeded`, U.ETIMEDOUT)));
        }, t);
      const s = () => {
        e &&
          (a && clearTimeout(a),
          (a = null),
          e.forEach((c) => {
            c.unsubscribe ? c.unsubscribe(i) : c.removeEventListener("abort", i);
          }),
          (e = null));
      };
      e.forEach((c) => c.addEventListener("abort", i));
      const { signal: l } = n;
      return ((l.unsubscribe = () => g.asap(s)), l);
    }
  },
  Is = function* (e, t) {
    let r = e.byteLength;
    if (r < t) {
      yield e;
      return;
    }
    let n = 0,
      o;
    for (; n < r; ) ((o = n + t), yield e.slice(n, o), (n = o));
  },
  Ns = async function* (e, t) {
    for await (const r of js(e)) yield* Is(r, t);
  },
  js = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: r, value: n } = await t.read();
        if (r) break;
        yield n;
      }
    } finally {
      await t.cancel();
    }
  },
  In = (e, t, r, n) => {
    const o = Ns(e, t);
    let i = 0,
      a,
      s = (l) => {
        a || ((a = !0), n && n(l));
      };
    return new ReadableStream(
      {
        async pull(l) {
          try {
            const { done: c, value: f } = await o.next();
            if (c) {
              (s(), l.close());
              return;
            }
            let h = f.byteLength;
            if (r) {
              let E = (i += h);
              r(E);
            }
            l.enqueue(new Uint8Array(f));
          } catch (c) {
            throw (s(c), c);
          }
        },
        cancel(l) {
          return (s(l), o.return());
        },
      },
      { highWaterMark: 2 }
    );
  },
  Nn = 64 * 1024,
  { isFunction: ot } = g,
  Fs = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(g.global),
  { ReadableStream: jn, TextEncoder: Fn } = g.global,
  $n = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  $s = (e) => {
    e = g.merge.call({ skipUndefined: !0 }, Fs, e);
    const { fetch: t, Request: r, Response: n } = e,
      o = t ? ot(t) : typeof fetch == "function",
      i = ot(r),
      a = ot(n);
    if (!o) return !1;
    const s = o && ot(jn),
      l =
        o &&
        (typeof Fn == "function"
          ? (
              (u) => (d) =>
                u.encode(d)
            )(new Fn())
          : async (u) => new Uint8Array(await new r(u).arrayBuffer())),
      c =
        i &&
        s &&
        $n(() => {
          let u = !1;
          const d = new r(ie.origin, {
            body: new jn(),
            method: "POST",
            get duplex() {
              return ((u = !0), "half");
            },
          }).headers.has("Content-Type");
          return u && !d;
        }),
      f = a && s && $n(() => g.isReadableStream(new n("").body)),
      h = { stream: f && ((u) => u.body) };
    o &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((u) => {
        !h[u] &&
          (h[u] = (d, p) => {
            let P = d && d[u];
            if (P) return P.call(d);
            throw new U(`Response type '${u}' is not supported`, U.ERR_NOT_SUPPORT, p);
          });
      });
    const E = async (u) => {
        if (u == null) return 0;
        if (g.isBlob(u)) return u.size;
        if (g.isSpecCompliantForm(u))
          return (await new r(ie.origin, { method: "POST", body: u }).arrayBuffer()).byteLength;
        if (g.isArrayBufferView(u) || g.isArrayBuffer(u)) return u.byteLength;
        if ((g.isURLSearchParams(u) && (u = u + ""), g.isString(u))) return (await l(u)).byteLength;
      },
      T = async (u, d) => {
        const p = g.toFiniteNumber(u.getContentLength());
        return p ?? E(d);
      };
    return async (u) => {
      let {
          url: d,
          method: p,
          data: P,
          signal: A,
          cancelToken: R,
          timeout: I,
          onDownloadProgress: C,
          onUploadProgress: L,
          responseType: m,
          headers: O,
          withCredentials: x = "same-origin",
          fetchOptions: k,
        } = Si(u),
        N = t || fetch;
      m = m ? (m + "").toLowerCase() : "text";
      let F = ks([A, R && R.toAbortSignal()], I),
        q = null;
      const D =
        F &&
        F.unsubscribe &&
        (() => {
          F.unsubscribe();
        });
      let z;
      try {
        if (L && c && p !== "get" && p !== "head" && (z = await T(O, P)) !== 0) {
          let Q = new r(d, { method: "POST", body: P, duplex: "half" }),
            oe;
          if (
            (g.isFormData(P) && (oe = Q.headers.get("content-type")) && O.setContentType(oe),
            Q.body)
          ) {
            const [se, ae] = Ln(z, yt(_n(L)));
            P = In(Q.body, Nn, se, ae);
          }
        }
        g.isString(x) || (x = x ? "include" : "omit");
        const $ = i && "credentials" in r.prototype,
          J = {
            ...k,
            signal: F,
            method: p.toUpperCase(),
            headers: O.normalize().toJSON(),
            body: P,
            duplex: "half",
            credentials: $ ? x : void 0,
          };
        q = i && new r(d, J);
        let S = await (i ? N(q, k) : N(d, J));
        const W = f && (m === "stream" || m === "response");
        if (f && (C || (W && D))) {
          const Q = {};
          ["status", "statusText", "headers"].forEach((ce) => {
            Q[ce] = S[ce];
          });
          const oe = g.toFiniteNumber(S.headers.get("content-length")),
            [se, ae] = (C && Ln(oe, yt(_n(C), !0))) || [];
          S = new n(
            In(S.body, Nn, se, () => {
              (ae && ae(), D && D());
            }),
            Q
          );
        }
        m = m || "text";
        let ee = await h[g.findKey(h, m) || "text"](S, u);
        return (
          !W && D && D(),
          await new Promise((Q, oe) => {
            bi(Q, oe, {
              data: ee,
              headers: fe.from(S.headers),
              status: S.status,
              statusText: S.statusText,
              config: u,
              request: q,
            });
          })
        );
      } catch ($) {
        throw (
          D && D(),
          $ && $.name === "TypeError" && /Load failed|fetch/i.test($.message)
            ? Object.assign(new U("Network Error", U.ERR_NETWORK, u, q, $ && $.response), {
                cause: $.cause || $,
              })
            : U.from($, $ && $.code, u, q, $ && $.response)
        );
      }
    };
  },
  Us = new Map(),
  Oi = (e) => {
    let t = (e && e.env) || {};
    const { fetch: r, Request: n, Response: o } = t,
      i = [n, o, r];
    let a = i.length,
      s = a,
      l,
      c,
      f = Us;
    for (; s--; )
      ((l = i[s]), (c = f.get(l)), c === void 0 && f.set(l, (c = s ? new Map() : $s(t))), (f = c));
    return c;
  };
Oi();
const an = { http: ts, xhr: _s, fetch: { get: Oi } };
g.forEach(an, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Un = (e) => `- ${e}`,
  Ds = (e) => g.isFunction(e) || e === null || e === !1;
function Ms(e, t) {
  e = g.isArray(e) ? e : [e];
  const { length: r } = e;
  let n, o;
  const i = {};
  for (let a = 0; a < r; a++) {
    n = e[a];
    let s;
    if (((o = n), !Ds(n) && ((o = an[(s = String(n)).toLowerCase()]), o === void 0)))
      throw new U(`Unknown adapter '${s}'`);
    if (o && (g.isFunction(o) || (o = o.get(t)))) break;
    i[s || "#" + a] = o;
  }
  if (!o) {
    const a = Object.entries(i).map(
      ([l, c]) =>
        `adapter ${l} ` +
        (c === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let s = r
      ? a.length > 1
        ? `since :
` +
          a.map(Un).join(`
`)
        : " " + Un(a[0])
      : "as no adapter specified";
    throw new U("There is no suitable adapter to dispatch the request " + s, "ERR_NOT_SUPPORT");
  }
  return o;
}
const Ei = { getAdapter: Ms, adapters: an };
function Ft(e) {
  if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
    throw new et(null, e);
}
function Dn(e) {
  return (
    Ft(e),
    (e.headers = fe.from(e.headers)),
    (e.data = jt.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Ei.getAdapter(
      e.adapter || Ze.adapter,
      e
    )(e).then(
      function (n) {
        return (
          Ft(e),
          (n.data = jt.call(e, e.transformResponse, n)),
          (n.headers = fe.from(n.headers)),
          n
        );
      },
      function (n) {
        return (
          vi(n) ||
            (Ft(e),
            n &&
              n.response &&
              ((n.response.data = jt.call(e, e.transformResponse, n.response)),
              (n.response.headers = fe.from(n.response.headers)))),
          Promise.reject(n)
        );
      }
    )
  );
}
const Ai = "1.13.6",
  bt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  bt[e] = function (n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Mn = {};
bt.transitional = function (t, r, n) {
  function o(i, a) {
    return "[Axios v" + Ai + "] Transitional option '" + i + "'" + a + (n ? ". " + n : "");
  }
  return (i, a, s) => {
    if (t === !1) throw new U(o(a, " has been removed" + (r ? " in " + r : "")), U.ERR_DEPRECATED);
    return (
      r &&
        !Mn[a] &&
        ((Mn[a] = !0),
        console.warn(
          o(a, " has been deprecated since v" + r + " and will be removed in the near future")
        )),
      t ? t(i, a, s) : !0
    );
  };
};
bt.spelling = function (t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function Bs(e, t, r) {
  if (typeof e != "object") throw new U("options must be an object", U.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o],
      a = t[i];
    if (a) {
      const s = e[i],
        l = s === void 0 || a(s, i, e);
      if (l !== !0) throw new U("option " + i + " must be " + l, U.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0) throw new U("Unknown option " + i, U.ERR_BAD_OPTION);
  }
}
const lt = { assertOptions: Bs, validators: bt },
  ge = lt.validators;
let ke = class {
  constructor(t) {
    ((this.defaults = t || {}), (this.interceptors = { request: new xn(), response: new xn() }));
  }
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : (o = new Error());
        const i = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack
            ? i &&
              !String(n.stack).endsWith(i.replace(/^.+\n.+\n/, "")) &&
              (n.stack +=
                `
` + i)
            : (n.stack = i);
        } catch {}
      }
      throw n;
    }
  }
  _request(t, r) {
    (typeof t == "string" ? ((r = r || {}), (r.url = t)) : (r = t || {}),
      (r = Ie(this.defaults, r)));
    const { transitional: n, paramsSerializer: o, headers: i } = r;
    (n !== void 0 &&
      lt.assertOptions(
        n,
        {
          silentJSONParsing: ge.transitional(ge.boolean),
          forcedJSONParsing: ge.transitional(ge.boolean),
          clarifyTimeoutError: ge.transitional(ge.boolean),
          legacyInterceptorReqResOrdering: ge.transitional(ge.boolean),
        },
        !1
      ),
      o != null &&
        (g.isFunction(o)
          ? (r.paramsSerializer = { serialize: o })
          : lt.assertOptions(o, { encode: ge.function, serialize: ge.function }, !0)),
      r.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (r.allowAbsoluteUrls = !0)),
      lt.assertOptions(
        r,
        { baseUrl: ge.spelling("baseURL"), withXsrfToken: ge.spelling("withXSRFToken") },
        !0
      ),
      (r.method = (r.method || this.defaults.method || "get").toLowerCase()));
    let a = i && g.merge(i.common, i[r.method]);
    (i &&
      g.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (u) => {
        delete i[u];
      }),
      (r.headers = fe.concat(a, i)));
    const s = [];
    let l = !0;
    this.interceptors.request.forEach(function (d) {
      if (typeof d.runWhen == "function" && d.runWhen(r) === !1) return;
      l = l && d.synchronous;
      const p = r.transitional || nn;
      p && p.legacyInterceptorReqResOrdering
        ? s.unshift(d.fulfilled, d.rejected)
        : s.push(d.fulfilled, d.rejected);
    });
    const c = [];
    this.interceptors.response.forEach(function (d) {
      c.push(d.fulfilled, d.rejected);
    });
    let f,
      h = 0,
      E;
    if (!l) {
      const u = [Dn.bind(this), void 0];
      for (u.unshift(...s), u.push(...c), E = u.length, f = Promise.resolve(r); h < E; )
        f = f.then(u[h++], u[h++]);
      return f;
    }
    E = s.length;
    let T = r;
    for (; h < E; ) {
      const u = s[h++],
        d = s[h++];
      try {
        T = u(T);
      } catch (p) {
        d.call(this, p);
        break;
      }
    }
    try {
      f = Dn.call(this, T);
    } catch (u) {
      return Promise.reject(u);
    }
    for (h = 0, E = c.length; h < E; ) f = f.then(c[h++], c[h++]);
    return f;
  }
  getUri(t) {
    t = Ie(this.defaults, t);
    const r = wi(t.baseURL, t.url, t.allowAbsoluteUrls);
    return mi(r, t.params, t.paramsSerializer);
  }
};
g.forEach(["delete", "get", "head", "options"], function (t) {
  ke.prototype[t] = function (r, n) {
    return this.request(Ie(n || {}, { method: t, url: r, data: (n || {}).data }));
  };
});
g.forEach(["post", "put", "patch"], function (t) {
  function r(n) {
    return function (i, a, s) {
      return this.request(
        Ie(s || {}, {
          method: t,
          headers: n ? { "Content-Type": "multipart/form-data" } : {},
          url: i,
          data: a,
        })
      );
    };
  }
  ((ke.prototype[t] = r()), (ke.prototype[t + "Form"] = r(!0)));
});
let qs = class Ri {
  constructor(t) {
    if (typeof t != "function") throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function (i) {
      r = i;
    });
    const n = this;
    (this.promise.then((o) => {
      if (!n._listeners) return;
      let i = n._listeners.length;
      for (; i-- > 0; ) n._listeners[i](o);
      n._listeners = null;
    }),
      (this.promise.then = (o) => {
        let i;
        const a = new Promise((s) => {
          (n.subscribe(s), (i = s));
        }).then(o);
        return (
          (a.cancel = function () {
            n.unsubscribe(i);
          }),
          a
        );
      }),
      t(function (i, a, s) {
        n.reason || ((n.reason = new et(i, a, s)), r(n.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      r = (n) => {
        t.abort(n);
      };
    return (this.subscribe(r), (t.signal.unsubscribe = () => this.unsubscribe(r)), t.signal);
  }
  static source() {
    let t;
    return {
      token: new Ri(function (o) {
        t = o;
      }),
      cancel: t,
    };
  }
};
function Ws(e) {
  return function (r) {
    return e.apply(null, r);
  };
}
function Hs(e) {
  return g.isObject(e) && e.isAxiosError === !0;
}
const Xr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(Xr).forEach(([e, t]) => {
  Xr[t] = e;
});
function Pi(e) {
  const t = new ke(e),
    r = ii(ke.prototype.request, t);
  return (
    g.extend(r, ke.prototype, t, { allOwnKeys: !0 }),
    g.extend(r, t, null, { allOwnKeys: !0 }),
    (r.create = function (o) {
      return Pi(Ie(e, o));
    }),
    r
  );
}
const Z = Pi(Ze);
Z.Axios = ke;
Z.CanceledError = et;
Z.CancelToken = qs;
Z.isCancel = vi;
Z.VERSION = Ai;
Z.toFormData = vt;
Z.AxiosError = U;
Z.Cancel = Z.CanceledError;
Z.all = function (t) {
  return Promise.all(t);
};
Z.spread = Ws;
Z.isAxiosError = Hs;
Z.mergeConfig = Ie;
Z.AxiosHeaders = fe;
Z.formToJSON = (e) => gi(g.isHTMLForm(e) ? new FormData(e) : e);
Z.getAdapter = Ei.getAdapter;
Z.HttpStatusCode = Xr;
Z.default = Z;
const {
  Axios: kl,
  AxiosError: Il,
  CanceledError: Nl,
  isCancel: jl,
  CancelToken: Fl,
  VERSION: $l,
  all: Ul,
  Cancel: Dl,
  isAxiosError: Ml,
  spread: Bl,
  toFormData: ql,
  AxiosHeaders: Wl,
  HttpStatusCode: Hl,
  formToJSON: zl,
  getAdapter: Gl,
  mergeConfig: Vl,
} = Z;
var zs = Function.prototype.toString,
  $t = Object.create,
  Gs = Object.prototype.toString,
  Vs = (function () {
    function e() {
      ((this._keys = []), (this._values = []));
    }
    return (
      (e.prototype.has = function (t) {
        return !!~this._keys.indexOf(t);
      }),
      (e.prototype.get = function (t) {
        return this._values[this._keys.indexOf(t)];
      }),
      (e.prototype.set = function (t, r) {
        (this._keys.push(t), this._values.push(r));
      }),
      e
    );
  })();
function Ks() {
  return new Vs();
}
function Js() {
  return new WeakMap();
}
var Qs = typeof WeakMap < "u" ? Js : Ks;
function sn(e) {
  if (!e) return $t(null);
  var t = e.constructor;
  if (t === Object) return e === Object.prototype ? {} : $t(e);
  if (t && ~zs.call(t).indexOf("[native code]"))
    try {
      return new t();
    } catch {}
  return $t(e);
}
function Xs(e) {
  var t = "";
  return (
    e.global && (t += "g"),
    e.ignoreCase && (t += "i"),
    e.multiline && (t += "m"),
    e.unicode && (t += "u"),
    e.sticky && (t += "y"),
    t
  );
}
function Ys(e) {
  return e.flags;
}
var Zs = /test/g.flags === "g" ? Ys : Xs;
function Ti(e) {
  var t = Gs.call(e);
  return t.substring(8, t.length - 1);
}
function ec(e) {
  return e[Symbol.toStringTag] || Ti(e);
}
var tc = typeof Symbol < "u" ? ec : Ti,
  rc = Object.defineProperty,
  nc = Object.getOwnPropertyDescriptor,
  xi = Object.getOwnPropertyNames,
  cn = Object.getOwnPropertySymbols,
  Ci = Object.prototype,
  Li = Ci.hasOwnProperty,
  oc = Ci.propertyIsEnumerable,
  _i = typeof cn == "function";
function ic(e) {
  return xi(e).concat(cn(e));
}
var ac = _i ? ic : xi;
function wt(e, t, r) {
  for (var n = ac(e), o = 0, i = n.length, a = void 0, s = void 0; o < i; ++o)
    if (((a = n[o]), !(a === "callee" || a === "caller"))) {
      if (((s = nc(e, a)), !s)) {
        t[a] = r.copier(e[a], r);
        continue;
      }
      !s.get && !s.set && (s.value = r.copier(s.value, r));
      try {
        rc(t, a, s);
      } catch {
        t[a] = s.value;
      }
    }
  return t;
}
function sc(e, t) {
  var r = new t.Constructor();
  t.cache.set(e, r);
  for (var n = 0, o = e.length; n < o; ++n) r[n] = t.copier(e[n], t);
  return r;
}
function cc(e, t) {
  var r = new t.Constructor();
  return (t.cache.set(e, r), wt(e, r, t));
}
function ki(e, t) {
  return e.slice(0);
}
function uc(e, t) {
  return e.slice(0, e.size, e.type);
}
function lc(e, t) {
  return new t.Constructor(ki(e.buffer));
}
function fc(e, t) {
  return new t.Constructor(e.getTime());
}
function Ii(e, t) {
  var r = new t.Constructor();
  return (
    t.cache.set(e, r),
    e.forEach(function (n, o) {
      r.set(o, t.copier(n, t));
    }),
    r
  );
}
function pc(e, t) {
  return wt(e, Ii(e, t), t);
}
function dc(e, t) {
  var r = sn(t.prototype);
  t.cache.set(e, r);
  for (var n in e) Li.call(e, n) && (r[n] = t.copier(e[n], t));
  return r;
}
function yc(e, t) {
  var r = sn(t.prototype);
  t.cache.set(e, r);
  for (var n in e) Li.call(e, n) && (r[n] = t.copier(e[n], t));
  for (var o = cn(e), i = 0, a = o.length, s = void 0; i < a; ++i)
    ((s = o[i]), oc.call(e, s) && (r[s] = t.copier(e[s], t)));
  return r;
}
var hc = _i ? yc : dc;
function mc(e, t) {
  var r = sn(t.prototype);
  return (t.cache.set(e, r), wt(e, r, t));
}
function Ut(e, t) {
  return new t.Constructor(e.valueOf());
}
function gc(e, t) {
  var r = new t.Constructor(e.source, Zs(e));
  return ((r.lastIndex = e.lastIndex), r);
}
function ft(e, t) {
  return e;
}
function Ni(e, t) {
  var r = new t.Constructor();
  return (
    t.cache.set(e, r),
    e.forEach(function (n) {
      r.add(t.copier(n, t));
    }),
    r
  );
}
function vc(e, t) {
  return wt(e, Ni(e, t), t);
}
var bc = Array.isArray,
  un = Object.assign,
  wc =
    Object.getPrototypeOf ||
    function (e) {
      return e.__proto__;
    },
  ji = {
    array: sc,
    arrayBuffer: ki,
    blob: uc,
    dataView: lc,
    date: fc,
    error: ft,
    map: Ii,
    object: hc,
    regExp: gc,
    set: Ni,
  },
  Sc = un({}, ji, { array: cc, map: pc, object: mc, set: vc });
function Oc(e) {
  return {
    Arguments: e.object,
    Array: e.array,
    ArrayBuffer: e.arrayBuffer,
    Blob: e.blob,
    Boolean: Ut,
    DataView: e.dataView,
    Date: e.date,
    Error: e.error,
    Float32Array: e.arrayBuffer,
    Float64Array: e.arrayBuffer,
    Int8Array: e.arrayBuffer,
    Int16Array: e.arrayBuffer,
    Int32Array: e.arrayBuffer,
    Map: e.map,
    Number: Ut,
    Object: e.object,
    Promise: ft,
    RegExp: e.regExp,
    Set: e.set,
    String: Ut,
    WeakMap: ft,
    WeakSet: ft,
    Uint8Array: e.arrayBuffer,
    Uint8ClampedArray: e.arrayBuffer,
    Uint16Array: e.arrayBuffer,
    Uint32Array: e.arrayBuffer,
    Uint64Array: e.arrayBuffer,
  };
}
function Fi(e) {
  var t = un({}, ji, e),
    r = Oc(t),
    n = r.Array,
    o = r.Object;
  function i(a, s) {
    if (((s.prototype = s.Constructor = void 0), !a || typeof a != "object")) return a;
    if (s.cache.has(a)) return s.cache.get(a);
    if (
      ((s.prototype = wc(a)),
      (s.Constructor = s.prototype && s.prototype.constructor),
      !s.Constructor || s.Constructor === Object)
    )
      return o(a, s);
    if (bc(a)) return n(a, s);
    var l = r[tc(a)];
    return l ? l(a, s) : typeof a.then == "function" ? a : o(a, s);
  }
  return function (s) {
    return i(s, { Constructor: void 0, cache: Qs(), copier: i, prototype: void 0 });
  };
}
function Ec(e) {
  return Fi(un({}, Sc, e));
}
Ec({});
var St = Fi({});
function Ac(e, t) {
  e.interceptors.request.use(function (r) {
    return t().then((n) => (r.headers.set("Authorization", `Bearer ${n}`), r));
  });
}
var Dt = { exports: {} },
  Bn;
function Rc() {
  if (Bn) return Dt.exports;
  Bn = 1;
  var e = (Dt.exports = {}),
    t,
    r;
  function n() {
    throw new Error("setTimeout has not been defined");
  }
  function o() {
    throw new Error("clearTimeout has not been defined");
  }
  (function () {
    try {
      typeof setTimeout == "function" ? (t = setTimeout) : (t = n);
    } catch {
      t = n;
    }
    try {
      typeof clearTimeout == "function" ? (r = clearTimeout) : (r = o);
    } catch {
      r = o;
    }
  })();
  function i(d) {
    if (t === setTimeout) return setTimeout(d, 0);
    if ((t === n || !t) && setTimeout) return ((t = setTimeout), setTimeout(d, 0));
    try {
      return t(d, 0);
    } catch {
      try {
        return t.call(null, d, 0);
      } catch {
        return t.call(this, d, 0);
      }
    }
  }
  function a(d) {
    if (r === clearTimeout) return clearTimeout(d);
    if ((r === o || !r) && clearTimeout) return ((r = clearTimeout), clearTimeout(d));
    try {
      return r(d);
    } catch {
      try {
        return r.call(null, d);
      } catch {
        return r.call(this, d);
      }
    }
  }
  var s = [],
    l = !1,
    c,
    f = -1;
  function h() {
    !l || !c || ((l = !1), c.length ? (s = c.concat(s)) : (f = -1), s.length && E());
  }
  function E() {
    if (!l) {
      var d = i(h);
      l = !0;
      for (var p = s.length; p; ) {
        for (c = s, s = []; ++f < p; ) c && c[f].run();
        ((f = -1), (p = s.length));
      }
      ((c = null), (l = !1), a(d));
    }
  }
  e.nextTick = function (d) {
    var p = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var P = 1; P < arguments.length; P++) p[P - 1] = arguments[P];
    (s.push(new T(d, p)), s.length === 1 && !l && i(E));
  };
  function T(d, p) {
    ((this.fun = d), (this.array = p));
  }
  ((T.prototype.run = function () {
    this.fun.apply(null, this.array);
  }),
    (e.title = "browser"),
    (e.browser = !0),
    (e.env = {}),
    (e.argv = []),
    (e.version = ""),
    (e.versions = {}));
  function u() {}
  return (
    (e.on = u),
    (e.addListener = u),
    (e.once = u),
    (e.off = u),
    (e.removeListener = u),
    (e.removeAllListeners = u),
    (e.emit = u),
    (e.prependListener = u),
    (e.prependOnceListener = u),
    (e.listeners = function (d) {
      return [];
    }),
    (e.binding = function (d) {
      throw new Error("process.binding is not supported");
    }),
    (e.cwd = function () {
      return "/";
    }),
    (e.chdir = function (d) {
      throw new Error("process.chdir is not supported");
    }),
    (e.umask = function () {
      return 0;
    }),
    Dt.exports
  );
}
var Pc = Rc();
const Ce = Je(Pc);
function Tc() {
  return typeof Ce < "u" && !Ce.browser;
}
function xc() {
  return (
    typeof window < "u" &&
    "navigator" in window &&
    "product" in window.navigator &&
    window.navigator.product === "ReactNative"
  );
}
function Cc() {
  return Ce.versions && Ce.versions.node ? `v${Ce.versions.node}` : Ce.version;
}
function Lc() {
  return window;
}
function Yr() {}
const _c = (e) =>
    new Promise((t) => {
      setTimeout(t, e);
    }),
  kc = (e) => Math.pow(Math.SQRT2, e);
function Ic(e, t = 5) {
  const { responseLogger: r = Yr, requestLogger: n = Yr } = e.defaults;
  (e.interceptors.request.use(
    function (o) {
      return (n(o), o);
    },
    function (o) {
      return (n(o), Promise.reject(o));
    }
  ),
    e.interceptors.response.use(
      function (o) {
        return (r(o), o);
      },
      async function (o) {
        const { response: i } = o,
          { config: a } = o;
        if ((r(o), !a || !e.defaults.retryOnError)) return Promise.reject(o);
        const s = a.attempts || 1;
        if (s > t) return ((o.attempts = a.attempts), Promise.reject(o));
        let l = null,
          c = kc(s);
        return (
          i
            ? i.status >= 500 && i.status < 600
              ? (l = `Server ${i.status}`)
              : i.status === 429 &&
                ((l = "Rate limit"),
                i.headers &&
                  o.response.headers["x-contentful-ratelimit-reset"] &&
                  (c = i.headers["x-contentful-ratelimit-reset"]))
            : (l = "Connection"),
          l
            ? ((c = Math.floor(c * 1e3 + Math.random() * 200 + 500)),
              e.defaults.logHandler(
                "warning",
                `${l} error occurred. Waiting for ${c} ms before retrying...`
              ),
              (a.attempts = s + 1),
              delete a.httpAgent,
              delete a.httpsAgent,
              _c(c).then(() => e(a)))
            : Promise.reject(o)
        );
      }
    ));
}
var Mt, qn;
function Nc() {
  if (qn) return Mt;
  qn = 1;
  var e = typeof De == "object" && De && De.Object === Object && De;
  return ((Mt = e), Mt);
}
var Bt, Wn;
function jc() {
  if (Wn) return Bt;
  Wn = 1;
  var e = Nc(),
    t = typeof self == "object" && self && self.Object === Object && self,
    r = e || t || Function("return this")();
  return ((Bt = r), Bt);
}
var qt, Hn;
function $i() {
  if (Hn) return qt;
  Hn = 1;
  var e = jc(),
    t = e.Symbol;
  return ((qt = t), qt);
}
var Wt, zn;
function Fc() {
  if (zn) return Wt;
  zn = 1;
  var e = $i(),
    t = Object.prototype,
    r = t.hasOwnProperty,
    n = t.toString,
    o = e ? e.toStringTag : void 0;
  function i(a) {
    var s = r.call(a, o),
      l = a[o];
    try {
      a[o] = void 0;
      var c = !0;
    } catch {}
    var f = n.call(a);
    return (c && (s ? (a[o] = l) : delete a[o]), f);
  }
  return ((Wt = i), Wt);
}
var Ht, Gn;
function $c() {
  if (Gn) return Ht;
  Gn = 1;
  var e = Object.prototype,
    t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return ((Ht = r), Ht);
}
var zt, Vn;
function Ui() {
  if (Vn) return zt;
  Vn = 1;
  var e = $i(),
    t = Fc(),
    r = $c(),
    n = "[object Null]",
    o = "[object Undefined]",
    i = e ? e.toStringTag : void 0;
  function a(s) {
    return s == null ? (s === void 0 ? o : n) : i && i in Object(s) ? t(s) : r(s);
  }
  return ((zt = a), zt);
}
var Gt, Kn;
function Uc() {
  if (Kn) return Gt;
  Kn = 1;
  var e = Array.isArray;
  return ((Gt = e), Gt);
}
var Vt, Jn;
function Di() {
  if (Jn) return Vt;
  Jn = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return ((Vt = e), Vt);
}
var Kt, Qn;
function Dc() {
  if (Qn) return Kt;
  Qn = 1;
  var e = Ui(),
    t = Uc(),
    r = Di(),
    n = "[object String]";
  function o(i) {
    return typeof i == "string" || (!t(i) && r(i) && e(i) == n);
  }
  return ((Kt = o), Kt);
}
var Mc = Dc();
const Xn = Je(Mc);
class Bc extends Error {
  name = "AbortError";
  constructor() {
    super("Throttled function aborted");
  }
}
function qc({ limit: e, interval: t, strict: r, onDelay: n }) {
  if (!Number.isFinite(e)) throw new TypeError("Expected `limit` to be a finite number");
  if (!Number.isFinite(t)) throw new TypeError("Expected `interval` to be a finite number");
  const o = new Map();
  let i = 0,
    a = 0;
  function s() {
    const c = Date.now();
    return c - i > t ? ((a = 1), (i = c), 0) : (a < e ? a++ : ((i += t), (a = 1)), i - c);
  }
  const l = s;
  return function (c) {
    const f = function (...h) {
      if (!f.isEnabled) return (async () => c.apply(this, h))();
      let E;
      return new Promise((T, u) => {
        const d = () => {
            (T(c.apply(this, h)), o.delete(E));
          },
          p = l();
        p > 0 ? ((E = setTimeout(d, p)), o.set(E, u), n?.()) : d();
      });
    };
    return (
      (f.abort = () => {
        for (const h of o.keys()) (clearTimeout(h), o.get(h)(new Bc()));
        o.clear();
      }),
      (f.isEnabled = !0),
      Object.defineProperty(f, "queueSize", {
        get() {
          return o.size;
        },
      }),
      f
    );
  };
}
const Zr = /(?<value>\d+)(%)/;
function Jt(e, t = 7) {
  let r = t;
  if (Zr.test(e)) {
    const n = e.match(Zr)?.groups;
    if (n && n.value) {
      const o = parseInt(n.value) / 100;
      r = Math.round(t * o);
    }
  }
  return Math.min(30, Math.max(1, r));
}
function Yn(e, t) {
  return (t("info", `Throttle request to ${e}/s`), qc({ limit: e, interval: 1e3, strict: !1 }));
}
var Wc = (e, t = "auto") => {
    const { logHandler: r = Yr } = e.defaults;
    let n = Xn(t) ? Jt(t) : Jt("auto", t),
      o = Yn(n, r),
      i = !1,
      a = e.interceptors.request.use(
        (l) => o(() => l)(),
        function (l) {
          return Promise.reject(l);
        }
      );
    const s = e.interceptors.response.use(
      (l) => {
        if (
          !i &&
          Xn(t) &&
          (t === "auto" || Zr.test(t)) &&
          l.headers &&
          l.headers["x-contentful-ratelimit-second-limit"]
        ) {
          const c = parseInt(l.headers["x-contentful-ratelimit-second-limit"]),
            f = Jt(t, c);
          (f !== n &&
            (a && e.interceptors.request.eject(a),
            (n = f),
            (o = Yn(f, r)),
            (a = e.interceptors.request.use(
              (h) => o(() => h)(),
              function (h) {
                return Promise.reject(h);
              }
            ))),
            (i = !0));
        }
        return l;
      },
      function (l) {
        return Promise.reject(l);
      }
    );
    return () => {
      (e.interceptors.request.eject(a), e.interceptors.response.eject(s));
    };
  },
  Qt,
  Zn;
function qe() {
  return (Zn || ((Zn = 1), (Qt = TypeError)), Qt);
}
const Hc = {},
  zc = Object.freeze(
    Object.defineProperty({ __proto__: null, default: Hc }, Symbol.toStringTag, { value: "Module" })
  ),
  Gc = pa(zc);
var Xt, eo;
function Ot() {
  if (eo) return Xt;
  eo = 1;
  var e = typeof Map == "function" && Map.prototype,
    t =
      Object.getOwnPropertyDescriptor && e
        ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
        : null,
    r = e && t && typeof t.get == "function" ? t.get : null,
    n = e && Map.prototype.forEach,
    o = typeof Set == "function" && Set.prototype,
    i =
      Object.getOwnPropertyDescriptor && o
        ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
        : null,
    a = o && i && typeof i.get == "function" ? i.get : null,
    s = o && Set.prototype.forEach,
    l = typeof WeakMap == "function" && WeakMap.prototype,
    c = l ? WeakMap.prototype.has : null,
    f = typeof WeakSet == "function" && WeakSet.prototype,
    h = f ? WeakSet.prototype.has : null,
    E = typeof WeakRef == "function" && WeakRef.prototype,
    T = E ? WeakRef.prototype.deref : null,
    u = Boolean.prototype.valueOf,
    d = Object.prototype.toString,
    p = Function.prototype.toString,
    P = String.prototype.match,
    A = String.prototype.slice,
    R = String.prototype.replace,
    I = String.prototype.toUpperCase,
    C = String.prototype.toLowerCase,
    L = RegExp.prototype.test,
    m = Array.prototype.concat,
    O = Array.prototype.join,
    x = Array.prototype.slice,
    k = Math.floor,
    N = typeof BigInt == "function" ? BigInt.prototype.valueOf : null,
    F = Object.getOwnPropertySymbols,
    q =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? Symbol.prototype.toString
        : null,
    D = typeof Symbol == "function" && typeof Symbol.iterator == "object",
    z =
      typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === D || !0)
        ? Symbol.toStringTag
        : null,
    $ = Object.prototype.propertyIsEnumerable,
    J =
      (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) ||
      ([].__proto__ === Array.prototype
        ? function (y) {
            return y.__proto__;
          }
        : null);
  function S(y, v) {
    if (y === 1 / 0 || y === -1 / 0 || y !== y || (y && y > -1e3 && y < 1e3) || L.call(/e/, v))
      return v;
    var H = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof y == "number") {
      var V = y < 0 ? -k(-y) : k(y);
      if (V !== y) {
        var K = String(V),
          M = A.call(v, K.length + 1);
        return R.call(K, H, "$&_") + "." + R.call(R.call(M, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return R.call(v, H, "$&_");
  }
  var W = Gc,
    ee = W.custom,
    Q = ne(ee) ? ee : null,
    oe = { __proto__: null, double: '"', single: "'" },
    se = { __proto__: null, double: /(["\\])/g, single: /(['\\])/g };
  Xt = function y(v, H, V, K) {
    var M = H || {};
    if (_(M, "quoteStyle") && !_(oe, M.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (
      _(M, "maxStringLength") &&
      (typeof M.maxStringLength == "number"
        ? M.maxStringLength < 0 && M.maxStringLength !== 1 / 0
        : M.maxStringLength !== null)
    )
      throw new TypeError(
        'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
      );
    var Pe = _(M, "customInspect") ? M.customInspect : !0;
    if (typeof Pe != "boolean" && Pe !== "symbol")
      throw new TypeError(
        "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"
      );
    if (
      _(M, "indent") &&
      M.indent !== null &&
      M.indent !== "	" &&
      !(parseInt(M.indent, 10) === M.indent && M.indent > 0)
    )
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (_(M, "numericSeparator") && typeof M.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var Le = M.numericSeparator;
    if (typeof v > "u") return "undefined";
    if (v === null) return "null";
    if (typeof v == "boolean") return v ? "true" : "false";
    if (typeof v == "string") return yn(v, M);
    if (typeof v == "number") {
      if (v === 0) return 1 / 0 / v > 0 ? "0" : "-0";
      var de = String(v);
      return Le ? S(v, de) : de;
    }
    if (typeof v == "bigint") {
      var Te = String(v) + "n";
      return Le ? S(v, Te) : Te;
    }
    var Pt = typeof M.depth > "u" ? 5 : M.depth;
    if ((typeof V > "u" && (V = 0), V >= Pt && Pt > 0 && typeof v == "object"))
      return Se(v) ? "[Array]" : "[Object]";
    var Fe = ua(M, V);
    if (typeof K > "u") K = [];
    else if (pe(K, v) >= 0) return "[Circular]";
    function be($e, nt, fa) {
      if ((nt && ((K = x.call(K)), K.push(nt)), fa)) {
        var En = { depth: M.depth };
        return (_(M, "quoteStyle") && (En.quoteStyle = M.quoteStyle), y($e, En, V + 1, K));
      }
      return y($e, M, V + 1, K);
    }
    if (typeof v == "function" && !re(v)) {
      var mn = te(v),
        gn = tt(v, be);
      return (
        "[Function" +
        (mn ? ": " + mn : " (anonymous)") +
        "]" +
        (gn.length > 0 ? " { " + O.call(gn, ", ") + " }" : "")
      );
    }
    if (ne(v)) {
      var vn = D ? R.call(String(v), /^(Symbol\(.*\))_[^)]*$/, "$1") : q.call(v);
      return typeof v == "object" && !D ? We(vn) : vn;
    }
    if (aa(v)) {
      for (
        var He = "<" + C.call(String(v.nodeName)), Tt = v.attributes || [], rt = 0;
        rt < Tt.length;
        rt++
      )
        He += " " + Tt[rt].name + "=" + ae(ce(Tt[rt].value), "double", M);
      return (
        (He += ">"),
        v.childNodes && v.childNodes.length && (He += "..."),
        (He += "</" + C.call(String(v.nodeName)) + ">"),
        He
      );
    }
    if (Se(v)) {
      if (v.length === 0) return "[]";
      var xt = tt(v, be);
      return Fe && !ca(xt) ? "[" + Rt(xt, Fe) + "]" : "[ " + O.call(xt, ", ") + " ]";
    }
    if (B(v)) {
      var Ct = tt(v, be);
      return !("cause" in Error.prototype) && "cause" in v && !$.call(v, "cause")
        ? "{ [" + String(v) + "] " + O.call(m.call("[cause]: " + be(v.cause), Ct), ", ") + " }"
        : Ct.length === 0
          ? "[" + String(v) + "]"
          : "{ [" + String(v) + "] " + O.call(Ct, ", ") + " }";
    }
    if (typeof v == "object" && Pe) {
      if (Q && typeof v[Q] == "function" && W) return W(v, { depth: Pt - V });
      if (Pe !== "symbol" && typeof v.inspect == "function") return v.inspect();
    }
    if (me(v)) {
      var bn = [];
      return (
        n &&
          n.call(v, function ($e, nt) {
            bn.push(be(nt, v, !0) + " => " + be($e, v));
          }),
        hn("Map", r.call(v), bn, Fe)
      );
    }
    if (je(v)) {
      var wn = [];
      return (
        s &&
          s.call(v, function ($e) {
            wn.push(be($e, v));
          }),
        hn("Set", a.call(v), wn, Fe)
      );
    }
    if (Ae(v)) return At("WeakMap");
    if (ia(v)) return At("WeakSet");
    if (Ne(v)) return At("WeakRef");
    if (G(v)) return We(be(Number(v)));
    if (b(v)) return We(be(N.call(v)));
    if (Y(v)) return We(u.call(v));
    if (X(v)) return We(be(String(v)));
    if (typeof window < "u" && v === window) return "{ [object Window] }";
    if ((typeof globalThis < "u" && v === globalThis) || (typeof De < "u" && v === De))
      return "{ [object globalThis] }";
    if (!Oe(v) && !re(v)) {
      var Lt = tt(v, be),
        Sn = J ? J(v) === Object.prototype : v instanceof Object || v.constructor === Object,
        _t = v instanceof Object ? "" : "null prototype",
        On = !Sn && z && Object(v) === v && z in v ? A.call(j(v), 8, -1) : _t ? "Object" : "",
        la =
          Sn || typeof v.constructor != "function"
            ? ""
            : v.constructor.name
              ? v.constructor.name + " "
              : "",
        kt = la + (On || _t ? "[" + O.call(m.call([], On || [], _t || []), ": ") + "] " : "");
      return Lt.length === 0
        ? kt + "{}"
        : Fe
          ? kt + "{" + Rt(Lt, Fe) + "}"
          : kt + "{ " + O.call(Lt, ", ") + " }";
    }
    return String(v);
  };
  function ae(y, v, H) {
    var V = H.quoteStyle || v,
      K = oe[V];
    return K + y + K;
  }
  function ce(y) {
    return R.call(String(y), /"/g, "&quot;");
  }
  function ue(y) {
    return !z || !(typeof y == "object" && (z in y || typeof y[z] < "u"));
  }
  function Se(y) {
    return j(y) === "[object Array]" && ue(y);
  }
  function Oe(y) {
    return j(y) === "[object Date]" && ue(y);
  }
  function re(y) {
    return j(y) === "[object RegExp]" && ue(y);
  }
  function B(y) {
    return j(y) === "[object Error]" && ue(y);
  }
  function X(y) {
    return j(y) === "[object String]" && ue(y);
  }
  function G(y) {
    return j(y) === "[object Number]" && ue(y);
  }
  function Y(y) {
    return j(y) === "[object Boolean]" && ue(y);
  }
  function ne(y) {
    if (D) return y && typeof y == "object" && y instanceof Symbol;
    if (typeof y == "symbol") return !0;
    if (!y || typeof y != "object" || !q) return !1;
    try {
      return (q.call(y), !0);
    } catch {}
    return !1;
  }
  function b(y) {
    if (!y || typeof y != "object" || !N) return !1;
    try {
      return (N.call(y), !0);
    } catch {}
    return !1;
  }
  var w =
    Object.prototype.hasOwnProperty ||
    function (y) {
      return y in this;
    };
  function _(y, v) {
    return w.call(y, v);
  }
  function j(y) {
    return d.call(y);
  }
  function te(y) {
    if (y.name) return y.name;
    var v = P.call(p.call(y), /^function\s*([\w$]+)/);
    return v ? v[1] : null;
  }
  function pe(y, v) {
    if (y.indexOf) return y.indexOf(v);
    for (var H = 0, V = y.length; H < V; H++) if (y[H] === v) return H;
    return -1;
  }
  function me(y) {
    if (!r || !y || typeof y != "object") return !1;
    try {
      r.call(y);
      try {
        a.call(y);
      } catch {
        return !0;
      }
      return y instanceof Map;
    } catch {}
    return !1;
  }
  function Ae(y) {
    if (!c || !y || typeof y != "object") return !1;
    try {
      c.call(y, c);
      try {
        h.call(y, h);
      } catch {
        return !0;
      }
      return y instanceof WeakMap;
    } catch {}
    return !1;
  }
  function Ne(y) {
    if (!T || !y || typeof y != "object") return !1;
    try {
      return (T.call(y), !0);
    } catch {}
    return !1;
  }
  function je(y) {
    if (!a || !y || typeof y != "object") return !1;
    try {
      a.call(y);
      try {
        r.call(y);
      } catch {
        return !0;
      }
      return y instanceof Set;
    } catch {}
    return !1;
  }
  function ia(y) {
    if (!h || !y || typeof y != "object") return !1;
    try {
      h.call(y, h);
      try {
        c.call(y, c);
      } catch {
        return !0;
      }
      return y instanceof WeakSet;
    } catch {}
    return !1;
  }
  function aa(y) {
    return !y || typeof y != "object"
      ? !1
      : typeof HTMLElement < "u" && y instanceof HTMLElement
        ? !0
        : typeof y.nodeName == "string" && typeof y.getAttribute == "function";
  }
  function yn(y, v) {
    if (y.length > v.maxStringLength) {
      var H = y.length - v.maxStringLength,
        V = "... " + H + " more character" + (H > 1 ? "s" : "");
      return yn(A.call(y, 0, v.maxStringLength), v) + V;
    }
    var K = se[v.quoteStyle || "single"];
    K.lastIndex = 0;
    var M = R.call(R.call(y, K, "\\$1"), /[\x00-\x1f]/g, sa);
    return ae(M, "single", v);
  }
  function sa(y) {
    var v = y.charCodeAt(0),
      H = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[v];
    return H ? "\\" + H : "\\x" + (v < 16 ? "0" : "") + I.call(v.toString(16));
  }
  function We(y) {
    return "Object(" + y + ")";
  }
  function At(y) {
    return y + " { ? }";
  }
  function hn(y, v, H, V) {
    var K = V ? Rt(H, V) : O.call(H, ", ");
    return y + " (" + v + ") {" + K + "}";
  }
  function ca(y) {
    for (var v = 0; v < y.length; v++)
      if (
        pe(
          y[v],
          `
`
        ) >= 0
      )
        return !1;
    return !0;
  }
  function ua(y, v) {
    var H;
    if (y.indent === "	") H = "	";
    else if (typeof y.indent == "number" && y.indent > 0) H = O.call(Array(y.indent + 1), " ");
    else return null;
    return { base: H, prev: O.call(Array(v + 1), H) };
  }
  function Rt(y, v) {
    if (y.length === 0) return "";
    var H =
      `
` +
      v.prev +
      v.base;
    return (
      H +
      O.call(y, "," + H) +
      `
` +
      v.prev
    );
  }
  function tt(y, v) {
    var H = Se(y),
      V = [];
    if (H) {
      V.length = y.length;
      for (var K = 0; K < y.length; K++) V[K] = _(y, K) ? v(y[K], y) : "";
    }
    var M = typeof F == "function" ? F(y) : [],
      Pe;
    if (D) {
      Pe = {};
      for (var Le = 0; Le < M.length; Le++) Pe["$" + M[Le]] = M[Le];
    }
    for (var de in y)
      _(y, de) &&
        ((H && String(Number(de)) === de && de < y.length) ||
          (D && Pe["$" + de] instanceof Symbol) ||
          (L.call(/[^\w$]/, de)
            ? V.push(v(de, y) + ": " + v(y[de], y))
            : V.push(de + ": " + v(y[de], y))));
    if (typeof F == "function")
      for (var Te = 0; Te < M.length; Te++)
        $.call(y, M[Te]) && V.push("[" + v(M[Te]) + "]: " + v(y[M[Te]], y));
    return V;
  }
  return Xt;
}
var Yt, to;
function Vc() {
  if (to) return Yt;
  to = 1;
  var e = Ot(),
    t = qe(),
    r = function (s, l, c) {
      for (var f = s, h; (h = f.next) != null; f = h)
        if (h.key === l) return ((f.next = h.next), c || ((h.next = s.next), (s.next = h)), h);
    },
    n = function (s, l) {
      if (s) {
        var c = r(s, l);
        return c && c.value;
      }
    },
    o = function (s, l, c) {
      var f = r(s, l);
      f ? (f.value = c) : (s.next = { key: l, next: s.next, value: c });
    },
    i = function (s, l) {
      return s ? !!r(s, l) : !1;
    },
    a = function (s, l) {
      if (s) return r(s, l, !0);
    };
  return (
    (Yt = function () {
      var l,
        c = {
          assert: function (f) {
            if (!c.has(f)) throw new t("Side channel does not contain " + e(f));
          },
          delete: function (f) {
            var h = l && l.next,
              E = a(l, f);
            return (E && h && h === E && (l = void 0), !!E);
          },
          get: function (f) {
            return n(l, f);
          },
          has: function (f) {
            return i(l, f);
          },
          set: function (f, h) {
            (l || (l = { next: void 0 }), o(l, f, h));
          },
        };
      return c;
    }),
    Yt
  );
}
var Zt, ro;
function Mi() {
  return (ro || ((ro = 1), (Zt = Object)), Zt);
}
var er, no;
function Kc() {
  return (no || ((no = 1), (er = Error)), er);
}
var tr, oo;
function Jc() {
  return (oo || ((oo = 1), (tr = EvalError)), tr);
}
var rr, io;
function Qc() {
  return (io || ((io = 1), (rr = RangeError)), rr);
}
var nr, ao;
function Xc() {
  return (ao || ((ao = 1), (nr = ReferenceError)), nr);
}
var or, so;
function Yc() {
  return (so || ((so = 1), (or = SyntaxError)), or);
}
var ir, co;
function Zc() {
  return (co || ((co = 1), (ir = URIError)), ir);
}
var ar, uo;
function eu() {
  return (uo || ((uo = 1), (ar = Math.abs)), ar);
}
var sr, lo;
function tu() {
  return (lo || ((lo = 1), (sr = Math.floor)), sr);
}
var cr, fo;
function ru() {
  return (fo || ((fo = 1), (cr = Math.max)), cr);
}
var ur, po;
function nu() {
  return (po || ((po = 1), (ur = Math.min)), ur);
}
var lr, yo;
function ou() {
  return (yo || ((yo = 1), (lr = Math.pow)), lr);
}
var fr, ho;
function iu() {
  return (ho || ((ho = 1), (fr = Math.round)), fr);
}
var pr, mo;
function au() {
  return (
    mo ||
      ((mo = 1),
      (pr =
        Number.isNaN ||
        function (t) {
          return t !== t;
        })),
    pr
  );
}
var dr, go;
function su() {
  if (go) return dr;
  go = 1;
  var e = au();
  return (
    (dr = function (r) {
      return e(r) || r === 0 ? r : r < 0 ? -1 : 1;
    }),
    dr
  );
}
var yr, vo;
function cu() {
  return (vo || ((vo = 1), (yr = Object.getOwnPropertyDescriptor)), yr);
}
var hr, bo;
function Bi() {
  if (bo) return hr;
  bo = 1;
  var e = cu();
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return ((hr = e), hr);
}
var mr, wo;
function uu() {
  if (wo) return mr;
  wo = 1;
  var e = Object.defineProperty || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return ((mr = e), mr);
}
var gr, So;
function lu() {
  return (
    So ||
      ((So = 1),
      (gr = function () {
        if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
          return !1;
        if (typeof Symbol.iterator == "symbol") return !0;
        var t = {},
          r = Symbol("test"),
          n = Object(r);
        if (
          typeof r == "string" ||
          Object.prototype.toString.call(r) !== "[object Symbol]" ||
          Object.prototype.toString.call(n) !== "[object Symbol]"
        )
          return !1;
        var o = 42;
        t[r] = o;
        for (var i in t) return !1;
        if (
          (typeof Object.keys == "function" && Object.keys(t).length !== 0) ||
          (typeof Object.getOwnPropertyNames == "function" &&
            Object.getOwnPropertyNames(t).length !== 0)
        )
          return !1;
        var a = Object.getOwnPropertySymbols(t);
        if (a.length !== 1 || a[0] !== r || !Object.prototype.propertyIsEnumerable.call(t, r))
          return !1;
        if (typeof Object.getOwnPropertyDescriptor == "function") {
          var s = Object.getOwnPropertyDescriptor(t, r);
          if (s.value !== o || s.enumerable !== !0) return !1;
        }
        return !0;
      })),
    gr
  );
}
var vr, Oo;
function fu() {
  if (Oo) return vr;
  Oo = 1;
  var e = typeof Symbol < "u" && Symbol,
    t = lu();
  return (
    (vr = function () {
      return typeof e != "function" ||
        typeof Symbol != "function" ||
        typeof e("foo") != "symbol" ||
        typeof Symbol("bar") != "symbol"
        ? !1
        : t();
    }),
    vr
  );
}
var br, Eo;
function qi() {
  return (Eo || ((Eo = 1), (br = (typeof Reflect < "u" && Reflect.getPrototypeOf) || null)), br);
}
var wr, Ao;
function Wi() {
  if (Ao) return wr;
  Ao = 1;
  var e = Mi();
  return ((wr = e.getPrototypeOf || null), wr);
}
var Sr, Ro;
function pu() {
  if (Ro) return Sr;
  Ro = 1;
  var e = "Function.prototype.bind called on incompatible ",
    t = Object.prototype.toString,
    r = Math.max,
    n = "[object Function]",
    o = function (l, c) {
      for (var f = [], h = 0; h < l.length; h += 1) f[h] = l[h];
      for (var E = 0; E < c.length; E += 1) f[E + l.length] = c[E];
      return f;
    },
    i = function (l, c) {
      for (var f = [], h = c, E = 0; h < l.length; h += 1, E += 1) f[E] = l[h];
      return f;
    },
    a = function (s, l) {
      for (var c = "", f = 0; f < s.length; f += 1) ((c += s[f]), f + 1 < s.length && (c += l));
      return c;
    };
  return (
    (Sr = function (l) {
      var c = this;
      if (typeof c != "function" || t.apply(c) !== n) throw new TypeError(e + c);
      for (
        var f = i(arguments, 1),
          h,
          E = function () {
            if (this instanceof h) {
              var P = c.apply(this, o(f, arguments));
              return Object(P) === P ? P : this;
            }
            return c.apply(l, o(f, arguments));
          },
          T = r(0, c.length - f.length),
          u = [],
          d = 0;
        d < T;
        d++
      )
        u[d] = "$" + d;
      if (
        ((h = Function(
          "binder",
          "return function (" + a(u, ",") + "){ return binder.apply(this,arguments); }"
        )(E)),
        c.prototype)
      ) {
        var p = function () {};
        ((p.prototype = c.prototype), (h.prototype = new p()), (p.prototype = null));
      }
      return h;
    }),
    Sr
  );
}
var Or, Po;
function Et() {
  if (Po) return Or;
  Po = 1;
  var e = pu();
  return ((Or = Function.prototype.bind || e), Or);
}
var Er, To;
function ln() {
  return (To || ((To = 1), (Er = Function.prototype.call)), Er);
}
var Ar, xo;
function Hi() {
  return (xo || ((xo = 1), (Ar = Function.prototype.apply)), Ar);
}
var Rr, Co;
function du() {
  return (Co || ((Co = 1), (Rr = typeof Reflect < "u" && Reflect && Reflect.apply)), Rr);
}
var Pr, Lo;
function yu() {
  if (Lo) return Pr;
  Lo = 1;
  var e = Et(),
    t = Hi(),
    r = ln(),
    n = du();
  return ((Pr = n || e.call(r, t)), Pr);
}
var Tr, _o;
function zi() {
  if (_o) return Tr;
  _o = 1;
  var e = Et(),
    t = qe(),
    r = ln(),
    n = yu();
  return (
    (Tr = function (i) {
      if (i.length < 1 || typeof i[0] != "function") throw new t("a function is required");
      return n(e, r, i);
    }),
    Tr
  );
}
var xr, ko;
function hu() {
  if (ko) return xr;
  ko = 1;
  var e = zi(),
    t = Bi(),
    r;
  try {
    r = [].__proto__ === Array.prototype;
  } catch (a) {
    if (!a || typeof a != "object" || !("code" in a) || a.code !== "ERR_PROTO_ACCESS") throw a;
  }
  var n = !!r && t && t(Object.prototype, "__proto__"),
    o = Object,
    i = o.getPrototypeOf;
  return (
    (xr =
      n && typeof n.get == "function"
        ? e([n.get])
        : typeof i == "function"
          ? function (s) {
              return i(s == null ? s : o(s));
            }
          : !1),
    xr
  );
}
var Cr, Io;
function mu() {
  if (Io) return Cr;
  Io = 1;
  var e = qi(),
    t = Wi(),
    r = hu();
  return (
    (Cr = e
      ? function (o) {
          return e(o);
        }
      : t
        ? function (o) {
            if (!o || (typeof o != "object" && typeof o != "function"))
              throw new TypeError("getProto: not an object");
            return t(o);
          }
        : r
          ? function (o) {
              return r(o);
            }
          : null),
    Cr
  );
}
var Lr, No;
function gu() {
  if (No) return Lr;
  No = 1;
  var e = Function.prototype.call,
    t = Object.prototype.hasOwnProperty,
    r = Et();
  return ((Lr = r.call(e, t)), Lr);
}
var _r, jo;
function fn() {
  if (jo) return _r;
  jo = 1;
  var e,
    t = Mi(),
    r = Kc(),
    n = Jc(),
    o = Qc(),
    i = Xc(),
    a = Yc(),
    s = qe(),
    l = Zc(),
    c = eu(),
    f = tu(),
    h = ru(),
    E = nu(),
    T = ou(),
    u = iu(),
    d = su(),
    p = Function,
    P = function (re) {
      try {
        return p('"use strict"; return (' + re + ").constructor;")();
      } catch {}
    },
    A = Bi(),
    R = uu(),
    I = function () {
      throw new s();
    },
    C = A
      ? (function () {
          try {
            return (arguments.callee, I);
          } catch {
            try {
              return A(arguments, "callee").get;
            } catch {
              return I;
            }
          }
        })()
      : I,
    L = fu()(),
    m = mu(),
    O = Wi(),
    x = qi(),
    k = Hi(),
    N = ln(),
    F = {},
    q = typeof Uint8Array > "u" || !m ? e : m(Uint8Array),
    D = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError > "u" ? e : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer > "u" ? e : ArrayBuffer,
      "%ArrayIteratorPrototype%": L && m ? m([][Symbol.iterator]()) : e,
      "%AsyncFromSyncIteratorPrototype%": e,
      "%AsyncFunction%": F,
      "%AsyncGenerator%": F,
      "%AsyncGeneratorFunction%": F,
      "%AsyncIteratorPrototype%": F,
      "%Atomics%": typeof Atomics > "u" ? e : Atomics,
      "%BigInt%": typeof BigInt > "u" ? e : BigInt,
      "%BigInt64Array%": typeof BigInt64Array > "u" ? e : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array > "u" ? e : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView > "u" ? e : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": r,
      "%eval%": eval,
      "%EvalError%": n,
      "%Float16Array%": typeof Float16Array > "u" ? e : Float16Array,
      "%Float32Array%": typeof Float32Array > "u" ? e : Float32Array,
      "%Float64Array%": typeof Float64Array > "u" ? e : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? e : FinalizationRegistry,
      "%Function%": p,
      "%GeneratorFunction%": F,
      "%Int8Array%": typeof Int8Array > "u" ? e : Int8Array,
      "%Int16Array%": typeof Int16Array > "u" ? e : Int16Array,
      "%Int32Array%": typeof Int32Array > "u" ? e : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": L && m ? m(m([][Symbol.iterator]())) : e,
      "%JSON%": typeof JSON == "object" ? JSON : e,
      "%Map%": typeof Map > "u" ? e : Map,
      "%MapIteratorPrototype%": typeof Map > "u" || !L || !m ? e : m(new Map()[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": t,
      "%Object.getOwnPropertyDescriptor%": A,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise > "u" ? e : Promise,
      "%Proxy%": typeof Proxy > "u" ? e : Proxy,
      "%RangeError%": o,
      "%ReferenceError%": i,
      "%Reflect%": typeof Reflect > "u" ? e : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set > "u" ? e : Set,
      "%SetIteratorPrototype%": typeof Set > "u" || !L || !m ? e : m(new Set()[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? e : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": L && m ? m(""[Symbol.iterator]()) : e,
      "%Symbol%": L ? Symbol : e,
      "%SyntaxError%": a,
      "%ThrowTypeError%": C,
      "%TypedArray%": q,
      "%TypeError%": s,
      "%Uint8Array%": typeof Uint8Array > "u" ? e : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? e : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array > "u" ? e : Uint16Array,
      "%Uint32Array%": typeof Uint32Array > "u" ? e : Uint32Array,
      "%URIError%": l,
      "%WeakMap%": typeof WeakMap > "u" ? e : WeakMap,
      "%WeakRef%": typeof WeakRef > "u" ? e : WeakRef,
      "%WeakSet%": typeof WeakSet > "u" ? e : WeakSet,
      "%Function.prototype.call%": N,
      "%Function.prototype.apply%": k,
      "%Object.defineProperty%": R,
      "%Object.getPrototypeOf%": O,
      "%Math.abs%": c,
      "%Math.floor%": f,
      "%Math.max%": h,
      "%Math.min%": E,
      "%Math.pow%": T,
      "%Math.round%": u,
      "%Math.sign%": d,
      "%Reflect.getPrototypeOf%": x,
    };
  if (m)
    try {
      null.error;
    } catch (re) {
      var z = m(m(re));
      D["%Error.prototype%"] = z;
    }
  var $ = function re(B) {
      var X;
      if (B === "%AsyncFunction%") X = P("async function () {}");
      else if (B === "%GeneratorFunction%") X = P("function* () {}");
      else if (B === "%AsyncGeneratorFunction%") X = P("async function* () {}");
      else if (B === "%AsyncGenerator%") {
        var G = re("%AsyncGeneratorFunction%");
        G && (X = G.prototype);
      } else if (B === "%AsyncIteratorPrototype%") {
        var Y = re("%AsyncGenerator%");
        Y && m && (X = m(Y.prototype));
      }
      return ((D[B] = X), X);
    },
    J = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"],
    },
    S = Et(),
    W = gu(),
    ee = S.call(N, Array.prototype.concat),
    Q = S.call(k, Array.prototype.splice),
    oe = S.call(N, String.prototype.replace),
    se = S.call(N, String.prototype.slice),
    ae = S.call(N, RegExp.prototype.exec),
    ce =
      /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
    ue = /\\(\\)?/g,
    Se = function (B) {
      var X = se(B, 0, 1),
        G = se(B, -1);
      if (X === "%" && G !== "%") throw new a("invalid intrinsic syntax, expected closing `%`");
      if (G === "%" && X !== "%") throw new a("invalid intrinsic syntax, expected opening `%`");
      var Y = [];
      return (
        oe(B, ce, function (ne, b, w, _) {
          Y[Y.length] = w ? oe(_, ue, "$1") : b || ne;
        }),
        Y
      );
    },
    Oe = function (B, X) {
      var G = B,
        Y;
      if ((W(J, G) && ((Y = J[G]), (G = "%" + Y[0] + "%")), W(D, G))) {
        var ne = D[G];
        if ((ne === F && (ne = $(G)), typeof ne > "u" && !X))
          throw new s("intrinsic " + B + " exists, but is not available. Please file an issue!");
        return { alias: Y, name: G, value: ne };
      }
      throw new a("intrinsic " + B + " does not exist!");
    };
  return (
    (_r = function (B, X) {
      if (typeof B != "string" || B.length === 0)
        throw new s("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof X != "boolean")
        throw new s('"allowMissing" argument must be a boolean');
      if (ae(/^%?[^%]*%?$/, B) === null)
        throw new a(
          "`%` may not be present anywhere but at the beginning and end of the intrinsic name"
        );
      var G = Se(B),
        Y = G.length > 0 ? G[0] : "",
        ne = Oe("%" + Y + "%", X),
        b = ne.name,
        w = ne.value,
        _ = !1,
        j = ne.alias;
      j && ((Y = j[0]), Q(G, ee([0, 1], j)));
      for (var te = 1, pe = !0; te < G.length; te += 1) {
        var me = G[te],
          Ae = se(me, 0, 1),
          Ne = se(me, -1);
        if (
          (Ae === '"' || Ae === "'" || Ae === "`" || Ne === '"' || Ne === "'" || Ne === "`") &&
          Ae !== Ne
        )
          throw new a("property names with quotes must have matching quotes");
        if (
          ((me === "constructor" || !pe) && (_ = !0), (Y += "." + me), (b = "%" + Y + "%"), W(D, b))
        )
          w = D[b];
        else if (w != null) {
          if (!(me in w)) {
            if (!X)
              throw new s(
                "base intrinsic for " + B + " exists, but the property is not available."
              );
            return;
          }
          if (A && te + 1 >= G.length) {
            var je = A(w, me);
            ((pe = !!je),
              pe && "get" in je && !("originalValue" in je.get) ? (w = je.get) : (w = w[me]));
          } else ((pe = W(w, me)), (w = w[me]));
          pe && !_ && (D[b] = w);
        }
      }
      return w;
    }),
    _r
  );
}
var kr, Fo;
function Gi() {
  if (Fo) return kr;
  Fo = 1;
  var e = fn(),
    t = zi(),
    r = t([e("%String.prototype.indexOf%")]);
  return (
    (kr = function (o, i) {
      var a = e(o, !!i);
      return typeof a == "function" && r(o, ".prototype.") > -1 ? t([a]) : a;
    }),
    kr
  );
}
var Ir, $o;
function Vi() {
  if ($o) return Ir;
  $o = 1;
  var e = fn(),
    t = Gi(),
    r = Ot(),
    n = qe(),
    o = e("%Map%", !0),
    i = t("Map.prototype.get", !0),
    a = t("Map.prototype.set", !0),
    s = t("Map.prototype.has", !0),
    l = t("Map.prototype.delete", !0),
    c = t("Map.prototype.size", !0);
  return (
    (Ir =
      !!o &&
      function () {
        var h,
          E = {
            assert: function (T) {
              if (!E.has(T)) throw new n("Side channel does not contain " + r(T));
            },
            delete: function (T) {
              if (h) {
                var u = l(h, T);
                return (c(h) === 0 && (h = void 0), u);
              }
              return !1;
            },
            get: function (T) {
              if (h) return i(h, T);
            },
            has: function (T) {
              return h ? s(h, T) : !1;
            },
            set: function (T, u) {
              (h || (h = new o()), a(h, T, u));
            },
          };
        return E;
      }),
    Ir
  );
}
var Nr, Uo;
function vu() {
  if (Uo) return Nr;
  Uo = 1;
  var e = fn(),
    t = Gi(),
    r = Ot(),
    n = Vi(),
    o = qe(),
    i = e("%WeakMap%", !0),
    a = t("WeakMap.prototype.get", !0),
    s = t("WeakMap.prototype.set", !0),
    l = t("WeakMap.prototype.has", !0),
    c = t("WeakMap.prototype.delete", !0);
  return (
    (Nr = i
      ? function () {
          var h,
            E,
            T = {
              assert: function (u) {
                if (!T.has(u)) throw new o("Side channel does not contain " + r(u));
              },
              delete: function (u) {
                if (i && u && (typeof u == "object" || typeof u == "function")) {
                  if (h) return c(h, u);
                } else if (n && E) return E.delete(u);
                return !1;
              },
              get: function (u) {
                return i && u && (typeof u == "object" || typeof u == "function") && h
                  ? a(h, u)
                  : E && E.get(u);
              },
              has: function (u) {
                return i && u && (typeof u == "object" || typeof u == "function") && h
                  ? l(h, u)
                  : !!E && E.has(u);
              },
              set: function (u, d) {
                i && u && (typeof u == "object" || typeof u == "function")
                  ? (h || (h = new i()), s(h, u, d))
                  : n && (E || (E = n()), E.set(u, d));
              },
            };
          return T;
        }
      : n),
    Nr
  );
}
var jr, Do;
function Ki() {
  if (Do) return jr;
  Do = 1;
  var e = qe(),
    t = Ot(),
    r = Vc(),
    n = Vi(),
    o = vu(),
    i = o || n || r;
  return (
    (jr = function () {
      var s,
        l = {
          assert: function (c) {
            if (!l.has(c)) throw new e("Side channel does not contain " + t(c));
          },
          delete: function (c) {
            return !!s && s.delete(c);
          },
          get: function (c) {
            return s && s.get(c);
          },
          has: function (c) {
            return !!s && s.has(c);
          },
          set: function (c, f) {
            (s || (s = i()), s.set(c, f));
          },
        };
      return l;
    }),
    jr
  );
}
var Fr, Mo;
function pn() {
  if (Mo) return Fr;
  Mo = 1;
  var e = String.prototype.replace,
    t = /%20/g,
    r = { RFC1738: "RFC1738", RFC3986: "RFC3986" };
  return (
    (Fr = {
      default: r.RFC3986,
      formatters: {
        RFC1738: function (n) {
          return e.call(n, t, "+");
        },
        RFC3986: function (n) {
          return String(n);
        },
      },
      RFC1738: r.RFC1738,
      RFC3986: r.RFC3986,
    }),
    Fr
  );
}
var $r, Bo;
function Ji() {
  if (Bo) return $r;
  Bo = 1;
  var e = pn(),
    t = Ki(),
    r = Object.prototype.hasOwnProperty,
    n = Array.isArray,
    o = t(),
    i = function (m, O) {
      return (o.set(m, O), m);
    },
    a = function (m) {
      return o.has(m);
    },
    s = function (m) {
      return o.get(m);
    },
    l = function (m, O) {
      o.set(m, O);
    },
    c = (function () {
      for (var L = [], m = 0; m < 256; ++m)
        L[L.length] = "%" + ((m < 16 ? "0" : "") + m.toString(16)).toUpperCase();
      return L;
    })(),
    f = function (m) {
      for (; m.length > 1; ) {
        var O = m.pop(),
          x = O.obj[O.prop];
        if (n(x)) {
          for (var k = [], N = 0; N < x.length; ++N) typeof x[N] < "u" && (k[k.length] = x[N]);
          O.obj[O.prop] = k;
        }
      }
    },
    h = function (m, O) {
      for (var x = O && O.plainObjects ? { __proto__: null } : {}, k = 0; k < m.length; ++k)
        typeof m[k] < "u" && (x[k] = m[k]);
      return x;
    },
    E = function L(m, O, x) {
      if (!O) return m;
      if (typeof O != "object" && typeof O != "function") {
        if (n(m)) {
          var k = m.length;
          if (x && typeof x.arrayLimit == "number" && k > x.arrayLimit)
            return i(h(m.concat(O), x), k);
          m[k] = O;
        } else if (m && typeof m == "object")
          if (a(m)) {
            var N = s(m) + 1;
            ((m[N] = O), l(m, N));
          } else {
            if (x && x.strictMerge) return [m, O];
            ((x && (x.plainObjects || x.allowPrototypes)) || !r.call(Object.prototype, O)) &&
              (m[O] = !0);
          }
        else return [m, O];
        return m;
      }
      if (!m || typeof m != "object") {
        if (a(O)) {
          for (
            var F = Object.keys(O),
              q = x && x.plainObjects ? { __proto__: null, 0: m } : { 0: m },
              D = 0;
            D < F.length;
            D++
          ) {
            var z = parseInt(F[D], 10);
            q[z + 1] = O[F[D]];
          }
          return i(q, s(O) + 1);
        }
        var $ = [m].concat(O);
        return x && typeof x.arrayLimit == "number" && $.length > x.arrayLimit
          ? i(h($, x), $.length - 1)
          : $;
      }
      var J = m;
      return (
        n(m) && !n(O) && (J = h(m, x)),
        n(m) && n(O)
          ? (O.forEach(function (S, W) {
              if (r.call(m, W)) {
                var ee = m[W];
                ee && typeof ee == "object" && S && typeof S == "object"
                  ? (m[W] = L(ee, S, x))
                  : (m[m.length] = S);
              } else m[W] = S;
            }),
            m)
          : Object.keys(O).reduce(function (S, W) {
              var ee = O[W];
              if (
                (r.call(S, W) ? (S[W] = L(S[W], ee, x)) : (S[W] = ee),
                a(O) && !a(S) && i(S, s(O)),
                a(S))
              ) {
                var Q = parseInt(W, 10);
                String(Q) === W && Q >= 0 && Q > s(S) && l(S, Q);
              }
              return S;
            }, J)
      );
    },
    T = function (m, O) {
      return Object.keys(O).reduce(function (x, k) {
        return ((x[k] = O[k]), x);
      }, m);
    },
    u = function (L, m, O) {
      var x = L.replace(/\+/g, " ");
      if (O === "iso-8859-1") return x.replace(/%[0-9a-f]{2}/gi, unescape);
      try {
        return decodeURIComponent(x);
      } catch {
        return x;
      }
    },
    d = 1024,
    p = function (m, O, x, k, N) {
      if (m.length === 0) return m;
      var F = m;
      if (
        (typeof m == "symbol"
          ? (F = Symbol.prototype.toString.call(m))
          : typeof m != "string" && (F = String(m)),
        x === "iso-8859-1")
      )
        return escape(F).replace(/%u[0-9a-f]{4}/gi, function (W) {
          return "%26%23" + parseInt(W.slice(2), 16) + "%3B";
        });
      for (var q = "", D = 0; D < F.length; D += d) {
        for (var z = F.length >= d ? F.slice(D, D + d) : F, $ = [], J = 0; J < z.length; ++J) {
          var S = z.charCodeAt(J);
          if (
            S === 45 ||
            S === 46 ||
            S === 95 ||
            S === 126 ||
            (S >= 48 && S <= 57) ||
            (S >= 65 && S <= 90) ||
            (S >= 97 && S <= 122) ||
            (N === e.RFC1738 && (S === 40 || S === 41))
          ) {
            $[$.length] = z.charAt(J);
            continue;
          }
          if (S < 128) {
            $[$.length] = c[S];
            continue;
          }
          if (S < 2048) {
            $[$.length] = c[192 | (S >> 6)] + c[128 | (S & 63)];
            continue;
          }
          if (S < 55296 || S >= 57344) {
            $[$.length] = c[224 | (S >> 12)] + c[128 | ((S >> 6) & 63)] + c[128 | (S & 63)];
            continue;
          }
          ((J += 1),
            (S = 65536 + (((S & 1023) << 10) | (z.charCodeAt(J) & 1023))),
            ($[$.length] =
              c[240 | (S >> 18)] +
              c[128 | ((S >> 12) & 63)] +
              c[128 | ((S >> 6) & 63)] +
              c[128 | (S & 63)]));
        }
        q += $.join("");
      }
      return q;
    },
    P = function (m) {
      for (var O = [{ obj: { o: m }, prop: "o" }], x = [], k = 0; k < O.length; ++k)
        for (var N = O[k], F = N.obj[N.prop], q = Object.keys(F), D = 0; D < q.length; ++D) {
          var z = q[D],
            $ = F[z];
          typeof $ == "object" &&
            $ !== null &&
            x.indexOf($) === -1 &&
            ((O[O.length] = { obj: F, prop: z }), (x[x.length] = $));
        }
      return (f(O), m);
    },
    A = function (m) {
      return Object.prototype.toString.call(m) === "[object RegExp]";
    },
    R = function (m) {
      return !m || typeof m != "object"
        ? !1
        : !!(m.constructor && m.constructor.isBuffer && m.constructor.isBuffer(m));
    },
    I = function (m, O, x, k) {
      if (a(m)) {
        var N = s(m) + 1;
        return ((m[N] = O), l(m, N), m);
      }
      var F = [].concat(m, O);
      return F.length > x ? i(h(F, { plainObjects: k }), F.length - 1) : F;
    },
    C = function (m, O) {
      if (n(m)) {
        for (var x = [], k = 0; k < m.length; k += 1) x[x.length] = O(m[k]);
        return x;
      }
      return O(m);
    };
  return (
    ($r = {
      arrayToObject: h,
      assign: T,
      combine: I,
      compact: P,
      decode: u,
      encode: p,
      isBuffer: R,
      isOverflow: a,
      isRegExp: A,
      markOverflow: i,
      maybeMap: C,
      merge: E,
    }),
    $r
  );
}
var Ur, qo;
function bu() {
  if (qo) return Ur;
  qo = 1;
  var e = Ki(),
    t = Ji(),
    r = pn(),
    n = Object.prototype.hasOwnProperty,
    o = {
      brackets: function (p) {
        return p + "[]";
      },
      comma: "comma",
      indices: function (p, P) {
        return p + "[" + P + "]";
      },
      repeat: function (p) {
        return p;
      },
    },
    i = Array.isArray,
    a = Array.prototype.push,
    s = function (d, p) {
      a.apply(d, i(p) ? p : [p]);
    },
    l = Date.prototype.toISOString,
    c = r.default,
    f = {
      addQueryPrefix: !1,
      allowDots: !1,
      allowEmptyArrays: !1,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: !1,
      commaRoundTrip: !1,
      delimiter: "&",
      encode: !0,
      encodeDotInKeys: !1,
      encoder: t.encode,
      encodeValuesOnly: !1,
      filter: void 0,
      format: c,
      formatter: r.formatters[c],
      indices: !1,
      serializeDate: function (p) {
        return l.call(p);
      },
      skipNulls: !1,
      strictNullHandling: !1,
    },
    h = function (p) {
      return (
        typeof p == "string" ||
        typeof p == "number" ||
        typeof p == "boolean" ||
        typeof p == "symbol" ||
        typeof p == "bigint"
      );
    },
    E = {},
    T = function d(p, P, A, R, I, C, L, m, O, x, k, N, F, q, D, z, $, J) {
      for (var S = p, W = J, ee = 0, Q = !1; (W = W.get(E)) !== void 0 && !Q; ) {
        var oe = W.get(p);
        if (((ee += 1), typeof oe < "u")) {
          if (oe === ee) throw new RangeError("Cyclic object value");
          Q = !0;
        }
        typeof W.get(E) > "u" && (ee = 0);
      }
      if (
        (typeof x == "function"
          ? (S = x(P, S))
          : S instanceof Date
            ? (S = F(S))
            : A === "comma" &&
              i(S) &&
              (S = t.maybeMap(S, function (b) {
                return b instanceof Date ? F(b) : b;
              })),
        S === null)
      ) {
        if (C) return O && !z ? O(P, f.encoder, $, "key", q) : P;
        S = "";
      }
      if (h(S) || t.isBuffer(S)) {
        if (O) {
          var se = z ? P : O(P, f.encoder, $, "key", q);
          return [D(se) + "=" + D(O(S, f.encoder, $, "value", q))];
        }
        return [D(P) + "=" + D(String(S))];
      }
      var ae = [];
      if (typeof S > "u") return ae;
      var ce;
      if (A === "comma" && i(S))
        (z && O && (S = t.maybeMap(S, O)),
          (ce = [{ value: S.length > 0 ? S.join(",") || null : void 0 }]));
      else if (i(x)) ce = x;
      else {
        var ue = Object.keys(S);
        ce = k ? ue.sort(k) : ue;
      }
      var Se = m ? String(P).replace(/\./g, "%2E") : String(P),
        Oe = R && i(S) && S.length === 1 ? Se + "[]" : Se;
      if (I && i(S) && S.length === 0) return Oe + "[]";
      for (var re = 0; re < ce.length; ++re) {
        var B = ce[re],
          X = typeof B == "object" && B && typeof B.value < "u" ? B.value : S[B];
        if (!(L && X === null)) {
          var G = N && m ? String(B).replace(/\./g, "%2E") : String(B),
            Y = i(S)
              ? typeof A == "function"
                ? A(Oe, G)
                : Oe
              : Oe + (N ? "." + G : "[" + G + "]");
          J.set(p, ee);
          var ne = e();
          (ne.set(E, J),
            s(
              ae,
              d(
                X,
                Y,
                A,
                R,
                I,
                C,
                L,
                m,
                A === "comma" && z && i(S) ? null : O,
                x,
                k,
                N,
                F,
                q,
                D,
                z,
                $,
                ne
              )
            ));
        }
      }
      return ae;
    },
    u = function (p) {
      if (!p) return f;
      if (typeof p.allowEmptyArrays < "u" && typeof p.allowEmptyArrays != "boolean")
        throw new TypeError(
          "`allowEmptyArrays` option can only be `true` or `false`, when provided"
        );
      if (typeof p.encodeDotInKeys < "u" && typeof p.encodeDotInKeys != "boolean")
        throw new TypeError(
          "`encodeDotInKeys` option can only be `true` or `false`, when provided"
        );
      if (p.encoder !== null && typeof p.encoder < "u" && typeof p.encoder != "function")
        throw new TypeError("Encoder has to be a function.");
      var P = p.charset || f.charset;
      if (typeof p.charset < "u" && p.charset !== "utf-8" && p.charset !== "iso-8859-1")
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      var A = r.default;
      if (typeof p.format < "u") {
        if (!n.call(r.formatters, p.format)) throw new TypeError("Unknown format option provided.");
        A = p.format;
      }
      var R = r.formatters[A],
        I = f.filter;
      (typeof p.filter == "function" || i(p.filter)) && (I = p.filter);
      var C;
      if (
        (p.arrayFormat in o
          ? (C = p.arrayFormat)
          : "indices" in p
            ? (C = p.indices ? "indices" : "repeat")
            : (C = f.arrayFormat),
        "commaRoundTrip" in p && typeof p.commaRoundTrip != "boolean")
      )
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      var L =
        typeof p.allowDots > "u" ? (p.encodeDotInKeys === !0 ? !0 : f.allowDots) : !!p.allowDots;
      return {
        addQueryPrefix: typeof p.addQueryPrefix == "boolean" ? p.addQueryPrefix : f.addQueryPrefix,
        allowDots: L,
        allowEmptyArrays:
          typeof p.allowEmptyArrays == "boolean" ? !!p.allowEmptyArrays : f.allowEmptyArrays,
        arrayFormat: C,
        charset: P,
        charsetSentinel:
          typeof p.charsetSentinel == "boolean" ? p.charsetSentinel : f.charsetSentinel,
        commaRoundTrip: !!p.commaRoundTrip,
        delimiter: typeof p.delimiter > "u" ? f.delimiter : p.delimiter,
        encode: typeof p.encode == "boolean" ? p.encode : f.encode,
        encodeDotInKeys:
          typeof p.encodeDotInKeys == "boolean" ? p.encodeDotInKeys : f.encodeDotInKeys,
        encoder: typeof p.encoder == "function" ? p.encoder : f.encoder,
        encodeValuesOnly:
          typeof p.encodeValuesOnly == "boolean" ? p.encodeValuesOnly : f.encodeValuesOnly,
        filter: I,
        format: A,
        formatter: R,
        serializeDate: typeof p.serializeDate == "function" ? p.serializeDate : f.serializeDate,
        skipNulls: typeof p.skipNulls == "boolean" ? p.skipNulls : f.skipNulls,
        sort: typeof p.sort == "function" ? p.sort : null,
        strictNullHandling:
          typeof p.strictNullHandling == "boolean" ? p.strictNullHandling : f.strictNullHandling,
      };
    };
  return (
    (Ur = function (d, p) {
      var P = d,
        A = u(p),
        R,
        I;
      typeof A.filter == "function"
        ? ((I = A.filter), (P = I("", P)))
        : i(A.filter) && ((I = A.filter), (R = I));
      var C = [];
      if (typeof P != "object" || P === null) return "";
      var L = o[A.arrayFormat],
        m = L === "comma" && A.commaRoundTrip;
      (R || (R = Object.keys(P)), A.sort && R.sort(A.sort));
      for (var O = e(), x = 0; x < R.length; ++x) {
        var k = R[x],
          N = P[k];
        (A.skipNulls && N === null) ||
          s(
            C,
            T(
              N,
              k,
              L,
              m,
              A.allowEmptyArrays,
              A.strictNullHandling,
              A.skipNulls,
              A.encodeDotInKeys,
              A.encode ? A.encoder : null,
              A.filter,
              A.sort,
              A.allowDots,
              A.serializeDate,
              A.format,
              A.formatter,
              A.encodeValuesOnly,
              A.charset,
              O
            )
          );
      }
      var F = C.join(A.delimiter),
        q = A.addQueryPrefix === !0 ? "?" : "";
      return (
        A.charsetSentinel &&
          (A.charset === "iso-8859-1" ? (q += "utf8=%26%2310003%3B&") : (q += "utf8=%E2%9C%93&")),
        F.length > 0 ? q + F : ""
      );
    }),
    Ur
  );
}
var Dr, Wo;
function wu() {
  if (Wo) return Dr;
  Wo = 1;
  var e = Ji(),
    t = Object.prototype.hasOwnProperty,
    r = Array.isArray,
    n = {
      allowDots: !1,
      allowEmptyArrays: !1,
      allowPrototypes: !1,
      allowSparse: !1,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: !1,
      comma: !1,
      decodeDotInKeys: !1,
      decoder: e.decode,
      delimiter: "&",
      depth: 5,
      duplicates: "combine",
      ignoreQueryPrefix: !1,
      interpretNumericEntities: !1,
      parameterLimit: 1e3,
      parseArrays: !0,
      plainObjects: !1,
      strictDepth: !1,
      strictMerge: !0,
      strictNullHandling: !1,
      throwOnLimitExceeded: !1,
    },
    o = function (T) {
      return T.replace(/&#(\d+);/g, function (u, d) {
        return String.fromCharCode(parseInt(d, 10));
      });
    },
    i = function (T, u, d) {
      if (T && typeof T == "string" && u.comma && T.indexOf(",") > -1) return T.split(",");
      if (u.throwOnLimitExceeded && d >= u.arrayLimit)
        throw new RangeError(
          "Array limit exceeded. Only " +
            u.arrayLimit +
            " element" +
            (u.arrayLimit === 1 ? "" : "s") +
            " allowed in an array."
        );
      return T;
    },
    a = "utf8=%26%2310003%3B",
    s = "utf8=%E2%9C%93",
    l = function (u, d) {
      var p = { __proto__: null },
        P = d.ignoreQueryPrefix ? u.replace(/^\?/, "") : u;
      P = P.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      var A = d.parameterLimit === 1 / 0 ? void 0 : d.parameterLimit,
        R = P.split(d.delimiter, d.throwOnLimitExceeded ? A + 1 : A);
      if (d.throwOnLimitExceeded && R.length > A)
        throw new RangeError(
          "Parameter limit exceeded. Only " + A + " parameter" + (A === 1 ? "" : "s") + " allowed."
        );
      var I = -1,
        C,
        L = d.charset;
      if (d.charsetSentinel)
        for (C = 0; C < R.length; ++C)
          R[C].indexOf("utf8=") === 0 &&
            (R[C] === s ? (L = "utf-8") : R[C] === a && (L = "iso-8859-1"),
            (I = C),
            (C = R.length));
      for (C = 0; C < R.length; ++C)
        if (C !== I) {
          var m = R[C],
            O = m.indexOf("]="),
            x = O === -1 ? m.indexOf("=") : O + 1,
            k,
            N;
          if (
            (x === -1
              ? ((k = d.decoder(m, n.decoder, L, "key")), (N = d.strictNullHandling ? null : ""))
              : ((k = d.decoder(m.slice(0, x), n.decoder, L, "key")),
                k !== null &&
                  (N = e.maybeMap(i(m.slice(x + 1), d, r(p[k]) ? p[k].length : 0), function (q) {
                    return d.decoder(q, n.decoder, L, "value");
                  }))),
            N && d.interpretNumericEntities && L === "iso-8859-1" && (N = o(String(N))),
            m.indexOf("[]=") > -1 && (N = r(N) ? [N] : N),
            d.comma && r(N) && N.length > d.arrayLimit)
          ) {
            if (d.throwOnLimitExceeded)
              throw new RangeError(
                "Array limit exceeded. Only " +
                  d.arrayLimit +
                  " element" +
                  (d.arrayLimit === 1 ? "" : "s") +
                  " allowed in an array."
              );
            N = e.combine([], N, d.arrayLimit, d.plainObjects);
          }
          if (k !== null) {
            var F = t.call(p, k);
            F && (d.duplicates === "combine" || m.indexOf("[]=") > -1)
              ? (p[k] = e.combine(p[k], N, d.arrayLimit, d.plainObjects))
              : (!F || d.duplicates === "last") && (p[k] = N);
          }
        }
      return p;
    },
    c = function (T, u, d, p) {
      var P = 0;
      if (T.length > 0 && T[T.length - 1] === "[]") {
        var A = T.slice(0, -1).join("");
        P = Array.isArray(u) && u[A] ? u[A].length : 0;
      }
      for (var R = p ? u : i(u, d, P), I = T.length - 1; I >= 0; --I) {
        var C,
          L = T[I];
        if (L === "[]" && d.parseArrays)
          e.isOverflow(R)
            ? (C = R)
            : (C =
                d.allowEmptyArrays && (R === "" || (d.strictNullHandling && R === null))
                  ? []
                  : e.combine([], R, d.arrayLimit, d.plainObjects));
        else {
          C = d.plainObjects ? { __proto__: null } : {};
          var m = L.charAt(0) === "[" && L.charAt(L.length - 1) === "]" ? L.slice(1, -1) : L,
            O = d.decodeDotInKeys ? m.replace(/%2E/g, ".") : m,
            x = parseInt(O, 10),
            k = !isNaN(x) && L !== O && String(x) === O && x >= 0 && d.parseArrays;
          if (!d.parseArrays && O === "") C = { 0: R };
          else if (k && x < d.arrayLimit) ((C = []), (C[x] = R));
          else {
            if (k && d.throwOnLimitExceeded)
              throw new RangeError(
                "Array limit exceeded. Only " +
                  d.arrayLimit +
                  " element" +
                  (d.arrayLimit === 1 ? "" : "s") +
                  " allowed in an array."
              );
            k ? ((C[x] = R), e.markOverflow(C, x)) : O !== "__proto__" && (C[O] = R);
          }
        }
        R = C;
      }
      return R;
    },
    f = function (u, d) {
      var p = d.allowDots ? u.replace(/\.([^.[]+)/g, "[$1]") : u;
      if (d.depth <= 0)
        return !d.plainObjects && t.call(Object.prototype, p) && !d.allowPrototypes ? void 0 : [p];
      var P = /(\[[^[\]]*])/,
        A = /(\[[^[\]]*])/g,
        R = P.exec(p),
        I = R ? p.slice(0, R.index) : p,
        C = [];
      if (I) {
        if (!d.plainObjects && t.call(Object.prototype, I) && !d.allowPrototypes) return;
        C[C.length] = I;
      }
      for (var L = 0; (R = A.exec(p)) !== null && L < d.depth; ) {
        L += 1;
        var m = R[1].slice(1, -1);
        if (!d.plainObjects && t.call(Object.prototype, m) && !d.allowPrototypes) return;
        C[C.length] = R[1];
      }
      if (R) {
        if (d.strictDepth === !0)
          throw new RangeError(
            "Input depth exceeded depth option of " + d.depth + " and strictDepth is true"
          );
        C[C.length] = "[" + p.slice(R.index) + "]";
      }
      return C;
    },
    h = function (u, d, p, P) {
      if (u) {
        var A = f(u, p);
        if (A) return c(A, d, p, P);
      }
    },
    E = function (u) {
      if (!u) return n;
      if (typeof u.allowEmptyArrays < "u" && typeof u.allowEmptyArrays != "boolean")
        throw new TypeError(
          "`allowEmptyArrays` option can only be `true` or `false`, when provided"
        );
      if (typeof u.decodeDotInKeys < "u" && typeof u.decodeDotInKeys != "boolean")
        throw new TypeError(
          "`decodeDotInKeys` option can only be `true` or `false`, when provided"
        );
      if (u.decoder !== null && typeof u.decoder < "u" && typeof u.decoder != "function")
        throw new TypeError("Decoder has to be a function.");
      if (typeof u.charset < "u" && u.charset !== "utf-8" && u.charset !== "iso-8859-1")
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      if (typeof u.throwOnLimitExceeded < "u" && typeof u.throwOnLimitExceeded != "boolean")
        throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
      var d = typeof u.charset > "u" ? n.charset : u.charset,
        p = typeof u.duplicates > "u" ? n.duplicates : u.duplicates;
      if (p !== "combine" && p !== "first" && p !== "last")
        throw new TypeError("The duplicates option must be either combine, first, or last");
      var P =
        typeof u.allowDots > "u" ? (u.decodeDotInKeys === !0 ? !0 : n.allowDots) : !!u.allowDots;
      return {
        allowDots: P,
        allowEmptyArrays:
          typeof u.allowEmptyArrays == "boolean" ? !!u.allowEmptyArrays : n.allowEmptyArrays,
        allowPrototypes:
          typeof u.allowPrototypes == "boolean" ? u.allowPrototypes : n.allowPrototypes,
        allowSparse: typeof u.allowSparse == "boolean" ? u.allowSparse : n.allowSparse,
        arrayLimit: typeof u.arrayLimit == "number" ? u.arrayLimit : n.arrayLimit,
        charset: d,
        charsetSentinel:
          typeof u.charsetSentinel == "boolean" ? u.charsetSentinel : n.charsetSentinel,
        comma: typeof u.comma == "boolean" ? u.comma : n.comma,
        decodeDotInKeys:
          typeof u.decodeDotInKeys == "boolean" ? u.decodeDotInKeys : n.decodeDotInKeys,
        decoder: typeof u.decoder == "function" ? u.decoder : n.decoder,
        delimiter:
          typeof u.delimiter == "string" || e.isRegExp(u.delimiter) ? u.delimiter : n.delimiter,
        depth: typeof u.depth == "number" || u.depth === !1 ? +u.depth : n.depth,
        duplicates: p,
        ignoreQueryPrefix: u.ignoreQueryPrefix === !0,
        interpretNumericEntities:
          typeof u.interpretNumericEntities == "boolean"
            ? u.interpretNumericEntities
            : n.interpretNumericEntities,
        parameterLimit: typeof u.parameterLimit == "number" ? u.parameterLimit : n.parameterLimit,
        parseArrays: u.parseArrays !== !1,
        plainObjects: typeof u.plainObjects == "boolean" ? u.plainObjects : n.plainObjects,
        strictDepth: typeof u.strictDepth == "boolean" ? !!u.strictDepth : n.strictDepth,
        strictMerge: typeof u.strictMerge == "boolean" ? !!u.strictMerge : n.strictMerge,
        strictNullHandling:
          typeof u.strictNullHandling == "boolean" ? u.strictNullHandling : n.strictNullHandling,
        throwOnLimitExceeded:
          typeof u.throwOnLimitExceeded == "boolean" ? u.throwOnLimitExceeded : !1,
      };
    };
  return (
    (Dr = function (T, u) {
      var d = E(u);
      if (T === "" || T === null || typeof T > "u")
        return d.plainObjects ? { __proto__: null } : {};
      for (
        var p = typeof T == "string" ? l(T, d) : T,
          P = d.plainObjects ? { __proto__: null } : {},
          A = Object.keys(p),
          R = 0;
        R < A.length;
        ++R
      ) {
        var I = A[R],
          C = h(I, p[I], d, typeof T == "string");
        P = e.merge(P, C, d);
      }
      return d.allowSparse === !0 ? P : e.compact(P);
    }),
    Dr
  );
}
var Mr, Ho;
function Su() {
  if (Ho) return Mr;
  Ho = 1;
  var e = bu(),
    t = wu(),
    r = pn();
  return ((Mr = { formats: r, parse: t, stringify: e }), Mr);
}
var Ou = Su();
const Eu = Je(Ou),
  Au = /^(?!\w+:\/\/)([^\s:]+\.?[^\s:]+)(?::(\d+))?(?!:)$/;
function Ru(e) {
  const r = {
    ...{
      insecure: !1,
      retryOnError: !0,
      logHandler: (c, f) => {
        if (c === "error" && f) {
          const h = [f.name, f.message].filter((E) => E).join(" - ");
          (console.error(`[error] ${h}`), console.error(f));
          return;
        }
        console.log(`[${c}] ${f}`);
      },
      headers: {},
      httpAgent: !1,
      httpsAgent: !1,
      timeout: 3e4,
      throttle: 0,
      basePath: "",
      adapter: void 0,
      maxContentLength: 1073741824,
      maxBodyLength: 1073741824,
    },
    ...e,
  };
  if (!r.accessToken) {
    const c = new TypeError("Expected parameter accessToken");
    throw (r.logHandler("error", c), c);
  }
  const n = r.insecure ? "http" : "https",
    o = r.space ? `${r.space}/` : "";
  let i = r.defaultHostname,
    a = r.insecure ? 80 : 443;
  if (r.host && Au.test(r.host)) {
    const c = r.host.split(":");
    c.length === 2 ? ([i, a] = c) : (i = c[0]);
  }
  r.basePath && (r.basePath = `/${r.basePath.split("/").filter(Boolean).join("/")}`);
  const s = e.baseURL || `${n}://${i}:${a}${r.basePath}/spaces/${o}`;
  return (
    !r.headers.Authorization &&
      typeof r.accessToken != "function" &&
      (r.headers.Authorization = "Bearer " + r.accessToken),
    {
      baseURL: s,
      headers: r.headers,
      httpAgent: r.httpAgent,
      httpsAgent: r.httpsAgent,
      proxy: r.proxy,
      timeout: r.timeout,
      adapter: r.adapter,
      maxContentLength: r.maxContentLength,
      maxBodyLength: r.maxBodyLength,
      paramsSerializer: { serialize: (c) => Eu.stringify(c) },
      logHandler: r.logHandler,
      responseLogger: r.responseLogger,
      requestLogger: r.requestLogger,
      retryOnError: r.retryOnError,
    }
  );
}
function Pu(e) {
  const t = St(e);
  return ((t.httpAgent = e.httpAgent), (t.httpsAgent = e.httpsAgent), t);
}
function Qi(e, t) {
  const r = Ru(t),
    n = e.create(r);
  return (
    (n.httpClientParams = t),
    (n.cloneWithNewParams = function (o) {
      return Qi(e, { ...Pu(t), ...o });
    }),
    t.onBeforeRequest && n.interceptors.request.use(t.onBeforeRequest),
    typeof t.accessToken == "function" && Ac(n, t.accessToken),
    t.throttle && Wc(n, t.throttle),
    Ic(n, t.retryLimit),
    t.onError && n.interceptors.response.use((o) => o, t.onError),
    n
  );
}
function he({ query: e }) {
  const t = {};
  return (delete e.resolveLinks, (t.params = St(e)), t);
}
function Xi(e) {
  const t = Object.getOwnPropertyNames(e);
  for (const r of t) {
    const n = e[r];
    n && typeof n == "object" && Xi(n);
  }
  return Object.freeze(e);
}
function Tu(e) {
  return (Xi(e.sys || {}), e);
}
function zo() {
  const e = Lc();
  if (!e) return null;
  const t = e.navigator.userAgent,
    r = e.navigator.platform,
    n = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    o = ["Win32", "Win64", "Windows", "WinCE"],
    i = ["iPhone", "iPad", "iPod"];
  return n.indexOf(r) !== -1
    ? "macOS"
    : i.indexOf(r) !== -1
      ? "iOS"
      : o.indexOf(r) !== -1
        ? "Windows"
        : /Android/.test(t)
          ? "Android"
          : /Linux/.test(r)
            ? "Linux"
            : null;
}
function xu() {
  const e = Ce.platform || "linux",
    t = Ce.version || "0.0.0",
    r = {
      android: "Android",
      aix: "Linux",
      darwin: "macOS",
      freebsd: "Linux",
      linux: "Linux",
      openbsd: "Linux",
      sunos: "Linux",
      win32: "Windows",
    };
  return e in r ? `${r[e] || "Linux"}/${t}` : null;
}
function Cu(e, t, r, n) {
  const o = [];
  (t && o.push(`app ${t}`), r && o.push(`integration ${r}`), o.push(`sdk ${e}`));
  let i = null;
  try {
    xc()
      ? ((i = zo()), o.push("platform ReactNative"))
      : Tc()
        ? ((i = xu()), o.push(`platform node.js/${Cc()}`))
        : ((i = zo()), o.push("platform browser"));
  } catch {
    i = null;
  }
  return (i && o.push(`os ${i}`), `${o.filter((a) => a !== "").join("; ")};`);
}
function Yi(e) {
  return Object.defineProperty(e, "toPlainObject", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value: function () {
      return St(this);
    },
  });
}
var Br, Go;
function Lu() {
  if (Go) return Br;
  Go = 1;
  function e(t, r) {
    return function (n) {
      return t(r(n));
    };
  }
  return ((Br = e), Br);
}
var qr, Vo;
function _u() {
  if (Vo) return qr;
  Vo = 1;
  var e = Lu(),
    t = e(Object.getPrototypeOf, Object);
  return ((qr = t), qr);
}
var Wr, Ko;
function ku() {
  if (Ko) return Wr;
  Ko = 1;
  var e = Ui(),
    t = _u(),
    r = Di(),
    n = "[object Object]",
    o = Function.prototype,
    i = Object.prototype,
    a = o.toString,
    s = i.hasOwnProperty,
    l = a.call(Object);
  function c(f) {
    if (!r(f) || e(f) != n) return !1;
    var h = t(f);
    if (h === null) return !0;
    var E = s.call(h, "constructor") && h.constructor;
    return typeof E == "function" && E instanceof E && a.call(E) == l;
  }
  return ((Wr = c), Wr);
}
var Iu = ku();
const Hr = Je(Iu);
function Nu(e) {
  if (e?.headers?.Authorization) {
    const t = `...${e.headers.Authorization.toString().substr(-5)}`;
    e.headers.Authorization = `Bearer ${t}`;
  }
  if (e?.headers?.["X-Contentful-Resource-Resolution"]) {
    const t = `...${e.headers["X-Contentful-Resource-Resolution"].toString().substr(-5)}`;
    e.headers["X-Contentful-Resource-Resolution"] = t;
  }
}
function ye(e) {
  const { config: t, response: r } = e;
  let n;
  if ((Nu(t), !Hr(r) || !Hr(t))) throw e;
  const o = r?.data,
    i = { status: r?.status, statusText: r?.statusText, message: "", details: {} };
  (t &&
    Hr(t) &&
    (i.request = { url: t.url, headers: t.headers, method: t.method, payloadData: t.data }),
    o &&
      typeof o == "object" &&
      ("requestId" in o && (i.requestId = o.requestId || "UNKNOWN"),
      "message" in o && (i.message = o.message || ""),
      "details" in o && (i.details = o.details || {}),
      (n = o.sys?.id)));
  const a = new Error();
  a.name = n && n !== "Unknown" ? n : `${r?.status} ${r?.statusText}`;
  try {
    a.message = JSON.stringify(i, null, "  ");
  } catch {
    a.message = i?.message ?? "";
  }
  throw a;
}
function ju(e) {
  return function (r) {
    return Object.assign({}, e, r);
  };
}
var Zi = {
    0: 8203,
    1: 8204,
    2: 8205,
    3: 8290,
    4: 8291,
    5: 8288,
    6: 65279,
    7: 8289,
    8: 119155,
    9: 119156,
    a: 119157,
    b: 119158,
    c: 119159,
    d: 119160,
    e: 119161,
    f: 119162,
  },
  dn = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 },
  Fu = new Array(4).fill(String.fromCodePoint(dn[0])).join("");
function $u(e) {
  let t = JSON.stringify(e);
  return `${Fu}${Array.from(t)
    .map((r) => {
      let n = r.charCodeAt(0);
      if (n > 255)
        throw new Error(
          `Only ASCII edit info can be encoded. Error attempting to encode ${t} on character ${r} (${n})`
        );
      return Array.from(n.toString(4).padStart(4, "0"))
        .map((o) => String.fromCodePoint(dn[o]))
        .join("");
    })
    .join("")}`;
}
function Uu(e) {
  return !Number.isNaN(Number(e)) ||
    (/[a-z]/i.test(e) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(e))
    ? !1
    : !!Date.parse(e);
}
function Du(e) {
  try {
    new URL(e, e.startsWith("/") ? "https://acme.com" : void 0);
  } catch {
    return !1;
  }
  return !0;
}
function Mu(e, t, r = "auto") {
  return r === !0 || (r === "auto" && (Uu(e) || Du(e))) ? e : `${e}${$u(t)}`;
}
Object.fromEntries(Object.entries(dn).map((e) => e.reverse()));
Object.fromEntries(Object.entries(Zi).map((e) => e.reverse()));
`${Object.values(Zi)
  .map((e) => `\\u{${e.toString(16)}}`)
  .join("")}`;
function Ve(e, t) {
  return Mu(e, t);
}
var zr, Jo;
function Bu() {
  if (Jo) return zr;
  Jo = 1;
  var e = Object.prototype.hasOwnProperty,
    t = Object.prototype.toString;
  return (
    (zr = function (r, n, o) {
      if (t.call(n) !== "[object Function]") throw new TypeError("iterator must be a function");
      var i = r.length;
      if (i === +i) for (var a = 0; a < i; a++) n.call(o, r[a], a, r);
      else for (var s in r) e.call(r, s) && n.call(o, r[s], s, r);
    }),
    zr
  );
}
var Gr, Qo;
function qu() {
  if (Qo) return Gr;
  Qo = 1;
  var e = Bu();
  Gr = t;
  function t(r, n, o) {
    if (arguments.length === 3) return t.set(r, n, o);
    if (arguments.length === 2) return t.get(r, n);
    var i = t.bind(t, r);
    for (var a in t) t.hasOwnProperty(a) && (i[a] = t[a].bind(i, r));
    return i;
  }
  return (
    (t.get = function (r, n) {
      for (var o = Array.isArray(n) ? n : t.parse(n), i = 0; i < o.length; ++i) {
        var a = o[i];
        if (!(typeof r == "object" && a in r)) throw new Error("Invalid reference token: " + a);
        r = r[a];
      }
      return r;
    }),
    (t.set = function (r, n, o) {
      var i = Array.isArray(n) ? n : t.parse(n),
        a = i[0];
      if (i.length === 0) throw Error("Can not set the root object");
      for (var s = 0; s < i.length - 1; ++s) {
        var l = i[s];
        (typeof l != "string" && typeof l != "number" && (l = String(l)),
          !(l === "__proto__" || l === "constructor" || l === "prototype") &&
            (l === "-" && Array.isArray(r) && (l = r.length),
            (a = i[s + 1]),
            l in r || (a.match(/^(\d+|-)$/) ? (r[l] = []) : (r[l] = {})),
            (r = r[l])));
      }
      return (a === "-" && Array.isArray(r) && (a = r.length), (r[a] = o), this);
    }),
    (t.remove = function (r, n) {
      var o = Array.isArray(n) ? n : t.parse(n),
        i = o[o.length - 1];
      if (i === void 0) throw new Error('Invalid JSON pointer for remove: "' + n + '"');
      var a = t.get(r, o.slice(0, -1));
      if (Array.isArray(a)) {
        var s = +i;
        if (i === "" && isNaN(s)) throw new Error('Invalid array index: "' + i + '"');
        Array.prototype.splice.call(a, s, 1);
      } else delete a[i];
    }),
    (t.dict = function (r, n) {
      var o = {};
      return (
        t.walk(
          r,
          function (i, a) {
            o[a] = i;
          },
          n
        ),
        o
      );
    }),
    (t.walk = function (r, n, o) {
      var i = [];
      ((o =
        o ||
        function (a) {
          var s = Object.prototype.toString.call(a);
          return s === "[object Object]" || s === "[object Array]";
        }),
        (function a(s) {
          e(s, function (l, c) {
            (i.push(String(c)), o(l) ? a(l) : n(l, t.compile(i)), i.pop());
          });
        })(r));
    }),
    (t.has = function (r, n) {
      try {
        t.get(r, n);
      } catch {
        return !1;
      }
      return !0;
    }),
    (t.escape = function (r) {
      return r.toString().replace(/~/g, "~0").replace(/\//g, "~1");
    }),
    (t.unescape = function (r) {
      return r.replace(/~1/g, "/").replace(/~0/g, "~");
    }),
    (t.parse = function (r) {
      if (r === "") return [];
      if (r.charAt(0) !== "/") throw new Error("Invalid JSON pointer: " + r);
      return r.substring(1).split(/\//).map(t.unescape);
    }),
    (t.compile = function (r) {
      return r.length === 0 ? "" : "/" + r.map(t.escape).join("/");
    }),
    Gr
  );
}
var Ee = qu();
const Wu = ({ pointer: e, mappings: t, data: r, hiddenStrings: n }) => {
  const o = t[e];
  if (o) {
    delete t[e];
    const i = en(r, e);
    for (const a of i) {
      t[a] = o;
      const s = Ee.get(r, a),
        l = Ve(s, n);
      Ee.set(r, a, l);
    }
  } else {
    const i = en(r, e);
    for (const a of i) {
      const s = Ee.get(r, a),
        l = Ve(s, n);
      Ee.set(r, a, l);
    }
  }
};
function Hu(e) {
  return "content" in e && !!e.content;
}
const en = (e, t = "") => {
    const r = [],
      n = Ee.get(e, t);
    if (Hu(n))
      for (let o = 0; o < n.content.length; o++)
        n.content[o].nodeType === "text"
          ? r.push(`${t}/content/${o}/value`)
          : r.push(...en(e, `${t}/content/${o}`));
    return r;
  },
  Xo = ({
    entityId: e,
    entityType: t,
    space: r,
    environment: n,
    field: o,
    locale: i,
    editorInterface: a,
    fieldType: s,
    targetOrigin: l,
    platform: c,
  }) => ({
    origin: "contentful.com",
    href: `${`https://app.contentful.com/spaces/${r}/environments/${n}`}/${t === "Entry" ? "entries" : "assets"}/${e}/?focusedField=${o}&focusedLocale=${i}&source=vercel-content-link`,
    contentful: { editorInterface: a, fieldType: s },
  }),
  zu = (e) => ["builtin", "sidebar-builtin", "editor-builtin"].includes(e),
  Gu = (e) => Ku.includes(e);
function Vu(e) {
  if (typeof structuredClone == "function") return structuredClone(e);
  try {
    return JSON.parse(JSON.stringify(e));
  } catch (t) {
    return (console.warn("Failed to clone data:", e, t), e);
  }
}
const Ku = ["singleLine", "tagEditor", "listInput", "checkbox", "richTextEditor", "multipleLine"];
function Yo(e, t, r, n, o, i, a) {
  const s = a ? t[a] : t;
  switch (e) {
    case "Symbol": {
      const l = Ve(s, r);
      Ee.set(n, o, l);
      break;
    }
    case "Text": {
      const l = Ve(s, r);
      Ee.set(n, o, l);
      break;
    }
    case "RichText": {
      Wu({ pointer: "", mappings: i, data: s, hiddenStrings: r });
      break;
    }
    case "Array": {
      const l = s.map((c) => (typeof c == "string" ? Ve(c, r) : c));
      Ee.set(n, o, l);
      break;
    }
  }
}
const it = (e, t, r, n, o) => {
    if (!e.fields) return;
    const { contentSourceMaps: i } = e.sys;
    if (!i) return;
    const { mappings: a } = i;
    for (const s in a) {
      const { source: l } = a[s],
        c = e.sys.space.sys.id,
        f = e.sys.environment.sys.id,
        h = e.sys.id,
        E = e.sys.type,
        T = t[l.fieldType],
        u = r[l.editorInterface];
      if (zu(u.widgetNamespace) && !Gu(u.widgetId)) continue;
      const d = s.startsWith("/") ? s : `/${s}`;
      if (Ee.has(e, d)) {
        const p = Ee.get(e, d);
        if (p === null) return;
        const P = d.split("/").pop();
        if (!P) {
          console.error("Field name could not be extracted from the pointer", d);
          return;
        }
        const A = e.sys.locale;
        if (A) {
          const R = Xo({
            entityId: h,
            entityType: E,
            space: c,
            environment: f,
            field: P,
            locale: A,
            editorInterface: u,
            fieldType: T,
            targetOrigin: n,
            platform: o,
          });
          Yo(T, p, R, e, d, a);
        } else
          Object.keys(p).forEach((R) => {
            const I = Xo({
              entityId: h,
              entityType: E,
              space: c,
              environment: f,
              field: P,
              locale: R,
              editorInterface: u,
              fieldType: T,
              targetOrigin: n,
              platform: o,
            });
            Yo(T, p, I, e, `${d}/${R}`, a, R);
          });
      }
    }
  },
  Ju = (e, t, r) => {
    var n;
    const o = Vu(e);
    if (o.sys && "items" in o) {
      const i = o;
      if (!((n = i.sys) != null && n.contentSourceMapsLookup)) return i;
      const {
          contentSourceMapsLookup: { fieldTypes: a, editorInterfaces: s },
        } = i.sys,
        { items: l, includes: c } = i;
      (l.forEach((f) => it(f, a, s, t, r)),
        c && c.Entry && c.Entry.forEach((f) => it(f, a, s, t, r)),
        c && c.Asset && c.Asset.forEach((f) => it(f, a, s, t, r)));
    } else {
      const i = o;
      if (!i.sys.contentSourceMapsLookup)
        return (console.error("Content source maps lookup data is missing"), i);
      it(
        i,
        i.sys.contentSourceMapsLookup.fieldTypes,
        i.sys.contentSourceMapsLookup.editorInterfaces,
        t,
        r
      );
    }
    return o;
  };
var Qu =
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            typeof Symbol == "function" &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        },
  Xu = (function () {
    function e(t, r) {
      var n = [],
        o = !0,
        i = !1,
        a = void 0;
      try {
        for (
          var s = t[Symbol.iterator](), l;
          !(o = (l = s.next()).done) && (n.push(l.value), !(r && n.length === r));
          o = !0
        );
      } catch (c) {
        ((i = !0), (a = c));
      } finally {
        try {
          !o && s.return && s.return();
        } finally {
          if (i) throw a;
        }
      }
      return n;
    }
    return function (t, r) {
      if (Array.isArray(t)) return t;
      if (Symbol.iterator in Object(t)) return e(t, r);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  })();
function Ge(e) {
  if (Array.isArray(e)) {
    for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
    return r;
  } else return Array.from(e);
}
var Ke = {},
  Yu = function (t) {
    return t && t.sys && t.sys.type === "Link";
  },
  Zu = function (t) {
    return t && t.sys && t.sys.type === "ResourceLink";
  },
  el = function (t) {
    return t.space && t.environment
      ? [
          t.type + "!" + t.id,
          t.space.sys.id + "!" + t.environment.sys.id + "!" + t.type + "!" + t.id,
        ]
      : [t.type + "!" + t.id];
  },
  Zo = function (t, r) {
    var n = r.entryId,
      o = r.linkType,
      i = r.spaceId,
      a = r.environmentId;
    return i && a ? t.get(i + "!" + a + "!" + o + "!" + n) : t.get(o + "!" + n);
  },
  tl = function (t) {
    var r = /.*:spaces\/([^/]+)(?:\/environments\/([^/]+))?\/entries\/([^/]+)$/;
    if (r.test(t)) {
      var n = t.match(r),
        o = Xu(n, 4);
      o[0];
      var i = o[1],
        a = o[2],
        s = a === void 0 ? "master" : a,
        l = o[3];
      return { spaceId: i, environmentId: s, entryId: l };
    }
  },
  rl = function (t, r) {
    var n = r.sys,
      o = n.type,
      i = n.linkType;
    if (o === "ResourceLink") {
      if (!i.startsWith("Contentful:")) return r;
      var a = r.sys.urn,
        s = tl(a),
        l = s.spaceId,
        c = s.environmentId,
        f = s.entryId,
        h = i.split(":")[1];
      return Zo(t, { linkType: h, entryId: f, spaceId: l, environmentId: c }) || Ke;
    }
    var E = r.sys.id;
    return Zo(t, { linkType: i, entryId: E }) || Ke;
  },
  nl = function (t) {
    if (Array.isArray(t))
      return t.filter(function (n) {
        return n !== Ke;
      });
    for (var r in t) t[r] === Ke && delete t[r];
    return t;
  },
  ol = function e(t, r, n, o) {
    if (r(t)) return n(t);
    if (t && (typeof t > "u" ? "undefined" : Qu(t)) === "object") {
      for (var i in t) t.hasOwnProperty(i) && (t[i] = e(t[i], r, n, o));
      o && (t = nl(t));
    }
    return t;
  },
  il = function (t, r, n) {
    var o = rl(t, r);
    return o === Ke ? (n ? o : r) : o;
  },
  al = function (t, r) {
    if (!Array.isArray(r)) return t;
    var n = Object.keys(t).filter(function (o) {
      return r.indexOf(o) !== -1;
    });
    return n.reduce(function (o, i) {
      return ((o[i] = t[i]), o);
    }, {});
  },
  ea = function (t, r) {
    if (((r = r || {}), !t.items)) return [];
    var n = St(t),
      o = Object.keys(n.includes || {}).reduce(function (s, l) {
        return [].concat(Ge(s), Ge(t.includes[l]));
      }, []),
      i = [].concat(Ge(n.items), Ge(o)).filter(function (s) {
        return !!s.sys;
      }),
      a = new Map(
        i.reduce(function (s, l) {
          var c = el(l.sys).map(function (f) {
            return [f, l];
          });
          return (s.push.apply(s, Ge(c)), s);
        }, [])
      );
    return (
      i.forEach(function (s) {
        var l = al(s, r.itemEntryPoints);
        Object.assign(
          s,
          ol(
            l,
            function (c) {
              return Yu(c) || Zu(c);
            },
            function (c) {
              return il(a, c, r.removeUnresolved);
            },
            r.removeUnresolved
          )
        );
      }),
      n.items
    );
  },
  at = { exports: {} },
  ei;
function sl() {
  return (
    ei ||
      ((ei = 1),
      (function (e, t) {
        ((t = e.exports = r), (t.getSerialize = n));
        function r(o, i, a, s) {
          return JSON.stringify(o, n(i, s), a);
        }
        function n(o, i) {
          var a = [],
            s = [];
          return (
            i == null &&
              (i = function (l, c) {
                return a[0] === c
                  ? "[Circular ~]"
                  : "[Circular ~." + s.slice(0, a.indexOf(c)).join(".") + "]";
              }),
            function (l, c) {
              if (a.length > 0) {
                var f = a.indexOf(this);
                (~f ? a.splice(f + 1) : a.push(this),
                  ~f ? s.splice(f, 1 / 0, l) : s.push(l),
                  ~a.indexOf(c) && (c = i.call(this, l, c)));
              } else a.push(c);
              return o == null ? c : o.call(this, l, c);
            }
          );
        }
      })(at, at.exports)),
    at.exports
  );
}
var cl = sl();
const ul = Je(cl);
function ta(e) {
  return Object.defineProperty(e, "stringifySafe", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value: function (t = null, r = "") {
      return ul(this, t, r, (n, o) => ({
        sys: { type: "Link", linkType: "Entry", id: o.sys.id, circular: !0 },
      }));
    },
  });
}
async function ll(e, t, r) {
  if (!t || (!t.initial && !t.nextSyncToken && !t.nextPageToken))
    throw new Error(
      "Please provide one of `initial`, `nextSyncToken` or `nextPageToken` parameters for syncing"
    );
  if (t.content_type && !t.type) t.type = "Entry";
  else if (t.content_type && t.type && t.type !== "Entry")
    throw new Error(
      "When using the `content_type` filter your `type` parameter cannot be different from `Entry`."
    );
  const n = { withoutLinkResolution: !1, withoutUnresolvableLinks: !1, paginate: !0 },
    {
      withoutLinkResolution: o,
      withoutUnresolvableLinks: i,
      paginate: a,
    } = Object.assign(Object.assign({}, n), r),
    s = await ra(e, [], t, { paginate: a });
  o || (s.items = ea(s, { removeUnresolved: i, itemEntryPoints: ["fields"] }));
  const l = fl(s.items);
  return (
    s.nextSyncToken && (l.nextSyncToken = s.nextSyncToken),
    s.nextPageToken && (l.nextPageToken = s.nextPageToken),
    Tu(ta(Yi(l)))
  );
}
function fl(e) {
  const t = (r) => (n, o) => (o.sys.type === r && n.push(Yi(o)), n);
  return {
    entries: e.reduce(t("Entry"), []),
    assets: e.reduce(t("Asset"), []),
    deletedEntries: e.reduce(t("DeletedEntry"), []),
    deletedAssets: e.reduce(t("DeletedAsset"), []),
  };
}
function pl(e) {
  return e.nextPageToken
    ? { sync_token: e.nextPageToken }
    : e.nextSyncToken
      ? { sync_token: e.nextSyncToken }
      : e.sync_token
        ? { sync_token: e.sync_token }
        : e;
}
async function ra(e, t, r, { paginate: n }) {
  const o = pl(r),
    a = (await e.get("sync", he({ query: o }))).data || {};
  return (
    (t = t.concat(a.items || [])),
    a.nextPageUrl
      ? n
        ? (delete o.initial, (o.sync_token = Vr(a.nextPageUrl)), ra(e, t, o, { paginate: n }))
        : { items: t, nextPageToken: Vr(a.nextPageUrl) }
      : a.nextSyncUrl
        ? { items: t, nextSyncToken: Vr(a.nextSyncUrl) }
        : { items: [] }
  );
}
function Vr(e) {
  const t = e.split("?");
  return t.length > 0 ? t[1].replace("sync_token=", "") : "";
}
function xe(e) {
  const t = {};
  let r = !1;
  for (const n in e) Array.isArray(e[n]) && ((t[n] = e[n].join(",")), (r = !0));
  return r ? Object.assign(Object.assign({}, e), t) : e;
}
function na(e) {
  if (!e.select) return new Set();
  const t = Array.isArray(e.select) ? e.select : e.select.split(",").map((r) => r.trim());
  return new Set(t);
}
function Re(e) {
  if (!e.select) return e;
  const t = na(e);
  return t.has("sys")
    ? e
    : (t.add("sys.id"),
      t.add("sys.type"),
      Object.assign(Object.assign({}, e), { select: [...t].join(",") }));
}
function ti(e, { resolveLinks: t, removeUnresolved: r }) {
  const n = ta(e);
  return (t && (n.items = ea(n, { removeUnresolved: r, itemEntryPoints: ["fields"] })), n);
}
class ve extends Error {
  constructor(t, r) {
    (super(`Invalid "${t}" provided, ` + r), (this.name = "ValidationError"));
  }
}
function dl(e, t, r) {
  if (((r = r || {}), typeof t != "number"))
    throw new ve(
      e,
      `only numeric values are allowed for timestamps, provided type was "${typeof t}"`
    );
  if (r.maximum && t > r.maximum)
    throw new ve(
      e,
      `value (${t}) cannot be further in the future than expected maximum (${r.maximum})`
    );
  if (r.now && t < r.now)
    throw new ve(e, `value (${t}) cannot be in the past, current time was ${r.now}`);
}
function yl(e) {
  return !!(e && typeof e == "object" && typeof e.lte == "string");
}
function hl(e) {
  return !!(e && typeof e == "object" && (typeof e.lte == "string" || e.lte instanceof Date));
}
const ml = (e) => {
    if (typeof e != "object" || e === null || Array.isArray(e))
      throw new ve("timelinePreview", "The 'timelinePreview' parameter must be an object.");
    const t = yl(e.release),
      r = hl(e.timestamp);
    if (!t && !r)
      throw new ve(
        "timelinePreview",
        "The 'timelinePreview' object must have at least one of 'release' or 'timestamp' with a valid 'lte' property."
      );
    return t || r;
  },
  ri = (e) => {
    var t, r;
    const n = e?.host,
      o =
        (t = e?.timelinePreview) !== null && t !== void 0
          ? t
          : (r = e?.alphaFeatures) === null || r === void 0
            ? void 0
            : r.timelinePreview;
    return { enabled: wl(n, o), timelinePreview: o };
  };
function gl(e) {
  if (e.locale === "*")
    throw new ve(
      "locale",
      `The use of locale='*' is no longer supported.To fetch an entry in all existing locales,
      use client.withAllLocales instead of the locale='*' parameter.`
    );
}
function vl(e) {
  if (e.locale) throw new ve("locale", "The `locale` parameter is not allowed");
}
function st(e, t) {
  t ? vl(e) : gl(e);
}
function pt(e) {
  if ("resolveLinks" in e)
    throw new ve(
      "resolveLinks",
      `The use of the 'resolveLinks' parameter is no longer supported. By default, links are resolved.
      If you do not want to resolve links, use client.withoutLinkResolution.`
    );
}
function dt(e) {
  if ("removeUnresolved" in e)
    throw new ve(
      "removeUnresolved",
      `The use of the 'removeUnresolved' parameter is no longer supported. By default, unresolved links are kept as link objects.
      If you do not want to include unresolved links, use client.withoutUnresolvableLinks.`
    );
}
function bl(e, t) {
  if (t === void 0) return !1;
  if (typeof t != "boolean")
    throw new ve(
      "includeContentSourceMaps",
      "The 'includeContentSourceMaps' parameter must be a boolean."
    );
  const r = typeof e == "string" && e.startsWith("preview");
  if (t && !r)
    throw new ve(
      "includeContentSourceMaps",
      `The 'includeContentSourceMaps' parameter can only be used with the CPA. Please set host to 'preview.contentful.com' or 'preview.eu.contentful.com' to include Content Source Maps.
      `
    );
  return t;
}
function wl(e, t) {
  if (t === void 0) return !1;
  const r = ml(t),
    n = typeof e == "string" && e.startsWith("preview");
  if (r && !n)
    throw new ve(
      "timelinePreview",
      `The 'timelinePreview' parameter can only be used with the CPA. Please set host to 'preview.contentful.com' or 'preview.eu.contentful.com' to enable Timeline Preview.
      `
    );
  return !0;
}
function Ue(e) {
  for (const t in e) {
    const r = e[t];
    if (typeof r == "object" && r !== null && !Array.isArray(r))
      throw new Error(`Objects are not supported as value for the "${t}" query parameter.`);
  }
}
function Sl(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
        (r[n[o]] = e[n[o]]);
  return r;
}
function ni(e) {
  const { cursor: t, pagePrev: r, pageNext: n, skip: o } = e,
    i = Sl(e, ["cursor", "pagePrev", "pageNext", "skip"]);
  return Object.assign(
    Object.assign(Object.assign(Object.assign({}, i), { cursor: !0 }), !!r && { pagePrev: r }),
    !!n && { pageNext: n }
  );
}
function Ol(e, t) {
  const r = t?.split("?")[1];
  if (r) return new URLSearchParams(r).get(e);
}
const El = { prev: "pagePrev", next: "pageNext" };
function oi(e) {
  const t = {};
  for (const [r, n] of Object.entries(El)) {
    const o = Ol(n, e.pages[r]);
    o && (t[r] = o);
  }
  return Object.assign(Object.assign({}, e), { pages: t });
}
const Al = 2880 * 60;
class Rl extends Error {
  constructor(t, r, n) {
    (super("The resource could not be found."),
      (this.sys = { type: "Error", id: "NotFound" }),
      (this.details = { type: "Entry", id: t, environment: r, space: n }));
  }
}
function oa({ http: e, getGlobalOptions: t }, r) {
  const n = (b = "unknown") => new Rl(b, t().environment, t().space),
    o = (b) => {
      let w = b === "space" ? t().spaceBaseUrl : t().environmentBaseUrl;
      if (!w) throw new Error("Please define baseUrl for " + b);
      return (w.endsWith("/") || (w += "/"), w);
    };
  function i(b = {}) {
    var w, _;
    const j = e.httpClientParams,
      te =
        (w = j?.includeContentSourceMaps) !== null && w !== void 0
          ? w
          : (_ = j?.alphaFeatures) === null || _ === void 0
            ? void 0
            : _.includeContentSourceMaps,
      pe = j?.host;
    if (bl(pe, te) && ((b.includeContentSourceMaps = !0), b.select)) {
      const Ae = na(b);
      (Ae.add("sys"), (b.select = Array.from(Ae).join(",")));
    }
    return b;
  }
  function a(b) {
    const { enabled: w } = ri(e.httpClientParams);
    return w ? `timeline/${b}` : b;
  }
  function s(b) {
    const { enabled: w, timelinePreview: _ } = ri(e.httpClientParams);
    return (
      w && (_?.release && (b.release = _.release), _?.timestamp && (b.timestamp = _.timestamp)),
      b
    );
  }
  function l(b, w) {
    var _;
    return ((_ = w?.params) === null || _ === void 0 ? void 0 : _.includeContentSourceMaps)
      ? Ju(b)
      : b;
  }
  async function c({ context: b, path: w, config: _ }) {
    const j = o(b);
    try {
      const te = await e.get(j + w, _);
      return l(te.data, _);
    } catch (te) {
      ye(te);
    }
  }
  async function f({ context: b, path: w, data: _, config: j }) {
    const te = o(b);
    try {
      return (await e.post(te + w, _, j)).data;
    } catch (pe) {
      ye(pe);
    }
  }
  async function h() {
    return c({ context: "space", path: "" });
  }
  async function E(b) {
    return c({ context: "environment", path: `content_types/${b}` });
  }
  async function T(b = {}) {
    return c({ context: "environment", path: "content_types", config: he({ query: b }) });
  }
  async function u(b, w = {}) {
    return P(b, w, r);
  }
  async function d(b = {}) {
    return R(b, r);
  }
  async function p(b = {}) {
    const w = await R(ni(b), r);
    return oi(w);
  }
  async function P(
    b,
    w,
    _ = { withAllLocales: !1, withoutLinkResolution: !1, withoutUnresolvableLinks: !1 }
  ) {
    const { withAllLocales: j } = _;
    return (
      st(w, j),
      pt(w),
      dt(w),
      Ue(w),
      A(b, j ? Object.assign(Object.assign({}, w), { locale: "*" }) : w, _)
    );
  }
  async function A(b, w, _) {
    if (!b) throw n(b);
    try {
      const j = await C(Object.assign({ "sys.id": b }, i(w)), _);
      if (j.items.length > 0) return j.items[0];
      throw n(b);
    } catch (j) {
      ye(j);
    }
  }
  async function R(
    b,
    w = { withAllLocales: !1, withoutLinkResolution: !1, withoutUnresolvableLinks: !1 }
  ) {
    const { withAllLocales: _ } = w;
    return (
      st(b, _),
      pt(b),
      dt(b),
      Ue(b),
      C(_ ? Object.assign(Object.assign({}, b), { locale: "*" }) : b, w)
    );
  }
  function I(b) {
    const w = s(Object.assign({}, b));
    return i(xe(Re(w)));
  }
  async function C(b, w) {
    const { withoutLinkResolution: _, withoutUnresolvableLinks: j } = w;
    try {
      const te = await c({
        context: "environment",
        path: a("entries"),
        config: he({ query: I(b) }),
      });
      return ti(te, { resolveLinks: !_, removeUnresolved: j ?? !1 });
    } catch (te) {
      ye(te);
    }
  }
  async function L(b, w = {}) {
    return N(b, w, r);
  }
  async function m(b = {}) {
    return x(b, r);
  }
  async function O(b = {}) {
    const w = await x(ni(b), r);
    return oi(w);
  }
  async function x(
    b,
    w = { withAllLocales: !1, withoutLinkResolution: !1, withoutUnresolvableLinks: !1 }
  ) {
    const { withAllLocales: _ } = w;
    (st(b, _), Ue(b));
    const j = _ ? Object.assign(Object.assign({}, b), { locale: "*" }) : b;
    return F(j);
  }
  async function k(b, w) {
    try {
      return c({ context: "environment", path: a(`assets/${b}`), config: he({ query: I(w) }) });
    } catch (_) {
      ye(_);
    }
  }
  async function N(
    b,
    w,
    _ = { withAllLocales: !1, withoutLinkResolution: !1, withoutUnresolvableLinks: !1 }
  ) {
    const { withAllLocales: j } = _;
    (st(w, j), Ue(w));
    const te = j ? Object.assign(Object.assign({}, w), { locale: "*" }) : w;
    return k(b, te);
  }
  async function F(b) {
    try {
      return c({ context: "environment", path: a("assets"), config: he({ query: I(b) }) });
    } catch (w) {
      ye(w);
    }
  }
  async function q(b) {
    return c({ context: "environment", path: `tags/${b}` });
  }
  async function D(b = {}) {
    return (Ue(b), c({ context: "environment", path: "tags", config: he({ query: xe(Re(b)) }) }));
  }
  async function z(b) {
    try {
      const w = Math.floor(Date.now() / 1e3),
        _ = w + Al;
      dl("expiresAt", b, { maximum: _, now: w });
    } catch (w) {
      ye(w);
    }
    return f({ context: "environment", path: "asset_keys", data: { expiresAt: b } });
  }
  async function $(b = {}) {
    return (Ue(b), c({ context: "environment", path: "locales", config: he({ query: Re(b) }) }));
  }
  async function J(b, w = { paginate: !0 }) {
    return S(b, w, r);
  }
  async function S(
    b,
    w,
    _ = { withAllLocales: !1, withoutLinkResolution: !1, withoutUnresolvableLinks: !1 }
  ) {
    (pt(b), dt(b));
    const j = Object.assign(Object.assign({}, w), _);
    return (ne(e), ll(e, b, j));
  }
  function W(b) {
    return ee(b, r);
  }
  function ee(
    b,
    w = { withAllLocales: !1, withoutLinkResolution: !1, withoutUnresolvableLinks: !1 }
  ) {
    return Q(b, w);
  }
  function Q(b, w) {
    const { withoutLinkResolution: _, withoutUnresolvableLinks: j } = w;
    return ti(b, { resolveLinks: !_, removeUnresolved: j ?? !1 });
  }
  function oe(b, w = {}) {
    return se(b, w);
  }
  async function se(b, w = {}) {
    try {
      return c({
        context: "environment",
        path: `taxonomy/concept-schemes/${b}`,
        config: he({ query: xe(Re(w)) }),
      });
    } catch (_) {
      ye(_);
    }
  }
  function ae(b = {}) {
    return ce(b);
  }
  async function ce(b = {}) {
    try {
      return c({
        context: "environment",
        path: "taxonomy/concept-schemes",
        config: he({ query: xe(Re(b)) }),
      });
    } catch (w) {
      ye(w);
    }
  }
  function ue(b, w = {}) {
    return Se(b, w);
  }
  async function Se(b, w = {}) {
    try {
      return c({
        context: "environment",
        path: `taxonomy/concepts/${b}`,
        config: he({ query: xe(Re(w)) }),
      });
    } catch (_) {
      ye(_);
    }
  }
  function Oe(b = {}) {
    return re(b);
  }
  async function re(b = {}) {
    try {
      return c({
        context: "environment",
        path: "taxonomy/concepts",
        config: he({ query: xe(Re(b)) }),
      });
    } catch (w) {
      ye(w);
    }
  }
  function B(b, w = {}) {
    return X(b, w);
  }
  async function X(b, w = {}) {
    try {
      return c({
        context: "environment",
        path: `taxonomy/concepts/${b}/ancestors`,
        config: he({ query: xe(Re(w)) }),
      });
    } catch (_) {
      ye(_);
    }
  }
  function G(b, w = {}) {
    return Y(b, w);
  }
  async function Y(b, w = {}) {
    try {
      return c({
        context: "environment",
        path: `taxonomy/concepts/${b}/descendants`,
        config: he({ query: xe(Re(w)) }),
      });
    } catch (_) {
      ye(_);
    }
  }
  function ne(b) {
    b.defaults.baseURL = t().environmentBaseUrl;
  }
  return {
    version: "0.0.0-determined-by-semantic-release",
    getSpace: h,
    getContentType: E,
    getContentTypes: T,
    getAsset: L,
    getAssets: m,
    getAssetsWithCursor: O,
    getTag: q,
    getTags: D,
    getLocales: $,
    parseEntries: W,
    sync: J,
    getEntry: u,
    getEntries: d,
    getEntriesWithCursor: p,
    getConceptScheme: oe,
    getConceptSchemes: ae,
    getConcept: ue,
    getConcepts: Oe,
    getConceptAncestors: B,
    getConceptDescendants: G,
    createAssetKey: z,
  };
}
function Pl({ http: e, getGlobalOptions: t }, r, n) {
  const o = oa({ http: e, getGlobalOptions: t }, r),
    i = o || {};
  return (
    Object.defineProperty(i, "withAllLocales", {
      get: () => n(Object.assign(Object.assign({}, r), { withAllLocales: !0 })),
    }),
    Object.defineProperty(i, "withoutLinkResolution", {
      get: () => n(Object.assign(Object.assign({}, r), { withoutLinkResolution: !0 })),
    }),
    Object.defineProperty(i, "withoutUnresolvableLinks", {
      get: () => n(Object.assign(Object.assign({}, r), { withoutUnresolvableLinks: !0 })),
    }),
    Object.create(i)
  );
}
const Tl = ({ http: e, getGlobalOptions: t }) => {
  function r(o) {
    return Pl({ http: e, getGlobalOptions: t }, o, r);
  }
  const n = oa(
    { http: e, getGlobalOptions: t },
    { withoutLinkResolution: !1, withAllLocales: !1, withoutUnresolvableLinks: !1 }
  );
  return Object.assign(Object.assign({}, n), {
    get withAllLocales() {
      return r({ withAllLocales: !0, withoutLinkResolution: !1, withoutUnresolvableLinks: !1 });
    },
    get withoutLinkResolution() {
      return r({ withAllLocales: !1, withoutLinkResolution: !0, withoutUnresolvableLinks: !1 });
    },
    get withoutUnresolvableLinks() {
      return r({ withAllLocales: !1, withoutLinkResolution: !1, withoutUnresolvableLinks: !0 });
    },
  });
};
function Kl(e) {
  if (!e.accessToken) throw new TypeError("Expected parameter accessToken");
  if (!e.space) throw new TypeError("Expected parameter space");
  (pt(e), dt(e));
  const r = Object.assign(
      Object.assign(
        {},
        {
          resolveLinks: !0,
          removeUnresolved: !1,
          defaultHostname: "cdn.contentful.com",
          environment: "master",
        }
      ),
      e
    ),
    n = Cu("contentful.js/0.0.0-determined-by-semantic-release", r.application, r.integration);
  r.headers = Object.assign(Object.assign({}, r.headers), {
    "Content-Type": "application/vnd.contentful.delivery.v1+json",
    "X-Contentful-User-Agent": n,
  });
  const o = Qi(Z, r);
  if (!o.defaults.baseURL) throw new Error("Please define a baseURL");
  const i = ju({
    space: r.space,
    environment: r.environment,
    spaceBaseUrl: o.defaults.baseURL,
    environmentBaseUrl: `${o.defaults.baseURL}environments/${r.environment}`,
  });
  return ((o.defaults.baseURL = i({}).environmentBaseUrl), Tl({ http: o, getGlobalOptions: i }));
}
export { Kl as c };
