define([
    'marionette',
    'app',
    'controller/ContentController',
    'router/ContentRouter',
], function(
    Marionette,
    app,
    ContentController,
    ContentRouter
){
    var content = app.module('m.content');

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