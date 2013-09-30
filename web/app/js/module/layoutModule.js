define([
    'marionette',
    'app',
    'controller/LayoutController',
    'controller/layout/PageTemplateController',
    'router/LayoutRouter',
], function(
    Marionette,
    app,
    LayoutController,
    PageTemplateController,
    LayoutRouter
){
    var layout = app.module('m.layout');

    layout.startWithParent = false;
    // add router into App

    layout.addInitializer(function(){
        this.controllerType = '';
    });


    layout.loadController = function(name){
        if(name === 'page_template' && this.controllerType != 'page_template'){
            if(!_.isUndefined(this.controller)){
                this.controller.close();
            }
            this.controller = new PageTemplateController();
        }
        this.controllerType = name;
        return this.controller;
    };

    layout.on("before:stop", function(){
        // close controller and remove it
        layout.controller.close();
        delete layout.controller;
        delete layout.controllerType;
    });

    app.addInitializer(function(){
        var router = new LayoutRouter();
    });

    return layout;
    
});