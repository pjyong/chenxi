define([
    'marionette',
    'model/content/PageModel',
    'collection/content/PageCollection'
], function(
    Marionette,
    PageModel,
    PageCollection
){
    var pageRepository = Marionette.Controller.extend({

        getPages: function(){
            var deferred = $.Deferred();
            var pages = new PageCollection();
            pages.on('sync', function(){
                deferred.resolve(pages);
            });
            pages.fetch();
            return deferred.promise();
        },

        createPage: function(page){
            var deferred = $.Deferred();
            page.on('sync', function(page, response){
                deferred.resolve(response);
            });
            page.save();
            return deferred.promise();
        },

        deletePage: function(page){
            var deferred = $.Deferred();
            page.on('sync', function(page, response, options){
                deferred.resolve(options);
            });
            page.destroy();
            return deferred.promise();
        },

        getPage: function(id){
            var deferred = $.Deferred();
            //
            if(_.isUndefined(id)){
                // create new model
                var page = new PageModel();
                deferred.resolve(page);
            }else{
                this._getPage(id, function(page){
                    deferred.resolve(page);
                });
            }
            return deferred.promise();
        },

        _getPage: function(id, callback){
            var page = new PageModel({id: id});
            page.on('sync', callback);
            page.fetch();
        },



    });  

    return pageRepository;
});