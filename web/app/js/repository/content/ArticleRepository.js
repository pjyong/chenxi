define([
    'marionette',
    'model/content/ArticleModel',
    'collection/content/ArticleCollection'
], function(
    Marionette,
    ArticleModel,
    ArticleCollection
){
    var articleRepository = Marionette.Controller.extend({

        getArticles: function(){
            var deferred = $.Deferred();
            var articles = new ArticleCollection();
            articles.on('sync', function(){
                deferred.resolve(articles);
            });
            articles.fetch();
            return deferred.promise();
        },

        createArticle: function(article){
            var deferred = $.Deferred();
            article.on('sync', function(article, response){
                deferred.resolve(response);
            });
            article.save();
            return deferred.promise();
        },

        deleteArticle: function(article){
            var deferred = $.Deferred();
            article.on('sync', function(article, response, options){
                deferred.resolve(options);
            });
            article.destroy();
            return deferred.promise();
        },

        getArticle: function(id){
            var deferred = $.Deferred();
            //
            if(_.isUndefined(id)){
                // create new model
                var article = new ArticleModel();
                deferred.resolve(article);
            }else{
                this._getArticle(id, function(article){
                    deferred.resolve(article);
                });
            }
            return deferred.promise();
        },

        _getArticle: function(id, callback){
            var article = new ArticleModel({id: id});
            article.on('sync', callback);
            article.fetch();
        },



    });  

    return articleRepository;
});