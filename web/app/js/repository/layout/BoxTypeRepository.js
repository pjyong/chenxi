define([
    'marionette',
    'model/layout/BoxTypeModel',
    'collection/layout/BoxTypeCollection'
], function(
    Marionette,
    BoxTypeModel,
    BoxTypeCollection
){
    var boxTypeRepository = Marionette.Controller.extend({

        getBoxTypes: function(){
            var deferred = $.Deferred();
            var boxTypes = new BoxTypeCollection();
            boxTypes.on('sync', function(){
                deferred.resolve(boxTypes);
            });
            boxTypes.fetch();
            return deferred.promise();
        },

        createBoxType: function(boxType){
            var deferred = $.Deferred();
            boxType.on('sync', function(boxType, response){
                deferred.resolve(boxType);
            });
            boxType.save();
            return deferred.promise();
        },

        deleteBoxType: function(boxType){
            var deferred = $.Deferred();
            boxType.on('sync', function(boxType, response, options){
                deferred.resolve(options);
            });
            boxType.destroy();
            return deferred.promise();
        },

        getBoxType: function(id){
            var deferred = $.Deferred();
            //
            if(_.isUndefined(id)){
                // create new model
                var boxType = new BoxTypeModel();
                deferred.resolve(boxType);
            }else{
                this._getBoxType(id, function(boxType){
                    deferred.resolve(boxType);
                });
            }
            return deferred.promise();
        },

        _getBoxType: function(id, callback){
            var boxType = new BoxTypeModel({id: id});
            boxType.on('sync', callback);
            boxType.fetch();
        },



    });  

    return boxTypeRepository;
});