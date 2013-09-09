define([
    'marionette',
    'model/content/ImageModel'
], function(
    Marionette,
    ImageModel
){
    var imageCollection = Backbone.Collection.extend({
        model: ImageModel,
        // initialize: function()
    });

    return imageCollection;
});