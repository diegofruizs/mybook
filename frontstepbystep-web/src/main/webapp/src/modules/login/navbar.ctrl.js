(function (ng) {
    var mod = ng.module("loginModule");

    mod.controller('navbarCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

            $rootScope.isAuthenticated = function () {
                if (sessionStorage.getItem("username")) {
                    $scope.user = sessionStorage.getItem("name");
                    return true;
                } else {
                    return false;
                }
            };
        }
    ]);
}
)(angular);

