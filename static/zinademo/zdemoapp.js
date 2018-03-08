// var app = angular.module('zinaDemo', []);
// app.controller('myCtrl', function($scope) {
//     $scope.firstName= "John";
//     $scope.lastName= "Doe";
// });

var app = angular.module('zinaDemo', ['ngRoute'])
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when("/scratchpo", {
    templateUrl : "di-scratchpo.html",
  })
  .when("/scratchpo-validations", {
    templateUrl : "va-scratchpo.html",
  })
  .when("/scratchpo-results", {
    templateUrl : "rs-scratchpo.html",
  });
  $locationProvider.html5Mode(true);
});