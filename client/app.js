<<<<<<< HEAD
angular.module('app', ['ui.router','allprojects'])
=======
angular.module('app', [
  'ui.router'
])
>>>>>>> Built auth factory and nav controller. Still buggy.

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider
  .state('app', {
    url: '/main',
    views: {
      'app.nav': {
        templateUrl: './app/main/nav-partial.html',
        controller:'navController'
      },
      '': {
        templateUrl: './app/content.html'
      }
    }
  })

  .state('app.allprojects', {
    templateUrl: './app/main/allprojects-partial.html',
    controller: 'AllProjectsController'
  })
  
  .state('app.login', {
    templateUrl: './app/main/login-partial.html'
  })

  .state('app.dashboard', {
    templateUrl: './app/main/dashboard-partial.html'
  })
});