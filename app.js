const express = require('express');
const HelloController = require('./controllers/HelloController');
const ArticleController = require('./controllers/ArticleController');

const app = express()
const Port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json()) // body-parser : JSON

//endpoint
app.get('/', HelloController.getHello);

//article endpoints
app.get('/articles', ArticleController.getArticles);
app.post('/articles', ArticleController.postArticles);

app.listen(Port, () => {
    console.log(`Listening on port ${Port}`)
})