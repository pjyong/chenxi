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
        },

        initialize: function(){
        },

        urlRoot: 'api/layout/templateboxes',
    });
});