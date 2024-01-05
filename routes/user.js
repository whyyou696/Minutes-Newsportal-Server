const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { authorizationAdmin } = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication.js');
//user endpoints
router.post('/login', UserController.login);
router.use(authentication)

router.post('/add-user', authorizationAdmin, UserController.register);

module.exports = router;