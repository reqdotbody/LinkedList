angular.module('allprojects', [])

.controller('AllProjectsController', function($scope, $http, $window, $location, $stateParams, $rootScope, Auth){
  $scope.durations = ["2 days", "4 days", "1 week"]

  $scope.submit = function() {
    $http.post('api/v1/submit/project', {"prompt_id" : prompt.id, "framework_id" : framework.id, "duration" : duration}).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.getResults();
      }).
      error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
  }

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

  $scope.loggedin = false; 
  //Uses the Auth factory to check if the user is authenticated.
  $scope.isAuth = function(){
    Auth.isAuthenticated();
    $scope.loggedin = Auth.authStatus.isLoggedIn;
  }

  $scope.isAuth();
  $scope.getResults();
  $scope.getPrompts();
  $scope.getFrameworks();
});