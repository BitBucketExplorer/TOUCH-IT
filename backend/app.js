const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')


// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))



//Api versioning 
const ver1 = '/api/v1'
//Import all routes
const products = require('./routes/product');
const user = require('./routes/auth');

app.use(ver1, products);
app.use(ver1, user);

//Middleware to handle error
app.use(errorMiddleware);
app.use(cookieParser);
module.exports = app;