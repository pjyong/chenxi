define([
    'marionette', 
    'text!template/BreadcrumbTemplate.html',
], function(
    Marionette, 
    BreadcrumbTemplate
){

    return Marionette.ItemView.extend({
        template: function(){
            // return _.template(BreadcrumbTemplate, data, {variable: 'args'});
            return BreadcrumbTemplate;
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