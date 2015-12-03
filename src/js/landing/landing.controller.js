(function() {
    'use strict';
    angular.module('sigmaIonic')
        .controller('landingController', LandingController);

    LandingController.$inject = ['$scope', '$state'];

    function LandingController($scope, $state) {

        console.log("LandingController loaded");
    }
}());