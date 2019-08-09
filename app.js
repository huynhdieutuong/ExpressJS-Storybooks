require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();

require('./config/passport');

// Load Routes
const authRoute = require('./routes/auth.route');

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(res => console.log('MongoDB Connected!'));

// Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home', {name: 'Tuong'}));

// Use Routes
app.use('/auth', authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));