const express = require('express');
const router = express.Router();
const passport = require('passport');

const controllers = require('../controllers/auth.controller');

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), controllers.google);

module.exports = router;