define([
    'marionette',
    'vent',
    'controller/AppController',
    'view/content/PageEditView',
    'view/content/PageIndexView',
    'repository/content/PageRepository',
    'ckeditor',
    'bootstrap.daterangepicker',
    'jquery.tagsinput',
], function(
    Marionette,
    vent,
    AppController,
    PageCreateView,
    PageIndexView,
    PageRepository
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
            _.bindAll(this, 'submitPage', 'deletePage');
            vent.on('pageController:submitPage', this.submitPage);
            vent.on('pageController:deletePage', this.deletePage);

        },

        getPages: function(){
            var that = this;
            var pageRepository = new PageRepository();
            var callback = function(pages){
                var pageIndexView = new PageIndexView({collection: pages});
                that.contentRegion.show(pageIndexView);
                that.endLoading();
            };
            that.startLoading();
            $.when(pageRepository.getPages()).then(callback); 

        },

        deletePage: function(options){
            var that = this;
            var pageRepository = new PageRepository();
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
            $.when(pageRepository.deletePage(options.model)).then(callback);
        },

        // add or edit page
        editPage: function(id){
            var that = this;
            // create repository
            var pageRepository = new PageRepository();
            var callback = function(page){
                var editPageView = new PageCreateView({model: page});
                that.contentRegion.show(editPageView);
                var ckeditor = CKEDITOR.replace('content_body');
                editPageView.$('#content_date').daterangepicker();
                editPageView.$('.ace-popover').popover();
                // convert the tags of page into string
                $tags = page.get('tags');
                if(_.isObject($tags) && !_.isEmpty($tags)){
                    editPageView.$('.tags').val(convertTagsToString($tags));
                }
                editPageView.$('.tags').tagsInput({defaultText: '添加标签'});
                that.endLoading();
            };
            that.startLoading();
            $.when(pageRepository.getPage(id)).then(callback);
        },

        submitPage: function(options){
            var that = this;
            var pageRepository = new PageRepository();
            // console.log('start');
            var callback = function(page){
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

            $.when(pageRepository.createPage(options.model)).then(callback);
        },


        test: function(){alert('successful');}
    });
    
});