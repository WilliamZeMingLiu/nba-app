const helper = {
    getTodayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        //console.log(yyyy + '-' + mm + '-' + dd);
        return yyyy + '-' + mm + '-' + dd;
    }, 
    getTomorrowDate() {
        var today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        //console.log(yyyy + '-' + mm + '-' + dd);
        return yyyy + '-' + mm + '-' + dd;
    }, 
    getYesterdayDate() {
        var today = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        //console.log(yyyy + '-' + mm + '-' + dd);
        return yyyy + '-' + mm + '-' + dd;
    }, 
};

module.exports = helper;


