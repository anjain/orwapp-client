'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('app', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'ui.validate',
    'app.filters',
    'app.services',
    'app.directives',
    'app.controllers'
  ])
.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;        
    }
  ]
)
.constant('_', window._)
.config(
  [          '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        
        $urlRouterProvider
            .otherwise('/app/dashboard');
        $stateProvider 
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'tpl/app.html', 
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'tpl/dashboard.html'
            })            
            //courses
            .state('app.courses', {
                url: '/courses',
                template: '<div ui-view></div>'                
            })
            .state('app.courses.listing', {
                url: '/listingcourses',
                templateUrl: 'tpl/listing_courses.html'
            })
            .state('app.courses.new', {
                url: '/newcourse',
                templateUrl: 'tpl/new_course.html'                
            })
            .state('app.courses.detail', {
                url: '/{testId:[0-9]{1,4}}',
                templateUrl: 'tpl/test_detail.html'
            })   
                     
       }
  ]
)

