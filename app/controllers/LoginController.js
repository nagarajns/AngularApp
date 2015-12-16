'use strict';

AdminApp.controller('LoginController', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {
        Layout.init();

        // initialize core components
       $scope.myValues = ['hello', 'hi','how'];
    });
});