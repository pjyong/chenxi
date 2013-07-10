define([
    'marionette',
    'vent',
    'view/BreadcrumbView'
    
], function(
    Marionette,
    vent,
    BreadcrumbView
){

    var app = new Marionette.Application();

    app.addRegions({
        contentRegion: '#page-content'
    });

    // show breadcrumb view
    var breadcrumbView = new BreadcrumbView({el: '#breadcrumbs'});

    app.on("initialize:after", function(){
        if(Backbone.history){
            Backbone.history.start();
        }
    });

    app.startSubApp = function(appName, args){
        // 
        var pos = appName.lastIndexOf('.');
        if(pos !== -1){
            var parentApp = app.module(appName.slice(0, pos));
        }else{
            var parentApp = app;
        }
        var currentApp = app.module(appName);
        if(parentApp.currentApp === currentApp){ 
            return; 
        }
        if (parentApp.currentApp){
          parentApp.currentApp.stop();
        }
        parentApp.currentApp = currentApp;
        currentApp.start(args);
    };

    return app;
});