define([
    'marionette'
], function(
    Marionette
){
    var websiteModel = Backbone.Model.extend({
        defaults: {
            title: '',
            website: '',
            url: ''
        },

        initialize: function(){
        },

        sync: function(method, model, options){
            switch(method){
                case 'create':
                break;
                case 'read':
                options.url = 'api/outter/website';
                break;
                case 'update':
                break;
                case 'delete':break;

            }
            Backbone.sync.apply(this, arguments);
        },

        urlRoot: 'api/websites',
    });

    return websiteModel;
});