var axios = require("axios").default;
const helper = require('../helper');

const apiKey = '1beaaf7b1baa4195bea89440d604b776';

const apiEnd = {
    teamsInfo: '/scores/json/teams',
    teamsStats: '/scores/json/TeamSeasonStats',
    standings: '/scores/json/Standings',
}

var options = {
    method: 'GET',
    baseURL: 'https://fly.sportsdata.io/v3/nba',
    url: null,
    params: {
        key: apiKey
    }
};

const teamsController = {
    getTeamsInfo(req, res, next) {
        const teamsArr = [];
        options['url'] = apiEnd.teamsInfo;
        axios.request(options).then(function(response) {
            response.data.map(team => {
                teamsArr.push(team);
            })
            res.json(teamsArr);

        }).catch(function (error) {
            console.error(error);
        });
    },
    getTeamsStats(req, res, next) {
        const teamsArr = [];
        options['url'] = apiEnd.teamsStats + '/' + req.params.seasontype;
        axios.request(options).then(function(response) {
            response.data.map(team => {
                teamsArr.push(team);
            })
            res.json(teamsArr);

        }).catch(function (error) {
            console.error(error);
        });
    },
    getTeamsStandings(req, res, next) {
        const obj = [];
        options['url'] = apiEnd.standings + '/' + req.params.seasontype;;
        axios.request(options).then(function(response) {
            res.json(response.data);

        }).catch(function (error) {
            console.error(error);
        });
    },
};

module.exports = teamsController;