const router = require('express').Router();
const ArticleController = require('../controllers/ArticleController');
const { authorizationArticle } = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const multer = require('multer');
const storage = multer.memoryStorage()
const errorhandler = require("../middlewares/errorhandler");
const upload = multer({ storage: storage })

//article endpoints
// router.use(authentication)
router.get('/', ArticleController.getArticles);
router.post('/', ArticleController.postArticles);
router.delete('/:id', authorizationArticle, ArticleController.deleteArticlesById);
router.get('/:id', ArticleController.getArticleById);
router.put('/:id', authorizationArticle, ArticleController.updateArticleById);
router.patch('/:id/imgurl',authorizationArticle, upload.single('imgUrl'), ArticleController.articleUploadImage)

router.use(errorhandler)

module.exports = router