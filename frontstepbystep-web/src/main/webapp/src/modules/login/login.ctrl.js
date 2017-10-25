(function (ng) {
    var mod = ng.module("loginModule");
    mod.controller('loginCtrl', ['$scope', '$http', '$state', '$rootScope', 'userService',
        function ($scope, $http, $state, $rootScope,userService) {

            $scope.user = {};
            // $http retorna un apromesa que aquí no se está manejando si viene con error.
            $http.get('data/users.json').then(function (response) {
                $scope.users = response.data;
            });

            $scope.autenticar = function () {
                console.log($scope.rol);
                var flag = false;
                for (var item in $scope.users) {
                    if ($scope.users[item].user == $scope.username && $scope.users[item].password == $scope.password && $scope.users[item].roles[0] == $scope.rol) {
                        flag = true;
                        $scope.user = $scope.users[item];
                        $state.go('booksList', {}, {reload: true});
                        break;
                    }
                }
                if (!flag) {
                    $rootScope.alerts.push({type: "danger", msg: "Incorrect username or password."});
                } else {
                    console.log($rootScope.currentUser);
                    sessionStorage.token = $scope.user.token;
                    sessionStorage.setItem("username", $scope.user.user);
                    sessionStorage.setItem("name", $scope.user.name);
                    sessionStorage.setItem("rol", $scope.user.roles[0]);
                    $rootScope.currentUser = $scope.user.name;
                   
                }
            };
        }
    ]);
}
)(angular);

