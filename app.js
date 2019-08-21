require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');

const app = express();

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

// Load Routes
const authRoute = require('./routes/auth.route');

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(res => console.log('MongoDB Connected!'));

// Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  console.log(res.locals.user);  
  next();
})

// Use Routes
app.get('/', (req, res) => res.render('home', {name: 'Tuong'}));
app.use('/auth', authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));