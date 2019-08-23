module.exports.ensureAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};

module.exports.ensureGuest = (req, res, next) => {
  if(req.isAuthenticated()) {
    return res.redirect('/dashboard');
  } else {
    next();
  }
};