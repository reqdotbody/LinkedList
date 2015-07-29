angular.module('app', ['ui.router', 'app.newproject'])

.controller("MainController", function($scope){
  
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  
  $urlRouterProvider.otherwise('/all');

  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        nav: {
          templateUrl: './app/main/nav.html',
          controller: 'NavController as Nav'
        },
        // '': {
        //   templateUrl: './app/main/main.html',
        //   controller: 'MainController as Content'
        // }
      }
    })
    .state('app.allprojects', {
      url: '/all',
      templateUrl: './app/main/allprojects.html',
      controller: 'AllProjectsController'
    })
    .state('app.signup', {
      url: '/signup',
      templateUrl: './app/main/signup.html',
      controller: 'SignupController'
    })
    .state('app.login', {
      url: '/login',
      templateUrl: './app/main/login.html',
      controller: 'LoginController'
    })
    .state('app.newproject', {
      url: './app/main/newproject',
      templateUrl: '/main/newproject.html',
      controller: 'NewProjectController'
    })
    .state('app.dashboard', {
      url: './app/dashboard',
      templateUrl: '/dashboard/index.html',
      controller: 'DashboardController'
    })
    .state('app.project', {
      url: './app/project/{id}',
      templateUrl: '/project/index.html',
      controller: 'ProjectController'
    });
}]);