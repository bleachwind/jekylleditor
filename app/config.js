define([], function() {
    'use strict';

    function config($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'jeHomeController'
            })
            .when('/details/:id', {
                templateUrl: 'templates/jeDetails.html',
                controller: 'jeDetailsController'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

    config.$inject = ['$routeProvider'];

    return config;
});