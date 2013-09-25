define([
    'marionette',
    'app',
    'controller/ContentController',
    'controller/content/ArticleController',
    'controller/content/GalleryController',
    'controller/content/PageController',
    'router/ContentRouter',
], function(
    Marionette,
    app,
    ContentController,
    ArticleController,
    GalleryController,
    PageController,
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
        }else if(name === 'page' && this.controllerType != 'page'){
            if(!_.isUndefined(this.controller)){
                this.controller.close();
            }
            this.controller = new PageController();
        }else if(name === 'gallery' && this.controllerType != 'gallery'){
            if(!_.isUndefined(this.controller)){
                this.controller.close();
            }
            this.controller = new GalleryController();
        }
        this.controllerType = name;
        return this.controller;
    };

    content.on("before:stop", function(){
        // close controller and remove it
        content.controller.close();
        delete content.controller;
        delete content.controllerType;
    });

    app.addInitializer(function(){
        var router = new ContentRouter();
    });

    return content;
    
});