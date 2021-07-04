var axios = require("axios").default;
const helper = require('../helper');

const apiKey = '1beaaf7b1baa4195bea89440d604b776';

const apiEnd = {
    currSeason: '/scores/json/CurrentSeason',
}

var options = {
    method: 'GET',
    baseURL: 'https://fly.sportsdata.io/v3/nba',
    url: null,
    params: {
        key: apiKey
    }
};

const basicController = {
    getCurrSeason(req, res, next) {
        const teamsArr = [];
        options['url'] = apiEnd.currSeason;
        axios.request(options).then(function(response) {
            res.json(response.data);

        }).catch(function (error) {
            console.error(error);
        });
    },
};

module.exports = basicController;