// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Connect MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
//   .then(res => console.log('MongoDB Connected!'));

const app = express();

app.get('/', (req, res) => res.send('Hello'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));