define([
    'marionette', 
    'text!template/modal/MediaLibrary.html',
], function(
    Marionette, 
    MediaLibraryTemplate
){

    return Marionette.ItemView.extend({
        template: function(){
            // return _.template(BreadcrumbTemplate, data, {variable: 'args'});
            return MediaLibraryTemplate;
        },

        ui: {
        },

        events: {
        },        

        regions: {
            
        },

        initialize: function(){
            this.render();
        },
    });
});