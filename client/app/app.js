angular.module('app', ['ui.router'])

.controller("MainController", function($scope){
  
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  
  $urlRouterProvider.otherwise('/all');

  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        nav: {
          templateUrl: '/main/nav.html',
          controller: 'NavController as Nav'
        }
      }
    })
    .state('app.signup', {
      url: '/signup',
      templateUrl: '/main/signup.html',
      controller: 'SignupController'
    })
    .state('app.login', {
      url: '/login',
      templateUrl: '/main/login.html',
      controller: 'LoginController'
    })
    .state('app.logout', {
      url: '/logout',
      templateUrl: '/main/allprojects.html',
      controller: 'AllProjectsController'
    })
    .state('app.newproject', {
      url: '/newproject',
      templateUrl: '/main/newproject.html',
      controller: 'NewProjectController'
    })
    .state('app.dashboard', {
      url: '/dashboard',
      templateUrl: '/dashboard/index.html',
      controller: 'DashboardController'
    })
    .state('app.project', {
      url: '/project/{id}',
      templateUrl: '/project/index.html',
      controller: 'ProjectController'
    });
}]);