angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider
  .state('main', {
    url: '/main',
  })

  .state('main.list', {
    url: '/list',
    templateUrl: 'partial-main-list.html',
    // controller: function($scope) {
    //   $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
    // }
  })

  .state('main.paragraph', {
    url: '/paragraph',
    template: 'I could sure use a drink right now.'
  })

  .state('newproject', {
    url: '/newproject',
    templateUrl: './main/newproject-partial.html'
  });

});