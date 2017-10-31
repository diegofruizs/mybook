(function (ng) {
    var mod = ng.module("loginModule");
    mod.controller('logoutCtrl', ['$rootScope', '$state', function ($rootScope, $state) {
            if (sessionStorage.getItem("username")) {
                sessionStorage.clear();
            } else {
                $state.go('booksList', {}, {reload: true});
            }
        }
    ]);
}
)(window.angular);

