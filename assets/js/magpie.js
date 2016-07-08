
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
var iframe = document.createElement('iframe');
var options;

var Magpie = Magpie || {

  configure: function(options) {
    this.options = options;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.seamless = true;
    iframe.frameBorder = 0;
    iframe.setAttribute("id", "magpie-checkout-app");
    iframe.setAttribute("style", "position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;");
    iframe.setAttribute("name", Date.now());
    iframe.setAttribute("src","http://localhost:1337/checkout.html");
    document.body.appendChild(iframe);
    eventer(messageEvent,function(e) {
      var key = e.message ? "message" : "data";
      var data = e[key];
      options.token(data);
    }, false);
  },

  open: function(options) {
    var obj = this.concat(this.options, options);
    iframe.onload = function() {
      iframe.contentWindow.postMessage(JSON.stringify(obj), "*");
    }
  },

  close: function() {
    $(".stripeInFrame .overlayView").removeClass("active");
    $(".stripeInFrame .overlayView").addClass("unactive");
  },

  concat: function(o1, o2) {
    for (var key in o2) {
      o1[key] = o2[key];
   }
   return o1;
  }

};

