var TAG = "[PageController]";
var MobileDetect = require('mobile-detect');

module.exports = {

  checkout: function(req, res) {
    var ACTION = "[checkout]";
    var md = new MobileDetect(req.headers['user-agent']);
    var obj = {
      session: req.session.authenticated,
      client: req.session[req.query.distinct_id]
    };
    console.log("checkout------------");
    console.log(obj);
    if (md.mobile()) {
      obj.body_class = "en appView iOS9 tab mobile";
      res.view('mobile', obj);
    } else {
      obj.body_class = "";
      res.view('index', obj);
    }
  },

  mobile: function(req, res) {
    var ACTION = "[mobile]";
    
    var md = new MobileDetect(req.headers['user-agent']);
  

    var obj = {
      session: req.session.authenticated
    };
    if (md.mobile()) {
      obj.body_class = "en appView iOS9 tab mobile";
      res.view('mobile', obj);
    } else {
      obj.body_class = "";
      res.view('index', obj);
    }
    
  }

}