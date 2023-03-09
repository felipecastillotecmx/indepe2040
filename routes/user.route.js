let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user.controller');
require("dotenv").config()

router.get(process.env.API_URL + process.env.USERS_URL , usersController.user_get_all);
router.get(process.env.API_URL + process.env.USERS_URL + '/:id', usersController.user_get_by_id);
router.post(process.env.API_URL + process.env.USERS_URL + '/', usersController.user_create_schema, usersController.user_create);
router.put(process.env.API_URL + process.env.USERS_URL + '/:id', usersController.user_update_squema, usersController.user_update);
router.delete(process.env.API_URL + process.env.USERS_URL + '/:id', usersController.user_delete);

module.exports = router;
