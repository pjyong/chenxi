define([
    'marionette',
    'model/content/ImageModel',
    'collection/content/ImageCollection'
], function(
    Marionette,
    ImageModel,
    ImageCollection
){
    var imageRepository = Marionette.Controller.extend({

        getImages: function(){
            var deferred = $.Deferred();
            var images = new ImageCollection();
            images.on('sync', function(){
                deferred.resolve(images);
            });
            images.fetch();
            return deferred.promise();
        },

        createImage: function(image){
            var deferred = $.Deferred();
            image.on('sync', function(image, response){
                deferred.resolve(response);
            });
            image.save();
            return deferred.promise();
        },

        deleteImage: function(image){
            var deferred = $.Deferred();
            image.on('sync', function(image, response, options){
                deferred.resolve(options);
            });
            image.destroy();
            return deferred.promise();
        },

        getImage: function(id){
            var deferred = $.Deferred();
            //
            if(_.isUndefined(id)){
                // create new model
                var image = new ImageModel();
                deferred.resolve(image);
            }else{
                this._getImage(id, function(image){
                    deferred.resolve(image);
                });
            }
            return deferred.promise();
        },

        _getImage: function(id, callback){
            var image = new ImageModel({id: id});
            image.on('sync', callback);
            image.fetch();
        }



    });  

    return imageRepository;
});