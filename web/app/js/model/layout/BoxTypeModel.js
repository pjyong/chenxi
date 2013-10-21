define([
    'marionette',
    'collection/layout/BoxTypePropertyCollection'
], function(
    Marionette,
    BoxTypePropertyCollection
){
    return Backbone.Model.extend({

        defaults: {
            label: '',
            chineseLabel: '',
            categoryLabel: '',
            isCached: false,
            formStr: '',
        },

        parse: function(response, options){
            //
            if(!_.isEmpty(response.boxTypeProperties)){
                this.set('boxTypeProperties', new BoxTypePropertyCollection(response.boxTypeProperties));
            }
            delete response.boxTypeProperties;
            return response;
        },

        initialize: function(){
        },

        urlRoot: 'api/layout/boxtypes',
    });
});