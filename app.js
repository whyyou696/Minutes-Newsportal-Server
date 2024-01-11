if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
//console.log(process.env)
const express = require('express');
const router = require('./routes');
const app = express()
const cors = require("cors") // require dulu cors nya
app.use(cors()) // tambahkan ini pada app kalian
// middlewares body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json()) // body-parser : JSON

app.use(router)

module.exports = app;
