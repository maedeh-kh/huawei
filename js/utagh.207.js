//tealium universal tag - utag.207 ut4.0.202412100235, Copyright 2024 Tealium.com Inc. All Rights Reserved.
try {
    (function(id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.map = {
            "cp.usertype": "page_view.up.user_type,login.up.user_type,click_navigation.up.user_type,pricing_form_submit.up.user_type,register_from.up.user_type,click_nav_bottom.up.user_type,click_contact_us.up.user_type,click_anchor.up.user_type,click_body.up.user_type,form_input.up.user_type,submit_poc.up.user_type,search.up.user_type,download_video.up.user_type,share_social.up.user_type,video_play.up.user_type,material_download.up.user_type,poc_form_summit.up.user_type,input.up.user_type",
            "item_type": "page_view.item_type",
            "product_tag": "page_view.product_tag",
            "industry_tag": "page_view.industry_tag",
            "product_portfolio_tag": "page_view.product_portfolio_tag",
            "login_status": "page_view.login_status",
            "tactic_code": "page_view.tactic_code,pricing_form_submit.tactic_code,register_from.tactic_code,poc_form_summit.tactic_code",
            "language": "page_view.language",
            "client_id": "page_view.hw_client_id,pricing_form_submit.hw_client_id,register_from.hw_client_id,click_navigation.hw_client_id,click_nav_bottom.hw_client_id,click_contact_us.hw_client_id,click_anchor.hw_client_id,click_body.hw_client_id,login.hw_client_id,material_download.hw_client_id,input.hw_client_id,poc_form_summit.hw_client_id,search.hw_client_id,social_share.hw_client_id,video_play.hw_client_id",
            "tealium_event:pricing_form_submit": "pricing_form_submit",
            "tealium_event:register_from": "register_from",
            "tealium_event:click_navigation": "click_navigation",
            "tealium_event:click_nav_bottom": "click_nav_bottom",
            "tealium_event:click_contact_us": "click_contact_us",
            "tealium_event:click_anchor": "click_anchor",
            "tealium_event:click_body": "click_body",
            "tealium_event:click_login": "login",
            "tealium_event:download_material": "material_download",
            "tealium_event:form_input": "input",
            "tealium_event:submit_poc": "poc_form_summit",
            "tealium_event:search": "search",
            "tealium_event:download_video": "video_play",
            "tealium_event:share_social": "social_share",
            "tealium_event:video_play": "search,video_start",
            "tealium_event:megamenu_click": "megamenu_click",
            "tealium_event:header_click": "header_click",
            "tealium_event:footer_click": "footer_click",
            "tealium_event:breadcrumb_click": "breadcrumb_click",
            "tealium_event:submenu_click": "submenu_click",
            "tealium_event:anchor_click": "anchor_click",
            "tealium_event:homepage_banner_click": "homepage_banner_click",
            "tealium_event:search_box_open": "search_box_open",
            "tealium_event:search_box_close": "search_box_close",
            "tealium_event:search_quick_link_click": "search_quick_link_click",
            "tealium_event:search_submit": "search_submit",
            "tealium_event:search_term_reset": "search_term_reset",
            "tealium_event:search_result_click": "search_result_click",
            "tealium_event:search_category_click": "search_category_click",
            "tealium_event:search_category_sortby": "search_category_sortby",
            "tealium_event:section_search_submit": "section_search_submit",
            "tealium_event:section_search_term_reset": "section_search_term_reset",
            "tealium_event:pagination_click": "pagination_click",
            "tealium_event:list_filter_click": "list_filter_click",
            "tealium_event:side_button_click": "side_button_click",
            "tealium_event:social_share": "social_share",
            "tealium_event:video_start": "video_start",
            "tealium_event:video_progress": "video_progress",
            "tealium_event:video_complete": "video_complete",
            "tealium_event:form_start": "form_start",
            "tealium_event:form_submit": "form_submit",
            "lead_code": "pricing_form_submit.lead_code",
            "target_name": "click_contact_us.target_name,click_anchor.target_name,click_body.target_name,click_nav_bottom.target_name,click_navigation.target_name",
            "target_url": "click_navigation.target_url,click_nav_bottom.target_url,click_contact_us.target_url,click_body.target_url",
            "form_type": "register_from.form_type",
            "at_form_name": "register_from.form_name",
            "material_name": "material_download.material_name",
            "material_url": "material_download.material_url",
            "filed_name": "input.filed_name",
            "keywords": "search.keywords",
            "video_name": "video_play.video_name,search.video_name",
            "video_url": "video_play.video_url,search.video_url,video_start.video_url,video_progress.video_url,video_complete.video_url",
            "social_name": "social_share.social_name",
            "ga4_measurement_id": "measurement_id",
            "nav_category": "megamenu_click.nav_category,footer_click.nav_category,submenu_click.nav_category",
            "nav_name": "footer_click.nav_name,header_click.nav_name,footer_click.nav_name,megamenu_click.nav_name,submenu_click.nav_name",
            "nav_url": "megamenu_click.nav_url,header_click.nav_url,footer_click.nav_url,breadcrumb_click.nav_url,submenu_click.nav_url",
            "anchor_name": "anchor_click.anchor_name",
            "banner_name": "homepage_banner_click.banner_name",
            "banner_url": "homepage_banner_click.banner_url",
            "search_position": "search_box_open.search_position,search_box_close.search_position",
            "quick_link_name": "search_quick_link_click.quick_link_name",
            "search_term": "search_submit.search_term,search_term_reset.search_term,section_search_submit.search_term,section_search_term_reset.search_term",
            "destination_url": "search_result_click.destination_url",
            "search_category": "search_category_click.search_category",
            "search_sort_by": "search_category_sortby.search_sort_by",
            "tab_name": "section_search_submit.tab_name,list_filter_click.tab_name,section_search_term_reset.tab_name",
            "pagination_number": "pagination_click.pagination_number",
            "pagination_button": "pagination_click.pagination_button",
            "filter_category": "list_filter_click.filter_category",
            "filter_name": "list_filter_click.filter_name",
            "button_name": "side_button_click.button_name",
            "video_percent": "video_progress.video_percent",
            "form_id": "form_start.form_id,form_submit.form_id",
            "form_name": "form_start.form_name,form_submit.form_name",
            "quick_link_url": "search_quick_link_click.quick_link_url",
            "banner_position": "homepage_banner_click.banner_position",
            "topic_tag": "page_view.topic_tag",
            "campaign_name": "form_start.campaign_name2,form_submit.campaign_name2",
            "page_path_level1": "page_view.page_path_level1",
            "page_path_level2": "page_view.page_path_level2",
            "page_path_level3": "page_view.page_path_level3"
        };
        u.extend = [];
        u.send = function(utag_event, data_layer) {
            if (u.ev[utag_event] || u.ev.all !== undefined) {
                utag.DB("send:207");
                utag.DB(data_layer);
                var a, b, c, d, i, j, has_purchase = false, prop;
                a = utag_event;
                b = data_layer;
                u.data = {
                    "base_url": "https://www.googletagmanager.com/gtag/js?id=##utag_measurement_id##",
                    "measurement_id": "G-XXDVNPW2GY,G-8GRJ7QNG8D,G-DYQ8BLWLFS",
                    "clear_global_vars": "false",
                    "data_layer_name": "",
                    "send_page_view": "true",
                    "order_id": "",
                    "order_total": "",
                    "order_subtotal": "",
                    "order_shipping": "",
                    "order_tax": "",
                    "order_store": "",
                    "order_currency": "",
                    "order_coupon_code": "",
                    "product_id": [],
                    "product_name": [],
                    "product_brand": [],
                    "product_category": [],
                    "product_subcategory": [],
                    "product_addcategory3": [],
                    "product_addcategory4": [],
                    "product_addcategory5": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "product_discount": [],
                    "product_coupon": [],
                    "product_variant": [],
                    "product_promotion_id": [],
                    "product_promotion_name": [],
                    "product_creative_name": [],
                    "product_creative_slot": [],
                    "product_location_id": [],
                    "product_index": [],
                    "product_item_list_name": [],
                    "product_item_list_id": [],
                    "product_affiliation": [],
                    "event_queue": [],
                    "config": {},
                    "set": {
                        "developer_id.dYmQxMT": true,
                        "user_properties": {}
                    },
                    "event": {},
                    "items": []
                };
                utag.DB("send:207:EXTENSIONS");
                utag.DB(data_layer);
                for (var mapping_key in utag.loader.GV(u.map)) {
                    if (data_layer[mapping_key] !== undefined && data_layer[mapping_key] !== "") {
                        var destinations = u.map[mapping_key].split(",");
                        for (i = 0; i < destinations.length; i++) {
                            mapFunc(destinations[i].split("."), u.data, data_layer[mapping_key]);
                        }
                    } else {
                        var event_destinations = mapping_key.split(":");
                        if (event_destinations.length === 2 && data_layer[event_destinations[0]] === event_destinations[1]) {
                            if (u.map[mapping_key]) {
                                u.data.event_queue = u.data.event_queue.concat(u.map[mapping_key].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:207:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || data_layer._corder || "";
                u.data.order_total = u.data.order_total || data_layer._ctotal || "";
                u.data.order_shipping = u.data.order_shipping || data_layer._cship || "";
                u.data.order_tax = u.data.order_tax || data_layer._ctax || "";
                u.data.order_store = u.data.order_store || data_layer._cstore || "";
                u.data.order_currency = u.data.order_currency || data_layer._ccurrency || "";
                u.data.order_coupon_code = u.data.order_coupon_code || data_layer._cpromo || "";
                u.data.customer_id = u.data.customer_id || data_layer._ccustid || "";
                u.data.customer_city = u.data.customer_city || data_layer._ccity || "";
                u.data.customer_state = u.data.customer_state || data_layer._cstate || "";
                u.data.customer_zip = u.data.customer_zip || data_layer._czip || "";
                u.data.customer_country = u.data.customer_country || data_layer._ccountry || "";
                if (u.data.product_id.length === 0 && data_layer._cprod !== undefined) {
                    u.data.product_id = data_layer._cprod.slice(0);
                }
                if (u.data.product_name.length === 0 && data_layer._cprodname !== undefined) {
                    u.data.product_name = data_layer._cprodname.slice(0);
                }
                if (u.data.product_brand.length === 0 && data_layer._cbrand !== undefined) {
                    u.data.product_brand = data_layer._cbrand.slice(0);
                }
                if (u.data.product_category.length === 0 && data_layer._ccat !== undefined) {
                    u.data.product_category = data_layer._ccat.slice(0);
                }
                if (u.data.product_subcategory.length === 0 && data_layer._ccat2 !== undefined) {
                    u.data.product_subcategory = data_layer._ccat2.slice(0);
                }
                if (u.data.product_quantity.length === 0 && data_layer._cquan !== undefined) {
                    u.data.product_quantity = data_layer._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && data_layer._cprice !== undefined) {
                    u.data.product_unit_price = data_layer._cprice.slice(0);
                }
                if (u.data.product_discount.length === 0 && data_layer._cpdisc !== undefined) {
                    u.data.product_discount = data_layer._cpdisc.slice(0);
                }
                if (utag.ut.typeOf(u.data.measurement_id) === "string" && u.data.measurement_id !== "") {
                    u.data.measurement_id = u.data.measurement_id.replace(/\s/g, "").split(",");
                }
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                if (!u.data.measurement_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute measurement_id not populated");
                    return;
                }
                if (u.data.gtag_enable_tcf_support) {
                    window["gtag_enable_tcf_support"] = toBoolean(u.data.gtag_enable_tcf_support);
                }
                var utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
                var utmPageLocation = u.data.config.page_location || data_layer["dom.url"];
                var utmQuery = [];
                utmParams.forEach(function(paramName) {
                    if (u.data[paramName] && utmPageLocation.indexOf(paramName + "=") === -1) {
                        utmQuery.push(paramName + "=" + u.data[paramName]);
                    }
                });
                if (utmQuery.length) {
                    u.data.config.page_location = utmPageLocation.indexOf("?") === -1 ? utmPageLocation + "?" + utmQuery.join("&") : utmPageLocation + "&" + utmQuery.join("&");
                }
                u.data.event.send_to = u.data.event.send_to || u.data.measurement_id;
                if (u.data.customer_id) {
                    u.data.config.user_id = u.data.customer_id;
                }
                if (toBoolean(u.data.clear_global_vars)) {
                    setGlobalProperties(u.data.config, true);
                    for (prop in utag.loader.GV(u.data.set)) {
                        if (prop !== "developer_id.dYmQxMT") {
                            setGlobalProperties(u.data.set, true, prop);
                        }
                    }
                }
                setGlobalProperties(u.data.config, false);
                setGlobalProperties(u.data.set, false);
                if (u.data.config.send_page_view !== undefined) {
                    u.data.send_page_view = toBoolean(u.data.config.send_page_view);
                }
                if (toBoolean(u.data.send_page_view) && (utag_event === 'view' || !u.initialized)) {
                    u.data.event_queue.unshift("page_view");
                }
                u.data.config.send_page_view = false;
                for (i = 0; i < u.data.measurement_id.length; i++) {
                    if (!/^[a-zA-Z]{1}-|^[a-zA-Z]{2}-/.test(u.data.measurement_id[i])) {
                        u.data.measurement_id[i] = "G-" + u.data.measurement_id[i];
                    }
                    u.o("config", u.data.measurement_id[i], u.data.config);
                }
                u.initialized = true;
                for (i = 0; i < u.data.event_queue.length; i++) {
                    if (u.data.event_queue[i] === "purchase" || u.data.event_queue[i] === "refund") {
                        has_purchase = true;
                    }
                }
                if (u.data.order_id && !has_purchase) {
                    u.data.event_queue.push("purchase");
                }
                for (i = 0; i < u.data.event_queue.length; i++) {
                    var event_name = u.data.event_queue[i];
                    var event_data = {};
                    event_data = JSON.parse(JSON.stringify(u.data.event));
                    if (u.data.event.event_callback) {
                        event_data.event_callback = u.data.event.event_callback;
                    }
                    if (u.data.event.non_interaction) {
                        u.data.event.non_interaction = true;
                    }
                    if (u.event_map[event_name]) {
                        for (j = 0; j < u.event_map[event_name].length; j++) {
                            var event_param = u.event_map[event_name][j];
                            var event_param_value = u.std_params[event_param] ? u.std_params[event_param](event_name) : u.data[event_param] || "";
                            if (event_param_value !== "") {
                                event_data[event_param] = event_param_value;
                            }
                        }
                    }
                    Object.keys(u.map).forEach(function(mapping_from) {
                        var myTmpAry = u.map[mapping_from].split(',');
                        if (myTmpAry.length > 0) {
                            myTmpAry.forEach(function(tmpDt) {
                                if (tmpDt.indexOf(event_name) === 0) {
                                    var splitTmp = tmpDt.split(".");
                                    if (splitTmp.length >= 3 && splitTmp[1] == "up") {
                                        var tmpUp = splitTmp[2];
                                        var tmpData = {};
                                        tmpData[tmpUp] = b[mapping_from];
                                        window[window.gtagRename]("set", "user_properties", tmpData);
                                    } else if (splitTmp.length >= 2) {
                                        var mapDestination = splitTmp[0];
                                        var mapping_to = splitTmp[1];
                                        event_data[mapping_to] = b[mapping_from];
                                    }
                                }
                            });
                        }
                    });
                    if (undefined !== u.data[event_name] && null !== u.data[event_name] && null != u.data[event_name].up)
                        delete u.data[event_name].up;
                    utag.ut.merge(event_data, u.data[event_name], 0);
                    utag.ut.merge(event_data, u.data.all_events || {}, 0);
                    u.o("event", event_name, event_data);
                }
                if (!hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.data.base_url = u.data.base_url.replace("##utag_measurement_id##", u.data.measurement_id[0]);
                    utag.ut.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_207",
                        "attrs": {}
                    });
                }
                utag.DB("send:207:COMPLETE");
            }
        }
        ;
        function mapFunc(arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                mapFunc(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        }
        function toBoolean(val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        }
        function hasgtagjs() {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf("utag") > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function() {
                    window[data_layer_name].push(arguments);
                }
                ;
                var cross_track = toBoolean("")
                  , cross_track_domains = "";
                if (cross_track && cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        }
        u.scriptrequested = hasgtagjs();
        u.initialized = false;
        u.o = window[window.gtagRename];
        function setGlobalProperties(data, reset, custom_property) {
            var map = {
                "user_id": {
                    "name": "user_id",
                    "type": "exists",
                    "reset": true
                },
                "page_path": {
                    "name": "page_path",
                    "type": "exists",
                    "reset": true
                },
                "page_title": {
                    "name": "page_title",
                    "type": "exists",
                    "reset": true
                },
                "page_location": {
                    "name": "page_location",
                    "type": "exists",
                    "reset": false
                },
                "developer_id.dYmQxMT": {
                    "name": "developer_id.dYmQxMT",
                    "type": "exists",
                    "reset": false
                },
                "user_properties": {
                    "name": "user_properties",
                    "type": "object",
                    "reset": true
                }
            }, prop, subProp, g = {};
            if (custom_property && reset) {
                g[custom_property] = "";
            }
            for (prop in utag.loader.GV(map)) {
                if (reset && map[prop].reset) {
                    if (map[prop].name === "user_properties") {
                        for (subProp in data[prop]) {
                            if (!g[map[prop].name]) {
                                g[map[prop].name] = {};
                            }
                            g[map[prop].name][subProp] = "";
                        }
                    } else {
                        g[map[prop].name] = "";
                    }
                } else {
                    if (map[prop].type === "bool") {
                        if (data[prop] == true || data[prop] === "true") {
                            g[map[prop].name] = true;
                        }
                    } else if (map[prop].type === "exists" || map[prop].type === "object") {
                        if (data[prop]) {
                            g[map[prop].name] = data[prop];
                        }
                    }
                }
            }
            if (!utag.ut.isEmptyObject(g)) {
                u.o("set", g);
            }
        }
        function getItems(length) {
            var g = {}, i, items = [];
            length = length || u.data.product_id.length || u.data.product_name.length;
            for (i = 0; i < length; i++) {
                g = {};
                g.item_id = u.data.product_id[i];
                if (u.data.product_name[i]) {
                    g.item_name = u.data.product_name[i];
                }
                if (u.data.product_coupon[i]) {
                    g.coupon = u.data.product_coupon[i];
                }
                if (u.data.product_discount[i]) {
                    g.discount = u.data.product_discount[i];
                }
                if (u.data.product_affiliation[i]) {
                    g.affiliation = u.data.product_affiliation[i];
                }
                if (u.data.product_brand[i]) {
                    g.item_brand = u.data.product_brand[i];
                }
                if (u.data.product_category[i]) {
                    g.item_category = u.data.product_category[i];
                }
                if (u.data.product_subcategory[i]) {
                    g.item_category2 = u.data.product_subcategory[i];
                }
                if (u.data.product_addcategory3[i]) {
                    g.item_category3 = u.data.product_addcategory3[i];
                }
                if (u.data.product_addcategory4[i]) {
                    g.item_category4 = u.data.product_addcategory4[i];
                }
                if (u.data.product_addcategory5[i]) {
                    g.item_category5 = u.data.product_addcategory5[i];
                }
                if (u.data.product_variant[i]) {
                    g.item_variant = u.data.product_variant[i];
                }
                if (u.data.product_unit_price[i]) {
                    g.price = u.data.product_unit_price[i];
                }
                if (u.data.order_currency) {
                    g.currency = u.data.order_currency;
                }
                if (u.data.product_quantity[i]) {
                    g.quantity = u.data.product_quantity[i];
                }
                if (u.data.product_promotion_id[i]) {
                    g.promotion_id = u.data.product_promotion_id[i];
                }
                if (u.data.product_promotion_name[i]) {
                    g.promotion_name = u.data.product_promotion_name[i];
                }
                if (u.data.product_creative_name[i]) {
                    g.creative_name = u.data.product_creative_name[i];
                }
                if (u.data.product_creative_slot[i]) {
                    g.creative_slot = u.data.product_creative_slot[i];
                }
                if (u.data.product_location_id[i]) {
                    g.location_id = u.data.product_location_id[i];
                }
                if (u.data.product_index[i]) {
                    g.index = u.data.product_index[i];
                }
                if (u.data.product_item_list_name[i]) {
                    g.item_list_name = u.data.product_item_list_name[i];
                }
                if (u.data.product_item_list_id[i]) {
                    g.item_list_id = u.data.product_item_list_id[i];
                }
                items.push(g);
            }
            return items;
        }
        u.event_map = {
            add_payment_info: ["coupon", "currency", "items", "payment_type", "value"],
            add_shipping_info: ["coupon", "currency", "items", "shipping_tier", "value"],
            add_to_cart: ["currency", "items", "value"],
            add_to_wishlist: ["currency", "items", "value"],
            begin_checkout: ["coupon", "currency", "items", "value"],
            earn_virtual_currency: ["virtual_currency_name", "value"],
            generate_lead: ["currency", "value"],
            join_group: ["group_id"],
            level_end: ["level_name", "success"],
            level_start: ["level_name"],
            level_up: ["level", "character"],
            login: ["method"],
            post_score: ["score", "level", "character"],
            purchase: ["affiliation", "coupon", "currency", "items", "transaction_id", "shipping", "tax", "value"],
            refund: ["affiliation", "coupon", "currency", "items", "transaction_id", "shipping", "tax", "value"],
            remove_from_cart: ["currency", "items", "value"],
            search: ["search_term"],
            select_content: ["content_type", "item_id"],
            select_item: ["items", "item_list_name", "item_list_id"],
            select_promotion: ["items", "location_id"],
            share: ["method", "content_type", "content_id"],
            sign_up: ["method"],
            spend_virtual_currency: ["item_name", "virtual_currency_name", "value"],
            tutorial_begin: [],
            tutorial_complete: [],
            unlock_achievement: ["achievement_id"],
            view_cart: ["currency", "items", "value"],
            view_item: ["currency", "items", "value"],
            view_item_list: ["items", "item_list_name", "item_list_id"],
            view_promotion: ["items", "location_id"],
            exception: ["description", "fatal"],
            screen_view: ["screen_name"]
        };
        u.std_params = {
            "transaction_id": function() {
                return u.data.order_id;
            },
            "affiliation": function() {
                return u.data.order_store;
            },
            "value": function(event) {
                if (event.match(/timing_complete|virtual_currency/i)) {
                    return u.data.value;
                }
                return u.data.order_total;
            },
            "currency": function() {
                return u.data.order_currency;
            },
            "tax": function() {
                return u.data.order_tax;
            },
            "shipping": function() {
                return u.data.order_shipping;
            },
            "coupon": function() {
                return u.data.order_coupon_code;
            },
            "fatal": function() {
                return toBoolean(u.data.fatal);
            },
            "items": function(event) {
                if (event.match(/view_item$|select_content/)) {
                    return getItems(1);
                }
                return getItems();
            },
            "item_id": function() {
                return u.data.product_id[0] ? u.data.product_id[0] : "";
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("207", "huawei.main"));
} catch (error) {
    utag.DB(error);
}