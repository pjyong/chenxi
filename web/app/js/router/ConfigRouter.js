define([
    'marionette',
    'app',
], function(
    Marionette,
    app
){
    return Backbone.Router.extend({

        routes: {
            'config/website': 'editWebsite',
            
        },

        before: function(){
            app.startSubApp('m.config');
        },

        after: function(){
            
        },

        editWebsite: function(){
            app.module('sidebar').controller.activeNav({nav: '#config/website'});
            app.module('m.config').loadController('website').editWebsite();
        }



    });  
});