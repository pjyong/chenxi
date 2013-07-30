define([
    'marionette',
    'app',
    'router/ConfigRouter',
    'controller/config/WebsiteController'
], function(
    Marionette,
    app,
    ConfigRouter,
    WebsiteController
){
    var config = app.module('m.config');

    config.startWithParent = false;
    // add router into App

    config.addInitializer(function(){
    });


    config.loadController = function(name){
        // console.log(this.con);
        if(name === 'website' && this.controllerType != 'website'){
            if(!_.isUndefined(this.controller)){
                this.controller.close();
            }
            this.controller = new WebsiteController();
        }
        this.controllerType = name;
        return this.controller;
    };

    config.on("before:stop", function(){
        config.controller.close();
        delete config.controller;
        delete config.controllerType;
    });


    app.addInitializer(function(){
        var router = new ConfigRouter();
    });



    return config;
    
});