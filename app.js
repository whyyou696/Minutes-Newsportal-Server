//environtmet variables
require("dotenv").config()
//console.log(process.env)
const express = require('express');
const router = require('./routes');
const errorhandler = require("./middlewares/errorhandler");

const app = express()
// middlewares body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json()) // body-parser : JSON

app.use(router)
app.use(errorhandler)

module.exports = app;
