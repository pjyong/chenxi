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
            contentId: '',
            contentType: ''
        },

        initialize: function(){
        },

        urlRoot: function(){
            var contentId = this.get('contentId');
            var contentType = this.get('contentType');
            if(contentType == 'gallery'){
                return 'api/content/galleries/' + contentId + '/images';
            }
        },
    });

    return imageModel;
});