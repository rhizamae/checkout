var TAG = "[PageController]";

module.exports = {

  checkout: function(req, res) {
    var ACTION = "[checkout]";
    console.log(req.session.authenticated);
    res.view('index', {session: req.session.authenticated});
  }

}