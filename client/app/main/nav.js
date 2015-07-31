angular.module('app')

.controller('navController', function($scope, Auth, $window) {
  
  $scope.loggedin = null; 
  //Uses the Auth factory to check if the user is authenticated.
  $scope.isAuth = function(){

    Auth.isAuthenticated().then(function(){
      $scope.loggedin = Auth.authStatus.isLoggedIn;
      console.log('$scope.loggedin: ', $scope.loggedin);
    });

  }

  $scope.isAuth();

  $scope.logout = function(){
    Auth.logout().then(function(){
      $scope.loggedin = false;
      console.log("$scope.loggedin:", $scope.loggedin);
      $window.location.href = '/'

    });
  }


})