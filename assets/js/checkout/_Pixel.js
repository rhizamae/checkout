var canTrack, encode, generateID, getCookie, getCookieID, getLocalStorageID, request, setCookie, track;
generateID = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r, v;
        r = Math.random() * 16 | 0;
        v = c === "x" ? r : r & 3 | 8;
        return v.toString(16)
    })
};
setCookie = function(name, value, options) {
    var cookie, expires;
    if (options == null) {
        options = {}
    }
    if (options.expires === true) {
        options.expires = -1
    }
    if (typeof options.expires === "number") {
        expires = new Date;
        expires.setTime(expires.getTime() + options.expires * 24 * 60 * 60 * 1e3);
        options.expires = expires
    }
    if (options.path == null) {
        options.path = "/"
    }
    value = (value + "").replace(/[^!#-+\--:<-\[\]-~]/g, encodeURIComponent);
    cookie = encodeURIComponent(name) + "=" + value;
    if (options.expires) {
        cookie += ";expires=" + options.expires.toGMTString()
    }
    if (options.path) {
        cookie += ";path=" + options.path
    }
    if (options.domain) {
        cookie += ";domain=" + options.domain
    }
    return document.cookie = cookie
};
getCookie = function(name) {
    var cookie, cookies, index, key, value, _i, _len;
    cookies = document.cookie.split("; ");
    for (_i = 0, _len = cookies.length; _i < _len; _i++) {
        cookie = cookies[_i];
        index = cookie.indexOf("=");
        key = decodeURIComponent(cookie.substr(0, index));
        value = decodeURIComponent(cookie.substr(index + 1));
        if (key === name) {
            return value
        }
    }
    return null
};
encode = function(param) {
    if (typeof param === "string") {
        return encodeURIComponent(param)
    } else {
        return encodeURIComponent(JSON.stringify(param))
    }
};
request = function(url, params, callback) {
    var image, k, v;
    if (params == null) {
        params = {}
    }
    params.i = (new Date).getTime();
    params = function() {
        var _results;
        _results = [];
        for (k in params) {
            v = params[k];
            _results.push("" + k + "=" + encode(v))
        }
        return _results
    }().join("&");
    image = new Image;
    if (callback) {
        image.onload = callback
    }
    image.src = "" + url + "?" + params;
    return true
};
canTrack = function() {
    var dnt, _ref;
    dnt = (_ref = window.navigator.doNotTrack) != null ? _ref.toString().toLowerCase() : void 0;
    switch (dnt) {
        case "1":
        case "yes":
        case "true":
            return false;
        default:
            return true
    }
};

var pixel = {
    track: function(event, params, callback) {
        var k, referrer, request_params, search, v;
        if (params == null) {
            params = {}
        }
        referrer = document.referrer;
        search = window.location.search;
        request_params = {
            event: event,
            rf: referrer,
            sc: search
        };
        for (k in params) {
            v = params[k];
            request_params[k] = v
        }
        request_params.lsid || (request_params.lsid = pixel.getLocalStorageID());
        request_params.cid || (request_params.cid = pixel.getCookieID());
        return request("https://q.stripe.com", request_params, callback)
    },
    getLocalStorageID: function() {
        var err, lsid;
        if (!canTrack()) {
            return "DNT"
        }
        try {
            lsid = localStorage.getItem("lsid");
            if (!lsid) {
                lsid = generateID();
                localStorage.setItem("lsid", lsid)
            }
            return lsid
        } catch (_error) {
            err = _error;
            return "NA"
        }
    },
    getCookieID: function() {
        var err, id;
        if (!canTrack()) {
            return "DNT"
        }
        try {
            id = getCookie("cid") || generateID();
            setCookie("cid", id, {
                expires: 360 * 20,
                domain: ".stripe.com"
            });
            return id
        } catch (_error) {
            err = _error;
            return "NA"
        }
    }

};


            