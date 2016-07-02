
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";


var Magpie = Magpie || {

  loadFrameView: function loadFrameView() {

    var iframe = document.createElement('iframe');

    iframe.width = "100%";
    iframe.height = "100%";
    iframe.seamless = true;
    iframe.frameBorder = 0;

    // change checkout page url
    iframe.setAttribute("src","http://localhost:1337/checkout.html");
    iframe.setAttribute("name", Date.now());
    iframe.setAttribute("id", "magpie-checkout-app");

    document.getElementById('checkout-view').appendChild(iframe);
    
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

  closeFrameView: function closeFrameView() {
    console.log("-----remove1");
    $("#magpie-checkout-app").remove();

    var iframe = document.getElementById("magpie-checkout-app");
    iframe.contentWindow.document.close();

    // var fram = $("#magpie-checkout-app").get(0);
    // fram.parentNode.removeChild(fram);

   //$("#magpie-checkout-app").contentWindow.document.close();
    // frame.parentElement.removeChild(frame);

  //   var fram = $("iframe").get(0);
  // fram.parentNode.removeChild(fram);
  },


  /*
  , moreFunction: function moreFunction(vars...) { ... }

  add more initialization or convenience methods here
  */
};

