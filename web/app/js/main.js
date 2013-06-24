require.config({
    baseUrl: '/app/js',
    paths : {
        jquery: 'lib/jquery.min',
        jqueryui: 'lib/jquery-ui-1.10.3/ui/jquery-ui',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        localStorage: 'lib/backbone.localStorage',
        ckeditor: 'lib/ckeditor/ckeditor',
        'jquery.tagsinput': 'lib/jquery.tagsinput.min',
        'backbone.routerilter': 'lib/backbone.routefilter',
        'backbone.wreqr': 'lib/backbone.wreqr',
        'backbone.babysitter': 'lib/backbone.babysitter',
        'bootstrap': 'lib/bootstrap/bootstrap.min',
        'moment': 'lib/bootstrap/moment.min',
        // 'bootstrap.tooltip': 'lib/bootstrap/bootstrap-tooltip',
        'bootstrap.daterangepicker': 'lib/bootstrap/daterangepicker',
        'bootstrap.datetimepicker': 'lib/bootstrap/bootstrap-datetimepicker.min',
        marionette: 'lib/backbone.marionette',
        text: 'lib/text'
    },
    shim : {
        jquery: {
            exports: '$'
        },
        underscore : {
            exports : '_'
        },
        jqueryui: {
            deps: ['jquery']
        },
        'jquery.tagsinput': {
            deps: ['jquery']
        },
        backbone : {
            deps : ['jquery','underscore', 'bootstrap'],
            exports : 'Backbone'
        },
        'backbone.routerilter': {
            deps: ['backbone']
        },
        'backbone.wreqr': {
            deps: ['backbone']
        },
        'backbone.babysitter': {
            deps: ['backbone']
        },
        bootstrap: {
            deps: ['jquery'],
        },
        
        'bootstrap.datetimepicker': {
            deps: ['bootstrap'],
        },
        'bootstrap.daterangepicker': {
            deps: ['bootstrap', 'moment']
        },
        marionette : {
            deps : ['backbone', 'backbone.wreqr', 'backbone.babysitter', 'backbone.routerilter'],
        },
        
    },
});
require([
    'app',
    'module/sidebarModule',
    'module/contentModule',
    'vent',
], function(
    app
){
    app.start();
});
