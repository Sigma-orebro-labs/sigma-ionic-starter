(function () {
    'use strict';
    /* If we ever device to move our templates, just switch out the PATHS.partials value to 
    	wherever our partials reside. */  
    angular.module('sigmaIonic')
        .constant('PATHS', {
            partials: 'templates/'            
        })
}());