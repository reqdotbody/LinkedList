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


    // $http.get('auth/isLoggedIn').
    //   success(function(data, status, headers, config) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     console.log("authfactory data:");
    //     console.log(data);
    //     return data;
    //   }).
    //   error(function(data, status, headers, config) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     console.log('error');
    //     console.log(data);
    //     return data;
    //   });