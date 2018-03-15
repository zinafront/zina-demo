(function(){
  var app = angular.module('zinaDemo', ['ngRoute']);
  app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
   $routeProvider
    .when('/guide/import-spo', {
      templateUrl: 'guide/di-scratchpo.html'
    })
    .when('/guide/validate-spo', {
      templateUrl: 'guide/va-scratchpo.html'
    })
    .when('/guide/results-spo', {
      templateUrl: 'guide/rs-scratchpo.html'
    })
    .otherwise({
      templateUrl: 'guide/di-scratchpo.html'
    });
    $locationProvider.hashPrefix('');
  }]);
})();