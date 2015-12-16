'use strict';

AdminApp.controller('SignupController', function($rootScope, $scope, $http, $timeout, $state,LoginService,toaster) {
    $scope.$on('$viewContentLoaded', function() {
        Layout.init();

        $scope.signUpForm = function(formData){
            //console.log(formData);
            $http.post('/api/signup', formData)
                .success(function (data) {
                    //console.log(data);
                    LoginService.setUserLoginValue(true);
                    $state.go('dashboard');
                    //toaster.pop('success','Registerd User',data.local.name.firstName);
                    //alert(data.local.name.firstName);
                })
                .error(function(data){
                    console.log(data);
                })

        }

    });
});
