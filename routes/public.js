const router = require('express').Router();
const PublicController = require('../controllers/PublicController');
                 
//public endpoints
router.get('/', PublicController.getPublics);
router.get('/:id', PublicController.getPublicById);

module.exports = router
