const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');   
const { readdirSync } = require('fs');

const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

//Database
connectDB();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

//Routes
readdirSync('./routes').map((r) => 
app.use('/api', require(`./routes/${r}`)));

//Port
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})

// 404 Error
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})
