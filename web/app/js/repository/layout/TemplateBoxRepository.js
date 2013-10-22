define([
    'marionette',
    'model/layout/TemplateBoxModel',
    'collection/layout/TemplateBoxCollection'
], function(
    Marionette,
    TemplateBoxModel,
    TemplateBoxCollection
){
    var templateBoxRepository = Marionette.Controller.extend({

        getTemplateBoxes: function(){
            var deferred = $.Deferred();
            var templateBoxes = new TemplateBoxCollection();
            templateBoxes.on('sync', function(){
                deferred.resolve(templateBoxes);
            });
            templateBoxes.fetch();
            return deferred.promise();
        },

        createTemplateBox: function(templateBox){
            var deferred = $.Deferred();
            templateBox.on('sync', function(templateBox, response){
                deferred.resolve(templateBox);
            });
            templateBox.save();
            return deferred.promise();
        },

        deleteTemplateBox: function(templateBox){
            var deferred = $.Deferred();
            templateBox.on('sync', function(templateBox, response, options){
                deferred.resolve(options);
            });
            templateBox.destroy();
            return deferred.promise();
        },

        getTemplateBox: function(id){
            var deferred = $.Deferred();
            //
            if(_.isUndefined(id)){
                // create new model
                var templateBox = new TemplateBoxModel();
                deferred.resolve(templateBox);
            }else{
                this._getTemplateBox(id, function(templateBox){
                    deferred.resolve(templateBox);
                });
            }
            return deferred.promise();
        },

        _getTemplateBox: function(id, callback){
            var templateBox = new TemplateBoxModel({id: id});
            templateBox.on('sync', callback);
            templateBox.fetch();
        },



    });  

    return templateBoxRepository;
});