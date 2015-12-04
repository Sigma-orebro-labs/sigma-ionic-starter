(function() {
    'use strict';

    angular.module('sigmaIonic', ['ionic', 'ngCordova', 'sigmaIonic.Common', 'ionic.service.core',
            'ionic.service.push', 'templates', 'pascalprecht.translate'
        ])
        .run(function($ionicPlatform, $rootScope) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs) 
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
                window.shouldRotateToOrientation = function(degrees) {
                    return true;
                };

                /* When receiving a push event, this is how we deal with it if the app is currently open */
                $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
                    console.log('Got token', data.token, data.platform);
                    // Do something with the token
                });
            });
        })
        // could/should be moved to translations file if translations are needed. 
        .config(function($translateProvider) {
            $translateProvider.translations('sv', {
                    LOGIN: "Logga in",
                    LANDINGPAGE: "Landningssida",

                })
                .translations('en', {
                    LOGIN: "Log in",
                    LANDINGPAGE: "Landing Page",
                });
            $translateProvider.preferredLanguage('sv');

        });
}());
