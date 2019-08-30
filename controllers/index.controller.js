const Story = require('../models/Story');

module.exports.index = (req, res) => {
  res.render('index/welcome');
};

module.exports.dashboard = async (req, res) => {
  const stories = await Story.find();
  res.render('index/dashboard', { stories });
};

module.exports.about = (req, res) => {
  res.render('index/about');
};