(function (ng) {
    var mod = ng.module("authorModule");
    mod.constant("authorsContext", "api/authors");
    mod.controller('authorNewCtrl', ['$scope', '$http', 'authorsContext', '$state', '$rootScope',
        function ($scope, $http, authorsContext, $state, $rootScope) {
            $rootScope.edit = false;

            $scope.data = {};

            $scope.createAuthor = function () {
                $http.post(authorsContext, $scope.data).then(function (response) {
                    $state.go('authorsList', {authorId: response.data.id}, {reload: true});
                });
            };
        }
    ]);
}
)(window.angular);