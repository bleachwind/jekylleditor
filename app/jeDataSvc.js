define([], function(app) {
    'use strict';

    function factoryFunc($http, $resource) {
        var Posts;

        Posts = $resource('/api/posts/:id', {
            id: '@id'
        });

        var svc = {
            allPosts: allPosts,
            postDetails: postDetails
        };

        return svc;

        function allPosts() {
            return Posts.query().$promise;
        }

        function postDetails(id) {
            return Posts.get({
                id: id
            }).$promise;
        }
    }

    factoryFunc.$inject = ['$http', '$resource'];

    return factoryFunc;
});