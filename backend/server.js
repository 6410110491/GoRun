const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const createError = require('http-errors');

const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Database
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

// Routes
app.use('/api', require('./routes/register'));
app.use('/api', require('./routes/login'));
app.use('/api', require('./routes/event'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/images_upload'));
app.use('/api', require('./routes/EventRegistration'));
app.use('/api', require('./routes/news'));
app.use('/api', require('./routes/VerifyOrganized'));

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
