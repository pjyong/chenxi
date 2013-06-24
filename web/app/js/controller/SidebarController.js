define([
    'marionette',
    'vent',
    'controller/AppController',
    'view/SidebarView',
], function(
    Marionette,
    vent,
    AppController,
    SidebarView
){
    return AppController.extend({
        initialize: function(){
            this.sidebarView = new SidebarView({el: '#sidebar'});
        },

        activeNav: function(args){
            
            this.sidebarView.activeNav(args);

        },
    });
    
});