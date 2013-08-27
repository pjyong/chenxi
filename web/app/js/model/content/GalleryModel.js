define([
    'marionette',
    // 'collection/content/TagCollection'
], function(
    Marionette
    // TagCollection
){
    var galleryModel = Backbone.Model.extend({
        defaults: {
            title: '',
            description: '',
            created_date: ''
        },

        initialize: function(){
        },

        urlRoot: 'api/content/galleries',
    });

    return galleryModel;
});