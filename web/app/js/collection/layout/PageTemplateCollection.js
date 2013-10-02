define([
    'marionette',
    'model/layout/PageTemplateModel'
], function(
    Marionette,
    PageTemplateModel
){
    var pageTemplateCollection = Backbone.Collection.extend({
        model: PageTemplateModel,
        url: 'api/layout/templates'
    });

    return pageTemplateCollection;
});