const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');

//category endpoints
router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.postCategories);
router.put('/:id', CategoryController.updateCategoriesById);
router.delete('/:id', CategoryController.deleteCategoriesById);

module.exports = router