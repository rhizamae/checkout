
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
var iframe;

var Magpie = Magpie || {

  loadFrameView: function() {

    iframe = document.createElement('iframe');

    iframe.width = "100%";
    iframe.height = "100%";
    iframe.seamless = true;
    iframe.frameBorder = 0;

    // change checkout page url
    iframe.setAttribute("src","http://localhost:1337/checkout.html");
    iframe.setAttribute("name", Date.now());
    iframe.setAttribute("id", "magpie-checkout-app");
    iframe.setAttribute("style", "position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;");

    //document.getElementById('checkout-view').appendChild(iframe);
    //$("body").append(iframe);
    document.body.appendChild(iframe);

    iframe.onload = function() {
      iframe.contentWindow.postMessage(JSON.stringify(Magpie.billing), "*");
    }

    eventer(messageEvent,function(e) {
      var key = e.message ? "message" : "data";
      var data = e[key];

      // message from iframe is for getToken function only 
      Magpie.config.getTokenCallback(data);

    }, false);

  },

  closeFrameView: function() {
    $(".stripeInFrame .overlayView").removeClass("active");
    $(".stripeInFrame .overlayView").addClass("unactive");
  },


  /*
  , moreFunction: function moreFunction(vars...) { ... }

  add more initialization or convenience methods here
  */
};

