angular.module('app')

.controller('navController', function($scope, Auth){
  
  console.log("In Nav Controller");

  $scope.test = "Yes it works"

  //Uses the Auth factory to check if the user is authenticated.
  //This 'isAuth' scope method can be placed in html elements using
  //ng-hide='isAuth()' or ng-show='isAuth()' to make certain elements visible only if
  //the user is or is not authenticated.  
  $scope.isAuth = function(){
    return Auth.isAuthenticated();
  }

})