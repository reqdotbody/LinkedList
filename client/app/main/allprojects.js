angular.module('allprojects', [])

.controller('AllProjectsController', function($scope, $http, $window, $location, $stateParams, $rootScope){
  $scope.durations = ["2 days", "4 days", "1 week"]

  $scope.getResults = function(){
    $http.get('api/v1/projects/all/current').
      success(function(data, status, headers, config) {
        $scope.results = data;
        console.log($scope.results);
      }).
      error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
  }

  $scope.getPrompts = function(){
    $http.get('api/v1/prompts').
      success(function(data, status, headers, config) {
        $scope.prompts = data;
        console.log($scope.prompts)
      }).
      error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
  }

  $scope.getFrameworks = function(){
    $http.get('api/v1/frameworks').
      success(function(data, status, headers, config) {
        $scope.frameworks = data;
        console.log($scope.prompts)
      }).
      error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
  }
  $scope.getResults();
  $scope.getPrompts();
  $scope.getFrameworks();
});