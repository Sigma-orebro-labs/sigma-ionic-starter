(function () {
    'use strict';

    angular.module('sigmaIonic.Common')
        .factory('windowService', windowService);

    windowService.$inject = ['$window', '$rootScope'];
    function windowService($window, $rootScope) {
        
        var service = {}; 

        var w = {};        
        
        function setSizeAndOrientation(){
                 
            w.width = $window.innerWidth;
            w.height = $window.innerHeight;        
            w.orientation = w.screenWidth > w.screenHeight ? 'landscape' : 'portrait';   
        }
        
        angular.element($window).bind('orientationchange', function(){
            setSizeAndOrientation();            
            $rootScope.$broadcast('windowResize', { height: w.height, width: w.width, orientation: w.orientation}); 
        });
        
        angular.element($window).bind('resize', function(){
           setSizeAndOrientation();            
            $rootScope.$broadcast('windowResize', { height: w.height, width: w.width, orientation: w.orientation});     
        });
        
        setSizeAndOrientation();            

        service.getCurrentSize = function () {
            setSizeAndOrientation();
            return w; 
        }


        return service;
    }

}());