'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        abstract: true,
        templateUrl: 'views/index.html'
      })
      .state('home.list', {
        url: '',
        views: {
          '': {
            templateUrl: 'views/articles/list.html',
            controller: function($scope, Articles) {
              $scope.articles = Articles.query();
            }
          },
          users: {
            templateUrl: 'views/users/list.html',
            controller: function($scope, $http) {
              $http.get('users').success(function(users) {
                $scope.users = users;
              });
            }
          },
          tags: {
            templateUrl: 'views/tags/list.html',
            controller: function($scope, $http) {
              $http.get('tags').success(function(tags) {
                $scope.tags = tags;
              });
            }
          }
        }
      })
      .state('home.list.tag', {
        url: 'tags/:tag',
        views: {
          '@home': {
            templateUrl: 'views/articles/list.html',
            controller: function($scope, $http, $stateParams) {
              var tag = $stateParams.tag;
              $http.get('tags/' + tag).success(function(articles) {
                $scope.articles = articles;
              });
            }
          },
          'title@home': {
            template: 'Tag: {{title}}',
            controller: function($scope, $stateParams) {
              $scope.title = $stateParams.tag;
            }
          }
        }
      })
      .state('home.list.create', {
        url: 'articles/create',
        views: {
          '@home': {
            templateUrl: 'views/articles/create.html'
          }
        }
      })
      .state('home.list.article', {
        url: 'articles/:articleId',
        views: {
          '@home': {
            templateUrl: 'views/articles/view.html',
            controller: function($scope, Articles, $stateParams) {
              Articles.get({
                articleId: $stateParams.articleId
              }, function(article) {
                $scope.article = article;
              });
            }
          }
        }
      })
      .state('home.list.article.edit', {
        url: '/edit',
        views: {
          '@home': {
            templateUrl: 'views/articles/edit.html',
            controller: function($scope, Articles, $stateParams) {
              Articles.get({
                articleId: $stateParams.articleId
              }, function(article) {
                $scope.article = article;
              });
            }
          },
          'tags@home': {
            templateUrl: 'views/tags/list.html',
            controller: function($scope, $http) {
              $http.get('tags').success(function(tags) {
                $scope.tags = tags;
              });
            }
          }
        }
      })
      .state('home.user', {
        url: 'users/:userId',
        resolve: {
          user: function($http, $stateParams, Global) {
            var userId = $stateParams.userId || Global.user._id;
            return $http.get('users/' + userId).then(function(data) {
              return data.data;
            });
          }
        },
        views: {
          '': {
            templateUrl: 'views/articles/list.html',
            controller: function($scope, $http, user) {
              $http.get('articles?userid=' + user._id).success(function(articles) {
                $scope.articles = articles;
              });
            }
          },
          users: {
            templateUrl: 'views/users/profile.html',
            controller: function($scope, user) {
              $scope.user = user;
            }
          },
          tags: {
            templateUrl: 'views/tags/list.html',
            controller: function($scope, $http, user) {
              $http.get('tags?userid=' + user._id).success(function(tags) {
                $scope.tags = tags;
              });
            }
          },
          title: {
            template: '{{title}}\'s blog',
            controller: function($scope, user) {
              $scope.title = user.name;
            }
          }
        }
      });
  }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
