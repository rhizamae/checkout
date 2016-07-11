var session, request_reference_num, email, msisdn, client, card, cardPaymentViewIntance;
// var vault = Checkout.getToken;
// var remember = Checkout.remember;
//var md = new MobileDetect(window.navigator.userAgent);
var options = {};
var init;
var tab_id = sessionStorage.tabID ? sessionStorage.tabID : sessionStorage.tabID = Math.random();
tab_id = ("" + tab_id).split(".")[1]; 

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";