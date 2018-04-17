angular.module('project').service('service', ['$http', '$q', function ($http, $q) {

    this.getDataList = function () {
        var deferred = $q.defer();

        $http.get("https://ces4-rooms.firebaseio.com/rooms.json").then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.resolve(err);
            console.log(err);
        });

        return deferred.promise;
    };

    this.getDataItem = function (Id) {
        var deferred = $q.defer();

        $http.get(`https://ces4-rooms.firebaseio.com/rooms/${Id}.json`).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.resolve(err);
            console.log(err);
        });

        return deferred.promise;
    };

}]);