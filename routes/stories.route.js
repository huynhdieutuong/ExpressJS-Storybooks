const express = require('express');
const router = express.Router();

const { index, add } = require('../controllers/stories.controller');

router.get('/', index);

router.get('/add', add);

module.exports = router;