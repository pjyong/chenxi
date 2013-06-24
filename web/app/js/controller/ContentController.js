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
    // require(['']);
    return AppController.extend({


        initialize: function(){
            _.bindAll(this, 'submitArticle');
            vent.on('contentModule:submitArticle', this.submitArticle);
        },

        getArticles: function(){
            var articleIndexView = new ArticleIndexView();
            this.contentRegion.show(articleIndexView);
        },

        // createArticle: function(){
        //     var articleCreateView = new ArticleCreateView();
        //     this.contentRegion.show(articleCreateView);
        //     var ckeditor = CKEDITOR.replace('content_body');
        //     articleCreateView.$('#content-date').daterangepicker();
        //     articleCreateView.$('.ace-popover').popover();
        //     articleCreateView.$('.tags').tagsInput();
        // },

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
            // console.log(options.model);
        },

        // loadPages: function(){
        //     var contentIndexView = new ContentIndexView();
        //     this.contentRegion.show(contentIndexView);

        // },

        // createContent: function(args){
        //     var createContentView = new CreateContentView({type: args.type});
        //     this.contentRegion.show(createContentView);
        //     // load editor
        //     require(['ckeditor'], function(){
        //         if(!_.isUndefined(CKEDITOR.instances.content_body)){
        //         delete CKEDITOR.instances.content_body;
        //         // CKEDITOR.instances.content_body.destroy();
        //         }
        //         var ckeditor = CKEDITOR.replace('content_body');                
        //     });
        //     $('#content_date').datetimepicker();
        //     $('.tags').tagsInput();
        // },

        






    });
    
});