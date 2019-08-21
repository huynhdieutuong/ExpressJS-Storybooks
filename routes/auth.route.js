const express = require('express');
const router = express.Router();
const passport = require('passport');

const { google, verify, logout } = require('../controllers/auth.controller');

router.get('/google', 
  passport.authenticate('google', {scope: ['profile']}));

router.get('/google/callback', 
  passport.authenticate('google', {failureRedirect: '/'}), 
  google);

router.get('/verify', verify);

router.get('/logout', logout);

module.exports = router;