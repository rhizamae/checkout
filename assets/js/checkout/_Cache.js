var cache;
cache = {};
cache.fn = function(func) {
    var cachedMethod, data;
    data = {};
    cachedMethod = function() {
        var k, key, result, _i, _len;
        key = "";
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            k = arguments[_i];
            key += k.toString() + ","
        }
        result = data[key];
        if (!result) {
            data[key] = result = func.apply(this, arguments)
        }
        return result;
    };
    return cachedMethod;
};