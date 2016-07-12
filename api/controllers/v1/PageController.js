var TAG = "[PageController]";
var MobileDetect = require('mobile-detect');

module.exports = {

  checkout: function(req, res) {
    var ACTION = "[checkout]";
    var md = new MobileDetect(req.headers['user-agent']);

    var response = {
      session: req.session.authenticated || "none",
      client: "none"
    };

    Session.findOne({ id: req.query.distinct_id }, function(err, data) {
      if (err) {
        Logger.log('error', TAG + ACTION, err);
      } else {
        response.client = data;
      }
      //console.log(response);
      if (md.mobile()) {
        response.body_class = "en appView iOS9 tab mobile";
        res.view('mobile', response);
      } else {
        response.body_class = "";
        res.view('index', response);
      }

    });    
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