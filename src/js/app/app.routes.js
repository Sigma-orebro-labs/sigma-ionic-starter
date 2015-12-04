(function() {
    'use strict';
    angular.module('sigmaIonic')

        // ionics routing is based on angular ui-router. Read the docs if this does not make sense. 
        .config(['$stateProvider', '$urlRouterProvider', 'PATHS',
            function($stateProvider, $urlRouterProvider, PATHS) {
                $stateProvider
                    /*Abstract parent state, consider main.html our master layout */
                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: PATHS.partials + "main.html",
                        controller: 'appController'
                    })
                    /* mainContent = <ui-view> inside of main.html*/
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
                    /* views within views, this maps to the 'subpage'-view inside of the 'mainContent'-view
                    which exists inside the tabpage.html (loaded into mainContent under the app.tabpage $state) 
                    subpage = <ui-view> inside of of parent state html (tabpage.html)
                    */ 
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
                    // if none of the above states are matched, use this as the fallback. ie, default page. 
                $urlRouterProvider.otherwise('/app/login');
            }
        ]);
}());
