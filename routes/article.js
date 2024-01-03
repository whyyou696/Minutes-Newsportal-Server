const router = require('express').Router();
const ArticleController = require('../controllers/ArticleController');

//article endpoints
router.get('/', ArticleController.getArticles);
router.post('/', ArticleController.postArticles);
router.delete('/:id', ArticleController.deleteArticlesById);
router.get('/:id', ArticleController.getArticleById);
router.put('/:id', ArticleController.updateArticleById);

module.exports = router