define([
    'marionette',
    'model/content/GalleryModel'
], function(
    Marionette,
    GalleryModel
){
    var galleryCollection = Backbone.Collection.extend({
        model: GalleryModel,
        url: 'api/content/galleries'
    });

    return galleryCollection;
});