angular.module('app')

.factory('Auth', function ($http){
  
  var authStatus = {
    isLoggedIn: false
  }

  var isAuthenticated = function(){
    console.log("Inside Auth factory - isAuthenticated");
    return $http.get('auth/isLoggedIn').then(function(results){
      //this turns the response from the server (a string)
      //into a boolean value and stores it in authStatus.isLoggedIn
      authStatus.isLoggedIn = (results.data === "true");
      
      //Console logs: 
      if(authStatus.isLoggedIn === true){
        console.log("User logged in");
        console.log(authStatus.isLoggedIn);
      }else{
        console.log("User NOT logged in");
        console.log(authStatus.isLoggedIn)
      }

    });
  }

  var logout = function(){
    console.log("Inside Auth factory - logout");
    return $http({
      method: 'GET',
      url: 'auth/logout'
    })
    .success(function(resp){
      console.log("User has been logged out");
      //
    })
  }

  return {
    isAuthenticated: isAuthenticated,
    authStatus: authStatus,
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