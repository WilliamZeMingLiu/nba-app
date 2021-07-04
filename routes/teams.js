var express = require('express');
var router = express.Router();
const teamsController = require('../controllers/teams-controller');

//GET basic info of teams 
router.get('/info', teamsController.getTeamsInfo);

//GET stats of teams
router.get('/stats/:seasontype', teamsController.getTeamsStats);

//GET standings
router.get('/standings/:seasontype', teamsController.getTeamsStandings);

module.exports = router;
