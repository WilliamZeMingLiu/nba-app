var express = require('express');
var router = express.Router();
const playersController = require('../controllers/players-controller');


//GET basic info of active players
router.get('/basic', playersController.getBasicInfo);

//GET all player's stats by season type
router.get('/stats/:seasontype', playersController.getPlayerStats);

module.exports = router;