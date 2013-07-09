define([
    'marionette',
    'app',
    'controller/DashboardController',
    'router/DashboardRouter',
], function(
    Marionette,
    app,
    DashboardController,
    DashboardRouter
){
    var dashboard = app.module('m.dashboard');

    content.startWithParent = false;
    // add router into App

    content.addInitializer(function(){
        content.controller = new ContentController();
    });

    app.addInitializer(function(){
        var router = new ContentRouter();
    });

    return content;
    
});