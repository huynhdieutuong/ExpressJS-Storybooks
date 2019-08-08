require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(res => console.log('MongoDB Connected!'));

// Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home', {name: 'Tuong'}));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));