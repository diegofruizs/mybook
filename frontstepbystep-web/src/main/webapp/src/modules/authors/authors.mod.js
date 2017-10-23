(function (ng) {
    var mod = ng.module("authorModule", ['ui.router']);
    mod.constant("authorsContext", "api/authors");
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/authors/';
            var basePathBooks = 'src/modules/books/';
            $urlRouterProvider.otherwise("/authorsList");

            /**
             * Helper auth functions
             */

            var loginRequired = ['$q', '$location', '$rootScope', function ($q, $location, $rootScope) {
                    var deferred = $q.defer();
                    if ($rootScope.isAuthenticated()) {
                        deferred.resolve();
                    } else {
                        $location.path('/login');
                    }
                    return deferred.promise;
                }];


            $stateProvider.state('authors', {
                url: '/authors',
                abstract: true,
                views: {
                    'mainView': {
                        templateUrl: basePath + 'authors.html',
                        controller: 'authorCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            }).state('authorsList', {
                url: '/list',
                parent: 'authors',
                views: {
                    'listView': {
                        templateUrl: basePath + 'authors.list.html'
                    }
                }
            }).state('authorDetail', {
                url: '/{authorId:int}/detail',
                parent: 'authors',
                param: {
                    authorId: null
                },
                views: {
                    'listView': {
                        templateUrl: basePathBooks + 'books.list.html',
                        controller: 'authorCtrl',
                        controllerAs: 'ctrl'
                    },
                    'detailView': {
                        templateUrl: basePath + 'authors.detail.html',
                        controller: 'authorCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            }).state('authorsCreate', {
                url: '/create',
                parent: 'authors',
                views: {
                    'detailView': {
                        templateUrl: basePath + '/new/authors.new.html',
                        controller: 'authorNewCtrl'
                    }
                },
                resolve: {
                    loginRequired: loginRequired
                }
            }).state('authorUpdate', {
                url: '/update/{authorId:int}',
                parent: 'authors',
                param: {
                    authorId: null
                },
                views: {
                    'detailView': {
                        templateUrl: basePath + '/new/authors.new.html',
                        controller: 'authorUpdateCtrl'
                    }
                },
                resolve: {
                    loginRequired: loginRequired
                }
            }).state('authorDelete', {
                url: '/delete/{authorId:int}',
                parent: 'authors',
                param: {
                    authorId: null
                },
                views: {
                    'detailView': {
                        templateUrl: basePath + '/delete/author.delete.html',
                        controller: 'authorDeleteCtrl'
                    }
                },
                resolve: {
                    loginRequired: loginRequired
                }
            });
        }]);
})(window.angular);