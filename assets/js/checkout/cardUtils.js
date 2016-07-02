var CARD_BRAND_TYPES, CARD_TYPES, cardUtils, __indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i
    }
    return -1
};
CARD_TYPES = ["amex", "diners", "discover", "jcb", "mastercard", "visa"];
CARD_BRAND_TYPES = {
    americanexpress: "amex",
    dinersclub: "diners"
};
cardUtils = {
    getCvcLength: function(type) {
        switch (cardUtils.extractCardType(type)) {
            case "amex":
                return 4;
            default:
                return 3
        }
    },
    extractCardType: function(formattedType) {
        var type;
        type = formattedType.toLowerCase().replace(/\ /g, "");
        if (CARD_BRAND_TYPES[type] != null) {
            type = CARD_BRAND_TYPES[type]
        }
        if (__indexOf.call(CARD_TYPES, type) >= 0) {
            return type
        } else {
            return null
        }
    }
};