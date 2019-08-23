const express = require('express');
const router = express.Router();

const { index, dashboard, about } = require('../controllers/index.controller');

router.get('/', index);

router.get('/dashboard', dashboard);

router.get('/about', about);

module.exports = router;