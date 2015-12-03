/*************************
 * SEA
 * ANRY7440
 * 2015-08-20
 **************************/
(function () {
    'use strict';
    angular.module('sigmaIonic.Common').controller('sideMenuController', sideMenuController);


    sideMenuController.$inject = ['$scope', '$ionicHistory', '$state', '$translate'];

    function sideMenuController($scope,$ionicHistory, $state, $translate) {
        

        $scope.goToState = function(state){
            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            //$state.go(state);
        }
        
        $scope.changeLanguage = function(langKey){
            $translate.use(langKey);
        }
        
    }
}());