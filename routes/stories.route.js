const express = require('express');
const router = express.Router();

const { index, add } = require('../controllers/stories.controller');
const { ensureAuthenticated } = require('../helpers/auth');

router.get('/', index);

router.get('/add', ensureAuthenticated, add);

module.exports = router;