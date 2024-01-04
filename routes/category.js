const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const authentication = require('../middlewares/authentication');
const { authorizationCategory } = require('../middlewares/authorization');
//category endpoints
router.use(authentication)
router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.postCategories);
router.put('/:id', authorizationCategory,CategoryController.updateCategoriesById);
router.delete('/:id', authorizationCategory, CategoryController.deleteCategoriesById);

module.exports = router