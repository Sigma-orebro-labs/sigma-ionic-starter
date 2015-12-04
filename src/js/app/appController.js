/*************************
 * SEA
 * ANRY7440
 * 2015-08-20
 **************************/
(function () {
    'use strict';
    angular.module('sigmaIonic').controller('appController', appController);


    appController.$inject = ['$scope', '$ionicSideMenuDelegate', '$rootScope', '$timeout'];

    function appController($scope, $ionicSideMenuDelegate, $rootScope, $timeout) {

        $scope.$on('$stateChangeSuccess', function (e, toState) {
            // close menu on route change.
            $ionicSideMenuDelegate.toggleLeft(false);
        });

        /* when showSplash-event is raised, pop a splash-html on top of everything. 
        Since this is event based it can be raised from wherever. Could be made more generic so we could pass in more splash-specific args. */
        $rootScope.$on('showsplash', function (d1, d2) {
            $scope.splashTemplateUrl = d2.brandSettings.splash;           
            $scope.showSplash = true;
            $timeout(function () {
                $scope.showSplash = false;
            }, 2000);
        });
    }
}());
