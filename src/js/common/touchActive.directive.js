/**
 * Created by ANRY7440 on 2015-08-06.
 */


(function(){
    'use strict';
    angular.module('sigmaIonic.Common')
        .directive('touchActive', touchActiveDirective);

    touchActiveDirective.$inject = ['PATHS', '$ionicGesture', '$timeout'];


    /* Directive that reacts when touch is active, and allows you to set a class to any child component to help visualize that touch is active. Works well in conjunction with CSS-transiations. 
    For instance, if we clicked a div havinf the child of .container, and attrs.targetChild is set to "container" then the container would receive the .activated class while touch is active. 
    */     
    function touchActiveDirective (PATHS, $ionicGesture, $timeout){
        var directive =  {
            restrict: 'A',
            link: link
        };
        return directive;


        function link(scope, elem, attrs){
           
            var target = elem;
            if (attrs.targetChild)
                target = angular.element(elem).find('.'+ attrs.targetChild); 


            var _touchEnter = function () {
                angular.element(elem).addClass('activated');
            };

            var _touchLeave = function () {
                angular.element(elem).removeClass('activated');
            };

            var _tapHandle = function (e) {
                console.log(e); 
                angular.element(target).addClass('activated');
            }; 

            $ionicGesture.on('tap', _tapHandle, target);
         //   $ionicGesture.on('drag', _touchLeave, target);
            $ionicGesture.on('release', _touchLeave, target);

        }
    }
}());