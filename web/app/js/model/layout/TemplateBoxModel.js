define([
    'marionette',
], function(
    Marionette
){
    return Backbone.Model.extend({

        defaults: {
            positionId: '',
            cssCode: '',
            boxTypeId: '',
            columnTemplateId: ''
        },

        initialize: function(){
        },

        urlRoot: 'api/layout/templateboxes',
    });
});