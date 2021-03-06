// controllers that we'll need:
angular.module('dashboard', [])

.controller('DashboardController', function($scope, $http, $location, $stateParams, $rootScope) {

	$scope.projects = [];

	$scope.getUserProjects = function() {
	  console.log('api/v1/projects/user');
	  $http.get('api/v1/projects/user').
	    success(function(data, status, headers, config) {
	      $scope.projects = data;
	      console.log($scope.projects);
	    }).
	    error(function(data, status, headers, config) {
	    	console.log('error');
	    	console.log(data);
	    });
	}
	$scope.getUserProjects();

})

// should load all of a user's projects
// should load all framework prompts so that they can be accessed by the modal button (it should check which prompt is associated with that project)
// *bonus* (the other user's username links to the github messaging for that user? is this possible?)