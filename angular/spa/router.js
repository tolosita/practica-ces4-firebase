angular.module('project').config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller: 'listController as vm',
            templateUrl: "list.html"
        })
        .when("/detail", {
            controller: 'detailController as vm',
            templateUrl: "detail.html"
        });
});