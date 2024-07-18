const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { readdirSync } = require('fs');
const createError = require('http-errors'); // Add this line

const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Database
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// Routes
app.use('/api', require('./routes/register'));
app.use('/api', require('./routes/login'));

// Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// 404 Error
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
