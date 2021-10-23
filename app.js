require('dotenv').config();
require('./config/database').connect();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const authRouter = require('./routes/auth.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

app.use('/api/v1/auth', authRouter);
app.use('/', (_, res) => res.send('yah yah'));

module.exports = app;
