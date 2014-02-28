(function() {
  'use strict';

  angular.module('mean.articles').controller('ArticlesController', function($scope, $stateParams, $location, $http, Global, Articles) {
    $scope.global = Global;

    $scope.create = function() {
      var article = new Articles({
        title: this.title,
        content: this.content,
        tags: this.tags
      });
      article.$save(function(response) {
        $location.path('articles/' + response._id);
      });

      this.title = '';
      this.content = '';
      this.tags = [];
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove();
        $location.path('articles');
      }
    };

    $scope.update = function() {
      var article = $scope.article;
      if (!article.updated) {
        article.updated = [];
      }
      article.updated.push(new Date().getTime());

      article.$update(function() {
        $location.path('articles/' + article._id);
      });
    };

    $scope.findOne = function() {
      Articles.get({
        articleId: $stateParams.articleId
      }, function(article) {
        $scope.article = article;
      });
    };

    $scope.select2Options = {
      multiple: true,
      simple_tags: true,
      tags: []
    };

    $http.get('articles/tags').success(function(tags) {
      var options = $scope.select2Options.tags;
      options.splice(0);
      angular.forEach(tags, function(tag) {
        options.push(tag);
      });
    });
  });
})();
