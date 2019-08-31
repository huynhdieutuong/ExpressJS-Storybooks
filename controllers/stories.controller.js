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
  res.redirect('/dashboard');
};

// Edit Story
module.exports.edit = async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.render('stories/edit', { story });
};
module.exports.putEdit = async(req, res) => {
  const { title, status, allowComments, body } = req.body;
  const newStory = {
    title,
    status,
    allowComments: allowComments ? true : false,
    body
  };
  await Story.findByIdAndUpdate(req.params.id, newStory);
  res.redirect('/dashboard');
};

// Show Story
module.exports.show = async (req, res) => {
  const story = await Story.findById(req.params.id)
                            .populate('user')
                            .populate('comments.commentUser');
  res.render('stories/show', { story });
};

// Delete Story
module.exports.deleteStory = async (req, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.redirect('/dashboard');
};

// Add Comment
module.exports.comment = async (req, res) => {
  const newComment = {
    commentBody: req.body.commentBody,
    commentUser: req.user.id
  };
  const story = await Story.findById(req.params.id);
  story.comments.unshift(newComment);
  await story.save();
  res.redirect(`/stories/show/${req.params.id}`);
}