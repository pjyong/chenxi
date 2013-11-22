define([
    'marionette',
    'vent',
    'controller/AppController',
    'view/content/GalleryEditView',
    'view/content/GalleryIndexView',
    'view/content/GalleryImageIndexView',
    'view/content/GalleryImageAddView',
    'repository/content/GalleryRepository',
    'view/modal/MediaLibraryView',
    'view/common/TemplateOptionsView',
    'view/content/GalleryImageEditView',
    'repository/content/ImageRepository',
    'ckeditor',
    'bootstrap.datetimepicker',
    'jquery.tagsinput',
    'jquery.chosen',
    'dropzone'
], function(
    Marionette,
    vent,
    AppController,
    GalleryCreateView,
    GalleryIndexView,
    GalleryImageIndexView,
    GalleryImageAddView,
    GalleryRepository,
    MediaLibraryView,
    TemplateOptionsView,
    GalleryImageEditView,
    ImageRepository
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
            _.bindAll(this, 'submitGallery', 'deleteGallery', 'loadMediaLibrary', 'editImage', 'saveImage', 'deleteImage');
            vent.on('galleryController:submitGallery', this.submitGallery);
            vent.on('galleryController:deleteGallery', this.deleteGallery);
            vent.on('galleryController:loadMediaLibrary', this.loadMediaLibrary);
            vent.on('galleryController:editImage', this.editImage);
            vent.on('galleryController:saveImage', this.saveImage);
            vent.on('galleryController:deleteImage', this.deleteImage);

        },

        getGalleries: function(){
            var that = this;
            var galleryRepository = new GalleryRepository();
            var callback = function(gallerys){
                var galleryIndexView = new GalleryIndexView({collection: gallerys});
                that.contentRegion.show(galleryIndexView);
                that.endLoading();


                var container = galleryIndexView.$('#gallery_list');
                container.isotope({
                    itemSelector: '.gallery_item',
                    masonry : {
                        columnWidth : 210
                    },
                    containerStyle: {
                        overflow: 'visible',
                        position: 'relative'
                    },
                    
                });
                
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
                // 
                var editGalleryView = new GalleryCreateView({model: gallery});
                that.contentRegion.show(editGalleryView);
                // that.loadModal(editGalleryView);
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

        getImages: function(galleryId){
            var that = this;
            var galleryRepository = new GalleryRepository();
            var callback = function(images, gallery){
                // set the property of models
                images.each(function(ele){
                    ele.set({contentId: gallery.get('id'), contentType: 'gallery'});
                });
                var galleryImageIndexView = new GalleryImageIndexView({collection: images, gallery: gallery});
                that.contentRegion.show(galleryImageIndexView);
                that.endLoading();
                // $('[data-toggle="tooltip"]').tooltip();
                // console.log(images);
            };
            that.startLoading();
            $.when(galleryRepository.getImages(galleryId), galleryRepository.getGallery(galleryId)).then(callback);

        },

        addGalleryImage: function(galleryId){
            var that = this;
            var galleryRepository = new GalleryRepository();
            var callback = function(gallery){
                var galleryImageAddView = new GalleryImageAddView({gallery: gallery});
                that.contentRegion.show(galleryImageAddView);
                galleryImageAddView.$('.dropzone').dropzone({
                    url: 'api/content/galleries/'+gallery.get('id')+'/images',
                    paramName: "file", // The name that will be used to transfer the file
                    maxFilesize: 0.5, // MB
                  
                    addRemoveLinks : true,
                    dictDefaultMessage :'<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 将照片拖到这里</span> \
                    <span class="smaller-80 grey">(或者 点击选择照片)</span> <br /> \
                    <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
                    dictResponseError: '上传图片故障!',
                    
                    //change the previewTemplate to use Bootstrap progress bars
                    previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-success progress-striped active\"><span class=\"bar\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
                    sending: function(file, xhr, formData){
                        // 准备相应的数据
                        formData.append('name', 'xxxxxxxxxxxxxx');
                    }

                });
                that.endLoading();
                // $('[data-toggle="tooltip"]').tooltip();
                // console.log(images);
            };
            that.startLoading();
            $.when(galleryRepository.getGallery(galleryId)).then(callback);
        },

        editImage: function(options){
            var galleryImageEditView = new GalleryImageEditView({model: options.model});
            this.loadModal(galleryImageEditView);
        },

        deleteImage: function(options){
            var that = this;
            var imageRepository = new ImageRepository();
            var callback = function(image){
                that.endLoading();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '删除图片成功!',
                    // (string | mandatory) the text inside the notification
                    text: '',
                    class_name: 'gritter-success'
                });

            };
            that.startLoading();

            $.when(imageRepository.deleteImage(options.model)).then(callback);

        },

        saveImage: function(options){
            var that = this;
            var imageRepository = new ImageRepository();
            var callback = function(image){
                that.endLoading();
                that.closeModal();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '修改图片信息成功!',
                    // (string | mandatory) the text inside the notification
                    text: '',
                    class_name: 'gritter-success'
                });

            };
            that.startLoading();

            $.when(imageRepository.createImage(options.model)).then(callback);
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
            vent.off('galleryController:editImage');
            vent.off('galleryController:saveImage');
            vent.off('galleryController:deleteImage');
        },

        test: function(){alert('successful');}
    });
    
});