function Kx(t, r) {
  for (var i = 0; i < r.length; i++) {
    const s = r[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const l in s)
        if (l !== "default" && !(l in t)) {
          const c = Object.getOwnPropertyDescriptor(s, l);
          c && Object.defineProperty(t, l, c.get ? c : { enumerable: !0, get: () => s[l] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) s(l);
  new MutationObserver((l) => {
    for (const c of l)
      if (c.type === "childList")
        for (const d of c.addedNodes) d.tagName === "LINK" && d.rel === "modulepreload" && s(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(l) {
    const c = {};
    return (
      l.integrity && (c.integrity = l.integrity),
      l.referrerPolicy && (c.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (c.credentials = "omit")
          : (c.credentials = "same-origin"),
      c
    );
  }
  function s(l) {
    if (l.ep) return;
    l.ep = !0;
    const c = i(l);
    fetch(l.href, c);
  }
})();
var ls =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Zm(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Hl = { exports: {} },
  Di = {},
  Ul = { exports: {} },
  he = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Up;
function qx() {
  if (Up) return he;
  Up = 1;
  var t = Symbol.for("react.element"),
    r = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    s = Symbol.for("react.strict_mode"),
    l = Symbol.for("react.profiler"),
    c = Symbol.for("react.provider"),
    d = Symbol.for("react.context"),
    f = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    y = Symbol.for("react.lazy"),
    x = Symbol.iterator;
  function w(T) {
    return T === null || typeof T != "object"
      ? null
      : ((T = (x && T[x]) || T["@@iterator"]), typeof T == "function" ? T : null);
  }
  var P = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    A = Object.assign,
    b = {};
  function j(T, L, de) {
    ((this.props = T), (this.context = L), (this.refs = b), (this.updater = de || P));
  }
  ((j.prototype.isReactComponent = {}),
    (j.prototype.setState = function (T, L) {
      if (typeof T != "object" && typeof T != "function" && T != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, T, L, "setState");
    }),
    (j.prototype.forceUpdate = function (T) {
      this.updater.enqueueForceUpdate(this, T, "forceUpdate");
    }));
  function O() {}
  O.prototype = j.prototype;
  function I(T, L, de) {
    ((this.props = T), (this.context = L), (this.refs = b), (this.updater = de || P));
  }
  var F = (I.prototype = new O());
  ((F.constructor = I), A(F, j.prototype), (F.isPureReactComponent = !0));
  var W = Array.isArray,
    $ = Object.prototype.hasOwnProperty,
    ee = { current: null },
    G = { key: !0, ref: !0, __self: !0, __source: !0 };
  function _(T, L, de) {
    var fe,
      se = {},
      ae = null,
      we = null;
    if (L != null)
      for (fe in (L.ref !== void 0 && (we = L.ref), L.key !== void 0 && (ae = "" + L.key), L))
        $.call(L, fe) && !G.hasOwnProperty(fe) && (se[fe] = L[fe]);
    var ge = arguments.length - 2;
    if (ge === 1) se.children = de;
    else if (1 < ge) {
      for (var ce = Array(ge), Je = 0; Je < ge; Je++) ce[Je] = arguments[Je + 2];
      se.children = ce;
    }
    if (T && T.defaultProps)
      for (fe in ((ge = T.defaultProps), ge)) se[fe] === void 0 && (se[fe] = ge[fe]);
    return { $$typeof: t, type: T, key: ae, ref: we, props: se, _owner: ee.current };
  }
  function ue(T, L) {
    return { $$typeof: t, type: T.type, key: L, ref: T.ref, props: T.props, _owner: T._owner };
  }
  function ve(T) {
    return typeof T == "object" && T !== null && T.$$typeof === t;
  }
  function ze(T) {
    var L = { "=": "=0", ":": "=2" };
    return (
      "$" +
      T.replace(/[=:]/g, function (de) {
        return L[de];
      })
    );
  }
  var Pe = /\/+/g;
  function Be(T, L) {
    return typeof T == "object" && T !== null && T.key != null ? ze("" + T.key) : L.toString(36);
  }
  function Ke(T, L, de, fe, se) {
    var ae = typeof T;
    (ae === "undefined" || ae === "boolean") && (T = null);
    var we = !1;
    if (T === null) we = !0;
    else
      switch (ae) {
        case "string":
        case "number":
          we = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case t:
            case r:
              we = !0;
          }
      }
    if (we)
      return (
        (we = T),
        (se = se(we)),
        (T = fe === "" ? "." + Be(we, 0) : fe),
        W(se)
          ? ((de = ""),
            T != null && (de = T.replace(Pe, "$&/") + "/"),
            Ke(se, L, de, "", function (Je) {
              return Je;
            }))
          : se != null &&
            (ve(se) &&
              (se = ue(
                se,
                de +
                  (!se.key || (we && we.key === se.key)
                    ? ""
                    : ("" + se.key).replace(Pe, "$&/") + "/") +
                  T
              )),
            L.push(se)),
        1
      );
    if (((we = 0), (fe = fe === "" ? "." : fe + ":"), W(T)))
      for (var ge = 0; ge < T.length; ge++) {
        ae = T[ge];
        var ce = fe + Be(ae, ge);
        we += Ke(ae, L, de, ce, se);
      }
    else if (((ce = w(T)), typeof ce == "function"))
      for (T = ce.call(T), ge = 0; !(ae = T.next()).done; )
        ((ae = ae.value), (ce = fe + Be(ae, ge++)), (we += Ke(ae, L, de, ce, se)));
    else if (ae === "object")
      throw (
        (L = String(T)),
        Error(
          "Objects are not valid as a React child (found: " +
            (L === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : L) +
            "). If you meant to render a collection of children, use an array instead."
        )
      );
    return we;
  }
  function _e(T, L, de) {
    if (T == null) return T;
    var fe = [],
      se = 0;
    return (
      Ke(T, fe, "", "", function (ae) {
        return L.call(de, ae, se++);
      }),
      fe
    );
  }
  function Se(T) {
    if (T._status === -1) {
      var L = T._result;
      ((L = L()),
        L.then(
          function (de) {
            (T._status === 0 || T._status === -1) && ((T._status = 1), (T._result = de));
          },
          function (de) {
            (T._status === 0 || T._status === -1) && ((T._status = 2), (T._result = de));
          }
        ),
        T._status === -1 && ((T._status = 0), (T._result = L)));
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var xe = { current: null },
    H = { transition: null },
    X = { ReactCurrentDispatcher: xe, ReactCurrentBatchConfig: H, ReactCurrentOwner: ee };
  function D() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (he.Children = {
      map: _e,
      forEach: function (T, L, de) {
        _e(
          T,
          function () {
            L.apply(this, arguments);
          },
          de
        );
      },
      count: function (T) {
        var L = 0;
        return (
          _e(T, function () {
            L++;
          }),
          L
        );
      },
      toArray: function (T) {
        return (
          _e(T, function (L) {
            return L;
          }) || []
        );
      },
      only: function (T) {
        if (!ve(T))
          throw Error("React.Children.only expected to receive a single React element child.");
        return T;
      },
    }),
    (he.Component = j),
    (he.Fragment = i),
    (he.Profiler = l),
    (he.PureComponent = I),
    (he.StrictMode = s),
    (he.Suspense = h),
    (he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = X),
    (he.act = D),
    (he.cloneElement = function (T, L, de) {
      if (T == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " + T + "."
        );
      var fe = A({}, T.props),
        se = T.key,
        ae = T.ref,
        we = T._owner;
      if (L != null) {
        if (
          (L.ref !== void 0 && ((ae = L.ref), (we = ee.current)),
          L.key !== void 0 && (se = "" + L.key),
          T.type && T.type.defaultProps)
        )
          var ge = T.type.defaultProps;
        for (ce in L)
          $.call(L, ce) &&
            !G.hasOwnProperty(ce) &&
            (fe[ce] = L[ce] === void 0 && ge !== void 0 ? ge[ce] : L[ce]);
      }
      var ce = arguments.length - 2;
      if (ce === 1) fe.children = de;
      else if (1 < ce) {
        ge = Array(ce);
        for (var Je = 0; Je < ce; Je++) ge[Je] = arguments[Je + 2];
        fe.children = ge;
      }
      return { $$typeof: t, type: T.type, key: se, ref: ae, props: fe, _owner: we };
    }),
    (he.createContext = function (T) {
      return (
        (T = {
          $$typeof: d,
          _currentValue: T,
          _currentValue2: T,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (T.Provider = { $$typeof: c, _context: T }),
        (T.Consumer = T)
      );
    }),
    (he.createElement = _),
    (he.createFactory = function (T) {
      var L = _.bind(null, T);
      return ((L.type = T), L);
    }),
    (he.createRef = function () {
      return { current: null };
    }),
    (he.forwardRef = function (T) {
      return { $$typeof: f, render: T };
    }),
    (he.isValidElement = ve),
    (he.lazy = function (T) {
      return { $$typeof: y, _payload: { _status: -1, _result: T }, _init: Se };
    }),
    (he.memo = function (T, L) {
      return { $$typeof: m, type: T, compare: L === void 0 ? null : L };
    }),
    (he.startTransition = function (T) {
      var L = H.transition;
      H.transition = {};
      try {
        T();
      } finally {
        H.transition = L;
      }
    }),
    (he.unstable_act = D),
    (he.useCallback = function (T, L) {
      return xe.current.useCallback(T, L);
    }),
    (he.useContext = function (T) {
      return xe.current.useContext(T);
    }),
    (he.useDebugValue = function () {}),
    (he.useDeferredValue = function (T) {
      return xe.current.useDeferredValue(T);
    }),
    (he.useEffect = function (T, L) {
      return xe.current.useEffect(T, L);
    }),
    (he.useId = function () {
      return xe.current.useId();
    }),
    (he.useImperativeHandle = function (T, L, de) {
      return xe.current.useImperativeHandle(T, L, de);
    }),
    (he.useInsertionEffect = function (T, L) {
      return xe.current.useInsertionEffect(T, L);
    }),
    (he.useLayoutEffect = function (T, L) {
      return xe.current.useLayoutEffect(T, L);
    }),
    (he.useMemo = function (T, L) {
      return xe.current.useMemo(T, L);
    }),
    (he.useReducer = function (T, L, de) {
      return xe.current.useReducer(T, L, de);
    }),
    (he.useRef = function (T) {
      return xe.current.useRef(T);
    }),
    (he.useState = function (T) {
      return xe.current.useState(T);
    }),
    (he.useSyncExternalStore = function (T, L, de) {
      return xe.current.useSyncExternalStore(T, L, de);
    }),
    (he.useTransition = function () {
      return xe.current.useTransition();
    }),
    (he.version = "18.3.1"),
    he
  );
}
var $p;
function cc() {
  return ($p || (($p = 1), (Ul.exports = qx())), Ul.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gp;
function Qx() {
  if (Gp) return Di;
  Gp = 1;
  var t = cc(),
    r = Symbol.for("react.element"),
    i = Symbol.for("react.fragment"),
    s = Object.prototype.hasOwnProperty,
    l = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(f, h, m) {
    var y,
      x = {},
      w = null,
      P = null;
    (m !== void 0 && (w = "" + m),
      h.key !== void 0 && (w = "" + h.key),
      h.ref !== void 0 && (P = h.ref));
    for (y in h) s.call(h, y) && !c.hasOwnProperty(y) && (x[y] = h[y]);
    if (f && f.defaultProps) for (y in ((h = f.defaultProps), h)) x[y] === void 0 && (x[y] = h[y]);
    return { $$typeof: r, type: f, key: w, ref: P, props: x, _owner: l.current };
  }
  return ((Di.Fragment = i), (Di.jsx = d), (Di.jsxs = d), Di);
}
var Yp;
function Zx() {
  return (Yp || ((Yp = 1), (Hl.exports = Qx())), Hl.exports);
}
var v = Zx(),
  us = {},
  $l = { exports: {} },
  ht = {},
  Gl = { exports: {} },
  Yl = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xp;
function Jx() {
  return (
    Xp ||
      ((Xp = 1),
      (function (t) {
        function r(H, X) {
          var D = H.length;
          H.push(X);
          e: for (; 0 < D; ) {
            var T = (D - 1) >>> 1,
              L = H[T];
            if (0 < l(L, X)) ((H[T] = X), (H[D] = L), (D = T));
            else break e;
          }
        }
        function i(H) {
          return H.length === 0 ? null : H[0];
        }
        function s(H) {
          if (H.length === 0) return null;
          var X = H[0],
            D = H.pop();
          if (D !== X) {
            H[0] = D;
            e: for (var T = 0, L = H.length, de = L >>> 1; T < de; ) {
              var fe = 2 * (T + 1) - 1,
                se = H[fe],
                ae = fe + 1,
                we = H[ae];
              if (0 > l(se, D))
                ae < L && 0 > l(we, se)
                  ? ((H[T] = we), (H[ae] = D), (T = ae))
                  : ((H[T] = se), (H[fe] = D), (T = fe));
              else if (ae < L && 0 > l(we, D)) ((H[T] = we), (H[ae] = D), (T = ae));
              else break e;
            }
          }
          return X;
        }
        function l(H, X) {
          var D = H.sortIndex - X.sortIndex;
          return D !== 0 ? D : H.id - X.id;
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
          var c = performance;
          t.unstable_now = function () {
            return c.now();
          };
        } else {
          var d = Date,
            f = d.now();
          t.unstable_now = function () {
            return d.now() - f;
          };
        }
        var h = [],
          m = [],
          y = 1,
          x = null,
          w = 3,
          P = !1,
          A = !1,
          b = !1,
          j = typeof setTimeout == "function" ? setTimeout : null,
          O = typeof clearTimeout == "function" ? clearTimeout : null,
          I = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function F(H) {
          for (var X = i(m); X !== null; ) {
            if (X.callback === null) s(m);
            else if (X.startTime <= H) (s(m), (X.sortIndex = X.expirationTime), r(h, X));
            else break;
            X = i(m);
          }
        }
        function W(H) {
          if (((b = !1), F(H), !A))
            if (i(h) !== null) ((A = !0), Se($));
            else {
              var X = i(m);
              X !== null && xe(W, X.startTime - H);
            }
        }
        function $(H, X) {
          ((A = !1), b && ((b = !1), O(_), (_ = -1)), (P = !0));
          var D = w;
          try {
            for (F(X), x = i(h); x !== null && (!(x.expirationTime > X) || (H && !ze())); ) {
              var T = x.callback;
              if (typeof T == "function") {
                ((x.callback = null), (w = x.priorityLevel));
                var L = T(x.expirationTime <= X);
                ((X = t.unstable_now()),
                  typeof L == "function" ? (x.callback = L) : x === i(h) && s(h),
                  F(X));
              } else s(h);
              x = i(h);
            }
            if (x !== null) var de = !0;
            else {
              var fe = i(m);
              (fe !== null && xe(W, fe.startTime - X), (de = !1));
            }
            return de;
          } finally {
            ((x = null), (w = D), (P = !1));
          }
        }
        var ee = !1,
          G = null,
          _ = -1,
          ue = 5,
          ve = -1;
        function ze() {
          return !(t.unstable_now() - ve < ue);
        }
        function Pe() {
          if (G !== null) {
            var H = t.unstable_now();
            ve = H;
            var X = !0;
            try {
              X = G(!0, H);
            } finally {
              X ? Be() : ((ee = !1), (G = null));
            }
          } else ee = !1;
        }
        var Be;
        if (typeof I == "function")
          Be = function () {
            I(Pe);
          };
        else if (typeof MessageChannel < "u") {
          var Ke = new MessageChannel(),
            _e = Ke.port2;
          ((Ke.port1.onmessage = Pe),
            (Be = function () {
              _e.postMessage(null);
            }));
        } else
          Be = function () {
            j(Pe, 0);
          };
        function Se(H) {
          ((G = H), ee || ((ee = !0), Be()));
        }
        function xe(H, X) {
          _ = j(function () {
            H(t.unstable_now());
          }, X);
        }
        ((t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (H) {
            H.callback = null;
          }),
          (t.unstable_continueExecution = function () {
            A || P || ((A = !0), Se($));
          }),
          (t.unstable_forceFrameRate = function (H) {
            0 > H || 125 < H
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (ue = 0 < H ? Math.floor(1e3 / H) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return w;
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return i(h);
          }),
          (t.unstable_next = function (H) {
            switch (w) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = w;
            }
            var D = w;
            w = X;
            try {
              return H();
            } finally {
              w = D;
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (H, X) {
            switch (H) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                H = 3;
            }
            var D = w;
            w = H;
            try {
              return X();
            } finally {
              w = D;
            }
          }),
          (t.unstable_scheduleCallback = function (H, X, D) {
            var T = t.unstable_now();
            switch (
              (typeof D == "object" && D !== null
                ? ((D = D.delay), (D = typeof D == "number" && 0 < D ? T + D : T))
                : (D = T),
              H)
            ) {
              case 1:
                var L = -1;
                break;
              case 2:
                L = 250;
                break;
              case 5:
                L = 1073741823;
                break;
              case 4:
                L = 1e4;
                break;
              default:
                L = 5e3;
            }
            return (
              (L = D + L),
              (H = {
                id: y++,
                callback: X,
                priorityLevel: H,
                startTime: D,
                expirationTime: L,
                sortIndex: -1,
              }),
              D > T
                ? ((H.sortIndex = D),
                  r(m, H),
                  i(h) === null && H === i(m) && (b ? (O(_), (_ = -1)) : (b = !0), xe(W, D - T)))
                : ((H.sortIndex = L), r(h, H), A || P || ((A = !0), Se($))),
              H
            );
          }),
          (t.unstable_shouldYield = ze),
          (t.unstable_wrapCallback = function (H) {
            var X = w;
            return function () {
              var D = w;
              w = X;
              try {
                return H.apply(this, arguments);
              } finally {
                w = D;
              }
            };
          }));
      })(Yl)),
    Yl
  );
}
var Kp;
function ew() {
  return (Kp || ((Kp = 1), (Gl.exports = Jx())), Gl.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qp;
function tw() {
  if (qp) return ht;
  qp = 1;
  var t = cc(),
    r = ew();
  function i(e) {
    for (
      var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, o = 1;
      o < arguments.length;
      o++
    )
      n += "&args[]=" + encodeURIComponent(arguments[o]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var s = new Set(),
    l = {};
  function c(e, n) {
    (d(e, n), d(e + "Capture", n));
  }
  function d(e, n) {
    for (l[e] = n, e = 0; e < n.length; e++) s.add(n[e]);
  }
  var f = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    h = Object.prototype.hasOwnProperty,
    m =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    y = {},
    x = {};
  function w(e) {
    return h.call(x, e) ? !0 : h.call(y, e) ? !1 : m.test(e) ? (x[e] = !0) : ((y[e] = !0), !1);
  }
  function P(e, n, o, a) {
    if (o !== null && o.type === 0) return !1;
    switch (typeof n) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return a
          ? !1
          : o !== null
            ? !o.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function A(e, n, o, a) {
    if (n === null || typeof n > "u" || P(e, n, o, a)) return !0;
    if (a) return !1;
    if (o !== null)
      switch (o.type) {
        case 3:
          return !n;
        case 4:
          return n === !1;
        case 5:
          return isNaN(n);
        case 6:
          return isNaN(n) || 1 > n;
      }
    return !1;
  }
  function b(e, n, o, a, u, p, g) {
    ((this.acceptsBooleans = n === 2 || n === 3 || n === 4),
      (this.attributeName = a),
      (this.attributeNamespace = u),
      (this.mustUseProperty = o),
      (this.propertyName = e),
      (this.type = n),
      (this.sanitizeURL = p),
      (this.removeEmptyString = g));
  }
  var j = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      j[e] = new b(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var n = e[0];
      j[n] = new b(n, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
      j[e] = new b(e, 2, !1, e.toLowerCase(), null, !1, !1);
    }),
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(
      function (e) {
        j[e] = new b(e, 2, !1, e, null, !1, !1);
      }
    ),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        j[e] = new b(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      j[e] = new b(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      j[e] = new b(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      j[e] = new b(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      j[e] = new b(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var O = /[\-:]([a-z])/g;
  function I(e) {
    return e[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var n = e.replace(O, I);
      j[n] = new b(n, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var n = e.replace(O, I);
        j[n] = new b(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var n = e.replace(O, I);
      j[n] = new b(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      j[e] = new b(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (j.xlinkHref = new b("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1)),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      j[e] = new b(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function F(e, n, o, a) {
    var u = j.hasOwnProperty(n) ? j[n] : null;
    (u !== null
      ? u.type !== 0
      : a || !(2 < n.length) || (n[0] !== "o" && n[0] !== "O") || (n[1] !== "n" && n[1] !== "N")) &&
      (A(n, o, u, a) && (o = null),
      a || u === null
        ? w(n) && (o === null ? e.removeAttribute(n) : e.setAttribute(n, "" + o))
        : u.mustUseProperty
          ? (e[u.propertyName] = o === null ? (u.type === 3 ? !1 : "") : o)
          : ((n = u.attributeName),
            (a = u.attributeNamespace),
            o === null
              ? e.removeAttribute(n)
              : ((u = u.type),
                (o = u === 3 || (u === 4 && o === !0) ? "" : "" + o),
                a ? e.setAttributeNS(a, n, o) : e.setAttribute(n, o))));
  }
  var W = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    $ = Symbol.for("react.element"),
    ee = Symbol.for("react.portal"),
    G = Symbol.for("react.fragment"),
    _ = Symbol.for("react.strict_mode"),
    ue = Symbol.for("react.profiler"),
    ve = Symbol.for("react.provider"),
    ze = Symbol.for("react.context"),
    Pe = Symbol.for("react.forward_ref"),
    Be = Symbol.for("react.suspense"),
    Ke = Symbol.for("react.suspense_list"),
    _e = Symbol.for("react.memo"),
    Se = Symbol.for("react.lazy"),
    xe = Symbol.for("react.offscreen"),
    H = Symbol.iterator;
  function X(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (H && e[H]) || e["@@iterator"]), typeof e == "function" ? e : null);
  }
  var D = Object.assign,
    T;
  function L(e) {
    if (T === void 0)
      try {
        throw Error();
      } catch (o) {
        var n = o.stack.trim().match(/\n( *(at )?)/);
        T = (n && n[1]) || "";
      }
    return (
      `
` +
      T +
      e
    );
  }
  var de = !1;
  function fe(e, n) {
    if (!e || de) return "";
    de = !0;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (n)
        if (
          ((n = function () {
            throw Error();
          }),
          Object.defineProperty(n.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(n, []);
          } catch (R) {
            var a = R;
          }
          Reflect.construct(e, [], n);
        } else {
          try {
            n.call();
          } catch (R) {
            a = R;
          }
          e.call(n.prototype);
        }
      else {
        try {
          throw Error();
        } catch (R) {
          a = R;
        }
        e();
      }
    } catch (R) {
      if (R && a && typeof R.stack == "string") {
        for (
          var u = R.stack.split(`
`),
            p = a.stack.split(`
`),
            g = u.length - 1,
            S = p.length - 1;
          1 <= g && 0 <= S && u[g] !== p[S];
        )
          S--;
        for (; 1 <= g && 0 <= S; g--, S--)
          if (u[g] !== p[S]) {
            if (g !== 1 || S !== 1)
              do
                if ((g--, S--, 0 > S || u[g] !== p[S])) {
                  var C =
                    `
` + u[g].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      C.includes("<anonymous>") &&
                      (C = C.replace("<anonymous>", e.displayName)),
                    C
                  );
                }
              while (1 <= g && 0 <= S);
            break;
          }
      }
    } finally {
      ((de = !1), (Error.prepareStackTrace = o));
    }
    return (e = e ? e.displayName || e.name : "") ? L(e) : "";
  }
  function se(e) {
    switch (e.tag) {
      case 5:
        return L(e.type);
      case 16:
        return L("Lazy");
      case 13:
        return L("Suspense");
      case 19:
        return L("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((e = fe(e.type, !1)), e);
      case 11:
        return ((e = fe(e.type.render, !1)), e);
      case 1:
        return ((e = fe(e.type, !0)), e);
      default:
        return "";
    }
  }
  function ae(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case G:
        return "Fragment";
      case ee:
        return "Portal";
      case ue:
        return "Profiler";
      case _:
        return "StrictMode";
      case Be:
        return "Suspense";
      case Ke:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ze:
          return (e.displayName || "Context") + ".Consumer";
        case ve:
          return (e._context.displayName || "Context") + ".Provider";
        case Pe:
          var n = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = n.displayName || n.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case _e:
          return ((n = e.displayName || null), n !== null ? n : ae(e.type) || "Memo");
        case Se:
          ((n = e._payload), (e = e._init));
          try {
            return ae(e(n));
          } catch {}
      }
    return null;
  }
  function we(e) {
    var n = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (n.displayName || "Context") + ".Consumer";
      case 10:
        return (n._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = n.render),
          (e = e.displayName || e.name || ""),
          n.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return n;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ae(n);
      case 8:
        return n === _ ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof n == "function") return n.displayName || n.name || null;
        if (typeof n == "string") return n;
    }
    return null;
  }
  function ge(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ce(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Je(e) {
    var n = ce(e) ? "checked" : "value",
      o = Object.getOwnPropertyDescriptor(e.constructor.prototype, n),
      a = "" + e[n];
    if (
      !e.hasOwnProperty(n) &&
      typeof o < "u" &&
      typeof o.get == "function" &&
      typeof o.set == "function"
    ) {
      var u = o.get,
        p = o.set;
      return (
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (g) {
            ((a = "" + g), p.call(this, g));
          },
        }),
        Object.defineProperty(e, n, { enumerable: o.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (g) {
            a = "" + g;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[n]);
          },
        }
      );
    }
  }
  function Xt(e) {
    e._valueTracker || (e._valueTracker = Je(e));
  }
  function Ln(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var o = n.getValue(),
      a = "";
    return (
      e && (a = ce(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== o ? (n.setValue(e), !0) : !1
    );
  }
  function an(e) {
    if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function ln(e, n) {
    var o = n.checked;
    return D({}, n, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: o ?? e._wrapperState.initialChecked,
    });
  }
  function qc(e, n) {
    var o = n.defaultValue == null ? "" : n.defaultValue,
      a = n.checked != null ? n.checked : n.defaultChecked;
    ((o = ge(n.value != null ? n.value : o)),
      (e._wrapperState = {
        initialChecked: a,
        initialValue: o,
        controlled:
          n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null,
      }));
  }
  function Qc(e, n) {
    ((n = n.checked), n != null && F(e, "checked", n, !1));
  }
  function Qs(e, n) {
    Qc(e, n);
    var o = ge(n.value),
      a = n.type;
    if (o != null)
      a === "number"
        ? ((o === 0 && e.value === "") || e.value != o) && (e.value = "" + o)
        : e.value !== "" + o && (e.value = "" + o);
    else if (a === "submit" || a === "reset") {
      e.removeAttribute("value");
      return;
    }
    (n.hasOwnProperty("value")
      ? Zs(e, n.type, o)
      : n.hasOwnProperty("defaultValue") && Zs(e, n.type, ge(n.defaultValue)),
      n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked));
  }
  function Zc(e, n, o) {
    if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
      var a = n.type;
      if (!((a !== "submit" && a !== "reset") || (n.value !== void 0 && n.value !== null))) return;
      ((n = "" + e._wrapperState.initialValue),
        o || n === e.value || (e.value = n),
        (e.defaultValue = n));
    }
    ((o = e.name),
      o !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      o !== "" && (e.name = o));
  }
  function Zs(e, n, o) {
    (n !== "number" || an(e.ownerDocument) !== e) &&
      (o == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + o && (e.defaultValue = "" + o));
  }
  var Xr = Array.isArray;
  function ar(e, n, o, a) {
    if (((e = e.options), n)) {
      n = {};
      for (var u = 0; u < o.length; u++) n["$" + o[u]] = !0;
      for (o = 0; o < e.length; o++)
        ((u = n.hasOwnProperty("$" + e[o].value)),
          e[o].selected !== u && (e[o].selected = u),
          u && a && (e[o].defaultSelected = !0));
    } else {
      for (o = "" + ge(o), n = null, u = 0; u < e.length; u++) {
        if (e[u].value === o) {
          ((e[u].selected = !0), a && (e[u].defaultSelected = !0));
          return;
        }
        n !== null || e[u].disabled || (n = e[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Js(e, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(i(91));
    return D({}, n, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function Jc(e, n) {
    var o = n.value;
    if (o == null) {
      if (((o = n.children), (n = n.defaultValue), o != null)) {
        if (n != null) throw Error(i(92));
        if (Xr(o)) {
          if (1 < o.length) throw Error(i(93));
          o = o[0];
        }
        n = o;
      }
      (n == null && (n = ""), (o = n));
    }
    e._wrapperState = { initialValue: ge(o) };
  }
  function ed(e, n) {
    var o = ge(n.value),
      a = ge(n.defaultValue);
    (o != null &&
      ((o = "" + o),
      o !== e.value && (e.value = o),
      n.defaultValue == null && e.defaultValue !== o && (e.defaultValue = o)),
      a != null && (e.defaultValue = "" + a));
  }
  function td(e) {
    var n = e.textContent;
    n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
  }
  function nd(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function ea(e, n) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? nd(n)
      : e === "http://www.w3.org/2000/svg" && n === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var Ji,
    rd = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (n, o, a, u) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(n, o, a, u);
            });
          }
        : e;
    })(function (e, n) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = n;
      else {
        for (
          Ji = Ji || document.createElement("div"),
            Ji.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>",
            n = Ji.firstChild;
          e.firstChild;
        )
          e.removeChild(e.firstChild);
        for (; n.firstChild; ) e.appendChild(n.firstChild);
      }
    });
  function Kr(e, n) {
    if (n) {
      var o = e.firstChild;
      if (o && o === e.lastChild && o.nodeType === 3) {
        o.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var qr = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Jv = ["Webkit", "ms", "Moz", "O"];
  Object.keys(qr).forEach(function (e) {
    Jv.forEach(function (n) {
      ((n = n + e.charAt(0).toUpperCase() + e.substring(1)), (qr[n] = qr[e]));
    });
  });
  function id(e, n, o) {
    return n == null || typeof n == "boolean" || n === ""
      ? ""
      : o || typeof n != "number" || n === 0 || (qr.hasOwnProperty(e) && qr[e])
        ? ("" + n).trim()
        : n + "px";
  }
  function od(e, n) {
    e = e.style;
    for (var o in n)
      if (n.hasOwnProperty(o)) {
        var a = o.indexOf("--") === 0,
          u = id(o, n[o], a);
        (o === "float" && (o = "cssFloat"), a ? e.setProperty(o, u) : (e[o] = u));
      }
  }
  var e0 = D(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  );
  function ta(e, n) {
    if (n) {
      if (e0[e] && (n.children != null || n.dangerouslySetInnerHTML != null))
        throw Error(i(137, e));
      if (n.dangerouslySetInnerHTML != null) {
        if (n.children != null) throw Error(i(60));
        if (
          typeof n.dangerouslySetInnerHTML != "object" ||
          !("__html" in n.dangerouslySetInnerHTML)
        )
          throw Error(i(61));
      }
      if (n.style != null && typeof n.style != "object") throw Error(i(62));
    }
  }
  function na(e, n) {
    if (e.indexOf("-") === -1) return typeof n.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var ra = null;
  function ia(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var oa = null,
    lr = null,
    ur = null;
  function sd(e) {
    if ((e = vi(e))) {
      if (typeof oa != "function") throw Error(i(280));
      var n = e.stateNode;
      n && ((n = Co(n)), oa(e.stateNode, e.type, n));
    }
  }
  function ad(e) {
    lr ? (ur ? ur.push(e) : (ur = [e])) : (lr = e);
  }
  function ld() {
    if (lr) {
      var e = lr,
        n = ur;
      if (((ur = lr = null), sd(e), n)) for (e = 0; e < n.length; e++) sd(n[e]);
    }
  }
  function ud(e, n) {
    return e(n);
  }
  function cd() {}
  var sa = !1;
  function dd(e, n, o) {
    if (sa) return e(n, o);
    sa = !0;
    try {
      return ud(e, n, o);
    } finally {
      ((sa = !1), (lr !== null || ur !== null) && (cd(), ld()));
    }
  }
  function Qr(e, n) {
    var o = e.stateNode;
    if (o === null) return null;
    var a = Co(o);
    if (a === null) return null;
    o = a[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((e = e.type),
          (a = !(e === "button" || e === "input" || e === "select" || e === "textarea"))),
          (e = !a));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (o && typeof o != "function") throw Error(i(231, n, typeof o));
    return o;
  }
  var aa = !1;
  if (f)
    try {
      var Zr = {};
      (Object.defineProperty(Zr, "passive", {
        get: function () {
          aa = !0;
        },
      }),
        window.addEventListener("test", Zr, Zr),
        window.removeEventListener("test", Zr, Zr));
    } catch {
      aa = !1;
    }
  function t0(e, n, o, a, u, p, g, S, C) {
    var R = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(o, R);
    } catch (z) {
      this.onError(z);
    }
  }
  var Jr = !1,
    eo = null,
    to = !1,
    la = null,
    n0 = {
      onError: function (e) {
        ((Jr = !0), (eo = e));
      },
    };
  function r0(e, n, o, a, u, p, g, S, C) {
    ((Jr = !1), (eo = null), t0.apply(n0, arguments));
  }
  function i0(e, n, o, a, u, p, g, S, C) {
    if ((r0.apply(this, arguments), Jr)) {
      if (Jr) {
        var R = eo;
        ((Jr = !1), (eo = null));
      } else throw Error(i(198));
      to || ((to = !0), (la = R));
    }
  }
  function In(e) {
    var n = e,
      o = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do ((n = e), (n.flags & 4098) !== 0 && (o = n.return), (e = n.return));
      while (e);
    }
    return n.tag === 3 ? o : null;
  }
  function fd(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if ((n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)), n !== null))
        return n.dehydrated;
    }
    return null;
  }
  function pd(e) {
    if (In(e) !== e) throw Error(i(188));
  }
  function o0(e) {
    var n = e.alternate;
    if (!n) {
      if (((n = In(e)), n === null)) throw Error(i(188));
      return n !== e ? null : e;
    }
    for (var o = e, a = n; ; ) {
      var u = o.return;
      if (u === null) break;
      var p = u.alternate;
      if (p === null) {
        if (((a = u.return), a !== null)) {
          o = a;
          continue;
        }
        break;
      }
      if (u.child === p.child) {
        for (p = u.child; p; ) {
          if (p === o) return (pd(u), e);
          if (p === a) return (pd(u), n);
          p = p.sibling;
        }
        throw Error(i(188));
      }
      if (o.return !== a.return) ((o = u), (a = p));
      else {
        for (var g = !1, S = u.child; S; ) {
          if (S === o) {
            ((g = !0), (o = u), (a = p));
            break;
          }
          if (S === a) {
            ((g = !0), (a = u), (o = p));
            break;
          }
          S = S.sibling;
        }
        if (!g) {
          for (S = p.child; S; ) {
            if (S === o) {
              ((g = !0), (o = p), (a = u));
              break;
            }
            if (S === a) {
              ((g = !0), (a = p), (o = u));
              break;
            }
            S = S.sibling;
          }
          if (!g) throw Error(i(189));
        }
      }
      if (o.alternate !== a) throw Error(i(190));
    }
    if (o.tag !== 3) throw Error(i(188));
    return o.stateNode.current === o ? e : n;
  }
  function hd(e) {
    return ((e = o0(e)), e !== null ? md(e) : null);
  }
  function md(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var n = md(e);
      if (n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var gd = r.unstable_scheduleCallback,
    yd = r.unstable_cancelCallback,
    s0 = r.unstable_shouldYield,
    a0 = r.unstable_requestPaint,
    Oe = r.unstable_now,
    l0 = r.unstable_getCurrentPriorityLevel,
    ua = r.unstable_ImmediatePriority,
    vd = r.unstable_UserBlockingPriority,
    no = r.unstable_NormalPriority,
    u0 = r.unstable_LowPriority,
    xd = r.unstable_IdlePriority,
    ro = null,
    Vt = null;
  function c0(e) {
    if (Vt && typeof Vt.onCommitFiberRoot == "function")
      try {
        Vt.onCommitFiberRoot(ro, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var Pt = Math.clz32 ? Math.clz32 : p0,
    d0 = Math.log,
    f0 = Math.LN2;
  function p0(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((d0(e) / f0) | 0)) | 0);
  }
  var io = 64,
    oo = 4194304;
  function ei(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function so(e, n) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var a = 0,
      u = e.suspendedLanes,
      p = e.pingedLanes,
      g = o & 268435455;
    if (g !== 0) {
      var S = g & ~u;
      S !== 0 ? (a = ei(S)) : ((p &= g), p !== 0 && (a = ei(p)));
    } else ((g = o & ~u), g !== 0 ? (a = ei(g)) : p !== 0 && (a = ei(p)));
    if (a === 0) return 0;
    if (
      n !== 0 &&
      n !== a &&
      (n & u) === 0 &&
      ((u = a & -a), (p = n & -n), u >= p || (u === 16 && (p & 4194240) !== 0))
    )
      return n;
    if (((a & 4) !== 0 && (a |= o & 16), (n = e.entangledLanes), n !== 0))
      for (e = e.entanglements, n &= a; 0 < n; )
        ((o = 31 - Pt(n)), (u = 1 << o), (a |= e[o]), (n &= ~u));
    return a;
  }
  function h0(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return n + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function m0(e, n) {
    for (
      var o = e.suspendedLanes, a = e.pingedLanes, u = e.expirationTimes, p = e.pendingLanes;
      0 < p;
    ) {
      var g = 31 - Pt(p),
        S = 1 << g,
        C = u[g];
      (C === -1
        ? ((S & o) === 0 || (S & a) !== 0) && (u[g] = h0(S, n))
        : C <= n && (e.expiredLanes |= S),
        (p &= ~S));
    }
  }
  function ca(e) {
    return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0);
  }
  function wd() {
    var e = io;
    return ((io <<= 1), (io & 4194240) === 0 && (io = 64), e);
  }
  function da(e) {
    for (var n = [], o = 0; 31 > o; o++) n.push(e);
    return n;
  }
  function ti(e, n, o) {
    ((e.pendingLanes |= n),
      n !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (n = 31 - Pt(n)),
      (e[n] = o));
  }
  function g0(e, n) {
    var o = e.pendingLanes & ~n;
    ((e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= n),
      (e.mutableReadLanes &= n),
      (e.entangledLanes &= n),
      (n = e.entanglements));
    var a = e.eventTimes;
    for (e = e.expirationTimes; 0 < o; ) {
      var u = 31 - Pt(o),
        p = 1 << u;
      ((n[u] = 0), (a[u] = -1), (e[u] = -1), (o &= ~p));
    }
  }
  function fa(e, n) {
    var o = (e.entangledLanes |= n);
    for (e = e.entanglements; o; ) {
      var a = 31 - Pt(o),
        u = 1 << a;
      ((u & n) | (e[a] & n) && (e[a] |= n), (o &= ~u));
    }
  }
  var ke = 0;
  function Sd(e) {
    return ((e &= -e), 1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1);
  }
  var kd,
    pa,
    Cd,
    bd,
    Ed,
    ha = !1,
    ao = [],
    un = null,
    cn = null,
    dn = null,
    ni = new Map(),
    ri = new Map(),
    fn = [],
    y0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " "
      );
  function Td(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        un = null;
        break;
      case "dragenter":
      case "dragleave":
        cn = null;
        break;
      case "mouseover":
      case "mouseout":
        dn = null;
        break;
      case "pointerover":
      case "pointerout":
        ni.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ri.delete(n.pointerId);
    }
  }
  function ii(e, n, o, a, u, p) {
    return e === null || e.nativeEvent !== p
      ? ((e = {
          blockedOn: n,
          domEventName: o,
          eventSystemFlags: a,
          nativeEvent: p,
          targetContainers: [u],
        }),
        n !== null && ((n = vi(n)), n !== null && pa(n)),
        e)
      : ((e.eventSystemFlags |= a),
        (n = e.targetContainers),
        u !== null && n.indexOf(u) === -1 && n.push(u),
        e);
  }
  function v0(e, n, o, a, u) {
    switch (n) {
      case "focusin":
        return ((un = ii(un, e, n, o, a, u)), !0);
      case "dragenter":
        return ((cn = ii(cn, e, n, o, a, u)), !0);
      case "mouseover":
        return ((dn = ii(dn, e, n, o, a, u)), !0);
      case "pointerover":
        var p = u.pointerId;
        return (ni.set(p, ii(ni.get(p) || null, e, n, o, a, u)), !0);
      case "gotpointercapture":
        return ((p = u.pointerId), ri.set(p, ii(ri.get(p) || null, e, n, o, a, u)), !0);
    }
    return !1;
  }
  function Pd(e) {
    var n = Vn(e.target);
    if (n !== null) {
      var o = In(n);
      if (o !== null) {
        if (((n = o.tag), n === 13)) {
          if (((n = fd(o)), n !== null)) {
            ((e.blockedOn = n),
              Ed(e.priority, function () {
                Cd(o);
              }));
            return;
          }
        } else if (n === 3 && o.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function lo(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var o = ga(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
      if (o === null) {
        o = e.nativeEvent;
        var a = new o.constructor(o.type, o);
        ((ra = a), o.target.dispatchEvent(a), (ra = null));
      } else return ((n = vi(o)), n !== null && pa(n), (e.blockedOn = o), !1);
      n.shift();
    }
    return !0;
  }
  function Nd(e, n, o) {
    lo(e) && o.delete(n);
  }
  function x0() {
    ((ha = !1),
      un !== null && lo(un) && (un = null),
      cn !== null && lo(cn) && (cn = null),
      dn !== null && lo(dn) && (dn = null),
      ni.forEach(Nd),
      ri.forEach(Nd));
  }
  function oi(e, n) {
    e.blockedOn === n &&
      ((e.blockedOn = null),
      ha || ((ha = !0), r.unstable_scheduleCallback(r.unstable_NormalPriority, x0)));
  }
  function si(e) {
    function n(u) {
      return oi(u, e);
    }
    if (0 < ao.length) {
      oi(ao[0], e);
      for (var o = 1; o < ao.length; o++) {
        var a = ao[o];
        a.blockedOn === e && (a.blockedOn = null);
      }
    }
    for (
      un !== null && oi(un, e),
        cn !== null && oi(cn, e),
        dn !== null && oi(dn, e),
        ni.forEach(n),
        ri.forEach(n),
        o = 0;
      o < fn.length;
      o++
    )
      ((a = fn[o]), a.blockedOn === e && (a.blockedOn = null));
    for (; 0 < fn.length && ((o = fn[0]), o.blockedOn === null); )
      (Pd(o), o.blockedOn === null && fn.shift());
  }
  var cr = W.ReactCurrentBatchConfig,
    uo = !0;
  function w0(e, n, o, a) {
    var u = ke,
      p = cr.transition;
    cr.transition = null;
    try {
      ((ke = 1), ma(e, n, o, a));
    } finally {
      ((ke = u), (cr.transition = p));
    }
  }
  function S0(e, n, o, a) {
    var u = ke,
      p = cr.transition;
    cr.transition = null;
    try {
      ((ke = 4), ma(e, n, o, a));
    } finally {
      ((ke = u), (cr.transition = p));
    }
  }
  function ma(e, n, o, a) {
    if (uo) {
      var u = ga(e, n, o, a);
      if (u === null) (Da(e, n, a, co, o), Td(e, a));
      else if (v0(u, e, n, o, a)) a.stopPropagation();
      else if ((Td(e, a), n & 4 && -1 < y0.indexOf(e))) {
        for (; u !== null; ) {
          var p = vi(u);
          if (
            (p !== null && kd(p), (p = ga(e, n, o, a)), p === null && Da(e, n, a, co, o), p === u)
          )
            break;
          u = p;
        }
        u !== null && a.stopPropagation();
      } else Da(e, n, a, null, o);
    }
  }
  var co = null;
  function ga(e, n, o, a) {
    if (((co = null), (e = ia(a)), (e = Vn(e)), e !== null))
      if (((n = In(e)), n === null)) e = null;
      else if (((o = n.tag), o === 13)) {
        if (((e = fd(n)), e !== null)) return e;
        e = null;
      } else if (o === 3) {
        if (n.stateNode.current.memoizedState.isDehydrated)
          return n.tag === 3 ? n.stateNode.containerInfo : null;
        e = null;
      } else n !== e && (e = null);
    return ((co = e), null);
  }
  function jd(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (l0()) {
          case ua:
            return 1;
          case vd:
            return 4;
          case no:
          case u0:
            return 16;
          case xd:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var pn = null,
    ya = null,
    fo = null;
  function Ad() {
    if (fo) return fo;
    var e,
      n = ya,
      o = n.length,
      a,
      u = "value" in pn ? pn.value : pn.textContent,
      p = u.length;
    for (e = 0; e < o && n[e] === u[e]; e++);
    var g = o - e;
    for (a = 1; a <= g && n[o - a] === u[p - a]; a++);
    return (fo = u.slice(e, 1 < a ? 1 - a : void 0));
  }
  function po(e) {
    var n = e.keyCode;
    return (
      "charCode" in e ? ((e = e.charCode), e === 0 && n === 13 && (e = 13)) : (e = n),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ho() {
    return !0;
  }
  function Md() {
    return !1;
  }
  function mt(e) {
    function n(o, a, u, p, g) {
      ((this._reactName = o),
        (this._targetInst = u),
        (this.type = a),
        (this.nativeEvent = p),
        (this.target = g),
        (this.currentTarget = null));
      for (var S in e) e.hasOwnProperty(S) && ((o = e[S]), (this[S] = o ? o(p) : p[S]));
      return (
        (this.isDefaultPrevented = (
          p.defaultPrevented != null ? p.defaultPrevented : p.returnValue === !1
        )
          ? ho
          : Md),
        (this.isPropagationStopped = Md),
        this
      );
    }
    return (
      D(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var o = this.nativeEvent;
          o &&
            (o.preventDefault
              ? o.preventDefault()
              : typeof o.returnValue != "unknown" && (o.returnValue = !1),
            (this.isDefaultPrevented = ho));
        },
        stopPropagation: function () {
          var o = this.nativeEvent;
          o &&
            (o.stopPropagation
              ? o.stopPropagation()
              : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0),
            (this.isPropagationStopped = ho));
        },
        persist: function () {},
        isPersistent: ho,
      }),
      n
    );
  }
  var dr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    va = mt(dr),
    ai = D({}, dr, { view: 0, detail: 0 }),
    k0 = mt(ai),
    xa,
    wa,
    li,
    mo = D({}, ai, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ka,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== li &&
              (li && e.type === "mousemove"
                ? ((xa = e.screenX - li.screenX), (wa = e.screenY - li.screenY))
                : (wa = xa = 0),
              (li = e)),
            xa);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : wa;
      },
    }),
    Rd = mt(mo),
    C0 = D({}, mo, { dataTransfer: 0 }),
    b0 = mt(C0),
    E0 = D({}, ai, { relatedTarget: 0 }),
    Sa = mt(E0),
    T0 = D({}, dr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    P0 = mt(T0),
    N0 = D({}, dr, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    j0 = mt(N0),
    A0 = D({}, dr, { data: 0 }),
    Dd = mt(A0),
    M0 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    R0 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    D0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function O0(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = D0[e]) ? !!n[e] : !1;
  }
  function ka() {
    return O0;
  }
  var F0 = D({}, ai, {
      key: function (e) {
        if (e.key) {
          var n = M0[e.key] || e.key;
          if (n !== "Unidentified") return n;
        }
        return e.type === "keypress"
          ? ((e = po(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? R0[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ka,
      charCode: function (e) {
        return e.type === "keypress" ? po(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? po(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    _0 = mt(F0),
    L0 = D({}, mo, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Od = mt(L0),
    I0 = D({}, ai, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ka,
    }),
    V0 = mt(I0),
    z0 = D({}, dr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    B0 = mt(z0),
    W0 = D({}, mo, {
      deltaX: function (e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    H0 = mt(W0),
    U0 = [9, 13, 27, 32],
    Ca = f && "CompositionEvent" in window,
    ui = null;
  f && "documentMode" in document && (ui = document.documentMode);
  var $0 = f && "TextEvent" in window && !ui,
    Fd = f && (!Ca || (ui && 8 < ui && 11 >= ui)),
    _d = " ",
    Ld = !1;
  function Id(e, n) {
    switch (e) {
      case "keyup":
        return U0.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Vd(e) {
    return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
  }
  var fr = !1;
  function G0(e, n) {
    switch (e) {
      case "compositionend":
        return Vd(n);
      case "keypress":
        return n.which !== 32 ? null : ((Ld = !0), _d);
      case "textInput":
        return ((e = n.data), e === _d && Ld ? null : e);
      default:
        return null;
    }
  }
  function Y0(e, n) {
    if (fr)
      return e === "compositionend" || (!Ca && Id(e, n))
        ? ((e = Ad()), (fo = ya = pn = null), (fr = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Fd && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var X0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function zd(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!X0[e.type] : n === "textarea";
  }
  function Bd(e, n, o, a) {
    (ad(a),
      (n = wo(n, "onChange")),
      0 < n.length &&
        ((o = new va("onChange", "change", null, o, a)), e.push({ event: o, listeners: n })));
  }
  var ci = null,
    di = null;
  function K0(e) {
    sf(e, 0);
  }
  function go(e) {
    var n = yr(e);
    if (Ln(n)) return e;
  }
  function q0(e, n) {
    if (e === "change") return n;
  }
  var Wd = !1;
  if (f) {
    var ba;
    if (f) {
      var Ea = "oninput" in document;
      if (!Ea) {
        var Hd = document.createElement("div");
        (Hd.setAttribute("oninput", "return;"), (Ea = typeof Hd.oninput == "function"));
      }
      ba = Ea;
    } else ba = !1;
    Wd = ba && (!document.documentMode || 9 < document.documentMode);
  }
  function Ud() {
    ci && (ci.detachEvent("onpropertychange", $d), (di = ci = null));
  }
  function $d(e) {
    if (e.propertyName === "value" && go(di)) {
      var n = [];
      (Bd(n, di, e, ia(e)), dd(K0, n));
    }
  }
  function Q0(e, n, o) {
    e === "focusin"
      ? (Ud(), (ci = n), (di = o), ci.attachEvent("onpropertychange", $d))
      : e === "focusout" && Ud();
  }
  function Z0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return go(di);
  }
  function J0(e, n) {
    if (e === "click") return go(n);
  }
  function ex(e, n) {
    if (e === "input" || e === "change") return go(n);
  }
  function tx(e, n) {
    return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n);
  }
  var Nt = typeof Object.is == "function" ? Object.is : tx;
  function fi(e, n) {
    if (Nt(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
    var o = Object.keys(e),
      a = Object.keys(n);
    if (o.length !== a.length) return !1;
    for (a = 0; a < o.length; a++) {
      var u = o[a];
      if (!h.call(n, u) || !Nt(e[u], n[u])) return !1;
    }
    return !0;
  }
  function Gd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Yd(e, n) {
    var o = Gd(e);
    e = 0;
    for (var a; o; ) {
      if (o.nodeType === 3) {
        if (((a = e + o.textContent.length), e <= n && a >= n)) return { node: o, offset: n - e };
        e = a;
      }
      e: {
        for (; o; ) {
          if (o.nextSibling) {
            o = o.nextSibling;
            break e;
          }
          o = o.parentNode;
        }
        o = void 0;
      }
      o = Gd(o);
    }
  }
  function Xd(e, n) {
    return e && n
      ? e === n
        ? !0
        : e && e.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? Xd(e, n.parentNode)
            : "contains" in e
              ? e.contains(n)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function Kd() {
    for (var e = window, n = an(); n instanceof e.HTMLIFrameElement; ) {
      try {
        var o = typeof n.contentWindow.location.href == "string";
      } catch {
        o = !1;
      }
      if (o) e = n.contentWindow;
      else break;
      n = an(e.document);
    }
    return n;
  }
  function Ta(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      n &&
      ((n === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        n === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function nx(e) {
    var n = Kd(),
      o = e.focusedElem,
      a = e.selectionRange;
    if (n !== o && o && o.ownerDocument && Xd(o.ownerDocument.documentElement, o)) {
      if (a !== null && Ta(o)) {
        if (((n = a.start), (e = a.end), e === void 0 && (e = n), "selectionStart" in o))
          ((o.selectionStart = n), (o.selectionEnd = Math.min(e, o.value.length)));
        else if (
          ((e = ((n = o.ownerDocument || document) && n.defaultView) || window), e.getSelection)
        ) {
          e = e.getSelection();
          var u = o.textContent.length,
            p = Math.min(a.start, u);
          ((a = a.end === void 0 ? p : Math.min(a.end, u)),
            !e.extend && p > a && ((u = a), (a = p), (p = u)),
            (u = Yd(o, p)));
          var g = Yd(o, a);
          u &&
            g &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== u.node ||
              e.anchorOffset !== u.offset ||
              e.focusNode !== g.node ||
              e.focusOffset !== g.offset) &&
            ((n = n.createRange()),
            n.setStart(u.node, u.offset),
            e.removeAllRanges(),
            p > a
              ? (e.addRange(n), e.extend(g.node, g.offset))
              : (n.setEnd(g.node, g.offset), e.addRange(n)));
        }
      }
      for (n = [], e = o; (e = e.parentNode); )
        e.nodeType === 1 && n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof o.focus == "function" && o.focus(), o = 0; o < n.length; o++)
        ((e = n[o]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top));
    }
  }
  var rx = f && "documentMode" in document && 11 >= document.documentMode,
    pr = null,
    Pa = null,
    pi = null,
    Na = !1;
  function qd(e, n, o) {
    var a = o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
    Na ||
      pr == null ||
      pr !== an(a) ||
      ((a = pr),
      "selectionStart" in a && Ta(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (pi && fi(pi, a)) ||
        ((pi = a),
        (a = wo(Pa, "onSelect")),
        0 < a.length &&
          ((n = new va("onSelect", "select", null, n, o)),
          e.push({ event: n, listeners: a }),
          (n.target = pr))));
  }
  function yo(e, n) {
    var o = {};
    return (
      (o[e.toLowerCase()] = n.toLowerCase()),
      (o["Webkit" + e] = "webkit" + n),
      (o["Moz" + e] = "moz" + n),
      o
    );
  }
  var hr = {
      animationend: yo("Animation", "AnimationEnd"),
      animationiteration: yo("Animation", "AnimationIteration"),
      animationstart: yo("Animation", "AnimationStart"),
      transitionend: yo("Transition", "TransitionEnd"),
    },
    ja = {},
    Qd = {};
  f &&
    ((Qd = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete hr.animationend.animation,
      delete hr.animationiteration.animation,
      delete hr.animationstart.animation),
    "TransitionEvent" in window || delete hr.transitionend.transition);
  function vo(e) {
    if (ja[e]) return ja[e];
    if (!hr[e]) return e;
    var n = hr[e],
      o;
    for (o in n) if (n.hasOwnProperty(o) && o in Qd) return (ja[e] = n[o]);
    return e;
  }
  var Zd = vo("animationend"),
    Jd = vo("animationiteration"),
    ef = vo("animationstart"),
    tf = vo("transitionend"),
    nf = new Map(),
    rf =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  function hn(e, n) {
    (nf.set(e, n), c(n, [e]));
  }
  for (var Aa = 0; Aa < rf.length; Aa++) {
    var Ma = rf[Aa],
      ix = Ma.toLowerCase(),
      ox = Ma[0].toUpperCase() + Ma.slice(1);
    hn(ix, "on" + ox);
  }
  (hn(Zd, "onAnimationEnd"),
    hn(Jd, "onAnimationIteration"),
    hn(ef, "onAnimationStart"),
    hn("dblclick", "onDoubleClick"),
    hn("focusin", "onFocus"),
    hn("focusout", "onBlur"),
    hn(tf, "onTransitionEnd"),
    d("onMouseEnter", ["mouseout", "mouseover"]),
    d("onMouseLeave", ["mouseout", "mouseover"]),
    d("onPointerEnter", ["pointerout", "pointerover"]),
    d("onPointerLeave", ["pointerout", "pointerover"]),
    c("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    c(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    c("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    c("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    c(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    c(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    ));
  var hi =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    sx = new Set("cancel close invalid load scroll toggle".split(" ").concat(hi));
  function of(e, n, o) {
    var a = e.type || "unknown-event";
    ((e.currentTarget = o), i0(a, n, void 0, e), (e.currentTarget = null));
  }
  function sf(e, n) {
    n = (n & 4) !== 0;
    for (var o = 0; o < e.length; o++) {
      var a = e[o],
        u = a.event;
      a = a.listeners;
      e: {
        var p = void 0;
        if (n)
          for (var g = a.length - 1; 0 <= g; g--) {
            var S = a[g],
              C = S.instance,
              R = S.currentTarget;
            if (((S = S.listener), C !== p && u.isPropagationStopped())) break e;
            (of(u, S, R), (p = C));
          }
        else
          for (g = 0; g < a.length; g++) {
            if (
              ((S = a[g]),
              (C = S.instance),
              (R = S.currentTarget),
              (S = S.listener),
              C !== p && u.isPropagationStopped())
            )
              break e;
            (of(u, S, R), (p = C));
          }
      }
    }
    if (to) throw ((e = la), (to = !1), (la = null), e);
  }
  function Ee(e, n) {
    var o = n[Va];
    o === void 0 && (o = n[Va] = new Set());
    var a = e + "__bubble";
    o.has(a) || (af(n, e, 2, !1), o.add(a));
  }
  function Ra(e, n, o) {
    var a = 0;
    (n && (a |= 4), af(o, e, a, n));
  }
  var xo = "_reactListening" + Math.random().toString(36).slice(2);
  function mi(e) {
    if (!e[xo]) {
      ((e[xo] = !0),
        s.forEach(function (o) {
          o !== "selectionchange" && (sx.has(o) || Ra(o, !1, e), Ra(o, !0, e));
        }));
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[xo] || ((n[xo] = !0), Ra("selectionchange", !1, n));
    }
  }
  function af(e, n, o, a) {
    switch (jd(n)) {
      case 1:
        var u = w0;
        break;
      case 4:
        u = S0;
        break;
      default:
        u = ma;
    }
    ((o = u.bind(null, n, o, e)),
      (u = void 0),
      !aa || (n !== "touchstart" && n !== "touchmove" && n !== "wheel") || (u = !0),
      a
        ? u !== void 0
          ? e.addEventListener(n, o, { capture: !0, passive: u })
          : e.addEventListener(n, o, !0)
        : u !== void 0
          ? e.addEventListener(n, o, { passive: u })
          : e.addEventListener(n, o, !1));
  }
  function Da(e, n, o, a, u) {
    var p = a;
    if ((n & 1) === 0 && (n & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var g = a.tag;
        if (g === 3 || g === 4) {
          var S = a.stateNode.containerInfo;
          if (S === u || (S.nodeType === 8 && S.parentNode === u)) break;
          if (g === 4)
            for (g = a.return; g !== null; ) {
              var C = g.tag;
              if (
                (C === 3 || C === 4) &&
                ((C = g.stateNode.containerInfo),
                C === u || (C.nodeType === 8 && C.parentNode === u))
              )
                return;
              g = g.return;
            }
          for (; S !== null; ) {
            if (((g = Vn(S)), g === null)) return;
            if (((C = g.tag), C === 5 || C === 6)) {
              a = p = g;
              continue e;
            }
            S = S.parentNode;
          }
        }
        a = a.return;
      }
    dd(function () {
      var R = p,
        z = ia(o),
        B = [];
      e: {
        var V = nf.get(e);
        if (V !== void 0) {
          var Y = va,
            q = e;
          switch (e) {
            case "keypress":
              if (po(o) === 0) break e;
            case "keydown":
            case "keyup":
              Y = _0;
              break;
            case "focusin":
              ((q = "focus"), (Y = Sa));
              break;
            case "focusout":
              ((q = "blur"), (Y = Sa));
              break;
            case "beforeblur":
            case "afterblur":
              Y = Sa;
              break;
            case "click":
              if (o.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Y = Rd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Y = b0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Y = V0;
              break;
            case Zd:
            case Jd:
            case ef:
              Y = P0;
              break;
            case tf:
              Y = B0;
              break;
            case "scroll":
              Y = k0;
              break;
            case "wheel":
              Y = H0;
              break;
            case "copy":
            case "cut":
            case "paste":
              Y = j0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Y = Od;
          }
          var te = (n & 4) !== 0,
            Fe = !te && e === "scroll",
            N = te ? (V !== null ? V + "Capture" : null) : V;
          te = [];
          for (var E = R, M; E !== null; ) {
            M = E;
            var U = M.stateNode;
            if (
              (M.tag === 5 &&
                U !== null &&
                ((M = U), N !== null && ((U = Qr(E, N)), U != null && te.push(gi(E, U, M)))),
              Fe)
            )
              break;
            E = E.return;
          }
          0 < te.length && ((V = new Y(V, q, null, o, z)), B.push({ event: V, listeners: te }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((V = e === "mouseover" || e === "pointerover"),
            (Y = e === "mouseout" || e === "pointerout"),
            V && o !== ra && (q = o.relatedTarget || o.fromElement) && (Vn(q) || q[Kt]))
          )
            break e;
          if (
            (Y || V) &&
            ((V =
              z.window === z
                ? z
                : (V = z.ownerDocument)
                  ? V.defaultView || V.parentWindow
                  : window),
            Y
              ? ((q = o.relatedTarget || o.toElement),
                (Y = R),
                (q = q ? Vn(q) : null),
                q !== null &&
                  ((Fe = In(q)), q !== Fe || (q.tag !== 5 && q.tag !== 6)) &&
                  (q = null))
              : ((Y = null), (q = R)),
            Y !== q)
          ) {
            if (
              ((te = Rd),
              (U = "onMouseLeave"),
              (N = "onMouseEnter"),
              (E = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((te = Od), (U = "onPointerLeave"), (N = "onPointerEnter"), (E = "pointer")),
              (Fe = Y == null ? V : yr(Y)),
              (M = q == null ? V : yr(q)),
              (V = new te(U, E + "leave", Y, o, z)),
              (V.target = Fe),
              (V.relatedTarget = M),
              (U = null),
              Vn(z) === R &&
                ((te = new te(N, E + "enter", q, o, z)),
                (te.target = M),
                (te.relatedTarget = Fe),
                (U = te)),
              (Fe = U),
              Y && q)
            )
              t: {
                for (te = Y, N = q, E = 0, M = te; M; M = mr(M)) E++;
                for (M = 0, U = N; U; U = mr(U)) M++;
                for (; 0 < E - M; ) ((te = mr(te)), E--);
                for (; 0 < M - E; ) ((N = mr(N)), M--);
                for (; E--; ) {
                  if (te === N || (N !== null && te === N.alternate)) break t;
                  ((te = mr(te)), (N = mr(N)));
                }
                te = null;
              }
            else te = null;
            (Y !== null && lf(B, V, Y, te, !1), q !== null && Fe !== null && lf(B, Fe, q, te, !0));
          }
        }
        e: {
          if (
            ((V = R ? yr(R) : window),
            (Y = V.nodeName && V.nodeName.toLowerCase()),
            Y === "select" || (Y === "input" && V.type === "file"))
          )
            var ne = q0;
          else if (zd(V))
            if (Wd) ne = ex;
            else {
              ne = Z0;
              var ie = Q0;
            }
          else
            (Y = V.nodeName) &&
              Y.toLowerCase() === "input" &&
              (V.type === "checkbox" || V.type === "radio") &&
              (ne = J0);
          if (ne && (ne = ne(e, R))) {
            Bd(B, ne, o, z);
            break e;
          }
          (ie && ie(e, V, R),
            e === "focusout" &&
              (ie = V._wrapperState) &&
              ie.controlled &&
              V.type === "number" &&
              Zs(V, "number", V.value));
        }
        switch (((ie = R ? yr(R) : window), e)) {
          case "focusin":
            (zd(ie) || ie.contentEditable === "true") && ((pr = ie), (Pa = R), (pi = null));
            break;
          case "focusout":
            pi = Pa = pr = null;
            break;
          case "mousedown":
            Na = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Na = !1), qd(B, o, z));
            break;
          case "selectionchange":
            if (rx) break;
          case "keydown":
          case "keyup":
            qd(B, o, z);
        }
        var oe;
        if (Ca)
          e: {
            switch (e) {
              case "compositionstart":
                var le = "onCompositionStart";
                break e;
              case "compositionend":
                le = "onCompositionEnd";
                break e;
              case "compositionupdate":
                le = "onCompositionUpdate";
                break e;
            }
            le = void 0;
          }
        else
          fr
            ? Id(e, o) && (le = "onCompositionEnd")
            : e === "keydown" && o.keyCode === 229 && (le = "onCompositionStart");
        (le &&
          (Fd &&
            o.locale !== "ko" &&
            (fr || le !== "onCompositionStart"
              ? le === "onCompositionEnd" && fr && (oe = Ad())
              : ((pn = z), (ya = "value" in pn ? pn.value : pn.textContent), (fr = !0))),
          (ie = wo(R, le)),
          0 < ie.length &&
            ((le = new Dd(le, e, null, o, z)),
            B.push({ event: le, listeners: ie }),
            oe ? (le.data = oe) : ((oe = Vd(o)), oe !== null && (le.data = oe)))),
          (oe = $0 ? G0(e, o) : Y0(e, o)) &&
            ((R = wo(R, "onBeforeInput")),
            0 < R.length &&
              ((z = new Dd("onBeforeInput", "beforeinput", null, o, z)),
              B.push({ event: z, listeners: R }),
              (z.data = oe))));
      }
      sf(B, n);
    });
  }
  function gi(e, n, o) {
    return { instance: e, listener: n, currentTarget: o };
  }
  function wo(e, n) {
    for (var o = n + "Capture", a = []; e !== null; ) {
      var u = e,
        p = u.stateNode;
      (u.tag === 5 &&
        p !== null &&
        ((u = p),
        (p = Qr(e, o)),
        p != null && a.unshift(gi(e, p, u)),
        (p = Qr(e, n)),
        p != null && a.push(gi(e, p, u))),
        (e = e.return));
    }
    return a;
  }
  function mr(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function lf(e, n, o, a, u) {
    for (var p = n._reactName, g = []; o !== null && o !== a; ) {
      var S = o,
        C = S.alternate,
        R = S.stateNode;
      if (C !== null && C === a) break;
      (S.tag === 5 &&
        R !== null &&
        ((S = R),
        u
          ? ((C = Qr(o, p)), C != null && g.unshift(gi(o, C, S)))
          : u || ((C = Qr(o, p)), C != null && g.push(gi(o, C, S)))),
        (o = o.return));
    }
    g.length !== 0 && e.push({ event: n, listeners: g });
  }
  var ax = /\r\n?/g,
    lx = /\u0000|\uFFFD/g;
  function uf(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        ax,
        `
`
      )
      .replace(lx, "");
  }
  function So(e, n, o) {
    if (((n = uf(n)), uf(e) !== n && o)) throw Error(i(425));
  }
  function ko() {}
  var Oa = null,
    Fa = null;
  function _a(e, n) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof n.children == "string" ||
      typeof n.children == "number" ||
      (typeof n.dangerouslySetInnerHTML == "object" &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var La = typeof setTimeout == "function" ? setTimeout : void 0,
    ux = typeof clearTimeout == "function" ? clearTimeout : void 0,
    cf = typeof Promise == "function" ? Promise : void 0,
    cx =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof cf < "u"
          ? function (e) {
              return cf.resolve(null).then(e).catch(dx);
            }
          : La;
  function dx(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ia(e, n) {
    var o = n,
      a = 0;
    do {
      var u = o.nextSibling;
      if ((e.removeChild(o), u && u.nodeType === 8))
        if (((o = u.data), o === "/$")) {
          if (a === 0) {
            (e.removeChild(u), si(n));
            return;
          }
          a--;
        } else (o !== "$" && o !== "$?" && o !== "$!") || a++;
      o = u;
    } while (o);
    si(n);
  }
  function mn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (((n = e.data), n === "$" || n === "$!" || n === "$?")) break;
        if (n === "/$") return null;
      }
    }
    return e;
  }
  function df(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var o = e.data;
        if (o === "$" || o === "$!" || o === "$?") {
          if (n === 0) return e;
          n--;
        } else o === "/$" && n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var gr = Math.random().toString(36).slice(2),
    zt = "__reactFiber$" + gr,
    yi = "__reactProps$" + gr,
    Kt = "__reactContainer$" + gr,
    Va = "__reactEvents$" + gr,
    fx = "__reactListeners$" + gr,
    px = "__reactHandles$" + gr;
  function Vn(e) {
    var n = e[zt];
    if (n) return n;
    for (var o = e.parentNode; o; ) {
      if ((n = o[Kt] || o[zt])) {
        if (((o = n.alternate), n.child !== null || (o !== null && o.child !== null)))
          for (e = df(e); e !== null; ) {
            if ((o = e[zt])) return o;
            e = df(e);
          }
        return n;
      }
      ((e = o), (o = e.parentNode));
    }
    return null;
  }
  function vi(e) {
    return (
      (e = e[zt] || e[Kt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
    );
  }
  function yr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Co(e) {
    return e[yi] || null;
  }
  var za = [],
    vr = -1;
  function gn(e) {
    return { current: e };
  }
  function Te(e) {
    0 > vr || ((e.current = za[vr]), (za[vr] = null), vr--);
  }
  function Ce(e, n) {
    (vr++, (za[vr] = e.current), (e.current = n));
  }
  var yn = {},
    et = gn(yn),
    ut = gn(!1),
    zn = yn;
  function xr(e, n) {
    var o = e.type.contextTypes;
    if (!o) return yn;
    var a = e.stateNode;
    if (a && a.__reactInternalMemoizedUnmaskedChildContext === n)
      return a.__reactInternalMemoizedMaskedChildContext;
    var u = {},
      p;
    for (p in o) u[p] = n[p];
    return (
      a &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = n),
        (e.__reactInternalMemoizedMaskedChildContext = u)),
      u
    );
  }
  function ct(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function bo() {
    (Te(ut), Te(et));
  }
  function ff(e, n, o) {
    if (et.current !== yn) throw Error(i(168));
    (Ce(et, n), Ce(ut, o));
  }
  function pf(e, n, o) {
    var a = e.stateNode;
    if (((n = n.childContextTypes), typeof a.getChildContext != "function")) return o;
    a = a.getChildContext();
    for (var u in a) if (!(u in n)) throw Error(i(108, we(e) || "Unknown", u));
    return D({}, o, a);
  }
  function Eo(e) {
    return (
      (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || yn),
      (zn = et.current),
      Ce(et, e),
      Ce(ut, ut.current),
      !0
    );
  }
  function hf(e, n, o) {
    var a = e.stateNode;
    if (!a) throw Error(i(169));
    (o
      ? ((e = pf(e, n, zn)),
        (a.__reactInternalMemoizedMergedChildContext = e),
        Te(ut),
        Te(et),
        Ce(et, e))
      : Te(ut),
      Ce(ut, o));
  }
  var qt = null,
    To = !1,
    Ba = !1;
  function mf(e) {
    qt === null ? (qt = [e]) : qt.push(e);
  }
  function hx(e) {
    ((To = !0), mf(e));
  }
  function vn() {
    if (!Ba && qt !== null) {
      Ba = !0;
      var e = 0,
        n = ke;
      try {
        var o = qt;
        for (ke = 1; e < o.length; e++) {
          var a = o[e];
          do a = a(!0);
          while (a !== null);
        }
        ((qt = null), (To = !1));
      } catch (u) {
        throw (qt !== null && (qt = qt.slice(e + 1)), gd(ua, vn), u);
      } finally {
        ((ke = n), (Ba = !1));
      }
    }
    return null;
  }
  var wr = [],
    Sr = 0,
    Po = null,
    No = 0,
    xt = [],
    wt = 0,
    Bn = null,
    Qt = 1,
    Zt = "";
  function Wn(e, n) {
    ((wr[Sr++] = No), (wr[Sr++] = Po), (Po = e), (No = n));
  }
  function gf(e, n, o) {
    ((xt[wt++] = Qt), (xt[wt++] = Zt), (xt[wt++] = Bn), (Bn = e));
    var a = Qt;
    e = Zt;
    var u = 32 - Pt(a) - 1;
    ((a &= ~(1 << u)), (o += 1));
    var p = 32 - Pt(n) + u;
    if (30 < p) {
      var g = u - (u % 5);
      ((p = (a & ((1 << g) - 1)).toString(32)),
        (a >>= g),
        (u -= g),
        (Qt = (1 << (32 - Pt(n) + u)) | (o << u) | a),
        (Zt = p + e));
    } else ((Qt = (1 << p) | (o << u) | a), (Zt = e));
  }
  function Wa(e) {
    e.return !== null && (Wn(e, 1), gf(e, 1, 0));
  }
  function Ha(e) {
    for (; e === Po; ) ((Po = wr[--Sr]), (wr[Sr] = null), (No = wr[--Sr]), (wr[Sr] = null));
    for (; e === Bn; )
      ((Bn = xt[--wt]),
        (xt[wt] = null),
        (Zt = xt[--wt]),
        (xt[wt] = null),
        (Qt = xt[--wt]),
        (xt[wt] = null));
  }
  var gt = null,
    yt = null,
    Ne = !1,
    jt = null;
  function yf(e, n) {
    var o = bt(5, null, null, 0);
    ((o.elementType = "DELETED"),
      (o.stateNode = n),
      (o.return = e),
      (n = e.deletions),
      n === null ? ((e.deletions = [o]), (e.flags |= 16)) : n.push(o));
  }
  function vf(e, n) {
    switch (e.tag) {
      case 5:
        var o = e.type;
        return (
          (n = n.nodeType !== 1 || o.toLowerCase() !== n.nodeName.toLowerCase() ? null : n),
          n !== null ? ((e.stateNode = n), (gt = e), (yt = mn(n.firstChild)), !0) : !1
        );
      case 6:
        return (
          (n = e.pendingProps === "" || n.nodeType !== 3 ? null : n),
          n !== null ? ((e.stateNode = n), (gt = e), (yt = null), !0) : !1
        );
      case 13:
        return (
          (n = n.nodeType !== 8 ? null : n),
          n !== null
            ? ((o = Bn !== null ? { id: Qt, overflow: Zt } : null),
              (e.memoizedState = { dehydrated: n, treeContext: o, retryLane: 1073741824 }),
              (o = bt(18, null, null, 0)),
              (o.stateNode = n),
              (o.return = e),
              (e.child = o),
              (gt = e),
              (yt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Ua(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function $a(e) {
    if (Ne) {
      var n = yt;
      if (n) {
        var o = n;
        if (!vf(e, n)) {
          if (Ua(e)) throw Error(i(418));
          n = mn(o.nextSibling);
          var a = gt;
          n && vf(e, n) ? yf(a, o) : ((e.flags = (e.flags & -4097) | 2), (Ne = !1), (gt = e));
        }
      } else {
        if (Ua(e)) throw Error(i(418));
        ((e.flags = (e.flags & -4097) | 2), (Ne = !1), (gt = e));
      }
    }
  }
  function xf(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    gt = e;
  }
  function jo(e) {
    if (e !== gt) return !1;
    if (!Ne) return (xf(e), (Ne = !0), !1);
    var n;
    if (
      ((n = e.tag !== 3) &&
        !(n = e.tag !== 5) &&
        ((n = e.type), (n = n !== "head" && n !== "body" && !_a(e.type, e.memoizedProps))),
      n && (n = yt))
    ) {
      if (Ua(e)) throw (wf(), Error(i(418)));
      for (; n; ) (yf(e, n), (n = mn(n.nextSibling)));
    }
    if ((xf(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(i(317));
      e: {
        for (e = e.nextSibling, n = 0; e; ) {
          if (e.nodeType === 8) {
            var o = e.data;
            if (o === "/$") {
              if (n === 0) {
                yt = mn(e.nextSibling);
                break e;
              }
              n--;
            } else (o !== "$" && o !== "$!" && o !== "$?") || n++;
          }
          e = e.nextSibling;
        }
        yt = null;
      }
    } else yt = gt ? mn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function wf() {
    for (var e = yt; e; ) e = mn(e.nextSibling);
  }
  function kr() {
    ((yt = gt = null), (Ne = !1));
  }
  function Ga(e) {
    jt === null ? (jt = [e]) : jt.push(e);
  }
  var mx = W.ReactCurrentBatchConfig;
  function xi(e, n, o) {
    if (((e = o.ref), e !== null && typeof e != "function" && typeof e != "object")) {
      if (o._owner) {
        if (((o = o._owner), o)) {
          if (o.tag !== 1) throw Error(i(309));
          var a = o.stateNode;
        }
        if (!a) throw Error(i(147, e));
        var u = a,
          p = "" + e;
        return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === p
          ? n.ref
          : ((n = function (g) {
              var S = u.refs;
              g === null ? delete S[p] : (S[p] = g);
            }),
            (n._stringRef = p),
            n);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!o._owner) throw Error(i(290, e));
    }
    return e;
  }
  function Ao(e, n) {
    throw (
      (e = Object.prototype.toString.call(n)),
      Error(
        i(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e)
      )
    );
  }
  function Sf(e) {
    var n = e._init;
    return n(e._payload);
  }
  function kf(e) {
    function n(N, E) {
      if (e) {
        var M = N.deletions;
        M === null ? ((N.deletions = [E]), (N.flags |= 16)) : M.push(E);
      }
    }
    function o(N, E) {
      if (!e) return null;
      for (; E !== null; ) (n(N, E), (E = E.sibling));
      return null;
    }
    function a(N, E) {
      for (N = new Map(); E !== null; )
        (E.key !== null ? N.set(E.key, E) : N.set(E.index, E), (E = E.sibling));
      return N;
    }
    function u(N, E) {
      return ((N = Tn(N, E)), (N.index = 0), (N.sibling = null), N);
    }
    function p(N, E, M) {
      return (
        (N.index = M),
        e
          ? ((M = N.alternate),
            M !== null ? ((M = M.index), M < E ? ((N.flags |= 2), E) : M) : ((N.flags |= 2), E))
          : ((N.flags |= 1048576), E)
      );
    }
    function g(N) {
      return (e && N.alternate === null && (N.flags |= 2), N);
    }
    function S(N, E, M, U) {
      return E === null || E.tag !== 6
        ? ((E = Ll(M, N.mode, U)), (E.return = N), E)
        : ((E = u(E, M)), (E.return = N), E);
    }
    function C(N, E, M, U) {
      var ne = M.type;
      return ne === G
        ? z(N, E, M.props.children, U, M.key)
        : E !== null &&
            (E.elementType === ne ||
              (typeof ne == "object" && ne !== null && ne.$$typeof === Se && Sf(ne) === E.type))
          ? ((U = u(E, M.props)), (U.ref = xi(N, E, M)), (U.return = N), U)
          : ((U = es(M.type, M.key, M.props, null, N.mode, U)),
            (U.ref = xi(N, E, M)),
            (U.return = N),
            U);
    }
    function R(N, E, M, U) {
      return E === null ||
        E.tag !== 4 ||
        E.stateNode.containerInfo !== M.containerInfo ||
        E.stateNode.implementation !== M.implementation
        ? ((E = Il(M, N.mode, U)), (E.return = N), E)
        : ((E = u(E, M.children || [])), (E.return = N), E);
    }
    function z(N, E, M, U, ne) {
      return E === null || E.tag !== 7
        ? ((E = qn(M, N.mode, U, ne)), (E.return = N), E)
        : ((E = u(E, M)), (E.return = N), E);
    }
    function B(N, E, M) {
      if ((typeof E == "string" && E !== "") || typeof E == "number")
        return ((E = Ll("" + E, N.mode, M)), (E.return = N), E);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case $:
            return (
              (M = es(E.type, E.key, E.props, null, N.mode, M)),
              (M.ref = xi(N, null, E)),
              (M.return = N),
              M
            );
          case ee:
            return ((E = Il(E, N.mode, M)), (E.return = N), E);
          case Se:
            var U = E._init;
            return B(N, U(E._payload), M);
        }
        if (Xr(E) || X(E)) return ((E = qn(E, N.mode, M, null)), (E.return = N), E);
        Ao(N, E);
      }
      return null;
    }
    function V(N, E, M, U) {
      var ne = E !== null ? E.key : null;
      if ((typeof M == "string" && M !== "") || typeof M == "number")
        return ne !== null ? null : S(N, E, "" + M, U);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case $:
            return M.key === ne ? C(N, E, M, U) : null;
          case ee:
            return M.key === ne ? R(N, E, M, U) : null;
          case Se:
            return ((ne = M._init), V(N, E, ne(M._payload), U));
        }
        if (Xr(M) || X(M)) return ne !== null ? null : z(N, E, M, U, null);
        Ao(N, M);
      }
      return null;
    }
    function Y(N, E, M, U, ne) {
      if ((typeof U == "string" && U !== "") || typeof U == "number")
        return ((N = N.get(M) || null), S(E, N, "" + U, ne));
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case $:
            return ((N = N.get(U.key === null ? M : U.key) || null), C(E, N, U, ne));
          case ee:
            return ((N = N.get(U.key === null ? M : U.key) || null), R(E, N, U, ne));
          case Se:
            var ie = U._init;
            return Y(N, E, M, ie(U._payload), ne);
        }
        if (Xr(U) || X(U)) return ((N = N.get(M) || null), z(E, N, U, ne, null));
        Ao(E, U);
      }
      return null;
    }
    function q(N, E, M, U) {
      for (
        var ne = null, ie = null, oe = E, le = (E = 0), Xe = null;
        oe !== null && le < M.length;
        le++
      ) {
        oe.index > le ? ((Xe = oe), (oe = null)) : (Xe = oe.sibling);
        var ye = V(N, oe, M[le], U);
        if (ye === null) {
          oe === null && (oe = Xe);
          break;
        }
        (e && oe && ye.alternate === null && n(N, oe),
          (E = p(ye, E, le)),
          ie === null ? (ne = ye) : (ie.sibling = ye),
          (ie = ye),
          (oe = Xe));
      }
      if (le === M.length) return (o(N, oe), Ne && Wn(N, le), ne);
      if (oe === null) {
        for (; le < M.length; le++)
          ((oe = B(N, M[le], U)),
            oe !== null &&
              ((E = p(oe, E, le)), ie === null ? (ne = oe) : (ie.sibling = oe), (ie = oe)));
        return (Ne && Wn(N, le), ne);
      }
      for (oe = a(N, oe); le < M.length; le++)
        ((Xe = Y(oe, N, le, M[le], U)),
          Xe !== null &&
            (e && Xe.alternate !== null && oe.delete(Xe.key === null ? le : Xe.key),
            (E = p(Xe, E, le)),
            ie === null ? (ne = Xe) : (ie.sibling = Xe),
            (ie = Xe)));
      return (
        e &&
          oe.forEach(function (Pn) {
            return n(N, Pn);
          }),
        Ne && Wn(N, le),
        ne
      );
    }
    function te(N, E, M, U) {
      var ne = X(M);
      if (typeof ne != "function") throw Error(i(150));
      if (((M = ne.call(M)), M == null)) throw Error(i(151));
      for (
        var ie = (ne = null), oe = E, le = (E = 0), Xe = null, ye = M.next();
        oe !== null && !ye.done;
        le++, ye = M.next()
      ) {
        oe.index > le ? ((Xe = oe), (oe = null)) : (Xe = oe.sibling);
        var Pn = V(N, oe, ye.value, U);
        if (Pn === null) {
          oe === null && (oe = Xe);
          break;
        }
        (e && oe && Pn.alternate === null && n(N, oe),
          (E = p(Pn, E, le)),
          ie === null ? (ne = Pn) : (ie.sibling = Pn),
          (ie = Pn),
          (oe = Xe));
      }
      if (ye.done) return (o(N, oe), Ne && Wn(N, le), ne);
      if (oe === null) {
        for (; !ye.done; le++, ye = M.next())
          ((ye = B(N, ye.value, U)),
            ye !== null &&
              ((E = p(ye, E, le)), ie === null ? (ne = ye) : (ie.sibling = ye), (ie = ye)));
        return (Ne && Wn(N, le), ne);
      }
      for (oe = a(N, oe); !ye.done; le++, ye = M.next())
        ((ye = Y(oe, N, le, ye.value, U)),
          ye !== null &&
            (e && ye.alternate !== null && oe.delete(ye.key === null ? le : ye.key),
            (E = p(ye, E, le)),
            ie === null ? (ne = ye) : (ie.sibling = ye),
            (ie = ye)));
      return (
        e &&
          oe.forEach(function (Xx) {
            return n(N, Xx);
          }),
        Ne && Wn(N, le),
        ne
      );
    }
    function Fe(N, E, M, U) {
      if (
        (typeof M == "object" &&
          M !== null &&
          M.type === G &&
          M.key === null &&
          (M = M.props.children),
        typeof M == "object" && M !== null)
      ) {
        switch (M.$$typeof) {
          case $:
            e: {
              for (var ne = M.key, ie = E; ie !== null; ) {
                if (ie.key === ne) {
                  if (((ne = M.type), ne === G)) {
                    if (ie.tag === 7) {
                      (o(N, ie.sibling), (E = u(ie, M.props.children)), (E.return = N), (N = E));
                      break e;
                    }
                  } else if (
                    ie.elementType === ne ||
                    (typeof ne == "object" &&
                      ne !== null &&
                      ne.$$typeof === Se &&
                      Sf(ne) === ie.type)
                  ) {
                    (o(N, ie.sibling),
                      (E = u(ie, M.props)),
                      (E.ref = xi(N, ie, M)),
                      (E.return = N),
                      (N = E));
                    break e;
                  }
                  o(N, ie);
                  break;
                } else n(N, ie);
                ie = ie.sibling;
              }
              M.type === G
                ? ((E = qn(M.props.children, N.mode, U, M.key)), (E.return = N), (N = E))
                : ((U = es(M.type, M.key, M.props, null, N.mode, U)),
                  (U.ref = xi(N, E, M)),
                  (U.return = N),
                  (N = U));
            }
            return g(N);
          case ee:
            e: {
              for (ie = M.key; E !== null; ) {
                if (E.key === ie)
                  if (
                    E.tag === 4 &&
                    E.stateNode.containerInfo === M.containerInfo &&
                    E.stateNode.implementation === M.implementation
                  ) {
                    (o(N, E.sibling), (E = u(E, M.children || [])), (E.return = N), (N = E));
                    break e;
                  } else {
                    o(N, E);
                    break;
                  }
                else n(N, E);
                E = E.sibling;
              }
              ((E = Il(M, N.mode, U)), (E.return = N), (N = E));
            }
            return g(N);
          case Se:
            return ((ie = M._init), Fe(N, E, ie(M._payload), U));
        }
        if (Xr(M)) return q(N, E, M, U);
        if (X(M)) return te(N, E, M, U);
        Ao(N, M);
      }
      return (typeof M == "string" && M !== "") || typeof M == "number"
        ? ((M = "" + M),
          E !== null && E.tag === 6
            ? (o(N, E.sibling), (E = u(E, M)), (E.return = N), (N = E))
            : (o(N, E), (E = Ll(M, N.mode, U)), (E.return = N), (N = E)),
          g(N))
        : o(N, E);
    }
    return Fe;
  }
  var Cr = kf(!0),
    Cf = kf(!1),
    Mo = gn(null),
    Ro = null,
    br = null,
    Ya = null;
  function Xa() {
    Ya = br = Ro = null;
  }
  function Ka(e) {
    var n = Mo.current;
    (Te(Mo), (e._currentValue = n));
  }
  function qa(e, n, o) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & n) !== n
          ? ((e.childLanes |= n), a !== null && (a.childLanes |= n))
          : a !== null && (a.childLanes & n) !== n && (a.childLanes |= n),
        e === o)
      )
        break;
      e = e.return;
    }
  }
  function Er(e, n) {
    ((Ro = e),
      (Ya = br = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & n) !== 0 && (dt = !0), (e.firstContext = null)));
  }
  function St(e) {
    var n = e._currentValue;
    if (Ya !== e)
      if (((e = { context: e, memoizedValue: n, next: null }), br === null)) {
        if (Ro === null) throw Error(i(308));
        ((br = e), (Ro.dependencies = { lanes: 0, firstContext: e }));
      } else br = br.next = e;
    return n;
  }
  var Hn = null;
  function Qa(e) {
    Hn === null ? (Hn = [e]) : Hn.push(e);
  }
  function bf(e, n, o, a) {
    var u = n.interleaved;
    return (
      u === null ? ((o.next = o), Qa(n)) : ((o.next = u.next), (u.next = o)),
      (n.interleaved = o),
      Jt(e, a)
    );
  }
  function Jt(e, n) {
    e.lanes |= n;
    var o = e.alternate;
    for (o !== null && (o.lanes |= n), o = e, e = e.return; e !== null; )
      ((e.childLanes |= n),
        (o = e.alternate),
        o !== null && (o.childLanes |= n),
        (o = e),
        (e = e.return));
    return o.tag === 3 ? o.stateNode : null;
  }
  var xn = !1;
  function Za(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Ef(e, n) {
    ((e = e.updateQueue),
      n.updateQueue === e &&
        (n.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function en(e, n) {
    return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null };
  }
  function wn(e, n, o) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (me & 2) !== 0)) {
      var u = a.pending;
      return (
        u === null ? (n.next = n) : ((n.next = u.next), (u.next = n)),
        (a.pending = n),
        Jt(e, o)
      );
    }
    return (
      (u = a.interleaved),
      u === null ? ((n.next = n), Qa(a)) : ((n.next = u.next), (u.next = n)),
      (a.interleaved = n),
      Jt(e, o)
    );
  }
  function Do(e, n, o) {
    if (((n = n.updateQueue), n !== null && ((n = n.shared), (o & 4194240) !== 0))) {
      var a = n.lanes;
      ((a &= e.pendingLanes), (o |= a), (n.lanes = o), fa(e, o));
    }
  }
  function Tf(e, n) {
    var o = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), o === a)) {
      var u = null,
        p = null;
      if (((o = o.firstBaseUpdate), o !== null)) {
        do {
          var g = {
            eventTime: o.eventTime,
            lane: o.lane,
            tag: o.tag,
            payload: o.payload,
            callback: o.callback,
            next: null,
          };
          (p === null ? (u = p = g) : (p = p.next = g), (o = o.next));
        } while (o !== null);
        p === null ? (u = p = n) : (p = p.next = n);
      } else u = p = n;
      ((o = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: p,
        shared: a.shared,
        effects: a.effects,
      }),
        (e.updateQueue = o));
      return;
    }
    ((e = o.lastBaseUpdate),
      e === null ? (o.firstBaseUpdate = n) : (e.next = n),
      (o.lastBaseUpdate = n));
  }
  function Oo(e, n, o, a) {
    var u = e.updateQueue;
    xn = !1;
    var p = u.firstBaseUpdate,
      g = u.lastBaseUpdate,
      S = u.shared.pending;
    if (S !== null) {
      u.shared.pending = null;
      var C = S,
        R = C.next;
      ((C.next = null), g === null ? (p = R) : (g.next = R), (g = C));
      var z = e.alternate;
      z !== null &&
        ((z = z.updateQueue),
        (S = z.lastBaseUpdate),
        S !== g && (S === null ? (z.firstBaseUpdate = R) : (S.next = R), (z.lastBaseUpdate = C)));
    }
    if (p !== null) {
      var B = u.baseState;
      ((g = 0), (z = R = C = null), (S = p));
      do {
        var V = S.lane,
          Y = S.eventTime;
        if ((a & V) === V) {
          z !== null &&
            (z = z.next =
              {
                eventTime: Y,
                lane: 0,
                tag: S.tag,
                payload: S.payload,
                callback: S.callback,
                next: null,
              });
          e: {
            var q = e,
              te = S;
            switch (((V = n), (Y = o), te.tag)) {
              case 1:
                if (((q = te.payload), typeof q == "function")) {
                  B = q.call(Y, B, V);
                  break e;
                }
                B = q;
                break e;
              case 3:
                q.flags = (q.flags & -65537) | 128;
              case 0:
                if (
                  ((q = te.payload), (V = typeof q == "function" ? q.call(Y, B, V) : q), V == null)
                )
                  break e;
                B = D({}, B, V);
                break e;
              case 2:
                xn = !0;
            }
          }
          S.callback !== null &&
            S.lane !== 0 &&
            ((e.flags |= 64), (V = u.effects), V === null ? (u.effects = [S]) : V.push(S));
        } else
          ((Y = {
            eventTime: Y,
            lane: V,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null,
          }),
            z === null ? ((R = z = Y), (C = B)) : (z = z.next = Y),
            (g |= V));
        if (((S = S.next), S === null)) {
          if (((S = u.shared.pending), S === null)) break;
          ((V = S),
            (S = V.next),
            (V.next = null),
            (u.lastBaseUpdate = V),
            (u.shared.pending = null));
        }
      } while (!0);
      if (
        (z === null && (C = B),
        (u.baseState = C),
        (u.firstBaseUpdate = R),
        (u.lastBaseUpdate = z),
        (n = u.shared.interleaved),
        n !== null)
      ) {
        u = n;
        do ((g |= u.lane), (u = u.next));
        while (u !== n);
      } else p === null && (u.shared.lanes = 0);
      ((Gn |= g), (e.lanes = g), (e.memoizedState = B));
    }
  }
  function Pf(e, n, o) {
    if (((e = n.effects), (n.effects = null), e !== null))
      for (n = 0; n < e.length; n++) {
        var a = e[n],
          u = a.callback;
        if (u !== null) {
          if (((a.callback = null), (a = o), typeof u != "function")) throw Error(i(191, u));
          u.call(a);
        }
      }
  }
  var wi = {},
    Bt = gn(wi),
    Si = gn(wi),
    ki = gn(wi);
  function Un(e) {
    if (e === wi) throw Error(i(174));
    return e;
  }
  function Ja(e, n) {
    switch ((Ce(ki, n), Ce(Si, e), Ce(Bt, wi), (e = n.nodeType), e)) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : ea(null, "");
        break;
      default:
        ((e = e === 8 ? n.parentNode : n),
          (n = e.namespaceURI || null),
          (e = e.tagName),
          (n = ea(n, e)));
    }
    (Te(Bt), Ce(Bt, n));
  }
  function Tr() {
    (Te(Bt), Te(Si), Te(ki));
  }
  function Nf(e) {
    Un(ki.current);
    var n = Un(Bt.current),
      o = ea(n, e.type);
    n !== o && (Ce(Si, e), Ce(Bt, o));
  }
  function el(e) {
    Si.current === e && (Te(Bt), Te(Si));
  }
  var je = gn(0);
  function Fo(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var o = n.memoizedState;
        if (o !== null && ((o = o.dehydrated), o === null || o.data === "$?" || o.data === "$!"))
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
    return null;
  }
  var tl = [];
  function nl() {
    for (var e = 0; e < tl.length; e++) tl[e]._workInProgressVersionPrimary = null;
    tl.length = 0;
  }
  var _o = W.ReactCurrentDispatcher,
    rl = W.ReactCurrentBatchConfig,
    $n = 0,
    Ae = null,
    We = null,
    Ge = null,
    Lo = !1,
    Ci = !1,
    bi = 0,
    gx = 0;
  function tt() {
    throw Error(i(321));
  }
  function il(e, n) {
    if (n === null) return !1;
    for (var o = 0; o < n.length && o < e.length; o++) if (!Nt(e[o], n[o])) return !1;
    return !0;
  }
  function ol(e, n, o, a, u, p) {
    if (
      (($n = p),
      (Ae = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (_o.current = e === null || e.memoizedState === null ? wx : Sx),
      (e = o(a, u)),
      Ci)
    ) {
      p = 0;
      do {
        if (((Ci = !1), (bi = 0), 25 <= p)) throw Error(i(301));
        ((p += 1), (Ge = We = null), (n.updateQueue = null), (_o.current = kx), (e = o(a, u)));
      } while (Ci);
    }
    if (
      ((_o.current = zo),
      (n = We !== null && We.next !== null),
      ($n = 0),
      (Ge = We = Ae = null),
      (Lo = !1),
      n)
    )
      throw Error(i(300));
    return e;
  }
  function sl() {
    var e = bi !== 0;
    return ((bi = 0), e);
  }
  function Wt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Ge === null ? (Ae.memoizedState = Ge = e) : (Ge = Ge.next = e), Ge);
  }
  function kt() {
    if (We === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = We.next;
    var n = Ge === null ? Ae.memoizedState : Ge.next;
    if (n !== null) ((Ge = n), (We = e));
    else {
      if (e === null) throw Error(i(310));
      ((We = e),
        (e = {
          memoizedState: We.memoizedState,
          baseState: We.baseState,
          baseQueue: We.baseQueue,
          queue: We.queue,
          next: null,
        }),
        Ge === null ? (Ae.memoizedState = Ge = e) : (Ge = Ge.next = e));
    }
    return Ge;
  }
  function Ei(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function al(e) {
    var n = kt(),
      o = n.queue;
    if (o === null) throw Error(i(311));
    o.lastRenderedReducer = e;
    var a = We,
      u = a.baseQueue,
      p = o.pending;
    if (p !== null) {
      if (u !== null) {
        var g = u.next;
        ((u.next = p.next), (p.next = g));
      }
      ((a.baseQueue = u = p), (o.pending = null));
    }
    if (u !== null) {
      ((p = u.next), (a = a.baseState));
      var S = (g = null),
        C = null,
        R = p;
      do {
        var z = R.lane;
        if (($n & z) === z)
          (C !== null &&
            (C = C.next =
              {
                lane: 0,
                action: R.action,
                hasEagerState: R.hasEagerState,
                eagerState: R.eagerState,
                next: null,
              }),
            (a = R.hasEagerState ? R.eagerState : e(a, R.action)));
        else {
          var B = {
            lane: z,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null,
          };
          (C === null ? ((S = C = B), (g = a)) : (C = C.next = B), (Ae.lanes |= z), (Gn |= z));
        }
        R = R.next;
      } while (R !== null && R !== p);
      (C === null ? (g = a) : (C.next = S),
        Nt(a, n.memoizedState) || (dt = !0),
        (n.memoizedState = a),
        (n.baseState = g),
        (n.baseQueue = C),
        (o.lastRenderedState = a));
    }
    if (((e = o.interleaved), e !== null)) {
      u = e;
      do ((p = u.lane), (Ae.lanes |= p), (Gn |= p), (u = u.next));
      while (u !== e);
    } else u === null && (o.lanes = 0);
    return [n.memoizedState, o.dispatch];
  }
  function ll(e) {
    var n = kt(),
      o = n.queue;
    if (o === null) throw Error(i(311));
    o.lastRenderedReducer = e;
    var a = o.dispatch,
      u = o.pending,
      p = n.memoizedState;
    if (u !== null) {
      o.pending = null;
      var g = (u = u.next);
      do ((p = e(p, g.action)), (g = g.next));
      while (g !== u);
      (Nt(p, n.memoizedState) || (dt = !0),
        (n.memoizedState = p),
        n.baseQueue === null && (n.baseState = p),
        (o.lastRenderedState = p));
    }
    return [p, a];
  }
  function jf() {}
  function Af(e, n) {
    var o = Ae,
      a = kt(),
      u = n(),
      p = !Nt(a.memoizedState, u);
    if (
      (p && ((a.memoizedState = u), (dt = !0)),
      (a = a.queue),
      ul(Df.bind(null, o, a, e), [e]),
      a.getSnapshot !== n || p || (Ge !== null && Ge.memoizedState.tag & 1))
    ) {
      if (((o.flags |= 2048), Ti(9, Rf.bind(null, o, a, u, n), void 0, null), Ye === null))
        throw Error(i(349));
      ($n & 30) !== 0 || Mf(o, n, u);
    }
    return u;
  }
  function Mf(e, n, o) {
    ((e.flags |= 16384),
      (e = { getSnapshot: n, value: o }),
      (n = Ae.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }), (Ae.updateQueue = n), (n.stores = [e]))
        : ((o = n.stores), o === null ? (n.stores = [e]) : o.push(e)));
  }
  function Rf(e, n, o, a) {
    ((n.value = o), (n.getSnapshot = a), Of(n) && Ff(e));
  }
  function Df(e, n, o) {
    return o(function () {
      Of(n) && Ff(e);
    });
  }
  function Of(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var o = n();
      return !Nt(e, o);
    } catch {
      return !0;
    }
  }
  function Ff(e) {
    var n = Jt(e, 1);
    n !== null && Dt(n, e, 1, -1);
  }
  function _f(e) {
    var n = Wt();
    return (
      typeof e == "function" && (e = e()),
      (n.memoizedState = n.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ei,
        lastRenderedState: e,
      }),
      (n.queue = e),
      (e = e.dispatch = xx.bind(null, Ae, e)),
      [n.memoizedState, e]
    );
  }
  function Ti(e, n, o, a) {
    return (
      (e = { tag: e, create: n, destroy: o, deps: a, next: null }),
      (n = Ae.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (Ae.updateQueue = n),
          (n.lastEffect = e.next = e))
        : ((o = n.lastEffect),
          o === null
            ? (n.lastEffect = e.next = e)
            : ((a = o.next), (o.next = e), (e.next = a), (n.lastEffect = e))),
      e
    );
  }
  function Lf() {
    return kt().memoizedState;
  }
  function Io(e, n, o, a) {
    var u = Wt();
    ((Ae.flags |= e), (u.memoizedState = Ti(1 | n, o, void 0, a === void 0 ? null : a)));
  }
  function Vo(e, n, o, a) {
    var u = kt();
    a = a === void 0 ? null : a;
    var p = void 0;
    if (We !== null) {
      var g = We.memoizedState;
      if (((p = g.destroy), a !== null && il(a, g.deps))) {
        u.memoizedState = Ti(n, o, p, a);
        return;
      }
    }
    ((Ae.flags |= e), (u.memoizedState = Ti(1 | n, o, p, a)));
  }
  function If(e, n) {
    return Io(8390656, 8, e, n);
  }
  function ul(e, n) {
    return Vo(2048, 8, e, n);
  }
  function Vf(e, n) {
    return Vo(4, 2, e, n);
  }
  function zf(e, n) {
    return Vo(4, 4, e, n);
  }
  function Bf(e, n) {
    if (typeof n == "function")
      return (
        (e = e()),
        n(e),
        function () {
          n(null);
        }
      );
    if (n != null)
      return (
        (e = e()),
        (n.current = e),
        function () {
          n.current = null;
        }
      );
  }
  function Wf(e, n, o) {
    return ((o = o != null ? o.concat([e]) : null), Vo(4, 4, Bf.bind(null, n, e), o));
  }
  function cl() {}
  function Hf(e, n) {
    var o = kt();
    n = n === void 0 ? null : n;
    var a = o.memoizedState;
    return a !== null && n !== null && il(n, a[1]) ? a[0] : ((o.memoizedState = [e, n]), e);
  }
  function Uf(e, n) {
    var o = kt();
    n = n === void 0 ? null : n;
    var a = o.memoizedState;
    return a !== null && n !== null && il(n, a[1])
      ? a[0]
      : ((e = e()), (o.memoizedState = [e, n]), e);
  }
  function $f(e, n, o) {
    return ($n & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (dt = !0)), (e.memoizedState = o))
      : (Nt(o, n) || ((o = wd()), (Ae.lanes |= o), (Gn |= o), (e.baseState = !0)), n);
  }
  function yx(e, n) {
    var o = ke;
    ((ke = o !== 0 && 4 > o ? o : 4), e(!0));
    var a = rl.transition;
    rl.transition = {};
    try {
      (e(!1), n());
    } finally {
      ((ke = o), (rl.transition = a));
    }
  }
  function Gf() {
    return kt().memoizedState;
  }
  function vx(e, n, o) {
    var a = bn(e);
    if (((o = { lane: a, action: o, hasEagerState: !1, eagerState: null, next: null }), Yf(e)))
      Xf(n, o);
    else if (((o = bf(e, n, o, a)), o !== null)) {
      var u = st();
      (Dt(o, e, a, u), Kf(o, n, a));
    }
  }
  function xx(e, n, o) {
    var a = bn(e),
      u = { lane: a, action: o, hasEagerState: !1, eagerState: null, next: null };
    if (Yf(e)) Xf(n, u);
    else {
      var p = e.alternate;
      if (
        e.lanes === 0 &&
        (p === null || p.lanes === 0) &&
        ((p = n.lastRenderedReducer), p !== null)
      )
        try {
          var g = n.lastRenderedState,
            S = p(g, o);
          if (((u.hasEagerState = !0), (u.eagerState = S), Nt(S, g))) {
            var C = n.interleaved;
            (C === null ? ((u.next = u), Qa(n)) : ((u.next = C.next), (C.next = u)),
              (n.interleaved = u));
            return;
          }
        } catch {
        } finally {
        }
      ((o = bf(e, n, u, a)), o !== null && ((u = st()), Dt(o, e, a, u), Kf(o, n, a)));
    }
  }
  function Yf(e) {
    var n = e.alternate;
    return e === Ae || (n !== null && n === Ae);
  }
  function Xf(e, n) {
    Ci = Lo = !0;
    var o = e.pending;
    (o === null ? (n.next = n) : ((n.next = o.next), (o.next = n)), (e.pending = n));
  }
  function Kf(e, n, o) {
    if ((o & 4194240) !== 0) {
      var a = n.lanes;
      ((a &= e.pendingLanes), (o |= a), (n.lanes = o), fa(e, o));
    }
  }
  var zo = {
      readContext: St,
      useCallback: tt,
      useContext: tt,
      useEffect: tt,
      useImperativeHandle: tt,
      useInsertionEffect: tt,
      useLayoutEffect: tt,
      useMemo: tt,
      useReducer: tt,
      useRef: tt,
      useState: tt,
      useDebugValue: tt,
      useDeferredValue: tt,
      useTransition: tt,
      useMutableSource: tt,
      useSyncExternalStore: tt,
      useId: tt,
      unstable_isNewReconciler: !1,
    },
    wx = {
      readContext: St,
      useCallback: function (e, n) {
        return ((Wt().memoizedState = [e, n === void 0 ? null : n]), e);
      },
      useContext: St,
      useEffect: If,
      useImperativeHandle: function (e, n, o) {
        return ((o = o != null ? o.concat([e]) : null), Io(4194308, 4, Bf.bind(null, n, e), o));
      },
      useLayoutEffect: function (e, n) {
        return Io(4194308, 4, e, n);
      },
      useInsertionEffect: function (e, n) {
        return Io(4, 2, e, n);
      },
      useMemo: function (e, n) {
        var o = Wt();
        return ((n = n === void 0 ? null : n), (e = e()), (o.memoizedState = [e, n]), e);
      },
      useReducer: function (e, n, o) {
        var a = Wt();
        return (
          (n = o !== void 0 ? o(n) : n),
          (a.memoizedState = a.baseState = n),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (a.queue = e),
          (e = e.dispatch = vx.bind(null, Ae, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var n = Wt();
        return ((e = { current: e }), (n.memoizedState = e));
      },
      useState: _f,
      useDebugValue: cl,
      useDeferredValue: function (e) {
        return (Wt().memoizedState = e);
      },
      useTransition: function () {
        var e = _f(!1),
          n = e[0];
        return ((e = yx.bind(null, e[1])), (Wt().memoizedState = e), [n, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, n, o) {
        var a = Ae,
          u = Wt();
        if (Ne) {
          if (o === void 0) throw Error(i(407));
          o = o();
        } else {
          if (((o = n()), Ye === null)) throw Error(i(349));
          ($n & 30) !== 0 || Mf(a, n, o);
        }
        u.memoizedState = o;
        var p = { value: o, getSnapshot: n };
        return (
          (u.queue = p),
          If(Df.bind(null, a, p, e), [e]),
          (a.flags |= 2048),
          Ti(9, Rf.bind(null, a, p, o, n), void 0, null),
          o
        );
      },
      useId: function () {
        var e = Wt(),
          n = Ye.identifierPrefix;
        if (Ne) {
          var o = Zt,
            a = Qt;
          ((o = (a & ~(1 << (32 - Pt(a) - 1))).toString(32) + o),
            (n = ":" + n + "R" + o),
            (o = bi++),
            0 < o && (n += "H" + o.toString(32)),
            (n += ":"));
        } else ((o = gx++), (n = ":" + n + "r" + o.toString(32) + ":"));
        return (e.memoizedState = n);
      },
      unstable_isNewReconciler: !1,
    },
    Sx = {
      readContext: St,
      useCallback: Hf,
      useContext: St,
      useEffect: ul,
      useImperativeHandle: Wf,
      useInsertionEffect: Vf,
      useLayoutEffect: zf,
      useMemo: Uf,
      useReducer: al,
      useRef: Lf,
      useState: function () {
        return al(Ei);
      },
      useDebugValue: cl,
      useDeferredValue: function (e) {
        var n = kt();
        return $f(n, We.memoizedState, e);
      },
      useTransition: function () {
        var e = al(Ei)[0],
          n = kt().memoizedState;
        return [e, n];
      },
      useMutableSource: jf,
      useSyncExternalStore: Af,
      useId: Gf,
      unstable_isNewReconciler: !1,
    },
    kx = {
      readContext: St,
      useCallback: Hf,
      useContext: St,
      useEffect: ul,
      useImperativeHandle: Wf,
      useInsertionEffect: Vf,
      useLayoutEffect: zf,
      useMemo: Uf,
      useReducer: ll,
      useRef: Lf,
      useState: function () {
        return ll(Ei);
      },
      useDebugValue: cl,
      useDeferredValue: function (e) {
        var n = kt();
        return We === null ? (n.memoizedState = e) : $f(n, We.memoizedState, e);
      },
      useTransition: function () {
        var e = ll(Ei)[0],
          n = kt().memoizedState;
        return [e, n];
      },
      useMutableSource: jf,
      useSyncExternalStore: Af,
      useId: Gf,
      unstable_isNewReconciler: !1,
    };
  function At(e, n) {
    if (e && e.defaultProps) {
      ((n = D({}, n)), (e = e.defaultProps));
      for (var o in e) n[o] === void 0 && (n[o] = e[o]);
      return n;
    }
    return n;
  }
  function dl(e, n, o, a) {
    ((n = e.memoizedState),
      (o = o(a, n)),
      (o = o == null ? n : D({}, n, o)),
      (e.memoizedState = o),
      e.lanes === 0 && (e.updateQueue.baseState = o));
  }
  var Bo = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? In(e) === e : !1;
    },
    enqueueSetState: function (e, n, o) {
      e = e._reactInternals;
      var a = st(),
        u = bn(e),
        p = en(a, u);
      ((p.payload = n),
        o != null && (p.callback = o),
        (n = wn(e, p, u)),
        n !== null && (Dt(n, e, u, a), Do(n, e, u)));
    },
    enqueueReplaceState: function (e, n, o) {
      e = e._reactInternals;
      var a = st(),
        u = bn(e),
        p = en(a, u);
      ((p.tag = 1),
        (p.payload = n),
        o != null && (p.callback = o),
        (n = wn(e, p, u)),
        n !== null && (Dt(n, e, u, a), Do(n, e, u)));
    },
    enqueueForceUpdate: function (e, n) {
      e = e._reactInternals;
      var o = st(),
        a = bn(e),
        u = en(o, a);
      ((u.tag = 2),
        n != null && (u.callback = n),
        (n = wn(e, u, a)),
        n !== null && (Dt(n, e, a, o), Do(n, e, a)));
    },
  };
  function qf(e, n, o, a, u, p, g) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, p, g)
        : n.prototype && n.prototype.isPureReactComponent
          ? !fi(o, a) || !fi(u, p)
          : !0
    );
  }
  function Qf(e, n, o) {
    var a = !1,
      u = yn,
      p = n.contextType;
    return (
      typeof p == "object" && p !== null
        ? (p = St(p))
        : ((u = ct(n) ? zn : et.current),
          (a = n.contextTypes),
          (p = (a = a != null) ? xr(e, u) : yn)),
      (n = new n(o, p)),
      (e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
      (n.updater = Bo),
      (e.stateNode = n),
      (n._reactInternals = e),
      a &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = u),
        (e.__reactInternalMemoizedMaskedChildContext = p)),
      n
    );
  }
  function Zf(e, n, o, a) {
    ((e = n.state),
      typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(o, a),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(o, a),
      n.state !== e && Bo.enqueueReplaceState(n, n.state, null));
  }
  function fl(e, n, o, a) {
    var u = e.stateNode;
    ((u.props = o), (u.state = e.memoizedState), (u.refs = {}), Za(e));
    var p = n.contextType;
    (typeof p == "object" && p !== null
      ? (u.context = St(p))
      : ((p = ct(n) ? zn : et.current), (u.context = xr(e, p))),
      (u.state = e.memoizedState),
      (p = n.getDerivedStateFromProps),
      typeof p == "function" && (dl(e, n, p, o), (u.state = e.memoizedState)),
      typeof n.getDerivedStateFromProps == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function" ||
        (typeof u.UNSAFE_componentWillMount != "function" &&
          typeof u.componentWillMount != "function") ||
        ((n = u.state),
        typeof u.componentWillMount == "function" && u.componentWillMount(),
        typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(),
        n !== u.state && Bo.enqueueReplaceState(u, u.state, null),
        Oo(e, o, u, a),
        (u.state = e.memoizedState)),
      typeof u.componentDidMount == "function" && (e.flags |= 4194308));
  }
  function Pr(e, n) {
    try {
      var o = "",
        a = n;
      do ((o += se(a)), (a = a.return));
      while (a);
      var u = o;
    } catch (p) {
      u =
        `
Error generating stack: ` +
        p.message +
        `
` +
        p.stack;
    }
    return { value: e, source: n, stack: u, digest: null };
  }
  function pl(e, n, o) {
    return { value: e, source: null, stack: o ?? null, digest: n ?? null };
  }
  function hl(e, n) {
    try {
      console.error(n.value);
    } catch (o) {
      setTimeout(function () {
        throw o;
      });
    }
  }
  var Cx = typeof WeakMap == "function" ? WeakMap : Map;
  function Jf(e, n, o) {
    ((o = en(-1, o)), (o.tag = 3), (o.payload = { element: null }));
    var a = n.value;
    return (
      (o.callback = function () {
        (Xo || ((Xo = !0), (jl = a)), hl(e, n));
      }),
      o
    );
  }
  function ep(e, n, o) {
    ((o = en(-1, o)), (o.tag = 3));
    var a = e.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = n.value;
      ((o.payload = function () {
        return a(u);
      }),
        (o.callback = function () {
          hl(e, n);
        }));
    }
    var p = e.stateNode;
    return (
      p !== null &&
        typeof p.componentDidCatch == "function" &&
        (o.callback = function () {
          (hl(e, n),
            typeof a != "function" && (kn === null ? (kn = new Set([this])) : kn.add(this)));
          var g = n.stack;
          this.componentDidCatch(n.value, { componentStack: g !== null ? g : "" });
        }),
      o
    );
  }
  function tp(e, n, o) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Cx();
      var u = new Set();
      a.set(n, u);
    } else ((u = a.get(n)), u === void 0 && ((u = new Set()), a.set(n, u)));
    u.has(o) || (u.add(o), (e = Lx.bind(null, e, n, o)), n.then(e, e));
  }
  function np(e) {
    do {
      var n;
      if (
        ((n = e.tag === 13) &&
          ((n = e.memoizedState), (n = n !== null ? n.dehydrated !== null : !0)),
        n)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function rp(e, n, o, a, u) {
    return (e.mode & 1) === 0
      ? (e === n
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (o.flags |= 131072),
            (o.flags &= -52805),
            o.tag === 1 &&
              (o.alternate === null ? (o.tag = 17) : ((n = en(-1, 1)), (n.tag = 2), wn(o, n, 1))),
            (o.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = u), e);
  }
  var bx = W.ReactCurrentOwner,
    dt = !1;
  function ot(e, n, o, a) {
    n.child = e === null ? Cf(n, null, o, a) : Cr(n, e.child, o, a);
  }
  function ip(e, n, o, a, u) {
    o = o.render;
    var p = n.ref;
    return (
      Er(n, u),
      (a = ol(e, n, o, a, p, u)),
      (o = sl()),
      e !== null && !dt
        ? ((n.updateQueue = e.updateQueue), (n.flags &= -2053), (e.lanes &= ~u), tn(e, n, u))
        : (Ne && o && Wa(n), (n.flags |= 1), ot(e, n, a, u), n.child)
    );
  }
  function op(e, n, o, a, u) {
    if (e === null) {
      var p = o.type;
      return typeof p == "function" &&
        !_l(p) &&
        p.defaultProps === void 0 &&
        o.compare === null &&
        o.defaultProps === void 0
        ? ((n.tag = 15), (n.type = p), sp(e, n, p, a, u))
        : ((e = es(o.type, null, a, n, n.mode, u)), (e.ref = n.ref), (e.return = n), (n.child = e));
    }
    if (((p = e.child), (e.lanes & u) === 0)) {
      var g = p.memoizedProps;
      if (((o = o.compare), (o = o !== null ? o : fi), o(g, a) && e.ref === n.ref))
        return tn(e, n, u);
    }
    return ((n.flags |= 1), (e = Tn(p, a)), (e.ref = n.ref), (e.return = n), (n.child = e));
  }
  function sp(e, n, o, a, u) {
    if (e !== null) {
      var p = e.memoizedProps;
      if (fi(p, a) && e.ref === n.ref)
        if (((dt = !1), (n.pendingProps = a = p), (e.lanes & u) !== 0))
          (e.flags & 131072) !== 0 && (dt = !0);
        else return ((n.lanes = e.lanes), tn(e, n, u));
    }
    return ml(e, n, o, a, u);
  }
  function ap(e, n, o) {
    var a = n.pendingProps,
      u = a.children,
      p = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden")
      if ((n.mode & 1) === 0)
        ((n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          Ce(jr, vt),
          (vt |= o));
      else {
        if ((o & 1073741824) === 0)
          return (
            (e = p !== null ? p.baseLanes | o : o),
            (n.lanes = n.childLanes = 1073741824),
            (n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
            (n.updateQueue = null),
            Ce(jr, vt),
            (vt |= e),
            null
          );
        ((n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          (a = p !== null ? p.baseLanes : o),
          Ce(jr, vt),
          (vt |= a));
      }
    else
      (p !== null ? ((a = p.baseLanes | o), (n.memoizedState = null)) : (a = o),
        Ce(jr, vt),
        (vt |= a));
    return (ot(e, n, u, o), n.child);
  }
  function lp(e, n) {
    var o = n.ref;
    ((e === null && o !== null) || (e !== null && e.ref !== o)) &&
      ((n.flags |= 512), (n.flags |= 2097152));
  }
  function ml(e, n, o, a, u) {
    var p = ct(o) ? zn : et.current;
    return (
      (p = xr(n, p)),
      Er(n, u),
      (o = ol(e, n, o, a, p, u)),
      (a = sl()),
      e !== null && !dt
        ? ((n.updateQueue = e.updateQueue), (n.flags &= -2053), (e.lanes &= ~u), tn(e, n, u))
        : (Ne && a && Wa(n), (n.flags |= 1), ot(e, n, o, u), n.child)
    );
  }
  function up(e, n, o, a, u) {
    if (ct(o)) {
      var p = !0;
      Eo(n);
    } else p = !1;
    if ((Er(n, u), n.stateNode === null)) (Ho(e, n), Qf(n, o, a), fl(n, o, a, u), (a = !0));
    else if (e === null) {
      var g = n.stateNode,
        S = n.memoizedProps;
      g.props = S;
      var C = g.context,
        R = o.contextType;
      typeof R == "object" && R !== null
        ? (R = St(R))
        : ((R = ct(o) ? zn : et.current), (R = xr(n, R)));
      var z = o.getDerivedStateFromProps,
        B = typeof z == "function" || typeof g.getSnapshotBeforeUpdate == "function";
      (B ||
        (typeof g.UNSAFE_componentWillReceiveProps != "function" &&
          typeof g.componentWillReceiveProps != "function") ||
        ((S !== a || C !== R) && Zf(n, g, a, R)),
        (xn = !1));
      var V = n.memoizedState;
      ((g.state = V),
        Oo(n, a, g, u),
        (C = n.memoizedState),
        S !== a || V !== C || ut.current || xn
          ? (typeof z == "function" && (dl(n, o, z, a), (C = n.memoizedState)),
            (S = xn || qf(n, o, S, a, V, C, R))
              ? (B ||
                  (typeof g.UNSAFE_componentWillMount != "function" &&
                    typeof g.componentWillMount != "function") ||
                  (typeof g.componentWillMount == "function" && g.componentWillMount(),
                  typeof g.UNSAFE_componentWillMount == "function" &&
                    g.UNSAFE_componentWillMount()),
                typeof g.componentDidMount == "function" && (n.flags |= 4194308))
              : (typeof g.componentDidMount == "function" && (n.flags |= 4194308),
                (n.memoizedProps = a),
                (n.memoizedState = C)),
            (g.props = a),
            (g.state = C),
            (g.context = R),
            (a = S))
          : (typeof g.componentDidMount == "function" && (n.flags |= 4194308), (a = !1)));
    } else {
      ((g = n.stateNode),
        Ef(e, n),
        (S = n.memoizedProps),
        (R = n.type === n.elementType ? S : At(n.type, S)),
        (g.props = R),
        (B = n.pendingProps),
        (V = g.context),
        (C = o.contextType),
        typeof C == "object" && C !== null
          ? (C = St(C))
          : ((C = ct(o) ? zn : et.current), (C = xr(n, C))));
      var Y = o.getDerivedStateFromProps;
      ((z = typeof Y == "function" || typeof g.getSnapshotBeforeUpdate == "function") ||
        (typeof g.UNSAFE_componentWillReceiveProps != "function" &&
          typeof g.componentWillReceiveProps != "function") ||
        ((S !== B || V !== C) && Zf(n, g, a, C)),
        (xn = !1),
        (V = n.memoizedState),
        (g.state = V),
        Oo(n, a, g, u));
      var q = n.memoizedState;
      S !== B || V !== q || ut.current || xn
        ? (typeof Y == "function" && (dl(n, o, Y, a), (q = n.memoizedState)),
          (R = xn || qf(n, o, R, a, V, q, C) || !1)
            ? (z ||
                (typeof g.UNSAFE_componentWillUpdate != "function" &&
                  typeof g.componentWillUpdate != "function") ||
                (typeof g.componentWillUpdate == "function" && g.componentWillUpdate(a, q, C),
                typeof g.UNSAFE_componentWillUpdate == "function" &&
                  g.UNSAFE_componentWillUpdate(a, q, C)),
              typeof g.componentDidUpdate == "function" && (n.flags |= 4),
              typeof g.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024))
            : (typeof g.componentDidUpdate != "function" ||
                (S === e.memoizedProps && V === e.memoizedState) ||
                (n.flags |= 4),
              typeof g.getSnapshotBeforeUpdate != "function" ||
                (S === e.memoizedProps && V === e.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = a),
              (n.memoizedState = q)),
          (g.props = a),
          (g.state = q),
          (g.context = C),
          (a = R))
        : (typeof g.componentDidUpdate != "function" ||
            (S === e.memoizedProps && V === e.memoizedState) ||
            (n.flags |= 4),
          typeof g.getSnapshotBeforeUpdate != "function" ||
            (S === e.memoizedProps && V === e.memoizedState) ||
            (n.flags |= 1024),
          (a = !1));
    }
    return gl(e, n, o, a, p, u);
  }
  function gl(e, n, o, a, u, p) {
    lp(e, n);
    var g = (n.flags & 128) !== 0;
    if (!a && !g) return (u && hf(n, o, !1), tn(e, n, p));
    ((a = n.stateNode), (bx.current = n));
    var S = g && typeof o.getDerivedStateFromError != "function" ? null : a.render();
    return (
      (n.flags |= 1),
      e !== null && g
        ? ((n.child = Cr(n, e.child, null, p)), (n.child = Cr(n, null, S, p)))
        : ot(e, n, S, p),
      (n.memoizedState = a.state),
      u && hf(n, o, !0),
      n.child
    );
  }
  function cp(e) {
    var n = e.stateNode;
    (n.pendingContext
      ? ff(e, n.pendingContext, n.pendingContext !== n.context)
      : n.context && ff(e, n.context, !1),
      Ja(e, n.containerInfo));
  }
  function dp(e, n, o, a, u) {
    return (kr(), Ga(u), (n.flags |= 256), ot(e, n, o, a), n.child);
  }
  var yl = { dehydrated: null, treeContext: null, retryLane: 0 };
  function vl(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function fp(e, n, o) {
    var a = n.pendingProps,
      u = je.current,
      p = !1,
      g = (n.flags & 128) !== 0,
      S;
    if (
      ((S = g) || (S = e !== null && e.memoizedState === null ? !1 : (u & 2) !== 0),
      S ? ((p = !0), (n.flags &= -129)) : (e === null || e.memoizedState !== null) && (u |= 1),
      Ce(je, u & 1),
      e === null)
    )
      return (
        $a(n),
        (e = n.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((n.mode & 1) === 0
              ? (n.lanes = 1)
              : e.data === "$!"
                ? (n.lanes = 8)
                : (n.lanes = 1073741824),
            null)
          : ((g = a.children),
            (e = a.fallback),
            p
              ? ((a = n.mode),
                (p = n.child),
                (g = { mode: "hidden", children: g }),
                (a & 1) === 0 && p !== null
                  ? ((p.childLanes = 0), (p.pendingProps = g))
                  : (p = ts(g, a, 0, null)),
                (e = qn(e, a, o, null)),
                (p.return = n),
                (e.return = n),
                (p.sibling = e),
                (n.child = p),
                (n.child.memoizedState = vl(o)),
                (n.memoizedState = yl),
                e)
              : xl(n, g))
      );
    if (((u = e.memoizedState), u !== null && ((S = u.dehydrated), S !== null)))
      return Ex(e, n, g, a, S, u, o);
    if (p) {
      ((p = a.fallback), (g = n.mode), (u = e.child), (S = u.sibling));
      var C = { mode: "hidden", children: a.children };
      return (
        (g & 1) === 0 && n.child !== u
          ? ((a = n.child), (a.childLanes = 0), (a.pendingProps = C), (n.deletions = null))
          : ((a = Tn(u, C)), (a.subtreeFlags = u.subtreeFlags & 14680064)),
        S !== null ? (p = Tn(S, p)) : ((p = qn(p, g, o, null)), (p.flags |= 2)),
        (p.return = n),
        (a.return = n),
        (a.sibling = p),
        (n.child = a),
        (a = p),
        (p = n.child),
        (g = e.child.memoizedState),
        (g =
          g === null
            ? vl(o)
            : { baseLanes: g.baseLanes | o, cachePool: null, transitions: g.transitions }),
        (p.memoizedState = g),
        (p.childLanes = e.childLanes & ~o),
        (n.memoizedState = yl),
        a
      );
    }
    return (
      (p = e.child),
      (e = p.sibling),
      (a = Tn(p, { mode: "visible", children: a.children })),
      (n.mode & 1) === 0 && (a.lanes = o),
      (a.return = n),
      (a.sibling = null),
      e !== null &&
        ((o = n.deletions), o === null ? ((n.deletions = [e]), (n.flags |= 16)) : o.push(e)),
      (n.child = a),
      (n.memoizedState = null),
      a
    );
  }
  function xl(e, n) {
    return (
      (n = ts({ mode: "visible", children: n }, e.mode, 0, null)),
      (n.return = e),
      (e.child = n)
    );
  }
  function Wo(e, n, o, a) {
    return (
      a !== null && Ga(a),
      Cr(n, e.child, null, o),
      (e = xl(n, n.pendingProps.children)),
      (e.flags |= 2),
      (n.memoizedState = null),
      e
    );
  }
  function Ex(e, n, o, a, u, p, g) {
    if (o)
      return n.flags & 256
        ? ((n.flags &= -257), (a = pl(Error(i(422)))), Wo(e, n, g, a))
        : n.memoizedState !== null
          ? ((n.child = e.child), (n.flags |= 128), null)
          : ((p = a.fallback),
            (u = n.mode),
            (a = ts({ mode: "visible", children: a.children }, u, 0, null)),
            (p = qn(p, u, g, null)),
            (p.flags |= 2),
            (a.return = n),
            (p.return = n),
            (a.sibling = p),
            (n.child = a),
            (n.mode & 1) !== 0 && Cr(n, e.child, null, g),
            (n.child.memoizedState = vl(g)),
            (n.memoizedState = yl),
            p);
    if ((n.mode & 1) === 0) return Wo(e, n, g, null);
    if (u.data === "$!") {
      if (((a = u.nextSibling && u.nextSibling.dataset), a)) var S = a.dgst;
      return ((a = S), (p = Error(i(419))), (a = pl(p, a, void 0)), Wo(e, n, g, a));
    }
    if (((S = (g & e.childLanes) !== 0), dt || S)) {
      if (((a = Ye), a !== null)) {
        switch (g & -g) {
          case 4:
            u = 2;
            break;
          case 16:
            u = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            u = 32;
            break;
          case 536870912:
            u = 268435456;
            break;
          default:
            u = 0;
        }
        ((u = (u & (a.suspendedLanes | g)) !== 0 ? 0 : u),
          u !== 0 && u !== p.retryLane && ((p.retryLane = u), Jt(e, u), Dt(a, e, u, -1)));
      }
      return (Fl(), (a = pl(Error(i(421)))), Wo(e, n, g, a));
    }
    return u.data === "$?"
      ? ((n.flags |= 128), (n.child = e.child), (n = Ix.bind(null, e)), (u._reactRetry = n), null)
      : ((e = p.treeContext),
        (yt = mn(u.nextSibling)),
        (gt = n),
        (Ne = !0),
        (jt = null),
        e !== null &&
          ((xt[wt++] = Qt),
          (xt[wt++] = Zt),
          (xt[wt++] = Bn),
          (Qt = e.id),
          (Zt = e.overflow),
          (Bn = n)),
        (n = xl(n, a.children)),
        (n.flags |= 4096),
        n);
  }
  function pp(e, n, o) {
    e.lanes |= n;
    var a = e.alternate;
    (a !== null && (a.lanes |= n), qa(e.return, n, o));
  }
  function wl(e, n, o, a, u) {
    var p = e.memoizedState;
    p === null
      ? (e.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: o,
          tailMode: u,
        })
      : ((p.isBackwards = n),
        (p.rendering = null),
        (p.renderingStartTime = 0),
        (p.last = a),
        (p.tail = o),
        (p.tailMode = u));
  }
  function hp(e, n, o) {
    var a = n.pendingProps,
      u = a.revealOrder,
      p = a.tail;
    if ((ot(e, n, a.children, o), (a = je.current), (a & 2) !== 0))
      ((a = (a & 1) | 2), (n.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = n.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && pp(e, o, n);
          else if (e.tag === 19) pp(e, o, n);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === n) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === n) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      a &= 1;
    }
    if ((Ce(je, a), (n.mode & 1) === 0)) n.memoizedState = null;
    else
      switch (u) {
        case "forwards":
          for (o = n.child, u = null; o !== null; )
            ((e = o.alternate), e !== null && Fo(e) === null && (u = o), (o = o.sibling));
          ((o = u),
            o === null ? ((u = n.child), (n.child = null)) : ((u = o.sibling), (o.sibling = null)),
            wl(n, !1, u, o, p));
          break;
        case "backwards":
          for (o = null, u = n.child, n.child = null; u !== null; ) {
            if (((e = u.alternate), e !== null && Fo(e) === null)) {
              n.child = u;
              break;
            }
            ((e = u.sibling), (u.sibling = o), (o = u), (u = e));
          }
          wl(n, !0, o, null, p);
          break;
        case "together":
          wl(n, !1, null, null, void 0);
          break;
        default:
          n.memoizedState = null;
      }
    return n.child;
  }
  function Ho(e, n) {
    (n.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (n.alternate = null), (n.flags |= 2));
  }
  function tn(e, n, o) {
    if (
      (e !== null && (n.dependencies = e.dependencies), (Gn |= n.lanes), (o & n.childLanes) === 0)
    )
      return null;
    if (e !== null && n.child !== e.child) throw Error(i(153));
    if (n.child !== null) {
      for (e = n.child, o = Tn(e, e.pendingProps), n.child = o, o.return = n; e.sibling !== null; )
        ((e = e.sibling), (o = o.sibling = Tn(e, e.pendingProps)), (o.return = n));
      o.sibling = null;
    }
    return n.child;
  }
  function Tx(e, n, o) {
    switch (n.tag) {
      case 3:
        (cp(n), kr());
        break;
      case 5:
        Nf(n);
        break;
      case 1:
        ct(n.type) && Eo(n);
        break;
      case 4:
        Ja(n, n.stateNode.containerInfo);
        break;
      case 10:
        var a = n.type._context,
          u = n.memoizedProps.value;
        (Ce(Mo, a._currentValue), (a._currentValue = u));
        break;
      case 13:
        if (((a = n.memoizedState), a !== null))
          return a.dehydrated !== null
            ? (Ce(je, je.current & 1), (n.flags |= 128), null)
            : (o & n.child.childLanes) !== 0
              ? fp(e, n, o)
              : (Ce(je, je.current & 1), (e = tn(e, n, o)), e !== null ? e.sibling : null);
        Ce(je, je.current & 1);
        break;
      case 19:
        if (((a = (o & n.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (a) return hp(e, n, o);
          n.flags |= 128;
        }
        if (
          ((u = n.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          Ce(je, je.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((n.lanes = 0), ap(e, n, o));
    }
    return tn(e, n, o);
  }
  var mp, Sl, gp, yp;
  ((mp = function (e, n) {
    for (var o = n.child; o !== null; ) {
      if (o.tag === 5 || o.tag === 6) e.appendChild(o.stateNode);
      else if (o.tag !== 4 && o.child !== null) {
        ((o.child.return = o), (o = o.child));
        continue;
      }
      if (o === n) break;
      for (; o.sibling === null; ) {
        if (o.return === null || o.return === n) return;
        o = o.return;
      }
      ((o.sibling.return = o.return), (o = o.sibling));
    }
  }),
    (Sl = function () {}),
    (gp = function (e, n, o, a) {
      var u = e.memoizedProps;
      if (u !== a) {
        ((e = n.stateNode), Un(Bt.current));
        var p = null;
        switch (o) {
          case "input":
            ((u = ln(e, u)), (a = ln(e, a)), (p = []));
            break;
          case "select":
            ((u = D({}, u, { value: void 0 })), (a = D({}, a, { value: void 0 })), (p = []));
            break;
          case "textarea":
            ((u = Js(e, u)), (a = Js(e, a)), (p = []));
            break;
          default:
            typeof u.onClick != "function" && typeof a.onClick == "function" && (e.onclick = ko);
        }
        ta(o, a);
        var g;
        o = null;
        for (R in u)
          if (!a.hasOwnProperty(R) && u.hasOwnProperty(R) && u[R] != null)
            if (R === "style") {
              var S = u[R];
              for (g in S) S.hasOwnProperty(g) && (o || (o = {}), (o[g] = ""));
            } else
              R !== "dangerouslySetInnerHTML" &&
                R !== "children" &&
                R !== "suppressContentEditableWarning" &&
                R !== "suppressHydrationWarning" &&
                R !== "autoFocus" &&
                (l.hasOwnProperty(R) ? p || (p = []) : (p = p || []).push(R, null));
        for (R in a) {
          var C = a[R];
          if (((S = u?.[R]), a.hasOwnProperty(R) && C !== S && (C != null || S != null)))
            if (R === "style")
              if (S) {
                for (g in S)
                  !S.hasOwnProperty(g) ||
                    (C && C.hasOwnProperty(g)) ||
                    (o || (o = {}), (o[g] = ""));
                for (g in C) C.hasOwnProperty(g) && S[g] !== C[g] && (o || (o = {}), (o[g] = C[g]));
              } else (o || (p || (p = []), p.push(R, o)), (o = C));
            else
              R === "dangerouslySetInnerHTML"
                ? ((C = C ? C.__html : void 0),
                  (S = S ? S.__html : void 0),
                  C != null && S !== C && (p = p || []).push(R, C))
                : R === "children"
                  ? (typeof C != "string" && typeof C != "number") || (p = p || []).push(R, "" + C)
                  : R !== "suppressContentEditableWarning" &&
                    R !== "suppressHydrationWarning" &&
                    (l.hasOwnProperty(R)
                      ? (C != null && R === "onScroll" && Ee("scroll", e), p || S === C || (p = []))
                      : (p = p || []).push(R, C));
        }
        o && (p = p || []).push("style", o);
        var R = p;
        (n.updateQueue = R) && (n.flags |= 4);
      }
    }),
    (yp = function (e, n, o, a) {
      o !== a && (n.flags |= 4);
    }));
  function Pi(e, n) {
    if (!Ne)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var o = null; n !== null; ) (n.alternate !== null && (o = n), (n = n.sibling));
          o === null ? (e.tail = null) : (o.sibling = null);
          break;
        case "collapsed":
          o = e.tail;
          for (var a = null; o !== null; ) (o.alternate !== null && (a = o), (o = o.sibling));
          a === null
            ? n || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function nt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child,
      o = 0,
      a = 0;
    if (n)
      for (var u = e.child; u !== null; )
        ((o |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags & 14680064),
          (a |= u.flags & 14680064),
          (u.return = e),
          (u = u.sibling));
    else
      for (u = e.child; u !== null; )
        ((o |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags),
          (a |= u.flags),
          (u.return = e),
          (u = u.sibling));
    return ((e.subtreeFlags |= a), (e.childLanes = o), n);
  }
  function Px(e, n, o) {
    var a = n.pendingProps;
    switch ((Ha(n), n.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (nt(n), null);
      case 1:
        return (ct(n.type) && bo(), nt(n), null);
      case 3:
        return (
          (a = n.stateNode),
          Tr(),
          Te(ut),
          Te(et),
          nl(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (jo(n)
              ? (n.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), jt !== null && (Rl(jt), (jt = null)))),
          Sl(e, n),
          nt(n),
          null
        );
      case 5:
        el(n);
        var u = Un(ki.current);
        if (((o = n.type), e !== null && n.stateNode != null))
          (gp(e, n, o, a, u), e.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152)));
        else {
          if (!a) {
            if (n.stateNode === null) throw Error(i(166));
            return (nt(n), null);
          }
          if (((e = Un(Bt.current)), jo(n))) {
            ((a = n.stateNode), (o = n.type));
            var p = n.memoizedProps;
            switch (((a[zt] = n), (a[yi] = p), (e = (n.mode & 1) !== 0), o)) {
              case "dialog":
                (Ee("cancel", a), Ee("close", a));
                break;
              case "iframe":
              case "object":
              case "embed":
                Ee("load", a);
                break;
              case "video":
              case "audio":
                for (u = 0; u < hi.length; u++) Ee(hi[u], a);
                break;
              case "source":
                Ee("error", a);
                break;
              case "img":
              case "image":
              case "link":
                (Ee("error", a), Ee("load", a));
                break;
              case "details":
                Ee("toggle", a);
                break;
              case "input":
                (qc(a, p), Ee("invalid", a));
                break;
              case "select":
                ((a._wrapperState = { wasMultiple: !!p.multiple }), Ee("invalid", a));
                break;
              case "textarea":
                (Jc(a, p), Ee("invalid", a));
            }
            (ta(o, p), (u = null));
            for (var g in p)
              if (p.hasOwnProperty(g)) {
                var S = p[g];
                g === "children"
                  ? typeof S == "string"
                    ? a.textContent !== S &&
                      (p.suppressHydrationWarning !== !0 && So(a.textContent, S, e),
                      (u = ["children", S]))
                    : typeof S == "number" &&
                      a.textContent !== "" + S &&
                      (p.suppressHydrationWarning !== !0 && So(a.textContent, S, e),
                      (u = ["children", "" + S]))
                  : l.hasOwnProperty(g) && S != null && g === "onScroll" && Ee("scroll", a);
              }
            switch (o) {
              case "input":
                (Xt(a), Zc(a, p, !0));
                break;
              case "textarea":
                (Xt(a), td(a));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof p.onClick == "function" && (a.onclick = ko);
            }
            ((a = u), (n.updateQueue = a), a !== null && (n.flags |= 4));
          } else {
            ((g = u.nodeType === 9 ? u : u.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = nd(o)),
              e === "http://www.w3.org/1999/xhtml"
                ? o === "script"
                  ? ((e = g.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof a.is == "string"
                    ? (e = g.createElement(o, { is: a.is }))
                    : ((e = g.createElement(o)),
                      o === "select" &&
                        ((g = e), a.multiple ? (g.multiple = !0) : a.size && (g.size = a.size)))
                : (e = g.createElementNS(e, o)),
              (e[zt] = n),
              (e[yi] = a),
              mp(e, n, !1, !1),
              (n.stateNode = e));
            e: {
              switch (((g = na(o, a)), o)) {
                case "dialog":
                  (Ee("cancel", e), Ee("close", e), (u = a));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (Ee("load", e), (u = a));
                  break;
                case "video":
                case "audio":
                  for (u = 0; u < hi.length; u++) Ee(hi[u], e);
                  u = a;
                  break;
                case "source":
                  (Ee("error", e), (u = a));
                  break;
                case "img":
                case "image":
                case "link":
                  (Ee("error", e), Ee("load", e), (u = a));
                  break;
                case "details":
                  (Ee("toggle", e), (u = a));
                  break;
                case "input":
                  (qc(e, a), (u = ln(e, a)), Ee("invalid", e));
                  break;
                case "option":
                  u = a;
                  break;
                case "select":
                  ((e._wrapperState = { wasMultiple: !!a.multiple }),
                    (u = D({}, a, { value: void 0 })),
                    Ee("invalid", e));
                  break;
                case "textarea":
                  (Jc(e, a), (u = Js(e, a)), Ee("invalid", e));
                  break;
                default:
                  u = a;
              }
              (ta(o, u), (S = u));
              for (p in S)
                if (S.hasOwnProperty(p)) {
                  var C = S[p];
                  p === "style"
                    ? od(e, C)
                    : p === "dangerouslySetInnerHTML"
                      ? ((C = C ? C.__html : void 0), C != null && rd(e, C))
                      : p === "children"
                        ? typeof C == "string"
                          ? (o !== "textarea" || C !== "") && Kr(e, C)
                          : typeof C == "number" && Kr(e, "" + C)
                        : p !== "suppressContentEditableWarning" &&
                          p !== "suppressHydrationWarning" &&
                          p !== "autoFocus" &&
                          (l.hasOwnProperty(p)
                            ? C != null && p === "onScroll" && Ee("scroll", e)
                            : C != null && F(e, p, C, g));
                }
              switch (o) {
                case "input":
                  (Xt(e), Zc(e, a, !1));
                  break;
                case "textarea":
                  (Xt(e), td(e));
                  break;
                case "option":
                  a.value != null && e.setAttribute("value", "" + ge(a.value));
                  break;
                case "select":
                  ((e.multiple = !!a.multiple),
                    (p = a.value),
                    p != null
                      ? ar(e, !!a.multiple, p, !1)
                      : a.defaultValue != null && ar(e, !!a.multiple, a.defaultValue, !0));
                  break;
                default:
                  typeof u.onClick == "function" && (e.onclick = ko);
              }
              switch (o) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a = !!a.autoFocus;
                  break e;
                case "img":
                  a = !0;
                  break e;
                default:
                  a = !1;
              }
            }
            a && (n.flags |= 4);
          }
          n.ref !== null && ((n.flags |= 512), (n.flags |= 2097152));
        }
        return (nt(n), null);
      case 6:
        if (e && n.stateNode != null) yp(e, n, e.memoizedProps, a);
        else {
          if (typeof a != "string" && n.stateNode === null) throw Error(i(166));
          if (((o = Un(ki.current)), Un(Bt.current), jo(n))) {
            if (
              ((a = n.stateNode),
              (o = n.memoizedProps),
              (a[zt] = n),
              (p = a.nodeValue !== o) && ((e = gt), e !== null))
            )
              switch (e.tag) {
                case 3:
                  So(a.nodeValue, o, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    So(a.nodeValue, o, (e.mode & 1) !== 0);
              }
            p && (n.flags |= 4);
          } else
            ((a = (o.nodeType === 9 ? o : o.ownerDocument).createTextNode(a)),
              (a[zt] = n),
              (n.stateNode = a));
        }
        return (nt(n), null);
      case 13:
        if (
          (Te(je),
          (a = n.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (Ne && yt !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0)
            (wf(), kr(), (n.flags |= 98560), (p = !1));
          else if (((p = jo(n)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!p) throw Error(i(318));
              if (((p = n.memoizedState), (p = p !== null ? p.dehydrated : null), !p))
                throw Error(i(317));
              p[zt] = n;
            } else (kr(), (n.flags & 128) === 0 && (n.memoizedState = null), (n.flags |= 4));
            (nt(n), (p = !1));
          } else (jt !== null && (Rl(jt), (jt = null)), (p = !0));
          if (!p) return n.flags & 65536 ? n : null;
        }
        return (n.flags & 128) !== 0
          ? ((n.lanes = o), n)
          : ((a = a !== null),
            a !== (e !== null && e.memoizedState !== null) &&
              a &&
              ((n.child.flags |= 8192),
              (n.mode & 1) !== 0 &&
                (e === null || (je.current & 1) !== 0 ? He === 0 && (He = 3) : Fl())),
            n.updateQueue !== null && (n.flags |= 4),
            nt(n),
            null);
      case 4:
        return (Tr(), Sl(e, n), e === null && mi(n.stateNode.containerInfo), nt(n), null);
      case 10:
        return (Ka(n.type._context), nt(n), null);
      case 17:
        return (ct(n.type) && bo(), nt(n), null);
      case 19:
        if ((Te(je), (p = n.memoizedState), p === null)) return (nt(n), null);
        if (((a = (n.flags & 128) !== 0), (g = p.rendering), g === null))
          if (a) Pi(p, !1);
          else {
            if (He !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = n.child; e !== null; ) {
                if (((g = Fo(e)), g !== null)) {
                  for (
                    n.flags |= 128,
                      Pi(p, !1),
                      a = g.updateQueue,
                      a !== null && ((n.updateQueue = a), (n.flags |= 4)),
                      n.subtreeFlags = 0,
                      a = o,
                      o = n.child;
                    o !== null;
                  )
                    ((p = o),
                      (e = a),
                      (p.flags &= 14680066),
                      (g = p.alternate),
                      g === null
                        ? ((p.childLanes = 0),
                          (p.lanes = e),
                          (p.child = null),
                          (p.subtreeFlags = 0),
                          (p.memoizedProps = null),
                          (p.memoizedState = null),
                          (p.updateQueue = null),
                          (p.dependencies = null),
                          (p.stateNode = null))
                        : ((p.childLanes = g.childLanes),
                          (p.lanes = g.lanes),
                          (p.child = g.child),
                          (p.subtreeFlags = 0),
                          (p.deletions = null),
                          (p.memoizedProps = g.memoizedProps),
                          (p.memoizedState = g.memoizedState),
                          (p.updateQueue = g.updateQueue),
                          (p.type = g.type),
                          (e = g.dependencies),
                          (p.dependencies =
                            e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                      (o = o.sibling));
                  return (Ce(je, (je.current & 1) | 2), n.child);
                }
                e = e.sibling;
              }
            p.tail !== null &&
              Oe() > Ar &&
              ((n.flags |= 128), (a = !0), Pi(p, !1), (n.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = Fo(g)), e !== null)) {
              if (
                ((n.flags |= 128),
                (a = !0),
                (o = e.updateQueue),
                o !== null && ((n.updateQueue = o), (n.flags |= 4)),
                Pi(p, !0),
                p.tail === null && p.tailMode === "hidden" && !g.alternate && !Ne)
              )
                return (nt(n), null);
            } else
              2 * Oe() - p.renderingStartTime > Ar &&
                o !== 1073741824 &&
                ((n.flags |= 128), (a = !0), Pi(p, !1), (n.lanes = 4194304));
          p.isBackwards
            ? ((g.sibling = n.child), (n.child = g))
            : ((o = p.last), o !== null ? (o.sibling = g) : (n.child = g), (p.last = g));
        }
        return p.tail !== null
          ? ((n = p.tail),
            (p.rendering = n),
            (p.tail = n.sibling),
            (p.renderingStartTime = Oe()),
            (n.sibling = null),
            (o = je.current),
            Ce(je, a ? (o & 1) | 2 : o & 1),
            n)
          : (nt(n), null);
      case 22:
      case 23:
        return (
          Ol(),
          (a = n.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== a && (n.flags |= 8192),
          a && (n.mode & 1) !== 0
            ? (vt & 1073741824) !== 0 && (nt(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : nt(n),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function Nx(e, n) {
    switch ((Ha(n), n.tag)) {
      case 1:
        return (
          ct(n.type) && bo(),
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 3:
        return (
          Tr(),
          Te(ut),
          Te(et),
          nl(),
          (e = n.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 5:
        return (el(n), null);
      case 13:
        if ((Te(je), (e = n.memoizedState), e !== null && e.dehydrated !== null)) {
          if (n.alternate === null) throw Error(i(340));
          kr();
        }
        return ((e = n.flags), e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null);
      case 19:
        return (Te(je), null);
      case 4:
        return (Tr(), null);
      case 10:
        return (Ka(n.type._context), null);
      case 22:
      case 23:
        return (Ol(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Uo = !1,
    rt = !1,
    jx = typeof WeakSet == "function" ? WeakSet : Set,
    K = null;
  function Nr(e, n) {
    var o = e.ref;
    if (o !== null)
      if (typeof o == "function")
        try {
          o(null);
        } catch (a) {
          Re(e, n, a);
        }
      else o.current = null;
  }
  function kl(e, n, o) {
    try {
      o();
    } catch (a) {
      Re(e, n, a);
    }
  }
  var vp = !1;
  function Ax(e, n) {
    if (((Oa = uo), (e = Kd()), Ta(e))) {
      if ("selectionStart" in e) var o = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          o = ((o = e.ownerDocument) && o.defaultView) || window;
          var a = o.getSelection && o.getSelection();
          if (a && a.rangeCount !== 0) {
            o = a.anchorNode;
            var u = a.anchorOffset,
              p = a.focusNode;
            a = a.focusOffset;
            try {
              (o.nodeType, p.nodeType);
            } catch {
              o = null;
              break e;
            }
            var g = 0,
              S = -1,
              C = -1,
              R = 0,
              z = 0,
              B = e,
              V = null;
            t: for (;;) {
              for (
                var Y;
                B !== o || (u !== 0 && B.nodeType !== 3) || (S = g + u),
                  B !== p || (a !== 0 && B.nodeType !== 3) || (C = g + a),
                  B.nodeType === 3 && (g += B.nodeValue.length),
                  (Y = B.firstChild) !== null;
              )
                ((V = B), (B = Y));
              for (;;) {
                if (B === e) break t;
                if (
                  (V === o && ++R === u && (S = g),
                  V === p && ++z === a && (C = g),
                  (Y = B.nextSibling) !== null)
                )
                  break;
                ((B = V), (V = B.parentNode));
              }
              B = Y;
            }
            o = S === -1 || C === -1 ? null : { start: S, end: C };
          } else o = null;
        }
      o = o || { start: 0, end: 0 };
    } else o = null;
    for (Fa = { focusedElem: e, selectionRange: o }, uo = !1, K = n; K !== null; )
      if (((n = K), (e = n.child), (n.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = n), (K = e));
      else
        for (; K !== null; ) {
          n = K;
          try {
            var q = n.alternate;
            if ((n.flags & 1024) !== 0)
              switch (n.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (q !== null) {
                    var te = q.memoizedProps,
                      Fe = q.memoizedState,
                      N = n.stateNode,
                      E = N.getSnapshotBeforeUpdate(
                        n.elementType === n.type ? te : At(n.type, te),
                        Fe
                      );
                    N.__reactInternalSnapshotBeforeUpdate = E;
                  }
                  break;
                case 3:
                  var M = n.stateNode.containerInfo;
                  M.nodeType === 1
                    ? (M.textContent = "")
                    : M.nodeType === 9 && M.documentElement && M.removeChild(M.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(i(163));
              }
          } catch (U) {
            Re(n, n.return, U);
          }
          if (((e = n.sibling), e !== null)) {
            ((e.return = n.return), (K = e));
            break;
          }
          K = n.return;
        }
    return ((q = vp), (vp = !1), q);
  }
  function Ni(e, n, o) {
    var a = n.updateQueue;
    if (((a = a !== null ? a.lastEffect : null), a !== null)) {
      var u = (a = a.next);
      do {
        if ((u.tag & e) === e) {
          var p = u.destroy;
          ((u.destroy = void 0), p !== void 0 && kl(n, o, p));
        }
        u = u.next;
      } while (u !== a);
    }
  }
  function $o(e, n) {
    if (((n = n.updateQueue), (n = n !== null ? n.lastEffect : null), n !== null)) {
      var o = (n = n.next);
      do {
        if ((o.tag & e) === e) {
          var a = o.create;
          o.destroy = a();
        }
        o = o.next;
      } while (o !== n);
    }
  }
  function Cl(e) {
    var n = e.ref;
    if (n !== null) {
      var o = e.stateNode;
      switch (e.tag) {
        case 5:
          e = o;
          break;
        default:
          e = o;
      }
      typeof n == "function" ? n(e) : (n.current = e);
    }
  }
  function xp(e) {
    var n = e.alternate;
    (n !== null && ((e.alternate = null), xp(n)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((n = e.stateNode),
        n !== null && (delete n[zt], delete n[yi], delete n[Va], delete n[fx], delete n[px])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function wp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Sp(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || wp(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function bl(e, n, o) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode),
        n
          ? o.nodeType === 8
            ? o.parentNode.insertBefore(e, n)
            : o.insertBefore(e, n)
          : (o.nodeType === 8
              ? ((n = o.parentNode), n.insertBefore(e, o))
              : ((n = o), n.appendChild(e)),
            (o = o._reactRootContainer),
            o != null || n.onclick !== null || (n.onclick = ko)));
    else if (a !== 4 && ((e = e.child), e !== null))
      for (bl(e, n, o), e = e.sibling; e !== null; ) (bl(e, n, o), (e = e.sibling));
  }
  function El(e, n, o) {
    var a = e.tag;
    if (a === 5 || a === 6) ((e = e.stateNode), n ? o.insertBefore(e, n) : o.appendChild(e));
    else if (a !== 4 && ((e = e.child), e !== null))
      for (El(e, n, o), e = e.sibling; e !== null; ) (El(e, n, o), (e = e.sibling));
  }
  var qe = null,
    Mt = !1;
  function Sn(e, n, o) {
    for (o = o.child; o !== null; ) (kp(e, n, o), (o = o.sibling));
  }
  function kp(e, n, o) {
    if (Vt && typeof Vt.onCommitFiberUnmount == "function")
      try {
        Vt.onCommitFiberUnmount(ro, o);
      } catch {}
    switch (o.tag) {
      case 5:
        rt || Nr(o, n);
      case 6:
        var a = qe,
          u = Mt;
        ((qe = null),
          Sn(e, n, o),
          (qe = a),
          (Mt = u),
          qe !== null &&
            (Mt
              ? ((e = qe),
                (o = o.stateNode),
                e.nodeType === 8 ? e.parentNode.removeChild(o) : e.removeChild(o))
              : qe.removeChild(o.stateNode)));
        break;
      case 18:
        qe !== null &&
          (Mt
            ? ((e = qe),
              (o = o.stateNode),
              e.nodeType === 8 ? Ia(e.parentNode, o) : e.nodeType === 1 && Ia(e, o),
              si(e))
            : Ia(qe, o.stateNode));
        break;
      case 4:
        ((a = qe),
          (u = Mt),
          (qe = o.stateNode.containerInfo),
          (Mt = !0),
          Sn(e, n, o),
          (qe = a),
          (Mt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!rt && ((a = o.updateQueue), a !== null && ((a = a.lastEffect), a !== null))) {
          u = a = a.next;
          do {
            var p = u,
              g = p.destroy;
            ((p = p.tag),
              g !== void 0 && ((p & 2) !== 0 || (p & 4) !== 0) && kl(o, n, g),
              (u = u.next));
          } while (u !== a);
        }
        Sn(e, n, o);
        break;
      case 1:
        if (!rt && (Nr(o, n), (a = o.stateNode), typeof a.componentWillUnmount == "function"))
          try {
            ((a.props = o.memoizedProps), (a.state = o.memoizedState), a.componentWillUnmount());
          } catch (S) {
            Re(o, n, S);
          }
        Sn(e, n, o);
        break;
      case 21:
        Sn(e, n, o);
        break;
      case 22:
        o.mode & 1
          ? ((rt = (a = rt) || o.memoizedState !== null), Sn(e, n, o), (rt = a))
          : Sn(e, n, o);
        break;
      default:
        Sn(e, n, o);
    }
  }
  function Cp(e) {
    var n = e.updateQueue;
    if (n !== null) {
      e.updateQueue = null;
      var o = e.stateNode;
      (o === null && (o = e.stateNode = new jx()),
        n.forEach(function (a) {
          var u = Vx.bind(null, e, a);
          o.has(a) || (o.add(a), a.then(u, u));
        }));
    }
  }
  function Rt(e, n) {
    var o = n.deletions;
    if (o !== null)
      for (var a = 0; a < o.length; a++) {
        var u = o[a];
        try {
          var p = e,
            g = n,
            S = g;
          e: for (; S !== null; ) {
            switch (S.tag) {
              case 5:
                ((qe = S.stateNode), (Mt = !1));
                break e;
              case 3:
                ((qe = S.stateNode.containerInfo), (Mt = !0));
                break e;
              case 4:
                ((qe = S.stateNode.containerInfo), (Mt = !0));
                break e;
            }
            S = S.return;
          }
          if (qe === null) throw Error(i(160));
          (kp(p, g, u), (qe = null), (Mt = !1));
          var C = u.alternate;
          (C !== null && (C.return = null), (u.return = null));
        } catch (R) {
          Re(u, n, R);
        }
      }
    if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) (bp(n, e), (n = n.sibling));
  }
  function bp(e, n) {
    var o = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Rt(n, e), Ht(e), a & 4)) {
          try {
            (Ni(3, e, e.return), $o(3, e));
          } catch (te) {
            Re(e, e.return, te);
          }
          try {
            Ni(5, e, e.return);
          } catch (te) {
            Re(e, e.return, te);
          }
        }
        break;
      case 1:
        (Rt(n, e), Ht(e), a & 512 && o !== null && Nr(o, o.return));
        break;
      case 5:
        if ((Rt(n, e), Ht(e), a & 512 && o !== null && Nr(o, o.return), e.flags & 32)) {
          var u = e.stateNode;
          try {
            Kr(u, "");
          } catch (te) {
            Re(e, e.return, te);
          }
        }
        if (a & 4 && ((u = e.stateNode), u != null)) {
          var p = e.memoizedProps,
            g = o !== null ? o.memoizedProps : p,
            S = e.type,
            C = e.updateQueue;
          if (((e.updateQueue = null), C !== null))
            try {
              (S === "input" && p.type === "radio" && p.name != null && Qc(u, p), na(S, g));
              var R = na(S, p);
              for (g = 0; g < C.length; g += 2) {
                var z = C[g],
                  B = C[g + 1];
                z === "style"
                  ? od(u, B)
                  : z === "dangerouslySetInnerHTML"
                    ? rd(u, B)
                    : z === "children"
                      ? Kr(u, B)
                      : F(u, z, B, R);
              }
              switch (S) {
                case "input":
                  Qs(u, p);
                  break;
                case "textarea":
                  ed(u, p);
                  break;
                case "select":
                  var V = u._wrapperState.wasMultiple;
                  u._wrapperState.wasMultiple = !!p.multiple;
                  var Y = p.value;
                  Y != null
                    ? ar(u, !!p.multiple, Y, !1)
                    : V !== !!p.multiple &&
                      (p.defaultValue != null
                        ? ar(u, !!p.multiple, p.defaultValue, !0)
                        : ar(u, !!p.multiple, p.multiple ? [] : "", !1));
              }
              u[yi] = p;
            } catch (te) {
              Re(e, e.return, te);
            }
        }
        break;
      case 6:
        if ((Rt(n, e), Ht(e), a & 4)) {
          if (e.stateNode === null) throw Error(i(162));
          ((u = e.stateNode), (p = e.memoizedProps));
          try {
            u.nodeValue = p;
          } catch (te) {
            Re(e, e.return, te);
          }
        }
        break;
      case 3:
        if ((Rt(n, e), Ht(e), a & 4 && o !== null && o.memoizedState.isDehydrated))
          try {
            si(n.containerInfo);
          } catch (te) {
            Re(e, e.return, te);
          }
        break;
      case 4:
        (Rt(n, e), Ht(e));
        break;
      case 13:
        (Rt(n, e),
          Ht(e),
          (u = e.child),
          u.flags & 8192 &&
            ((p = u.memoizedState !== null),
            (u.stateNode.isHidden = p),
            !p || (u.alternate !== null && u.alternate.memoizedState !== null) || (Nl = Oe())),
          a & 4 && Cp(e));
        break;
      case 22:
        if (
          ((z = o !== null && o.memoizedState !== null),
          e.mode & 1 ? ((rt = (R = rt) || z), Rt(n, e), (rt = R)) : Rt(n, e),
          Ht(e),
          a & 8192)
        ) {
          if (
            ((R = e.memoizedState !== null), (e.stateNode.isHidden = R) && !z && (e.mode & 1) !== 0)
          )
            for (K = e, z = e.child; z !== null; ) {
              for (B = K = z; K !== null; ) {
                switch (((V = K), (Y = V.child), V.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Ni(4, V, V.return);
                    break;
                  case 1:
                    Nr(V, V.return);
                    var q = V.stateNode;
                    if (typeof q.componentWillUnmount == "function") {
                      ((a = V), (o = V.return));
                      try {
                        ((n = a),
                          (q.props = n.memoizedProps),
                          (q.state = n.memoizedState),
                          q.componentWillUnmount());
                      } catch (te) {
                        Re(a, o, te);
                      }
                    }
                    break;
                  case 5:
                    Nr(V, V.return);
                    break;
                  case 22:
                    if (V.memoizedState !== null) {
                      Pp(B);
                      continue;
                    }
                }
                Y !== null ? ((Y.return = V), (K = Y)) : Pp(B);
              }
              z = z.sibling;
            }
          e: for (z = null, B = e; ; ) {
            if (B.tag === 5) {
              if (z === null) {
                z = B;
                try {
                  ((u = B.stateNode),
                    R
                      ? ((p = u.style),
                        typeof p.setProperty == "function"
                          ? p.setProperty("display", "none", "important")
                          : (p.display = "none"))
                      : ((S = B.stateNode),
                        (C = B.memoizedProps.style),
                        (g = C != null && C.hasOwnProperty("display") ? C.display : null),
                        (S.style.display = id("display", g))));
                } catch (te) {
                  Re(e, e.return, te);
                }
              }
            } else if (B.tag === 6) {
              if (z === null)
                try {
                  B.stateNode.nodeValue = R ? "" : B.memoizedProps;
                } catch (te) {
                  Re(e, e.return, te);
                }
            } else if (
              ((B.tag !== 22 && B.tag !== 23) || B.memoizedState === null || B === e) &&
              B.child !== null
            ) {
              ((B.child.return = B), (B = B.child));
              continue;
            }
            if (B === e) break e;
            for (; B.sibling === null; ) {
              if (B.return === null || B.return === e) break e;
              (z === B && (z = null), (B = B.return));
            }
            (z === B && (z = null), (B.sibling.return = B.return), (B = B.sibling));
          }
        }
        break;
      case 19:
        (Rt(n, e), Ht(e), a & 4 && Cp(e));
        break;
      case 21:
        break;
      default:
        (Rt(n, e), Ht(e));
    }
  }
  function Ht(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        e: {
          for (var o = e.return; o !== null; ) {
            if (wp(o)) {
              var a = o;
              break e;
            }
            o = o.return;
          }
          throw Error(i(160));
        }
        switch (a.tag) {
          case 5:
            var u = a.stateNode;
            a.flags & 32 && (Kr(u, ""), (a.flags &= -33));
            var p = Sp(e);
            El(e, p, u);
            break;
          case 3:
          case 4:
            var g = a.stateNode.containerInfo,
              S = Sp(e);
            bl(e, S, g);
            break;
          default:
            throw Error(i(161));
        }
      } catch (C) {
        Re(e, e.return, C);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Mx(e, n, o) {
    ((K = e), Ep(e));
  }
  function Ep(e, n, o) {
    for (var a = (e.mode & 1) !== 0; K !== null; ) {
      var u = K,
        p = u.child;
      if (u.tag === 22 && a) {
        var g = u.memoizedState !== null || Uo;
        if (!g) {
          var S = u.alternate,
            C = (S !== null && S.memoizedState !== null) || rt;
          S = Uo;
          var R = rt;
          if (((Uo = g), (rt = C) && !R))
            for (K = u; K !== null; )
              ((g = K),
                (C = g.child),
                g.tag === 22 && g.memoizedState !== null
                  ? Np(u)
                  : C !== null
                    ? ((C.return = g), (K = C))
                    : Np(u));
          for (; p !== null; ) ((K = p), Ep(p), (p = p.sibling));
          ((K = u), (Uo = S), (rt = R));
        }
        Tp(e);
      } else (u.subtreeFlags & 8772) !== 0 && p !== null ? ((p.return = u), (K = p)) : Tp(e);
    }
  }
  function Tp(e) {
    for (; K !== null; ) {
      var n = K;
      if ((n.flags & 8772) !== 0) {
        var o = n.alternate;
        try {
          if ((n.flags & 8772) !== 0)
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                rt || $o(5, n);
                break;
              case 1:
                var a = n.stateNode;
                if (n.flags & 4 && !rt)
                  if (o === null) a.componentDidMount();
                  else {
                    var u =
                      n.elementType === n.type ? o.memoizedProps : At(n.type, o.memoizedProps);
                    a.componentDidUpdate(u, o.memoizedState, a.__reactInternalSnapshotBeforeUpdate);
                  }
                var p = n.updateQueue;
                p !== null && Pf(n, p, a);
                break;
              case 3:
                var g = n.updateQueue;
                if (g !== null) {
                  if (((o = null), n.child !== null))
                    switch (n.child.tag) {
                      case 5:
                        o = n.child.stateNode;
                        break;
                      case 1:
                        o = n.child.stateNode;
                    }
                  Pf(n, g, o);
                }
                break;
              case 5:
                var S = n.stateNode;
                if (o === null && n.flags & 4) {
                  o = S;
                  var C = n.memoizedProps;
                  switch (n.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      C.autoFocus && o.focus();
                      break;
                    case "img":
                      C.src && (o.src = C.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (n.memoizedState === null) {
                  var R = n.alternate;
                  if (R !== null) {
                    var z = R.memoizedState;
                    if (z !== null) {
                      var B = z.dehydrated;
                      B !== null && si(B);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(i(163));
            }
          rt || (n.flags & 512 && Cl(n));
        } catch (V) {
          Re(n, n.return, V);
        }
      }
      if (n === e) {
        K = null;
        break;
      }
      if (((o = n.sibling), o !== null)) {
        ((o.return = n.return), (K = o));
        break;
      }
      K = n.return;
    }
  }
  function Pp(e) {
    for (; K !== null; ) {
      var n = K;
      if (n === e) {
        K = null;
        break;
      }
      var o = n.sibling;
      if (o !== null) {
        ((o.return = n.return), (K = o));
        break;
      }
      K = n.return;
    }
  }
  function Np(e) {
    for (; K !== null; ) {
      var n = K;
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var o = n.return;
            try {
              $o(4, n);
            } catch (C) {
              Re(n, o, C);
            }
            break;
          case 1:
            var a = n.stateNode;
            if (typeof a.componentDidMount == "function") {
              var u = n.return;
              try {
                a.componentDidMount();
              } catch (C) {
                Re(n, u, C);
              }
            }
            var p = n.return;
            try {
              Cl(n);
            } catch (C) {
              Re(n, p, C);
            }
            break;
          case 5:
            var g = n.return;
            try {
              Cl(n);
            } catch (C) {
              Re(n, g, C);
            }
        }
      } catch (C) {
        Re(n, n.return, C);
      }
      if (n === e) {
        K = null;
        break;
      }
      var S = n.sibling;
      if (S !== null) {
        ((S.return = n.return), (K = S));
        break;
      }
      K = n.return;
    }
  }
  var Rx = Math.ceil,
    Go = W.ReactCurrentDispatcher,
    Tl = W.ReactCurrentOwner,
    Ct = W.ReactCurrentBatchConfig,
    me = 0,
    Ye = null,
    Le = null,
    Qe = 0,
    vt = 0,
    jr = gn(0),
    He = 0,
    ji = null,
    Gn = 0,
    Yo = 0,
    Pl = 0,
    Ai = null,
    ft = null,
    Nl = 0,
    Ar = 1 / 0,
    nn = null,
    Xo = !1,
    jl = null,
    kn = null,
    Ko = !1,
    Cn = null,
    qo = 0,
    Mi = 0,
    Al = null,
    Qo = -1,
    Zo = 0;
  function st() {
    return (me & 6) !== 0 ? Oe() : Qo !== -1 ? Qo : (Qo = Oe());
  }
  function bn(e) {
    return (e.mode & 1) === 0
      ? 1
      : (me & 2) !== 0 && Qe !== 0
        ? Qe & -Qe
        : mx.transition !== null
          ? (Zo === 0 && (Zo = wd()), Zo)
          : ((e = ke), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : jd(e.type))), e);
  }
  function Dt(e, n, o, a) {
    if (50 < Mi) throw ((Mi = 0), (Al = null), Error(i(185)));
    (ti(e, o, a),
      ((me & 2) === 0 || e !== Ye) &&
        (e === Ye && ((me & 2) === 0 && (Yo |= o), He === 4 && En(e, Qe)),
        pt(e, a),
        o === 1 && me === 0 && (n.mode & 1) === 0 && ((Ar = Oe() + 500), To && vn())));
  }
  function pt(e, n) {
    var o = e.callbackNode;
    m0(e, n);
    var a = so(e, e === Ye ? Qe : 0);
    if (a === 0) (o !== null && yd(o), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((n = a & -a), e.callbackPriority !== n)) {
      if ((o != null && yd(o), n === 1))
        (e.tag === 0 ? hx(Ap.bind(null, e)) : mf(Ap.bind(null, e)),
          cx(function () {
            (me & 6) === 0 && vn();
          }),
          (o = null));
      else {
        switch (Sd(a)) {
          case 1:
            o = ua;
            break;
          case 4:
            o = vd;
            break;
          case 16:
            o = no;
            break;
          case 536870912:
            o = xd;
            break;
          default:
            o = no;
        }
        o = Ip(o, jp.bind(null, e));
      }
      ((e.callbackPriority = n), (e.callbackNode = o));
    }
  }
  function jp(e, n) {
    if (((Qo = -1), (Zo = 0), (me & 6) !== 0)) throw Error(i(327));
    var o = e.callbackNode;
    if (Mr() && e.callbackNode !== o) return null;
    var a = so(e, e === Ye ? Qe : 0);
    if (a === 0) return null;
    if ((a & 30) !== 0 || (a & e.expiredLanes) !== 0 || n) n = Jo(e, a);
    else {
      n = a;
      var u = me;
      me |= 2;
      var p = Rp();
      (Ye !== e || Qe !== n) && ((nn = null), (Ar = Oe() + 500), Xn(e, n));
      do
        try {
          Fx();
          break;
        } catch (S) {
          Mp(e, S);
        }
      while (!0);
      (Xa(), (Go.current = p), (me = u), Le !== null ? (n = 0) : ((Ye = null), (Qe = 0), (n = He)));
    }
    if (n !== 0) {
      if ((n === 2 && ((u = ca(e)), u !== 0 && ((a = u), (n = Ml(e, u)))), n === 1))
        throw ((o = ji), Xn(e, 0), En(e, a), pt(e, Oe()), o);
      if (n === 6) En(e, a);
      else {
        if (
          ((u = e.current.alternate),
          (a & 30) === 0 &&
            !Dx(u) &&
            ((n = Jo(e, a)),
            n === 2 && ((p = ca(e)), p !== 0 && ((a = p), (n = Ml(e, p)))),
            n === 1))
        )
          throw ((o = ji), Xn(e, 0), En(e, a), pt(e, Oe()), o);
        switch (((e.finishedWork = u), (e.finishedLanes = a), n)) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            Kn(e, ft, nn);
            break;
          case 3:
            if ((En(e, a), (a & 130023424) === a && ((n = Nl + 500 - Oe()), 10 < n))) {
              if (so(e, 0) !== 0) break;
              if (((u = e.suspendedLanes), (u & a) !== a)) {
                (st(), (e.pingedLanes |= e.suspendedLanes & u));
                break;
              }
              e.timeoutHandle = La(Kn.bind(null, e, ft, nn), n);
              break;
            }
            Kn(e, ft, nn);
            break;
          case 4:
            if ((En(e, a), (a & 4194240) === a)) break;
            for (n = e.eventTimes, u = -1; 0 < a; ) {
              var g = 31 - Pt(a);
              ((p = 1 << g), (g = n[g]), g > u && (u = g), (a &= ~p));
            }
            if (
              ((a = u),
              (a = Oe() - a),
              (a =
                (120 > a
                  ? 120
                  : 480 > a
                    ? 480
                    : 1080 > a
                      ? 1080
                      : 1920 > a
                        ? 1920
                        : 3e3 > a
                          ? 3e3
                          : 4320 > a
                            ? 4320
                            : 1960 * Rx(a / 1960)) - a),
              10 < a)
            ) {
              e.timeoutHandle = La(Kn.bind(null, e, ft, nn), a);
              break;
            }
            Kn(e, ft, nn);
            break;
          case 5:
            Kn(e, ft, nn);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return (pt(e, Oe()), e.callbackNode === o ? jp.bind(null, e) : null);
  }
  function Ml(e, n) {
    var o = Ai;
    return (
      e.current.memoizedState.isDehydrated && (Xn(e, n).flags |= 256),
      (e = Jo(e, n)),
      e !== 2 && ((n = ft), (ft = o), n !== null && Rl(n)),
      e
    );
  }
  function Rl(e) {
    ft === null ? (ft = e) : ft.push.apply(ft, e);
  }
  function Dx(e) {
    for (var n = e; ; ) {
      if (n.flags & 16384) {
        var o = n.updateQueue;
        if (o !== null && ((o = o.stores), o !== null))
          for (var a = 0; a < o.length; a++) {
            var u = o[a],
              p = u.getSnapshot;
            u = u.value;
            try {
              if (!Nt(p(), u)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((o = n.child), n.subtreeFlags & 16384 && o !== null)) ((o.return = n), (n = o));
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
      }
    }
    return !0;
  }
  function En(e, n) {
    for (
      n &= ~Pl, n &= ~Yo, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes;
      0 < n;
    ) {
      var o = 31 - Pt(n),
        a = 1 << o;
      ((e[o] = -1), (n &= ~a));
    }
  }
  function Ap(e) {
    if ((me & 6) !== 0) throw Error(i(327));
    Mr();
    var n = so(e, 0);
    if ((n & 1) === 0) return (pt(e, Oe()), null);
    var o = Jo(e, n);
    if (e.tag !== 0 && o === 2) {
      var a = ca(e);
      a !== 0 && ((n = a), (o = Ml(e, a)));
    }
    if (o === 1) throw ((o = ji), Xn(e, 0), En(e, n), pt(e, Oe()), o);
    if (o === 6) throw Error(i(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = n),
      Kn(e, ft, nn),
      pt(e, Oe()),
      null
    );
  }
  function Dl(e, n) {
    var o = me;
    me |= 1;
    try {
      return e(n);
    } finally {
      ((me = o), me === 0 && ((Ar = Oe() + 500), To && vn()));
    }
  }
  function Yn(e) {
    Cn !== null && Cn.tag === 0 && (me & 6) === 0 && Mr();
    var n = me;
    me |= 1;
    var o = Ct.transition,
      a = ke;
    try {
      if (((Ct.transition = null), (ke = 1), e)) return e();
    } finally {
      ((ke = a), (Ct.transition = o), (me = n), (me & 6) === 0 && vn());
    }
  }
  function Ol() {
    ((vt = jr.current), Te(jr));
  }
  function Xn(e, n) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var o = e.timeoutHandle;
    if ((o !== -1 && ((e.timeoutHandle = -1), ux(o)), Le !== null))
      for (o = Le.return; o !== null; ) {
        var a = o;
        switch ((Ha(a), a.tag)) {
          case 1:
            ((a = a.type.childContextTypes), a != null && bo());
            break;
          case 3:
            (Tr(), Te(ut), Te(et), nl());
            break;
          case 5:
            el(a);
            break;
          case 4:
            Tr();
            break;
          case 13:
            Te(je);
            break;
          case 19:
            Te(je);
            break;
          case 10:
            Ka(a.type._context);
            break;
          case 22:
          case 23:
            Ol();
        }
        o = o.return;
      }
    if (
      ((Ye = e),
      (Le = e = Tn(e.current, null)),
      (Qe = vt = n),
      (He = 0),
      (ji = null),
      (Pl = Yo = Gn = 0),
      (ft = Ai = null),
      Hn !== null)
    ) {
      for (n = 0; n < Hn.length; n++)
        if (((o = Hn[n]), (a = o.interleaved), a !== null)) {
          o.interleaved = null;
          var u = a.next,
            p = o.pending;
          if (p !== null) {
            var g = p.next;
            ((p.next = u), (a.next = g));
          }
          o.pending = a;
        }
      Hn = null;
    }
    return e;
  }
  function Mp(e, n) {
    do {
      var o = Le;
      try {
        if ((Xa(), (_o.current = zo), Lo)) {
          for (var a = Ae.memoizedState; a !== null; ) {
            var u = a.queue;
            (u !== null && (u.pending = null), (a = a.next));
          }
          Lo = !1;
        }
        if (
          (($n = 0),
          (Ge = We = Ae = null),
          (Ci = !1),
          (bi = 0),
          (Tl.current = null),
          o === null || o.return === null)
        ) {
          ((He = 1), (ji = n), (Le = null));
          break;
        }
        e: {
          var p = e,
            g = o.return,
            S = o,
            C = n;
          if (
            ((n = Qe),
            (S.flags |= 32768),
            C !== null && typeof C == "object" && typeof C.then == "function")
          ) {
            var R = C,
              z = S,
              B = z.tag;
            if ((z.mode & 1) === 0 && (B === 0 || B === 11 || B === 15)) {
              var V = z.alternate;
              V
                ? ((z.updateQueue = V.updateQueue),
                  (z.memoizedState = V.memoizedState),
                  (z.lanes = V.lanes))
                : ((z.updateQueue = null), (z.memoizedState = null));
            }
            var Y = np(g);
            if (Y !== null) {
              ((Y.flags &= -257), rp(Y, g, S, p, n), Y.mode & 1 && tp(p, R, n), (n = Y), (C = R));
              var q = n.updateQueue;
              if (q === null) {
                var te = new Set();
                (te.add(C), (n.updateQueue = te));
              } else q.add(C);
              break e;
            } else {
              if ((n & 1) === 0) {
                (tp(p, R, n), Fl());
                break e;
              }
              C = Error(i(426));
            }
          } else if (Ne && S.mode & 1) {
            var Fe = np(g);
            if (Fe !== null) {
              ((Fe.flags & 65536) === 0 && (Fe.flags |= 256), rp(Fe, g, S, p, n), Ga(Pr(C, S)));
              break e;
            }
          }
          ((p = C = Pr(C, S)),
            He !== 4 && (He = 2),
            Ai === null ? (Ai = [p]) : Ai.push(p),
            (p = g));
          do {
            switch (p.tag) {
              case 3:
                ((p.flags |= 65536), (n &= -n), (p.lanes |= n));
                var N = Jf(p, C, n);
                Tf(p, N);
                break e;
              case 1:
                S = C;
                var E = p.type,
                  M = p.stateNode;
                if (
                  (p.flags & 128) === 0 &&
                  (typeof E.getDerivedStateFromError == "function" ||
                    (M !== null &&
                      typeof M.componentDidCatch == "function" &&
                      (kn === null || !kn.has(M))))
                ) {
                  ((p.flags |= 65536), (n &= -n), (p.lanes |= n));
                  var U = ep(p, S, n);
                  Tf(p, U);
                  break e;
                }
            }
            p = p.return;
          } while (p !== null);
        }
        Op(o);
      } catch (ne) {
        ((n = ne), Le === o && o !== null && (Le = o = o.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Rp() {
    var e = Go.current;
    return ((Go.current = zo), e === null ? zo : e);
  }
  function Fl() {
    ((He === 0 || He === 3 || He === 2) && (He = 4),
      Ye === null || ((Gn & 268435455) === 0 && (Yo & 268435455) === 0) || En(Ye, Qe));
  }
  function Jo(e, n) {
    var o = me;
    me |= 2;
    var a = Rp();
    (Ye !== e || Qe !== n) && ((nn = null), Xn(e, n));
    do
      try {
        Ox();
        break;
      } catch (u) {
        Mp(e, u);
      }
    while (!0);
    if ((Xa(), (me = o), (Go.current = a), Le !== null)) throw Error(i(261));
    return ((Ye = null), (Qe = 0), He);
  }
  function Ox() {
    for (; Le !== null; ) Dp(Le);
  }
  function Fx() {
    for (; Le !== null && !s0(); ) Dp(Le);
  }
  function Dp(e) {
    var n = Lp(e.alternate, e, vt);
    ((e.memoizedProps = e.pendingProps), n === null ? Op(e) : (Le = n), (Tl.current = null));
  }
  function Op(e) {
    var n = e;
    do {
      var o = n.alternate;
      if (((e = n.return), (n.flags & 32768) === 0)) {
        if (((o = Px(o, n, vt)), o !== null)) {
          Le = o;
          return;
        }
      } else {
        if (((o = Nx(o, n)), o !== null)) {
          ((o.flags &= 32767), (Le = o));
          return;
        }
        if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((He = 6), (Le = null));
          return;
        }
      }
      if (((n = n.sibling), n !== null)) {
        Le = n;
        return;
      }
      Le = n = e;
    } while (n !== null);
    He === 0 && (He = 5);
  }
  function Kn(e, n, o) {
    var a = ke,
      u = Ct.transition;
    try {
      ((Ct.transition = null), (ke = 1), _x(e, n, o, a));
    } finally {
      ((Ct.transition = u), (ke = a));
    }
    return null;
  }
  function _x(e, n, o, a) {
    do Mr();
    while (Cn !== null);
    if ((me & 6) !== 0) throw Error(i(327));
    o = e.finishedWork;
    var u = e.finishedLanes;
    if (o === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), o === e.current)) throw Error(i(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var p = o.lanes | o.childLanes;
    if (
      (g0(e, p),
      e === Ye && ((Le = Ye = null), (Qe = 0)),
      ((o.subtreeFlags & 2064) === 0 && (o.flags & 2064) === 0) ||
        Ko ||
        ((Ko = !0),
        Ip(no, function () {
          return (Mr(), null);
        })),
      (p = (o.flags & 15990) !== 0),
      (o.subtreeFlags & 15990) !== 0 || p)
    ) {
      ((p = Ct.transition), (Ct.transition = null));
      var g = ke;
      ke = 1;
      var S = me;
      ((me |= 4),
        (Tl.current = null),
        Ax(e, o),
        bp(o, e),
        nx(Fa),
        (uo = !!Oa),
        (Fa = Oa = null),
        (e.current = o),
        Mx(o),
        a0(),
        (me = S),
        (ke = g),
        (Ct.transition = p));
    } else e.current = o;
    if (
      (Ko && ((Ko = !1), (Cn = e), (qo = u)),
      (p = e.pendingLanes),
      p === 0 && (kn = null),
      c0(o.stateNode),
      pt(e, Oe()),
      n !== null)
    )
      for (a = e.onRecoverableError, o = 0; o < n.length; o++)
        ((u = n[o]), a(u.value, { componentStack: u.stack, digest: u.digest }));
    if (Xo) throw ((Xo = !1), (e = jl), (jl = null), e);
    return (
      (qo & 1) !== 0 && e.tag !== 0 && Mr(),
      (p = e.pendingLanes),
      (p & 1) !== 0 ? (e === Al ? Mi++ : ((Mi = 0), (Al = e))) : (Mi = 0),
      vn(),
      null
    );
  }
  function Mr() {
    if (Cn !== null) {
      var e = Sd(qo),
        n = Ct.transition,
        o = ke;
      try {
        if (((Ct.transition = null), (ke = 16 > e ? 16 : e), Cn === null)) var a = !1;
        else {
          if (((e = Cn), (Cn = null), (qo = 0), (me & 6) !== 0)) throw Error(i(331));
          var u = me;
          for (me |= 4, K = e.current; K !== null; ) {
            var p = K,
              g = p.child;
            if ((K.flags & 16) !== 0) {
              var S = p.deletions;
              if (S !== null) {
                for (var C = 0; C < S.length; C++) {
                  var R = S[C];
                  for (K = R; K !== null; ) {
                    var z = K;
                    switch (z.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ni(8, z, p);
                    }
                    var B = z.child;
                    if (B !== null) ((B.return = z), (K = B));
                    else
                      for (; K !== null; ) {
                        z = K;
                        var V = z.sibling,
                          Y = z.return;
                        if ((xp(z), z === R)) {
                          K = null;
                          break;
                        }
                        if (V !== null) {
                          ((V.return = Y), (K = V));
                          break;
                        }
                        K = Y;
                      }
                  }
                }
                var q = p.alternate;
                if (q !== null) {
                  var te = q.child;
                  if (te !== null) {
                    q.child = null;
                    do {
                      var Fe = te.sibling;
                      ((te.sibling = null), (te = Fe));
                    } while (te !== null);
                  }
                }
                K = p;
              }
            }
            if ((p.subtreeFlags & 2064) !== 0 && g !== null) ((g.return = p), (K = g));
            else
              e: for (; K !== null; ) {
                if (((p = K), (p.flags & 2048) !== 0))
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ni(9, p, p.return);
                  }
                var N = p.sibling;
                if (N !== null) {
                  ((N.return = p.return), (K = N));
                  break e;
                }
                K = p.return;
              }
          }
          var E = e.current;
          for (K = E; K !== null; ) {
            g = K;
            var M = g.child;
            if ((g.subtreeFlags & 2064) !== 0 && M !== null) ((M.return = g), (K = M));
            else
              e: for (g = E; K !== null; ) {
                if (((S = K), (S.flags & 2048) !== 0))
                  try {
                    switch (S.tag) {
                      case 0:
                      case 11:
                      case 15:
                        $o(9, S);
                    }
                  } catch (ne) {
                    Re(S, S.return, ne);
                  }
                if (S === g) {
                  K = null;
                  break e;
                }
                var U = S.sibling;
                if (U !== null) {
                  ((U.return = S.return), (K = U));
                  break e;
                }
                K = S.return;
              }
          }
          if (((me = u), vn(), Vt && typeof Vt.onPostCommitFiberRoot == "function"))
            try {
              Vt.onPostCommitFiberRoot(ro, e);
            } catch {}
          a = !0;
        }
        return a;
      } finally {
        ((ke = o), (Ct.transition = n));
      }
    }
    return !1;
  }
  function Fp(e, n, o) {
    ((n = Pr(o, n)),
      (n = Jf(e, n, 1)),
      (e = wn(e, n, 1)),
      (n = st()),
      e !== null && (ti(e, 1, n), pt(e, n)));
  }
  function Re(e, n, o) {
    if (e.tag === 3) Fp(e, e, o);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Fp(n, e, o);
          break;
        } else if (n.tag === 1) {
          var a = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" && (kn === null || !kn.has(a)))
          ) {
            ((e = Pr(o, e)),
              (e = ep(n, e, 1)),
              (n = wn(n, e, 1)),
              (e = st()),
              n !== null && (ti(n, 1, e), pt(n, e)));
            break;
          }
        }
        n = n.return;
      }
  }
  function Lx(e, n, o) {
    var a = e.pingCache;
    (a !== null && a.delete(n),
      (n = st()),
      (e.pingedLanes |= e.suspendedLanes & o),
      Ye === e &&
        (Qe & o) === o &&
        (He === 4 || (He === 3 && (Qe & 130023424) === Qe && 500 > Oe() - Nl)
          ? Xn(e, 0)
          : (Pl |= o)),
      pt(e, n));
  }
  function _p(e, n) {
    n === 0 &&
      ((e.mode & 1) === 0
        ? (n = 1)
        : ((n = oo), (oo <<= 1), (oo & 130023424) === 0 && (oo = 4194304)));
    var o = st();
    ((e = Jt(e, n)), e !== null && (ti(e, n, o), pt(e, o)));
  }
  function Ix(e) {
    var n = e.memoizedState,
      o = 0;
    (n !== null && (o = n.retryLane), _p(e, o));
  }
  function Vx(e, n) {
    var o = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode,
          u = e.memoizedState;
        u !== null && (o = u.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      default:
        throw Error(i(314));
    }
    (a !== null && a.delete(n), _p(e, o));
  }
  var Lp;
  Lp = function (e, n, o) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps || ut.current) dt = !0;
      else {
        if ((e.lanes & o) === 0 && (n.flags & 128) === 0) return ((dt = !1), Tx(e, n, o));
        dt = (e.flags & 131072) !== 0;
      }
    else ((dt = !1), Ne && (n.flags & 1048576) !== 0 && gf(n, No, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 2:
        var a = n.type;
        (Ho(e, n), (e = n.pendingProps));
        var u = xr(n, et.current);
        (Er(n, o), (u = ol(null, n, a, e, u, o)));
        var p = sl();
        return (
          (n.flags |= 1),
          typeof u == "object" &&
          u !== null &&
          typeof u.render == "function" &&
          u.$$typeof === void 0
            ? ((n.tag = 1),
              (n.memoizedState = null),
              (n.updateQueue = null),
              ct(a) ? ((p = !0), Eo(n)) : (p = !1),
              (n.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null),
              Za(n),
              (u.updater = Bo),
              (n.stateNode = u),
              (u._reactInternals = n),
              fl(n, a, e, o),
              (n = gl(null, n, a, !0, p, o)))
            : ((n.tag = 0), Ne && p && Wa(n), ot(null, n, u, o), (n = n.child)),
          n
        );
      case 16:
        a = n.elementType;
        e: {
          switch (
            (Ho(e, n),
            (e = n.pendingProps),
            (u = a._init),
            (a = u(a._payload)),
            (n.type = a),
            (u = n.tag = Bx(a)),
            (e = At(a, e)),
            u)
          ) {
            case 0:
              n = ml(null, n, a, e, o);
              break e;
            case 1:
              n = up(null, n, a, e, o);
              break e;
            case 11:
              n = ip(null, n, a, e, o);
              break e;
            case 14:
              n = op(null, n, a, At(a.type, e), o);
              break e;
          }
          throw Error(i(306, a, ""));
        }
        return n;
      case 0:
        return (
          (a = n.type),
          (u = n.pendingProps),
          (u = n.elementType === a ? u : At(a, u)),
          ml(e, n, a, u, o)
        );
      case 1:
        return (
          (a = n.type),
          (u = n.pendingProps),
          (u = n.elementType === a ? u : At(a, u)),
          up(e, n, a, u, o)
        );
      case 3:
        e: {
          if ((cp(n), e === null)) throw Error(i(387));
          ((a = n.pendingProps),
            (p = n.memoizedState),
            (u = p.element),
            Ef(e, n),
            Oo(n, a, null, o));
          var g = n.memoizedState;
          if (((a = g.element), p.isDehydrated))
            if (
              ((p = {
                element: a,
                isDehydrated: !1,
                cache: g.cache,
                pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
                transitions: g.transitions,
              }),
              (n.updateQueue.baseState = p),
              (n.memoizedState = p),
              n.flags & 256)
            ) {
              ((u = Pr(Error(i(423)), n)), (n = dp(e, n, a, o, u)));
              break e;
            } else if (a !== u) {
              ((u = Pr(Error(i(424)), n)), (n = dp(e, n, a, o, u)));
              break e;
            } else
              for (
                yt = mn(n.stateNode.containerInfo.firstChild),
                  gt = n,
                  Ne = !0,
                  jt = null,
                  o = Cf(n, null, a, o),
                  n.child = o;
                o;
              )
                ((o.flags = (o.flags & -3) | 4096), (o = o.sibling));
          else {
            if ((kr(), a === u)) {
              n = tn(e, n, o);
              break e;
            }
            ot(e, n, a, o);
          }
          n = n.child;
        }
        return n;
      case 5:
        return (
          Nf(n),
          e === null && $a(n),
          (a = n.type),
          (u = n.pendingProps),
          (p = e !== null ? e.memoizedProps : null),
          (g = u.children),
          _a(a, u) ? (g = null) : p !== null && _a(a, p) && (n.flags |= 32),
          lp(e, n),
          ot(e, n, g, o),
          n.child
        );
      case 6:
        return (e === null && $a(n), null);
      case 13:
        return fp(e, n, o);
      case 4:
        return (
          Ja(n, n.stateNode.containerInfo),
          (a = n.pendingProps),
          e === null ? (n.child = Cr(n, null, a, o)) : ot(e, n, a, o),
          n.child
        );
      case 11:
        return (
          (a = n.type),
          (u = n.pendingProps),
          (u = n.elementType === a ? u : At(a, u)),
          ip(e, n, a, u, o)
        );
      case 7:
        return (ot(e, n, n.pendingProps, o), n.child);
      case 8:
        return (ot(e, n, n.pendingProps.children, o), n.child);
      case 12:
        return (ot(e, n, n.pendingProps.children, o), n.child);
      case 10:
        e: {
          if (
            ((a = n.type._context),
            (u = n.pendingProps),
            (p = n.memoizedProps),
            (g = u.value),
            Ce(Mo, a._currentValue),
            (a._currentValue = g),
            p !== null)
          )
            if (Nt(p.value, g)) {
              if (p.children === u.children && !ut.current) {
                n = tn(e, n, o);
                break e;
              }
            } else
              for (p = n.child, p !== null && (p.return = n); p !== null; ) {
                var S = p.dependencies;
                if (S !== null) {
                  g = p.child;
                  for (var C = S.firstContext; C !== null; ) {
                    if (C.context === a) {
                      if (p.tag === 1) {
                        ((C = en(-1, o & -o)), (C.tag = 2));
                        var R = p.updateQueue;
                        if (R !== null) {
                          R = R.shared;
                          var z = R.pending;
                          (z === null ? (C.next = C) : ((C.next = z.next), (z.next = C)),
                            (R.pending = C));
                        }
                      }
                      ((p.lanes |= o),
                        (C = p.alternate),
                        C !== null && (C.lanes |= o),
                        qa(p.return, o, n),
                        (S.lanes |= o));
                      break;
                    }
                    C = C.next;
                  }
                } else if (p.tag === 10) g = p.type === n.type ? null : p.child;
                else if (p.tag === 18) {
                  if (((g = p.return), g === null)) throw Error(i(341));
                  ((g.lanes |= o),
                    (S = g.alternate),
                    S !== null && (S.lanes |= o),
                    qa(g, o, n),
                    (g = p.sibling));
                } else g = p.child;
                if (g !== null) g.return = p;
                else
                  for (g = p; g !== null; ) {
                    if (g === n) {
                      g = null;
                      break;
                    }
                    if (((p = g.sibling), p !== null)) {
                      ((p.return = g.return), (g = p));
                      break;
                    }
                    g = g.return;
                  }
                p = g;
              }
          (ot(e, n, u.children, o), (n = n.child));
        }
        return n;
      case 9:
        return (
          (u = n.type),
          (a = n.pendingProps.children),
          Er(n, o),
          (u = St(u)),
          (a = a(u)),
          (n.flags |= 1),
          ot(e, n, a, o),
          n.child
        );
      case 14:
        return ((a = n.type), (u = At(a, n.pendingProps)), (u = At(a.type, u)), op(e, n, a, u, o));
      case 15:
        return sp(e, n, n.type, n.pendingProps, o);
      case 17:
        return (
          (a = n.type),
          (u = n.pendingProps),
          (u = n.elementType === a ? u : At(a, u)),
          Ho(e, n),
          (n.tag = 1),
          ct(a) ? ((e = !0), Eo(n)) : (e = !1),
          Er(n, o),
          Qf(n, a, u),
          fl(n, a, u, o),
          gl(null, n, a, !0, e, o)
        );
      case 19:
        return hp(e, n, o);
      case 22:
        return ap(e, n, o);
    }
    throw Error(i(156, n.tag));
  };
  function Ip(e, n) {
    return gd(e, n);
  }
  function zx(e, n, o, a) {
    ((this.tag = e),
      (this.key = o),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = n),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function bt(e, n, o, a) {
    return new zx(e, n, o, a);
  }
  function _l(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Bx(e) {
    if (typeof e == "function") return _l(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === Pe)) return 11;
      if (e === _e) return 14;
    }
    return 2;
  }
  function Tn(e, n) {
    var o = e.alternate;
    return (
      o === null
        ? ((o = bt(e.tag, n, e.key, e.mode)),
          (o.elementType = e.elementType),
          (o.type = e.type),
          (o.stateNode = e.stateNode),
          (o.alternate = e),
          (e.alternate = o))
        : ((o.pendingProps = n),
          (o.type = e.type),
          (o.flags = 0),
          (o.subtreeFlags = 0),
          (o.deletions = null)),
      (o.flags = e.flags & 14680064),
      (o.childLanes = e.childLanes),
      (o.lanes = e.lanes),
      (o.child = e.child),
      (o.memoizedProps = e.memoizedProps),
      (o.memoizedState = e.memoizedState),
      (o.updateQueue = e.updateQueue),
      (n = e.dependencies),
      (o.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (o.sibling = e.sibling),
      (o.index = e.index),
      (o.ref = e.ref),
      o
    );
  }
  function es(e, n, o, a, u, p) {
    var g = 2;
    if (((a = e), typeof e == "function")) _l(e) && (g = 1);
    else if (typeof e == "string") g = 5;
    else
      e: switch (e) {
        case G:
          return qn(o.children, u, p, n);
        case _:
          ((g = 8), (u |= 8));
          break;
        case ue:
          return ((e = bt(12, o, n, u | 2)), (e.elementType = ue), (e.lanes = p), e);
        case Be:
          return ((e = bt(13, o, n, u)), (e.elementType = Be), (e.lanes = p), e);
        case Ke:
          return ((e = bt(19, o, n, u)), (e.elementType = Ke), (e.lanes = p), e);
        case xe:
          return ts(o, u, p, n);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ve:
                g = 10;
                break e;
              case ze:
                g = 9;
                break e;
              case Pe:
                g = 11;
                break e;
              case _e:
                g = 14;
                break e;
              case Se:
                ((g = 16), (a = null));
                break e;
            }
          throw Error(i(130, e == null ? e : typeof e, ""));
      }
    return ((n = bt(g, o, n, u)), (n.elementType = e), (n.type = a), (n.lanes = p), n);
  }
  function qn(e, n, o, a) {
    return ((e = bt(7, e, a, n)), (e.lanes = o), e);
  }
  function ts(e, n, o, a) {
    return (
      (e = bt(22, e, a, n)),
      (e.elementType = xe),
      (e.lanes = o),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function Ll(e, n, o) {
    return ((e = bt(6, e, null, n)), (e.lanes = o), e);
  }
  function Il(e, n, o) {
    return (
      (n = bt(4, e.children !== null ? e.children : [], e.key, n)),
      (n.lanes = o),
      (n.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      n
    );
  }
  function Wx(e, n, o, a, u) {
    ((this.tag = n),
      (this.containerInfo = e),
      (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = da(0)),
      (this.expirationTimes = da(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = da(0)),
      (this.identifierPrefix = a),
      (this.onRecoverableError = u),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Vl(e, n, o, a, u, p, g, S, C) {
    return (
      (e = new Wx(e, n, o, S, C)),
      n === 1 ? ((n = 1), p === !0 && (n |= 8)) : (n = 0),
      (p = bt(3, null, null, n)),
      (e.current = p),
      (p.stateNode = e),
      (p.memoizedState = {
        element: a,
        isDehydrated: o,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Za(p),
      e
    );
  }
  function Hx(e, n, o) {
    var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: ee,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: n,
      implementation: o,
    };
  }
  function Vp(e) {
    if (!e) return yn;
    e = e._reactInternals;
    e: {
      if (In(e) !== e || e.tag !== 1) throw Error(i(170));
      var n = e;
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context;
            break e;
          case 1:
            if (ct(n.type)) {
              n = n.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        n = n.return;
      } while (n !== null);
      throw Error(i(171));
    }
    if (e.tag === 1) {
      var o = e.type;
      if (ct(o)) return pf(e, o, n);
    }
    return n;
  }
  function zp(e, n, o, a, u, p, g, S, C) {
    return (
      (e = Vl(o, a, !0, e, u, p, g, S, C)),
      (e.context = Vp(null)),
      (o = e.current),
      (a = st()),
      (u = bn(o)),
      (p = en(a, u)),
      (p.callback = n ?? null),
      wn(o, p, u),
      (e.current.lanes = u),
      ti(e, u, a),
      pt(e, a),
      e
    );
  }
  function ns(e, n, o, a) {
    var u = n.current,
      p = st(),
      g = bn(u);
    return (
      (o = Vp(o)),
      n.context === null ? (n.context = o) : (n.pendingContext = o),
      (n = en(p, g)),
      (n.payload = { element: e }),
      (a = a === void 0 ? null : a),
      a !== null && (n.callback = a),
      (e = wn(u, n, g)),
      e !== null && (Dt(e, u, g, p), Do(e, u, g)),
      g
    );
  }
  function rs(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Bp(e, n) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var o = e.retryLane;
      e.retryLane = o !== 0 && o < n ? o : n;
    }
  }
  function zl(e, n) {
    (Bp(e, n), (e = e.alternate) && Bp(e, n));
  }
  function Ux() {
    return null;
  }
  var Wp =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Bl(e) {
    this._internalRoot = e;
  }
  ((is.prototype.render = Bl.prototype.render =
    function (e) {
      var n = this._internalRoot;
      if (n === null) throw Error(i(409));
      ns(e, n, null, null);
    }),
    (is.prototype.unmount = Bl.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var n = e.containerInfo;
          (Yn(function () {
            ns(null, e, null, null);
          }),
            (n[Kt] = null));
        }
      }));
  function is(e) {
    this._internalRoot = e;
  }
  is.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var n = bd();
      e = { blockedOn: null, target: e, priority: n };
      for (var o = 0; o < fn.length && n !== 0 && n < fn[o].priority; o++);
      (fn.splice(o, 0, e), o === 0 && Pd(e));
    }
  };
  function Wl(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function os(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Hp() {}
  function $x(e, n, o, a, u) {
    if (u) {
      if (typeof a == "function") {
        var p = a;
        a = function () {
          var R = rs(g);
          p.call(R);
        };
      }
      var g = zp(n, a, e, 0, null, !1, !1, "", Hp);
      return (
        (e._reactRootContainer = g),
        (e[Kt] = g.current),
        mi(e.nodeType === 8 ? e.parentNode : e),
        Yn(),
        g
      );
    }
    for (; (u = e.lastChild); ) e.removeChild(u);
    if (typeof a == "function") {
      var S = a;
      a = function () {
        var R = rs(C);
        S.call(R);
      };
    }
    var C = Vl(e, 0, !1, null, null, !1, !1, "", Hp);
    return (
      (e._reactRootContainer = C),
      (e[Kt] = C.current),
      mi(e.nodeType === 8 ? e.parentNode : e),
      Yn(function () {
        ns(n, C, o, a);
      }),
      C
    );
  }
  function ss(e, n, o, a, u) {
    var p = o._reactRootContainer;
    if (p) {
      var g = p;
      if (typeof u == "function") {
        var S = u;
        u = function () {
          var C = rs(g);
          S.call(C);
        };
      }
      ns(n, g, e, u);
    } else g = $x(o, n, e, u, a);
    return rs(g);
  }
  ((kd = function (e) {
    switch (e.tag) {
      case 3:
        var n = e.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var o = ei(n.pendingLanes);
          o !== 0 && (fa(n, o | 1), pt(n, Oe()), (me & 6) === 0 && ((Ar = Oe() + 500), vn()));
        }
        break;
      case 13:
        (Yn(function () {
          var a = Jt(e, 1);
          if (a !== null) {
            var u = st();
            Dt(a, e, 1, u);
          }
        }),
          zl(e, 1));
    }
  }),
    (pa = function (e) {
      if (e.tag === 13) {
        var n = Jt(e, 134217728);
        if (n !== null) {
          var o = st();
          Dt(n, e, 134217728, o);
        }
        zl(e, 134217728);
      }
    }),
    (Cd = function (e) {
      if (e.tag === 13) {
        var n = bn(e),
          o = Jt(e, n);
        if (o !== null) {
          var a = st();
          Dt(o, e, n, a);
        }
        zl(e, n);
      }
    }),
    (bd = function () {
      return ke;
    }),
    (Ed = function (e, n) {
      var o = ke;
      try {
        return ((ke = e), n());
      } finally {
        ke = o;
      }
    }),
    (oa = function (e, n, o) {
      switch (n) {
        case "input":
          if ((Qs(e, o), (n = o.name), o.type === "radio" && n != null)) {
            for (o = e; o.parentNode; ) o = o.parentNode;
            for (
              o = o.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'),
                n = 0;
              n < o.length;
              n++
            ) {
              var a = o[n];
              if (a !== e && a.form === e.form) {
                var u = Co(a);
                if (!u) throw Error(i(90));
                (Ln(a), Qs(a, u));
              }
            }
          }
          break;
        case "textarea":
          ed(e, o);
          break;
        case "select":
          ((n = o.value), n != null && ar(e, !!o.multiple, n, !1));
      }
    }),
    (ud = Dl),
    (cd = Yn));
  var Gx = { usingClientEntryPoint: !1, Events: [vi, yr, Co, ad, ld, Dl] },
    Ri = {
      findFiberByHostInstance: Vn,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    Yx = {
      bundleType: Ri.bundleType,
      version: Ri.version,
      rendererPackageName: Ri.rendererPackageName,
      rendererConfig: Ri.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: W.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = hd(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: Ri.findFiberByHostInstance || Ux,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var as = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!as.isDisabled && as.supportsFiber)
      try {
        ((ro = as.inject(Yx)), (Vt = as));
      } catch {}
  }
  return (
    (ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gx),
    (ht.createPortal = function (e, n) {
      var o = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Wl(n)) throw Error(i(200));
      return Hx(e, n, null, o);
    }),
    (ht.createRoot = function (e, n) {
      if (!Wl(e)) throw Error(i(299));
      var o = !1,
        a = "",
        u = Wp;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (o = !0),
          n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (u = n.onRecoverableError)),
        (n = Vl(e, 1, !1, null, null, o, !1, a, u)),
        (e[Kt] = n.current),
        mi(e.nodeType === 8 ? e.parentNode : e),
        new Bl(n)
      );
    }),
    (ht.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var n = e._reactInternals;
      if (n === void 0)
        throw typeof e.render == "function"
          ? Error(i(188))
          : ((e = Object.keys(e).join(",")), Error(i(268, e)));
      return ((e = hd(n)), (e = e === null ? null : e.stateNode), e);
    }),
    (ht.flushSync = function (e) {
      return Yn(e);
    }),
    (ht.hydrate = function (e, n, o) {
      if (!os(n)) throw Error(i(200));
      return ss(null, e, n, !0, o);
    }),
    (ht.hydrateRoot = function (e, n, o) {
      if (!Wl(e)) throw Error(i(405));
      var a = (o != null && o.hydratedSources) || null,
        u = !1,
        p = "",
        g = Wp;
      if (
        (o != null &&
          (o.unstable_strictMode === !0 && (u = !0),
          o.identifierPrefix !== void 0 && (p = o.identifierPrefix),
          o.onRecoverableError !== void 0 && (g = o.onRecoverableError)),
        (n = zp(n, null, e, 1, o ?? null, u, !1, p, g)),
        (e[Kt] = n.current),
        mi(e),
        a)
      )
        for (e = 0; e < a.length; e++)
          ((o = a[e]),
            (u = o._getVersion),
            (u = u(o._source)),
            n.mutableSourceEagerHydrationData == null
              ? (n.mutableSourceEagerHydrationData = [o, u])
              : n.mutableSourceEagerHydrationData.push(o, u));
      return new is(n);
    }),
    (ht.render = function (e, n, o) {
      if (!os(n)) throw Error(i(200));
      return ss(null, e, n, !1, o);
    }),
    (ht.unmountComponentAtNode = function (e) {
      if (!os(e)) throw Error(i(40));
      return e._reactRootContainer
        ? (Yn(function () {
            ss(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[Kt] = null));
            });
          }),
          !0)
        : !1;
    }),
    (ht.unstable_batchedUpdates = Dl),
    (ht.unstable_renderSubtreeIntoContainer = function (e, n, o, a) {
      if (!os(o)) throw Error(i(200));
      if (e == null || e._reactInternals === void 0) throw Error(i(38));
      return ss(e, n, o, !1, a);
    }),
    (ht.version = "18.3.1-next-f1338f8080-20240426"),
    ht
  );
}
var Qp;
function Jm() {
  if (Qp) return $l.exports;
  Qp = 1;
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (r) {
        console.error(r);
      }
  }
  return (t(), ($l.exports = tw()), $l.exports);
}
var Zp;
function nw() {
  if (Zp) return us;
  Zp = 1;
  var t = Jm();
  return ((us.createRoot = t.createRoot), (us.hydrateRoot = t.hydrateRoot), us);
}
var rw = nw(),
  k = cc();
const iw = Zm(k),
  dc = Kx({ __proto__: null, default: iw }, [k]),
  eg = k.createContext({});
function ow(t) {
  const r = k.useRef(null);
  return (r.current === null && (r.current = t()), r.current);
}
const sw = typeof window < "u",
  aw = sw ? k.useLayoutEffect : k.useEffect,
  fc = k.createContext(null);
function pc(t, r) {
  t.indexOf(r) === -1 && t.push(r);
}
function Ms(t, r) {
  const i = t.indexOf(r);
  i > -1 && t.splice(i, 1);
}
const Yt = (t, r, i) => (i > r ? r : i < t ? t : i);
let hc = () => {};
const on = {},
  tg = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function ng(t) {
  return typeof t == "object" && t !== null;
}
const rg = (t) => /^0[^.\s]+$/u.test(t);
function ig(t) {
  let r;
  return () => (r === void 0 && (r = t()), r);
}
const Tt = (t) => t,
  lw = (t, r) => (i) => r(t(i)),
  Ki = (...t) => t.reduce(lw),
  Bi = (t, r, i) => {
    const s = r - t;
    return s === 0 ? 1 : (i - t) / s;
  };
class mc {
  constructor() {
    this.subscriptions = [];
  }
  add(r) {
    return (pc(this.subscriptions, r), () => Ms(this.subscriptions, r));
  }
  notify(r, i, s) {
    const l = this.subscriptions.length;
    if (l)
      if (l === 1) this.subscriptions[0](r, i, s);
      else
        for (let c = 0; c < l; c++) {
          const d = this.subscriptions[c];
          d && d(r, i, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const _t = (t) => t * 1e3,
  Et = (t) => t / 1e3;
function og(t, r) {
  return r ? t * (1e3 / r) : 0;
}
const sg = (t, r, i) => (((1 - 3 * i + 3 * r) * t + (3 * i - 6 * r)) * t + 3 * r) * t,
  uw = 1e-7,
  cw = 12;
function dw(t, r, i, s, l) {
  let c,
    d,
    f = 0;
  do ((d = r + (i - r) / 2), (c = sg(d, s, l) - t), c > 0 ? (i = d) : (r = d));
  while (Math.abs(c) > uw && ++f < cw);
  return d;
}
function qi(t, r, i, s) {
  if (t === r && i === s) return Tt;
  const l = (c) => dw(c, 0, 1, t, i);
  return (c) => (c === 0 || c === 1 ? c : sg(l(c), r, s));
}
const ag = (t) => (r) => (r <= 0.5 ? t(2 * r) / 2 : (2 - t(2 * (1 - r))) / 2),
  lg = (t) => (r) => 1 - t(1 - r),
  ug = qi(0.33, 1.53, 0.69, 0.99),
  gc = lg(ug),
  cg = ag(gc),
  dg = (t) => ((t *= 2) < 1 ? 0.5 * gc(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)))),
  yc = (t) => 1 - Math.sin(Math.acos(t)),
  fg = lg(yc),
  pg = ag(yc),
  fw = qi(0.42, 0, 1, 1),
  pw = qi(0, 0, 0.58, 1),
  hg = qi(0.42, 0, 0.58, 1),
  hw = (t) => Array.isArray(t) && typeof t[0] != "number",
  mg = (t) => Array.isArray(t) && typeof t[0] == "number",
  mw = {
    linear: Tt,
    easeIn: fw,
    easeInOut: hg,
    easeOut: pw,
    circIn: yc,
    circInOut: pg,
    circOut: fg,
    backIn: gc,
    backInOut: cg,
    backOut: ug,
    anticipate: dg,
  },
  gw = (t) => typeof t == "string",
  Jp = (t) => {
    if (mg(t)) {
      hc(t.length === 4);
      const [r, i, s, l] = t;
      return qi(r, i, s, l);
    } else if (gw(t)) return mw[t];
    return t;
  },
  cs = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ];
function yw(t, r) {
  let i = new Set(),
    s = new Set(),
    l = !1,
    c = !1;
  const d = new WeakSet();
  let f = { delta: 0, timestamp: 0, isProcessing: !1 };
  function h(y) {
    (d.has(y) && (m.schedule(y), t()), y(f));
  }
  const m = {
    schedule: (y, x = !1, w = !1) => {
      const A = w && l ? i : s;
      return (x && d.add(y), A.has(y) || A.add(y), y);
    },
    cancel: (y) => {
      (s.delete(y), d.delete(y));
    },
    process: (y) => {
      if (((f = y), l)) {
        c = !0;
        return;
      }
      ((l = !0),
        ([i, s] = [s, i]),
        i.forEach(h),
        i.clear(),
        (l = !1),
        c && ((c = !1), m.process(y)));
    },
  };
  return m;
}
const vw = 40;
function gg(t, r) {
  let i = !1,
    s = !0;
  const l = { delta: 0, timestamp: 0, isProcessing: !1 },
    c = () => (i = !0),
    d = cs.reduce((F, W) => ((F[W] = yw(c)), F), {}),
    {
      setup: f,
      read: h,
      resolveKeyframes: m,
      preUpdate: y,
      update: x,
      preRender: w,
      render: P,
      postRender: A,
    } = d,
    b = () => {
      const F = on.useManualTiming ? l.timestamp : performance.now();
      ((i = !1),
        on.useManualTiming || (l.delta = s ? 1e3 / 60 : Math.max(Math.min(F - l.timestamp, vw), 1)),
        (l.timestamp = F),
        (l.isProcessing = !0),
        f.process(l),
        h.process(l),
        m.process(l),
        y.process(l),
        x.process(l),
        w.process(l),
        P.process(l),
        A.process(l),
        (l.isProcessing = !1),
        i && r && ((s = !1), t(b)));
    },
    j = () => {
      ((i = !0), (s = !0), l.isProcessing || t(b));
    };
  return {
    schedule: cs.reduce((F, W) => {
      const $ = d[W];
      return ((F[W] = (ee, G = !1, _ = !1) => (i || j(), $.schedule(ee, G, _))), F);
    }, {}),
    cancel: (F) => {
      for (let W = 0; W < cs.length; W++) d[cs[W]].cancel(F);
    },
    state: l,
    steps: d,
  };
}
const {
  schedule: be,
  cancel: On,
  state: Ze,
  steps: Xl,
} = gg(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Tt, !0);
let Ss;
function xw() {
  Ss = void 0;
}
const at = {
    now: () => (
      Ss === void 0 &&
        at.set(Ze.isProcessing || on.useManualTiming ? Ze.timestamp : performance.now()),
      Ss
    ),
    set: (t) => {
      ((Ss = t), queueMicrotask(xw));
    },
  },
  yg = (t) => (r) => typeof r == "string" && r.startsWith(t),
  vg = yg("--"),
  ww = yg("var(--"),
  vc = (t) => (ww(t) ? Sw.test(t.split("/*")[0].trim()) : !1),
  Sw = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function eh(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const Ur = { test: (t) => typeof t == "number", parse: parseFloat, transform: (t) => t },
  Wi = { ...Ur, transform: (t) => Yt(0, 1, t) },
  ds = { ...Ur, default: 1 },
  Li = (t) => Math.round(t * 1e5) / 1e5,
  xc = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function kw(t) {
  return t == null;
}
const Cw =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  wc = (t, r) => (i) =>
    !!(
      (typeof i == "string" && Cw.test(i) && i.startsWith(t)) ||
      (r && !kw(i) && Object.prototype.hasOwnProperty.call(i, r))
    ),
  xg = (t, r, i) => (s) => {
    if (typeof s != "string") return s;
    const [l, c, d, f] = s.match(xc);
    return {
      [t]: parseFloat(l),
      [r]: parseFloat(c),
      [i]: parseFloat(d),
      alpha: f !== void 0 ? parseFloat(f) : 1,
    };
  },
  bw = (t) => Yt(0, 255, t),
  Kl = { ...Ur, transform: (t) => Math.round(bw(t)) },
  er = {
    test: wc("rgb", "red"),
    parse: xg("red", "green", "blue"),
    transform: ({ red: t, green: r, blue: i, alpha: s = 1 }) =>
      "rgba(" +
      Kl.transform(t) +
      ", " +
      Kl.transform(r) +
      ", " +
      Kl.transform(i) +
      ", " +
      Li(Wi.transform(s)) +
      ")",
  };
function Ew(t) {
  let r = "",
    i = "",
    s = "",
    l = "";
  return (
    t.length > 5
      ? ((r = t.substring(1, 3)),
        (i = t.substring(3, 5)),
        (s = t.substring(5, 7)),
        (l = t.substring(7, 9)))
      : ((r = t.substring(1, 2)),
        (i = t.substring(2, 3)),
        (s = t.substring(3, 4)),
        (l = t.substring(4, 5)),
        (r += r),
        (i += i),
        (s += s),
        (l += l)),
    {
      red: parseInt(r, 16),
      green: parseInt(i, 16),
      blue: parseInt(s, 16),
      alpha: l ? parseInt(l, 16) / 255 : 1,
    }
  );
}
const Iu = { test: wc("#"), parse: Ew, transform: er.transform },
  Qi = (t) => ({
    test: (r) => typeof r == "string" && r.endsWith(t) && r.split(" ").length === 1,
    parse: parseFloat,
    transform: (r) => `${r}${t}`,
  }),
  An = Qi("deg"),
  Gt = Qi("%"),
  Z = Qi("px"),
  Tw = Qi("vh"),
  Pw = Qi("vw"),
  th = { ...Gt, parse: (t) => Gt.parse(t) / 100, transform: (t) => Gt.transform(t * 100) },
  _r = {
    test: wc("hsl", "hue"),
    parse: xg("hue", "saturation", "lightness"),
    transform: ({ hue: t, saturation: r, lightness: i, alpha: s = 1 }) =>
      "hsla(" +
      Math.round(t) +
      ", " +
      Gt.transform(Li(r)) +
      ", " +
      Gt.transform(Li(i)) +
      ", " +
      Li(Wi.transform(s)) +
      ")",
  },
  Ie = {
    test: (t) => er.test(t) || Iu.test(t) || _r.test(t),
    parse: (t) => (er.test(t) ? er.parse(t) : _r.test(t) ? _r.parse(t) : Iu.parse(t)),
    transform: (t) =>
      typeof t == "string" ? t : t.hasOwnProperty("red") ? er.transform(t) : _r.transform(t),
    getAnimatableNone: (t) => {
      const r = Ie.parse(t);
      return ((r.alpha = 0), Ie.transform(r));
    },
  },
  Nw =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function jw(t) {
  return (
    isNaN(t) && typeof t == "string" && (t.match(xc)?.length || 0) + (t.match(Nw)?.length || 0) > 0
  );
}
const wg = "number",
  Sg = "color",
  Aw = "var",
  Mw = "var(",
  nh = "${}",
  Rw =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Hi(t) {
  const r = t.toString(),
    i = [],
    s = { color: [], number: [], var: [] },
    l = [];
  let c = 0;
  const f = r
    .replace(
      Rw,
      (h) => (
        Ie.test(h)
          ? (s.color.push(c), l.push(Sg), i.push(Ie.parse(h)))
          : h.startsWith(Mw)
            ? (s.var.push(c), l.push(Aw), i.push(h))
            : (s.number.push(c), l.push(wg), i.push(parseFloat(h))),
        ++c,
        nh
      )
    )
    .split(nh);
  return { values: i, split: f, indexes: s, types: l };
}
function kg(t) {
  return Hi(t).values;
}
function Cg(t) {
  const { split: r, types: i } = Hi(t),
    s = r.length;
  return (l) => {
    let c = "";
    for (let d = 0; d < s; d++)
      if (((c += r[d]), l[d] !== void 0)) {
        const f = i[d];
        f === wg ? (c += Li(l[d])) : f === Sg ? (c += Ie.transform(l[d])) : (c += l[d]);
      }
    return c;
  };
}
const Dw = (t) => (typeof t == "number" ? 0 : Ie.test(t) ? Ie.getAnimatableNone(t) : t);
function Ow(t) {
  const r = kg(t);
  return Cg(t)(r.map(Dw));
}
const Lt = { test: jw, parse: kg, createTransformer: Cg, getAnimatableNone: Ow };
function ql(t, r, i) {
  return (
    i < 0 && (i += 1),
    i > 1 && (i -= 1),
    i < 1 / 6 ? t + (r - t) * 6 * i : i < 1 / 2 ? r : i < 2 / 3 ? t + (r - t) * (2 / 3 - i) * 6 : t
  );
}
function Fw({ hue: t, saturation: r, lightness: i, alpha: s }) {
  ((t /= 360), (r /= 100), (i /= 100));
  let l = 0,
    c = 0,
    d = 0;
  if (!r) l = c = d = i;
  else {
    const f = i < 0.5 ? i * (1 + r) : i + r - i * r,
      h = 2 * i - f;
    ((l = ql(h, f, t + 1 / 3)), (c = ql(h, f, t)), (d = ql(h, f, t - 1 / 3)));
  }
  return {
    red: Math.round(l * 255),
    green: Math.round(c * 255),
    blue: Math.round(d * 255),
    alpha: s,
  };
}
function Rs(t, r) {
  return (i) => (i > 0 ? r : t);
}
const Me = (t, r, i) => t + (r - t) * i,
  Ql = (t, r, i) => {
    const s = t * t,
      l = i * (r * r - s) + s;
    return l < 0 ? 0 : Math.sqrt(l);
  },
  _w = [Iu, er, _r],
  Lw = (t) => _w.find((r) => r.test(t));
function rh(t) {
  const r = Lw(t);
  if (!r) return !1;
  let i = r.parse(t);
  return (r === _r && (i = Fw(i)), i);
}
const ih = (t, r) => {
    const i = rh(t),
      s = rh(r);
    if (!i || !s) return Rs(t, r);
    const l = { ...i };
    return (c) => (
      (l.red = Ql(i.red, s.red, c)),
      (l.green = Ql(i.green, s.green, c)),
      (l.blue = Ql(i.blue, s.blue, c)),
      (l.alpha = Me(i.alpha, s.alpha, c)),
      er.transform(l)
    );
  },
  Vu = new Set(["none", "hidden"]);
function Iw(t, r) {
  return Vu.has(t) ? (i) => (i <= 0 ? t : r) : (i) => (i >= 1 ? r : t);
}
function Vw(t, r) {
  return (i) => Me(t, r, i);
}
function Sc(t) {
  return typeof t == "number"
    ? Vw
    : typeof t == "string"
      ? vc(t)
        ? Rs
        : Ie.test(t)
          ? ih
          : Ww
      : Array.isArray(t)
        ? bg
        : typeof t == "object"
          ? Ie.test(t)
            ? ih
            : zw
          : Rs;
}
function bg(t, r) {
  const i = [...t],
    s = i.length,
    l = t.map((c, d) => Sc(c)(c, r[d]));
  return (c) => {
    for (let d = 0; d < s; d++) i[d] = l[d](c);
    return i;
  };
}
function zw(t, r) {
  const i = { ...t, ...r },
    s = {};
  for (const l in i) t[l] !== void 0 && r[l] !== void 0 && (s[l] = Sc(t[l])(t[l], r[l]));
  return (l) => {
    for (const c in s) i[c] = s[c](l);
    return i;
  };
}
function Bw(t, r) {
  const i = [],
    s = { color: 0, var: 0, number: 0 };
  for (let l = 0; l < r.values.length; l++) {
    const c = r.types[l],
      d = t.indexes[c][s[c]],
      f = t.values[d] ?? 0;
    ((i[l] = f), s[c]++);
  }
  return i;
}
const Ww = (t, r) => {
  const i = Lt.createTransformer(r),
    s = Hi(t),
    l = Hi(r);
  return s.indexes.var.length === l.indexes.var.length &&
    s.indexes.color.length === l.indexes.color.length &&
    s.indexes.number.length >= l.indexes.number.length
    ? (Vu.has(t) && !l.values.length) || (Vu.has(r) && !s.values.length)
      ? Iw(t, r)
      : Ki(bg(Bw(s, l), l.values), i)
    : Rs(t, r);
};
function Eg(t, r, i) {
  return typeof t == "number" && typeof r == "number" && typeof i == "number"
    ? Me(t, r, i)
    : Sc(t)(t, r);
}
const Hw = (t) => {
    const r = ({ timestamp: i }) => t(i);
    return {
      start: (i = !0) => be.update(r, i),
      stop: () => On(r),
      now: () => (Ze.isProcessing ? Ze.timestamp : at.now()),
    };
  },
  Tg = (t, r, i = 10) => {
    let s = "";
    const l = Math.max(Math.round(r / i), 2);
    for (let c = 0; c < l; c++) s += Math.round(t(c / (l - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${s.substring(0, s.length - 2)})`;
  },
  Ds = 2e4;
function kc(t) {
  let r = 0;
  const i = 50;
  let s = t.next(r);
  for (; !s.done && r < Ds; ) ((r += i), (s = t.next(r)));
  return r >= Ds ? 1 / 0 : r;
}
function Uw(t, r = 100, i) {
  const s = i({ ...t, keyframes: [0, r] }),
    l = Math.min(kc(s), Ds);
  return { type: "keyframes", ease: (c) => s.next(l * c).value / r, duration: Et(l) };
}
const $w = 5;
function Pg(t, r, i) {
  const s = Math.max(r - $w, 0);
  return og(i - t(s), r - s);
}
const De = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  Zl = 0.001;
function Gw({
  duration: t = De.duration,
  bounce: r = De.bounce,
  velocity: i = De.velocity,
  mass: s = De.mass,
}) {
  let l,
    c,
    d = 1 - r;
  ((d = Yt(De.minDamping, De.maxDamping, d)),
    (t = Yt(De.minDuration, De.maxDuration, Et(t))),
    d < 1
      ? ((l = (m) => {
          const y = m * d,
            x = y * t,
            w = y - i,
            P = zu(m, d),
            A = Math.exp(-x);
          return Zl - (w / P) * A;
        }),
        (c = (m) => {
          const x = m * d * t,
            w = x * i + i,
            P = Math.pow(d, 2) * Math.pow(m, 2) * t,
            A = Math.exp(-x),
            b = zu(Math.pow(m, 2), d);
          return ((-l(m) + Zl > 0 ? -1 : 1) * ((w - P) * A)) / b;
        }))
      : ((l = (m) => {
          const y = Math.exp(-m * t),
            x = (m - i) * t + 1;
          return -Zl + y * x;
        }),
        (c = (m) => {
          const y = Math.exp(-m * t),
            x = (i - m) * (t * t);
          return y * x;
        })));
  const f = 5 / t,
    h = Xw(l, c, f);
  if (((t = _t(t)), isNaN(h))) return { stiffness: De.stiffness, damping: De.damping, duration: t };
  {
    const m = Math.pow(h, 2) * s;
    return { stiffness: m, damping: d * 2 * Math.sqrt(s * m), duration: t };
  }
}
const Yw = 12;
function Xw(t, r, i) {
  let s = i;
  for (let l = 1; l < Yw; l++) s = s - t(s) / r(s);
  return s;
}
function zu(t, r) {
  return t * Math.sqrt(1 - r * r);
}
const Kw = ["duration", "bounce"],
  qw = ["stiffness", "damping", "mass"];
function oh(t, r) {
  return r.some((i) => t[i] !== void 0);
}
function Qw(t) {
  let r = {
    velocity: De.velocity,
    stiffness: De.stiffness,
    damping: De.damping,
    mass: De.mass,
    isResolvedFromDuration: !1,
    ...t,
  };
  if (!oh(t, qw) && oh(t, Kw))
    if (((r.velocity = 0), t.visualDuration)) {
      const i = t.visualDuration,
        s = (2 * Math.PI) / (i * 1.2),
        l = s * s,
        c = 2 * Yt(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(l);
      r = { ...r, mass: De.mass, stiffness: l, damping: c };
    } else {
      const i = Gw({ ...t, velocity: 0 });
      ((r = { ...r, ...i, mass: De.mass }), (r.isResolvedFromDuration = !0));
    }
  return r;
}
function Os(t = De.visualDuration, r = De.bounce) {
  const i = typeof t != "object" ? { visualDuration: t, keyframes: [0, 1], bounce: r } : t;
  let { restSpeed: s, restDelta: l } = i;
  const c = i.keyframes[0],
    d = i.keyframes[i.keyframes.length - 1],
    f = { done: !1, value: c },
    {
      stiffness: h,
      damping: m,
      mass: y,
      duration: x,
      velocity: w,
      isResolvedFromDuration: P,
    } = Qw({ ...i, velocity: -Et(i.velocity || 0) }),
    A = w || 0,
    b = m / (2 * Math.sqrt(h * y)),
    j = d - c,
    O = Et(Math.sqrt(h / y)),
    I = Math.abs(j) < 5;
  (s || (s = I ? De.restSpeed.granular : De.restSpeed.default),
    l || (l = I ? De.restDelta.granular : De.restDelta.default));
  let F;
  if (b < 1) {
    const $ = zu(O, b);
    F = (ee) => {
      const G = Math.exp(-b * O * ee);
      return d - G * (((A + b * O * j) / $) * Math.sin($ * ee) + j * Math.cos($ * ee));
    };
  } else if (b === 1) F = ($) => d - Math.exp(-O * $) * (j + (A + O * j) * $);
  else {
    const $ = O * Math.sqrt(b * b - 1);
    F = (ee) => {
      const G = Math.exp(-b * O * ee),
        _ = Math.min($ * ee, 300);
      return d - (G * ((A + b * O * j) * Math.sinh(_) + $ * j * Math.cosh(_))) / $;
    };
  }
  const W = {
    calculatedDuration: (P && x) || null,
    next: ($) => {
      const ee = F($);
      if (P) f.done = $ >= x;
      else {
        let G = $ === 0 ? A : 0;
        b < 1 && (G = $ === 0 ? _t(A) : Pg(F, $, ee));
        const _ = Math.abs(G) <= s,
          ue = Math.abs(d - ee) <= l;
        f.done = _ && ue;
      }
      return ((f.value = f.done ? d : ee), f);
    },
    toString: () => {
      const $ = Math.min(kc(W), Ds),
        ee = Tg((G) => W.next($ * G).value, $, 30);
      return $ + "ms " + ee;
    },
    toTransition: () => {},
  };
  return W;
}
Os.applyToOptions = (t) => {
  const r = Uw(t, 100, Os);
  return ((t.ease = r.ease), (t.duration = _t(r.duration)), (t.type = "keyframes"), t);
};
function Bu({
  keyframes: t,
  velocity: r = 0,
  power: i = 0.8,
  timeConstant: s = 325,
  bounceDamping: l = 10,
  bounceStiffness: c = 500,
  modifyTarget: d,
  min: f,
  max: h,
  restDelta: m = 0.5,
  restSpeed: y,
}) {
  const x = t[0],
    w = { done: !1, value: x },
    P = (_) => (f !== void 0 && _ < f) || (h !== void 0 && _ > h),
    A = (_) => (f === void 0 ? h : h === void 0 || Math.abs(f - _) < Math.abs(h - _) ? f : h);
  let b = i * r;
  const j = x + b,
    O = d === void 0 ? j : d(j);
  O !== j && (b = O - x);
  const I = (_) => -b * Math.exp(-_ / s),
    F = (_) => O + I(_),
    W = (_) => {
      const ue = I(_),
        ve = F(_);
      ((w.done = Math.abs(ue) <= m), (w.value = w.done ? O : ve));
    };
  let $, ee;
  const G = (_) => {
    P(w.value) &&
      (($ = _),
      (ee = Os({
        keyframes: [w.value, A(w.value)],
        velocity: Pg(F, _, w.value),
        damping: l,
        stiffness: c,
        restDelta: m,
        restSpeed: y,
      })));
  };
  return (
    G(0),
    {
      calculatedDuration: null,
      next: (_) => {
        let ue = !1;
        return (
          !ee && $ === void 0 && ((ue = !0), W(_), G(_)),
          $ !== void 0 && _ >= $ ? ee.next(_ - $) : (!ue && W(_), w)
        );
      },
    }
  );
}
function Zw(t, r, i) {
  const s = [],
    l = i || on.mix || Eg,
    c = t.length - 1;
  for (let d = 0; d < c; d++) {
    let f = l(t[d], t[d + 1]);
    if (r) {
      const h = Array.isArray(r) ? r[d] || Tt : r;
      f = Ki(h, f);
    }
    s.push(f);
  }
  return s;
}
function Jw(t, r, { clamp: i = !0, ease: s, mixer: l } = {}) {
  const c = t.length;
  if ((hc(c === r.length), c === 1)) return () => r[0];
  if (c === 2 && r[0] === r[1]) return () => r[1];
  const d = t[0] === t[1];
  t[0] > t[c - 1] && ((t = [...t].reverse()), (r = [...r].reverse()));
  const f = Zw(r, s, l),
    h = f.length,
    m = (y) => {
      if (d && y < t[0]) return r[0];
      let x = 0;
      if (h > 1) for (; x < t.length - 2 && !(y < t[x + 1]); x++);
      const w = Bi(t[x], t[x + 1], y);
      return f[x](w);
    };
  return i ? (y) => m(Yt(t[0], t[c - 1], y)) : m;
}
function e1(t, r) {
  const i = t[t.length - 1];
  for (let s = 1; s <= r; s++) {
    const l = Bi(0, r, s);
    t.push(Me(i, 1, l));
  }
}
function t1(t) {
  const r = [0];
  return (e1(r, t.length - 1), r);
}
function n1(t, r) {
  return t.map((i) => i * r);
}
function r1(t, r) {
  return t.map(() => r || hg).splice(0, t.length - 1);
}
function Ii({ duration: t = 300, keyframes: r, times: i, ease: s = "easeInOut" }) {
  const l = hw(s) ? s.map(Jp) : Jp(s),
    c = { done: !1, value: r[0] },
    d = n1(i && i.length === r.length ? i : t1(r), t),
    f = Jw(d, r, { ease: Array.isArray(l) ? l : r1(r, l) });
  return { calculatedDuration: t, next: (h) => ((c.value = f(h)), (c.done = h >= t), c) };
}
const i1 = (t) => t !== null;
function Cc(t, { repeat: r, repeatType: i = "loop" }, s, l = 1) {
  const c = t.filter(i1),
    f = l < 0 || (r && i !== "loop" && r % 2 === 1) ? 0 : c.length - 1;
  return !f || s === void 0 ? c[f] : s;
}
const o1 = { decay: Bu, inertia: Bu, tween: Ii, keyframes: Ii, spring: Os };
function Ng(t) {
  typeof t.type == "string" && (t.type = o1[t.type]);
}
class bc {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((r) => {
      this.resolve = r;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(r, i) {
    return this.finished.then(r, i);
  }
}
const s1 = (t) => t / 100;
class Ec extends bc {
  constructor(r) {
    (super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        const { motionValue: i } = this.options;
        (i && i.updatedAt !== at.now() && this.tick(at.now()),
          (this.isStopped = !0),
          this.state !== "idle" && (this.teardown(), this.options.onStop?.()));
      }),
      (this.options = r),
      this.initAnimation(),
      this.play(),
      r.autoplay === !1 && this.pause());
  }
  initAnimation() {
    const { options: r } = this;
    Ng(r);
    const { type: i = Ii, repeat: s = 0, repeatDelay: l = 0, repeatType: c, velocity: d = 0 } = r;
    let { keyframes: f } = r;
    const h = i || Ii;
    h !== Ii &&
      typeof f[0] != "number" &&
      ((this.mixKeyframes = Ki(s1, Eg(f[0], f[1]))), (f = [0, 100]));
    const m = h({ ...r, keyframes: f });
    (c === "mirror" &&
      (this.mirroredGenerator = h({ ...r, keyframes: [...f].reverse(), velocity: -d })),
      m.calculatedDuration === null && (m.calculatedDuration = kc(m)));
    const { calculatedDuration: y } = m;
    ((this.calculatedDuration = y),
      (this.resolvedDuration = y + l),
      (this.totalDuration = this.resolvedDuration * (s + 1) - l),
      (this.generator = m));
  }
  updateTime(r) {
    const i = Math.round(r - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? (this.currentTime = this.holdTime) : (this.currentTime = i);
  }
  tick(r, i = !1) {
    const {
      generator: s,
      totalDuration: l,
      mixKeyframes: c,
      mirroredGenerator: d,
      resolvedDuration: f,
      calculatedDuration: h,
    } = this;
    if (this.startTime === null) return s.next(0);
    const {
      delay: m = 0,
      keyframes: y,
      repeat: x,
      repeatType: w,
      repeatDelay: P,
      type: A,
      onUpdate: b,
      finalKeyframe: j,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, r))
      : this.speed < 0 && (this.startTime = Math.min(r - l / this.speed, this.startTime)),
      i ? (this.currentTime = r) : this.updateTime(r));
    const O = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1),
      I = this.playbackSpeed >= 0 ? O < 0 : O > l;
    ((this.currentTime = Math.max(O, 0)),
      this.state === "finished" && this.holdTime === null && (this.currentTime = l));
    let F = this.currentTime,
      W = s;
    if (x) {
      const _ = Math.min(this.currentTime, l) / f;
      let ue = Math.floor(_),
        ve = _ % 1;
      (!ve && _ >= 1 && (ve = 1),
        ve === 1 && ue--,
        (ue = Math.min(ue, x + 1)),
        !!(ue % 2) &&
          (w === "reverse" ? ((ve = 1 - ve), P && (ve -= P / f)) : w === "mirror" && (W = d)),
        (F = Yt(0, 1, ve) * f));
    }
    const $ = I ? { done: !1, value: y[0] } : W.next(F);
    c && !I && ($.value = c($.value));
    let { done: ee } = $;
    !I &&
      h !== null &&
      (ee = this.playbackSpeed >= 0 ? this.currentTime >= l : this.currentTime <= 0);
    const G =
      this.holdTime === null && (this.state === "finished" || (this.state === "running" && ee));
    return (
      G && A !== Bu && ($.value = Cc(y, this.options, j, this.speed)),
      b && b($.value),
      G && this.finish(),
      $
    );
  }
  then(r, i) {
    return this.finished.then(r, i);
  }
  get duration() {
    return Et(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: r = 0 } = this.options || {};
    return this.duration + Et(r);
  }
  get time() {
    return Et(this.currentTime);
  }
  set time(r) {
    ((r = _t(r)),
      (this.currentTime = r),
      this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0
        ? (this.holdTime = r)
        : this.driver && (this.startTime = this.driver.now() - r / this.playbackSpeed),
      this.driver
        ? this.driver.start(!1)
        : ((this.startTime = 0), (this.state = "paused"), (this.holdTime = r), this.tick(r)));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(r) {
    const i = this.playbackSpeed !== r;
    (i && this.driver && this.updateTime(at.now()),
      (this.playbackSpeed = r),
      i && this.driver && (this.time = Et(this.currentTime)));
  }
  play() {
    if (this.isStopped) return;
    const { driver: r = Hw, startTime: i } = this.options;
    (this.driver || (this.driver = r((l) => this.tick(l))), this.options.onPlay?.());
    const s = this.driver.now();
    (this.state === "finished"
      ? (this.updateFinished(), (this.startTime = s))
      : this.holdTime !== null
        ? (this.startTime = s - this.holdTime)
        : this.startTime || (this.startTime = i ?? s),
      this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    ((this.state = "paused"), this.updateTime(at.now()), (this.holdTime = this.currentTime));
  }
  complete() {
    (this.state !== "running" && this.play(), (this.state = "finished"), (this.holdTime = null));
  }
  finish() {
    (this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      this.options.onComplete?.());
  }
  cancel() {
    ((this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      this.options.onCancel?.());
  }
  teardown() {
    ((this.state = "idle"), this.stopDriver(), (this.startTime = this.holdTime = null));
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(r) {
    return ((this.startTime = 0), this.tick(r, !0));
  }
  attachTimeline(r) {
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"), (this.options.ease = "linear"), this.initAnimation()),
      this.driver?.stop(),
      r.observe(this)
    );
  }
}
function a1(t) {
  for (let r = 1; r < t.length; r++) t[r] ?? (t[r] = t[r - 1]);
}
const tr = (t) => (t * 180) / Math.PI,
  Wu = (t) => {
    const r = tr(Math.atan2(t[1], t[0]));
    return Hu(r);
  },
  l1 = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
    rotate: Wu,
    rotateZ: Wu,
    skewX: (t) => tr(Math.atan(t[1])),
    skewY: (t) => tr(Math.atan(t[2])),
    skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
  },
  Hu = (t) => ((t = t % 360), t < 0 && (t += 360), t),
  sh = Wu,
  ah = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
  lh = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
  u1 = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: ah,
    scaleY: lh,
    scale: (t) => (ah(t) + lh(t)) / 2,
    rotateX: (t) => Hu(tr(Math.atan2(t[6], t[5]))),
    rotateY: (t) => Hu(tr(Math.atan2(-t[2], t[0]))),
    rotateZ: sh,
    rotate: sh,
    skewX: (t) => tr(Math.atan(t[4])),
    skewY: (t) => tr(Math.atan(t[1])),
    skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
  };
function Uu(t) {
  return t.includes("scale") ? 1 : 0;
}
function $u(t, r) {
  if (!t || t === "none") return Uu(r);
  const i = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, l;
  if (i) ((s = u1), (l = i));
  else {
    const f = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    ((s = l1), (l = f));
  }
  if (!l) return Uu(r);
  const c = s[r],
    d = l[1].split(",").map(d1);
  return typeof c == "function" ? c(d) : d[c];
}
const c1 = (t, r) => {
  const { transform: i = "none" } = getComputedStyle(t);
  return $u(i, r);
};
function d1(t) {
  return parseFloat(t.trim());
}
const $r = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  Gr = new Set($r),
  uh = (t) => t === Ur || t === Z,
  f1 = new Set(["x", "y", "z"]),
  p1 = $r.filter((t) => !f1.has(t));
function h1(t) {
  const r = [];
  return (
    p1.forEach((i) => {
      const s = t.getValue(i);
      s !== void 0 && (r.push([i, s.get()]), s.set(i.startsWith("scale") ? 1 : 0));
    }),
    r
  );
}
const Rn = {
  width: ({ x: t }, { paddingLeft: r = "0", paddingRight: i = "0" }) =>
    t.max - t.min - parseFloat(r) - parseFloat(i),
  height: ({ y: t }, { paddingTop: r = "0", paddingBottom: i = "0" }) =>
    t.max - t.min - parseFloat(r) - parseFloat(i),
  top: (t, { top: r }) => parseFloat(r),
  left: (t, { left: r }) => parseFloat(r),
  bottom: ({ y: t }, { top: r }) => parseFloat(r) + (t.max - t.min),
  right: ({ x: t }, { left: r }) => parseFloat(r) + (t.max - t.min),
  x: (t, { transform: r }) => $u(r, "x"),
  y: (t, { transform: r }) => $u(r, "y"),
};
Rn.translateX = Rn.x;
Rn.translateY = Rn.y;
const nr = new Set();
let Gu = !1,
  Yu = !1,
  Xu = !1;
function jg() {
  if (Yu) {
    const t = Array.from(nr).filter((s) => s.needsMeasurement),
      r = new Set(t.map((s) => s.element)),
      i = new Map();
    (r.forEach((s) => {
      const l = h1(s);
      l.length && (i.set(s, l), s.render());
    }),
      t.forEach((s) => s.measureInitialState()),
      r.forEach((s) => {
        s.render();
        const l = i.get(s);
        l &&
          l.forEach(([c, d]) => {
            s.getValue(c)?.set(d);
          });
      }),
      t.forEach((s) => s.measureEndState()),
      t.forEach((s) => {
        s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
      }));
  }
  ((Yu = !1), (Gu = !1), nr.forEach((t) => t.complete(Xu)), nr.clear());
}
function Ag() {
  nr.forEach((t) => {
    (t.readKeyframes(), t.needsMeasurement && (Yu = !0));
  });
}
function m1() {
  ((Xu = !0), Ag(), jg(), (Xu = !1));
}
class Tc {
  constructor(r, i, s, l, c, d = !1) {
    ((this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...r]),
      (this.onComplete = i),
      (this.name = s),
      (this.motionValue = l),
      (this.element = c),
      (this.isAsync = d));
  }
  scheduleResolve() {
    ((this.state = "scheduled"),
      this.isAsync
        ? (nr.add(this), Gu || ((Gu = !0), be.read(Ag), be.resolveKeyframes(jg)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const { unresolvedKeyframes: r, name: i, element: s, motionValue: l } = this;
    if (r[0] === null) {
      const c = l?.get(),
        d = r[r.length - 1];
      if (c !== void 0) r[0] = c;
      else if (s && i) {
        const f = s.readValue(i, d);
        f != null && (r[0] = f);
      }
      (r[0] === void 0 && (r[0] = d), l && c === void 0 && l.set(r[0]));
    }
    a1(r);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(r = !1) {
    ((this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, r),
      nr.delete(this));
  }
  cancel() {
    this.state === "scheduled" && (nr.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const g1 = (t) => t.startsWith("--");
function Mg(t, r, i) {
  g1(r) ? t.style.setProperty(r, i) : (t.style[r] = i);
}
const y1 = {};
function Rg(t, r) {
  const i = ig(t);
  return () => y1[r] ?? i();
}
const v1 = Rg(() => window.ScrollTimeline !== void 0, "scrollTimeline"),
  Dg = Rg(() => {
    try {
      document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  _i = ([t, r, i, s]) => `cubic-bezier(${t}, ${r}, ${i}, ${s})`,
  ch = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: _i([0, 0.65, 0.55, 1]),
    circOut: _i([0.55, 0, 1, 0.45]),
    backIn: _i([0.31, 0.01, 0.66, -0.59]),
    backOut: _i([0.33, 1.53, 0.69, 0.99]),
  };
function Og(t, r) {
  if (t)
    return typeof t == "function"
      ? Dg()
        ? Tg(t, r)
        : "ease-out"
      : mg(t)
        ? _i(t)
        : Array.isArray(t)
          ? t.map((i) => Og(i, r) || ch.easeOut)
          : ch[t];
}
function x1(
  t,
  r,
  i,
  {
    delay: s = 0,
    duration: l = 300,
    repeat: c = 0,
    repeatType: d = "loop",
    ease: f = "easeOut",
    times: h,
  } = {},
  m = void 0
) {
  const y = { [r]: i };
  h && (y.offset = h);
  const x = Og(f, l);
  Array.isArray(x) && (y.easing = x);
  const w = {
    delay: s,
    duration: l,
    easing: Array.isArray(x) ? "linear" : x,
    fill: "both",
    iterations: c + 1,
    direction: d === "reverse" ? "alternate" : "normal",
  };
  return (m && (w.pseudoElement = m), t.animate(y, w));
}
function Fg(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function w1({ type: t, ...r }) {
  return Fg(t) && Dg()
    ? t.applyToOptions(r)
    : (r.duration ?? (r.duration = 300), r.ease ?? (r.ease = "easeOut"), r);
}
class _g extends bc {
  constructor(r) {
    if (
      (super(),
      (this.finishedTime = null),
      (this.isStopped = !1),
      (this.manualStartTime = null),
      !r)
    )
      return;
    const {
      element: i,
      name: s,
      keyframes: l,
      pseudoElement: c,
      allowFlatten: d = !1,
      finalKeyframe: f,
      onComplete: h,
    } = r;
    ((this.isPseudoElement = !!c),
      (this.allowFlatten = d),
      (this.options = r),
      hc(typeof r.type != "string"));
    const m = w1(r);
    ((this.animation = x1(i, s, l, m, c)),
      m.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !c)) {
          const y = Cc(l, this.options, f, this.speed);
          (this.updateMotionValue && this.updateMotionValue(y),
            Mg(i, s, y),
            this.animation.cancel());
        }
        (h?.(), this.notifyFinished());
      }));
  }
  play() {
    this.isStopped ||
      ((this.manualStartTime = null),
      this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: r } = this;
    r === "idle" ||
      r === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    const r = this.options?.element;
    !this.isPseudoElement && r?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const r = this.animation.effect?.getComputedTiming?.().duration || 0;
    return Et(Number(r));
  }
  get iterationDuration() {
    const { delay: r = 0 } = this.options || {};
    return this.duration + Et(r);
  }
  get time() {
    return Et(Number(this.animation.currentTime) || 0);
  }
  set time(r) {
    const i = this.finishedTime !== null;
    ((this.manualStartTime = null),
      (this.finishedTime = null),
      (this.animation.currentTime = _t(r)),
      i && this.animation.pause());
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(r) {
    (r < 0 && (this.finishedTime = null), (this.animation.playbackRate = r));
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(r) {
    this.manualStartTime = this.animation.startTime = r;
  }
  attachTimeline({ timeline: r, rangeStart: i, rangeEnd: s, observe: l }) {
    return (
      this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }),
      (this.animation.onfinish = null),
      r && v1()
        ? ((this.animation.timeline = r),
          i && (this.animation.rangeStart = i),
          s && (this.animation.rangeEnd = s),
          Tt)
        : l(this)
    );
  }
}
const Lg = { anticipate: dg, backInOut: cg, circInOut: pg };
function S1(t) {
  return t in Lg;
}
function k1(t) {
  typeof t.ease == "string" && S1(t.ease) && (t.ease = Lg[t.ease]);
}
const Jl = 10;
class C1 extends _g {
  constructor(r) {
    (k1(r),
      Ng(r),
      super(r),
      r.startTime !== void 0 && (this.startTime = r.startTime),
      (this.options = r));
  }
  updateMotionValue(r) {
    const { motionValue: i, onUpdate: s, onComplete: l, element: c, ...d } = this.options;
    if (!i) return;
    if (r !== void 0) {
      i.set(r);
      return;
    }
    const f = new Ec({ ...d, autoplay: !1 }),
      h = Math.max(Jl, at.now() - this.startTime),
      m = Yt(0, Jl, h - Jl),
      y = f.sample(h).value,
      { name: x } = this.options;
    (c && x && Mg(c, x, y), i.setWithVelocity(f.sample(Math.max(0, h - m)).value, y, m), f.stop());
  }
}
const dh = (t, r) =>
  r === "zIndex"
    ? !1
    : !!(
        typeof t == "number" ||
        Array.isArray(t) ||
        (typeof t == "string" && (Lt.test(t) || t === "0") && !t.startsWith("url("))
      );
function b1(t) {
  const r = t[0];
  if (t.length === 1) return !0;
  for (let i = 0; i < t.length; i++) if (t[i] !== r) return !0;
}
function E1(t, r, i, s) {
  const l = t[0];
  if (l === null) return !1;
  if (r === "display" || r === "visibility") return !0;
  const c = t[t.length - 1],
    d = dh(l, r),
    f = dh(c, r);
  return !d || !f ? !1 : b1(t) || ((i === "spring" || Fg(i)) && s);
}
function Ku(t) {
  ((t.duration = 0), (t.type = "keyframes"));
}
const T1 = new Set(["opacity", "clipPath", "filter", "transform"]),
  P1 = ig(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function N1(t) {
  const { motionValue: r, name: i, repeatDelay: s, repeatType: l, damping: c, type: d } = t;
  if (!(r?.owner?.current instanceof HTMLElement)) return !1;
  const { onUpdate: h, transformTemplate: m } = r.owner.getProps();
  return (
    P1() &&
    i &&
    T1.has(i) &&
    (i !== "transform" || !m) &&
    !h &&
    !s &&
    l !== "mirror" &&
    c !== 0 &&
    d !== "inertia"
  );
}
const j1 = 40;
class A1 extends bc {
  constructor({
    autoplay: r = !0,
    delay: i = 0,
    type: s = "keyframes",
    repeat: l = 0,
    repeatDelay: c = 0,
    repeatType: d = "loop",
    keyframes: f,
    name: h,
    motionValue: m,
    element: y,
    ...x
  }) {
    (super(),
      (this.stop = () => {
        (this._animation && (this._animation.stop(), this.stopTimeline?.()),
          this.keyframeResolver?.cancel());
      }),
      (this.createdAt = at.now()));
    const w = {
        autoplay: r,
        delay: i,
        type: s,
        repeat: l,
        repeatDelay: c,
        repeatType: d,
        name: h,
        motionValue: m,
        element: y,
        ...x,
      },
      P = y?.KeyframeResolver || Tc;
    ((this.keyframeResolver = new P(
      f,
      (A, b, j) => this.onKeyframesResolved(A, b, w, !j),
      h,
      m,
      y
    )),
      this.keyframeResolver?.scheduleResolve());
  }
  onKeyframesResolved(r, i, s, l) {
    this.keyframeResolver = void 0;
    const { name: c, type: d, velocity: f, delay: h, isHandoff: m, onUpdate: y } = s;
    ((this.resolvedAt = at.now()),
      E1(r, c, d, f) ||
        ((on.instantAnimations || !h) && y?.(Cc(r, s, i)),
        (r[0] = r[r.length - 1]),
        Ku(s),
        (s.repeat = 0)));
    const w = {
        startTime: l
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > j1
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: i,
        ...s,
        keyframes: r,
      },
      P = !m && N1(w),
      A = w.motionValue?.owner?.current,
      b = P ? new C1({ ...w, element: A }) : new Ec(w);
    (b.finished
      .then(() => {
        this.notifyFinished();
      })
      .catch(Tt),
      this.pendingTimeline &&
        ((this.stopTimeline = b.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = b));
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(r, i) {
    return this.finished.finally(r).then(() => {});
  }
  get animation() {
    return (this._animation || (this.keyframeResolver?.resume(), m1()), this._animation);
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(r) {
    this.animation.time = r;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(r) {
    this.animation.speed = r;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(r) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(r))
        : (this.pendingTimeline = r),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    (this._animation && this.animation.cancel(), this.keyframeResolver?.cancel());
  }
}
function Ig(t, r, i, s = 0, l = 1) {
  const c = Array.from(t)
      .sort((m, y) => m.sortNodePosition(y))
      .indexOf(r),
    d = t.size,
    f = (d - 1) * s;
  return typeof i == "function" ? i(c, d) : l === 1 ? c * s : f - c * s;
}
const M1 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function R1(t) {
  const r = M1.exec(t);
  if (!r) return [,];
  const [, i, s, l] = r;
  return [`--${i ?? s}`, l];
}
function Vg(t, r, i = 1) {
  const [s, l] = R1(t);
  if (!s) return;
  const c = window.getComputedStyle(r).getPropertyValue(s);
  if (c) {
    const d = c.trim();
    return tg(d) ? parseFloat(d) : d;
  }
  return vc(l) ? Vg(l, r, i + 1) : l;
}
const D1 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  O1 = (t) => ({
    type: "spring",
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  F1 = { type: "keyframes", duration: 0.8 },
  _1 = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  L1 = (t, { keyframes: r }) =>
    r.length > 2 ? F1 : Gr.has(t) ? (t.startsWith("scale") ? O1(r[1]) : D1) : _1,
  I1 = (t) => t !== null;
function V1(t, { repeat: r, repeatType: i = "loop" }, s) {
  const l = t.filter(I1),
    c = r && i !== "loop" && r % 2 === 1 ? 0 : l.length - 1;
  return l[c];
}
function zg(t, r) {
  if (t?.inherit && r) {
    const { inherit: i, ...s } = t;
    return { ...r, ...s };
  }
  return t;
}
function Pc(t, r) {
  const i = t?.[r] ?? t?.default ?? t;
  return i !== t ? zg(i, t) : i;
}
function z1({
  when: t,
  delay: r,
  delayChildren: i,
  staggerChildren: s,
  staggerDirection: l,
  repeat: c,
  repeatType: d,
  repeatDelay: f,
  from: h,
  elapsed: m,
  ...y
}) {
  return !!Object.keys(y).length;
}
const Nc =
  (t, r, i, s = {}, l, c) =>
  (d) => {
    const f = Pc(s, t) || {},
      h = f.delay || s.delay || 0;
    let { elapsed: m = 0 } = s;
    m = m - _t(h);
    const y = {
      keyframes: Array.isArray(i) ? i : [null, i],
      ease: "easeOut",
      velocity: r.getVelocity(),
      ...f,
      delay: -m,
      onUpdate: (w) => {
        (r.set(w), f.onUpdate && f.onUpdate(w));
      },
      onComplete: () => {
        (d(), f.onComplete && f.onComplete());
      },
      name: t,
      motionValue: r,
      element: c ? void 0 : l,
    };
    (z1(f) || Object.assign(y, L1(t, y)),
      y.duration && (y.duration = _t(y.duration)),
      y.repeatDelay && (y.repeatDelay = _t(y.repeatDelay)),
      y.from !== void 0 && (y.keyframes[0] = y.from));
    let x = !1;
    if (
      ((y.type === !1 || (y.duration === 0 && !y.repeatDelay)) &&
        (Ku(y), y.delay === 0 && (x = !0)),
      (on.instantAnimations || on.skipAnimations || l?.shouldSkipAnimations) &&
        ((x = !0), Ku(y), (y.delay = 0)),
      (y.allowFlatten = !f.type && !f.ease),
      x && !c && r.get() !== void 0)
    ) {
      const w = V1(y.keyframes, f);
      if (w !== void 0) {
        be.update(() => {
          (y.onUpdate(w), y.onComplete());
        });
        return;
      }
    }
    return f.isSync ? new Ec(y) : new A1(y);
  };
function fh(t) {
  const r = [{}, {}];
  return (
    t?.values.forEach((i, s) => {
      ((r[0][s] = i.get()), (r[1][s] = i.getVelocity()));
    }),
    r
  );
}
function jc(t, r, i, s) {
  if (typeof r == "function") {
    const [l, c] = fh(s);
    r = r(i !== void 0 ? i : t.custom, l, c);
  }
  if ((typeof r == "string" && (r = t.variants && t.variants[r]), typeof r == "function")) {
    const [l, c] = fh(s);
    r = r(i !== void 0 ? i : t.custom, l, c);
  }
  return r;
}
function Br(t, r, i) {
  const s = t.getProps();
  return jc(s, r, i !== void 0 ? i : s.custom, t);
}
const Bg = new Set(["width", "height", "top", "left", "right", "bottom", ...$r]),
  ph = 30,
  B1 = (t) => !isNaN(parseFloat(t));
class W1 {
  constructor(r, i = {}) {
    ((this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (s) => {
        const l = at.now();
        if (
          (this.updatedAt !== l && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(s),
          this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        )
          for (const c of this.dependents) c.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(r),
      (this.owner = i.owner));
  }
  setCurrent(r) {
    ((this.current = r),
      (this.updatedAt = at.now()),
      this.canTrackVelocity === null && r !== void 0 && (this.canTrackVelocity = B1(this.current)));
  }
  setPrevFrameValue(r = this.current) {
    ((this.prevFrameValue = r), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(r) {
    return this.on("change", r);
  }
  on(r, i) {
    this.events[r] || (this.events[r] = new mc());
    const s = this.events[r].add(i);
    return r === "change"
      ? () => {
          (s(),
            be.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : s;
  }
  clearListeners() {
    for (const r in this.events) this.events[r].clear();
  }
  attach(r, i) {
    ((this.passiveEffect = r), (this.stopPassiveEffect = i));
  }
  set(r) {
    this.passiveEffect ? this.passiveEffect(r, this.updateAndNotify) : this.updateAndNotify(r);
  }
  setWithVelocity(r, i, s) {
    (this.set(i),
      (this.prev = void 0),
      (this.prevFrameValue = r),
      (this.prevUpdatedAt = this.updatedAt - s));
  }
  jump(r, i = !0) {
    (this.updateAndNotify(r),
      (this.prev = r),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      i && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(r) {
    (this.dependents || (this.dependents = new Set()), this.dependents.add(r));
  }
  removeDependent(r) {
    this.dependents && this.dependents.delete(r);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const r = at.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || r - this.updatedAt > ph)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, ph);
    return og(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
  }
  start(r) {
    return (
      this.stop(),
      new Promise((i) => {
        ((this.hasAnimated = !0),
          (this.animation = r(i)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    (this.dependents?.clear(),
      this.events.destroy?.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function Hr(t, r) {
  return new W1(t, r);
}
const qu = (t) => Array.isArray(t);
function H1(t, r, i) {
  t.hasValue(r) ? t.getValue(r).set(i) : t.addValue(r, Hr(i));
}
function U1(t) {
  return qu(t) ? t[t.length - 1] || 0 : t;
}
function $1(t, r) {
  const i = Br(t, r);
  let { transitionEnd: s = {}, transition: l = {}, ...c } = i || {};
  c = { ...c, ...s };
  for (const d in c) {
    const f = U1(c[d]);
    H1(t, d, f);
  }
}
const it = (t) => !!(t && t.getVelocity);
function G1(t) {
  return !!(it(t) && t.add);
}
function Qu(t, r) {
  const i = t.getValue("willChange");
  if (G1(i)) return i.add(r);
  if (!i && on.WillChange) {
    const s = new on.WillChange("auto");
    (t.addValue("willChange", s), s.add(r));
  }
}
function Ac(t) {
  return t.replace(/([A-Z])/g, (r) => `-${r.toLowerCase()}`);
}
const Y1 = "framerAppearId",
  Wg = "data-" + Ac(Y1);
function Hg(t) {
  return t.props[Wg];
}
function X1({ protectedKeys: t, needsAnimating: r }, i) {
  const s = t.hasOwnProperty(i) && r[i] !== !0;
  return ((r[i] = !1), s);
}
function Ug(t, r, { delay: i = 0, transitionOverride: s, type: l } = {}) {
  let { transition: c, transitionEnd: d, ...f } = r;
  const h = t.getDefaultTransition();
  c = c ? zg(c, h) : h;
  const m = c?.reduceMotion;
  s && (c = s);
  const y = [],
    x = l && t.animationState && t.animationState.getState()[l];
  for (const w in f) {
    const P = t.getValue(w, t.latestValues[w] ?? null),
      A = f[w];
    if (A === void 0 || (x && X1(x, w))) continue;
    const b = { delay: i, ...Pc(c || {}, w) },
      j = P.get();
    if (j !== void 0 && !P.isAnimating && !Array.isArray(A) && A === j && !b.velocity) continue;
    let O = !1;
    if (window.MotionHandoffAnimation) {
      const W = Hg(t);
      if (W) {
        const $ = window.MotionHandoffAnimation(W, w, be);
        $ !== null && ((b.startTime = $), (O = !0));
      }
    }
    Qu(t, w);
    const I = m ?? t.shouldReduceMotion;
    P.start(Nc(w, P, A, I && Bg.has(w) ? { type: !1 } : b, t, O));
    const F = P.animation;
    F && y.push(F);
  }
  if (d) {
    const w = () =>
      be.update(() => {
        d && $1(t, d);
      });
    y.length ? Promise.all(y).then(w) : w();
  }
  return y;
}
function Zu(t, r, i = {}) {
  const s = Br(t, r, i.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: l = t.getDefaultTransition() || {} } = s || {};
  i.transitionOverride && (l = i.transitionOverride);
  const c = s ? () => Promise.all(Ug(t, s, i)) : () => Promise.resolve(),
    d =
      t.variantChildren && t.variantChildren.size
        ? (h = 0) => {
            const { delayChildren: m = 0, staggerChildren: y, staggerDirection: x } = l;
            return K1(t, r, h, m, y, x, i);
          }
        : () => Promise.resolve(),
    { when: f } = l;
  if (f) {
    const [h, m] = f === "beforeChildren" ? [c, d] : [d, c];
    return h().then(() => m());
  } else return Promise.all([c(), d(i.delay)]);
}
function K1(t, r, i = 0, s = 0, l = 0, c = 1, d) {
  const f = [];
  for (const h of t.variantChildren)
    (h.notify("AnimationStart", r),
      f.push(
        Zu(h, r, {
          ...d,
          delay: i + (typeof s == "function" ? 0 : s) + Ig(t.variantChildren, h, s, l, c),
        }).then(() => h.notify("AnimationComplete", r))
      ));
  return Promise.all(f);
}
function q1(t, r, i = {}) {
  t.notify("AnimationStart", r);
  let s;
  if (Array.isArray(r)) {
    const l = r.map((c) => Zu(t, c, i));
    s = Promise.all(l);
  } else if (typeof r == "string") s = Zu(t, r, i);
  else {
    const l = typeof r == "function" ? Br(t, r, i.custom) : r;
    s = Promise.all(Ug(t, l, i));
  }
  return s.then(() => {
    t.notify("AnimationComplete", r);
  });
}
const Q1 = { test: (t) => t === "auto", parse: (t) => t },
  $g = (t) => (r) => r.test(t),
  Gg = [Ur, Z, Gt, An, Pw, Tw, Q1],
  hh = (t) => Gg.find($g(t));
function Z1(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || rg(t) : !0;
}
const J1 = new Set(["brightness", "contrast", "saturate", "opacity"]);
function eS(t) {
  const [r, i] = t.slice(0, -1).split("(");
  if (r === "drop-shadow") return t;
  const [s] = i.match(xc) || [];
  if (!s) return t;
  const l = i.replace(s, "");
  let c = J1.has(r) ? 1 : 0;
  return (s !== i && (c *= 100), r + "(" + c + l + ")");
}
const tS = /\b([a-z-]*)\(.*?\)/gu,
  Ju = {
    ...Lt,
    getAnimatableNone: (t) => {
      const r = t.match(tS);
      return r ? r.map(eS).join(" ") : t;
    },
  },
  ec = {
    ...Lt,
    getAnimatableNone: (t) => {
      const r = Lt.parse(t);
      return Lt.createTransformer(t)(
        r.map((s) => (typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s))
      );
    },
  },
  mh = { ...Ur, transform: Math.round },
  nS = {
    rotate: An,
    rotateX: An,
    rotateY: An,
    rotateZ: An,
    scale: ds,
    scaleX: ds,
    scaleY: ds,
    scaleZ: ds,
    skew: An,
    skewX: An,
    skewY: An,
    distance: Z,
    translateX: Z,
    translateY: Z,
    translateZ: Z,
    x: Z,
    y: Z,
    z: Z,
    perspective: Z,
    transformPerspective: Z,
    opacity: Wi,
    originX: th,
    originY: th,
    originZ: Z,
  },
  Mc = {
    borderWidth: Z,
    borderTopWidth: Z,
    borderRightWidth: Z,
    borderBottomWidth: Z,
    borderLeftWidth: Z,
    borderRadius: Z,
    borderTopLeftRadius: Z,
    borderTopRightRadius: Z,
    borderBottomRightRadius: Z,
    borderBottomLeftRadius: Z,
    width: Z,
    maxWidth: Z,
    height: Z,
    maxHeight: Z,
    top: Z,
    right: Z,
    bottom: Z,
    left: Z,
    inset: Z,
    insetBlock: Z,
    insetBlockStart: Z,
    insetBlockEnd: Z,
    insetInline: Z,
    insetInlineStart: Z,
    insetInlineEnd: Z,
    padding: Z,
    paddingTop: Z,
    paddingRight: Z,
    paddingBottom: Z,
    paddingLeft: Z,
    paddingBlock: Z,
    paddingBlockStart: Z,
    paddingBlockEnd: Z,
    paddingInline: Z,
    paddingInlineStart: Z,
    paddingInlineEnd: Z,
    margin: Z,
    marginTop: Z,
    marginRight: Z,
    marginBottom: Z,
    marginLeft: Z,
    marginBlock: Z,
    marginBlockStart: Z,
    marginBlockEnd: Z,
    marginInline: Z,
    marginInlineStart: Z,
    marginInlineEnd: Z,
    fontSize: Z,
    backgroundPositionX: Z,
    backgroundPositionY: Z,
    ...nS,
    zIndex: mh,
    fillOpacity: Wi,
    strokeOpacity: Wi,
    numOctaves: mh,
  },
  rS = {
    ...Mc,
    color: Ie,
    backgroundColor: Ie,
    outlineColor: Ie,
    fill: Ie,
    stroke: Ie,
    borderColor: Ie,
    borderTopColor: Ie,
    borderRightColor: Ie,
    borderBottomColor: Ie,
    borderLeftColor: Ie,
    filter: Ju,
    WebkitFilter: Ju,
    mask: ec,
    WebkitMask: ec,
  },
  Yg = (t) => rS[t],
  iS = new Set([Ju, ec]);
function Xg(t, r) {
  let i = Yg(t);
  return (iS.has(i) || (i = Lt), i.getAnimatableNone ? i.getAnimatableNone(r) : void 0);
}
const oS = new Set(["auto", "none", "0"]);
function sS(t, r, i) {
  let s = 0,
    l;
  for (; s < t.length && !l; ) {
    const c = t[s];
    (typeof c == "string" && !oS.has(c) && Hi(c).values.length && (l = t[s]), s++);
  }
  if (l && i) for (const c of r) t[c] = Xg(i, l);
}
class aS extends Tc {
  constructor(r, i, s, l, c) {
    super(r, i, s, l, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: r, element: i, name: s } = this;
    if (!i || !i.current) return;
    super.readKeyframes();
    for (let y = 0; y < r.length; y++) {
      let x = r[y];
      if (typeof x == "string" && ((x = x.trim()), vc(x))) {
        const w = Vg(x, i.current);
        (w !== void 0 && (r[y] = w), y === r.length - 1 && (this.finalKeyframe = x));
      }
    }
    if ((this.resolveNoneKeyframes(), !Bg.has(s) || r.length !== 2)) return;
    const [l, c] = r,
      d = hh(l),
      f = hh(c),
      h = eh(l),
      m = eh(c);
    if (h !== m && Rn[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== f)
      if (uh(d) && uh(f))
        for (let y = 0; y < r.length; y++) {
          const x = r[y];
          typeof x == "string" && (r[y] = parseFloat(x));
        }
      else Rn[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: r, name: i } = this,
      s = [];
    for (let l = 0; l < r.length; l++) (r[l] === null || Z1(r[l])) && s.push(l);
    s.length && sS(r, s, i);
  }
  measureInitialState() {
    const { element: r, unresolvedKeyframes: i, name: s } = this;
    if (!r || !r.current) return;
    (s === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Rn[s](r.measureViewportBox(), window.getComputedStyle(r.current))),
      (i[0] = this.measuredOrigin));
    const l = i[i.length - 1];
    l !== void 0 && r.getValue(s, l).jump(l, !1);
  }
  measureEndState() {
    const { element: r, name: i, unresolvedKeyframes: s } = this;
    if (!r || !r.current) return;
    const l = r.getValue(i);
    l && l.jump(this.measuredOrigin, !1);
    const c = s.length - 1,
      d = s[c];
    ((s[c] = Rn[i](r.measureViewportBox(), window.getComputedStyle(r.current))),
      d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d),
      this.removedTransforms?.length &&
        this.removedTransforms.forEach(([f, h]) => {
          r.getValue(f).set(h);
        }),
      this.resolveNoneKeyframes());
  }
}
const lS = new Set(["opacity", "clipPath", "filter", "transform"]);
function Kg(t, r, i) {
  if (t == null) return [];
  if (t instanceof EventTarget) return [t];
  if (typeof t == "string") {
    let s = document;
    const l = i?.[t] ?? s.querySelectorAll(t);
    return l ? Array.from(l) : [];
  }
  return Array.from(t).filter((s) => s != null);
}
const qg = (t, r) => (r && typeof t == "number" ? r.transform(t) : t);
function uS(t) {
  return ng(t) && "offsetHeight" in t;
}
const { schedule: Rc } = gg(queueMicrotask, !1),
  Ft = { x: !1, y: !1 };
function Qg() {
  return Ft.x || Ft.y;
}
function cS(t) {
  return t === "x" || t === "y"
    ? Ft[t]
      ? null
      : ((Ft[t] = !0),
        () => {
          Ft[t] = !1;
        })
    : Ft.x || Ft.y
      ? null
      : ((Ft.x = Ft.y = !0),
        () => {
          Ft.x = Ft.y = !1;
        });
}
function Zg(t, r) {
  const i = Kg(t),
    s = new AbortController(),
    l = { passive: !0, ...r, signal: s.signal };
  return [i, l, () => s.abort()];
}
function dS(t) {
  return !(t.pointerType === "touch" || Qg());
}
function fS(t, r, i = {}) {
  const [s, l, c] = Zg(t, i);
  return (
    s.forEach((d) => {
      let f = !1,
        h = !1,
        m;
      const y = () => {
          d.removeEventListener("pointerleave", A);
        },
        x = (j) => {
          (m && (m(j), (m = void 0)), y());
        },
        w = (j) => {
          ((f = !1),
            window.removeEventListener("pointerup", w),
            window.removeEventListener("pointercancel", w),
            h && ((h = !1), x(j)));
        },
        P = () => {
          ((f = !0),
            window.addEventListener("pointerup", w, l),
            window.addEventListener("pointercancel", w, l));
        },
        A = (j) => {
          if (j.pointerType !== "touch") {
            if (f) {
              h = !0;
              return;
            }
            x(j);
          }
        },
        b = (j) => {
          if (!dS(j)) return;
          h = !1;
          const O = r(d, j);
          typeof O == "function" && ((m = O), d.addEventListener("pointerleave", A, l));
        };
      (d.addEventListener("pointerenter", b, l), d.addEventListener("pointerdown", P, l));
    }),
    c
  );
}
const Jg = (t, r) => (r ? (t === r ? !0 : Jg(t, r.parentElement)) : !1),
  Dc = (t) =>
    t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1,
  pS = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function hS(t) {
  return pS.has(t.tagName) || t.isContentEditable === !0;
}
const mS = new Set(["INPUT", "SELECT", "TEXTAREA"]);
function gS(t) {
  return mS.has(t.tagName) || t.isContentEditable === !0;
}
const ks = new WeakSet();
function gh(t) {
  return (r) => {
    r.key === "Enter" && t(r);
  };
}
function eu(t, r) {
  t.dispatchEvent(new PointerEvent("pointer" + r, { isPrimary: !0, bubbles: !0 }));
}
const yS = (t, r) => {
  const i = t.currentTarget;
  if (!i) return;
  const s = gh(() => {
    if (ks.has(i)) return;
    eu(i, "down");
    const l = gh(() => {
        eu(i, "up");
      }),
      c = () => eu(i, "cancel");
    (i.addEventListener("keyup", l, r), i.addEventListener("blur", c, r));
  });
  (i.addEventListener("keydown", s, r),
    i.addEventListener("blur", () => i.removeEventListener("keydown", s), r));
};
function yh(t) {
  return Dc(t) && !Qg();
}
const vh = new WeakSet();
function vS(t, r, i = {}) {
  const [s, l, c] = Zg(t, i),
    d = (f) => {
      const h = f.currentTarget;
      if (!yh(f) || vh.has(f)) return;
      (ks.add(h), i.stopPropagation && vh.add(f));
      const m = r(h, f),
        y = (P, A) => {
          (window.removeEventListener("pointerup", x),
            window.removeEventListener("pointercancel", w),
            ks.has(h) && ks.delete(h),
            yh(P) && typeof m == "function" && m(P, { success: A }));
        },
        x = (P) => {
          y(P, h === window || h === document || i.useGlobalTarget || Jg(h, P.target));
        },
        w = (P) => {
          y(P, !1);
        };
      (window.addEventListener("pointerup", x, l), window.addEventListener("pointercancel", w, l));
    };
  return (
    s.forEach((f) => {
      ((i.useGlobalTarget ? window : f).addEventListener("pointerdown", d, l),
        uS(f) &&
          (f.addEventListener("focus", (m) => yS(m, l)),
          !hS(f) && !f.hasAttribute("tabindex") && (f.tabIndex = 0)));
    }),
    c
  );
}
function Oc(t) {
  return ng(t) && "ownerSVGElement" in t;
}
const Cs = new WeakMap();
let bs;
const ey = (t, r, i) => (s, l) =>
    l && l[0] ? l[0][t + "Size"] : Oc(s) && "getBBox" in s ? s.getBBox()[r] : s[i],
  xS = ey("inline", "width", "offsetWidth"),
  wS = ey("block", "height", "offsetHeight");
function SS({ target: t, borderBoxSize: r }) {
  Cs.get(t)?.forEach((i) => {
    i(t, {
      get width() {
        return xS(t, r);
      },
      get height() {
        return wS(t, r);
      },
    });
  });
}
function kS(t) {
  t.forEach(SS);
}
function CS() {
  typeof ResizeObserver > "u" || (bs = new ResizeObserver(kS));
}
function bS(t, r) {
  bs || CS();
  const i = Kg(t);
  return (
    i.forEach((s) => {
      let l = Cs.get(s);
      (l || ((l = new Set()), Cs.set(s, l)), l.add(r), bs?.observe(s));
    }),
    () => {
      i.forEach((s) => {
        const l = Cs.get(s);
        (l?.delete(r), l?.size || bs?.unobserve(s));
      });
    }
  );
}
const Es = new Set();
let Lr;
function ES() {
  ((Lr = () => {
    const t = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      },
    };
    Es.forEach((r) => r(t));
  }),
    window.addEventListener("resize", Lr));
}
function TS(t) {
  return (
    Es.add(t),
    Lr || ES(),
    () => {
      (Es.delete(t),
        !Es.size &&
          typeof Lr == "function" &&
          (window.removeEventListener("resize", Lr), (Lr = void 0)));
    }
  );
}
function xh(t, r) {
  return typeof t == "function" ? TS(t) : bS(t, r);
}
function PS(t) {
  return Oc(t) && t.tagName === "svg";
}
const NS = [...Gg, Ie, Lt],
  jS = (t) => NS.find($g(t)),
  wh = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Ir = () => ({ x: wh(), y: wh() }),
  Sh = () => ({ min: 0, max: 0 }),
  $e = () => ({ x: Sh(), y: Sh() }),
  AS = new WeakMap();
function Hs(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Ui(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Fc = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
  _c = ["initial", ...Fc];
function Us(t) {
  return Hs(t.animate) || _c.some((r) => Ui(t[r]));
}
function ty(t) {
  return !!(Us(t) || t.variants);
}
function MS(t, r, i) {
  for (const s in r) {
    const l = r[s],
      c = i[s];
    if (it(l)) t.addValue(s, l);
    else if (it(c)) t.addValue(s, Hr(l, { owner: t }));
    else if (c !== l)
      if (t.hasValue(s)) {
        const d = t.getValue(s);
        d.liveStyle === !0 ? d.jump(l) : d.hasAnimated || d.set(l);
      } else {
        const d = t.getStaticValue(s);
        t.addValue(s, Hr(d !== void 0 ? d : l, { owner: t }));
      }
  }
  for (const s in i) r[s] === void 0 && t.removeValue(s);
  return r;
}
const tc = { current: null },
  ny = { current: !1 },
  RS = typeof window < "u";
function DS() {
  if (((ny.current = !0), !!RS))
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"),
        r = () => (tc.current = t.matches);
      (t.addEventListener("change", r), r());
    } else tc.current = !1;
}
const kh = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
let Fs = {};
function ry(t) {
  Fs = t;
}
function OS() {
  return Fs;
}
class FS {
  scrapeMotionValuesFromProps(r, i, s) {
    return {};
  }
  constructor(
    {
      parent: r,
      props: i,
      presenceContext: s,
      reducedMotionConfig: l,
      skipAnimations: c,
      blockInitialAnimation: d,
      visualState: f,
    },
    h = {}
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.shouldSkipAnimations = !1),
      (this.values = new Map()),
      (this.KeyframeResolver = Tc),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.hasBeenMounted = !1),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const P = at.now();
        this.renderScheduledAt < P &&
          ((this.renderScheduledAt = P), be.render(this.render, !1, !0));
      }));
    const { latestValues: m, renderState: y } = f;
    ((this.latestValues = m),
      (this.baseTarget = { ...m }),
      (this.initialValues = i.initial ? { ...m } : {}),
      (this.renderState = y),
      (this.parent = r),
      (this.props = i),
      (this.presenceContext = s),
      (this.depth = r ? r.depth + 1 : 0),
      (this.reducedMotionConfig = l),
      (this.skipAnimationsConfig = c),
      (this.options = h),
      (this.blockInitialAnimation = !!d),
      (this.isControllingVariants = Us(i)),
      (this.isVariantNode = ty(i)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(r && r.current)));
    const { willChange: x, ...w } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const P in w) {
      const A = w[P];
      m[P] !== void 0 && it(A) && A.set(m[P]);
    }
  }
  mount(r) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        (this.values.get(i)?.jump(this.initialValues[i]),
          (this.latestValues[i] = this.initialValues[i]));
    ((this.current = r),
      AS.set(r, this),
      this.projection && !this.projection.instance && this.projection.mount(r),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((i, s) => this.bindToMotionValue(s, i)),
      this.reducedMotionConfig === "never"
        ? (this.shouldReduceMotion = !1)
        : this.reducedMotionConfig === "always"
          ? (this.shouldReduceMotion = !0)
          : (ny.current || DS(), (this.shouldReduceMotion = tc.current)),
      (this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
      this.parent?.addChild(this),
      this.update(this.props, this.presenceContext),
      (this.hasBeenMounted = !0));
  }
  unmount() {
    (this.projection && this.projection.unmount(),
      On(this.notifyUpdate),
      On(this.render),
      this.valueSubscriptions.forEach((r) => r()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent?.removeChild(this));
    for (const r in this.events) this.events[r].clear();
    for (const r in this.features) {
      const i = this.features[r];
      i && (i.unmount(), (i.isMounted = !1));
    }
    this.current = null;
  }
  addChild(r) {
    (this.children.add(r),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(r));
  }
  removeChild(r) {
    (this.children.delete(r), this.enteringChildren && this.enteringChildren.delete(r));
  }
  bindToMotionValue(r, i) {
    if (
      (this.valueSubscriptions.has(r) && this.valueSubscriptions.get(r)(),
      i.accelerate && lS.has(r) && this.current instanceof HTMLElement)
    ) {
      const { factory: d, keyframes: f, times: h, ease: m, duration: y } = i.accelerate,
        x = new _g({
          element: this.current,
          name: r,
          keyframes: f,
          times: h,
          ease: m,
          duration: _t(y),
        }),
        w = d(x);
      this.valueSubscriptions.set(r, () => {
        (w(), x.cancel());
      });
      return;
    }
    const s = Gr.has(r);
    s && this.onBindTransform && this.onBindTransform();
    const l = i.on("change", (d) => {
      ((this.latestValues[r] = d),
        this.props.onUpdate && be.preRender(this.notifyUpdate),
        s && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender());
    });
    let c;
    (typeof window < "u" &&
      window.MotionCheckAppearSync &&
      (c = window.MotionCheckAppearSync(this, r, i)),
      this.valueSubscriptions.set(r, () => {
        (l(), c && c(), i.owner && i.stop());
      }));
  }
  sortNodePosition(r) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== r.type
      ? 0
      : this.sortInstanceNodePosition(this.current, r.current);
  }
  updateFeatures() {
    let r = "animation";
    for (r in Fs) {
      const i = Fs[r];
      if (!i) continue;
      const { isEnabled: s, Feature: l } = i;
      if (
        (!this.features[r] && l && s(this.props) && (this.features[r] = new l(this)),
        this.features[r])
      ) {
        const c = this.features[r];
        c.isMounted ? c.update() : (c.mount(), (c.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : $e();
  }
  getStaticValue(r) {
    return this.latestValues[r];
  }
  setStaticValue(r, i) {
    this.latestValues[r] = i;
  }
  update(r, i) {
    ((r.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = r),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = i));
    for (let s = 0; s < kh.length; s++) {
      const l = kh[s];
      this.propEventSubscriptions[l] &&
        (this.propEventSubscriptions[l](), delete this.propEventSubscriptions[l]);
      const c = "on" + l,
        d = r[c];
      d && (this.propEventSubscriptions[l] = this.on(l, d));
    }
    ((this.prevMotionValues = MS(
      this,
      this.scrapeMotionValuesFromProps(r, this.prevProps || {}, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue());
  }
  getProps() {
    return this.props;
  }
  getVariant(r) {
    return this.props.variants ? this.props.variants[r] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  addVariantChild(r) {
    const i = this.getClosestVariantNode();
    if (i)
      return (i.variantChildren && i.variantChildren.add(r), () => i.variantChildren.delete(r));
  }
  addValue(r, i) {
    const s = this.values.get(r);
    i !== s &&
      (s && this.removeValue(r),
      this.bindToMotionValue(r, i),
      this.values.set(r, i),
      (this.latestValues[r] = i.get()));
  }
  removeValue(r) {
    this.values.delete(r);
    const i = this.valueSubscriptions.get(r);
    (i && (i(), this.valueSubscriptions.delete(r)),
      delete this.latestValues[r],
      this.removeValueFromRenderState(r, this.renderState));
  }
  hasValue(r) {
    return this.values.has(r);
  }
  getValue(r, i) {
    if (this.props.values && this.props.values[r]) return this.props.values[r];
    let s = this.values.get(r);
    return (
      s === void 0 &&
        i !== void 0 &&
        ((s = Hr(i === null ? void 0 : i, { owner: this })), this.addValue(r, s)),
      s
    );
  }
  readValue(r, i) {
    let s =
      this.latestValues[r] !== void 0 || !this.current
        ? this.latestValues[r]
        : (this.getBaseTargetFromProps(this.props, r) ??
          this.readValueFromInstance(this.current, r, this.options));
    return (
      s != null &&
        (typeof s == "string" && (tg(s) || rg(s))
          ? (s = parseFloat(s))
          : !jS(s) && Lt.test(i) && (s = Xg(r, i)),
        this.setBaseTarget(r, it(s) ? s.get() : s)),
      it(s) ? s.get() : s
    );
  }
  setBaseTarget(r, i) {
    this.baseTarget[r] = i;
  }
  getBaseTarget(r) {
    const { initial: i } = this.props;
    let s;
    if (typeof i == "string" || typeof i == "object") {
      const c = jc(this.props, i, this.presenceContext?.custom);
      c && (s = c[r]);
    }
    if (i && s !== void 0) return s;
    const l = this.getBaseTargetFromProps(this.props, r);
    return l !== void 0 && !it(l)
      ? l
      : this.initialValues[r] !== void 0 && s === void 0
        ? void 0
        : this.baseTarget[r];
  }
  on(r, i) {
    return (this.events[r] || (this.events[r] = new mc()), this.events[r].add(i));
  }
  notify(r, ...i) {
    this.events[r] && this.events[r].notify(...i);
  }
  scheduleRenderMicrotask() {
    Rc.render(this.render);
  }
}
class iy extends FS {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = aS));
  }
  sortInstanceNodePosition(r, i) {
    return r.compareDocumentPosition(i) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(r, i) {
    const s = r.style;
    return s ? s[i] : void 0;
  }
  removeValueFromRenderState(r, { vars: i, style: s }) {
    (delete i[r], delete s[r]);
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: r } = this.props;
    it(r) &&
      (this.childSubscription = r.on("change", (i) => {
        this.current && (this.current.textContent = `${i}`);
      }));
  }
}
class Fn {
  constructor(r) {
    ((this.isMounted = !1), (this.node = r));
  }
  update() {}
}
function oy({ top: t, left: r, right: i, bottom: s }) {
  return { x: { min: r, max: i }, y: { min: t, max: s } };
}
function _S({ x: t, y: r }) {
  return { top: r.min, right: t.max, bottom: r.max, left: t.min };
}
function LS(t, r) {
  if (!r) return t;
  const i = r({ x: t.left, y: t.top }),
    s = r({ x: t.right, y: t.bottom });
  return { top: i.y, left: i.x, bottom: s.y, right: s.x };
}
function tu(t) {
  return t === void 0 || t === 1;
}
function nc({ scale: t, scaleX: r, scaleY: i }) {
  return !tu(t) || !tu(r) || !tu(i);
}
function Jn(t) {
  return nc(t) || sy(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function sy(t) {
  return Ch(t.x) || Ch(t.y);
}
function Ch(t) {
  return t && t !== "0%";
}
function _s(t, r, i) {
  const s = t - i,
    l = r * s;
  return i + l;
}
function bh(t, r, i, s, l) {
  return (l !== void 0 && (t = _s(t, l, s)), _s(t, i, s) + r);
}
function rc(t, r = 0, i = 1, s, l) {
  ((t.min = bh(t.min, r, i, s, l)), (t.max = bh(t.max, r, i, s, l)));
}
function ay(t, { x: r, y: i }) {
  (rc(t.x, r.translate, r.scale, r.originPoint), rc(t.y, i.translate, i.scale, i.originPoint));
}
const Eh = 0.999999999999,
  Th = 1.0000000000001;
function IS(t, r, i, s = !1) {
  const l = i.length;
  if (!l) return;
  r.x = r.y = 1;
  let c, d;
  for (let f = 0; f < l; f++) {
    ((c = i[f]), (d = c.projectionDelta));
    const { visualElement: h } = c.options;
    (h && h.props.style && h.props.style.display === "contents") ||
      (s &&
        c.options.layoutScroll &&
        c.scroll &&
        c !== c.root &&
        zr(t, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
      d && ((r.x *= d.x.scale), (r.y *= d.y.scale), ay(t, d)),
      s && Jn(c.latestValues) && zr(t, c.latestValues));
  }
  (r.x < Th && r.x > Eh && (r.x = 1), r.y < Th && r.y > Eh && (r.y = 1));
}
function Vr(t, r) {
  ((t.min = t.min + r), (t.max = t.max + r));
}
function Ph(t, r, i, s, l = 0.5) {
  const c = Me(t.min, t.max, l);
  rc(t, r, i, c, s);
}
function Nh(t, r) {
  return typeof t == "string" ? (parseFloat(t) / 100) * (r.max - r.min) : t;
}
function zr(t, r) {
  (Ph(t.x, Nh(r.x, t.x), r.scaleX, r.scale, r.originX),
    Ph(t.y, Nh(r.y, t.y), r.scaleY, r.scale, r.originY));
}
function ly(t, r) {
  return oy(LS(t.getBoundingClientRect(), r));
}
function VS(t, r, i) {
  const s = ly(t, i),
    { scroll: l } = r;
  return (l && (Vr(s.x, l.offset.x), Vr(s.y, l.offset.y)), s);
}
const zS = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  BS = $r.length;
function WS(t, r, i) {
  let s = "",
    l = !0;
  for (let c = 0; c < BS; c++) {
    const d = $r[c],
      f = t[d];
    if (f === void 0) continue;
    let h = !0;
    if (typeof f == "number") h = f === (d.startsWith("scale") ? 1 : 0);
    else {
      const m = parseFloat(f);
      h = d.startsWith("scale") ? m === 1 : m === 0;
    }
    if (!h || i) {
      const m = qg(f, Mc[d]);
      if (!h) {
        l = !1;
        const y = zS[d] || d;
        s += `${y}(${m}) `;
      }
      i && (r[d] = m);
    }
  }
  return ((s = s.trim()), i ? (s = i(r, l ? "" : s)) : l && (s = "none"), s);
}
function Lc(t, r, i) {
  const { style: s, vars: l, transformOrigin: c } = t;
  let d = !1,
    f = !1;
  for (const h in r) {
    const m = r[h];
    if (Gr.has(h)) {
      d = !0;
      continue;
    } else if (vg(h)) {
      l[h] = m;
      continue;
    } else {
      const y = qg(m, Mc[h]);
      h.startsWith("origin") ? ((f = !0), (c[h] = y)) : (s[h] = y);
    }
  }
  if (
    (r.transform ||
      (d || i ? (s.transform = WS(r, t.transform, i)) : s.transform && (s.transform = "none")),
    f)
  ) {
    const { originX: h = "50%", originY: m = "50%", originZ: y = 0 } = c;
    s.transformOrigin = `${h} ${m} ${y}`;
  }
}
function uy(t, { style: r, vars: i }, s, l) {
  const c = t.style;
  let d;
  for (d in r) c[d] = r[d];
  l?.applyProjectionStyles(c, s);
  for (d in i) c.setProperty(d, i[d]);
}
function jh(t, r) {
  return r.max === r.min ? 0 : (t / (r.max - r.min)) * 100;
}
const Oi = {
    correct: (t, r) => {
      if (!r.target) return t;
      if (typeof t == "string")
        if (Z.test(t)) t = parseFloat(t);
        else return t;
      const i = jh(t, r.target.x),
        s = jh(t, r.target.y);
      return `${i}% ${s}%`;
    },
  },
  HS = {
    correct: (t, { treeScale: r, projectionDelta: i }) => {
      const s = t,
        l = Lt.parse(t);
      if (l.length > 5) return s;
      const c = Lt.createTransformer(t),
        d = typeof l[0] != "number" ? 1 : 0,
        f = i.x.scale * r.x,
        h = i.y.scale * r.y;
      ((l[0 + d] /= f), (l[1 + d] /= h));
      const m = Me(f, h, 0.5);
      return (
        typeof l[2 + d] == "number" && (l[2 + d] /= m),
        typeof l[3 + d] == "number" && (l[3 + d] /= m),
        c(l)
      );
    },
  },
  ic = {
    borderRadius: {
      ...Oi,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: Oi,
    borderTopRightRadius: Oi,
    borderBottomLeftRadius: Oi,
    borderBottomRightRadius: Oi,
    boxShadow: HS,
  };
function cy(t, { layout: r, layoutId: i }) {
  return (
    Gr.has(t) || t.startsWith("origin") || ((r || i !== void 0) && (!!ic[t] || t === "opacity"))
  );
}
function Ic(t, r, i) {
  const s = t.style,
    l = r?.style,
    c = {};
  if (!s) return c;
  for (const d in s)
    (it(s[d]) || (l && it(l[d])) || cy(d, t) || i?.getValue(d)?.liveStyle !== void 0) &&
      (c[d] = s[d]);
  return c;
}
function US(t) {
  return window.getComputedStyle(t);
}
class $S extends iy {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = uy));
  }
  readValueFromInstance(r, i) {
    if (Gr.has(i)) return this.projection?.isProjecting ? Uu(i) : c1(r, i);
    {
      const s = US(r),
        l = (vg(i) ? s.getPropertyValue(i) : s[i]) || 0;
      return typeof l == "string" ? l.trim() : l;
    }
  }
  measureInstanceViewportBox(r, { transformPagePoint: i }) {
    return ly(r, i);
  }
  build(r, i, s) {
    Lc(r, i, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(r, i, s) {
    return Ic(r, i, s);
  }
}
const GS = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  YS = { offset: "strokeDashoffset", array: "strokeDasharray" };
function XS(t, r, i = 1, s = 0, l = !0) {
  t.pathLength = 1;
  const c = l ? GS : YS;
  ((t[c.offset] = `${-s}`), (t[c.array] = `${r} ${i}`));
}
const KS = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
function dy(
  t,
  { attrX: r, attrY: i, attrScale: s, pathLength: l, pathSpacing: c = 1, pathOffset: d = 0, ...f },
  h,
  m,
  y
) {
  if ((Lc(t, f, m), h)) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  ((t.attrs = t.style), (t.style = {}));
  const { attrs: x, style: w } = t;
  (x.transform && ((w.transform = x.transform), delete x.transform),
    (w.transform || x.transformOrigin) &&
      ((w.transformOrigin = x.transformOrigin ?? "50% 50%"), delete x.transformOrigin),
    w.transform && ((w.transformBox = y?.transformBox ?? "fill-box"), delete x.transformBox));
  for (const P of KS) x[P] !== void 0 && ((w[P] = x[P]), delete x[P]);
  (r !== void 0 && (x.x = r),
    i !== void 0 && (x.y = i),
    s !== void 0 && (x.scale = s),
    l !== void 0 && XS(x, l, c, d, !1));
}
const fy = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust",
  ]),
  py = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function qS(t, r, i, s) {
  uy(t, r, void 0, s);
  for (const l in r.attrs) t.setAttribute(fy.has(l) ? l : Ac(l), r.attrs[l]);
}
function hy(t, r, i) {
  const s = Ic(t, r, i);
  for (const l in t)
    if (it(t[l]) || it(r[l])) {
      const c = $r.indexOf(l) !== -1 ? "attr" + l.charAt(0).toUpperCase() + l.substring(1) : l;
      s[c] = t[l];
    }
  return s;
}
class QS extends iy {
  constructor() {
    (super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = $e));
  }
  getBaseTargetFromProps(r, i) {
    return r[i];
  }
  readValueFromInstance(r, i) {
    if (Gr.has(i)) {
      const s = Yg(i);
      return (s && s.default) || 0;
    }
    return ((i = fy.has(i) ? i : Ac(i)), r.getAttribute(i));
  }
  scrapeMotionValuesFromProps(r, i, s) {
    return hy(r, i, s);
  }
  build(r, i, s) {
    dy(r, i, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(r, i, s, l) {
    qS(r, i, s, l);
  }
  mount(r) {
    ((this.isSVGTag = py(r.tagName)), super.mount(r));
  }
}
const ZS = _c.length;
function my(t) {
  if (!t) return;
  if (!t.isControllingVariants) {
    const i = t.parent ? my(t.parent) || {} : {};
    return (t.props.initial !== void 0 && (i.initial = t.props.initial), i);
  }
  const r = {};
  for (let i = 0; i < ZS; i++) {
    const s = _c[i],
      l = t.props[s];
    (Ui(l) || l === !1) && (r[s] = l);
  }
  return r;
}
function gy(t, r) {
  if (!Array.isArray(r)) return !1;
  const i = r.length;
  if (i !== t.length) return !1;
  for (let s = 0; s < i; s++) if (r[s] !== t[s]) return !1;
  return !0;
}
const JS = [...Fc].reverse(),
  ek = Fc.length;
function tk(t) {
  return (r) => Promise.all(r.map(({ animation: i, options: s }) => q1(t, i, s)));
}
function nk(t) {
  let r = tk(t),
    i = Ah(),
    s = !0,
    l = !1;
  const c = (m) => (y, x) => {
    const w = Br(t, x, m === "exit" ? t.presenceContext?.custom : void 0);
    if (w) {
      const { transition: P, transitionEnd: A, ...b } = w;
      y = { ...y, ...b, ...A };
    }
    return y;
  };
  function d(m) {
    r = m(t);
  }
  function f(m) {
    const { props: y } = t,
      x = my(t.parent) || {},
      w = [],
      P = new Set();
    let A = {},
      b = 1 / 0;
    for (let O = 0; O < ek; O++) {
      const I = JS[O],
        F = i[I],
        W = y[I] !== void 0 ? y[I] : x[I],
        $ = Ui(W),
        ee = I === m ? F.isActive : null;
      ee === !1 && (b = O);
      let G = W === x[I] && W !== y[I] && $;
      if (
        (G && (s || l) && t.manuallyAnimateOnMount && (G = !1),
        (F.protectedKeys = { ...A }),
        (!F.isActive && ee === null) || (!W && !F.prevProp) || Hs(W) || typeof W == "boolean")
      )
        continue;
      if (I === "exit" && F.isActive && ee !== !0) {
        F.prevResolvedValues && (A = { ...A, ...F.prevResolvedValues });
        continue;
      }
      const _ = rk(F.prevProp, W);
      let ue = _ || (I === m && F.isActive && !G && $) || (O > b && $),
        ve = !1;
      const ze = Array.isArray(W) ? W : [W];
      let Pe = ze.reduce(c(I), {});
      ee === !1 && (Pe = {});
      const { prevResolvedValues: Be = {} } = F,
        Ke = { ...Be, ...Pe },
        _e = (H) => {
          ((ue = !0), P.has(H) && ((ve = !0), P.delete(H)), (F.needsAnimating[H] = !0));
          const X = t.getValue(H);
          X && (X.liveStyle = !1);
        };
      for (const H in Ke) {
        const X = Pe[H],
          D = Be[H];
        if (A.hasOwnProperty(H)) continue;
        let T = !1;
        (qu(X) && qu(D) ? (T = !gy(X, D)) : (T = X !== D),
          T
            ? X != null
              ? _e(H)
              : P.add(H)
            : X !== void 0 && P.has(H)
              ? _e(H)
              : (F.protectedKeys[H] = !0));
      }
      ((F.prevProp = W),
        (F.prevResolvedValues = Pe),
        F.isActive && (A = { ...A, ...Pe }),
        (s || l) && t.blockInitialAnimation && (ue = !1));
      const Se = G && _;
      ue &&
        (!Se || ve) &&
        w.push(
          ...ze.map((H) => {
            const X = { type: I };
            if (typeof H == "string" && (s || l) && !Se && t.manuallyAnimateOnMount && t.parent) {
              const { parent: D } = t,
                T = Br(D, H);
              if (D.enteringChildren && T) {
                const { delayChildren: L } = T.transition || {};
                X.delay = Ig(D.enteringChildren, t, L);
              }
            }
            return { animation: H, options: X };
          })
        );
    }
    if (P.size) {
      const O = {};
      if (typeof y.initial != "boolean") {
        const I = Br(t, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        I && I.transition && (O.transition = I.transition);
      }
      (P.forEach((I) => {
        const F = t.getBaseTarget(I),
          W = t.getValue(I);
        (W && (W.liveStyle = !0), (O[I] = F ?? null));
      }),
        w.push({ animation: O }));
    }
    let j = !!w.length;
    return (
      s && (y.initial === !1 || y.initial === y.animate) && !t.manuallyAnimateOnMount && (j = !1),
      (s = !1),
      (l = !1),
      j ? r(w) : Promise.resolve()
    );
  }
  function h(m, y) {
    if (i[m].isActive === y) return Promise.resolve();
    (t.variantChildren?.forEach((w) => w.animationState?.setActive(m, y)), (i[m].isActive = y));
    const x = f(m);
    for (const w in i) i[w].protectedKeys = {};
    return x;
  }
  return {
    animateChanges: f,
    setActive: h,
    setAnimateFunction: d,
    getState: () => i,
    reset: () => {
      ((i = Ah()), (l = !0));
    },
  };
}
function rk(t, r) {
  return typeof r == "string" ? r !== t : Array.isArray(r) ? !gy(r, t) : !1;
}
function Qn(t = !1) {
  return { isActive: t, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function Ah() {
  return {
    animate: Qn(!0),
    whileInView: Qn(),
    whileHover: Qn(),
    whileTap: Qn(),
    whileDrag: Qn(),
    whileFocus: Qn(),
    exit: Qn(),
  };
}
function Mh(t, r) {
  ((t.min = r.min), (t.max = r.max));
}
function Ot(t, r) {
  (Mh(t.x, r.x), Mh(t.y, r.y));
}
function Rh(t, r) {
  ((t.translate = r.translate),
    (t.scale = r.scale),
    (t.originPoint = r.originPoint),
    (t.origin = r.origin));
}
const yy = 1e-4,
  ik = 1 - yy,
  ok = 1 + yy,
  vy = 0.01,
  sk = 0 - vy,
  ak = 0 + vy;
function lt(t) {
  return t.max - t.min;
}
function lk(t, r, i) {
  return Math.abs(t - r) <= i;
}
function Dh(t, r, i, s = 0.5) {
  ((t.origin = s),
    (t.originPoint = Me(r.min, r.max, t.origin)),
    (t.scale = lt(i) / lt(r)),
    (t.translate = Me(i.min, i.max, t.origin) - t.originPoint),
    ((t.scale >= ik && t.scale <= ok) || isNaN(t.scale)) && (t.scale = 1),
    ((t.translate >= sk && t.translate <= ak) || isNaN(t.translate)) && (t.translate = 0));
}
function Vi(t, r, i, s) {
  (Dh(t.x, r.x, i.x, s ? s.originX : void 0), Dh(t.y, r.y, i.y, s ? s.originY : void 0));
}
function Oh(t, r, i) {
  ((t.min = i.min + r.min), (t.max = t.min + lt(r)));
}
function uk(t, r, i) {
  (Oh(t.x, r.x, i.x), Oh(t.y, r.y, i.y));
}
function Fh(t, r, i) {
  ((t.min = r.min - i.min), (t.max = t.min + lt(r)));
}
function Ls(t, r, i) {
  (Fh(t.x, r.x, i.x), Fh(t.y, r.y, i.y));
}
function _h(t, r, i, s, l) {
  return ((t -= r), (t = _s(t, 1 / i, s)), l !== void 0 && (t = _s(t, 1 / l, s)), t);
}
function ck(t, r = 0, i = 1, s = 0.5, l, c = t, d = t) {
  if (
    (Gt.test(r) && ((r = parseFloat(r)), (r = Me(d.min, d.max, r / 100) - d.min)),
    typeof r != "number")
  )
    return;
  let f = Me(c.min, c.max, s);
  (t === c && (f -= r), (t.min = _h(t.min, r, i, f, l)), (t.max = _h(t.max, r, i, f, l)));
}
function Lh(t, r, [i, s, l], c, d) {
  ck(t, r[i], r[s], r[l], r.scale, c, d);
}
const dk = ["x", "scaleX", "originX"],
  fk = ["y", "scaleY", "originY"];
function Ih(t, r, i, s) {
  (Lh(t.x, r, dk, i ? i.x : void 0, s ? s.x : void 0),
    Lh(t.y, r, fk, i ? i.y : void 0, s ? s.y : void 0));
}
function Vh(t) {
  return t.translate === 0 && t.scale === 1;
}
function xy(t) {
  return Vh(t.x) && Vh(t.y);
}
function zh(t, r) {
  return t.min === r.min && t.max === r.max;
}
function pk(t, r) {
  return zh(t.x, r.x) && zh(t.y, r.y);
}
function Bh(t, r) {
  return Math.round(t.min) === Math.round(r.min) && Math.round(t.max) === Math.round(r.max);
}
function wy(t, r) {
  return Bh(t.x, r.x) && Bh(t.y, r.y);
}
function Wh(t) {
  return lt(t.x) / lt(t.y);
}
function Hh(t, r) {
  return t.translate === r.translate && t.scale === r.scale && t.originPoint === r.originPoint;
}
function Ut(t) {
  return [t("x"), t("y")];
}
function hk(t, r, i) {
  let s = "";
  const l = t.x.translate / r.x,
    c = t.y.translate / r.y,
    d = i?.z || 0;
  if (
    ((l || c || d) && (s = `translate3d(${l}px, ${c}px, ${d}px) `),
    (r.x !== 1 || r.y !== 1) && (s += `scale(${1 / r.x}, ${1 / r.y}) `),
    i)
  ) {
    const { transformPerspective: m, rotate: y, rotateX: x, rotateY: w, skewX: P, skewY: A } = i;
    (m && (s = `perspective(${m}px) ${s}`),
      y && (s += `rotate(${y}deg) `),
      x && (s += `rotateX(${x}deg) `),
      w && (s += `rotateY(${w}deg) `),
      P && (s += `skewX(${P}deg) `),
      A && (s += `skewY(${A}deg) `));
  }
  const f = t.x.scale * r.x,
    h = t.y.scale * r.y;
  return ((f !== 1 || h !== 1) && (s += `scale(${f}, ${h})`), s || "none");
}
const Sy = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  mk = Sy.length,
  Uh = (t) => (typeof t == "string" ? parseFloat(t) : t),
  $h = (t) => typeof t == "number" || Z.test(t);
function gk(t, r, i, s, l, c) {
  l
    ? ((t.opacity = Me(0, i.opacity ?? 1, yk(s))), (t.opacityExit = Me(r.opacity ?? 1, 0, vk(s))))
    : c && (t.opacity = Me(r.opacity ?? 1, i.opacity ?? 1, s));
  for (let d = 0; d < mk; d++) {
    const f = `border${Sy[d]}Radius`;
    let h = Gh(r, f),
      m = Gh(i, f);
    if (h === void 0 && m === void 0) continue;
    (h || (h = 0),
      m || (m = 0),
      h === 0 || m === 0 || $h(h) === $h(m)
        ? ((t[f] = Math.max(Me(Uh(h), Uh(m), s), 0)), (Gt.test(m) || Gt.test(h)) && (t[f] += "%"))
        : (t[f] = m));
  }
  (r.rotate || i.rotate) && (t.rotate = Me(r.rotate || 0, i.rotate || 0, s));
}
function Gh(t, r) {
  return t[r] !== void 0 ? t[r] : t.borderRadius;
}
const yk = ky(0, 0.5, fg),
  vk = ky(0.5, 0.95, Tt);
function ky(t, r, i) {
  return (s) => (s < t ? 0 : s > r ? 1 : i(Bi(t, r, s)));
}
function xk(t, r, i) {
  const s = it(t) ? t : Hr(t);
  return (s.start(Nc("", s, r, i)), s.animation);
}
function $i(t, r, i, s = { passive: !0 }) {
  return (t.addEventListener(r, i, s), () => t.removeEventListener(r, i));
}
const wk = (t, r) => t.depth - r.depth;
class Sk {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(r) {
    (pc(this.children, r), (this.isDirty = !0));
  }
  remove(r) {
    (Ms(this.children, r), (this.isDirty = !0));
  }
  forEach(r) {
    (this.isDirty && this.children.sort(wk), (this.isDirty = !1), this.children.forEach(r));
  }
}
function kk(t, r) {
  const i = at.now(),
    s = ({ timestamp: l }) => {
      const c = l - i;
      c >= r && (On(s), t(c - r));
    };
  return (be.setup(s, !0), () => On(s));
}
function Ts(t) {
  return it(t) ? t.get() : t;
}
class Ck {
  constructor() {
    this.members = [];
  }
  add(r) {
    pc(this.members, r);
    for (let i = this.members.length - 1; i >= 0; i--) {
      const s = this.members[i];
      if (s === r || s === this.lead || s === this.prevLead) continue;
      const l = s.instance;
      (!l || l.isConnected === !1) && !s.snapshot && (Ms(this.members, s), s.unmount());
    }
    r.scheduleRender();
  }
  remove(r) {
    if ((Ms(this.members, r), r === this.prevLead && (this.prevLead = void 0), r === this.lead)) {
      const i = this.members[this.members.length - 1];
      i && this.promote(i);
    }
  }
  relegate(r) {
    for (let i = this.members.indexOf(r) - 1; i >= 0; i--) {
      const s = this.members[i];
      if (s.isPresent !== !1 && s.instance?.isConnected !== !1) return (this.promote(s), !0);
    }
    return !1;
  }
  promote(r, i) {
    const s = this.lead;
    if (r !== s && ((this.prevLead = s), (this.lead = r), r.show(), s)) {
      (s.updateSnapshot(), r.scheduleRender());
      const { layoutDependency: l } = s.options,
        { layoutDependency: c } = r.options;
      ((l === void 0 || l !== c) &&
        ((r.resumeFrom = s),
        i && (s.preserveOpacity = !0),
        s.snapshot &&
          ((r.snapshot = s.snapshot),
          (r.snapshot.latestValues = s.animationValues || s.latestValues)),
        r.root?.isUpdating && (r.isLayoutDirty = !0)),
        r.options.crossfade === !1 && s.hide());
    }
  }
  exitAnimationComplete() {
    this.members.forEach((r) => {
      (r.options.onExitComplete?.(), r.resumingFrom?.options.onExitComplete?.());
    });
  }
  scheduleRender() {
    this.members.forEach((r) => r.instance && r.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const Ps = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 },
  nu = ["", "X", "Y", "Z"],
  bk = 1e3;
let Ek = 0;
function ru(t, r, i, s) {
  const { latestValues: l } = r;
  l[t] && ((i[t] = l[t]), r.setStaticValue(t, 0), s && (s[t] = 0));
}
function Cy(t) {
  if (((t.hasCheckedOptimisedAppear = !0), t.root === t)) return;
  const { visualElement: r } = t.options;
  if (!r) return;
  const i = Hg(r);
  if (window.MotionHasOptimisedAnimation(i, "transform")) {
    const { layout: l, layoutId: c } = t.options;
    window.MotionCancelOptimisedAnimation(i, "transform", be, !(l || c));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && Cy(s);
}
function by({
  attachResizeListener: t,
  defaultParent: r,
  measureScroll: i,
  checkIsScrollRoot: s,
  resetTransform: l,
}) {
  return class {
    constructor(d = {}, f = r?.()) {
      ((this.id = Ek++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.layoutVersion = 0),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(Nk),
            this.nodes.forEach(Rk),
            this.nodes.forEach(Dk),
            this.nodes.forEach(jk));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.linkedParentVersion = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = d),
        (this.root = f ? f.root || f : this),
        (this.path = f ? [...f.path, f] : []),
        (this.parent = f),
        (this.depth = f ? f.depth + 1 : 0));
      for (let h = 0; h < this.path.length; h++) this.path[h].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Sk());
    }
    addEventListener(d, f) {
      return (
        this.eventHandlers.has(d) || this.eventHandlers.set(d, new mc()),
        this.eventHandlers.get(d).add(f)
      );
    }
    notifyListeners(d, ...f) {
      const h = this.eventHandlers.get(d);
      h && h.notify(...f);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    mount(d) {
      if (this.instance) return;
      ((this.isSVG = Oc(d) && !PS(d)), (this.instance = d));
      const { layoutId: f, layout: h, visualElement: m } = this.options;
      if (
        (m && !m.current && m.mount(d),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (h || f) && (this.isLayoutDirty = !0),
        t)
      ) {
        let y,
          x = 0;
        const w = () => (this.root.updateBlockedByResize = !1);
        (be.read(() => {
          x = window.innerWidth;
        }),
          t(d, () => {
            const P = window.innerWidth;
            P !== x &&
              ((x = P),
              (this.root.updateBlockedByResize = !0),
              y && y(),
              (y = kk(w, 250)),
              Ps.hasAnimatedSinceResize &&
                ((Ps.hasAnimatedSinceResize = !1), this.nodes.forEach(Kh)));
          }));
      }
      (f && this.root.registerSharedNode(f, this),
        this.options.animate !== !1 &&
          m &&
          (f || h) &&
          this.addEventListener(
            "didUpdate",
            ({ delta: y, hasLayoutChanged: x, hasRelativeLayoutChanged: w, layout: P }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const A = this.options.transition || m.getDefaultTransition() || Ik,
                { onLayoutAnimationStart: b, onLayoutAnimationComplete: j } = m.getProps(),
                O = !this.targetLayout || !wy(this.targetLayout, P),
                I = !x && w;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                I ||
                (x && (O || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const F = { ...Pc(A, "layout"), onPlay: b, onComplete: j };
                ((m.shouldReduceMotion || this.options.layoutRoot) &&
                  ((F.delay = 0), (F.type = !1)),
                  this.startAnimation(F),
                  this.setAnimationOrigin(y, I));
              } else
                (x || Kh(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete());
              this.targetLayout = P;
            }
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this));
      const d = this.getStack();
      (d && d.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        On(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(Ok), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Cy(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let y = 0; y < this.path.length; y++) {
        const x = this.path[y];
        ((x.shouldResetTransform = !0),
          x.updateScroll("snapshot"),
          x.options.layoutRoot && x.willUpdate(!1));
      }
      const { layoutId: f, layout: h } = this.options;
      if (f === void 0 && !h) return;
      const m = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        d && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Yh));
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Xh);
        return;
      }
      ((this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(Mk),
            this.nodes.forEach(Tk),
            this.nodes.forEach(Pk))
          : this.nodes.forEach(Xh),
        this.clearAllSnapshots());
      const f = at.now();
      ((Ze.delta = Yt(0, 1e3 / 60, f - Ze.timestamp)),
        (Ze.timestamp = f),
        (Ze.isProcessing = !0),
        Xl.update.process(Ze),
        Xl.preRender.process(Ze),
        Xl.render.process(Ze),
        (Ze.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), Rc.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(Ak), this.sharedNodes.forEach(Fk));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), be.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      be.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !lt(this.snapshot.measuredBox.x) &&
          !lt(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let h = 0; h < this.path.length; h++) this.path[h].updateScroll();
      const d = this.layout;
      ((this.layout = this.measure(!1)),
        this.layoutVersion++,
        (this.layoutCorrected = $e()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: f } = this.options;
      f && f.notify("LayoutMeasure", this.layout.layoutBox, d ? d.layoutBox : void 0);
    }
    updateScroll(d = "measure") {
      let f = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === d &&
          (f = !1),
        f && this.instance)
      ) {
        const h = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: d,
          isRoot: h,
          offset: i(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : h,
        };
      }
    }
    resetTransform() {
      if (!l) return;
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        f = this.projectionDelta && !xy(this.projectionDelta),
        h = this.getTransformTemplate(),
        m = h ? h(this.latestValues, "") : void 0,
        y = m !== this.prevTransformTemplateValue;
      d &&
        this.instance &&
        (f || Jn(this.latestValues) || y) &&
        (l(this.instance, m), (this.shouldResetTransform = !1), this.scheduleRender());
    }
    measure(d = !0) {
      const f = this.measurePageBox();
      let h = this.removeElementScroll(f);
      return (
        d && (h = this.removeTransform(h)),
        Vk(h),
        {
          animationId: this.root.animationId,
          measuredBox: f,
          layoutBox: h,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      const { visualElement: d } = this.options;
      if (!d) return $e();
      const f = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(zk))) {
        const { scroll: m } = this.root;
        m && (Vr(f.x, m.offset.x), Vr(f.y, m.offset.y));
      }
      return f;
    }
    removeElementScroll(d) {
      const f = $e();
      if ((Ot(f, d), this.scroll?.wasRoot)) return f;
      for (let h = 0; h < this.path.length; h++) {
        const m = this.path[h],
          { scroll: y, options: x } = m;
        m !== this.root &&
          y &&
          x.layoutScroll &&
          (y.wasRoot && Ot(f, d), Vr(f.x, y.offset.x), Vr(f.y, y.offset.y));
      }
      return f;
    }
    applyTransform(d, f = !1) {
      const h = $e();
      Ot(h, d);
      for (let m = 0; m < this.path.length; m++) {
        const y = this.path[m];
        (!f &&
          y.options.layoutScroll &&
          y.scroll &&
          y !== y.root &&
          zr(h, { x: -y.scroll.offset.x, y: -y.scroll.offset.y }),
          Jn(y.latestValues) && zr(h, y.latestValues));
      }
      return (Jn(this.latestValues) && zr(h, this.latestValues), h);
    }
    removeTransform(d) {
      const f = $e();
      Ot(f, d);
      for (let h = 0; h < this.path.length; h++) {
        const m = this.path[h];
        if (!m.instance || !Jn(m.latestValues)) continue;
        nc(m.latestValues) && m.updateSnapshot();
        const y = $e(),
          x = m.measurePageBox();
        (Ot(y, x), Ih(f, m.latestValues, m.snapshot ? m.snapshot.layoutBox : void 0, y));
      }
      return (Jn(this.latestValues) && Ih(f, this.latestValues), f);
    }
    setTargetDelta(d) {
      ((this.targetDelta = d), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0));
    }
    setOptions(d) {
      this.options = {
        ...this.options,
        ...d,
        crossfade: d.crossfade !== void 0 ? d.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== Ze.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      const f = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = f.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = f.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = f.isSharedProjectionDirty));
      const h = !!this.resumingFrom || this !== f;
      if (
        !(
          d ||
          (h && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          this.parent?.isProjectionDirty ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: y, layoutId: x } = this.options;
      if (!this.layout || !(y || x)) return;
      this.resolvedRelativeTargetAt = Ze.timestamp;
      const w = this.getClosestProjectingParent();
      (w &&
        this.linkedParentVersion !== w.layoutVersion &&
        !w.options.layoutRoot &&
        this.removeRelativeTarget(),
        !this.targetDelta &&
          !this.relativeTarget &&
          (w && w.layout
            ? this.createRelativeTarget(w, this.layout.layoutBox, w.layout.layoutBox)
            : this.removeRelativeTarget()),
        !(!this.relativeTarget && !this.targetDelta) &&
          (this.target || ((this.target = $e()), (this.targetWithTransforms = $e())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              uk(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : Ot(this.target, this.layout.layoutBox),
                ay(this.target, this.targetDelta))
              : Ot(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget &&
            ((this.attemptToResolveRelativeTarget = !1),
            w &&
            !!w.resumingFrom == !!this.resumingFrom &&
            !w.options.layoutScroll &&
            w.target &&
            this.animationProgress !== 1
              ? this.createRelativeTarget(w, this.target, w.target)
              : (this.relativeParent = this.relativeTarget = void 0))));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || nc(this.parent.latestValues) || sy(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    createRelativeTarget(d, f, h) {
      ((this.relativeParent = d),
        (this.linkedParentVersion = d.layoutVersion),
        this.forceRelativeParentToResolveTarget(),
        (this.relativeTarget = $e()),
        (this.relativeTargetOrigin = $e()),
        Ls(this.relativeTargetOrigin, f, h),
        Ot(this.relativeTarget, this.relativeTargetOrigin));
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const d = this.getLead(),
        f = !!this.resumingFrom || this !== d;
      let h = !0;
      if (
        ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (h = !1),
        f && (this.isSharedProjectionDirty || this.isTransformDirty) && (h = !1),
        this.resolvedRelativeTargetAt === Ze.timestamp && (h = !1),
        h)
      )
        return;
      const { layout: m, layoutId: y } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(m || y))
      )
        return;
      Ot(this.layoutCorrected, this.layout.layoutBox);
      const x = this.treeScale.x,
        w = this.treeScale.y;
      (IS(this.layoutCorrected, this.treeScale, this.path, f),
        d.layout &&
          !d.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((d.target = d.layout.layoutBox), (d.targetWithTransforms = $e())));
      const { target: P } = d;
      if (!P) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (Rh(this.prevProjectionDelta.x, this.projectionDelta.x),
          Rh(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Vi(this.projectionDelta, this.layoutCorrected, P, this.latestValues),
        (this.treeScale.x !== x ||
          this.treeScale.y !== w ||
          !Hh(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !Hh(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", P)));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      if ((this.options.visualElement?.scheduleRender(), d)) {
        const f = this.getStack();
        f && f.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = Ir()),
        (this.projectionDelta = Ir()),
        (this.projectionDeltaWithTransform = Ir()));
    }
    setAnimationOrigin(d, f = !1) {
      const h = this.snapshot,
        m = h ? h.latestValues : {},
        y = { ...this.latestValues },
        x = Ir();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !f));
      const w = $e(),
        P = h ? h.source : void 0,
        A = this.layout ? this.layout.source : void 0,
        b = P !== A,
        j = this.getStack(),
        O = !j || j.members.length <= 1,
        I = !!(b && !O && this.options.crossfade === !0 && !this.path.some(Lk));
      this.animationProgress = 0;
      let F;
      ((this.mixTargetDelta = (W) => {
        const $ = W / 1e3;
        (qh(x.x, d.x, $),
          qh(x.y, d.y, $),
          this.setTargetDelta(x),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Ls(w, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            _k(this.relativeTarget, this.relativeTargetOrigin, w, $),
            F && pk(this.relativeTarget, F) && (this.isProjectionDirty = !1),
            F || (F = $e()),
            Ot(F, this.relativeTarget)),
          b && ((this.animationValues = y), gk(y, m, this.latestValues, $, I, O)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = $));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(d) {
      (this.notifyListeners("animationStart"),
        this.currentAnimation?.stop(),
        this.resumingFrom?.currentAnimation?.stop(),
        this.pendingAnimation && (On(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = be.update(() => {
          ((Ps.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = Hr(0)),
            this.motionValue.jump(0, !1),
            (this.currentAnimation = xk(this.motionValue, [0, 1e3], {
              ...d,
              velocity: 0,
              isSync: !0,
              onUpdate: (f) => {
                (this.mixTargetDelta(f), d.onUpdate && d.onUpdate(f));
              },
              onStop: () => {},
              onComplete: () => {
                (d.onComplete && d.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const d = this.getStack();
      (d && d.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(bk), this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: f, target: h, layout: m, latestValues: y } = d;
      if (!(!f || !h || !m)) {
        if (
          this !== d &&
          this.layout &&
          m &&
          Ey(this.options.animationType, this.layout.layoutBox, m.layoutBox)
        ) {
          h = this.target || $e();
          const x = lt(this.layout.layoutBox.x);
          ((h.x.min = d.target.x.min), (h.x.max = h.x.min + x));
          const w = lt(this.layout.layoutBox.y);
          ((h.y.min = d.target.y.min), (h.y.max = h.y.min + w));
        }
        (Ot(f, h), zr(f, y), Vi(this.projectionDeltaWithTransform, this.layoutCorrected, f, y));
      }
    }
    registerSharedNode(d, f) {
      (this.sharedNodes.has(d) || this.sharedNodes.set(d, new Ck()),
        this.sharedNodes.get(d).add(f));
      const m = f.options.initialPromotionConfig;
      f.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity:
          m && m.shouldPreserveFollowOpacity ? m.shouldPreserveFollowOpacity(f) : void 0,
      });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : !0;
    }
    getLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d) return this.root.sharedNodes.get(d);
    }
    promote({ needsReset: d, transition: f, preserveFollowOpacity: h } = {}) {
      const m = this.getStack();
      (m && m.promote(this, h),
        d && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        f && this.setOptions({ transition: f }));
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d) return;
      let f = !1;
      const { latestValues: h } = d;
      if (
        ((h.z || h.rotate || h.rotateX || h.rotateY || h.rotateZ || h.skewX || h.skewY) && (f = !0),
        !f)
      )
        return;
      const m = {};
      h.z && ru("z", d, m, this.animationValues);
      for (let y = 0; y < nu.length; y++)
        (ru(`rotate${nu[y]}`, d, m, this.animationValues),
          ru(`skew${nu[y]}`, d, m, this.animationValues));
      d.render();
      for (const y in m)
        (d.setStaticValue(y, m[y]), this.animationValues && (this.animationValues[y] = m[y]));
      d.scheduleRender();
    }
    applyProjectionStyles(d, f) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        d.visibility = "hidden";
        return;
      }
      const h = this.getTransformTemplate();
      if (this.needsReset) {
        ((this.needsReset = !1),
          (d.visibility = ""),
          (d.opacity = ""),
          (d.pointerEvents = Ts(f?.pointerEvents) || ""),
          (d.transform = h ? h(this.latestValues, "") : "none"));
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        (this.options.layoutId &&
          ((d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
          (d.pointerEvents = Ts(f?.pointerEvents) || "")),
          this.hasProjected &&
            !Jn(this.latestValues) &&
            ((d.transform = h ? h({}, "") : "none"), (this.hasProjected = !1)));
        return;
      }
      d.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let x = hk(this.projectionDeltaWithTransform, this.treeScale, y);
      (h && (x = h(y, x)), (d.transform = x));
      const { x: w, y: P } = this.projectionDelta;
      ((d.transformOrigin = `${w.origin * 100}% ${P.origin * 100}% 0`),
        m.animationValues
          ? (d.opacity =
              m === this
                ? (y.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : y.opacityExit)
          : (d.opacity =
              m === this
                ? y.opacity !== void 0
                  ? y.opacity
                  : ""
                : y.opacityExit !== void 0
                  ? y.opacityExit
                  : 0));
      for (const A in ic) {
        if (y[A] === void 0) continue;
        const { correct: b, applyTo: j, isCSSVariable: O } = ic[A],
          I = x === "none" ? y[A] : b(y[A], m);
        if (j) {
          const F = j.length;
          for (let W = 0; W < F; W++) d[j[W]] = I;
        } else O ? (this.options.visualElement.renderState.vars[A] = I) : (d[A] = I);
      }
      this.options.layoutId && (d.pointerEvents = m === this ? Ts(f?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((d) => d.currentAnimation?.stop()),
        this.root.nodes.forEach(Yh),
        this.root.sharedNodes.clear());
    }
  };
}
function Tk(t) {
  t.updateLayout();
}
function Pk(t) {
  const r = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && r && t.hasListeners("didUpdate")) {
    const { layoutBox: i, measuredBox: s } = t.layout,
      { animationType: l } = t.options,
      c = r.source !== t.layout.source;
    l === "size"
      ? Ut((y) => {
          const x = c ? r.measuredBox[y] : r.layoutBox[y],
            w = lt(x);
          ((x.min = i[y].min), (x.max = x.min + w));
        })
      : Ey(l, r.layoutBox, i) &&
        Ut((y) => {
          const x = c ? r.measuredBox[y] : r.layoutBox[y],
            w = lt(i[y]);
          ((x.max = x.min + w),
            t.relativeTarget &&
              !t.currentAnimation &&
              ((t.isProjectionDirty = !0),
              (t.relativeTarget[y].max = t.relativeTarget[y].min + w)));
        });
    const d = Ir();
    Vi(d, i, r.layoutBox);
    const f = Ir();
    c ? Vi(f, t.applyTransform(s, !0), r.measuredBox) : Vi(f, i, r.layoutBox);
    const h = !xy(d);
    let m = !1;
    if (!t.resumeFrom) {
      const y = t.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: x, layout: w } = y;
        if (x && w) {
          const P = $e();
          Ls(P, r.layoutBox, x.layoutBox);
          const A = $e();
          (Ls(A, i, w.layoutBox),
            wy(P, A) || (m = !0),
            y.options.layoutRoot &&
              ((t.relativeTarget = A), (t.relativeTargetOrigin = P), (t.relativeParent = y)));
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: i,
      snapshot: r,
      delta: f,
      layoutDelta: d,
      hasLayoutChanged: h,
      hasRelativeLayoutChanged: m,
    });
  } else if (t.isLead()) {
    const { onExitComplete: i } = t.options;
    i && i();
  }
  t.options.transition = void 0;
}
function Nk(t) {
  t.parent &&
    (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
    t.isSharedProjectionDirty ||
      (t.isSharedProjectionDirty = !!(
        t.isProjectionDirty ||
        t.parent.isProjectionDirty ||
        t.parent.isSharedProjectionDirty
      )),
    t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function jk(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function Ak(t) {
  t.clearSnapshot();
}
function Yh(t) {
  t.clearMeasurements();
}
function Xh(t) {
  t.isLayoutDirty = !1;
}
function Mk(t) {
  const { visualElement: r } = t.options;
  (r && r.getProps().onBeforeLayoutMeasure && r.notify("BeforeLayoutMeasure"), t.resetTransform());
}
function Kh(t) {
  (t.finishAnimation(),
    (t.targetDelta = t.relativeTarget = t.target = void 0),
    (t.isProjectionDirty = !0));
}
function Rk(t) {
  t.resolveTargetDelta();
}
function Dk(t) {
  t.calcProjection();
}
function Ok(t) {
  t.resetSkewAndRotation();
}
function Fk(t) {
  t.removeLeadSnapshot();
}
function qh(t, r, i) {
  ((t.translate = Me(r.translate, 0, i)),
    (t.scale = Me(r.scale, 1, i)),
    (t.origin = r.origin),
    (t.originPoint = r.originPoint));
}
function Qh(t, r, i, s) {
  ((t.min = Me(r.min, i.min, s)), (t.max = Me(r.max, i.max, s)));
}
function _k(t, r, i, s) {
  (Qh(t.x, r.x, i.x, s), Qh(t.y, r.y, i.y, s));
}
function Lk(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const Ik = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Zh = (t) =>
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t),
  Jh = Zh("applewebkit/") && !Zh("chrome/") ? Math.round : Tt;
function em(t) {
  ((t.min = Jh(t.min)), (t.max = Jh(t.max)));
}
function Vk(t) {
  (em(t.x), em(t.y));
}
function Ey(t, r, i) {
  return t === "position" || (t === "preserve-aspect" && !lk(Wh(r), Wh(i), 0.2));
}
function zk(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const Bk = by({
    attachResizeListener: (t, r) => $i(t, "resize", r),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
      y: document.documentElement.scrollTop || document.body?.scrollTop || 0,
    }),
    checkIsScrollRoot: () => !0,
  }),
  iu = { current: void 0 },
  Ty = by({
    measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
    defaultParent: () => {
      if (!iu.current) {
        const t = new Bk({});
        (t.mount(window), t.setOptions({ layoutScroll: !0 }), (iu.current = t));
      }
      return iu.current;
    },
    resetTransform: (t, r) => {
      t.style.transform = r !== void 0 ? r : "none";
    },
    checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed",
  }),
  Py = k.createContext({ transformPagePoint: (t) => t, isStatic: !1, reducedMotion: "never" });
function Wk(t = !0) {
  const r = k.useContext(fc);
  if (r === null) return [!0, null];
  const { isPresent: i, onExitComplete: s, register: l } = r,
    c = k.useId();
  k.useEffect(() => {
    if (t) return l(c);
  }, [t]);
  const d = k.useCallback(() => t && s && s(c), [c, s, t]);
  return !i && s ? [!1, d] : [!0];
}
const Ny = k.createContext({ strict: !1 }),
  tm = {
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
let nm = !1;
function Hk() {
  if (nm) return;
  const t = {};
  for (const r in tm) t[r] = { isEnabled: (i) => tm[r].some((s) => !!i[s]) };
  (ry(t), (nm = !0));
}
function jy() {
  return (Hk(), OS());
}
function Uk(t) {
  const r = jy();
  for (const i in t) r[i] = { ...r[i], ...t[i] };
  ry(r);
}
const $k = new Set([
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
function Is(t) {
  return (
    t.startsWith("while") ||
    (t.startsWith("drag") && t !== "draggable") ||
    t.startsWith("layout") ||
    t.startsWith("onTap") ||
    t.startsWith("onPan") ||
    t.startsWith("onLayout") ||
    $k.has(t)
  );
}
let Ay = (t) => !Is(t);
function Gk(t) {
  typeof t == "function" && (Ay = (r) => (r.startsWith("on") ? !Is(r) : t(r)));
}
try {
  Gk(require("@emotion/is-prop-valid").default);
} catch {}
function Yk(t, r, i) {
  const s = {};
  for (const l in t)
    (l === "values" && typeof t.values == "object") ||
      ((Ay(l) ||
        (i === !0 && Is(l)) ||
        (!r && !Is(l)) ||
        (t.draggable && l.startsWith("onDrag"))) &&
        (s[l] = t[l]));
  return s;
}
const $s = k.createContext({});
function Xk(t, r) {
  if (Us(t)) {
    const { initial: i, animate: s } = t;
    return { initial: i === !1 || Ui(i) ? i : void 0, animate: Ui(s) ? s : void 0 };
  }
  return t.inherit !== !1 ? r : {};
}
function Kk(t) {
  const { initial: r, animate: i } = Xk(t, k.useContext($s));
  return k.useMemo(() => ({ initial: r, animate: i }), [rm(r), rm(i)]);
}
function rm(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Vc = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function My(t, r, i) {
  for (const s in r) !it(r[s]) && !cy(s, i) && (t[s] = r[s]);
}
function qk({ transformTemplate: t }, r) {
  return k.useMemo(() => {
    const i = Vc();
    return (Lc(i, r, t), Object.assign({}, i.vars, i.style));
  }, [r]);
}
function Qk(t, r) {
  const i = t.style || {},
    s = {};
  return (My(s, i, t), Object.assign(s, qk(t, r)), s);
}
function Zk(t, r) {
  const i = {},
    s = Qk(t, r);
  return (
    t.drag &&
      t.dragListener !== !1 &&
      ((i.draggable = !1),
      (s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none"),
      (s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`)),
    t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (i.tabIndex = 0),
    (i.style = s),
    i
  );
}
const Ry = () => ({ ...Vc(), attrs: {} });
function Jk(t, r, i, s) {
  const l = k.useMemo(() => {
    const c = Ry();
    return (dy(c, r, py(s), t.transformTemplate, t.style), { ...c.attrs, style: { ...c.style } });
  }, [r]);
  if (t.style) {
    const c = {};
    (My(c, t.style, t), (l.style = { ...c, ...l.style }));
  }
  return l;
}
const eC = [
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
function zc(t) {
  return typeof t != "string" || t.includes("-") ? !1 : !!(eC.indexOf(t) > -1 || /[A-Z]/u.test(t));
}
function tC(t, r, i, { latestValues: s }, l, c = !1, d) {
  const h = ((d ?? zc(t)) ? Jk : Zk)(r, s, l, t),
    m = Yk(r, typeof t == "string", c),
    y = t !== k.Fragment ? { ...m, ...h, ref: i } : {},
    { children: x } = r,
    w = k.useMemo(() => (it(x) ? x.get() : x), [x]);
  return k.createElement(t, { ...y, children: w });
}
function nC({ scrapeMotionValuesFromProps: t, createRenderState: r }, i, s, l) {
  return { latestValues: rC(i, s, l, t), renderState: r() };
}
function rC(t, r, i, s) {
  const l = {},
    c = s(t, {});
  for (const w in c) l[w] = Ts(c[w]);
  let { initial: d, animate: f } = t;
  const h = Us(t),
    m = ty(t);
  r &&
    m &&
    !h &&
    t.inherit !== !1 &&
    (d === void 0 && (d = r.initial), f === void 0 && (f = r.animate));
  let y = i ? i.initial === !1 : !1;
  y = y || d === !1;
  const x = y ? f : d;
  if (x && typeof x != "boolean" && !Hs(x)) {
    const w = Array.isArray(x) ? x : [x];
    for (let P = 0; P < w.length; P++) {
      const A = jc(t, w[P]);
      if (A) {
        const { transitionEnd: b, transition: j, ...O } = A;
        for (const I in O) {
          let F = O[I];
          if (Array.isArray(F)) {
            const W = y ? F.length - 1 : 0;
            F = F[W];
          }
          F !== null && (l[I] = F);
        }
        for (const I in b) l[I] = b[I];
      }
    }
  }
  return l;
}
const Dy = (t) => (r, i) => {
    const s = k.useContext($s),
      l = k.useContext(fc),
      c = () => nC(t, r, s, l);
    return i ? c() : ow(c);
  },
  iC = Dy({ scrapeMotionValuesFromProps: Ic, createRenderState: Vc }),
  oC = Dy({ scrapeMotionValuesFromProps: hy, createRenderState: Ry }),
  sC = Symbol.for("motionComponentSymbol");
function aC(t, r, i) {
  const s = k.useRef(i);
  k.useInsertionEffect(() => {
    s.current = i;
  });
  const l = k.useRef(null);
  return k.useCallback(
    (c) => {
      c && t.onMount?.(c);
      const d = s.current;
      if (typeof d == "function")
        if (c) {
          const f = d(c);
          typeof f == "function" && (l.current = f);
        } else l.current ? (l.current(), (l.current = null)) : d(c);
      else d && (d.current = c);
      r && (c ? r.mount(c) : r.unmount());
    },
    [r]
  );
}
const Oy = k.createContext({});
function Fr(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function lC(t, r, i, s, l, c) {
  const { visualElement: d } = k.useContext($s),
    f = k.useContext(Ny),
    h = k.useContext(fc),
    m = k.useContext(Py),
    y = m.reducedMotion,
    x = m.skipAnimations,
    w = k.useRef(null),
    P = k.useRef(!1);
  ((s = s || f.renderer),
    !w.current &&
      s &&
      ((w.current = s(t, {
        visualState: r,
        parent: d,
        props: i,
        presenceContext: h,
        blockInitialAnimation: h ? h.initial === !1 : !1,
        reducedMotionConfig: y,
        skipAnimations: x,
        isSVG: c,
      })),
      P.current && w.current && (w.current.manuallyAnimateOnMount = !0)));
  const A = w.current,
    b = k.useContext(Oy);
  A && !A.projection && l && (A.type === "html" || A.type === "svg") && uC(w.current, i, l, b);
  const j = k.useRef(!1);
  k.useInsertionEffect(() => {
    A && j.current && A.update(i, h);
  });
  const O = i[Wg],
    I = k.useRef(
      !!O &&
        typeof window < "u" &&
        !window.MotionHandoffIsComplete?.(O) &&
        window.MotionHasOptimisedAnimation?.(O)
    );
  return (
    aw(() => {
      ((P.current = !0),
        A &&
          ((j.current = !0),
          (window.MotionIsMounted = !0),
          A.updateFeatures(),
          A.scheduleRenderMicrotask(),
          I.current && A.animationState && A.animationState.animateChanges()));
    }),
    k.useEffect(() => {
      A &&
        (!I.current && A.animationState && A.animationState.animateChanges(),
        I.current &&
          (queueMicrotask(() => {
            window.MotionHandoffMarkAsComplete?.(O);
          }),
          (I.current = !1)),
        (A.enteringChildren = void 0));
    }),
    A
  );
}
function uC(t, r, i, s) {
  const {
    layoutId: l,
    layout: c,
    drag: d,
    dragConstraints: f,
    layoutScroll: h,
    layoutRoot: m,
    layoutCrossfade: y,
  } = r;
  ((t.projection = new i(t.latestValues, r["data-framer-portal-id"] ? void 0 : Fy(t.parent))),
    t.projection.setOptions({
      layoutId: l,
      layout: c,
      alwaysMeasureLayout: !!d || (f && Fr(f)),
      visualElement: t,
      animationType: typeof c == "string" ? c : "both",
      initialPromotionConfig: s,
      crossfade: y,
      layoutScroll: h,
      layoutRoot: m,
    }));
}
function Fy(t) {
  if (t) return t.options.allowProjection !== !1 ? t.projection : Fy(t.parent);
}
function ou(t, { forwardMotionProps: r = !1, type: i } = {}, s, l) {
  s && Uk(s);
  const c = i ? i === "svg" : zc(t),
    d = c ? oC : iC;
  function f(m, y) {
    let x;
    const w = { ...k.useContext(Py), ...m, layoutId: cC(m) },
      { isStatic: P } = w,
      A = Kk(m),
      b = d(m, P);
    if (!P && typeof window < "u") {
      dC();
      const j = fC(w);
      ((x = j.MeasureLayout), (A.visualElement = lC(t, b, w, l, j.ProjectionNode, c)));
    }
    return v.jsxs($s.Provider, {
      value: A,
      children: [
        x && A.visualElement ? v.jsx(x, { visualElement: A.visualElement, ...w }) : null,
        tC(t, m, aC(b, A.visualElement, y), b, P, r, c),
      ],
    });
  }
  f.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const h = k.forwardRef(f);
  return ((h[sC] = t), h);
}
function cC({ layoutId: t }) {
  const r = k.useContext(eg).id;
  return r && t !== void 0 ? r + "-" + t : t;
}
function dC(t, r) {
  k.useContext(Ny).strict;
}
function fC(t) {
  const r = jy(),
    { drag: i, layout: s } = r;
  if (!i && !s) return {};
  const l = { ...i, ...s };
  return {
    MeasureLayout: i?.isEnabled(t) || s?.isEnabled(t) ? l.MeasureLayout : void 0,
    ProjectionNode: l.ProjectionNode,
  };
}
function pC(t, r) {
  if (typeof Proxy > "u") return ou;
  const i = new Map(),
    s = (c, d) => ou(c, d, t, r),
    l = (c, d) => s(c, d);
  return new Proxy(l, {
    get: (c, d) => (d === "create" ? s : (i.has(d) || i.set(d, ou(d, void 0, t, r)), i.get(d))),
  });
}
const hC = (t, r) =>
  (r.isSVG ?? zc(t)) ? new QS(r) : new $S(r, { allowProjection: t !== k.Fragment });
class mC extends Fn {
  constructor(r) {
    (super(r), r.animationState || (r.animationState = nk(r)));
  }
  updateAnimationControlsSubscription() {
    const { animate: r } = this.node.getProps();
    Hs(r) && (this.unmountControls = r.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: r } = this.node.getProps(),
      { animate: i } = this.node.prevProps || {};
    r !== i && this.updateAnimationControlsSubscription();
  }
  unmount() {
    (this.node.animationState.reset(), this.unmountControls?.());
  }
}
let gC = 0;
class yC extends Fn {
  constructor() {
    (super(...arguments), (this.id = gC++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: r, onExitComplete: i } = this.node.presenceContext,
      { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || r === s) return;
    const l = this.node.animationState.setActive("exit", !r);
    i &&
      !r &&
      l.then(() => {
        i(this.id);
      });
  }
  mount() {
    const { register: r, onExitComplete: i } = this.node.presenceContext || {};
    (i && i(this.id), r && (this.unmount = r(this.id)));
  }
  unmount() {}
}
const vC = { animation: { Feature: mC }, exit: { Feature: yC } };
function Zi(t) {
  return { point: { x: t.pageX, y: t.pageY } };
}
const xC = (t) => (r) => Dc(r) && t(r, Zi(r));
function zi(t, r, i, s) {
  return $i(t, r, xC(i), s);
}
const _y = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
  im = (t, r) => Math.abs(t - r);
function wC(t, r) {
  const i = im(t.x, r.x),
    s = im(t.y, r.y);
  return Math.sqrt(i ** 2 + s ** 2);
}
const om = new Set(["auto", "scroll"]);
class Ly {
  constructor(
    r,
    i,
    {
      transformPagePoint: s,
      contextWindow: l = window,
      dragSnapToOrigin: c = !1,
      distanceThreshold: d = 3,
      element: f,
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
      (this.onElementScroll = (P) => {
        this.handleScroll(P.target);
      }),
      (this.onWindowScroll = () => {
        this.handleScroll(window);
      }),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const P = au(this.lastMoveEventInfo, this.history),
          A = this.startEvent !== null,
          b = wC(P.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!A && !b) return;
        const { point: j } = P,
          { timestamp: O } = Ze;
        this.history.push({ ...j, timestamp: O });
        const { onStart: I, onMove: F } = this.handlers;
        (A || (I && I(this.lastMoveEvent, P), (this.startEvent = this.lastMoveEvent)),
          F && F(this.lastMoveEvent, P));
      }),
      (this.handlePointerMove = (P, A) => {
        ((this.lastMoveEvent = P),
          (this.lastMoveEventInfo = su(A, this.transformPagePoint)),
          be.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (P, A) => {
        this.end();
        const { onEnd: b, onSessionEnd: j, resumeAnimation: O } = this.handlers;
        if (
          ((this.dragSnapToOrigin || !this.startEvent) && O && O(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const I = au(
          P.type === "pointercancel" ? this.lastMoveEventInfo : su(A, this.transformPagePoint),
          this.history
        );
        (this.startEvent && b && b(P, I), j && j(P, I));
      }),
      !Dc(r))
    )
      return;
    ((this.dragSnapToOrigin = c),
      (this.handlers = i),
      (this.transformPagePoint = s),
      (this.distanceThreshold = d),
      (this.contextWindow = l || window));
    const h = Zi(r),
      m = su(h, this.transformPagePoint),
      { point: y } = m,
      { timestamp: x } = Ze;
    this.history = [{ ...y, timestamp: x }];
    const { onSessionStart: w } = i;
    (w && w(r, au(m, this.history)),
      (this.removeListeners = Ki(
        zi(this.contextWindow, "pointermove", this.handlePointerMove),
        zi(this.contextWindow, "pointerup", this.handlePointerUp),
        zi(this.contextWindow, "pointercancel", this.handlePointerUp)
      )),
      f && this.startScrollTracking(f));
  }
  startScrollTracking(r) {
    let i = r.parentElement;
    for (; i; ) {
      const s = getComputedStyle(i);
      ((om.has(s.overflowX) || om.has(s.overflowY)) &&
        this.scrollPositions.set(i, { x: i.scrollLeft, y: i.scrollTop }),
        (i = i.parentElement));
    }
    (this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }),
      window.addEventListener("scroll", this.onElementScroll, { capture: !0 }),
      window.addEventListener("scroll", this.onWindowScroll),
      (this.removeScrollListeners = () => {
        (window.removeEventListener("scroll", this.onElementScroll, { capture: !0 }),
          window.removeEventListener("scroll", this.onWindowScroll));
      }));
  }
  handleScroll(r) {
    const i = this.scrollPositions.get(r);
    if (!i) return;
    const s = r === window,
      l = s ? { x: window.scrollX, y: window.scrollY } : { x: r.scrollLeft, y: r.scrollTop },
      c = { x: l.x - i.x, y: l.y - i.y };
    (c.x === 0 && c.y === 0) ||
      (s
        ? this.lastMoveEventInfo &&
          ((this.lastMoveEventInfo.point.x += c.x), (this.lastMoveEventInfo.point.y += c.y))
        : this.history.length > 0 && ((this.history[0].x -= c.x), (this.history[0].y -= c.y)),
      this.scrollPositions.set(r, l),
      be.update(this.updatePoint, !0));
  }
  updateHandlers(r) {
    this.handlers = r;
  }
  end() {
    (this.removeListeners && this.removeListeners(),
      this.removeScrollListeners && this.removeScrollListeners(),
      this.scrollPositions.clear(),
      On(this.updatePoint));
  }
}
function su(t, r) {
  return r ? { point: r(t.point) } : t;
}
function sm(t, r) {
  return { x: t.x - r.x, y: t.y - r.y };
}
function au({ point: t }, r) {
  return { point: t, delta: sm(t, Iy(r)), offset: sm(t, SC(r)), velocity: kC(r, 0.1) };
}
function SC(t) {
  return t[0];
}
function Iy(t) {
  return t[t.length - 1];
}
function kC(t, r) {
  if (t.length < 2) return { x: 0, y: 0 };
  let i = t.length - 1,
    s = null;
  const l = Iy(t);
  for (; i >= 0 && ((s = t[i]), !(l.timestamp - s.timestamp > _t(r))); ) i--;
  if (!s) return { x: 0, y: 0 };
  s === t[0] && t.length > 2 && l.timestamp - s.timestamp > _t(r) * 2 && (s = t[1]);
  const c = Et(l.timestamp - s.timestamp);
  if (c === 0) return { x: 0, y: 0 };
  const d = { x: (l.x - s.x) / c, y: (l.y - s.y) / c };
  return (d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d);
}
function CC(t, { min: r, max: i }, s) {
  return (
    r !== void 0 && t < r
      ? (t = s ? Me(r, t, s.min) : Math.max(t, r))
      : i !== void 0 && t > i && (t = s ? Me(i, t, s.max) : Math.min(t, i)),
    t
  );
}
function am(t, r, i) {
  return {
    min: r !== void 0 ? t.min + r : void 0,
    max: i !== void 0 ? t.max + i - (t.max - t.min) : void 0,
  };
}
function bC(t, { top: r, left: i, bottom: s, right: l }) {
  return { x: am(t.x, i, l), y: am(t.y, r, s) };
}
function lm(t, r) {
  let i = r.min - t.min,
    s = r.max - t.max;
  return (r.max - r.min < t.max - t.min && ([i, s] = [s, i]), { min: i, max: s });
}
function EC(t, r) {
  return { x: lm(t.x, r.x), y: lm(t.y, r.y) };
}
function TC(t, r) {
  let i = 0.5;
  const s = lt(t),
    l = lt(r);
  return (
    l > s ? (i = Bi(r.min, r.max - s, t.min)) : s > l && (i = Bi(t.min, t.max - l, r.min)),
    Yt(0, 1, i)
  );
}
function PC(t, r) {
  const i = {};
  return (
    r.min !== void 0 && (i.min = r.min - t.min),
    r.max !== void 0 && (i.max = r.max - t.min),
    i
  );
}
const oc = 0.35;
function NC(t = oc) {
  return (
    t === !1 ? (t = 0) : t === !0 && (t = oc),
    { x: um(t, "left", "right"), y: um(t, "top", "bottom") }
  );
}
function um(t, r, i) {
  return { min: cm(t, r), max: cm(t, i) };
}
function cm(t, r) {
  return typeof t == "number" ? t : t[r] || 0;
}
const jC = new WeakMap();
class AC {
  constructor(r) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = $e()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = r));
  }
  start(r, { snapToCursor: i = !1, distanceThreshold: s } = {}) {
    const { presenceContext: l } = this.visualElement;
    if (l && l.isPresent === !1) return;
    const c = (x) => {
        (i && this.snapToCursor(Zi(x).point), this.stopAnimation());
      },
      d = (x, w) => {
        const { drag: P, dragPropagation: A, onDragStart: b } = this.getProps();
        if (
          P &&
          !A &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = cS(P)),
          !this.openDragLock)
        )
          return;
        ((this.latestPointerEvent = x),
          (this.latestPanInfo = w),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          Ut((O) => {
            let I = this.getAxisMotionValue(O).get() || 0;
            if (Gt.test(I)) {
              const { projection: F } = this.visualElement;
              if (F && F.layout) {
                const W = F.layout.layoutBox[O];
                W && (I = lt(W) * (parseFloat(I) / 100));
              }
            }
            this.originPoint[O] = I;
          }),
          b && be.update(() => b(x, w), !1, !0),
          Qu(this.visualElement, "transform"));
        const { animationState: j } = this.visualElement;
        j && j.setActive("whileDrag", !0);
      },
      f = (x, w) => {
        ((this.latestPointerEvent = x), (this.latestPanInfo = w));
        const {
          dragPropagation: P,
          dragDirectionLock: A,
          onDirectionLock: b,
          onDrag: j,
        } = this.getProps();
        if (!P && !this.openDragLock) return;
        const { offset: O } = w;
        if (A && this.currentDirection === null) {
          ((this.currentDirection = RC(O)),
            this.currentDirection !== null && b && b(this.currentDirection));
          return;
        }
        (this.updateAxis("x", w.point, O),
          this.updateAxis("y", w.point, O),
          this.visualElement.render(),
          j && be.update(() => j(x, w), !1, !0));
      },
      h = (x, w) => {
        ((this.latestPointerEvent = x),
          (this.latestPanInfo = w),
          this.stop(x, w),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null));
      },
      m = () => {
        const { dragSnapToOrigin: x } = this.getProps();
        (x || this.constraints) && this.startAnimation({ x: 0, y: 0 });
      },
      { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new Ly(
      r,
      { onSessionStart: c, onStart: d, onMove: f, onSessionEnd: h, resumeAnimation: m },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: y,
        distanceThreshold: s,
        contextWindow: _y(this.visualElement),
        element: this.visualElement.current,
      }
    );
  }
  stop(r, i) {
    const s = r || this.latestPointerEvent,
      l = i || this.latestPanInfo,
      c = this.isDragging;
    if ((this.cancel(), !c || !l || !s)) return;
    const { velocity: d } = l;
    this.startAnimation(d);
    const { onDragEnd: f } = this.getProps();
    f && be.postRender(() => f(s, l));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: r, animationState: i } = this.visualElement;
    (r && (r.isAnimationBlocked = !1), this.endPanSession());
    const { dragPropagation: s } = this.getProps();
    (!s && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
      i && i.setActive("whileDrag", !1));
  }
  endPanSession() {
    (this.panSession && this.panSession.end(), (this.panSession = void 0));
  }
  updateAxis(r, i, s) {
    const { drag: l } = this.getProps();
    if (!s || !fs(r, l, this.currentDirection)) return;
    const c = this.getAxisMotionValue(r);
    let d = this.originPoint[r] + s[r];
    (this.constraints && this.constraints[r] && (d = CC(d, this.constraints[r], this.elastic[r])),
      c.set(d));
  }
  resolveConstraints() {
    const { dragConstraints: r, dragElastic: i } = this.getProps(),
      s =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : this.visualElement.projection?.layout,
      l = this.constraints;
    (r && Fr(r)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : r && s
        ? (this.constraints = bC(s.layoutBox, r))
        : (this.constraints = !1),
      (this.elastic = NC(i)),
      l !== this.constraints &&
        !Fr(r) &&
        s &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        Ut((c) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(c) &&
            (this.constraints[c] = PC(s.layoutBox[c], this.constraints[c]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: r, onMeasureDragConstraints: i } = this.getProps();
    if (!r || !Fr(r)) return !1;
    const s = r.current,
      { projection: l } = this.visualElement;
    if (!l || !l.layout) return !1;
    const c = VS(s, l.root, this.visualElement.getTransformPagePoint());
    let d = EC(l.layout.layoutBox, c);
    if (i) {
      const f = i(_S(d));
      ((this.hasMutatedConstraints = !!f), f && (d = oy(f)));
    }
    return d;
  }
  startAnimation(r) {
    const {
        drag: i,
        dragMomentum: s,
        dragElastic: l,
        dragTransition: c,
        dragSnapToOrigin: d,
        onDragTransitionEnd: f,
      } = this.getProps(),
      h = this.constraints || {},
      m = Ut((y) => {
        if (!fs(y, i, this.currentDirection)) return;
        let x = (h && h[y]) || {};
        d && (x = { min: 0, max: 0 });
        const w = l ? 200 : 1e6,
          P = l ? 40 : 1e7,
          A = {
            type: "inertia",
            velocity: s ? r[y] : 0,
            bounceStiffness: w,
            bounceDamping: P,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...c,
            ...x,
          };
        return this.startAxisValueAnimation(y, A);
      });
    return Promise.all(m).then(f);
  }
  startAxisValueAnimation(r, i) {
    const s = this.getAxisMotionValue(r);
    return (Qu(this.visualElement, r), s.start(Nc(r, s, 0, i, this.visualElement, !1)));
  }
  stopAnimation() {
    Ut((r) => this.getAxisMotionValue(r).stop());
  }
  getAxisMotionValue(r) {
    const i = `_drag${r.toUpperCase()}`,
      s = this.visualElement.getProps(),
      l = s[i];
    return l || this.visualElement.getValue(r, (s.initial ? s.initial[r] : void 0) || 0);
  }
  snapToCursor(r) {
    Ut((i) => {
      const { drag: s } = this.getProps();
      if (!fs(i, s, this.currentDirection)) return;
      const { projection: l } = this.visualElement,
        c = this.getAxisMotionValue(i);
      if (l && l.layout) {
        const { min: d, max: f } = l.layout.layoutBox[i],
          h = c.get() || 0;
        c.set(r[i] - Me(d, f, 0.5) + h);
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: r, dragConstraints: i } = this.getProps(),
      { projection: s } = this.visualElement;
    if (!Fr(i) || !s || !this.constraints) return;
    this.stopAnimation();
    const l = { x: 0, y: 0 };
    Ut((d) => {
      const f = this.getAxisMotionValue(d);
      if (f && this.constraints !== !1) {
        const h = f.get();
        l[d] = TC({ min: h, max: h }, this.constraints[d]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = c ? c({}, "") : "none"),
      s.root && s.root.updateScroll(),
      s.updateLayout(),
      (this.constraints = !1),
      this.resolveConstraints(),
      Ut((d) => {
        if (!fs(d, r, null)) return;
        const f = this.getAxisMotionValue(d),
          { min: h, max: m } = this.constraints[d];
        f.set(Me(h, m, l[d]));
      }),
      this.visualElement.render());
  }
  addListeners() {
    if (!this.visualElement.current) return;
    jC.set(this.visualElement, this);
    const r = this.visualElement.current,
      i = zi(r, "pointerdown", (m) => {
        const { drag: y, dragListener: x = !0 } = this.getProps(),
          w = m.target,
          P = w !== r && gS(w);
        y && x && !P && this.start(m);
      });
    let s;
    const l = () => {
        const { dragConstraints: m } = this.getProps();
        Fr(m) &&
          m.current &&
          ((this.constraints = this.resolveRefConstraints()),
          s || (s = MC(r, m.current, () => this.scalePositionWithinConstraints())));
      },
      { projection: c } = this.visualElement,
      d = c.addEventListener("measure", l);
    (c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), be.read(l));
    const f = $i(window, "resize", () => this.scalePositionWithinConstraints()),
      h = c.addEventListener("didUpdate", ({ delta: m, hasLayoutChanged: y }) => {
        this.isDragging &&
          y &&
          (Ut((x) => {
            const w = this.getAxisMotionValue(x);
            w && ((this.originPoint[x] += m[x].translate), w.set(w.get() + m[x].translate));
          }),
          this.visualElement.render());
      });
    return () => {
      (f(), i(), d(), h && h(), s && s());
    };
  }
  getProps() {
    const r = this.visualElement.getProps(),
      {
        drag: i = !1,
        dragDirectionLock: s = !1,
        dragPropagation: l = !1,
        dragConstraints: c = !1,
        dragElastic: d = oc,
        dragMomentum: f = !0,
      } = r;
    return {
      ...r,
      drag: i,
      dragDirectionLock: s,
      dragPropagation: l,
      dragConstraints: c,
      dragElastic: d,
      dragMomentum: f,
    };
  }
}
function dm(t) {
  let r = !0;
  return () => {
    if (r) {
      r = !1;
      return;
    }
    t();
  };
}
function MC(t, r, i) {
  const s = xh(t, dm(i)),
    l = xh(r, dm(i));
  return () => {
    (s(), l());
  };
}
function fs(t, r, i) {
  return (r === !0 || r === t) && (i === null || i === t);
}
function RC(t, r = 10) {
  let i = null;
  return (Math.abs(t.y) > r ? (i = "y") : Math.abs(t.x) > r && (i = "x"), i);
}
class DC extends Fn {
  constructor(r) {
    (super(r),
      (this.removeGroupControls = Tt),
      (this.removeListeners = Tt),
      (this.controls = new AC(r)));
  }
  mount() {
    const { dragControls: r } = this.node.getProps();
    (r && (this.removeGroupControls = r.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Tt));
  }
  update() {
    const { dragControls: r } = this.node.getProps(),
      { dragControls: i } = this.node.prevProps || {};
    r !== i &&
      (this.removeGroupControls(), r && (this.removeGroupControls = r.subscribe(this.controls)));
  }
  unmount() {
    (this.removeGroupControls(),
      this.removeListeners(),
      this.controls.isDragging || this.controls.endPanSession());
  }
}
const lu = (t) => (r, i) => {
  t && be.update(() => t(r, i), !1, !0);
};
class OC extends Fn {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = Tt));
  }
  onPointerDown(r) {
    this.session = new Ly(r, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: _y(this.node),
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: r, onPanStart: i, onPan: s, onPanEnd: l } = this.node.getProps();
    return {
      onSessionStart: lu(r),
      onStart: lu(i),
      onMove: lu(s),
      onEnd: (c, d) => {
        (delete this.session, l && be.postRender(() => l(c, d)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = zi(this.node.current, "pointerdown", (r) =>
      this.onPointerDown(r)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
let uu = !1;
class FC extends k.Component {
  componentDidMount() {
    const { visualElement: r, layoutGroup: i, switchLayoutGroup: s, layoutId: l } = this.props,
      { projection: c } = r;
    (c &&
      (i.group && i.group.add(c),
      s && s.register && l && s.register(c),
      uu && c.root.didUpdate(),
      c.addEventListener("animationComplete", () => {
        this.safeToRemove();
      }),
      c.setOptions({
        ...c.options,
        layoutDependency: this.props.layoutDependency,
        onExitComplete: () => this.safeToRemove(),
      })),
      (Ps.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(r) {
    const { layoutDependency: i, visualElement: s, drag: l, isPresent: c } = this.props,
      { projection: d } = s;
    return (
      d &&
        ((d.isPresent = c),
        r.layoutDependency !== i && d.setOptions({ ...d.options, layoutDependency: i }),
        (uu = !0),
        l || r.layoutDependency !== i || i === void 0 || r.isPresent !== c
          ? d.willUpdate()
          : this.safeToRemove(),
        r.isPresent !== c &&
          (c
            ? d.promote()
            : d.relegate() ||
              be.postRender(() => {
                const f = d.getStack();
                (!f || !f.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: r } = this.props.visualElement;
    r &&
      (r.root.didUpdate(),
      Rc.postRender(() => {
        !r.currentAnimation && r.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const { visualElement: r, layoutGroup: i, switchLayoutGroup: s } = this.props,
      { projection: l } = r;
    ((uu = !0),
      l &&
        (l.scheduleCheckAfterUnmount(),
        i && i.group && i.group.remove(l),
        s && s.deregister && s.deregister(l)));
  }
  safeToRemove() {
    const { safeToRemove: r } = this.props;
    r && r();
  }
  render() {
    return null;
  }
}
function Vy(t) {
  const [r, i] = Wk(),
    s = k.useContext(eg);
  return v.jsx(FC, {
    ...t,
    layoutGroup: s,
    switchLayoutGroup: k.useContext(Oy),
    isPresent: r,
    safeToRemove: i,
  });
}
const _C = { pan: { Feature: OC }, drag: { Feature: DC, ProjectionNode: Ty, MeasureLayout: Vy } };
function fm(t, r, i) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", i === "Start");
  const l = "onHover" + i,
    c = s[l];
  c && be.postRender(() => c(r, Zi(r)));
}
class LC extends Fn {
  mount() {
    const { current: r } = this.node;
    r &&
      (this.unmount = fS(r, (i, s) => (fm(this.node, s, "Start"), (l) => fm(this.node, l, "End"))));
  }
  unmount() {}
}
class IC extends Fn {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let r = !1;
    try {
      r = this.node.current.matches(":focus-visible");
    } catch {
      r = !0;
    }
    !r ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0), (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1), (this.isActive = !1));
  }
  mount() {
    this.unmount = Ki(
      $i(this.node.current, "focus", () => this.onFocus()),
      $i(this.node.current, "blur", () => this.onBlur())
    );
  }
  unmount() {}
}
function pm(t, r, i) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", i === "Start");
  const l = "onTap" + (i === "End" ? "" : i),
    c = s[l];
  c && be.postRender(() => c(r, Zi(r)));
}
class VC extends Fn {
  mount() {
    const { current: r } = this.node;
    if (!r) return;
    const { globalTapTarget: i, propagate: s } = this.node.props;
    this.unmount = vS(
      r,
      (l, c) => (
        pm(this.node, c, "Start"),
        (d, { success: f }) => pm(this.node, d, f ? "End" : "Cancel")
      ),
      { useGlobalTarget: i, stopPropagation: s?.tap === !1 }
    );
  }
  unmount() {}
}
const sc = new WeakMap(),
  cu = new WeakMap(),
  zC = (t) => {
    const r = sc.get(t.target);
    r && r(t);
  },
  BC = (t) => {
    t.forEach(zC);
  };
function WC({ root: t, ...r }) {
  const i = t || document;
  cu.has(i) || cu.set(i, {});
  const s = cu.get(i),
    l = JSON.stringify(r);
  return (s[l] || (s[l] = new IntersectionObserver(BC, { root: t, ...r })), s[l]);
}
function HC(t, r, i) {
  const s = WC(r);
  return (
    sc.set(t, i),
    s.observe(t),
    () => {
      (sc.delete(t), s.unobserve(t));
    }
  );
}
const UC = { some: 0, all: 1 };
class $C extends Fn {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: r = {} } = this.node.getProps(),
      { root: i, margin: s, amount: l = "some", once: c } = r,
      d = {
        root: i ? i.current : void 0,
        rootMargin: s,
        threshold: typeof l == "number" ? l : UC[l],
      },
      f = (h) => {
        const { isIntersecting: m } = h;
        if (this.isInView === m || ((this.isInView = m), c && !m && this.hasEnteredView)) return;
        (m && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive("whileInView", m));
        const { onViewportEnter: y, onViewportLeave: x } = this.node.getProps(),
          w = m ? y : x;
        w && w(h);
      };
    return HC(this.node.current, d, f);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: r, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(GC(r, i)) && this.startObserver();
  }
  unmount() {}
}
function GC({ viewport: t = {} }, { viewport: r = {} } = {}) {
  return (i) => t[i] !== r[i];
}
const YC = {
    inView: { Feature: $C },
    tap: { Feature: VC },
    focus: { Feature: IC },
    hover: { Feature: LC },
  },
  XC = { layout: { ProjectionNode: Ty, MeasureLayout: Vy } },
  KC = { ...vC, ...YC, ..._C, ...XC },
  re = pC(KC, hC),
  zy = "/assets/a79873ff7b54a9a37128bda14561149e5eeb12b3-CNlqmVld.png";
function qC() {
  const [t, r] = k.useState(!1);
  k.useEffect(() => {
    const s = () => {
      r(window.scrollY > 20);
    };
    return (window.addEventListener("scroll", s), () => window.removeEventListener("scroll", s));
  }, []);
  const i = ["Home", "Ecosystem", "Services", "Portfolio", "About", "Contact"];
  return v.jsx(re.header, {
    initial: { y: -100 },
    animate: { y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${t ? "liquid-glass-card shadow-2xl edge-glow-hover" : "liquid-glass border-b border-white/10"}`,
    children: v.jsx("div", {
      className: "max-w-7xl mx-auto px-6 lg:px-8 py-5 relative z-10",
      children: v.jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          v.jsx(re.a, {
            href: "#home",
            className: "flex items-center cursor-hover relative z-10",
            whileHover: { scale: 1.05 },
            transition: { duration: 0.3, type: "spring", stiffness: 400 },
            children: v.jsx("img", { src: zy, alt: "Cirqle Design", className: "h-10 w-auto" }),
          }),
          v.jsx("nav", {
            className: "hidden md:flex items-center gap-10 relative z-10",
            children: i.map((s, l) =>
              v.jsxs(
                re.a,
                {
                  href: `#${s.toLowerCase()}`,
                  className:
                    "relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors group cursor-hover",
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.4, delay: l * 0.1 },
                  whileHover: { y: -2 },
                  children: [
                    s,
                    v.jsx(re.span, {
                      className:
                        "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] origin-left rounded-full",
                      initial: { scaleX: 0 },
                      whileHover: { scaleX: 1 },
                      transition: { duration: 0.4, ease: "easeOut" },
                    }),
                  ],
                },
                s
              )
            ),
          }),
        ],
      }),
    }),
  });
}
function hm(t, r) {
  if (typeof t == "function") return t(r);
  t != null && (t.current = r);
}
function Gs(...t) {
  return (r) => {
    let i = !1;
    const s = t.map((l) => {
      const c = hm(l, r);
      return (!i && typeof c == "function" && (i = !0), c);
    });
    if (i)
      return () => {
        for (let l = 0; l < s.length; l++) {
          const c = s[l];
          typeof c == "function" ? c() : hm(t[l], null);
        }
      };
  };
}
function ir(...t) {
  return k.useCallback(Gs(...t), t);
}
var QC = Symbol.for("react.lazy"),
  Vs = dc[" use ".trim().toString()];
function ZC(t) {
  return typeof t == "object" && t !== null && "then" in t;
}
function By(t) {
  return (
    t != null &&
    typeof t == "object" &&
    "$$typeof" in t &&
    t.$$typeof === QC &&
    "_payload" in t &&
    ZC(t._payload)
  );
}
function JC(t) {
  const r = tb(t),
    i = k.forwardRef((s, l) => {
      let { children: c, ...d } = s;
      By(c) && typeof Vs == "function" && (c = Vs(c._payload));
      const f = k.Children.toArray(c),
        h = f.find(rb);
      if (h) {
        const m = h.props.children,
          y = f.map((x) =>
            x === h
              ? k.Children.count(m) > 1
                ? k.Children.only(null)
                : k.isValidElement(m)
                  ? m.props.children
                  : null
              : x
          );
        return v.jsx(r, {
          ...d,
          ref: l,
          children: k.isValidElement(m) ? k.cloneElement(m, void 0, y) : null,
        });
      }
      return v.jsx(r, { ...d, ref: l, children: c });
    });
  return ((i.displayName = `${t}.Slot`), i);
}
var eb = JC("Slot");
function tb(t) {
  const r = k.forwardRef((i, s) => {
    let { children: l, ...c } = i;
    if ((By(l) && typeof Vs == "function" && (l = Vs(l._payload)), k.isValidElement(l))) {
      const d = ob(l),
        f = ib(c, l.props);
      return (l.type !== k.Fragment && (f.ref = s ? Gs(s, d) : d), k.cloneElement(l, f));
    }
    return k.Children.count(l) > 1 ? k.Children.only(null) : null;
  });
  return ((r.displayName = `${t}.SlotClone`), r);
}
var nb = Symbol("radix.slottable");
function rb(t) {
  return (
    k.isValidElement(t) &&
    typeof t.type == "function" &&
    "__radixId" in t.type &&
    t.type.__radixId === nb
  );
}
function ib(t, r) {
  const i = { ...r };
  for (const s in r) {
    const l = t[s],
      c = r[s];
    /^on[A-Z]/.test(s)
      ? l && c
        ? (i[s] = (...f) => {
            const h = c(...f);
            return (l(...f), h);
          })
        : l && (i[s] = l)
      : s === "style"
        ? (i[s] = { ...l, ...c })
        : s === "className" && (i[s] = [l, c].filter(Boolean).join(" "));
  }
  return { ...t, ...i };
}
function ob(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    i = r && "isReactWarning" in r && r.isReactWarning;
  return i
    ? t.ref
    : ((r = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (i = r && "isReactWarning" in r && r.isReactWarning),
      i ? t.props.ref : t.props.ref || t.ref);
}
function Wy(t) {
  var r,
    i,
    s = "";
  if (typeof t == "string" || typeof t == "number") s += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var l = t.length;
      for (r = 0; r < l; r++) t[r] && (i = Wy(t[r])) && (s && (s += " "), (s += i));
    } else for (i in t) t[i] && (s && (s += " "), (s += i));
  return s;
}
function Hy() {
  for (var t, r, i = 0, s = "", l = arguments.length; i < l; i++)
    (t = arguments[i]) && (r = Wy(t)) && (s && (s += " "), (s += r));
  return s;
}
const mm = (t) => (typeof t == "boolean" ? `${t}` : t === 0 ? "0" : t),
  gm = Hy,
  sb = (t, r) => (i) => {
    var s;
    if (r?.variants == null) return gm(t, i?.class, i?.className);
    const { variants: l, defaultVariants: c } = r,
      d = Object.keys(l).map((m) => {
        const y = i?.[m],
          x = c?.[m];
        if (y === null) return null;
        const w = mm(y) || mm(x);
        return l[m][w];
      }),
      f =
        i &&
        Object.entries(i).reduce((m, y) => {
          let [x, w] = y;
          return (w === void 0 || (m[x] = w), m);
        }, {}),
      h =
        r == null || (s = r.compoundVariants) === null || s === void 0
          ? void 0
          : s.reduce((m, y) => {
              let { class: x, className: w, ...P } = y;
              return Object.entries(P).every((A) => {
                let [b, j] = A;
                return Array.isArray(j) ? j.includes({ ...c, ...f }[b]) : { ...c, ...f }[b] === j;
              })
                ? [...m, x, w]
                : m;
            }, []);
    return gm(t, d, h, i?.class, i?.className);
  },
  ab = (t, r) => {
    const i = new Array(t.length + r.length);
    for (let s = 0; s < t.length; s++) i[s] = t[s];
    for (let s = 0; s < r.length; s++) i[t.length + s] = r[s];
    return i;
  },
  lb = (t, r) => ({ classGroupId: t, validator: r }),
  Uy = (t = new Map(), r = null, i) => ({ nextPart: t, validators: r, classGroupId: i }),
  zs = "-",
  ym = [],
  ub = "arbitrary..",
  cb = (t) => {
    const r = fb(t),
      { conflictingClassGroups: i, conflictingClassGroupModifiers: s } = t;
    return {
      getClassGroupId: (d) => {
        if (d.startsWith("[") && d.endsWith("]")) return db(d);
        const f = d.split(zs),
          h = f[0] === "" && f.length > 1 ? 1 : 0;
        return $y(f, h, r);
      },
      getConflictingClassGroupIds: (d, f) => {
        if (f) {
          const h = s[d],
            m = i[d];
          return h ? (m ? ab(m, h) : h) : m || ym;
        }
        return i[d] || ym;
      },
    };
  },
  $y = (t, r, i) => {
    if (t.length - r === 0) return i.classGroupId;
    const l = t[r],
      c = i.nextPart.get(l);
    if (c) {
      const m = $y(t, r + 1, c);
      if (m) return m;
    }
    const d = i.validators;
    if (d === null) return;
    const f = r === 0 ? t.join(zs) : t.slice(r).join(zs),
      h = d.length;
    for (let m = 0; m < h; m++) {
      const y = d[m];
      if (y.validator(f)) return y.classGroupId;
    }
  },
  db = (t) =>
    t.slice(1, -1).indexOf(":") === -1
      ? void 0
      : (() => {
          const r = t.slice(1, -1),
            i = r.indexOf(":"),
            s = r.slice(0, i);
          return s ? ub + s : void 0;
        })(),
  fb = (t) => {
    const { theme: r, classGroups: i } = t;
    return pb(i, r);
  },
  pb = (t, r) => {
    const i = Uy();
    for (const s in t) {
      const l = t[s];
      Bc(l, i, s, r);
    }
    return i;
  },
  Bc = (t, r, i, s) => {
    const l = t.length;
    for (let c = 0; c < l; c++) {
      const d = t[c];
      hb(d, r, i, s);
    }
  },
  hb = (t, r, i, s) => {
    if (typeof t == "string") {
      mb(t, r, i);
      return;
    }
    if (typeof t == "function") {
      gb(t, r, i, s);
      return;
    }
    yb(t, r, i, s);
  },
  mb = (t, r, i) => {
    const s = t === "" ? r : Gy(r, t);
    s.classGroupId = i;
  },
  gb = (t, r, i, s) => {
    if (vb(t)) {
      Bc(t(s), r, i, s);
      return;
    }
    (r.validators === null && (r.validators = []), r.validators.push(lb(i, t)));
  },
  yb = (t, r, i, s) => {
    const l = Object.entries(t),
      c = l.length;
    for (let d = 0; d < c; d++) {
      const [f, h] = l[d];
      Bc(h, Gy(r, f), i, s);
    }
  },
  Gy = (t, r) => {
    let i = t;
    const s = r.split(zs),
      l = s.length;
    for (let c = 0; c < l; c++) {
      const d = s[c];
      let f = i.nextPart.get(d);
      (f || ((f = Uy()), i.nextPart.set(d, f)), (i = f));
    }
    return i;
  },
  vb = (t) => "isThemeGetter" in t && t.isThemeGetter === !0,
  xb = (t) => {
    if (t < 1) return { get: () => {}, set: () => {} };
    let r = 0,
      i = Object.create(null),
      s = Object.create(null);
    const l = (c, d) => {
      ((i[c] = d), r++, r > t && ((r = 0), (s = i), (i = Object.create(null))));
    };
    return {
      get(c) {
        let d = i[c];
        if (d !== void 0) return d;
        if ((d = s[c]) !== void 0) return (l(c, d), d);
      },
      set(c, d) {
        c in i ? (i[c] = d) : l(c, d);
      },
    };
  },
  ac = "!",
  vm = ":",
  wb = [],
  xm = (t, r, i, s, l) => ({
    modifiers: t,
    hasImportantModifier: r,
    baseClassName: i,
    maybePostfixModifierPosition: s,
    isExternal: l,
  }),
  Sb = (t) => {
    const { prefix: r, experimentalParseClassName: i } = t;
    let s = (l) => {
      const c = [];
      let d = 0,
        f = 0,
        h = 0,
        m;
      const y = l.length;
      for (let b = 0; b < y; b++) {
        const j = l[b];
        if (d === 0 && f === 0) {
          if (j === vm) {
            (c.push(l.slice(h, b)), (h = b + 1));
            continue;
          }
          if (j === "/") {
            m = b;
            continue;
          }
        }
        j === "[" ? d++ : j === "]" ? d-- : j === "(" ? f++ : j === ")" && f--;
      }
      const x = c.length === 0 ? l : l.slice(h);
      let w = x,
        P = !1;
      x.endsWith(ac)
        ? ((w = x.slice(0, -1)), (P = !0))
        : x.startsWith(ac) && ((w = x.slice(1)), (P = !0));
      const A = m && m > h ? m - h : void 0;
      return xm(c, P, w, A);
    };
    if (r) {
      const l = r + vm,
        c = s;
      s = (d) => (d.startsWith(l) ? c(d.slice(l.length)) : xm(wb, !1, d, void 0, !0));
    }
    if (i) {
      const l = s;
      s = (c) => i({ className: c, parseClassName: l });
    }
    return s;
  },
  kb = (t) => {
    const r = new Map();
    return (
      t.orderSensitiveModifiers.forEach((i, s) => {
        r.set(i, 1e6 + s);
      }),
      (i) => {
        const s = [];
        let l = [];
        for (let c = 0; c < i.length; c++) {
          const d = i[c],
            f = d[0] === "[",
            h = r.has(d);
          f || h ? (l.length > 0 && (l.sort(), s.push(...l), (l = [])), s.push(d)) : l.push(d);
        }
        return (l.length > 0 && (l.sort(), s.push(...l)), s);
      }
    );
  },
  Cb = (t) => ({ cache: xb(t.cacheSize), parseClassName: Sb(t), sortModifiers: kb(t), ...cb(t) }),
  bb = /\s+/,
  Eb = (t, r) => {
    const {
        parseClassName: i,
        getClassGroupId: s,
        getConflictingClassGroupIds: l,
        sortModifiers: c,
      } = r,
      d = [],
      f = t.trim().split(bb);
    let h = "";
    for (let m = f.length - 1; m >= 0; m -= 1) {
      const y = f[m],
        {
          isExternal: x,
          modifiers: w,
          hasImportantModifier: P,
          baseClassName: A,
          maybePostfixModifierPosition: b,
        } = i(y);
      if (x) {
        h = y + (h.length > 0 ? " " + h : h);
        continue;
      }
      let j = !!b,
        O = s(j ? A.substring(0, b) : A);
      if (!O) {
        if (!j) {
          h = y + (h.length > 0 ? " " + h : h);
          continue;
        }
        if (((O = s(A)), !O)) {
          h = y + (h.length > 0 ? " " + h : h);
          continue;
        }
        j = !1;
      }
      const I = w.length === 0 ? "" : w.length === 1 ? w[0] : c(w).join(":"),
        F = P ? I + ac : I,
        W = F + O;
      if (d.indexOf(W) > -1) continue;
      d.push(W);
      const $ = l(O, j);
      for (let ee = 0; ee < $.length; ++ee) {
        const G = $[ee];
        d.push(F + G);
      }
      h = y + (h.length > 0 ? " " + h : h);
    }
    return h;
  },
  Tb = (...t) => {
    let r = 0,
      i,
      s,
      l = "";
    for (; r < t.length; ) (i = t[r++]) && (s = Yy(i)) && (l && (l += " "), (l += s));
    return l;
  },
  Yy = (t) => {
    if (typeof t == "string") return t;
    let r,
      i = "";
    for (let s = 0; s < t.length; s++) t[s] && (r = Yy(t[s])) && (i && (i += " "), (i += r));
    return i;
  },
  Pb = (t, ...r) => {
    let i, s, l, c;
    const d = (h) => {
        const m = r.reduce((y, x) => x(y), t());
        return ((i = Cb(m)), (s = i.cache.get), (l = i.cache.set), (c = f), f(h));
      },
      f = (h) => {
        const m = s(h);
        if (m) return m;
        const y = Eb(h, i);
        return (l(h, y), y);
      };
    return ((c = d), (...h) => c(Tb(...h)));
  },
  Nb = [],
  Ue = (t) => {
    const r = (i) => i[t] || Nb;
    return ((r.isThemeGetter = !0), r);
  },
  Xy = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Ky = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  jb = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Ab = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Mb =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Rb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Db = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Ob =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Nn = (t) => jb.test(t),
  pe = (t) => !!t && !Number.isNaN(Number(t)),
  jn = (t) => !!t && Number.isInteger(Number(t)),
  du = (t) => t.endsWith("%") && pe(t.slice(0, -1)),
  rn = (t) => Ab.test(t),
  qy = () => !0,
  Fb = (t) => Mb.test(t) && !Rb.test(t),
  Wc = () => !1,
  _b = (t) => Db.test(t),
  Lb = (t) => Ob.test(t),
  Ib = (t) => !Q(t) && !J(t),
  Vb = (t) => _n(t, Jy, Wc),
  Q = (t) => Xy.test(t),
  Zn = (t) => _n(t, ev, Fb),
  wm = (t) => _n(t, Yb, pe),
  zb = (t) => _n(t, nv, qy),
  Bb = (t) => _n(t, tv, Wc),
  Sm = (t) => _n(t, Qy, Wc),
  Wb = (t) => _n(t, Zy, Lb),
  ps = (t) => _n(t, rv, _b),
  J = (t) => Ky.test(t),
  Fi = (t) => or(t, ev),
  Hb = (t) => or(t, tv),
  km = (t) => or(t, Qy),
  Ub = (t) => or(t, Jy),
  $b = (t) => or(t, Zy),
  hs = (t) => or(t, rv, !0),
  Gb = (t) => or(t, nv, !0),
  _n = (t, r, i) => {
    const s = Xy.exec(t);
    return s ? (s[1] ? r(s[1]) : i(s[2])) : !1;
  },
  or = (t, r, i = !1) => {
    const s = Ky.exec(t);
    return s ? (s[1] ? r(s[1]) : i) : !1;
  },
  Qy = (t) => t === "position" || t === "percentage",
  Zy = (t) => t === "image" || t === "url",
  Jy = (t) => t === "length" || t === "size" || t === "bg-size",
  ev = (t) => t === "length",
  Yb = (t) => t === "number",
  tv = (t) => t === "family-name",
  nv = (t) => t === "number" || t === "weight",
  rv = (t) => t === "shadow",
  Xb = () => {
    const t = Ue("color"),
      r = Ue("font"),
      i = Ue("text"),
      s = Ue("font-weight"),
      l = Ue("tracking"),
      c = Ue("leading"),
      d = Ue("breakpoint"),
      f = Ue("container"),
      h = Ue("spacing"),
      m = Ue("radius"),
      y = Ue("shadow"),
      x = Ue("inset-shadow"),
      w = Ue("text-shadow"),
      P = Ue("drop-shadow"),
      A = Ue("blur"),
      b = Ue("perspective"),
      j = Ue("aspect"),
      O = Ue("ease"),
      I = Ue("animate"),
      F = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
      W = () => [
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
      $ = () => [...W(), J, Q],
      ee = () => ["auto", "hidden", "clip", "visible", "scroll"],
      G = () => ["auto", "contain", "none"],
      _ = () => [J, Q, h],
      ue = () => [Nn, "full", "auto", ..._()],
      ve = () => [jn, "none", "subgrid", J, Q],
      ze = () => ["auto", { span: ["full", jn, J, Q] }, jn, J, Q],
      Pe = () => [jn, "auto", J, Q],
      Be = () => ["auto", "min", "max", "fr", J, Q],
      Ke = () => [
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
      _e = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"],
      Se = () => ["auto", ..._()],
      xe = () => [
        Nn,
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
        ..._(),
      ],
      H = () => [Nn, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ..._()],
      X = () => [Nn, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ..._()],
      D = () => [t, J, Q],
      T = () => [...W(), km, Sm, { position: [J, Q] }],
      L = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      de = () => ["auto", "cover", "contain", Ub, Vb, { size: [J, Q] }],
      fe = () => [du, Fi, Zn],
      se = () => ["", "none", "full", m, J, Q],
      ae = () => ["", pe, Fi, Zn],
      we = () => ["solid", "dashed", "dotted", "double"],
      ge = () => [
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
      ce = () => [pe, du, km, Sm],
      Je = () => ["", "none", A, J, Q],
      Xt = () => ["none", pe, J, Q],
      Ln = () => ["none", pe, J, Q],
      an = () => [pe, J, Q],
      ln = () => [Nn, "full", ..._()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [rn],
        breakpoint: [rn],
        color: [qy],
        container: [rn],
        "drop-shadow": [rn],
        ease: ["in", "out", "in-out"],
        font: [Ib],
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
        "inset-shadow": [rn],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
        radius: [rn],
        shadow: [rn],
        spacing: ["px", pe],
        text: [rn],
        "text-shadow": [rn],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Nn, Q, J, j] }],
        container: ["container"],
        columns: [{ columns: [pe, Q, J, f] }],
        "break-after": [{ "break-after": F() }],
        "break-before": [{ "break-before": F() }],
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
        "object-position": [{ object: $() }],
        overflow: [{ overflow: ee() }],
        "overflow-x": [{ "overflow-x": ee() }],
        "overflow-y": [{ "overflow-y": ee() }],
        overscroll: [{ overscroll: G() }],
        "overscroll-x": [{ "overscroll-x": G() }],
        "overscroll-y": [{ "overscroll-y": G() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: ue() }],
        "inset-x": [{ "inset-x": ue() }],
        "inset-y": [{ "inset-y": ue() }],
        start: [{ "inset-s": ue(), start: ue() }],
        end: [{ "inset-e": ue(), end: ue() }],
        "inset-bs": [{ "inset-bs": ue() }],
        "inset-be": [{ "inset-be": ue() }],
        top: [{ top: ue() }],
        right: [{ right: ue() }],
        bottom: [{ bottom: ue() }],
        left: [{ left: ue() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [jn, "auto", J, Q] }],
        basis: [{ basis: [Nn, "full", "auto", f, ..._()] }],
        "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [pe, Nn, "auto", "initial", "none", Q] }],
        grow: [{ grow: ["", pe, J, Q] }],
        shrink: [{ shrink: ["", pe, J, Q] }],
        order: [{ order: [jn, "first", "last", "none", J, Q] }],
        "grid-cols": [{ "grid-cols": ve() }],
        "col-start-end": [{ col: ze() }],
        "col-start": [{ "col-start": Pe() }],
        "col-end": [{ "col-end": Pe() }],
        "grid-rows": [{ "grid-rows": ve() }],
        "row-start-end": [{ row: ze() }],
        "row-start": [{ "row-start": Pe() }],
        "row-end": [{ "row-end": Pe() }],
        "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
        "auto-cols": [{ "auto-cols": Be() }],
        "auto-rows": [{ "auto-rows": Be() }],
        gap: [{ gap: _() }],
        "gap-x": [{ "gap-x": _() }],
        "gap-y": [{ "gap-y": _() }],
        "justify-content": [{ justify: [...Ke(), "normal"] }],
        "justify-items": [{ "justify-items": [..._e(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ..._e()] }],
        "align-content": [{ content: ["normal", ...Ke()] }],
        "align-items": [{ items: [..._e(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ..._e(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": Ke() }],
        "place-items": [{ "place-items": [..._e(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ..._e()] }],
        p: [{ p: _() }],
        px: [{ px: _() }],
        py: [{ py: _() }],
        ps: [{ ps: _() }],
        pe: [{ pe: _() }],
        pbs: [{ pbs: _() }],
        pbe: [{ pbe: _() }],
        pt: [{ pt: _() }],
        pr: [{ pr: _() }],
        pb: [{ pb: _() }],
        pl: [{ pl: _() }],
        m: [{ m: Se() }],
        mx: [{ mx: Se() }],
        my: [{ my: Se() }],
        ms: [{ ms: Se() }],
        me: [{ me: Se() }],
        mbs: [{ mbs: Se() }],
        mbe: [{ mbe: Se() }],
        mt: [{ mt: Se() }],
        mr: [{ mr: Se() }],
        mb: [{ mb: Se() }],
        ml: [{ ml: Se() }],
        "space-x": [{ "space-x": _() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": _() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: xe() }],
        "inline-size": [{ inline: ["auto", ...H()] }],
        "min-inline-size": [{ "min-inline": ["auto", ...H()] }],
        "max-inline-size": [{ "max-inline": ["none", ...H()] }],
        "block-size": [{ block: ["auto", ...X()] }],
        "min-block-size": [{ "min-block": ["auto", ...X()] }],
        "max-block-size": [{ "max-block": ["none", ...X()] }],
        w: [{ w: [f, "screen", ...xe()] }],
        "min-w": [{ "min-w": [f, "screen", "none", ...xe()] }],
        "max-w": [{ "max-w": [f, "screen", "none", "prose", { screen: [d] }, ...xe()] }],
        h: [{ h: ["screen", "lh", ...xe()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...xe()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...xe()] }],
        "font-size": [{ text: ["base", i, Fi, Zn] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [s, Gb, zb] }],
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
              du,
              Q,
            ],
          },
        ],
        "font-family": [{ font: [Hb, Bb, r] }],
        "font-features": [{ "font-features": [Q] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [l, J, Q] }],
        "line-clamp": [{ "line-clamp": [pe, "none", J, wm] }],
        leading: [{ leading: [c, ..._()] }],
        "list-image": [{ "list-image": ["none", J, Q] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", J, Q] }],
        "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
        "placeholder-color": [{ placeholder: D() }],
        "text-color": [{ text: D() }],
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        "text-decoration-style": [{ decoration: [...we(), "wavy"] }],
        "text-decoration-thickness": [{ decoration: [pe, "from-font", "auto", J, Zn] }],
        "text-decoration-color": [{ decoration: D() }],
        "underline-offset": [{ "underline-offset": [pe, "auto", J, Q] }],
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: _() }],
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
              J,
              Q,
            ],
          },
        ],
        whitespace: [
          { whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", J, Q] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: T() }],
        "bg-repeat": [{ bg: L() }],
        "bg-size": [{ bg: de() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [{ to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, jn, J, Q],
                radial: ["", J, Q],
                conic: [jn, J, Q],
              },
              $b,
              Wb,
            ],
          },
        ],
        "bg-color": [{ bg: D() }],
        "gradient-from-pos": [{ from: fe() }],
        "gradient-via-pos": [{ via: fe() }],
        "gradient-to-pos": [{ to: fe() }],
        "gradient-from": [{ from: D() }],
        "gradient-via": [{ via: D() }],
        "gradient-to": [{ to: D() }],
        rounded: [{ rounded: se() }],
        "rounded-s": [{ "rounded-s": se() }],
        "rounded-e": [{ "rounded-e": se() }],
        "rounded-t": [{ "rounded-t": se() }],
        "rounded-r": [{ "rounded-r": se() }],
        "rounded-b": [{ "rounded-b": se() }],
        "rounded-l": [{ "rounded-l": se() }],
        "rounded-ss": [{ "rounded-ss": se() }],
        "rounded-se": [{ "rounded-se": se() }],
        "rounded-ee": [{ "rounded-ee": se() }],
        "rounded-es": [{ "rounded-es": se() }],
        "rounded-tl": [{ "rounded-tl": se() }],
        "rounded-tr": [{ "rounded-tr": se() }],
        "rounded-br": [{ "rounded-br": se() }],
        "rounded-bl": [{ "rounded-bl": se() }],
        "border-w": [{ border: ae() }],
        "border-w-x": [{ "border-x": ae() }],
        "border-w-y": [{ "border-y": ae() }],
        "border-w-s": [{ "border-s": ae() }],
        "border-w-e": [{ "border-e": ae() }],
        "border-w-bs": [{ "border-bs": ae() }],
        "border-w-be": [{ "border-be": ae() }],
        "border-w-t": [{ "border-t": ae() }],
        "border-w-r": [{ "border-r": ae() }],
        "border-w-b": [{ "border-b": ae() }],
        "border-w-l": [{ "border-l": ae() }],
        "divide-x": [{ "divide-x": ae() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": ae() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...we(), "hidden", "none"] }],
        "divide-style": [{ divide: [...we(), "hidden", "none"] }],
        "border-color": [{ border: D() }],
        "border-color-x": [{ "border-x": D() }],
        "border-color-y": [{ "border-y": D() }],
        "border-color-s": [{ "border-s": D() }],
        "border-color-e": [{ "border-e": D() }],
        "border-color-bs": [{ "border-bs": D() }],
        "border-color-be": [{ "border-be": D() }],
        "border-color-t": [{ "border-t": D() }],
        "border-color-r": [{ "border-r": D() }],
        "border-color-b": [{ "border-b": D() }],
        "border-color-l": [{ "border-l": D() }],
        "divide-color": [{ divide: D() }],
        "outline-style": [{ outline: [...we(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [pe, J, Q] }],
        "outline-w": [{ outline: ["", pe, Fi, Zn] }],
        "outline-color": [{ outline: D() }],
        shadow: [{ shadow: ["", "none", y, hs, ps] }],
        "shadow-color": [{ shadow: D() }],
        "inset-shadow": [{ "inset-shadow": ["none", x, hs, ps] }],
        "inset-shadow-color": [{ "inset-shadow": D() }],
        "ring-w": [{ ring: ae() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: D() }],
        "ring-offset-w": [{ "ring-offset": [pe, Zn] }],
        "ring-offset-color": [{ "ring-offset": D() }],
        "inset-ring-w": [{ "inset-ring": ae() }],
        "inset-ring-color": [{ "inset-ring": D() }],
        "text-shadow": [{ "text-shadow": ["none", w, hs, ps] }],
        "text-shadow-color": [{ "text-shadow": D() }],
        opacity: [{ opacity: [pe, J, Q] }],
        "mix-blend": [{ "mix-blend": [...ge(), "plus-darker", "plus-lighter"] }],
        "bg-blend": [{ "bg-blend": ge() }],
        "mask-clip": [
          { "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"] },
          "mask-no-clip",
        ],
        "mask-composite": [{ mask: ["add", "subtract", "intersect", "exclude"] }],
        "mask-image-linear-pos": [{ "mask-linear": [pe] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": ce() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": ce() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": D() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": D() }],
        "mask-image-t-from-pos": [{ "mask-t-from": ce() }],
        "mask-image-t-to-pos": [{ "mask-t-to": ce() }],
        "mask-image-t-from-color": [{ "mask-t-from": D() }],
        "mask-image-t-to-color": [{ "mask-t-to": D() }],
        "mask-image-r-from-pos": [{ "mask-r-from": ce() }],
        "mask-image-r-to-pos": [{ "mask-r-to": ce() }],
        "mask-image-r-from-color": [{ "mask-r-from": D() }],
        "mask-image-r-to-color": [{ "mask-r-to": D() }],
        "mask-image-b-from-pos": [{ "mask-b-from": ce() }],
        "mask-image-b-to-pos": [{ "mask-b-to": ce() }],
        "mask-image-b-from-color": [{ "mask-b-from": D() }],
        "mask-image-b-to-color": [{ "mask-b-to": D() }],
        "mask-image-l-from-pos": [{ "mask-l-from": ce() }],
        "mask-image-l-to-pos": [{ "mask-l-to": ce() }],
        "mask-image-l-from-color": [{ "mask-l-from": D() }],
        "mask-image-l-to-color": [{ "mask-l-to": D() }],
        "mask-image-x-from-pos": [{ "mask-x-from": ce() }],
        "mask-image-x-to-pos": [{ "mask-x-to": ce() }],
        "mask-image-x-from-color": [{ "mask-x-from": D() }],
        "mask-image-x-to-color": [{ "mask-x-to": D() }],
        "mask-image-y-from-pos": [{ "mask-y-from": ce() }],
        "mask-image-y-to-pos": [{ "mask-y-to": ce() }],
        "mask-image-y-from-color": [{ "mask-y-from": D() }],
        "mask-image-y-to-color": [{ "mask-y-to": D() }],
        "mask-image-radial": [{ "mask-radial": [J, Q] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": ce() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": ce() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": D() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": D() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          { "mask-radial": [{ closest: ["side", "corner"], farthest: ["side", "corner"] }] },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": W() }],
        "mask-image-conic-pos": [{ "mask-conic": [pe] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": ce() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": ce() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": D() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": D() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          { "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"] },
        ],
        "mask-position": [{ mask: T() }],
        "mask-repeat": [{ mask: L() }],
        "mask-size": [{ mask: de() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", J, Q] }],
        filter: [{ filter: ["", "none", J, Q] }],
        blur: [{ blur: Je() }],
        brightness: [{ brightness: [pe, J, Q] }],
        contrast: [{ contrast: [pe, J, Q] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", P, hs, ps] }],
        "drop-shadow-color": [{ "drop-shadow": D() }],
        grayscale: [{ grayscale: ["", pe, J, Q] }],
        "hue-rotate": [{ "hue-rotate": [pe, J, Q] }],
        invert: [{ invert: ["", pe, J, Q] }],
        saturate: [{ saturate: [pe, J, Q] }],
        sepia: [{ sepia: ["", pe, J, Q] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", J, Q] }],
        "backdrop-blur": [{ "backdrop-blur": Je() }],
        "backdrop-brightness": [{ "backdrop-brightness": [pe, J, Q] }],
        "backdrop-contrast": [{ "backdrop-contrast": [pe, J, Q] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", pe, J, Q] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [pe, J, Q] }],
        "backdrop-invert": [{ "backdrop-invert": ["", pe, J, Q] }],
        "backdrop-opacity": [{ "backdrop-opacity": [pe, J, Q] }],
        "backdrop-saturate": [{ "backdrop-saturate": [pe, J, Q] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", pe, J, Q] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": _() }],
        "border-spacing-x": [{ "border-spacing-x": _() }],
        "border-spacing-y": [{ "border-spacing-y": _() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          { transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", J, Q] },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [pe, "initial", J, Q] }],
        ease: [{ ease: ["linear", "initial", O, J, Q] }],
        delay: [{ delay: [pe, J, Q] }],
        animate: [{ animate: ["none", I, J, Q] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [b, J, Q] }],
        "perspective-origin": [{ "perspective-origin": $() }],
        rotate: [{ rotate: Xt() }],
        "rotate-x": [{ "rotate-x": Xt() }],
        "rotate-y": [{ "rotate-y": Xt() }],
        "rotate-z": [{ "rotate-z": Xt() }],
        scale: [{ scale: Ln() }],
        "scale-x": [{ "scale-x": Ln() }],
        "scale-y": [{ "scale-y": Ln() }],
        "scale-z": [{ "scale-z": Ln() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: an() }],
        "skew-x": [{ "skew-x": an() }],
        "skew-y": [{ "skew-y": an() }],
        transform: [{ transform: [J, Q, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: $() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: ln() }],
        "translate-x": [{ "translate-x": ln() }],
        "translate-y": [{ "translate-y": ln() }],
        "translate-z": [{ "translate-z": ln() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: D() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: D() }],
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
              J,
              Q,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": _() }],
        "scroll-mx": [{ "scroll-mx": _() }],
        "scroll-my": [{ "scroll-my": _() }],
        "scroll-ms": [{ "scroll-ms": _() }],
        "scroll-me": [{ "scroll-me": _() }],
        "scroll-mbs": [{ "scroll-mbs": _() }],
        "scroll-mbe": [{ "scroll-mbe": _() }],
        "scroll-mt": [{ "scroll-mt": _() }],
        "scroll-mr": [{ "scroll-mr": _() }],
        "scroll-mb": [{ "scroll-mb": _() }],
        "scroll-ml": [{ "scroll-ml": _() }],
        "scroll-p": [{ "scroll-p": _() }],
        "scroll-px": [{ "scroll-px": _() }],
        "scroll-py": [{ "scroll-py": _() }],
        "scroll-ps": [{ "scroll-ps": _() }],
        "scroll-pe": [{ "scroll-pe": _() }],
        "scroll-pbs": [{ "scroll-pbs": _() }],
        "scroll-pbe": [{ "scroll-pbe": _() }],
        "scroll-pt": [{ "scroll-pt": _() }],
        "scroll-pr": [{ "scroll-pr": _() }],
        "scroll-pb": [{ "scroll-pb": _() }],
        "scroll-pl": [{ "scroll-pl": _() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", J, Q] }],
        fill: [{ fill: ["none", ...D()] }],
        "stroke-w": [{ stroke: [pe, Fi, Zn, wm] }],
        stroke: [{ stroke: ["none", ...D()] }],
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
  Kb = Pb(Xb);
function sr(...t) {
  return Kb(Hy(t));
}
const qb = sb(
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
function Gi({ className: t, variant: r, size: i, asChild: s = !1, ...l }) {
  const c = s ? eb : "button";
  return v.jsx(c, {
    "data-slot": "button",
    className: sr(qb({ variant: r, size: i, className: t })),
    ...l,
  });
}
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qb = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  Zb = (t) =>
    t.replace(/^([A-Z])|[\s-_]+(\w)/g, (r, i, s) => (s ? s.toUpperCase() : i.toLowerCase())),
  Cm = (t) => {
    const r = Zb(t);
    return r.charAt(0).toUpperCase() + r.slice(1);
  },
  iv = (...t) =>
    t
      .filter((r, i, s) => !!r && r.trim() !== "" && s.indexOf(r) === i)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Jb = {
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
 */ const eE = k.forwardRef(
  (
    {
      color: t = "currentColor",
      size: r = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: s,
      className: l = "",
      children: c,
      iconNode: d,
      ...f
    },
    h
  ) =>
    k.createElement(
      "svg",
      {
        ref: h,
        ...Jb,
        width: r,
        height: r,
        stroke: t,
        strokeWidth: s ? (Number(i) * 24) / Number(r) : i,
        className: iv("lucide", l),
        ...f,
      },
      [...d.map(([m, y]) => k.createElement(m, y)), ...(Array.isArray(c) ? c : [c])]
    )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ve = (t, r) => {
  const i = k.forwardRef(({ className: s, ...l }, c) =>
    k.createElement(eE, {
      ref: c,
      iconNode: r,
      className: iv(`lucide-${Qb(Cm(t))}`, `lucide-${t}`, s),
      ...l,
    })
  );
  return ((i.displayName = Cm(t)), i);
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tE = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  nE = Ve("arrow-right", tE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rE = [
    ["path", { d: "M7 7h10v10", key: "1tivn9" }],
    ["path", { d: "M7 17 17 7", key: "1vkiza" }],
  ],
  iE = Ve("arrow-up-right", rE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const oE = [
    [
      "path",
      {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
        key: "1yiouv",
      },
    ],
    ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }],
  ],
  sE = Ve("award", oE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const aE = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  lE = Ve("circle-check", aE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const uE = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ],
  cE = Ve("circle-dot", uE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const dE = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }],
  ],
  fE = Ve("clock-3", dE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pE = [
    ["polyline", { points: "16 18 22 12 16 6", key: "z7tu5w" }],
    ["polyline", { points: "8 6 2 12 8 18", key: "1eg1df" }],
  ],
  hE = Ve("code", pE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mE = [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }],
  ],
  gE = Ve("file-text", mE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const yE = [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }],
  ],
  vE = Ve("link-2", yE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xE = [
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ],
  wE = Ve("mail", xE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const SE = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z",
      },
    ],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ],
  kE = Ve("map-pin", SE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const CE = [["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]],
  bE = Ve("message-circle", CE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const EE = [
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
  TE = Ve("palette", EE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const PE = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M3 9h18", key: "1pudct" }],
    ["path", { d: "M9 21V9", key: "1oto5p" }],
  ],
  NE = Ve("panels-top-left", PE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jE = [
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
        key: "foiqr5",
      },
    ],
  ],
  AE = Ve("phone", jE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ME = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3",
      },
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
  ],
  RE = Ve("send", ME);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const DE = [
    ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
    ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
    ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
    ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
    ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }],
  ],
  OE = Ve("share-2", DE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const FE = [
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
  ov = Ve("sparkles", FE);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _E = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  LE = Ve("x", _E);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const IE = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db",
      },
    ],
  ],
  sv = Ve("zap", IE);
var VE = Function.prototype.toString,
  fu = Object.create,
  zE = Object.prototype.toString,
  BE = (function () {
    function t() {
      ((this._keys = []), (this._values = []));
    }
    return (
      (t.prototype.has = function (r) {
        return !!~this._keys.indexOf(r);
      }),
      (t.prototype.get = function (r) {
        return this._values[this._keys.indexOf(r)];
      }),
      (t.prototype.set = function (r, i) {
        (this._keys.push(r), this._values.push(i));
      }),
      t
    );
  })();
function WE() {
  return new BE();
}
function HE() {
  return new WeakMap();
}
var UE = typeof WeakMap < "u" ? HE : WE;
function Hc(t) {
  if (!t) return fu(null);
  var r = t.constructor;
  if (r === Object) return t === Object.prototype ? {} : fu(t);
  if (r && ~VE.call(r).indexOf("[native code]"))
    try {
      return new r();
    } catch {}
  return fu(t);
}
function $E(t) {
  var r = "";
  return (
    t.global && (r += "g"),
    t.ignoreCase && (r += "i"),
    t.multiline && (r += "m"),
    t.unicode && (r += "u"),
    t.sticky && (r += "y"),
    r
  );
}
function GE(t) {
  return t.flags;
}
var YE = /test/g.flags === "g" ? GE : $E;
function av(t) {
  var r = zE.call(t);
  return r.substring(8, r.length - 1);
}
function XE(t) {
  return t[Symbol.toStringTag] || av(t);
}
var KE = typeof Symbol < "u" ? XE : av,
  qE = Object.defineProperty,
  QE = Object.getOwnPropertyDescriptor,
  lv = Object.getOwnPropertyNames,
  Uc = Object.getOwnPropertySymbols,
  uv = Object.prototype,
  cv = uv.hasOwnProperty,
  ZE = uv.propertyIsEnumerable,
  dv = typeof Uc == "function";
function JE(t) {
  return lv(t).concat(Uc(t));
}
var e2 = dv ? JE : lv;
function Ys(t, r, i) {
  for (var s = e2(t), l = 0, c = s.length, d = void 0, f = void 0; l < c; ++l)
    if (((d = s[l]), !(d === "callee" || d === "caller"))) {
      if (((f = QE(t, d)), !f)) {
        r[d] = i.copier(t[d], i);
        continue;
      }
      !f.get && !f.set && (f.value = i.copier(f.value, i));
      try {
        qE(r, d, f);
      } catch {
        r[d] = f.value;
      }
    }
  return r;
}
function t2(t, r) {
  var i = new r.Constructor();
  r.cache.set(t, i);
  for (var s = 0, l = t.length; s < l; ++s) i[s] = r.copier(t[s], r);
  return i;
}
function n2(t, r) {
  var i = new r.Constructor();
  return (r.cache.set(t, i), Ys(t, i, r));
}
function fv(t, r) {
  return t.slice(0);
}
function r2(t, r) {
  return t.slice(0, t.size, t.type);
}
function i2(t, r) {
  return new r.Constructor(fv(t.buffer));
}
function o2(t, r) {
  return new r.Constructor(t.getTime());
}
function pv(t, r) {
  var i = new r.Constructor();
  return (
    r.cache.set(t, i),
    t.forEach(function (s, l) {
      i.set(l, r.copier(s, r));
    }),
    i
  );
}
function s2(t, r) {
  return Ys(t, pv(t, r), r);
}
function a2(t, r) {
  var i = Hc(r.prototype);
  r.cache.set(t, i);
  for (var s in t) cv.call(t, s) && (i[s] = r.copier(t[s], r));
  return i;
}
function l2(t, r) {
  var i = Hc(r.prototype);
  r.cache.set(t, i);
  for (var s in t) cv.call(t, s) && (i[s] = r.copier(t[s], r));
  for (var l = Uc(t), c = 0, d = l.length, f = void 0; c < d; ++c)
    ((f = l[c]), ZE.call(t, f) && (i[f] = r.copier(t[f], r)));
  return i;
}
var u2 = dv ? l2 : a2;
function c2(t, r) {
  var i = Hc(r.prototype);
  return (r.cache.set(t, i), Ys(t, i, r));
}
function pu(t, r) {
  return new r.Constructor(t.valueOf());
}
function d2(t, r) {
  var i = new r.Constructor(t.source, YE(t));
  return ((i.lastIndex = t.lastIndex), i);
}
function Ns(t, r) {
  return t;
}
function hv(t, r) {
  var i = new r.Constructor();
  return (
    r.cache.set(t, i),
    t.forEach(function (s) {
      i.add(r.copier(s, r));
    }),
    i
  );
}
function f2(t, r) {
  return Ys(t, hv(t, r), r);
}
var p2 = Array.isArray,
  $c = Object.assign,
  h2 =
    Object.getPrototypeOf ||
    function (t) {
      return t.__proto__;
    },
  mv = {
    array: t2,
    arrayBuffer: fv,
    blob: r2,
    dataView: i2,
    date: o2,
    error: Ns,
    map: pv,
    object: u2,
    regExp: d2,
    set: hv,
  },
  m2 = $c({}, mv, { array: n2, map: s2, object: c2, set: f2 });
function g2(t) {
  return {
    Arguments: t.object,
    Array: t.array,
    ArrayBuffer: t.arrayBuffer,
    Blob: t.blob,
    Boolean: pu,
    DataView: t.dataView,
    Date: t.date,
    Error: t.error,
    Float32Array: t.arrayBuffer,
    Float64Array: t.arrayBuffer,
    Int8Array: t.arrayBuffer,
    Int16Array: t.arrayBuffer,
    Int32Array: t.arrayBuffer,
    Map: t.map,
    Number: pu,
    Object: t.object,
    Promise: Ns,
    RegExp: t.regExp,
    Set: t.set,
    String: pu,
    WeakMap: Ns,
    WeakSet: Ns,
    Uint8Array: t.arrayBuffer,
    Uint8ClampedArray: t.arrayBuffer,
    Uint16Array: t.arrayBuffer,
    Uint32Array: t.arrayBuffer,
    Uint64Array: t.arrayBuffer,
  };
}
function gv(t) {
  var r = $c({}, mv, t),
    i = g2(r),
    s = i.Array,
    l = i.Object;
  function c(d, f) {
    if (((f.prototype = f.Constructor = void 0), !d || typeof d != "object")) return d;
    if (f.cache.has(d)) return f.cache.get(d);
    if (
      ((f.prototype = h2(d)),
      (f.Constructor = f.prototype && f.prototype.constructor),
      !f.Constructor || f.Constructor === Object)
    )
      return l(d, f);
    if (p2(d)) return s(d, f);
    var h = i[KE(d)];
    return h ? h(d, f) : typeof d.then == "function" ? d : l(d, f);
  }
  return function (f) {
    return c(f, { Constructor: void 0, cache: UE(), copier: c, prototype: void 0 });
  };
}
function y2(t) {
  return gv($c({}, m2, t));
}
y2({});
gv({});
var hu = { exports: {} },
  bm;
function v2() {
  if (bm) return hu.exports;
  bm = 1;
  var t = (hu.exports = {}),
    r,
    i;
  function s() {
    throw new Error("setTimeout has not been defined");
  }
  function l() {
    throw new Error("clearTimeout has not been defined");
  }
  (function () {
    try {
      typeof setTimeout == "function" ? (r = setTimeout) : (r = s);
    } catch {
      r = s;
    }
    try {
      typeof clearTimeout == "function" ? (i = clearTimeout) : (i = l);
    } catch {
      i = l;
    }
  })();
  function c(b) {
    if (r === setTimeout) return setTimeout(b, 0);
    if ((r === s || !r) && setTimeout) return ((r = setTimeout), setTimeout(b, 0));
    try {
      return r(b, 0);
    } catch {
      try {
        return r.call(null, b, 0);
      } catch {
        return r.call(this, b, 0);
      }
    }
  }
  function d(b) {
    if (i === clearTimeout) return clearTimeout(b);
    if ((i === l || !i) && clearTimeout) return ((i = clearTimeout), clearTimeout(b));
    try {
      return i(b);
    } catch {
      try {
        return i.call(null, b);
      } catch {
        return i.call(this, b);
      }
    }
  }
  var f = [],
    h = !1,
    m,
    y = -1;
  function x() {
    !h || !m || ((h = !1), m.length ? (f = m.concat(f)) : (y = -1), f.length && w());
  }
  function w() {
    if (!h) {
      var b = c(x);
      h = !0;
      for (var j = f.length; j; ) {
        for (m = f, f = []; ++y < j; ) m && m[y].run();
        ((y = -1), (j = f.length));
      }
      ((m = null), (h = !1), d(b));
    }
  }
  t.nextTick = function (b) {
    var j = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var O = 1; O < arguments.length; O++) j[O - 1] = arguments[O];
    (f.push(new P(b, j)), f.length === 1 && !h && c(w));
  };
  function P(b, j) {
    ((this.fun = b), (this.array = j));
  }
  ((P.prototype.run = function () {
    this.fun.apply(null, this.array);
  }),
    (t.title = "browser"),
    (t.browser = !0),
    (t.env = {}),
    (t.argv = []),
    (t.version = ""),
    (t.versions = {}));
  function A() {}
  return (
    (t.on = A),
    (t.addListener = A),
    (t.once = A),
    (t.off = A),
    (t.removeListener = A),
    (t.removeAllListeners = A),
    (t.emit = A),
    (t.prependListener = A),
    (t.prependOnceListener = A),
    (t.listeners = function (b) {
      return [];
    }),
    (t.binding = function (b) {
      throw new Error("process.binding is not supported");
    }),
    (t.cwd = function () {
      return "/";
    }),
    (t.chdir = function (b) {
      throw new Error("process.chdir is not supported");
    }),
    (t.umask = function () {
      return 0;
    }),
    hu.exports
  );
}
v2();
var mu, Em;
function x2() {
  if (Em) return mu;
  Em = 1;
  var t = typeof ls == "object" && ls && ls.Object === Object && ls;
  return ((mu = t), mu);
}
var gu, Tm;
function w2() {
  if (Tm) return gu;
  Tm = 1;
  var t = x2(),
    r = typeof self == "object" && self && self.Object === Object && self,
    i = t || r || Function("return this")();
  return ((gu = i), gu);
}
var yu, Pm;
function yv() {
  if (Pm) return yu;
  Pm = 1;
  var t = w2(),
    r = t.Symbol;
  return ((yu = r), yu);
}
var vu, Nm;
function S2() {
  if (Nm) return vu;
  Nm = 1;
  var t = yv(),
    r = Object.prototype,
    i = r.hasOwnProperty,
    s = r.toString,
    l = t ? t.toStringTag : void 0;
  function c(d) {
    var f = i.call(d, l),
      h = d[l];
    try {
      d[l] = void 0;
      var m = !0;
    } catch {}
    var y = s.call(d);
    return (m && (f ? (d[l] = h) : delete d[l]), y);
  }
  return ((vu = c), vu);
}
var xu, jm;
function k2() {
  if (jm) return xu;
  jm = 1;
  var t = Object.prototype,
    r = t.toString;
  function i(s) {
    return r.call(s);
  }
  return ((xu = i), xu);
}
var wu, Am;
function vv() {
  if (Am) return wu;
  Am = 1;
  var t = yv(),
    r = S2(),
    i = k2(),
    s = "[object Null]",
    l = "[object Undefined]",
    c = t ? t.toStringTag : void 0;
  function d(f) {
    return f == null ? (f === void 0 ? l : s) : c && c in Object(f) ? r(f) : i(f);
  }
  return ((wu = d), wu);
}
var Su, Mm;
function C2() {
  if (Mm) return Su;
  Mm = 1;
  var t = Array.isArray;
  return ((Su = t), Su);
}
var ku, Rm;
function xv() {
  if (Rm) return ku;
  Rm = 1;
  function t(r) {
    return r != null && typeof r == "object";
  }
  return ((ku = t), ku);
}
var Cu, Dm;
function b2() {
  if (Dm) return Cu;
  Dm = 1;
  var t = vv(),
    r = C2(),
    i = xv(),
    s = "[object String]";
  function l(c) {
    return typeof c == "string" || (!r(c) && i(c) && t(c) == s);
  }
  return ((Cu = l), Cu);
}
b2();
var bu, Om;
function E2() {
  if (Om) return bu;
  Om = 1;
  function t(r, i) {
    return function (s) {
      return r(i(s));
    };
  }
  return ((bu = t), bu);
}
var Eu, Fm;
function T2() {
  if (Fm) return Eu;
  Fm = 1;
  var t = E2(),
    r = t(Object.getPrototypeOf, Object);
  return ((Eu = r), Eu);
}
var Tu, _m;
function P2() {
  if (_m) return Tu;
  _m = 1;
  var t = vv(),
    r = T2(),
    i = xv(),
    s = "[object Object]",
    l = Function.prototype,
    c = Object.prototype,
    d = l.toString,
    f = c.hasOwnProperty,
    h = d.call(Object);
  function m(y) {
    if (!i(y) || t(y) != s) return !1;
    var x = r(y);
    if (x === null) return !0;
    var w = f.call(x, "constructor") && x.constructor;
    return typeof w == "function" && w instanceof w && d.call(w) == h;
  }
  return ((Tu = m), Tu);
}
P2();
var wv = {
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
  Sv = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 };
new Array(4).fill(String.fromCodePoint(Sv[0])).join("");
Object.fromEntries(Object.entries(Sv).map((t) => t.reverse()));
Object.fromEntries(Object.entries(wv).map((t) => t.reverse()));
`${Object.values(wv)
  .map((t) => `\\u{${t.toString(16)}}`)
  .join("")}`;
var Pu, Lm;
function N2() {
  if (Lm) return Pu;
  Lm = 1;
  var t = Object.prototype.hasOwnProperty,
    r = Object.prototype.toString;
  return (
    (Pu = function (i, s, l) {
      if (r.call(s) !== "[object Function]") throw new TypeError("iterator must be a function");
      var c = i.length;
      if (c === +c) for (var d = 0; d < c; d++) s.call(l, i[d], d, i);
      else for (var f in i) t.call(i, f) && s.call(l, i[f], f, i);
    }),
    Pu
  );
}
var Nu, Im;
function j2() {
  if (Im) return Nu;
  Im = 1;
  var t = N2();
  Nu = r;
  function r(i, s, l) {
    if (arguments.length === 3) return r.set(i, s, l);
    if (arguments.length === 2) return r.get(i, s);
    var c = r.bind(r, i);
    for (var d in r) r.hasOwnProperty(d) && (c[d] = r[d].bind(c, i));
    return c;
  }
  return (
    (r.get = function (i, s) {
      for (var l = Array.isArray(s) ? s : r.parse(s), c = 0; c < l.length; ++c) {
        var d = l[c];
        if (!(typeof i == "object" && d in i)) throw new Error("Invalid reference token: " + d);
        i = i[d];
      }
      return i;
    }),
    (r.set = function (i, s, l) {
      var c = Array.isArray(s) ? s : r.parse(s),
        d = c[0];
      if (c.length === 0) throw Error("Can not set the root object");
      for (var f = 0; f < c.length - 1; ++f) {
        var h = c[f];
        (typeof h != "string" && typeof h != "number" && (h = String(h)),
          !(h === "__proto__" || h === "constructor" || h === "prototype") &&
            (h === "-" && Array.isArray(i) && (h = i.length),
            (d = c[f + 1]),
            h in i || (d.match(/^(\d+|-)$/) ? (i[h] = []) : (i[h] = {})),
            (i = i[h])));
      }
      return (d === "-" && Array.isArray(i) && (d = i.length), (i[d] = l), this);
    }),
    (r.remove = function (i, s) {
      var l = Array.isArray(s) ? s : r.parse(s),
        c = l[l.length - 1];
      if (c === void 0) throw new Error('Invalid JSON pointer for remove: "' + s + '"');
      var d = r.get(i, l.slice(0, -1));
      if (Array.isArray(d)) {
        var f = +c;
        if (c === "" && isNaN(f)) throw new Error('Invalid array index: "' + c + '"');
        Array.prototype.splice.call(d, f, 1);
      } else delete d[c];
    }),
    (r.dict = function (i, s) {
      var l = {};
      return (
        r.walk(
          i,
          function (c, d) {
            l[d] = c;
          },
          s
        ),
        l
      );
    }),
    (r.walk = function (i, s, l) {
      var c = [];
      ((l =
        l ||
        function (d) {
          var f = Object.prototype.toString.call(d);
          return f === "[object Object]" || f === "[object Array]";
        }),
        (function d(f) {
          t(f, function (h, m) {
            (c.push(String(m)), l(h) ? d(h) : s(h, r.compile(c)), c.pop());
          });
        })(i));
    }),
    (r.has = function (i, s) {
      try {
        r.get(i, s);
      } catch {
        return !1;
      }
      return !0;
    }),
    (r.escape = function (i) {
      return i.toString().replace(/~/g, "~0").replace(/\//g, "~1");
    }),
    (r.unescape = function (i) {
      return i.replace(/~1/g, "/").replace(/~0/g, "~");
    }),
    (r.parse = function (i) {
      if (i === "") return [];
      if (i.charAt(0) !== "/") throw new Error("Invalid JSON pointer: " + i);
      return i.substring(1).split(/\//).map(r.unescape);
    }),
    (r.compile = function (i) {
      return i.length === 0 ? "" : "/" + i.map(r.escape).join("/");
    }),
    Nu
  );
}
j2();
var ms = { exports: {} },
  Vm;
function A2() {
  return (
    Vm ||
      ((Vm = 1),
      (function (t, r) {
        ((r = t.exports = i), (r.getSerialize = s));
        function i(l, c, d, f) {
          return JSON.stringify(l, s(c, f), d);
        }
        function s(l, c) {
          var d = [],
            f = [];
          return (
            c == null &&
              (c = function (h, m) {
                return d[0] === m
                  ? "[Circular ~]"
                  : "[Circular ~." + f.slice(0, d.indexOf(m)).join(".") + "]";
              }),
            function (h, m) {
              if (d.length > 0) {
                var y = d.indexOf(this);
                (~y ? d.splice(y + 1) : d.push(this),
                  ~y ? f.splice(y, 1 / 0, h) : f.push(h),
                  ~d.indexOf(m) && (m = c.call(this, h, m)));
              } else d.push(m);
              return l == null ? m : l.call(this, h, m);
            }
          );
        }
      })(ms, ms.exports)),
    ms.exports
  );
}
A2();
var $t = function () {
  return (
    ($t =
      Object.assign ||
      function (r) {
        for (var i, s = 1, l = arguments.length; s < l; s++) {
          i = arguments[s];
          for (var c in i) Object.prototype.hasOwnProperty.call(i, c) && (r[c] = i[c]);
        }
        return r;
      }),
    $t.apply(this, arguments)
  );
};
function kv(t, r) {
  var i = {};
  for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && r.indexOf(s) < 0 && (i[s] = t[s]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var l = 0, s = Object.getOwnPropertySymbols(t); l < s.length; l++)
      r.indexOf(s[l]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(t, s[l]) &&
        (i[s[l]] = t[s[l]]);
  return i;
}
function M2(t, r, i) {
  if (i || arguments.length === 2)
    for (var s = 0, l = r.length, c; s < l; s++)
      (c || !(s in r)) && (c || (c = Array.prototype.slice.call(r, 0, s)), (c[s] = r[s]));
  return t.concat(c || Array.prototype.slice.call(r));
}
function R2(t) {
  throw new TypeError("Expected parameter accessToken");
}
const D2 = R2();
async function Yr(t) {
  try {
    return (await D2.getEntries(t))?.items ?? [];
  } catch (r) {
    return (console.error("Contentful fetch failed:", r), []);
  }
}
async function O2() {
  return await Yr({ content_type: "heroSection" });
}
async function F2() {
  return await Yr({ content_type: "services" });
}
async function _2() {
  return await Yr({ content_type: "portfolio" });
}
async function L2() {
  return await Yr({ content_type: "about" });
}
async function I2() {
  return await Yr({ content_type: "contact" });
}
async function V2() {
  return await Yr({ content_type: "supermarketFlyers" });
}
function Gc(t) {
  const r = t?.fields?.file?.url;
  return typeof r != "string" || !r.length ? null : r.startsWith("//") ? `https:${r}` : r;
}
function z2() {
  const [t, r] = k.useState(null);
  return (
    k.useEffect(() => {
      let i = !1;
      return (
        O2().then((s) => {
          const l = s?.[0]?.fields ?? null;
          !i && l && r(l);
        }),
        () => {
          i = !0;
        }
      );
    }, []),
    v.jsxs("section", {
      id: "home",
      className:
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 pb-16",
      children: [
        v.jsxs("div", {
          className: "absolute inset-0 overflow-hidden",
          children: [
            v.jsx(re.div, {
              className:
                "absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-[#A259FF]/15 to-[#4CC3FF]/15 rounded-full blur-3xl",
              animate: { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0] },
              transition: { duration: 10, repeat: 1 / 0, ease: "easeInOut" },
            }),
            v.jsx(re.div, {
              className:
                "absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-[#4CC3FF]/15 to-[#A259FF]/15 rounded-full blur-3xl",
              animate: { scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5], x: [0, -30, 0] },
              transition: { duration: 10, repeat: 1 / 0, ease: "easeInOut" },
            }),
            [...Array(8)].map((i, s) =>
              v.jsx(
                re.div,
                {
                  className:
                    "absolute w-2 h-2 bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] rounded-full",
                  style: { left: `${15 + s * 12}%`, top: `${25 + (s % 3) * 25}%` },
                  animate: { y: [0, -25, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] },
                  transition: { duration: 3 + s * 0.4, repeat: 1 / 0, ease: "easeInOut" },
                },
                s
              )
            ),
          ],
        }),
        v.jsxs("div", {
          className: "relative z-10 max-w-6xl mx-auto px-6 text-center",
          children: [
            v.jsxs(re.div, {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
              className: "mb-6",
              children: [
                v.jsxs(re.div, {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.6, delay: 0.2 },
                  className:
                    "inline-flex items-center gap-2 px-4 py-2 liquid-glass-card rounded-full mb-8 shadow-xl edge-glow float",
                  children: [
                    v.jsx(ov, { className: "w-4 h-4 text-[#A259FF]" }),
                    v.jsx("span", {
                      className: "text-sm",
                      children: t?.badgeText ?? "Premium Design Ecosystem",
                    }),
                  ],
                }),
                v.jsxs("h1", {
                  className:
                    "text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 tracking-tight leading-[1.1]",
                  children: [
                    t?.title ?? "One Circle.",
                    v.jsx("br", {}),
                    v.jsx("span", {
                      className:
                        "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent",
                      children: t?.highlight ?? "Infinite Possibilities.",
                    }),
                  ],
                }),
              ],
            }),
            v.jsx(re.p, {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.3 },
              className:
                "text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed",
              children:
                t?.subtitle ??
                "Premium designs delivered with speed and precision. From supermarket promotions to complete brand ecosystems — experience quality that speaks for itself.",
            }),
            v.jsxs(re.div, {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.5 },
              className: "flex flex-col sm:flex-row gap-5 justify-center items-center",
              children: [
                v.jsx(re.div, {
                  whileHover: { scale: 1.05, y: -2 },
                  whileTap: { scale: 0.98 },
                  children: v.jsxs(Gi, {
                    size: "lg",
                    className:
                      "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity px-10 py-7 text-lg rounded-full group shadow-lg shadow-[#A259FF]/25 cursor-hover",
                    children: [
                      t?.primaryCtaText ?? "Explore Our Work",
                      v.jsx(nE, {
                        className: "ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform",
                      }),
                    ],
                  }),
                }),
                v.jsx(re.div, {
                  whileHover: { scale: 1.05, y: -2 },
                  whileTap: { scale: 0.98 },
                  children: v.jsx(Gi, {
                    size: "lg",
                    variant: "outline",
                    className:
                      "border-2 border-black text-black hover:bg-black hover:text-white transition-all px-10 py-7 text-lg rounded-full cursor-hover",
                    children: t?.secondaryCtaText ?? "Get Started",
                  }),
                }),
              ],
            }),
            v.jsx(re.div, {
              className: "mt-24",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1 },
              children: v.jsx(re.div, {
                animate: { y: [0, 12, 0] },
                transition: { duration: 2, repeat: 1 / 0, ease: "easeInOut" },
                className: "inline-block",
                children: v.jsx("div", {
                  className:
                    "w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2",
                  children: v.jsx(re.div, {
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
const B2 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function Bs(t) {
  const [r, i] = k.useState(!1),
    s = () => {
      i(!0);
    },
    { src: l, alt: c, style: d, className: f, ...h } = t;
  return r
    ? v.jsx("div", {
        className: `inline-block bg-gray-100 text-center align-middle ${f ?? ""}`,
        style: d,
        children: v.jsx("div", {
          className: "flex items-center justify-center w-full h-full",
          children: v.jsx("img", {
            src: B2,
            alt: "Error loading image",
            ...h,
            "data-original-url": l,
          }),
        }),
      })
    : v.jsx("img", { src: l, alt: c, className: f, style: d, ...h, onError: s });
}
function Dn(t, r, { checkForDefaultPrevented: i = !0 } = {}) {
  return function (l) {
    if ((t?.(l), i === !1 || !l.defaultPrevented)) return r?.(l);
  };
}
function W2(t, r) {
  const i = k.createContext(r),
    s = (c) => {
      const { children: d, ...f } = c,
        h = k.useMemo(() => f, Object.values(f));
      return v.jsx(i.Provider, { value: h, children: d });
    };
  s.displayName = t + "Provider";
  function l(c) {
    const d = k.useContext(i);
    if (d) return d;
    if (r !== void 0) return r;
    throw new Error(`\`${c}\` must be used within \`${t}\``);
  }
  return [s, l];
}
function H2(t, r = []) {
  let i = [];
  function s(c, d) {
    const f = k.createContext(d),
      h = i.length;
    i = [...i, d];
    const m = (x) => {
      const { scope: w, children: P, ...A } = x,
        b = w?.[t]?.[h] || f,
        j = k.useMemo(() => A, Object.values(A));
      return v.jsx(b.Provider, { value: j, children: P });
    };
    m.displayName = c + "Provider";
    function y(x, w) {
      const P = w?.[t]?.[h] || f,
        A = k.useContext(P);
      if (A) return A;
      if (d !== void 0) return d;
      throw new Error(`\`${x}\` must be used within \`${c}\``);
    }
    return [m, y];
  }
  const l = () => {
    const c = i.map((d) => k.createContext(d));
    return function (f) {
      const h = f?.[t] || c;
      return k.useMemo(() => ({ [`__scope${t}`]: { ...f, [t]: h } }), [f, h]);
    };
  };
  return ((l.scopeName = t), [s, U2(l, ...r)]);
}
function U2(...t) {
  const r = t[0];
  if (t.length === 1) return r;
  const i = () => {
    const s = t.map((l) => ({ useScope: l(), scopeName: l.scopeName }));
    return function (c) {
      const d = s.reduce((f, { useScope: h, scopeName: m }) => {
        const x = h(c)[`__scope${m}`];
        return { ...f, ...x };
      }, {});
      return k.useMemo(() => ({ [`__scope${r.scopeName}`]: d }), [d]);
    };
  };
  return ((i.scopeName = r.scopeName), i);
}
var Yi = globalThis?.document ? k.useLayoutEffect : () => {},
  $2 = dc[" useId ".trim().toString()] || (() => {}),
  G2 = 0;
function ju(t) {
  const [r, i] = k.useState($2());
  return (
    Yi(() => {
      i((s) => s ?? String(G2++));
    }, [t]),
    t || (r ? `radix-${r}` : "")
  );
}
var Y2 = dc[" useInsertionEffect ".trim().toString()] || Yi;
function X2({ prop: t, defaultProp: r, onChange: i = () => {}, caller: s }) {
  const [l, c, d] = K2({ defaultProp: r, onChange: i }),
    f = t !== void 0,
    h = f ? t : l;
  {
    const y = k.useRef(t !== void 0);
    k.useEffect(() => {
      const x = y.current;
      (x !== f &&
        console.warn(
          `${s} is changing from ${x ? "controlled" : "uncontrolled"} to ${f ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        ),
        (y.current = f));
    }, [f, s]);
  }
  const m = k.useCallback(
    (y) => {
      if (f) {
        const x = q2(y) ? y(t) : y;
        x !== t && d.current?.(x);
      } else c(y);
    },
    [f, t, c, d]
  );
  return [h, m];
}
function K2({ defaultProp: t, onChange: r }) {
  const [i, s] = k.useState(t),
    l = k.useRef(i),
    c = k.useRef(r);
  return (
    Y2(() => {
      c.current = r;
    }, [r]),
    k.useEffect(() => {
      l.current !== i && (c.current?.(i), (l.current = i));
    }, [i, l]),
    [i, s, c]
  );
}
function q2(t) {
  return typeof t == "function";
}
var Cv = Jm();
const Q2 = Zm(Cv);
function Z2(t) {
  const r = J2(t),
    i = k.forwardRef((s, l) => {
      const { children: c, ...d } = s,
        f = k.Children.toArray(c),
        h = f.find(tT);
      if (h) {
        const m = h.props.children,
          y = f.map((x) =>
            x === h
              ? k.Children.count(m) > 1
                ? k.Children.only(null)
                : k.isValidElement(m)
                  ? m.props.children
                  : null
              : x
          );
        return v.jsx(r, {
          ...d,
          ref: l,
          children: k.isValidElement(m) ? k.cloneElement(m, void 0, y) : null,
        });
      }
      return v.jsx(r, { ...d, ref: l, children: c });
    });
  return ((i.displayName = `${t}.Slot`), i);
}
function J2(t) {
  const r = k.forwardRef((i, s) => {
    const { children: l, ...c } = i;
    if (k.isValidElement(l)) {
      const d = rT(l),
        f = nT(c, l.props);
      return (l.type !== k.Fragment && (f.ref = s ? Gs(s, d) : d), k.cloneElement(l, f));
    }
    return k.Children.count(l) > 1 ? k.Children.only(null) : null;
  });
  return ((r.displayName = `${t}.SlotClone`), r);
}
var eT = Symbol("radix.slottable");
function tT(t) {
  return (
    k.isValidElement(t) &&
    typeof t.type == "function" &&
    "__radixId" in t.type &&
    t.type.__radixId === eT
  );
}
function nT(t, r) {
  const i = { ...r };
  for (const s in r) {
    const l = t[s],
      c = r[s];
    /^on[A-Z]/.test(s)
      ? l && c
        ? (i[s] = (...f) => {
            const h = c(...f);
            return (l(...f), h);
          })
        : l && (i[s] = l)
      : s === "style"
        ? (i[s] = { ...l, ...c })
        : s === "className" && (i[s] = [l, c].filter(Boolean).join(" "));
  }
  return { ...t, ...i };
}
function rT(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    i = r && "isReactWarning" in r && r.isReactWarning;
  return i
    ? t.ref
    : ((r = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (i = r && "isReactWarning" in r && r.isReactWarning),
      i ? t.props.ref : t.props.ref || t.ref);
}
var iT = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  sn = iT.reduce((t, r) => {
    const i = Z2(`Primitive.${r}`),
      s = k.forwardRef((l, c) => {
        const { asChild: d, ...f } = l,
          h = d ? i : r;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          v.jsx(h, { ...f, ref: c })
        );
      });
    return ((s.displayName = `Primitive.${r}`), { ...t, [r]: s });
  }, {});
function oT(t, r) {
  t && Cv.flushSync(() => t.dispatchEvent(r));
}
function Xi(t) {
  const r = k.useRef(t);
  return (
    k.useEffect(() => {
      r.current = t;
    }),
    k.useMemo(
      () =>
        (...i) =>
          r.current?.(...i),
      []
    )
  );
}
function sT(t, r = globalThis?.document) {
  const i = Xi(t);
  k.useEffect(() => {
    const s = (l) => {
      l.key === "Escape" && i(l);
    };
    return (
      r.addEventListener("keydown", s, { capture: !0 }),
      () => r.removeEventListener("keydown", s, { capture: !0 })
    );
  }, [i, r]);
}
var aT = "DismissableLayer",
  lc = "dismissableLayer.update",
  lT = "dismissableLayer.pointerDownOutside",
  uT = "dismissableLayer.focusOutside",
  zm,
  bv = k.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Ev = k.forwardRef((t, r) => {
    const {
        disableOutsidePointerEvents: i = !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: l,
        onFocusOutside: c,
        onInteractOutside: d,
        onDismiss: f,
        ...h
      } = t,
      m = k.useContext(bv),
      [y, x] = k.useState(null),
      w = y?.ownerDocument ?? globalThis?.document,
      [, P] = k.useState({}),
      A = ir(r, (G) => x(G)),
      b = Array.from(m.layers),
      [j] = [...m.layersWithOutsidePointerEventsDisabled].slice(-1),
      O = b.indexOf(j),
      I = y ? b.indexOf(y) : -1,
      F = m.layersWithOutsidePointerEventsDisabled.size > 0,
      W = I >= O,
      $ = fT((G) => {
        const _ = G.target,
          ue = [...m.branches].some((ve) => ve.contains(_));
        !W || ue || (l?.(G), d?.(G), G.defaultPrevented || f?.());
      }, w),
      ee = pT((G) => {
        const _ = G.target;
        [...m.branches].some((ve) => ve.contains(_)) ||
          (c?.(G), d?.(G), G.defaultPrevented || f?.());
      }, w);
    return (
      sT((G) => {
        I === m.layers.size - 1 && (s?.(G), !G.defaultPrevented && f && (G.preventDefault(), f()));
      }, w),
      k.useEffect(() => {
        if (y)
          return (
            i &&
              (m.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((zm = w.body.style.pointerEvents), (w.body.style.pointerEvents = "none")),
              m.layersWithOutsidePointerEventsDisabled.add(y)),
            m.layers.add(y),
            Bm(),
            () => {
              i &&
                m.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (w.body.style.pointerEvents = zm);
            }
          );
      }, [y, w, i, m]),
      k.useEffect(
        () => () => {
          y && (m.layers.delete(y), m.layersWithOutsidePointerEventsDisabled.delete(y), Bm());
        },
        [y, m]
      ),
      k.useEffect(() => {
        const G = () => P({});
        return (document.addEventListener(lc, G), () => document.removeEventListener(lc, G));
      }, []),
      v.jsx(sn.div, {
        ...h,
        ref: A,
        style: { pointerEvents: F ? (W ? "auto" : "none") : void 0, ...t.style },
        onFocusCapture: Dn(t.onFocusCapture, ee.onFocusCapture),
        onBlurCapture: Dn(t.onBlurCapture, ee.onBlurCapture),
        onPointerDownCapture: Dn(t.onPointerDownCapture, $.onPointerDownCapture),
      })
    );
  });
Ev.displayName = aT;
var cT = "DismissableLayerBranch",
  dT = k.forwardRef((t, r) => {
    const i = k.useContext(bv),
      s = k.useRef(null),
      l = ir(r, s);
    return (
      k.useEffect(() => {
        const c = s.current;
        if (c)
          return (
            i.branches.add(c),
            () => {
              i.branches.delete(c);
            }
          );
      }, [i.branches]),
      v.jsx(sn.div, { ...t, ref: l })
    );
  });
dT.displayName = cT;
function fT(t, r = globalThis?.document) {
  const i = Xi(t),
    s = k.useRef(!1),
    l = k.useRef(() => {});
  return (
    k.useEffect(() => {
      const c = (f) => {
          if (f.target && !s.current) {
            let h = function () {
              Tv(lT, i, m, { discrete: !0 });
            };
            const m = { originalEvent: f };
            f.pointerType === "touch"
              ? (r.removeEventListener("click", l.current),
                (l.current = h),
                r.addEventListener("click", l.current, { once: !0 }))
              : h();
          } else r.removeEventListener("click", l.current);
          s.current = !1;
        },
        d = window.setTimeout(() => {
          r.addEventListener("pointerdown", c);
        }, 0);
      return () => {
        (window.clearTimeout(d),
          r.removeEventListener("pointerdown", c),
          r.removeEventListener("click", l.current));
      };
    }, [r, i]),
    { onPointerDownCapture: () => (s.current = !0) }
  );
}
function pT(t, r = globalThis?.document) {
  const i = Xi(t),
    s = k.useRef(!1);
  return (
    k.useEffect(() => {
      const l = (c) => {
        c.target && !s.current && Tv(uT, i, { originalEvent: c }, { discrete: !1 });
      };
      return (r.addEventListener("focusin", l), () => r.removeEventListener("focusin", l));
    }, [r, i]),
    { onFocusCapture: () => (s.current = !0), onBlurCapture: () => (s.current = !1) }
  );
}
function Bm() {
  const t = new CustomEvent(lc);
  document.dispatchEvent(t);
}
function Tv(t, r, i, { discrete: s }) {
  const l = i.originalEvent.target,
    c = new CustomEvent(t, { bubbles: !1, cancelable: !0, detail: i });
  (r && l.addEventListener(t, r, { once: !0 }), s ? oT(l, c) : l.dispatchEvent(c));
}
var Au = "focusScope.autoFocusOnMount",
  Mu = "focusScope.autoFocusOnUnmount",
  Wm = { bubbles: !1, cancelable: !0 },
  hT = "FocusScope",
  Pv = k.forwardRef((t, r) => {
    const { loop: i = !1, trapped: s = !1, onMountAutoFocus: l, onUnmountAutoFocus: c, ...d } = t,
      [f, h] = k.useState(null),
      m = Xi(l),
      y = Xi(c),
      x = k.useRef(null),
      w = ir(r, (b) => h(b)),
      P = k.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (k.useEffect(() => {
      if (s) {
        let b = function (F) {
            if (P.paused || !f) return;
            const W = F.target;
            f.contains(W) ? (x.current = W) : Mn(x.current, { select: !0 });
          },
          j = function (F) {
            if (P.paused || !f) return;
            const W = F.relatedTarget;
            W !== null && (f.contains(W) || Mn(x.current, { select: !0 }));
          },
          O = function (F) {
            if (document.activeElement === document.body)
              for (const $ of F) $.removedNodes.length > 0 && Mn(f);
          };
        (document.addEventListener("focusin", b), document.addEventListener("focusout", j));
        const I = new MutationObserver(O);
        return (
          f && I.observe(f, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", b),
              document.removeEventListener("focusout", j),
              I.disconnect());
          }
        );
      }
    }, [s, f, P.paused]),
      k.useEffect(() => {
        if (f) {
          Um.add(P);
          const b = document.activeElement;
          if (!f.contains(b)) {
            const O = new CustomEvent(Au, Wm);
            (f.addEventListener(Au, m),
              f.dispatchEvent(O),
              O.defaultPrevented ||
                (mT(wT(Nv(f)), { select: !0 }), document.activeElement === b && Mn(f)));
          }
          return () => {
            (f.removeEventListener(Au, m),
              setTimeout(() => {
                const O = new CustomEvent(Mu, Wm);
                (f.addEventListener(Mu, y),
                  f.dispatchEvent(O),
                  O.defaultPrevented || Mn(b ?? document.body, { select: !0 }),
                  f.removeEventListener(Mu, y),
                  Um.remove(P));
              }, 0));
          };
        }
      }, [f, m, y, P]));
    const A = k.useCallback(
      (b) => {
        if ((!i && !s) || P.paused) return;
        const j = b.key === "Tab" && !b.altKey && !b.ctrlKey && !b.metaKey,
          O = document.activeElement;
        if (j && O) {
          const I = b.currentTarget,
            [F, W] = gT(I);
          F && W
            ? !b.shiftKey && O === W
              ? (b.preventDefault(), i && Mn(F, { select: !0 }))
              : b.shiftKey && O === F && (b.preventDefault(), i && Mn(W, { select: !0 }))
            : O === I && b.preventDefault();
        }
      },
      [i, s, P.paused]
    );
    return v.jsx(sn.div, { tabIndex: -1, ...d, ref: w, onKeyDown: A });
  });
Pv.displayName = hT;
function mT(t, { select: r = !1 } = {}) {
  const i = document.activeElement;
  for (const s of t) if ((Mn(s, { select: r }), document.activeElement !== i)) return;
}
function gT(t) {
  const r = Nv(t),
    i = Hm(r, t),
    s = Hm(r.reverse(), t);
  return [i, s];
}
function Nv(t) {
  const r = [],
    i = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (s) => {
        const l = s.tagName === "INPUT" && s.type === "hidden";
        return s.disabled || s.hidden || l
          ? NodeFilter.FILTER_SKIP
          : s.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; i.nextNode(); ) r.push(i.currentNode);
  return r;
}
function Hm(t, r) {
  for (const i of t) if (!yT(i, { upTo: r })) return i;
}
function yT(t, { upTo: r }) {
  if (getComputedStyle(t).visibility === "hidden") return !0;
  for (; t; ) {
    if (r !== void 0 && t === r) return !1;
    if (getComputedStyle(t).display === "none") return !0;
    t = t.parentElement;
  }
  return !1;
}
function vT(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function Mn(t, { select: r = !1 } = {}) {
  if (t && t.focus) {
    const i = document.activeElement;
    (t.focus({ preventScroll: !0 }), t !== i && vT(t) && r && t.select());
  }
}
var Um = xT();
function xT() {
  let t = [];
  return {
    add(r) {
      const i = t[0];
      (r !== i && i?.pause(), (t = $m(t, r)), t.unshift(r));
    },
    remove(r) {
      ((t = $m(t, r)), t[0]?.resume());
    },
  };
}
function $m(t, r) {
  const i = [...t],
    s = i.indexOf(r);
  return (s !== -1 && i.splice(s, 1), i);
}
function wT(t) {
  return t.filter((r) => r.tagName !== "A");
}
var ST = "Portal",
  jv = k.forwardRef((t, r) => {
    const { container: i, ...s } = t,
      [l, c] = k.useState(!1);
    Yi(() => c(!0), []);
    const d = i || (l && globalThis?.document?.body);
    return d ? Q2.createPortal(v.jsx(sn.div, { ...s, ref: r }), d) : null;
  });
jv.displayName = ST;
function kT(t, r) {
  return k.useReducer((i, s) => r[i][s] ?? i, t);
}
var Xs = (t) => {
  const { present: r, children: i } = t,
    s = CT(r),
    l = typeof i == "function" ? i({ present: s.isPresent }) : k.Children.only(i),
    c = ir(s.ref, bT(l));
  return typeof i == "function" || s.isPresent ? k.cloneElement(l, { ref: c }) : null;
};
Xs.displayName = "Presence";
function CT(t) {
  const [r, i] = k.useState(),
    s = k.useRef(null),
    l = k.useRef(t),
    c = k.useRef("none"),
    d = t ? "mounted" : "unmounted",
    [f, h] = kT(d, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    k.useEffect(() => {
      const m = gs(s.current);
      c.current = f === "mounted" ? m : "none";
    }, [f]),
    Yi(() => {
      const m = s.current,
        y = l.current;
      if (y !== t) {
        const w = c.current,
          P = gs(m);
        (t
          ? h("MOUNT")
          : P === "none" || m?.display === "none"
            ? h("UNMOUNT")
            : h(y && w !== P ? "ANIMATION_OUT" : "UNMOUNT"),
          (l.current = t));
      }
    }, [t, h]),
    Yi(() => {
      if (r) {
        let m;
        const y = r.ownerDocument.defaultView ?? window,
          x = (P) => {
            const b = gs(s.current).includes(CSS.escape(P.animationName));
            if (P.target === r && b && (h("ANIMATION_END"), !l.current)) {
              const j = r.style.animationFillMode;
              ((r.style.animationFillMode = "forwards"),
                (m = y.setTimeout(() => {
                  r.style.animationFillMode === "forwards" && (r.style.animationFillMode = j);
                })));
            }
          },
          w = (P) => {
            P.target === r && (c.current = gs(s.current));
          };
        return (
          r.addEventListener("animationstart", w),
          r.addEventListener("animationcancel", x),
          r.addEventListener("animationend", x),
          () => {
            (y.clearTimeout(m),
              r.removeEventListener("animationstart", w),
              r.removeEventListener("animationcancel", x),
              r.removeEventListener("animationend", x));
          }
        );
      } else h("ANIMATION_END");
    }, [r, h]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(f),
      ref: k.useCallback((m) => {
        ((s.current = m ? getComputedStyle(m) : null), i(m));
      }, []),
    }
  );
}
function gs(t) {
  return t?.animationName || "none";
}
function bT(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    i = r && "isReactWarning" in r && r.isReactWarning;
  return i
    ? t.ref
    : ((r = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (i = r && "isReactWarning" in r && r.isReactWarning),
      i ? t.props.ref : t.props.ref || t.ref);
}
var Ru = 0;
function ET() {
  k.useEffect(() => {
    const t = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", t[0] ?? Gm()),
      document.body.insertAdjacentElement("beforeend", t[1] ?? Gm()),
      Ru++,
      () => {
        (Ru === 1 &&
          document.querySelectorAll("[data-radix-focus-guard]").forEach((r) => r.remove()),
          Ru--);
      }
    );
  }, []);
}
function Gm() {
  const t = document.createElement("span");
  return (
    t.setAttribute("data-radix-focus-guard", ""),
    (t.tabIndex = 0),
    (t.style.outline = "none"),
    (t.style.opacity = "0"),
    (t.style.position = "fixed"),
    (t.style.pointerEvents = "none"),
    t
  );
}
var js = "right-scroll-bar-position",
  As = "width-before-scroll-bar",
  TT = "with-scroll-bars-hidden",
  PT = "--removed-body-scroll-bar-size";
function Du(t, r) {
  return (typeof t == "function" ? t(r) : t && (t.current = r), t);
}
function NT(t, r) {
  var i = k.useState(function () {
    return {
      value: t,
      callback: r,
      facade: {
        get current() {
          return i.value;
        },
        set current(s) {
          var l = i.value;
          l !== s && ((i.value = s), i.callback(s, l));
        },
      },
    };
  })[0];
  return ((i.callback = r), i.facade);
}
var jT = typeof window < "u" ? k.useLayoutEffect : k.useEffect,
  Ym = new WeakMap();
function AT(t, r) {
  var i = NT(null, function (s) {
    return t.forEach(function (l) {
      return Du(l, s);
    });
  });
  return (
    jT(
      function () {
        var s = Ym.get(i);
        if (s) {
          var l = new Set(s),
            c = new Set(t),
            d = i.current;
          (l.forEach(function (f) {
            c.has(f) || Du(f, null);
          }),
            c.forEach(function (f) {
              l.has(f) || Du(f, d);
            }));
        }
        Ym.set(i, t);
      },
      [t]
    ),
    i
  );
}
function MT(t) {
  return t;
}
function RT(t, r) {
  r === void 0 && (r = MT);
  var i = [],
    s = !1,
    l = {
      read: function () {
        if (s)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`."
          );
        return i.length ? i[i.length - 1] : t;
      },
      useMedium: function (c) {
        var d = r(c, s);
        return (
          i.push(d),
          function () {
            i = i.filter(function (f) {
              return f !== d;
            });
          }
        );
      },
      assignSyncMedium: function (c) {
        for (s = !0; i.length; ) {
          var d = i;
          ((i = []), d.forEach(c));
        }
        i = {
          push: function (f) {
            return c(f);
          },
          filter: function () {
            return i;
          },
        };
      },
      assignMedium: function (c) {
        s = !0;
        var d = [];
        if (i.length) {
          var f = i;
          ((i = []), f.forEach(c), (d = i));
        }
        var h = function () {
            var y = d;
            ((d = []), y.forEach(c));
          },
          m = function () {
            return Promise.resolve().then(h);
          };
        (m(),
          (i = {
            push: function (y) {
              (d.push(y), m());
            },
            filter: function (y) {
              return ((d = d.filter(y)), i);
            },
          }));
      },
    };
  return l;
}
function DT(t) {
  t === void 0 && (t = {});
  var r = RT(null);
  return ((r.options = $t({ async: !0, ssr: !1 }, t)), r);
}
var Av = function (t) {
  var r = t.sideCar,
    i = kv(t, ["sideCar"]);
  if (!r) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var s = r.read();
  if (!s) throw new Error("Sidecar medium not found");
  return k.createElement(s, $t({}, i));
};
Av.isSideCarExport = !0;
function OT(t, r) {
  return (t.useMedium(r), Av);
}
var Mv = DT(),
  Ou = function () {},
  Ks = k.forwardRef(function (t, r) {
    var i = k.useRef(null),
      s = k.useState({ onScrollCapture: Ou, onWheelCapture: Ou, onTouchMoveCapture: Ou }),
      l = s[0],
      c = s[1],
      d = t.forwardProps,
      f = t.children,
      h = t.className,
      m = t.removeScrollBar,
      y = t.enabled,
      x = t.shards,
      w = t.sideCar,
      P = t.noRelative,
      A = t.noIsolation,
      b = t.inert,
      j = t.allowPinchZoom,
      O = t.as,
      I = O === void 0 ? "div" : O,
      F = t.gapMode,
      W = kv(t, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      $ = w,
      ee = AT([i, r]),
      G = $t($t({}, W), l);
    return k.createElement(
      k.Fragment,
      null,
      y &&
        k.createElement($, {
          sideCar: Mv,
          removeScrollBar: m,
          shards: x,
          noRelative: P,
          noIsolation: A,
          inert: b,
          setCallbacks: c,
          allowPinchZoom: !!j,
          lockRef: i,
          gapMode: F,
        }),
      d
        ? k.cloneElement(k.Children.only(f), $t($t({}, G), { ref: ee }))
        : k.createElement(I, $t({}, G, { className: h, ref: ee }), f)
    );
  });
Ks.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
Ks.classNames = { fullWidth: As, zeroRight: js };
var FT = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function _T() {
  if (!document) return null;
  var t = document.createElement("style");
  t.type = "text/css";
  var r = FT();
  return (r && t.setAttribute("nonce", r), t);
}
function LT(t, r) {
  t.styleSheet ? (t.styleSheet.cssText = r) : t.appendChild(document.createTextNode(r));
}
function IT(t) {
  var r = document.head || document.getElementsByTagName("head")[0];
  r.appendChild(t);
}
var VT = function () {
    var t = 0,
      r = null;
    return {
      add: function (i) {
        (t == 0 && (r = _T()) && (LT(r, i), IT(r)), t++);
      },
      remove: function () {
        (t--, !t && r && (r.parentNode && r.parentNode.removeChild(r), (r = null)));
      },
    };
  },
  zT = function () {
    var t = VT();
    return function (r, i) {
      k.useEffect(
        function () {
          return (
            t.add(r),
            function () {
              t.remove();
            }
          );
        },
        [r && i]
      );
    };
  },
  Rv = function () {
    var t = zT(),
      r = function (i) {
        var s = i.styles,
          l = i.dynamic;
        return (t(s, l), null);
      };
    return r;
  },
  BT = { left: 0, top: 0, right: 0, gap: 0 },
  Fu = function (t) {
    return parseInt(t || "", 10) || 0;
  },
  WT = function (t) {
    var r = window.getComputedStyle(document.body),
      i = r[t === "padding" ? "paddingLeft" : "marginLeft"],
      s = r[t === "padding" ? "paddingTop" : "marginTop"],
      l = r[t === "padding" ? "paddingRight" : "marginRight"];
    return [Fu(i), Fu(s), Fu(l)];
  },
  HT = function (t) {
    if ((t === void 0 && (t = "margin"), typeof window > "u")) return BT;
    var r = WT(t),
      i = document.documentElement.clientWidth,
      s = window.innerWidth;
    return { left: r[0], top: r[1], right: r[2], gap: Math.max(0, s - i + r[2] - r[0]) };
  },
  UT = Rv(),
  Wr = "data-scroll-locked",
  $T = function (t, r, i, s) {
    var l = t.left,
      c = t.top,
      d = t.right,
      f = t.gap;
    return (
      i === void 0 && (i = "margin"),
      `
  .`
        .concat(
          TT,
          ` {
   overflow: hidden `
        )
        .concat(
          s,
          `;
   padding-right: `
        )
        .concat(f, "px ")
        .concat(
          s,
          `;
  }
  body[`
        )
        .concat(
          Wr,
          `] {
    overflow: hidden `
        )
        .concat(
          s,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            r && "position: relative ".concat(s, ";"),
            i === "margin" &&
              `
    padding-left: `
                .concat(
                  l,
                  `px;
    padding-top: `
                )
                .concat(
                  c,
                  `px;
    padding-right: `
                )
                .concat(
                  d,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(f, "px ")
                .concat(
                  s,
                  `;
    `
                ),
            i === "padding" && "padding-right: ".concat(f, "px ").concat(s, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`
        )
        .concat(
          js,
          ` {
    right: `
        )
        .concat(f, "px ")
        .concat(
          s,
          `;
  }
  
  .`
        )
        .concat(
          As,
          ` {
    margin-right: `
        )
        .concat(f, "px ")
        .concat(
          s,
          `;
  }
  
  .`
        )
        .concat(js, " .")
        .concat(
          js,
          ` {
    right: 0 `
        )
        .concat(
          s,
          `;
  }
  
  .`
        )
        .concat(As, " .")
        .concat(
          As,
          ` {
    margin-right: 0 `
        )
        .concat(
          s,
          `;
  }
  
  body[`
        )
        .concat(
          Wr,
          `] {
    `
        )
        .concat(PT, ": ")
        .concat(
          f,
          `px;
  }
`
        )
    );
  },
  Xm = function () {
    var t = parseInt(document.body.getAttribute(Wr) || "0", 10);
    return isFinite(t) ? t : 0;
  },
  GT = function () {
    k.useEffect(function () {
      return (
        document.body.setAttribute(Wr, (Xm() + 1).toString()),
        function () {
          var t = Xm() - 1;
          t <= 0 ? document.body.removeAttribute(Wr) : document.body.setAttribute(Wr, t.toString());
        }
      );
    }, []);
  },
  YT = function (t) {
    var r = t.noRelative,
      i = t.noImportant,
      s = t.gapMode,
      l = s === void 0 ? "margin" : s;
    GT();
    var c = k.useMemo(
      function () {
        return HT(l);
      },
      [l]
    );
    return k.createElement(UT, { styles: $T(c, !r, l, i ? "" : "!important") });
  },
  uc = !1;
if (typeof window < "u")
  try {
    var ys = Object.defineProperty({}, "passive", {
      get: function () {
        return ((uc = !0), !0);
      },
    });
    (window.addEventListener("test", ys, ys), window.removeEventListener("test", ys, ys));
  } catch {
    uc = !1;
  }
var Rr = uc ? { passive: !1 } : !1,
  XT = function (t) {
    return t.tagName === "TEXTAREA";
  },
  Dv = function (t, r) {
    if (!(t instanceof Element)) return !1;
    var i = window.getComputedStyle(t);
    return i[r] !== "hidden" && !(i.overflowY === i.overflowX && !XT(t) && i[r] === "visible");
  },
  KT = function (t) {
    return Dv(t, "overflowY");
  },
  qT = function (t) {
    return Dv(t, "overflowX");
  },
  Km = function (t, r) {
    var i = r.ownerDocument,
      s = r;
    do {
      typeof ShadowRoot < "u" && s instanceof ShadowRoot && (s = s.host);
      var l = Ov(t, s);
      if (l) {
        var c = Fv(t, s),
          d = c[1],
          f = c[2];
        if (d > f) return !0;
      }
      s = s.parentNode;
    } while (s && s !== i.body);
    return !1;
  },
  QT = function (t) {
    var r = t.scrollTop,
      i = t.scrollHeight,
      s = t.clientHeight;
    return [r, i, s];
  },
  ZT = function (t) {
    var r = t.scrollLeft,
      i = t.scrollWidth,
      s = t.clientWidth;
    return [r, i, s];
  },
  Ov = function (t, r) {
    return t === "v" ? KT(r) : qT(r);
  },
  Fv = function (t, r) {
    return t === "v" ? QT(r) : ZT(r);
  },
  JT = function (t, r) {
    return t === "h" && r === "rtl" ? -1 : 1;
  },
  eP = function (t, r, i, s, l) {
    var c = JT(t, window.getComputedStyle(r).direction),
      d = c * s,
      f = i.target,
      h = r.contains(f),
      m = !1,
      y = d > 0,
      x = 0,
      w = 0;
    do {
      if (!f) break;
      var P = Fv(t, f),
        A = P[0],
        b = P[1],
        j = P[2],
        O = b - j - c * A;
      (A || O) && Ov(t, f) && ((x += O), (w += A));
      var I = f.parentNode;
      f = I && I.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? I.host : I;
    } while ((!h && f !== document.body) || (h && (r.contains(f) || r === f)));
    return (((y && Math.abs(x) < 1) || (!y && Math.abs(w) < 1)) && (m = !0), m);
  },
  vs = function (t) {
    return "changedTouches" in t
      ? [t.changedTouches[0].clientX, t.changedTouches[0].clientY]
      : [0, 0];
  },
  qm = function (t) {
    return [t.deltaX, t.deltaY];
  },
  Qm = function (t) {
    return t && "current" in t ? t.current : t;
  },
  tP = function (t, r) {
    return t[0] === r[0] && t[1] === r[1];
  },
  nP = function (t) {
    return `
  .block-interactivity-`
      .concat(
        t,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        t,
        ` {pointer-events: all;}
`
      );
  },
  rP = 0,
  Dr = [];
function iP(t) {
  var r = k.useRef([]),
    i = k.useRef([0, 0]),
    s = k.useRef(),
    l = k.useState(rP++)[0],
    c = k.useState(Rv)[0],
    d = k.useRef(t);
  (k.useEffect(
    function () {
      d.current = t;
    },
    [t]
  ),
    k.useEffect(
      function () {
        if (t.inert) {
          document.body.classList.add("block-interactivity-".concat(l));
          var b = M2([t.lockRef.current], (t.shards || []).map(Qm), !0).filter(Boolean);
          return (
            b.forEach(function (j) {
              return j.classList.add("allow-interactivity-".concat(l));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(l)),
                b.forEach(function (j) {
                  return j.classList.remove("allow-interactivity-".concat(l));
                }));
            }
          );
        }
      },
      [t.inert, t.lockRef.current, t.shards]
    ));
  var f = k.useCallback(function (b, j) {
      if (("touches" in b && b.touches.length === 2) || (b.type === "wheel" && b.ctrlKey))
        return !d.current.allowPinchZoom;
      var O = vs(b),
        I = i.current,
        F = "deltaX" in b ? b.deltaX : I[0] - O[0],
        W = "deltaY" in b ? b.deltaY : I[1] - O[1],
        $,
        ee = b.target,
        G = Math.abs(F) > Math.abs(W) ? "h" : "v";
      if ("touches" in b && G === "h" && ee.type === "range") return !1;
      var _ = window.getSelection(),
        ue = _ && _.anchorNode,
        ve = ue ? ue === ee || ue.contains(ee) : !1;
      if (ve) return !1;
      var ze = Km(G, ee);
      if (!ze) return !0;
      if ((ze ? ($ = G) : (($ = G === "v" ? "h" : "v"), (ze = Km(G, ee))), !ze)) return !1;
      if ((!s.current && "changedTouches" in b && (F || W) && (s.current = $), !$)) return !0;
      var Pe = s.current || $;
      return eP(Pe, j, b, Pe === "h" ? F : W);
    }, []),
    h = k.useCallback(function (b) {
      var j = b;
      if (!(!Dr.length || Dr[Dr.length - 1] !== c)) {
        var O = "deltaY" in j ? qm(j) : vs(j),
          I = r.current.filter(function ($) {
            return (
              $.name === j.type &&
              ($.target === j.target || j.target === $.shadowParent) &&
              tP($.delta, O)
            );
          })[0];
        if (I && I.should) {
          j.cancelable && j.preventDefault();
          return;
        }
        if (!I) {
          var F = (d.current.shards || [])
              .map(Qm)
              .filter(Boolean)
              .filter(function ($) {
                return $.contains(j.target);
              }),
            W = F.length > 0 ? f(j, F[0]) : !d.current.noIsolation;
          W && j.cancelable && j.preventDefault();
        }
      }
    }, []),
    m = k.useCallback(function (b, j, O, I) {
      var F = { name: b, delta: j, target: O, should: I, shadowParent: oP(O) };
      (r.current.push(F),
        setTimeout(function () {
          r.current = r.current.filter(function (W) {
            return W !== F;
          });
        }, 1));
    }, []),
    y = k.useCallback(function (b) {
      ((i.current = vs(b)), (s.current = void 0));
    }, []),
    x = k.useCallback(function (b) {
      m(b.type, qm(b), b.target, f(b, t.lockRef.current));
    }, []),
    w = k.useCallback(function (b) {
      m(b.type, vs(b), b.target, f(b, t.lockRef.current));
    }, []);
  k.useEffect(function () {
    return (
      Dr.push(c),
      t.setCallbacks({ onScrollCapture: x, onWheelCapture: x, onTouchMoveCapture: w }),
      document.addEventListener("wheel", h, Rr),
      document.addEventListener("touchmove", h, Rr),
      document.addEventListener("touchstart", y, Rr),
      function () {
        ((Dr = Dr.filter(function (b) {
          return b !== c;
        })),
          document.removeEventListener("wheel", h, Rr),
          document.removeEventListener("touchmove", h, Rr),
          document.removeEventListener("touchstart", y, Rr));
      }
    );
  }, []);
  var P = t.removeScrollBar,
    A = t.inert;
  return k.createElement(
    k.Fragment,
    null,
    A ? k.createElement(c, { styles: nP(l) }) : null,
    P ? k.createElement(YT, { noRelative: t.noRelative, gapMode: t.gapMode }) : null
  );
}
function oP(t) {
  for (var r = null; t !== null; )
    (t instanceof ShadowRoot && ((r = t.host), (t = t.host)), (t = t.parentNode));
  return r;
}
const sP = OT(Mv, iP);
var _v = k.forwardRef(function (t, r) {
  return k.createElement(Ks, $t({}, t, { ref: r, sideCar: sP }));
});
_v.classNames = Ks.classNames;
var aP = function (t) {
    if (typeof document > "u") return null;
    var r = Array.isArray(t) ? t[0] : t;
    return r.ownerDocument.body;
  },
  Or = new WeakMap(),
  xs = new WeakMap(),
  ws = {},
  _u = 0,
  Lv = function (t) {
    return t && (t.host || Lv(t.parentNode));
  },
  lP = function (t, r) {
    return r
      .map(function (i) {
        if (t.contains(i)) return i;
        var s = Lv(i);
        return s && t.contains(s)
          ? s
          : (console.error("aria-hidden", i, "in not contained inside", t, ". Doing nothing"),
            null);
      })
      .filter(function (i) {
        return !!i;
      });
  },
  uP = function (t, r, i, s) {
    var l = lP(r, Array.isArray(t) ? t : [t]);
    ws[i] || (ws[i] = new WeakMap());
    var c = ws[i],
      d = [],
      f = new Set(),
      h = new Set(l),
      m = function (x) {
        !x || f.has(x) || (f.add(x), m(x.parentNode));
      };
    l.forEach(m);
    var y = function (x) {
      !x ||
        h.has(x) ||
        Array.prototype.forEach.call(x.children, function (w) {
          if (f.has(w)) y(w);
          else
            try {
              var P = w.getAttribute(s),
                A = P !== null && P !== "false",
                b = (Or.get(w) || 0) + 1,
                j = (c.get(w) || 0) + 1;
              (Or.set(w, b),
                c.set(w, j),
                d.push(w),
                b === 1 && A && xs.set(w, !0),
                j === 1 && w.setAttribute(i, "true"),
                A || w.setAttribute(s, "true"));
            } catch (O) {
              console.error("aria-hidden: cannot operate on ", w, O);
            }
        });
    };
    return (
      y(r),
      f.clear(),
      _u++,
      function () {
        (d.forEach(function (x) {
          var w = Or.get(x) - 1,
            P = c.get(x) - 1;
          (Or.set(x, w),
            c.set(x, P),
            w || (xs.has(x) || x.removeAttribute(s), xs.delete(x)),
            P || x.removeAttribute(i));
        }),
          _u--,
          _u || ((Or = new WeakMap()), (Or = new WeakMap()), (xs = new WeakMap()), (ws = {})));
      }
    );
  },
  cP = function (t, r, i) {
    i === void 0 && (i = "data-aria-hidden");
    var s = Array.from(Array.isArray(t) ? t : [t]),
      l = aP(t);
    return l
      ? (s.push.apply(s, Array.from(l.querySelectorAll("[aria-live], script"))),
        uP(s, l, i, "aria-hidden"))
      : function () {
          return null;
        };
  };
function dP(t) {
  const r = fP(t),
    i = k.forwardRef((s, l) => {
      const { children: c, ...d } = s,
        f = k.Children.toArray(c),
        h = f.find(hP);
      if (h) {
        const m = h.props.children,
          y = f.map((x) =>
            x === h
              ? k.Children.count(m) > 1
                ? k.Children.only(null)
                : k.isValidElement(m)
                  ? m.props.children
                  : null
              : x
          );
        return v.jsx(r, {
          ...d,
          ref: l,
          children: k.isValidElement(m) ? k.cloneElement(m, void 0, y) : null,
        });
      }
      return v.jsx(r, { ...d, ref: l, children: c });
    });
  return ((i.displayName = `${t}.Slot`), i);
}
function fP(t) {
  const r = k.forwardRef((i, s) => {
    const { children: l, ...c } = i;
    if (k.isValidElement(l)) {
      const d = gP(l),
        f = mP(c, l.props);
      return (l.type !== k.Fragment && (f.ref = s ? Gs(s, d) : d), k.cloneElement(l, f));
    }
    return k.Children.count(l) > 1 ? k.Children.only(null) : null;
  });
  return ((r.displayName = `${t}.SlotClone`), r);
}
var pP = Symbol("radix.slottable");
function hP(t) {
  return (
    k.isValidElement(t) &&
    typeof t.type == "function" &&
    "__radixId" in t.type &&
    t.type.__radixId === pP
  );
}
function mP(t, r) {
  const i = { ...r };
  for (const s in r) {
    const l = t[s],
      c = r[s];
    /^on[A-Z]/.test(s)
      ? l && c
        ? (i[s] = (...f) => {
            const h = c(...f);
            return (l(...f), h);
          })
        : l && (i[s] = l)
      : s === "style"
        ? (i[s] = { ...l, ...c })
        : s === "className" && (i[s] = [l, c].filter(Boolean).join(" "));
  }
  return { ...t, ...i };
}
function gP(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get,
    i = r && "isReactWarning" in r && r.isReactWarning;
  return i
    ? t.ref
    : ((r = Object.getOwnPropertyDescriptor(t, "ref")?.get),
      (i = r && "isReactWarning" in r && r.isReactWarning),
      i ? t.props.ref : t.props.ref || t.ref);
}
var qs = "Dialog",
  [Iv] = H2(qs),
  [yP, It] = Iv(qs),
  Vv = (t) => {
    const {
        __scopeDialog: r,
        children: i,
        open: s,
        defaultOpen: l,
        onOpenChange: c,
        modal: d = !0,
      } = t,
      f = k.useRef(null),
      h = k.useRef(null),
      [m, y] = X2({ prop: s, defaultProp: l ?? !1, onChange: c, caller: qs });
    return v.jsx(yP, {
      scope: r,
      triggerRef: f,
      contentRef: h,
      contentId: ju(),
      titleId: ju(),
      descriptionId: ju(),
      open: m,
      onOpenChange: y,
      onOpenToggle: k.useCallback(() => y((x) => !x), [y]),
      modal: d,
      children: i,
    });
  };
Vv.displayName = qs;
var zv = "DialogTrigger",
  vP = k.forwardRef((t, r) => {
    const { __scopeDialog: i, ...s } = t,
      l = It(zv, i),
      c = ir(r, l.triggerRef);
    return v.jsx(sn.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": l.open,
      "aria-controls": l.contentId,
      "data-state": Kc(l.open),
      ...s,
      ref: c,
      onClick: Dn(t.onClick, l.onOpenToggle),
    });
  });
vP.displayName = zv;
var Yc = "DialogPortal",
  [xP, Bv] = Iv(Yc, { forceMount: void 0 }),
  Wv = (t) => {
    const { __scopeDialog: r, forceMount: i, children: s, container: l } = t,
      c = It(Yc, r);
    return v.jsx(xP, {
      scope: r,
      forceMount: i,
      children: k.Children.map(s, (d) =>
        v.jsx(Xs, {
          present: i || c.open,
          children: v.jsx(jv, { asChild: !0, container: l, children: d }),
        })
      ),
    });
  };
Wv.displayName = Yc;
var Ws = "DialogOverlay",
  Hv = k.forwardRef((t, r) => {
    const i = Bv(Ws, t.__scopeDialog),
      { forceMount: s = i.forceMount, ...l } = t,
      c = It(Ws, t.__scopeDialog);
    return c.modal
      ? v.jsx(Xs, { present: s || c.open, children: v.jsx(SP, { ...l, ref: r }) })
      : null;
  });
Hv.displayName = Ws;
var wP = dP("DialogOverlay.RemoveScroll"),
  SP = k.forwardRef((t, r) => {
    const { __scopeDialog: i, ...s } = t,
      l = It(Ws, i);
    return v.jsx(_v, {
      as: wP,
      allowPinchZoom: !0,
      shards: [l.contentRef],
      children: v.jsx(sn.div, {
        "data-state": Kc(l.open),
        ...s,
        ref: r,
        style: { pointerEvents: "auto", ...s.style },
      }),
    });
  }),
  rr = "DialogContent",
  Uv = k.forwardRef((t, r) => {
    const i = Bv(rr, t.__scopeDialog),
      { forceMount: s = i.forceMount, ...l } = t,
      c = It(rr, t.__scopeDialog);
    return v.jsx(Xs, {
      present: s || c.open,
      children: c.modal ? v.jsx(kP, { ...l, ref: r }) : v.jsx(CP, { ...l, ref: r }),
    });
  });
Uv.displayName = rr;
var kP = k.forwardRef((t, r) => {
    const i = It(rr, t.__scopeDialog),
      s = k.useRef(null),
      l = ir(r, i.contentRef, s);
    return (
      k.useEffect(() => {
        const c = s.current;
        if (c) return cP(c);
      }, []),
      v.jsx($v, {
        ...t,
        ref: l,
        trapFocus: i.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Dn(t.onCloseAutoFocus, (c) => {
          (c.preventDefault(), i.triggerRef.current?.focus());
        }),
        onPointerDownOutside: Dn(t.onPointerDownOutside, (c) => {
          const d = c.detail.originalEvent,
            f = d.button === 0 && d.ctrlKey === !0;
          (d.button === 2 || f) && c.preventDefault();
        }),
        onFocusOutside: Dn(t.onFocusOutside, (c) => c.preventDefault()),
      })
    );
  }),
  CP = k.forwardRef((t, r) => {
    const i = It(rr, t.__scopeDialog),
      s = k.useRef(!1),
      l = k.useRef(!1);
    return v.jsx($v, {
      ...t,
      ref: r,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (c) => {
        (t.onCloseAutoFocus?.(c),
          c.defaultPrevented || (s.current || i.triggerRef.current?.focus(), c.preventDefault()),
          (s.current = !1),
          (l.current = !1));
      },
      onInteractOutside: (c) => {
        (t.onInteractOutside?.(c),
          c.defaultPrevented ||
            ((s.current = !0), c.detail.originalEvent.type === "pointerdown" && (l.current = !0)));
        const d = c.target;
        (i.triggerRef.current?.contains(d) && c.preventDefault(),
          c.detail.originalEvent.type === "focusin" && l.current && c.preventDefault());
      },
    });
  }),
  $v = k.forwardRef((t, r) => {
    const { __scopeDialog: i, trapFocus: s, onOpenAutoFocus: l, onCloseAutoFocus: c, ...d } = t,
      f = It(rr, i),
      h = k.useRef(null),
      m = ir(r, h);
    return (
      ET(),
      v.jsxs(v.Fragment, {
        children: [
          v.jsx(Pv, {
            asChild: !0,
            loop: !0,
            trapped: s,
            onMountAutoFocus: l,
            onUnmountAutoFocus: c,
            children: v.jsx(Ev, {
              role: "dialog",
              id: f.contentId,
              "aria-describedby": f.descriptionId,
              "aria-labelledby": f.titleId,
              "data-state": Kc(f.open),
              ...d,
              ref: m,
              onDismiss: () => f.onOpenChange(!1),
            }),
          }),
          v.jsxs(v.Fragment, {
            children: [
              v.jsx(bP, { titleId: f.titleId }),
              v.jsx(TP, { contentRef: h, descriptionId: f.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  Xc = "DialogTitle",
  Gv = k.forwardRef((t, r) => {
    const { __scopeDialog: i, ...s } = t,
      l = It(Xc, i);
    return v.jsx(sn.h2, { id: l.titleId, ...s, ref: r });
  });
Gv.displayName = Xc;
var Yv = "DialogDescription",
  Xv = k.forwardRef((t, r) => {
    const { __scopeDialog: i, ...s } = t,
      l = It(Yv, i);
    return v.jsx(sn.p, { id: l.descriptionId, ...s, ref: r });
  });
Xv.displayName = Yv;
var Kv = "DialogClose",
  qv = k.forwardRef((t, r) => {
    const { __scopeDialog: i, ...s } = t,
      l = It(Kv, i);
    return v.jsx(sn.button, {
      type: "button",
      ...s,
      ref: r,
      onClick: Dn(t.onClick, () => l.onOpenChange(!1)),
    });
  });
qv.displayName = Kv;
function Kc(t) {
  return t ? "open" : "closed";
}
var Qv = "DialogTitleWarning",
  [rN, Zv] = W2(Qv, { contentName: rr, titleName: Xc, docsSlug: "dialog" }),
  bP = ({ titleId: t }) => {
    const r = Zv(Qv),
      i = `\`${r.contentName}\` requires a \`${r.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${r.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${r.docsSlug}`;
    return (
      k.useEffect(() => {
        t && (document.getElementById(t) || console.error(i));
      }, [i, t]),
      null
    );
  },
  EP = "DialogDescriptionWarning",
  TP = ({ contentRef: t, descriptionId: r }) => {
    const s = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Zv(EP).contentName}}.`;
    return (
      k.useEffect(() => {
        const l = t.current?.getAttribute("aria-describedby");
        r && l && (document.getElementById(r) || console.warn(s));
      }, [s, t, r]),
      null
    );
  },
  PP = Vv,
  NP = Wv,
  jP = Hv,
  AP = Uv,
  MP = Gv,
  RP = Xv,
  DP = qv;
function OP({ ...t }) {
  return v.jsx(PP, { "data-slot": "dialog", ...t });
}
function FP({ ...t }) {
  return v.jsx(NP, { "data-slot": "dialog-portal", ...t });
}
function _P({ className: t, ...r }) {
  return v.jsx(jP, {
    "data-slot": "dialog-overlay",
    className: sr(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
      t
    ),
    ...r,
  });
}
function LP({ className: t, children: r, ...i }) {
  return v.jsxs(FP, {
    "data-slot": "dialog-portal",
    children: [
      v.jsx(_P, {}),
      v.jsxs(AP, {
        "data-slot": "dialog-content",
        className: sr(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          t
        ),
        ...i,
        children: [
          r,
          v.jsxs(DP, {
            className:
              "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            children: [v.jsx(LE, {}), v.jsx("span", { className: "sr-only", children: "Close" })],
          }),
        ],
      }),
    ],
  });
}
function IP({ className: t, ...r }) {
  return v.jsx(MP, {
    "data-slot": "dialog-title",
    className: sr("text-lg leading-none font-semibold", t),
    ...r,
  });
}
function VP({ className: t, ...r }) {
  return v.jsx(RP, {
    "data-slot": "dialog-description",
    className: sr("text-muted-foreground text-sm", t),
    ...r,
  });
}
const zP = [
  {
    title: "Supermarket Campaign",
    category: "Promotional Design",
    image:
      "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Festival Promo",
    category: "Cultural Design",
    image:
      "https://images.unsplash.com/photo-1553443236-e031f8bb39ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMHBvc3RlciUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxOTI4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Brand Identity",
    category: "Visual System",
    image:
      "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc2MzEwMDQ3OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Digital Experience",
    category: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1676793894040-b6dd72276620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwdWl8ZW58MXx8fHwxNzYzMTkyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Social Media Kit",
    category: "Digital Creatives",
    image:
      "https://images.unsplash.com/photo-1611926653670-1ea63b810d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxOTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Package Design",
    category: "Product Design",
    image:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYzMTkyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Marketing Collateral",
    category: "Print Design",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBtYXRlcmlhbHxlbnwxfHx8fDE3NjMxOTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Event Branding",
    category: "Brand Experience",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGJyYW5kaW5nfGVufDF8fHx8MTc2MzE5Mjg0OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];
function BP() {
  const [t, r] = k.useState(zP),
    [i, s] = k.useState(null),
    [l, c] = k.useState(null);
  return (
    k.useEffect(() => {
      let d = !1;
      return (
        _2().then((f) => {
          if (d || !Array.isArray(f) || !f.length) return;
          const h = f?.[0]?.fields ?? null,
            m = f
              .map((y) => {
                const x = y?.fields ?? {},
                  w = x?.image,
                  P = typeof w == "string" ? w : (Gc(w) ?? null);
                return !x?.title || !x?.category || !P
                  ? null
                  : { title: String(x.title), category: String(x.category), image: P };
              })
              .filter(Boolean);
          !d && m.length && (s(h), r(m));
        }),
        () => {
          d = !0;
        }
      );
    }, []),
    v.jsxs(v.Fragment, {
      children: [
        v.jsx("section", {
          className: "py-28 px-6 bg-white",
          children: v.jsxs("div", {
            className: "max-w-7xl mx-auto",
            children: [
              v.jsxs(re.div, {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: !0 },
                transition: { duration: 0.7 },
                className: "text-center mb-20",
                children: [
                  v.jsx(re.div, {
                    initial: { opacity: 0, scale: 0.9 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: !0 },
                    transition: { duration: 0.5 },
                    className:
                      "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
                    children: v.jsx("span", {
                      className: "text-sm",
                      children: i?.badgeText ?? "Featured Work",
                    }),
                  }),
                  v.jsx("h2", {
                    className: "text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight",
                    children: i?.title ?? "Excellence in Every Project",
                  }),
                  v.jsx("p", {
                    className: "text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed",
                    children: i?.subtitle ?? "Crafted with precision, delivered with speed",
                  }),
                ],
              }),
              v.jsx("div", {
                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
                children: t.map((d, f) =>
                  v.jsx(
                    re.div,
                    {
                      initial: { opacity: 0, scale: 0.9 },
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: { once: !0 },
                      transition: { duration: 0.5, delay: f * 0.05 },
                      whileHover: { y: -8, scale: 1.02 },
                      className: "group cursor-hover",
                      children: v.jsxs("div", {
                        className:
                          "relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl transition-all duration-500 refraction liquid-ripple edge-glow-hover",
                        children: [
                          v.jsx("div", {
                            className: "absolute inset-0 pointer-events-none z-20 micro-liquid",
                            children: v.jsx("div", {
                              className:
                                "absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50",
                            }),
                          }),
                          v.jsxs("div", {
                            className: "relative aspect-square overflow-hidden",
                            children: [
                              v.jsx(Bs, {
                                src: d.image,
                                alt: d.title,
                                className:
                                  "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                              }),
                              v.jsxs(re.div, {
                                className: "absolute inset-0 liquid-glass-dark flex items-end p-5",
                                initial: { opacity: 0 },
                                whileHover: { opacity: 1 },
                                transition: { duration: 0.4 },
                                children: [
                                  v.jsxs("div", {
                                    className: "text-white relative z-10 w-full",
                                    children: [
                                      v.jsx("p", {
                                        className: "text-xs text-gray-300 mb-1",
                                        children: d.category,
                                      }),
                                      v.jsx("p", { className: "font-medium", children: d.title }),
                                    ],
                                  }),
                                  v.jsx("div", {
                                    className:
                                      "absolute inset-0 flex items-center justify-center pointer-events-none",
                                    children: v.jsx("button", {
                                      onClick: () => c(d),
                                      className:
                                        "pointer-events-auto px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/20 hover:scale-105 transition-all duration-300",
                                      children: "View",
                                    }),
                                  }),
                                ],
                              }),
                              v.jsx(re.div, {
                                className:
                                  "absolute top-3 right-3 w-9 h-9 liquid-glass-card rounded-full flex items-center justify-center edge-glow",
                                initial: { opacity: 0, scale: 0.8 },
                                whileHover: { opacity: 1, scale: 1, rotate: 45 },
                                transition: { duration: 0.3 },
                                children: v.jsx(iE, {
                                  className: "w-4 h-4 text-white drop-shadow-md",
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    },
                    f
                  )
                ),
              }),
            ],
          }),
        }),
        v.jsx(OP, {
          open: !!l,
          onOpenChange: (d) => !d && c(null),
          children: v.jsxs(LP, {
            className:
              "max-w-5xl bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl p-0 overflow-hidden rounded-2xl sm:rounded-3xl border",
            children: [
              v.jsx(IP, { className: "sr-only", children: l?.title }),
              v.jsx(VP, { className: "sr-only", children: l?.category }),
              l &&
                v.jsxs("div", {
                  className:
                    "relative w-full h-full max-h-[85vh] flex items-center justify-center bg-black/40",
                  children: [
                    v.jsx(Bs, {
                      src: l.image,
                      alt: l.title,
                      className: "w-full h-full max-h-[85vh] object-contain",
                    }),
                    v.jsx("div", {
                      className: "absolute bottom-6 left-6 right-16 pointer-events-none",
                      children: v.jsxs("div", {
                        className:
                          "inline-block liquid-glass-card backdrop-blur-md bg-black/30 border border-white/10 px-6 py-3 rounded-2xl text-white shadow-lg",
                        children: [
                          v.jsx("h3", {
                            className: "text-xl font-semibold tracking-tight",
                            children: l.title,
                          }),
                          v.jsx("p", {
                            className: "text-gray-300 text-sm mt-0.5",
                            children: l.category,
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
            ],
          }),
        }),
      ],
    })
  );
}
const WP = [
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=1",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=2",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=3",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=4",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=5",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=6",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=7",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=8",
];
function HP() {
  const [t, r] = k.useState(WP),
    [i, s] = k.useState(null);
  return (
    k.useEffect(() => {
      let l = !1;
      return (
        V2()
          .then((c) => {
            if (l) return;
            const d = c?.[0]?.fields ?? null;
            if (!d) return;
            s(d);
            const f = d?.flyers,
              h = Array.isArray(f)
                ? f.map((m) => (typeof m == "string" ? m : Gc(m))).filter(Boolean)
                : [];
            h.length > 0 && r(h);
          })
          .catch((c) => {
            console.error("Error fetching supermarket flyers:", c);
          }),
        () => {
          l = !0;
        }
      );
    }, []),
    v.jsxs("section", {
      className: "py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden",
      children: [
        v.jsx("div", {
          className:
            "absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full blur-3xl",
        }),
        v.jsxs("div", {
          className: "max-w-7xl mx-auto relative z-10",
          children: [
            v.jsxs(re.div, {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { duration: 0.7 },
              className: "text-center mb-20",
              children: [
                v.jsx(re.div, {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: !0 },
                  transition: { duration: 0.5 },
                  className:
                    "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
                  children: v.jsx("span", {
                    className: "text-sm",
                    children: i?.badgeText ?? "Core Specialty",
                  }),
                }),
                v.jsxs("h2", {
                  className: "text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight",
                  children: [
                    i?.title ?? "Supermarket Campaigns",
                    v.jsx("br", {}),
                    v.jsx("span", {
                      className:
                        "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent",
                      children: i?.highlight ?? "That Deliver Results",
                    }),
                  ],
                }),
                v.jsx("p", {
                  className: "text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed",
                  children:
                    i?.subtitle ??
                    "Professional promotional designs optimized for maximum impact across digital and print platforms.",
                }),
              ],
            }),
            v.jsx(re.div, {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { duration: 0.7, delay: 0.2 },
              className: "flex flex-wrap justify-center gap-6 mb-20",
              children: [
                { icon: sE, label: "Premium Quality" },
                { icon: sv, label: "High Impact" },
                { icon: fE, label: "Rapid Delivery" },
              ].map((l, c) => {
                const d = l.icon;
                return v.jsxs(
                  re.div,
                  {
                    initial: { opacity: 0, scale: 0.8 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: !0 },
                    transition: { duration: 0.5, delay: 0.3 + c * 0.1 },
                    whileHover: { scale: 1.05, y: -3 },
                    className:
                      "flex items-center gap-3 liquid-glass-card px-7 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all cursor-hover edge-glow-hover refraction",
                    children: [
                      v.jsx("div", {
                        className:
                          "w-11 h-11 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-lg",
                        children: v.jsx(d, { className: "w-5 h-5 text-white" }),
                      }),
                      v.jsx("span", { className: "font-medium", children: l.label }),
                    ],
                  },
                  c
                );
              }),
            }),
            v.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14",
              children: t.map((l, c) =>
                v.jsx(
                  re.div,
                  {
                    initial: { opacity: 0, scale: 0.9 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: !0 },
                    transition: { duration: 0.5, delay: (c + 1) * 0.05 },
                    whileHover: { y: -8, scale: 1.02 },
                    className: "group cursor-hover",
                    children: v.jsxs("div", {
                      className:
                        "relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl transition-all duration-500 refraction liquid-ripple edge-glow-hover",
                      children: [
                        v.jsx("div", {
                          className: "absolute inset-0 pointer-events-none z-20 micro-liquid",
                          children: v.jsx("div", {
                            className:
                              "absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50",
                          }),
                        }),
                        v.jsxs("div", {
                          className: "relative aspect-[3/4] overflow-hidden",
                          children: [
                            v.jsx(Bs, {
                              src: l,
                              alt: `Supermarket Campaign ${c + 1}`,
                              className:
                                "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                            }),
                            v.jsx(re.div, {
                              className: "absolute inset-0 liquid-glass-dark",
                              initial: { opacity: 0 },
                              whileHover: { opacity: 1 },
                              transition: { duration: 0.4 },
                            }),
                          ],
                        }),
                      ],
                    }),
                  },
                  c
                )
              ),
            }),
            v.jsx(re.div, {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { duration: 0.7 },
              className: "text-center",
              children: v.jsx(re.div, {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.98 },
                children: v.jsx(Gi, {
                  size: "lg",
                  className:
                    "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity px-10 py-7 text-lg rounded-full shadow-lg shadow-[#A259FF]/25 cursor-hover",
                  children: "View Full Portfolio",
                }),
              }),
            }),
          ],
        }),
      ],
    })
  );
}
const UP = [
  {
    icon: gE,
    title: "Supermarket Campaigns",
    description: "Eye-catching promotional materials designed to captivate and convert.",
  },
  {
    icon: TE,
    title: "Brand Design",
    description: "Complete visual identities that make lasting impressions.",
  },
  {
    icon: OE,
    title: "Digital Creatives",
    description: "Engaging content crafted for maximum audience impact.",
  },
  {
    icon: hE,
    title: "Tech Solutions",
    description: "Reliable technical support for seamless operations.",
  },
  {
    icon: ov,
    title: "Future Services",
    description: "Forward-thinking solutions for tomorrow's challenges.",
  },
  { icon: NE, title: "UI/UX Design", description: "Beautiful, intuitive experiences users love." },
];
function $P() {
  const [t, r] = k.useState([]);
  k.useEffect(() => {
    let c = !1;
    return (
      F2().then((d) => {
        !c && Array.isArray(d) && r(d);
      }),
      () => {
        c = !0;
      }
    );
  }, []);
  const i = t?.[0]?.fields?.sectionBadge ?? "Complete Ecosystem",
    s = t?.[0]?.fields?.sectionTitle ?? "All in One Cirqle",
    l = t?.[0]?.fields?.sectionSubtitle ?? "A complete suite of services, seamlessly connected";
  return v.jsx("section", {
    id: "services",
    className: "py-28 px-6 bg-white",
    children: v.jsxs("div", {
      className: "max-w-7xl mx-auto",
      children: [
        v.jsxs(re.div, {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          transition: { duration: 0.7 },
          className: "text-center mb-20",
          children: [
            v.jsx(re.div, {
              initial: { opacity: 0, scale: 0.9 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: !0 },
              transition: { duration: 0.5 },
              className:
                "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
              children: v.jsx("span", { className: "text-sm", children: i }),
            }),
            v.jsx("h2", {
              className: "text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight",
              children: s,
            }),
            v.jsx("p", {
              className: "text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed",
              children: l,
            }),
          ],
        }),
        v.jsx("div", {
          className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
          children: UP.map((c, d) => {
            const f = c.icon,
              h = t?.[d]?.fields ?? null;
            return v.jsx(
              re.div,
              {
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: !0 },
                transition: { duration: 0.6, delay: d * 0.1 },
                whileHover: { y: -6, scale: 1.02 },
                className: "group cursor-hover",
                children: v.jsxs("div", {
                  className:
                    "relative h-full liquid-glass-card p-9 rounded-3xl hover:shadow-2xl transition-all duration-500 overflow-hidden refraction liquid-ripple edge-glow-hover",
                  children: [
                    v.jsx("div", {
                      className: "absolute inset-0 pointer-events-none z-10 micro-liquid",
                      children: v.jsx("div", {
                        className:
                          "absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-40",
                      }),
                    }),
                    v.jsx("div", {
                      className:
                        "absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-r from-[#A259FF]/20 to-[#4CC3FF]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400",
                    }),
                    v.jsxs("div", {
                      className: "relative z-10",
                      children: [
                        v.jsx(re.div, {
                          className:
                            "w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-xl edge-glow",
                          whileHover: { rotate: 5, scale: 1.1 },
                          transition: { duration: 0.4, type: "spring" },
                          children: v.jsx(f, { className: "w-8 h-8 text-white" }),
                        }),
                        v.jsx("h3", {
                          className: "text-2xl mb-3 tracking-tight",
                          children: h?.title ?? c.title,
                        }),
                        v.jsx("p", {
                          className: "text-gray-600 leading-relaxed",
                          children: h?.description ?? c.description,
                        }),
                      ],
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
  });
}
const GP = [
  {
    icon: cE,
    title: "Premium Quality",
    description:
      "Every project crafted with meticulous attention to detail and professional excellence.",
  },
  {
    icon: vE,
    title: "Seamless Integration",
    description: "All services work together harmoniously to deliver cohesive, impactful results.",
  },
  {
    icon: sv,
    title: "Rapid Execution",
    description: "Fast turnaround times without compromising on quality or precision.",
  },
];
function YP() {
  return v.jsxs("section", {
    className: "py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden",
    children: [
      v.jsx(re.div, {
        className:
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gray-200 rounded-full",
        animate: { rotate: 360 },
        transition: { duration: 60, repeat: 1 / 0, ease: "linear" },
        style: { opacity: 0.2 },
      }),
      v.jsx(re.div, {
        className:
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gray-200 rounded-full",
        animate: { rotate: -360 },
        transition: { duration: 45, repeat: 1 / 0, ease: "linear" },
        style: { opacity: 0.2 },
      }),
      v.jsx(re.div, {
        className:
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gray-200 rounded-full",
        animate: { rotate: 360 },
        transition: { duration: 30, repeat: 1 / 0, ease: "linear" },
        style: { opacity: 0.2 },
      }),
      v.jsxs("div", {
        className: "max-w-7xl mx-auto relative z-10",
        children: [
          v.jsxs(re.div, {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.7 },
            className: "text-center mb-20",
            children: [
              v.jsx(re.div, {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: !0 },
                transition: { duration: 0.5 },
                className:
                  "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
                children: v.jsx("span", { className: "text-sm", children: "Why Choose Us" }),
              }),
              v.jsx("h2", {
                className: "text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight",
                children: "The Cirqle Difference",
              }),
              v.jsx("p", {
                className: "text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed",
                children: "Experience excellence at every touchpoint",
              }),
            ],
          }),
          v.jsx("div", {
            className: "grid md:grid-cols-3 gap-10 max-w-6xl mx-auto",
            children: GP.map((t, r) => {
              const i = t.icon;
              return v.jsx(
                re.div,
                {
                  initial: { opacity: 0, scale: 0.8 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: !0 },
                  transition: { duration: 0.6, delay: r * 0.15 },
                  whileHover: { scale: 1.05, rotate: 2 },
                  className: "cursor-hover",
                  children: v.jsxs("div", {
                    className:
                      "liquid-glass-card p-8 rounded-3xl text-center shadow-xl hover:shadow-2xl transition-all duration-500 refraction edge-glow-hover",
                    children: [
                      v.jsx("div", {
                        className: "relative inline-block",
                        children: v.jsx(re.div, {
                          className:
                            "w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-xl edge-glow",
                          whileHover: { rotate: 360 },
                          transition: { duration: 0.6 },
                          children: v.jsx(i, { className: "w-10 h-10 text-white" }),
                        }),
                      }),
                      v.jsx("h3", { className: "text-2xl mb-3", children: t.title }),
                      v.jsx("p", {
                        className: "text-gray-600 leading-relaxed",
                        children: t.description,
                      }),
                    ],
                  }),
                },
                r
              );
            }),
          }),
        ],
      }),
    ],
  });
}
const XP = [
  "Professional design team",
  "Rapid turnaround",
  "Premium quality standards",
  "Modern technology",
];
function KP() {
  const [t, r] = k.useState(null);
  k.useEffect(() => {
    let l = !1;
    return (
      L2().then((c) => {
        const d = c?.[0]?.fields ?? null;
        !l && d && r(d);
      }),
      () => {
        l = !0;
      }
    );
  }, []);
  const i = t?.image && typeof t.image == "string" ? t.image : Gc(t?.image),
    s = Array.isArray(t?.strengths)
      ? t.strengths.map((l) => (typeof l == "string" ? l : null)).filter(Boolean)
      : null;
  return v.jsx("section", {
    id: "about",
    className: "py-28 px-6 bg-white",
    children: v.jsx("div", {
      className: "max-w-7xl mx-auto",
      children: v.jsxs("div", {
        className: "grid lg:grid-cols-2 gap-20 items-center",
        children: [
          v.jsxs(re.div, {
            initial: { opacity: 0, x: -50 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.8 },
            className: "relative order-2 lg:order-1",
            children: [
              v.jsx("div", {
                className:
                  "absolute -inset-6 bg-gradient-to-r from-[#A259FF]/15 to-[#4CC3FF]/15 rounded-3xl blur-3xl",
              }),
              v.jsxs(re.div, {
                className:
                  "relative rounded-3xl overflow-hidden shadow-2xl liquid-glass-thumbnail edge-glow-hover refraction",
                whileHover: { scale: 1.02 },
                transition: { duration: 0.4 },
                children: [
                  v.jsx("div", {
                    className: "absolute inset-0 pointer-events-none z-20 micro-liquid",
                    children: v.jsx("div", {
                      className:
                        "absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50",
                    }),
                  }),
                  v.jsx(Bs, {
                    src:
                      i ??
                      "https://images.unsplash.com/photo-1510832758362-af875829efcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxNDU2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
                    alt: t?.imageAlt ?? "Cirqle Creative Space",
                    className: "w-full aspect-square object-cover",
                  }),
                ],
              }),
            ],
          }),
          v.jsxs(re.div, {
            initial: { opacity: 0, x: 50 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.8 },
            className: "order-1 lg:order-2",
            children: [
              v.jsx(re.div, {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: !0 },
                transition: { duration: 0.5 },
                className:
                  "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
                children: v.jsx("span", {
                  className: "text-sm",
                  children: t?.badgeText ?? "About Cirqle",
                }),
              }),
              v.jsxs("h2", {
                className: "text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight",
                children: [
                  t?.headingPrefix ?? "Built on",
                  v.jsxs("span", {
                    className:
                      "bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent",
                    children: [" ", t?.headingHighlight ?? "Excellence"],
                  }),
                ],
              }),
              v.jsx("p", {
                className: "text-xl text-gray-600 mb-6 leading-relaxed",
                children:
                  t?.paragraph1 ??
                  "Cirqle brings together design expertise and modern technology to deliver exceptional results. Every project is crafted with precision and delivered with speed.",
              }),
              v.jsx("p", {
                className: "text-lg text-gray-600 mb-10 leading-relaxed",
                children:
                  t?.paragraph2 ??
                  "Specializing in supermarket campaigns while offering comprehensive creative services — from branding to digital solutions. We focus on quality, professionalism, and delivering results that exceed expectations.",
              }),
              v.jsx("div", {
                className: "space-y-5",
                children: (s?.length ? s : XP).map((l, c) =>
                  v.jsxs(
                    re.div,
                    {
                      initial: { opacity: 0, x: 20 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: !0 },
                      transition: { duration: 0.5, delay: c * 0.1 },
                      whileHover: { x: 5 },
                      className: "flex items-center gap-4",
                      children: [
                        v.jsx("div", {
                          className:
                            "w-7 h-7 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center flex-shrink-0 shadow-md",
                          children: v.jsx(lE, { className: "w-4 h-4 text-white" }),
                        }),
                        v.jsx("span", { className: "text-lg", children: l }),
                      ],
                    },
                    c
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
function Lu({ className: t, type: r, ...i }) {
  return v.jsx("input", {
    type: r,
    "data-slot": "input",
    className: sr(
      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      t
    ),
    ...i,
  });
}
function qP({ className: t, ...r }) {
  return v.jsx("textarea", {
    "data-slot": "textarea",
    className: sr(
      "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      t
    ),
    ...r,
  });
}
function QP() {
  const [t, r] = k.useState(null);
  k.useEffect(() => {
    let c = !1;
    return (
      I2().then((d) => {
        const f = d?.[0]?.fields ?? null;
        !c && f && r(f);
      }),
      () => {
        c = !0;
      }
    );
  }, []);
  const i = k.useMemo(() => t?.whatsappNumber ?? t?.whatsapp ?? "+91 8129 5343 77", [t]),
    s = k.useMemo(() => String(i).replace(/[^\d]/g, ""), [i]),
    l = () => {
      window.open(`https://wa.me/${s}`, "_blank");
    };
  return v.jsxs("section", {
    id: "contact",
    className: "py-28 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden",
    children: [
      v.jsx(re.div, {
        className:
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full blur-3xl",
        animate: { scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] },
        transition: { duration: 8, repeat: 1 / 0, ease: "easeInOut" },
      }),
      v.jsxs("div", {
        className: "max-w-4xl mx-auto relative z-10",
        children: [
          v.jsxs(re.div, {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.7 },
            className: "text-center mb-16",
            children: [
              v.jsx(re.div, {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: !0 },
                transition: { duration: 0.5 },
                className:
                  "inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20",
                children: v.jsx("span", {
                  className: "text-sm",
                  children: t?.badgeText ?? "Get in Touch",
                }),
              }),
              v.jsx("h2", {
                className: "text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight",
                children: t?.title ?? "Start Your Project",
              }),
              v.jsx("p", {
                className: "text-xl text-gray-600 leading-relaxed",
                children: t?.subtitle ?? "Let's create something exceptional together",
              }),
            ],
          }),
          v.jsxs(re.div, {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.7, delay: 0.2 },
            className:
              "liquid-glass-card rounded-3xl shadow-2xl p-10 md:p-14 relative overflow-hidden refraction edge-glow-hover",
            children: [
              v.jsx("div", {
                className: "absolute inset-0 pointer-events-none z-10 micro-liquid",
                children: v.jsx("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-50",
                }),
              }),
              v.jsxs("form", {
                action: "https://formspree.io/f/xdawkvje",
                method: "POST",
                className: "space-y-7 relative z-10",
                children: [
                  v.jsx("input", { type: "hidden", name: "_subject", value: "New Cirqle Inquiry" }),
                  v.jsx("input", { type: "text", name: "_gotcha", style: { display: "none" } }),
                  v.jsxs("div", {
                    className: "grid md:grid-cols-2 gap-7",
                    children: [
                      v.jsxs("div", {
                        children: [
                          v.jsx("label", {
                            htmlFor: "name",
                            className: "block mb-3 text-sm",
                            children: "Full Name",
                          }),
                          v.jsx(Lu, {
                            id: "name",
                            type: "text",
                            name: "name",
                            placeholder: "Your name",
                            className:
                              "rounded-2xl border-gray-200 focus:border-[#A259FF] h-14 transition-all liquid-glass-card",
                          }),
                        ],
                      }),
                      v.jsxs("div", {
                        children: [
                          v.jsx("label", {
                            htmlFor: "whatsapp",
                            className: "block mb-3 text-sm",
                            children: "WhatsApp Number",
                          }),
                          v.jsx(Lu, {
                            id: "whatsapp",
                            type: "tel",
                            name: "whatsapp",
                            placeholder: "+91 8129 5343 77",
                            className:
                              "rounded-2xl border-gray-200 focus:border-[#A259FF] h-14 transition-all liquid-glass-card",
                          }),
                        ],
                      }),
                    ],
                  }),
                  v.jsxs("div", {
                    children: [
                      v.jsx("label", {
                        htmlFor: "email",
                        className: "block mb-3 text-sm",
                        children: "Email Address",
                      }),
                      v.jsx(Lu, {
                        id: "email",
                        type: "email",
                        name: "email",
                        placeholder: "your@email.com",
                        className:
                          "rounded-2xl border-gray-200 focus:border-[#A259FF] h-14 transition-all liquid-glass-card",
                      }),
                    ],
                  }),
                  v.jsxs("div", {
                    children: [
                      v.jsx("label", {
                        htmlFor: "requirement",
                        className: "block mb-3 text-sm",
                        children: "Project Details",
                      }),
                      v.jsx(qP, {
                        id: "requirement",
                        name: "message",
                        placeholder: "Tell us about your project...",
                        rows: 6,
                        className:
                          "rounded-2xl border-gray-200 focus:border-[#A259FF] resize-none transition-all liquid-glass-card",
                      }),
                    ],
                  }),
                  v.jsxs("div", {
                    className: "flex flex-col sm:flex-row gap-4 pt-4",
                    children: [
                      v.jsx(re.div, {
                        className: "flex-1",
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 },
                        children: v.jsxs(Gi, {
                          type: "submit",
                          size: "lg",
                          className:
                            "w-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity py-7 rounded-full shadow-xl shadow-[#A259FF]/30 cursor-hover edge-glow",
                          children: [v.jsx(RE, { className: "mr-2 w-5 h-5" }), "Send Inquiry"],
                        }),
                      }),
                      v.jsx(re.div, {
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 },
                        children: v.jsxs(Gi, {
                          type: "button",
                          size: "lg",
                          variant: "outline",
                          onClick: l,
                          className:
                            "w-full sm:w-auto border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all py-7 rounded-full cursor-hover liquid-glass-card",
                          children: [v.jsx(bE, { className: "mr-2 w-5 h-5" }), "WhatsApp"],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function ZP() {
  const t = new Date().getFullYear();
  return v.jsx("footer", {
    className: "bg-black text-white py-20 px-6",
    children: v.jsxs("div", {
      className: "max-w-7xl mx-auto",
      children: [
        v.jsxs("div", {
          className: "grid md:grid-cols-4 gap-14 mb-16",
          children: [
            v.jsxs("div", {
              className: "md:col-span-1",
              children: [
                v.jsx("div", {
                  className: "mb-5",
                  children: v.jsx("img", {
                    src: zy,
                    alt: "Cirqle Design",
                    className: "h-10 w-auto brightness-0 invert",
                  }),
                }),
                v.jsx("p", {
                  className: "text-gray-400 text-sm leading-relaxed",
                  children:
                    "Premium design ecosystem delivering excellence across all creative services.",
                }),
              ],
            }),
            v.jsxs("div", {
              children: [
                v.jsx("h3", { className: "text-lg mb-6", children: "Services" }),
                v.jsxs("ul", {
                  className: "space-y-3 text-sm text-gray-400",
                  children: [
                    v.jsx("li", {
                      children: v.jsx("a", {
                        href: "#services",
                        className:
                          "hover:text-white transition-colors hover:translate-x-1 inline-block",
                        children: "Supermarket Campaigns",
                      }),
                    }),
                    v.jsx("li", {
                      children: v.jsx("a", {
                        href: "#services",
                        className:
                          "hover:text-white transition-colors hover:translate-x-1 inline-block",
                        children: "Brand Design",
                      }),
                    }),
                    v.jsx("li", {
                      children: v.jsx("a", {
                        href: "#services",
                        className:
                          "hover:text-white transition-colors hover:translate-x-1 inline-block",
                        children: "Digital Solutions",
                      }),
                    }),
                    v.jsx("li", {
                      children: v.jsx("a", {
                        href: "#services",
                        className:
                          "hover:text-white transition-colors hover:translate-x-1 inline-block",
                        children: "UI/UX Design",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            v.jsxs("div", {
              children: [
                v.jsx("h3", { className: "text-lg mb-6", children: "Company" }),
                v.jsxs("ul", {
                  className: "space-y-3 text-sm text-gray-400",
                  children: [
                    v.jsx("li", {
                      children: v.jsx("a", {
                        href: "#about",
                        className:
                          "hover:text-white transition-colors hover:translate-x-1 inline-block",
                        children: "About Cirqle",
                      }),
                    }),
                    v.jsx("li", {
                      children: v.jsx("a", {
                        href: "#portfolio",
                        className:
                          "hover:text-white transition-colors hover:translate-x-1 inline-block",
                        children: "Portfolio",
                      }),
                    }),
                    v.jsx("li", {
                      children: v.jsx("a", {
                        href: "#ecosystem",
                        className:
                          "hover:text-white transition-colors hover:translate-x-1 inline-block",
                        children: "Ecosystem",
                      }),
                    }),
                    v.jsx("li", {
                      children: v.jsx("a", {
                        href: "#contact",
                        className:
                          "hover:text-white transition-colors hover:translate-x-1 inline-block",
                        children: "Contact",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            v.jsxs("div", {
              children: [
                v.jsx("h3", { className: "text-lg mb-6", children: "Connect" }),
                v.jsxs("ul", {
                  className: "space-y-4 text-sm text-gray-400",
                  children: [
                    v.jsxs("li", {
                      className: "flex items-start gap-3",
                      children: [
                        v.jsx(wE, { className: "w-4 h-4 mt-0.5 flex-shrink-0 text-[#A259FF]" }),
                        v.jsx("a", {
                          href: "mailto:team@cirqle.work",
                          className: "hover:text-white transition-colors",
                          children: "team@cirqle.work",
                        }),
                      ],
                    }),
                    v.jsxs("li", {
                      className: "flex items-start gap-3",
                      children: [
                        v.jsx(AE, { className: "w-4 h-4 mt-0.5 flex-shrink-0 text-[#4CC3FF]" }),
                        v.jsx("a", {
                          href: "tel:+918129534377",
                          className: "hover:text-white transition-colors",
                          children: "+91 8129 5343 77",
                        }),
                      ],
                    }),
                    v.jsxs("li", {
                      className: "flex items-start gap-3",
                      children: [
                        v.jsx(kE, { className: "w-4 h-4 mt-0.5 flex-shrink-0 text-[#A259FF]" }),
                        v.jsx("span", { children: "India" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        v.jsx("div", {
          className: "pt-10 border-t border-gray-800",
          children: v.jsxs("div", {
            className:
              "flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400",
            children: [
              v.jsxs("p", { children: ["© ", t, " Cirqle Design. All rights reserved."] }),
              v.jsxs("div", {
                className: "flex gap-8",
                children: [
                  v.jsx("a", {
                    href: "#",
                    className: "hover:text-white transition-colors",
                    children: "Privacy",
                  }),
                  v.jsx("a", {
                    href: "#",
                    className: "hover:text-white transition-colors",
                    children: "Terms",
                  }),
                ],
              }),
            ],
          }),
        }),
        v.jsx("div", {
          className: "mt-10 pt-10 border-t border-gray-800 text-xs text-gray-700 leading-relaxed",
          children: v.jsx("p", {
            children:
              "Professional supermarket flyer design | Premium promotional campaign design | Brand identity design services | Digital creative design agency | Cirqle design ecosystem | Modern UI/UX design | Creative graphic design studio | Fast turnaround design services | Quality brand design solutions",
          }),
        }),
      ],
    }),
  });
}
const JP = "/assets/fda5abfd538782442882b2f230e1b2307e39e0bc-QsOrVb0r.png";
function eN() {
  const [t, r] = k.useState({ x: 0, y: 0 }),
    [i, s] = k.useState(!1);
  return (
    k.useEffect(() => {
      const l = (d) => {
          r({ x: d.clientX, y: d.clientY });
        },
        c = (d) => {
          const f = d.target;
          f.tagName === "A" ||
          f.tagName === "BUTTON" ||
          f.closest("a") ||
          f.closest("button") ||
          f.classList.contains("cursor-hover")
            ? s(!0)
            : s(!1);
        };
      return (
        window.addEventListener("mousemove", l),
        window.addEventListener("mouseover", c),
        (document.body.style.cursor = "none"),
        () => {
          (window.removeEventListener("mousemove", l),
            window.removeEventListener("mouseover", c),
            (document.body.style.cursor = "auto"));
        }
      );
    }, []),
    v.jsxs(v.Fragment, {
      children: [
        v.jsx(re.div, {
          className:
            "fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center",
          animate: { x: t.x, y: t.y, scale: i ? 1.15 : 1 },
          transition: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 },
          style: { transform: "translate(-50%, -50%)" },
          children: v.jsx("img", {
            src: JP,
            alt: "",
            className: "w-8 h-auto object-contain",
            style: {
              filter: i
                ? "drop-shadow(0 4px 16px rgba(162, 89, 255, 0.6)) drop-shadow(0 8px 32px rgba(162, 89, 255, 0.4))"
                : "drop-shadow(0 2px 8px rgba(162, 89, 255, 0.4)) drop-shadow(0 4px 16px rgba(162, 89, 255, 0.2))",
              transition: "filter 0.3s ease",
            },
          }),
        }),
        i &&
          v.jsxs(v.Fragment, {
            children: [
              v.jsx(re.div, {
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
              v.jsx(re.div, {
                className: "fixed top-0 left-0 pointer-events-none z-[9997] rounded-full",
                animate: { x: t.x - 20, y: t.y - 20 },
                transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.5 },
                style: {
                  width: "40px",
                  height: "40px",
                  border: "2px solid rgba(76, 195, 255, 0.5)",
                  backdropFilter: "blur(8px)",
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%)",
                  boxShadow:
                    "0 0 20px rgba(162, 89, 255, 0.4), inset 0 0 10px rgba(76, 195, 255, 0.3)",
                },
              }),
            ],
          }),
      ],
    })
  );
}
function tN() {
  return v.jsxs("div", {
    className: "min-h-screen bg-white",
    children: [
      v.jsx(eN, {}),
      v.jsx(qC, {}),
      v.jsxs("main", {
        children: [
          v.jsx(z2, {}),
          v.jsx(BP, {}),
          v.jsx(HP, {}),
          v.jsx($P, {}),
          v.jsx(YP, {}),
          v.jsx(KP, {}),
          v.jsx(QP, {}),
        ],
      }),
      v.jsx(ZP, {}),
    ],
  });
}
rw.createRoot(document.getElementById("root")).render(v.jsx(tN, {}));
