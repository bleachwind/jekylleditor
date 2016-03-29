define(['app/config',
        'app/jeDataSvc',
        'app/jeHomeController',
        'app/jeDetailsController'
    ],
    function(config, jeDataSvc, jeHomeController, jeDetailsController) {
        'use strict';

        var app = angular.module('jeApp', ['ngRoute', 'ngResource', 'ui.grid']);

        app.config(config);
        app.factory('jeDataSvc', jeDataSvc);
        app.controller('jeHomeController', jeHomeController);
        app.controller('jeDetailsController', jeDetailsController);
    });