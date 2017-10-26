(function (ng) {
    var app = angular.module('mainApp', [
        // External dependencies
        'ui.router',
        'ui.bootstrap',
        // Internal modules dependencies       
        'bookModule',
        'authorModule',
        'editorialModule',
        'reviewModule',
        'loginModule'

    ]);
    // Resuelve problemas de las promesas
    app.config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);
    app.run(function ($rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

            var requireLogin = toState.data.requireLogin;
            $rootScope.isAuthenticated = function () {

                if (sessionStorage.getItem("username") != null) {
                    $rootScope.currentUser = sessionStorage.getItem("name");
                    return true;
                } else {
                    return false;
                }
            };


            if (requireLogin && (sessionStorage.getItem("username") === null)) {
                event.preventDefault();
                return $state.go('login', toParams);
            }

        });
    });
})(window.angular);
