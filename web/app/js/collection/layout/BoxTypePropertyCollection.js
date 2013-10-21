define([
    'marionette',
    'model/layout/BoxTypePropertyModel'
], function(
    Marionette,
    BoxTypePropertyModel
){
    return Backbone.Collection.extend({
        model: BoxTypePropertyModel,
        // url: 'api/layout/boxtypes'
    });
});