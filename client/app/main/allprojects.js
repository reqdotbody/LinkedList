// this will be nested in the index.js view, it will show all open projects (last 24 hours)
angular.module('allprojects', [])

.controller('AllProjectsController', function($scope, $http, $window, $location, $stateParams, $rootScope){
  
  $scope.results = [
  {
    user:"Edwin",
    prompts:"To-Do APP",
    framework:"Angular",
    time:"2 days",
    img:'https://avatars3.githubusercontent.com/u/6374974?v=3&s=460'
  },
  {
    user:"Edwin",
    prompts:"Twitter client",
    framework:"Mithril",
    time:"1 Week",
    img:'https://avatars1.githubusercontent.com/u/11216691?v=3&s=460'
  }
  ];

  $scope.choices = ['todo','Twitter']

  $scope.getResults = function(){
    // Simple GET request
    console.log('api/v1/' + 'CHANGE TO API ENDPOINT');
    $http.get('api/v1/' + 'CHANGE TO API ENDPOINT').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.results = data;
        console.log($scope.results);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error');
        console.log(data);
      });
  }

  $scope.getResults();
});