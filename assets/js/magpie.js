
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
var iframe = document.createElement('iframe');
var options;
var iframeOnload;

var Magpie = Magpie || {

  configure: function(options) {
    this.options = options;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.seamless = true;
    iframe.frameBorder = 0;
    iframe.setAttribute("id", "magpie-checkout-app");
    iframe.setAttribute("style", "position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;display:none;");
    iframe.setAttribute("name", Date.now());
    iframe.setAttribute("src","http://localhost:1337/checkout.html");
    
    eventer(messageEvent,function(e) {
      var key = e.message ? "message" : "data";
      var data = e[key];
      if (data == "close_iframe") {
        $("iframe#magpie-checkout-app").css("display", "none");
      } else if (data == "open_iframe") {
        $("iframe#magpie-checkout-app").css("display", "block");
      } else {
        options.token(data);
      }
    }, false);
  },

  open: function(options) {
    var obj = this.concat(this.options, options);
    document.body.appendChild(iframe);
    if (iframeOnload) {
      iframe.contentWindow.postMessage(JSON.stringify(obj), "*");
    }
    iframe.onload = function() {
      iframeOnload = true;
      iframe.contentWindow.postMessage(JSON.stringify(obj), "*");
    }
    return;
  },

  close: function() { 
    $(".overlayView").hide();
    $(".stripeInFrame .overlayView").removeClass("active");
    $(".stripeInFrame .overlayView").addClass("unactive");
    window.parent.postMessage("close_iframe", "*");
  },

  concat: function(o1, o2) {
    for (var key in o2) {
      o1[key] = o2[key];
   }
   return o1;
  }

};

