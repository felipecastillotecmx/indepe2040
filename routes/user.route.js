let express = require('express');
let router = express.Router();
require("dotenv").config();
let userController = require('../controllers/user.controller');
const authorize = require('../_middleware/authorize');

router.post(process.env.API_URL + process.env.USERS_URL + '/authenticate', userController.user_auth_schema, userController.user_auth);
router.post(process.env.API_URL + process.env.USERS_URL + '/register', userController.user_reg_schema, userController.user_reg);
router.get(process.env.API_URL + process.env.USERS_URL + '/', authorize(), userController.user_get);
router.get(process.env.API_URL + process.env.USERS_URL + '/current', authorize(), userController.user_get_current);
router.get(process.env.API_URL + process.env.USERS_URL + '/:id', authorize(), userController.user_get_by_id);
router.put(process.env.API_URL + process.env.USERS_URL + '/:id', authorize(), userController.user_update_schema, userController.user_update);
router.delete(process.env.API_URL + process.env.USERS_URL + '/:id', authorize(), userController.user_delete);

module.exports = router;
