// CONTROLLERS

/**
 * Homepage controller
 * @param homeController controller object name
 * @param $scope {service} local scope model for homecontroller
 * @param cityService {service} our named service that gives access to city data
 */
 weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;

    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);

/**
 * Forecast page controller
 * @param forecastController controller object for forecast page
 * @param $scope {service} local scope model for forecastController
 * @param $resource {service} for calling api and fetching data
 * @param $log {service} logging service
 * @param $filter {service} filter service for manipulating various data types (here for date type manipulation)
 * @param $routeParams {service} used to collect url params
 * @param cityService {service} our named service that gives access to city data
 */
weatherApp.controller('forecastController', ['$scope', '$resource', '$log', '$filter', '$routeParams', 'cityService', function($scope, $resource, $log, $filter, $routeParams, cityService){

    var requestedUrl = 'https://api.openweathermap.org/data/2.5/forecast?';

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '8';

    $scope.weatherAPI = $resource(requestedUrl, {get: {method: "JSONP"}});

    // this api accepts api key, city name, number of entries to respond with, units (metric, imperial, standard)
    $scope.weatherResult = $scope.weatherAPI.get({
        appid : appConfig.key,
        q : $scope.city,
        cnt: $scope.days,
        units: 'metric',
    });

    // format date time
    $scope.convertToDate = function(dt) {
        // commented because we are passing the date format in template
        // return $filter('date')( new Date(dt * 1000), 'hh a, MMM dd, yyyy');
        return new Date(dt * 1000);
    };

    // format temperature. Not formatting because we are already receiving in °C 
    $scope.convertToCelcius = function(temp) {
        return temp;
    }

}]);
