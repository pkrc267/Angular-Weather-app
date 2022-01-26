// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


// CONFIGURATIONS

/**
 * Routing configs for the app
 * @function _ anonymous function with route definitions
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
    })
    .when('/forecast/:days',{
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
        'https://api.openweathermap.org/**'
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
 * @param $filter {service} filter service for manipulating various data types (here for date type manipulation)
 * @param $routeParams {service} used to collect url params
 * @param cityService {service} our named service that gives access to city data
 */
weatherApp.controller('forecastController', ['$scope', '$resource', '$log', '$filter', '$routeParams', 'cityService', function($scope, $resource, $log, $filter, $routeParams, cityService){

    var requestedUrl = 'https://api.openweathermap.org/data/2.5/forecast?';

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || 8;

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
        return $filter('date')( new Date(dt * 1000), 'hh a, MMM dd, yyyy');
    };

}]);