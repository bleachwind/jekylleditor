define([], function() {
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