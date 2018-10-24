var app = angular.module('loginApp',["ngRoute","ngCookies"]);
app.config(function ($routeProvider) {
    $routeProvider.when('/',{
        templateUrl : '../app/views/loginPage.html',
        controller : 'loginController'
    })
        .when('/register',{
            templateUrl : '../app/views/registerPage.html',
            controller : 'registerController'
        })
        .when('/home',{
            templateUrl : '../app/views/homePage.html',
            controller : 'homeController'
        })
        .when('/data',{
            templateUrl : '../app/views/table.html',
            controller : 'tableController'
        })
        .otherwise({
            redirectTo : '/'
        })
});