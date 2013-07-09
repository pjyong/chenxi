define([
    'marionette',
    'model/content/TagModel'
], function(
    Marionette,
    TagModel
){
    var tagCollection = Backbone.Collection.extend({
        model: TagModel,
    });

    return tagCollection;
});