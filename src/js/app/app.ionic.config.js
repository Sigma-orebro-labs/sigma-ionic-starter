(function () {
    'use strict';
    angular.module('sigmaIonic')
        .config(['$ionicAppProvider', function ($ionicAppProvider) {
            // Identify app
            $ionicAppProvider.identify({
                // The App ID (from apps.ionic.io) for the server
                app_id: '', // SEA POC. 
                // The public API key all services will use for this app
                api_key: '',
                gcm_id: '',
                // Set the app to use development pushes
                dev_push: false
            });
            
    }]);
}());