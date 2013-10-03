define([
    'marionette',
    'app',
], function(
    Marionette,
    app
){
    return Backbone.Router.extend({

        routes: {
            'layout/template': 'getPageTemplates',
            'layout/template/add': 'editPageTemplate',
            'layout/templates/edit/:id': 'addColumnsToPageTemplate',
        },

        before: function(){
            app.startSubApp('m.layout');
        },

        after: function(){
            
        },

        getPageTemplates: function(){
            app.module('sidebar').controller.activeNav({nav: '#layout/template'});
            app.module('m.layout').loadController('page_template').getPageTemplates();
            
        },

        editPageTemplate: function(){
            app.module('sidebar').controller.activeNav({nav: '#layout/template'});
            app.module('m.layout').loadController('page_template').editPageTemplate();

        },

        addColumnsToPageTemplate: function(id){
            app.module('sidebar').controller.activeNav({nav: '#layout/template'});
            app.module('m.layout').loadController('custom_template').addColumnsToPageTemplate(id);

        }


    });  
});