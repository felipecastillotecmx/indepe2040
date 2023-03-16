let express = require('express');
let router = express.Router();
let adminsController = require('../controllers/admin.controller');
require("dotenv").config();

router.get(process.env.API_URL + process.env.ADMINS_URL , adminsController.admin_get_all);
router.get(process.env.API_URL + process.env.ADMINS_URL + '/:id', adminsController.admin_get_by_id);
router.post(process.env.API_URL + process.env.ADMINS_URL + '/', adminsController.admin_create_schema, adminsController.admin_create);
router.put(process.env.API_URL + process.env.ADMINS_URL + '/:id', adminsController.admin_update_squema, adminsController.admin_update);
router.delete(process.env.API_URL + process.env.ADMINS_URL + '/:id', adminsController.admin_delete);

module.exports = router;
