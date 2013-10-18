define([
    'marionette',
    'model/layout/BoxTypeModel'
], function(
    Marionette,
    BoxTypeModel
){
    return Backbone.Collection.extend({
        model: BoxTypeModel,
        url: 'api/layout/boxtypes'
    });
});