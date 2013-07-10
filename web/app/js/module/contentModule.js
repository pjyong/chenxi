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
        this.controllerType = '';
    });


    content.loadController = function(name){

        if(name === 'article' && this.controllerType != 'article'){
            if(!_.isUndefined(this.controller)){
                this.controller.close();
            }
            this.controller = new ArticleController();
        }
        this.controllerType = name;
        return this.controller;
    };

    app.addInitializer(function(){
        var router = new ContentRouter();
    });

    return content;
    
});