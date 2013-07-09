define([
    'marionette',
], function(
    Marionette
){
    var tagModel = Backbone.Model.extend({
        defaults: {
            name: '',
            created_at: '',
            updated_at: '',
            slug: ''
        },

        initialize: function(){
        },

    });

    return tagModel;
});