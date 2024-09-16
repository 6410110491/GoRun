const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const createError = require('http-errors');
const MongoDBStore = require('connect-mongodb-session')(session);

const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Database
connectDB();

const store = new MongoDBStore({
    uri: process.env.DATABASE, // Update with your MongoDB URI
    collection: 'sessions'
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors({
    origin: 'http://localhost:3000', // Update this with your frontend's URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: false, // Set to `true` if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // Session expires in 24 hours 
    }
}));

// Routes
app.use('/api', require('./routes/register'));
app.use('/api', require('./routes/login'));
app.use('/api', require('./routes/event'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/images_upload'));
app.use('/api', require('./routes/EventRegistration'));

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
