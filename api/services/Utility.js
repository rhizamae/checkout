var TAG = "[Utility]";
var uuid = require('node-uuid');
var libphonenumber = require('libphonenumber');

module.exports = {

  getRefNum: function() {
    return uuid.v4();
  },

  filterObject: function(object) {
    for (property in object) {
      if (object[property] === undefined || object[property] === null || ( (typeof object[property]) == 'object'
        && Object.keys(object[property]).length === 0) || ( (typeof object[property]) == 'string'
        && object[property].trim() == '') ) {
        delete object[property];
      }
    }
    return object;
  },

  formatToE164: function(string) {
    try {
      return libphonenumber.e164(string);
    } catch(e) {
      return null;
    }
  },

  formatMsisdn: function(string) {
    var msisdn = this.formatToE164(string) || this.formatToE164('+' + string) || this.formatToE164('+63' + string) || this.formatToE164('+63' + string.slice(1));
    return (msisdn != null ? msisdn.slice(1) : msisdn);
  },

  hasKeys: function(obj) {
    if (obj && typeof obj === 'object') {
      return Object.keys(obj).length > 0;
    }
    return false;
  },

  trimObject: function(obj) {
    var result = null;
    if(obj instanceof Array) {
      for(var i = 0; i < obj.length; i++) {
        result = this.trimObject(obj[i]);
      }
    } else {
      for(var prop in obj) {
        if (obj[prop] instanceof Object || obj[prop] instanceof Array) {
          result = this.trimObject(obj[prop]);
        } else {
          obj[prop] = !isNaN(obj[prop]) ? obj[prop] : obj[prop].trim();
        }
      }
    }
    return result;
  },

  getObject: function (array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        var obj = {
          obj: array[i],
          index: i
        };
        return obj
      }
    }
    return ({
      obj: {},
      index: -1
    });
  },

  generateCode: function() {
    var activationCode = new Array(sails.config.vcode.count);
    for (var i = 0; i < activationCode.length; i++) {
      activationCode[i] = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    }
    var generatedCode = activationCode.toString().replace( /,/g, "");
    return generatedCode;
  },

}
