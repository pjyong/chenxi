define([
    'marionette',
    'model/content/GalleryModel',
    'collection/content/GalleryCollection',
    'collection/content/ImageCollection'
], function(
    Marionette,
    GalleryModel,
    GalleryCollection,
    ImageCollection
){
    var articleRepository = Marionette.Controller.extend({

        getGallerys: function(){
            var deferred = $.Deferred();
            var galleries = new GalleryCollection();
            galleries.on('sync', function(){
                deferred.resolve(galleries);
            });
            galleries.fetch();
            return deferred.promise();
        },

        createGallery: function(article){
            var deferred = $.Deferred();
            article.on('sync', function(article, response){
                deferred.resolve(response);
            });
            article.save();
            return deferred.promise();
        },

        deleteGallery: function(article){
            var deferred = $.Deferred();
            article.on('sync', function(article, response, options){
                deferred.resolve(options);
            });
            article.destroy();
            return deferred.promise();
        },

        getGallery: function(id){
            var deferred = $.Deferred();
            //
            if(_.isUndefined(id)){
                // create new model
                var article = new GalleryModel();
                deferred.resolve(article);
            }else{
                this._getGallery(id, function(article){
                    deferred.resolve(article);
                });
            }
            return deferred.promise();
        },

        getImages: function(galleryId){
            var deferred = $.Deferred();
            var images = new ImageCollection([], {url: 'api/content/galleries/' + galleryId + '/images'});
            images.on('sync', function(){
                deferred.resolve(images);
            });
            images.fetch();
            return deferred.promise();
        },

        _getGallery: function(id, callback){
            var gallery = new GalleryModel({id: id});
            gallery.on('sync', callback);
            gallery.fetch();
        },



    });  

    return articleRepository;
});