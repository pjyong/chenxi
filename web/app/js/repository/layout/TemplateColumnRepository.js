define([
    'marionette',
    'model/layout/TemplateColumnModel',
    'collection/layout/TemplateColumnCollection'
], function(
    Marionette,
    TemplateColumnModel,
    TemplateColumnCollection
){
    return Marionette.Controller.extend({

        // 获得该模板的所有列和所有区块
        getTemplateColumns: function(pageTemplateId){
            var deferred = $.Deferred();
            var templateColumns = new TemplateColumnCollection({pageTemplateId: pageTemplateId});
            templateColumns.on('sync', function(){
                deferred.resolve(templateColumns);
            });
            templateColumns.fetch();
            return deferred.promise();
        },

        createTemplateColumn: function(pageTemplate){
            var deferred = $.Deferred();
            pageTemplate.on('sync', function(pageTemplate, response){
                deferred.resolve(pageTemplate);
            });
            pageTemplate.save();
            return deferred.promise();
        },

        deleteTemplateColumn: function(pageTemplate){
            var deferred = $.Deferred();
            pageTemplate.on('sync', function(pageTemplate, response, options){
                deferred.resolve(options);
            });
            pageTemplate.destroy();
            return deferred.promise();
        },

        getTemplateColumn: function(id){
            var deferred = $.Deferred();
            //
            if(_.isUndefined(id)){
                // create new model
                var pageTemplate = new TemplateColumnModel();
                deferred.resolve(pageTemplate);
            }else{
                this._getTemplateColumn(id, function(pageTemplate){
                    deferred.resolve(pageTemplate);
                });
            }
            return deferred.promise();
        },

        _getTemplateColumn: function(id, callback){
            var pageTemplate = new TemplateColumnModel({id: id});
            pageTemplate.on('sync', callback);
            pageTemplate.fetch();
        },



    });  
});