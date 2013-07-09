define([
    'marionette',
    'collection/content/TagCollection'
], function(
    Marionette,
    TagCollection
){
    var articleModel = Backbone.Model.extend({
        defaults: {
            title: '',
            body: '',
            start_date: '',
            end_date: '',
        },

        parse: function(response, options){
            // convert the tags data into collection
            if(!_.isEmpty(response.tags)){
                this.set('tags', new TagCollection(response.tags));
            }
            delete response.tags;
            return response;
        },

        initialize: function(){
        },

        urlRoot: 'api/content/articles',
    });

    return articleModel;
});