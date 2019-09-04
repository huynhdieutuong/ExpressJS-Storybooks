const Story = require('../models/Story');

module.exports.index = async (req, res) => {
  const stories = await Story.find({ status: 'public' }).populate('user');

  // Pagination
  let page = parseInt(req.query.page) || 1;
  const perPage = 6;
  const maxPage = ((stories.length / perPage) > 3) ? Math.ceil(stories.length / perPage) : 3;

  if(page < 1) {
    page = 1;
  }
  if(page > maxPage) {
    page = maxPage;
  }

  let arrPage = [page - 1, page, page + 1];
  if(page === 1) {
    arrPage = [1, 2, 3];
  }
  if(page === maxPage) {
    arrPage = [page - 2, page - 1, page];
  }

  const nextPage = (page === maxPage) ? page : page + 1;
  const prevPage = (page === 1) ? 1 : page - 1;

  const start = (page - 1) * perPage;
  const end = page * perPage;

  res.render('stories/index', { 
    stories: stories.slice(start, end),
    pagination: true,
    page,
    maxPage,
    arrPage,
    prevPage,
    nextPage 
  });
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
  res.render('stories/index', { stories, pagination: false });
};

// Show logged in user stories
module.exports.my = async (req, res) => {
  const stories = await Story.find({ user: req.user.id }).populate('user');
  res.render('stories/index', { stories, pagination: false });
};

// Search Stories
module.exports.search = async (req, res) => {
  const stories = await Story.find({ status: 'public' }).populate('user');
  const filtered = stories.filter(story => story.title.toLowerCase().indexOf(req.query.q.toLowerCase()) !== -1);
  res.render('stories/index', { stories: filtered, pagination: false });
};

// Duplicate Story
module.exports.duplicate = async (req, res) => {
  const { title, status, allowComments, body, user } = await Story.findById(req.params.id).populate('user');
  if(user.id === req.user.id) {
    await Story.create({
      title,
      status,
      allowComments,
      body,
      user
    });
    res.redirect('/dashboard');
  };
};