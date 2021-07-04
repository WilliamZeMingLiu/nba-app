var express = require('express');
var router = express.Router();
const gamesController = require('../controllers/games-controller');

//GET today games
router.get('/live/today', gamesController.getLiveTodayGames);

//GET yesterday games
router.get('/live/yesterday', gamesController.getLiveYesterdayGames);

//GET tomorrow games
router.get('/live/tomorrow', gamesController.getLiveTomorrowGames);


module.exports = router;
