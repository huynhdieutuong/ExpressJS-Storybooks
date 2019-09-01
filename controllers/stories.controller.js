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
  const story = await Story.findById(req.params.id).populate('user');
  if(req.user.id === story.user.id) {
    return res.render('stories/edit', { story });
  }
  res.redirect('/stories');
};
module.exports.putEdit = async(req, res) => {
  const { title, status, allowComments, body } = req.body;
  const newStory = {
    title,
    status,
    allowComments: allowComments ? true : false,
    body
  };
  const story = await Story.findById(req.params.id).populate('user');
  if(req.user.id === story.user.id) {
    await Story.findByIdAndUpdate(req.params.id, newStory);
    return res.redirect('/dashboard');
  }
  res.redirect('/stories');
};

// Show Story
module.exports.show = async (req, res) => {
  const story = await Story.findById(req.params.id)
                            .populate('user')
                            .populate('comments.commentUser');
  if(story.status === 'public') {
    return res.render('stories/show', { story });
  };
  if(req.user) {
    if(req.user.id === story.user.id) {
      return res.render('stories/show', { story });
    }
  }
  res.redirect('/stories');
};

// Delete Story
module.exports.deleteStory = async (req, res) => {
  const story = await Story.findById(req.params.id).populate('user');
  if(req.user.id === story.user.id) {
    await Story.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  };
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
};

// Show stories by user
module.exports.user = async (req, res) => {
  const stories = await Story.find({ user: req.params.userId, status: 'public' }).populate('user');
  res.render('stories/index', { stories });
};

// Show logged in user stories
module.exports.my = async (req, res) => {
  const stories = await Story.find({ user: req.user.id }).populate('user');
  res.render('stories/index', { stories });
};