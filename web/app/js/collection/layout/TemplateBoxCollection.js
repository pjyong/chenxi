define([
    'marionette',
    'model/layout/TemplateBoxModel'
], function(
    Marionette,
    TemplateBoxModel
){
    return Backbone.Collection.extend({
        model: TemplateBoxModel,
        // url: 'api/layout/boxtypes'
    });
});