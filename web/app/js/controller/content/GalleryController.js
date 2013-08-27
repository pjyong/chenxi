define([
    'marionette',
    'vent',
    'controller/AppController',
    'view/content/GalleryEditView',
    'view/content/GalleryIndexView',
    'repository/content/GalleryRepository',
    'view/modal/MediaLibraryView',
    'view/common/TemplateOptionsView',
    'ckeditor',
    'bootstrap.datetimepicker',
    'jquery.tagsinput',
    'jquery.chosen'
], function(
    Marionette,
    vent,
    AppController,
    GalleryCreateView,
    GalleryIndexView,
    GalleryRepository,
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
            _.bindAll(this, 'submitGallery', 'deleteGallery', 'loadMediaLibrary');
            vent.on('galleryController:submitGallery', this.submitGallery);
            vent.on('galleryController:deleteGallery', this.deleteGallery);
            vent.on('galleryController:loadMediaLibrary', this.loadMediaLibrary);

        },

        getGalleries: function(){
            var that = this;
            var galleryRepository = new GalleryRepository();
            var callback = function(gallerys){
                var galleryIndexView = new GalleryIndexView({collection: gallerys});
                that.contentRegion.show(galleryIndexView);
                that.endLoading();
                $('[data-toggle="tooltip"]').tooltip();
            };
            that.startLoading();
            $.when(galleryRepository.getGallerys()).then(callback); 
        },

        deleteGallery: function(options){
            var that = this;
            var galleryRepository = new GalleryRepository();
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
            $.when(galleryRepository.deleteGallery(options.model)).then(callback);
        },

        // add or edit gallery
        editGallery: function(id){
            var that = this;
            // create repository
            var galleryRepository = new GalleryRepository();
            var callback = function(gallery){
                var editGalleryView = new GalleryCreateView({model: gallery});
                that.contentRegion.show(editGalleryView);
                var ckeditor = CKEDITOR.replace('content_body');
                editGalleryView.$('.datetimepicker').datetimepicker();
                editGalleryView.$('.ace-popover').popover();
                // convert the tags of gallery into string
                $tags = gallery.get('tags');
                if(_.isObject($tags) && !_.isEmpty($tags)){
                    editGalleryView.$('.tags').val(convertTagsToString($tags));
                }
                editGalleryView.$('.tags').tagsInput({defaultText: '添加标签'});
                that.endLoading();

                // load template options view
                var templateOptions = new TemplateOptionsView();
                templateOptions.$el.find('.templates-select').chosen();
            };
            that.startLoading();
            $.when(galleryRepository.getGallery(id)).then(callback);
        },

        submitGallery: function(options){
            var that = this;
            var galleryRepository = new GalleryRepository();
            // console.log('start');
            var callback = function(gallery){
                that.endLoading();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '发布相册成功!',
                    // (string | mandatory) the text inside the notification
                    text: '',
                    class_name: 'gritter-success'
                });
            };
            that.startLoading();

            $.when(galleryRepository.createGallery(options.model)).then(callback);
        },

        loadMediaLibrary: function(){
            this.loadModal(new MediaLibraryView());
        },

        onClose: function(){
            vent.off('galleryController:submitGallery');
            vent.off('galleryController:deleteGallery');
            vent.off('galleryController:loadMediaLibrary');
        },

        test: function(){alert('successful');}
    });
    
});