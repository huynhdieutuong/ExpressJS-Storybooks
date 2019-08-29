const express = require('express');
const router = express.Router();

const { index, add, postAdd } = require('../controllers/stories.controller');
const { ensureAuthenticated } = require('../helpers/auth');

router.get('/', index);

router.get('/add', ensureAuthenticated, add);
router.post('/add', ensureAuthenticated, postAdd);

module.exports = router;