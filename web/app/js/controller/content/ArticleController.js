define([
    'marionette',
    'vent',
    'controller/AppController',
    'view/content/ArticleEditView',
    'view/content/ArticleIndexView',
    'repository/content/ArticleRepository',
    'ckeditor',
    'bootstrap.daterangepicker',
    'jquery.tagsinput',
], function(
    Marionette,
    vent,
    AppController,
    ArticleCreateView,
    ArticleIndexView,
    ArticleRepository
){
    return AppController.extend({


        initialize: function(){
            _.bindAll(this, 'submitArticle');
            vent.on('contentModule:submitArticle', this.submitArticle);
        },

        getArticles: function(){
            var that = this;
            var articleRepository = new ArticleRepository();
            var callback = function(articles){
                var articleIndexView = new ArticleIndexView({collection: articles});
                that.contentRegion.show(articleIndexView);
            };
            $.when(articleRepository.getArticles()).then(callback);   
        },

        editArticle: function(id){
            var that = this;
            // create repository
            var articleRepository = new ArticleRepository();
            var callback = function(article){
                var editArticleView = new ArticleCreateView({model: article});
                that.contentRegion.show(editArticleView);
                var ckeditor = CKEDITOR.replace('content_body');
                editArticleView.$('#content_date').daterangepicker();
                editArticleView.$('.ace-popover').popover();
                editArticleView.$('.tags').tagsInput();
            };
            $.when(articleRepository.getArticle(id)).then(callback);
        },

        submitArticle: function(options){
            var articleRepository = new ArticleRepository();
            // console.log('start');
            var callback = function(article){
                console.log(article);
            };
            $.when(articleRepository.createArticle(options.model)).then(callback);
        },

        test: function(){alert('successful');}
    });
    
});