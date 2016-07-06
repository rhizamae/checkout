var appType;
appType = {};
appType.types = ["desktop"];
appType.setTypes = function(types) {
    return appType.types = types
};
appType.isDesktop = function() {
    return appType.types.indexOf("desktop") !== -1
};
appType.isTablet = function() {
    return appType.types.indexOf("tablet") !== -1
};
appType.isMobile = function() {
    return appType.types.indexOf("mobile") !== -1
};
appType.isiOSNative = function() {
    return appType.types.indexOf("iOSNative") !== -1
};
appType.toString = function() {
    return appType.types.join(",")
};