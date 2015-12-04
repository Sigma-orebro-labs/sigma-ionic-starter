(function () {
    'use strict';
    angular.module('sigmaIonic')
        .config(['$ionicAppProvider', function ($ionicAppProvider) {
            // Identify app
            $ionicAppProvider.identify({
                // The App ID (from apps.ionic.io). If we want to let ionic.io handle users or push notifications this is where we specify keys. 
                app_id: '', 
                // The public API key all services will use for this app
                api_key: '', // apple push
                gcm_id: '', // google cloud messaging
                // Set the app to use development pushes
                dev_push: false
            });
            
    }]);
}());