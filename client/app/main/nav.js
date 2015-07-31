angular.module('app')

.controller('navController', function($scope, Auth){
  
  $scope.loggedin = true; 
  //Uses the Auth factory to check if the user is authenticated.
  //This 'isAuth' scope method can be placed in html elements using
  //ng-hide='isAuth()' or ng-show='isAuth()' to make certain elements visible only if
  //the user is or is not authenticated.  
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