define([
    'marionette',
    'vent',
    'controller/AppController',

    'collection/layout/PageTemplateCollection',

    'repository/layout/PageTemplateRepository',

    'view/content/ArticleEditView',
    'view/content/ArticleIndexView',
    'repository/content/ArticleRepository',
    'view/modal/MediaLibraryView',
    'view/common/TemplateOptionsView',

    'ckeditor',
    'bootstrap.daterangepicker',
    'jquery.tagsinput',
    'jquery.chosen',
    'jquery.isotope',
    'dropzone'
], function(
    Marionette,
    vent,
    AppController,

    PageTemplateCollection,

    PageTemplateRepository,

    ArticleCreateView,
    ArticleIndexView,
    ArticleRepository,
    MediaLibraryView,
    TemplateOptionsView
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
                // 
                var container = articleIndexView.$('#article_list_div');
                container.isotope({
                    itemSelector: '.article_item',
                    masonry : {
                        columnWidth : 210
                    },
                    containerStyle: {
                        overflow: 'visible',
                        position: 'relative'
                    },
                    
                });
                container.delegate( '.article_item', 'click', function(){
                    $(this).toggleClass('large_item');
                    container.isotope('reLayout');
                });
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
            var pageTemplateRepository = new PageTemplateRepository();
            var callback = function(article, pageTemplates){


                var startDate = article.get('start_date');
                startObj = startDate ? moment(startDate) : moment();
                article.set('start_date', startObj.format('MM/DD/YYYY h:mm A'));
                var endDate = article.get('end_date');
                // 创建文章时默认添加一年
                endObj = endDate ? moment(endDate) : moment().add('years', 1);
                article.set('end_date', endObj.format('MM/DD/YYYY h:mm A'));


                var editArticleView = new ArticleCreateView({model: article});
                that.contentRegion.show(editArticleView);
                var ckeditor = CKEDITOR.replace('content_body');

                editArticleView.$('#content_date').daterangepicker(
                    { 
                        timePicker: true, 
                        timePickerIncrement: 1, 
                        format: 'MM/DD/YYYY h:mm A', 
                        startDate: startObj, 
                        endDate: endObj
                    }
                );

                // editArticleView.$('.ace-popover').popover();
                // convert the tags of article into string
                $tags = article.get('tags');
                if(_.isObject($tags) && !_.isEmpty($tags)){
                    editArticleView.$('.tags').val(convertTagsToString($tags));
                }
                editArticleView.$('.tags').tagsInput({defaultText: '添加标签'});
                // var defaultMsg = article.get('path') ? '<img src="http://cms.com/' + article.get('path') : '<i class="icon-picture blue icon-3x" style="cursor:pointer;"></i>';
                // 初始化封面
                editArticleView.$('.dropzone').dropzone({
                    url: 'api/content/articles/'+article.id+'/images',
                    paramName: "file", // The name that will be used to transfer the file
                    maxFilesize: 0.5, // MB
                  
                    addRemoveLinks : true,
                    dictDefaultMessage :'<i class="icon-picture blue icon-3x" style="cursor:pointer;"></i>',
                    dictResponseError: '上传图片故障!',
                    
                    //change the previewTemplate to use Bootstrap progress bars
                    previewTemplate: "<div class=\"dz-preview dz-file-preview\" style=\"display:none;\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-success progress-striped active\"><span class=\"bar\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
                    // previewTemplate: 'none',
                    // accept: function(file){
                    //     console.log(file);

                    // },
                    sending: function(file, xhr, formData){
                        // 准备相应的数据
                        formData.append('name', 'xxxxxxxxxxxxxx');
                    }

                });

                that.endLoading();

                // 载入模板列表
                var templateOptions = new TemplateOptionsView({pageTemplates: pageTemplates});
                templateOptions.$el.find('.templates-select').chosen();
            };
            that.startLoading();
            $.when(articleRepository.getArticle(id), pageTemplateRepository.getPageTemplates({contentType: 'article'})).then(callback);
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