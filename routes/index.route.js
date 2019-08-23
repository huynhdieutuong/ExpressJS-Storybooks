const express = require('express');
const router = express.Router();

const { index, dashboard, about } = require('../controllers/index.controller');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/', ensureGuest, index);

router.get('/dashboard', ensureAuthenticated, dashboard);

router.get('/about', about);

module.exports = router;