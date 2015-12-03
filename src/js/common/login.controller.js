(function() {
    'use strict';
    angular.module('sigmaIonic.Common')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$scope', '$state', '$window', 'brandingService', 'pushService', 'userService', '$ionicLoading', '$ionicHistory', '$rootScope', 'windowService', ];

    function LoginController($scope, $state, $window, brandingService, pushService, userService, $ionicLoading, $ionicHistory, $rootScope, windowService) {

        $scope.user = "user";
        $scope.password = "password";
        $scope.branding = {
            enabled: false
        };

        $scope.showSomething = windowService.screenOrientation === 'landscape' ? true : false;
        // event listener to detect window resize.
        $scope.$on('windowResize', function(event) {
            if (windowService.screenOrientation === 'landscape') {
                $scope.showSomething = true;
            } else {
                $scope.showSomething = false;
            }
            $scope.$apply();
        });

        $scope.toggleBranding = function() {
            $scope.branding.enabled = !$scope.branding.enabled;
        };

        $scope.doLogin = function(user, password) {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            $ionicLoading.show({
                template: '<ion-spinner icon="crescent"></ion-spinner> <br> Loggar In'
            });

            userService.login(user, password).then(function(loginData) {

                if (window.cordova) {
                    pushService.registerForPush();
                }

                if ($scope.branding.enabled == true) {
                    // get branding for user.
                    brandingService.getBrandingForUser().then(function(brandingResponse) {
                        if (brandingResponse.brandingSettings && brandingResponse.brandingSettings.brandName.length > 0) {
                            console.log('BRANDING RESULT:', brandingResponse);
                            brandingService.assignBrandToDOM(brandingResponse.brandingSettings);
                            $ionicLoading.hide();
                            $rootScope.$broadcast('showsplash', {
                                brandSettings: brandingResponse.brandingSettings
                            });
                        }
                        $state.go('app.landing');
                    });
                } else {
                    brandingService.getDefaultBranding().then(function(brandingResponse) {
                        $rootScope.$broadcast('showsplash', {
                            brandSettings: brandingResponse.brandingSettings
                        });
                        brandingService.removeBranding();
                        $state.go('app.landing');
                        $ionicLoading.hide();
                    });
                }
            });
        };
    }
}());
