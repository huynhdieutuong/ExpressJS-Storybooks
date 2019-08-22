module.exports.google = (req, res) => {
  res.redirect('/dashboard');
};

module.exports.verify = (req, res) => {
  if(req.user) {
    console.log(req.user);
  } else {
    console.log('Not Auth');
  }
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};