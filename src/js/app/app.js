// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js 



angular.module('sigmaIonic', ['ionic', 'ngCordova', 'sigmaIonic.Common', 'ionic.service.core',
        'ionic.service.push', 'templates', 'pascalprecht.translate'])
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

            /* When receiving a push event, this is how we deal with it. */
            $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
                console.log('Got token', data.token, data.platform);
                // Do something with the token
            });
        }); 
    })
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