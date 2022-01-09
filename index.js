require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
const MovieRoute = require('./routes/movieRoute');
const bodyParser = require("body-parser");

mongoose.connect(process.env.URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database started'))


app.use(express.json());
app.use('/movieRoute', MovieRoute);
app.use('/user', authRoute);
app.listen(3000);