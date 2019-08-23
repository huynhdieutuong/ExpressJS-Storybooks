module.exports.index = (req, res) => {
  res.render('index/welcome');
};

module.exports.dashboard = (req, res) => {
  res.render('index/dashboard');
};

module.exports.about = (req, res) => {
  res.render('index/about');
};