(() => {
    var e = {
        d: (t, o) => {
            for (var n in o)
                e.o(o, n) && !e.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: o[n] });
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: (e) => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
            Object.defineProperty(e, "__esModule", { value: !0 });
        }
    }, t = {};

    (() => {
        "use strict";
        e.r(t);
        e.d(t, {
            closePopupWidget: () => _,
            destroyBadgeWidget: () => U,
            initBadgeWidget: () => R,
            initInlineWidget: () => x,
            initPopupWidget: () => W,
            showPopupWidget: () => I
        });

        const o = (e) => {
            ["interactive", "complete"].includes(document.readyState) ? e() : document.addEventListener("DOMContentLoaded", e);
        };

        const n = (e, t) => Object.fromEntries(Object.entries(e).map(([e, o]) => [t(o, e), o]));
        const i = (e) => e.split(/(?=[A-Z])/).join("_").toLowerCase();
        const r = (e, t) => Object.fromEntries(Object.entries(e).filter(([e]) => t.includes(e)));
        const s = (e) => e ? Object.fromEntries(e.substr(1).split("&").map(e => e.split("=")).map(([e, t]) => [e, decodeURIComponent(t)])) : {};

        var l = Object.defineProperty, a = Object.getOwnPropertySymbols, d = Object.prototype.hasOwnProperty, c = Object.prototype.propertyIsEnumerable;
        const u = (e, t, o) => t in e ? l(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;

        const p = (e, t) => {
            for (var o in t || (t = {}))
                d.call(t, o) && u(e, o, t[o]);
            if (a)
                for (var o of a(t))
                    c.call(t, o) && u(e, o, t[o]);
            return e;
        };

        class h {
            constructor(e) {
                var t, o;
                t = "isMobile";
                o = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                u(this, t + "", o);
                this.options = e;
                this.parseOptions();
            }
            inject() {
                return this.build(), this.format(), "inline" === this.embedType.toLowerCase(), this.parent.appendChild(this.buildSpinner()), this.parent.appendChild(this.node);
            }
            parseOptions() {
                if (this.options = Object.assign({}, { inlineStyles: !1, resize: !1 }, this.options), this.parent = this.options.parentElement, !this.parent)
                    throw new Error("Calendly: Parent element not set");
                if (this.parent.jquery && (this.parent = this.parent[0]), this.inlineStyles = this.options.inlineStyles, this.embedType = this.options.embedType, this.url = (this.options.url || this.getUrlFromParent()).split("#")[0], this.resize = this.options.resize, !this.url)
                    throw new Error("Calendly: Widget URL not set");
            }
            build() {
                this.node = document.createElement("iframe");
                this.node.src = this.getSource();
                this.node.width = "100%";
                this.node.height = "100%";
                this.node.frameBorder = "0";
                this.node.title = "Select a Date & Time - Calendly";
            }
            getSource() {
                const e = new URL(this.url, window.location);
                return e.search = this.getQuery(), e.toString();
            }
            getUrlFromParent() {
                return this.parent.getAttribute("data-url");
            }
            getQuery() {
                var e;
                return e = p(p(p({
                    embed_domain: this.getDomain(),
                    embed_type: this.embedType
                }, this.getUtmParamsFromHost()), this.getParamsFromUrl()), this.getParamsFromOptions()), `?${Object.entries(e).map(([e, t]) => [e, encodeURIComponent(t)].join("&")).join("&")}`;
            }
            getUtmParamsFromHost() {
                const e = s(new URL(window.location.href).search);
                return r(e, ["utm_campaign", "utm_source", "utm_medium", "utm_content", "utm_term", "salesforce_uuid"]);
            }
            getParamsFromUrl() {
                return s(new URL(this.url, window.location).search);
            }
            getParamsFromOptions() {
                return p(p({}, this.getPrefillParams()), this.getUtmParams());
            }
            getUtmParams() {
                if (!this.options.utm)
                    return [];
                const e = r(this.options.utm, ["utmCampaign", "utmSource", "utmMedium", "utmContent", "utmTerm", "salesforceUuid"]);
                return n(e, (e, t) => i(t));
            }
            getPrefillParams() {
                if (!this.options.prefill)
                    return [];
                const e = r(this.options.prefill, ["name", "firstName", "lastName", "email"]), t = n(e, (e, t) => i(t));
                if (this.options.prefill.customAnswers) {
                    const e = this.options.prefill.customAnswers;
                    Object.entries(e).forEach(([e, o]) => {
                        e.match(/^a\d{1,2}$/) && (t[e] = o);
                    });
                }
                return t;
            }
            getDomain() {
                return window.location.host;
            }
            format() {
                return this.isMobile ? this.formatMobile() : this.formatDesktop();
            }
            formatDesktop() {
                this.inlineStyles && this.parent.setAttribute("style", `position: relative;${this.parent.getAttribute("style")}`);
            }
            formatMobile() {
                if (this.inlineStyles) {
                    const e = `position: relative;-webkit-overflow-scrolling:touch;${this.parent.getAttribute("style")}`;
                    this.parent.setAttribute("style", e);
                }
                this.parent.className += " calendly-mobile";
            }
            attachResizeListener() {
                const e = (e) => {
                    this.parent.style.height = e;
                };
                window.addEventListener("message", (t) => {
                    t.data.event && "calendly.page_height" === t.data.event && (e(t.data.payload.height), this.parent.getBoundingClientRect().top < 0 && this.parent.scrollIntoView(!0, { behavior: "auto" }));
                });
            }
            buildSpinner() {
                const e = document.createElement("div");
                return e.className = "calendly-spinner", e.appendChild(this.buildBounce(1)), e.appendChild(this.buildBounce(2)), e.appendChild(this.buildBounce(3)), e;
            }
            buildBounce(e) {
                const t = document.createElement("div");
                return t.className = `calendly-bounce${e}`, t;
            }
        }

        class m {
            constructor(e) {
                this.options = e;
            }
            destroy() {
                return this.widget.parentNode.removeChild(this.widget);
            }
            buildWidget() {
                return this.widget = document.createElement("div"), this.widget.className = "calendly-badge-widget", this.widget.appendChild(this.buildContent()), this;
            }
            inject() {
                return this.buildWidget(), document.body.insertBefore(this.widget, document.body.firstChild), this;
            }
            buildContent() {
                const e = document.createElement("div");
                return e.className = "calendly-badge-content", "#ffffff" === this.options.color && (e.className += " calendly-white"), e.onclick = this.options.onClick, e.innerHTML = this.options.text, e.style.background = this.options.color, e.style.color = this.options.textColor, this.options.branding && e.appendChild(this.buildBranding()), e;
            }
            buildBranding() {
                const e = document.createElement("span");
                return e.innerHTML = "powered by Calendly", e;
            }
        }

        var y = !1;
        if ("undefined" != typeof window) {
            var b = { get passive() { y = !0; } };
            window.addEventListener("testPassive", null, b);
            window.removeEventListener("testPassive", null, b);
        }

        var v = "undefined" != typeof window && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || "MacIntel" === window.navigator.platform && window.navigator.maxTouchPoints > 1),
            g = [], f = !1, w = -1, P = void 0, C = void 0, O = void 0, E = function (e) {
                return g.some(function (t) { return !(!t.options.allowTouchMove || !t.options.allowTouchMove(e)); });
            }, j = function (e) {
                var t = e || window.event;
                return !!E(t.target) || t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1);
            }, S = function () {
                void 0 !== O && (document.body.style.paddingRight = O, O = void 0);
                void 0 !== C && (document.body.style.overflow = C, C = void 0);
            }, L = function () {
                if (void 0 !== w) {
                    var e = w - window.innerWidth;
                    document.body.style.paddingRight = e + "px";
                }
            }, N = function (e, t) {
                if (void 0 === t && (t = {}), v) {
                    if (!t.allowTouchMove && document.addEventListener("touchmove", j, y ? { passive: !1 } : void 0), f)
                        return;
                    var o = !!t.reserveScrollBarGap && window.innerWidth > document.documentElement.clientWidth;
                    L(), C = document.body.style.overflow, document.body.style.overflow = "hidden", o && (O = document.body.style.paddingRight, S()), f = !0;
                }
            }, M = function (e, t) {
                if (v) {
                    if (!t.allowTouchMove && document.removeEventListener("touchmove", j, !1), !f)
                        return;
                    S(), f = !1;
                }
            };

        const x = (e) => {
            o(() => {
                new h(e).inject();
            });
        };
        const W = (e) => {
            o(() => {
                new h(p(p({}, e), {}, { embedType: "PopupWidget" })).inject();
            });
        };
        const I = () => {
            const e = document.querySelector("iframe[src*='calendly.com']");
            e && e.contentWindow.postMessage({ event: "calendly.showPopupWidget" }, "*");
        };
        const _ = () => {
            const e = document.querySelector("iframe[src*='calendly.com']");
            e && e.contentWindow.postMessage({ event: "calendly.closePopupWidget" }, "*");
        };
        const R = (e) => {
            o(() => {
                new m(e).inject();
            });
        };
        const U = () => {
            o(() => {
                const e = document.querySelector(".calendly-badge-widget");
                e && e.parentNode.removeChild(e);
            });
        };
    })();

    window.Calendly = t;
})();
