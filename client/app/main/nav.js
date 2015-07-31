angular.module('app')

.controller('navController', function($scope, Auth){
  
  $scope.loggedin = true; 
  //Uses the Auth factory to check if the user is authenticated.
  $scope.isAuth = function(){
    Auth.isAuthenticated().then(function(result){
      console.log("Is authenticated result:", result);
      $scope.loggedin = result.data;
    })
  }

  $scope.isAuth();

  $scope.logout = function(){
    Auth.logout();
  }


})