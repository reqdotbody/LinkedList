angular.module('app')

.factory('Auth', function ($http){

  var isAuthenticated = function(){
    console.log("Inside Auth factory - isAuthenticated");
    //asks the server, "is the current user logged in?"
    //returns true or false (or error);
    return $http({
      method: 'GET',
      url: 'auth/isLoggedIn'
    })
    .success(function(resp){
      return resp;
    })
  }

  var logout = function(){
    console.log("Inside Auth factory - logout");
    //tells the server to log the user out
    return $http({
      method: 'GET',
      url: '/logout'
    })
    .success(function(resp){
      console.log("User has been logged out");
    })
  }

  return {
    isAuthenticated: isAuthenticated,
    logout: logout
  }

});
