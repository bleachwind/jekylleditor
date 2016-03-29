define('app/config',[], function() {
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
define('app/jeDataSvc',[], function(app){
    'use strict';

    function factoryFunc($http, $resource){
        var Posts;

        Posts=$resource('/api/posts/:id',{id:'@id'});

        var svc= {
            allPosts: allPosts,
            postDetails: postDetails
        };

        return svc;

        function allPosts(){
            return Posts.query().$promise;
        }

        function postDetails(id){
            return Posts.get({id:id}).$promise;
        }
    }

    factoryFunc.$inject=['$http','$resource'];

    return factoryFunc;
});

define('app/jeHomeController',[], function() {
    'use strict';

    function jeHomeController($scope, jeDataSvc) {
        $scope.ideaName = "Todo List";

        $scope.gridOptions = {
            data: 'posts',
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field: 'technologies', displayName: 'Technologies'},
                {field: 'platform', displayName: 'Platforms'},
                {field: 'status', displayName: 'Status'},
                {field: 'devsNeeded', displayName: 'Vacancies'},
                {field: 'id', displayName: 'View Details', cellTemplate: '<a ng-href="#/details/{{row.getProperty(col.field)}}">View Details</a>'}
            ],
            enableColumnResize: true
        };

        jeDataSvc.allPosts().then(function(result){
            $scope.posts=result;
            console.log($scope.posts);
         });
    }

    jeHomeController.$inject=['$scope','jeDataSvc'];

    return jeHomeController;
});
define('app/jeDetailsController',[], function(app){
    'use strict';

    function jeDetailsController($scope, $routeParams, jeDataSvc){
        jeDataSvc.postDetails($routeParams.id)
            .then(function(result){
                $scope.postDetails = result;
            });
    }

    jeDetailsController.$inject=['$scope','$routeParams','jeDataSvc'];

    return jeDetailsController;
});

define('app/jeModule',['app/config',
        'app/jeDataSvc',
        'app/jeHomeController',
        'app/jeDetailsController'],
    function(config, jeDataSvc, jeHomeController, jeDetailsController){
    'use strict';

    var app = angular.module('jeApp', ['ngRoute','ngResource','ui.grid']);

    app.config(config);
    app.factory('jeDataSvc',jeDataSvc);
    app.controller('jeHomeController', jeHomeController);
    app.controller('jeDetailsController',jeDetailsController);
});
require(['app/jeModule'],
    function() {
        'use strict';

        angular.bootstrap(document, ['jeApp']);
    }
);
define("main", function(){});

