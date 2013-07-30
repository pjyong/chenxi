define([
    'marionette',
    'model/config/WebsiteModel'
], function(
    Marionette,
    WebsiteModel
){
    var websiteRepository = Marionette.Controller.extend({

        getWebsite: function(id){
            var deferred = $.Deferred();
            this._getWebsite(id, function(website){
                deferred.resolve(website);
            });
            
            return deferred.promise();
        },

        createWebsite: function(website){
            var deferred = $.Deferred();
            website.on('sync', function(website, response){
                deferred.resolve(response);
            });
            website.save();
            return deferred.promise();
        },

        _getWebsite: function(id, callback){
            var website = new WebsiteModel({id: id});
            website.on('sync', callback);
            website.fetch();
        },



    });  

    return websiteRepository;
});