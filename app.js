require('dotenv').config();
require('./config/database').connect();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const app = express();

app.use(cors());
app.use(morgan('common'));

app.use('/', (_, res) => res.send('yah yah'));

module.exports = app;
