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
    app.run(function ($rootScope, $state, userService) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

            var requireLogin = toState.data.requireLogin;
            $rootScope.isAuthenticated = function () {

                if (sessionStorage.getItem("username") != null) {
                    $rootScope.currentUser = sessionStorage.getItem("name");
                    $rootScope.rol = sessionStorage.getItem("rol");
                    return true;
                } else {

                    return false;
                }
            };
            
            $rootScope.isRol = function (rol) {
                return (userService.getRoles().indexOf(rol) > -1);
            };
            
            if (requireLogin && (sessionStorage.getItem("username") === null)) {
                event.preventDefault();
                return $state.go('login', toParams);
            }

        });
    });
})(window.angular);
