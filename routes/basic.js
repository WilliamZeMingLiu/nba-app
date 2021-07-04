var express = require('express');
var router = express.Router();
const basicController = require('../controllers/basic-controller');

//GET basic info of teams 
router.get('/currseason', basicController.getCurrSeason);

module.exports = router;
