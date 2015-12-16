
var AdminApp = angular.module("AdminApp",[
    "ui.router",
    "oc.lazyLoad",
    "ngSanitize",
    "toaster"
]);

AdminApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        cssFilesInsertBefore: 'lazyLoadPlugins'
        // load the above css files before a LINK element with this ID.
        // Dynamic CSS files must be loaded between core and theme css files
    });
}]);

AdminApp.service('LoginService', function () {
    var isLoggedIn = false;

    return {
        loginTrue : function(){
            return isLoggedIn;
        },
        setUserLoginValue  : function (value) {
            isLoggedIn = value
        }
    }
});

AdminApp.factory('AuthenticationService',['$rootScope','$cookieStore', function($rootScope,$cookieStore){

}]);

/* Setup App Main Controller */
AdminApp.controller('AppController', ['$scope', '$rootScope', 'LoginService', function($scope, $rootScope, LoginService) {
    $scope.$watch('LoginService.loginTrue()', function (value) {
        $scope.isLoggedIn = value;
    });
    $scope.$on('$viewContentLoaded', function() {
        // init core components
        $scope.isLoggedIn = LoginService.loginTrue();
    });



}]);
/* Setup Layout Part - Header */
AdminApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        // init header
        Layout.init();

        $scope.notifications = 5 ;
        $scope.notificationsList = [
            {
                url:'',
                message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
            },{
                url:'',
                message:'Lorem ipsum dolor ipsum dolor sit amet, consectetur adipiscing elit,'
            },{
                url:'',
                message:'Lorem ipsum dolor sit amet'
            },{
                url:'',
                message:'Lorem ipsum dolor adipiscing elit,'
            },{
                url:'',
                message:'Lorem ipsum dolor  consectetur adipiscing elit,'
            },
        ] ;

    });
}]);
/* Setup Layout Part - Sidebar */
AdminApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        // init sidebar
    });
}]);
/* Setup Layout Part - Footer */
AdminApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
         // init footer
    });
}]);

/* Setup Rounting For All Pages */
AdminApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider , $locationProvider) {

    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/login.html");
    //$locationProvider.html5Mode(true);
    $stateProvider

        // Login
        .state('login', {
            url: "/login.html",
            templateUrl: "app/views/login.html",
            data: {
                requireLogin:false,
                pageTitle: 'Brand Dashboard',
                pageSubTitle: 'statistics & reports'

            },
            controller: "LoginController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        cache: true,
                        name: 'AdminApp',
                        insertBefore: '#lazyLoadPlugins', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/plugins/backstretch/jquery.backstretch.js',
                            'app/controllers/LoginController.js'
                        ]
                    });
                }]
            }
        })
        // Signup
        .state('signup', {
            url: "/signup.html",
            templateUrl: "app/views/signup.html",
            data: {
                requireLogin:false,
                pageTitle: 'Brand Dashboard',
                pageSubTitle: 'statistics & reports'
            },
            controller: "SignupController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        cache: true,
                        name: 'AdminApp',
                        insertBefore: '#lazyLoadPlugins', // load the above css files before '#ng_load_plugins_before'
                        files: [

                            'app/controllers/SignupController.js'
                        ]
                    });
                }]
            }
        })
        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "app/views/dashboard.html",
            data: {
                requireLogin:true,
                pageTitle: 'Fashion Learn Dashboard',
                pageSubTitle: ''
            },
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        cache: true,
                        name: 'AdminApp',
                        insertBefore: '#lazyLoadPlugins', // load the above css files before '#ng_load_plugins_before'
                        files: [

                            'app/controllers/DashboardController.js'
                        ]
                    });
                }]
            }
        })
        //All Classes
        .state('allClasses', {
            url: "/allClasses.html",
            templateUrl: "app/views/allClasses.html",
            data: {
                requireLogin:true,
                pageTitle: 'All Classes',
                pageSubTitle: ''
            },
            controller: "AllClassesController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        cache: true,
                        name: 'AdminApp',
                        insertBefore: '#lazyLoadPlugins', // load the above css files before '#ng_load_plugins_before'
                        files: [

                            'app/controllers/AllClassesController.js'
                        ]
                    });
                }]
            }
        })

}]);

/* Init global settings and run the app */
AdminApp.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);


