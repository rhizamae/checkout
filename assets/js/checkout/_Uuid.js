var S4 = function() {
  return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
};
var uuid = {
  generate: function() {
    var delim;
    delim = "-";
    return S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4()
  }
};