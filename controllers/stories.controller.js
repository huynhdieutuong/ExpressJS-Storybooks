const Story = require('../models/Story');

module.exports.index = async (req, res) => {
  const stories = await Story.find({ status: 'public' }).populate('user');
  res.render('stories/index', { stories });
};

// Add Story
module.exports.add = (req, res) => {
  res.render('stories/add');
};
module.exports.postAdd = async(req, res) => {
  const { title, status, allowComments, body } = req.body;
  const newStory = {
    title,
    status,
    allowComments: allowComments ? true : false,
    body,
    user: req.user.id,
  };
  await Story.create(newStory);
  res.redirect('/stories');
};