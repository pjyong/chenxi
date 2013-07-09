define([
    'marionette',
    'model/content/ArticleModel'
], function(
    Marionette,
    ArticleModel
){
    var articleCollection = Backbone.Collection.extend({
        model: ArticleModel,
        url: 'api/content/articles'
    });

    return articleCollection;
});