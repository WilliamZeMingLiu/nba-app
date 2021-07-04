var axios = require("axios").default;
const helper = require('../helper');

const apiKey = '1beaaf7b1baa4195bea89440d604b776';

const apiEnd = {
    todayNews: '/scores/json/News',
}

var options = {
    method: 'GET',
    baseURL: 'https://fly.sportsdata.io/v3/nba',
    url: null,
    params: {
        key: apiKey
    }
};

const mediaController = {
    getNewsToday(req, res, next) {
        const newsArr = [];
        options['url'] = apiEnd.todayNews
        axios.request(options).then(function (response) {
            response.data.map(article => {
                newsArr.push(article);
            })
            res.json(newsArr);

        }).catch(function (error) {
            console.error(error);
        });
    },
    getSocialMedia(req, res, next) {
        const twitterAccts = ['NBA', 'NBATV', 'BleacherReport', 'ESPNNBA', 'NBAonTNT', 'wojespn', 'ShamsCharania', 'WindhorstESPN'];
        const youtubeAccts = [
          {id: 'NBA', name: 'NBA'},
          {id: 'TheNBAonESPN', name: 'ESPN'},
          {id: 'BleacherReport', name: 'Bleacher Report'},
          {id: 'Smoove7182954', name: 'Chris Smoove'},
        ];
        const obj = {
            twitter: twitterAccts,
            youtube: youtubeAccts,
        }
        res.json(obj);
    },
};

module.exports = mediaController;