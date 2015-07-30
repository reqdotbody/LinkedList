angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider
  .state('app', {
    url: '/main',
    views: {
      'app.nav': {
        templateUrl: './app/main/nav-partial.html',
      },
      '': {
        templateUrl: './app/content.html'
      }
    }
  })

  .state('app.newproject', {
    templateUrl: './app/main/newproject-partial.html'
  })

  .state('app.allprojects', {
    templateUrl: './app/main/allprojects-partial.html'
  })

  .state('app.signup', {
    templateUrl: './app/main/signup-partial.html'
  })

  .state('app.login', {
    templateUrl: './app/main/login-partial.html'
  })

  .state('app.nav', {
    templateUrl: './app/main/nav-partial.html'
  })

  .state('app.dashboard', {
    templateUrl: './app/main/dashboard-partial.html'
  })

  .state('app.project', {
    templateUrl: './app/main/project-partial.html'
  })
});