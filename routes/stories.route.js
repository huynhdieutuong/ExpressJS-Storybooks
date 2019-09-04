const express = require('express');
const router = express.Router();

const { index, add, postAdd, edit, putEdit, show, deleteStory, comment, user, my, search, duplicate } = require('../controllers/stories.controller');
const { ensureAuthenticated } = require('../helpers/auth');

router.get('/', index);

router.get('/add', ensureAuthenticated, add);
router.post('/add', ensureAuthenticated, postAdd);

router.get('/edit/:id', ensureAuthenticated, edit);
router.put('/edit/:id', ensureAuthenticated, putEdit);

router.get('/show/:id', show);

router.delete('/delete/:id', ensureAuthenticated, deleteStory);

router.post('/comment/:id', ensureAuthenticated, comment);

router.get('/user/:userId', user);

router.get('/my', ensureAuthenticated, my);

router.get('/search', search);

router.post('/duplicate/:id', ensureAuthenticated, duplicate);

module.exports = router;