define([
    'marionette',
    'model/content/ArticleModel',
], function(
    Marionette,
    ArticleModel
){
    var articleRepository = Marionette.Controller.extend({

        createArticle: function(article){
            var deferred = $.Deferred();
            article.on('sync', function(article, response){
                alert(response);
                deferred.resolve(response);
            });

            article.save();
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