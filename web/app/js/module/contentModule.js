define([
    'marionette',
    'app',
    'controller/ContentController',
    'controller/content/ArticleController',
    'router/ContentRouter',
], function(
    Marionette,
    app,
    ContentController,
    ArticleController,
    ContentRouter
){
    var content = app.module('m.content');

    content.startWithParent = false;
    // add router into App

    content.addInitializer(function(){
        // content.controller = new ContentController();
    });


    content.loadController = function(name){
        if(name === 'article'){
            this.controller = new ArticleController();
        }

        return this.controller;
    };

    app.addInitializer(function(){
        var router = new ContentRouter();
    });

    return content;
    
});