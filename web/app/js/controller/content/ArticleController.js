define([
    'marionette',
    'vent',
    'controller/AppController',
    'view/content/ArticleEditView',
    'view/content/ArticleIndexView',
    'repository/content/ArticleRepository',
    'view/modal/MediaLibraryView',
    'ckeditor',
    'bootstrap.daterangepicker',
    'jquery.tagsinput',
], function(
    Marionette,
    vent,
    AppController,
    ArticleCreateView,
    ArticleIndexView,
    ArticleRepository,
    MediaLibraryView
){
    // helper function 
    function convertTagsToString(tagCollection){
        var str = '';
        tagCollection.each(function(model){
            str += ',' + model.get('name');
        });
        return str.substring(1);
    }


    return AppController.extend({


        initialize: function(){
            _.bindAll(this, 'submitArticle', 'deleteArticle', 'loadMediaLibrary');
            vent.on('articleController:submitArticle', this.submitArticle);
            vent.on('articleController:deleteArticle', this.deleteArticle);
            vent.on('articleController:loadMediaLibrary', this.loadMediaLibrary);

        },

        getArticles: function(){
            var that = this;
            var articleRepository = new ArticleRepository();
            var callback = function(articles){
                var articleIndexView = new ArticleIndexView({collection: articles});
                that.contentRegion.show(articleIndexView);
                that.endLoading();
                $('[data-toggle="tooltip"]').tooltip();
            };
            that.startLoading();
            $.when(articleRepository.getArticles()).then(callback); 

        },

        deleteArticle: function(options){
            var that = this;
            var articleRepository = new ArticleRepository();
            var callback = function(options){
                if(204 === options.xhr.status){
                    // delete successfully
                    $.gritter.add({
                        // (string | mandatory) the heading of the notification
                        title: '删除文章成功!',
                        // (string | mandatory) the text inside the notification
                        text: '',
                        class_name: 'gritter-success'
                    });
                    that.endLoading();
                }
            };
            that.startLoading();
            $.when(articleRepository.deleteArticle(options.model)).then(callback);
        },

        // add or edit article
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
                // convert the tags of article into string
                $tags = article.get('tags');
                if(_.isObject($tags) && !_.isEmpty($tags)){
                    editArticleView.$('.tags').val(convertTagsToString($tags));
                }
                editArticleView.$('.tags').tagsInput({defaultText: '添加标签'});
                that.endLoading();
            };
            that.startLoading();
            $.when(articleRepository.getArticle(id)).then(callback);
        },

        submitArticle: function(options){
            var that = this;
            var articleRepository = new ArticleRepository();
            // console.log('start');
            var callback = function(article){
                that.endLoading();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '发布文章成功!',
                    // (string | mandatory) the text inside the notification
                    text: '',
                    class_name: 'gritter-success'
                });
            };
            that.startLoading();

            $.when(articleRepository.createArticle(options.model)).then(callback);
        },

        loadMediaLibrary: function(){
            this.loadModal(new MediaLibraryView());
        },

        onClose: function(){
            vent.off('articleController:submitArticle');
            vent.off('articleController:deleteArticle');
            vent.off('articleController:loadMediaLibrary');
        },

        test: function(){alert('successful');}
    });
    
});