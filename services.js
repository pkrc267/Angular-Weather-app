// SERVICES

/**
 * @description Named service object that defines city variable.
 */
 weatherApp.service('cityService', function(){
    this.city = 'Delhi';
})

weatherApp.service('weatherService', ['$resource', function($resource){

    this.getWeather = function(city, days){

        var requestedUrl = 'https://api.openweathermap.org/data/2.5/forecast?';

        var weatherAPI;
        weatherAPI = $resource(requestedUrl, {get: {method: "JSONP"}});

        // this api accepts api key, city name, number of entries to respond with, units (metric, imperial, standard)
        return weatherAPI.get({
            appid : appConfig.key,
            q : city,
            cnt: days,
            units: 'metric',
        });
    };
}])