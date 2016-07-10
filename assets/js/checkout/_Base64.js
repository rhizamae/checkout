var utf8Encode = function(string) {
    string = (string + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = "",
        start, end;
    var stringl = 0,
        n;
    start = end = 0;
    stringl = string.length;
    for (n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
        if (c1 < 128) {
            end++
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128)
        } else {
            enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128)
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end)
            }
            utftext += enc;
            start = end = n + 1
        }
    }
    if (end > start) {
        utftext += string.substring(start, string.length)
    }
    return utftext
};
var base64 = {
    encode: function(data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = "",
            tmp_arr = [];
        if (!data) {
            return data
        }
        data = utf8Encode(data);
        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 63;
            h2 = bits >> 12 & 63;
            h3 = bits >> 6 & 63;
            h4 = bits & 63;
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
        } while (i < data.length);
        enc = tmp_arr.join("");
        switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + "==";
                break;
            case 2:
                enc = enc.slice(0, -1) + "=";
                break
        }
        return enc;
    }
}


