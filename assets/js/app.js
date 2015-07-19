var app = angular.module('MyApp', ['ui.router', '$sam']);

app.config(function($stateProvider, $urlRouterProvider, $samProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/templates/home.html"
    });

  $samProvider.lists([{
    "title": "Navigation",
    "navigation": [{
      "name": "Hello there",
      "sref": ""
    }]
  }, {
    "title": "Actions",
    "navigation": [{
      "name": "Hello there",
      "sref": ""
    }]
  }]);

});

app.directive('mdSidenavLists', function () {

    return {
      template: '<md-list ng-repeat="list in lists"> <md-subheader class="md-no-sticky">{{list.title}}</md-subheader><md-list-item ng-repeat="item in list.navigation">{{item.name}}</md-list-item></md-list>',
      controller: function ($scope, $sam) {
          $scope.lists = $sam.outputLists();
      }
    };

});
