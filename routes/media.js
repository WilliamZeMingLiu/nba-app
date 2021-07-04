var express = require('express');
var router = express.Router();
const mediaController = require('../controllers/media-controller');

//GET news articles for today
router.get('/news', mediaController.getNewsToday);

//GET social media links (YouTube, Twitter)
router.get('/social', mediaController.getSocialMedia);


module.exports = router;
