(function (ng) {
    var mod = ng.module("loginModule");
    mod.controller('logoutCtrl', ['$scope', '$state', function ($scope, $state) {
            if (sessionStorage.getItem("username")) {
                sessionStorage.clear();
            } else {
                $state.go('booksList', {}, {reload: true});
            }
        }
    ]);
}
)(angular);

