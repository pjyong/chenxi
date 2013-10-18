define([
    'marionette',
], function(
    Marionette
){
    return Backbone.Model.extend({

        defaults: {
            label: '',
            chineseLabel: '',
            categoryLabel: '',
            isCached: false,
        },


        initialize: function(){
        },

        urlRoot: 'api/layout/boxtypes',
    });
});