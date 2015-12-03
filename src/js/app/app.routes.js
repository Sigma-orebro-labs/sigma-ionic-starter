(function() {
    'use strict';
    angular.module('sigmaIonic')
        .config(['$stateProvider', '$urlRouterProvider', 'PATHS',
            function($stateProvider, $urlRouterProvider, PATHS) {
                $stateProvider
                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: PATHS.partials + "main.html",
                        controller: 'appController'
                    })
                    .state('app.login', {
                        url: "/login",
                        views: {
                            mainContent: {
                                templateUrl: PATHS.partials + "login.html",
                                controller: 'loginController'
                            }
                        }
                    })

                .state('app.landing', {
                        url: "/landing",
                        views: {
                            mainContent: {
                                templateUrl: PATHS.partials + "landing.html",
                                controller: 'landingController'
                            }
                        }
                    })
                    .state('app.tabpage', {
                        url: "/tabpage", 
                        views: {
                            mainContent: {
                                templateUrl: PATHS.partials + "tabpage.html"
                                    // controller: 'deviceDetailController',
                                    // abstract: true
                            }
                        }
                    }).state('app.tabpage.subpage1', {
                        url: "/subpage1",
                        views: {
                            'subpage': {
                                templateUrl: PATHS.partials + "tabpage/subpage1.html",
                            }
                        }
                    })
                    .state('app.tabpage.subpage2', {
                        url: "/subpage2",
                        views: { 
                            'subpage': {
                                templateUrl: PATHS.partials + "tabpage/subpage2.html",
                            }
                        }
                    })
                    // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/app/login');
            }
        ]);
}());
