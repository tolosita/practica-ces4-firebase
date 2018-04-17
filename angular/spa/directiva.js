angular.module('components', [])
    .directive('list', function () {
        return {
            template:
                '<table border="1">' +
                '   <thead>' +
                '       <tr>' +
                '           <th>Id</th>' +
                '           <th>Name</th>' +
                '           <th>Capacity</th>' +
                '           <th>Location</th>' +
                '           <th>Last Clean Up Date</th>' +
                '           <th>Action</th>' +
                '       </tr>' +
                '   </thead>' +
                '   <tbody>' +
                '       <tr ng-repeat="item in vm.list | orderBy:\'-Id\'">' +
                '           <td>{{item.Id}}</td>' +
                '           <td>{{item.Name | uppercase}}</td>' +
                '           <td>{{item.Capacity}}</td>' +
                '           <td>{{item.Location | lowercase}}</td>' +
                '           <td>{{item.Last_Clean_Up_Date | limitTo : 10}}</td>' +
                '           <td>' +
                '               <a ng-href="#!detail?Id={{$index}}">' +
                '                   Ver' +
                '               </a>' +
                '           </td>' +
                '       </tr>' +
                '   </tbody>' +
                '</table>'
        };
    });