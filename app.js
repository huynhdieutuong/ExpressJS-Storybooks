require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(res => console.log('MongoDB Connected!'));

// Set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

// Static folder
app.use(express.static('public'));

// Load Routes
const indexRoute = require('./routes/index.route');
const authRoute = require('./routes/auth.route');
const storiesRoute = require('./routes/stories.route');

// Use Routes
app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/stories', storiesRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));