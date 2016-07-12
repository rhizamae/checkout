var TAG = "[SessionController]";

module.exports = {

  get: function(req, res) {
    res.ok({});
  },

  create: function(req, res) {
    var ACTION = "[create]";
    SessionHelper.save(req.body, function(err, data) {
      if (err) {
        Logger.log('error', TAG + ACTION, err);
      }
      res.ok(data);
    });
  },

  update: function(req, res) {
    var ACTION = "[update]";
    Session.update({id: req.body.distinct_id }, {tab_id: req.body.tab_id}, function(err, data) {
      if (err) {
        Logger.log('error', TAG + ACTION, err);
      }
      res.ok(data[0]);
    });
  },

  delete: function(req, res) {
    req.session.destroy();
    res.ok({message: "Sign out successful."});
  }

}