const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, cb) => {
  const { id, name, photos, emails } = profile;
  const newUser = {
    googleID: id,
    email: emails[0].value,
    firstName: name.givenName,
    lastName: name.familyName,
    image: photos[0].value
  };
  const user = await User.findOne({ googleID: id });
  if(user) {
    cb(null, user);
  } else {
    const user = await User.create(newUser);
    cb(null, user);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});