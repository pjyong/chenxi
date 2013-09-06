define([
    'marionette',
    // 'collection/content/TagCollection'
], function(
    Marionette
    // TagCollection
){
    var imageModel = Backbone.Model.extend({
        defaults: {
            name: '',
            path: '',
        },

        initialize: function(){
        },

        urlRoot: 'api/content/images',
    });

    return imageModel;
});