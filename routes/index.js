var express = require('express');
var router = express.Router();
var axios = require("axios").default;

var host = 'https://api-nba-v1.p.rapidapi.com';

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('../public/index.html');
});

module.exports = router;
