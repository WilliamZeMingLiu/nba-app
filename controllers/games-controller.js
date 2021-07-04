var axios = require("axios").default;
const helper = require('../helper');

const apiKey = '1beaaf7b1baa4195bea89440d604b776';

const apiEnd = {
    liveGamesUrl: '/scores/json/GamesByDate',
}

var options = {
    method: 'GET',
    baseURL: 'https://fly.sportsdata.io/v3/nba',
    url: null,
    params: {
        key: apiKey
    }
};

const gamesController = {
    getLiveYesterdayGames(req, res, next) {
        const gamesArr = [];
        options['url'] = apiEnd.liveGamesUrl + '/' + helper.getYesterdayDate();
        axios.request(options).then(function (response) {
            response.data.map(game => {
                gamesArr.push(game);
            })
            res.json(gamesArr);

        }).catch(function (error) {
            console.error(error);
        });
    }, 
    getLiveTodayGames(req, res, next) {
        const gamesArr = [];
        options['url'] = apiEnd.liveGamesUrl + '/' + helper.getTodayDate();
        axios.request(options).then(function (response) {
            response.data.map(game => {
                gamesArr.push(game);
            })
            res.json(gamesArr);

        }).catch(function (error) {
            console.error(error);
        });
    }, 
    getLiveTomorrowGames(req, res, next) {
        const gamesArr = [];
        options['url'] = apiEnd.liveGamesUrl + '/' + helper.getTomorrowDate();
        axios.request(options).then(function (response) {
            response.data.map(game => {
                gamesArr.push(game);
            })
            res.json(gamesArr);

        }).catch(function (error) {
            console.error(error);
        });
    }, 
};

module.exports = gamesController;