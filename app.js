const express = require('express');
const HelloController = require('./controllers/HelloController');
const ArticleController = require('./controllers/ArticleController');
const UserController = require('./controllers/UserController');

const app = express()
const Port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json()) // body-parser : JSON

//hello endpoint
app.get('/', HelloController.getHello);

//user endpoints
app.post('/users/register', UserController.register);
app.post('/users/login', UserController.login);

//article endpoints
app.get('/articles', ArticleController.getArticles);
app.post('/articles', ArticleController.postArticles);
app.delete('/articles/:id', ArticleController.deleteArticlesById);
app.get('/articles/:id', ArticleController.getArticleById);
app.put('/articles/:id', ArticleController.updateArticleById);

//category endpoints

app.listen(Port, () => {
    console.log(`Listening on port ${Port}`)
})