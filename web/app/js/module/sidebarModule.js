define([
    'marionette',
    'app',
    'controller/SidebarController'  
], function(
    Marionette,
    app,
    sidebarController
){
    var sidebar = app.module('sidebar');

    // follow the main app
    sidebar.startWithParent = true;

    sidebar.addInitializer(function(args){
        sidebar.controller = new sidebarController();        
    });

    sidebar.addFinalizer(function(args){

    });

    return sidebar;
    
});