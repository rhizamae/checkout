var TAG = "[SessionController]";

module.exports = {

  delete: function(req, res) {
    req.session.destroy();
    res.ok({message: "Sign out successful."});
  }

}