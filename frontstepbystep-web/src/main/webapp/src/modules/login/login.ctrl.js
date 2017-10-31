(function (ng) {
    var mod = ng.module("loginModule");
    mod.controller('loginCtrl', ['$scope', '$http', '$state', '$rootScope',
        function ($scope, $http, $state, $rootScope) {

            $scope.user = {};
            $scope.data = {};
            
            $http.get('data/users.json').then(function (response) {
                $scope.users = response.data;
            });

            $scope.autenticar = function () {
                var flag = false;
                for (var item in $scope.users) {
                    if ($scope.users[item].user == $scope.data.username && $scope.users[item].password == $scope.data.password && $scope.users[item].rol == $scope.data.rol) {
                        flag = true;
                        $scope.user = $scope.users[item];
                        $state.go('booksList', {}, {reload: true});
                        break;
                    }
                }
                if (!flag) {
                    $rootScope.alerts.push({type: "danger", msg: "Incorrect username or password."});
                } else {
                    sessionStorage.token = $scope.user.token;
                    sessionStorage.setItem("username", $scope.user.user);
                    sessionStorage.setItem("name", $scope.user.name);
                    sessionStorage.setItem("rol", $scope.user.rol);
                    $rootScope.currentUser = $scope.user.name; 
                }
            };
        }
    ]);
}
)(window.angular);

