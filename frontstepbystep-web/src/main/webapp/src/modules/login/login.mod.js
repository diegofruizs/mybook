(function (ng) {
    // Definición del módulo
    var mod = ng.module("loginModule", ['ui.router']);

    // Configuración de los estados del módulo
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            var basePath = 'src/modules/login/';

            $urlRouterProvider.otherwise("/login");

            /**
             * Helper auth functions
             */
            var skipIfLoggedIn = ['$q', '$rootScope', function ($q, $rootScope) {
                    var deferred = $q.defer();
                    if ($rootScope.isAuthenticated()) {
                        deferred.reject();
                    } else {
                        deferred.resolve();
                    }
                    return deferred.promise;
                }];

            $stateProvider.state('login', {
                url: '/login',
                views: {
                    'mainView': {
                        templateUrl: basePath + 'login.html',
                        controller: 'loginCtrl'
                    }
                },
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            }).state('logout', {
                url: '/logout',
                views: {
                    'mainView': {
                        templateUrl: basePath + 'logout.html',
                        controller: 'logoutCtrl'
                    }
                }
            });
        }
    ]);
})(window.angular);

