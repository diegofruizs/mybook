(function (ng) {
    var appModule = angular.module('mainApp');

    appModule.service('userService', ['$q', function ($q) {
            function getUser() {
                return {            
                    roles: [
                        'admin'
                    ]
                };
            }

            function getRoles() {
                return getUser().roles;
            }
            return {
                getRoles: getRoles
            };
        }]);
})(window.angular); 