(function() {
    'use strict';
    angular.module('sigmaIonic.Common').factory('brandingService', BrandingService);
    BrandingService.$inject = ['$q', '$timeout', '$rootScope'];

    function BrandingService($q, $timeout, $rootScope) {
        var service = {};

        service.brandingSettings = undefined;
        service.brandingActive = false;

        service.assignBrandToDOM = function(brandSettings) {
            /* Yep. prob bad practice. but works */
            angular.element('body').addClass('branding-' + brandSettings.brandName);
            service.brandingActive = true;
        };

        service.removeBranding = function() {
            /* Yep. prob bad practice. but works */
            angular.element('body').removeClass('branding-blue-energy');
        };

        service.getBrandingForUser = function(user) {
            var dfd = $q.defer();
            // TODO: Web API Call. 
            var brandingSettings = {
                brandingSettings: {
                    brandName: 'blue-energy',
                    splash: 'templates/splash/blue-energy.html'
                }
            };
            // save brandingSettings in case of future access. Feels safe enough to store on top of Service since this isnt going to change during application lifecycle. 
            service.brandingSettings = brandingSettings;
            dfd.resolve(brandingSettings);
            return dfd.promise;
        };
        service.getDefaultBranding = function() {

            var dfd = $q.defer();
            // TODO: Web API Call. 
            var brandingSettings = {
                brandingSettings: {
                    brandName: 'sigma',
                    splash: 'templates/splash/sigma.html'
                }
            };
            // save brandingSettings in case of future access. Feels safe enough to store on top of Service since this isnt going to change during application lifecycle. 
            service.brandingSettings = brandingSettings;
            dfd.resolve(brandingSettings);
            return dfd.promise;
        }
        return service;
    }
}());
