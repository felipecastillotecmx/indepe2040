let express = require('express');
let router = express.Router();
let testController = require('../controllers/test');
require("dotenv").config()

router.get(process.env.API_URL + process.env.TEST_URL , testController.test_get);

module.exports = router;
