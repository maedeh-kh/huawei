//tealium universal tag - utag.loader ut4.0.202412100235, Copyright 2024 Tealium.com Inc. All Rights Reserved.
var utag_condload = false;
window.__tealium_twc_switch = false;
try {
    try {
        utag_cfg_ovrd = window.utag_cfg_ovrd || {};
        var script = document.currentScript || document.querySelector('script[src*="utag.js"]');
        var script_src = script.src;
        var start = script_src.indexOf("//tags.");
        var end = script_src.indexOf("utag.js");
        utag_cfg_ovrd.path = script_src.substring(start, end);
    } catch (e) {
        console.log(e)
    }
} catch (e) {
    console.log(e);
}
if (!utag_condload) {
    try {
        try {
            window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
            window.utag_cfg_ovrd.dom_complete = true;
        } catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e);
    }
}
if (!utag_condload) {
    try {
        try {
            currentURL = window.location.pathname;
            list = [{
                '/at': 'de-at'
            }, {
                '/be-fr': 'fr'
            }, {
                '/be': 'nl'
            }, {
                '/bg': 'bg'
            }, {
                '/ch-fr': 'fr'
            }, {
                '/ch-en': 'en'
            }, {
                '/ch-de': 'de'
            }, {
                '/ch-it': 'it'
            }, {
                '/ch': 'de'
            }, {
                '/cz': 'cs'
            }, {
                '/de': 'de'
            }, {
                '/en': 'en'
            }, {
                '/es': 'es'
            }, {
                '/eu': 'en'
            }, {
                '/fr': 'fr'
            }, {
                '/gr': 'el-gr'
            }, {
                '/hr': 'hr'
            }, {
                '/hu': 'hu'
            }, {
                '/ie': 'en'
            }, {
                '/it': 'it'
            }, {
                '/nl': 'nl'
            }, {
                '/pl': 'pl'
            }, {
                '/pt': 'pt'
            }, {
                '/ro': 'ro'
            }, {
                '/se': 'sv'
            }, {
                '/sk': 'sk'
            }, {
                '/th': 'th'
            }, {
                '/tr': 'tr'
            }, {
                '/ua': 'uk'
            }, {
                '/uk': 'en'
            }, {
                '/vn': 'vi'
            }, {
                '/topic/hce/en/index.html': 'en'
            }, {
                'minisite/seeds-for-the-future-weu': 'en'
            }, {
                '/en/form/mwc2022': 'en'
            }, {
                'en/special_topic/product/enterprise-network/DCIS-2022': 'en'
            }, {
                'OnlineForm/register/651212609/register.html': 'en'
            }, {
                'topic/2023-idi-forum-storage': 'en'
            }, {
                '/topic/eu-event-huawei-network-summit-2023/de/': 'de'
            }, {
                '/topic/eu-event-huawei-network-summit-2023/eu/': 'en'
            }];
            var m = false;
            for (e = 0; e < list.length; e++) {
                for (f in list[e]) {
                    var regex = new RegExp('^' + f);
                    if (regex.test(currentURL.toString())) {
                        utag_data = window.utag_data || {};
                        utag_data['consentmgr_lang'] = list[e][f];
                        window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
                        window.utag_cfg_ovrd.gdprDLRef = 'consentmgr_lang';
                        m = true
                    }
                    ;
                }
                ;if (m)
                    break
            }
            ;
        } catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e);
    }
}
if (!utag_condload) {
    try {
        try {
            if (document.URL.match(/\.huawei.com\/ie/i)) {
                window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
                window.utag_cfg_ovrd.consentPeriod = 180;
            }
        } catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e);
    }
}
if (typeof utag == "undefined" && !utag_condload) {
    var utag = {
        id: "huawei.main",
        o: {},
        sender: {},
        send: {},
        rpt: {
            ts: {
                a: new Date()
            }
        },
        dbi: [],
        db_log: [],
        loader: {
            q: [],
            lc: 0,
            f: {},
            p: 0,
            ol: 0,
            wq: [],
            lq: [],
            bq: {},
            bk: {},
            rf: 0,
            ri: 0,
            rp: 0,
            rq: [],
            ready_q: [],
            sendq: {
                "pending": 0
            },
            run_ready_q: function() {
                for (var i = 0; i < utag.loader.ready_q.length; i++) {
                    utag.DB("READY_Q:" + i);
                    try {
                        utag.loader.ready_q[i]()
                    } catch (e) {
                        utag.DB(e)
                    }
                    ;
                }
            },
            lh: function(a, b, c) {
                a = "" + location.hostname;
                b = a.split(".");
                c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\.|\...\.jp$/.test(a)) ? 3 : 2;
                return b.splice(b.length - c, c).join(".");
            },
            WQ: function(a, b, c, d, g) {
                utag.DB('WQ:' + utag.loader.wq.length);
                try {
                    if (utag.udoname && utag.udoname.indexOf(".") < 0) {
                        utag.ut.merge(utag.data, window[utag.udoname], 0);
                    }
                    if (utag.cfg.load_rules_at_wait) {
                        utag.handler.LR(utag.data);
                    }
                } catch (e) {
                    utag.DB(e)
                }
                ;d = 0;
                g = [];
                for (a = 0; a < utag.loader.wq.length; a++) {
                    b = utag.loader.wq[a];
                    b.load = utag.loader.cfg[b.id].load;
                    if (b.load == 4) {
                        this.f[b.id] = 0;
                        utag.loader.LOAD(b.id)
                    } else if (b.load > 0) {
                        g.push(b);
                        d++;
                    } else {
                        this.f[b.id] = 1;
                    }
                }
                for (a = 0; a < g.length; a++) {
                    utag.loader.AS(g[a]);
                }
                if (d == 0) {
                    utag.loader.END();
                }
            },
            AS: function(a, b, c, d) {
                utag.send[a.id] = a;
                if (typeof a.src == 'undefined' || !utag.ut.hasOwn(a, 'src')) {
                    a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
                }
                a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v ? utag.cfg.template + a.v : utag.cfg.v);
                utag.rpt['l_' + a.id] = a.src;
                b = document;
                this.f[a.id] = 0;
                if (a.load == 2) {
                    utag.DB("Attach sync: " + a.src);
                    a.uid = a.id;
                    b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
                    if (typeof a.cb != 'undefined')
                        a.cb();
                } else if (a.load == 1 || a.load == 3) {
                    if (b.createElement) {
                        c = 'utag_huawei.main_' + a.id;
                        if (!b.getElementById(c)) {
                            d = {
                                src: a.src,
                                id: c,
                                uid: a.id,
                                loc: a.loc
                            }
                            if (a.load == 3) {
                                d.type = "iframe"
                            }
                            ;if (typeof a.cb != 'undefined')
                                d.cb = a.cb;
                            utag.ut.loader(d);
                        }
                    }
                }
            },
            GV: function(a, b, c) {
                b = {};
                for (c in a) {
                    if (a.hasOwnProperty(c) && typeof a[c] != "function")
                        b[c] = a[c];
                }
                return b
            },
            OU: function(tid, tcat, a, b, c, d, f, g) {
                g = {};
                utag.loader.RDcp(g);
                try {
                    if (typeof g['cp.OPTOUTMULTI'] != 'undefined') {
                        c = utag.loader.cfg;
                        a = utag.ut.decode(g['cp.OPTOUTMULTI']).split('|');
                        for (d = 0; d < a.length; d++) {
                            b = a[d].split(':');
                            if (b[1] * 1 !== 0) {
                                if (b[0].indexOf('c') == 0) {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tcat == b[0].substring(1))
                                            c[f].load = 0;
                                        if (c[f].tid == tid && c[f].tcat == b[0].substring(1))
                                            return true;
                                    }
                                    if (tcat == b[0].substring(1))
                                        return true;
                                } else if (b[0] * 1 == 0) {
                                    utag.cfg.nocookie = true
                                } else {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tid == b[0])
                                            c[f].load = 0
                                    }
                                    if (tid == b[0])
                                        return true;
                                }
                            }
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
                return false;
            },
            RDdom: function(o) {
                var d = document || {}
                  , l = location || {};
                o["dom.referrer"] = d.referrer;
                o["dom.title"] = "" + d.title;
                o["dom.domain"] = "" + l.hostname;
                o["dom.query_string"] = ("" + l.search).substring(1);
                o["dom.hash"] = ("" + l.hash).substring(1);
                o["dom.url"] = "" + d.URL;
                o["dom.pathname"] = "" + l.pathname;
                o["dom.viewport_height"] = window.innerHeight || (d.documentElement ? d.documentElement.clientHeight : 960);
                o["dom.viewport_width"] = window.innerWidth || (d.documentElement ? d.documentElement.clientWidth : 960);
            },
            RDcp: function(o, b, c, d) {
                b = utag.loader.RC();
                for (d in b) {
                    if (d.match(/utag_(.*)/)) {
                        for (c in utag.loader.GV(b[d])) {
                            o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
                        }
                    }
                }
                for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
                    if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined")
                        o["cp." + c] = b[c];
                }
            },
            RDqp: function(o, a, b, c) {
                a = location.search + (location.hash + '').replace("#", "&");
                if (utag.cfg.lowerqp) {
                    a = a.toLowerCase()
                }
                ;if (a.length > 1) {
                    b = a.substring(1).split('&');
                    for (a = 0; a < b.length; a++) {
                        c = b[a].split("=");
                        if (c.length > 1) {
                            o["qp." + c[0]] = utag.ut.decode(c[1])
                        }
                    }
                }
            },
            RDmeta: function(o, a, b, h) {
                a = document.getElementsByTagName("meta");
                for (b = 0; b < a.length; b++) {
                    try {
                        h = a[b].name || a[b].getAttribute("property") || "";
                    } catch (e) {
                        h = "";
                        utag.DB(e)
                    }
                    ;if (utag.cfg.lowermeta) {
                        h = h.toLowerCase()
                    }
                    ;if (h != "") {
                        o["meta." + h] = a[b].content
                    }
                }
            },
            RDva: function(o) {
                var readAttr = function(o, l) {
                    var a = "", b;
                    a = localStorage.getItem(l);
                    if (!a || a == "{}")
                        return;
                    b = utag.ut.flatten({
                        va: JSON.parse(a)
                    });
                    utag.ut.merge(o, b, 1);
                }
                try {
                    readAttr(o, "tealium_va");
                    readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"]);
                } catch (e) {
                    utag.DB(e)
                }
            },
            RDut: function(o, a) {
                var t = {};
                var d = new Date();
                var m = (utag.ut.typeOf(d.toISOString) == "function");
                o["ut.domain"] = utag.cfg.domain;
                o["ut.version"] = utag.cfg.v;
                t["tealium_event"] = o["ut.event"] = a || "view";
                t["tealium_visitor_id"] = o["ut.visitor_id"] = o["cp.utag_main_v_id"];
                t["tealium_session_id"] = o["ut.session_id"] = o["cp.utag_main_ses_id"];
                t["tealium_session_number"] = o["cp.utag_main__sn"];
                t["tealium_session_event_number"] = o["cp.utag_main__se"];
                try {
                    t["tealium_datasource"] = utag.cfg.datasource;
                    t["tealium_account"] = o["ut.account"] = utag.cfg.utid.split("/")[0];
                    t["tealium_profile"] = o["ut.profile"] = utag.cfg.utid.split("/")[1];
                    t["tealium_environment"] = o["ut.env"] = "prod";
                } catch (e) {
                    utag.DB(e)
                }
                t["tealium_random"] = Math.random().toFixed(16).substring(2);
                t["tealium_library_name"] = "ut" + "ag.js";
                t["tealium_library_version"] = (utag.cfg.template + "0").substring(2);
                t["tealium_timestamp_epoch"] = Math.floor(d.getTime() / 1000);
                t["tealium_timestamp_utc"] = (m ? d.toISOString() : "");
                d.setHours(d.getHours() - (d.getTimezoneOffset() / 60));
                t["tealium_timestamp_local"] = (m ? d.toISOString().replace("Z", "") : "");
                utag.ut.merge(o, t, 0);
            },
            RDses: function(o, a, c) {
                a = (new Date()).getTime();
                c = (a + parseInt(utag.cfg.session_timeout)) + "";
                if (!o["cp.utag_main_ses_id"]) {
                    o["cp.utag_main_ses_id"] = a + "";
                    o["cp.utag_main__ss"] = "1";
                    o["cp.utag_main__se"] = "1";
                    o["cp.utag_main__sn"] = (1 + parseInt(o["cp.utag_main__sn"] || 0)) + "";
                } else {
                    o["cp.utag_main__ss"] = "0";
                    o["cp.utag_main__se"] = (1 + parseInt(o["cp.utag_main__se"] || 0)) + "";
                }
                o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
                o["cp.utag_main__st"] = c;
                utag.loader.SC("utag_main", {
                    "_sn": (o["cp.utag_main__sn"] || 1),
                    "_se": o["cp.utag_main__se"],
                    "_ss": o["cp.utag_main__ss"],
                    "_st": c,
                    "ses_id": (o["cp.utag_main_ses_id"] || a) + ";exp-session",
                    "_pn": o["cp.utag_main__pn"] + ";exp-session"
                });
            },
            RDpv: function(o) {
                if (typeof utag.pagevars == "function") {
                    utag.DB("Read page variables");
                    utag.pagevars(o);
                }
            },
            RDlocalStorage: function(o) {
                if (utag.cfg.ignoreLocalStorage) {
                    return;
                }
                Object.keys(window.localStorage).forEach(function(localStorageKey) {
                    o["ls." + localStorageKey] = window.localStorage[localStorageKey];
                });
            },
            RDsessionStorage: function(o) {
                if (utag.cfg.ignoreSessionStorage) {
                    return;
                }
                Object.keys(window.sessionStorage).forEach(function(sessionStorageKey) {
                    o["ss." + sessionStorageKey] = window.sessionStorage[sessionStorageKey];
                });
            },
            RD: function(o, a) {
                utag.DB("utag.loader.RD");
                utag.DB(o);
                utag.loader.RDcp(o);
                if (!utag.loader.rd_flag) {
                    utag.loader.rd_flag = 1;
                    o["cp.utag_main_v_id"] = o["cp.utag_main_v_id"] || utag.ut.vi((new Date()).getTime());
                    o["cp.utag_main__pn"] = (1 + parseInt(o["cp.utag_main__pn"] || 0)) + "";
                    utag.loader.SC("utag_main", {
                        "v_id": o["cp.utag_main_v_id"]
                    });
                    utag.loader.RDses(o);
                }
                if (a && !utag.cfg.noview)
                    utag.loader.RDses(o);
                utag.loader.RDqp(o);
                utag.loader.RDmeta(o);
                utag.loader.RDdom(o);
                utag.loader.RDut(o, a || "view");
                utag.loader.RDpv(o);
                utag.loader.RDva(o);
                utag.loader.RDlocalStorage(o);
                utag.loader.RDsessionStorage(o);
            },
            RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
                o = {};
                b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
                r = /^(.*?)=(.*)$/;
                s = /^(.*);exp-(.*)$/;
                t = (new Date()).getTime();
                for (c = 0; c < b.length; c++) {
                    if (b[c].match(r)) {
                        ck = RegExp.$1;
                        cv = RegExp.$2;
                    }
                    e = utag.ut.decode(cv);
                    if (typeof ck != "undefined") {
                        if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
                            e = cv.split("$");
                            g = [];
                            j = {};
                            for (f = 0; f < e.length; f++) {
                                try {
                                    g = e[f].split(":");
                                    if (g.length > 2) {
                                        g[1] = g.slice(1).join(":");
                                    }
                                    v = "";
                                    if (("" + g[1]).indexOf("~") == 0) {
                                        h = g[1].substring(1).split("|");
                                        for (i = 0; i < h.length; i++)
                                            h[i] = utag.ut.decode(h[i]);
                                        v = h
                                    } else
                                        v = utag.ut.decode(g[1]);
                                    j[g[0]] = v;
                                } catch (er) {
                                    utag.DB(er)
                                }
                                ;
                            }
                            o[ck] = {};
                            for (f in utag.loader.GV(j)) {
                                if (utag.ut.typeOf(j[f]) == "array") {
                                    n = [];
                                    for (m = 0; m < j[f].length; m++) {
                                        if (j[f][m].match(s)) {
                                            k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                            if (k > t)
                                                n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                                        }
                                    }
                                    j[f] = n.join("|");
                                } else {
                                    j[f] = "" + j[f];
                                    if (j[f].match(s)) {
                                        k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                        j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                                    }
                                }
                                if (j[f])
                                    o[ck][f] = j[f];
                            }
                        } else if (utag.cl[ck] || utag.cl['_all_']) {
                            o[ck] = e
                        }
                    }
                }
                return (a) ? (o[a] ? o[a] : {}) : o;
            },
            SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
                if (!a)
                    return 0;
                if (a == "utag_main" && utag.cfg.nocookie)
                    return 0;
                v = "";
                var date = new Date();
                var exp = new Date();
                exp.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
                x = exp.toGMTString();
                if (c && c == "da") {
                    x = "Thu, 31 Dec 2009 00:00:00 GMT";
                } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
                    if (typeof b != "object") {
                        v = b
                    }
                } else {
                    d = utag.loader.RC(a, 0);
                    for (e in utag.loader.GV(b)) {
                        f = "" + b[e];
                        if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
                            g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
                            if (RegExp.$3 == "u")
                                g = parseInt(RegExp.$2);
                            f = RegExp.$1 + ";exp-" + g;
                        }
                        if (c == "i") {
                            if (d[e] == null)
                                d[e] = f;
                        } else if (c == "d")
                            delete d[e];
                        else if (c == "a")
                            d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
                        else if (c == "ap" || c == "au") {
                            if (d[e] == null)
                                d[e] = f;
                            else {
                                if (d[e].indexOf("|") > 0) {
                                    d[e] = d[e].split("|")
                                }
                                g = (utag.ut.typeOf(d[e]) == "array") ? d[e] : [d[e]];
                                g.push(f);
                                if (c == "au") {
                                    h = {};
                                    k = {};
                                    for (i = 0; i < g.length; i++) {
                                        if (g[i].match(/^(.*);exp-(.*)$/)) {
                                            j = RegExp.$1;
                                        }
                                        if (typeof k[j] == "undefined") {
                                            k[j] = 1;
                                            h[g[i]] = 1;
                                        }
                                    }
                                    g = [];
                                    for (i in utag.loader.GV(h)) {
                                        g.push(i);
                                    }
                                }
                                d[e] = g
                            }
                        } else
                            d[e] = f;
                    }
                    h = new Array();
                    for (g in utag.loader.GV(d)) {
                        if (utag.ut.typeOf(d[g]) == "array") {
                            for (c = 0; c < d[g].length; c++) {
                                d[g][c] = encodeURIComponent(d[g][c])
                            }
                            h.push(g + ":~" + d[g].join("|"))
                        } else
                            h.push((g + ":").replace(/[\,\$\;\?]/g, "") + encodeURIComponent(d[g]))
                    }
                    if (h.length == 0) {
                        h.push("");
                        x = ""
                    }
                    v = (h.join("$"));
                }
                document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x + (utag.cfg.secure_cookie ? ";secure" : "");
                return 1
            },
            LOAD: function(a, b, c, d) {
                if (!utag.loader.cfg) {
                    return
                }
                if (this.ol == 0) {
                    if (utag.loader.cfg[a].block && utag.loader.cfg[a].cbf) {
                        this.f[a] = 1;
                        delete utag.loader.bq[a];
                    }
                    for (b in utag.loader.GV(utag.loader.bq)) {
                        if (utag.loader.cfg[a].load == 4 && utag.loader.cfg[a].wait == 0) {
                            utag.loader.bk[a] = 1;
                            utag.DB("blocked: " + a);
                        }
                        utag.DB("blocking: " + b);
                        return;
                    }
                    utag.loader.INIT();
                    return;
                }
                utag.DB('utag.loader.LOAD:' + a);
                if (this.f[a] == 0) {
                    this.f[a] = 1;
                    if (utag.cfg.noview != true) {
                        if (utag.loader.cfg[a].send) {
                            utag.DB("SENDING: " + a);
                            try {
                                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                                    utag.DB("utag.loader.LOAD:sendq: " + a);
                                    while (d = utag.loader.sendq[a].shift()) {
                                        utag.DB(d);
                                        utag.sender[a].send(d.event, utag.handler.C(d.data));
                                        utag.loader.sendq.pending--;
                                    }
                                } else {
                                    utag.sender[a].send('view', utag.handler.C(utag.data));
                                }
                                utag.rpt['s_' + a] = 0;
                            } catch (e) {
                                utag.DB(e);
                                utag.rpt['s_' + a] = 1;
                            }
                        }
                    }
                    if (utag.loader.rf == 0)
                        return;
                    for (b in utag.loader.GV(this.f)) {
                        if (this.f[b] == 0 || this.f[b] == 2)
                            return
                    }
                    utag.loader.END();
                }
            },
            EV: function(a, b, c, d) {
                if (b == "ready") {
                    if (!utag.data) {
                        try {
                            utag.cl = {
                                '_all_': 1
                            };
                            utag.loader.initdata();
                            utag.loader.RD(utag.data);
                        } catch (e) {
                            utag.DB(e)
                        }
                        ;
                    }
                    if ((document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading")
                        setTimeout(c, 1);
                    else {
                        utag.loader.ready_q.push(c);
                        var RH;
                        if (utag.loader.ready_q.length <= 1) {
                            if (document.addEventListener) {
                                RH = function() {
                                    document.removeEventListener("DOMContentLoaded", RH, false);
                                    utag.loader.run_ready_q()
                                }
                                ;
                                if (!utag.cfg.dom_complete)
                                    document.addEventListener("DOMContentLoaded", RH, false);
                                window.addEventListener("load", utag.loader.run_ready_q, false);
                            } else if (document.attachEvent) {
                                RH = function() {
                                    if (document.readyState === "complete") {
                                        document.detachEvent("onreadystatechange", RH);
                                        utag.loader.run_ready_q()
                                    }
                                }
                                ;
                                document.attachEvent("onreadystatechange", RH);
                                window.attachEvent("onload", utag.loader.run_ready_q);
                            }
                        }
                    }
                } else {
                    if (a.addEventListener) {
                        a.addEventListener(b, c, false)
                    } else if (a.attachEvent) {
                        a.attachEvent(((d == 1) ? "" : "on") + b, c)
                    }
                }
            },
            END: function(b, c, d, e, v, w) {
                if (this.ended) {
                    return
                }
                ;this.ended = 1;
                utag.DB("loader.END");
                b = utag.data;
                if (utag.handler.base && utag.handler.base != '*') {
                    e = utag.handler.base.split(",");
                    for (d = 0; d < e.length; d++) {
                        if (typeof b[e[d]] != "undefined")
                            utag.handler.df[e[d]] = b[e[d]]
                    }
                } else if (utag.handler.base == '*') {
                    utag.ut.merge(utag.handler.df, b, 1);
                }
                utag.rpt['r_0'] = "t";
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
                utag.rpt.ts['s'] = new Date();
                v = utag.cfg.path;
                w = v.indexOf(".tiqcdn.");
                if (w > 0 && b["cp.utag_main__ss"] == 1 && !utag.cfg.no_session_count)
                    utag.ut.loader({
                        src: v.substring(0, v.indexOf("/ut" + "ag/") + 6) + "tiqapp/ut" + "ag.v.js?a=" + utag.cfg.utid + (utag.cfg.nocookie ? "&nocookie=1" : "&cb=" + (new Date).getTime()),
                        id: "tiqapp"
                    })
                if (utag.cfg.noview != true)
                    utag.handler.RE('view', b, "end");
                utag.handler.INIT();
            }
        },
        DB: function(a, b) {
            if (utag.cfg.utagdb === false) {
                return;
            } else if (typeof utag.cfg.utagdb == "undefined") {
                b = document.cookie + '';
                utag.cfg.utagdb = ((b.indexOf('utagdb=true') >= 0) ? true : false);
            }
            if (utag.cfg.utagdb === true) {
                var t;
                if (utag.ut.typeOf(a) == "object") {
                    t = utag.handler.C(a)
                } else {
                    t = a
                }
                utag.db_log.push(t);
                try {
                    if (!utag.cfg.noconsole)
                        console.log(t)
                } catch (e) {}
            }
        },
        RP: function(a, b, c) {
            if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
                b = [];
                for (c in utag.loader.GV(a)) {
                    if (c != 'src')
                        b.push(c + '=' + escape(a[c]))
                }
                this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
            }
        },
        view: function(a, c, d) {
            return this.track({
                event: 'view',
                data: a || {},
                cfg: {
                    cb: c,
                    uids: d
                }
            })
        },
        link: function(a, c, d) {
            return this.track({
                event: 'link',
                data: a || {},
                cfg: {
                    cb: c,
                    uids: d
                }
            })
        },
        track: function(a, b, c, d, e) {
            a = a || {};
            if (typeof a == "string") {
                a = {
                    event: a,
                    data: b || {},
                    cfg: {
                        cb: c,
                        uids: d
                    }
                }
            }
            for (e in utag.loader.GV(utag.o)) {
                utag.o[e].handler.trigger(a.event || "view", a.data || a, a.cfg || {
                    cb: b,
                    uids: c
                })
            }
            a.cfg = a.cfg || {
                cb: b
            };
            if (typeof a.cfg.cb == "function")
                a.cfg.cb();
            return true
        },
        handler: {
            base: "",
            df: {},
            o: {},
            send: {},
            iflag: 0,
            INIT: function(a, b, c) {
                utag.DB('utag.handler.INIT');
                if (utag.initcatch) {
                    utag.initcatch = 0;
                    return
                }
                this.iflag = 1;
                a = utag.loader.q.length;
                if (a > 0) {
                    utag.DB("Loader queue");
                    for (b = 0; b < a; b++) {
                        c = utag.loader.q[b];
                        utag.handler.trigger(c.a, c.b, c.c)
                    }
                }
            },
            test: function() {
                return 1
            },
            LR: function(b) {
                utag.DB("Load Rules");
                for (var d in utag.loader.GV(utag.cond)) {
                    utag.cond[d] = false;
                }
                utag.DB(b);
                utag.loader.loadrules(b);
                utag.DB(utag.cond);
                utag.loader.initcfg();
                utag.loader.OU();
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
            },
            RE: function(a, b, c, d, e, f, g) {
                if (c != "alr" && !this.cfg_extend) {
                    return 0;
                }
                utag.DB("RE: " + c);
                if (c == "alr")
                    utag.DB("All Tags EXTENSIONS");
                utag.DB(b);
                if (typeof this.extend != "undefined") {
                    g = 0;
                    for (d = 0; d < this.extend.length; d++) {
                        try {
                            e = 0;
                            if (typeof this.cfg_extend != "undefined") {
                                f = this.cfg_extend[d];
                                if (typeof f.count == "undefined")
                                    f.count = 0;
                                if (f[a] == 0 || (f.once == 1 && f.count > 0) || f[c] == 0) {
                                    e = 1
                                } else {
                                    if (f[c] == 1) {
                                        g = 1
                                    }
                                    ;f.count++
                                }
                            }
                            if (e != 1) {
                                this.extend[d](a, b);
                                utag.rpt['ex_' + d] = 0
                            }
                        } catch (er) {
                            utag.DB(er);
                            utag.rpt['ex_' + d] = 1;
                            utag.ut.error({
                                e: er.message,
                                s: utag.cfg.path + 'utag.js',
                                l: d,
                                t: 'ge'
                            });
                        }
                    }
                    utag.DB(b);
                    return g;
                }
            },
            trigger: function(a, b, c, d, e, f) {
                utag.DB('trigger:' + a + (c && c.uids ? ":" + c.uids.join(",") : ""));
                b = b || {};
                utag.DB(b);
                if (!this.iflag) {
                    utag.DB("trigger:called before tags loaded");
                    for (d in utag.loader.f) {
                        if (!(utag.loader.f[d] === 1))
                            utag.DB('Tag ' + d + ' did not LOAD')
                    }
                    utag.loader.q.push({
                        a: a,
                        b: utag.handler.C(b),
                        c: c
                    });
                    return;
                }
                utag.ut.merge(b, this.df, 0);
                utag.loader.RD(b, a);
                utag.cfg.noview = false;
                function sendTag(a, b, d) {
                    try {
                        if (typeof utag.sender[d] != "undefined") {
                            utag.DB("SENDING: " + d);
                            utag.sender[d].send(a, utag.handler.C(b));
                            utag.rpt['s_' + d] = 0;
                        } else if (utag.loader.cfg[d].load != 2) {
                            utag.loader.sendq[d] = utag.loader.sendq[d] || [];
                            utag.loader.sendq[d].push({
                                "event": a,
                                "data": utag.handler.C(b)
                            });
                            utag.loader.sendq.pending++;
                            utag.loader.AS({
                                id: d,
                                load: 1
                            });
                        }
                    } catch (e) {
                        utag.DB(e)
                    }
                }
                if (c && c.uids) {
                    this.RE(a, b, "alr");
                    for (f = 0; f < c.uids.length; f++) {
                        d = c.uids[f];
                        if (!utag.loader.OU(utag.loader.cfg[d].tid)) {
                            sendTag(a, b, d);
                        }
                    }
                } else if (utag.cfg.load_rules_ajax) {
                    this.RE(a, b, "blr");
                    this.LR(b);
                    this.RE(a, b, "alr");
                    for (f = 0; f < utag.loader.cfgsort.length; f++) {
                        d = utag.loader.cfgsort[f];
                        if (utag.loader.cfg[d].load && utag.loader.cfg[d].send) {
                            sendTag(a, b, d);
                        }
                    }
                } else {
                    this.RE(a, b, "alr");
                    for (d in utag.loader.GV(utag.sender)) {
                        sendTag(a, b, d);
                    }
                }
                this.RE(a, b, "end");
            },
            C: function(a, b, c) {
                b = {};
                for (c in utag.loader.GV(a)) {
                    if (utag.ut.typeOf(a[c]) == "array") {
                        b[c] = a[c].slice(0)
                    } else {
                        b[c] = a[c]
                    }
                }
                return b
            }
        },
        ut: {
            pad: function(a, b, c, d) {
                a = "" + ((a - 0).toString(16));
                d = '';
                if (b > a.length) {
                    for (c = 0; c < (b - a.length); c++) {
                        d += '0'
                    }
                }
                return "" + d + a
            },
            vi: function(t, a, b) {
                if (!utag.v_id) {
                    a = this.pad(t, 12);
                    b = "" + Math.random();
                    a += this.pad(b.substring(2, b.length), 16);
                    try {
                        a += this.pad((navigator.plugins.length ? navigator.plugins.length : 0), 2);
                        a += this.pad(navigator.userAgent.length, 3);
                        a += this.pad(document.URL.length, 4);
                        a += this.pad(navigator.appVersion.length, 3);
                        a += this.pad(screen.width + screen.height + parseInt((screen.colorDepth) ? screen.colorDepth : screen.pixelDepth), 5)
                    } catch (e) {
                        utag.DB(e);
                        a += "12345"
                    }
                    ;utag.v_id = a;
                }
                return utag.v_id
            },
            hasOwn: function(o, a) {
                return o != null && Object.prototype.hasOwnProperty.call(o, a)
            },
            isEmptyObject: function(o, a) {
                for (a in o) {
                    if (utag.ut.hasOwn(o, a))
                        return false
                }
                return true
            },
            isEmpty: function(o) {
                var t = utag.ut.typeOf(o);
                if (t == "number") {
                    return isNaN(o)
                } else if (t == "boolean") {
                    return false
                } else if (t == "string") {
                    return o.length === 0
                } else
                    return utag.ut.isEmptyObject(o)
            },
            typeOf: function(e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            },
            flatten: function(o) {
                var a = {};
                function r(c, p) {
                    if (Object(c) !== c || utag.ut.typeOf(c) == "array") {
                        a[p] = c;
                    } else {
                        if (utag.ut.isEmptyObject(c)) {} else {
                            for (var d in c) {
                                r(c[d], p ? p + "." + d : d);
                            }
                        }
                    }
                }
                r(o, "");
                return a;
            },
            merge: function(a, b, c, d) {
                if (c) {
                    for (d in utag.loader.GV(b)) {
                        a[d] = b[d]
                    }
                } else {
                    for (d in utag.loader.GV(b)) {
                        if (typeof a[d] == "undefined")
                            a[d] = b[d]
                    }
                }
            },
            decode: function(a, b) {
                b = "";
                try {
                    b = decodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                }
                ;if (b == "") {
                    b = unescape(a)
                }
                ;return b
            },
            encode: function(a, b) {
                b = "";
                try {
                    b = encodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                }
                ;if (b == "") {
                    b = escape(a)
                }
                ;return b
            },
            error: function(a, b, c) {
                if (typeof utag_err != "undefined") {
                    utag_err.push(a)
                }
            },
            loader: function(o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        m.parentNode.removeChild(m);
                    }
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id
                }
                ;for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l])
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function() {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function() {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        }
                        ;
                    }
                }
                if (typeof o.error == "function") {
                    utag.loader.EV(b, "error", o.error);
                }
                if (o.type != "img") {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b)
                        }
                    }
                }
            }
        }
    };
    utag.o['huawei.main'] = utag;
    utag.cfg = {
        template: "ut4.49.",
        load_rules_ajax: true,
        load_rules_at_wait: false,
        lowerqp: false,
        noconsole: false,
        session_timeout: 1800000,
        readywait: 0,
        noload: 0,
        domain: utag.loader.lh(),
        datasource: "##UTDATASOURCE##".replace("##" + "UTDATASOURCE##", ""),
        secure_cookie: ("##UTSECURECOOKIE##".replace("##" + "UTSECURECOOKIE##", "") === "true") ? true : false,
        path: "//tags.tiqcdn.cn/utag/huawei/main/prod/",
        utid: "huawei/main/202412100234",
        ignoreSessionStorage: false,
        ignoreLocalStorage: false
    };
    utag.cfg.v = utag.cfg.template + "202412100235";
    utag.cond = {
        100: 0,
        108: 0,
        116: 0,
        117: 0,
        118: 0,
        119: 0,
        122: 0,
        126: 0,
        128: 0,
        37: 0,
        3: 0,
        49: 0,
        51: 0,
        55: 0,
        92: 0,
        93: 0,
        95: 0,
        98: 0
    };
    utag.pagevars = function(ud) {
        ud = ud || utag.data;
        try {
            ud['js_page.hypers_eu_id'] = hypers_eu_id
        } catch (e) {
            utag.DB(e)
        }
        ;
    }
    ;
    utag.loader.initdata = function() {
        try {
            utag.data = (typeof utag_data != 'undefined') ? utag_data : {};
            utag.udoname = 'utag_data';
        } catch (e) {
            utag.data = {};
            utag.DB('idf:' + e);
        }
    }
    ;
    utag.loader.loadrules = function(_pd, _pc) {
        var d = _pd || utag.data;
        var c = _pc || utag.cond;
        for (var l in utag.loader.GV(c)) {
            switch (l) {
            case '100':
                try {
                    c[100] |= (/huawei\.com\/(at|be|bg|hr|ch|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|no|uk|li|eu)/.test(d['dom.url']) && d['dom.url'].toString().toLowerCase().indexOf('huawei.com/huaweiconnect'.toLowerCase()) < 0 && /^(www|www1\-back)\.huawei\.com/.test(d['dom.domain'])) || (d['dom.url'].toString().toLowerCase().indexOf('361313442'.toLowerCase()) > -1 && d['dom.domain'].toString().toLowerCase().indexOf('events03.huawei.com'.toLowerCase()) > -1) || (/e\.huawei\.com\/en\/events\/2023\/branding\/mwc|\/en\/about\/privacy\/mwc/.test(d['dom.url']))
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '108':
                try {
                    c[108] |= (typeof d['ga4_measurement_id'] != 'undefined')
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '116':
                try {
                    c[116] |= (d['dom.domain'].toString().toLowerCase().indexOf('myhuawei.huawei.com'.toLowerCase()) > -1)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '117':
                try {
                    c[117] |= (d['userAgent'].toString().toLowerCase().indexOf('bonree'.toLowerCase()) > -1)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '118':
                try {
                    c[118] |= (d['dom.domain'].toString().toLowerCase() == 'digitalpower.huawei.com'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '119':
                try {
                    c[119] |= (d['dom.domain'].toString().toLowerCase() == 'solar.huawei.com'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '122':
                try {
                    c[122] |= (/e.huawei.com\/topic\/[^/]+\/(eu|fr|gr|it|se|at|de|hu|pl|es|cz|tr|ua)/.test(d['dom.url']))
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '126':
                try {
                    c[126] |= (d['dom.domain'].toString().toLowerCase() == 'app.events.huawei.com'.toLowerCase()) || (d['dom.domain'].toString().toLowerCase() == 'app-beta.events.huawei.com'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '128':
                try {
                    c[128] |= (d['dom.domain'].toString().toLowerCase() == 'live.huawei.com'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '3':
                try {
                    c[3] |= (d['dom.domain'].toString().toLowerCase() == 'www.huawei.com'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '37':
                try {
                    c[37] |= (d['dom.url'].toString().indexOf('www.huawei.com/cn') > -1) || (d['dom.url'].toString().indexOf('www.huawei.com/minisite/giv/cn') > -1) || (d['dom.url'].toString().indexOf('www.huawei.com/minisite/gci/cn') > -1) || (d['dom.url'].toString().indexOf('www.huawei.com/minisite/iot/cn') > -1)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '49':
                try {
                    c[49] |= (d['dom.domain'] == 'blog.huawei.com')
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '51':
                try {
                    c[51] |= (d['dom.url'].toString().indexOf('e.huawei.com/cn') > -1)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '55':
                try {
                    c[55] |= (d['dom.domain'].toString().toLowerCase() == 'e-campaign.huawei.com'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '92':
                try {
                    c[92] |= (d['dom.domain'].toString().toLowerCase() == 'e.huawei.com'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '93':
                try {
                    c[93] |= (/huawei\.com\/(th|tr|ua|fr|de|it|es|uk|cz|pl|se|at|nl|ch|ro|pt|hu|gr|ie|eu|be|bg|hr|sk|vn)/.test(d['dom.url']) && /^(www|e|carrier|solar|digitalpower|www1-back|www-scb|carrier-back|www-solar-back\.rnd)\.huawei\.com/.test(d['dom.domain'])) || (/\/topic\/hce\/|\/en\/form\/mwc2022|\/form\/uipm\/hc2022-paris|\/special_topic\/product\/enterprise-network\/DCIS-2022|\/en\/events\/2023\/branding\/mwc|\/en\/about\/privacy\/mwc|\/en\/about\/privacy\/cookies-policy/.test(d['dom.url']) && d['dom.domain'].toString().toLowerCase() == 'e.huawei.com'.toLowerCase()) || (/\/mwc2023\/booth-material/.test(d['dom.url']) && d['dom.domain'].toString().toLowerCase() == 'app.events.huawei.com'.toLowerCase()) || (/events02\.huawei\.com/.test(d['dom.domain']) && /267266287|361313442|site=(at|be|bg|hr|ch|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|uk|no|li|eu|vn)/.test(d['dom.url'])) || (/\/minisite\/seeds-for-the-future-weu|\/events\/huaweiconnect\/paris/.test(d['dom.url']) && /www.huawei.com/.test(d['dom.domain'])) || (/huawei\.com\/en/.test(d['dom.url']) && /^(digitalpower|solar|carrier)\.huawei\.com/.test(d['dom.domain'])) || (d['dom.url'].toString().toLowerCase().indexOf('e.huawei.com/topic/2023-idi-forum-storage/'.toLowerCase()) > -1) || (/e.huawei.com\/topic\/[^/]+\/(eu|fr|gr|it|se|at|de|hu|pl|es|cz|tr|ua)/.test(d['dom.url'])) || (d['dom.url'].toString().toLowerCase().indexOf('e.huawei.com/en/about/privacy/idi/'.toLowerCase()) > -1) || (d['dom.domain'].toString().indexOf('events03.huawei.com') > -1)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '95':
                try {
                    c[95] |= (d['dom.url'].toString().toLowerCase().indexOf('digitalpower.huawei.com/cn/'.toLowerCase()) > -1)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '98':
                try {
                    c[98] |= (/^(?!(\/(at|be|bg|hr|ch|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|uk|no|li|eu))\b).*$/.test(d['dom.pathname']) && d['dom.url'].toString().toLowerCase().indexOf('e.huawei.com/topic/hce/en/index.html'.toLowerCase()) < 0 && /^(?!.*site=(at|be|bg|hr|ch|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|uk|no|li|eu)).*$/.test(d['dom.query_string']) && d['dom.domain'].toString().toLowerCase().indexOf('events03.huawei.com'.toLowerCase()) < 0 && d['dom.url'].toString().toLowerCase().indexOf('e.huawei.com/en/events/2023/branding/mwc'.toLowerCase()) < 0 && d['dom.url'].toString().toLowerCase().indexOf('app.events.huawei.com/mwc2023/booth-material'.toLowerCase()) < 0 && d['dom.url'].toString().toLowerCase().indexOf('e.huawei.com/topic/2023-idi-forum-storage/'.toLowerCase()) < 0 && d['dom.url'].toString().toLowerCase().indexOf('en/about/privacy/idi'.toLowerCase()) < 0 && d['dom.url'].toString().toLowerCase().indexOf('https://e.huawei.com/topic/eu-event'.toLowerCase()) < 0)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            }
        }
    }
    ;
    utag.pre = function() {
        utag.loader.initdata();
        utag.pagevars();
        try {
            utag.loader.RD(utag.data)
        } catch (e) {
            utag.DB(e)
        }
        ;utag.loader.loadrules();
    }
    ;
    utag.loader.GET = function() {
        utag.cl = {
            '_all_': 1
        };
        utag.pre();
        utag.handler.extend = [function(a, b) {
            try {
                if (b['dom.domain'] == 'e.huawei.com') {
                    if (document.cookie.match(/_ga=(.+?);/)) {
                        b.client_id = document.cookie.match(/_ga=(.+?);/)[1].split('.').slice(-2).join(".")
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b, c, d, e, f, g) {
            if (1) {
                d = b['dom.domain'];
                if (typeof d == 'undefined')
                    return;
                c = [{
                    'www.huawei.com': 'G-8GRJ7QNG8D'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        if (d == f) {
                            b['ga4_measurement_id'] = c[e][f];
                            m = true
                        }
                        ;
                    }
                    ;if (m)
                        break
                }
                ;if (!m)
                    b['ga4_measurement_id'] = 'G-8GRJ7QNG8D';
            }
        }
        , function(a, b, c, d, e, f, g) {
            if (1) {
                d = b['qp.from'];
                if (typeof d == 'undefined')
                    return;
                c = [{
                    'timeline|groupmessage|singlemessage': 'wechat'
                }, {
                    'androidqq': 'qqapp'
                }, {
                    'docexpress': 'docexpress'
                }, {
                    '360onebox': '360onebox'
                }, {
                    'www.hottool.cn': ' hottool'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        g = new RegExp(f,'i');
                        if (g.test(d)) {
                            b['sourceModif'] = c[e][f];
                            m = true
                        }
                        ;
                    }
                    ;if (m)
                        break
                }
                ;if (!m)
                    b['sourceModif'] = '';
            }
        }
        , function(a, b, c, d, e, f, g) {
            if (1) {
                d = b['qp.from'];
                if (typeof d == 'undefined')
                    return;
                c = [{
                    'timeline|groupmessage|singlemessage|androidqq': 'sm'
                }, {
                    'docexpress|360onebox|www.hottool.cn': 'app'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        g = new RegExp(f,'i');
                        if (g.test(d)) {
                            b['mediumModif'] = c[e][f];
                            m = true
                        }
                        ;
                    }
                    ;if (m)
                        break
                }
                ;if (!m)
                    b['mediumModif'] = '';
            }
        }
        , function(a, b, c, d, e, f, g) {
            if (1) {
                d = b['qp.from'];
                if (typeof d == 'undefined')
                    return;
                c = [{
                    'timeline': 'pengyouquan'
                }, {
                    'groupmessage': 'groupmessage'
                }, {
                    'singlemessage': 'singlemessage'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        g = new RegExp(f,'i');
                        if (g.test(d)) {
                            b['contentModif'] = c[e][f];
                            m = true
                        }
                        ;
                    }
                    ;if (m)
                        break
                }
                ;if (!m)
                    b['contentModif'] = '';
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    b['ipanonymous'] = 'true'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    if (!!b.link_category && b.link_name && b.link_url) {
                        utag.link({
                            'eventCat': b.link_category,
                            'eventAct': b.link_name,
                            'eventLbl': b.link_url,
                            'tealium_event': b.tealium_event,
                        });
                    }
                    console.log(b)
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b, c, d, e, f, g) {
            if (1) {
                d = b['dom.url'];
                if (typeof d == 'undefined')
                    return;
                c = [{
                    'digitalpower\.huawei\.com\/(at|be|bg|hr|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|no|uk|li|eu)\/': '9573'
                }, {
                    'solar\.huawei\.com\/(at|be|bg|hr|cy|cz|de|dk|ee|en|fi|fr|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|no|uk|li|eu)': '9577'
                }, {
                    'www\.huawei\.com\/(at|be|bg|hr|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|no|uk|li|eu)\/': '9568'
                }, {
                    'event03\.huawei\.com': '9568'
                }, {
                    '\/events\/huaweiconnect\/paris': '9568'
                }, {
                    '\/seeds-for-the-future-weu\/': '9568'
                }, {
                    'live\.huawei\.com\/huaweiconnect\/meeting\/cn/': '203'
                }, {
                    'www\.huawei\.com\/cn\/events\/huaweiconnect': '203'
                }, {
                    '\/hc2022\/': '203'
                }, {
                    '\/huaweiconnect-exhibition': '187'
                }, {
                    '\/topic\/hic-hai-2020': '32'
                }, {
                    '\/cloud-ai-live/': '46'
                }, {
                    'digitalpower\.huawei\.com\/cn\/': '195'
                }, {
                    'e\.huawei\.com\/(at|be|bg|hr|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|no|uk|li|eu)\/': '9609'
                }, {
                    'carrier\.huawei\.com\/en\/': '9608'
                }, {
                    'e\.huawei\.com\/en\/events\/2023\/branding\/mwc': '9609'
                }, {
                    'e\.huawei\.com\/en\/about\/privacy\/mwc': '9609'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        g = new RegExp(f,'i');
                        if (g.test(d)) {
                            b['hypers_id'] = c[e][f];
                            m = true
                        }
                        ;
                    }
                    ;if (m)
                        break
                }
                ;if (!m)
                    b['hypers_id'] = '4';
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    function trim(str) {
                        var s = str.toLowerCase();
                        return s.replace(/^\s+|\s+$/g, "");
                    }
                    var ce = b['customer_email'] || utag_data['customer_email']
                    console.log(trim(ce))
                    b.customer_email = trim(ce)
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    try {
                        if (document.URL.match(/www\.huawei.com/i)) {
                            var mapping = ["a[href*='Corporate/home']"]
                            for (var x = 0; x < mapping.length; x++) {
                                console.log(x)
                                var t = document.querySelectorAll(mapping[x])
                                console.log(t)
                                if (!!t) {
                                    for (var i = 0; i < t.length; i++) {
                                        t[i].href = t[i].href.toLowerCase()
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    if (!b.action || !utag.data['action']) {
                        b.action = b.tealium_event || utag.data['tealium_event']
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    try {
                        var mapping = {
                            "huawei.com/eu": ["https://www.huawei.com/eu/cookies-policy", ""],
                            "huawei.com/uk": ["https://www.huawei.com/uk/cookies-policy", ""],
                            "huawei.com/ch-en": ["https://www.huawei.com/ch-en/cookies-policy", ""],
                            "huawei.com/ch-fr": ["https://www.huawei.com/ch-fr/cookies-policy", "Huawei Technologies Switzerland"],
                            "huawei.com/ch-it": ["https://www.huawei.com/ch-it/cookies-policy", ""],
                            "huawei.com/ch": ["https://www.huawei.com/ch/cookies-policy", ""],
                            "huawei.com/ie": ["https://www.huawei.com/ie/cookies-policy", ""],
                            "e.huawei.com/topic/2023-idi-forum-storage": ["https://e.huawei.com/en/about/privacy/idi/idi-cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/eu": ["https://e.huawei.com/eu/about/privacy/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/fr": ["https://e.huawei.com/fr/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/gr": ["https://e.huawei.com/gr/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/it": ["https://e.huawei.com/it/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/se": ["https://e.huawei.com/se/about/privacy/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/at": ["https://e.huawei.com/at/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/de": ["https://e.huawei.com/de/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/hu": ["https://e.huawei.com/hu/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/pl": ["https://e.huawei.com/pl/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/es": ["https://e.huawei.com/es/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/cz": ["https://e.huawei.com/cz/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/tr": ["https://e.huawei.com/tr/cookies-policy", ""],
                            "e.huawei.com/topic/[^/]+/ua": ["https://e.huawei.com/ua/cookies-policy", ""],
                            "events03.huawei.com/OnlineForm/register/233805273": ["https://www.huawei.com/eu/cookies-policy", ""],
                            "events03.huawei.com/OnlineForm/register/365896558": ["https://www.huawei.com/eu/cookies-policy", ""],
                            "events03.huawei.com/OnlineForm/register/212386874": ["https://www.huawei.com/eu/cookies-policy", ""],
                            "events03.huawei.com/OnlineForm/register/41539526": ["https://e.huawei.com/eu/about/privacy/cookies-policy", ""],
                            "events03.huawei.com/UniversalForm/register/758223180": ["https://e.huawei.com/hu/about/privacy/cookies-policy", ""],
                            "app.events.huawei.com/mwc2023/booth-material": ["https://e.huawei.com/en/about/privacy/cookies-policy", ""],
                            "OnlineForm/register/371321709": ["https://e.huawei.com/en/about/privacy/idi/idi-cookies-policy", ""],
                        }
                        function modifyPolicyURL(cookieInfo) {
                            var policyLink = document.querySelectorAll("#policylink")
                            for (var i = 0; i < policyLink.length; i++) {
                                var link = typeof cookieInfo === 'string' ? cookieInfo : cookieInfo[0]
                                policyLink[i].setAttribute("href", link)
                            }
                            var idName = document.getElementById('identityname');
                            if (idName) {
                                if (typeof cookieInfo === 'object' && cookieInfo[1]) {
                                    idName.textContent = cookieInfo[1]
                                }
                            }
                        }
                        function isExactMatch(key) {
                            var url = location.host + location.pathname + '/'
                            if (key.indexOf('e.huawei.com/topic/[^/]+/') === -1) {
                                return url.indexOf(key + '/') !== -1
                            } else {
                                return url.match(key) !== null
                            }
                        }
                        for (var x in mapping) {
                            if (isExactMatch(x)) {
                                var oldCP = utag.gdpr.showConsentPreferences
                                var oldEC = utag.gdpr.showExplicitConsent
                                utag.gdpr.showConsentPreferences = function() {
                                    oldCP();
                                    modifyPolicyURL(mapping[x])
                                }
                                utag.gdpr.showExplicitConsent = function() {
                                    oldEC();
                                    modifyPolicyURL(mapping[x])
                                }
                                break;
                            }
                        }
                    } catch (e) {
                        console.log("fail:override policy URL")
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    function Pii(string) {
                        var piiRegex = [{
                            name: 'EMAIL',
                            regex: /(\&|\?|\#)(email|e-mail|mail)=[^&#]+/gi
                        }, {
                            name: 'EMAIL',
                            regex: /[^&?=#]+(@|%40)[^@&?=#]+\.[^@&?=#]+/gi
                        }, {
                            name: 'ADDRESS',
                            regex: /(\&|\?|\#)address=[^&#]+/gi
                        }, {
                            name: 'NAME',
                            regex: /(\&|\?|\#)(firstname|surname|prenom|lastname|name|nom|username)=[^&#]+/gi
                        }, {
                            name: 'PASSWORD',
                            regex: /(\&|\?|\#)(password|pwd)=[^&#]+/gi
                        }, {
                            name: 'PHONE',
                            regex: /(\&|\?|\#)phone=[^&#]+/gi
                        }];
                        try {
                            var val = decodeURIComponent(decodeURIComponent(string));
                        } catch (e) {
                            val = decodeURIComponent(string);
                        }
                        piiRegex.forEach(function(pii) {
                            if (val.match(pii.regex) !== null && val.match(pii.regex)[0].split('=').length > 1) {
                                val = val.replace(pii.regex, val.match(pii.regex)[0].split('=')[0] + '=[DELETED_' + pii.name + ']');
                            } else {
                                val = val.replace(pii.regex, '[DELETED_' + pii.name + ']');
                            }
                        });
                        return val
                    }
                    if (!!b.ga_page_path || !!utag_data.ga_page_path) {
                        b.ga_page_path = Pii(b.ga_page_path) || Pii(utag.data.ga_page_path)
                    }
                    b.location = Pii(document.URL)
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    if (!!document.URL.match(/\.huawei\.com\/fr/i)) {
                        b.ga_cookies_expires = 34190000
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (b['dom.url'].toString().toLowerCase().indexOf('huawei.com/huaweiconnect-exhibition'.toLowerCase()) > -1) {
                    if (document.location.pathname.match(/huaweiconnect-exhibition/i)) {
                        b.ga_page_path = document.location.pathname + document.location.hash
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    var p_path = window.location.pathname
                    if (p_path.indexOf('/') != -1) {
                        var p_path_list = p_path.split('/')
                        if (!!p_path_list && !!p_path_list[1]) {
                            b.page_path_level1 = '/' + p_path_list[1] + '/';
                        }
                        if (!!p_path_list && !!p_path_list[2]) {
                            b.page_path_level2 = '/' + p_path_list[2] + '/';
                        }
                        if (!!p_path_list && !!p_path_list[3]) {
                            b.page_path_level3 = '/' + p_path_list[3] + '/';
                        }
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        ];
        utag.handler.cfg_extend = [{
            "bwq": 0,
            "alr": 0,
            "blr": 1,
            "end": 0,
            "id": "274"
        }, {
            "alr": 0,
            "blr": 1,
            "id": "286",
            "end": 0,
            "bwq": 0
        }, {
            "bwq": 0,
            "end": 0,
            "id": "29",
            "blr": 0,
            "alr": 1
        }, {
            "alr": 1,
            "blr": 0,
            "id": "30",
            "end": 0,
            "bwq": 0
        }, {
            "bwq": 0,
            "alr": 1,
            "blr": 0,
            "end": 0,
            "id": "31"
        }, {
            "id": "73",
            "end": 0,
            "blr": 0,
            "alr": 1,
            "bwq": 0
        }, {
            "bwq": 0,
            "alr": 1,
            "blr": 0,
            "end": 0,
            "id": "202"
        }, {
            "alr": 1,
            "blr": 0,
            "end": 0,
            "id": "206",
            "bwq": 0
        }, {
            "id": "217",
            "end": 0,
            "blr": 0,
            "alr": 1,
            "bwq": 0
        }, {
            "bwq": 0,
            "end": 0,
            "id": "219",
            "blr": 0,
            "alr": 1
        }, {
            "end": 0,
            "id": "226",
            "blr": 0,
            "alr": 1,
            "bwq": 0
        }, {
            "id": "212",
            "end": 0,
            "blr": 0,
            "alr": 1,
            "bwq": 0
        }, {
            "bwq": 0,
            "end": 0,
            "id": "236",
            "blr": 0,
            "alr": 1
        }, {
            "alr": 1,
            "blr": 0,
            "end": 0,
            "id": "259",
            "bwq": 0
        }, {
            "id": "268",
            "end": 0,
            "blr": 0,
            "alr": 1,
            "bwq": 0
        }, {
            "bwq": 0,
            "alr": 1,
            "blr": 0,
            "end": 0,
            "id": "304"
        }];
        utag.loader.initcfg = function() {
            utag.loader.cfg = {
                "207": {
                    load: ((((utag.cond[92] || utag.cond[3] || utag.cond[49] || utag.cond[116] || utag.cond[118] || utag.cond[119] || utag.cond[126] || utag.cond[128]) && (utag.cond[98]) && (utag.cond[108])) && !(utag.cond[117] || utag.cond[122]))),
                    tcat: 1,
                    send: 1,
                    v: 202404170209,
                    wait: 0,
                    tid: 7142
                },
                "118": {
                    load: ((utag.cond[95] || utag.cond[55] || utag.cond[51])),
                    tcat: 1,
                    send: 1,
                    v: 202308220716,
                    wait: 1,
                    tid: 20010
                },
                "184": {
                    load: utag.cond[100],
                    tcat: 1,
                    send: 1,
                    v: 202308150136,
                    wait: 1,
                    tid: 20010
                },
                "74": {
                    load: ((utag.cond[37] || utag.cond[51])),
                    tcat: 1,
                    send: 1,
                    v: 202307040114,
                    wait: 1,
                    tid: 20010
                }
            };
            utag.loader.cfgsort = ["207", "118", "184", "74"];
        }
        utag.loader.initcfg();
        try {
            utag.gdpr.applyConsentState();
        } catch (e) {
            utag.DB(e)
        }
    }
    utag.gdpr = {
        trackUIDs: [],
        consent_prompt: {
            noShow: false,
            isEnabled: true,
            content: {}
        },
        preferences_prompt: {
            single_cookie: false,
            noShow: false,
            isEnabled: true,
            defaultState: false,
            content: {},
            categories: {
                "social": {
                    "id": 7,
                    "enabled": "1"
                },
                "affiliates": {
                    "id": 2,
                    "enabled": "0"
                },
                "search": {
                    "enabled": "0",
                    "id": 4
                },
                "big_data": {
                    "id": 8,
                    "enabled": "0"
                },
                "analytics": {
                    "id": 1,
                    "enabled": "1"
                },
                "cdp": {
                    "id": 11,
                    "enabled": "1"
                },
                "email": {
                    "id": 5,
                    "enabled": "1"
                },
                "personalization": {
                    "enabled": "0",
                    "id": 6
                },
                "engagement": {
                    "enabled": "1",
                    "id": 13
                },
                "crm": {
                    "enabled": "1",
                    "id": 15
                },
                "mobile": {
                    "id": 12,
                    "enabled": "0"
                },
                "display_ads": {
                    "enabled": "1",
                    "id": 3
                },
                "monitoring": {
                    "enabled": "1",
                    "id": 14
                },
                "misc": {
                    "enabled": "0",
                    "id": 9
                },
                "cookiematch": {
                    "id": 10,
                    "enabled": "0"
                }
            }
        },
        doNotSell: {
            noShow: false,
            isEnabled: false
        },
        getCategories: function(onlyEnabledCats) {
            if (!(utag.gdpr.preferences_prompt && utag.gdpr.preferences_prompt.categories)) {
                return [];
            }
            var length = utag.gdpr.keys(utag.gdpr.preferences_prompt.categories).length
              , cats = new Array(length)
              , gdpr_cats = utag.gdpr.preferences_prompt.categories;
            for (var cat in gdpr_cats) {
                if (!gdpr_cats.hasOwnProperty(cat)) {
                    continue;
                }
                var isCatEnabled = gdpr_cats[cat].enabled === true || gdpr_cats[cat].enabled == 1;
                if (onlyEnabledCats && !isCatEnabled) {
                    continue;
                }
                cats[gdpr_cats[cat].id - 1] = cat;
            }
            for (var i = cats.length - 1; i >= 0; i--) {
                if (cats[i] === undefined) {
                    cats.splice(i, 1);
                }
            }
            return cats;
        },
        getSelectedCategories: function() {
            var sc = [], gc = utag.gdpr.getCategories(true), cs = utag.gdpr.getConsentState(), i;
            try {
                if (typeof cs === "number") {
                    return (parseInt(cs) === 1) ? gc : sc;
                } else {
                    for (i in utag.loader.GV(cs)) {
                        if ("1" === cs[i].ct) {
                            sc.push(cs[i].name);
                        }
                    }
                }
            } catch (e) {
                utag.DB(e);
            }
            return sc;
        },
        getCategoryLanguage: function(category) {
            if (!(utag.gdpr.preferences_prompt && utag.gdpr.preferences_prompt.categories)) {
                return [];
            }
            var language = utag.gdpr.getLanguage(utag.gdpr.preferences_prompt);
            return utag.gdpr.preferences_prompt.languages[language].categories[category];
        },
        getConsentState: function() {
            var re = /^c\d+/
              , cd = utag.gdpr.getCookieValues()
              , np = 1
              , gc = utag.gdpr.getCategories()
              , pc = (function(gc) {
                var pc = [];
                for (var i = 0; i < gc.length; i++) {
                    pc.push({
                        ct: null,
                        name: gc[i]
                    });
                }
                return pc;
            }(gc))
              , filteredCD = (function(cd) {
                var d = {};
                for (var prop in cd) {
                    if (!cd.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (re.test(prop)) {
                        d[prop] = cd[prop];
                    }
                }
                return d;
            }(cd));
            filteredCD = utag.gdpr.sortedObject(filteredCD, function(val1, val2) {
                var idx1 = parseInt((val1 || "").substring(1), 10)
                  , idx2 = parseInt((val2 || "").substring(1), 10);
                if (isNaN(idx1) || isNaN(idx2)) {
                    return 0;
                }
                return idx1 > idx2 ? 1 : -1;
            });
            for (var cn in utag.loader.GV(filteredCD)) {
                if (cn.match(re)) {
                    var idx = parseInt(cn.substring(1), 10) - 1
                      , ct = gc[idx];
                    pc[idx].ct = cd[cn];
                    if (cd[cn] * 1 !== 1) {
                        np = 0;
                    }
                }
            }
            if (cd.consent) {
                if (cd.consent === true || cd.consent === "true") {
                    return np ? np : pc;
                } else {
                    return -1;
                }
            } else if (np === 0) {
                return pc;
            } else {
                return 0;
            }
        },
        getCookieValues: function() {
            var values = {}
              , rcd = (function() {
                var value = "; " + document.cookie;
                var parts = value.split("; " + utag.gdpr.cookieNS + "=");
                if (parts.length == 2)
                    return utag.ut.decode(parts.pop().split(";").shift());
            }())
              , cd = utag.gdpr.typeOf(rcd) === "string" ? rcd : "";
            if (utag.data && cd) {
                utag.data["cp." + utag.gdpr.cookieNS] = cd;
            }
            if (cd) {
                var i, optOut, optOutData = decodeURI(cd).split("|");
                for (i = 0; i < optOutData.length; i++) {
                    optOut = optOutData[i].split(":");
                    values[optOut[0]] = optOut[1];
                }
            }
            utag.gdpr.values = values;
            return values;
        },
        getDeTokenizedContent: function(data, _lang) {
            if (utag.gdpr.isEmpty(data))
                return null;
            var tokenRegExpPattern = /{{(.*?)}}/gm
              , token_match = /[{}]/g
              , two_part = /display_ads|big_data/;
            var lang = utag.gdpr.getLanguage(data, _lang)
              , langData = utag.gdpr.clone(data.languages[lang]);
            for (var t1 in utag.gdpr.sortedObject(langData.common_tokens)) {
                if (!langData.common_tokens.hasOwnProperty(t1)) {
                    continue;
                }
                langData.common_tokens[t1] = tokenReplace(langData.common_tokens[t1]);
            }
            for (var t2 in utag.gdpr.sortedObject(langData.custom_tokens)) {
                if (!langData.custom_tokens.hasOwnProperty(t2)) {
                    continue;
                }
                langData.custom_tokens[t2] = tokenReplace(langData.custom_tokens[t2]);
            }
            function tokenReplace(str) {
                if (!str)
                    return str;
                var replacements = str.match(tokenRegExpPattern);
                if (!replacements)
                    return str;
                for (var i = 0; i < replacements.length; i++) {
                    var token = replacements[i].replace(token_match, "") || "";
                    var regExpReplaceAll = new RegExp(replacements[i],"g");
                    if (langData.common_tokens[token]) {
                        str = str.replace(regExpReplaceAll, langData.common_tokens[token]);
                    } else if (langData.custom_tokens[token]) {
                        str = str.replace(regExpReplaceAll, langData.custom_tokens[token]);
                    } else if (langData.categories && token.indexOf("category_") > -1) {
                        var split_token = token.split("_");
                        if (token.match(two_part)) {
                            split_token[1] = split_token[1] + "_" + split_token[2];
                            split_token.splice(2, 1);
                        }
                        var category = langData.categories[split_token[1]]
                          , key = {
                            "title": "name",
                            "description": "notes"
                        }[split_token[2]];
                        if (category[key]) {
                            str = str.replace(regExpReplaceAll, category[key]);
                        }
                    }
                }
                return str;
            }
            return {
                language: lang,
                tokens: langData,
                js: tokenReplace(data.content.js),
                html: tokenReplace(data.content.html),
                css: tokenReplace(data.content.css)
            };
        },
        getLanguage: function(promptData, preferredLang) {
            var udoName = window.utag.udoname || "utag_data";
            var dataObject = window.utag.data || window[udoName];
            var langLocale = (preferredLang || dataObject[window.utag.cfg.gdprDLRef] || (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage)).toLowerCase();
            var lang = (langLocale || "").split("-")[0];
            if (!promptData) {
                return langLocale;
            }
            var languages = promptData.languages;
            return languages[langLocale] ? langLocale : languages[lang] ? lang : promptData.defaultLang;
        },
        getTokenLanguage: function(promptData, token, lang) {
            if (utag.gdpr.isEmpty(promptData))
                return null;
            if (utag.gdpr.isEmpty(token))
                return null;
            var getDeTokenizedContent = utag.gdpr.getDeTokenizedContent(promptData, lang);
            var langData = getDeTokenizedContent.tokens;
            if (lang && getDeTokenizedContent.language !== lang)
                return null;
            if (utag.gdpr.isEmpty(langData))
                return null;
            if (langData.common_tokens[token]) {
                return langData.common_tokens[token];
            } else if (langData.custom_tokens[token]) {
                return langData.custom_tokens[token];
            } else if (langData.categories && token.indexOf("category_") > -1) {
                var split_token = token.split("_")
                  , category = langData.categories[split_token[1]];
                if (category[split_token[2]]) {
                    return category[split_token[2]];
                }
            }
            return null;
        },
        refreshCookie: function() {
            if (utag && utag.DB) {
                utag.DB("utag.gdpr.refreshCookie has been deprecated");
            }
        },
        setCookie: function(cookieData) {
            utag.DB("Consent Manager: Set Cookie");
            if (utag.gdpr.typeOf(cookieData) !== "object") {
                return;
            }
            if (utag.gdpr.keys(cookieData).length === 0) {
                return;
            }
            var consentType = utag.gdpr.typeOf(cookieData.consent);
            if (consentType === "number") {
                cookieData.consent = cookieData.consent == 1;
                consentType = utag.gdpr.typeOf(cookieData.consent);
            }
            if (consentType !== "boolean" && !(consentType === "string" && (cookieData.consent.toLowerCase() === "true" || cookieData.consent.toLowerCase() === "false"))) {
                utag.DB("Invalid option sent to setCookie [consent must be true/false]");
                return;
            }
            if (utag.gdpr.typeOf(cookieData.ts) !== "number" || (cookieData.ts.toString().length !== 13)) {
                cookieData.ts = new Date().getTime();
            }
            utag.gdpr.values = cookieData;
            var mo2Val = [];
            for (var i in utag.loader.GV(cookieData)) {
                if (/^(consent|dns|ts|c\d+)$/.test(i)) {
                    mo2Val.push(i + ":" + cookieData[i]);
                } else {
                    utag.DB("Invalid option sent to setCookie [" + i + "], is unknown");
                }
            }
            var daysToSet = utag.gdpr.consentPeriod;
            if (!daysToSet) {
                var expiryMonths = cookieData.dns == undefined ? 12 : 13;
                var today = new Date();
                today.setMonth(today.getMonth() + expiryMonths);
                daysToSet = Math.ceil((today.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            }
            var expiry = new Date(cookieData.ts);
            expiry.setDate(expiry.getDate() + daysToSet);
            var cookie_string = [utag.gdpr.cookieNS + "=" + encodeURI(mo2Val.join("|")), "path=" + utag.gdpr.path, "expires=" + expiry.toGMTString()];
            if (utag.gdpr.domain) {
                cookie_string.push("domain=" + utag.gdpr.domain);
            }
            document.cookie = cookie_string.join("; ");
            utag.data["cp." + utag.gdpr.cookieNS] = mo2Val.join("|");
        },
        defaultConsentForDoNotSell: function(key, cookieData) {
            if (key === 'dns') {
                var consentType = utag.gdpr.typeOf(cookieData.consent);
                if (consentType === "undefined") {
                    utag.DB("Consent Manager: Defaulting missing consent for Do Not Sell.");
                    cookieData.consent = "true";
                }
            }
            return cookieData;
        },
        setCookieValue: function(key, value) {
            utag.DB("Consent Manager: Set Cookie Value");
            if (!key || (utag.gdpr.typeOf(value) === "undefined" || utag.gdpr.typeOf(value) === "null"))
                return;
            var cookieData = utag.handler.C(utag.gdpr.getCookieValues());
            cookieData[key] = value;
            cookieData = utag.gdpr.defaultConsentForDoNotSell(key, cookieData);
            utag.gdpr.setCookie(cookieData);
        },
        setConsentValue: function(_response) {
            utag.DB("Consent Manager: Set Consent Value: " + _response);
            var valid = {
                true: 1,
                "true": 1,
                1: 1,
                false: 0,
                "false": 0,
                0: 0
            };
            if (!valid.hasOwnProperty(_response)) {
                throw new Error("No response supplied");
            }
            var response = valid[_response] === 1;
            utag.gdpr.setCookieValue("ts", new Date().getTime());
            utag.gdpr.setCookieValue("consent", response);
            utag.gdpr.processQueue(response);
        },
        setPreferencesValues: function(categories, noCollect) {
            utag.DB("Consent Manager: Set Preferences Values");
            var i, fld, cookie_data = utag.gdpr.getCookieValues(), lookup = {}, rgx = /\D/, names = utag.gdpr.getCategories(), chosen_list = [], consent_seen = false, decline_seen = false, crgx = /c\d/;
            if (utag.gdpr.typeOf(categories) !== "object") {
                utag.DB("Categories is not type object.");
                return;
            }
            try {
                for (i = 0; i < names.length; i++) {
                    lookup[names[i]] = "c" + (i + 1);
                }
                for (var cat in categories) {
                    if (!categories.hasOwnProperty(cat)) {
                        continue;
                    }
                    if (categories[cat] !== "1" && categories[cat] !== "0" && categories[cat] !== 1 && categories[cat] !== 0) {
                        continue;
                    }
                    if (cat.match(rgx)) {
                        cookie_data[lookup[cat]] = categories[cat];
                        if (categories[cat] != 0) {
                            chosen_list.push(cat);
                        }
                    } else {
                        cookie_data["c" + cat] = categories[cat];
                        if (categories[cat] != 0) {
                            chosen_list.push(names[cat - 1]);
                        }
                    }
                }
                for (fld in utag.loader.GV(cookie_data)) {
                    if (fld.match(crgx)) {
                        if (cookie_data[fld] != 0) {
                            consent_seen = true;
                        } else {
                            decline_seen = true;
                        }
                    }
                }
                cookie_data["ts"] = new Date().getTime();
                cookie_data["consent"] = consent_seen;
                utag.gdpr.setCookie(cookie_data);
                utag.gdpr.processQueue(consent_seen);
            } catch (e) {
                utag.DB(e);
            }
            if (noCollect) {
                return;
            }
        },
        setAllCategories: function(state, noCollect) {
            utag.DB("Consent Manager: Set Preferences All Categories: " + state);
            if (state === undefined)
                return;
            if (utag.gdpr.typeOf(state) !== "boolean")
                return;
            var allCats = utag.gdpr.getCategories()
              , prefs = {};
            for (var i = 0; i < allCats.length; i++) {
                prefs["" + (i + 1)] = state ? "1" : "0";
            }
            utag.gdpr.setPreferencesValues(prefs, noCollect);
        },
        setPreferencesFromList: function(list) {
            utag.DB("Consent Manager: Set Preferences From List");
            var prefs = {}
              , allCats = utag.gdpr.getCategories();
            if (utag.gdpr.typeOf(list) !== "array") {
                utag.DB("List should be of type array");
                return;
            }
            for (var i = 0; i < list.length; i++) {
                prefs[list[i]] = "1";
            }
            for (var j = 0; j < allCats.length; j++) {
                if (!prefs[allCats[j]]) {
                    prefs[allCats[j]] = "0";
                }
            }
            utag.gdpr.setPreferencesValues(prefs);
        },
        processQueue: function(consent_seen) {
            utag.DB("Consent Manager: Processing Consent Queue");
            if (utag.gdpr.noqueue) {
                return;
            }
            if (!consent_seen) {
                utag.gdpr.queue = [];
                return;
            }
            utag.DB("Consent Manager: Processing Consent Queue Length: " + utag.gdpr.queue.length);
            var event, data, conds = {};
            utag.gdpr.merge(conds, utag.cond);
            for (var i = 0; i < utag.gdpr.queue.length; i++) {
                event = utag.gdpr.queue[i];
                if (!(event.cfg && event.cfg.uids)) {
                    data = {};
                    utag.loader.RD(data, event.event);
                    utag.gdpr.merge(data, event.data, true);
                    for (var cond in conds) {
                        if (!conds.hasOwnProperty(cond)) {
                            continue;
                        }
                        conds[cond] = 0;
                    }
                    utag.handler.RE(event.event, data, "blr");
                    utag.loader.loadrules(data, conds);
                    event.cfg = event.cfg || {};
                    event.cfg.uids = [];
                    event.data = data;
                    utag.cond = conds;
                    utag.loader.initcfg();
                    utag.gdpr.applyConsentState();
                    var consentState = utag.gdpr.getConsentState();
                    var csType = utag.gdpr.typeOf(consentState);
                    for (var id in utag.loader.GV(utag.loader.cfg)) {
                        if (utag.gdpr.omittedTags[id])
                            continue;
                        var tag = utag.loader.cfg[id];
                        if (tag.load && tag.send) {
                            if (tag.tcat !== 0) {
                                if ((csType === "array" && consentState[tag.tcat - 1].ct == "1") || (csType === "number" && consentState == 1)) {
                                    event.cfg.uids.push(id);
                                }
                            } else if (tag.tcat === 0) {
                                event.cfg.uids.push(id);
                            }
                        }
                    }
                }
                if (event.cfg.uids) {
                    for (var indexCfgUID = event.cfg.uids.length - 1; indexCfgUID > -1; indexCfgUID--) {
                        if (!utag.gdpr.omittedTags[event.cfg.uids[indexCfgUID]])
                            continue;
                        event.cfg.uids.splice(indexCfgUID, 1);
                    }
                    utag.gdpr.trackUIDs = utag.gdpr.trackUIDs.concat(event.cfg.uids);
                }
                utag.track_old.call(this, event);
            }
            utag.gdpr.queue = [];
        },
        typeOf: function(e) {
            return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        },
        merge: function(a, b, c, d) {
            if (c) {
                for (d in utag.loader.GV(b)) {
                    a[d] = b[d];
                }
            } else {
                for (d in utag.loader.GV(b)) {
                    if (typeof a[d] == "undefined")
                        a[d] = b[d];
                }
            }
        },
        shouldTagFire: function(taguid) {
            if (!taguid && utag.gdpr.typeOf(utag.gdpr.trackUIDs) !== "array")
                return true;
            var lc = utag.loader.cfg
              , cs = utag.gdpr.getConsentState()
              , uid = taguid || utag.gdpr.trackUIDs.shift();
            if (utag.gdpr.typeOf(uid) === "undefined")
                return true;
            utag.DB("Consent Manager: Applying consent: " + uid);
            var csTYpe = utag.gdpr.typeOf(cs);
            var tag = lc[uid];
            var blockedTagLookup = utag.gdpr.dns ? utag.gdpr.dns.getBlockedDnsTagLookup() : {};
            if (!utag.gdpr.omittedTags[uid] && tag.send && tag.tcat !== 0) {
                if ((csTYpe === "array" && cs[tag.tcat - 1].ct == "1") || (csTYpe === "number" && cs == 1) || parseInt(blockedTagLookup[uid]) === 1) {
                    utag.DB("Consent Manager: Applying consent: " + uid + " allowed to send");
                    return false;
                }
            } else if ((utag.gdpr.omittedTags[uid] || tag.tcat == 0) && tag.send) {
                utag.DB("Consent Manager: Omitted Tag: " + uid + " allowed to send");
                return false;
            }
            utag.DB("Consent Manager: Applying consent: " + uid + " not allowed to send");
            return true;
        },
        applyConsentState: function() {
            utag.DB("Consent Manager: Applying consent");
            try {
                var i, lc = utag.loader.cfg, cs = utag.gdpr.getConsentState(), ot = utag.gdpr.omittedTags;
                if (typeof cs === "number") {
                    if ((utag.gdpr.consent_prompt.isEnabled && parseInt(cs) !== 1) || ((!utag.gdpr.consent_prompt.isEnabled && utag.gdpr.preferences_prompt.isEnabled) && parseInt(cs) === -1)) {
                        utag.DB("Consent Manager: Setting all tags to off");
                        for (i in utag.loader.GV(lc)) {
                            if (typeof ot[i] === "undefined") {
                                lc[i].load = 0;
                            }
                        }
                    }
                } else if (utag.gdpr.consent_prompt.isEnabled || utag.gdpr.preferences_prompt.isEnabled) {
                    utag.DB("Consent Manager: Partial Consent");
                    for (i in utag.loader.GV(lc)) {
                        if (typeof ot[i] === "undefined") {
                            if (lc[i].tcat > 0 && cs[lc[i].tcat - 1].ct != "1") {
                                lc[i].load = 0;
                            }
                        }
                    }
                }
                var btl = utag.gdpr.dns ? utag.gdpr.dns.getBlockedDnsTagLookup() : null;
                utag.DB("Consent Manager: Do Not Sell Tags");
                if (btl) {
                    for (i in utag.loader.GV(lc)) {
                        if (parseInt(btl[i]) === 1) {
                            lc[i].load = 0;
                        }
                    }
                }
            } catch (e) {
                utag.DB(e);
            }
        },
        updateConsentCookie: function(consent_categories) {
            utag.DB("Consent Manager: Updating consent cookie");
            var list, listType = utag.gdpr.typeOf(consent_categories);
            if (listType === "string") {
                list = consent_categories.split(/\s*,\s*/);
            } else if (listType !== "array") {
                list = [];
            } else {
                list = consent_categories.slice();
            }
            if (list.length === 0) {
                utag.gdpr.setConsentValue(false);
                utag.gdpr.setAllCategories(false);
                return;
            }
            utag.gdpr.setPreferencesFromList(list);
        },
        keys: function(obj) {
            if (Object.keys) {
                return Object.keys(obj);
            }
            var array = [];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }
                array.push(prop);
            }
            return array;
        },
        sortedObject: function(obj, func) {
            var _obj = {};
            if (obj !== undefined) {
                var _k1 = utag.gdpr.keys(obj).sort(func);
                for (var z = 0; z < _k1.length; z++) {
                    _obj[_k1[z]] = obj[_k1[z]];
                }
            }
            return _obj;
        },
        clone: function(a) {
            var level = 0;
            return cloner(a);
            function cloner(a) {
                var b = {};
                var c;
                level++;
                if (level === 5)
                    return a;
                for (c in utag.loader.GV(a)) {
                    if (utag.gdpr.typeOf(a[c]) === "array") {
                        b[c] = a[c].slice(0)
                    } else if (utag.gdpr.typeOf(a[c]) === "object") {
                        b[c] = cloner(a[c]);
                    } else {
                        b[c] = a[c];
                    }
                }
                level--;
                return b;
            }
        },
        isEmpty: function(obj) {
            var t = utag.gdpr.typeOf(obj);
            switch (t) {
            case "string":
            case "array":
                return obj.length === 0;
            case "object":
                for (var p in obj) {
                    if (!obj.hasOwnProperty(p)) {
                        continue;
                    }
                    return false;
                }
            default:
                return true;
            }
        },
        queue: [],
        domain: window.utag_cfg_ovrd && window.utag_cfg_ovrd.domain || utag.cfg.domain,
        path: window.utag_cfg_ovrd && window.utag_cfg_ovrd.cookie_path || "/",
        noqueue: window.utag_cfg_ovrd && window.utag_cfg_ovrd.nogdprqueue || false,
        noview: window.utag_cfg_ovrd && window.utag_cfg_ovrd.noview || false,
        consentPeriod: (window.utag_cfg_ovrd && window.utag_cfg_ovrd.consentPeriod) || 0,
        cookieNS: window.utag_cfg_ovrd && window.utag_cfg_ovrd.cmcookiens || "CONSENTMGR",
        eventProfile: window.utag_cfg_ovrd && window.utag_cfg_ovrd.cmeventprofile || "main" || "main",
        omittedTags: {
            "71": 1,
            "36": 1,
            "49": 1,
            "176": 1,
            "52": 1,
            "63": 1,
            "50": 1,
            "70": 1,
            "51": 1,
            "101": 1
        }
    };
    if (window.utag_cfg_ovrd && window.utag_cfg_ovrd.domain == "") {
        utag.gdpr.domain = "";
    }
    utag.loader.initdataOld = utag.loader.initdata;
    utag.loader.initdata = function() {
        utag.loader.initdataOld();
        if (utag.gdpr.getConsentState() !== 0)
            return;
        if (utag.gdpr.noview)
            return;
        if (!utag.loader.rd_flag && !utag.gdpr.noqueue) {
            utag.gdpr.queue.push({
                event: "view",
                data: utag.handler.C(utag.data)
            });
        }
    }
    ;
    utag.gdpr.promptEnabledSetting = function() {
        if (!utag.gdpr.dr && (utag.cfg.readywait || utag.cfg.waittimer)) {
            utag.gdpr.dr = 1;
            return;
        }
        if (utag.gdpr.consent_prompt.isEnabled === true && !(utag.cond[93])) {
            utag.gdpr.consent_prompt.isEnabled = false;
        }
        if (utag.gdpr.doNotSell.isEnabled === true && !(1)) {
            utag.gdpr.doNotSell.isEnabled = false;
        }
    }
    utag.preOld = utag.pre;
    utag.pre = function() {
        utag.preOld();
        utag.gdpr.promptEnabledSetting();
        utag.pre = utag.preOld;
    }
    ;
    utag.gdpr.consent_prompt.languages = {
        "ro": {
            "isDefault": "false",
            "common_tokens": {
                "confirmation_button": "",
                "title": "",
                "message": "Folosim cookie-uri pe acest website, inclusiv cookie-uri ale unor terțe părți, pentru ca website-ul să funcționeze adecvat și a analiza traficul, pentru a oferi o funcționalitate îmbunătățită, funcții pe mediile de socializare și a a personaliza conținut și reclame.  <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Aflați mai multe</a>."
            },
            "custom_tokens": {
                "company_logo_url": "",
                "identity_name": "Huawei",
                "privacy_policy_text": "",
                "opt_out": "Respinge Cookie-urile",
                "privacy_policy_url": "https://www.huawei.com/ro/cookies-policy",
                "consent_preference": "Setarea cookie-urilor",
                "opt_in": "Acceptați toate cookie-urile"
            }
        },
        "fr": {
            "common_tokens": {
                "message": "<span id=\"identityname\">Huawei Technologies France</span> respecte votre confidentialité. Huawei et des tiers utilisent des cookies essentiels et non essentiels pour fournir, sécuriser, analyser et améliorer nos contenus et services, et pour vous proposer des publicités pertinentes sur et en dehors de notre site. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">En savoir plus</a>",
                "title": "",
                "confirmation_button": ""
            },
            "custom_tokens": {
                "consent_preference": "PERSONNALISER",
                "opt_in": "Tout accepter",
                "opt_out": "Tout Refuser",
                "privacy_policy_url": "https://www.huawei.com/fr/cookies-policy",
                "identity_name": "Huawei"
            },
            "isDefault": "false"
        },
        "uk": {
            "custom_tokens": {
                "company_logo_url": "",
                "identity_name": "Huawei",
                "privacy_policy_text": "",
                "opt_out": "Відхилити cookie",
                "privacy_policy_url": "https://www.huawei.com/ua/cookies-policy",
                "consent_preference": "Параметри Згоди",
                "opt_in": "Прийняти файли cookie"
            },
            "common_tokens": {
                "confirmation_button": "",
                "title": "This website uses cookies",
                "message": "Ми використовуємо файли cookie на цьому сайті, включаючи файли cookie третіх сторін, для коректної роботи сайту та аналізу трафіка, пропонування розширених функціональних можливостей, характеристик соціальних медіа та персоналізації контенту і реклами. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Дізнатись більше </a>"
            },
            "isDefault": "false"
        },
        "vi": {
            "common_tokens": {
                "message": "Chúng tôi sử dụng cookie trên trang web này, bao gồm cả cookie của bên thứ ba, để trang web hoạt động bình thường và phân tích lưu lượng truy cập, cung cấp chức năng nâng cao, tính năng truyền thông xã hội cũng như cá nhân hóa nội dung và quảng cáo. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Tìm hiểu thêm</a>.",
                "title": "",
                "confirmation_button": ""
            },
            "custom_tokens": {
                "identity_name": "Huawei",
                "privacy_policy_text": "",
                "company_logo_url": "",
                "opt_in": "Chấp nhận",
                "consent_preference": "Các tùy chọn đồng ý",
                "opt_out": "Từ chối",
                "privacy_policy_url": "https://www.huawei.com/vn/cookies-policy"
            },
            "isDefault": "false"
        },
        "pl": {
            "isDefault": "false",
            "custom_tokens": {
                "identity_name": "Huawei",
                "opt_in": "AKCEPTUJ WSZYSTKIE PLIKI COOKIE",
                "consent_preference": "USTAWIENIA PLIKÓW COOKIE",
                "opt_out": "ODRZUĆ CIASTECZKA",
                "privacy_policy_url": "https://www.huawei.com/pl/cookies-policy"
            },
            "common_tokens": {
                "title": "",
                "confirmation_button": "",
                "message": "Używamy plików cookie do personalizacji treści i reklam, do zapewniania funkcji w mediach społecznościowych i do analizowania naszego ruchu. Udostępniamy również informacje na temat korzystania przez użytkownika z naszej witryny naszym partnerom w mediach społecznościowych, partnerom reklamowym i partnerom analitycznym. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Dowiedz się więcej</a>"
            }
        },
        "th": {
            "custom_tokens": {
                "identity_name": "Huawei",
                "privacy_policy_text": "",
                "company_logo_url": "",
                "opt_in": "ยอมรับคุกกี้",
                "consent_preference": "การตั้งค่าความยินยอม",
                "opt_out": "ปฏิเสธคุกกี้",
                "privacy_policy_url": "https://www.huawei.com/th/cookies-policy"
            },
            "common_tokens": {
                "message": "เว็บไซต์ของเรามีการใช้งานคุกกี้ รวมถึงคุกกี้ของบุคคลที่สาม เพื่อให้มีการทำงานราบรื่น และเพื่อวิเคราะห์การเข้าชม เพิ่มประสิทธิภาพในการใช้งาน ฟีเจอร์สำหรับสื่อสังคมออนไลน์ และรวมถึงเนื้อหาและโฆษณาที่ถูกปรับแต่งเฉพาะส่วนบุคคล\n<a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">เรียนรู้เพิ่มเติม</a>",
                "title": "แบนเนอร์คุกกี้",
                "confirmation_button": ""
            },
            "isDefault": "false"
        },
        "el-gr": {
            "isDefault": "false",
            "common_tokens": {
                "message": "Σε αυτόν τον ιστότοπο χρησιμοποιούμε cookies,συμπεριλαμβανομένων και cookies τρίτων, προκειμένου ο ιστότοπος να λειτουργεί σωστά, να αναλύουμε την επισκεψιμότητα του, να προσφέρουμε βελτιωμένη λειτουργικότητα, χαρακτηριστικά μέσων κοινωνικής δικτύωσης και να εξατομικεύουμε το περιεχόμενο και τις διαφημίσεις. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Μάθε περισσότερα</a>",
                "title": "",
                "confirmation_button": ""
            },
            "custom_tokens": {
                "opt_in": "Αποδοχή των Cookies",
                "consent_preference": "Προτιμήσεις Συγκατάθεσης",
                "privacy_policy_url": "https://e.huawei.com/gr/cookies-policy",
                "opt_out": "Απόρριψη όλων",
                "identity_name": "Huawei",
                "privacy_policy_text": "",
                "company_logo_url": ""
            }
        },
        "pt": {
            "isDefault": "false",
            "custom_tokens": {
                "company_logo_url": "",
                "privacy_policy_text": "",
                "identity_name": "Huawei",
                "privacy_policy_url": "https://solar.huawei.com/pt/cookies",
                "opt_out": "Rejeitar Cookies",
                "opt_in": "Aceitar Cookies",
                "consent_preference": "Preferências de Consentimento"
            },
            "common_tokens": {
                "confirmation_button": "",
                "title": "",
                "message": "Utilizamos cookies neste site, incluindo cookies de terceiros, para que o site funcione corretamente e para analisar o tráfego, oferecer funcionalidades melhoradas, recursos de rede social e personalizar conteúdo e anúncios.  <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Saiba mais</a>"
            }
        },
        "sk": {
            "common_tokens": {
                "message": "Na tejto stránke používame súbory cookie, vrátane súborov cookie tretích strán, aby stránka správne fungovala a analyzovala návštevnosť, ponúkala rozšírené funkcie, funkcie sociálnych médií a prispôsobovala obsah a reklamy. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Zistiť viac</a>",
                "title": "",
                "confirmation_button": ""
            },
            "custom_tokens": {
                "consent_preference": "Postavke pristanka",
                "opt_in": "Prijať súbory cookie",
                "opt_out": "Odmietnuť súbory cookie",
                "privacy_policy_url": "https://solar.huawei.com/sk/cookies",
                "privacy_policy_text": "",
                "identity_name": "Huawei",
                "company_logo_url": ""
            },
            "isDefault": "false"
        },
        "en": {
            "isDefault": "true",
            "common_tokens": {
                "message": "<span id=\"identityname\">We</span> use cookies on this site, including third party cookies, in order for the site to work properly and to analyse traffic, offer enhanced functionality, social media features, and personalise content and ads. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Learn more</a>",
                "confirmation_button": "Submit",
                "title": "This website uses cookies"
            },
            "custom_tokens": {
                "privacy_policy_url": "https://www.huawei.com/uk/cookies-policy",
                "opt_out": "Reject Cookies",
                "consent_preference": "Consent Preferences",
                "opt_in": "Accept Cookies",
                "identity_name": "Huawei"
            }
        },
        "it": {
            "isDefault": "false",
            "common_tokens": {
                "message": "Utilizziamo i cookie su questo sito, compresi i cookie di terze parti, affinché il sito funzioni correttamente e analizzi il traffico, offra funzionalità avanzate, funzioni per i social media e personalizzi i contenuti e gli annunci. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Ulteriori informazioni</a>",
                "title": "",
                "confirmation_button": ""
            },
            "custom_tokens": {
                "identity_name": "Huawei",
                "privacy_policy_url": "https://www.huawei.com/it/cookies-policy",
                "opt_out": "RIFIUTARE I COOKIE",
                "consent_preference": "MODIFICA LE PREFERENZE",
                "opt_in": "ACCETTA I COOKIE"
            }
        },
        "es": {
            "custom_tokens": {
                "identity_name": "Huawei",
                "privacy_policy_url": "https://www.huawei.com/es/cookies-policy",
                "opt_out": "RECHAZAR COOKIES",
                "consent_preference": "CONFIGURACIÓN DE COOKIES",
                "opt_in": "ACEPTAR COOKIES"
            },
            "common_tokens": {
                "message": "En este sitio utilizamos cookies, incluidas cookies de terceros, para que el sitio funcione correctamente y para analizar el tráfico, ofrecer una funcionalidad mejorada y personalizar el contenido y los anuncios. Si hace clic en \"Aceptar todas\", acepta que utilicemos cookies propias y de terceros con fines de marketing y análisis. Si hace clic en \"Rechazar todo\", sólo utilizaremos cookies para fines técnicamente necesarios. Puede gestionar sus cookies en cualquier momento.  Más información en nuestra <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Política de Cookies</a>",
                "title": "",
                "confirmation_button": ""
            },
            "isDefault": "false"
        },
        "bg": {
            "common_tokens": {
                "message": "Използваме cookies/бисквитки  на този сайт, включително cookies/бисквитки на трета страна, за да може сайтът да работи правилно и да анализира трафика, да предлага подобрена функционалност, функции в социалните медии и да персонализира съдържанието и рекламите. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Научете повече</a>",
                "confirmation_button": "",
                "title": ""
            },
            "custom_tokens": {
                "opt_out": "Отхвърлете cookies/бисквитки",
                "privacy_policy_url": "https://solar.huawei.com/bg/cookies",
                "opt_in": "Приемете cookies/бисквитки",
                "consent_preference": "Предпочитания за съгласие",
                "company_logo_url": "",
                "identity_name": "Huawei",
                "privacy_policy_text": ""
            },
            "isDefault": "false"
        },
        "nl": {
            "common_tokens": {
                "title": "This website uses cookies",
                "confirmation_button": "Submit",
                "message": "We gebruiken cookies op deze site, inclusief cookies van derde partijen, zodat de site correct werkt en het verkeer geanalyseerd, voor verbeterde functionaliteit, voor sociale functies en om inhoud en advertenties te personaliseren. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Meer informatie</a>"
            },
            "custom_tokens": {
                "identity_name": "Huawei",
                "consent_preference": "Cookie instellingen",
                "opt_in": "Accepteer cookies",
                "opt_out": "Cookies afwerpen",
                "privacy_policy_url": "https://www.huawei.com/nl/cookies-policy"
            },
            "isDefault": "false"
        },
        "hu": {
            "custom_tokens": {
                "company_logo_url": "",
                "identity_name": "Huawei",
                "privacy_policy_text": "",
                "opt_out": "A sütik elutasítása",
                "privacy_policy_url": "https://e.huawei.com/hu/cookies-policy",
                "consent_preference": "Sütik beállítása",
                "opt_in": "Sütik elfogadása"
            },
            "common_tokens": {
                "message": "Sütiket, ideértve harmadik felektől származó sütiket használunk az oldal megfelelő működésének biztosításához, az oldal látogatottságának elemzéséhez, továbbfejlesztett funkciók, közösségi média funkciók kínálásához, valamint tartalmak és hirdetések személyre szabásához. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">További információk</a>",
                "title": "",
                "confirmation_button": ""
            },
            "isDefault": "false"
        },
        "cs": {
            "isDefault": "false",
            "common_tokens": {
                "message": "Soubory cookies využíváme, abychom přizpůsobili obsah a reklamy, zajišťovali funkce sociálních médií a analyzovali provoz. Sdílíme také informace o vašem používání našich stránek s našimi partnery v oblasti sociálních médií, reklamy a analýzy. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Další informace</a>",
                "confirmation_button": "",
                "title": ""
            },
            "custom_tokens": {
                "consent_preference": "NASTAVENÍ SOUBORU COOKIE",
                "opt_in": "PŘIJMOUT COOKIES",
                "opt_out": "Odmítnout cookies",
                "privacy_policy_url": "https://e.huawei.com/cz/cookies-policy",
                "identity_name": "Huawei",
                "privacy_policy_text": "",
                "company_logo_url": ""
            }
        },
        "hr": {
            "custom_tokens": {
                "privacy_policy_text": "",
                "identity_name": "Huawei",
                "company_logo_url": "",
                "consent_preference": "Postavke pristanka",
                "opt_in": "Prihvati kolačiće",
                "privacy_policy_url": "https://solar.huawei.com/hr/cookies",
                "opt_out": "Odbaci kolačiće"
            },
            "common_tokens": {
                "confirmation_button": "",
                "title": "",
                "message": "Na ovom web-mjestu koristimo kolačiće, uključujući kolačiće treće strane, kako bi web-mjesto ispravno radilo i analiziralo promet, ponudilo poboljšanu funkcionalnost, značajke društvenih medija te personaliziralo sadržaj i oglase. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Saznajte više</a>"
            },
            "isDefault": "false"
        },
        "de": {
            "isDefault": "false",
            "custom_tokens": {
                "identity_name": "Huawei",
                "opt_in": "ALLE COOKIES AKZEPTIEREN",
                "consent_preference": "COOKIE EINSTELLUNGEN",
                "opt_out": "COOKIES ABLEHNEN",
                "privacy_policy_url": "https://www.huawei.com/de/cookies-policy"
            },
            "common_tokens": {
                "confirmation_button": "",
                "title": "",
                "message": "Wir verwenden Cookies auf dieser Website, einschließlich Cookies von Drittanbietern, damit die Website ordnungsgemäß funktioniert und um den Datenverkehr zu analysieren, verbesserte Funktionen anzubieten und Inhalte und Anzeigen zu personalisieren. Wenn Sie auf \"Alle akzeptieren\" klicken, erklären Sie sich damit einverstanden, dass wir unsere eigenen Cookies und Cookies von Dritten für Marketing- und Analysezwecke verwenden. Wenn Sie auf \"Alle ablehnen\" klicken, werden wir Cookies nur für technisch notwendige Zwecke verwenden (Art. 6 Abs. 1 (a) der Datenschutz-Grundverordnung (DSGVO) und in Verbindung mit . § 25 Abs. 1 des Telekommunikation-Telemedien-Datenschutz-Gesetzes (TTDSG)). Sie können Ihre Cookies jederzeit verwalten. Erfahren Sie mehr in unserer <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Cookies Policy</a>. "
            }
        },
        "de-at": {
            "isDefault": "false",
            "custom_tokens": {
                "opt_in": "ALLE COOKIES AKZEPTIEREN",
                "consent_preference": "COOKIE-EINSTELLUNG",
                "privacy_policy_url": "https://e.huawei.com/at/cookies-policy",
                "opt_out": "COOKIES ABLEHNEN",
                "privacy_policy_text": "",
                "identity_name": "Huawei",
                "company_logo_url": ""
            },
            "common_tokens": {
                "message": "Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Social Media-Funktionen bereitzustellen und unseren Traffic zu analysieren. Wir teilen auch Informationen über Ihre Nutzung unserer Website mit unseren Partnern aus den Bereichen Social Media, Werbung und Analytik. <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Mehr erfahren</a>",
                "title": "",
                "confirmation_button": ""
            }
        },
        "tr": {
            "isDefault": "false",
            "common_tokens": {
                "confirmation_button": "",
                "title": "",
                "message": "Sitemizde sitenin düzgün çalışması, site trafiğinin analiz edilmesi ve gelişmiş işlevsellik, sosyal medya özellikleri, kişiselleştirilmiş içerik ve reklamların sunulması için üçüncü taraf çerezleri de dahil olmak üzere çerezler kullanılmaktadır.  <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Detaylı bilgi</a>"
            },
            "custom_tokens": {
                "consent_preference": "Çerez Tercihleri",
                "opt_in": "Çerezleri Kabul Et",
                "privacy_policy_url": "https://www.huawei.com/tr/cookies-policy",
                "opt_out": "Reddetme Çerezi",
                "privacy_policy_text": "",
                "identity_name": "Huawei",
                "company_logo_url": ""
            }
        }
    };
    utag.gdpr.consent_prompt.content.css = ".privacy_prompt.explicit_consent {        position: fixed;        width: 100%;        left: 0;        margin-left: 0;        text-align: left;        border-radius: 0;        background-color: rgba(0, 0, 0, 0.85);        color: #444;        font-size: 14px;        z-index: 1000;        word-break: break-word;        bottom: 0;        color: #fff;        box-sizing: border-box;    }        .privacy_prompt.explicit_consent a {        text-decoration: underline;        color: #fff;    }        .privacy_prompt.explicit_consent a.consent {        /*position: absolute;            top: 15px;            right: 50px;*/        color: #fff;        padding: 3px 0px;        text-decoration: underline;        font-family: \"HuaweiSans-Bold\",\"LT_Bold\",Microsoft YaHei, Helvetica, Arial, sans-serif;    }        .privacy_prompt.explicit_consent .privacy_prompt_content {        padding: 5px 20px;        font-size: 1.0em;        width: 100%;        position: relative;    }        .privacy_prompt.explicit_consent .privacy_prompt_content h1+p {        margin: 12px 0;    }        .privacy_prompt.explicit_consent .option_set {        position: absolute;        top: 50%;        right: 0;        width: 30%;        transform: translateY(-50%);    }        .ie8 .privacy_prompt.explicit_consent .option_set,    .ie9 .privacy_prompt.explicit_consent .option_set,    .ie10 .privacy_prompt.explicit_consent .option_set {        top: 10px;        transform: translateY(0);    }        .privacy_prompt.explicit_consent .option {        margin: 10px 0px;        color: #444;        margin-right: 20px;        /*position: absolute;            top: 5px;            right: 220px;*/        display: inline-block;        vertical-align: middle;    }        .privacy_prompt.explicit_consent .option+.option+div {        display: inline-block;        vertical-align: middle;    }        .privacy_prompt.explicit_consent .option input {        font-size: 1.0em;        border: 1px solid #fff;        padding: 4px 15px;        min-width: 50px;        text-align: center;        border-radius: 0px;        background-color:transparent;        color: #fff;        cursor: pointer;        font-family: \"HuaweiSans-Bold\",\"LT_Bold\",Microsoft YaHei, Helvetica, Arial, sans-serif;        margin-top: 15px;        margin-right: 8px;        min-width: 165px;    }    .privacy_prompt.explicit_consent .option input:first-child{        margin-left: 0;    }    .privacy_prompt.explicit_consent .privacy_prompt_footer {        padding: 0px 20px 20px 20px;        overflow: auto;        display: none;    }        .privacy_prompt.explicit_consent .privacy_prompt_footer a {        font-size: 0.9em;    }        .privacy_prompt.explicit_consent .privacy_prompt_footer .button {        font-size: 1.0em;        border: 1px solid #CCC;        padding: 4px 15px;        min-width: 50px;        text-align: center;        border-radius: 4px;        background-color: #EEE;        box-shadow: inset 0px 1px 4px rgba(255, 255, 255, 1);        text-shadow: 1px 1px 3px rgba(255, 255, 255, 1);        color: #000;        cursor: pointer;    }        .privacy_prompt.explicit_consent .button.right {        float: right;    }        .privacy_prompt.explicit_consent .button.left {        float: left;    }        .privacy_prompt.explicit_consent>.close_btn_thick {        position: absolute;        display: block;        top: 10px;        right: 10px;        text-decoration: none;        text-shadow: 0 1px 0 #fff;        color: #777;        font: 14px/100% arial, sans-serif;        cursor: pointer;        display: none;    }        .privacy_prompt.explicit_consent>.close_btn_thick:after {        content: \"\\2716\";    }        .privacy_prompt.explicit_consent .logo {        float: right;    }        .privacy_prompt.explicit_consent table {        padding: 0px;        border-collapse: collapse;    }        .privacy_prompt.explicit_consent table th {        background-color: #FAFAFA;        border-bottom: 1px solid #EEE;        margin: 0px;        padding: 5px 8px;        font-weight: 400;        text-align: center;    }        .privacy_prompt.explicit_consent table td {        vertical-align: top;        padding: 10px 8px 5px 8px;    }        .privacy_prompt.explicit_consent table tr td:first-child {        min-width: 120px;        font-weight: 600;        color: #666;    }        .privacy_prompt.explicit_consent table tr td:last-child {        text-align: center;        min-width: 100px;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle {        opacity: 0;        position: absolute;        left: -99999px;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle+label {        height: 24px;        line-height: 24px;        background-color: #ccc;        padding: 0px 16px;        border-radius: 16px;        display: inline-block;        position: relative;        cursor: pointer;        -moz-transition: all 0.25s ease-in;        -o-transition: all 0.25s ease-in;        -webkit-transition: all 0.25s ease-in;        transition: all 0.25s ease-in;        -moz-box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);        -webkit-box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);        box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle+label:before,    .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle+label:hover:before {        content: \" \";        position: absolute;        top: 2px;        left: 2px;        width: 26px;        height: 20px;        background: #fff;        z-index: 2;        -moz-transition: all 0.25s ease-in;        -o-transition: all 0.25s ease-in;        -webkit-transition: all 0.25s ease-in;        transition: all 0.25s ease-in;        -moz-border-radius: 14px;        -webkit-border-radius: 14px;        border-radius: 14px;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle+label .off,    .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle+label .on {        color: #fff;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle+label .off {        margin-left: 20px;        display: inline-block;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle+label .on {        display: none;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle:checked+label .off {        display: none;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle:checked+label .on {        margin-right: 20px;        display: inline-block;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle:checked+label,    .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle:focus:checked+label {        background-color: #3278c0;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle:checked+label:before,    .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle:checked+label:hover:before,    .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle:focus:checked+label:before,    .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle:focus:checked+label:hover:before {        background-position: 0 0;        top: 2px;        left: 100%;        margin-left: -28px;    }        .privacy_prompt.explicit_consent input[type=\"checkbox\"].toggle+label {        overflow: hidden;        text-overflow: ellipsis;        max-height: 24px;        height: 24px;    }    @media (min-width:1806px){        .privacy_prompt.explicit_consent{           padding: 60px 12%;        }    }    @media (max-width:1805px) {        .privacy_prompt.explicit_consent .privacy_prompt_content {            min-height: 90px;        }    }    @media (min-width:992px){        .privacy_prompt.explicit_consent .privacy_prompt_content > p{        color:#ccc;        width: 60%;        }            }    @media (min-width:1026px) {        .privacy_prompt.explicit_consent{            padding: 40px 4% 60px 4%;         }    }    @media (min-width:992px) and (max-width:1025px){	  .privacy_prompt.explicit_consent .privacy_prompt_content{		width:100%;	  }	  .privacy_prompt.explicit_consent .option_set{	    width:30%;      }      .privacy_prompt.explicit_consent{        padding: 50px 20px;     }	}    @media (max-width: 1400px){        .privacy_prompt.explicit_consent .option_set{            width:36%;          }    }    @media (max-width: 991px) {        #__tealiumGDPRecModal .privacy_prompt.explicit_consent {            width: 100%;            margin: 0 auto;            left: 0%;        }        .privacy_prompt.explicit_consent .privacy_prompt_content {            margin-right: 0;            width: 100%;            padding: 35px 20px;        }        .privacy_prompt.explicit_consent .option_set {            text-align: center;            padding-bottom: 15px;            padding-top: 15px;            position: static;            transform: translateY(0);            width: 100%;        }        .privacy_prompt.explicit_consent .option {            margin-right: 0;            position: static;        }        .privacy_prompt.explicit_consent a.consent {            position: static;        }		.privacy_prompt.explicit_consent .option+.option+div{		    display:block;		}		.cookie-tab .tab-content .content-box .checkbox-switch{		    position: static;		}		.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label .off,.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label .on{			right: -128px;			width: 120px;		}		.cookie-tab .tab-content .content-box .cookie-con-auto{			margin-top:7px;		}    }    @media (max-width:767px){        .privacy_prompt.explicit_consent .option input{            display: block;            margin-left: auto;            margin-right: auto;        }        .privacy_prompt.explicit_consent .option input:first-child{            margin-left: auto;        }    }    .privacy_prompt.explicit_consent .privacy_prompt_content *{        font-size: 16px;        line-height: 1.4;    }        @media (min-width:1100px){    .privacy_prompt.explicit_consent .privacy_prompt_content p {        max-height: 40vh;        overflow: auto;    }         .privacy_prompt.explicit_consent .privacy_prompt_content p::-webkit-scrollbar-track    {        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);        border-radius: 10px;        background-color: rgba(255, 255, 255, 0.5);    }        .privacy_prompt.explicit_consent .privacy_prompt_content p::-webkit-scrollbar    {        width: 10px;        background-color: rgba(255, 255, 255, 0.1);    }        .privacy_prompt.explicit_consent .privacy_prompt_content p::-webkit-scrollbar-thumb    {        border-radius: 10px;        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);        background-color: #555;    }}@media(min-width:768px) and (max-width:1099px){    .privacy_prompt.explicit_consent .privacy_prompt_content p {        max-height: 40vh;        overflow: auto;    }}@media(max-width:767px){    .privacy_prompt.explicit_consent .privacy_prompt_content p {        max-height: calc(100vh - 255px);        overflow: auto;    }}";
    utag.gdpr.consent_prompt.content.html = "<div class=\"privacy_prompt explicit_consent\">        <div class=\"privacy_prompt_content\">            <p style=\"color:#ccc;\">{{message}}</p>            <div class=\"option_set\">                <div class=\"option\">                    <input type=\"button\" id=\"privacy_pref_optin\" name=\"privacy_pref\" value=\"√ {{opt_in}}\">                    <!--<label for=\"privacy_pref_optin\">{{opt_in}}</label>-->                    <input type=\"button\" id=\"privacy_pref_reject\" name=\"privacy_pref\" value=\"× {{opt_out}}\">                    <!--<label for=\"privacy_pref_reject\">{{reject}}</label>-->                </div>                <div class=\"option\" style=\"display: none;\">                    <input type=\"radio\" id=\"privacy_pref_optout\" name=\"privacy_pref\" value=\"optout\">                    <label for=\"privacy_pref_optout\">{{opt_out}}</label>                </div>                <div><a href=\"#\" onClick=\"utag.gdpr.showConsentPreferences()\" class=\"consent\">{{consent_preference}} ></a></div>            </div>        </div>        <div class=\"privacy_prompt_footer\">            <div id=\"consent_prompt_submit\" class=\"button right\">                {{confirmation_button}}            </div>        </div>        <div class=\"close_btn_thick\"></div>    </div>";
    utag.gdpr.consent_prompt.content.js = "function inject_jq(){if(!window.jQuery){(function(){function l(u,i){var d=document;if(!d.getElementById(i)){var s=d.createElement('script');s.src=u;s.id=i;d.body.appendChild(s);}}l('https://www.huawei.com/Assets/corp/2020/js/lib/jquery-3.4.1.min.js?ver=202302031936','jquery')})();};};inject_jq();var getFirstUrlPath=function(){const parts=document.location.pathname.split('/');if(parts.length>1){return parts.filter(function(t){return!!t})[0];}};var getCookie=function(name){var nameEQ=name+\"=\";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return decodeURIComponent(c.substring(nameEQ.length,c.length));}return null;};var delete_cookie=function(name,path,domain){if(getCookie(name)){document.cookie=name+\"=\"+((path)?\";path=\"+path:\"\")+((domain)?\";domain=\"+domain:\"\")+\";expires=Thu, 01 Jan 1970 00:00:01 GMT\";}};function setCookie(name,value,expires,path,domain,secure){var cookieText=encodeURIComponent(name)+'='+encodeURIComponent(value);if(expires instanceof Date){cookieText+='; expires='+expires.toGMTString();}if(path){cookieText+='; path='+path;}if(domain){cookieText+='; domain='+domain;}if(secure){cookieText+='; secure';}document.cookie=cookieText;}var updateConsentCookies=function(){delete_cookie(\"CONSENTMGR\",'/'+getFirstUrlPath(),'.huawei.com');console.log(\"delete path cookies\");var consent_cookies=getCookie('CONSENTMGR');delete_cookie(\"CONSENTMGR\",'/','.huawei.com');console.log(\"delete orginal consent cookies successfully\");var expirationDate=new Date();expirationDate.setDate(expirationDate.getDate()+180);setCookie('CONSENTMGR',consent_cookies,expirationDate,'/'+getFirstUrlPath(),\".huawei.com\");console.log(\"update consent cookies successfully\");};(function consent_prompt(){console.log('consent_prompt start');var $el=document.getElementById(\"consent_prompt_submit\"),$modal=document.getElementById(\"__tealiumGDPRecModal\"),$closeBtn=$modal.getElementsByClassName(\"close_btn_thick\")[0],$privacy_pref_optin=document.getElementById(\"privacy_pref_optin\"),$privacy_pref_optout=document.getElementById(\"privacy_pref_optout\");var rejectButton=document.getElementById(\"privacy_pref_reject\");var consentState=utag.gdpr.getConsentState();if(typeof consentState===\"number\"){if(consentState===1){$privacy_pref_optin.checked=true;}else if(consentState===-1){$privacy_pref_optout.checked=true;}}else{$privacy_pref_optin.checked=true;}var callBack=function(){$privacy_pref_optin.checked=true;if($privacy_pref_optin.checked){utag.gdpr.setConsentValue(1);}else if($privacy_pref_optout.checked){utag.gdpr.setConsentValue(0);}else{return;}closePrompt();};var closePrompt=function(){$modal.style.display=\"none\";setTimeout(function(){updateConsentCookies();},1000);};if(!!rejectButton&&document.addEventListener){rejectButton.addEventListener('click',function(){utag.gdpr.setConsentValue(0);closePrompt();});}if(document.addEventListener){$privacy_pref_optin.addEventListener(\"click\",function(){$el.click();},false);$el.addEventListener(\"click\",callBack,false);$closeBtn.addEventListener(\"click\",closePrompt,false);}else if(document.attachEvent){$privacy_pref_optin.attachEvent(\"click\",function(){$el.click();});$el.attachEvent(\"click\",callBack);$closeBtn.attachEvent(\"click\",closePrompt);}else{$privacy_pref_optin.onclick=function(){$el.click();};$el.onclick=callBack;$closeBtn.onclick=closePrompt;}}());";
    utag.gdpr.consent_prompt.defaultLang = "en";
    utag.gdpr.showExplicitConsent = function(_lang) {
        var cn = document.getElementById("__tealiumGDPRecStyle");
        if (cn) {
            cn.parentNode.removeChild(cn);
        }
        var hn = document.getElementById("__tealiumGDPRecModal");
        if (hn) {
            hn.parentNode.removeChild(hn);
        }
        var sn = document.getElementById("__tealiumGDPRecScript");
        if (sn) {
            sn.parentNode.removeChild(sn);
        }
        var dtc = utag.gdpr.getDeTokenizedContent(utag.gdpr.consent_prompt, _lang);
        var head = document.head || document.getElementsByTagName("head")[0]
          , style = document.createElement("style")
          , mDiv = document.createElement("div")
          , scr = document.createElement("script")
          , body = document.body || document.getElementsByTagName("body")[0];
        style.type = "text/css";
        style.id = "__tealiumGDPRecStyle";
        if (style.styleSheet) {
            style.styleSheet.cssText = dtc.css;
        } else {
            style.appendChild(document.createTextNode(dtc.css));
        }
        head.appendChild(style);
        mDiv.innerHTML = dtc.html;
        mDiv.id = "__tealiumGDPRecModal";
        body.appendChild(mDiv);
        scr.language = "javascript";
        scr.type = "text/javascript";
        scr.text = "try{" + dtc.js + "} catch(e){utag.DB(e)}";
        scr.id = "__tealiumGDPRecScript";
        head.appendChild(scr);
    }
    ;
    utag.gdpr.preferences_prompt.languages = {
        "th": {
            "common_tokens": {
                "no": "ไม่ทำงาน",
                "yes": "ทำงาน",
                "confirmation_button": "บันทึกและปิด",
                "title": "การกำหนดความเป็นส่วนตัวของคุณ",
                "message": "เราใช้คุกกี้บนเว็บไซต์นี้ โปรดเรียนรู้รายละเอียดเกี่ยวกับวิธีที่เราใช้คุกกี้ได้ที่ <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">ประกาศเกี่ยวกับคุกกี้ฉบับเต็ม </a>ของเรา สามารถปฏิเสธคุกกี้ที่ไม่จำเป็นทั้งหมดได้โดยเพียงแค่คลิก \"บันทึกและปิด\" ด้านล่าง หากต้องการยอมรับหรือปฏิเสธคุกกี้ตามหมวดหมู่ โปรดคลิกที่แท็บทางด้านซ้าย คุณสามารถเยี่ยมชมซ้ำและเปลี่ยนแปลงการตั้งค่าของคุณได้ตลอดเวลา"
            },
            "custom_tokens": {
                "privacy_policy_url": "https://www.huawei.com/th/cookies-policy",
                "your_privacy": "ความเป็นส่วนตัวของคุณ",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "cookies_used": "คุกกี้ที่ใช้",
                "essential_cookies_description": "คุกกี้เหล่านี้จำเป็นสำหรับการทำงานของเว็บไซต์และไม่สามารถปิดได้ในระบบของเรา โดยปกติแล้ว จะตั้งค่าคุกกี้เหล่านี้ให้ตอบสนองต่อการดำเนินการต่าง ๆ ที่คุณทำซึ่งเป็นจำนวนคำขอใช้บริการต่าง ๆ เช่น การตั้งค่าความเป็นส่วนตัว การเข้าสู่ระบบ หรือการกรอกแบบฟอร์มต่าง ๆ ของคุณ คุณสามารถตั้งค่าเบราว์เซอร์ของคุณให้ปิดกั้นหรือแจ้งเตือนคุณเกี่ยวกับคุกกี้เหล่านี้ได้ แต่เว็บไซต์บางส่วนจะไม่ทำงาน คุกกี้เหล่านี้ไม่ได้จัดเก็บข้อมูลที่สามารถระบุตัวบุคคลใด ๆ ได้",
                "privacy_policy_text": "",
                "essential_cookies": "คุกกี้ที่จำเป็น",
                "always_active": "ทำงานเสมอ",
                "accept_cookies": "ยอมรับคุกกี้",
                "reset": "รีเซ็ต"
            },
            "categories": {
                "affiliates": {
                    "notes": "",
                    "name": ""
                },
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "search": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "notes": "คุกกี้เหล่านี้ช่วยให้เราสามารถนับจำนวนการเข้าชมและแหล่งที่มาของการรับส่งข้อมูล เพื่อที่เราจะสามารถวัดและปรับปรุงประสิทธิภาพของเว็บไซต์ของเราให้ดีขึ้นได้ โดยช่วยให้เราทราบว่าหน้าเพจใดได้รับความนิยมมากที่สุดและน้อยที่สุด และดูว่าผู้เยี่ยมชมดูเว็บไซต์โดยรอบอย่างไร จะมีการรวบรวมข้อมูลทั้งหมดที่คุกกี้เหล่านี้รวบรวมและดังนั้น จึงไม่ได้ระบุตัวตน อย่างไรก็ตาม บุคคลที่สามที่ให้บริการเหล่านี้ Google Analytics จะประมวลผลข้อมูลส่วนบุคคลของคุณเพื่อให้ข้อมูลที่รวบรวมไว้",
                    "name": "คุกกี้วิเคราะห์"
                },
                "social": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "พันธมิตรโฆษณาของเราจะตั้งค่าคุกกี้เหล่านี้โดยนำมาใช้สร้างโปรไฟล์ความสนใจของคุณและแสดงโฆษณาที่เกี่ยวข้องบนเว็บไซต์อื่น ๆ และยังช่วยให้คุณสามารถกด 'ถูกใจ' และ 'แชร์' เนื้อหาของเราบนโซเชียลมีเดียได้ ซึ่งจะไม่ได้จัดเก็บข้อมูลส่วนบุคคลโดยตรง แต่จะอิงตามการระบุเบราว์เซอร์และอุปกรณ์อินเทอร์เน็ตของคุณโดยเฉพาะ นอกจากนี้ บุคคลที่สามที่ตั้งค่าคุกกี้เหล่านี้อาจเชื่อมโยงข้อมูลส่วนบุคคลของคุณกับพฤติกรรมการท่องเว็บหากคุณลงชื่อเข้าใช้บริการของบุคคลที่สามเหล่านี้ในขณะนั้น",
                    "name": "คุกกี้โฆษณา"
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "notes": "",
                    "name": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "crm": {
                    "name": "",
                    "notes": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                }
            },
            "isDefault": "false"
        },
        "el-gr": {
            "custom_tokens": {
                "privacy_policy_url": "https://e.huawei.com/gr/cookies-policy",
                "your_privacy": "Το απόρρητό σας",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "accept_cookies": "Αποδοχή cookies",
                "reset": "Επαναφορά",
                "always_active": "Πάντα ενεργά",
                "privacy_policy_text": "",
                "essential_cookies": "Βασικά Cookies",
                "essential_cookies_description": "Αυτά τα cookies είναι απαραίτητα για τη λειτουργία του ιστότοπου και δεν μπορούν να απενεργοποιηθούν στα συστήματά μας. Συνήθως ρυθμίζονται μόνο σε συμμόρφωση ενέργειών που πραγματοποιούνται από εσάς, οι οποίες αντιστοιχούν σε ένα αίτημα για υπηρεσίες, όπως ο ορισμός των προτιμήσεων απορρήτου, η σύνδεση ή η συμπλήρωση φορμών. Μπορείτε να ρυθμίσετε το πρόγραμμα περιήγησής σας να αποκλείει ή να σας ειδοποιεί για αυτά τα cookies, αλλά τότε ορισμένα τμήματα του ιστότοπου δεν θα λειτουργούν. Αυτά τα cookies δεν αποθηκεύουν πληροφορίες προσωπικής ταυτοποίησης.",
                "cookies_used": "Cookies που χρησιμοποιούνται"
            },
            "common_tokens": {
                "message": "Χρησιμοποιούμε cookies σε αυτόν τον ιστότοπο. Για να μάθετε λεπτομερώς τον τρόπο με τον οποίο χρησιμοποιούμε τα cookies, διαβάστε την πλήρη <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Πολιτική για τα Cookie </a>. Για να απορρίψετε όλα τα μη βασικά cookies, απλώς κάντε κλικ στο κουμπί \"Αποθήκευση και κλείσιμο\" παρακάτω. Για να αποδεχτείτε ή να απορρίψετε τα cookies ανά κατηγορία, απλώς κάντε κλικ στις καρτέλες στα αριστερά. Μπορείτε να επανεξετάσετε και να αλλάξετε τις ρυθμίσεις σας ανά πάσα στιγμή. ",
                "title": "Οι επιλογές Ιδιωτικότητάς σας",
                "confirmation_button": "Αποθήκευση και Κλείσιμο",
                "yes": "Ενεργά",
                "no": "Ανενεργά"
            },
            "categories": {
                "cookiematch": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "cdp": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "engagement": {
                    "name": "",
                    "notes": ""
                },
                "crm": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "name": "Διαφημιστικά Cookies",
                    "notes": "Αυτά τα cookie καθορίζονται από τους διαφημιστικούς μας συνεργάτες. Χρησιμοποιούνται για τη δημιουργία ενός προφίλ των ενδιαφερόντων σας και την εμφάνιση σχετικών διαφημίσεων σε άλλους ιστότοπους, καθώς και για να σας επιτρέπουν να κάνετε λειτουργίες όπως \"Μου αρέσει\" και \"Διαμοιράζω\" το περιεχόμενό μας στα κοινωνικά μέσα. Δεν αποθηκεύουν άμεσα προσωπικά στοιχεία, αλλά βασίζονται στη μοναδική αναγνώριση του προγράμματος περιήγησης και της διαδικτυακής συσκευής σας. Επιπλέον, τα τρίτα μέρη που ρυθμίζουν αυτά τα cookie ενδέχεται να συνδέσουν τα προσωπικά σας δεδομένα με τη συμπεριφορά περιήγησής σας εάν έχετε συνδεθεί στις υπηρεσίες τους εκείνη τη στιγμή."
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "social": {
                    "notes": "",
                    "name": ""
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "name": "Αναλυτικά Cookies",
                    "notes": "Αυτά τα cookie μας επιτρέπουν να μετράμε τις επισκέψεις και τις πηγές επισκεψιμότητας, ώστε να μπορούμε να μετρήσουμε και να βελτιώσουμε την απόδοση του ιστότοπού μας. Μας βοηθούν να γνωρίζουμε ποιες σελίδες είναι οι πιο δημοφιλείς και βλέπουν πώς μετακινούνται οι επισκέπτες στον ιστότοπο. Όλες οι πληροφορίες που συλλέγουν αυτά τα cookie είναι συγκεντρωτικές και επομένως ανώνυμες. Ωστόσο, τρίτα μέρη που παρέχουν αυτές τις υπηρεσίες, η Hypers Analytics θα επεξεργαστούν τα προσωπικά σας δεδομένα προκειμένου να παρέχουν τα συγκεντρωτικά δεδομένα."
                }
            },
            "isDefault": "false"
        },
        "pl": {
            "common_tokens": {
                "confirmation_button": "Zapisz ustawienia i zamknij",
                "title": "Centrum preferencji plików cookie",
                "message": "Ta witryna korzysta z plików cookie. Szczegółowe informacje na temat tego, w jaki sposób używamy plików cookie, można znaleźć w pełnej wersji <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Informacji o używaniu plików cookie</a>. Aby odrzucić wszystkie pliki cookie niebędące plikami niezbędnymi, wystarczy kliknąć „zapisz ustawienia i zamknij” poniżej. Aby zaakceptować lub odrzucić pliki cookie według kategorii, wystarczy kliknąć karty po lewej stronie. Użytkownik ma prawo do wglądu w swoje ustawienia oraz do ich zmiany w dowolnym czasie.",
                "no": "Nieaktywne",
                "yes": "Aktywne"
            },
            "custom_tokens": {
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "your_privacy": "Prywatność użytkownika",
                "privacy_policy_url": "https://www.huawei.com/pl/cookies-policy",
                "essential_cookies_description": "Te pliki są niezbędne do działania witryny i nie mogą być wyłączone w naszych systemach. Zwykle są one umieszczane w odpowiedzi na działania użytkownika stanowiące prośbę o usługi, np. wybieranie ustawień prywatności, logowanie lub wypełnianie formularzy. Można ustawić w przeglądarce blokowanie takich plików cookie lub powiadamianie o nich, ale w takim przypadku niektóre części witryny nie będą działać. Te pliki cookie nie przechowują żadnych danych osobowych umożliwiających identyfikację.",
                "cookies_used": "Używane pliki cookie",
                "essential_cookies": "Niezbędne pliki cookie",
                "accept_cookies": "Akceptuj pliki cookie",
                "reset": "Redefinir",
                "always_active": "Zawsze aktywne"
            },
            "isDefault": "false",
            "categories": {
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "affiliates": {
                    "notes": "",
                    "name": ""
                },
                "search": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "name": "Analityczne pliki cookie",
                    "notes": "Te pliki cookie pozwalają nam liczyć wizyty i źródła ruchu, abyśmy mogli mierzyć i usprawniać wydajność naszej witryny. Pomagają nam w rozpoznawaniu, które strony są najmniej i najbardziej popularne, i pozwalają zobaczyć, w jaki sposób goście poruszają się po witrynie. Wszystkie informacje zbierane przez te pliki cookie są zagregowane i tym samym anonimowe. Jednakże inne firmy zapewniające te usługi, Hypers Analytics będą przetwarzać dane osobowe użytkownika, aby zapewnić zagregowane dane."
                },
                "social": {
                    "name": "",
                    "notes": ""
                },
                "mobile": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "Te pliki cookie są umieszczane przez naszych partnerów reklamowych. Są one wykorzystywane do stworzenia profilu zainteresowań użytkownika, do wyświetlania odpowiednich reklam w innych witrynach oraz do umożliwienia polubienia i udostępnienia naszych treści w mediach społecznościowych. Nie przechowują one bezpośrednio danych osobowych, ale działają w oparciu o możliwość unikatowej identyfikacji przeglądarki i urządzenia, z których użytkownik korzysta do przeglądania Internetu. Ponadto inne firmy umieszczające te pliki cookie mogą skojarzyć dane osobowe użytkownika z przeglądanymi przez niego stronami, jeśli w czasie przeglądania jest zalogowany do ich usług.",
                    "name": "Reklamowe pliki cookie"
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "name": "Personalizacyjne pliki cookie",
                    "notes": "Używamy plików cookie w celu zapamiętania preferencji użytkownika i zapewnienia mu bardziej spersonalizowanych usług i treści."
                },
                "engagement": {
                    "name": "",
                    "notes": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "monitoring": {
                    "notes": "",
                    "name": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                }
            }
        },
        "vi": {
            "categories": {
                "analytics": {
                    "name": "Cookie phân tích",
                    "notes": "Những cookie này cho phép chúng tôi đếm số lượt truy cập và nguồn lưu lượng truy cập để chúng tôi có thể đo lường và cải thiện hiệu suất trang web của mình. Chúng giúp chúng tôi biết trang nào được yêu thích nhất và ít phổ biến nhất cũng như xem cách khách truy cập di chuyển quanh trang web. Tất cả thông tin mà các cookie này thu thập được tổng hợp và ẩn danh. Tuy nhiên, các bên thứ ba cung cấp các dịch vụ này sẽ xử lý dữ liệu cá nhân của bạn để cung cấp dữ liệu tổng hợp."
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "notes": "",
                    "name": ""
                },
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "social": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "",
                    "name": ""
                },
                "mobile": {
                    "name": "",
                    "notes": ""
                },
                "engagement": {
                    "name": "",
                    "notes": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "misc": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                }
            },
            "isDefault": "false",
            "common_tokens": {
                "no": "Không bật",
                "yes": "Hoạt động",
                "message": "Chúng tôi sử dụng cookie trên trang web này. Để tìm hiểu chi tiết về cách chúng tôi sử dụng cookie, vui lòng đọc <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Thông báo cookie đầy đủ</a> của chúng tôi. Để từ chối tất cả các cookie không cần thiết, nhấp vào \"Lưu và Đóng\" bên dưới. Để chấp nhận hoặc từ chối cookie theo danh mục, vui lòng nhấp vào các tab bên trái. Bạn có thể xem lại và thay đổi các cài đặt này bất kỳ lúc nào.",
                "confirmation_button": "Lưu và Đóng",
                "title": "Tùy chọn quyền riêng tư của bạn"
            },
            "custom_tokens": {
                "privacy_policy_url": "https://www.huawei.com/vn/cookies-policy",
                "your_privacy": "Quyền riêng tư của bạn",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "cookies_used": "Các Cookie được sử dụng",
                "essential_cookies_description": "Những cookie này cần thiết để trang web hoạt động và không thể tắt trong hệ thống của chúng tôi. Chúng thường chỉ được đặt để phản hồi các hành động do bạn thực hiện tạo thành yêu cầu dịch vụ, chẳng hạn như cài đặt tùy chọn quyền riêng tư của bạn, đăng nhập hoặc điền vào biểu mẫu. Bạn có thể đặt trình duyệt của mình để chặn hoặc cảnh báo bạn về những cookie này, nhưng khi đó một số phần của trang web sẽ không hoạt động. Những cookie này không lưu trữ bất kỳ thông tin định danh cá nhân nào.",
                "reset": "Cài đặt lại",
                "always_active": "Luôn hoạt động",
                "privacy_policy_text": "",
                "essential_cookies": "Cookie thiết yếu"
            }
        },
        "uk": {
            "common_tokens": {
                "title": "Центр параметрів файлів сookie",
                "confirmation_button": "Зберегти та закрити",
                "message": "ми використовуємо файли cookie на цьому веб-сайті. Щоб детально дізнатись про те, як ми використовуємо файли cookie, прочитайте повне Повідомлення <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">про файли cookie</a> . Щоб відхилити всі несуттєві файли cookie, просто натисніть \"Зберегти та закрити\" нижче. Щоб прийняти чи відхилити файли cookie за категоріями, просто натисніть на вкладки ліворуч. Ви можете будь-коли переглянути та змінити свої налаштування.",
                "yes": "Активні",
                "no": "Неактивний"
            },
            "custom_tokens": {
                "always_active": "завжди активний",
                "reset": "Скинути",
                "accept_cookies": "Прийняти файли сookie",
                "essential_cookies": "основні файли cookie",
                "privacy_policy_text": "",
                "essential_cookies_description": "ці файли cookie необхідні для функціонування веб-сайту і не можуть бути вимкнені в наших системах. Зазвичай вони встановлюються лише у відповідь на вчинені вами дії, які становлять запит на послуги, наприклад, встановлення ваших уподобань щодо конфіденційності, вхід в систему чи заповнення форм. Ви можете налаштувати браузер так, щоб він заблокував або попередив вас про ці файли cookie, але деякі частини веб-сайту не працюватимуть. Ці файли cookie не зберігають жодної особистої інформації.",
                "cookies_used": "Використані файли cookie",
                "your_privacy": "Ваша конфіденційність",
                "privacy_policy_url": "https://www.huawei.com/ua/cookies-policy",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png"
            },
            "categories": {
                "cookiematch": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "name": "",
                    "notes": ""
                },
                "crm": {
                    "name": "",
                    "notes": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "mobile": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "ці файли cookie встановлюються нашими рекламними партнерами. Вони використовуються для створення профілю ваших інтересів та показу відповідної реклами на інших веб-сайтах, а також дозволяють вам поставити \"лайк\" та \"поділитися\" нашим вмістом у соціальних мережах. Вони не зберігають безпосередньо особисту інформацію, а базуються на унікальній ідентифікації вашого браузера та інтернет-пристрою. Крім того, треті сторони, які встановлюють ці файли cookie, можуть пов’язувати ваші особисті дані з вашою поведінкою в режимі перегляду, якщо ви ввійшли в їхні послуги на той момент.",
                    "name": "рекламні файли cookie"
                },
                "social": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "notes": "ці файли cookie дозволяють нам підраховувати відвідування та джерела трафіку, щоб ми могли виміряти та покращити ефективність нашого веб-сайту. Вони допомагають нам дізнатися, які сторінки є найбільш і найменш популярними, і побачити, як відвідувачі пересуваються по сайту. Вся інформація, яку збирають ці файли cookie, є сукупною та, отже, анонімною. Однак треті сторони, що надають ці послуги, Google Analytics оброблятимуть ваші персональні дані для надання агрегованих даних.",
                    "name": "аналітичні файли cookie"
                },
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "affiliates": {
                    "notes": "",
                    "name": ""
                },
                "search": {
                    "name": "",
                    "notes": ""
                }
            },
            "isDefault": "false"
        },
        "fr": {
            "categories": {
                "cookiematch": {
                    "name": "",
                    "notes": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "Ces cookies sont déposés par nos partenaires publicitaires. Ils permettent de créer un profil de vos centres d'intérêt et de vous présenter des annonces pertinentes sur d'autres sites Web. Ils vous permettent aussi d'« Aimer » et de « Partager » nos contenus sur les réseaux sociaux. Ils ne stockent pas directement vos données personnelles, mais ils identifient individuellement votre navigateur et votre appareil électronique. De plus, les tiers qui déposent ces cookies sont susceptibles d'associer vos données personnelles à votre comportement de navigation si vous êtes connecté(e) à leurs services au même moment.",
                    "name": "Cookies publicitaires"
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "name": "",
                    "notes": ""
                },
                "crm": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "personalization": {
                    "name": "Cookies de personnalisation",
                    "notes": "Nous utilisons des cookies afin d'enregistrer vos préférences et de vous offrir une expérience de contenu plus personnalisée."
                },
                "analytics": {
                    "notes": "Ces cookies nous permettent de compter le nombre de visites et de déterminer les sources de trafic afin de mesurer et d'améliorer les performances de notre site. Ils nous permettent d'identifier les pages les plus et les moins populaires, ainsi que de suivre le parcours des visiteurs sur le site. Toutes les informations collectées par ces cookies le sont de manière agrégée, et sont par conséquent anonymes. Cependant, vos données personnelles seront traitées par les tiers fournissant ces services: Hypers Analytics qui sont chargés de nous remettre ces données agrégées.",
                    "name": "Cookies analytiques"
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "social": {
                    "name": "",
                    "notes": ""
                }
            },
            "isDefault": "false",
            "custom_tokens": {
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "privacy_policy_url": "https://www.huawei.com/fr/cookies-policy",
                "your_privacy": "Votre confidentialité",
                "essential_cookies_description": "Ces cookies sont indispensables au bon fonctionnement du site Web et ne peuvent pas être désactivés dans nos systèmes. Ils sont généralement déposés suite à des actions que vous effectuez pour obtenir les services requis, par exemple lorsque vous définissez vos préférences en matière de confidentialité, que vous vous connectez ou que vous remplissez des formulaires. Vous pouvez configurer votre navigateur pour qu'il bloque ces cookies ou vous avertisse de leur présence, mais certaines parties du site Web ne fonctionneront plus. Ces cookies ne stockent aucune donnée à caractère personnel.",
                "cookies_used": "Cookies utilisés",
                "essential_cookies": "Cookies essentiels",
                "always_active": "Toujours actifs",
                "reset": "Réinitialiser",
                "accept_cookies": "Accepter tous les cookies"
            },
            "common_tokens": {
                "yes": "Actifs",
                "no": "Inactifs",
                "title": "Centre de préférence relatif aux cookies",
                "confirmation_button": "Enregistrer et fermer",
                "message": "Ce site Web utilise des cookies. Pour en savoir plus sur la manière dont nous utilisons les cookies, veuillez consulter notre <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Politique des cookies</a>. Pour rejeter tous les cookies non essentiels, cliquez simplement sur «Enregistrer et fermer» ci-dessous. Pour accepter ou refuser les cookies par catégorie, cliquez sur les onglets à gauche. Vous pouvez rectifier et modifier vos paramètres à tout moment."
            }
        },
        "ro": {
            "custom_tokens": {
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "privacy_policy_url": "https://www.huawei.com/ro/cookies-policy",
                "your_privacy": "Confidențialitatea dumneavoastră",
                "essential_cookies_description": "Aceste cookie-uri sunt necesare pentru funcționarea website-ului și nu pot fi dezactivate în sistemele noastre. În mod normal, acestea sunt setate doar ca răspuns la acțiunile dvs., care reprezintă o solicitare de servicii, cum ar fi setarea preferințelor dumneavoastră privind confidențialitatea, conectarea sau completarea de formulare. Puteți seta browserul să blocheze sau să vă alerteze cu privire la aceste cookie-uri, dar anumite părți ale website-ului nu vor funcționa fără acestea. Aceste cookie-uri nu stochează nicio informație identificabilă.",
                "cookies_used": "Cookie-uri Folosite",
                "privacy_policy_text": "",
                "essential_cookies": "Cookie-uri Esențiale",
                "reset": "Resetează",
                "accept_cookies": "Accepta Cookie-uri",
                "always_active": "Întotdeauna active"
            },
            "common_tokens": {
                "message": "Pe acest website folosim cookie-uri. Pentru a afla în detaliu despre modul în care folosim cookie-uri, vă rugăm să citiți <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Politica noastră integrală privind cookie-urile</a>. Pentru a respinge toate cookie-urile neesențiale, faceți click pe butonul „Save and close” de mai jos. Pentru a accepta sau a respinge cookie-urile în funcție de categoria acestora, vă rugăm să faceți click pe filele din partea stângă. Puteți vizualiza din nou și modifica setările în oricare moment.",
                "title": "Centrul de preferințe privind cookie-urile",
                "confirmation_button": "Salvează și Închide",
                "yes": "Active",
                "no": "Inactive"
            },
            "categories": {
                "social": {
                    "name": "",
                    "notes": ""
                },
                "analytics": {
                    "notes": "Aceste cookie-uri ne permit să numărăm vizitele și sursele de trafic, pentru a putea măsura și îmbunătăți performanța website-ului. Ne ajută să știm care pagini sunt cele mai populare și cele mai puțin populare și să vedem care este dinamica vizitatorilor pe website. Toate informațiile colectate de aceste cookie-uri sunt agregate și, prin urmare, anonime. Totuși, terțele părți care furnizează aceste servicii, Hypers Analytics prelucrează datele dumneavoastră cu caracter personal pentru a furniza datele agregate.",
                    "name": "Cookie-uri Analitice"
                },
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "affiliates": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "Aceste cookie-uri sunt setate de către partenerii noștri de publicitate. Sunt utilizate pentru a crea un profil al intereselor dumneavoastră si pentru a vă arăta mesaje publicitare relevante ale altor website-uri, și pentru a vă permite să dați “Like” și “Share” conținutului nostru pe platformele de socializare. Aceste cookie-uri nu stochează direct date cu caracter personal, dar se bazează pe identificarea unică a browser-ului și a dispozitivului dumneavoastră conectat la internet. În plus, terții care au setat aceste cookie-uri pot asocia datele dumneavoastră cu caracter personal cu comportamentul dumneavoastră de navigare pe internet în cazul în care sunteți conectat la serviciile acestora în acel moment.",
                    "name": "Cookie-uri Publicitare"
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "monitoring": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "notes": "",
                    "name": ""
                }
            },
            "isDefault": "false"
        },
        "it": {
            "custom_tokens": {
                "privacy_policy_url": "https://www.huawei.com/it/cookies-policy",
                "your_privacy": "Privacy dell'utente",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "cookies_used": "Salvare le impostazioni",
                "essential_cookies_description": "Questi cookie sono necessari per il funzionamento del sito web e non possono essere disattivati nei nostri sistemi. Solitamente vengono impostati solo in risposta ad azioni effettuate dall'utente che equivalgono a una richiesta di servizi, quali l'impostazione delle preferenze sulla privacy, l'accesso o la compilazione di moduli. L'utente può impostare il browser per ricevere un avviso in merito a questi cookie o per bloccarli, ma alcune parti del sito non funzioneranno in tal caso. Questi cookie non memorizzano nessuna informazione personale identificabile.",
                "essential_cookies": "Cookie tecnici",
                "accept_cookies": "Accetta i cookie",
                "always_active": "Sempre attivi",
                "reset": "Ripristina"
            },
            "common_tokens": {
                "yes": "Attivi",
                "no": "Inattivi",
                "message": "Questo sito web utilizza i cookie. Per ulteriori informazioni sull'utilizzo dei cookie, si rimanda alla nostra  <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Informativa sui Cookie</a>. Per rifiutare tutti i cookie non essenziali fai semplicemente clic su \"Salva e chiudi\" sotto. Per accettare o rifiutare i cookie per categoria, basta fare clic sulle schede a sinistra. L'utente può rivedere e modificare le impostazioni in qualsiasi momento.",
                "title": "Centro preferenze cookie",
                "confirmation_button": "Salva e chiudi"
            },
            "isDefault": "false",
            "categories": {
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "affiliates": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "notes": "Questi cookie ci consentono di contare le visite e le fonti di traffico in modo da poter misurare e migliorare le prestazioni del nostro sito. Ci consentono di conoscere le pagine più popolari e quelle meno visitate, oltre a vedere gli spostamenti dei visitatori all'interno del sito. Tutte le informazioni raccolte da questi cookie sono in forma aggregata e, di conseguenza, anonima. Tuttavia, le terze parti che forniscono tali servizi, Hypers Analytics tratteranno i dati personali dell'utente al fine di fornire informazioni in forma aggregata.",
                    "name": "Cookie analitici"
                },
                "social": {
                    "notes": "",
                    "name": ""
                },
                "mobile": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "name": "Cookie pubblicitari",
                    "notes": "Questi cookie vengono impostati dai nostri partner pubblicitari. Vengono utilizzati per creare un profilo degli interessi dell'utente e mostrare annunci pertinenti su altri siti web. Inoltre consentono all'utente di mettere \"Mi piace\" e \"Condividere\" i nostri contenuti sui social media. Non memorizzano direttamente informazioni personali, ma si basano sull'identificazione univoca del browser e del dispositivo Internet dell'utente. Inoltre, le terze parti che impostano questi cookie possono collegare i dati personali dell'utente al suo comportamento di navigazione se in quel momento ha effettuato l'accesso ai loro servizi."
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "notes": "Usiamo i cookie per ricordare le tue preferenze e offrirti un'esperienza di contenuti maggiormente personalizzati.",
                    "name": "Cookie di personalizzazione"
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                }
            }
        },
        "es": {
            "isDefault": "false",
            "categories": {
                "mobile": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "Estas cookies son instaladas por nuestras empresas publicitarias colaboradoras. Se utilizan para elaborar un perfil de sus intereses y presentar anuncios pertinentes en otros sitios web, así como para permitirle hacer clic en «Me gusta» en nuestro contenido disponible en las redes sociales y compartirlo. La información que almacenan es aquella necesaria para identificar de manera única su navegador y dispositivo de conexión a Internet. Asimismo, las empresas de publicidad que instalan estas cookies pueden asociar los datos personales de sus cuentas a su comportamiento de navegación en esta web, si está conectado a sus servicios en ese momento. A efectos aclaratorios, si está conectado a los servicios de un buscador o una red social y entra en esta web, puede asociarse la visita de la página a su cuenta en ese buscador o red social.",
                    "name": "Cookies publicitarias"
                },
                "personalization": {
                    "name": "Cookies de personalización",
                    "notes": "Usamos cookies para recordar sus preferencias y ofrecerle una experiencia de contenido más personalizada."
                },
                "email": {
                    "notes": "",
                    "name": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "crm": {
                    "name": "",
                    "notes": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "affiliates": {
                    "notes": "",
                    "name": ""
                },
                "search": {
                    "notes": "",
                    "name": ""
                },
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "analytics": {
                    "notes": "Estas cookies nos permiten realizar un recuento de las visitas y fuentes de tráfico para poder medir y mejorar el funcionamiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y menos populares, y comprobar cuántos usuarios navegan por el sitio web. Toda la información que estas cookies recopilan se agrega y, después, se anonimiza. No obstante los terceros que prestan estos servicios, Hypers Analytics tratarán sus datos personales para facilitar los datos agregados.",
                    "name": "Cookies analíticas"
                },
                "social": {
                    "notes": "",
                    "name": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                },
                "misc": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                }
            },
            "common_tokens": {
                "no": "Inactivas",
                "yes": "Activas",
                "confirmation_button": "Guardar y cerrar",
                "title": "Centro de gestión de preferencias de cookies",
                "message": "En este sitio web utilizamos cookies. Para obtener más información acerca de cómo utilizamos las cookies, consulte nuestro <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Aviso de Cookies completo</a>. Para rechazar todas las cookies no esenciales, simplemente haga clic en \"Guardar y cerrar\" abajo. Para aceptar o rechazar cookies por categoría, haga clic en las pestañas de la izquierda. Puede volver a visitar el centro y modificar sus ajustes en cualquier momento."
            },
            "custom_tokens": {
                "always_active": "Siempre activas",
                "reset": "Restablecer",
                "accept_cookies": "Aceptar todas las cookies",
                "essential_cookies": "Cookies esenciales",
                "cookies_used": "Cookies utilizadas",
                "essential_cookies_description": "Estas cookies son necesarias para que el sitio web funcione correctamente y no se pueden desactivar. Estas cookies permiten adecuar la página web en cuestiones tales como: recordar sus preferencias de privacidad respecto a las cookies, iniciar sesión, adaptar el idioma o rellenar formularios. Puede configurar su navegador para bloquear o alertarle acerca de estas cookies; no obstante, si lo hace, algunas funcionalidades de la web no funcionarán.",
                "privacy_policy_url": "https://www.huawei.com/es/cookies-policy",
                "your_privacy": "Información general sobre las cookies",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png"
            }
        },
        "sk": {
            "custom_tokens": {
                "reset": "Resetovať",
                "always_active": "Vždy aktívne",
                "privacy_policy_text": "",
                "essential_cookies": "Základné cookies",
                "essential_cookies_description": "Tieto cookies sú nevyhnutné pre fungovanie webovej stránky a nie je ich možné v našich systémoch vypnúť. Zvyčajne sa aktivujú iba v reakcii na vami vykonané akcie, spočíajúce v požiadavkách na služby, ako je nastavenie vašich preferencií ochrany osobných údajov, prihlasovanie alebo vyplnenie formulárov. Váš prehliadač môžete nastaviť tak, aby blokoval alebo upozorňoval na tieto súbory cookie, ale niektoré časti stránky potom nebudú fungovať. Tieto súbory cookie neukladajú žiadne informácie, ktoré by mohli identifikovať jednotlivca.",
                "cookies_used": "Používané cookies",
                "privacy_policy_url": "https://solar.huawei.com/sk/cookies",
                "your_privacy": "Vaše súkromie",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png"
            },
            "common_tokens": {
                "message": "Na tejto webovej stránke používame súbory cookie. Ak sa chcete podrobne dozvedieť o tom, ako používame súbory cookie, prečítajte si celé naše <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Oznámenie o súboroch cookie</a>. Ak chcete odmietnuť všetky tzv. netechnické cookies, kliknite na „Uložiť a zavrieť“ nižšie. Ak chcete prijať alebo odmietnuť kategórie súborov cookie, jednoducho kliknite na záložky vľavo. Svoje nastavenia môžete kedykoľvek znova navštíviť a zmeniť. ",
                "title": "Vaše predvoľby ochrany osobných údajov",
                "confirmation_button": "Uložiť a zavrieť",
                "yes": "Aktívne",
                "no": "Neaktívne"
            },
            "categories": {
                "social": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "notes": "Tieto súbory cookie nám umožňujú počítať návštevy a zdroje návštevnosti, aby sme mohli merať a zlepšovať výkonnosť našej stránky. Pomáhajú nám zistiť, ktoré stránky sú najpopulárnejšie a ktoré najmenej, a vidieť, ako sa návštevníci po stránke pohybujú. Všetky informácie, ktoré tieto súbory cookie zhromažďujú, sú súhrnné, a preto anonymné. Tretie strany poskytujúce tieto služby však budú spracúvať vaše osobné údaje za účelom poskytnutia súhrnných údajov. Analytické cookies používame iba s vašim súhlasom. Svoj súhlas môžete kedykoľvek odvolať. Aktiváciou tohto tlačidla súhlasíte s reklamnými súbormi cookie. Váš súhlas môžete kedykoľvek odvolať.",
                    "name": "Analytické cookies"
                },
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "search": {
                    "notes": "",
                    "name": ""
                },
                "affiliates": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "cdp": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "notes": "",
                    "name": ""
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "display_ads": {
                    "notes": "Tieto súbory cookie nastavujú naši reklamní partneri. Používajú sa na vytvorenie profilu vašich záujmov a zobrazovanie relevantných reklám na iných webových stránkach a tiež na to, aby vám umožnili označiť náš obsah „Páči sa mi to“ a „Zdieľať“ na sociálnych médiách. Neuchovávajú priamo osobné informácie, ale sú založené na jednoznačnej identifikácii vášho prehliadača a internetového zariadenia. Okrem toho môžu tretie strany, ktoré nastavujú tieto súbory cookie, prepojiť vaše osobné údaje s vaším správaním pri prehliadaní, ak ste v tom čase prihlásení do ich služieb. Aktiváciou tohto tlačidla súhlasíte s reklamnými súbormi cookie. Váš súhlas môžete kedykoľvek odvolať.",
                    "name": "Reklamné cookies"
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "misc": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "notes": "",
                    "name": ""
                }
            },
            "isDefault": "false"
        },
        "en": {
            "isDefault": "true",
            "categories": {
                "social": {
                    "name": "Social",
                    "notes": "To better generate, target, and deliver marketing communications via Social networks."
                },
                "big_data": {
                    "notes": "",
                    "name": "Big Data"
                },
                "affiliates": {
                    "notes": "",
                    "name": "Affiliates"
                },
                "search": {
                    "notes": "",
                    "name": "Search"
                },
                "analytics": {
                    "name": "Analytics Cookies",
                    "notes": "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. However, the third parties providing these services, they will process your personal data in order to provide the aggregated data."
                },
                "personalization": {
                    "name": "Personalization Cookies",
                    "notes": "We use cookies so that we can remember your preferences and provide you with a more personalized content experience. "
                },
                "cdp": {
                    "name": "CDP",
                    "notes": "To create a persistent, unified customer database that is accessible to all of our systems."
                },
                "email": {
                    "notes": "To track when visitors are entering our site to determine effectiveness of our targeting efforts.",
                    "name": "Email"
                },
                "engagement": {
                    "name": "",
                    "notes": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "mobile": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "These cookies are set by our advertising partners. They are used to build a profile of your interests and show relevant ads on other websites, and to also allow you to 'Like' and 'Share' our content on social media. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. Additionally, the third parties setting these cookies may link your personal data with your browsing behaviour if you are logged into their services at the time.",
                    "name": "Advertising Cookies"
                },
                "monitoring": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "name": "Misc",
                    "notes": ""
                },
                "cookiematch": {
                    "name": "Cookie Match",
                    "notes": "To ensure we are serving relevant ads."
                }
            },
            "custom_tokens": {
                "your_privacy": "Your Privacy",
                "privacy_policy_url": "https://www.huawei.com/en/cookies-policy",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "essential_cookies_description": "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.",
                "cookies_used": "Cookies Used",
                "accept_cookies": "Accept Cookies",
                "reset": "Reset",
                "always_active": "Always Active",
                "essential_cookies": "Essential Cookies"
            },
            "common_tokens": {
                "yes": "Active",
                "confirmation_button": "Save and Close",
                "status": "Status",
                "message": "We use cookies on this website. To learn in detail about how we use cookies, please read our <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">full Cookies Notice</a>. To reject all non-essential cookies simply click \"Save and Close\" below. To accept or reject cookies by category please simply click on the tabs to the left. You can revisit and change your settings at any time.",
                "category": "Category",
                "description": "Description",
                "no": "Inactive",
                "title": "Your Privacy Preferences"
            }
        },
        "pt": {
            "common_tokens": {
                "yes": "ativo",
                "no": "inativo",
                "title": "Preferências de Privacidade",
                "confirmation_button": "Guardar e Fechar",
                "message": "Nós usamos cookies neste site. Para saber em detalhe sobre como usamos cookies leia nosso Aviso cookies completo. Para rejeitar <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">todos os cookies não essenciais</a>, basta clicar em \"Guardar e Fechar\" abaixo. Para aceitar ou rejeitar cookies por categoria, basta clicar nas abas à esquerda. Pode revisitar e alterar suas configurações a qualquer momento."
            },
            "custom_tokens": {
                "cookies_used": "cookies usado",
                "essential_cookies_description": "Cookies Essenciais. Estes cookies são necessários para o funcionamento do site e não podem ser desativados nos nossos sistemas. Eles geralmente são definidos apenas em resposta a ações feitas por você que equivalem a uma solicitação de serviços, como definir suas preferências de privacidade, fazer login ou preencher formulários. Pode configurar seu navegador para bloqueá-lo ou alertá-lo sobre esses cookies mas algumas partes do site não funcionarão. Estes cookies não armazenam nenhuma informação de identificação pessoal.",
                "privacy_policy_text": "",
                "essential_cookies": "Cookies Essenciais",
                "always_active": "Sempre Activo",
                "reset": "Reset",
                "your_privacy": "Privacidade",
                "privacy_policy_url": "https://solar.huawei.com/pt/cookies",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png"
            },
            "isDefault": "false",
            "categories": {
                "display_ads": {
                    "notes": "Estes cookies são definidos pelos nossos parceiros de publicidade. São usados para criar um perfil dos seus interesses e exibir anúncios relevantes noutros sites, além de permitir que você 'goste' e 'partilhe' o nosso conteúdo nas redes sociais. Os cookies não armazenam diretamente informações pessoais, mas são baseados em identificar exclusivamente o seu navegador e dispositivo de internet. Além disso, os terceiros que definem estes cookies podem ligar os seus dados pessoais ao seu comportamento de navegação se estiver conectado nos seus serviços no momento.",
                    "name": "Cookies de publicidade"
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "name": "Cookies Analiticos",
                    "notes": "Estes cookies permitem-nos contar visitas e fontes de tráfego para que possamos medir e melhorar o desempenho do nosso site. Ajudam-nos a saber quais páginas são as mais e menos populares e ver como os visitantes se movem pelo site. Todas as informações coletadas por esses cookies são agregadas e, portanto, anônimas. No entanto, os terceiros que fornecem esses serviços, eles processarão seus dados pessoais para fornecer os dados agregados."
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "social": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                }
            }
        },
        "nl": {
            "isDefault": "false",
            "categories": {
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "name": "Analytische cookies",
                    "notes": "Met deze cookies kunnen we bezoeken en verkeersbronnen tellen, zodat we de prestaties van onze website kunnen meten en verbeteren. Ze helpen ons om te achterhalen welke pagina's het meest en het minst populair zijn en om te zien hoe bezoekers zich over de site bewegen. Alle informatie die door deze cookies verzameld wordt, wordt samengevoegd en is daardoor anoniem. De derden die deze diensten leveren, Hypers Analytics verwerken je persoonlijke gegevens echter om de samengevoegde gegevens te verstrekken."
                },
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "social": {
                    "name": "",
                    "notes": ""
                },
                "mobile": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "Deze cookies worden door onze advertentiepartners ingesteld. Ze worden gebruikt om een profiel van je interesses op te bouwen en relevante advertenties op andere websites weer te geven, en om je ook in staat te stellen onze inhoud op sociale media te ‘Liken’ en te ‘Delen’. Ze slaan geen persoonlijke informatie rechtstreeks op, maar zijn gebaseerd op een unieke identificatie van je browser en internetapparaat. Bovendien kunnen de derden die deze cookies instellen je persoonlijke gegevens koppelen aan je surfgedrag als je op dat moment bent aangemeld bij hun diensten.",
                    "name": "Advertentiecookies"
                },
                "crm": {
                    "name": "",
                    "notes": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                }
            },
            "common_tokens": {
                "confirmation_button": "Opslaan en afsluiten",
                "message": "We gebruiken cookies op deze website. Lees onze <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">volledige Cookiemelding</a> voor meer informatie over hoe wij cookies gebruiken. Als u alle niet-essentiële cookies wilt weigeren, klikt u hieronder op 'Opslaan en sluiten'. Klik op de tabbladen aan de linkerkant om cookies per categorie te accepteren of te weigeren. Je kunt je instellingen op elk moment opnieuw bekijken en wijzigen.",
                "status": "Status",
                "yes": "Actief",
                "title": "Cookies voorkeursinstellingen",
                "category": "Category",
                "description": "Description",
                "no": "Inactief"
            },
            "custom_tokens": {
                "reset": "Terugzetten",
                "always_active": "Altijd actief",
                "accept_cookies": "Accepteer cookies",
                "essential_cookies": "Essentiële cookies",
                "cookies_used": "Gebruikte cookies",
                "essential_cookies_description": "Deze cookies zijn noodzakelijk voor de werking van de website en kunnen in onze systemen niet uitgeschakeld worden. Ze worden meestal alleen ingesteld als reactie op jouw acties die neerkomen op een verzoek om diensten, zoals het instellen van je privacyvoorkeuren, het inloggen of het invullen van formulieren. Je kunt je browser zo instellen om deze cookies te blokkeren of om je ervoor te waarschuwen, maar sommige delen van de website werken dan niet. Deze cookies slaan geen persoonlijk identificeerbare informatie op.",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "your_privacy": "Privacy",
                "privacy_policy_url": "https://www.huawei.com/nl/cookies-policy"
            }
        },
        "hu": {
            "isDefault": "false",
            "categories": {
                "analytics": {
                    "name": "Analitikus sütik",
                    "notes": "Ezek a sütik lehetővé teszik számunkra a látogatások és a forgalmi források számbavételét, így mérni és javítani tudjuk webhelyünk teljesítményét. Segítenek megismerni, hogy mely oldalak a legnépszerűbbek és legkevésbé népszerűek, és mutatják, hogy a látogatók hogyan mozognak az oldalon. A sütik által gyűjtött összes információ összesítve van, és ezért névtelen. Azonban ezeket a szolgáltatásokat nyújtó harmadik felek, a Hypers Analytics az összesített adatok megadása érdekében feldolgozzák az Ön személyes adatait."
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "social": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "name": "Reklám sütik",
                    "notes": "Ezeket a sütiket hirdetési partnereink állítják be. Ezeket arra használják, hogy az Ön érdeklődési körének profilját összeállítsák, és releváns hirdetéseket jelenítsenek meg más webhelyeken, valamint lehetővé teszik a tartalom „lájkolását” és „megosztását” a közösségi oldalakon. Nem tárolnak közvetlenül személyes adatokat, hanem a böngésző és az interneteszköz egyedi azonosításán alapulnak. Ezenkívül a sütiket beállító harmadik felek összekapcsolhatják az Ön személyes adatait az Ön böngészési magatartásával, ha Ön éppen be van jelentkezve a szolgáltatásaikba."
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "name": "",
                    "notes": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                }
            },
            "custom_tokens": {
                "privacy_policy_text": "",
                "essential_cookies": "Alapvető sütik",
                "reset": "Visszaállítás",
                "accept_cookies": "Sütik elfogadása",
                "always_active": "Mindig aktív",
                "essential_cookies_description": "Ezek a sütik a weboldal működéséhez szükségesek, és a rendszereinkben nem kapcsolhatók ki. Általában csak az Ön által elvégzett tevékenységekre reagálva állítják be a szolgáltatás iránti kérelmet, például az adatvédelmi beállítások megadását, a bejelentkezést vagy az űrlapok kitöltését. Beállíthatja böngészőjét, hogy blokkolja a sütiket vagy figyelmeztesse Önt ezekről a sütikről, de a webhely egyes részei akkor nem fognak működni. Ezek a sütik nem tárolnak személyazonosításra alkalmas információkat.",
                "cookies_used": "Használt sütik",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "your_privacy": "Az Ön személyes adatai",
                "privacy_policy_url": "https://e.huawei.com/hu/cookies-policy"
            },
            "common_tokens": {
                "confirmation_button": "Mentés és bezárás",
                "status": "",
                "message": "Ezen a weboldalon sütiket használunk. Ha részletesebben meg szeretné tudni, hogyan használjuk a sütiket, kérjük, olvassa el a sütikről <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">szóló teljes tájékoztatónkat</a>. Az összes nem alapvető sütik elutasításához egyszerűen kattintson az alábbi \"Mentés és Bezárás\" gombra. A sütik kategóriánkénti elfogadásához vagy elutasításához kattintson a bal oldalon található fülekre. A beállításokat bármikor felülvizsgálhatja és módosíthatja.",
                "yes": "Aktív",
                "title": "Süti beállítási központ",
                "category": "",
                "description": "",
                "no": "Inaktív"
            }
        },
        "bg": {
            "common_tokens": {
                "message": "Ние използваме бисквитки/cookies на този уебсайт. За да научите подробно как използваме бисквитки/cookies, моля, прочетете <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">цялата ни информация за бисквитки/cookies</a>. За да отхвърлите всички несъществени бисквитки/cookies просто кликнете върху \"Запазване и затваряне\" по-долу. За да приемете или отхвърлите бисквитки/cookies по категории, моля, кликнете върху разделите вляво. Можете да преразгледате и промените настройките си по всяко време.",
                "title": "Вашите предпочитания за поверителност",
                "confirmation_button": "запазване и затваряне",
                "yes": "активен",
                "no": "неактивен"
            },
            "custom_tokens": {
                "essential_cookies": "Основни бисквитки/cookies",
                "privacy_policy_text": "",
                "reset": "нулиране",
                "always_active": "Винаги активен",
                "essential_cookies_description": "Тези бисквитки/cookies са необходими, за да функционира уеб сайта и не могат да бъдат изключени в нашите системи. Те обикновено се задават само в отговор на действия, направени от Вас, които представляват искане за услуги, като например определяне на вашите предпочитания за поверителност, влизане или попълване на формуляри. Можете да настроите браузъра си да блокира или да ви предупреди за тези cookies, но някои части на сайта няма да работят. Тези cookies не съхраняват никаква лична информация.",
                "cookies_used": "Използвани бисквитки/cookies ",
                "privacy_policy_url": "https://solar.huawei.com/bg/cookies",
                "your_privacy": "Вашaта поверителност",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png"
            },
            "isDefault": "false",
            "categories": {
                "cookiematch": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "notes": "",
                    "name": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "display_ads": {
                    "name": "Рекламни бисквитки/cookies",
                    "notes": "Тези бисквитки/cookies са зададени от нашите рекламни партньори. Те се използват за изграждане на профил на вашите интереси и показване на подходящи реклами на други уебсайтове, както и за да ви позволят да 'Харесвате' и 'Сподели' нашето съдържание в социалните медии. Те не съхраняват директно лична информация, а се основават на уникално идентифициране на вашия браузър и интернет устройство. Освен това третите страни, които задават тези бисквитки/cookies, могат да свържат личните Ви данни с поведението Ви при сърфиране, ако сте влезли в техните услуги по това време."
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "social": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "notes": "",
                    "name": ""
                },
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "analytics": {
                    "name": "Бисквитки/cookies за анализ",
                    "notes": "Тези бисквитки/cookies ни позволяват да броим посещенията и източниците на трафик, за да можем да измерваме и подобряваме работата на нашия сайт. Те ни помагат да знаем кои страници са най-много и най-малко популярни и да видим как посетителите се движат из сайта. Цялата информация, която тези бисквитки/cookies събират, е обобщена и следователно анонимна. Въпреки това, третите страни, предоставящи тези услуги, те ще обработват личните Ви данни, за да предоставят обобщените данни."
                }
            }
        },
        "de-at": {
            "custom_tokens": {
                "your_privacy": "Ihre Privatsphäre",
                "privacy_policy_url": "https://e.huawei.com/at/cookies-policy",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "essential_cookies_description": "Diese Cookies sind für das Funktionieren der Website notwendig und können in unseren Systemen nicht ausgeschaltet werden. Sie werden in der Regel nur als Reaktion auf von Ihnen vorgenommene Aktionen gesetzt, die einer Dienstanforderung entsprechen, wie z. B. das Festlegen Ihrer Datenschutzeinstellungen, das Anmelden oder Ausfüllen von Formularen. Sie können Ihren Browser so einstellen, dass er diese Cookies blockiert oder Sie darüber informiert, aber einige Teile der Website können nicht ohne sie funktionieren. Diese Cookies speichern keine personenbezogenen Daten.",
                "cookies_used": "Verwendete Cookies",
                "accept_cookies": "Cookies akzeptieren",
                "always_active": "Immer aktiv",
                "reset": "Zurücksetzen",
                "essential_cookies": "Zwingend notwendige Cookies",
                "privacy_policy_text": ""
            },
            "common_tokens": {
                "message": "Auf dieser Website verwenden wir Cookies. Um im Detail zu erfahren, wie wir Cookies verwenden, lesen Sie bitte unsere <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">vollständige Erklärung zu Cookies</a>. Um alle nicht zwingend notwendigen Cookies abzulehnen, klicken Sie einfach unten auf \"Cookies ablehnen\". Um Cookies nach Kategorien zu akzeptieren oder abzulehnen, klicken Sie einfach auf die Registerkarten auf der linken Seite. Sie können diese Einstellungen jederzeit erneut einsehen und ändern.",
                "confirmation_button": "Speichern und schließen",
                "title": "Cookies-Voreinstellungen",
                "no": "Nicht aktiv",
                "yes": "Aktiv"
            },
            "isDefault": "false",
            "categories": {
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "display_ads": {
                    "name": "Werbe-Cookies",
                    "notes": "Diese Cookies werden von unseren Werbepartnern gesetzt. Sie werden verwendet, um ein Profil Ihrer Interessen zu erstellen und relevante Anzeigen auf anderen Websites anzuzeigen und damit Sie unsere Inhalte in Social Media mit „Gefällt mir“ bewerten oder teilen können. Diese Cookies speichern nicht direkt personenbezogene Daten, sondern basieren auf der eindeutigen Identifizierung Ihres Browsers und des für den Internetzugang verwendeten Geräts. Darüber hinaus können die Drittanbieter, die diese Cookies setzen, Ihre personenbezogenen Daten mit Ihrem Surfverhalten verknüpfen, wenn Sie zu diesem Zeitpunkt bei deren Diensten angemeldet sind."
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "notes": "Wir verwenden Cookies, um Ihre Präferenzen zu speichern und Ihnen ein stärker personalisiertes Inhaltserlebnis zu bieten.",
                    "name": "Personalisierungs-Cookies"
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "notes": "Auf dieser Website verwenden wir Cookies. Um im Detail zu erfahren, wie wir Cookies verwenden, lesen Sie bitte unsere <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">vollständige Erklärung zu Cookies</a>. Um alle nicht zwingend notwendigen Cookies abzulehnen, klicken Sie einfach unten auf \"Cookies ablehnen\". Um Cookies nach Kategorien zu akzeptieren oder abzulehnen, klicken Sie einfach auf die Registerkarten auf der linken Seite. Sie können diese Einstellungen jederzeit erneut einsehen und ändern.",
                    "name": "Analytische Cookies"
                },
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "social": {
                    "notes": "",
                    "name": ""
                },
                "cookiematch": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "notes": "",
                    "name": ""
                }
            }
        },
        "sv": {
            "categories": {
                "search": {
                    "notes": "",
                    "name": ""
                },
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "analytics": {
                    "name": "Analytics Cookies<br>Cookies för analys",
                    "notes": "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. However, the third parties providing these services, Hypers Analytics will process your personal data in order to provide the aggregated data.<br><br>\nDessa cookies låter oss räkna besök och trafikkällor så att vi kan mäta och förbättra prestandan för webbsidan. De hjälper oss att veta vilka sidor som är mest och minst populära och se hur besökare rör sig på hemsidan. All information som dessa cookies samlar in är aggregerad och därför anonym. De tredje-parter som tillhandahåller dessa tjänster, Hypers Analytics  kommer dock att behandla dina personuppgifter för att tillhandahålla de aggregerade uppgifterna."
                },
                "social": {
                    "name": "",
                    "notes": ""
                },
                "mobile": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "name": "Advertising Cookies<br>Reklam-cookies",
                    "notes": "These cookies are set by our advertising partners. They are used to build a profile of your interests and show relevant ads on other websites, and to also allow you to 'Like' and 'Share' our content on social media. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. Additionally, the third parties setting these cookies may link your personal data with your browsing behaviour if you are logged into their services at the time.<br><br>\nDessa cookies är utställda av våra reklampartners. De används för att skapa en profil över dina intressen och visa relevanta annonser på andra webbsidor, och för att ge dig möjlighet att ”Likea” och ”Dela” vårt innehåll på sociala medier. De lagrar inte direkt personlig information, men bygger på en unik identifiering av din webbläsare och internetenhet. Dessutom kan de tredje-parter som ställer in cookies koppla ihop din personliga data med ditt surfande om du är inloggad på deras tjänster vid den tidpunkten."
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "personalization": {
                    "name": "",
                    "notes": ""
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "engagement": {
                    "name": "",
                    "notes": ""
                },
                "crm": {
                    "name": "",
                    "notes": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                }
            },
            "isDefault": "false",
            "custom_tokens": {
                "cookies_used": "Cookies Used",
                "essential_cookies_description": "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.<br><br> Dessa cookies är nödvändiga för att webbsidan ska fungera korrekt och kan inte avvisas. De skapas vanligtvis enbart baserat på din aktivitet på sidan, till exempel göra integritetsinställningar logga in, eller fylla i formulär. Du kan ställa in din webbläsare att blockera eller informera dig om dessa cookies, men viss funktionalitet på sidan kommer då inte att fungera. Dessa cookies sparar inte nägon infomration som kan identifera dig som person.",
                "reset": "Reset",
                "always_active": "Always Active",
                "essential_cookies": "Essential Cookies<br>Nödvändiga cookies",
                "privacy_policy_text": "",
                "your_privacy": "Your Privacy<br>Din integritet",
                "privacy_policy_url": "https://e.huawei.com/se/cookies-policy",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png"
            },
            "common_tokens": {
                "message": "We use cookies on this website. To learn in detail about how we use cookies, please read our <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">full Cookies Notice</a>. To reject all non-essential cookies simply click \"Save and Close\" below. To accept or reject cookies by category please simply click on the tabs to the left. You can revisit and change your settings at any time.<br><br>\nVi använder cookies på den här webbsidan. För att läsa mer om hur vi använder cookies, se <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">vår cookie policy</a>. Klicka på \"Spara och stäng\" nedan för att avvisa alla cookies som inte är nödvändiga. För att acceptera eller avvisa cookies per kategori, klicka på flikarna till vänster. Du kan se och ändra inställningarna när som helst.\n",
                "title": "Your Privacy Preferences",
                "confirmation_button": "Save and Close",
                "yes": "Active",
                "no": "Inactive"
            }
        },
        "tr": {
            "categories": {
                "social": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "name": "Analiz Çerezleri",
                    "notes": "Bu çerezler, sitemizin performansını ölçebilmemiz ve iyileştirebilmemiz için ziyaretleri ve trafik kaynaklarını ölçmemize imkan tanır. Bu çerezler, en popüler ya da en az popüler sayfaların hangileri olduklarını bilmemize ve ziyaretçilerin site genelinde nasıl gezindiklerini görmemize yardımcı olur. Bu çerezlerin topladığı tüm bilgiler toplu veridir ve bu nedenle anonimdir. Ancak, bu hizmetleri sağlayan üçüncü taraflar, Google Analytics toplu verileri sağlamak için kişisel verilerinizi işleyecektir."
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "big_data": {
                    "notes": "",
                    "name": ""
                },
                "crm": {
                    "name": "",
                    "notes": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "personalization": {
                    "notes": "",
                    "name": ""
                },
                "email": {
                    "notes": "",
                    "name": ""
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "display_ads": {
                    "notes": "Bu çerezler, reklam iş ortaklarımız tarafından ayarlanmaktadır. İlgi alanlarınıza ilişkin bir profil oluşturmak, diğer web sitelerinde size ilgili reklamları göstermek için ve ayrıca sosyal medyadaki içeriklerimizi 'Beğenmenizi' ya da 'Paylaşmanızı' sağlamak için kullanılmaktadır. Doğrudan kişisel bilgileri saklamazlar, ancak tarayıcınızı ve internet cihazınızı benzersiz şekilde tanımlamaya dayanırlar. Ek olarak, bu tanımlama bilgilerini ayarlayan üçüncü tarafların hizmetlerinde aynı anda oturum açtıysanız, üçüncü taraflar kişisel verilerinizi tarama davranışınızla ilişkilendirebilir.",
                    "name": "Reklam Çerezleri"
                },
                "monitoring": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                }
            },
            "isDefault": "false",
            "custom_tokens": {
                "privacy_policy_url": "https://www.huawei.com/tr/cookies-policy",
                "your_privacy": "Gizliliğiniz",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "reset": "Sıfırla",
                "always_active": "Daima aktif",
                "essential_cookies": "Temel Çerezler",
                "privacy_policy_text": "",
                "cookies_used": "Kullanılan Çerezler",
                "essential_cookies_description": "Temel çerezler, web sitesinin çalışması için gereklidir ve sistemlerimizde kapatılamaz. Bu çerezler, gizlilik tercihlerinizi ayarlamak, oturum açmak veya formları doldurmak gibi genellikle yalnızca sizin tarafınızdan yönetilen belirli işlemler için ayarlanır. Tarayıcınızı bu çerezleri engelleyecek veya bunlara karşı sizi uyaracak şekilde ayarlayabilirsiniz, ancak web sitesinin bazı kısımları bu çerezler olmadan çalışmayacaktır. Bu çerezler, kişisel olarak tanımlanabilir hiçbir bilgiyi saklamaz."
            },
            "common_tokens": {
                "no": "Aktif değil",
                "yes": "Aktif",
                "confirmation_button": "Kaydet ve Kapat",
                "title": "Çerez Tercihleri Merkezi",
                "message": "Bu web sitesinde çerezler kullanıyoruz. Çerezleri nasıl kullandığımız hakkında ayrıntılı bilgi için lütfen <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Çerez Politikamızın</a>  tamamını okuyun. Temel çerezler haricindeki tüm çerezleri reddetmek için aşağıdaki \"Kaydet ve Kapat\" sekmesini tıklamanız yeterli olacaktır. İlgili çerez kategorilerini kabul etmek veya reddetmek için lütfen soldaki  sekmelere tıklayın. Ayarlarınızı dilediğiniz zaman tekrar görüntüleyebilir ve değiştirebilirsiniz."
            }
        },
        "de": {
            "isDefault": "false",
            "categories": {
                "display_ads": {
                    "notes": "Diese Cookies werden von unseren Werbepartnern gesetzt. Sie werden zur Erstellung Ihres Interessenprofils und zur Präsentation relevanter Werbeanzeigen auf anderen Websites verwendet. In sozialen Netzwerken können Sie unseren Inhalten dadurch ein „Like“ geben oder sie dort auch teilen. Personenbezogene Daten werden nicht direkt gespeichert, sondern sie basieren auf der eindeutigen Erkennung Ihres Browsers und Internetgeräts. Darüber hinaus können Drittparteien, die diese Cookies setzen, Ihre personenbezogenen Daten mit - Ihrem Surfverhalten verknüpfen, wenn Sie zur gleichen Zeit bei deren Diensten eingeloggt sind. In der Regel speichern wir Werbe-Cookies zwischen 30 Tagen und 24 Monaten, abhängig von der Länge unserer jeweiligen Werbekampagnen (z. B. ob wir einen speziellen Wettbewerb oder eine längere Werbekampagne unserer Geräte laufen haben)",
                    "name": "Werbe-Cookies"
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "personalization": {
                    "name": "Personalisierungs-Cookies",
                    "notes": "Wir verwenden Cookies, um Ihre Präferenzen zu speichern und Ihnen ein stärker personalisiertes Inhaltserlebnis zu bieten."
                },
                "email": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "notes": "Diese Cookies ermöglichen uns die Zählung von Besuchen und Traffic-Quellen, sodass wir die Leistung unserer Seite messen und verbessern können. Sie helfen uns dabei, die beliebtesten und unbeliebtesten Seiten zu ermitteln und zu beobachten, wie Besucher auf der Seite navigieren. Alle von diesen Cookies gesammelten Informationen werden zusammengefasst und sind daher anonym. Allerdings werden die Drittparteien, die diese Dienstleistungen anbieten (Hypers Analytics), Ihre personenbezogenen Daten verarbeiten, um uns die aggregierten Daten zur Verfügung zu stellen. Analyse-Cookies können zwischen 24 Stunden und 24 Monaten gespeichert werden, abhängig von der Aufgabe des Cookies. Einige Cookies speichern die Informationen zum Beispiel für 24 Stunden, um Sie als einen eindeutigen Besucher dieser Website an dem Tag zu identifizieren. Andere können Informationen bis zu 24 Monate lang speichern. Wir können zum Beispiel zwei Versionen derselben Website veröffentlichen, um zu ermitteln, welche besser funktioniert und beliebter ist. Ein Cookie erinnert sich dann, ob Sie Version A oder Version B der Seite besucht haben und kann so gewährleisten, dass Ihnen bei darauffolgenden Besuchen dieser Website dieselbe Version angezeigt wird. Dadurch erhalten wir eindeutige Datenergebnisse zu unserem A/B-Test.",
                    "name": "Analyse-Cookies"
                },
                "affiliates": {
                    "name": "",
                    "notes": ""
                },
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "social": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                }
            },
            "custom_tokens": {
                "essential_cookies_description": "Diese Cookies sind für die Funktionalität der Website unerlässlich und können in unserem System nicht abgelehnt werden. Sie werden in der Regel nur in Folge bestimmter von Ihnen ausgeführter Aktionen gesetzt, die auf Dienstleistungsanforderungen hinauslaufen, wie etwa das Verwalten Ihrer Datenschutzeinstellungen, Anmelden oder Ausfüllen von Formularen. Sie können in Ihrem Browser Einstellungen vornehmen, dass diese Cookies blockiert oder Sie über ihren Einsatz informiert werden. Doch einige Bereiche der Website funktionieren ohne sie nicht. Diese Cookies speichern keine personenbezogenen Daten. Unbedingt erforderliche Cookies sind in der Regel Sitzungscookies, die Daten nur für die Dauer Ihres Besuchs auf der Website speichern.",
                "cookies_used": "Verwendete Cookies",
                "reset": "Zurücksetzen",
                "accept_cookies": "Cookies akzeptieren",
                "always_active": "Immer aktiv",
                "essential_cookies": "Unbedingt erforderliche Cookies",
                "your_privacy": "Datenschutz",
                "privacy_policy_url": "https://www.huawei.com/de/cookies-policy",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png"
            },
            "common_tokens": {
                "confirmation_button": "Speichern und Schließen",
                "title": "Cookie -Einstellungen",
                "message": "Diese Website verwendet Cookies. Für nähere Informationen zur Verwendung dieser Cookies lesen Sie bitte unsere <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">Datenschutzerklärung</a>. Um alle unwesentlichen Cookies abzulehnen, klicken Sie unten einfach auf „Speichern und Schließen“. Um Cookies nach Kategorie zu akzeptieren oder abzulehnen, klicken Sie einfach links auf die Registerkarten. Sie können Ihre Einstellungen jederzeit aufrufen und ändern.",
                "no": "Inaktiv",
                "yes": "Aktiv"
            }
        },
        "cs": {
            "categories": {
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "crm": {
                    "name": "",
                    "notes": ""
                },
                "email": {
                    "notes": "",
                    "name": ""
                },
                "personalization": {
                    "name": "",
                    "notes": ""
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "display_ads": {
                    "notes": "Tyto soubory cookies nastavují naši reklamní partneři. Využívají se k vytvoření profilu vašich zájmů a zobrazování relevantních reklam na jiných webových stránkách. Umožňují také obsah v sociálních médiích označit „To se mi líbí“ nebo jej „sdílet“. Osobní informace neuchovávají přímo, ale jsou založeny na jedinečné identifikaci vašeho prohlížeče a internetového zařízení. Kromě toho mohou třetí strany, které tyto soubory cookies nastavují, propojit vaše osobní údaje s vaším chováním při prohlížení, pokud jste v dané době přihlášeni k jejich službám.",
                    "name": "Reklamní soubory cookies"
                },
                "mobile": {
                    "notes": "",
                    "name": ""
                },
                "social": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "name": "Analytické soubory cookies",
                    "notes": "Tyto soubory cookies nám umožňují počítat návštěvnost a zdroje provozu, abychom mohli měřit a zlepšovat výkonnost našich stránek. Pomáhají nám zjistit, které stránky jsou nejoblíbenější a nejméně populární, a také, jak se návštěvníci po webových stránkách pohybují. Všechny informace, které tyto soubory cookies shromažďují, jsou agregovány, a jsou proto anonymní. Třetí strany, které tyto služby poskytují, společnosti Hypers Analytics, budou vaše osobní údaje zpracovávat, aby tyto agregované údaje zajistily."
                },
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "search": {
                    "notes": "",
                    "name": ""
                },
                "affiliates": {
                    "notes": "",
                    "name": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "notes": "",
                    "name": ""
                },
                "misc": {
                    "notes": "",
                    "name": ""
                }
            },
            "isDefault": "false",
            "custom_tokens": {
                "privacy_policy_url": "https://e.huawei.com/cz/cookies-policy",
                "your_privacy": "Vaše soukromí",
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "cookies_used": "Použité soubory cookie",
                "essential_cookies_description": "Tyto soubory cookies jsou nezbytné pro fungování webové stránky a nelze je v našich systémech vypnout. Obvykle se nastavují pouze v reakci na akce, které jste provedli a které představují požadavek na služby, například nastavení předvoleb ochrany soukromí, přihlášení nebo vyplňování formulářů. Prohlížeč můžete nastavit tak, aby tyto soubory cookies blokoval nebo vás na ně upozornil, ale některé části stránek pak nebudou fungovat. Tyto soubory cookies neukládají žádné osobní údaje.",
                "reset": "Resetovat",
                "always_active": "Vždy aktivní",
                "essential_cookies": "Základní soubory cookies",
                "privacy_policy_text": ""
            },
            "common_tokens": {
                "message": "Na této webové stránce používáme soubory cookies. Pokud se chcete dozvědět podrobnější informace o použití souborů cookies, přečtěte si prosím naše <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">úplné Zásady používání souborů cookies</a>. Pokud chcete odmítnout všechny dodatečné soubory cookies, klikněte níže na tlačítko „Uložit a zavřít“. Pokud chcete přijmout respektive odmítnout soubory cookies dle jednotlivých kategorií, jednoduše klikněte na karty vlevo. Své nastavení můžete kdykoliv opět změnit.",
                "confirmation_button": "Uložit nastavení",
                "title": "Centrum preferencí souborů cookies",
                "no": "Neaktivní",
                "yes": "Aktivní"
            }
        },
        "hr": {
            "common_tokens": {
                "title": "Vaše postavke privatnosti",
                "confirmation_button": "Spremi i zatvori",
                "message": "Na ovoj web stranici koristimo kolačiće. Kako biste saznali detalje o tome kako koristimo kolačiće, pročitajte našu <a id=\"policylink\" href=\"{{privacy_policy_url}}\" target=\"_blank\">cjelovitu Obavijest o kolačićima</a>. Da biste odbili sve nebitne kolačiće, jednostavno kliknite \"\"Spremi i zatvori\"\" ispod. Da biste prihvatili ili odbili kolačiće prema kategoriji, jednostavno kliknite na kartice s lijeve strane. Možete ponovno posjetiti i promijeniti svoje postavke u bilo kojem trenutku.",
                "yes": "aktivirano",
                "no": "Neaktivirano"
            },
            "custom_tokens": {
                "company_logo_url": "https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",
                "privacy_policy_url": "https://solar.huawei.com/hr/cookies",
                "your_privacy": "Vaša privatnost",
                "cookies_used": "Korišteni kolačići",
                "essential_cookies_description": "Ovi su kolačići neophodni za funkcioniranje web stranice i ne mogu se isključiti u našim sustavima. Obično se postavljaju samo kao odgovor na vaše radnje koje predstavljaju zahtjev za uslugama, poput postavljanja vaših postavki privatnosti, prijavljivanja ili ispunjavanja obrazaca. Možete postaviti svoj preglednik da blokira ili vas upozori na ove kolačiće, ali neki dijelovi stranice tada neće raditi. Ovi kolačići ne pohranjuju nikakve osobne podatke.",
                "essential_cookies": "Osnovni kolačići",
                "privacy_policy_text": "",
                "accept_cookies": "",
                "always_active": "Uvijek aktivan",
                "reset": "Resetiraj"
            },
            "isDefault": "false",
            "categories": {
                "social": {
                    "notes": "",
                    "name": ""
                },
                "search": {
                    "name": "",
                    "notes": ""
                },
                "big_data": {
                    "name": "",
                    "notes": ""
                },
                "affiliates": {
                    "notes": "",
                    "name": ""
                },
                "analytics": {
                    "notes": "Ovi kolačići omogućuju nam brojanje posjeta i izvora prometa kako bismo mogli mjeriti i poboljšati izvedbu naše stranice. Pomažu nam da saznamo koje su stranice najpopularnije, a koje najmanje popularne i da vidimo kako se posjetitelji kreću po stranici. Sve informacije koje prikupljaju ovi kolačići su agregirane i stoga anonimne. Međutim, treće strane koje pružaju ove usluge, one će obrađivati ​​vaše osobne podatke kako bi pružile agregirane podatke.",
                    "name": "Kolačići za analitiku"
                },
                "cdp": {
                    "name": "",
                    "notes": ""
                },
                "email": {
                    "name": "",
                    "notes": ""
                },
                "personalization": {
                    "name": "",
                    "notes": ""
                },
                "crm": {
                    "notes": "",
                    "name": ""
                },
                "engagement": {
                    "notes": "",
                    "name": ""
                },
                "display_ads": {
                    "name": "Oglašavački kolačići",
                    "notes": "Ove kolačiće postavljaju naši partneri za oglašavanje. Koriste se za izradu profila vaših interesa i prikazivanje relevantnih oglasa na drugim web stranicama, a također vam omogućuju da 'lajkate' i 'dijelite' naš sadržaj na društvenim medijima. Ne pohranjuju izravno osobne podatke, već se temelje na jedinstvenoj identifikaciji vašeg preglednika i internetskog uređaja. Osim toga, treće strane koje postavljaju ove kolačiće mogu povezati vaše osobne podatke s vašim ponašanjem prilikom pregledavanja ako ste u to vrijeme prijavljeni na njihove usluge."
                },
                "mobile": {
                    "name": "",
                    "notes": ""
                },
                "monitoring": {
                    "name": "",
                    "notes": ""
                },
                "misc": {
                    "name": "",
                    "notes": ""
                },
                "cookiematch": {
                    "name": "",
                    "notes": ""
                }
            }
        }
    };
    utag.gdpr.preferences_prompt.content.css = "@media (min-width: 1025px) {    .privacy_prompt.consent_preferences {        min-height: 434px;    }}@font-face {    font-family: \'huaweifont-ck\';    src: url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Regular.eot\');    src: url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Regular.eot?t=1587362981594#iefix\') format(\'embedded-opentype\'),url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Regular.svg\') format(\'svg\'),url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Regular.ttf\') format(\"truetype\"),url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Regular.woff\') format(\"woff\"),url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Regular.woff2\') format(\"woff2\");}@font-face {    font-family: \'HuaweiSans-Bold-ck\';    src: url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Bold.eot\');    src: url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Bold.eot?t=1587362981594#iefix\') format(\'embedded-opentype\'),url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Bold.svg\') format(\'svg\'),url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Bold.ttf\') format(\"truetype\"),url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Bold.woff\') format(\"woff\"),url(\'https://www.huawei.com/Assets/corp/v2/fonts/HuaweiSans-Bold.woff2\') format(\"woff2\");}#__tealiumGDPRcpPrefs {    position: fixed;    width: 100%;    height: 100%;    left: 0;    top: 0;    background-color: rgba(0,0,0,.5);    z-index: 999;}.privacy_prompt.consent_preferences {    position: fixed;    width: 600px;    top: 100px;    left: 50%;    margin-left: -300px;    text-align: left;    border: 1px solid #CCC;    border-radius: 4px;    background-color: #FFF;    color: #444;    font-size: 14px;    z-index: 1000;    word-break: break-word;    font-family: \"huaweifont-ck\", Helvetica, Arial, sans-serif;    box-sizing: border-box;}.privacy_prompt.consent_preferences {    bottom: initial;    top: 50%;    transform: translateY(-50%);    width: 600px;    left: 50%;    margin-left: -300px;    border-radius: 4px;}.ie8 .privacy_prompt.consent_preferences, .ie9 .privacy_prompt.consent_preferences {    top: 100px;}.privacy_prompt.consent_preferences a {    text-decoration: none;    color: #f66f6a;}.privacy_prompt.consent_preferences .privacy_prompt_content {    padding: 10px 0 0px;    font-size: 12px;    border-bottom: 1px solid #ccc;    margin-right: 0;}.privacy_prompt.consent_preferences .privacy_prompt_content .tit-logo-box>p {    font-size: 18px;    line-height: 24px;    color: #444;    display: inline-block;    vertical-align: middle;    margin-left: 30px;    font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;}.privacy_prompt.consent_preferences .privacy_prompt_content .tit-logo-box {    padding: 0 20px 10px 20px;    border-bottom: 1px solid #ccc;}.privacy_prompt.consent_preferences .option {    margin: 10px 0px;    color: #444;}.privacy_prompt.consent_preferences .privacy_prompt_footer {    padding: 15px 20px 15px 20px;    overflow: auto;}.privacy_prompt.consent_preferences .privacy_prompt_footer a {    font-size: 14px;}.privacy_prompt.consent_preferences .privacy_prompt_footer .reset_link {    float: right;    font-size: 14px;    line-height: 40px;    text-decoration: underline;    cursor: pointer;    font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;}.privacy_prompt.consent_preferences .privacy_prompt_footer .button {    font-size: 14px;    border: 1px solid #f66f6a;    padding: 4px 15px;    min-width: 50px;    text-align: center;    border-radius: 4px;    background-color: #f66f6a;    /* box-shadow: inset 0px 1px 4px rgba(255, 255, 255, 1);            text-shadow: 1px 1px 3px rgba(255, 255, 255, 1);*/    color: #fff;    cursor: pointer;    font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;}.privacy_prompt.consent_preferences .button.right {    float: right;    margin-left: 30px;}.privacy_prompt.consent_preferences .button.left {    float: left;}.privacy_prompt.consent_preferences>.close_btn_thick {    position: absolute;    display: block;    top: 10px;    right: 10px;    text-decoration: none;    text-shadow: 0 1px 0 #fff;    color: #777;    font: 14px/100% arial, sans-serif;    cursor: pointer;    display: none;}.privacy_prompt.consent_preferences>.close_btn_thick:after {    content: \"\\2716\";}.privacy_prompt.consent_preferences .logo {    max-width: 50px;    display: inline-block;    vertical-align: middle;    float: none;}.privacy_prompt.consent_preferences table {    padding: 0px;    border-collapse: collapse;    margin: 0 auto;    text-align: left;}.privacy_prompt.consent_preferences table tr:first-child>th {    width: 33%;}.privacy_prompt.consent_preferences table th {    background-color: #FAFAFA;    border-bottom: 1px solid #EEE;    margin: 0px;    padding: 5px 8px;    font-weight: 600;    text-align: left;}.privacy_prompt.consent_preferences table td {    vertical-align: top;    padding: 10px 8px 5px 8px;}.privacy_prompt.consent_preferences table tr td:first-child {    min-width: 120px;    font-weight: 600;    color: #666;}.privacy_prompt.consent_preferences table tr td:last-child {    text-align: left;    min-width: 100px;}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle {    opacity: 0;    position: absolute;    left: -99999px;}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label {    height: 24px;    line-height: 24px;    background-color: #414141;    padding: 0px 16px;    border-radius: 16px;    display: inline-block;    position: relative;    cursor: pointer;    box-sizing: border-box;    -moz-transition: all 0.25s ease-in;    -o-transition: all 0.25s ease-in;    -webkit-transition: all 0.25s ease-in;    transition: all 0.25s ease-in;    -moz-box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);    -webkit-box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label:active, .privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label:focus {    box-shadow: 0 0 2px 2px #509ec4;}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label:before, .privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label:hover:before {    content: \" \";    position: absolute;    top: 2px;    left: 2px;    width: 26px;    height: 20px;    background: #fff;    z-index: 2;    -moz-transition: all 0.25s ease-in;    -o-transition: all 0.25s ease-in;    -webkit-transition: all 0.25s ease-in;    transition: all 0.25s ease-in;    -moz-border-radius: 14px;    -webkit-border-radius: 14px;    border-radius: 14px;}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label .off {    margin-left: 0px;    display: inline-block;    position: absolute;    right: -90px;    color: #333;    width: 85px;    text-align: left;}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label .on {    display: none;}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle:checked+label .off {    display: none;}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle:checked+label .on {    margin-right: 0px;    display: inline-block;    position: absolute;    right: -90px;    color: #6cc04a;    width: 85px;    text-align: left;}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle:checked+label, .privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle:focus:checked+label {    background-color: #6cc04a;}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle:checked+label:before, .privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle:checked+label:hover:before, .privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle:focus:checked+label:before, .privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle:focus:checked+label:hover:before {    background-position: 0 0;    top: 2px;    left: 100%;    margin-left: -28px;    box-shadow: 0px 0 5px rgba(0, 0, 0, 0.5);}.privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label {    /*overflow: hidden;            text-overflow: ellipsis;*/    max-height: 24px;    height: 24px;    width: 50px;}.des-box {    position: relative;}.des-box p {    max-width: 80%;    margin: 30px 0;}.cookie-tab {    letter-spacing: -0.32em;}.cookie-tab * {    letter-spacing: normal;}.cookie-tab .nav-tabs {    display: inline-block;    vertical-align: top;    width: 30%;    letter-spacing: normal;    border-bottom: 0;    padding:0;}.cookie-tab .nav-tabs>li {    float: none;    display: block;    background: #dde6ed;    border-bottom: 1px solid #ccc;    margin-bottom: 0;    font-size: 14px;	white-space: normal;	word-break: break-word;}.cookie-tab .nav-tabs>li.active {    background: #fff;    border-bottom: 0;}.cookie-tab .nav-tabs>li a {    color: #282828;    border: 0;    border-radius: 0;    padding: 15px;    display: block;}.cookie-tab .nav-tabs>li a:hover, .cookie-tab .nav-tabs>li a:active, .cookie-tab .nav-tabs>li a:focus {    border: 0;}.cookie-tab .tab-content {    display: inline-block;    vertical-align: top;    width: 70%;    letter-spacing: normal;}.cookie-tab .tab-content .title {    font-size: 16px;    font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;    margin-bottom: 10px;}.cookie-tab .tab-content .content-box {    padding: 15px 20px;    position: relative;    margin: 0;    max-width: none;}.cookie-tab .tab-content .content-box .checkbox-switch {    position: absolute;    top: 18px;    right: 95px;    font-size: 12px;}.cookie-tab .tab-content .content-box .checkbox-switch label {    font-weight: normal;    font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;}.cookie-tab .tab-content .content-box .optanon-cookie-list {    margin-top: 10px;}.cookie-tab .tab-content .content-box .optanon-cookie-list .optanon-cookies-used {    font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;    font-size: 13px;    font-weight: bold;    padding: 3px 0;    border-bottom: 1px solid #ccc;    margin: 0;}.cookie-tab .tab-content .content-box .optanon-cookie-list .optanon-group-cookies-list, .cookie-tab .tab-content .content-box .optanon-cookie-list .optanon-subgroup-cookies-list {    border-bottom: 1px solid #ccc;    padding-bottom: 2px;    color: #666;    margin: 3px 0;    line-height: 1.4;}.cookie-tab .tab-content .content-box .optanon-cookie-list .optanon-subgroup-cookies-list span.optanon-subgroup-header {    font-size: 13px;    padding-right: 10px;    color: #000;    display: inline-block;}.cookie-tab .tab-content #cookie-tab-2 .content-box .checkbox-switch {    right: 20px;}.cookie-tab .tab-content #cookie-tab-2 .content-box .checkbox-switch .on {    color: #6cc04a;    font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;}.cookie-tab .nav-tabs>li>a {    margin-right: 0;    font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;}.privacy_prompt.consent_preferences .privacy_prompt_footer .option {    display: inline-block;    margin: 0;    /*float: right;*/    margin-right: 15px;}.privacy_prompt.consent_preferences .privacy_prompt_footer .option input {    font-size: 14px;    border: 1px solid #f66f6a;    padding: 4px 15px;    min-width: 50px;    text-align: center;    border-radius: 4px;    background-color: #f66f6a;    color: #fff;    cursor: pointer;    font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;}.cookie-tab .tab-content .content-box .cookie-con-auto {    height: 220px;    overflow: auto;}.cookie-tab .tab-content .content-box .cookie-con-auto p {    line-height: 1.3;    margin-top: 0;}.cookie-tab .tab-content > .tab-pane {    display: none;}.cookie-tab .tab-content > .active {    display: block;}.privacy_prompt.consent_preferences .privacy_prompt_footer .button,.privacy_prompt.consent_preferences .privacy_prompt_footer .option input{    line-height: 28px;}.consent_preferences_btn {    color:#333;    background-color: transparent;    display: inline-block;    margin-bottom: 0;    font-weight: normal;    text-align: center;    vertical-align: middle;    touch-action: manipulation;    cursor: pointer;    background-image: none;    border: 0 solid transparent;    white-space: nowrap;    padding: 6px 12px;    font-size: 30px;    line-height: 1.4;    border-radius: 4px;    user-select: none;    position: absolute;    top: -7px;    right: 0px;}@media (max-width: 991px) {    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences {        width: 94%;        margin: 0 auto;        left: 3%;        top: 50%;        transform: translateY(-50%);}    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .prefmessage {        float: none;        width: 100%;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content h1 {        text-align: center;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content img {        float: none;        margin: 0 auto 10px auto;        width: 20%;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content .logo + p {        max-width: 95%;        vertical-align: top;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content table, #__tealiumGDPRcpPrefs .privacy_prompt_content thead, #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content tbody, #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content th, #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content td, #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content tr {        position: relative;        height: 100%;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content table tbody tr {        display: block;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content tbody tr {        margin: 0 0 15px 0;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content tbody tr td:first-child {        display: inline-block;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content tbody tr td:nth-child(2) {        width: 100%;        display: block;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content tbody tr td:nth-child(3) {        min-width: 0 !important;        position: absolute;        right: 0;        top: -2%;        padding-right: 0px;    }    #__tealiumGDPRcpPrefs .privacy_prompt.consent_preferences .privacy_prompt_content tbody tr:first-child {        position: absolute;        top: -9999px;        left: -9999px;    }    .privacy_prompt.consent_preferences table {        text-align: left;    }    .privacy_prompt.consent_preferences {        position: absolute;        top: 15px;        transform: translateY(0);        width: 94%;        margin-left: 0;        left: 3%;    }        .privacy_prompt.consent_preferences .logo {        display: none;    }        .privacy_prompt.consent_preferences .privacy_prompt_content .tit-logo-box>p {        margin-left: 0;    }        .cookie-tab .nav-tabs, .cookie-tab .tab-content {        width: 100%;    }    .privacy_prompt.consent_preferences .privacy_prompt_footer {        text-align: center;    }        .privacy_prompt.consent_preferences .privacy_prompt_footer .reset_link {        float: none;    }        .privacy_prompt.consent_preferences .button.right {        float: none;        display: inline-block;    }    .privacy_prompt.consent_preferences .privacy_prompt_footer .option {        display: inline-block;        float: none;        margin-right: 0px;        margin-top: 15px;    }    .cookie-tab{        max-height: 60vh;        overflow-y: auto;    }    .cookie-tab .panel-group .panel-title a {        color: #282828;        font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;        width: 100%;        padding: 5px 15px;        display: block;        font-size: 14px;        line-height: 1;    }    .cookie-tab .content-box {        padding: 0 15px;    }    .cookie-tab .content-box .title {        display:none;    }    .cookie-tab .content-box .cookie-con-auto {        padding-top: 7px;    }        .cookie-tab .content-box .cookie-con-auto p {        line-height: 1.5em;    }        .cookie-tab .panel-group .panel-title {        margin-bottom: 0;    }    .cookie-tab .checkbox-switch .on {        font-size: 12px;        color: #f66f6a;        font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;    }    .privacy_prompt.consent_preferences input[type=\"checkbox\"].toggle+label .off {        font-family: \"HuaweiSans-Bold-ck\", Helvetica, Arial, sans-serif;    }    .fade {      opacity: 0;      -webkit-transition: opacity 0.15s linear;      -o-transition: opacity 0.15s linear;      transition: opacity 0.15s linear;    }    .fade.in {      opacity: 1;    }    .collapse {      display: none;    }    .collapse.in {      display: block;    }    tr.collapse.in {      display: table-row;    }    tbody.collapse.in {      display: table-row-group;    }    .collapsing {      position: relative;      height: 0;      overflow: hidden;      -webkit-transition-property: height, visibility;      -o-transition-property: height, visibility;      transition-property: height, visibility;      -webkit-transition-duration: 0.35s;      -o-transition-duration: 0.35s;      transition-duration: 0.35s;      -webkit-transition-timing-function: ease;      -o-transition-timing-function: ease;      transition-timing-function: ease;    }}@media (max-width: 767px) {  .hidden-xs {      display: none !important;  }}.panel {  margin-bottom: 20px;  background-color: #fff;  border: 1px solid transparent;  border-radius: 4px;  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);}.panel-body {  padding: 15px;}.panel-heading {  padding: 10px 15px;  border-bottom: 1px solid transparent;  border-top-left-radius: 3px;  border-top-right-radius: 3px;}.panel-heading > .dropdown .dropdown-toggle {  color: inherit;}.panel-title {  margin-top: 0;  margin-bottom: 0;  font-size: 16px;  color: inherit;}.panel-title > a, .panel-title > small, .panel-title > .small, .panel-title > small > a, .panel-title > .small > a {  color: inherit;}.panel-footer {  padding: 10px 15px;  background-color: #f5f5f5;  border-top: 1px solid #ddd;  border-bottom-right-radius: 3px;  border-bottom-left-radius: 3px;}.panel > .list-group, .panel > .panel-collapse > .list-group {  margin-bottom: 0;}.panel > .list-group .list-group-item, .panel > .panel-collapse > .list-group .list-group-item {  border-width: 1px 0;  border-radius: 0;}.panel > .list-group:first-child .list-group-item:first-child, .panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {  border-top: 0;  border-top-left-radius: 3px;  border-top-right-radius: 3px;}.panel > .list-group:last-child .list-group-item:last-child, .panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {  border-bottom: 0;  border-bottom-right-radius: 3px;  border-bottom-left-radius: 3px;}.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {  border-top-left-radius: 0;  border-top-right-radius: 0;}.panel-heading + .list-group .list-group-item:first-child {  border-top-width: 0;}.list-group + .panel-footer {  border-top-width: 0;}.panel > .table, .panel > .table-responsive > .table, .panel > .panel-collapse > .table {  margin-bottom: 0;}.panel > .table caption, .panel > .table-responsive > .table caption, .panel > .panel-collapse > .table caption {  padding-right: 15px;  padding-left: 15px;}.panel > .table:first-child, .panel > .table-responsive:first-child > .table:first-child {  border-top-left-radius: 3px;  border-top-right-radius: 3px;}.panel > .table:first-child > thead:first-child > tr:first-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child, .panel > .table:first-child > tbody:first-child > tr:first-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {  border-top-left-radius: 3px;  border-top-right-radius: 3px;}.panel > .table:first-child > thead:first-child > tr:first-child td:first-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child, .panel > .table:first-child > tbody:first-child > tr:first-child td:first-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child, .panel > .table:first-child > thead:first-child > tr:first-child th:first-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child, .panel > .table:first-child > tbody:first-child > tr:first-child th:first-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {  border-top-left-radius: 3px;}.panel > .table:first-child > thead:first-child > tr:first-child td:last-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child, .panel > .table:first-child > tbody:first-child > tr:first-child td:last-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child, .panel > .table:first-child > thead:first-child > tr:first-child th:last-child, .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child, .panel > .table:first-child > tbody:first-child > tr:first-child th:last-child, .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {  border-top-right-radius: 3px;}.panel > .table:last-child, .panel > .table-responsive:last-child > .table:last-child {  border-bottom-right-radius: 3px;  border-bottom-left-radius: 3px;}.panel > .table:last-child > tbody:last-child > tr:last-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child, .panel > .table:last-child > tfoot:last-child > tr:last-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {  border-bottom-right-radius: 3px;  border-bottom-left-radius: 3px;}.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child, .panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child, .panel > .table:last-child > tbody:last-child > tr:last-child th:first-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child, .panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {  border-bottom-left-radius: 3px;}.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child, .panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child, .panel > .table:last-child > tbody:last-child > tr:last-child th:last-child, .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child, .panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child, .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {  border-bottom-right-radius: 3px;}.panel > .panel-body + .table, .panel > .panel-body + .table-responsive, .panel > .table + .panel-body, .panel > .table-responsive + .panel-body {  border-top: 1px solid #ddd;}.panel > .table > tbody:first-child > tr:first-child th, .panel > .table > tbody:first-child > tr:first-child td {  border-top: 0;}.panel > .table-bordered, .panel > .table-responsive > .table-bordered {  border: 0;}.panel > .table-bordered > thead > tr > th:first-child, .panel > .table-responsive > .table-bordered > thead > tr > th:first-child, .panel > .table-bordered > tbody > tr > th:first-child, .panel > .table-responsive > .table-bordered > tbody > tr > th:first-child, .panel > .table-bordered > tfoot > tr > th:first-child, .panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child, .panel > .table-bordered > thead > tr > td:first-child, .panel > .table-responsive > .table-bordered > thead > tr > td:first-child, .panel > .table-bordered > tbody > tr > td:first-child, .panel > .table-responsive > .table-bordered > tbody > tr > td:first-child, .panel > .table-bordered > tfoot > tr > td:first-child, .panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {  border-left: 0;}.panel > .table-bordered > thead > tr > th:last-child, .panel > .table-responsive > .table-bordered > thead > tr > th:last-child, .panel > .table-bordered > tbody > tr > th:last-child, .panel > .table-responsive > .table-bordered > tbody > tr > th:last-child, .panel > .table-bordered > tfoot > tr > th:last-child, .panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child, .panel > .table-bordered > thead > tr > td:last-child, .panel > .table-responsive > .table-bordered > thead > tr > td:last-child, .panel > .table-bordered > tbody > tr > td:last-child, .panel > .table-responsive > .table-bordered > tbody > tr > td:last-child, .panel > .table-bordered > tfoot > tr > td:last-child, .panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {  border-right: 0;}.panel > .table-bordered > thead > tr:first-child > td, .panel > .table-responsive > .table-bordered > thead > tr:first-child > td, .panel > .table-bordered > tbody > tr:first-child > td, .panel > .table-responsive > .table-bordered > tbody > tr:first-child > td, .panel > .table-bordered > thead > tr:first-child > th, .panel > .table-responsive > .table-bordered > thead > tr:first-child > th, .panel > .table-bordered > tbody > tr:first-child > th, .panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {  border-bottom: 0;}.panel > .table-bordered > tbody > tr:last-child > td, .panel > .table-responsive > .table-bordered > tbody > tr:last-child > td, .panel > .table-bordered > tfoot > tr:last-child > td, .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td, .panel > .table-bordered > tbody > tr:last-child > th, .panel > .table-responsive > .table-bordered > tbody > tr:last-child > th, .panel > .table-bordered > tfoot > tr:last-child > th, .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {  border-bottom: 0;}.panel > .table-responsive {  margin-bottom: 0;  border: 0;}.panel-group {  margin-bottom: 20px;}.panel-group .panel {  margin-bottom: 0;  border-radius: 4px;}.panel-group .panel + .panel {  margin-top: 5px;}.panel-group .panel-heading {  border-bottom: 0;}.panel-group .panel-heading + .panel-collapse > .panel-body, .panel-group .panel-heading + .panel-collapse > .list-group {  border-top: 1px solid #ddd;}.panel-group .panel-footer {  border-top: 0;}.panel-group .panel-footer + .panel-collapse .panel-body {  border-bottom: 1px solid #ddd;}.panel-default {  border-color: #ddd;}.panel-default > .panel-heading {  color: #333333;  background-color: #f5f5f5;  border-color: #ddd;}.panel-default > .panel-heading + .panel-collapse > .panel-body {  border-top-color: #ddd;}.panel-default > .panel-heading .badge {  color: #f5f5f5;  background-color: #333333;}.panel-default > .panel-footer + .panel-collapse > .panel-body {  border-bottom-color: #ddd;}.panel-primary {  border-color: #337ab7;}.panel-primary > .panel-heading {  color: #fff;  background-color: #337ab7;  border-color: #337ab7;}.panel-primary > .panel-heading + .panel-collapse > .panel-body {  border-top-color: #337ab7;}.panel-primary > .panel-heading .badge {  color: #337ab7;  background-color: #fff;}.panel-primary > .panel-footer + .panel-collapse > .panel-body {  border-bottom-color: #337ab7;}.panel-success {  border-color: #d6e9c6;}.panel-success > .panel-heading {  color: #3c763d;  background-color: #dff0d8;  border-color: #d6e9c6;}.panel-success > .panel-heading + .panel-collapse > .panel-body {  border-top-color: #d6e9c6;}.panel-success > .panel-heading .badge {  color: #dff0d8;  background-color: #3c763d;}.panel-success > .panel-footer + .panel-collapse > .panel-body {  border-bottom-color: #d6e9c6;}.panel-info {  border-color: #bce8f1;}.panel-info > .panel-heading {  color: #31708f;  background-color: #d9edf7;  border-color: #bce8f1;}.panel-info > .panel-heading + .panel-collapse > .panel-body {  border-top-color: #bce8f1;}.panel-info > .panel-heading .badge {  color: #d9edf7;  background-color: #31708f;}.panel-info > .panel-footer + .panel-collapse > .panel-body {  border-bottom-color: #bce8f1;}.panel-warning {  border-color: #faebcc;}.panel-warning > .panel-heading {  color: #8a6d3b;  background-color: #fcf8e3;  border-color: #faebcc;}.panel-warning > .panel-heading + .panel-collapse > .panel-body {  border-top-color: #faebcc;}.panel-warning > .panel-heading .badge {  color: #fcf8e3;  background-color: #8a6d3b;}.panel-warning > .panel-footer + .panel-collapse > .panel-body {  border-bottom-color: #faebcc;}.panel-danger {  border-color: #ebccd1;}.panel-danger > .panel-heading {  color: #a94442;  background-color: #f2dede;  border-color: #ebccd1;}.panel-danger > .panel-heading + .panel-collapse > .panel-body {  border-top-color: #ebccd1;}.panel-danger > .panel-heading .badge {  color: #f2dede;  background-color: #a94442;}.panel-danger > .panel-footer + .panel-collapse > .panel-body {  border-bottom-color: #ebccd1;}";
    utag.gdpr.preferences_prompt.content.html = "<div class=\"privacy_prompt consent_preferences\">        <div class=\"privacy_prompt_content\">            <div class=\"tit-logo-box clearfix\">                <img src=\"{{company_logo_url}}\" class=\"logo\">                <p>{{title}}</p>                <button class=\'consent_preferences_btn\' id=\'preferences_prompt_close\' name=\'privacy_pref\'  aria-label=\"Right Align\">×</button>            </div>            <div class=\"cookie-tab\">                <ul class=\"nav nav-tabs\" role=\"tablist\" id=\"js-cookie-privacy\">                    <li role=\"presentation\" class=\"active\">                        <a href=\"#cookie-tab-1\" aria-controls=\"cookie-tab-1\" role=\"tab\" data-toggle=\"tab\">{{your_privacy}}</a>                    </li>                    <li role=\"presentation\">                        <a href=\"#cookie-tab-2\" aria-controls=\"cookie-tab-2\" role=\"tab\" data-toggle=\"tab\">{{essential_cookies}}</a>                    </li>                    <li role=\"presentation\">                        <a href=\"#cookie-tab-3\" aria-controls=\"cookie-tab-3\" role=\"tab\" data-toggle=\"tab\">{{category_analytics_title}}</a>                    </li>                    <!--<li role=\"presentation\">                        <a href=\"#cookie-tab-4\" aria-controls=\"cookie-tab-4\" role=\"tab\" data-toggle=\"tab\">{{category_display_ads_title}}</a>                    </li>                    <li role=\"presentation\">                        <a href=\"#cookie-tab-5\" aria-controls=\"cookie-tab-5\" role=\"tab\" data-toggle=\"tab\">{{category_personalization_title}}</a>                    </li>-->                </ul>                <div class=\"tab-content\">                    <div role=\"tanpanel\" class=\"tab-pane active\" id=\"cookie-tab-1\">                        <div class=\"content-box\">                            <div class=\"title\">{{your_privacy}}</div>                            <div class=\"cookie-con-auto\">                                <p>{{message}}</p>                            </div>                        </div>                    </div>                    <div role=\"tanpanel\" class=\"tab-pane \" id=\"cookie-tab-2\">                        <div class=\"content-box\">                            <div class=\"title\">{{essential_cookies}}</div>                            <div class=\"checkbox-switch\">                                <span class=\"on\">{{always_active}}</span>                            </div>                            <div class=\"cookie-con-auto\">                                <p>{{essential_cookies_description}}</p>                                <div class=\"optanon-cookie-list\">									<h4 class=\"optanon-cookies-used\">{{cookies_used}}</h4>									<!--<p class=\"optanon-group-cookies-list\">how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous</p>-->									<div class=\"optanon-subgroup-cookies-list \">										<span class=\"optanon-subgroup-header\">Huawei ID:</span>										<div class=\"optanon-subgroup-cookies\">hwsso_uniportal, uid, hwssotinter3, sid, hwssotinter, logFlag, authmethod, sip, usertype, accountid, wwwusertype, hwssot, hwsso_login,hwssot3,suid, login_logFlag, login_sid,login_uid, accessToken, expiresIn, refreshToken, idss_cid</div>									</div>									<div class=\"optanon-subgroup-cookies-list \">										<span class=\"optanon-subgroup-header\">Huawei:</span>										<div class=\"optanon-subgroup-cookies\">.ASPXAUTH, ASP.NET_SessionId, ebg#lang, corp#lang, solar#lang, lang, MaterialDownloadAuthorityStatus, SpaceCookie, enterpriselang, layout-toobar, popup_flag, ztsg_ruuid, digitalpower_huawei_com_sticky, _HW_hid, HWWAFSESID, HWWAFSESTIME</div>									</div>									<div class=\"optanon-subgroup-cookies-list \">										<span class=\"optanon-subgroup-header\">Tealium:</span>										<div class=\"optanon-subgroup-cookies\">utag_main, CONSENTMGR</div>									</div>								</div>                            </div>                        </div>                    </div>                    <div role=\"tanpanel\" class=\"tab-pane\" id=\"cookie-tab-3\">                        <div class=\"content-box\">                            <div class=\"title\">{{category_analytics_title}}</div>                            <div class=\"checkbox-switch\">                                <input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat1\" />                                <label for=\"toggle_cat1\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>                            </div>                            <div class=\"cookie-con-auto\">                                <p>{{category_analytics_description}}</p>                                <div class=\"optanon-cookie-list\">								<h4 class=\"optanon-cookies-used\">{{cookies_used}}</h4>										<div class=\"optanon-subgroup-cookies-list \">										<span class=\"optanon-subgroup-header\">Huawei:</span>										<div class=\"optanon-subgroup-cookies\">source_parameter</div>									</div>																	<div class=\"optanon-subgroup-cookies-list\" data-nondisplay=\"huawei\\.com\\/(at|be|bg|hr|ch|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|no|uk|li|eu)\\b|events03\\.huawei\\.com|361313442|651212609|events\\/huaweiconnect\\/paris|topic\\/hce\\/en|\\/seeds-for-the-future-weu|\\/en\\/form\\/uipm\\/hc2022-paris|\\/en\\/events\\/2023\\/branding\\/mwc|app\\.events\\.huawei\\.com\\/mwc2023\\/booth-material|\\/en\\/about\\/privacy\\/mwc|(carrier|solar)\\.huawei\\.com\\/en\\/|topic\\/2023-idi-forum-storage|register\\/371321709\\/|en\\/about\\/privacy\\/idi|en\\/about\\/privacy\\/cookies-policy|\\/topic\\/eu-event\">										<span class=\"optanon-subgroup-header\">Google Analytics:</span>										<div class=\"optanon-subgroup-cookies\">_ga, _ga_8GRJ7QNG8D</div>									</div>									<div class=\"optanon-subgroup-cookies-list\" data-nondisplay=\"^(?!.*(huawei\\.com\\/(at|be|bg|hr|ch|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|no|uk|li|eu)\\b|events03\\.huawei\\.com|361313442|651212609|events\\/huaweiconnect\\/paris|topic\\/hce\\/en|\\/seeds-for-the-future-weu|\\/en\\/form\\/uipm\\/hc2022-paris|\\/en\\/events\\/2023\\/branding\\/mwc|app\\.events\\.huawei\\.com\\/mwc2023\\/booth-material|\\/en\\/about\\/privacy\\/mwc|(carrier|solar)\\.huawei\\.com\\/en\\/|en\\/about\\/privacy\\/cookies-policy)).*$\">										<span class=\"optanon-subgroup-header\">Hypers Analytics:</span>										<div class=\"optanon-subgroup-cookies\">_hid, _hid1</div>									</div>								</div>								                            </div>                        </div>                    </div>                    <div role=\"tanpanel\" class=\"tab-pane \" id=\"cookie-tab-4\">                        <div class=\"content-box\">                            <div class=\"title\">{{category_display_ads_title}}</div>                            <div class=\"checkbox-switch\">                                <input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat3\" />                                <label for=\"toggle_cat3\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>                            </div>                            <div class=\"cookie-con-auto\">                                <p>{{category_display_ads_description}}</p>                                <div class=\"optanon-cookie-list\">									<h4 class=\"optanon-cookies-used\">{{cookies_used}}</h4>									<div class=\"optanon-subgroup-cookies-list \">										<span class=\"optanon-subgroup-header\">Linkedin:</span>										<div class=\"optanon-subgroup-cookies\">lang, AnalyticsSyncHistory, UserMatchHistory, bscookie, bcookie, li_sugr, lidc</div>									</div>									<!--<div class=\"optanon-subgroup-cookies-list \">										<span class=\"optanon-subgroup-header\">Google Ads & DoubleClick:</span>										<div class=\"optanon-subgroup-cookies\">NID, test_cookie, 1P_JAR</div>									</div>-->									<div class=\"optanon-subgroup-cookies-list \">										<span class=\"optanon-subgroup-header\">Twitter:</span>										<div class=\"optanon-subgroup-cookies\">guest_id, personalization_id</div>									</div>									<div class=\"optanon-subgroup-cookies-list\" data-nondisplay=\"huawei\\.com\\/(at|be|bg|hr|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se|is|no|uk|li|eu)\\b|361313442|651212609|events\\/huaweiconnect\\/paris|topic\\/hce\\/en|\\/seeds-for-the-future-weu|\\/en\\/form\\/uipm\\/hc2022-paris|\\/en\\/events\\/2023\\/branding\\/mwc|app\\.events\\.huawei\\.com\\/mwc2023\\/booth-material|\\/en\\/about\\/privacy\\/mwc|carrier\\.huawei\\.com\\/en\\/|topic\\/2023-idi-forum-storage|register\\/371321709\\/|en\\/about\\/privacy\\/idi|\\/topic\\/eu-event\">										<span class=\"optanon-subgroup-header\">Facebook:</span>										<div class=\"optanon-subgroup-cookies\">fr, tr, _fbp</div>									</div>								</div>                             </div>                        </div>                    </div>                </div>            </div>        </div>        <div class=\"privacy_prompt_footer\">            <!-- <div class=\"option\"> <input type=\"button\" id=\"preferences_prompt_reset\" name=\"privacy_pref\" value=\"{{reset}}\"> </div>-->            <div id=\"preferences_prompt_submit\" class=\"button right\">{{confirmation_button}}</div>            <div id=\"preferences_prompt_reset\" class=\"reset_link\">{{reset}}</div>            <!-- <div class=\"option\"> <input type=\"button\" id=\"preferences_prompt_optin\" name=\"privacy_pref\" value=\"{{accept_cookies}}\"> </div> -->        </div>        <div class=\"close_btn_thick\"></div>    </div>";
    utag.gdpr.preferences_prompt.content.js = "var getFirstUrlPath=function(){const parts=document.location.pathname.split('/');if(parts.length>1){return parts.filter(function(t){return!!t})[0];}};var getCookie=function(name){var nameEQ=name+\"=\";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return decodeURIComponent(c.substring(nameEQ.length,c.length));}return null;};var delete_cookie=function(name,path,domain){if(getCookie(name)){document.cookie=name+\"=\"+((path)?\";path=\"+path:\"\")+((domain)?\";domain=\"+domain:\"\")+\";expires=Thu, 01 Jan 1970 00:00:01 GMT\";}};function setCookie(name,value,expires,path,domain,secure){var cookieText=encodeURIComponent(name)+'='+encodeURIComponent(value);if(expires instanceof Date){cookieText+='; expires='+expires.toGMTString();}if(path){cookieText+='; path='+path;}if(domain){cookieText+='; domain='+domain;}if(secure){cookieText+='; secure';}document.cookie=cookieText;}var updateConsentCookies=function(){delete_cookie(\"CONSENTMGR\",'/'+getFirstUrlPath(),'.huawei.com');console.log(\"delete path cookies\");var consent_cookies=getCookie('CONSENTMGR');delete_cookie(\"CONSENTMGR\",'/','.huawei.com');console.log(\"delete orginal consent cookies successfully\");var expirationDate=new Date();expirationDate.setDate(expirationDate.getDate()+180);setCookie('CONSENTMGR',consent_cookies,expirationDate,'/'+getFirstUrlPath(),\".huawei.com\");console.log(\"update consent cookies successfully\");};(function preferences_prompt(){var $el=document.getElementById(\"preferences_prompt_submit\"),$modal=document.getElementById(\"__tealiumGDPRcpPrefs\"),$closeBtn=document.getElementsByClassName(\"close_btn_thick\")[0],$body=$modal.getElementsByClassName(\"consent_preferences\")[0],reg_match=/\\d+$/,i;var acceptCookies=function(){utag.gdpr.setPreferencesValues({1:1,3:1});utag.gdpr.setConsentValue(1);closePrompt();};var resetCat=function(){var toggles=$body.getElementsByClassName(\"toggle\");if(!!toggles&&toggles.length>0){for(var j=0;j<toggles.length;j++){toggles[j].checked=false;}}};var callBack=function(){var inputs=$body.getElementsByClassName(\"toggle\"),cats={};for(var i=0;i<inputs.length;i++){var obj=inputs[i];cats[obj.id.match(reg_match)[0]]=obj.checked?1:0;}resetCookies(cats);closePrompt();utag.gdpr.setPreferencesValues(cats);};var resetCookies=function(cats){if(cats[1]===0){delete_cookie(\"source_parameter\",'/','.huawei.com');delete_cookie(\"_ga\",'/','.huawei.com');delete_cookie(\"_gid\",'/','.huawei.com');delete_cookie(\"_gat\",'/','.huawei.com');delete_cookie(\"_ga_XXDVNPW2GY\",'/','.huawei.com');delete_cookie(\"_ga_DYQ8BLWLFS\",'/','.huawei.com');delete_cookie(\"_ga_8GRJ7QNG8D\",'/','.huawei.com');delete_cookie(\"_hid\",'/','.hypers.com');delete_cookie(\"_hid1\",'/','t-westeuhw.hypers.com');delete_cookie(\"_hid1\",'/','.hypers.com');_ha=null;if(typeof gtag!=='undefined'){gtag('consent','update',{'ad_storage':'denied','analytics_storage':'denied'});}}if(cats[3]===0){delete_cookie(\"lang\",'/','.linkedin.com');delete_cookie(\"AnalyticsSyncHistory\",'/','.linkedin.com');delete_cookie(\"UserMatchHistory\",'/','linkedin.com');delete_cookie(\"bscookie\",'/','.www.linkedin.com');delete_cookie(\"bcookie\",'/','.linkedin.com');delete_cookie(\"li_sugr\",'/','.linkedin.com');delete_cookie(\"lidc\",'/','.linkedin.com');delete_cookie(\"NID\",'/','.google.com');delete_cookie(\"test_cookie\",'/','doubleclick.net');delete_cookie(\"1P_JAR\",'/','google.com');delete_cookie(\"guest_id\",'/','.twitter.com');delete_cookie(\"personalization_id\",'/','.twitter.com');delete_cookie(\"fr\",'/','.facebook.com');delete_cookie(\"tr\",'/','.facebook.com');delete_cookie(\"_fbp\",'/','.huawei.com');}};var closePrompt=function(){$modal.style.display=\"none\";$consentModal=document.getElementById(\"__tealiumGDPRecModal\");setTimeout(function(){updateConsentCookies();},1000);if($consentModal!=null)$consentModal.style.display=\"none\";};var resetButton=document.getElementById(\"preferences_prompt_reset\");if(!!resetButton&&document.addEventListener){resetButton.addEventListener('click',function(){resetCat();})}var closeButton=document.getElementById(\"preferences_prompt_close\");if(!!closeButton&&document.addEventListener){closeButton.addEventListener('click',function(){closePrompt();})}var consentState=utag.gdpr.getConsentState();if(typeof consentState===\"number\"){var _state=false;if(consentState===0){_state=utag.gdpr.consent_prompt.isEnabled?false:true;}else if(consentState===1||consentState===-1){_state=consentState===1;}else{_state=!!utag.gdpr.preferences_prompt.defaultState;}for(i=0;i<utag.gdpr.getCategories().length;i++){if(document.getElementById(\"toggle_cat\"+(i+1))!=null)document.getElementById(\"toggle_cat\"+(i+1)).checked=_state;}}else{for(i=0;i<consentState.length;i++){if(consentState[i].ct!==\"1\"){continue;}if(document.getElementById(\"toggle_cat\"+(i+1))!=null)document.getElementById(\"toggle_cat\"+(i+1)).checked=true;}}if(document.addEventListener){$el.addEventListener(\"click\",callBack,false);$closeBtn.addEventListener(\"click\",closePrompt,false);}else if(document.attachEvent){$el.attachEvent(\"click\",callBack);$closeBtn.attachEvent(\"click\",closePrompt);}else{$el.onclick=callBack;$closeBtn.onclick=closePrompt;}}());(function(){$(document).on(\"click\",\"#__tealiumGDPRecModal .consent\",function(e){$(\"#__tealiumGDPRecModal\").fadeOut();if(window.innerWidth<768)$(\"body\").css(\"overflow\",\"hidden\");return false;});$(document).on(\"click\",\"#__tealiumGDPRcpPrefs #preferences_prompt_submit, #__tealiumGDPRcpPrefs #preferences_prompt_optin, #preferences_prompt_close\",function(e){$(\"body\").css(\"overflow\",\"\");});var p=function(){var dfd=jQuery.Deferred();dfd.resolve();return dfd.promise();};var bootstrapTab=p;if(window.jQuery&&!$.fn.tab){bootstrapTab=function(){return $.getScript(\"https://www.huawei.com/Assets/corp/2020/js/lib/vendor/bootstrap/bootstrap.min.js\");};}bootstrapTab().then(function(){if($(window).width()>768)return;var tab=p;if(!$.fn.tabCollapse){tab=function(){return $.getScript(\"https://www.huawei.com/-/media/corp2020/public/js/bootstraptabcollapsemin.js\");};}tab().then(function(){$(\"#js-cookie-privacy\").tabCollapse();});});})();(function(){var removeItems=document.querySelectorAll(\"[data-nondisplay]\");try{removeItems.forEach(function(v){var nonExp=new RegExp(v.getAttribute(\"data-nondisplay\"));var match=nonExp.test(document.URL);if(!match)return;v.parentNode.removeChild(v);});}catch(error){}})();";
    utag.gdpr.preferences_prompt.defaultLang = "en";
    utag.gdpr.showConsentPreferences = function(_lang) {
        function cloneObject(source, target, depth) {
            if (depth === undefined) {
                depth = 1;
            } else if (depth === -1) {
                utag.DB("Max Clone depth exceeded, using reference");
                return source;
            }
            if (window.JSON) {
                return JSON.parse(JSON.stringify(source));
            }
            target = target || {};
            for (var prop in source) {
                if (!source.hasOwnProperty(prop)) {
                    continue;
                }
                switch (utag.gdpr.typeOf(source[prop])) {
                case "array":
                    target[prop] = source[prop].slice(0);
                    break;
                case "object":
                    target[prop] = cloneObject(source[prop], target[prop], --depth);
                    break;
                default:
                    target[prop] = source[prop];
                }
            }
            return target;
        }
        try {
            if (utag.gdpr.preferences_prompt.noShow) {
                return;
            }
            var cn = document.getElementById("__tealiumGDPRcpStyle");
            if (cn) {
                cn.parentNode.removeChild(cn);
            }
            var hn = document.getElementById("__tealiumGDPRcpPrefs");
            if (hn) {
                hn.parentNode.removeChild(hn);
            }
            var sn = document.getElementById("__tealiumGDPRcpPrefsScript");
            if (sn) {
                sn.parentNode.removeChild(sn);
            }
            var promptData = cloneObject(utag.gdpr.preferences_prompt);
            var activeCats = utag.gdpr.getCategories(true);
            var cats = '';
            var id;
            for (var i = 0; i < activeCats.length; i++) {
                id = utag.gdpr.preferences_prompt.categories[activeCats[i]].id;
                cats += '<tr><td>{{category_' + activeCats[i] + '_title}}</td><td>{{category_' + activeCats[i] + '_description}}</td><td><input type="checkbox" class="toggle" id="toggle_cat' + id + '"/><label for="toggle_cat' + id + '"> <span class="on">{{yes}}</span> <span class="off">{{no}}</span></label></td></tr>';
            }
            promptData.content.html = promptData.content.html.replace('<!--CATEGORIES-->', cats);
            var dtc = utag.gdpr.getDeTokenizedContent(promptData, _lang);
            var head = document.head || document.getElementsByTagName("head")[0]
              , style = document.createElement("style")
              , mDiv = document.createElement("div")
              , scr = document.createElement("script")
              , body = document.body || document.getElementsByTagName("body")[0];
            style.type = "text/css";
            style.id = "__tealiumGDPRcpStyle";
            if (style.styleSheet) {
                style.styleSheet.cssText = dtc.css;
            } else {
                style.appendChild(document.createTextNode(dtc.css));
            }
            head.appendChild(style);
            mDiv.innerHTML = dtc.html;
            mDiv.id = "__tealiumGDPRcpPrefs";
            body.appendChild(mDiv);
            scr.language = "javascript";
            scr.type = "text/javascript";
            scr.text = "try{" + dtc.js + "} catch(e){utag.DB(e)}";
            scr.id = "__tealiumGDPRcpPrefsScript";
            head.appendChild(scr);
        } catch (e) {
            utag.DB(e);
        }
    }
    ;
    utag.gdpr.dns = null;
    utag.track_old = utag.track;
    utag.track = function(a, b, c, d) {
        if (typeof a == "string")
            a = {
                event: a,
                data: b,
                cfg: {
                    cb: c,
                    uids: d
                }
            };
        if (a.event === "update_consent_cookie" && b.consent_categories) {
            utag.gdpr.updateConsentCookie(b.consent_categories);
        } else if (a.event === "set_dns_state" && typeof b.do_not_sell !== 'undefined') {
            utag.gdpr.dns.setDnsState(b.do_not_sell);
        } else {
            if (utag.gdpr.getConsentState() === 0) {
                if (!utag.gdpr.noqueue)
                    utag.gdpr.queue.push({
                        event: a.event,
                        data: utag.handler.C(a.data),
                        cfg: utag.handler.C(a.cfg)
                    });
            }
            if (a.cfg.uids) {
                var uids = [];
                for (var i = 0; i < a.cfg.uids.length; i++) {
                    if (!utag.gdpr.shouldTagFire(a.cfg.uids[i])) {
                        uids.push(a.cfg.uids[i]);
                    }
                }
                a.cfg.uids = uids;
                utag.gdpr.trackUIDs = utag.gdpr.trackUIDs.concat(uids);
            }
            return utag.track_old.apply(this, arguments);
        }
    }
    ;
    utag.loader.OU_old = utag.loader.OU;
    utag.loader.OU = function(tid) {
        try {
            if (utag.gdpr.typeOf(tid) !== "undefined") {
                return utag.gdpr.shouldTagFire();
            }
            utag.gdpr.applyConsentState();
        } catch (e) {
            utag.DB(e);
        }
    }
    ;
    if (utag.gdpr.preferences_prompt.single_cookie) {
        window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
        utag.loader.SC("utag_main", null, "da");
        window.utag_cfg_ovrd.nocookie = true;
    }
    if (!utag.gdpr.consent_prompt.isEnabled && !utag.gdpr.doNotSell.isEnabled && utag.gdpr.getConsentState() == 0) {
        utag.gdpr.setAllCategories(utag.gdpr.preferences_prompt.defaultState, !0);
    }
    if (typeof utag_cfg_ovrd != 'undefined') {
        for (utag._i in utag.loader.GV(utag_cfg_ovrd))
            utag.cfg[utag._i] = utag_cfg_ovrd[utag._i]
    }
    ;utag.loader.PINIT = function(a, b, c) {
        utag.DB("Pre-INIT");
        if (utag.cfg.noload) {
            return;
        }
        try {
            this.GET();
            if (utag.handler.RE('view', utag.data, "blr")) {
                utag.handler.LR(utag.data);
            }
        } catch (e) {
            utag.DB(e)
        }
        ;a = this.cfg;
        c = 0;
        for (b in this.GV(a)) {
            if (a[b].block == 1 || (a[b].load > 0 && (typeof a[b].src != 'undefined' && a[b].src != ''))) {
                a[b].block = 1;
                c = 1;
                this.bq[b] = 1;
            }
        }
        if (c == 1) {
            for (b in this.GV(a)) {
                if (a[b].block) {
                    a[b].id = b;
                    if (a[b].load == 4)
                        a[b].load = 1;
                    a[b].cb = function() {
                        var d = this.uid;
                        utag.loader.cfg[d].cbf = 1;
                        utag.loader.LOAD(d)
                    }
                    ;
                    this.AS(a[b]);
                }
            }
        }
        if (c == 0)
            this.INIT();
    }
    ;
    utag.loader.INIT = function(a, b, c, d, e) {
        utag.DB('utag.loader.INIT');
        if (this.ol == 1)
            return -1;
        else
            this.ol = 1;
        if (utag.cfg.noview != true)
            utag.handler.RE('view', utag.data, "alr");
        utag.rpt.ts['i'] = new Date();
        d = this.cfgsort;
        for (a = 0; a < d.length; a++) {
            e = d[a];
            b = this.cfg[e];
            b.id = e;
            if (b.block != 1) {
                if (utag.loader.bk[b.id] || ((utag.cfg.readywait || utag.cfg.noview) && b.load == 4)) {
                    this.f[b.id] = 0;
                    utag.loader.LOAD(b.id)
                } else if (b.wait == 1 && utag.loader.rf == 0) {
                    utag.DB('utag.loader.INIT: waiting ' + b.id);
                    this.wq.push(b)
                    this.f[b.id] = 2;
                } else if (b.load > 0) {
                    utag.DB('utag.loader.INIT: loading ' + b.id);
                    this.lq.push(b);
                    this.AS(b);
                }
            }
        }
        if (this.wq.length > 0)
            utag.loader.EV('', 'ready', function(a) {
                if (utag.loader.rf == 0) {
                    utag.DB('READY:utag.loader.wq');
                    utag.loader.rf = 1;
                    utag.loader.WQ();
                }
            });
        else if (this.lq.length > 0)
            utag.loader.rf = 1;
        else if (this.lq.length == 0)
            utag.loader.END();
        return 1
    }
    ;
    utag.loader.EV('', 'ready', function(a) {
        if (utag.loader.efr != 1) {
            utag.loader.efr = 1;
            try {
                if (utag.cfg.readywait || utag.cfg.waittimer) {
                    utag.loader.EV("", "ready", function() {
                        setTimeout(function() {
                            utag.gdpr.promptEnabledSetting();
                            cmExplicitDomReady();
                            cmDNSDomReady();
                        }, utag.cfg.waittimer || 1);
                    });
                } else {
                    utag.gdpr.promptEnabledSetting();
                    cmExplicitDomReady();
                    cmDNSDomReady();
                }
                function cmExplicitDomReady() {
                    try {
                        if (utag.gdpr.consent_prompt.isEnabled) {
                            if (!utag.gdpr.consent_prompt.noShow) {
                                if (!utag.gdpr.getConsentState()) {
                                    utag.gdpr.showExplicitConsent();
                                }
                            }
                        }
                    } catch (e) {
                        utag.DB(e);
                    }
                }
                function cmDNSDomReady() {
                    try {
                        if (utag.gdpr.doNotSell.isEnabled) {
                            if (!utag.gdpr.doNotSell.noShow) {
                                if (!utag.gdpr.dns.getDnsState()) {
                                    utag.gdpr.showDoNotSellBanner();
                                }
                            }
                        }
                    } catch (e) {
                        utag.DB(e);
                    }
                }
            } catch (e) {
                utag.DB(e);
            }
            try {
                try {
                    if (1) {
                        function getCookie(name) {
                            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                            if (match)
                                return match[2];
                        }
                        function get_ts(ts) {
                            var timestamp = ts.match(/ts\:(\d+)/);
                            return timestamp[1];
                        }
                        function delete_cookie(name, path, domain) {
                            if (getCookie(name)) {
                                document.cookie = name + "=" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
                            }
                        }
                        var policy_update_date = "8/18/2021 18:00:00 GMT+0800"
                        var policy_update_date_obj = new Date(policy_update_date)
                        var cookies_consent_date_obj = new Date(parseInt(get_ts(decodeURI(getCookie("CONSENTMGR")))))
                        if (cookies_consent_date_obj < policy_update_date_obj) {
                            delete_cookie("CONSENTMGR", '/', '.huawei.com')
                            utag.gdpr.showExplicitConsent()
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (1) {
                        function getParameterByName(name, url) {
                            if (!url)
                                url = window.location.href;
                            name = name.replace(/[\[\]]/g, '\\$&');
                            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
                              , results = regex.exec(url);
                            if (!results)
                                return null;
                            if (!results[2])
                                return '';
                            try {
                                var url_query = decodeURIComponent(results[2].replace(/\+/g, ' '));
                                return url_query;
                            } catch (e) {
                                url_query = results[2].replace(/\+/g, ' ');
                                return url_query;
                            }
                        }
                        function isAnalyticsEnabled() {
                            if (utag.gdpr) {
                                if (utag.gdpr.getConsentState() == '0' && utag.gdpr.consent_prompt.isEnabled) {
                                    return false;
                                }
                                if (utag.gdpr.getConsentState() == '-1') {
                                    return false;
                                }
                                if (!!utag.gdpr.getConsentState().length && utag.gdpr.getConsentState().length > 0) {
                                    for (var i = 0; i < utag.gdpr.getConsentState().length; i++) {
                                        if (utag.gdpr.getConsentState()[i].name == "analytics" && utag.gdpr.getConsentState()[i].ct === '0') {
                                            return false;
                                        }
                                    }
                                }
                                return true;
                            } else {
                                return true;
                            }
                        }
                        function extend() {
                            var i = 0;
                            var result = {};
                            for (; i < arguments.length; i++) {
                                var attributes = arguments[i];
                                for (var key in attributes) {
                                    result[key] = attributes[key];
                                }
                            }
                            return result;
                        }
                        function decode(s) {
                            try {
                                return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
                            } catch (err) {
                                return s;
                            }
                        }
                        function setCookie(key, value, attributes) {
                            if (typeof document === 'undefined') {
                                return;
                            }
                            attributes = extend({
                                path: '/'
                            }, {}, attributes);
                            if (typeof attributes.expires === 'number') {
                                attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e5);
                            }
                            attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
                            try {
                                var result = JSON.stringify(value);
                                if (/^[\{\[]/.test(result)) {
                                    value = result;
                                }
                            } catch (e) {}
                            value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                            key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                            var stringifiedAttributes = '';
                            for (var attributeName in attributes) {
                                if (!attributes[attributeName]) {
                                    continue;
                                }
                                stringifiedAttributes += '; ' + attributeName;
                                if (attributes[attributeName] === true) {
                                    continue;
                                }
                                stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
                            }
                            return (document.cookie = key + '=' + value + stringifiedAttributes);
                        }
                        function getCookie(key, json) {
                            if (typeof document === 'undefined') {
                                return;
                            }
                            var jar = {};
                            var cookies = document.cookie ? document.cookie.split('; ') : [];
                            var i = 0;
                            for (; i < cookies.length; i++) {
                                var parts = cookies[i].split('=');
                                var cookie = parts.slice(1).join('=');
                                if (!json && cookie.charAt(0) === '"') {
                                    cookie = cookie.slice(1, -1);
                                }
                                try {
                                    var name = decode(parts[0]);
                                    cookie = decode(cookie);
                                    if (json) {
                                        try {
                                            cookie = JSON.parse(cookie);
                                        } catch (e) {}
                                    }
                                    jar[name] = cookie;
                                    if (key === name) {
                                        break;
                                    }
                                } catch (e) {}
                            }
                            return key ? jar[key] : jar;
                        }
                        function isEmpty(obj) {
                            for (var prop in obj) {
                                if (obj.hasOwnProperty(prop)) {
                                    return false;
                                }
                            }
                            return JSON.stringify(obj) === JSON.stringify({});
                        }
                        var white_list = function(URL) {
                            return true;
                        };
                        function source_parameter_cookies() {
                            var utm_campaign = getParameterByName("utm_campaign");
                            var utm_source = getParameterByName("utm_source");
                            var utm_medium = getParameterByName("utm_medium");
                            var utm_content = getParameterByName("utm_content");
                            var source = getParameterByName("source");
                            var utm_object = getParameterByName("utm_object");
                            var utm_term = getParameterByName("utm_term");
                            var obj = getCookie("source_parameter", true) || {};
                            if (!!utm_campaign && !!white_list()) {
                                obj['utm_campaign'] = utm_campaign;
                            }
                            if (!!utm_source && !!white_list()) {
                                obj['utm_source'] = utm_source;
                            }
                            if (!!utm_medium && !!white_list()) {
                                obj['utm_medium'] = utm_medium;
                            }
                            if (!!utm_content && !!white_list()) {
                                obj['utm_content'] = utm_content;
                            }
                            if (!!utm_term && !!white_list()) {
                                obj['utm_term'] = utm_term;
                            }
                            if (!!source && !!white_list()) {
                                obj['source'] = source
                            }
                            if (!!utm_object && !!white_list()) {
                                obj['utm_object'] = utm_object;
                            }
                            if (!isEmpty(obj) && isAnalyticsEnabled()) {
                                setCookie("source_parameter", decodeURI(JSON.stringify(obj)), {
                                    domain: '.huawei.com',
                                    expires: 1 * 0.083
                                });
                            }
                        }
                        function uuidv4() {
                            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c=>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
                        }
                        function huawei_materialAnonymousId() {
                            return uuidv4().replace(/-/g, "b");
                        }
                        function huawei_materialAnonymousId_cookies() {
                            if (isAnalyticsEnabled() && !getCookie("materialAnonymousId")) {
                                setCookie("materialAnonymousId", huawei_materialAnonymousId(), {
                                    domain: '.huawei.com',
                                    expires: 60
                                });
                            }
                        }
                        var perf_button = document.querySelector('#__tealiumGDPRecModal > div > div.privacy_prompt_content > div > div:nth-child(3) > a')
                        var opt_in_button = document.getElementById("privacy_pref_optin");
                        var close_button = document.getElementById("preferences_prompt_close");
                        if (!!perf_button) {
                            perf_button.addEventListener('click', function() {
                                setTimeout(function() {
                                    var save_button = document.getElementById("preferences_prompt_submit");
                                    if (!!save_button) {
                                        save_button.addEventListener("click", function() {
                                            setTimeout(function() {
                                                source_parameter_cookies()
                                            }, 1000);
                                        });
                                    }
                                }, 1000);
                            });
                        }
                        if (!!opt_in_button) {
                            opt_in_button.addEventListener("click", function() {
                                setTimeout(function() {
                                    source_parameter_cookies()
                                }, 1000);
                            });
                        }
                        if (!!close_button) {
                            close_button.addEventListener("click", function() {
                                setTimeout(function() {
                                    source_parameter_cookies()
                                }, 1000);
                            });
                        }
                        source_parameter_cookies()
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (utag.data['dom.domain'].toString().toLowerCase() == 'www.huawei.com'.toLowerCase()) {
                        (function() {
                            $("body").on("click", 'a[href*=".pdf"]', function(e) {
                                utag.link({
                                    "link_category": "pdf_download",
                                    "link_name": "click",
                                    "link_url": encodeURI(this.href),
                                    "tealium_event": "link_click"
                                });
                            });
                            $('a[href*=".pdf"]').each(function() {
                                var $t = $(this);
                                var onclick = $(this).attr("onclick");
                                if (/^ga\(/i.test(onclick)) {
                                    $t.attr("old-ga-onclick", onclick).prop("onclick", null).removeAttr("onclick");
                                }
                            });
                        }
                        )();
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (1) {
                        if (document.location.pathname.match(/searchresult/i)) {
                            var filter_result = document.querySelector(".filter-result")
                            var links = filter_result.querySelectorAll(':not(a[href*="www.huawei.com"])');
                            for (var i = 0; i < links.length; i++) {
                                if (!!links[i].href) {
                                    if (links[i].href.match(/\.huawei|vmall/i) && !links[i].href.match(/www\.huawei\.com/i))
                                        links[i].addEventListener("click", function() {
                                            utag.view({
                                                'ga_page_path': 'virtual-pageview/' + getVPath(this.hostname) + '/' + this.href
                                            })
                                            console.log('virtual-pageview/' + getVPath(this.hostname) + '/' + this.href)
                                        })
                                }
                            }
                        }
                        function getVPath(hostname) {
                            if (hostname.match(/vmall/i)) {
                                return "vmall"
                            }
                            if (hostname.match(/\.huawei\.com/i)) {
                                return hostname.split('.')[0]
                            }
                            return "other"
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if ((typeof utag.data['scrolling_track_enable'] != 'undefined' && utag.data['scrolling_track_enable'] == '1')) {
                        if (!window.addEvent) {
                            window.addEvent = function(element, evnt, funct) {
                                try {
                                    if (element.attachEvent) {
                                        return element.attachEvent('on' + evnt, funct);
                                    }
                                    return element.addEventListener(evnt, funct, false);
                                } catch (e) {
                                    try {
                                        console.log('addEvent failed: ' + e);
                                    } catch (e) {}
                                }
                            }
                            ;
                        }
                        try {
                            if (utag.cfg.noview) {
                                var origUtagView = utag.view;
                                utag.view = function() {
                                    utag.ut.scrollTracker = {
                                        1: false,
                                        2: false,
                                        3: false,
                                        4: false
                                    };
                                    origUtagView.apply(utag, arguments);
                                }
                            } else {
                                utag.ut.scrollTracker = {
                                    1: false,
                                    2: false,
                                    3: false,
                                    4: false
                                };
                            }
                            addEvent(window, 'scroll', function() {
                                var html = document.documentElement;
                                var body = document.body;
                                var viewPort = {
                                    yScroll: window.pageYOffset || (html && html.scrollTop) || body.scrollTop,
                                    hScroll: document.compatMode === 'CSS1Compat' ? html.clientHeight || window.innerHeight || 0 : body.clientHeight || 0
                                }
                                  , windowHeight = Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, body.clientHeight, html.clientHeight)
                                  , quartile = Number(((viewPort.hScroll + viewPort.yScroll) / windowHeight * 4)).toFixed(0);
                                for (var key in utag.ut.scrollTracker) {
                                    if (key <= quartile && !utag.ut.scrollTracker[key]) {
                                        utag.link({
                                            "event_name": "user_scroll",
                                            "eventCat": "Page Scroll",
                                            "eventAct": key * 25,
                                        });
                                        utag.ut.scrollTracker[key] = true;
                                    }
                                }
                            });
                        } catch (e) {
                            utag.DB('Error with performing the scroll tracker: ' + e);
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                if (typeof utag.runonce == 'undefined')
                    utag.runonce = {};
                utag.jdh = function(h, i, j, k) {
                    h = utag.jdhc.length;
                    if (h == 0)
                        window.clearInterval(utag.jdhi);
                    else {
                        for (i = 0; i < h; i++) {
                            j = utag.jdhc[i];
                            k = jQuery(j.i).is(":visible") ? 1 : 0;
                            if (k != j.s) {
                                if (j.e == (j.s = k))
                                    jQuery(j.i).trigger(j.e ? "afterShow" : "afterHide")
                            }
                        }
                    }
                }
                ;
                utag.jdhi = window.setInterval(utag.jdh, 250);
                utag.jdhc = [];
                if (utag.data['dom.domain'].toString().toLowerCase() == 'www.huawei.com'.toLowerCase()) {
                    if (typeof utag.runonce[143] == 'undefined') {
                        utag.runonce[143] = 1;
                        jQuery(document.body).on('click', 'a', function(e) {
                            utag.link({
                                "link_url": this.href
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
        }
    })
    if (utag.cfg.readywait || utag.cfg.waittimer) {
        utag.loader.EV('', 'ready', function(a) {
            if (utag.loader.rf == 0) {
                utag.loader.rf = 1;
                utag.cfg.readywait = 1;
                utag.DB('READY:utag.cfg.readywait');
                setTimeout(function() {
                    utag.loader.PINIT()
                }, utag.cfg.waittimer || 1);
            }
        })
    } else {
        utag.loader.PINIT()
    }
}
