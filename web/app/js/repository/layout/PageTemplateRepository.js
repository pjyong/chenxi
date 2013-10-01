define([
    'marionette',
    'model/layout/PageTemplateModel',
    'collection/layout/PageTemplateCollection'
], function(
    Marionette,
    PageTemplateModel,
    PageTemplateCollection
){
    var pageTemplateRepository = Marionette.Controller.extend({

        getPageTemplates: function(){
            var deferred = $.Deferred();
            var pageTemplates = new PageTemplateCollection();
            pageTemplates.on('sync', function(){
                deferred.resolve(pageTemplates);
            });
            pageTemplates.fetch();
            return deferred.promise();
        },

        createPageTemplate: function(pageTemplate){
            var deferred = $.Deferred();
            pageTemplate.on('sync', function(pageTemplate, response){
                deferred.resolve(response);
            });
            pageTemplate.save();
            return deferred.promise();
        },

        deletePageTemplate: function(pageTemplate){
            var deferred = $.Deferred();
            pageTemplate.on('sync', function(pageTemplate, response, options){
                deferred.resolve(options);
            });
            pageTemplate.destroy();
            return deferred.promise();
        },

        getPageTemplate: function(id){
            var deferred = $.Deferred();
            //
            if(_.isUndefined(id)){
                // create new model
                var pageTemplate = new PageTemplateModel();
                deferred.resolve(pageTemplate);
            }else{
                this._getPageTemplate(id, function(pageTemplate){
                    deferred.resolve(pageTemplate);
                });
            }
            return deferred.promise();
        },

        _getPageTemplate: function(id, callback){
            var pageTemplate = new PageTemplateModel({id: id});
            pageTemplate.on('sync', callback);
            pageTemplate.fetch();
        },



    });  

    return pageTemplateRepository;
});