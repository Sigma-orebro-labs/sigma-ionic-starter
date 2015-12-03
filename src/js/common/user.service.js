(function () {
    'use strict';
    angular.module('sigmaIonic.Common')
        .factory('userService', userService);

    userService.$inject = ['$http', '$q', '$timeout'];

    function userService($http, $q, $timeout) {
        var service = {};

        // expose auth. 
        service.userId = "simplelogin:2";
        // login
        service.login = function (user, password) {
            
            var dfd = $q.defer();
            $timeout(function () {
                dfd.resolve({ uid: "simplelogin:2" });
            }, 1000);
            
            return dfd.promise;
        };


        // create user
        service.createUser = function (email, password) {
          // do sth. 
        };

        return service;
    }
}());