var axios = require("axios").default;
const helper = require('../helper');

const apiKey = '1beaaf7b1baa4195bea89440d604b776';

const apiEnd = {
    basicInfo: '/scores/json/Players',
    playerStats: '/stats/json/PlayerSeasonStats',
}

var options = {
    method: 'GET',
    baseURL: 'https://fly.sportsdata.io/v3/nba',
    url: null,
    params: {
        key: apiKey
    }
};

const playersController = {
    getBasicInfo(req, res, next) {
        const arr = [];
        options['url'] = apiEnd.basicInfo;
        axios.request(options).then(function(response) {
            response.data.map(player => {
                arr.push(player);
            })
            res.json(arr);

        }).catch(function (error) {
            console.error(error);
        });
    },
    getPlayerStats(req, res, next) {
        const arr = [];
        options['url'] = apiEnd.playerStats + '/' + req.params.seasontype;
        axios.request(options).then(function(response) {
            response.data.map(player => {
                arr.push(player);
            })
            res.json(arr);

        }).catch(function (error) {
            console.error(error);
        });
    },
};

module.exports = playersController;
