(function() {
    'use strict';
    angular.module('sigmaIonic.Common').factory('pushService', PushService);
    PushService.$inject = ['$q', '$ionicUser', '$ionicPush'];

    /** NOT READY FOR PRODUCTION **/

    function PushService($q, $ionicUser, $ionicPush) {
        var service = {};

        service.registerForPush = function() {
            var user = $ionicUser.get();
            if (!user.user_id) {
                // Set your user_id here, or generate a random one.
                // use firebase user? 
                user.user_id = $ionicUser.generateGUID();
            }

            // Add some metadata to your user object.
            angular.extend(user, {
                created: new Date()
            });

            // Identify your user with the Ionic User Service
            $ionicUser.identify(user).then(function() {
                // $scope.identified = true;
                console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
                console.log('GUID:', user.user_id);
                $ionicPush.register({
                        canShowAlert: true, //Can pushes show an alert on your screen?
                        canSetBadge: true, //Can pushes update app icon badges?
                        canPlaySound: true, //Can notifications play a sound?
                        canRunActionsOnWake: true, //Can run actions outside the app,
                        onNotification: function(notification) {
                            console.log(notification);
                            // Handle new push notifications here
                            // If push is received within app. 
                        }
                    }, user)
                    .then(function(d) {
                        console.log('registered for push', d);
                    });
            });
        };

        return service;
    }

}());
