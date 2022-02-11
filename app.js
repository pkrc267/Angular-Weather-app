// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


// CONFIGURATIONS

/**
 * Angularjs safetynet bypass - whitelisting openweathermap api
 */
weatherApp.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.openweathermap.org/**'
    ]);
}]);