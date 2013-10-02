define([
    'marionette',
], function(
    Marionette
){
    var pageTemplateModel = Backbone.Model.extend({
        defaults: {
            name: '',
            contentType: '',
            isPrimary: false,
        },


        initialize: function(){
        },

        urlRoot: 'api/layout/templates',
    });

    return pageTemplateModel;
});