'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
      title: 'My Articles',
      link: 'users/'
    }, {
      title: 'Create New Article',
      link: 'articles/create'
    }];

    $scope.isCollapsed = false;
  }
]);
