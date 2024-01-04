//environtmet variables
if (process.env.NODE_ENV !== "production")
require("dotenv").config()
//console.log(process.env)
const express = require('express');
const router = require('./routes');
const errorhandler = require("./middlewares/errorhandler");

const app = express()
const Port = 3000
// middlewares body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json()) // body-parser : JSON

app.use(router)
app.use(errorhandler)

//app listener
app.listen(Port, () => {
    console.log(`Listening on port ${Port}`)
})

