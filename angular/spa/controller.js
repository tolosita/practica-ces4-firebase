angular.module('project', ['ngRoute', 'components'])
    .controller('listController', ['service', function (service) {
        var vm = this;
        vm.list = [];

        vm.getList = function () {
            service.getDataList().then(function (data) {
                vm.list = data;
            });
        };

        vm.getList();
    }])
    .controller('detailController', ['service', '$location', function (service, $location) {
        var vm = this;
        vm.item = {};

        vm.getItem = function () {
            var prmt = $location.search();
            service.getDataItem(prmt.Id).then(function (data) {
                vm.item = data;
                vm.item.Last_Clean_Up_Date = new Date(vm.item.Last_Clean_Up_Date);
            });
        };

        vm.getItem();
    }]);