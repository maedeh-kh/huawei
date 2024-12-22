define('helper', ['jquery'], function(jQuery) {
    var huawei = huawei || {};
    jQuery.fn.imagesLoaded = function(selector) {
        selector = selector || "img";
        var def = $.Deferred();
        var defList = [];
        this.find(selector).each(function(i, o) {
            var _def = $.Deferred();
            (function(d) {
                $(o).on("load", function(e) {
                    d.resolve(e.target);
                });
            }(_def));

            if (o.complete && !$(o).attr("data-src"))
                setTimeout(function() {
                    _def.resolve(o);
                }, 0);

            defList.push(_def.promise());
        });

        $.when.apply(this, defList).always(function(d) {
            def.resolve.apply(this, arguments);
        });
        setTimeout(function() {
            def.resolve(this);
        }, 1000 * 10);
        return def.promise();
    }
    ;

    huawei.debounce = function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;

            if (timeout)
                clearTimeout(timeout);

            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
        ;
    }
    ;
    jQuery.debounce = huawei.debounce;

    jQuery.fn.hoverIntent = function(hoverIn, hoverOut, selector) {
        var timer1 = 0;
        var timer2 = 0;
        var delay = 250;
        this.on("mouseenter", selector, function(e) {
            clearTimeout(timer1);
            timer1 = 0;
            var that = this;
            (function(th, _e) {
                timer1 = setTimeout(function() {
                    hoverIn.apply(th, [_e]);
                }, delay);
            }(that, e));
        }).on("mouseleave", selector, function(e) {
            clearTimeout(timer1);
            timer1 = 0;
            var that = this;
            (function(th, _e) {
                setTimeout(function() {
                    hoverOut.apply(th, [_e]);
                }, delay);
            }(that, e));
        });
        return this;
    }
    ;

    function calculateTruncation(el) {
        var ellipsis = "...";
        var $el = $(el);
        var text;
        var doted = false;
        var $contents = $el.contents();
        var lastText;
        var limit = 800;
        while (el.clientHeight + 2 < el.scrollHeight) {
            if (limit <= 0)
                break;
            limit -= 1;
            text = $el.text().trim();
            if (!text) {
                break;
            }
            var last = $contents.last();
            text = last.text().trim();
            lastText = text;
            if (!text || text == ellipsis) {
                last.remove();
                $contents = $el.contents();
                continue;
            }

            // 替换英文单词
            text = text.replace(/\s?\b([\w\.])*$/, ellipsis);
            // 替换中文文字
            if (text === lastText)
                text = text.replace(/[\u2E80-\u9FFF_\s](\.{3})?$/, ellipsis);

            // 替换任意最后一个字符
            if (text === lastText)
                text = text.replace(/[\s\S](\.{3})?$/, ellipsis);

            var n = last.get(0);
            if (n.nodeType != 3)
                last.text(text);
            else
                n.nodeValue = text;

            doted = true;
        }

        return doted;
    }
    jQuery.fn.dotdotdot = function() {
        this.each(function() {
            var $t = $(this);
            if ($t.is(":hidden") || this.doted)
                return;
            $t.css({
                "word-break": "break-word",
                "overflow": "hidden",
                "overflow-wrap": "break-word"
            }).data("children", $t.contents().clone(true));
            $t.on("restore-content", function(e) {
                $t.empty().append($t.data("children"));
                $t.removeClass("doted is-truncated").removeAttr("style");
            });
            var truncationEl = this;
            var r = calculateTruncation(truncationEl);
            if (r) {
                this.doted = true;
                $(this).addClass("doted is-truncated");
            }
        });
    }
    ;

    jQuery.fn.tabResponsive = function(_options) {
        var defaults = {
            offset: 0,
            collapseClass: "tab-content-collapse",
            animateComplete: $.noop
        };
        var options = jQuery.extend({}, defaults, _options);
        this.each(function() {
            var $t = $(this);
            $t.addClass("hidden-xs");
            $t.find('[data-toggle="tab"]').each(function() {
                var $clone = $(this).clone();
                $clone.removeAttr("id").addClass("hidden-lg hidden-md hidden-sm collapsed").attr("data-toggle", "collapse").insertBefore($($clone.attr("href")));
            });
        });

        var $tabs = this;
        $(window).off("resize.tabResponsive").on("resize.tabResponsive", function(e) {
            $tabs.each(function() {
                var $tabContent = $($(this).find('[data-toggle="tab"]').eq(0).attr("href")).parent();
                if ($(window).width() < 768) {
                    $tabContent.removeClass("tab-content").addClass(options.collapseClass).children(".tab-pane").removeClass("active").addClass("collapse");
                } else {
                    $tabContent.removeClass(options.collapseClass).addClass("tab-content").children(".tab-pane").removeClass("collapse").eq(0).addClass("active");
                }
            });
        });
        setTimeout(function() {
            $(window).trigger("resize.tabResponsive");
        }, 100);

        $(document).off("click", '.tab-content-collapse [data-toggle="collapse"]').on("click", '.tab-content-collapse [data-toggle="collapse"]', function(e) {
            var $t = $(this);
            if ($t.hasClass("collapsed"))
                return;
            var $brothers = $t.siblings('.tab-pane').not($t.attr("href")).collapse('hide');
            setTimeout(function() {
                var _offset = typeof options.offset === "function" ? options.offset() : options.offset;
                $("html, body").animate({
                    scrollTop: $(e.currentTarget).offset().top - _offset
                }, function() {
                    setTimeout(function() {
                        options.animateComplete($tabs);
                    }, 100);
                });
            }, 500);
        });
    }
    ;

    jQuery.loading = function(showOrClose, options) {
        var msg = /(\/zh|cn\/)/.test(document.URL) ? "加载中..." : "loading...";
        if ($("#hidLoadingMessage").length)
            msg = $("#hidLoadingMessage").val();

        options = options || {};
        options.loadingID = options.loadingID || "js-loading";
        showOrClose ? openLoading() : closeLoading();
        function openLoading() {
            var $loadingEl = $("#" + options.loadingID);
            if (!$loadingEl.length) {
                $loadingEl = $('<div id="' + options.loadingID + '"><div class="load-box"><div class="loading">\
            <div class="spinner"><p>' + msg + '</p><img src="https://www.huawei.com/Assets/corp/v2/img/huawei_loading.gif"></div>\
        <div class="ie-loading"> <span>' + msg + '</span></div></div><div class="overlay"></div></div> </div>').appendTo("body");
            }

            $loadingEl.addClass("show");
        }

        function closeLoading() {
            var $loadingEl = $("#js-loading");
            $loadingEl.removeClass("show");
        }
    }
    ;

    jQuery.Cache = {
        get: function(key) {
            var val;
            try {
                val = JSON.parse(decodeURIComponent(localStorage.getItem(key)));
            } catch (_e) {}
            return val;
        },
        set: function(key, _value, expireDays) {
            var value = _value;
            if (!value)
                return;
            if (typeof value !== "object") {
                value = {
                    value: _value
                };
            }
            var d = new Date();
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * expireDays);
            var expire = d;
            value.expire = expire;
            localStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
        },
        del: function(key) {
            localStorage.removeItem(key);
        },
    };

    jQuery.dialog = function(id, content, showOrClose, options) {
        options = options || {};
        options.loadingID = id || "js-dialog-box";
        var hide = function() {
            var $loadingEl = $("#" + options.loadingID);
            $loadingEl.removeClass("show").fadeOut();
            $("body").removeClass("dialog-has-open");
        };
        var show = function() {
            var $loadingEl = $("#" + options.loadingID);
            if (!$loadingEl.length) {
                $loadingEl = $('<div id="' + options.loadingID + '" style="display: none;"><div class="modal-mask">\
        <div class="modal-wrapper"><div class="modal-container"><a class="js-close-dialog icon-close"></a>\
        <div class="modal-header"><h3></h3></div><div class="modal-body">\
        </div><div class="modal-footer"> <button class="modal-default-button js-close-dialog">OK</button>\
        </div></div></div></div></div>').appendTo("body");
                $loadingEl.on("click", ".js-close-dialog", function(_e) {
                    hide();
                });
            }
            if (/^[#.]/.test(content))
                content = $(content);
            $loadingEl.find(".modal-body").append(content);
            $loadingEl.addClass("show").fadeIn();
            $("body").addClass("dialog-has-open");
        };

        if (showOrClose !== false)
            show();
        else
            hide();
    }
    ;

    function random() {
        var ok = new Date().valueOf();
        try {
            var crypto = window.crypto || window.msCrypto;
            var cryptoGetRandomValues = crypto.getRandomValues.bind(crypto);
            var MAX_SAFE_INTEGER = 2 ** 53 - 1;
            var highShift = 2 ** 32;
            var highMask = 2 ** (53 - 32) - 1;
            var array = new Uint32Array(2);
            cryptoGetRandomValues(array);
            var numerator = ((array[0] & highMask) * highShift) + array[1];
            var denominator = MAX_SAFE_INTEGER + 1;
            ok = numerator / denominator;
        } catch (ex) {}
        return ok;
    }

    jQuery.generateUUID = function() {
        var d = new Date().getTime();
        var d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    }
    ;
    return huawei;
});

define('PanelImg', ['helper'], function() {
    function PanelImg(obj) {
        this.obj = $(obj);
        this.panelImg = this.obj.find('.panel-img-box');
        this.init();
    }
    PanelImg.prototype = {
        init: function() {
            var self = this;
            this.resize();
            var timer = 0;
            $(window).resize(function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    self.resize();
                }, 200);
            });

            setTimeout(function() {
                self.resize();
            }, 1000);

            $('.panel-img-box.mr .img-box').imagesLoaded('img:visible').then(function() {
                self.resize();
            });
        },
        resize: function() {
            var self = this;
            if (window.innerWidth < 992) {
                self.panelImg.removeAttr('style');
                return;
            }
            var tempWidth = 0;
            self.panelImg.each(function(index) {
                if ($(this).hasClass('big-w')) {
                    tempWidth = self.obj.width() - 30 - (self.obj.width() - 60) / 3;
                } else {
                    tempWidth = (self.obj.width() - 60) / 3;
                }

                $(this).css({
                    width: tempWidth - 0.5,
                    height: $(this).prev().hasClass('mr') ? $(this).prev().height() : 'auto'
                });
            });
        }
    };
    return PanelImg;
});

/*! js-cookie v2.2.1 | MIT */

!function(a) {
    var b;
    if ("function" == typeof define && define.amd && (define('vendor/js.cookie-2.2.1.min', a),
    b = !0),
    "object" == typeof exports && (module.exports = a(),
    b = !0),
    !b) {
        var c = window.Cookies
          , d = window.Cookies = a();
        d.noConflict = function() {
            return window.Cookies = c,
            d
        }
    }
}(function() {
    function a() {
        for (var a = 0, b = {}; a < arguments.length; a++) {
            var c = arguments[a];
            for (var d in c)
                b[d] = c[d]
        }
        return b
    }
    function b(a) {
        return a.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
    }
    function c(d) {
        function e() {}
        function f(b, c, f) {
            if ("undefined" != typeof document) {
                f = a({
                    path: "/"
                }, e.defaults, f),
                "number" == typeof f.expires && (f.expires = new Date(1 * new Date + 864e5 * f.expires)),
                f.expires = f.expires ? f.expires.toUTCString() : "";
                try {
                    var g = JSON.stringify(c);
                    /^[\{\[]/.test(g) && (c = g)
                } catch (j) {}
                c = d.write ? d.write(c, b) : encodeURIComponent(c + "").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                b = encodeURIComponent(b + "").replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var h = "";
                for (var i in f)
                    f[i] && (h += "; " + i,
                    !0 !== f[i] && (h += "=" + f[i].split(";")[0]));
                return document.cookie = b + "=" + c + h
            }
        }
        function g(a, c) {
            if ("undefined" != typeof document) {
                for (var e = {}, f = document.cookie ? document.cookie.split("; ") : [], g = 0; g < f.length; g++) {
                    var h = f[g].split("=")
                      , i = h.slice(1).join("=");
                    c || '"' !== i.charAt(0) || (i = i.slice(1, -1));
                    try {
                        var j = b(h[0]);
                        if (i = (d.read || d)(i, j) || b(i),
                        c)
                            try {
                                i = JSON.parse(i)
                            } catch (k) {}
                        if (e[j] = i,
                        a === j)
                            break
                    } catch (k) {}
                }
                return a ? e[a] : e
            }
        }
        return e.set = f,
        e.get = function(a) {
            return g(a, !1)
        }
        ,
        e.getJSON = function(a) {
            return g(a, !0)
        }
        ,
        e.remove = function(b, c) {
            f(b, "", a(c, {
                expires: -1
            }))
        }
        ,
        e.defaults = {},
        e.withConverter = c,
        e
    }
    return c(function() {})
});
/* ========================================================================
* Bootstrap: affix.js v3.4.1
* https://getbootstrap.com/docs/3.4/javascript/#affix
* ========================================================================
* Copyright 2011-2019 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

+function($) {
    'use strict';

    // AFFIX CLASS DEFINITION
    // ======================

    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options)

        var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target)

        this.$target = target.on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this))

        this.$element = $(element)
        this.affixed = null
        this.unpin = null
        this.pinnedOffset = null
        this.options.targetElement = this.options.targetElement || $("body");
        this.options.affixClass = this.options.affixClass || "affixClass"
        this.checkPosition()
    }

    Affix.VERSION = '3.4.1'

    Affix.RESET = 'affix affix-top affix-bottom'

    Affix.DEFAULTS = {
        offset: 0,
        target: window
    }

    Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop()
        var position = this.$element.offset()
        var targetHeight = this.$target.height()

        if (offsetTop != null && this.affixed == 'top')
            return scrollTop < offsetTop ? 'top' : false

        if (this.affixed == 'bottom') {
            if (offsetTop != null)
                return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
            return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
        }

        var initializing = this.affixed == null
        var colliderTop = initializing ? scrollTop : position.top
        var colliderHeight = initializing ? targetHeight : height

        if (offsetTop != null && scrollTop <= offsetTop)
            return 'top'
        if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom))
            return 'bottom'

        return false
    }

    Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset
        this.$element.removeClass(Affix.RESET).addClass('affix')
        var scrollTop = this.$target.scrollTop()
        var position = this.$element.offset()
        return (this.pinnedOffset = position.top - scrollTop)
    }

    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1)
    }

    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible'))
            return

        var height = this.$element.height()
        var offset = this.options.offset
        var offsetTop = offset.top
        var offsetBottom = offset.bottom
        var scrollHeight = Math.max($(document).height(), $(document.body).height())

        if (typeof offset != 'object')
            offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function')
            offsetTop = offset.top(this.$element)
        if (typeof offsetBottom == 'function')
            offsetBottom = offset.bottom(this.$element)

        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

        if (this.affixed != affix) {
            if (this.unpin != null)
                this.$element.css('top', '')

            var affixType = 'affix' + (affix ? '-' + affix : '')
            var e = $.Event(affixType + '.bs.affix')

            this.$element.trigger(e)

            if (e.isDefaultPrevented())
                return

            this.affixed = affix
            this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

            var classMethod = (affixType == "affix") ? "addClass" : "removeClass"
            this.options.targetElement[classMethod](this.options.affixClass);

            this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
        }

        if (affix == 'bottom') {
            this.$element.offset({
                top: scrollHeight - height - offsetBottom
            })
        }
    }

    // AFFIX PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.affix')
            var options = typeof option == 'object' && option

            if (!data)
                $this.data('bs.affix', (data = new Affix(this,options)))
            if (typeof option == 'string')
                data[option]()
        })
    }

    var old = $.fn.affix

    $.fn.affix = Plugin
    $.fn.affix.Constructor = Affix

    // AFFIX NO CONFLICT
    // =================

    $.fn.affix.noConflict = function() {
        $.fn.affix = old
        return this
    }

    // AFFIX DATA-API
    // ==============

    $(window).on('load', function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this)
            var data = $spy.data()

            data.offset = data.offset || {}

            if (data.offsetBottom != null)
                data.offset.bottom = data.offsetBottom
            if (data.offsetTop != null)
                data.offset.top = data.offsetTop

            Plugin.call($spy, data)
        })
    })

}(jQuery);

define("new-affix", function() {});

define('menu', ["new-affix", "helper"], function() {
    // 导航栏滚轮
    var breakpoint1200 = 1025;
    var $header = $("header");
    var $subnav = $(".main-subnav");
    var $pointNav = $(".point-content-nav");
    var before = 0;

    function navTabs() {
        var $nt = $(".nav-tabs");
        setTimeout(function() {
            $(".nav.nav-tabs").trigger("scroll.nav-arrow");
        }, 100);
        if ($nt.data("nav-arrow"))
            return;
        $nt.data("nav-arrow", true);
        $(".nav-tabs").addClass("has-nav-arrow");
        if ($(".nav-arrow").length < 1) {
            $(".nav-tabs").after('<a class="nav-arrow nav-arrow-prev js-nav-arrow-prev hidden" data-target=".nav-tabs">' + '<i class="iconfont icon-arrow-left icon-arrow-lift"></i></a>').after('<a class="nav-arrow nav-arrow-next js-nav-arrow-next hidden" data-target=".nav-tabs">' + '<i class="iconfont icon-arrow-right"></i></a>');
        }
    }
    // 选中的li居中
    function hashChange() {
        let num = 0
        if ($(window).width() <= 768 && window.location.hash && $(".nav-tabs li").length) {
            if ($(".nav-tabs li").find("a[href='" + window.location.hash + "']").length) {
                let $t = $(".nav-tabs li").find("a[href='" + window.location.hash + "']").parent()
                let overWidth = $(".nav-tabs").width()
                num = $t.position().left - (overWidth / 2) + ($t.width() / 2)
                if (num < 0)
                    return
                $(".nav-tabs").animate({
                    scrollLeft: num
                })
            }
        }
    }
    window.onhashchange = hashChange()
    var arr = []
    var tabs = $(".nav-tabs ul").length ? $(".nav-tabs ul") : $(".nav-tabs")
    for (var i = 0; i < $(".nav-tabs li").length; i++) {
        arr.push(tabs.children().eq(i).position() ? tabs.children().eq(i).position().left : 0)
    }
    $('.nav-tabs li').on('click', function(e) {
        var $t = $(this)
        let overWidth = $(".nav-tabs").width()
        let num = 0
        num = arr[$t.index()] - (overWidth / 2) + ($t.width() / 2)
        if (num < 0) {
            $(".nav-tabs").animate({
                scrollLeft: 0
            })
        } else {
            $(".nav-tabs").animate({
                scrollLeft: arr[$t.index()] - (overWidth / 2) + ($t.width() / 2)
            })
        }
    })
    // 标签栏内容不够显示时左右滚动
    $(document).on("click", ".js-nav-arrow-next", function(e) {
        // debugger;
        var $t = $(this);
        var $p = $t.parent().find($(this).attr("data-target"));
        $p.animate({
            scrollLeft: $p.scrollLeft() + 250
        });
        return false;
    });
    $(document).on("click", ".js-nav-arrow-prev", function(e) {
        // debugger;
        var $t = $(this);
        var $p = $t.parent().find($(this).attr("data-target"));
        $p.animate({
            scrollLeft: $p.scrollLeft() - 250
        });
        return false;
    });

    $(".nav.nav-tabs").on("scroll.nav-arrow", function(e) {
        var $t = $(this);
        var $l = $t.parent().find(".js-nav-arrow-prev");
        var $r = $t.parent().find(".js-nav-arrow-next");
        if ($t.prop("scrollWidth") < $t.outerWidth() + 5) {
            $r.addClass("hidden");
            $l.addClass("hidden");
            return;
        }
        if (($t.scrollLeft() + $t.prop("offsetWidth") + 5) >= $t.prop("scrollWidth")) {
            $r.addClass("hidden");
            $l.removeClass("hidden");
        } else {
            $r.removeClass("hidden");
        }

        if ($t.scrollLeft() <= 0) {
            $l.addClass("hidden");
            $r.removeClass("hidden");
        } else
            $l.removeClass("hidden");
    });
    setTimeout(function() {
        $(".nav.nav-tabs").trigger("scroll.nav-arrow");
    }, 1000);

    // 导航菜单固定占位符
    $header.wrap('<div class="affix-placeholder" style="min-height:' + $header.outerHeight(true) + 'px"></div>');
    $subnav.wrap('<div class="affix-placeholder" style="min-height:' + $subnav.outerHeight(true) + 'px"></div>');
    $pointNav.wrap('<div class="affix-placeholder" style="height:' + $pointNav.outerHeight(true) + 'px"></div>');
    $(".pvp-tab-box .tab-line .nav-tabs").addClass("nav-fixed-tabs");
    var $tabAffix = $(".nav-tabs.nav-fixed-tabs").wrap("<div class='js-nav-tabs-fixed scroll-tab-arrow-box'></div>").parent();
    $tabAffix.wrap('<div class="affix-placeholder" style="height:' + $tabAffix.children(".nav-tabs").outerHeight(true) + 'px"></div>');
    var $body = $("body");
    // 菜单滚动指定位置固定
    $header.on("affix.bs.affix", function() {
        $body.addClass("header-affix");
    }).on("affix-top.bs.affix", function() {
        $body.removeClass("header-affix");
    }).affix({
        // affixClass: "header-affix",
        offset: {
            top: function(el) {
                return $(el).parent().offset().top + 1;
            }
        }
    });

    $subnav.on("affix.bs.affix", function() {
        $body.addClass("subnav-affix");
    }).on("affix-top.bs.affix", function() {
        $body.removeClass("subnav-affix");
    }).affix({
        // affixClass: "subnav-affix",
        offset: {
            top: function(el) {
                return $(el).parent().offset().top;
            }
        }
    });

    $pointNav.on("affix.bs.affix", function() {
        $body.addClass("pointNav-affix");
    }).on("affix-top.bs.affix", function() {
        $body.removeClass("pointNav-affix");
    }).affix({
        // affixClass: "pointNav-affix",
        offset: {
            top: function(el) {
                return $(el).parent().offset().top;
            }
        }
    });

    $tabAffix.on("affix.bs.affix", function() {
        $body.addClass("tab-affix");
    }).on("affix-top.bs.affix", function() {
        $body.removeClass("tab-affix");
    }).affix({
        // affixClass: "tab-affix",
        offset: {
            top: function(el) {
                return $(el).parent().offset().top - 2;
            }
        }
    });

    $(document).on("hide-header-menu", function() {
        $("body").addClass("scrollDown").removeClass("scrollUp").addClass("subnav-hide");
    });
    function hideHeader() {
        $(document).trigger("hide-header-menu");
    }
    $(document).on("scroll-goto.nav", function(e, target, offset) {
        window.scrollKey = false;
        if ($('.affix-placeholder .main-subnav .nav-box .navbar-collapse').length) {
            $('.affix-placeholder .main-subnav .nav-box .navbar-collapse.collapse').removeClass('in')
            $('.affix-placeholder .main-subnav .nav-box .name').addClass('collapsed')
            $('.affix-placeholder .main-subnav .nav-box .name').attr('aria-expanded', false)
        }
        var $tg = $(target);
        if ($tg.hasClass("affix"))
            $tg = $tg.parent();
        var to = $tg && $tg.offset() ? $tg.offset().top : undefined;
        if (offset) {
            to += offset;
        }

        hideHeader();
        $("html, body").stop(true).animate({
            scrollTop: to
        }).promise().then(function() {
            hideHeader();
            setTimeout(function() {
                window.scrollKey = true;
            }, 200);
        });
    });
    function userScroll(_e) {
        var wWidth = window.innerWidth || Math.max(document.documentElement.clientHeight, document.body.clientHeight);
        if (!window.scrollKey)
            return;
        if (wWidth > breakpoint1200) {
            $(".b-search-keyword").hide();
        }
        var after = $(window).scrollTop();
        if (Math.abs(after - before) < 10)
            return;

        $("body").removeClass("subnav-hide");
        if (after >= before) {
            $("body").removeClass("scrollUp").addClass("scrollDown");
            if ($('.affix-placeholder .js-nav-tabs-fixed.scroll-tab-arrow-box').length || $('.affix-placeholder .point-content-nav .point-content-nav-active').length) {
                $('.affix-placeholder .main-subnav .nav-box .navbar-collapse.collapse').removeClass('in')
                $('.affix-placeholder .main-subnav .nav-box .name').addClass('collapsed')
                $('.affix-placeholder .main-subnav .nav-box .name').attr('aria-expanded', false)
            }
        } else {
            $("body").removeClass("scrollDown").addClass("scrollUp");
        }
        before = after;
    }
    userScroll();
    $(window).on("scroll", $.debounce(userScroll, 50));
    navTabs();
});

define('text-dotdotdot', ['require', // 'jquery.dotdotdot.min',
'helper'], function(require, factory) {
    var huawei = huawei || {};

    String.prototype.unescapeHtml = function() {
        var s = "";
        s = this.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "");
        return s;
    }
    ;

    function dotdotdotCallback(isTruncated, originalContent) {
        var $tog = $(".toggle", this);
        if (!isTruncated) {
            $tog.remove();
        } else {
            $tog.html($tog.attr("data-more-text") || "more");
        }
    }

    $(function($) {
        setTimeout(function() {
            huawei.textDot();
            huawei.textDotMoreLess();
            huawei.tabChangeTextDot();
        }, 500);

        $(document).on("text-dotdotdot", function(e) {
            setTimeout(function() {
                huawei.textDot();
            }, 200);
        });
    });

    huawei.textDot = function() {
        $(".js-text-dot-en").filter(":visible").not(".is-truncated").removeAttr("style").dotdotdot({
            after: '.toggle',
            callback: dotdotdotCallback // wrap: 'letter'
        });
        $(".js-text-dot-cn").filter(":visible").not(".is-truncated").removeAttr("style").dotdotdot({
            wrap: 'letter',
            // 注：中文必须改为letter
            ellipsis: "...",
            after: '.toggle',
            callback: dotdotdotCallback
        });
    }
    ;

    huawei.textDotMoreLess = function() {
        $(document).on('click', '.js-text-dot-en .toggle, .js-text-dot-cn .toggle', function() {
            var $t = $(this);
            var $p = $t.closest('.js-text-dot-en, .js-text-dot-cn');
            if ($p.hasClass("is-truncated")) {
                $p.trigger('destroy').css('max-height', 'none').css("height", "auto");
                $p.find(".toggle").html($t.attr("data-less-text") || "less");
                return false;
            }
            var ops = {
                ellipsis: "...",
                after: ".toggle",
                callback: dotdotdotCallback
            };
            if ($p.hasClass("js-text-dot-cn"))
                ops["wrap"] = 'letter';

            $p.css("max-height", "").height("");
            setTimeout(function() {
                $p.dotdotdot(ops);
            }, 100);

            return false;
        });
    }
    ;

    huawei.tabChangeTextDot = function() {
        $(document).on("shown.bs.tab shown.bs.collapse", ".js-tab-dot a", function() {
            $(document).trigger("text-dotdotdot");
        });
    }
    ;
    return huawei;
});

/*!
* jQuery Mobile Virtual Mouse @VERSION
* http://jquerymobile.com
*
* Copyright jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*/

//>>label: Virtual Mouse (vmouse) Bindings
//>>group: Core
//>>description: Normalizes touch/mouse events.
//>>docs: http://api.jquerymobile.com/?s=vmouse

// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define('jquery.mobile.vmouse', ["jquery"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}
)(function($) {

    var dataPropertyName = "virtualMouseBindings", touchTargetPropertyName = "virtualTouchID", touchEventProps = "clientX clientY pageX pageY screenX screenY".split(" "), virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "), generalProps = ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "), mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [], mouseEventProps = generalProps.concat(mouseHookProps), activeDocHandlers = {}, resetTimerID = 0, startX = 0, startY = 0, didScroll = false, clickBlockList = [], blockMouseTriggers = false, blockTouchTriggers = false, eventCaptureSupported = "addEventListener"in document, $document = $(document), nextTouchID = 1, lastTouchID = 0, threshold, i;

    $.vmouse = {
        moveDistanceThreshold: 10,
        clickDistanceThreshold: 10,
        resetTimerDuration: 1500,
        maximumTimeBetweenTouches: 100
    };

    function getNativeEvent(event) {

        while (event && typeof event.originalEvent !== "undefined") {
            event = event.originalEvent;
        }
        return event;
    }

    function createVirtualEvent(event, eventType) {

        var t = event.type, oe, props, ne, prop, ct, touch, i, j, len;

        event = $.Event(event);
        event.type = eventType;

        oe = event.originalEvent;
        props = generalProps;

        // addresses separation of $.event.props in to $.event.mouseHook.props and Issue 3280
        // https://github.com/jquery/jquery-mobile/issues/3280
        if (t.search(/^(mouse|click)/) > -1) {
            props = mouseEventProps;
        }

        // copy original event properties over to the new event
        // this would happen if we could call $.event.fix instead of $.Event
        // but we don't have a way to force an event to be fixed multiple times
        if (oe) {
            for (i = props.length; i; ) {
                prop = props[--i];
                event[prop] = oe[prop];
            }
        }

        // make sure that if the mouse and click virtual events are generated
        // without a .which one is defined
        if (t.search(/mouse(down|up)|click/) > -1 && !event.which) {
            event.which = 1;
        }

        if (t.search(/^touch/) !== -1) {
            ne = getNativeEvent(oe);
            t = ne.touches;
            ct = ne.changedTouches;
            touch = (t && t.length) ? t[0] : ((ct && ct.length) ? ct[0] : undefined);

            if (touch) {
                for (j = 0,
                len = touchEventProps.length; j < len; j++) {
                    prop = touchEventProps[j];
                    event[prop] = touch[prop];
                }
            }
        }

        return event;
    }

    function getVirtualBindingFlags(element) {

        var flags = {}, b, k;

        while (element) {

            b = $.data(element, dataPropertyName);

            for (k in b) {
                if (b[k]) {
                    flags[k] = flags.hasVirtualBinding = true;
                }
            }
            element = element.parentNode;
        }
        return flags;
    }

    function getClosestElementWithVirtualBinding(element, eventType) {
        var b;
        while (element) {

            b = $.data(element, dataPropertyName);

            if (b && (!eventType || b[eventType])) {
                return element;
            }
            element = element.parentNode;
        }
        return null;
    }

    function enableTouchBindings() {
        blockTouchTriggers = false;
    }

    function disableTouchBindings() {
        blockTouchTriggers = true;
    }

    function enableMouseBindings() {
        lastTouchID = 0;
        clickBlockList.length = 0;
        blockMouseTriggers = false;

        // When mouse bindings are enabled, our
        // touch bindings are disabled.
        disableTouchBindings();
    }

    function disableMouseBindings() {
        // When mouse bindings are disabled, our
        // touch bindings are enabled.
        enableTouchBindings();
    }

    function clearResetTimer() {
        if (resetTimerID) {
            clearTimeout(resetTimerID);
            resetTimerID = 0;
        }
    }

    function startResetTimer() {
        clearResetTimer();
        resetTimerID = setTimeout(function() {
            resetTimerID = 0;
            enableMouseBindings();
        }, $.vmouse.resetTimerDuration);
    }

    function triggerVirtualEvent(eventType, event, flags) {
        var ve;

        if ((flags && flags[eventType]) || (!flags && getClosestElementWithVirtualBinding(event.target, eventType))) {

            ve = createVirtualEvent(event, eventType);

            $(event.target).trigger(ve);
        }

        return ve;
    }

    function mouseEventCallback(event) {
        var touchID = $.data(event.target, touchTargetPropertyName), ve;

        // It is unexpected if a click event is received before a touchend
        // or touchmove event, however this is a known behavior in Mobile
        // Safari when Mobile VoiceOver (as of iOS 8) is enabled and the user
        // double taps to activate a link element. In these cases if a touch
        // event is not received within the maximum time between touches,
        // re-enable mouse bindings and call the mouse event handler again.
        if (event.type === "click" && $.data(event.target, "lastTouchType") === "touchstart") {
            setTimeout(function() {
                if ($.data(event.target, "lastTouchType") === "touchstart") {
                    enableMouseBindings();
                    delete $.data(event.target).lastTouchType;
                    mouseEventCallback(event);
                }
            }, $.vmouse.maximumTimeBetweenTouches);
        }

        if (!blockMouseTriggers && (!lastTouchID || lastTouchID !== touchID)) {
            ve = triggerVirtualEvent("v" + event.type, event);
            if (ve) {
                if (ve.isDefaultPrevented()) {
                    event.preventDefault();
                }
                if (ve.isPropagationStopped()) {
                    event.stopPropagation();
                }
                if (ve.isImmediatePropagationStopped()) {
                    event.stopImmediatePropagation();
                }
            }
        }
    }

    function handleTouchStart(event) {

        var touches = getNativeEvent(event).touches, target, flags, t;

        if (touches && touches.length === 1) {

            target = event.target;
            flags = getVirtualBindingFlags(target);

            $.data(event.target, "lastTouchType", event.type);

            if (flags.hasVirtualBinding) {

                lastTouchID = nextTouchID++;
                $.data(target, touchTargetPropertyName, lastTouchID);

                clearResetTimer();

                disableMouseBindings();
                didScroll = false;

                t = getNativeEvent(event).touches[0];
                startX = t.pageX;
                startY = t.pageY;

                triggerVirtualEvent("vmouseover", event, flags);
                triggerVirtualEvent("vmousedown", event, flags);
            }
        }
    }

    function handleScroll(event) {
        if (blockTouchTriggers) {
            return;
        }

        if (!didScroll) {
            triggerVirtualEvent("vmousecancel", event, getVirtualBindingFlags(event.target));
        }

        $.data(event.target, "lastTouchType", event.type);

        didScroll = true;
        startResetTimer();
    }

    function handleTouchMove(event) {
        if (blockTouchTriggers) {
            return;
        }

        var t = getNativeEvent(event).touches[0]
          , didCancel = didScroll
          , moveThreshold = $.vmouse.moveDistanceThreshold
          , flags = getVirtualBindingFlags(event.target);

        $.data(event.target, "lastTouchType", event.type);

        didScroll = didScroll || (Math.abs(t.pageX - startX) > moveThreshold || Math.abs(t.pageY - startY) > moveThreshold);

        if (didScroll && !didCancel) {
            triggerVirtualEvent("vmousecancel", event, flags);
        }

        triggerVirtualEvent("vmousemove", event, flags);
        startResetTimer();
    }

    function handleTouchEnd(event) {
        if (blockTouchTriggers || $.data(event.target, "lastTouchType") === undefined) {
            return;
        }

        disableTouchBindings();
        delete $.data(event.target).lastTouchType;

        var flags = getVirtualBindingFlags(event.target), ve, t;
        triggerVirtualEvent("vmouseup", event, flags);

        if (!didScroll) {
            ve = triggerVirtualEvent("vclick", event, flags);
            if (ve && ve.isDefaultPrevented()) {
                // The target of the mouse events that follow the touchend
                // event don't necessarily match the target used during the
                // touch. This means we need to rely on coordinates for blocking
                // any click that is generated.
                t = getNativeEvent(event).changedTouches[0];
                clickBlockList.push({
                    touchID: lastTouchID,
                    x: t.clientX,
                    y: t.clientY
                });

                // Prevent any mouse events that follow from triggering
                // virtual event notifications.
                blockMouseTriggers = true;
            }
        }
        triggerVirtualEvent("vmouseout", event, flags);
        didScroll = false;

        startResetTimer();
    }

    function hasVirtualBindings(ele) {
        var bindings = $.data(ele, dataPropertyName), k;

        if (bindings) {
            for (k in bindings) {
                if (bindings[k]) {
                    return true;
                }
            }
        }
        return false;
    }

    function dummyMouseHandler() {}

    function getSpecialEventObject(eventType) {
        var realType = eventType.substr(1);

        return {
            setup: function(/* data, namespace */
            ) {
                // If this is the first virtual mouse binding for this element,
                // add a bindings object to its data.

                if (!hasVirtualBindings(this)) {
                    $.data(this, dataPropertyName, {});
                }

                // If setup is called, we know it is the first binding for this
                // eventType, so initialize the count for the eventType to zero.
                var bindings = $.data(this, dataPropertyName);
                bindings[eventType] = true;

                // If this is the first virtual mouse event for this type,
                // register a global handler on the document.

                activeDocHandlers[eventType] = (activeDocHandlers[eventType] || 0) + 1;

                if (activeDocHandlers[eventType] === 1) {
                    $document.bind(realType, mouseEventCallback);
                }

                // Some browsers, like Opera Mini, won't dispatch mouse/click events
                // for elements unless they actually have handlers registered on them.
                // To get around this, we register dummy handlers on the elements.

                $(this).bind(realType, dummyMouseHandler);

                // For now, if event capture is not supported, we rely on mouse handlers.
                if (eventCaptureSupported) {
                    // If this is the first virtual mouse binding for the document,
                    // register our touchstart handler on the document.

                    activeDocHandlers["touchstart"] = (activeDocHandlers["touchstart"] || 0) + 1;

                    if (activeDocHandlers["touchstart"] === 1) {
                        $document.bind("touchstart", handleTouchStart).bind("touchend", handleTouchEnd)
                        // On touch platforms, touching the screen and then dragging your finger
                        // causes the window content to scroll after some distance threshold is
                        // exceeded. On these platforms, a scroll prevents a click event from being
                        // dispatched, and on some platforms, even the touchend is suppressed. To
                        // mimic the suppression of the click event, we need to watch for a scroll
                        // event. Unfortunately, some platforms like iOS don't dispatch scroll
                        // events until *AFTER* the user lifts their finger (touchend). This means
                        // we need to watch both scroll and touchmove events to figure out whether
                        // or not a scroll happenens before the touchend event is fired.

                        .bind("touchmove", handleTouchMove).bind("scroll", handleScroll);
                    }
                }
            },

            teardown: function(/* data, namespace */
            ) {
                // If this is the last virtual binding for this eventType,
                // remove its global handler from the document.

                --activeDocHandlers[eventType];

                if (!activeDocHandlers[eventType]) {
                    $document.unbind(realType, mouseEventCallback);
                }

                if (eventCaptureSupported) {
                    // If this is the last virtual mouse binding in existence,
                    // remove our document touchstart listener.

                    --activeDocHandlers["touchstart"];

                    if (!activeDocHandlers["touchstart"]) {
                        $document.unbind("touchstart", handleTouchStart).unbind("touchmove", handleTouchMove).unbind("touchend", handleTouchEnd).unbind("scroll", handleScroll);
                    }
                }

                var $this = $(this)
                  , bindings = $.data(this, dataPropertyName);

                // teardown may be called when an element was
                // removed from the DOM. If this is the case,
                // jQuery core may have already stripped the element
                // of any data bindings so we need to check it before
                // using it.
                if (bindings) {
                    bindings[eventType] = false;
                }

                // Unregister the dummy event handler.

                $this.unbind(realType, dummyMouseHandler);

                // If this is the last virtual mouse binding on the
                // element, remove the binding data from the element.

                if (!hasVirtualBindings(this)) {
                    $this.removeData(dataPropertyName);
                }
            }
        };
    }

    // Expose our custom events to the jQuery bind/unbind mechanism.

    for (i = 0; i < virtualEventNames.length; i++) {
        $.event.special[virtualEventNames[i]] = getSpecialEventObject(virtualEventNames[i]);
    }

    // Add a capture click handler to block clicks.
    // Note that we require event capture support for this so if the device
    // doesn't support it, we punt for now and rely solely on mouse events.
    if (eventCaptureSupported) {
        document.addEventListener("click", function(e) {
            var cnt = clickBlockList.length, target = e.target, x, y, ele, i, o, touchID;

            if (cnt) {
                x = e.clientX;
                y = e.clientY;
                threshold = $.vmouse.clickDistanceThreshold;

                // The idea here is to run through the clickBlockList to see if
                // the current click event is in the proximity of one of our
                // vclick events that had preventDefault() called on it. If we find
                // one, then we block the click.
                //
                // Why do we have to rely on proximity?
                //
                // Because the target of the touch event that triggered the vclick
                // can be different from the target of the click event synthesized
                // by the browser. The target of a mouse/click event that is synthesized
                // from a touch event seems to be implementation specific. For example,
                // some browsers will fire mouse/click events for a link that is near
                // a touch event, even though the target of the touchstart/touchend event
                // says the user touched outside the link. Also, it seems that with most
                // browsers, the target of the mouse/click event is not calculated until the
                // time it is dispatched, so if you replace an element that you touched
                // with another element, the target of the mouse/click will be the new
                // element underneath that point.
                //
                // Aside from proximity, we also check to see if the target and any
                // of its ancestors were the ones that blocked a click. This is necessary
                // because of the strange mouse/click target calculation done in the
                // Android 2.1 browser, where if you click on an element, and there is a
                // mouse/click handler on one of its ancestors, the target will be the
                // innermost child of the touched element, even if that child is no where
                // near the point of touch.

                ele = target;

                while (ele) {
                    for (i = 0; i < cnt; i++) {
                        o = clickBlockList[i];
                        touchID = 0;

                        if ((ele === target && Math.abs(o.x - x) < threshold && Math.abs(o.y - y) < threshold) || $.data(ele, touchTargetPropertyName) === o.touchID) {
                            // XXX: We may want to consider removing matches from the block list
                            //      instead of waiting for the reset timer to fire.
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                        }
                    }
                    ele = ele.parentNode;
                }
            }
        }, true);
    }
});

define('photo', ['require', 'jquery.mobile.vmouse'], function(require, mobile) {
    var huawei = huawei || {};

    $(function($) {
        if ($(window).width() > 768)
            return;

        if (!/msie [6-8]/i.test(navigator.userAgent)) {
            $.fn.fancybox = null;
            jQuery.loadCSS("https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css");
            $.loadJS('https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js').then(function() {
                huawei.imagePinchzoom();
            });
        }
    });

    huawei.imagePinchzoom = function() {
        if ($(window).width() > 768)
            return;
        var closeable = true;
        var closeTimer = null;
        var oldTime = 0;
        var Hammer = window.Hammer;

        $.loadJS('https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js').then(function(d) {
            if (d)
                (Hammer = d);
        });

        $(document).off('vclick.zoom', 'img').on('vclick.zoom', 'img', function(e) {
            if ($(this).prop('naturalWidth') < 200)
                return;
            if ($(this).hasClass('js-no-zoom'))
                return;

            if ($(this).closest('.fancybox-container').length > 0 || $(this).closest('a').length > 0)
                return;
            closeable = false;
            setTimeout(function() {
                closeable = true;
            }, 800);

            $.fancybox.open([{
                src: this.src,
                opts: {// caption: 'First caption',
                // thumb: '1_s.jpg'
                }
            }], {
                toolbar: false,
                loop: false
            });
            $('.fancybox-container').addClass('mobile-big-img-container');
            var myElement = $('.fancybox-container').get(0);
            var mc = new Hammer(myElement,{});
            var singleTap = new Hammer.Tap({
                event: 'tap'
            });
            var doubleTap = new Hammer.Tap({
                event: 'doubletap',
                taps: 2
            });
            var tripleTap = new Hammer.Tap({
                event: 'tripletap',
                taps: 3
            });

            mc.add([tripleTap, doubleTap, singleTap]);

            tripleTap.recognizeWith([doubleTap, singleTap]);
            doubleTap.recognizeWith(singleTap);

            doubleTap.requireFailure(tripleTap);
            singleTap.requireFailure([tripleTap, doubleTap]);
            // listen to events...
            mc.on('tap', function(ev) {
                $('.fancybox-button--close').trigger('click');
            });
        });
    }
    ;

    return huawei;
});

define('plugins/videojs-plugins', [], function() {
    'use strict';

    $(document).on("videojs-loaded.videojs-resolution-switcher", function() {
        $("<style>video+.vjs-resolution-button-label {display:none;}.vjs-resolution-button {  color: #ccc;  font-family: VideoJS;}.vjs-resolution-button > .vjs-menu-button {  position: absolute;  top: 0;  left: 0;  width: 100%;  height: 100%;}.vjs-resolution-button .vjs-resolution-button-staticlabel {  pointer-events: none;  font-size: 1em;  line-height: 3em;  text-align: center;}/* .vjs-resolution-button .vjs-resolution-button-staticlabel:before {  content: '\f110';  font-size: 1.8em;  line-height: 1.67;} */.vjs-resolution-button .vjs-resolution-button-label {    pointer-events: none;    font-size: 1em;    line-height: 3em;    position: absolute;    top: 0;    left: 0;    width: 100%;    height: 100%;    text-align: center;    box-sizing: inherit;		font-family: Arial, Helvetica, sans-serif;}.vjs-resolution-button ul.vjs-menu-content {  width: 4em !important;}.vjs-resolution-button .vjs-menu {  left: 0;  bottom: 0;}.vjs-resolution-button .vjs-menu li {  text-transform: none;	font-size: 1em;	font-family: Arial, Helvetica, sans-serif;}</style>").prependTo("head");

        /*! videojs-resolution-switcher - 2015-7-26
         * Copyright (c) 2016 Kasper Moskwiak
         * Modified by Pierre Kraft
         * Licensed under the Apache-2.0 license. */
        !function() {
            "use strict";
            var e = null;
            e = void 0 === window.videojs && "function" == typeof require ? require("video.js") : window.videojs,
            function(e, t) {
                var l, s = {}, r = {}, i = {};
                function o(e, t, l, s) {
                    return r = {
                        label: l,
                        sources: t
                    },
                    "function" == typeof s ? s(e, t, l) : (e.src(t.map(function(e) {
                        return {
                            src: e.src,
                            type: e.type,
                            res: e.res
                        }
                    })),
                    e)
                }
                var n = t.getComponent("MenuItem")
                  , a = t.extend(n, {
                    constructor: function(e, t, l, s) {
                        this.onClickListener = l,
                        this.label = s,
                        n.call(this, e, t),
                        this.src = t.src,
                        this.on("click", this.onClick),
                        this.on("touchstart", this.onClick),
                        t.initialySelected && (this.showAsLabel(),
                        this.selected(!0),
                        this.addClass("vjs-selected"))
                    },
                    showAsLabel: function() {
                        this.label && (this.label.innerHTML = this.options_.label)
                    },
                    onClick: function(e) {
                        this.onClickListener(this);
                        var t = this.player_.currentTime()
                          , l = this.player_.paused()
                          , s = this.player_.playbackRate()
                          , r = this.player_.options_.poster;
                        this.showAsLabel(),
                        this.addClass("vjs-selected");
                        var i = this.player_;
                        setTimeout(function() {
                            i.play()
                        }, 500),
                        l ? this.player_.bigPlayButton.show() : (this.player_.bigPlayButton.hide(),
                        r && this.player_.posterImage.setSrc("")),
                        "function" != typeof e && "function" == typeof this.options_.customSourcePicker && (e = this.options_.customSourcePicker);
                        var n = "loadeddata";
                        "Youtube" !== this.player_.techName_ && "none" === this.player_.preload() && "Flash" !== this.player_.techName_ && (n = "timeupdate"),
                        o(this.player_, this.src, this.options_.label, e).one(n, function() {
                            this.player_.currentTime(t),
                            l || (this.player_.playbackRate(s),
                            this.player_.play(),
                            this.player_.posterImage.setSrc(r)),
                            this.player_.trigger("resolutionchange")
                        })
                    }
                })
                  , c = t.getComponent("MenuButton")
                  , u = t.extend(c, {
                    constructor: function(e, l, s, r) {
                        if (this.sources = l.sources,
                        this.label = r,
                        this.label.innerHTML = l.initialySelectedLabel,
                        c.call(this, e, l, s),
                        this.controlText("Quality"),
                        s.dynamicLabel)
                            this.el().appendChild(r);
                        else {
                            var i = document.createElement("span");
                            t.dom.appendContent(i, l.initialySelectedLabel),
                            t.dom.addClass(i, "vjs-resolution-button-staticlabel"),
                            this.el().appendChild(i)
                        }
                    },
                    createItems: function() {
                        var e = []
                          , t = this.sources && this.sources.label || {}
                          , l = function(t) {
                            e.map(function(e) {
                                e.selected(e === t),
                                e.removeClass("vjs-selected")
                            })
                        };
                        for (var s in t)
                            t.hasOwnProperty(s) && (e.push(new a(this.player_,{
                                label: s,
                                src: t[s],
                                initialySelected: s === this.options_.initialySelectedLabel,
                                customSourcePicker: this.options_.customSourcePicker
                            },l,this.label)),
                            i[s] = e[e.length - 1]);
                        return e
                    }
                });
                l = function(e) {
                    var l = t.mergeOptions(s, e)
                      , n = this
                      , a = document.createElement("span")
                      , c = {};
                    function h(e, t) {
                        return e.res && t.res ? +t.res - +e.res : 0
                    }
                    function d(e) {
                        var t = {
                            label: {},
                            res: {},
                            type: {}
                        };
                        return e.map(function(e) {
                            p(t, "label", e),
                            p(t, "res", e),
                            p(t, "type", e),
                            y(t, "label", e),
                            y(t, "res", e),
                            y(t, "type", e)
                        }),
                        t
                    }
                    function p(e, t, l) {
                        null == e[t][l[t]] && (e[t][l[t]] = [])
                    }
                    function y(e, t, l) {
                        e[t][l[t]].push(l)
                    }
                    t.dom.addClass(a, "vjs-resolution-button-label"),
                    this.el().appendChild(a),
                    n.updateSrc = function(e) {
                        if (!e)
                            return n.src();
                        n.controlBar.resolutionSwitcher && (n.controlBar.resolutionSwitcher.dispose(),
                        delete n.controlBar.resolutionSwitcher),
                        e = e.sort(h);
                        var s = function(e, t) {
                            var s = l.default
                              , r = "";
                            "high" === s ? (s = t[0].res,
                            r = t[0].label) : "low" !== s && null != s && e.res[s] ? e.res[s] && (r = e.res[s][0].label) : (s = t[t.length - 1].res,
                            r = t[t.length - 1].label);
                            return {
                                res: s,
                                label: r,
                                sources: e.res[s]
                            }
                        }(c = d(e), e)
                          , r = new u(n,{
                            sources: c,
                            initialySelectedLabel: s.label,
                            initialySelectedRes: s.res,
                            customSourcePicker: l.customSourcePicker
                        },l,a);
                        return t.dom.addClass(r.el(), "vjs-resolution-button"),
                        n.controlBar.resolutionSwitcher = n.controlBar.el_.insertBefore(r.el_, n.controlBar.getChild("fullscreenToggle").el_),
                        n.controlBar.resolutionSwitcher.dispose = function() {
                            this.parentNode.removeChild(this)
                        }
                        ,
                        o(n, s.sources, s.label)
                    }
                    ,
                    n.currentResolution = function(e, t) {
                        return console.log("currentResolution: ", e),
                        null == e ? r : (console.log("currentResolution: ", i[e]),
                        null != i[e] && i[e].onClick(t),
                        n)
                    }
                    ,
                    n.getGroupedSrc = function() {
                        return c
                    }
                    ,
                    n.ready(function() {
                        n.options_.sources.length > 1 && n.updateSrc(n.options_.sources),
                        "Youtube" === n.techName_ && function(e) {
                            e.tech_.ytPlayer.setPlaybackQuality("default"),
                            e.tech_.ytPlayer.addEventListener("onPlaybackQualityChange", function() {
                                e.trigger("resolutionchange")
                            }),
                            e.one("play", function() {
                                var t = e.tech_.ytPlayer.getAvailableQualityLevels()
                                  , s = {
                                    highres: {
                                        res: 1080,
                                        label: "1080",
                                        yt: "highres"
                                    },
                                    hd1080: {
                                        res: 1080,
                                        label: "1080",
                                        yt: "hd1080"
                                    },
                                    hd720: {
                                        res: 720,
                                        label: "720",
                                        yt: "hd720"
                                    },
                                    large: {
                                        res: 480,
                                        label: "480",
                                        yt: "large"
                                    },
                                    medium: {
                                        res: 360,
                                        label: "360",
                                        yt: "medium"
                                    },
                                    small: {
                                        res: 240,
                                        label: "240",
                                        yt: "small"
                                    },
                                    tiny: {
                                        res: 144,
                                        label: "144",
                                        yt: "tiny"
                                    },
                                    auto: {
                                        res: 0,
                                        label: "auto",
                                        yt: "default"
                                    }
                                }
                                  , r = [];
                                t.map(function(t) {
                                    r.push({
                                        src: e.src().src,
                                        type: e.src().type,
                                        label: s[t].label,
                                        res: s[t].res,
                                        _yt: s[t].yt
                                    })
                                });
                                var i = "auto"
                                  , o = 0
                                  , n = ((c = d(r)).label.auto,
                                new u(e,{
                                    sources: c,
                                    initialySelectedLabel: i,
                                    initialySelectedRes: o,
                                    customSourcePicker: function(t, l, s) {
                                        return e.tech_.ytPlayer.setPlaybackQuality(l[0]._yt),
                                        e
                                    }
                                },l,a));
                                n.el().classList.add("vjs-resolution-button"),
                                e.controlBar.resolutionSwitcher = e.controlBar.addChild(n)
                            })
                        }(n)
                    })
                }
                ,
                (t.registerPlugin || t.plugin)("videoJsResolutionSwitcher", l)
            }(window, e)
        }();
    });

    $(document).on("videojs-loaded.videojs-ga", function() {
        /*
        * videojs-ga - v0.4.2 - 2015-02-06
        * Copyright (c) 2015 Michael Bensoussan
        * Licensed MIT
        */
        (function() {
            var __indexOf = [].indexOf || function(item) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item)
                        return i;
                }
                return -1;
            }
            ;
            videojs.registerPlugin = videojs.registerPlugin || videojs.plugin;
            videojs.registerPlugin('ga', function(options) {
                var dataSetupOptions, defaultsEventsToTrack, end, error, eventCategory, eventLabel, eventsToTrack, fullscreen, loaded, parsedOptions, pause, percentsAlreadyTracked, percentsPlayedInterval, play, resize, seekEnd, seekStart, seeking, sendbeacon, timeupdate, volumeChange;
                if (options == null) {
                    options = {};
                }
                dataSetupOptions = {};
                if (this.options()["data-setup"]) {
                    parsedOptions = JSON.parse(this.options()["data-setup"]);
                    if (parsedOptions.ga) {
                        dataSetupOptions = parsedOptions.ga;
                    }
                }
                defaultsEventsToTrack = ['loaded', 'percentsPlayed', 'start', 'end', 'seek', 'play', 'pause', 'resize', 'volumeChange', 'error', 'fullscreen', 'downloadvideo', 'resolutionchange'];
                eventsToTrack = options.eventsToTrack || dataSetupOptions.eventsToTrack || defaultsEventsToTrack;
                percentsPlayedInterval = options.percentsPlayedInterval || dataSetupOptions.percentsPlayedInterval || 10;
                eventCategory = options.eventCategory || dataSetupOptions.eventCategory || 'Video';
                eventLabel = options.eventLabel || dataSetupOptions.eventLabel;
                options.debug = options.debug || false;
                percentsAlreadyTracked = [];
                seekStart = seekEnd = 0;
                seeking = false;
                loaded = function() {
                    if (!eventLabel) {
                        eventLabel = this.currentSrc().split("/").slice(-1)[0].replace(/\.(\w{3,4})(\?.*)?$/i, '');
                    }
                    if (__indexOf.call(eventsToTrack, "loadedmetadata") >= 0) {
                        sendbeacon('loadedmetadata', true);
                    }
                }
                ;
                timeupdate = function() {
                    var currentTime, duration, percent, percentPlayed, _i;
                    currentTime = Math.round(this.currentTime());
                    duration = Math.round(this.duration());
                    percentPlayed = Math.round(currentTime / duration * 100);
                    for (percent = _i = 0; _i <= 99; percent = _i += percentsPlayedInterval) {
                        if (percentPlayed >= percent && __indexOf.call(percentsAlreadyTracked, percent) < 0) {
                            if (__indexOf.call(eventsToTrack, "start") >= 0 && percent === 0 && percentPlayed > 0) {
                                sendbeacon('start', false);
                            } else if (__indexOf.call(eventsToTrack, "percentsPlayed") >= 0 && percentPlayed !== 0) {
                                sendbeacon('percent played', false, percent);
                                // utag ga4
                                utagLink({
                                    'tealium_event': 'video_progress',
                                    'video_url': this.currentSrc(),
                                    'video_percent': percent
                                });
                            }
                            if (percentPlayed > 0) {
                                percentsAlreadyTracked.push(percent);
                            }
                        }
                    }
                    if (__indexOf.call(eventsToTrack, "seek") >= 0) {
                        seekStart = seekEnd;
                        seekEnd = currentTime;
                        if (Math.abs(seekStart - seekEnd) > 1) {
                            seeking = true;
                            sendbeacon('seek start', false, seekStart);
                            sendbeacon('seek end', false, seekEnd);
                        }
                    }
                }
                ;
                var isStart = true;
                end = function() {
                    sendbeacon('end', false);
                    isStart = true;
                    utagLink({
                        'tealium_event': 'video_complete',
                        'video_url': this.currentSrc()
                    });
                }
                ;
                play = function() {
                    var currentTime;
                    currentTime = Math.round(this.currentTime());
                    sendbeacon('play', false, currentTime);
                    seeking = false;
                    if (isStart) {
                        isStart = false;
                        utagLink({
                            'tealium_event': 'video_start',
                            'video_url': this.currentSrc()
                        });
                    }
                }
                ;
                pause = function() {
                    var currentTime, duration;
                    currentTime = Math.round(this.currentTime());
                    duration = Math.round(this.duration());
                    if (currentTime !== duration && !seeking) {
                        sendbeacon('pause', false, currentTime);
                    }
                }
                ;
                volumeChange = function() {
                    var volume;
                    volume = this.muted() === true ? 0 : this.volume();
                    sendbeacon('volume change', false, volume);
                }
                ;
                resize = function() {// sendbeacon('resize - ' + this.width() + "*" + this.height(), true);
                }
                ;
                error = function() {
                    var currentTime;
                    currentTime = Math.round(this.currentTime());
                    sendbeacon('error', true, currentTime);
                }
                ;
                fullscreen = function() {
                    var currentTime;
                    currentTime = Math.round(this.currentTime());
                    if ((typeof this.isFullscreen === "function" ? this.isFullscreen() : void 0) || (typeof this.isFullScreen === "function" ? this.isFullScreen() : void 0)) {
                        sendbeacon('enter fullscreen', false, currentTime);
                    } else {
                        sendbeacon('exit fullscreen', false, currentTime);
                    }
                }
                ;

                var downloadvideo = function() {
                    var currentTime;
                    currentTime = Math.round(this.currentTime());
                    sendbeacon('downloadvideo', false, currentTime);
                };
                var _this = this;
                sendbeacon = function(action, nonInteraction, value) {
                    eventLabel = _this.currentSrc().split("/").slice(-1)[0] + "|" + location.pathname + location.search;
                    if (window.ga) {
                        ga('send', 'event', {
                            'eventCategory': eventCategory,
                            'eventAction': action,
                            'eventLabel': eventLabel,
                            'eventValue': value,
                            'nonInteraction': nonInteraction
                        });
                    } else if (window._gaq) {
                        _gaq.push(['_trackEvent', eventCategory, action, eventLabel, value, nonInteraction]);
                    } else if (options.debug) {
                        console.log("Google Analytics not detected");
                    }
                }
                ;
                function utagLink(options) {
                    utag.link(options);
                }

                this.ready(function() {
                    this.on("loadedmetadata", loaded);
                    this.on("timeupdate", timeupdate);

                    if (__indexOf.call(eventsToTrack, "resolutionchange") >= 0) {
                        this.on("resolutionchange", function() {
                            var currentTime = Math.round(this.currentTime());
                            sendbeacon('resolutionchange', false, currentTime);
                        });
                    }
                    if (__indexOf.call(eventsToTrack, "downloadvideo") >= 0) {
                        this.on("downloadvideo", downloadvideo);
                    }
                    if (__indexOf.call(eventsToTrack, "end") >= 0) {
                        this.on("ended", end);
                    }
                    if (__indexOf.call(eventsToTrack, "play") >= 0) {
                        this.on("play", play);
                    }
                    if (__indexOf.call(eventsToTrack, "pause") >= 0) {
                        this.on("pause", pause);
                    }
                    if (__indexOf.call(eventsToTrack, "volumeChange") >= 0) {
                        this.on("volumechange", volumeChange);
                    }
                    if (__indexOf.call(eventsToTrack, "resize") >= 0) {
                        this.on("resize", resize);
                    }
                    if (__indexOf.call(eventsToTrack, "error") >= 0) {
                        this.on("error", error);
                    }
                    if (__indexOf.call(eventsToTrack, "fullscreen") >= 0) {
                        return this.on("fullscreenchange", fullscreen);
                    }
                });
                return {
                    'sendbeacon': sendbeacon
                };
            });

        }
        ).call(this);
    });

    $(document).on("videojs-loaded.videojs-language", function() {
        videojs.addLanguage('zh-CN', {
            "Play": "播放",
            "Pause": "暂停",
            "Current Time": "当前时间",
            "Duration": "时长",
            "Remaining Time": "剩余时间",
            "Stream Type": "媒体流类型",
            "LIVE": "直播",
            "Loaded": "加载完成",
            "Progress": "进度",
            "Fullscreen": "全屏",
            "Non-Fullscreen": "退出全屏",
            "Picture-in-Picture": "画中画",
            "Exit Picture-in-Picture": "退出画中画",
            "Mute": "静音",
            "Unmute": "取消静音",
            "Playback Rate": "播放速度",
            "Subtitles": "字幕",
            "subtitles off": "关闭字幕",
            "Captions": "内嵌字幕",
            "captions off": "关闭内嵌字幕",
            "Chapters": "节目段落",
            "Close Modal Dialog": "关闭弹窗",
            "Descriptions": "描述",
            "descriptions off": "关闭描述",
            "Audio Track": "音轨",
            "You aborted the media playback": "视频播放被终止",
            "A network error caused the media download to fail part-way.": "网络错误导致视频下载中途失败。",
            "The media could not be loaded, either because the server or network failed or because the format is not supported.": "视频因格式不支持或者服务器或网络的问题无法加载。",
            "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。",
            "No compatible source was found for this media.": "无法找到此视频兼容的源。",
            "The media is encrypted and we do not have the keys to decrypt it.": "视频已加密，无法解密。",
            "Play Video": "播放视频",
            "Close": "关闭",
            "Modal Window": "弹窗",
            "This is a modal window": "这是一个弹窗",
            "This modal can be closed by pressing the Escape key or activating the close button.": "可以按ESC按键或启用关闭按钮来关闭此弹窗。",
            ", opens captions settings dialog": ", 开启标题设置弹窗",
            ", opens subtitles settings dialog": ", 开启字幕设置弹窗",
            ", opens descriptions settings dialog": ", 开启描述设置弹窗",
            ", selected": ", 选择",
            "captions settings": "字幕设定",
            "Audio Player": "音频播放器",
            "Video Player": "视频播放器",
            "Replay": "重新播放",
            "Progress Bar": "进度条",
            "Volume Level": "音量",
            "subtitles settings": "字幕设定",
            "descriptions settings": "描述设定",
            "Text": "文字",
            "White": "白",
            "Black": "黑",
            "Red": "红",
            "Green": "绿",
            "Blue": "蓝",
            "Yellow": "黄",
            "Magenta": "紫红",
            "Cyan": "青",
            "Background": "背景",
            "Window": "窗口",
            "Transparent": "透明",
            "Semi-Transparent": "半透明",
            "Opaque": "不透明",
            "Font Size": "字体尺寸",
            "Text Edge Style": "字体边缘样式",
            "None": "无",
            "Raised": "浮雕",
            "Depressed": "压低",
            "Uniform": "均匀",
            "Dropshadow": "下阴影",
            "Font Family": "字体库",
            "Proportional Sans-Serif": "比例无细体",
            "Monospace Sans-Serif": "单间隔无细体",
            "Proportional Serif": "比例细体",
            "Monospace Serif": "单间隔细体",
            "Casual": "舒适",
            "Script": "手写体",
            "Small Caps": "小型大写字体",
            "Reset": "重置",
            "restore all settings to the default values": "恢复全部设定至预设值",
            "Done": "完成",
            "Caption Settings Dialog": "字幕设定窗口",
            "Beginning of dialog window. Escape will cancel and close the window.": "打开对话窗口。Escape键将取消并关闭对话窗口",
            "End of dialog window.": "结束对话窗口",
            "Seek to live, currently behind live": "尝试直播，当前为延时播放",
            "Seek to live, currently playing live": "尝试直播，当前为实时播放",
            "progress bar timing: currentTime={1} duration={2}": "{1}/{2}",
            "{1} is loading.": "正在加载 {1}。"
        });
    });
});

define('plugins/old-player-compat', [], function() {
    "use strict";

    // 旧版播放器结构兼容处理
    (function __playerSetup(videoBox) {
        function isMobile() {
            var isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };
            return isMobile.any();
        }

        // bof jwplayer
        (function($) {
            // $(function ($) {
            // bof dom ready
            // 旧版弹窗播放视频结构兼容性处理
            $("a.js_video_player").not("[data-play-nopop]").each(function() {
                var $t = $(this);
                $t.removeClass("js_video_player").addClass("btn-play").append("<i class=\"hwic_play2\"></i>");
                var s = JSON.stringify(($t.data("options") || {}).sources);
                $t.attr("default-src", $t.attr("data-video-path")).attr("video-src", s);
            });

            var playerInstance = null;

            function pauseVideo(e) {
                try {
                    if (playerInstance) {
                        playerInstance.remove();
                    }
                } catch (_e) {}
            }

            $(document).off("vclick", ".js_video_player, .js-play-btn");

            $(document).off("click", ".js_video_player, .js-play-btn").on("click", ".js_video_player, .js-play-btn", function(e) {
                if (typeof videojs === "undefined") {
                    if (window.console)
                        console.log("player 还未加载");
                    return false;
                }
                var playerid = $(this).attr("data-player-id") || "playerContainer";
                var video_path = $(this).attr("data-video-path");
                var video_name = $(this).attr("data-video-name");
                // 增加视频名称
                if (video_name == "" || video_name == undefined) {
                    video_name = video_path;
                    // 视频名称为空，去取path
                }
                var autostart = ($(this).attr("data-player-autostart") || "1") == "1";
                var ismobile = isMobile();
                if (ismobile) {
                    video_path = $(this).attr("data-video-path-mobile") || video_path;
                }

                if (video_path && video_path.indexOf("//") == 0) {
                    video_path = location.protocol + video_path;
                }

                var player_options = $(this).data("option") || $(this).data("options") || {};
                player_options.sources = player_options.sources || [];
                player_options.gaEvent = $(this).attr("data-onclick");
                var video_sources = [];
                var vlist = $(this).attr("data-video-sources");
                if (vlist) {
                    vlist = vlist.split(",");
                    for (var i = 0; i < vlist.length; i++) {
                        var v_info = vlist[i].split("|");
                        var label = $.trim(v_info[1] || "default");
                        video_sources[i] = {
                            file: $.trim(v_info[0]),
                            label: label
                        };
                        video_sources[i].src = video_sources[i].file;
                        if (!ismobile && label.indexOf("720") >= 0)
                            video_sources[i].default = true;
                        else if (ismobile && label.indexOf("360") >= 0)
                            video_sources[i].default = true;
                    }

                    if (ismobile) {
                        var md = $.grep(video_sources, function(v) {
                            return v.default;
                        });
                        if (!md.length)
                            video_sources[video_sources.length - 1].default = true;
                    }
                }

                player_options.sources = video_sources.concat(player_options.sources);
                if (player_options.sources.length == 0 && video_sources.length > 0) {
                    player_options.sources = video_sources;
                } else if (video_path && video_sources.length == 0 && player_options.sources.length == 0) {
                    player_options.sources = [{
                        "src": video_path,
                        label: "default"
                    }];
                } else if (!video_path && video_sources.length == 0 && player_options.sources.length == 0 && $(this).attr("data-url")) {
                    player_options.sources = [{
                        "src": $(this).attr("data-url"),
                        label: "default"
                    }];
                }

                if (player_options.sources.length > 1) {
                    var sourceObj = {};
                    $.each(player_options.sources, function(i, o) {
                        sourceObj[o.label.toLocaleLowerCase()] = o;
                    });

                    var defaultV = ismobile ? sourceObj["360p"] : sourceObj["720p"];
                    if (!defaultV) {
                        defaultV = player_options.sources[0];
                    }

                    defaultV.selected = true;
                    defaultV.res = 720;
                }

                player_options.poster = player_options.poster || $(this).attr("data-img-path");
                player_options.autoplay = typeof player_options.autoplay === "boolean" ? player_options.autoplay : autostart;

                if ($(this).attr("data-play-nopop")) {
                    // $(this).next("img").fadeOut();
                    playerInstance = initPlayer(playerid, player_options);

                    $(this).addClass("invisible");
                    return false;
                }

                // 采用新版弹框播放

                var play_html = $("<div id=\"videojs_player_wrapper\"><div id=\"" + playerid + "\"/></div>");
                var $t = $(this);
                BootstrapDialog.show({
                    message: play_html,
                    cssClass: "video-dialog",
                    onshown: function() {
                        playerInstance = initPlayer(playerid, player_options);
                        playerInstance.onFullscreen = function(e) {
                            if (window.console)
                                console.log(e);
                        }
                        ;
                        setTimeout(function() {
                            $(".bootstrap-dialog.video-dialog").off("keyup");
                            // if (!ismobile)
                            // 	playerInstance && playerInstance.play(true);
                        }, 2000);
                    },
                    onhide: function(dialogRef) {
                        // playerInstance && playerInstance.play(false);// && playerInstance.remove();
                        // alert('Dialog is popping down, its message is ' + dialogRef.getMessage());
                        playerInstance && playerInstance.dispose();
                    }
                });

                return false;
            });

            // eof dom ready
            // });
        }
        )(jQuery);
        // eof
    }
    )();

    window.initPlayer = function(playerid, options) {
        options = options || {};
        $("<div class=\"videojs-container\"><video data-setup=\"{}\" playsinline id=\"" + playerid + "\" class=\"vjs-big-play-centered video-js  video-player center-block\"></video></div>").replaceAll($("#" + playerid));
        var player_options = {
            controls: true,
            autoplay: true,
            preload: "none",
            "fluid": true,
            sources: [],
            aspectRatio: "16:9",
            muted: false,
            plugins: {},
            "language": window.videojsLanguage
        };
        options.aspectRatio = options.aspectRatio || options.aspectratio || "16:9";
        options.muted = options.muted || options.mute || false;
        options.loop = options.loop || options.repeat || false;

        if (videojs.getPlugin && videojs.getPlugin("vjsdownload")) {
            player_options.plugins.vjsdownload = {
                beforeElement: "playbackRateMenuButton",
                textControl: window.playerLang[window.lang]["Download-Video"],
                name: "downloadButton",
                // downloadURL: 'https://insert_source_here.mp4' //optional if you need a different download url than the source
            };
        }

        $.extend(player_options, options);

        var player = videojs.getPlayers()[playerid];
        if (player)
            player.dispose();

        var player = videojs(playerid, player_options);

        if (player_options.autoplay) {
            setTimeout(function() {
                player.play();
            }, 1000);
        }

        if (videojs.getComponent("QualitySelector")) {
            player.controlBar.addChild("QualitySelector", {
                textControl: "Quality",
            }).controlText(window.playerLang[window.lang]["Switch-Quality"]);
        }
        if (player.ga) {
            player.ga();
        }

        if (player_options.gaEvent) {
            var flag = false;
            var evt = function(e) {
                if (flag)
                    return;
                flag = true;
                var gaEvent = new Function("e",player_options.gaEvent);
                gaEvent.apply(e);
            };
            if (player.one) {
                player.one("play", evt);
            } else {
                player.on("play", evt);
            }
        }

        var hasSend = false;
        player.on("play", function(e) {
            if (hasSend) {
                return;
            }
            hasSend = true;
            var url = player.currentSrc();
            try {
                utag.link({
                    "tealium_event": "video_clicked",
                    "video_id": url,
                    "video_name": ""
                });
            } catch (e) {}
        });

        return player;
    }
    ;
});

define("global/window", [], function() {
    return window;
});
define("global/document", [], function() {
    return document;
});

if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
}

var origin = window.location.origin;
var langCn = $("html").is('[lang="zh"]') || document.URL.indexOf("/cn/") >= 0;

(function videojs5To7() {
    if (langCn) {
        $("video.video-js[data-setup]").each(function() {
            $(this).data("setup", $(this).data("setup")).removeAttr("data-setup").addClass("language-cn");
        });
    }

    $("video[src]").each(function() {
        var $t = $(this);
        $t.append("<source src='" + $t.attr("src") + "' type='video/mp4' label='720P' res='720'  />");
    });
}
)();

define('VideoBox', ["plugins/videojs-plugins", "plugins/old-player-compat"], function() {
    var videoDef = $.Deferred();
    var videojs;
    // 视频播放器组件
    var videojsPromise = function() {
        var videojsIe8 = $.when();

        return videojsIe8.then(function() {
            $('<link rel="stylesheet" href="' + 'https://www.huawei.com/Assets/corp/2020/js/lib/vendor/video.js/video-js.min.css?ver=201805021130">').prependTo("head");
            if (typeof window.videojs !== "undefined")
                return $.when();

            return $.loadJS("https://www.huawei.com/Assets/corp/2020/js/lib/vendor/video.js/video.min.js");
        }).then(function(_videojs) {
            if (typeof _videojs === "function")
                window.videojs = _videojs;
            videojs = _videojs || window.videojs;
            $(document).trigger("videojs-loaded");
            if (langCn) {
                $("video.video-js.language-cn").each(function() {
                    var $v = $(this);
                    var ops = $v.data("setup") || {};
                    ops.language = "zh-CN";
                    window.videojs(this, ops);
                });
            }

            if (window.videojs.getPlugin("videoJsResolutionSwitcher"))
                return $.when();

            return $.loadJS("https://cdn.jsdelivr.net/npm/" + "@xiaoyexiang/videojs-resolution-switcher-v7@1.1.9/lib/videojs-resolution-switcher-v7.min.js");
        }).then(function() {
            videoDef.resolve(videojs);
            $(document).trigger("videojs-resolution-switcher-loaded");
        });
    };

    $(document).on("videojs-loaded.videojs-ga", function(e) {
        var gaPlugin = $.when();

        gaPlugin.then(function(d) {
            $(document).trigger("videojs-ga-loaded");
        }).then(function() {
            setTimeout(function() {
                $(document).trigger("videojs-setup", videojs.getPlayers());
            }, 200);
        });
    });

    $(document).on("videojs-setup", function(e, players) {
        $.each(players, function(i, player) {
            if (player.hasGA)
                return;
            var gaOption = {
                eventLabel: player.currentSrc().split("/").slice(-1)[0] + "|" + document.URL
            };
            player.hasGA = true;
            player.ga(gaOption);
        });
    });

    // 视频默认分辨率
    $(document).on("resolutionSwitcher", function(e, _players) {
        var players = _players || {};
        var winW = $(window).width();
        $.each(players, function(i, o) {
            if (!$.grep(o.controlBar.children(), function(element) {
                return element.name === "Button";
            }).length) {
                var player = o;
                try {
                    var myButton = player.controlBar.addChild("button");
                    var myButtonDom = myButton.el();
                    $(myButtonDom).addClass("vjs-download-control").on("click", function() {
                        if (/msie|trident/i.test(navigator.userAgent)) {
                            var a = document.createElement("a");
                            a.href = $(this).find("a").attr("href");
                            a.target = "_blank";
                            a.rel = "noopener";
                            $(a).hide().appendTo("body");
                            setTimeout(function() {
                                a.click();
                                $(a).remove();
                            }, 200);
                        }
                    });
                    myButtonDom.innerHTML = '<a target="_blank" href="' + player.src() + '" download><span class="huawei-iconfont iconvideo-download" style="font-size:1em;color:#fff"><span></a>';
                } catch (error) {/* empty */
                }
            }

            //
            var $rsBtn = $(o.controlBar.resolutionSwitcher);

            if (!$rsBtn.length) {
                try {
                    var vrs = {
                        default: 540,
                        dynamicLabel: true
                    };
                    var mlist = o.getMedia().src.sort(function(a, b) {
                        return parseInt(a.res) < parseInt(b.res) ? 1 : -1;
                    });
                    if (winW >= 768) {
                        vrs.default = 1080;
                        if (!mlist.some(function(item) {
                            return parseInt(item.res) == 1080
                        })) {
                            vrs.default = mlist[0].res;
                        }
                    } else {
                        vrs.default = 540;
                        if (!mlist.some(function(item) {
                            return parseInt(item.res) == 540
                        })) {
                            vrs.default = mlist.pop().res;
                        }
                    }
                    o.videoJsResolutionSwitcher(vrs);
                } catch (throwError) {
                    var hjg = ''
                }
            }

            if ($rsBtn.length && $rsBtn.find(".vjs-menu-content .vjs-menu-item").length <= 1) {
                $rsBtn.addClass("hidden");
            }
        });
    });

    $(document).on("videojs-resolution-switcher-loaded", function(e) {
        if (typeof videojs !== "undefined") {
            setTimeout(function() {
                $(document).trigger("resolutionSwitcher", videojs.getPlayers());
            }, 1000);
        }
    });

    if ($("video.video-js, .btn-play, .js-play-btn, .js_video_player, .js-video-gallery-btn, .js-has-videojs").length) {
        videojsPromise();
    }
    $(document).on("click", ".btn-close, .js-close-btn", function(e) {
        $("body").removeClass("video-popup");
    }).on("click", ".btn-play, .js-play-btn", function(e) {
        $("body").addClass("video-popup");
    });

    function VideoBox(dom, id) {
        this.dom = dom;
        if (this.dom[0].inited)
            return;
        this.dom[0].inited = true;
        this.defaultSrc = dom.attr("default-src");
        this.src = dom.attr("video-src");
        this.poster = dom.attr("poster");
        this.id = id;
        this.popup = dom.attr("data-popup") || 1;
        var self = this;
        videoDef.then(function(d) {
            self.init();
        });
    }
    VideoBox.prototype = {
        init: function() {
            var self = this;
            var div = document.createElement("div");
            div.setAttribute("class", "video-box");
            var disableDL = self.dom.hasClass("no-download") ? ' oncontextmenu="return false;"' : "";
            var disableDLClass = self.dom.hasClass("no-download") ? " no-download" : "";
            var poster = this.poster ? ' poster="' + this.poster + '"' : "";
            var sources = [];
            try {
                sources = window.execute("", "return " + self.dom.attr("video-src"))();
            } catch (_e) {/* empty */
            }

            if (!sources && self.defaultSrc)
                sources = [{
                    src: self.defaultSrc,
                    label: "720P",
                    res: 720
                }];

            var sourcesHtml = sources.map(function(v) {
                return '<source src="' + v.src + '" type="video/mp4" label="' + v.label + '" res="' + v.res + '"  />';
            });

            sourcesHtml = sourcesHtml.join("");

            var vWidth = 960;
            var vHeight = 540;
            if (window.innerWidth < 990) {
                vWidth = window.innerWidth;
                vHeight = vWidth / (16 / 9);
            }
            $(div).html('<div class="content"><a href="#" class="btn-close"><span class="iconfont icon-close"></span></a>' + '<video id="my-video-' + this.id + '" class="video-js' + disableDLClass + '" controls preload="metadata" webkit-playsinline="true" playsinline="" x-webkit-airplay="allow" src="' + (self.defaultSrc || "") + '" width="' + vWidth + '" height="' + vHeight + '" data-setup="{}" ' + poster + disableDL + ">" + sourcesHtml + "</video></div>");

            if (this.popup === "0") {
                this.dom.after(div).end().hide();
            } else
                $("body").append($(div));

            self.setupPlayer(div);
        },

        setupPlayer: function(videoContainer) {
            var self = this;
            var div = videoContainer;
            var options = {
                controls: true
            };
            if (langCn)
                options.language = "zh-CN";
            var video = videojs("my-video-" + this.id, options, function() {
                var player = this;
                window.player = player;

                var vSources = [];
                try {
                    vSources = window.execute("", "return " + self.src)() || [];
                } catch (_e) {/* empty */
                }
                // 切换清晰度
                if (vSources.length > 0 && player.updateSrc)
                    player.updateSrc(vSources);

                if (vSources.length <= 1 && player.controlBar.resolutionSwitcher) {
                    player.controlBar.resolutionSwitcher.classList.add("hidden");
                }

                // GA
                if (player.ga && !player.hasGA) {
                    var gaOption = {
                        eventLabel: player.currentSrc().split("/").slice(-1)[0] + "|" + document.URL
                    };
                    player.hasGA = true;
                    player.ga(gaOption);
                }
                player.on("resolutionchange", function() {
                    return false;
                });
            });
            this.dom.on("click", function(e) {
                e.preventDefault();
                $(div).addClass("show");

                // setTimeout(function () {
                //   video.play();
                // }, 1000);
                setTimeout(function() {
                    video.play();
                }, 100);
            });
            $(div).find("a.btn-close").on("click", function(e) {
                e.preventDefault();
                video.pause();
                $(div).removeClass("show");
                setTimeout(function() {
                    video.pause();
                }, 500)
            });
        }
    };

    return VideoBox;
});

/**
* Swiper 5.3.6
* Most modern mobile touch slider and framework with hardware accelerated transitions
* http://swiperjs.com
*
* Copyright 2014-2020 Vladimir Kharlampidi
*
* Released under the MIT License
*
* Released on: February 29, 2020
*/

!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define('vendor/swiper/swiper.min', t) : (e = e || self).Swiper = t()
}(this, (function() {
    "use strict";
    var e = "undefined" == typeof document ? {
        body: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return null
        },
        querySelectorAll: function() {
            return []
        },
        getElementById: function() {
            return null
        },
        createEvent: function() {
            return {
                initEvent: function() {}
            }
        },
        createElement: function() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return []
                }
            }
        },
        location: {
            hash: ""
        }
    } : document
      , t = "undefined" == typeof window ? {
        document: e,
        navigator: {
            userAgent: ""
        },
        location: {},
        history: {},
        CustomEvent: function() {
            return this
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return ""
                }
            }
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {}
    } : window
      , i = function(e) {
        for (var t = 0; t < e.length; t += 1)
            this[t] = e[t];
        return this.length = e.length,
        this
    };
    function s(s, a) {
        var r = []
          , n = 0;
        if (s && !a && s instanceof i)
            return s;
        if (s)
            if ("string" == typeof s) {
                var o, l, d = s.trim();
                if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
                    var h = "div";
                    for (0 === d.indexOf("<li") && (h = "ul"),
                    0 === d.indexOf("<tr") && (h = "tbody"),
                    0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"),
                    0 === d.indexOf("<tbody") && (h = "table"),
                    0 === d.indexOf("<option") && (h = "select"),
                    (l = e.createElement(h)).innerHTML = d,
                    n = 0; n < l.childNodes.length; n += 1)
                        r.push(l.childNodes[n])
                } else
                    for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])],
                    n = 0; n < o.length; n += 1)
                        o[n] && r.push(o[n])
            } else if (s.nodeType || s === t || s === e)
                r.push(s);
            else if (s.length > 0 && s[0].nodeType)
                for (n = 0; n < s.length; n += 1)
                    r.push(s[n]);
        return new i(r)
    }
    function a(e) {
        for (var t = [], i = 0; i < e.length; i += 1)
            -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }
    s.fn = i.prototype,
    s.Class = i,
    s.Dom7 = i;
    var r = {
        addClass: function(e) {
            if (void 0 === e)
                return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1)
                    void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1)
                    void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1)
                    void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
            return this
        },
        attr: function(e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (var s = 0; s < this.length; s += 1)
                if (2 === i.length)
                    this[s].setAttribute(e, t);
                else
                    for (var a in e)
                        this[s][a] = e[a],
                        this[s].setAttribute(a, e[a]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var i;
            if (void 0 !== t) {
                for (var s = 0; s < this.length; s += 1)
                    (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}),
                    i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage)
                    return i.dom7ElementDataStorage[e];
                var a = i.getAttribute("data-" + e);
                return a || void 0
            }
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e,
                i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e,
                i.transitionDuration = e
            }
            return this
        },
        on: function() {
            for (var e, t = [], i = arguments.length; i--; )
                t[i] = arguments[i];
            var a = t[0]
              , r = t[1]
              , n = t[2]
              , o = t[3];
            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e),
                    s(t).is(r))
                        n.apply(t, i);
                    else
                        for (var a = s(t).parents(), o = 0; o < a.length; o += 1)
                            s(a[o]).is(r) && n.apply(a[o], i)
                }
            }
            function d(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                n.apply(this, t)
            }
            "function" == typeof t[1] && (a = (e = t)[0],
            n = e[1],
            o = e[2],
            r = void 0),
            o || (o = !1);
            for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r)
                    for (h = 0; h < p.length; h += 1) {
                        var v = p[h];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}),
                        u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []),
                        u.dom7LiveListeners[v].push({
                            listener: n,
                            proxyListener: l
                        }),
                        u.addEventListener(v, l, o)
                    }
                else
                    for (h = 0; h < p.length; h += 1) {
                        var f = p[h];
                        u.dom7Listeners || (u.dom7Listeners = {}),
                        u.dom7Listeners[f] || (u.dom7Listeners[f] = []),
                        u.dom7Listeners[f].push({
                            listener: n,
                            proxyListener: d
                        }),
                        u.addEventListener(f, d, o)
                    }
            }
            return this
        },
        off: function() {
            for (var e, t = [], i = arguments.length; i--; )
                t[i] = arguments[i];
            var s = t[0]
              , a = t[1]
              , r = t[2]
              , n = t[3];
            "function" == typeof t[1] && (s = (e = t)[0],
            r = e[1],
            n = e[2],
            a = void 0),
            n || (n = !1);
            for (var o = s.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], h = 0; h < this.length; h += 1) {
                    var p = this[h]
                      , c = void 0;
                    if (!a && p.dom7Listeners ? c = p.dom7Listeners[d] : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]),
                    c && c.length)
                        for (var u = c.length - 1; u >= 0; u -= 1) {
                            var v = c[u];
                            r && v.listener === r ? (p.removeEventListener(d, v.proxyListener, n),
                            c.splice(u, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (p.removeEventListener(d, v.proxyListener, n),
                            c.splice(u, 1)) : r || (p.removeEventListener(d, v.proxyListener, n),
                            c.splice(u, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var i = [], s = arguments.length; s--; )
                i[s] = arguments[s];
            for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1)
                for (var o = a[n], l = 0; l < this.length; l += 1) {
                    var d = this[l]
                      , h = void 0;
                    try {
                        h = new t.CustomEvent(o,{
                            detail: r,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (t) {
                        (h = e.createEvent("Event")).initEvent(o, !0, !0),
                        h.detail = r
                    }
                    d.dom7EventData = i.filter((function(e, t) {
                        return t > 0
                    }
                    )),
                    d.dispatchEvent(h),
                    d.dom7EventData = [],
                    delete d.dom7EventData
                }
            return this
        },
        transitionEnd: function(e) {
            var t, i = ["webkitTransitionEnd", "transitionend"], s = this;
            function a(r) {
                if (r.target === this)
                    for (e.call(this, r),
                    t = 0; t < i.length; t += 1)
                        s.off(i[t], a)
            }
            if (e)
                for (t = 0; t < i.length; t += 1)
                    s.on(i[t], a);
            return this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (this.length > 0) {
                var i = this[0]
                  , s = i.getBoundingClientRect()
                  , a = e.body
                  , r = i.clientTop || a.clientTop || 0
                  , n = i.clientLeft || a.clientLeft || 0
                  , o = i === t ? t.scrollY : i.scrollTop
                  , l = i === t ? t.scrollX : i.scrollLeft;
                return {
                    top: s.top + o - r,
                    left: s.left + l - n
                }
            }
            return null
        },
        css: function(e, i) {
            var s;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (s = 0; s < this.length; s += 1)
                        for (var a in e)
                            this[s].style[a] = e[a];
                    return this
                }
                if (this[0])
                    return t.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (s = 0; s < this.length; s += 1)
                    this[s].style[e] = i;
                return this
            }
            return this
        },
        each: function(e) {
            if (!e)
                return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t]))
                    return this;
            return this
        },
        html: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function(a) {
            var r, n, o = this[0];
            if (!o || void 0 === a)
                return !1;
            if ("string" == typeof a) {
                if (o.matches)
                    return o.matches(a);
                if (o.webkitMatchesSelector)
                    return o.webkitMatchesSelector(a);
                if (o.msMatchesSelector)
                    return o.msMatchesSelector(a);
                for (r = s(a),
                n = 0; n < r.length; n += 1)
                    if (r[n] === o)
                        return !0;
                return !1
            }
            if (a === e)
                return o === e;
            if (a === t)
                return o === t;
            if (a.nodeType || a instanceof i) {
                for (r = a.nodeType ? [a] : a,
                n = 0; n < r.length; n += 1)
                    if (r[n] === o)
                        return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); )
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e)
                return this;
            var t, s = this.length;
            return new i(e > s - 1 ? [] : e < 0 ? (t = s + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function() {
            for (var t, s = [], a = arguments.length; a--; )
                s[a] = arguments[a];
            for (var r = 0; r < s.length; r += 1) {
                t = s[r];
                for (var n = 0; n < this.length; n += 1)
                    if ("string" == typeof t) {
                        var o = e.createElement("div");
                        for (o.innerHTML = t; o.firstChild; )
                            this[n].appendChild(o.firstChild)
                    } else if (t instanceof i)
                        for (var l = 0; l < t.length; l += 1)
                            this[n].appendChild(t[l]);
                    else
                        this[n].appendChild(t)
            }
            return this
        },
        prepend: function(t) {
            var s, a;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof t) {
                    var r = e.createElement("div");
                    for (r.innerHTML = t,
                    a = r.childNodes.length - 1; a >= 0; a -= 1)
                        this[s].insertBefore(r.childNodes[a], this[s].childNodes[0])
                } else if (t instanceof i)
                    for (a = 0; a < t.length; a += 1)
                        this[s].insertBefore(t[a], this[s].childNodes[0]);
                else
                    this[s].insertBefore(t, this[s].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([])
        },
        nextAll: function(e) {
            var t = []
              , a = this[0];
            if (!a)
                return new i([]);
            for (; a.nextElementSibling; ) {
                var r = a.nextElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r),
                a = r
            }
            return new i(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([])
            }
            return new i([])
        },
        prevAll: function(e) {
            var t = []
              , a = this[0];
            if (!a)
                return new i([]);
            for (; a.previousElementSibling; ) {
                var r = a.previousElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r),
                a = r
            }
            return new i(t)
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return s(a(t))
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var r = this[i].parentNode; r; )
                    e ? s(r).is(e) && t.push(r) : t.push(r),
                    r = r.parentNode;
            return s(a(t))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)),
            t)
        },
        find: function(e) {
            for (var t = [], s = 0; s < this.length; s += 1)
                for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1)
                    t.push(a[r]);
            return new i(t)
        },
        children: function(e) {
            for (var t = [], r = 0; r < this.length; r += 1)
                for (var n = this[r].childNodes, o = 0; o < n.length; o += 1)
                    e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
            return new i(a(t))
        },
        filter: function(e) {
            for (var t = [], s = 0; s < this.length; s += 1)
                e.call(this[s], s, this[s]) && t.push(this[s]);
            return new i(t)
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            var i, a;
            for (i = 0; i < e.length; i += 1) {
                var r = s(e[i]);
                for (a = 0; a < r.length; a += 1)
                    this[this.length] = r[a],
                    this.length += 1
            }
            return this
        },
        styles: function() {
            return this[0] ? t.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(r).forEach((function(e) {
        s.fn[e] = s.fn[e] || r[e]
    }
    ));
    var n = {
        deleteProps: function(e) {
            var t = e;
            Object.keys(t).forEach((function(e) {
                try {
                    t[e] = null
                } catch (e) {}
                try {
                    delete t[e]
                } catch (e) {}
            }
            ))
        },
        nextTick: function(e, t) {
            return void 0 === t && (t = 0),
            setTimeout(e, t)
        },
        now: function() {
            return Date.now()
        },
        getTranslate: function(e, i) {
            var s, a, r;
            void 0 === i && (i = "x");
            var n = t.getComputedStyle(e, null);
            return t.WebKitCSSMatrix ? ((a = n.transform || n.webkitTransform).split(",").length > 6 && (a = a.split(", ").map((function(e) {
                return e.replace(",", ".")
            }
            )).join(", ")),
            r = new t.WebKitCSSMatrix("none" === a ? "" : a)) : s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","),
            "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])),
            "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])),
            a || 0
        },
        parseUrlQuery: function(e) {
            var i, s, a, r, n = {}, o = e || t.location.href;
            if ("string" == typeof o && o.length)
                for (r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter((function(e) {
                    return "" !== e
                }
                ))).length,
                i = 0; i < r; i += 1)
                    a = s[i].replace(/#\S+/g, "").split("="),
                    n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
            return n
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        },
        extend: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
                var a = e[s];
                if (null != a)
                    for (var r = Object.keys(Object(a)), o = 0, l = r.length; o < l; o += 1) {
                        var d = r[o]
                          , h = Object.getOwnPropertyDescriptor(a, d);
                        void 0 !== h && h.enumerable && (n.isObject(i[d]) && n.isObject(a[d]) ? n.extend(i[d], a[d]) : !n.isObject(i[d]) && n.isObject(a[d]) ? (i[d] = {},
                        n.extend(i[d], a[d])) : i[d] = a[d])
                    }
            }
            return i
        }
    }
      , o = {
        touch: t.Modernizr && !0 === t.Modernizr.touch || !!(t.navigator.maxTouchPoints > 0 || "ontouchstart"in t || t.DocumentTouch && e instanceof t.DocumentTouch),
        pointerEvents: !!t.PointerEvent && "maxTouchPoints"in t.navigator && t.navigator.maxTouchPoints > 0,
        observer: "MutationObserver"in t || "WebkitMutationObserver"in t,
        passiveListener: function() {
            var e = !1;
            try {
                var i = Object.defineProperty({}, "passive", {
                    get: function() {
                        e = !0
                    }
                });
                t.addEventListener("testPassiveListener", null, i)
            } catch (e) {}
            return e
        }(),
        gestures: "ongesturestart"in t
    }
      , l = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e,
        t.eventsListeners = {},
        t.params && t.params.on && Object.keys(t.params.on).forEach((function(e) {
            t.on(e, t.params.on[e])
        }
        ))
    }
      , d = {
        components: {
            configurable: !0
        }
    };
    l.prototype.on = function(e, t, i) {
        var s = this;
        if ("function" != typeof t)
            return s;
        var a = i ? "unshift" : "push";
        return e.split(" ").forEach((function(e) {
            s.eventsListeners[e] || (s.eventsListeners[e] = []),
            s.eventsListeners[e][a](t)
        }
        )),
        s
    }
    ,
    l.prototype.once = function(e, t, i) {
        var s = this;
        if ("function" != typeof t)
            return s;
        function a() {
            for (var i = [], r = arguments.length; r--; )
                i[r] = arguments[r];
            s.off(e, a),
            a.f7proxy && delete a.f7proxy,
            t.apply(s, i)
        }
        return a.f7proxy = t,
        s.on(e, a, i)
    }
    ,
    l.prototype.off = function(e, t) {
        var i = this;
        return i.eventsListeners ? (e.split(" ").forEach((function(e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach((function(s, a) {
                (s === t || s.f7proxy && s.f7proxy === t) && i.eventsListeners[e].splice(a, 1)
            }
            ))
        }
        )),
        i) : i
    }
    ,
    l.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--; )
            e[t] = arguments[t];
        var i, s, a, r = this;
        if (!r.eventsListeners)
            return r;
        "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0],
        s = e.slice(1, e.length),
        a = r) : (i = e[0].events,
        s = e[0].data,
        a = e[0].context || r);
        var n = Array.isArray(i) ? i : i.split(" ");
        return n.forEach((function(e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach((function(e) {
                    t.push(e)
                }
                )),
                t.forEach((function(e) {
                    e.apply(a, s)
                }
                ))
            }
        }
        )),
        r
    }
    ,
    l.prototype.useModulesParams = function(e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach((function(i) {
            var s = t.modules[i];
            s.params && n.extend(e, s.params)
        }
        ))
    }
    ,
    l.prototype.useModules = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach((function(i) {
            var s = t.modules[i]
              , a = e[i] || {};
            s.instance && Object.keys(s.instance).forEach((function(e) {
                var i = s.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            }
            )),
            s.on && t.on && Object.keys(s.on).forEach((function(e) {
                t.on(e, s.on[e])
            }
            )),
            s.create && s.create.bind(t)(a)
        }
        ))
    }
    ,
    d.components.set = function(e) {
        this.use && this.use(e)
    }
    ,
    l.installModule = function(e) {
        for (var t = [], i = arguments.length - 1; i-- > 0; )
            t[i] = arguments[i + 1];
        var s = this;
        s.prototype.modules || (s.prototype.modules = {});
        var a = e.name || Object.keys(s.prototype.modules).length + "_" + n.now();
        return s.prototype.modules[a] = e,
        e.proto && Object.keys(e.proto).forEach((function(t) {
            s.prototype[t] = e.proto[t]
        }
        )),
        e.static && Object.keys(e.static).forEach((function(t) {
            s[t] = e.static[t]
        }
        )),
        e.install && e.install.apply(s, t),
        s
    }
    ,
    l.use = function(e) {
        for (var t = [], i = arguments.length - 1; i-- > 0; )
            t[i] = arguments[i + 1];
        var s = this;
        return Array.isArray(e) ? (e.forEach((function(e) {
            return s.installModule(e)
        }
        )),
        s) : s.installModule.apply(s, [e].concat(t))
    }
    ,
    Object.defineProperties(l, d);
    var h = {
        updateSize: function() {
            var e, t, i = this.$el;
            e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth,
            t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight,
            0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10),
            t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10),
            n.extend(this, {
                width: e,
                height: t,
                size: this.isHorizontal() ? e : t
            }))
        },
        updateSlides: function() {
            var e = this.params
              , i = this.$wrapperEl
              , s = this.size
              , a = this.rtlTranslate
              , r = this.wrongRTL
              , o = this.virtual && e.virtual.enabled
              , l = o ? this.virtual.slides.length : this.slides.length
              , d = i.children("." + this.params.slideClass)
              , h = o ? this.virtual.slides.length : d.length
              , p = []
              , c = []
              , u = [];
            function v(t) {
                return !e.cssMode || t !== d.length - 1
            }
            var f = e.slidesOffsetBefore;
            "function" == typeof f && (f = e.slidesOffsetBefore.call(this));
            var m = e.slidesOffsetAfter;
            "function" == typeof m && (m = e.slidesOffsetAfter.call(this));
            var g = this.snapGrid.length
              , b = this.snapGrid.length
              , w = e.spaceBetween
              , y = -f
              , x = 0
              , T = 0;
            if (void 0 !== s) {
                var E, S;
                "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * s),
                this.virtualSize = -w,
                a ? d.css({
                    marginLeft: "",
                    marginTop: ""
                }) : d.css({
                    marginRight: "",
                    marginBottom: ""
                }),
                e.slidesPerColumn > 1 && (E = Math.floor(h / e.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn,
                "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (E = Math.max(E, e.slidesPerView * e.slidesPerColumn)));
                for (var C, M = e.slidesPerColumn, P = E / M, z = Math.floor(h / e.slidesPerColumn), k = 0; k < h; k += 1) {
                    S = 0;
                    var $ = d.eq(k);
                    if (e.slidesPerColumn > 1) {
                        var L = void 0
                          , I = void 0
                          , D = void 0;
                        if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
                            var O = Math.floor(k / (e.slidesPerGroup * e.slidesPerColumn))
                              , A = k - e.slidesPerColumn * e.slidesPerGroup * O
                              , G = 0 === O ? e.slidesPerGroup : Math.min(Math.ceil((h - O * M * e.slidesPerGroup) / M), e.slidesPerGroup);
                            L = (I = A - (D = Math.floor(A / G)) * G + O * e.slidesPerGroup) + D * E / M,
                            $.css({
                                "-webkit-box-ordinal-group": L,
                                "-moz-box-ordinal-group": L,
                                "-ms-flex-order": L,
                                "-webkit-order": L,
                                order: L
                            })
                        } else
                            "column" === e.slidesPerColumnFill ? (D = k - (I = Math.floor(k / M)) * M,
                            (I > z || I === z && D === M - 1) && (D += 1) >= M && (D = 0,
                            I += 1)) : I = k - (D = Math.floor(k / P)) * P;
                        $.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== D && e.spaceBetween && e.spaceBetween + "px")
                    }
                    if ("none" !== $.css("display")) {
                        if ("auto" === e.slidesPerView) {
                            var H = t.getComputedStyle($[0], null)
                              , B = $[0].style.transform
                              , N = $[0].style.webkitTransform;
                            if (B && ($[0].style.transform = "none"),
                            N && ($[0].style.webkitTransform = "none"),
                            e.roundLengths)
                                S = this.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0);
                            else if (this.isHorizontal()) {
                                var X = parseFloat(H.getPropertyValue("width"))
                                  , V = parseFloat(H.getPropertyValue("padding-left"))
                                  , Y = parseFloat(H.getPropertyValue("padding-right"))
                                  , F = parseFloat(H.getPropertyValue("margin-left"))
                                  , W = parseFloat(H.getPropertyValue("margin-right"))
                                  , R = H.getPropertyValue("box-sizing");
                                S = R && "border-box" === R ? X + F + W : X + V + Y + F + W
                            } else {
                                var q = parseFloat(H.getPropertyValue("height"))
                                  , j = parseFloat(H.getPropertyValue("padding-top"))
                                  , K = parseFloat(H.getPropertyValue("padding-bottom"))
                                  , U = parseFloat(H.getPropertyValue("margin-top"))
                                  , _ = parseFloat(H.getPropertyValue("margin-bottom"))
                                  , Z = H.getPropertyValue("box-sizing");
                                S = Z && "border-box" === Z ? q + U + _ : q + j + K + U + _
                            }
                            B && ($[0].style.transform = B),
                            N && ($[0].style.webkitTransform = N),
                            e.roundLengths && (S = Math.floor(S))
                        } else
                            S = (s - (e.slidesPerView - 1) * w) / e.slidesPerView,
                            e.roundLengths && (S = Math.floor(S)),
                            d[k] && (this.isHorizontal() ? d[k].style.width = S + "px" : d[k].style.height = S + "px");
                        d[k] && (d[k].swiperSlideSize = S),
                        u.push(S),
                        e.centeredSlides ? (y = y + S / 2 + x / 2 + w,
                        0 === x && 0 !== k && (y = y - s / 2 - w),
                        0 === k && (y = y - s / 2 - w),
                        Math.abs(y) < .001 && (y = 0),
                        e.roundLengths && (y = Math.floor(y)),
                        T % e.slidesPerGroup == 0 && p.push(y),
                        c.push(y)) : (e.roundLengths && (y = Math.floor(y)),
                        (T - Math.min(this.params.slidesPerGroupSkip, T)) % this.params.slidesPerGroup == 0 && p.push(y),
                        c.push(y),
                        y = y + S + w),
                        this.virtualSize += S + w,
                        x = S,
                        T += 1
                    }
                }
                if (this.virtualSize = Math.max(this.virtualSize, s) + m,
                a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({
                    width: this.virtualSize + e.spaceBetween + "px"
                }),
                e.setWrapperSize && (this.isHorizontal() ? i.css({
                    width: this.virtualSize + e.spaceBetween + "px"
                }) : i.css({
                    height: this.virtualSize + e.spaceBetween + "px"
                })),
                e.slidesPerColumn > 1 && (this.virtualSize = (S + e.spaceBetween) * E,
                this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween,
                this.isHorizontal() ? i.css({
                    width: this.virtualSize + e.spaceBetween + "px"
                }) : i.css({
                    height: this.virtualSize + e.spaceBetween + "px"
                }),
                e.centeredSlides)) {
                    C = [];
                    for (var Q = 0; Q < p.length; Q += 1) {
                        var J = p[Q];
                        e.roundLengths && (J = Math.floor(J)),
                        p[Q] < this.virtualSize + p[0] && C.push(J)
                    }
                    p = C
                }
                if (!e.centeredSlides) {
                    C = [];
                    for (var ee = 0; ee < p.length; ee += 1) {
                        var te = p[ee];
                        e.roundLengths && (te = Math.floor(te)),
                        p[ee] <= this.virtualSize - s && C.push(te)
                    }
                    p = C,
                    Math.floor(this.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(this.virtualSize - s)
                }
                if (0 === p.length && (p = [0]),
                0 !== e.spaceBetween && (this.isHorizontal() ? a ? d.filter(v).css({
                    marginLeft: w + "px"
                }) : d.filter(v).css({
                    marginRight: w + "px"
                }) : d.filter(v).css({
                    marginBottom: w + "px"
                })),
                e.centeredSlides && e.centeredSlidesBounds) {
                    var ie = 0;
                    u.forEach((function(t) {
                        ie += t + (e.spaceBetween ? e.spaceBetween : 0)
                    }
                    ));
                    var se = (ie -= e.spaceBetween) - s;
                    p = p.map((function(e) {
                        return e < 0 ? -f : e > se ? se + m : e
                    }
                    ))
                }
                if (e.centerInsufficientSlides) {
                    var ae = 0;
                    if (u.forEach((function(t) {
                        ae += t + (e.spaceBetween ? e.spaceBetween : 0)
                    }
                    )),
                    (ae -= e.spaceBetween) < s) {
                        var re = (s - ae) / 2;
                        p.forEach((function(e, t) {
                            p[t] = e - re
                        }
                        )),
                        c.forEach((function(e, t) {
                            c[t] = e + re
                        }
                        ))
                    }
                }
                n.extend(this, {
                    slides: d,
                    snapGrid: p,
                    slidesGrid: c,
                    slidesSizesGrid: u
                }),
                h !== l && this.emit("slidesLengthChange"),
                p.length !== g && (this.params.watchOverflow && this.checkOverflow(),
                this.emit("snapGridLengthChange")),
                c.length !== b && this.emit("slidesGridLengthChange"),
                (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
            }
        },
        updateAutoHeight: function(e) {
            var t, i = [], s = 0;
            if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed),
            "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1)
                if (this.params.centeredSlides)
                    i.push.apply(i, this.visibleSlides);
                else
                    for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                        var a = this.activeIndex + t;
                        if (a > this.slides.length)
                            break;
                        i.push(this.slides.eq(a)[0])
                    }
            else
                i.push(this.slides.eq(this.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var r = i[t].offsetHeight;
                    s = r > s ? r : s
                }
            s && this.$wrapperEl.css("height", s + "px")
        },
        updateSlidesOffset: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1)
                e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this.params
              , i = this.slides
              , a = this.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                var r = -e;
                a && (r = e),
                i.removeClass(t.slideVisibleClass),
                this.visibleSlidesIndexes = [],
                this.visibleSlides = [];
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n]
                      , l = (r + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);
                    if (t.watchSlidesVisibility || t.centeredSlides && t.autoHeight) {
                        var d = -(r - o.swiperSlideOffset)
                          , h = d + this.slidesSizesGrid[n];
                        (d >= 0 && d < this.size - 1 || h > 1 && h <= this.size || d <= 0 && h >= this.size) && (this.visibleSlides.push(o),
                        this.visibleSlidesIndexes.push(n),
                        i.eq(n).addClass(t.slideVisibleClass))
                    }
                    o.progress = a ? -l : l
                }
                this.visibleSlides = s(this.visibleSlides)
            }
        },
        updateProgress: function(e) {
            if (void 0 === e) {
                var t = this.rtlTranslate ? -1 : 1;
                e = this && this.translate && this.translate * t || 0
            }
            var i = this.params
              , s = this.maxTranslate() - this.minTranslate()
              , a = this.progress
              , r = this.isBeginning
              , o = this.isEnd
              , l = r
              , d = o;
            0 === s ? (a = 0,
            r = !0,
            o = !0) : (r = (a = (e - this.minTranslate()) / s) <= 0,
            o = a >= 1),
            n.extend(this, {
                progress: a,
                isBeginning: r,
                isEnd: o
            }),
            (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && this.updateSlidesProgress(e),
            r && !l && this.emit("reachBeginning toEdge"),
            o && !d && this.emit("reachEnd toEdge"),
            (l && !r || d && !o) && this.emit("fromEdge"),
            this.emit("progress", a)
        },
        updateSlidesClasses: function() {
            var e, t = this.slides, i = this.params, s = this.$wrapperEl, a = this.activeIndex, r = this.realIndex, n = this.virtual && i.virtual.enabled;
            t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass),
            (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass),
            i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
            var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
            var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass),
            i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass),
            l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            var t, i = this.rtlTranslate ? this.translate : -this.translate, s = this.slidesGrid, a = this.snapGrid, r = this.params, o = this.activeIndex, l = this.realIndex, d = this.snapIndex, h = e;
            if (void 0 === h) {
                for (var p = 0; p < s.length; p += 1)
                    void 0 !== s[p + 1] ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : i >= s[p] && i < s[p + 1] && (h = p + 1) : i >= s[p] && (h = p);
                r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0)
            }
            if (a.indexOf(i) >= 0)
                t = a.indexOf(i);
            else {
                var c = Math.min(r.slidesPerGroupSkip, h);
                t = c + Math.floor((h - c) / r.slidesPerGroup)
            }
            if (t >= a.length && (t = a.length - 1),
            h !== o) {
                var u = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
                n.extend(this, {
                    snapIndex: t,
                    realIndex: u,
                    previousIndex: o,
                    activeIndex: h
                }),
                this.emit("activeIndexChange"),
                this.emit("snapIndexChange"),
                l !== u && this.emit("realIndexChange"),
                (this.initialized || this.runCallbacksOnInit) && this.emit("slideChange")
            } else
                t !== d && (this.snapIndex = t,
                this.emit("snapIndexChange"))
        },
        updateClickedSlide: function(e) {
            var t = this.params
              , i = s(e.target).closest("." + t.slideClass)[0]
              , a = !1;
            if (i)
                for (var r = 0; r < this.slides.length; r += 1)
                    this.slides[r] === i && (a = !0);
            if (!i || !a)
                return this.clickedSlide = void 0,
                void (this.clickedIndex = void 0);
            this.clickedSlide = i,
            this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = s(i).index(),
            t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
        }
    };
    var p = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params
              , i = this.rtlTranslate
              , s = this.translate
              , a = this.$wrapperEl;
            if (t.virtualTranslate)
                return i ? -s : s;
            if (t.cssMode)
                return s;
            var r = n.getTranslate(a[0], e);
            return i && (r = -r),
            r || 0
        },
        setTranslate: function(e, t) {
            var i = this.rtlTranslate
              , s = this.params
              , a = this.$wrapperEl
              , r = this.wrapperEl
              , n = this.progress
              , o = 0
              , l = 0;
            this.isHorizontal() ? o = i ? -e : e : l = e,
            s.roundLengths && (o = Math.floor(o),
            l = Math.floor(l)),
            s.cssMode ? r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -o : -l : s.virtualTranslate || a.transform("translate3d(" + o + "px, " + l + "px, 0px)"),
            this.previousTranslate = this.translate,
            this.translate = this.isHorizontal() ? o : l;
            var d = this.maxTranslate() - this.minTranslate();
            (0 === d ? 0 : (e - this.minTranslate()) / d) !== n && this.updateProgress(e),
            this.emit("setTranslate", this.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function(e, t, i, s, a) {
            var r;
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0),
            void 0 === s && (s = !0);
            var n = this
              , o = n.params
              , l = n.wrapperEl;
            if (n.animating && o.preventInteractionOnTransition)
                return !1;
            var d, h = n.minTranslate(), p = n.maxTranslate();
            if (d = s && e > h ? h : s && e < p ? p : e,
            n.updateProgress(d),
            o.cssMode) {
                var c = n.isHorizontal();
                return 0 === t ? l[c ? "scrollLeft" : "scrollTop"] = -d : l.scrollTo ? l.scrollTo(((r = {})[c ? "left" : "top"] = -d,
                r.behavior = "smooth",
                r)) : l[c ? "scrollLeft" : "scrollTop"] = -d,
                !0
            }
            return 0 === t ? (n.setTransition(0),
            n.setTranslate(d),
            i && (n.emit("beforeTransitionStart", t, a),
            n.emit("transitionEnd"))) : (n.setTransition(t),
            n.setTranslate(d),
            i && (n.emit("beforeTransitionStart", t, a),
            n.emit("transitionStart")),
            n.animating || (n.animating = !0,
            n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(e) {
                n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
                n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd),
                n.onTranslateToWrapperTransitionEnd = null,
                delete n.onTranslateToWrapperTransitionEnd,
                i && n.emit("transitionEnd"))
            }
            ),
            n.$wrapperEl[0].addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
            n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd))),
            !0
        }
    };
    var c = {
        setTransition: function(e, t) {
            this.params.cssMode || this.$wrapperEl.transition(e),
            this.emit("setTransition", e, t)
        },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex
              , s = this.params
              , a = this.previousIndex;
            if (!s.cssMode) {
                s.autoHeight && this.updateAutoHeight();
                var r = t;
                if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"),
                this.emit("transitionStart"),
                e && i !== a) {
                    if ("reset" === r)
                        return void this.emit("slideResetTransitionStart");
                    this.emit("slideChangeTransitionStart"),
                    "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
                }
            }
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex
              , s = this.previousIndex
              , a = this.params;
            if (this.animating = !1,
            !a.cssMode) {
                this.setTransition(0);
                var r = t;
                if (r || (r = i > s ? "next" : i < s ? "prev" : "reset"),
                this.emit("transitionEnd"),
                e && i !== s) {
                    if ("reset" === r)
                        return void this.emit("slideResetTransitionEnd");
                    this.emit("slideChangeTransitionEnd"),
                    "next" === r ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
                }
            }
        }
    };
    var u = {
        slideTo: function(e, t, i, s) {
            var a;
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0);
            var r = this
              , n = e;
            n < 0 && (n = 0);
            var o = r.params
              , l = r.snapGrid
              , d = r.slidesGrid
              , h = r.previousIndex
              , p = r.activeIndex
              , c = r.rtlTranslate
              , u = r.wrapperEl;
            if (r.animating && o.preventInteractionOnTransition)
                return !1;
            var v = Math.min(r.params.slidesPerGroupSkip, n)
              , f = v + Math.floor((n - v) / r.params.slidesPerGroup);
            f >= l.length && (f = l.length - 1),
            (p || o.initialSlide || 0) === (h || 0) && i && r.emit("beforeSlideChangeStart");
            var m, g = -l[f];
            if (r.updateProgress(g),
            o.normalizeSlideIndex)
                for (var b = 0; b < d.length; b += 1)
                    -Math.floor(100 * g) >= Math.floor(100 * d[b]) && (n = b);
            if (r.initialized && n !== p) {
                if (!r.allowSlideNext && g < r.translate && g < r.minTranslate())
                    return !1;
                if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (p || 0) !== n)
                    return !1
            }
            if (m = n > p ? "next" : n < p ? "prev" : "reset",
            c && -g === r.translate || !c && g === r.translate)
                return r.updateActiveIndex(n),
                o.autoHeight && r.updateAutoHeight(),
                r.updateSlidesClasses(),
                "slide" !== o.effect && r.setTranslate(g),
                "reset" !== m && (r.transitionStart(i, m),
                r.transitionEnd(i, m)),
                !1;
            if (o.cssMode) {
                var w = r.isHorizontal();
                return 0 === t ? u[w ? "scrollLeft" : "scrollTop"] = -g : u.scrollTo ? u.scrollTo(((a = {})[w ? "left" : "top"] = -g,
                a.behavior = "smooth",
                a)) : u[w ? "scrollLeft" : "scrollTop"] = -g,
                !0
            }
            return 0 === t ? (r.setTransition(0),
            r.setTranslate(g),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, s),
            r.transitionStart(i, m),
            r.transitionEnd(i, m)) : (r.setTransition(t),
            r.setTranslate(g),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, s),
            r.transitionStart(i, m),
            r.animating || (r.animating = !0,
            r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd),
                r.onSlideToWrapperTransitionEnd = null,
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(i, m))
            }
            ),
            r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
            r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))),
            !0
        },
        slideToLoop: function(e, t, i, s) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0);
            var a = e;
            return this.params.loop && (a += this.loopedSlides),
            this.slideTo(a, t, i, s)
        },
        slideNext: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var s = this.params
              , a = this.animating
              , r = this.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
            if (s.loop) {
                if (a)
                    return !1;
                this.loopFix(),
                this._clientLeft = this.$wrapperEl[0].clientLeft
            }
            return this.slideTo(this.activeIndex + r, e, t, i)
        },
        slidePrev: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var s = this.params
              , a = this.animating
              , r = this.snapGrid
              , n = this.slidesGrid
              , o = this.rtlTranslate;
            if (s.loop) {
                if (a)
                    return !1;
                this.loopFix(),
                this._clientLeft = this.$wrapperEl[0].clientLeft
            }
            function l(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            var d, h = l(o ? this.translate : -this.translate), p = r.map((function(e) {
                return l(e)
            }
            )), c = (n.map((function(e) {
                return l(e)
            }
            )),
            r[p.indexOf(h)],
            r[p.indexOf(h) - 1]);
            return void 0 === c && s.cssMode && r.forEach((function(e) {
                !c && h >= e && (c = e)
            }
            )),
            void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1),
            this.slideTo(d, e, t, i)
        },
        slideReset: function(e, t, i) {
            return void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, i)
        },
        slideToClosest: function(e, t, i, s) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === s && (s = .5);
            var a = this.activeIndex
              , r = Math.min(this.params.slidesPerGroupSkip, a)
              , n = r + Math.floor((a - r) / this.params.slidesPerGroup)
              , o = this.rtlTranslate ? this.translate : -this.translate;
            if (o >= this.snapGrid[n]) {
                var l = this.snapGrid[n];
                o - l > (this.snapGrid[n + 1] - l) * s && (a += this.params.slidesPerGroup)
            } else {
                var d = this.snapGrid[n - 1];
                o - d <= (this.snapGrid[n] - d) * s && (a -= this.params.slidesPerGroup)
            }
            return a = Math.max(a, 0),
            a = Math.min(a, this.slidesGrid.length - 1),
            this.slideTo(a, e, t, i)
        },
        slideToClickedSlide: function() {
            var e, t = this, i = t.params, a = t.$wrapperEl, r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, o = t.clickedIndex;
            if (i.loop) {
                if (t.animating)
                    return;
                e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10),
                i.centeredSlides ? o < t.loopedSlides - r / 2 || o > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(),
                o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(),
                n.nextTick((function() {
                    t.slideTo(o)
                }
                ))) : t.slideTo(o) : o > t.slides.length - r ? (t.loopFix(),
                o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(),
                n.nextTick((function() {
                    t.slideTo(o)
                }
                ))) : t.slideTo(o)
            } else
                t.slideTo(o)
        }
    };
    var v = {
        loopCreate: function() {
            var t = this
              , i = t.params
              , a = t.$wrapperEl;
            a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var r = a.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var n = i.slidesPerGroup - r.length % i.slidesPerGroup;
                if (n !== i.slidesPerGroup) {
                    for (var o = 0; o < n; o += 1) {
                        var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        a.append(l)
                    }
                    r = a.children("." + i.slideClass)
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length),
            t.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)),
            t.loopedSlides += i.loopAdditionalSlides,
            t.loopedSlides > r.length && (t.loopedSlides = r.length);
            var d = []
              , h = [];
            r.each((function(e, i) {
                var a = s(i);
                e < t.loopedSlides && h.push(i),
                e < r.length && e >= r.length - t.loopedSlides && d.push(i),
                a.attr("data-swiper-slide-index", e)
            }
            ));
            for (var p = 0; p < h.length; p += 1)
                a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var c = d.length - 1; c >= 0; c -= 1)
                a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass))
        },
        loopFix: function() {
            this.emit("beforeLoopFix");
            var e, t = this.activeIndex, i = this.slides, s = this.loopedSlides, a = this.allowSlidePrev, r = this.allowSlideNext, n = this.snapGrid, o = this.rtlTranslate;
            this.allowSlidePrev = !0,
            this.allowSlideNext = !0;
            var l = -n[t] - this.getTranslate();
            if (t < s)
                e = i.length - 3 * s + t,
                e += s,
                this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l);
            else if (t >= i.length - s) {
                e = -i.length + t + s,
                e += s,
                this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l)
            }
            this.allowSlidePrev = a,
            this.allowSlideNext = r,
            this.emit("loopFix")
        },
        loopDestroy: function() {
            var e = this.$wrapperEl
              , t = this.params
              , i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(),
            i.removeAttr("data-swiper-slide-index")
        }
    };
    var f = {
        setGrabCursor: function(e) {
            if (!(o.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
                var t = this.el;
                t.style.cursor = "move",
                t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
                t.style.cursor = e ? "-moz-grabbin" : "-moz-grab",
                t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function() {
            o.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "")
        }
    };
    var m, g, b, w, y, x, T, E, S, C, M, P, z, k, $, L = {
        appendSlide: function(e) {
            var t = this.$wrapperEl
              , i = this.params;
            if (i.loop && this.loopDestroy(),
            "object" == typeof e && "length"in e)
                for (var s = 0; s < e.length; s += 1)
                    e[s] && t.append(e[s]);
            else
                t.append(e);
            i.loop && this.loopCreate(),
            i.observer && o.observer || this.update()
        },
        prependSlide: function(e) {
            var t = this.params
              , i = this.$wrapperEl
              , s = this.activeIndex;
            t.loop && this.loopDestroy();
            var a = s + 1;
            if ("object" == typeof e && "length"in e) {
                for (var r = 0; r < e.length; r += 1)
                    e[r] && i.prepend(e[r]);
                a = s + e.length
            } else
                i.prepend(e);
            t.loop && this.loopCreate(),
            t.observer && o.observer || this.update(),
            this.slideTo(a, 0, !1)
        },
        addSlide: function(e, t) {
            var i = this.$wrapperEl
              , s = this.params
              , a = this.activeIndex;
            s.loop && (a -= this.loopedSlides,
            this.loopDestroy(),
            this.slides = i.children("." + s.slideClass));
            var r = this.slides.length;
            if (e <= 0)
                this.prependSlide(t);
            else if (e >= r)
                this.appendSlide(t);
            else {
                for (var n = a > e ? a + 1 : a, l = [], d = r - 1; d >= e; d -= 1) {
                    var h = this.slides.eq(d);
                    h.remove(),
                    l.unshift(h)
                }
                if ("object" == typeof t && "length"in t) {
                    for (var p = 0; p < t.length; p += 1)
                        t[p] && i.append(t[p]);
                    n = a > e ? a + t.length : a
                } else
                    i.append(t);
                for (var c = 0; c < l.length; c += 1)
                    i.append(l[c]);
                s.loop && this.loopCreate(),
                s.observer && o.observer || this.update(),
                s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1)
            }
        },
        removeSlide: function(e) {
            var t = this.params
              , i = this.$wrapperEl
              , s = this.activeIndex;
            t.loop && (s -= this.loopedSlides,
            this.loopDestroy(),
            this.slides = i.children("." + t.slideClass));
            var a, r = s;
            if ("object" == typeof e && "length"in e) {
                for (var n = 0; n < e.length; n += 1)
                    a = e[n],
                    this.slides[a] && this.slides.eq(a).remove(),
                    a < r && (r -= 1);
                r = Math.max(r, 0)
            } else
                a = e,
                this.slides[a] && this.slides.eq(a).remove(),
                a < r && (r -= 1),
                r = Math.max(r, 0);
            t.loop && this.loopCreate(),
            t.observer && o.observer || this.update(),
            t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
        },
        removeAllSlides: function() {
            for (var e = [], t = 0; t < this.slides.length; t += 1)
                e.push(t);
            this.removeSlide(e)
        }
    }, I = (m = t.navigator.platform,
    g = t.navigator.userAgent,
    b = {
        ios: !1,
        android: !1,
        androidChrome: !1,
        desktop: !1,
        iphone: !1,
        ipod: !1,
        ipad: !1,
        edge: !1,
        ie: !1,
        firefox: !1,
        macos: !1,
        windows: !1,
        cordova: !(!t.cordova && !t.phonegap),
        phonegap: !(!t.cordova && !t.phonegap),
        electron: !1
    },
    w = t.screen.width,
    y = t.screen.height,
    x = g.match(/(Android);?[\s\/]+([\d.]+)?/),
    T = g.match(/(iPad).*OS\s([\d_]+)/),
    E = g.match(/(iPod)(.*OS\s([\d_]+))?/),
    S = !T && g.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    C = g.indexOf("MSIE ") >= 0 || g.indexOf("Trident/") >= 0,
    M = g.indexOf("Edge/") >= 0,
    P = g.indexOf("Gecko/") >= 0 && g.indexOf("Firefox/") >= 0,
    z = "Win32" === m,
    k = g.toLowerCase().indexOf("electron") >= 0,
    $ = "MacIntel" === m,
    !T && $ && o.touch && (1024 === w && 1366 === y || 834 === w && 1194 === y || 834 === w && 1112 === y || 768 === w && 1024 === y) && (T = g.match(/(Version)\/([\d.]+)/),
    $ = !1),
    b.ie = C,
    b.edge = M,
    b.firefox = P,
    x && !z && (b.os = "android",
    b.osVersion = x[2],
    b.android = !0,
    b.androidChrome = g.toLowerCase().indexOf("chrome") >= 0),
    (T || S || E) && (b.os = "ios",
    b.ios = !0),
    S && !E && (b.osVersion = S[2].replace(/_/g, "."),
    b.iphone = !0),
    T && (b.osVersion = T[2].replace(/_/g, "."),
    b.ipad = !0),
    E && (b.osVersion = E[3] ? E[3].replace(/_/g, ".") : null,
    b.ipod = !0),
    b.ios && b.osVersion && g.indexOf("Version/") >= 0 && "10" === b.osVersion.split(".")[0] && (b.osVersion = g.toLowerCase().split("version/")[1].split(" ")[0]),
    b.webView = !(!(S || T || E) || !g.match(/.*AppleWebKit(?!.*Safari)/i) && !t.navigator.standalone) || t.matchMedia && t.matchMedia("(display-mode: standalone)").matches,
    b.webview = b.webView,
    b.standalone = b.webView,
    b.desktop = !(b.ios || b.android) || k,
    b.desktop && (b.electron = k,
    b.macos = $,
    b.windows = z,
    b.macos && (b.os = "macos"),
    b.windows && (b.os = "windows")),
    b.pixelRatio = t.devicePixelRatio || 1,
    b);
    function D(i) {
        var a = this.touchEventsData
          , r = this.params
          , o = this.touches;
        if (!this.animating || !r.preventInteractionOnTransition) {
            var l = i;
            l.originalEvent && (l = l.originalEvent);
            var d = s(l.target);
            if (("wrapper" !== r.touchEventsTarget || d.closest(this.wrapperEl).length) && (a.isTouchEvent = "touchstart" === l.type,
            (a.isTouchEvent || !("which"in l) || 3 !== l.which) && !(!a.isTouchEvent && "button"in l && l.button > 0 || a.isTouched && a.isMoved)))
                if (r.noSwiping && d.closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0])
                    this.allowClick = !0;
                else if (!r.swipeHandler || d.closest(r.swipeHandler)[0]) {
                    o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX,
                    o.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY;
                    var h = o.currentX
                      , p = o.currentY
                      , c = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection
                      , u = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
                    if (!c || !(h <= u || h >= t.screen.width - u)) {
                        if (n.extend(a, {
                            isTouched: !0,
                            isMoved: !1,
                            allowTouchCallbacks: !0,
                            isScrolling: void 0,
                            startMoving: void 0
                        }),
                        o.startX = h,
                        o.startY = p,
                        a.touchStartTime = n.now(),
                        this.allowClick = !0,
                        this.updateSize(),
                        this.swipeDirection = void 0,
                        r.threshold > 0 && (a.allowThresholdMove = !1),
                        "touchstart" !== l.type) {
                            var v = !0;
                            d.is(a.formElements) && (v = !1),
                            e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== d[0] && e.activeElement.blur();
                            var f = v && this.allowTouchMove && r.touchStartPreventDefault;
                            (r.touchStartForcePreventDefault || f) && l.preventDefault()
                        }
                        this.emit("touchStart", l)
                    }
                }
        }
    }
    function O(t) {
        var i = this.touchEventsData
          , a = this.params
          , r = this.touches
          , o = this.rtlTranslate
          , l = t;
        if (l.originalEvent && (l = l.originalEvent),
        i.isTouched) {
            if (!i.isTouchEvent || "mousemove" !== l.type) {
                var d = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0])
                  , h = "touchmove" === l.type ? d.pageX : l.pageX
                  , p = "touchmove" === l.type ? d.pageY : l.pageY;
                if (l.preventedByNestedSwiper)
                    return r.startX = h,
                    void (r.startY = p);
                if (!this.allowTouchMove)
                    return this.allowClick = !1,
                    void (i.isTouched && (n.extend(r, {
                        startX: h,
                        startY: p,
                        currentX: h,
                        currentY: p
                    }),
                    i.touchStartTime = n.now()));
                if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
                    if (this.isVertical()) {
                        if (p < r.startY && this.translate <= this.maxTranslate() || p > r.startY && this.translate >= this.minTranslate())
                            return i.isTouched = !1,
                            void (i.isMoved = !1)
                    } else if (h < r.startX && this.translate <= this.maxTranslate() || h > r.startX && this.translate >= this.minTranslate())
                        return;
                if (i.isTouchEvent && e.activeElement && l.target === e.activeElement && s(l.target).is(i.formElements))
                    return i.isMoved = !0,
                    void (this.allowClick = !1);
                if (i.allowTouchCallbacks && this.emit("touchMove", l),
                !(l.targetTouches && l.targetTouches.length > 1)) {
                    r.currentX = h,
                    r.currentY = p;
                    var c = r.currentX - r.startX
                      , u = r.currentY - r.startY;
                    if (!(this.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < this.params.threshold)) {
                        var v;
                        if (void 0 === i.isScrolling)
                            this.isHorizontal() && r.currentY === r.startY || this.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : c * c + u * u >= 25 && (v = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI,
                            i.isScrolling = this.isHorizontal() ? v > a.touchAngle : 90 - v > a.touchAngle);
                        if (i.isScrolling && this.emit("touchMoveOpposite", l),
                        void 0 === i.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)),
                        i.isScrolling)
                            i.isTouched = !1;
                        else if (i.startMoving) {
                            this.allowClick = !1,
                            a.cssMode || l.preventDefault(),
                            a.touchMoveStopPropagation && !a.nested && l.stopPropagation(),
                            i.isMoved || (a.loop && this.loopFix(),
                            i.startTranslate = this.getTranslate(),
                            this.setTransition(0),
                            this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                            i.allowMomentumBounce = !1,
                            !a.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0),
                            this.emit("sliderFirstMove", l)),
                            this.emit("sliderMove", l),
                            i.isMoved = !0;
                            var f = this.isHorizontal() ? c : u;
                            r.diff = f,
                            f *= a.touchRatio,
                            o && (f = -f),
                            this.swipeDirection = f > 0 ? "prev" : "next",
                            i.currentTranslate = f + i.startTranslate;
                            var m = !0
                              , g = a.resistanceRatio;
                            if (a.touchReleaseOnEdges && (g = 0),
                            f > 0 && i.currentTranslate > this.minTranslate() ? (m = !1,
                            a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + f, g))) : f < 0 && i.currentTranslate < this.maxTranslate() && (m = !1,
                            a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - f, g))),
                            m && (l.preventedByNestedSwiper = !0),
                            !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
                            !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
                            a.threshold > 0) {
                                if (!(Math.abs(f) > a.threshold || i.allowThresholdMove))
                                    return void (i.currentTranslate = i.startTranslate);
                                if (!i.allowThresholdMove)
                                    return i.allowThresholdMove = !0,
                                    r.startX = r.currentX,
                                    r.startY = r.currentY,
                                    i.currentTranslate = i.startTranslate,
                                    void (r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
                            }
                            a.followFinger && !a.cssMode && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(),
                            this.updateSlidesClasses()),
                            a.freeMode && (0 === i.velocities.length && i.velocities.push({
                                position: r[this.isHorizontal() ? "startX" : "startY"],
                                time: i.touchStartTime
                            }),
                            i.velocities.push({
                                position: r[this.isHorizontal() ? "currentX" : "currentY"],
                                time: n.now()
                            })),
                            this.updateProgress(i.currentTranslate),
                            this.setTranslate(i.currentTranslate))
                        }
                    }
                }
            }
        } else
            i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l)
    }
    function A(e) {
        var t = this
          , i = t.touchEventsData
          , s = t.params
          , a = t.touches
          , r = t.rtlTranslate
          , o = t.$wrapperEl
          , l = t.slidesGrid
          , d = t.snapGrid
          , h = e;
        if (h.originalEvent && (h = h.originalEvent),
        i.allowTouchCallbacks && t.emit("touchEnd", h),
        i.allowTouchCallbacks = !1,
        !i.isTouched)
            return i.isMoved && s.grabCursor && t.setGrabCursor(!1),
            i.isMoved = !1,
            void (i.startMoving = !1);
        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        var p, c = n.now(), u = c - i.touchStartTime;
        if (t.allowClick && (t.updateClickedSlide(h),
        t.emit("tap click", h),
        u < 300 && c - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", h)),
        i.lastClickTime = n.now(),
        n.nextTick((function() {
            t.destroyed || (t.allowClick = !0)
        }
        )),
        !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate)
            return i.isTouched = !1,
            i.isMoved = !1,
            void (i.startMoving = !1);
        if (i.isTouched = !1,
        i.isMoved = !1,
        i.startMoving = !1,
        p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate,
        !s.cssMode)
            if (s.freeMode) {
                if (p < -t.minTranslate())
                    return void t.slideTo(t.activeIndex);
                if (p > -t.maxTranslate())
                    return void (t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1));
                if (s.freeModeMomentum) {
                    if (i.velocities.length > 1) {
                        var v = i.velocities.pop()
                          , f = i.velocities.pop()
                          , m = v.position - f.position
                          , g = v.time - f.time;
                        t.velocity = m / g,
                        t.velocity /= 2,
                        Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0),
                        (g > 150 || n.now() - v.time > 300) && (t.velocity = 0)
                    } else
                        t.velocity = 0;
                    t.velocity *= s.freeModeMomentumVelocityRatio,
                    i.velocities.length = 0;
                    var b = 1e3 * s.freeModeMomentumRatio
                      , w = t.velocity * b
                      , y = t.translate + w;
                    r && (y = -y);
                    var x, T, E = !1, S = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                    if (y < t.maxTranslate())
                        s.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S),
                        x = t.maxTranslate(),
                        E = !0,
                        i.allowMomentumBounce = !0) : y = t.maxTranslate(),
                        s.loop && s.centeredSlides && (T = !0);
                    else if (y > t.minTranslate())
                        s.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S),
                        x = t.minTranslate(),
                        E = !0,
                        i.allowMomentumBounce = !0) : y = t.minTranslate(),
                        s.loop && s.centeredSlides && (T = !0);
                    else if (s.freeModeSticky) {
                        for (var C, M = 0; M < d.length; M += 1)
                            if (d[M] > -y) {
                                C = M;
                                break
                            }
                        y = -(y = Math.abs(d[C] - y) < Math.abs(d[C - 1] - y) || "next" === t.swipeDirection ? d[C] : d[C - 1])
                    }
                    if (T && t.once("transitionEnd", (function() {
                        t.loopFix()
                    }
                    )),
                    0 !== t.velocity) {
                        if (b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity),
                        s.freeModeSticky) {
                            var P = Math.abs((r ? -y : y) - t.translate)
                              , z = t.slidesSizesGrid[t.activeIndex];
                            b = P < z ? s.speed : P < 2 * z ? 1.5 * s.speed : 2.5 * s.speed
                        }
                    } else if (s.freeModeSticky)
                        return void t.slideToClosest();
                    s.freeModeMomentumBounce && E ? (t.updateProgress(x),
                    t.setTransition(b),
                    t.setTranslate(y),
                    t.transitionStart(!0, t.swipeDirection),
                    t.animating = !0,
                    o.transitionEnd((function() {
                        t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"),
                        t.setTransition(s.speed),
                        t.setTranslate(x),
                        o.transitionEnd((function() {
                            t && !t.destroyed && t.transitionEnd()
                        }
                        )))
                    }
                    ))) : t.velocity ? (t.updateProgress(y),
                    t.setTransition(b),
                    t.setTranslate(y),
                    t.transitionStart(!0, t.swipeDirection),
                    t.animating || (t.animating = !0,
                    o.transitionEnd((function() {
                        t && !t.destroyed && t.transitionEnd()
                    }
                    )))) : t.updateProgress(y),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses()
                } else if (s.freeModeSticky)
                    return void t.slideToClosest();
                (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(),
                t.updateActiveIndex(),
                t.updateSlidesClasses())
            } else {
                for (var k = 0, $ = t.slidesSizesGrid[0], L = 0; L < l.length; L += L < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
                    var I = L < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                    void 0 !== l[L + I] ? p >= l[L] && p < l[L + I] && (k = L,
                    $ = l[L + I] - l[L]) : p >= l[L] && (k = L,
                    $ = l[l.length - 1] - l[l.length - 2])
                }
                var D = (p - l[k]) / $
                  , O = k < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                if (u > s.longSwipesMs) {
                    if (!s.longSwipes)
                        return void t.slideTo(t.activeIndex);
                    "next" === t.swipeDirection && (D >= s.longSwipesRatio ? t.slideTo(k + O) : t.slideTo(k)),
                    "prev" === t.swipeDirection && (D > 1 - s.longSwipesRatio ? t.slideTo(k + O) : t.slideTo(k))
                } else {
                    if (!s.shortSwipes)
                        return void t.slideTo(t.activeIndex);
                    t.navigation && (h.target === t.navigation.nextEl || h.target === t.navigation.prevEl) ? h.target === t.navigation.nextEl ? t.slideTo(k + O) : t.slideTo(k) : ("next" === t.swipeDirection && t.slideTo(k + O),
                    "prev" === t.swipeDirection && t.slideTo(k))
                }
            }
    }
    function G() {
        var e = this.params
          , t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext
              , s = this.allowSlidePrev
              , a = this.snapGrid;
            this.allowSlideNext = !0,
            this.allowSlidePrev = !0,
            this.updateSize(),
            this.updateSlides(),
            this.updateSlidesClasses(),
            ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0),
            this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(),
            this.allowSlidePrev = s,
            this.allowSlideNext = i,
            this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow()
        }
    }
    function H(e) {
        this.allowClick || (this.params.preventClicks && e.preventDefault(),
        this.params.preventClicksPropagation && this.animating && (e.stopPropagation(),
        e.stopImmediatePropagation()))
    }
    function B() {
        var e = this.wrapperEl;
        this.previousTranslate = this.translate,
        this.translate = this.isHorizontal() ? -e.scrollLeft : -e.scrollTop,
        -0 === this.translate && (this.translate = 0),
        this.updateActiveIndex(),
        this.updateSlidesClasses();
        var t = this.maxTranslate() - this.minTranslate();
        (0 === t ? 0 : (this.translate - this.minTranslate()) / t) !== this.progress && this.updateProgress(this.translate),
        this.emit("setTranslate", this.translate, !1)
    }
    var N = !1;
    function X() {}
    var V = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        preventInteractionOnTransition: !1,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0
    }
      , Y = {
        update: h,
        translate: p,
        transition: c,
        slide: u,
        loop: v,
        grabCursor: f,
        manipulation: L,
        events: {
            attachEvents: function() {
                var t = this.params
                  , i = this.touchEvents
                  , s = this.el
                  , a = this.wrapperEl;
                this.onTouchStart = D.bind(this),
                this.onTouchMove = O.bind(this),
                this.onTouchEnd = A.bind(this),
                t.cssMode && (this.onScroll = B.bind(this)),
                this.onClick = H.bind(this);
                var r = !!t.nested;
                if (!o.touch && o.pointerEvents)
                    s.addEventListener(i.start, this.onTouchStart, !1),
                    e.addEventListener(i.move, this.onTouchMove, r),
                    e.addEventListener(i.end, this.onTouchEnd, !1);
                else {
                    if (o.touch) {
                        var n = !("touchstart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.addEventListener(i.start, this.onTouchStart, n),
                        s.addEventListener(i.move, this.onTouchMove, o.passiveListener ? {
                            passive: !1,
                            capture: r
                        } : r),
                        s.addEventListener(i.end, this.onTouchEnd, n),
                        i.cancel && s.addEventListener(i.cancel, this.onTouchEnd, n),
                        N || (e.addEventListener("touchstart", X),
                        N = !0)
                    }
                    (t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.addEventListener("mousedown", this.onTouchStart, !1),
                    e.addEventListener("mousemove", this.onTouchMove, r),
                    e.addEventListener("mouseup", this.onTouchEnd, !1))
                }
                (t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0),
                t.cssMode && a.addEventListener("scroll", this.onScroll),
                t.updateOnWindowResize ? this.on(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0) : this.on("observerUpdate", G, !0)
            },
            detachEvents: function() {
                var t = this.params
                  , i = this.touchEvents
                  , s = this.el
                  , a = this.wrapperEl
                  , r = !!t.nested;
                if (!o.touch && o.pointerEvents)
                    s.removeEventListener(i.start, this.onTouchStart, !1),
                    e.removeEventListener(i.move, this.onTouchMove, r),
                    e.removeEventListener(i.end, this.onTouchEnd, !1);
                else {
                    if (o.touch) {
                        var n = !("onTouchStart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.removeEventListener(i.start, this.onTouchStart, n),
                        s.removeEventListener(i.move, this.onTouchMove, r),
                        s.removeEventListener(i.end, this.onTouchEnd, n),
                        i.cancel && s.removeEventListener(i.cancel, this.onTouchEnd, n)
                    }
                    (t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1),
                    e.removeEventListener("mousemove", this.onTouchMove, r),
                    e.removeEventListener("mouseup", this.onTouchEnd, !1))
                }
                (t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0),
                t.cssMode && a.removeEventListener("scroll", this.onScroll),
                this.off(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G)
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                var e = this.activeIndex
                  , t = this.initialized
                  , i = this.loopedSlides;
                void 0 === i && (i = 0);
                var s = this.params
                  , a = this.$el
                  , r = s.breakpoints;
                if (r && (!r || 0 !== Object.keys(r).length)) {
                    var o = this.getBreakpoint(r);
                    if (o && this.currentBreakpoint !== o) {
                        var l = o in r ? r[o] : void 0;
                        l && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach((function(e) {
                            var t = l[e];
                            void 0 !== t && (l[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                        }
                        ));
                        var d = l || this.originalParams
                          , h = s.slidesPerColumn > 1
                          , p = d.slidesPerColumn > 1;
                        h && !p ? a.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column") : !h && p && (a.addClass(s.containerModifierClass + "multirow"),
                        "column" === d.slidesPerColumnFill && a.addClass(s.containerModifierClass + "multirow-column"));
                        var c = d.direction && d.direction !== s.direction
                          , u = s.loop && (d.slidesPerView !== s.slidesPerView || c);
                        c && t && this.changeDirection(),
                        n.extend(this.params, d),
                        n.extend(this, {
                            allowTouchMove: this.params.allowTouchMove,
                            allowSlideNext: this.params.allowSlideNext,
                            allowSlidePrev: this.params.allowSlidePrev
                        }),
                        this.currentBreakpoint = o,
                        u && t && (this.loopDestroy(),
                        this.loopCreate(),
                        this.updateSlides(),
                        this.slideTo(e - i + this.loopedSlides, 0, !1)),
                        this.emit("breakpoint", d)
                    }
                }
            },
            getBreakpoint: function(e) {
                if (e) {
                    var i = !1
                      , s = Object.keys(e).map((function(e) {
                        if ("string" == typeof e && 0 === e.indexOf("@")) {
                            var i = parseFloat(e.substr(1));
                            return {
                                value: t.innerHeight * i,
                                point: e
                            }
                        }
                        return {
                            value: e,
                            point: e
                        }
                    }
                    ));
                    s.sort((function(e, t) {
                        return parseInt(e.value, 10) - parseInt(t.value, 10)
                    }
                    ));
                    for (var a = 0; a < s.length; a += 1) {
                        var r = s[a]
                          , n = r.point;
                        r.value <= t.innerWidth && (i = n)
                    }
                    return i || "max"
                }
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                var e = this.params
                  , t = this.isLocked
                  , i = this.slides.length > 0 && e.slidesOffsetBefore + e.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length;
                e.slidesOffsetBefore && e.slidesOffsetAfter && i ? this.isLocked = i <= this.size : this.isLocked = 1 === this.snapGrid.length,
                this.allowSlideNext = !this.isLocked,
                this.allowSlidePrev = !this.isLocked,
                t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"),
                t && t !== this.isLocked && (this.isEnd = !1,
                this.navigation.update())
            }
        },
        classes: {
            addClasses: function() {
                var e = this.classNames
                  , t = this.params
                  , i = this.rtl
                  , s = this.$el
                  , a = [];
                a.push("initialized"),
                a.push(t.direction),
                t.freeMode && a.push("free-mode"),
                t.autoHeight && a.push("autoheight"),
                i && a.push("rtl"),
                t.slidesPerColumn > 1 && (a.push("multirow"),
                "column" === t.slidesPerColumnFill && a.push("multirow-column")),
                I.android && a.push("android"),
                I.ios && a.push("ios"),
                t.cssMode && a.push("css-mode"),
                a.forEach((function(i) {
                    e.push(t.containerModifierClass + i)
                }
                )),
                s.addClass(e.join(" "))
            },
            removeClasses: function() {
                var e = this.$el
                  , t = this.classNames;
                e.removeClass(t.join(" "))
            }
        },
        images: {
            loadImage: function(e, i, s, a, r, n) {
                var o;
                function l() {
                    n && n()
                }
                e.complete && r ? l() : i ? ((o = new t.Image).onload = l,
                o.onerror = l,
                a && (o.sizes = a),
                s && (o.srcset = s),
                i && (o.src = i)) : l()
            },
            preloadImages: function() {
                var e = this;
                function t() {
                    null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                    e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")))
                }
                e.imagesToLoad = e.$el.find("img");
                for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                    var s = e.imagesToLoad[i];
                    e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                }
            }
        }
    }
      , F = {}
      , W = function(e) {
        function t() {
            for (var i, a, r, l = [], d = arguments.length; d--; )
                l[d] = arguments[d];
            1 === l.length && l[0].constructor && l[0].constructor === Object ? r = l[0] : (a = (i = l)[0],
            r = i[1]),
            r || (r = {}),
            r = n.extend({}, r),
            a && !r.el && (r.el = a),
            e.call(this, r),
            Object.keys(Y).forEach((function(e) {
                Object.keys(Y[e]).forEach((function(i) {
                    t.prototype[i] || (t.prototype[i] = Y[e][i])
                }
                ))
            }
            ));
            var h = this;
            void 0 === h.modules && (h.modules = {}),
            Object.keys(h.modules).forEach((function(e) {
                var t = h.modules[e];
                if (t.params) {
                    var i = Object.keys(t.params)[0]
                      , s = t.params[i];
                    if ("object" != typeof s || null === s)
                        return;
                    if (!(i in r && "enabled"in s))
                        return;
                    !0 === r[i] && (r[i] = {
                        enabled: !0
                    }),
                    "object" != typeof r[i] || "enabled"in r[i] || (r[i].enabled = !0),
                    r[i] || (r[i] = {
                        enabled: !1
                    })
                }
            }
            ));
            var p = n.extend({}, V);
            h.useModulesParams(p),
            h.params = n.extend({}, p, F, r),
            h.originalParams = n.extend({}, h.params),
            h.passedParams = n.extend({}, r),
            h.$ = s;
            var c = s(h.params.el);
            if (a = c[0]) {
                if (c.length > 1) {
                    var u = [];
                    return c.each((function(e, i) {
                        var s = n.extend({}, r, {
                            el: i
                        });
                        u.push(new t(s))
                    }
                    )),
                    u
                }
                var v, f, m;
                return a.swiper = h,
                c.data("swiper", h),
                a && a.shadowRoot && a.shadowRoot.querySelector ? (v = s(a.shadowRoot.querySelector("." + h.params.wrapperClass))).children = function(e) {
                    return c.children(e)
                }
                : v = c.children("." + h.params.wrapperClass),
                n.extend(h, {
                    $el: c,
                    el: a,
                    $wrapperEl: v,
                    wrapperEl: v[0],
                    classNames: [],
                    slides: s(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: function() {
                        return "horizontal" === h.params.direction
                    },
                    isVertical: function() {
                        return "vertical" === h.params.direction
                    },
                    rtl: "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"),
                    rtlTranslate: "horizontal" === h.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")),
                    wrongRTL: "-webkit-box" === v.css("display"),
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: h.params.allowSlideNext,
                    allowSlidePrev: h.params.allowSlidePrev,
                    touchEvents: (f = ["touchstart", "touchmove", "touchend", "touchcancel"],
                    m = ["mousedown", "mousemove", "mouseup"],
                    o.pointerEvents && (m = ["pointerdown", "pointermove", "pointerup"]),
                    h.touchEventsTouch = {
                        start: f[0],
                        move: f[1],
                        end: f[2],
                        cancel: f[3]
                    },
                    h.touchEventsDesktop = {
                        start: m[0],
                        move: m[1],
                        end: m[2]
                    },
                    o.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        formElements: "input, select, option, textarea, button, video, label",
                        lastClickTime: n.now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: !0,
                    allowTouchMove: h.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                }),
                h.useModules(),
                h.params.init && h.init(),
                h
            }
        }
        e && (t.__proto__ = e),
        t.prototype = Object.create(e && e.prototype),
        t.prototype.constructor = t;
        var i = {
            extendedDefaults: {
                configurable: !0
            },
            defaults: {
                configurable: !0
            },
            Class: {
                configurable: !0
            },
            $: {
                configurable: !0
            }
        };
        return t.prototype.slidesPerViewDynamic = function() {
            var e = this.params
              , t = this.slides
              , i = this.slidesGrid
              , s = this.size
              , a = this.activeIndex
              , r = 1;
            if (e.centeredSlides) {
                for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1)
                    t[l] && !n && (r += 1,
                    (o += t[l].swiperSlideSize) > s && (n = !0));
                for (var d = a - 1; d >= 0; d -= 1)
                    t[d] && !n && (r += 1,
                    (o += t[d].swiperSlideSize) > s && (n = !0))
            } else
                for (var h = a + 1; h < t.length; h += 1)
                    i[h] - i[a] < s && (r += 1);
            return r
        }
        ,
        t.prototype.update = function() {
            var e = this;
            if (e && !e.destroyed) {
                var t = e.snapGrid
                  , i = e.params;
                i.breakpoints && e.setBreakpoint(),
                e.updateSize(),
                e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                e.params.freeMode ? (s(),
                e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(),
                i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                e.emit("update")
            }
            function s() {
                var t = e.rtlTranslate ? -1 * e.translate : e.translate
                  , i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(i),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
        }
        ,
        t.prototype.changeDirection = function(e, t) {
            void 0 === t && (t = !0);
            var i = this.params.direction;
            return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i || "horizontal" !== e && "vertical" !== e ? this : (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e),
            this.params.direction = e,
            this.slides.each((function(t, i) {
                "vertical" === e ? i.style.width = "" : i.style.height = ""
            }
            )),
            this.emit("changeDirection"),
            t && this.update(),
            this)
        }
        ,
        t.prototype.init = function() {
            this.initialized || (this.emit("beforeInit"),
            this.params.breakpoints && this.setBreakpoint(),
            this.addClasses(),
            this.params.loop && this.loopCreate(),
            this.updateSize(),
            this.updateSlides(),
            this.params.watchOverflow && this.checkOverflow(),
            this.params.grabCursor && this.setGrabCursor(),
            this.params.preloadImages && this.preloadImages(),
            this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit),
            this.attachEvents(),
            this.initialized = !0,
            this.emit("init"))
        }
        ,
        t.prototype.destroy = function(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            var i = this
              , s = i.params
              , a = i.$el
              , r = i.$wrapperEl
              , o = i.slides;
            return void 0 === i.params || i.destroyed ? null : (i.emit("beforeDestroy"),
            i.initialized = !1,
            i.detachEvents(),
            s.loop && i.loopDestroy(),
            t && (i.removeClasses(),
            a.removeAttr("style"),
            r.removeAttr("style"),
            o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach((function(e) {
                i.off(e)
            }
            )),
            !1 !== e && (i.$el[0].swiper = null,
            i.$el.data("swiper", null),
            n.deleteProps(i)),
            i.destroyed = !0,
            null)
        }
        ,
        t.extendDefaults = function(e) {
            n.extend(F, e)
        }
        ,
        i.extendedDefaults.get = function() {
            return F
        }
        ,
        i.defaults.get = function() {
            return V
        }
        ,
        i.Class.get = function() {
            return e
        }
        ,
        i.$.get = function() {
            return s
        }
        ,
        Object.defineProperties(t, i),
        t
    }(l)
      , R = {
        name: "device",
        proto: {
            device: I
        },
        static: {
            device: I
        }
    }
      , q = {
        name: "support",
        proto: {
            support: o
        },
        static: {
            support: o
        }
    }
      , j = {
        isEdge: !!t.navigator.userAgent.match(/Edge/g),
        isSafari: function() {
            var e = t.navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
    }
      , K = {
        name: "browser",
        proto: {
            browser: j
        },
        static: {
            browser: j
        }
    }
      , U = {
        name: "resize",
        create: function() {
            var e = this;
            n.extend(e, {
                resize: {
                    resizeHandler: function() {
                        e && !e.destroyed && e.initialized && (e.emit("beforeResize"),
                        e.emit("resize"))
                    },
                    orientationChangeHandler: function() {
                        e && !e.destroyed && e.initialized && e.emit("orientationchange")
                    }
                }
            })
        },
        on: {
            init: function() {
                t.addEventListener("resize", this.resize.resizeHandler),
                t.addEventListener("orientationchange", this.resize.orientationChangeHandler)
            },
            destroy: function() {
                t.removeEventListener("resize", this.resize.resizeHandler),
                t.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
            }
        }
    }
      , _ = {
        func: t.MutationObserver || t.WebkitMutationObserver,
        attach: function(e, i) {
            void 0 === i && (i = {});
            var s = this
              , a = new (0,
            _.func)((function(e) {
                if (1 !== e.length) {
                    var i = function() {
                        s.emit("observerUpdate", e[0])
                    };
                    t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0)
                } else
                    s.emit("observerUpdate", e[0])
            }
            ));
            a.observe(e, {
                attributes: void 0 === i.attributes || i.attributes,
                childList: void 0 === i.childList || i.childList,
                characterData: void 0 === i.characterData || i.characterData
            }),
            s.observer.observers.push(a)
        },
        init: function() {
            if (o.observer && this.params.observer) {
                if (this.params.observeParents)
                    for (var e = this.$el.parents(), t = 0; t < e.length; t += 1)
                        this.observer.attach(e[t]);
                this.observer.attach(this.$el[0], {
                    childList: this.params.observeSlideChildren
                }),
                this.observer.attach(this.$wrapperEl[0], {
                    attributes: !1
                })
            }
        },
        destroy: function() {
            this.observer.observers.forEach((function(e) {
                e.disconnect()
            }
            )),
            this.observer.observers = []
        }
    }
      , Z = {
        name: "observer",
        params: {
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        },
        create: function() {
            n.extend(this, {
                observer: {
                    init: _.init.bind(this),
                    attach: _.attach.bind(this),
                    destroy: _.destroy.bind(this),
                    observers: []
                }
            })
        },
        on: {
            init: function() {
                this.observer.init()
            },
            destroy: function() {
                this.observer.destroy()
            }
        }
    }
      , Q = {
        update: function(e) {
            var t = this
              , i = t.params
              , s = i.slidesPerView
              , a = i.slidesPerGroup
              , r = i.centeredSlides
              , o = t.params.virtual
              , l = o.addSlidesBefore
              , d = o.addSlidesAfter
              , h = t.virtual
              , p = h.from
              , c = h.to
              , u = h.slides
              , v = h.slidesGrid
              , f = h.renderSlide
              , m = h.offset;
            t.updateActiveIndex();
            var g, b, w, y = t.activeIndex || 0;
            g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top",
            r ? (b = Math.floor(s / 2) + a + l,
            w = Math.floor(s / 2) + a + d) : (b = s + (a - 1) + l,
            w = a + d);
            var x = Math.max((y || 0) - w, 0)
              , T = Math.min((y || 0) + b, u.length - 1)
              , E = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);
            function S() {
                t.updateSlides(),
                t.updateProgress(),
                t.updateSlidesClasses(),
                t.lazy && t.params.lazy.enabled && t.lazy.load()
            }
            if (n.extend(t.virtual, {
                from: x,
                to: T,
                offset: E,
                slidesGrid: t.slidesGrid
            }),
            p === x && c === T && !e)
                return t.slidesGrid !== v && E !== m && t.slides.css(g, E + "px"),
                void t.updateProgress();
            if (t.params.virtual.renderExternal)
                return t.params.virtual.renderExternal.call(t, {
                    offset: E,
                    from: x,
                    to: T,
                    slides: function() {
                        for (var e = [], t = x; t <= T; t += 1)
                            e.push(u[t]);
                        return e
                    }()
                }),
                void S();
            var C = []
              , M = [];
            if (e)
                t.$wrapperEl.find("." + t.params.slideClass).remove();
            else
                for (var P = p; P <= c; P += 1)
                    (P < x || P > T) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove();
            for (var z = 0; z < u.length; z += 1)
                z >= x && z <= T && (void 0 === c || e ? M.push(z) : (z > c && M.push(z),
                z < p && C.push(z)));
            M.forEach((function(e) {
                t.$wrapperEl.append(f(u[e], e))
            }
            )),
            C.sort((function(e, t) {
                return t - e
            }
            )).forEach((function(e) {
                t.$wrapperEl.prepend(f(u[e], e))
            }
            )),
            t.$wrapperEl.children(".swiper-slide").css(g, E + "px"),
            S()
        },
        renderSlide: function(e, t) {
            var i = this.params.virtual;
            if (i.cache && this.virtual.cache[t])
                return this.virtual.cache[t];
            var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
            return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t),
            i.cache && (this.virtual.cache[t] = a),
            a
        },
        appendSlide: function(e) {
            if ("object" == typeof e && "length"in e)
                for (var t = 0; t < e.length; t += 1)
                    e[t] && this.virtual.slides.push(e[t]);
            else
                this.virtual.slides.push(e);
            this.virtual.update(!0)
        },
        prependSlide: function(e) {
            var t = this.activeIndex
              , i = t + 1
              , s = 1;
            if (Array.isArray(e)) {
                for (var a = 0; a < e.length; a += 1)
                    e[a] && this.virtual.slides.unshift(e[a]);
                i = t + e.length,
                s = e.length
            } else
                this.virtual.slides.unshift(e);
            if (this.params.virtual.cache) {
                var r = this.virtual.cache
                  , n = {};
                Object.keys(r).forEach((function(e) {
                    var t = r[e]
                      , i = t.attr("data-swiper-slide-index");
                    i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1),
                    n[parseInt(e, 10) + s] = t
                }
                )),
                this.virtual.cache = n
            }
            this.virtual.update(!0),
            this.slideTo(i, 0)
        },
        removeSlide: function(e) {
            if (null != e) {
                var t = this.activeIndex;
                if (Array.isArray(e))
                    for (var i = e.length - 1; i >= 0; i -= 1)
                        this.virtual.slides.splice(e[i], 1),
                        this.params.virtual.cache && delete this.virtual.cache[e[i]],
                        e[i] < t && (t -= 1),
                        t = Math.max(t, 0);
                else
                    this.virtual.slides.splice(e, 1),
                    this.params.virtual.cache && delete this.virtual.cache[e],
                    e < t && (t -= 1),
                    t = Math.max(t, 0);
                this.virtual.update(!0),
                this.slideTo(t, 0)
            }
        },
        removeAllSlides: function() {
            this.virtual.slides = [],
            this.params.virtual.cache && (this.virtual.cache = {}),
            this.virtual.update(!0),
            this.slideTo(0, 0)
        }
    }
      , J = {
        name: "virtual",
        params: {
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        },
        create: function() {
            n.extend(this, {
                virtual: {
                    update: Q.update.bind(this),
                    appendSlide: Q.appendSlide.bind(this),
                    prependSlide: Q.prependSlide.bind(this),
                    removeSlide: Q.removeSlide.bind(this),
                    removeAllSlides: Q.removeAllSlides.bind(this),
                    renderSlide: Q.renderSlide.bind(this),
                    slides: this.params.virtual.slides,
                    cache: {}
                }
            })
        },
        on: {
            beforeInit: function() {
                if (this.params.virtual.enabled) {
                    this.classNames.push(this.params.containerModifierClass + "virtual");
                    var e = {
                        watchSlidesProgress: !0
                    };
                    n.extend(this.params, e),
                    n.extend(this.originalParams, e),
                    this.params.initialSlide || this.virtual.update()
                }
            },
            setTranslate: function() {
                this.params.virtual.enabled && this.virtual.update()
            }
        }
    }
      , ee = {
        handle: function(i) {
            var s = this.rtlTranslate
              , a = i;
            a.originalEvent && (a = a.originalEvent);
            var r = a.keyCode || a.charCode;
            if (!this.allowSlideNext && (this.isHorizontal() && 39 === r || this.isVertical() && 40 === r || 34 === r))
                return !1;
            if (!this.allowSlidePrev && (this.isHorizontal() && 37 === r || this.isVertical() && 38 === r || 33 === r))
                return !1;
            if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
                if (this.params.keyboard.onlyInViewport && (33 === r || 34 === r || 37 === r || 39 === r || 38 === r || 40 === r)) {
                    var n = !1;
                    if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length)
                        return;
                    var o = t.innerWidth
                      , l = t.innerHeight
                      , d = this.$el.offset();
                    s && (d.left -= this.$el[0].scrollLeft);
                    for (var h = [[d.left, d.top], [d.left + this.width, d.top], [d.left, d.top + this.height], [d.left + this.width, d.top + this.height]], p = 0; p < h.length; p += 1) {
                        var c = h[p];
                        c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0)
                    }
                    if (!n)
                        return
                }
                this.isHorizontal() ? (33 !== r && 34 !== r && 37 !== r && 39 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1),
                (34 !== r && 39 !== r || s) && (33 !== r && 37 !== r || !s) || this.slideNext(),
                (33 !== r && 37 !== r || s) && (34 !== r && 39 !== r || !s) || this.slidePrev()) : (33 !== r && 34 !== r && 38 !== r && 40 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1),
                34 !== r && 40 !== r || this.slideNext(),
                33 !== r && 38 !== r || this.slidePrev()),
                this.emit("keyPress", r)
            }
        },
        enable: function() {
            this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle),
            this.keyboard.enabled = !0)
        },
        disable: function() {
            this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle),
            this.keyboard.enabled = !1)
        }
    }
      , te = {
        name: "keyboard",
        params: {
            keyboard: {
                enabled: !1,
                onlyInViewport: !0
            }
        },
        create: function() {
            n.extend(this, {
                keyboard: {
                    enabled: !1,
                    enable: ee.enable.bind(this),
                    disable: ee.disable.bind(this),
                    handle: ee.handle.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.keyboard.enabled && this.keyboard.enable()
            },
            destroy: function() {
                this.keyboard.enabled && this.keyboard.disable()
            }
        }
    };
    var ie = {
        lastScrollTime: n.now(),
        lastEventBeforeSnap: void 0,
        recentWheelEvents: [],
        event: function() {
            return t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var t = "onwheel"in e;
                if (!t) {
                    var i = e.createElement("div");
                    i.setAttribute("onwheel", "return;"),
                    t = "function" == typeof i.onwheel
                }
                return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")),
                t
            }() ? "wheel" : "mousewheel"
        },
        normalize: function(e) {
            var t = 0
              , i = 0
              , s = 0
              , a = 0;
            return "detail"in e && (i = e.detail),
            "wheelDelta"in e && (i = -e.wheelDelta / 120),
            "wheelDeltaY"in e && (i = -e.wheelDeltaY / 120),
            "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
            "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = i,
            i = 0),
            s = 10 * t,
            a = 10 * i,
            "deltaY"in e && (a = e.deltaY),
            "deltaX"in e && (s = e.deltaX),
            e.shiftKey && !s && (s = a,
            a = 0),
            (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40,
            a *= 40) : (s *= 800,
            a *= 800)),
            s && !t && (t = s < 1 ? -1 : 1),
            a && !i && (i = a < 1 ? -1 : 1),
            {
                spinX: t,
                spinY: i,
                pixelX: s,
                pixelY: a
            }
        },
        handleMouseEnter: function() {
            this.mouseEntered = !0
        },
        handleMouseLeave: function() {
            this.mouseEntered = !1
        },
        handle: function(e) {
            var t = e
              , i = this
              , a = i.params.mousewheel;
            i.params.cssMode && t.preventDefault();
            var r = i.$el;
            if ("container" !== i.params.mousewheel.eventsTarged && (r = s(i.params.mousewheel.eventsTarged)),
            !i.mouseEntered && !r[0].contains(t.target) && !a.releaseOnEdges)
                return !0;
            t.originalEvent && (t = t.originalEvent);
            var o = 0
              , l = i.rtlTranslate ? -1 : 1
              , d = ie.normalize(t);
            if (a.forceToAxis)
                if (i.isHorizontal()) {
                    if (!(Math.abs(d.pixelX) > Math.abs(d.pixelY)))
                        return !0;
                    o = d.pixelX * l
                } else {
                    if (!(Math.abs(d.pixelY) > Math.abs(d.pixelX)))
                        return !0;
                    o = d.pixelY
                }
            else
                o = Math.abs(d.pixelX) > Math.abs(d.pixelY) ? -d.pixelX * l : -d.pixelY;
            if (0 === o)
                return !0;
            if (a.invert && (o = -o),
            i.params.freeMode) {
                var h = {
                    time: n.now(),
                    delta: Math.abs(o),
                    direction: Math.sign(o)
                }
                  , p = i.mousewheel.lastEventBeforeSnap
                  , c = p && h.time < p.time + 500 && h.delta <= p.delta && h.direction === p.direction;
                if (!c) {
                    i.mousewheel.lastEventBeforeSnap = void 0,
                    i.params.loop && i.loopFix();
                    var u = i.getTranslate() + o * a.sensitivity
                      , v = i.isBeginning
                      , f = i.isEnd;
                    if (u >= i.minTranslate() && (u = i.minTranslate()),
                    u <= i.maxTranslate() && (u = i.maxTranslate()),
                    i.setTransition(0),
                    i.setTranslate(u),
                    i.updateProgress(),
                    i.updateActiveIndex(),
                    i.updateSlidesClasses(),
                    (!v && i.isBeginning || !f && i.isEnd) && i.updateSlidesClasses(),
                    i.params.freeModeSticky) {
                        clearTimeout(i.mousewheel.timeout),
                        i.mousewheel.timeout = void 0;
                        var m = i.mousewheel.recentWheelEvents;
                        m.length >= 15 && m.shift();
                        var g = m.length ? m[m.length - 1] : void 0
                          , b = m[0];
                        if (m.push(h),
                        g && (h.delta > g.delta || h.direction !== g.direction))
                            m.splice(0);
                        else if (m.length >= 15 && h.time - b.time < 500 && b.delta - h.delta >= 1 && h.delta <= 6) {
                            var w = o > 0 ? .8 : .2;
                            i.mousewheel.lastEventBeforeSnap = h,
                            m.splice(0),
                            i.mousewheel.timeout = n.nextTick((function() {
                                i.slideToClosest(i.params.speed, !0, void 0, w)
                            }
                            ), 0)
                        }
                        i.mousewheel.timeout || (i.mousewheel.timeout = n.nextTick((function() {
                            i.mousewheel.lastEventBeforeSnap = h,
                            m.splice(0),
                            i.slideToClosest(i.params.speed, !0, void 0, .5)
                        }
                        ), 500))
                    }
                    if (c || i.emit("scroll", t),
                    i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(),
                    u === i.minTranslate() || u === i.maxTranslate())
                        return !0
                }
            } else {
                var y = {
                    time: n.now(),
                    delta: Math.abs(o),
                    direction: Math.sign(o),
                    raw: e
                }
                  , x = i.mousewheel.recentWheelEvents;
                x.length >= 2 && x.shift();
                var T = x.length ? x[x.length - 1] : void 0;
                if (x.push(y),
                T ? (y.direction !== T.direction || y.delta > T.delta) && i.mousewheel.animateSlider(y) : i.mousewheel.animateSlider(y),
                i.mousewheel.releaseScroll(y))
                    return !0
            }
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
            !1
        },
        animateSlider: function(e) {
            return e.delta >= 6 && n.now() - this.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? this.isEnd && !this.params.loop || this.animating || (this.slideNext(),
            this.emit("scroll", e.raw)) : this.isBeginning && !this.params.loop || this.animating || (this.slidePrev(),
            this.emit("scroll", e.raw)),
            this.mousewheel.lastScrollTime = (new t.Date).getTime(),
            !1)
        },
        releaseScroll: function(e) {
            var t = this.params.mousewheel;
            if (e.direction < 0) {
                if (this.isEnd && !this.params.loop && t.releaseOnEdges)
                    return !0
            } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges)
                return !0;
            return !1
        },
        enable: function() {
            var e = ie.event();
            if (this.params.cssMode)
                return this.wrapperEl.removeEventListener(e, this.mousewheel.handle),
                !0;
            if (!e)
                return !1;
            if (this.mousewheel.enabled)
                return !1;
            var t = this.$el;
            return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)),
            t.on("mouseenter", this.mousewheel.handleMouseEnter),
            t.on("mouseleave", this.mousewheel.handleMouseLeave),
            t.on(e, this.mousewheel.handle),
            this.mousewheel.enabled = !0,
            !0
        },
        disable: function() {
            var e = ie.event();
            if (this.params.cssMode)
                return this.wrapperEl.addEventListener(e, this.mousewheel.handle),
                !0;
            if (!e)
                return !1;
            if (!this.mousewheel.enabled)
                return !1;
            var t = this.$el;
            return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)),
            t.off(e, this.mousewheel.handle),
            this.mousewheel.enabled = !1,
            !0
        }
    }
      , se = {
        update: function() {
            var e = this.params.navigation;
            if (!this.params.loop) {
                var t = this.navigation
                  , i = t.$nextEl
                  , s = t.$prevEl;
                s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass),
                s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)),
                i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass),
                i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
            }
        },
        onPrevClick: function(e) {
            e.preventDefault(),
            this.isBeginning && !this.params.loop || this.slidePrev()
        },
        onNextClick: function(e) {
            e.preventDefault(),
            this.isEnd && !this.params.loop || this.slideNext()
        },
        init: function() {
            var e, t, i = this.params.navigation;
            (i.nextEl || i.prevEl) && (i.nextEl && (e = s(i.nextEl),
            this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))),
            i.prevEl && (t = s(i.prevEl),
            this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))),
            e && e.length > 0 && e.on("click", this.navigation.onNextClick),
            t && t.length > 0 && t.on("click", this.navigation.onPrevClick),
            n.extend(this.navigation, {
                $nextEl: e,
                nextEl: e && e[0],
                $prevEl: t,
                prevEl: t && t[0]
            }))
        },
        destroy: function() {
            var e = this.navigation
              , t = e.$nextEl
              , i = e.$prevEl;
            t && t.length && (t.off("click", this.navigation.onNextClick),
            t.removeClass(this.params.navigation.disabledClass)),
            i && i.length && (i.off("click", this.navigation.onPrevClick),
            i.removeClass(this.params.navigation.disabledClass))
        }
    }
      , ae = {
        update: function() {
            var e = this.rtl
              , t = this.params.pagination;
            if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var i, a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length, r = this.pagination.$el, n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides),
                i > n - 1 && (i -= n),
                i < 0 && "bullets" !== this.params.paginationType && (i = n + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0,
                "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
                    var o, l, d, h = this.pagination.bullets;
                    if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0),
                    r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"),
                    t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex,
                    this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)),
                    o = i - this.pagination.dynamicBulletIndex,
                    d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2),
                    h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"),
                    r.length > 1)
                        h.each((function(e, a) {
                            var r = s(a)
                              , n = r.index();
                            n === i && r.addClass(t.bulletActiveClass),
                            t.dynamicBullets && (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"),
                            n === o && r.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"),
                            n === l && r.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
                        }
                        ));
                    else {
                        var p = h.eq(i)
                          , c = p.index();
                        if (p.addClass(t.bulletActiveClass),
                        t.dynamicBullets) {
                            for (var u = h.eq(o), v = h.eq(l), f = o; f <= l; f += 1)
                                h.eq(f).addClass(t.bulletActiveClass + "-main");
                            if (this.params.loop)
                                if (c >= h.length - t.dynamicMainBullets) {
                                    for (var m = t.dynamicMainBullets; m >= 0; m -= 1)
                                        h.eq(h.length - m).addClass(t.bulletActiveClass + "-main");
                                    h.eq(h.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev")
                                } else
                                    u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"),
                                    v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next");
                            else
                                u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"),
                                v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
                        }
                    }
                    if (t.dynamicBullets) {
                        var g = Math.min(h.length, t.dynamicMainBullets + 4)
                          , b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize
                          , w = e ? "right" : "left";
                        h.css(this.isHorizontal() ? w : "top", b + "px")
                    }
                }
                if ("fraction" === t.type && (r.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)),
                r.find("." + t.totalClass).text(t.formatFractionTotal(n))),
                "progressbar" === t.type) {
                    var y;
                    y = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
                    var x = (i + 1) / n
                      , T = 1
                      , E = 1;
                    "horizontal" === y ? T = x : E = x,
                    r.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + E + ")").transition(this.params.speed)
                }
                "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)),
                this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]),
                r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
            }
        },
        render: function() {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length
                  , i = this.pagination.$el
                  , s = "";
                if ("bullets" === e.type) {
                    for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1)
                        e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
                    i.html(s),
                    this.pagination.bullets = i.find("." + e.bulletClass)
                }
                "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>',
                i.html(s)),
                "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>',
                i.html(s)),
                "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
            }
        },
        init: function() {
            var e = this
              , t = e.params.pagination;
            if (t.el) {
                var i = s(t.el);
                0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)),
                "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
                i.addClass(t.modifierClass + t.type),
                "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"),
                e.pagination.dynamicBulletIndex = 0,
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass),
                t.clickable && i.on("click", "." + t.bulletClass, (function(t) {
                    t.preventDefault();
                    var i = s(this).index() * e.params.slidesPerGroup;
                    e.params.loop && (i += e.loopedSlides),
                    e.slideTo(i)
                }
                )),
                n.extend(e.pagination, {
                    $el: i,
                    el: i[0]
                }))
            }
        },
        destroy: function() {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.pagination.$el;
                t.removeClass(e.hiddenClass),
                t.removeClass(e.modifierClass + e.type),
                this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass),
                e.clickable && t.off("click", "." + e.bulletClass)
            }
        }
    }
      , re = {
        setTranslate: function() {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar
                  , t = this.rtlTranslate
                  , i = this.progress
                  , s = e.dragSize
                  , a = e.trackSize
                  , r = e.$dragEl
                  , n = e.$el
                  , o = this.params.scrollbar
                  , l = s
                  , d = (a - s) * i;
                t ? (d = -d) > 0 ? (l = s - d,
                d = 0) : -d + s > a && (l = a + d) : d < 0 ? (l = s + d,
                d = 0) : d + s > a && (l = a - d),
                this.isHorizontal() ? (r.transform("translate3d(" + d + "px, 0, 0)"),
                r[0].style.width = l + "px") : (r.transform("translate3d(0px, " + d + "px, 0)"),
                r[0].style.height = l + "px"),
                o.hide && (clearTimeout(this.scrollbar.timeout),
                n[0].style.opacity = 1,
                this.scrollbar.timeout = setTimeout((function() {
                    n[0].style.opacity = 0,
                    n.transition(400)
                }
                ), 1e3))
            }
        },
        setTransition: function(e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
        },
        updateSize: function() {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar
                  , t = e.$dragEl
                  , i = e.$el;
                t[0].style.width = "",
                t[0].style.height = "";
                var s, a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, r = this.size / this.virtualSize, o = r * (a / this.size);
                s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10),
                this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px",
                i[0].style.display = r >= 1 ? "none" : "",
                this.params.scrollbar.hide && (i[0].style.opacity = 0),
                n.extend(e, {
                    trackSize: a,
                    divider: r,
                    moveDivider: o,
                    dragSize: s
                }),
                e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
            }
        },
        getPointerPosition: function(e) {
            return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
        },
        setDragPosition: function(e) {
            var t, i = this.scrollbar, s = this.rtlTranslate, a = i.$el, r = i.dragSize, n = i.trackSize, o = i.dragStartPos;
            t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (n - r),
            t = Math.max(Math.min(t, 1), 0),
            s && (t = 1 - t);
            var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
            this.updateProgress(l),
            this.setTranslate(l),
            this.updateActiveIndex(),
            this.updateSlidesClasses()
        },
        onDragStart: function(e) {
            var t = this.params.scrollbar
              , i = this.scrollbar
              , s = this.$wrapperEl
              , a = i.$el
              , r = i.$dragEl;
            this.scrollbar.isTouched = !0,
            this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null,
            e.preventDefault(),
            e.stopPropagation(),
            s.transition(100),
            r.transition(100),
            i.setDragPosition(e),
            clearTimeout(this.scrollbar.dragTimeout),
            a.transition(0),
            t.hide && a.css("opacity", 1),
            this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"),
            this.emit("scrollbarDragStart", e)
        },
        onDragMove: function(e) {
            var t = this.scrollbar
              , i = this.$wrapperEl
              , s = t.$el
              , a = t.$dragEl;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            t.setDragPosition(e),
            i.transition(0),
            s.transition(0),
            a.transition(0),
            this.emit("scrollbarDragMove", e))
        },
        onDragEnd: function(e) {
            var t = this.params.scrollbar
              , i = this.scrollbar
              , s = this.$wrapperEl
              , a = i.$el;
            this.scrollbar.isTouched && (this.scrollbar.isTouched = !1,
            this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""),
            s.transition("")),
            t.hide && (clearTimeout(this.scrollbar.dragTimeout),
            this.scrollbar.dragTimeout = n.nextTick((function() {
                a.css("opacity", 0),
                a.transition(400)
            }
            ), 1e3)),
            this.emit("scrollbarDragEnd", e),
            t.snapOnRelease && this.slideToClosest())
        },
        enableDraggable: function() {
            if (this.params.scrollbar.el) {
                var t = this.scrollbar
                  , i = this.touchEventsTouch
                  , s = this.touchEventsDesktop
                  , a = this.params
                  , r = t.$el[0]
                  , n = !(!o.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , l = !(!o.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                o.touch ? (r.addEventListener(i.start, this.scrollbar.onDragStart, n),
                r.addEventListener(i.move, this.scrollbar.onDragMove, n),
                r.addEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n),
                e.addEventListener(s.move, this.scrollbar.onDragMove, n),
                e.addEventListener(s.end, this.scrollbar.onDragEnd, l))
            }
        },
        disableDraggable: function() {
            if (this.params.scrollbar.el) {
                var t = this.scrollbar
                  , i = this.touchEventsTouch
                  , s = this.touchEventsDesktop
                  , a = this.params
                  , r = t.$el[0]
                  , n = !(!o.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , l = !(!o.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                o.touch ? (r.removeEventListener(i.start, this.scrollbar.onDragStart, n),
                r.removeEventListener(i.move, this.scrollbar.onDragMove, n),
                r.removeEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n),
                e.removeEventListener(s.move, this.scrollbar.onDragMove, n),
                e.removeEventListener(s.end, this.scrollbar.onDragEnd, l))
            }
        },
        init: function() {
            if (this.params.scrollbar.el) {
                var e = this.scrollbar
                  , t = this.$el
                  , i = this.params.scrollbar
                  , a = s(i.el);
                this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
                var r = a.find("." + this.params.scrollbar.dragClass);
                0 === r.length && (r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>'),
                a.append(r)),
                n.extend(e, {
                    $el: a,
                    el: a[0],
                    $dragEl: r,
                    dragEl: r[0]
                }),
                i.draggable && e.enableDraggable()
            }
        },
        destroy: function() {
            this.scrollbar.disableDraggable()
        }
    }
      , ne = {
        setTransform: function(e, t) {
            var i = this.rtl
              , a = s(e)
              , r = i ? -1 : 1
              , n = a.attr("data-swiper-parallax") || "0"
              , o = a.attr("data-swiper-parallax-x")
              , l = a.attr("data-swiper-parallax-y")
              , d = a.attr("data-swiper-parallax-scale")
              , h = a.attr("data-swiper-parallax-opacity");
            if (o || l ? (o = o || "0",
            l = l || "0") : this.isHorizontal() ? (o = n,
            l = "0") : (l = n,
            o = "0"),
            o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px",
            l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px",
            null != h) {
                var p = h - (h - 1) * (1 - Math.abs(t));
                a[0].style.opacity = p
            }
            if (null == d)
                a.transform("translate3d(" + o + ", " + l + ", 0px)");
            else {
                var c = d - (d - 1) * (1 - Math.abs(t));
                a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")")
            }
        },
        setTranslate: function() {
            var e = this
              , t = e.$el
              , i = e.slides
              , a = e.progress
              , r = e.snapGrid;
            t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t, i) {
                e.parallax.setTransform(i, a)
            }
            )),
            i.each((function(t, i) {
                var n = i.progress;
                e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)),
                n = Math.min(Math.max(n, -1), 1),
                s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t, i) {
                    e.parallax.setTransform(i, n)
                }
                ))
            }
            ))
        },
        setTransition: function(e) {
            void 0 === e && (e = this.params.speed);
            this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t, i) {
                var a = s(i)
                  , r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                0 === e && (r = 0),
                a.transition(r)
            }
            ))
        }
    }
      , oe = {
        getDistanceBetweenTouches: function(e) {
            if (e.targetTouches.length < 2)
                return 1;
            var t = e.targetTouches[0].pageX
              , i = e.targetTouches[0].pageY
              , s = e.targetTouches[1].pageX
              , a = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2))
        },
        onGestureStart: function(e) {
            var t = this.params.zoom
              , i = this.zoom
              , a = i.gesture;
            if (i.fakeGestureTouched = !1,
            i.fakeGestureMoved = !1,
            !o.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                    return;
                i.fakeGestureTouched = !0,
                a.scaleStart = oe.getDistanceBetweenTouches(e)
            }
            a.$slideEl && a.$slideEl.length || (a.$slideEl = s(e.target).closest("." + this.params.slideClass),
            0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)),
            a.$imageEl = a.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),
            a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass),
            a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio,
            0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0),
            this.zoom.isScaling = !0) : a.$imageEl = void 0
        },
        onGestureChange: function(e) {
            var t = this.params.zoom
              , i = this.zoom
              , s = i.gesture;
            if (!o.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                    return;
                i.fakeGestureMoved = !0,
                s.scaleMove = oe.getDistanceBetweenTouches(e)
            }
            s.$imageEl && 0 !== s.$imageEl.length && (o.gestures ? i.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale,
            i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)),
            i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)),
            s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
        },
        onGestureEnd: function(e) {
            var t = this.params.zoom
              , i = this.zoom
              , s = i.gesture;
            if (!o.gestures) {
                if (!i.fakeGestureTouched || !i.fakeGestureMoved)
                    return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !I.android)
                    return;
                i.fakeGestureTouched = !1,
                i.fakeGestureMoved = !1
            }
            s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio),
            s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"),
            i.currentScale = i.scale,
            i.isScaling = !1,
            1 === i.scale && (s.$slideEl = void 0))
        },
        onTouchStart: function(e) {
            var t = this.zoom
              , i = t.gesture
              , s = t.image;
            i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (I.android && e.preventDefault(),
            s.isTouched = !0,
            s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
            s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        },
        onTouchMove: function(e) {
            var t = this.zoom
              , i = t.gesture
              , s = t.image
              , a = t.velocity;
            if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1,
            s.isTouched && i.$slideEl)) {
                s.isMoved || (s.width = i.$imageEl[0].offsetWidth,
                s.height = i.$imageEl[0].offsetHeight,
                s.startX = n.getTranslate(i.$imageWrapEl[0], "x") || 0,
                s.startY = n.getTranslate(i.$imageWrapEl[0], "y") || 0,
                i.slideWidth = i.$slideEl[0].offsetWidth,
                i.slideHeight = i.$slideEl[0].offsetHeight,
                i.$imageWrapEl.transition(0),
                this.rtl && (s.startX = -s.startX,
                s.startY = -s.startY));
                var r = s.width * t.scale
                  , o = s.height * t.scale;
                if (!(r < i.slideWidth && o < i.slideHeight)) {
                    if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0),
                    s.maxX = -s.minX,
                    s.minY = Math.min(i.slideHeight / 2 - o / 2, 0),
                    s.maxY = -s.minY,
                    s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                    s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                    !s.isMoved && !t.isScaling) {
                        if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x))
                            return void (s.isTouched = !1);
                        if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y))
                            return void (s.isTouched = !1)
                    }
                    e.preventDefault(),
                    e.stopPropagation(),
                    s.isMoved = !0,
                    s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX,
                    s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY,
                    s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)),
                    s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)),
                    s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)),
                    s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)),
                    a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x),
                    a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y),
                    a.prevTime || (a.prevTime = Date.now()),
                    a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2,
                    a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2,
                    Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0),
                    Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0),
                    a.prevPositionX = s.touchesCurrent.x,
                    a.prevPositionY = s.touchesCurrent.y,
                    a.prevTime = Date.now(),
                    i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                }
            }
        },
        onTouchEnd: function() {
            var e = this.zoom
              , t = e.gesture
              , i = e.image
              , s = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!i.isTouched || !i.isMoved)
                    return i.isTouched = !1,
                    void (i.isMoved = !1);
                i.isTouched = !1,
                i.isMoved = !1;
                var a = 300
                  , r = 300
                  , n = s.x * a
                  , o = i.currentX + n
                  , l = s.y * r
                  , d = i.currentY + l;
                0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)),
                0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
                var h = Math.max(a, r);
                i.currentX = o,
                i.currentY = d;
                var p = i.width * e.scale
                  , c = i.height * e.scale;
                i.minX = Math.min(t.slideWidth / 2 - p / 2, 0),
                i.maxX = -i.minX,
                i.minY = Math.min(t.slideHeight / 2 - c / 2, 0),
                i.maxY = -i.minY,
                i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX),
                i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY),
                t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
            }
        },
        onTransitionEnd: function() {
            var e = this.zoom
              , t = e.gesture;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            t.$imageWrapEl.transform("translate3d(0,0,0)"),
            e.scale = 1,
            e.currentScale = 1,
            t.$slideEl = void 0,
            t.$imageEl = void 0,
            t.$imageWrapEl = void 0)
        },
        toggle: function(e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        },
        in: function(e) {
            var t, i, s, a, r, n, o, l, d, h, p, c, u, v, f, m, g = this.zoom, b = this.params.zoom, w = g.gesture, y = g.image;
            (w.$slideEl || (w.$slideEl = this.slides.eq(this.activeIndex),
            w.$imageEl = w.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),
            w.$imageWrapEl = w.$imageEl.parent("." + b.containerClass)),
            w.$imageEl && 0 !== w.$imageEl.length) && (w.$slideEl.addClass("" + b.zoomedSlideClass),
            void 0 === y.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX,
            i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = y.touchesStart.x,
            i = y.touchesStart.y),
            g.scale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio,
            g.currentScale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio,
            e ? (f = w.$slideEl[0].offsetWidth,
            m = w.$slideEl[0].offsetHeight,
            s = w.$slideEl.offset().left + f / 2 - t,
            a = w.$slideEl.offset().top + m / 2 - i,
            o = w.$imageEl[0].offsetWidth,
            l = w.$imageEl[0].offsetHeight,
            d = o * g.scale,
            h = l * g.scale,
            u = -(p = Math.min(f / 2 - d / 2, 0)),
            v = -(c = Math.min(m / 2 - h / 2, 0)),
            (r = s * g.scale) < p && (r = p),
            r > u && (r = u),
            (n = a * g.scale) < c && (n = c),
            n > v && (n = v)) : (r = 0,
            n = 0),
            w.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"),
            w.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + g.scale + ")"))
        },
        out: function() {
            var e = this.zoom
              , t = this.params.zoom
              , i = e.gesture;
            i.$slideEl || (i.$slideEl = this.slides.eq(this.activeIndex),
            i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),
            i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)),
            i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1,
            e.currentScale = 1,
            i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            i.$slideEl.removeClass("" + t.zoomedSlideClass),
            i.$slideEl = void 0)
        },
        enable: function() {
            var e = this.zoom;
            if (!e.enabled) {
                e.enabled = !0;
                var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }
                  , i = !o.passiveListener || {
                    passive: !1,
                    capture: !0
                }
                  , s = "." + this.params.slideClass;
                o.gestures ? (this.$wrapperEl.on("gesturestart", s, e.onGestureStart, t),
                this.$wrapperEl.on("gesturechange", s, e.onGestureChange, t),
                this.$wrapperEl.on("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, s, e.onGestureStart, t),
                this.$wrapperEl.on(this.touchEvents.move, s, e.onGestureChange, i),
                this.$wrapperEl.on(this.touchEvents.end, s, e.onGestureEnd, t),
                this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, s, e.onGestureEnd, t)),
                this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
            }
        },
        disable: function() {
            var e = this.zoom;
            if (e.enabled) {
                this.zoom.enabled = !1;
                var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }
                  , i = !o.passiveListener || {
                    passive: !1,
                    capture: !0
                }
                  , s = "." + this.params.slideClass;
                o.gestures ? (this.$wrapperEl.off("gesturestart", s, e.onGestureStart, t),
                this.$wrapperEl.off("gesturechange", s, e.onGestureChange, t),
                this.$wrapperEl.off("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, s, e.onGestureStart, t),
                this.$wrapperEl.off(this.touchEvents.move, s, e.onGestureChange, i),
                this.$wrapperEl.off(this.touchEvents.end, s, e.onGestureEnd, t),
                this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, s, e.onGestureEnd, t)),
                this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
            }
        }
    }
      , le = {
        loadInSlide: function(e, t) {
            void 0 === t && (t = !0);
            var i = this
              , a = i.params.lazy;
            if (void 0 !== e && 0 !== i.slides.length) {
                var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e)
                  , n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
                !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])),
                0 !== n.length && n.each((function(e, n) {
                    var o = s(n);
                    o.addClass(a.loadingClass);
                    var l = o.attr("data-background")
                      , d = o.attr("data-src")
                      , h = o.attr("data-srcset")
                      , p = o.attr("data-sizes");
                    i.loadImage(o[0], d || l, h, p, !1, (function() {
                        if (null != i && i && (!i || i.params) && !i.destroyed) {
                            if (l ? (o.css("background-image", 'url("' + l + '")'),
                            o.removeAttr("data-background")) : (h && (o.attr("srcset", h),
                            o.removeAttr("data-srcset")),
                            p && (o.attr("sizes", p),
                            o.removeAttr("data-sizes")),
                            d && (o.attr("src", d),
                            o.removeAttr("data-src"))),
                            o.addClass(a.loadedClass).removeClass(a.loadingClass),
                            r.find("." + a.preloaderClass).remove(),
                            i.params.loop && t) {
                                var e = r.attr("data-swiper-slide-index");
                                if (r.hasClass(i.params.slideDuplicateClass)) {
                                    var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                    i.lazy.loadInSlide(s.index(), !1)
                                } else {
                                    var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    i.lazy.loadInSlide(n.index(), !1)
                                }
                            }
                            i.emit("lazyImageReady", r[0], o[0]),
                            i.params.autoHeight && i.updateAutoHeight()
                        }
                    }
                    )),
                    i.emit("lazyImageLoad", r[0], o[0])
                }
                ))
            }
        },
        load: function() {
            var e = this
              , t = e.$wrapperEl
              , i = e.params
              , a = e.slides
              , r = e.activeIndex
              , n = e.virtual && i.virtual.enabled
              , o = i.lazy
              , l = i.slidesPerView;
            function d(e) {
                if (n) {
                    if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length)
                        return !0
                } else if (a[e])
                    return !0;
                return !1
            }
            function h(e) {
                return n ? s(e).attr("data-swiper-slide-index") : s(e).index()
            }
            if ("auto" === l && (l = 0),
            e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
            e.params.watchSlidesVisibility)
                t.children("." + i.slideVisibleClass).each((function(t, i) {
                    var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
                    e.lazy.loadInSlide(a)
                }
                ));
            else if (l > 1)
                for (var p = r; p < r + l; p += 1)
                    d(p) && e.lazy.loadInSlide(p);
            else
                e.lazy.loadInSlide(r);
            if (o.loadPrevNext)
                if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
                    for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1)
                        d(m) && e.lazy.loadInSlide(m);
                    for (var g = f; g < r; g += 1)
                        d(g) && e.lazy.loadInSlide(g)
                } else {
                    var b = t.children("." + i.slideNextClass);
                    b.length > 0 && e.lazy.loadInSlide(h(b));
                    var w = t.children("." + i.slidePrevClass);
                    w.length > 0 && e.lazy.loadInSlide(h(w))
                }
        }
    }
      , de = {
        LinearSpline: function(e, t) {
            var i, s, a, r, n, o = function(e, t) {
                for (s = -1,
                i = e.length; i - s > 1; )
                    e[a = i + s >> 1] <= t ? s = a : i = a;
                return i
            };
            return this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1,
            this.interpolate = function(e) {
                return e ? (n = o(this.x, e),
                r = n - 1,
                (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
            }
            ,
            this
        },
        getInterpolateFunction: function(e) {
            this.controller.spline || (this.controller.spline = this.params.loop ? new de.LinearSpline(this.slidesGrid,e.slidesGrid) : new de.LinearSpline(this.snapGrid,e.snapGrid))
        },
        setTranslate: function(e, t) {
            var i, s, a = this, r = a.controller.control;
            function n(e) {
                var t = a.rtlTranslate ? -a.translate : a.translate;
                "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e),
                s = -a.controller.spline.interpolate(-t)),
                s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()),
                s = (t - a.minTranslate()) * i + e.minTranslate()),
                a.params.controller.inverse && (s = e.maxTranslate() - s),
                e.updateProgress(s),
                e.setTranslate(s, a),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            if (Array.isArray(r))
                for (var o = 0; o < r.length; o += 1)
                    r[o] !== t && r[o]instanceof W && n(r[o]);
            else
                r instanceof W && t !== r && n(r)
        },
        setTransition: function(e, t) {
            var i, s = this, a = s.controller.control;
            function r(t) {
                t.setTransition(e, s),
                0 !== e && (t.transitionStart(),
                t.params.autoHeight && n.nextTick((function() {
                    t.updateAutoHeight()
                }
                )),
                t.$wrapperEl.transitionEnd((function() {
                    a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(),
                    t.transitionEnd())
                }
                )))
            }
            if (Array.isArray(a))
                for (i = 0; i < a.length; i += 1)
                    a[i] !== t && a[i]instanceof W && r(a[i]);
            else
                a instanceof W && t !== a && r(a)
        }
    }
      , he = {
        makeElFocusable: function(e) {
            return e.attr("tabIndex", "0"),
            e
        },
        addElRole: function(e, t) {
            return e.attr("role", t),
            e
        },
        addElLabel: function(e, t) {
            return e.attr("aria-label", t),
            e
        },
        disableEl: function(e) {
            return e.attr("aria-disabled", !0),
            e
        },
        enableEl: function(e) {
            return e.attr("aria-disabled", !1),
            e
        },
        onEnterKey: function(e) {
            var t = this.params.a11y;
            if (13 === e.keyCode) {
                var i = s(e.target);
                this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(),
                this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)),
                this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(),
                this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)),
                this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
            }
        },
        notify: function(e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""),
            t.html(e))
        },
        updateNavigation: function() {
            if (!this.params.loop && this.navigation) {
                var e = this.navigation
                  , t = e.$nextEl
                  , i = e.$prevEl;
                i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)),
                t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t))
            }
        },
        updatePagination: function() {
            var e = this
              , t = e.params.a11y;
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function(i, a) {
                var r = s(a);
                e.a11y.makeElFocusable(r),
                e.a11y.addElRole(r, "button"),
                e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1))
            }
            ))
        },
        init: function() {
            this.$el.append(this.a11y.liveRegion);
            var e, t, i = this.params.a11y;
            this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl),
            this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl),
            e && (this.a11y.makeElFocusable(e),
            this.a11y.addElRole(e, "button"),
            this.a11y.addElLabel(e, i.nextSlideMessage),
            e.on("keydown", this.a11y.onEnterKey)),
            t && (this.a11y.makeElFocusable(t),
            this.a11y.addElRole(t, "button"),
            this.a11y.addElLabel(t, i.prevSlideMessage),
            t.on("keydown", this.a11y.onEnterKey)),
            this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
        },
        destroy: function() {
            var e, t;
            this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(),
            this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl),
            this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl),
            e && e.off("keydown", this.a11y.onEnterKey),
            t && t.off("keydown", this.a11y.onEnterKey),
            this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
        }
    }
      , pe = {
        init: function() {
            if (this.params.history) {
                if (!t.history || !t.history.pushState)
                    return this.params.history.enabled = !1,
                    void (this.params.hashNavigation.enabled = !0);
                var e = this.history;
                e.initialized = !0,
                e.paths = pe.getPathValues(),
                (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit),
                this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState))
            }
        },
        destroy: function() {
            this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState)
        },
        setHistoryPopState: function() {
            this.history.paths = pe.getPathValues(),
            this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
        },
        getPathValues: function() {
            var e = t.location.pathname.slice(1).split("/").filter((function(e) {
                return "" !== e
            }
            ))
              , i = e.length;
            return {
                key: e[i - 2],
                value: e[i - 1]
            }
        },
        setHistory: function(e, i) {
            if (this.history.initialized && this.params.history.enabled) {
                var s = this.slides.eq(i)
                  , a = pe.slugify(s.attr("data-history"));
                t.location.pathname.includes(e) || (a = e + "/" + a);
                var r = t.history.state;
                r && r.value === a || (this.params.history.replaceState ? t.history.replaceState({
                    value: a
                }, null, a) : t.history.pushState({
                    value: a
                }, null, a))
            }
        },
        slugify: function(e) {
            return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        },
        scrollToSlide: function(e, t, i) {
            if (t)
                for (var s = 0, a = this.slides.length; s < a; s += 1) {
                    var r = this.slides.eq(s);
                    if (pe.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
                        var n = r.index();
                        this.slideTo(n, e, i)
                    }
                }
            else
                this.slideTo(0, e, i)
        }
    }
      , ce = {
        onHashCange: function() {
            var t = e.location.hash.replace("#", "");
            if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
                if (void 0 === i)
                    return;
                this.slideTo(i)
            }
        },
        setHash: function() {
            if (this.hashNavigation.initialized && this.params.hashNavigation.enabled)
                if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState)
                    t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || "");
                else {
                    var i = this.slides.eq(this.activeIndex)
                      , s = i.attr("data-hash") || i.attr("data-history");
                    e.location.hash = s || ""
                }
        },
        init: function() {
            if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
                this.hashNavigation.initialized = !0;
                var i = e.location.hash.replace("#", "");
                if (i)
                    for (var a = 0, r = this.slides.length; a < r; a += 1) {
                        var n = this.slides.eq(a);
                        if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
                            var o = n.index();
                            this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
                        }
                    }
                this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange)
            }
        },
        destroy: function() {
            this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange)
        }
    }
      , ue = {
        run: function() {
            var e = this
              , t = e.slides.eq(e.activeIndex)
              , i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            clearTimeout(e.autoplay.timeout),
            e.autoplay.timeout = n.nextTick((function() {
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(),
                e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.params.loop ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0),
                e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay")),
                e.params.cssMode && e.autoplay.running && e.autoplay.run()
            }
            ), i)
        },
        start: function() {
            return void 0 === this.autoplay.timeout && (!this.autoplay.running && (this.autoplay.running = !0,
            this.emit("autoplayStart"),
            this.autoplay.run(),
            !0))
        },
        stop: function() {
            return !!this.autoplay.running && (void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout),
            this.autoplay.timeout = void 0),
            this.autoplay.running = !1,
            this.emit("autoplayStop"),
            !0))
        },
        pause: function(e) {
            this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout),
            this.autoplay.paused = !0,
            0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd),
            this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1,
            this.autoplay.run())))
        }
    }
      , ve = {
        setTranslate: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1) {
                var i = this.slides.eq(t)
                  , s = -i[0].swiperSlideOffset;
                this.params.virtualTranslate || (s -= this.translate);
                var a = 0;
                this.isHorizontal() || (a = s,
                s = 0);
                var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                i.css({
                    opacity: r
                }).transform("translate3d(" + s + "px, " + a + "px, 0px)")
            }
        },
        setTransition: function(e) {
            var t = this
              , i = t.slides
              , s = t.$wrapperEl;
            if (i.transition(e),
            t.params.virtualTranslate && 0 !== e) {
                var a = !1;
                i.transitionEnd((function() {
                    if (!a && t && !t.destroyed) {
                        a = !0,
                        t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1)
                            s.trigger(e[i])
                    }
                }
                ))
            }
        }
    }
      , fe = {
        setTranslate: function() {
            var e, t = this.$el, i = this.$wrapperEl, a = this.slides, r = this.width, n = this.height, o = this.rtlTranslate, l = this.size, d = this.params.cubeEffect, h = this.isHorizontal(), p = this.virtual && this.params.virtual.enabled, c = 0;
            d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'),
            i.append(e)),
            e.css({
                height: r + "px"
            })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'),
            t.append(e)));
            for (var u = 0; u < a.length; u += 1) {
                var v = a.eq(u)
                  , f = u;
                p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                var m = 90 * f
                  , g = Math.floor(m / 360);
                o && (m = -m,
                g = Math.floor(-m / 360));
                var b = Math.max(Math.min(v[0].progress, 1), -1)
                  , w = 0
                  , y = 0
                  , x = 0;
                f % 4 == 0 ? (w = 4 * -g * l,
                x = 0) : (f - 1) % 4 == 0 ? (w = 0,
                x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l,
                x = l) : (f - 3) % 4 == 0 && (w = -l,
                x = 3 * l + 4 * l * g),
                o && (w = -w),
                h || (y = w,
                w = 0);
                var T = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                if (b <= 1 && b > -1 && (c = 90 * f + 90 * b,
                o && (c = 90 * -f - 90 * b)),
                v.transform(T),
                d.slideShadows) {
                    var E = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top")
                      , S = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                    0 === E.length && (E = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'),
                    v.append(E)),
                    0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'),
                    v.append(S)),
                    E.length && (E[0].style.opacity = Math.max(-b, 0)),
                    S.length && (S[0].style.opacity = Math.max(b, 0))
                }
            }
            if (i.css({
                "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                "transform-origin": "50% 50% -" + l / 2 + "px"
            }),
            d.shadow)
                if (h)
                    e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                else {
                    var C = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90)
                      , M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2)
                      , P = d.shadowScale
                      , z = d.shadowScale / M
                      , k = d.shadowOffset;
                    e.transform("scale3d(" + P + ", 1, " + z + ") translate3d(0px, " + (n / 2 + k) + "px, " + -n / 2 / z + "px) rotateX(-90deg)")
                }
            var $ = j.isSafari || j.isUiWebView ? -l / 2 : 0;
            i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)")
        },
        setTransition: function(e) {
            var t = this.$el;
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
        }
    }
      , me = {
        setTranslate: function() {
            for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                var a = e.eq(i)
                  , r = a[0].progress;
                this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
                var n = -180 * r
                  , o = 0
                  , l = -a[0].swiperSlideOffset
                  , d = 0;
                if (this.isHorizontal() ? t && (n = -n) : (d = l,
                l = 0,
                o = -n,
                n = 0),
                a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length,
                this.params.flipEffect.slideShadows) {
                    var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top")
                      , p = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                    0 === h.length && (h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'),
                    a.append(h)),
                    0 === p.length && (p = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'),
                    a.append(p)),
                    h.length && (h[0].style.opacity = Math.max(-r, 0)),
                    p.length && (p[0].style.opacity = Math.max(r, 0))
                }
                a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
            }
        },
        setTransition: function(e) {
            var t = this
              , i = t.slides
              , s = t.activeIndex
              , a = t.$wrapperEl;
            if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            t.params.virtualTranslate && 0 !== e) {
                var r = !1;
                i.eq(s).transitionEnd((function() {
                    if (!r && t && !t.destroyed) {
                        r = !0,
                        t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1)
                            a.trigger(e[i])
                    }
                }
                ))
            }
        }
    }
      , ge = {
        setTranslate: function() {
            for (var e = this.width, t = this.height, i = this.slides, a = this.$wrapperEl, r = this.slidesSizesGrid, n = this.params.coverflowEffect, l = this.isHorizontal(), d = this.translate, h = l ? e / 2 - d : t / 2 - d, p = l ? n.rotate : -n.rotate, c = n.depth, u = 0, v = i.length; u < v; u += 1) {
                var f = i.eq(u)
                  , m = r[u]
                  , g = (h - f[0].swiperSlideOffset - m / 2) / m * n.modifier
                  , b = l ? p * g : 0
                  , w = l ? 0 : p * g
                  , y = -c * Math.abs(g)
                  , x = n.stretch;
                "string" == typeof x && -1 !== x.indexOf("%") && (x = parseFloat(n.stretch) / 100 * m);
                var T = l ? 0 : x * g
                  , E = l ? x * g : 0;
                Math.abs(E) < .001 && (E = 0),
                Math.abs(T) < .001 && (T = 0),
                Math.abs(y) < .001 && (y = 0),
                Math.abs(b) < .001 && (b = 0),
                Math.abs(w) < .001 && (w = 0);
                var S = "translate3d(" + E + "px," + T + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";
                if (f.transform(S),
                f[0].style.zIndex = 1 - Math.abs(Math.round(g)),
                n.slideShadows) {
                    var C = l ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top")
                      , M = l ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                    0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (l ? "left" : "top") + '"></div>'),
                    f.append(C)),
                    0 === M.length && (M = s('<div class="swiper-slide-shadow-' + (l ? "right" : "bottom") + '"></div>'),
                    f.append(M)),
                    C.length && (C[0].style.opacity = g > 0 ? g : 0),
                    M.length && (M[0].style.opacity = -g > 0 ? -g : 0)
                }
            }
            (o.pointerEvents || o.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = h + "px 50%")
        },
        setTransition: function(e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    }
      , be = {
        init: function() {
            var e = this.params.thumbs
              , t = this.constructor;
            e.swiper instanceof t ? (this.thumbs.swiper = e.swiper,
            n.extend(this.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            n.extend(this.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })) : n.isObject(e.swiper) && (this.thumbs.swiper = new t(n.extend({}, e.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })),
            this.thumbs.swiperCreated = !0),
            this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass),
            this.thumbs.swiper.on("tap", this.thumbs.onThumbClick)
        },
        onThumbClick: function() {
            var e = this.thumbs.swiper;
            if (e) {
                var t = e.clickedIndex
                  , i = e.clickedSlide;
                if (!(i && s(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
                    var a;
                    if (a = e.params.loop ? parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t,
                    this.params.loop) {
                        var r = this.activeIndex;
                        this.slides.eq(r).hasClass(this.params.slideDuplicateClass) && (this.loopFix(),
                        this._clientLeft = this.$wrapperEl[0].clientLeft,
                        r = this.activeIndex);
                        var n = this.slides.eq(r).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index()
                          , o = this.slides.eq(r).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index();
                        a = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
                    }
                    this.slideTo(a)
                }
            }
        },
        update: function(e) {
            var t = this.thumbs.swiper;
            if (t) {
                var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView;
                if (this.realIndex !== t.realIndex) {
                    var s, a = t.activeIndex;
                    if (t.params.loop) {
                        t.slides.eq(a).hasClass(t.params.slideDuplicateClass) && (t.loopFix(),
                        t._clientLeft = t.$wrapperEl[0].clientLeft,
                        a = t.activeIndex);
                        var r = t.slides.eq(a).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index()
                          , n = t.slides.eq(a).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
                        s = void 0 === r ? n : void 0 === n ? r : n - a == a - r ? a : n - a < a - r ? n : r
                    } else
                        s = this.realIndex;
                    t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(s) < 0 && (t.params.centeredSlides ? s = s > a ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : s > a && (s = s - i + 1),
                    t.slideTo(s, e ? 0 : void 0))
                }
                var o = 1
                  , l = this.params.thumbs.slideThumbActiveClass;
                if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (o = this.params.slidesPerView),
                this.params.thumbs.multipleActiveThumbs || (o = 1),
                o = Math.floor(o),
                t.slides.removeClass(l),
                t.params.loop || t.params.virtual && t.params.virtual.enabled)
                    for (var d = 0; d < o; d += 1)
                        t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + d) + '"]').addClass(l);
                else
                    for (var h = 0; h < o; h += 1)
                        t.slides.eq(this.realIndex + h).addClass(l)
            }
        }
    }
      , we = [R, q, K, U, Z, J, te, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function() {
            n.extend(this, {
                mousewheel: {
                    enabled: !1,
                    enable: ie.enable.bind(this),
                    disable: ie.disable.bind(this),
                    handle: ie.handle.bind(this),
                    handleMouseEnter: ie.handleMouseEnter.bind(this),
                    handleMouseLeave: ie.handleMouseLeave.bind(this),
                    animateSlider: ie.animateSlider.bind(this),
                    releaseScroll: ie.releaseScroll.bind(this),
                    lastScrollTime: n.now(),
                    lastEventBeforeSnap: void 0,
                    recentWheelEvents: []
                }
            })
        },
        on: {
            init: function() {
                !this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(),
                this.params.mousewheel.enabled && this.mousewheel.enable()
            },
            destroy: function() {
                this.params.cssMode && this.mousewheel.enable(),
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function() {
            n.extend(this, {
                navigation: {
                    init: se.init.bind(this),
                    update: se.update.bind(this),
                    destroy: se.destroy.bind(this),
                    onNextClick: se.onNextClick.bind(this),
                    onPrevClick: se.onPrevClick.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.navigation.init(),
                this.navigation.update()
            },
            toEdge: function() {
                this.navigation.update()
            },
            fromEdge: function() {
                this.navigation.update()
            },
            destroy: function() {
                this.navigation.destroy()
            },
            click: function(e) {
                var t, i = this.navigation, a = i.$nextEl, r = i.$prevEl;
                !this.params.navigation.hideOnClick || s(e.target).is(r) || s(e.target).is(a) || (a ? t = a.hasClass(this.params.navigation.hiddenClass) : r && (t = r.hasClass(this.params.navigation.hiddenClass)),
                !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this),
                a && a.toggleClass(this.params.navigation.hiddenClass),
                r && r.toggleClass(this.params.navigation.hiddenClass))
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function(e) {
                    return e
                },
                formatFractionTotal: function(e) {
                    return e
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function() {
            n.extend(this, {
                pagination: {
                    init: ae.init.bind(this),
                    render: ae.render.bind(this),
                    update: ae.update.bind(this),
                    destroy: ae.destroy.bind(this),
                    dynamicBulletIndex: 0
                }
            })
        },
        on: {
            init: function() {
                this.pagination.init(),
                this.pagination.render(),
                this.pagination.update()
            },
            activeIndexChange: function() {
                this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
            },
            snapIndexChange: function() {
                this.params.loop || this.pagination.update()
            },
            slidesLengthChange: function() {
                this.params.loop && (this.pagination.render(),
                this.pagination.update())
            },
            snapGridLengthChange: function() {
                this.params.loop || (this.pagination.render(),
                this.pagination.update())
            },
            destroy: function() {
                this.pagination.destroy()
            },
            click: function(e) {
                this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !s(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this),
                this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function() {
            n.extend(this, {
                scrollbar: {
                    init: re.init.bind(this),
                    destroy: re.destroy.bind(this),
                    updateSize: re.updateSize.bind(this),
                    setTranslate: re.setTranslate.bind(this),
                    setTransition: re.setTransition.bind(this),
                    enableDraggable: re.enableDraggable.bind(this),
                    disableDraggable: re.disableDraggable.bind(this),
                    setDragPosition: re.setDragPosition.bind(this),
                    getPointerPosition: re.getPointerPosition.bind(this),
                    onDragStart: re.onDragStart.bind(this),
                    onDragMove: re.onDragMove.bind(this),
                    onDragEnd: re.onDragEnd.bind(this),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init: function() {
                this.scrollbar.init(),
                this.scrollbar.updateSize(),
                this.scrollbar.setTranslate()
            },
            update: function() {
                this.scrollbar.updateSize()
            },
            resize: function() {
                this.scrollbar.updateSize()
            },
            observerUpdate: function() {
                this.scrollbar.updateSize()
            },
            setTranslate: function() {
                this.scrollbar.setTranslate()
            },
            setTransition: function(e) {
                this.scrollbar.setTransition(e)
            },
            destroy: function() {
                this.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create: function() {
            n.extend(this, {
                parallax: {
                    setTransform: ne.setTransform.bind(this),
                    setTranslate: ne.setTranslate.bind(this),
                    setTransition: ne.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0,
                this.originalParams.watchSlidesProgress = !0)
            },
            init: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTranslate: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTransition: function(e) {
                this.params.parallax.enabled && this.parallax.setTransition(e)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function() {
            var e = this
              , t = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                }
            };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function(i) {
                t[i] = oe[i].bind(e)
            }
            )),
            n.extend(e, {
                zoom: t
            });
            var i = 1;
            Object.defineProperty(e.zoom, "scale", {
                get: function() {
                    return i
                },
                set: function(t) {
                    if (i !== t) {
                        var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0
                          , a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                        e.emit("zoomChange", t, s, a)
                    }
                    i = t
                }
            })
        },
        on: {
            init: function() {
                this.params.zoom.enabled && this.zoom.enable()
            },
            destroy: function() {
                this.zoom.disable()
            },
            touchStart: function(e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            },
            touchEnd: function(e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            },
            doubleTap: function(e) {
                this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
            },
            transitionEnd: function() {
                this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
            },
            slideChange: function() {
                this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function() {
            n.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: le.load.bind(this),
                    loadInSlide: le.loadInSlide.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
            },
            init: function() {
                this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
            },
            scroll: function() {
                this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
            },
            resize: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            scrollbarDragMove: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            transitionStart: function() {
                this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
            },
            transitionEnd: function() {
                this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
            },
            slideChange: function() {
                this.params.lazy.enabled && this.params.cssMode && this.lazy.load()
            }
        }
    }, {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create: function() {
            n.extend(this, {
                controller: {
                    control: this.params.controller.control,
                    getInterpolateFunction: de.getInterpolateFunction.bind(this),
                    setTranslate: de.setTranslate.bind(this),
                    setTransition: de.setTransition.bind(this)
                }
            })
        },
        on: {
            update: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            resize: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            observerUpdate: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            setTranslate: function(e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            },
            setTransition: function(e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function() {
            var e = this;
            n.extend(e, {
                a11y: {
                    liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                }
            }),
            Object.keys(he).forEach((function(t) {
                e.a11y[t] = he[t].bind(e)
            }
            ))
        },
        on: {
            init: function() {
                this.params.a11y.enabled && (this.a11y.init(),
                this.a11y.updateNavigation())
            },
            toEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            fromEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            paginationUpdate: function() {
                this.params.a11y.enabled && this.a11y.updatePagination()
            },
            destroy: function() {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    }, {
        name: "history",
        params: {
            history: {
                enabled: !1,
                replaceState: !1,
                key: "slides"
            }
        },
        create: function() {
            n.extend(this, {
                history: {
                    init: pe.init.bind(this),
                    setHistory: pe.setHistory.bind(this),
                    setHistoryPopState: pe.setHistoryPopState.bind(this),
                    scrollToSlide: pe.scrollToSlide.bind(this),
                    destroy: pe.destroy.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.history.enabled && this.history.init()
            },
            destroy: function() {
                this.params.history.enabled && this.history.destroy()
            },
            transitionEnd: function() {
                this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
            },
            slideChange: function() {
                this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create: function() {
            n.extend(this, {
                hashNavigation: {
                    initialized: !1,
                    init: ce.init.bind(this),
                    destroy: ce.destroy.bind(this),
                    setHash: ce.setHash.bind(this),
                    onHashCange: ce.onHashCange.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.init()
            },
            destroy: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy()
            },
            transitionEnd: function() {
                this.hashNavigation.initialized && this.hashNavigation.setHash()
            },
            slideChange: function() {
                this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function() {
            var e = this;
            n.extend(e, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: ue.run.bind(e),
                    start: ue.start.bind(e),
                    stop: ue.stop.bind(e),
                    pause: ue.pause.bind(e),
                    onVisibilityChange: function() {
                        "hidden" === document.visibilityState && e.autoplay.running && e.autoplay.pause(),
                        "visible" === document.visibilityState && e.autoplay.paused && (e.autoplay.run(),
                        e.autoplay.paused = !1)
                    },
                    onTransitionEnd: function(t) {
                        e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd),
                        e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd),
                        e.autoplay.paused = !1,
                        e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
                    }
                }
            })
        },
        on: {
            init: function() {
                this.params.autoplay.enabled && (this.autoplay.start(),
                document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange))
            },
            beforeTransitionStart: function(e, t) {
                this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
            },
            sliderFirstMove: function() {
                this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
            },
            touchEnd: function() {
                this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run()
            },
            destroy: function() {
                this.autoplay.running && this.autoplay.stop(),
                document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange)
            }
        }
    }, {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create: function() {
            n.extend(this, {
                fadeEffect: {
                    setTranslate: ve.setTranslate.bind(this),
                    setTransition: ve.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                if ("fade" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "fade");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    n.extend(this.params, e),
                    n.extend(this.originalParams, e)
                }
            },
            setTranslate: function() {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            },
            setTransition: function(e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create: function() {
            n.extend(this, {
                cubeEffect: {
                    setTranslate: fe.setTranslate.bind(this),
                    setTransition: fe.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                if ("cube" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "cube"),
                    this.classNames.push(this.params.containerModifierClass + "3d");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    n.extend(this.params, e),
                    n.extend(this.originalParams, e)
                }
            },
            setTranslate: function() {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            },
            setTransition: function(e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create: function() {
            n.extend(this, {
                flipEffect: {
                    setTranslate: me.setTranslate.bind(this),
                    setTransition: me.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                if ("flip" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "flip"),
                    this.classNames.push(this.params.containerModifierClass + "3d");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    n.extend(this.params, e),
                    n.extend(this.originalParams, e)
                }
            },
            setTranslate: function() {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            },
            setTransition: function(e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            }
        },
        create: function() {
            n.extend(this, {
                coverflowEffect: {
                    setTranslate: ge.setTranslate.bind(this),
                    setTransition: ge.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"),
                this.classNames.push(this.params.containerModifierClass + "3d"),
                this.params.watchSlidesProgress = !0,
                this.originalParams.watchSlidesProgress = !0)
            },
            setTranslate: function() {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            },
            setTransition: function(e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                multipleActiveThumbs: !0,
                swiper: null,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function() {
            n.extend(this, {
                thumbs: {
                    swiper: null,
                    init: be.init.bind(this),
                    update: be.update.bind(this),
                    onThumbClick: be.onThumbClick.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this.params.thumbs;
                e && e.swiper && (this.thumbs.init(),
                this.thumbs.update(!0))
            },
            slideChange: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            update: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            resize: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            observerUpdate: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            setTransition: function(e) {
                var t = this.thumbs.swiper;
                t && t.setTransition(e)
            },
            beforeDestroy: function() {
                var e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy()
            }
        }
    }];
    return void 0 === W.use && (W.use = W.Class.use,
    W.installModule = W.Class.installModule),
    W.use(we),
    W
}
));
//# sourceMappingURL=swiper.min.js.map;
define('swiper-slider', ['vendor/swiper/swiper.min'], function(Swiper) {
    window.Swiper = window.Swiper || Swiper;
    $(".js-swiper-container, .js-slick-slider").each(function() {
        var $t = $(this);
        if ($t.hasClass("swiper-container-initialized"))
            return;
        var $p = $t.parent();
        if ($t.find(".swiper-slide").length <= 1) {
            $p.addClass("swiper-only-one-slider swiper-pagination-none");
            return;
        }
        var defaultOps = {
            navigation: {
                nextEl: $p.find(".swiper-button-next")[0],
                prevEl: $p.find(".swiper-button-prev")[0],
            },
            pagination: {
                el: $p.find(".swiper-pagination")[0],
                clickable: true,
            },
            lazy: {
                loadPrevNext: true,
            },
            watchOverflow: true,
            observer: true,
            observeParents: true,
            on: {
                observerUpdate: function() {
                    var that = this;
                    if (!that)
                        return;
                    if ($(that.$el).is(":hidden"))
                        return;
                    if ($(that.$el).hasClass("js-no-destroy"))
                        return;
                    setTimeout(function() {
                        if (that.pagination && that.pagination.bullets && that.pagination.bullets.length === 1) {
                            $(that.pagination.$el[0]).addClass("swiper-pagination-lock");

                            $(that.$el).parent().addClass("swiper-pagination-none");
                            that.destroy(true, true);
                        }
                    }, 100);
                },
                afterInit: function() {
                    $(document).trigger("updateLazyload");
                },
                init: function() {
                    var self = this;
                    setTimeout(function() {
                        $(self.pagination.bullets).filter(".swiper-pagination-bullet-active").removeClass("swiper-pagination-bullet-active").delay(10).promise().then(function() {
                            this.addClass("swiper-pagination-bullet-active");
                        });
                    }, 10);
                },
                slideChange: function() {
                    if (this.autoplay && !this.autoplay.running) {
                        $(this.$el).addClass("swiper-no-running");
                    }
                },
            },
        };
        var options = $.extend({}, defaultOps, $t.data());
        if (window.ActiveXObject || "ActiveXObject"in window) {
            if ($(this).closest('.correlative').length)
                options.breakpoints[1025].slidesPerView = 3;
        }
        var s = new Swiper(this,options);
    });
    function onTransitionEnd(e) {
        var swiper = $(this).parent()[0].swiper;
        if (!swiper || swiper.destroyed || !swiper.$wrapperEl)
            return;
        if (e.target !== swiper.$wrapperEl[0])
            return;
        ['transitionend', 'webkitTransitionEnd'].forEach(function(event) {
            swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
        });
        swiper.autoplay.paused = false;
        if (!swiper.autoplay.running) {
            swiper.autoplay.stop();
        } else {
            swiper.autoplay.run();
        }
    }
    function swiperHover() {
        function onMouseEnter(swiper) {
            if (swiper.params.autoplay.disableOnInteraction) {
                swiper.autoplay.pause();
            } else {
                swiper.autoplay.pause();
            }
            ['transitionend', 'webkitTransitionEnd'].forEach(function(event) {
                swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
            });
        }
        function onMouseLeave(swiper) {
            swiper.autoplay.paused = false;
            swiper.autoplay.run();
        }
        $(document).on("mouseenter", ".swiper-container", function(e) {
            var s = this.swiper;
            if (!s)
                return;
            if (!s.autoplay)
                return;
            if (!s.autoplay.running) {
                return;
            }
            setTimeout(function() {
                onMouseEnter(s);
            }, 10);
            $(s.$el).addClass("swiper-no-running");
        }).on("mouseleave", ".swiper-container", function(e) {
            var s = this.swiper;
            if (!s)
                return;
            if (!s.autoplay)
                return;
            if (!s.autoplay.running) {
                return;
            }
            onMouseLeave(s);
            $(s.pagination.bullets).filter(".swiper-pagination-bullet-active").removeClass("swiper-pagination-bullet-active").delay(10).promise().then(function() {
                this.addClass("swiper-pagination-bullet-active");
            });
            $(s.$el).removeClass("swiper-no-running");
        });
    }
    swiperHover();
});

define('util', [], function() {
    function execute() {
        var fn = Function;
        return (fn.apply(null, arguments));
    }
    var obj = {};
    obj.execute = execute;
    window.execute = execute;
    return obj;
});

define('misc', ['require', 'VideoBox', 'swiper-slider', 'util'], function(require, VideoBox) {
    var huawei = huawei || {};

    if (('ontouchstart'in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
        $("html").addClass("touch");
    } else
        $("html").addClass("no-touch");

    // 移动端同层H5播放器
    $("video").attr("webkit-playsinline", "true").attr("x5-video-player-type", "h5").attr("playsinline", "true");

    // video
    $('.btn-play').each(function(index) {
        new VideoBox($(this),index);
    });
    window.VideoBox = VideoBox

    // a标签新窗口打开的链接增加rel="noopener" 去掉nofollow
    $('a[target="_blank"]').attr("rel", "noopener");

    // 手机版微信分享复制链接功能
    $(document).on('click', '.btn-wechat', function(e) {
        $("body").addClass("mobile-share-open");
        var copyText = $("#share-url-input");
        if (!copyText.length) {
            copyText = $('<input id ="share-url-input" style="display: none; opacity: 0"/>').appendTo("body");
        }
        copyText.val(document.URL);
        setTimeout(function() {
            copyText.select();
            document.execCommand("copy");
        }, 10);
    }).on('click.js-wechat-share-overlay', '.js-wechat-share-close-btn', function(e) {
        $("body").removeClass("mobile-share-open");
    });

    // 底部分享图标在超出一屏以外显示出来
    setTimeout(function() {
        var $sharebox = $(".bottom-box .share-box");
        if ($sharebox.length && $(".news-detail-box").outerHeight() > window.innerHeight) {
            $sharebox.addClass("show");
        }
    }, 500);

    // 标签锚点定位功能
    (function() {
        var getHistory = typeof history.replaceState === "function" ? $.when(1) : $.loadJS("https://cdn.jsdelivr.net/npm/html5-history-api@4.2.10/history.min.js");

        var huawei = huawei || {};
        if ($(".js-tablist-hash").length) {
            getHistory.then(function() {
                huawei.tabHash();
            });
        }

        huawei.tabHash = function() {
            $(document).on("click.tabclick", ".js-tablist-hash a", function(e) {
                history.replaceState(null, null, this.href);
                $(window).trigger('goto_section.tab_hash');
            });
            var $tablist = $(".js-tablist-hash");
            $(window).on('popstate.tab_hash goto_section.tab_hash', function(e) {
                var hash = location.hash.replace("/", "");
                if (!hash)
                    return;
                $("a[href='" + hash + "']").tab('show');
                setTimeout(function() {
                    $(document).trigger("scroll-goto.nav", $tablist.parent());
                }, 100);
            });

            setTimeout(function() {
                $(window).trigger('goto_section.tab_hash');
            }, 100);
        }
        ;
    }
    )();

    // 左边过滤功能文字点击可选择
    $(document).on("click", '.form-box span[type="check-box"] + p', function(e) {
        $(this).prev().trigger("click");
        return false;
    });

    //
    $(".btn-open-search").on("click", function(e) {
        var $t = $($(this).attr("data-target")).find("input");
        setTimeout(function() {
            $t.trigger("focus");
        }, 500);
        if ($(window).width() > 1024)
            return;
        $("body").addClass("open-search");
        if (!$("header .navbar-toggle").hasClass('collapsed')) {
            $('.top-nav-height').hide()
            $('.top-nav-height').removeClass('in')
        }
    });

    $(".btn-close").on("click", function(e) {
        if ($(window).width() > 1024)
            return;
        $("body").removeClass("open-search");
        if (!$("header .navbar-toggle").hasClass('collapsed')) {
            $('.top-nav-height').show()
            $('.top-nav-height').addClass('in')
        }
    });

    huawei.showMoreLess = function() {
        // 折叠显示更多更少
        $(document).on('click.js-show-more', '[data-toggle="collapse"]', function(e) {
            var $t = $(this);
            if (!$t.attr('data-show-more-text')) {
                return false;
            }
            if ($t.is('[aria-expanded="true"]')) {
                $t.children('span').html($t.attr('data-show-less-text')).end().children('em').addClass('icon-arrow-up').removeClass('icon-arrow-down');
            } else {
                $t.children('span').html($t.attr('data-show-more-text')).end().children('em').removeClass('icon-arrow-up').addClass('icon-arrow-down');
            }

            return false;
        });

        $(document).on('click.js-wechat-share', '.js-wechat-share-btn, .social-share .icon-wechat, .social .weixin', function(e) {
            if (!$(e.target).is('.js-wechat-share-btn, .social-share .icon-wechat, .social .weixin,.hwic_sharing_wechat')) {
                return false;
            }
            $(this).toggleClass('share-open');
            return false;
        }).on('click.js-wechat-share-close', '.js-wechat-share-close-btn', function(e) {
            $($(this).data('target')).removeClass('share-open');
            return false;
        });
    }
    ;
    huawei.showMoreLess();

    window.gafix = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof utag === "undefined")
            return;
        try {
            var target = args[args.length - 1];
            var href = target.href;

            if (href.toLowerCase().indexOf('javascript') >= 0) {
                href = "#";
            }

            window.utag.link({
                "link_category": args[2],
                "link_name": args[3],
                "link_url": target.href,
                "tealium_event": "link_click",
            });
        } catch (e) {}
    }
    ;
    // 更改默认ga事件
    $("a[onclick^='ga']").on("click", function(e) {
        var evtStr = $(this).attr("onclick");
        evtStr = evtStr.replace("ga(", "gafix(");
        evtStr = evtStr.replace(/\)/, ", this)");
        evtStr = evtStr.replace(/;.*$/, "");
        var gaEvent = window.execute('e', evtStr);
        if (typeof gafix === "function") {
            gaEvent.apply(this, [e]);
        }
    });

    // 手机版展开主菜单按钮ga事件
    $(document).on("click", "header .navbar .navbar-toggle", function(e) {
        var $t = $(this);
        var ga = window.ga || $.noop;
        var utag = window.utag || $.noop;
        if (!$t.hasClass("collapsed")) {
            ga("send", "event", "navbar", "openonmobile");
            utag.link({
                "nav_url": this.href,
                "tealium_event": "megamenu_click",
                "nav_name": "openonmobile"
            });
        } else {
            ga("send", "event", "navbar", "closeonmobile");
            utag.link({
                "nav_url": this.href,
                "tealium_event": "megamenu_click",
                "nav_name": "closeonmobile"
            });
        }
    });

    // 页脚手机版同时只允许展开一个列表
    $(document).on('click', 'footer .footer-nav [data-toggle="collapse"]', function(e, auto) {
        $(this).closest('.footer-nav').find('[data-toggle="collapse"]').not(this).not('.collapsed').trigger('click', [true]);
        if (!auto) {
            setTimeout(function() {
                var offset = $("body").hasClass("tab-affix") || $("body").hasClass("pointNav-affix") ? -50 : 0;
                $(document).trigger("scroll-goto.nav", [$(e.target).parent(), offset]);
            }, 500);
        }
    });

    // tab标签点击切换显示对应的隐藏slick
    $(document).on('shown.bs.tab', '.js-tab-list-slick a', function(e) {
        setTimeout(function() {
            $(document).trigger("swiper-tab-change", [e]);
        }, 200);
    });

    // PC三级导航hover功能
    $("#main-subnav-list").hoverIntent(function() {
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
    }, ">ul > li").hoverIntent(function() {
        return true;
    }, function() {
        $(this).find(">ul>li").removeClass("hover");
    });

    // 手机三级导航功能
    $(document).on("click", ".main-subnav .nav-select a", function(e) {
        $(this).toggleClass("hover");
    });

    // utag.link自动增加url选项属性
    function utagAutoUrl() {
        $("a[onclick*='utag.link']").each(function() {
            var $t = $(this);
            var onclick = $t.attr("onclick");
            if (!/utag\.link/.test(onclick))
                return;
            if (/_url/.test(onclick))
                return;

            var url = "";
            (function() {
                if (/megamenu_click|header_click|footer_click|breadcrumb_click|submenu_click/.test(onclick))
                    url = "nav_url";
                if (/homepage_banner_click/.test(onclick))
                    url = "banner_url";
                if (/search_quick_link_click/.test(onclick))
                    url = "quick_link_url";
            }
            )();
            if (!url)
                return;
            url = "'" + url + "': this.href";
            onclick = onclick.replace(/(utag.link\(\{)/, "$1" + url + ",");
            $t.prop("onclick", null);
            $t.attr("onclick", onclick);
        });
    }
    utagAutoUrl();

    return huawei;
});

define('search', ['vendor/js.cookie-2.2.1.min', 'util'// "vendor/jquery-ui/jquery-ui-autocomplete.min"
], function(Cookies) {
    function getLang() {
        var lang = $("#hidLanguage").val() == "zh" ? "cn" : $("#hidLanguage").val();
        return lang;
    }
    function validLang(lang) {
        return true;
    }

    function search(target) {
        $(".js-search-btn-close").trigger("click");
        var language = $("#hidLanguage").val();
        var keyword = target.val();

        try {
            if (typeof utag !== "undefined") {
                utag.link({
                    'tealium_event': 'search_submit',
                    'search_term': keyword
                });
            }
        } catch (ex) {/* empty */
        }

        var url = $("#SearchUrl").val() + "?keywords=" + keyword;
        location.href = url;
    }

    $(".btn-search").on("click", function(e) {
        search($(this).prev());
        return false;
    });

    $(document).on("click", ".search_results a", function(e) {
        var target = $("#" + $(".search_results").attr("data-target"));
        target.val($(this).text());
        search(target);
        return false;
    });

    $(document).on("input propertychange", ".js-search-header-input-popup,.js-search-footer-input-popup", function(e) {
        $(".js-results-box").removeClass("hidden").addClass("show");
        var keyword = $(this).val();
        if (keyword.length < 2) {
            $(".js-complete-search-result").filter("[data-target='" + $(this).attr("id") + "']").removeClass("show").addClass("hidden");
            $(".js-results-box").removeClass("hidden").addClass("show");
            return;
        } else {
            $(".js-complete-search-result").filter("[data-target='" + $(this).attr("id") + "']").removeClass("hidden").addClass("show");
            $(".js-results-box").addClass("hidden").removeClass("show");
        }
    });

    $(document).on("keypress", ".js-search-header-input-popup,.js-search-footer-input-popup", function(e) {
        if (e.keyCode == 13) {
            search($(this));
        }
    });

    $(document).on("focusin", ".js-search-header-input-popup,.js-search-footer-input-popup, #b-search", function(e) {
        var lang = getLang();
        if (!validLang(lang)) {
            return false;
        }

        var hotSearch = $(".js-search-keyword-pc ul li");

        if (hotSearch.length > 0) {
            $(".js-results-box").css({
                top: $(this).offset().top + $(this).outerHeight(),
                left: $(this).offset().left,
                width: $(this).outerWidth(),
            });
            $(".results2").css("cssText", "display:none !important");
            $(".js-results-box").removeClass("hidden").addClass("show");
            $(".search_results").attr("data-target", $(this).attr("id"));
            $(".js-complete-search-result").filter("[data-target='" + $(this).attr("id") + "']").removeClass("show");
            $(".js-search-keyword-pc").css("display", "");
        } else {
            $(".js-results-box").addClass("hidden");
        }
    }).on("focusout", ".js-search-header-input-popup,.js-search-footer-input-popup, #b-search", function(e) {
        setTimeout(function() {
            $(".js-results-box").addClass("hidden").removeClass("show");
        }, 200);
    });

    $(document).on("input focusin focusout", "#js-search-footer-input-popup", function() {
        var $t = $(this);
        var val = $t.val();
        var $clearBtn = $t.nextAll(".btn-b-clear");
        if (val)
            $clearBtn.show();
        else
            $clearBtn.hide();
    }).on("click", "#footer-search .btn-b-clear", function() {
        try {
            if (typeof utag !== "undefined") {
                utag.link({
                    'tealium_event': 'search_term_reset',
                    'search_term': $(this).closest("#footer-search").find("#js-search-footer-input-popup").val()
                });
            }
        } catch (ex) {/* empty */
        }
        $(this).closest("#footer-search").find("#js-search-footer-input-popup").val("").end().end().hide();
    });
});
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define('wechat-share', ["jquery"], function($) {
            return (root.wechatShare = factory($));
        });
    } else if (typeof module === "object" && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        // Browser globals
        root.wechatShare = factory(root.jQuery);
    }
}
)(typeof self !== "undefined" ? self : this, function(jQuery) {
    // Use b in some fashion.
    var $ = jQuery;
    var location = window.location;
    var huawei = huawei || {};
    var defaultImgUrl = "https://" + location.host + "/Assets/corp/v2/img/hw_logo_wechat.png";

    function getShareOptions() {
        var options = {};
        options["title"] = $('meta[property="og:title"]').attr("content") || document.title;
        options["link"] = location.href;
        options["desc"] = $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content");
        var wecharimg = $("#js-wechat-imgUrl, #js-webchat-imgUrl").val() || $('meta[property="og:image"]').attr("content");
        (function() {
            if (/\/\//gi.test(wecharimg)) {
                if (!/http/gi.test(wecharimg) && wecharimg) {
                    wecharimg = "https:" + wecharimg;
                }
            }
        }
        )();
        options["imgUrl"] = wecharimg || defaultImgUrl;
        options["imgUrl"] = options["imgUrl"].replace("www-file.huawei.com", document.domain);
        options["cancel"] = function(res) {
            $(document).trigger("wechat-share-cancel", [res]);
        }
        ;
        options["success"] = function(res) {
            $(document).trigger("wechat-share-success", [res]);
        }
        ;
        return options;
    }

    huawei.webchatShare = function() {
        var wechatSdk = $.loadJS("https://res.wx.qq.com/open/js/jweixin-1.6.0.js");
        var url = "/api/getwechatjssdk";
        var data = {
            url: location.href.replace(location.hash, "")
        };
        var wechatAuth = $.ajax({
            url: url,
            data: data,
            dataType: "json"
        });
        $.when(wechatSdk, wechatAuth).done(function(wx, auth) {
            if (!wx)
                wx = window.wx;
            if (!wx.config)
                wx = window.wx;
            var d = auth[0];
            wx.config({
                debug: false,
                appId: d.appId,
                timestamp: d.timestamp,
                nonceStr: d.nonceStr,
                signature: d.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "updateAppMessageShareData", "updateTimelineShareData"]
            });
            var options = getShareOptions();
            var TimelineShareData = $.extend({}, options);
            delete TimelineShareData["desc"];
            wx.ready(function() {
                // 监听“发送给朋友”按钮点击、自定义分享内容及分享结果接口
                wx.updateAppMessageShareData(options);
                // 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
                wx.updateTimelineShareData(TimelineShareData);
            });
        });
    }
    ;

    (function() {
        if (!/MicroMessenger/i.test(navigator.userAgent) || !/www\.huawei\.com(?:\.cn)?/i.test(document.domain)) {
            return false;
        }
        huawei.webchatShare();
        return false;
    }
    )();

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return huawei;
});

function _extends() {
    return (_extends = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
        }
        return t
    }
    ).apply(this, arguments)
}
function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    }
    : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
    )(t)
}
!function(t, e) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define('vendor/lazyload.min', e) : t.LazyLoad = e()
}(this, function() {
    "use strict";
    var t = "undefined" != typeof window
      , e = t && !("onscroll"in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)
      , n = t && "IntersectionObserver"in window
      , o = t && "classList"in document.createElement("p")
      , r = {
        elements_selector: "img",
        container: e || t ? document : null,
        threshold: 300,
        thresholds: null,
        data_src: "src",
        data_srcset: "srcset",
        data_sizes: "sizes",
        data_bg: "bg",
        class_loading: "loading",
        class_loaded: "loaded",
        class_error: "error",
        load_delay: 0,
        auto_unobserve: !0,
        callback_enter: null,
        callback_exit: null,
        callback_reveal: null,
        callback_loaded: null,
        callback_error: null,
        callback_finish: null,
        use_native: !1
    }
      , a = function(t, e) {
        var n, o = new t(e);
        try {
            n = new CustomEvent("LazyLoad::Initialized",{
                detail: {
                    instance: o
                }
            })
        } catch (t) {
            (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, {
                instance: o
            })
        }
        window.dispatchEvent(n)
    };
    var i = function(t, e) {
        return t.getAttribute("data-" + e)
    }
      , s = function(t, e, n) {
        var o = "data-" + e;
        null !== n ? t.setAttribute(o, n) : t.removeAttribute(o)
    }
      , c = function(t) {
        return "true" === i(t, "was-processed")
    }
      , l = function(t, e) {
        return s(t, "ll-timeout", e)
    }
      , u = function(t) {
        return i(t, "ll-timeout")
    }
      , d = function(t, e) {
        t && t(e)
    }
      , f = function(t, e) {
        t._loadingCount += e,
        0 === t._elements.length && 0 === t._loadingCount && d(t._settings.callback_finish)
    }
      , _ = function(t) {
        for (var e, n = [], o = 0; e = t.children[o]; o += 1)
            "SOURCE" === e.tagName && n.push(e);
        return n
    }
      , v = function(t, e, n) {
        n && t.setAttribute(e, n)
    }
      , g = function(t, e) {
        v(t, "sizes", i(t, e.data_sizes)),
        v(t, "srcset", i(t, e.data_srcset)),
        v(t, "src", i(t, e.data_src))
    }
      , m = {
        IMG: function(t, e) {
            var n = t.parentNode;
            n && "PICTURE" === n.tagName && _(n).forEach(function(t) {
                g(t, e)
            });
            g(t, e)
        },
        IFRAME: function(t, e) {
            v(t, "src", i(t, e.data_src))
        },
        VIDEO: function(t, e) {
            _(t).forEach(function(t) {
                v(t, "src", i(t, e.data_src))
            }),
            v(t, "src", i(t, e.data_src)),
            t.load()
        }
    }
      , b = function(t, e) {
        var n, o, r = e._settings, a = t.tagName, s = m[a];
        if (s)
            return s(t, r),
            f(e, 1),
            void (e._elements = (n = e._elements,
            o = t,
            n.filter(function(t) {
                return t !== o
            })));
        !function(t, e) {
            var n = i(t, e.data_src)
              , o = i(t, e.data_bg);
            n && (t.style.backgroundImage = 'url("'.concat(n, '")')),
            o && (t.style.backgroundImage = o)
        }(t, r)
    }
      , h = function(t, e) {
        o ? t.classList.add(e) : t.className += (t.className ? " " : "") + e
    }
      , p = function(t, e, n) {
        t.addEventListener(e, n)
    }
      , y = function(t, e, n) {
        t.removeEventListener(e, n)
    }
      , E = function(t, e, n) {
        y(t, "load", e),
        y(t, "loadeddata", e),
        y(t, "error", n)
    }
      , w = function(t, e, n) {
        var r = n._settings
          , a = e ? r.class_loaded : r.class_error
          , i = e ? r.callback_loaded : r.callback_error
          , s = t.target;
        !function(t, e) {
            o ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
        }(s, r.class_loading),
        h(s, a),
        d(i, s),
        f(n, -1)
    }
      , I = function(t, e) {
        var n = function n(r) {
            w(r, !0, e),
            E(t, n, o)
        }
          , o = function o(r) {
            w(r, !1, e),
            E(t, n, o)
        };
        !function(t, e, n) {
            p(t, "load", e),
            p(t, "loadeddata", e),
            p(t, "error", n)
        }(t, n, o)
    }
      , k = ["IMG", "IFRAME", "VIDEO"]
      , A = function(t, e) {
        var n = e._observer;
        z(t, e),
        n && e._settings.auto_unobserve && n.unobserve(t)
    }
      , L = function(t) {
        var e = u(t);
        e && (clearTimeout(e),
        l(t, null))
    }
      , x = function(t, e) {
        var n = e._settings.load_delay
          , o = u(t);
        o || (o = setTimeout(function() {
            A(t, e),
            L(t)
        }, n),
        l(t, o))
    }
      , z = function(t, e, n) {
        var o = e._settings;
        !n && c(t) || (k.indexOf(t.tagName) > -1 && (I(t, e),
        h(t, o.class_loading)),
        b(t, e),
        function(t) {
            s(t, "was-processed", "true")
        }(t),
        d(o.callback_reveal, t),
        d(o.callback_set, t))
    }
      , O = function(t) {
        return !!n && (t._observer = new IntersectionObserver(function(e) {
            e.forEach(function(e) {
                return function(t) {
                    return t.isIntersecting || t.intersectionRatio > 0
                }(e) ? function(t, e) {
                    var n = e._settings;
                    d(n.callback_enter, t),
                    n.load_delay ? x(t, e) : A(t, e)
                }(e.target, t) : function(t, e) {
                    var n = e._settings;
                    d(n.callback_exit, t),
                    n.load_delay && L(t)
                }(e.target, t)
            })
        }
        ,{
            root: (e = t._settings).container === document ? null : e.container,
            rootMargin: e.thresholds || e.threshold + "px"
        }),
        !0);
        var e
    }
      , N = ["IMG", "IFRAME"]
      , C = function(t, e) {
        return function(t) {
            return t.filter(function(t) {
                return !c(t)
            })
        }((n = t || function(t) {
            return t.container.querySelectorAll(t.elements_selector)
        }(e),
        Array.prototype.slice.call(n)));
        var n
    }
      , M = function(t, e) {
        this._settings = function(t) {
            return _extends({}, r, t)
        }(t),
        this._loadingCount = 0,
        O(this),
        this.update(e)
    };
    return M.prototype = {
        update: function(t) {
            var n, o = this, r = this._settings;
            (this._elements = C(t, r),
            !e && this._observer) ? (function(t) {
                return t.use_native && "loading"in HTMLImageElement.prototype
            }(r) && ((n = this)._elements.forEach(function(t) {
                -1 !== N.indexOf(t.tagName) && (t.setAttribute("loading", "lazy"),
                z(t, n))
            }),
            this._elements = C(t, r)),
            this._elements.forEach(function(t) {
                o._observer.observe(t)
            })) : this.loadAll()
        },
        destroy: function() {
            var t = this;
            this._observer && (this._elements.forEach(function(e) {
                t._observer.unobserve(e)
            }),
            this._observer = null),
            this._elements = null,
            this._settings = null
        },
        load: function(t, e) {
            z(t, this, e)
        },
        loadAll: function() {
            var t = this;
            this._elements.forEach(function(e) {
                A(e, t)
            })
        }
    },
    t && function(t, e) {
        if (e)
            if (e.length)
                for (var n, o = 0; n = e[o]; o += 1)
                    a(t, n);
            else
                a(t, e)
    }(M, window.lazyLoadOptions),
    M
});
//# sourceMappingURL=lazyload.min.js.map
;define('lazyload', ['vendor/lazyload.min'], function(LazyLoad) {
    // 图片懒加载

    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
        "class_loading": "lazy-loading",
        "elements_selector": ".lazyload",
        threshold: 100,
        lazy: true,
        preloadImages: false,
    });
    var lazyLoadInstanceSwiper = new LazyLoad({
        // Your custom settings go here
        "class_loading": "lazy-loading",
        "elements_selector": ".swiper-lazy",
        threshold: 100,
        lazy: true,
        preloadImages: false,
    });

    function updateLazyload() {
        setTimeout(function() {
            lazyLoadInstance.update();
            lazyLoadInstanceSwiper.update();
        }, 200);
    }

    updateLazyload();
    window.lazyLoadInstance = lazyLoadInstance;

    if (window.jQuery) {
        $(document).on("updateLazyload", updateLazyload);
    }
});

// page init callback
var pageInit = window.page_init;
if (pageInit) {
    if (!(pageInit instanceof Array))
        pageInit = [pageInit];
    $.each(pageInit, function(i, v) {
        v.call(this, $);
    });
}
window.scrollKey = true;
var commonModule = {};

define('app/common', ['PanelImg', 'vendor/js.cookie-2.2.1.min', "menu", 'text-dotdotdot', 'photo', 'misc', 'search', 'helper', 'wechat-share', 'lazyload'], function(PanelImg, Cookies) {
    var pimg = new PanelImg('.panel-img-list');
    var $navTop = $('.top-nav');

    var breakpoint1200 = 1025;
    var $header = $('header');

    setTimeout(function() {
        commonModule.browsehappy();
        commonModule.GetUserNameInfo(Cookies);
    }, 0);

    // top-nav event
    var $topNavContent = $('.top-nav-content');
    var $groupWebsite = $('#group-website');
    var $worldwide = $('#worldwide');
    $('.top-nav-height a').on('click', function(e) {
        if ($(this).index() >= 2)
            return;
        e.preventDefault();
        var $showEle = null;
        if ($(this).index() === 0) {
            $showEle = $('#group-website');
        }
        if ($(this).index() === 1) {
            $showEle = $('#worldwide');
        }
        if (window.innerWidth < breakpoint1200) {
            $topNavContent.toggleClass('in');
            $showEle.removeClass('chide').removeAttr('style').siblings('div').addClass('chide').removeAttr('style');
        } else {
            if ($(this).index() === 0) {
                $groupWebsite.slideToggle(500);
                $worldwide.slideUp(500);
            }
            if ($(this).index() === 1) {
                $worldwide.slideToggle(500);
                $groupWebsite.slideUp(500);
            }
            $(this).toggleClass('in').siblings('a').removeClass('in');
        }
    });

    // 移动端导航返回按钮
    $("a.btn-nav-back").on("click", function(e) {
        e.preventDefault();
        $(this).parents(".menu-fixed-right").removeClass("in");
        $(".top-nav-height").removeClass("hide-down");
        topNavHeight();
    });
    // iPad横竖屏切换
    var isVertical = true
    var width = 0
    var height = 0
    if (window.innerWidth <= 1366) {
        width = window.innerWidth
        height = window.innerHeight
        if (window.innerWidth > window.innerHeight) {
            isVertical = false
            // 横
        } else {
            isVertical = true
            // 竖
        }
    }
    window.addEventListener('resize', orientationChange);
    function orientationChange() {
        if (window.innerWidth > 1366 || (width === window.innerWidth || height === window.innerHeight) || $('.video-box.show').length)
            return
        if (window.innerWidth > window.innerHeight) {
            if (isVertical) {
                isVertical = false
                // 横
                window.location.reload()
            }
        } else {
            if (!isVertical) {
                isVertical = true
                // 竖
                window.location.reload()
            }
        }

    }
    // header event
    $header.find('button.navbar-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('collapsed');
        $('#hw-navbar, .top-nav .top-nav-height').toggleClass('in');
        $('body').toggleClass('mobile-menu-open');

        $("a.btn-nav-back").parent().removeClass("in");
        $('.top-nav-height').removeClass('hide-down');
        if ($(this).hasClass('collapsed')) {
            $('.top-nav .top-nav-content').removeClass('in');
        }
        topNavHeight();
    });
    $header.find('.btn-next').on('click', function(e) {
        if (window.innerWidth >= breakpoint1200)
            return;
        if ($(this).parent().hasClass("hover-open")) {
            e.preventDefault();
            $('.top-nav-height').removeAttr('style');
            $('.top-nav-height').addClass('hide-down');
            $(this).next(".menu-fixed-right").toggleClass("in");
        }
    });

    // 手机版导航 .top-nav-height位置调整
    function topNavHeight() {
        if (window.innerWidth < breakpoint1200) {
            var height = window.innerHeight;
            height -= 321 + 7.5 + 66;
            $('.top-nav-height ').css('bottom', (height / 2) - 55);
        }
    }
    topNavHeight();

    $('#hw-navbar [data-toggle=collapse]').on('click', function(e) {
        if ($(this).hasClass('collapsed')) {
            $('#hw-navbar [data-toggle=collapse]').addClass('collapsed');
            $('#hw-navbar .navbar-collapse').removeClass('in');
        }
    });

    // mouseover mask-bg
    var $maskBg = $(".mask-bg");
    // 主菜单点击交互效果
    $("#hw-navbar").on("click", ".hover-open > a", function(e) {
        if (window.innerWidth < breakpoint1200)
            return;

        var $t = $(this);
        var $parent = $t.closest("#hw-navbar");
        var $navList = $parent.find(".hover-open");
        var $cur = $t.parent();
        var isActive = $cur.hasClass("active");
        $navList.filter(".active").not($cur).children(".nav-open").hide().end().removeClass("active");

        if (isActive) {
            $cur.removeClass("active").children(".nav-open").slideUp();
            $maskBg.removeClass("show").css("visibility", "hidden");
        } else {
            $cur.addClass("active");
            var m = $maskBg.hasClass("show") ? "show" : "slideDown";
            $cur.children(".nav-open").css({
                visibility: "visible"
            })[m]();
            $maskBg.fadeIn()// .delay(10)
            .promise().then(function() {
                $maskBg.addClass("show").css("visibility", "visible");
            });
        }
    });

    // 点击空白处关闭导航
    $(document).on("click", function(e) {
        if (e.isTrigger)
            return;
        if (window.innerWidth < breakpoint1200)
            return;
        var $target = $(e.target);
        if ($target.closest(".nav-open, .menu-list").length)
            return;
        var $openli = $(".hover-open.active");
        if (!$openli.length)
            return;
        $openli.children(".nav-open").slideUp();
        $openli.removeClass("active");
        $maskBg.removeClass("show").css("visibility", "hidden");
    });

    // 返回顶部按钮
    if ($('body').find('a.btn-go-top').length > 0) {
        $(window).on('scroll', $.debounce(function() {
            if ($(window).scrollTop() > 500) {
                $('a.btn-go-top').fadeIn(200);
            } else {
                $('a.btn-go-top').fadeOut(200);
            }
        }, 50));
        $('body').find('a.btn-go-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 'fast');
        });
    }

    // 搜索框
    if (window.innerWidth >= breakpoint1200) {
        $('body').click(function() {
            if (($('.search-box.search-hide').length < $('.search-box').length)) {
                $('a.btn-open-search').removeClass('nav-hide');
                $('.search-box').addClass('search-hide');
                $('.btn-shop, #hw-navbar').removeClass('nav-hide');
                $(".js-results-box,.js-complete-search-result").removeClass("show").addClass("hidden");
            }
        });
    }

    // 搜索框快速链接没有内容时隐藏
    if ($(".search-box .search-keyword .search-keyword-title").length) {
        let text = $(".search-box .search-keyword .search-keyword-title").text()
        // 去除换行空格
        text = text.replace(/[\r\n]\s+/g, '')
        if (text) {
            $(".search-box .search-keyword .search-keyword-title").show()
        } else {
            $(".search-box .search-keyword .search-keyword-title").hide()
        }
    }

    $('.search-box input,.search-box .b-search-keyword,.search-box .btn-search').click(function(e) {
        e.stopPropagation();
    });
    $('a.btn-open-search').on('click', function(e) {
        $(".hover-open.active .btn-close-nav-ani").trigger("click");
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('nav-hide');
        if ($(this).parents('header').length > 0 && window.innerWidth >= breakpoint1200) {
            $('.btn-shop, #hw-navbar').addClass('nav-hide');
        }
        $($(this).data('target')).removeClass('search-hide');
        if ($('#hw-navbar').hasClass('in')) {
            $('.top-nav-height').addClass('hide-down');
        }
    });
    $('.search-box .btn-close').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).parents('header').length > 0 && window.innerWidth >= breakpoint1200) {
            $('.btn-shop, #hw-navbar').removeClass('nav-hide');
        }
        $(this).parent('.search-box').addClass('search-hide');
        $('a.btn-open-search[data-target="#' + $(this).parent('.search-box').attr('id') + '"]').removeClass('nav-hide');
        if ($('#hw-navbar').hasClass('in') && $('#hw-navbar').find(".menu-list .nav-open.in").length <= 0) {
            $('.top-nav-height').removeClass('hide-down');
        }
        $(".js-results-box,.js-complete-search-result").removeClass("show").addClass("hidden");
    });

    // 顶部购物车按钮交互
    $(document).on("click", "header .js-shop-btn-open", function(e) {
        $(".hover-open.active .btn-close-nav-ani").trigger("click");
        $("header .btn-shop").addClass("opened");
        if ($(this).parents("header").length > 0 && window.innerWidth >= breakpoint1200) {
            $(".btn-open-search, #hw-navbar").addClass("nav-hide");
        }
        if ($("#hw-navbar").hasClass("in")) {
            $(".top-nav-height").addClass("hide-down");
        }
    });
    $(document).on("click close-shop-btn", "header .js-shop-btn-close", function(e) {
        $("header .btn-shop").removeClass("opened");
        if ($(this).parents("header").length > 0 && window.innerWidth >= breakpoint1200) {
            $(".btn-open-search, #hw-navbar").removeClass("nav-hide");
        }
        $('a.btn-open-search[data-target="#' + $(this).parent(".search-box").attr("id") + '"]').removeClass("nav-hide");
        if ($("#hw-navbar").hasClass("in") && $("#hw-navbar").find(".menu-list .nav-open.in").length <= 0) {
            $(".top-nav-height").removeClass("hide-down");
        }
    });
    // 点击空白处关闭购物菜单
    $(document).on("click", function(e) {
        if (window.innerWidth < breakpoint1200)
            return;
        if (!$("header .btn-shop").hasClass("opened"))
            return;
        var $target = $(e.target);
        if ($target.closest(".btn-shop, .shop-nav").length)
            return;
        $("header .js-shop-btn-close").trigger("close-shop-btn");
    });

    // 微信分享
    if ($('.share-box').length > 0) {
        $('.btn-wechat').on('click', function(e) {
            e.preventDefault();
            $(this).find('.wechat-qrcode').toggleClass('show');
        }).find('button').on('click', function(e) {
            e.preventDefault();
            $(this).parents('wechat-qrcode').removeClass('show');
        });
    }

    $('.main-subnav [data-toggle=collapse]').on('click', function(e) {
        if (window.innerWidth >= 1200)
            e.stopPropagation();
    });
    // ie8
    (function() {
        var DEFAULT_VERSION = 8.0;
        var ua = navigator.userAgent.toLowerCase();
        var isIE = ua.indexOf("msie") > -1;
        var safariVersion;
        if (isIE) {
            safariVersion = ua.match(/msie ([\d.]+)/)[1];
        }
        if (safariVersion <= DEFAULT_VERSION) {
            setTimeout(function() {
                if ($('.col-item .imgbox img').length > 0) {
                    $('.col-item .imgbox img').css('top', '0');
                }
                if ($('.c-box .imgbox').length > 0) {
                    $('.c-box .imgbox img').css('top', '0');
                }
                if ($('#story-content').length > 0) {
                    $('#story-content img').css('top', '0');
                }
                if ($('.row li.c-no-img').length > 0) {
                    $('.row li.c-no-img').each(function() {
                        $(this).after('<li class="clearfix"></li>');
                    });
                }
            }, 2000);
        }
    }
    )();

    function scrollOffset(top, time) {
        $('html,body').stop().animate({
            scrollTop: top
        }, time);
    }

    $('.page-list a').click(function() {
        var top = 0;
        top = $('.content-list-box,.content-list-box-other,.tab-content .row,.list-row,.result-list').offset().top;
        if ($('.content-list-box-other').length > 0 && $('.ICT-interview').length > 0) {
            top = $('.ICT-interview').offset().top;
        }

        scrollOffset(top - 150, 0);
    });

    $('.btn-close-nav-ani').click(function() {
        var $openli = $('.hover-open.active');
        $openli.children('.nav-open').slideUp();
        $openli.removeClass('active');
        $maskBg.removeClass('show').css('visibility', 'hidden');
    });

    $('.popup-icon').click(function() {
        $('.popup-service').fadeIn();
    });
    $('.btn-close-service').click(function() {
        $('.popup-service').fadeOut();
    });

    $('.footer-nav h3').click(function() {
        if (window.innerWidth > breakpoint1200) {
            return false;
        }
    });

    var region = $("#hidRegionName").val();
    var regionLink = $("#worldwide a[href='/" + region + "/']");
    regionLink.closest("li").addClass("active");
    regionLink.closest("li").prepend("<span class=\"iconfont icon-arrow-right\"></span>");

    // fix r6 server link
    $("a[href*='corporate/home']").each(function(i, o) {
        $(o).attr("href", $(o).attr("href").replace(/\/corporate\/home/i, ""));
    });

    // 解决IE下背景视频自动播放,video标签需加class js-video-autoplay

    var $videoAutoplay = $("video.js-video-autoplay");
    if ($videoAutoplay.length)
        $videoAutoplay.get(0).play();

    // fixed bottom wechat follow popup
    $(document).on("click", ".js-wechat-follow", function(e) {
        e.preventDefault();
        $(this).find('.wechat-qrcode').toggleClass('show');
    }).on('click', ".wechat-qrcode .share-close", function(e) {
        e.preventDefault();
        $(this).closest('.wechat-qrcode').removeClass('show');
    });
});

function clearPage() {
    var url = location.href;
    var ret = /&/;
    var pattern1 = /(\?)page=([^&]*)/gi;
    try {
        if (ret.test(url)) {
            if (pattern1.test(url)) {
                url = url.replace(/page=([^&]*)(&)/gi, '');
            } else {
                url = url.replace(/(&)page=([^&]*)/gi, '');
            }
        } else {
            url = url.replace(/(\?)page=([^&]*)/gi, '');
        }
        history.pushState('', document.title, url);
    } catch (e) {
    }
}

// 非中文版 cookie 提示
commonModule.browsehappy = function browsehappy() {
    var currentUrl = window.location.pathname;
    var browsehappyCache = $.Cache.get('browsehappy');
    var hideCache = function() {
        $.Cache.set('browsehappy', 'browsehappy', 365);
    };

    if (currentUrl.indexOf("cn") != 1) {
        $(document).on("click", '.browsehappy a.close', function(e) {
            $(this).closest('.browsehappy').slideUp(hideCache);
        });
        try {
            if (!browsehappyCache || (new Date(browsehappyCache.expire) - new Date() <= 0)) {
                $.Cache.del('browsehappy');
                $('.browsehappy').slideDown();
                hideCache();
                history.scrollRestoration = 'manual'
                $('html,body').animate({
                    scrollTop: 0
                }, 'fast');
            } else {
                history.scrollRestoration = 'auto'
            }
        } catch (_e) {}
    }
}
;
commonModule.GetUserNameInfo = function GetUserNameInfo(Cookies) {
    try {
        // 登陆注销链接协议判断
        if (location.protocol == "https:") {
            $(".top-nav a[data-id='{E48CF523-1FCA-446D-AD7E-B07CCF967A8E}'], " + ".top-nav a[data-id='{BDDE876F-D975-4EDE-B534-33EDF05110B0}']").each(function(i, o) {
                var $t = $(this);
                $t.attr("href", $t.attr("href").replace(/(redi(?:rect|url)=http)(%3a)/ig, "$1s$2"));
            });
        }
    } catch (e) {}
    var vIsUidLogin = Cookies.get("uid");
    var IsLogin = Cookies.get("hwsso_uniportal");
    var IsBackLogin = Cookies.get("login_uid");
    // 后台登录
    var userStatusUrl = $("#hidUserStatusUrl").val();
    if (userStatusUrl != "")
        userStatusUrl += "?action=userstate&currentUrl=" + encodeURIComponent(window.location);
    var hasLogin = function() {
        return Boolean(IsLogin) || Boolean(IsBackLogin) || Boolean(vIsUidLogin);
    };

    $.ajax({
        url: userStatusUrl,
        type: "GET",
        dataType: "json",
        cache: false,
        async: false
    }).then(function(result) {
        if (result && result.Stats == true) {
            $(".top-nav a[data-id='{3F052E96-2CC6-49C4-AE8B-91CAF8F53CD9}']").css("display", "");
            $(".top-nav a[data-id='{E48CF523-1FCA-446D-AD7E-B07CCF967A8E}']").css("display", "");
            $(".top-nav a[data-id='{BDDE876F-D975-4EDE-B534-33EDF05110B0}']").css("display", "none");
        } else {
            $(".top-nav a[data-id='{3F052E96-2CC6-49C4-AE8B-91CAF8F53CD9}']").css("display", "none");
            $(".top-nav a[data-id='{E48CF523-1FCA-446D-AD7E-B07CCF967A8E}']").css("display", "none");
            $(".top-nav a[data-id='{BDDE876F-D975-4EDE-B534-33EDF05110B0}']").css("display", "");
        }
    }).fail(function(result) {
        $(".top-nav a[data-id='{3F052E96-2CC6-49C4-AE8B-91CAF8F53CD9}']").css("display", "none");
        $(".top-nav a[data-id='{E48CF523-1FCA-446D-AD7E-B07CCF967A8E}']").css("display", "none");
        $(".top-nav a[data-id='{BDDE876F-D975-4EDE-B534-33EDF05110B0}']").css("display", "");
        $("#logout_mob").css("display", "none");
        $("#myhuawei_mob").css("display", "none");
    });

    $(".top-nav a[data-id='{3F052E96-2CC6-49C4-AE8B-91CAF8F53CD9}']").css("display", "none");
    $(".top-nav a[data-id='{E48CF523-1FCA-446D-AD7E-B07CCF967A8E}']").css("display", "none");
    $(".top-nav a[data-id='{BDDE876F-D975-4EDE-B534-33EDF05110B0}']").css("display", "");
}
;
// 欧洲站点外链跳转
function isExternallink() {
    if ($("#hidRedirect").length > 0 && $("#hidRedirect").val() == "1") {
        if ($('.redirectBox .goSite').length > 0) {
            var url = window.location.href
            var searchValue = decodeURIComponent(url).split("?redirect_token=")[1]
            $('.searchUrltext').html(searchValue)
            $('.goSite').attr('href', searchValue)
        }
        $(document).on('click', 'a', function(e) {
            let target = e.target
            if ($(this).attr('href') === 'javacript:;' || $(this).attr('href') === '#' || target.closest('#worldwide'))
                return
            if ($(this).parents().closest('.top-nav-height').length < 1 && $(this)[0].href && !$(this).hasClass('goSite') && !$(this).attr('data-target') && $(this)[0].href.indexOf('javascript') == -1 && $(this)[0].href.indexOf('mailto:') == -1 && $(this)[0].href.indexOf('tel:') == -1) {
                var regionLanage = $("#hidRegionName").val()
                var prevUrl = window.location.origin + '/' + regionLanage
                var redirectRulusurl = decodeURIComponent($("#hidRedirectRulus").val()).split('|')
                var redirectUrl = ''
                redirectRulusurl.forEach(i=>{
                    if ($(this)[0].href.indexOf(i.replace(/\{lang\}/g, regionLanage)) !== -1) {
                        redirectUrl = i.replace(/\{lang\}/g, regionLanage)
                    }
                }
                )
                if (!redirectUrl && regionLanage) {
                    e.preventDefault();
                    window.open(prevUrl + '/redirect?redirect_token=' + encodeURIComponent($(this)[0].href), '_blank')
                }
            }
        })
    }
}
isExternallink();
// 底部tab
$('.footer-nav h3[data-toggle="collapse"]').on('click', function() {
    $('.affix-placeholder .point-content-nav .navbar-collapse.collapse').removeClass('in')
})
// 顶部tab
$(document).on('click', '.affix-placeholder .main-subnav .nav-box .name.collapsed', function() {
    $('.affix-placeholder .point-content-nav .navbar-collapse.collapse').removeClass('in')

    $('.footer-nav h3[data-toggle="collapse"]').siblings('.navbar-collapse').removeClass('in')
    $('.footer-nav h3[data-toggle="collapse"]').addClass('collapsed')
})
// 中间tab
$(document).on('click', '.affix-placeholder .point-content-nav-active', function() {
    if ($('.affix-placeholder .main-subnav .nav-box .navbar-collapse.collapse').length) {
        $('.affix-placeholder .main-subnav .nav-box .navbar-collapse.collapse').removeClass('in')
        $('.affix-placeholder .main-subnav .nav-box .name').addClass('collapsed')
        $('.affix-placeholder .main-subnav .nav-box .name').attr('aria-expanded', false)
    }
    $('.footer-nav h3[data-toggle="collapse"]').siblings('.navbar-collapse').removeClass('in')
    $('.footer-nav h3[data-toggle="collapse"]').addClass('collapsed')
})
// 分页器
$(document).on('click', '.page-list-box .page-list a', function() {
    if ($(this).attr('v') && $(this).attr('v') === 'disabled')
        return;
    if ($('.affix-placeholder .main-subnav .nav-box .navbar-collapse').length) {
        $('.affix-placeholder .main-subnav .nav-box .navbar-collapse.collapse').removeClass('in')
        $('.affix-placeholder .main-subnav .nav-box .name').addClass('collapsed')
        $('.affix-placeholder .main-subnav .nav-box .name').attr('aria-expanded', false)
    }
})
// 表格宽度超过加样式、提示
function tableScroll() {
    $(".table-report-over table").each(function() {
        var $t = $(this);
        var $p = $t.parent();
        if ($p.prop("clientWidth") < $p.prop("scrollWidth")) {
            $p.addClass("table-report-over-mb");
            $p.next(".table-instruction").addClass("show");
        } else {
            $p.removeClass("table-report-over-mb");
            $p.next(".table-instruction").removeClass("show");
        }
    });
}

tableScroll();

$(window).resize(tableScroll);
// The build will inline common dependencies into this file.
requirejs.config({
    waitSeconds: 0,
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
    }
});

//
var jquery_cdn = /msie [6-8]/i.test(navigator.userAgent) ? 'https://cdn.jsdelivr.net/npm/jquery@1.12.2/dist/jquery.min' : 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min';
var _r = require;
_r.config({
    baseUrl: location.pathname.replace(/\/.*/, '/') + 'js/lib',
    paths: {// jquery: jquery_cdn
    },
});
define('./common', ['require', ], function(require) {
    return require;
});

window.jQuery && (window.jQuery.loadJS = window.jQuery.loadScript = (function() {
    var loaded = {};

    return function(url, options) {
        var deferred = new jQuery.Deferred();

        if (loaded[url])
            return loaded[url];
        // Allow user to set any option except for dataType, cache, and url
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url,
        });
        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        if (typeof require === "function") {
            require([url], function(r) {
                deferred.resolve(r);
            });
            loaded[url] = deferred.promise();
        } else
            loaded[url] = $.ajax(options);
        return loaded[url];
    }
    ;
}()));

window.jQuery && (window.jQuery.loadCSS = (function() {
    var loaded = {};
    return function(url, options) {
        if (loaded[url]) {
            return loaded[url];
        }

        loaded[url] = true;
        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        $('<link rel="stylesheet" href="' + url + '">').prependTo('head');
        return loaded[url];
    }
    ;
}()));

define('jquery', [], function() {
    return window.jQuery;
});

// html标签增加特定class, attribute，限定样式，兼容浏览器用
document.documentElement.className += ' ie' + document.documentMode;
document.documentElement.setAttribute("data-userAgent", navigator.userAgent);
document.documentElement.setAttribute("data-url", document.URL);

require(["app/common"]);

define("../common", function() {});
