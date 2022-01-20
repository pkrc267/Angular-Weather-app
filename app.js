// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


// CONFIGURATIONS

/**
 * Routing configs for the app
 * @function _ anonymouse function with route definitions
 */
weatherApp.config( function ($routeProvider) {

    $routeProvider
    .when('/',{
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    .when('/forecast',{
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    });
});


/**
 * Angularjs safetynet bypass - whitelisting openweathermap api
 */
weatherApp.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://api.openweathermap.org/**'
    ]);
}]);

// SERVICES

/**
 * @description Named service object that defines city variable.
 */
weatherApp.service('cityService', function(){
    this.city = 'Delhi';
})


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
 * @param cityService {service} our named service that gives access to city data
 */
weatherApp.controller('forecastController', ['$scope', '$resource', '$log', 'cityService', function($scope, $resource, $log, cityService){
    var forecastDays = 7;
    $scope.city = cityService.city;

    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=***REMOVED***', {get: {method: "JSONP"}});

    // this api accepts city name in 'q' and number of forecast days requested in 'cnt'
    $scope.weatherResult = $scope.weatherAPI.get({
        q : $scope.city,
        cnt: forecastDays
    });

    $log.info($scope.weatherResult);

    /**
     * TODO:
     * - wait for API activation. We will see result logged in the console.
     * - parse json
     * - render on forecast page
     */
}]);