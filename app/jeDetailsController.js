define([], function(app){
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
