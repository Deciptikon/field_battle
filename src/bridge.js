!(function () {
  "use strict";
  var e = function () {
    return (
      (e =
        Object.assign ||
        function (e) {
          for (var t, n = 1, o = arguments.length; n < o; n++)
            for (var r in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        }),
      e.apply(this, arguments)
    );
  };
  function t(e, t, n, o) {
    return new (n || (n = Promise))(function (r, p) {
      function i(e) {
        try {
          s(o.next(e));
        } catch (e) {
          p(e);
        }
      }
      function a(e) {
        try {
          s(o.throw(e));
        } catch (e) {
          p(e);
        }
      }
      function s(e) {
        var t;
        e.done
          ? r(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(i, a);
      }
      s((o = o.apply(e, t || [])).next());
    });
  }
  function n(e, t) {
    var n,
      o,
      r,
      p,
      i = {
        label: 0,
        sent: function () {
          if (1 & r[0]) throw r[1];
          return r[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (p = { next: a(0), throw: a(1), return: a(2) }),
      "function" == typeof Symbol &&
        (p[Symbol.iterator] = function () {
          return this;
        }),
      p
    );
    function a(a) {
      return function (s) {
        return (function (a) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; p && ((p = 0), a[0] && (i = 0)), i; )
            try {
              if (
                ((n = 1),
                o &&
                  (r =
                    2 & a[0]
                      ? o.return
                      : a[0]
                      ? o.throw || ((r = o.return) && r.call(o), 0)
                      : o.next) &&
                  !(r = r.call(o, a[1])).done)
              )
                return r;
              switch (((o = 0), r && (a = [2 & a[0], r.value]), a[0])) {
                case 0:
                case 1:
                  r = a;
                  break;
                case 4:
                  return i.label++, { value: a[1], done: !1 };
                case 5:
                  i.label++, (o = a[1]), (a = [0]);
                  continue;
                case 7:
                  (a = i.ops.pop()), i.trys.pop();
                  continue;
                default:
                  if (
                    !((r = i.trys),
                    (r = r.length > 0 && r[r.length - 1]) ||
                      (6 !== a[0] && 2 !== a[0]))
                  ) {
                    i = 0;
                    continue;
                  }
                  if (3 === a[0] && (!r || (a[1] > r[0] && a[1] < r[3]))) {
                    i.label = a[1];
                    break;
                  }
                  if (6 === a[0] && i.label < r[1]) {
                    (i.label = r[1]), (r = a);
                    break;
                  }
                  if (r && i.label < r[2]) {
                    (i.label = r[2]), i.ops.push(a);
                    break;
                  }
                  r[2] && i.ops.pop(), i.trys.pop();
                  continue;
              }
              a = t.call(e, i);
            } catch (e) {
              (a = [6, e]), (o = 0);
            } finally {
              n = r = 0;
            }
          if (5 & a[0]) throw a[1];
          return { value: a[0] ? a[1] : void 0, done: !0 };
        })([a, s]);
      };
    }
  }
  function o(e, t, n) {
    if (n || 2 === arguments.length)
      for (var o, r = 0, p = t.length; r < p; r++)
        (!o && r in t) ||
          (o || (o = Array.prototype.slice.call(t, 0, r)), (o[r] = t[r]));
    return e.concat(o || Array.prototype.slice.call(t));
  }
  function r(t, n, o) {
    var r = (function (e) {
      var t = {
          current: 0,
          next: function () {
            return ++this.current;
          },
        },
        n = {};
      return {
        add: function (o, r) {
          var p = null != r ? r : "".concat(t.next(), "_").concat(e);
          return (n[p] = o), p;
        },
        resolve: function (e, t, o) {
          var r = n[e];
          r && (o(t) ? r.resolve(t) : r.reject(t), (n[e] = null));
        },
      };
    })(o);
    return (
      n(function (e) {
        if (
          e.detail &&
          e.detail.data &&
          "object" == typeof e.detail.data &&
          "request_id" in e.detail.data
        ) {
          var t = e.detail.data,
            n = t.request_id,
            o = (function (e, t) {
              var n = {};
              for (var o in e)
                Object.prototype.hasOwnProperty.call(e, o) &&
                  t.indexOf(o) < 0 &&
                  (n[o] = e[o]);
              if (
                null != e &&
                "function" == typeof Object.getOwnPropertySymbols
              ) {
                var r = 0;
                for (o = Object.getOwnPropertySymbols(e); r < o.length; r++)
                  t.indexOf(o[r]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, o[r]) &&
                    (n[o[r]] = e[o[r]]);
              }
              return n;
            })(t, ["request_id"]);
          n &&
            r.resolve(n, o, function (e) {
              return !("error_type" in e);
            });
        }
      }),
      function (n, o) {
        return (
          void 0 === o && (o = {}),
          new Promise(function (p, i) {
            var a = r.add({ resolve: p, reject: i }, o.request_id);
            t(n, e(e({}, o), { request_id: a }));
          })
        );
      }
    );
  }
  var p,
    i = "undefined" != typeof window,
    a = Boolean(i && window.AndroidBridge),
    s = Boolean(
      i &&
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.VKWebAppClose
    ),
    u = Boolean(
      i &&
        window.ReactNativeWebView &&
        "function" == typeof window.ReactNativeWebView.postMessage
    ),
    c = i && !a && !s,
    l = c && /(^\?|&)vk_platform=mobile_web(&|$)/.test(location.search),
    d = c ? "message" : "VKWebAppEvent",
    b = o(
      [
        "VKWebAppInit",
        "VKWebAppGetCommunityAuthToken",
        "VKWebAppAddToCommunity",
        "VKWebAppAddToHomeScreenInfo",
        "VKWebAppClose",
        "VKWebAppCopyText",
        "VKWebAppCreateHash",
        "VKWebAppGetUserInfo",
        "VKWebAppSetLocation",
        "VKWebAppSendToClient",
        "VKWebAppGetClientVersion",
        "VKWebAppGetPhoneNumber",
        "VKWebAppGetEmail",
        "VKWebAppGetGroupInfo",
        "VKWebAppGetGeodata",
        "VKWebAppGetCommunityToken",
        "VKWebAppGetConfig",
        "VKWebAppGetLaunchParams",
        "VKWebAppSetTitle",
        "VKWebAppGetAuthToken",
        "VKWebAppCallAPIMethod",
        "VKWebAppJoinGroup",
        "VKWebAppLeaveGroup",
        "VKWebAppAllowMessagesFromGroup",
        "VKWebAppDenyNotifications",
        "VKWebAppAllowNotifications",
        "VKWebAppOpenPayForm",
        "VKWebAppOpenApp",
        "VKWebAppShare",
        "VKWebAppShowWallPostBox",
        "VKWebAppScroll",
        "VKWebAppShowOrderBox",
        "VKWebAppShowLeaderBoardBox",
        "VKWebAppShowInviteBox",
        "VKWebAppShowRequestBox",
        "VKWebAppAddToFavorites",
        "VKWebAppShowStoryBox",
        "VKWebAppStorageGet",
        "VKWebAppStorageGetKeys",
        "VKWebAppStorageSet",
        "VKWebAppFlashGetInfo",
        "VKWebAppSubscribeStoryApp",
        "VKWebAppOpenWallPost",
        "VKWebAppCheckAllowedScopes",
        "VKWebAppCheckBannerAd",
        "VKWebAppHideBannerAd",
        "VKWebAppShowBannerAd",
        "VKWebAppCheckNativeAds",
        "VKWebAppShowNativeAds",
        "VKWebAppRetargetingPixel",
        "VKWebAppConversionHit",
        "VKWebAppShowSubscriptionBox",
        "VKWebAppCheckSurvey",
        "VKWebAppShowSurvey",
        "VKWebAppScrollTop",
        "VKWebAppScrollTopStart",
        "VKWebAppScrollTopStop",
        "VKWebAppShowSlidesSheet",
        "VKWebAppTranslate",
        "VKWebAppRecommend",
        "VKWebAppAddToProfile",
        "VKWebAppGetFriends",
      ],
      c && !l
        ? [
            "VKWebAppResizeWindow",
            "VKWebAppAddToMenu",
            "VKWebAppShowInstallPushBox",
            "VKWebAppShowCommunityWidgetPreviewBox",
            "VKWebAppCallStart",
            "VKWebAppCallJoin",
            "VKWebAppCallGetStatus",
          ]
        : ["VKWebAppShowImages"],
      !0
    ),
    f = i ? window.AndroidBridge : void 0,
    A = s ? window.webkit.messageHandlers : void 0,
    w = c ? parent : void 0;
  var W, V, K, S, h, v, y, m, E, g;
  !(function (e) {
    (e.REWARD = "reward"), (e.INTERSTITIAL = "interstitial");
  })(W || (W = {})),
    (function (e) {
      (e.RESIZE = "resize"), (e.OVERLAY = "overlay");
    })(V || (V = {})),
    (function (e) {
      (e.TOP = "top"), (e.BOTTOM = "bottom");
    })(K || (K = {})),
    (function (e) {
      (e.LEFT = "left"), (e.RIGHT = "right"), (e.CENTER = "center");
    })(S || (S = {})),
    (function (e) {
      (e.COMPACT = "compact"), (e.REGULAR = "regular");
    })(h || (h = {})),
    (function (e) {
      (e.HORIZONTAL = "horizontal"), (e.VERTICAL = "vertical");
    })(v || (v = {})),
    (function (e) {
      (e.CAMERA = "camera"), (e.LOCATION = "location"), (e.PHOTO = "photo");
    })(y || (y = {})),
    (function (e) {
      (e.RU = "ru"),
        (e.UK = "uk"),
        (e.UA = "ua"),
        (e.EN = "en"),
        (e.BE = "be"),
        (e.KZ = "kz"),
        (e.PT = "pt"),
        (e.ES = "es");
    })(m || (m = {})),
    (function (e) {
      (e.ADMIN = "admin"),
        (e.EDITOR = "editor"),
        (e.MEMBER = "member"),
        (e.MODER = "moder"),
        (e.NONE = "none");
    })(E || (E = {})),
    (function (e) {
      (e.DESKTOP_WEB = "desktop_web"),
        (e.DESKTOP_WEB_MESSENGER = "desktop_web_messenger"),
        (e.DESKTOP_APP_MESSENGER = "desktop_app_messenger"),
        (e.MOBILE_WEB = "mobile_web"),
        (e.MOBILE_ANDROID = "mobile_android"),
        (e.MOBILE_ANDROID_MESSENGER = "mobile_android_messenger"),
        (e.MOBILE_IPHONE = "mobile_iphone"),
        (e.MOBILE_IPHONE_MESSENGER = "mobile_iphone_messenger"),
        (e.MOBILE_IPAD = "mobile_ipad");
    })(g || (g = {}));
  var O = (function (e) {
    var i = void 0,
      l = [],
      W = Math.random().toString(36).substring(2, 5);
    function V(e) {
      l.push(e);
    }
    function K(e) {
      return a
        ? !(!f || "function" != typeof f[e])
        : s
        ? !(!A || !A[e] || "function" != typeof A[e].postMessage)
        : !!c && b.includes(e);
    }
    function S() {
      return s || a;
    }
    function h() {
      return c && window.parent !== window;
    }
    function v() {
      return S() || h();
    }
    function y(e) {
      if (s || a)
        return o([], l, !0).map(function (t) {
          return t.call(null, e);
        });
      var t = null == e ? void 0 : e.data;
      if (c && t) {
        if (u && "string" == typeof t)
          try {
            t = JSON.parse(t);
          } catch (e) {}
        var n = t.type,
          r = t.data,
          p = t.frameId;
        n &&
          ("VKWebAppSettings" !== n
            ? o([], l, !0).map(function (e) {
                return e({ detail: { type: n, data: r } });
              })
            : (i = p));
      }
    }
    u && /(android)/i.test(navigator.userAgent)
      ? document.addEventListener(d, y)
      : "undefined" != typeof window &&
        "addEventListener" in window &&
        window.addEventListener(d, y);
    var m = r(
      function (t, n) {
        f && f[t]
          ? f[t](JSON.stringify(n))
          : A && A[t] && "function" == typeof A[t].postMessage
          ? A[t].postMessage(n)
          : u
          ? window.ReactNativeWebView.postMessage(
              JSON.stringify({ handler: t, params: n })
            )
          : w &&
            "function" == typeof w.postMessage &&
            w.postMessage(
              {
                handler: t,
                params: n,
                type: "vk-connect",
                webFrameId: i,
                connectVersion: e,
              },
              "*"
            );
      },
      V,
      W
    );
    return (
      V(function (e) {
        if (e.detail && "SetSupportedHandlers" === e.detail.type)
          p = new Set(e.detail.data.supportedHandlers);
      }),
      {
        send: m,
        sendPromise: m,
        subscribe: V,
        unsubscribe: function (e) {
          var t = l.indexOf(e);
          t > -1 && l.splice(t, 1);
        },
        supports: function (e) {
          return (
            console.warn(
              "bridge.supports method is deprecated. Use bridge.supportsAsync instead."
            ),
            K(e)
          );
        },
        supportsAsync: function (e) {
          return t(this, void 0, void 0, function () {
            var t;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  if (a || s) return [2, K(e)];
                  if (p) return [2, p.has(e)];
                  n.label = 1;
                case 1:
                  return (
                    n.trys.push([1, 3, , 4]), [4, m("SetSupportedHandlers")]
                  );
                case 2:
                  return (
                    (t = n.sent()), (p = new Set(t.supportedHandlers)), [3, 4]
                  );
                case 3:
                  return n.sent(), (p = new Set(["VKWebAppInit"])), [3, 4];
                case 4:
                  return [2, p.has(e)];
              }
            });
          });
        },
        isWebView: S,
        isIframe: h,
        isEmbedded: v,
        isStandalone: function () {
          return !v();
        },
      }
    );
  })("2.15.6");
  window.vkBridge = window.vkConnect = O;
})();
//# sourceMappingURL=browser.min.js.map

export const vkBridge = window.vkBridge || window.vkConnect;

export function initVKBridge() {
  console.log(`initBridge()`);
  vkBridge.send("VKWebAppInit");
}
