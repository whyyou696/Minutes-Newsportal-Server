if (process.env.NODE_ENV !== "production")
//environtmet variables
require("dotenv").config()
//console.log(process.env)
const express = require('express');
const router = require('./routes');

const app = express()
// middlewares body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json()) // body-parser : JSON

app.use(router)

module.exports = app;
