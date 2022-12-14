! function() {
    "use strict";
    var t = function(t, e, a) {
            var n = t[e];
            return function() {
                for (var e = [], i = arguments.length; i--;) e[i] = arguments[i];
                return a.apply(null, e), n.apply(t, e)
            }
        },
        e = function() {
            var t = window.doNotTrack,
                e = window.navigator,
                a = window.external,
                n = "msTrackingProtectionEnabled",
                i = t || e.doNotTrack || e.msDoNotTrack || a && n in a && a[n]();
            return "1" == i || "yes" === i
        };
    ! function(a) {
        var n = a.screen,
            i = n.width,
            r = n.height,
            o = a.navigator.language,
            c = a.location,
            s = c.hostname,
            u = c.pathname,
            l = c.search,
            d = a.localStorage,
            f = a.sessionStorage,
            v = a.document,
            p = a.history,
            h = v.querySelector("script[data-website-id]");
        if (h) {
            var m, g = h.getAttribute.bind(h),
                w = g("data-website-id"),
                y = g("data-host-url"),
                S = "false" !== g("data-auto-track"),
                b = g("data-do-not-track"),
                k = g("data-cache"),
                E = g("data-domains") || "",
                T = E.split(",").map((function(t) {
                    return t.trim()
                })),
                q = /^umami--([a-z]+)--([\w]+[\w-]*)$/,
                N = "[class*='umami--']",
                j = "umami.cache",
                L = function() {
                    return d && d.getItem("umami.disabled") || b && e() || E && !T.includes(s)
                },
                O = y ? (m = y) && m.length > 1 && m.endsWith("/") ? m.slice(0, -1) : m : h.src.split("/").slice(0, -1).join("/"),
                A = i + "x" + r,
                I = {},
                x = "" + u + l,
                H = v.referrer,
                M = function(t, e, a) {
                    if (!L()) {
                        var n = {
                            website: a,
                            hostname: s,
                            screen: A,
                            language: o,
                            cache: k && f.getItem(j)
                        };
                        Object.keys(e).forEach((function(t) {
                                n[t] = e[t]
                            })),
                            function(t, e, a) {
                                var n = new XMLHttpRequest;
                                n.open("POST", t, !0), n.setRequestHeader("Content-Type", "application/json"), n.onreadystatechange = function() {
                                    4 === n.readyState && a(n.response)
                                }, n.send(JSON.stringify(e))
                            }(O + "/api/collect", {
                                type: t,
                                payload: n
                            }, (function(t) {
                                return k && f.setItem(j, t)
                            }))
                    }
                },
                P = function(t, e, a) {
                    void 0 === t && (t = x), void 0 === e && (e = H), void 0 === a && (a = w), M("pageview", {
                        url: t,
                        referrer: e
                    }, a)
                },
                R = function(t, e, a, n) {
                    void 0 === e && (e = "custom"), void 0 === a && (a = x), void 0 === n && (n = w), M("event", {
                        event_type: e,
                        event_value: t,
                        url: a
                    }, n)
                },
                _ = function(t) {
                    t.className.split(" ").forEach((function(e) {
                        if (q.test(e)) {
                            var a = e.split("--"),
                                n = a[1],
                                i = a[2],
                                r = I[e] ? I[e] : I[e] = function() {
                                    return R(i, n)
                                };
                            t.addEventListener(n, r, !0)
                        }
                    }))
                },
                z = function(t) {
                    t.forEach((function(t) {
                        var e = t.target;
                        _(e), e.querySelectorAll(N).forEach(_)
                    }))
                },
                C = function(t, e, a) {
                    if (a) {
                        H = x;
                        var n = a.toString();
                        (x = "http" === n.substring(0, 4) ? "/" + n.split("/").splice(3).join("/") : n) !== H && P()
                    }
                };
            if (!a.umami) {
                var D = function(t) {
                    return R(t)
                };
                D.trackView = P, D.trackEvent = R, a.umami = D
            }
            if (S && !L()) {
                p.pushState = t(p, "pushState", C), p.replaceState = t(p, "replaceState", C);
                var J = function() {
                    switch (v.readyState) {
                        case "interactive":
                            v.querySelectorAll(N).forEach(_), new MutationObserver(z).observe(v, {
                                childList: !0,
                                subtree: !0
                            });
                            break;
                        case "complete":
                            P()
                    }
                };
                v.addEventListener("readystatechange", J, !0), J()
            }
        }
    }(window)
}();