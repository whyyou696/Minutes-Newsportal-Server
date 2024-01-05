const router = require('express').Router();
const userRouter = require('./user.js');
const articleRouter = require('./article.js');
const categoryRouter = require('./category.js');
const publicRouter = require('./public.js');

const HelloController = require('../controllers/HelloController');
const errorhandler = require('../middlewares/errorhandler.js');
//hello endpoint
router.get('/', HelloController.getHello);

//router
router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('/categories', categoryRouter);
router.use('/publics', publicRouter);

router.use(errorhandler)

module.exports = router